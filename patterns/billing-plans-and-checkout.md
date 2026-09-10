# Billing, plans and checkout

**Evaluated:** 2026-09

Everything below was walked in a real browser at 1440 and 390 in September 2026, or read out of the
live DOM with Playwright, or taken from a named published study. Where a surface sits behind a
paywall the source is the vendor's own documentation and the file says so. Numbers are exact.

---

## If you only get five things right

1. **Show the total before you ask for the address, and show the tax row even when you can't fill
   it yet.** Stripe Checkout renders a `Tax` row whose value reads *"Enter address to calculate"* —
   the row exists before the data does. Baymard's aggregate of 50 studies puts "extra costs too
   high (shipping, tax, fees)" at **40%** of non-browsing abandonment and "couldn't calculate total
   cost upfront" at **12%**; between them that is more than half the recoverable loss, and both are
   the same design failure: a number that appears late.
2. **The limit-reached state is the upgrade page.** A user who hits a cap has already told you the
   plan is too small, and told you which limit priced it wrong. The default build treats the cap as
   a wall and the upgrade as a separate errand in Settings. The correct move is: name the limit,
   name the number used and the number allowed, offer the single next plan with its price, and
   preserve the work in progress so the user lands back on the exact object they were editing —
   with the blocked action retried for them.
3. **Do not build a comparison grid out of `<div>`s.** Measured on the live pricing pages of Vercel,
   Figma, Notion and Linear on 2026-09-09: **zero `<table>` elements, zero `<th>`, zero
   `th[scope]`** across all four. Figma and Linear each declare one `role="table"` container with no
   column headers inside it. Between 56 and 294 `<svg>` elements per page sit alone in a parent with
   no text and no `aria-label` — those are the tick and cross cells, and to a screen reader they are
   silence. A plan grid is tabular data. Use a table.
4. **Failed payment is a two-week UI state, not an error page.** Stripe's recommended Smart Retries
   default is **8 attempts within 2 weeks**. For those 14 days the account is alive, the customer is
   often unaware, and your app has to show a persistent, dismissible-per-session, everywhere-visible
   band with a single action (`Update payment method`) — not a modal, not a logout, not a silent
   downgrade on day 15.
5. **Cancellation must be reachable in the same medium and in about as many clicks as signup.** The
   US federal click-to-cancel rule was vacated in July 2025 and the FTC's replacement was still an
   ANPRM as of May 2026 — but California's amended Automatic Renewal Law has been in force since
   **1 July 2025**, Germany has required a cancellation button under **§312k BGB since July 2022**,
   and the EU withdrawal button under Directive 2023/2673 lands **19 June 2026** with penalties up to
   **€2 million or 4% of EU turnover**. Build the compliant flow; it is also the better flow.

---

# 1. The pricing page

## The job

The visitor is doing one of three things and only one of them is "reading". They are (a) checking
whether the product is in their budget band at all — a five-second question answered by the largest
number on the page; (b) checking whether one specific thing they need is included — SAML, an API,
a seat count, a region; (c) building a defensible internal case, which means they need a number they
can paste into Slack. The business needs qualified signups and needs the enterprise conversation to
start with an email address rather than a price.

Those conflict in exactly one place: **the "Custom / Contact sales" column**. The user wants a
number; the business wants a call. The resolution that actually works is to make the enterprise
column carry *concrete non-price facts* — Linear's Enterprise column reads `Invoice/PO billing`,
`SAML and SCIM`, `Granular admin controls`, `Advanced org modeling`, `Migration & onboarding
support`, `Account management`, plus `Annual billing only` in the slot where the other columns show
a billing toggle. Nobody gets a price, but everyone gets enough to know whether to book the call.

## The reference implementation

**Vercel, `vercel.com/pricing`.** Three columns, no card chrome at all: the plans are separated by
1px vertical hairlines inside one bordered container, with no shadow, no radius, no elevation and no
lifted "recommended" column. The price is `$0` / `$20` / `Custom` at **56px, weight 450, GeistSans,
letter-spacing −3.36px** (−0.06em), with the unit `/mo.` set small in monospace beside it.
"Popular" is a grey pill sitting **inline on the same baseline as the word "Pro"**, not a floating
ribbon above the column. Features are inherited rather than repeated: Pro's list is headed **"All
Hobby features, plus:"** and lists only the delta. Each feature row carries its own distinct icon —
a download glyph for "Import your repo", a chip glyph for "Fluid compute", a shield for "DDoS
Mitigation" — which is more work than a column of identical ticks and is the reason the list reads
as content rather than as decoration.

Screenshots: `.cache/shots/bpc-vercel-pricing-1440.png`, `-390.png`.

## The decisions

| Fork | What the references do | Why |
|---|---|---|
| One global billing toggle, or one per plan? | Notion and Shopify: one global segmented control (`Pay monthly` / `Pay yearly`). **Linear and Figma: one toggle per paid column.** | Per-column wins when plans have different billing constraints. Linear's Free column shows `Free for everyone` and Enterprise shows `Annual billing only` **in the same vertical slot** where Basic and Business show their `Billed yearly` switch, so all four columns' feature lists still start on the same y. A global toggle forces you to either hide the constraint or footnote it. |
| Toggle or segmented control? | Notion/Shopify use a two-segment pill. Linear/Figma use a switch. | A switch has an implicit off-state and reads as "turn on a discount"; a segmented control has two equally-named options. If the annual price is the default shown, use a segmented control — a switch that is already on is a lie about the default. |
| Where does the CTA sit? | **Notion and Shopify put the CTA above the feature list.** Vercel and Linear put it below. | Above wins when the list is longer than about six rows. Notion's Business column has an 11-row list; a below-list CTA there is 900px down. Shopify's mobile card puts `Start for free` directly under the price with all five features beneath it. |
| Show the discount as a % or as a price? | Notion: `Save up to 20% with yearly` as a separate blue link beside the toggle, prices stay whole-dollar. | "up to 20%" beside the control beats a struck-through monthly price inside every column: one string instead of four, and it survives the plans having different discount rates. |
| Currency | Notion and Figma both print **`Price in USD`** right-aligned on the toggle row. | Two words that prevent an entire category of support ticket. Nobody else in the set does it. |

**Why most pricing pages are interchangeable.** They are three bordered cards with a drop shadow,
a lifted middle column with a "Most Popular" ribbon, identical tick lists of 5/8/12 rows, and a
monthly/annual switch that says "Save 20%". That template is not wrong; it is *empty*, because every
decision in it was made by the template rather than by the product. The pages above differ from it
in one specific way each — Vercel by deleting all card chrome and giving every feature its own icon,
Linear by moving the billing control into each column so the constraint is visible, Notion by
grouping four plans into two narrative buckets, Figma by nesting seat types inside plan columns.
Pick one structural decision that the template can't express and make it.

## The states

- **JS off / before hydration.** Prices must render server-side at the default interval. A page
  whose prices are `—` until a React toggle mounts loses the five-second budget question.
- **Currency/geo detection wrong.** Print the currency label (`Price in USD`) and make it a control,
  not a toast. Twilio's SMS pricing page puts a country `<select>` (`Send and receive messages in
  [🇺🇸 United States]`) as the **first control on the page**, above every rate, because in that
  product geography changes the price by more than an order of magnitude.
- **Already subscribed.** The pricing page is also read by existing customers. The column matching
  the current plan should say `Your current plan` and its button should be inert, not a second
  `Get started` that starts a duplicate subscription.
- **Logged in on a team.** `Get started` should route to "add this plan to *Acme*", not to signup.
- **Price changed since the doc was written.** Date the promotional prices. OpenAI's model pricing
  carries `GPT-5.6 Sol's promotional pricing is available at least through November 21, 2026.` and
  `Priority processing was renamed Fast mode on July 30, 2026.` — dated, in prose, under the table.

## The mobile version

Two viable structures, and the set contains both:

- **Vertical stack (Vercel, Notion, Linear).** Every plan becomes a full-width card in source order.
  Free first. Cost: the fourth plan is four screens down. Notion's mobile page keeps the group
  heading ("Essentials for staying organized.") above the Free card so the narrative survives the
  collapse.
- **Horizontal snap carousel with peek (Shopify).** Cards are ~90% of viewport width so the next
  card's edge is visible — the peek is the only affordance telling the user to swipe. Shopify also
  moves the price **onto the same line as the plan name**, right-aligned (`Basic … $29/mo`), which
  buys back a whole line of vertical space, and separates features with hairlines rather than
  bullets so each row is a scannable band.

Choose the carousel only if you also ship `Compare all features` as a separate full-width view.
Shopify does. A carousel with no comparison view hides the thing four-plan buyers came to do.

**Observed mobile failure, Notion at 390:** the "Chat with us" launcher floats over the bottom-right
of the feature list and occludes text. Any fixed support widget must be offset above the safe area
and must not overlap scrollable content on the one page where the user is reading small print.

## Accessibility

- Price must be one accessible string. `<span>$</span><span>20</span><span>/mo</span>` reads as
  "dollar twenty slash m o". Use `<p><span aria-hidden="true">$20</span><span class="sr-only">20 US
  dollars per month</span> …` or put the full string in the element and style with `::first-letter`
  tricks rather than splitting nodes.
- The billing toggle must be a real control with a real name: `role="switch"` + `aria-checked`, or a
  `radiogroup` with two radios. When it flips, prices change elsewhere on the page — wrap the price
  region in `aria-live="polite"` so the change is announced once, at the region, not per column.
- "Most popular" must be inside the accessible name of the plan, not a separately-positioned badge
  a screen reader meets before or after the plan name. Vercel's inline chip does this correctly by
  accident of layout.
- Contrast: the `/mo.` unit, the `per user/month` suffix and the "Save 20%" link are the three
  strings most often set at 40–50% opacity on a white ground. All three carry price meaning and all
  three must clear 4.5:1.

## Copy

| Works | Beats |
|---|---|
| `All Hobby features, plus:` (Vercel) | Repeating twelve identical tick rows in every column |
| `Free for everyone` / `Annual billing only` (Linear, in the toggle slot) | An asterisk and a footnote |
| `Price in USD` (Notion, Figma) | Nothing, then a support ticket |
| `Save up to 20% with yearly` (Notion) | `Save 20%!` when three of four plans save a different amount |
| `$20 of included usage credit` (Vercel) | `Generous free tier` |
| `Card rates from 2.9% + 30¢ USD` (Shopify, in the plan card) | Putting the transaction rate in a separate fees page |
| `Everything you need to build and scale your app.` (Vercel Pro) | `For growing teams` |

## How it goes wrong

The generated version has three cards with `border-radius: 16px`, `box-shadow: 0 4px 24px
rgba(0,0,0,.08)`, a middle card with `transform: scale(1.05)` and a gradient border, a "Most
Popular" pill absolutely positioned at `top: -12px; left: 50%; translateX(-50%)`, twelve tick rows
per column drawn with the same `<CheckIcon className="text-green-500" />`, feature strings that are
category nouns (`Advanced analytics`, `Priority support`, `Custom integrations`), a Monthly/Annual
switch labelled `Save 20%`, and an Enterprise column whose only content is `Custom` and `Contact
us`. Every string is true of every SaaS product. Nothing on the page is a number except the price.

---

# 2. Plan comparison at four or more plans

## The job

At two or three plans the columns are a summary. At four or more they are a **comparison**, and the
user's task changes from "which is my budget" to "find the row that differs". The business wants the
higher tier to look inevitable. The honest resolution is to make the *differences* easy to find,
which is also what makes the higher tier look inevitable when it actually is.

## The reference implementations

**Notion, four plans, grouped into two.** Free and Plus sit in one white card under the heading
*"Essentials for staying organized."*; Business and Enterprise sit in a light-blue card under *"The
AI workspace for work that matters."* Business carries a blue `Recommended` chip. Four columns
become two decisions: *do I need the AI workspace?* then *which size?* This is the cheapest solve
for the four-plan legibility problem and almost nobody uses it.

**Figma, four plans × three seat types × nine products.** The hardest grid in the set. Figma nests
**seat rows inside each plan column** — `Full seat $16/mo`, `Dev seat $12/mo`, `Collab seat $3/mo` —
and under each seat name puts a strip of product icons showing which of Figma Design / Make / Draw /
Dev Mode / FigJam / Slides / Motion / Sites / Buzz that seat unlocks, plus `+ 3,000 AI credits/mo`.
The icon strip *is* the feature matrix; there is no tick list at that level. A chip row above the
grid (`Figma Design  Figma Make  Figma Draw  Dev Mode  FigJam  Figma Slides  Figma Motion  Figma
Sites  Figma Buzz`) lets the visitor filter to the product they care about. Figma's full comparison
table below carries a `role="switch"` labelled **"Show only key features"** toggling `All features` /
`Key features`.

Screenshots: `.cache/shots/bpc-notion-pricing-1440.png`, `bpc-figma-pricing-1440.png`.

## The decisions

| Fork | Rule |
|---|---|
| Four columns side by side, or grouped? | Group when two plans share a buyer (individual vs. company) and split when they don't. Notion groups 2+2. Linear and Figma keep four abreast, which works only because their column content is short (Linear's longest list is 9 rows). |
| Full matrix on the page, or behind a link? | Both. The top grid carries 5–9 differentiating rows; the full matrix lives below with a sticky header. Shopify's mobile puts it behind `Compare all features`. |
| Show every row, or only rows that differ? | Ship the "only differences" view as the **default** and `All features` as the opt-in. Figma ships the switch but defaults to all. A 60-row matrix where 40 rows are ✓✓✓✓ wastes the user's entire scan. |
| Ticks or values? | Never a bare tick where a number exists. `250 issues` / `Unlimited issues` (Linear) beats ✗/✓. A tick answers "is it there"; users are asking "how much of it". |
| Sticky header | Required. Measured sticky-positioned elements on the live pages: Notion 9, Vercel 3, Figma 3, Linear 1. A 60-row matrix without a sticky plan header is unusable past row 12. |

## The states

- **Row not applicable to a plan.** Distinguish "not included" (✗) from "not applicable" (—) from
  "add-on" (`$ Add-on`). Three different meanings, three different marks.
- **Long matrix + a filter.** When the visitor filters to one product (Figma's chip row), the plan
  columns must not reflow their widths; freeze the grid template so the eye doesn't have to
  re-acquire the columns.
- **Horizontal overflow.** OpenAI's model pricing table at 1440 with its right-hand TOC visible has
  its final `Output` column clipped at the container edge. Any comparison grid must live in its own
  `overflow-x: auto` container with a visible scroll affordance — a shadow on the clipped edge —
  not clip silently against a sibling.

## The mobile version

Four columns cannot be four columns at 390. Three real options, in order of preference:

1. **One plan at a time with a plan picker.** A segmented control or select at the top of the matrix
   choosing the *comparison* plan, with the current plan pinned. Two columns fit at 390; four do not.
2. **Accordion by feature group.** Each group (Security, Integrations, Support) collapses; inside,
   each row is a label with four small values beneath. Verbose but honest.
3. **Horizontal scroll with a frozen first column.** Works, but the frozen column must actually
   freeze — `position: sticky; left: 0` with an opaque background and a right-edge shadow. Half-built
   versions of this are the most common mobile pricing bug in the wild.

Do not render a 6-column table at 390 and let the page body scroll sideways. That breaks the whole
document, not just the table.

## Accessibility

This is where the set fails hardest, and it is measurable. Read from the live DOM, 2026-09-09:

| Page | `<table>` | `role="table"` | `<th>` | `th[scope]` | bare `<svg>` with no label and no sibling text |
|---|---|---|---|---|---|
| vercel.com/pricing | 0 | 0 | 0 | 0 | 294 |
| figma.com/pricing | 0 | 1 | 0 | 0 | 56 |
| notion.com/pricing | 0 | 0 | 0 | 0 | 199 |
| linear.app/pricing | 0 | 1 | 0 | 0 | 281 |

What to build instead:

- A real `<table>` with `<caption>`, `<th scope="col">` per plan and `<th scope="row">` per feature.
  Row/column association is the entire point of the artefact.
- Every tick and cross gets a text alternative in the cell: `<span class="sr-only">Included</span>`
  / `Not included`. An `aria-label` on the SVG is acceptable; nothing is not.
- The sticky header row must not be `aria-hidden`, and must not be a visually-duplicated second copy
  of the header — that produces two announcements of every plan name.
- Zoom to 200% and 400%: the grid must reflow or scroll within its container without the page
  scrolling horizontally (WCAG 1.4.10 Reflow).

## Copy

| Works | Beats |
|---|---|
| `250 issues` → `Unlimited issues` (Linear, adjacent columns) | ✓ / ✓ |
| `Full seat` / `Dev seat` / `Collab seat` with a price each (Figma) | `Per editor, per month*` |
| `Show only key features` (Figma switch) | A 60-row matrix with no escape |
| `Essentials for staying organized.` / `The AI workspace for work that matters.` (Notion group headings) | `Personal` / `Business` |
| `— Not applicable on this plan` | An empty cell |

## How it goes wrong

Six plans abreast at 1200px, each column 180px wide, plan names wrapping onto three lines, a matrix
of 47 rows all of which are ✓ except four, no sticky header, `overflow: hidden` on the wrapper so
the last column is simply gone at 1280, and the whole thing built from nested flexboxes so a screen
reader hears "check check check check" 188 times with no idea which plan it is in.

---

# 3. Usage-based and hybrid pricing display

## The job

This is the genuinely hard one. The user is trying to answer a question the pricing page structurally
cannot answer — *what will I actually pay?* — because the answer depends on their behaviour. The
business needs the rate card to be accurate and complete, which makes it long, and needs the
headline to be small, which makes the rate card feel like a trap.

The gap between those two is where trust dies. From the September 2026 Hacker News thread on
Vercel's pricing, a customer who had just been on a contract call:

> "MIUs are 1 unit = $1, but the rate at which MIU are consumed vary by SKU. Which SKUs do you need,
> which are you using? Best of luck figuring that out. Cache hit? Fast Data Transfer. Cache miss?
> Fast Data Transfer *and* Fast Origin Transfer, so 2x the cost." — *mslev*

And, damningly:

> "they have an internal quoting tool, Copper, which we got a glimpse of on the call. This shows
> super detailed breakdowns of usage and pricing (for quoting, not actually for billing) and would
> be really useful to see…but of course they couldn't actually share that information with us."

If your sales team has a calculator the customer can't see, the pricing page is not a pricing page.

## The reference implementations

**Modal, `modal.com/pricing` — the unit-granularity toggle.** Modal's rate card is a two-column list
of resources and prices with a segmented control at the top right: **`Per hour` / `Per second`**.
Per-second, `Nvidia B300` reads `$0.001972 / sec`; `Physical core (2 vCPU equivalent)` reads
`$0.0000131 / core / sec`; memory is `$0.00000222 / GiB / sec`. Seven significant figures are
unreadable as a comparison and unavoidable as a billing unit, so Modal ships both and lets you pick.
Directly under the CPU rate, in small grey type on the same card, sits the gotcha: **`*minimum of
0.125 cores per container`**. The constraint that changes your bill is disclosed at the rate, not in
an FAQ.

**OpenAI, `platform.openai.com/docs/pricing` — the axis segmented control.** Four modes across the
top (`Standard` / `Batch` / `Flex` / `Fast mode`), then a table whose columns are grouped under two
spanning headers, `Short context` and `Long context`, each with `Input`, `Cached input`,
`Cache writes`, `Output`. The unit is stated once, in prose, above the table: **`Prices per 1M
tokens.`** Rates for the same model differ by 2× between the context groups — putting that in a
column group rather than in separate rows is what keeps a 4-model × 8-price grid readable.

**Twilio — geography first.** The first interactive control on the SMS pricing page, above every
rate, is `Send and receive messages in [🇺🇸 United States]`. Country selection is upstream of price,
so it is upstream on the page.

Screenshots: `.cache/shots/bpc-modal-pricing-1440.png`, `bpc-openai-platpricing-1440.png`,
`bpc-twilio-sms-1440.png`, `bpc-vercel-pricing-1440.png`.

## The decisions

| Fork | Rule and reasoning |
|---|---|
| Included allowance: credit or quota? | Vercel says **`$20 of included usage credit`** — a dollar credit, not a quota. A credit is one number the user can reason about across every meter. A quota (`100 GB bandwidth, 1M function invocations, 100 GB-hrs compute`) is N numbers they must track separately and cannot trade off. Prefer the credit; publish the rate card so the credit is convertible. |
| One unit or several? | If your smallest billable unit produces more than four leading zeros, ship a unit toggle (Modal's per-hour/per-second). If not, pick the unit the user's mental model uses, not the one your meter uses. |
| Calculator on the pricing page? | Yes, and it must be **seeded from real numbers the user already has** ("how many seats", "monthly requests"), output a single monthly figure, and show the arithmetic. A slider with no shown formula is a slot machine. |
| Where do the limits live? | Inline, or one click away and linked from the price. From the same HN thread: *"they SHOULD link to the /limits docs from here"*. A rate without its cap is half a rate. |
| Rate card completeness | Every SKU that can appear on an invoice must appear on the pricing page under the same name it will have on the invoice. This is the single highest-value rule in this section and the one most often broken. |

## The states — this is most of the work

Usage-based pricing is not really a pricing-page problem; it is an **in-product metering UI**
problem. The pricing page is read once; the usage dashboard is read every month, in fear.

**Vercel's Spend Management is the reference** (documented at `vercel.com/docs/spend-management`,
walked 2026-09-09). Its shape:

- A single dollar amount you set — `$XXX / $XX (100%)` with an enable switch.
- Notifications fire automatically at **50%, 75% and 100%** of that amount, over web, email, and
  optionally SMS (SMS requires an Owner/Billing role and a verified phone).
- At 100% the configured action fires: pause all projects, notify, and/or POST a webhook whose
  payload is `{ budgetAmount, currentSpend, teamId, thresholdPercent }`.
- Paused production deployments serve a **503 `DEPLOYMENT_PAUSED`**.
- Two honest disclosures in the docs that most products omit and every product needs:
  *"Pausing is not instantaneous. Because Vercel checks your spend every few minutes, projects can
  keep serving traffic and accruing usage for several minutes after you cross your spend amount."*
  and *"Projects won't automatically unpause if you increase the spend amount, you must resume each
  project manually."*

Copy the shape, including the disclosures. The states you must design:

| State | What it must show |
|---|---|
| Under budget, mid-cycle | Spend to date, projected end-of-cycle spend, days remaining, the cap. Projection is the whole point; "$41 so far" with 3 days left and "$41 so far" with 24 days left are different emotions. |
| Threshold crossed (50/75/100) | An in-app band, not only an email. Name the meter that moved, not just the total. |
| Hard cap hit, service paused | What is down, what is still up, what the visitor sees (a 503), the exact resume action, and that resume is manual and per-project. |
| Anomalous spike | If today's rate is >Nx the trailing 7-day median, say so on the usage page before the invoice does. The $23,000 DDoS bill and the $1,141 viral-post bill both had 24 hours of visible signal. |
| Free tier exhausted | Distinct from "paid cap hit". This is an upgrade moment, not an incident. |
| Meter unavailable | Usage data is aggregated with lag. Show the lag (`Usage through Sep 8, 23:00 UTC`), never a stale number presented as live. |

## The mobile version

Rate cards are the worst thing on a phone. Rules:

- Never render a 9-column rate table at 390. Collapse to a per-item card: resource name as the row
  title, unit price right-aligned, secondary units on a second line.
- The unit toggle must remain visible while scrolling the rate list — sticky, at the top of the list
  container.
- The usage dashboard, not the rate card, is the mobile surface that matters: a big current-spend
  number, a projection, days remaining, and one control (`Manage spend limit`). Everything else can
  be desktop-only.

## Accessibility

- A price like `$0.001972 / sec` must not be split across elements; screen readers say "zero point
  zero zero one nine seven two" only if it is one text node.
- The unit toggle changes every number in the table. Announce once: `aria-live="polite"` on the
  table container plus an off-screen status ("Showing per-second rates").
- Usage bars need a text value, not just a fill width: `role="progressbar"` with `aria-valuenow`,
  `aria-valuemin`, `aria-valuemax`, `aria-valuetext="41 of 100 GB used"`.
- Colour alone must never carry "over budget" — pair the red with a word.

## Copy

| Works | Beats |
|---|---|
| `*minimum of 0.125 cores per container` (Modal, under the rate) | The same fact in a FAQ accordion |
| `Prices per 1M tokens.` (OpenAI, once, above the table) | `/1M` repeated in 32 cells |
| `$20 of included usage credit` (Vercel) | `Generous included usage` |
| `Usage through Sep 8, 23:00 UTC` | A number with no as-of |
| `Projected $312 by Sep 30 at current rate` | `$41 used` |
| `Pausing is not instantaneous — we check spend every few minutes, so usage can accrue for several minutes after you cross your limit.` | `Your projects will be paused when you hit your limit.` |
| `You'll be charged $0 more this cycle. Resume each project manually when you're ready.` | `Account suspended.` |

## How it goes wrong

A headline of "Starts at $20/mo", a slider whose output is a number with no formula, a rate card on
a separate `/pricing/details` page using SKU names that don't match the invoice, no published caps,
no in-product projection, no threshold alerts, and a first notification that is the invoice itself.
The support thread that follows is not about the price. It is about the surprise.

---

# 4. The upgrade moment and the limit-reached state

## The job

The user is mid-task. They are attaching a 60MB file, inviting an 11th member, creating a 251st
issue, running a 6th concurrent build. They do not want to buy anything; they want to finish the
thing they were doing. The business wants the conversion and wants it attributed to the feature that
caused it. These conflict only if you treat the limit as a punishment.

The resolution: **the limit-reached state is a purchase surface with the user's work held in
escrow.** Everything they typed survives. The upgrade completes in place. They land back on the
object, not on a billing dashboard.

## The reference behaviour

Two structurally different upgrade paths exist and products should ship both:

1. **In-context (the limit-reached surface).** Triggered by the action. Names the specific limit and
   the specific number. Offers exactly one plan — the next one up — with its price and what it
   raises the limit to. Has a secondary escape that is not "cancel": *"Remove a member instead"*,
   *"Archive old issues"*.
2. **The billing page.** For the deliberate, budgeted, admin-initiated change. Shows all plans, the
   current one marked, proration previewed, seat count editable.

Linear's public pricing marks the boundary the in-context prompt has to name: Free is `2 teams`,
`250 issues`; Basic is `5 teams`, `Unlimited issues`. That is the string the wall should print —
"250 of 250 issues on Free. Basic gives you unlimited for $10 per user/month." — not "Upgrade to
unlock more".

## The decisions

| Fork | Rule |
|---|---|
| Block, or allow-and-warn? | Warn at 80%, warn harder at 100%, block only on the action that would exceed a *hard* limit (billable capacity, licence count). Never block retroactively — data already created above a limit stays readable. |
| Modal or inline? | Inline if the limit is on one field (a file too large → a band under the uploader). Modal only if the action was destructive-adjacent or the whole workspace is affected (seat limit on invite). A modal over a half-written document is the worst option and the most common. |
| Who can upgrade? | Most users hitting the wall cannot buy. The permission wall is the real state: name the admins by name, and give a one-tap `Ask Priya to upgrade` that sends a request containing what the requester was trying to do. |
| One plan or all plans? | One. The user is mid-task. A four-column grid inside a modal is a context switch. |
| What happens after? | Return to the exact action, and **retry it automatically**. The upload resumes; the invite sends; the issue is created. If the user has to redo the action, the flow failed. |
| Attribution | The upgrade record should carry the triggering limit. It is the only reliable signal for which limit is priced wrong. |

## The states

| State | Requirement |
|---|---|
| Approaching (80%) | Ambient, dismissible, never blocking. `8 of 10 seats used`. |
| At the limit, user can pay | The purchase surface described above. |
| At the limit, user cannot pay | Named admins + request-to-upgrade. Requesting must be one action and must confirm ("Request sent to Priya and Dan"). |
| Requested, awaiting approval | Show the pending state on the wall itself, with the request time. Do not let them re-request into a loop. |
| Payment in flight | The upgrade button must go to a determinate busy state and the underlying action must not be lost if the tab closes. |
| Payment failed at the wall | The worst state in the flow. Keep the work, keep the wall, show the decline reason in human words, offer a different payment method. |
| Upgraded, limit raised | Confirm the new limit numerically (`Now 50 seats`), then get out of the way. |
| Downgraded back below the limit | Over-limit content becomes read-only, never deleted, with an explicit count: `12 issues above your Free limit are read-only.` |

## The mobile version

- The wall is a **bottom sheet**, not a centred modal. It reaches the thumb, it doesn't cover the
  content the user is trying to keep in view, and it can be dragged to peek at what's behind.
- Show the price and the one CTA above the fold of the sheet. Feature lists go below the fold.
- The wallet button (Apple Pay / Google Pay) belongs at the top of the sheet: on mobile it converts a
  three-screen card entry into one biometric confirmation. Stripe measured Apple Pay at **+22.3%
  conversion and +22.5% revenue** on eligible checkouts (April 2025).
- Keyboard: if card entry is needed, the numeric keypad opening must not push the pay button off
  screen. Test at 390×667, not 390×844.

## Accessibility

- When the wall appears in response to an action, move focus to it and announce it. A `role="dialog"`
  with `aria-modal="true"`, an `aria-labelledby` pointing at the heading, and focus on the heading —
  not on the primary button, which reads the CTA before the reason.
- The wall must be dismissible with Escape and must return focus to the control that triggered it.
- Do not use `alert()`-style `role="alert"` for the whole sheet — it will read the entire pricing
  block as one interruption.
- The 80% warning belongs in `role="status"` (polite), not `role="alert"`.

## Copy

| Works | Beats |
|---|---|
| `You've used 250 of 250 issues on Free.` | `You've reached your limit.` |
| `Basic gives you unlimited issues for $10 per user/month.` | `Upgrade for more.` |
| `Archive old issues instead` (secondary) | `Cancel` |
| `Ask Priya or Dan to upgrade` (with real names) | `Contact your administrator.` |
| `Request sent. We'll email you when Priya responds.` | A closed modal and nothing |
| `Your file is still here. Upgrade to finish uploading “Q3-forecast.xlsx”.` | `Upload failed.` |
| `12 issues are above your Free limit and are read-only. They're safe — upgrade to edit them again.` | `Some content is unavailable on your plan.` |

## How it goes wrong

A centred modal titled **"Upgrade to Pro"** with a rocket emoji, three plan cards inside it, a body
of "Unlock the full power of the platform", no mention of which limit was hit or what the number was,
a "Maybe later" secondary that closes the modal and also discards the half-written document, no
handling of the case where the user isn't an admin, and — after a successful upgrade — a redirect to
`/settings/billing` instead of back to the file that failed to upload.

---

# 5. Trials

## The job

The user wants to evaluate without risk and without a calendar reminder. The business wants a
payment method on file, because trials with a card convert several times better and trials without
one produce a much larger top of funnel. These genuinely conflict; the honest resolutions are (a)
pick one and be loud about it, and (b) whichever you pick, make the end date unmissable.

## The reference implementations

**Spotify, `spotify.com/us/premium/` — the compliant consumer trial.** The offer is the page. Under
the CTA, in grey, in full:

> *"Premium Individual only. Free for 3 months, then $12.99 per month after. Offer only available if
> you haven't tried Premium before. Terms apply. Offer ends September 23, 2026."*

Four separate facts in one paragraph: what it applies to, what happens after, who is eligible, when
the offer expires. The subhead above the button already said *"Try 3 months of Premium Individual
for $0, then $12.99/month. Cancel anytime."* The price after the trial appears **twice, above the
fold, before any commitment**. That is what California's amended Automatic Renewal Law asks for and
what the FTC's proposed successor rule describes as "material terms… in a manner they can actually
notice and understand before they are charged."

**Twilio — the no-card trial, stated as a feature.** `Start building today. No credit card
required.` appears in the hero, adjacent to the CTA, not in an FAQ.

**Shopify — the paid-trial hybrid.** `Try 3 days free, then $1/month for 3 months.` Two prices and
two durations in eleven words, above the plan cards.

Screenshots: `.cache/shots/bpc-spotify-premium-390.png`, `bpc-twilio-sms-1440.png`,
`bpc-shopify-pricing-390.png`.

## The decisions

| Fork | Take |
|---|---|
| Card, or no card? | Card if the product's value is obvious in minutes and support cost per trial is high. No card if activation takes days of setup (most B2B infrastructure). If you take a card: the post-trial price and date must both be on the payment screen, in the same visual weight as the $0. |
| Trial of the top plan, or of the plan they picked? | Trial the plan they picked, and say what they're missing. A trial of Enterprise that silently downgrades to Starter on day 15 produces a feature-loss support ticket, not a conversion. |
| Length | Whatever it is, express it as a **date** everywhere after signup, not a countdown of days. `Trial ends Friday 26 September` survives the user not opening the app for a week; "7 days left" does not. |
| Extend? | Have a one-click extend for support to grant, and expose it to the user exactly once, at expiry, if they were active in the last 72 hours. |
| Day-after behaviour | Read-only, not deleted, not locked out. See below. |

## The states — the day after is the whole design

| State | What the product looks like |
|---|---|
| Day 1 | A persistent, low-contrast chip in the app chrome: `Trial · ends Fri 26 Sep`. Not a banner. Not dismissible-forever. |
| ~60% through, user is active | First upgrade prompt. Reference what they built: `You've created 34 issues and invited 4 people.` |
| ~60% through, user is inactive | Do not sell. Send them back to the value: the onboarding step they didn't finish. |
| 3 days out | The chip becomes a band. Names the exact date and the exact charge if a card is on file: `Your trial ends Friday 26 September. On Saturday we'll charge $16 per user × 4 = $64.` |
| 24 hours out | Band goes amber. Same string, plus `Manage plan`. |
| Expiry, card on file | Charge, then **confirm the charge in-app**, not just by email. `Charged $64 · Receipt`. This is the moment the user is most likely to feel tricked, and a visible receipt is what prevents it. |
| Expiry, no card | **Read-only mode.** Everything visible, nothing editable, an unmissable band with the price and one CTA. Never a login wall, never a redirect to /pricing, never a spinner that never resolves. |
| Day 8 after expiry | Same read-only state. Do not escalate the UI. Do escalate the email cadence, and say when data is deleted. |
| Data deletion | Give a date, at least 30 days out, repeated in-app and by email, with an export link that works while read-only. |
| Trial already used | The signup path must detect it and say so before the user fills the form: `You've already used a free trial on this workspace.` |

## The mobile version

- The trial chip belongs in the header row, not as a full-width band eating 56px of a 390-wide
  viewport for 14 days.
- Expiry warnings escalate to a bottom sheet on the last day only.
- If the trial requires a card, use the wallet path: Apple Pay / Google Pay at the top of the sheet.
  Stripe's Link measured **+14% conversion** for businesses with large returning-customer bases and
  **+7%** from autofill alone; a saved-wallet path is worth more than any copy change here.
- iOS/Android app-store trials have their own legally-mandated strings and their own cancellation
  path (Settings → Subscriptions). If you sell both ways, the in-app cancel UI must detect the
  store-billed case and deep-link to it rather than showing a cancel button that cannot work.

## Accessibility

- The countdown must not be conveyed only by a colour change. Amber band + the word.
- `role="status"` for the ambient chip; `role="alert"` only for the final-day change.
- If a banner is persistent, it must be in the DOM before main content and reachable by keyboard as
  the first landmark, not visually first and DOM-last.
- Countdown timers that update per-second are an `aria-live` disaster. If you must animate, mark the
  live region `aria-live="off"` and provide a static text alternative.

## Copy

| Works | Beats |
|---|---|
| `Free for 3 months, then $12.99 per month after. Offer only available if you haven't tried Premium before. Offer ends September 23, 2026.` (Spotify) | `Start your free trial!` |
| `No credit card required` (Twilio, next to the CTA) | The same fact in the FAQ |
| `Your trial ends Friday 26 September. On Saturday we'll charge $64 (4 seats × $16).` | `Your trial expires in 3 days.` |
| `Charged $64 · View receipt` | Silence, then a card statement |
| `Your workspace is read-only. All 214 issues are safe. Add a payment method to start editing again.` | `Your trial has expired. Upgrade now!` |
| `We'll keep your data until 26 October. Export anytime.` | Nothing, then deletion |
| `You've already used a free trial on this workspace.` | A form that fails on submit |

## How it goes wrong

A trial that shows "14 days left" and never a date; no in-app warning at all before the charge; an
email that lands in Promotions; a first-of-the-month charge with no in-app receipt; and on day 15,
an interstitial that covers the app with a plan grid and no way to read the data the user put in.
Then, when they cancel, a card charge they can't reconcile because the invoice arrived a week later.

---

# 6. The checkout itself

## The job

The user wants to be finished. Every element on the page is either helping them finish or costing
conversion. The business needs a payment method, a billing address for tax, and — for
subscriptions — consent to recurring charges that will hold up in a chargeback.

**The numbers** (Baymard Institute, aggregating 50 studies and its own large-scale checkout research):

- Average documented cart abandonment: **70.22%**.
- Reasons, excluding "just browsing": extra costs too high **40%**; delivery too slow **20%**;
  didn't trust the site with card details **19%**; required account creation **18%**; too long /
  complicated **17%**; site errors **17%**; unsatisfactory returns policy **13%**; couldn't calculate
  total upfront **12%**; card declined **10%**; not enough payment methods **9%**.
- Average US checkout: **11.3 form fields** (2024 measurement), down from 14.88 in 2016. Achievable:
  **8**. That is a **29% reduction** available to almost everyone.
- Average checkout length: **5.1 steps**. Baymard's finding is that step count matters *less* than
  field count — users judge complexity by fields on screen, not by pages.
- Baymard estimates a **35.26%** average conversion uplift available from checkout UX alone, and
  **$260bn** in recoverable lost orders across the US and EU.

**Stripe's own measured numbers**, which matter because they isolate specific UI decisions:

- Businesses that migrated from the Card Element to the Payment Element saw **+10.5% revenue on
  average**, comparing 5,000 businesses per group (April 2023).
- Link (one-click, saved details) **+14% conversion** for businesses with a large returning-customer
  base; **+7%** from the autofill alone; checkout completed in about six seconds.
- Offering Apple Pay: **+22.3% conversion, +22.5% revenue** among eligible checkouts (April 2025).

## The reference implementation

**Stripe Checkout**, walked live at `checkout.stripe.dev/checkout` on 2026-09-09. What it actually
does, in order down the page:

1. Merchant logo, small, top-left. No merchant nav. No footer links out.
2. Product name in small grey type, then **the total in large type** — `Pure Glow Cream` /
   `$28.80`. The number you will pay is stated *before* the itemisation, not derived from it at the
   bottom.
3. Line items: thumbnail, name, price right-aligned. `Pure Glow Cream … $32.00`.
4. `Subtotal … $32.00`.
5. The applied promotion code renders as a **chip with a tag icon** — `🏷 SAVE10` — with `-$3.20`
   right-aligned and **`10% off` as a sub-label beneath the chip**. Three facts (which code, how
   much off, what rate) in one row-and-a-half.
6. **`Tax  ⓘ` … `Enter address to calculate`.** The row is present and honest before the data
   exists. This is the single most copyable detail on the page: it pre-empts the 40%-of-abandonment
   category by promising that tax will appear here, and it removes the "is tax included?" question
   entirely.
7. `Total due … $28.80`, then a `Hide ⌃` control that collapses the whole summary.
8. **Apple Pay, full width, black, above an `OR` divider**, then the form.

Mobile (390) is the same document with the summary expanded by default and `Hide` available — the
wallet button and the summary both fit above the fold; the address form follows.

**The configurable surface** is itself a useful inventory — this is the complete list of decisions
Stripe thinks a checkout has, read off the demo configurator:

> *Payment setup:* One-time payment · Recurring payment · Promotion codes · Calculate tax · Suggest
> product
> *Customer details:* Phone · Billing address · Shipping address · Shipping options
> *Advanced:* Button text (Pay / …) · Save payment details · Tax ID or VAT · Terms of service ·
> Custom fields

Screenshots: `.cache/shots/bpc-stripe-hosted-checkout-1440.png`, `-390.png`,
`bpc-stripe-co-demo2-1440.png`.

## The decisions

| Fork | Rule | Evidence |
|---|---|---|
| Guest checkout? | Yes, and offer account creation **after** payment on the confirmation screen. | Forced account creation is **18%** of abandonment; **84%** of sites don't defer it. |
| One page or several? | Fields matter more than steps. If you must split, put payment last and never re-ask a field. | Average 5.1 steps; complexity judged by fields. |
| Name: one field or two? | One `Full name`. | **42%** of test users typed a full name into "First name"; **89%** of sites still split it. |
| Address line 2 | Hide behind a link (`+ Apartment, suite, etc.`). | **30%** of participants hesitated at it; **75%** of sites don't hide it. |
| Billing address | Default to "same as shipping", checkbox to differ. | **24%** of sites don't default it. |
| Coupon field | Collapse it behind a link; never a wide empty box labelled "Promo code". | **35%** of sites don't collapse it. An open coupon field sends users out of checkout to hunt for a code. |
| Wallets | Above the form, above the fold, above an `OR` divider. Never below the card fields. | Apple Pay +22.3% conversion on eligible checkouts. |
| Card fields | Use the provider's unified element (Payment Element / equivalent), not a hand-rolled card form. | +10.5% revenue vs. the older single-card element, n=5,000 per arm. |
| Tax display | Render the row before you can fill it. | 40% + 12% of abandonment is "cost appeared late". |
| Validation | On blur, not on keystroke, and never only on submit. Never wipe the card field on a decline. | Card declined is **10%** of abandonment; a decline that clears the form converts a retry into an exit. |
| Terms/consent for subscriptions | Explicit, adjacent to the pay button, stating amount + interval + how to cancel. | CARL (as amended, in force 1 July 2025) requires consent to the auto-renewal terms *themselves*, not to an agreement containing them. |

## The states

| State | Requirement |
|---|---|
| Loading | Skeleton the summary rows at their final heights. Do not let the total shift when tax resolves — reserve the row. |
| Address entered, tax resolving | The `Tax` row shows a spinner or `Calculating…`, then the amount. `Total due` updates in the same frame as the tax row, never before. |
| Declined | The decline reason in human language, the card fields **retained**, an alternate method offered. `Your bank declined this card. Try a different card or use Apple Pay.` |
| 3-D Secure / SCA challenge | A modal from the issuer, out of your control. Before it: say it's coming. After a failed challenge: distinguish "you cancelled" from "the bank refused". |
| Network failure mid-submit | Idempotency key on the client, and a resume state: `We're confirming your payment…` with polling. Never allow a second submit to double-charge. |
| Session expired | Checkout sessions expire. Re-create rather than 404. `This checkout expired. We've started a new one with your cart intact.` |
| Abandoned and returned | Cart, address and selected method restored. Baymard's largest single category. |
| Already purchased | Detect and say so rather than charging twice. |
| Zero-amount (100% coupon, trial) | The pay button must not say "Pay $0". Say `Start trial` or `Confirm`. Stripe exposes `Button text` as a configuration for exactly this reason. |

## The mobile version

- Wallet first. On mobile this converts card entry to a biometric tap.
- The order summary starts **expanded** with a `Hide` control (Stripe's choice) rather than collapsed
  with `Show` — a collapsed summary is where the "extra costs" abandonment happens.
- Card number field: `inputmode="numeric"`, `autocomplete="cc-number"`, `pattern="[0-9\s]*"`. Expiry
  `cc-exp`, CVC `cc-csc`, name `cc-name`, postal `postal-code`. Getting `autocomplete` right is worth
  more than any layout change; it enables the OS card autofill.
- The sticky pay button must sit above the keyboard, not behind it. Use `env(safe-area-inset-bottom)`
  and test with the numeric keypad open at 390×667.
- Do not put the email field before the card field on a one-page mobile checkout if the email
  keyboard pushes the payment section below the fold — reorder so the highest-intent field is first
  visible. (This is the shape of the classic Stripe example; the general rule is: order fields by
  what the keyboard does to the layout, not by what the database schema does.)

## Accessibility

- Every field needs a persistent visible `<label>`. Placeholder-as-label fails the moment the user
  types, and card forms are exactly where users check their work.
- Errors: `aria-describedby` pointing at the message, `aria-invalid="true"`, message text adjacent
  and in the tab order. A summary at the top of the form that links to each failing field (the
  GOV.UK error-summary pattern) is the most reliable version.
- The card iframe (Stripe/Adyen/etc.) must be reachable by keyboard in visual order — test tabbing
  from email to card to expiry without a mouse.
- The total must be in a live region so a coupon or tax change is announced.
- Never disable the pay button until valid. A disabled button gives a keyboard user no way to
  discover *why*. Keep it enabled, validate on submit, move focus to the error summary.
- Timeout: if the session expires, warn 2 minutes before and offer an extension (WCAG 2.2.1).

## Copy

| Works | Beats |
|---|---|
| `Enter address to calculate` (Stripe, in the Tax row) | Hiding the tax row until an address exists |
| `Total due` | `Order total` (ambiguous about whether it's charged now) |
| `🏷 SAVE10  −$3.20` with `10% off` beneath | `Discount applied!` |
| `+ Apartment, suite, etc.` (collapsed link) | An always-visible `Address line 2` |
| `Your bank declined this card. Try a different card or use Apple Pay.` | `Payment failed. Please try again.` |
| `We'll charge $16 per seat per month, starting today. Cancel anytime in Settings → Billing.` (beside the pay button) | `By clicking Pay you agree to our Terms.` |
| `This checkout expired. We've started a new one — your cart is intact.` | A 404 |
| `Start trial` on a $0 total | `Pay $0.00` |

## How it goes wrong

A custom card form with a `First name` and `Last name` field, an always-visible `Address line 2`, a
wide `Promo code` box in the middle of the form, no wallet buttons, tax that first appears after the
address is submitted and moves the total by $6.40 with no explanation, validation that fires on every
keystroke and turns the card field red at digit 4, a `Pay` button disabled until every field is
valid with no error text, and a decline handler that clears the card number "for security".

---

# 7. Invoices, receipts and billing history

## The job

Three different documents get conflated and all three have different readers.

- **The receipt** is for the person who paid, arrives immediately, and answers "what did I just pay".
- **The invoice** is for the person's finance team, is a legal document in most jurisdictions, and
  needs a number, dates, tax IDs, addresses and a PDF.
- **Billing history** is for the admin reconciling a card statement, and its job is to make one row
  in the app match one line on the statement.

## The reference behaviour

Stripe's invoice line-item model is the shape to copy, because it names every component instead of
netting them out. From a real preview invoice (Stripe's own documented example):

```
Unused time on Silver plan after 01 Sep 2020        −$1.66
Remaining time on Gold plan after 01 Sep 2020       +$5.41
1 × Gold product (at $32.52 / month)                $32.52
                                             Total  $36.27
```

Three lines that reconstruct the arithmetic. Compare with the alternative — a single `$36.27
Subscription` line — which generates a support ticket every single time a plan changes mid-cycle.

Stripe's customer portal (documented at `docs.stripe.com/customer-management`) exposes exactly four
things and no more: update billing information, update payment methods, view subscription status,
view invoice history — plus configurable cancellation and a `Retention` section. That restraint is
the design: a billing page is four jobs, not a dashboard.

## The decisions

| Fork | Rule |
|---|---|
| Statement descriptor | Show it in the app, on the row: `Appears as ACME*SUBSCRIPTION on your statement`. This is the single most effective anti-chargeback UI element and almost nobody ships it. |
| Row granularity | One row per charge, matching one line on the card statement. If you charge twice in a month (subscription + overage), that is two rows, not one summed row. |
| PDF | Always available, always with an invoice number, always downloadable without re-authenticating. |
| Email address for invoices | Separate from the account email, and editable. Finance is not the buyer. |
| Tax IDs / VAT number | Enterable *after* purchase and retroactively appliable to the current period's invoice. Stripe exposes `Tax ID or VAT` as a checkout option; most B2B buyers realise they needed it afterwards. |
| The in-progress invoice | Label it as in-progress, with the period it covers and the date it finalises. |
| Currency and FX | If you charge in USD and the customer's bank converts, say so: the amount on their statement will not match your row. |

## The states

| State | Requirement |
|---|---|
| Empty (no invoices yet) | Say when the first one will arrive: `Your first invoice will be issued on 1 October.` |
| Draft / in-progress | This is where products get it wrong. **Observed real failure**, reported by a Vercel customer in September 2026: an invoice page titled *"March 2026: Monthly Pro Plan"* while the same page said *"This invoice will continue updating until the end of your billing period on May 20."* The title carried a stale period. An in-progress invoice must be labelled with the period it is accruing for, and must say when it finalises. |
| Paid | Amount, date, method (last 4 + brand), receipt link, PDF link, statement descriptor. |
| Refunded / partially refunded | The original row stays, with a linked refund row. Never mutate the original. |
| Failed | Links to the retry/update-card flow, shows the next retry date. |
| Disputed | Show it. A silent chargeback is how an account gets suspended with no visible cause. |
| Credit balance | If a downgrade generated a credit, show the balance and where it will be applied: `−$12.44 credit will be applied to your 1 October invoice.` |
| Very long history | Paginate, and provide a date-range export as CSV. Finance teams want the year, not the page. |

## The mobile version

- Collapse to one row per invoice: date and amount on line one, status chip and method on line two.
- The primary action is `Download PDF`, and on iOS that must open in the share sheet rather than a
  blank tab.
- Keep the statement-descriptor string on the mobile row. That is where the "what is this charge"
  question is actually asked, phone in one hand and bank app in the other.

## Accessibility

- Billing history is a table. `<th scope="col">` for Date / Description / Amount / Status; `<th
  scope="row">` for the invoice number.
- Amounts right-aligned visually but not reordered in the DOM.
- Status chips need text, not only colour: `Paid`, `Past due`, `Refunded`.
- The PDF must itself be tagged, or you must offer an HTML invoice alongside it. An untagged PDF
  invoice is inaccessible and in some procurement contexts non-compliant.

## Copy

| Works | Beats |
|---|---|
| `Appears as ACME*SUB on your statement` | Nothing, then a chargeback |
| `Unused time on Basic after 12 Sep` / `Remaining time on Business after 12 Sep` | `Plan change adjustment` |
| `In progress · 1–30 September · finalises 1 October` | `March 2026: Monthly Pro Plan` on an invoice that closes in May |
| `−$12.44 credit will be applied to your 1 October invoice` | An unexplained smaller charge |
| `Your first invoice will be issued on 1 October.` | An empty table |
| `Charged to Visa •••• 4242` | `Card` |

## How it goes wrong

A table of `Date | Amount | Download`, no descriptions, no line items, no statement descriptor, no
tax number, an in-progress invoice indistinguishable from a final one, a PDF that requires a separate
login, and a plan change that produces a mysterious `$36.27` with no arithmetic anywhere in the
product.

---

# 8. Failed payment and dunning

## The job

The most neglected flow in SaaS, and the one with the most revenue attached. The customer usually
doesn't know anything is wrong — the card expired, the bank flagged a foreign transaction, the
corporate card rotated. The business wants the money and wants to not churn a happy customer over an
expiry date. There is **no conflict here at all**; this flow is neglected purely because nobody is
assigned to it.

## The reference behaviour

Stripe's Smart Retries, documented at `docs.stripe.com/billing/revenue-recovery/smart-retries`:

- Retry windows configurable to 1 week, 2 weeks, 3 weeks, 1 month or 2 months. **The recommended
  default is 8 tries within 2 weeks.** Custom schedules cap at 3 retries.
- Retries are ordered across payment methods: subscription default method → subscription default
  source → customer default method → legacy customer default source.
- **Hard declines are never retried**: `incorrect_number`, `lost_card`, `pickup_card`, `stolen_card`,
  `revocation_of_authorization`, `revocation_of_all_authorizations`, `authentication_required`,
  `highest_risk_level`, `transaction_not_allowed`. Retries stay scheduled and `attempt_count` keeps
  incrementing, but nothing executes until a new payment method exists. **This is the case your UI
  must handle**: the retry schedule is a lie for these customers, and only a UI prompt recovers them.
- Bank-debit retries are much slower: ACH Direct Debit 2 retries over **40 days**; SEPA, Bacs and
  AU BECS 2 over 30; ACSS and NZ BECS 1 over 30.
- At the end of the window the subscription goes to one of three states you choose:
  `canceled`, `unpaid` (invoices keep generating as drafts), or `past_due` (invoices keep generating
  and keep charging).

So the design brief is: **for up to 14 days (or 40, on ACH) the account is alive and broken.** That
window is a UI state, and it is the one nobody builds.

## The decisions

| Fork | Rule |
|---|---|
| What does the app look like on day 1 of `past_due`? | Full function, plus a persistent band in the app chrome. Not a modal. Not a logout. Not a feature downgrade. |
| Where does the band live? | Above the app chrome, spanning the full width, present on every route. Dismissible for the session, back next session. |
| What does it say? | The amount, the reason in human words, the next retry date, and one action. |
| Who sees it? | Billing admins see the action. Non-admins see a version naming the admins — a member who can't fix it and gets a red bar every day is being punished for someone else's expired card. |
| When do you degrade function? | At the end of the retry window, not during it. And degrade to **read-only**, not to nothing. |
| Hard decline | Skip the retry narrative entirely. `Your bank blocked this card and won't accept retries. Add a different card to keep your account.` |
| Email vs in-app | Both, always. In-app is the one that works; the emails go to a shared billing alias nobody reads. |
| Update-card flow | Must be reachable in one click from the band, must not require re-authenticating, must retry the outstanding invoice immediately on success, and must confirm: `Paid $64. You're all set.` |

## The states

| State | UI |
|---|---|
| First failure, soft decline, retry scheduled | Amber band. `We couldn't charge your card for $64. We'll try again on 12 September. Update payment method →` |
| Retry 3 of 8 | Same band, updated date. Do not escalate colour for every retry — escalate at the 50% point of the window. |
| Hard decline | Red band immediately, retry language removed. |
| Window nearly over (last 48h) | Red band, states the consequence and its date: `On 24 September your workspace becomes read-only.` |
| Window over → `unpaid` | Read-only. All data visible. Export works. Band states what happens and when data is removed. |
| Window over → `canceled` | Same read-only surface, plus an explicit `Reactivate` that restores the exact prior plan and seat count. |
| Payment method updated, retry pending | Determinate state: `Retrying your payment…` then a result. Never leave the band up after a success. |
| Recovered | Success toast + the band disappears + a confirmation row appears in billing history. |
| Non-admin view | `Your workspace has a billing problem. Priya and Dan have been notified.` No red bar with a dead button. |

## The mobile version

- The band must be one line at 390 or it eats a third of the viewport. `Payment failed · $64 · Fix →`
  with the detail behind the tap.
- The card update flow must offer Apple Pay / Google Pay as a replacement method — for a customer
  whose physical card expired, the wallet card is the one that still works.
- Never open the card form in a modal that can't be scrolled with the keyboard up.

## Accessibility

- The band is `role="status"` on first appearance and `role="alert"` only when the consequence date
  is within 48 hours. Escalating role is more honest than escalating colour.
- It must be the first focusable element in the DOM order of the app shell, so a keyboard user meets
  it before the nav.
- Dismissal must be a real button with an accessible name (`Dismiss billing notice for this
  session`), not an unlabelled ×.
- Do not trap focus. This is not a dialog.

## Copy

| Works | Beats |
|---|---|
| `We couldn't charge Visa •••• 4242 for $64. We'll try again on 12 September.` | `Payment failed.` |
| `Your bank blocked this card and won't accept retries. Add a different card.` | `We'll keep trying.` (a lie for hard declines) |
| `On 24 September your workspace becomes read-only. Nothing will be deleted.` | `Your account will be suspended.` |
| `Paid $64. You're all set.` | Silence |
| `Your workspace has a billing problem. Priya and Dan have been notified.` | A red bar with a button the user can't use |
| `All 214 issues are safe and exportable. Add a payment method to start editing again.` | `Account locked.` |

## How it goes wrong

Nothing in the app at all for 14 days, three emails to `billing@` that nobody reads, and then on day
15 a full-screen "Your subscription has been cancelled" with a plan grid, no path back to the exact
prior configuration, and — the killer — the user's data behind a wall so they can't even export it to
justify re-subscribing. This flow converts a customer whose card expired into a churned account, and
it is entirely a UI failure.

---

# 9. Seats and proration

## The job

An admin is adding a person who starts Monday. They want to know the cost of that decision, once,
before they commit. The business wants seats added frictionlessly and removed with lag. The honest
resolution is a **preview**: show the exact amount charged today and the exact amount on the next
invoice, before the button is pressed.

## The reference behaviour

Stripe prorates **to the second**, and its docs give the design rule directly:

> *"Because Stripe prorates to the second, prorated amounts might change between the time they're
> previewed and the time the update is made. To avoid this, pass in a
> `subscription_details.proration_date` value when creating a preview [and] pass the same date using
> the `proration_date` parameter."*

So: **pin the proration date when you render the preview, and use the pinned date when you commit.**
A preview that says $41.33 and a charge that says $41.36 is a trust bug, and it is entirely
avoidable.

`proration_behavior` has three values and they map to three product decisions:

| Value | Product meaning |
|---|---|
| `create_prorations` (default) | Adjustments accumulate and appear on the next invoice. Nothing charged today. |
| `always_invoice` | Charge today. Use for upgrades where the user expects immediate access and an immediate charge. |
| `none` | No adjustment. Use for seat *removals* if you don't refund mid-cycle — but then say so. |

Also worth knowing because it changes what the customer sees: Stripe's `billing_mode=flexible`
credits based on the **last price actually billed**, while `classic` credits based on the current
price. In the documented example the same downgrade yields `−$3.34` under classic and `$0.00` under
flexible. If your invoices show a credit for money the customer never paid, that's `classic`.

## The decisions

| Fork | Rule |
|---|---|
| Add a seat: charge now or next invoice? | Charge now (`always_invoice`) if access is immediate. Show the amount before the button. |
| Remove a seat: refund or credit? | Credit against the next invoice is standard and defensible. Say it: `You'll see a $12.44 credit on your 1 October invoice.` Silent no-refund is the thing that generates complaints. |
| Seat count as a number input or a member list? | Both, and they must be the same object. An admin who removes a member from the members list and then finds they're still paying for 12 seats has met the worst version of this flow. |
| Preview placement | Inline, in the same panel, updating as the number changes. Not on a confirmation page. |
| Pending changes | If a downgrade takes effect at period end, show it as a scheduled change with a date and a cancel-the-change action. |
| Viewer/guest seats | If some roles are free (Vercel: `free viewer seats`), the seat editor must show the split: `8 members · 4 free viewers · billing for 8`. |

## The states

| State | Requirement |
|---|---|
| Preview, before commit | `Adding 3 seats · $41.33 charged today · then $192/month from 1 October`. Both numbers. |
| Preview is stale | If the panel has been open past the pinned proration window, re-preview before charging and re-render. |
| Committing | Determinate. Seat additions must not appear to succeed and then roll back. |
| Committed, charged | Confirm the amount and link the invoice. |
| Committed, credit issued | State the credit and where it lands. |
| Scheduled downgrade | `Dropping to 8 seats on 1 October. Undo` |
| Seat added but invite not accepted | Are you billing for it? Say which. Most products bill on invite; most admins assume acceptance. |
| At the plan's seat ceiling | This is a limit-reached state — see section 4. |
| Payment fails on a seat addition | Do not add the seat and then leave it unpaid. Roll back and say so. |

## The mobile version

Seat management is an admin desktop task in practice, but the two things that must work at 390 are:
(1) removing a member — the destructive action people do from a phone after someone leaves — with the
billing consequence stated in the confirmation; and (2) the preview amounts, which must not be
truncated or hidden behind a tooltip.

## Accessibility

- The seat stepper is a `<input type="number">` with a real label, plus optional +/− buttons that are
  real buttons with names (`Add a seat`, `Remove a seat`) — not unlabelled chevrons.
- Amounts that change as the number changes go in `aria-live="polite"`, debounced, so a stepper held
  down doesn't produce 12 announcements.
- The confirm button's accessible name should carry the amount: `Add 3 seats and pay $41.33 now`.

## Copy

| Works | Beats |
|---|---|
| `Adding 3 seats · $41.33 today · $192/month from 1 October` | `Your plan will be updated.` |
| `Unused time on 8 seats after 12 Sep  −$12.44` | `Adjustment` |
| `You'll see a $12.44 credit on your 1 October invoice.` | Nothing, then a smaller charge |
| `Dropping to 8 seats on 1 October. Undo` | An immediate silent downgrade |
| `8 members · 4 free viewers · you're billed for 8` | `12 users` |
| `Removing Sam frees a seat. You'll be credited $12.44.` | `Remove member?` |

## How it goes wrong

A `Seats: [12] [Save]` input with no preview, an unexplained charge appearing an hour later, a
members list that doesn't change the seat count, a removal that silently keeps billing, and a plan
change whose invoice line is a single netted number with no arithmetic.

---

# 10. Downgrade, cancellation, and what the law actually requires

## The job

The user has decided. The business wants one honest chance to fix the reason. Those are compatible
exactly once — a single, skippable, informative step. Everything past that is a dark pattern, and
in three jurisdictions it is now illegal.

## What the law actually requires (as of September 2026)

**United States — federal.** The FTC's 2024 Negative Option Rule ("click-to-cancel") was **vacated
in full by the Eighth Circuit on 8 July 2025**, six days before it was to take effect, on
Administrative Procedure Act grounds (the FTC skipped a required preliminary regulatory analysis
after finding the rule would cost over $100m a year). On **5 March 2026** the FTC issued an Advance
Notice of Proposed Rulemaking to revive it; comments closed **13 April 2026** with roughly 100
submissions, and **no final rule exists as of this writing**. The three principles the FTC has said
the replacement will carry: clear disclosure of material recurring-charge terms before the charge;
express informed consent to the recurring charge itself; and cancellation **"no more difficult than
initiating"** the subscription. Enforcement continues under **ROSCA** and **Section 5 of the FTC
Act** regardless — vacating the rule removed a specific rulebook, not the liability.

**United States — California.** The Automatic Renewal Law as amended by **AB 2863 has been in force
since 1 July 2025** and is stricter than the vacated federal rule. It requires consent to the
**automatic-renewal terms themselves** rather than to an agreement containing them; a prominent
online cancellation path in the **same medium** the customer used to subscribe; renewal reminders;
coverage of free trials; and it specifically regulates "save" attempts during cancellation.

**Germany.** The **Kündigungsbutton** has been mandatory since **July 2022** under **§312k BGB**: a
permanently available, immediately accessible button labelled unambiguously (e.g. *"Verträge hier
kündigen"* — "Cancel contracts here"), with cancellation completable in about **two clicks**.

**EU.** Directive **2023/2673** introduces a mandatory **withdrawal button** ("Widerrufsbutton"),
applying in Germany via a revised **§356a BGB from 19 June 2026**. It must be **permanently visible
throughout the cooling-off period**, follow a **two-step** submission, and trigger an **automatic
confirmation email**. Penalties reach **€2 million or 4% of annual EU turnover**.

**Practical synthesis for a product team:** ship a cancel path that is (1) findable from account
settings without search, (2) completable online without a phone call or an email, (3) no longer than
the signup path, (4) confirmed on screen and by email, and (5) permits exactly one save offer that
can be skipped in one click. That satisfies all four regimes and is also the flow you'd want.

## The reference behaviour

Stripe's customer portal ships cancellation **enabled by default** and exposes exactly two optional
additions, which is the right scope:

**Cancellation reasons** — a selectable subset of this fixed list, verbatim from the docs:

> It's too expensive · I need more features · I found an alternative · I no longer need it ·
> Customer service was less than expected · Ease of use was less than expected · Quality was less
> than expected · Other reason

`Other reason` opens an optional free-text field. Reasons land on the subscription detail page, in
Sigma, and on the `subscription.updated` webhook.

**Deflection** — a single configurable **Retention Coupon** offered at the cancellation step. One
offer. Not a gauntlet.

The design lesson from the reason list: eight options, each a complete sentence in the customer's
voice, mutually exclusive, with an escape hatch. Not "Please tell us why 😢" with a required
textarea.

## The decisions

| Fork | Rule |
|---|---|
| Where does Cancel live? | In billing settings, at the same level as `Change plan`. Not in a footer, not behind "Advanced", not requiring search. |
| How many steps? | Reason (optional, skippable) → one offer (skippable in one click) → confirm. Three screens maximum, and each must have a visible `Cancel my subscription` continuing action. |
| Immediate or period-end? | Default to **period-end** — they paid for the period. Offer immediate as a secondary for people who want out now, and be explicit about whether that refunds. |
| Save offers | One. A discount, a pause, or a plan downgrade — pick the one that matches the stated reason. `It's too expensive` → offer the cheaper plan, not a feature tour. |
| Pause | The highest-value alternative and the least-shipped. `Pause for 3 months` retains more revenue than any discount and is honest. |
| Data | State what happens and when. Export must work after cancellation, during the read-only period. |
| Confirmation | On screen **and** by email, with the end date and the final amount. Germany and the EU both require the email; everyone should send it. |
| Reactivation | One click, restores the prior plan and seat count, for as long as the data exists. |

## The states

| State | Requirement |
|---|---|
| Cancel initiated | Show what they lose, with numbers: `You'll lose access to 4 private teams and SAML on 1 October.` |
| Reason step | Skippable. Radio list, not free text. Free text optional under `Other`. |
| Offer step | One offer, `No thanks, cancel my subscription` as a full-weight (not greyed, not tiny) control. |
| Confirmed, period-end | `Cancelled. You have access until 1 October. Reactivate anytime.` — plus a `Reactivate` button visible on the billing page for the whole remaining period. |
| Confirmed, immediate | State refund status explicitly. `No refund for the remaining 18 days` is legal; silence is not defensible. |
| After the period ends | Read-only, export available, deletion date stated. |
| Cancelled by a non-admin request | Should not be possible. Cancellation is an owner action; requesting it is a member action. |
| Store-billed (App Store / Play) | Detect and deep-link. A cancel button that cannot cancel is worse than no button. |

## The mobile version

- Every step must be completable at 390. The German two-click requirement is measured on whatever
  device the user has.
- The `No thanks, cancel` control on the offer step must be a full-width button of equal visual
  weight to the accept control — not a 12px grey link at the bottom of a sheet. This is precisely the
  pattern CARL's "save attempt" provisions and the FTC's "no more difficult than initiating" test are
  aimed at.
- Confirmation must be visible on screen; do not rely on the email alone on mobile.

## Accessibility

- The cancel flow must be completable by keyboard alone, end to end, with no pointer-only controls.
- The reason list is a `radiogroup` with a real legend.
- The decline-the-offer control must have an accessible name that says what it does
  (`Cancel my subscription`), not `No thanks`.
- Confirmation is `role="status"`, and focus moves to it.
- Do not use a countdown or a delay before the final button becomes clickable. That is a dark pattern
  and, under a "no more difficult than initiating" test, an actionable one.

## Copy

| Works | Beats |
|---|---|
| `Cancel subscription` (as a sibling of `Change plan`) | `Manage subscription` → `Advanced` → `Other options` |
| `It's too expensive` / `I found an alternative` / `I no longer need it` (Stripe's list) | `Tell us why you're leaving 😢` with a required textarea |
| `No thanks, cancel my subscription` (full-weight button) | `I don't want to save 50%` |
| `Cancelled. You have access until 1 October. Reactivate anytime.` | `We're sorry to see you go.` |
| `No refund is issued for the remaining 18 days.` | Silence |
| `Pause for 3 months instead — keep your data, pay nothing.` | `Are you sure? 😭` |
| `We've emailed a confirmation to dan@acme.com.` | Nothing (and, in Germany, non-compliance) |

## How it goes wrong

`Cancel` buried three levels into settings; a five-screen exit interview; a required free-text
"why"; a discount offer whose decline link is 11px grey; a second "are you *really* sure"; a final
confirm button that is disabled for three seconds; a success screen that says "your request has been
received" without saying it's done; no email; and a `Reactivate` that doesn't restore the previous
seat count. Each of those is separately a violation under CARL, separately actionable under FTC Act
§5, and separately a reason the customer will tell the story publicly.

---

# 11. Refunds

## The job

Something went wrong and the customer wants money back. The business wants to know whether it owes
the money and wants the interaction to cost less than the refund. Almost every refund UI failure is
actually a **status-visibility** failure: the refund was issued, the money hasn't appeared, and the
customer opens a second ticket.

## The decisions

| Fork | Rule |
|---|---|
| Self-serve or ticket? | Self-serve for a narrow, stated set (accidental duplicate charge, refund window under N days, a plan bought and cancelled within 24h). Everything else is a ticket, but the ticket must be initiable from the invoice row. |
| Where does it start? | From the invoice row in billing history. `Request a refund` next to `Download PDF`. Not a separate support form where the customer retypes the amount and date. |
| Original method only | Refunds go to the original payment method. Say so up front — the customer whose card is now closed needs to know before, not after. |
| Timing | State the bank's timeline, not yours. `Refunds take 5–10 business days to appear on your statement, depending on your bank.` |
| Partial refunds | Show them as a linked row against the original charge. Never edit the original invoice. |
| Refund vs credit | If you offer account credit as an alternative, both options must be equally prominent and the credit must state its expiry (or that it has none). |

## The states

| State | Requirement |
|---|---|
| Eligible, self-serve | Amount, method, timeline, one button. |
| Not eligible | Say why, with the rule: `This charge is from 14 March, outside our 30-day window.` Then offer the ticket. |
| Requested, pending review | A visible row with a status, not just an email. |
| Issued, not yet settled | **The critical state.** `Refunded $64 on 12 September. Expect it on Visa •••• 4242 within 5–10 business days.` This one string prevents most refund follow-ups. |
| Settled | Status becomes `Refunded`, with the date. |
| Refund failed (closed card) | Explain and offer an alternative (bank transfer, credit). This happens more than teams expect. |
| Partial | Original row plus a linked `Refund −$32.00` row; the invoice total is unchanged. |
| Refund of a subscription mid-period | State what happens to access. Refunding does not automatically cancel; cancelling does not automatically refund. Say which you did. |

## The mobile version

The refund status row is the whole mobile design: date, amount, method, expected-by date, on two
lines. That is the screen people open while looking at their banking app.

## Accessibility

- Status chips carry text (`Refunded`, `Refund pending`), never colour alone.
- The expected-by date must be in the row, not in a tooltip.
- If the refund reason is a required select, it needs a real label and an `Other` with free text.

## Copy

| Works | Beats |
|---|---|
| `Refunded $64 on 12 September. Expect it on Visa •••• 4242 within 5–10 business days.` | `Refund processed.` |
| `Refunds go back to the card you paid with. If that card is closed, tell us and we'll arrange a transfer.` | `Refunds are issued to the original payment method.` |
| `This charge is from 14 March, outside our 30-day window. Contact us if there were extenuating circumstances.` | `Not eligible for refund.` |
| `We refunded your payment. Your subscription is still active until 1 October — cancel it separately if you meant to.` | Refunding and cancelling silently as one action |

## How it goes wrong

A support email address, a customer who retypes an amount and a date the product already knows, a
refund issued with no in-product trace, a bank settling four days later, and two more tickets in
between.

---

# Decision procedures

## Which upgrade surface?

```
Did the user hit a limit while doing something?
├─ Yes → in-context wall. One plan. Preserve the work. Retry the action after payment.
│   └─ Can this user pay?
│       ├─ Yes → wallet-first purchase in place (bottom sheet on mobile)
│       └─ No  → name the admins, one-tap request, confirm the request
└─ No → billing page. All plans, current marked, proration previewed, seats editable.
```

## Which billing-toggle mechanism?

| Situation | Use |
|---|---|
| All paid plans share one billing interval | One global segmented control above the grid |
| Plans have different constraints (annual-only enterprise, free tier) | Per-column control, with the constraint occupying the same slot in non-toggling columns (Linear) |
| Discount rate differs per plan | Global control + `Save up to N%` beside it, whole-dollar prices in columns (Notion) |
| More than one price axis (seat type × interval) | Nest the second axis as rows inside the column (Figma), never as a second global toggle |

## How many plans can sit side by side?

| Plans | Structure |
|---|---|
| 2–3 | Columns, full feature list per column, comparison table optional |
| 4 | Columns only if the longest list is ≤ 9 rows (Linear). Otherwise group into two narrative buckets (Notion) |
| 5+ | Two-bucket grouping plus a mandatory comparison table with a "key features only" default |
| Any, on mobile | Vertical stack, or carousel-with-peek **plus** a `Compare all features` view |

## Proration behaviour by action

| Action | Behaviour | What the user sees before committing |
|---|---|---|
| Upgrade plan, immediate access | `always_invoice` | Amount charged today + new recurring amount + next invoice date |
| Add seats | `always_invoice` | Same |
| Downgrade plan | Schedule at period end | Effective date + new amount + `Undo` |
| Remove seats | `create_prorations` (credit) | Credit amount + which invoice it lands on |
| Change payment method | No proration | Nothing |
| Cancel | Period end by default | End date + whether a refund applies |

## Dunning escalation ladder

| Day (of a 14-day window) | Surface | Tone |
|---|---|---|
| 0 | Amber band, in-app + email | Informational, names the next retry date |
| 1–6 | Same band, date updated | Unchanged |
| 7 | Band + a second email | Names the consequence date |
| 12–13 | Red band, `role="alert"` | Names the consequence and its date |
| 14 | Read-only + export CTA | Reassuring about data, explicit about reactivation |
| Any day, hard decline | Red band immediately, no retry language | `Your bank blocked this card and won't accept retries.` |

---

# The generic version

You can diagnose the thoughtless implementation from a screenshot. It has all of these:

- Three cards, `border-radius: 12–16px`, a soft drop shadow, the middle one scaled up with a
  gradient border and a `Most Popular` ribbon absolutely positioned at the top edge.
- Twelve tick rows per card drawn with the same green check, and feature strings that are category
  nouns with no numbers in them.
- A Monthly/Annual switch labelled `Save 20%`, with no currency label anywhere on the page.
- An Enterprise card containing the words `Custom` and `Contact us` and nothing else.
- No `<table>`, no `<th>`, and check icons with no accessible text.
- A comparison matrix with 47 rows, 40 of which are ✓ in every column, no sticky header, and
  `overflow: hidden` clipping the last column below 1360px.
- On mobile: the desktop grid at 6 columns with the page body scrolling horizontally.
- In-app: a single `Upgrade` button in the sidebar; a limit-reached modal titled `Upgrade to Pro 🚀`
  with a plan grid inside it and no mention of which limit was hit.
- A trial that counts down in days and never states a date; no in-app warning before the first
  charge; no in-app receipt after it.
- A checkout with `First name` / `Last name`, a visible `Address line 2`, a wide `Promo code` box,
  no wallet buttons, tax that appears after the address and moves the total silently, and a decline
  handler that clears the card field.
- Billing history as `Date | Amount | Download`, no line items, no statement descriptor, and an
  in-progress invoice indistinguishable from a final one.
- Failed payment handled entirely by email; on day 15 a full-screen cancellation notice with the
  user's data behind it.
- `Cancel` three levels deep, a five-step exit flow, a required free-text reason, a save offer whose
  decline is an 11px grey link, and a confirmation that says "request received".

Every one of those is a decision nobody made.

---

# Self-check

Run these against your own implementation. Each is verifiable in a browser or a terminal.

**Pricing page**
1. `document.querySelectorAll('table').length` on the comparison section is ≥ 1, and every plan
   column is a `<th scope="col">`.
2. Every tick/cross cell contains text (visually hidden is fine). Search the DOM for `<svg>` whose
   parent has no text content — the count should be 0 in the comparison grid.
3. With JavaScript disabled, prices render at the default billing interval.
4. The currency is named in text on the page.
5. At 400% browser zoom, the page body does not scroll horizontally (WCAG 1.4.10).
6. Toggling monthly/annual produces exactly one screen-reader announcement, not one per column.
7. Every enterprise-column claim is a concrete noun (SAML, SCIM, PO billing), not an adjective.

**Upgrade / limits**
8. Trigger a limit. The message contains the limit name **and** the number used **and** the number
   allowed.
9. Complete the upgrade. The original action completes automatically; you land on the object, not on
   `/settings/billing`.
10. Repeat as a non-admin. You see named admins and a one-tap request, not a dead button.
11. Kill the network mid-upgrade. Reload. Your work is still there.

**Trial**
12. Every trial surface after signup states a **date**, not only a day count.
13. Three days before expiry, an in-app band states the exact charge amount.
14. On expiry day with a card on file, an in-app receipt appears — not only an email.
15. On expiry day with no card, the app is read-only and export works.

**Checkout**
16. Count the visible form fields at first paint. Target ≤ 8 for a guest purchase.
17. There is one `Full name` field, not two.
18. `Address line 2` is behind a disclosure link.
19. The coupon field is collapsed.
20. Billing address defaults to shipping.
21. The tax row is present, with an explanatory value, before an address is entered.
22. Wallet buttons render above the card form.
23. Every field has `autocomplete` set (`cc-number`, `cc-exp`, `cc-csc`, `cc-name`, `postal-code`,
    `email`).
24. Force a decline with `4000 0000 0000 0002`. The card fields retain their values and the message
    names the reason.
25. The pay button is never `disabled`; validation errors appear in a linked summary.
26. At 390×667 with the numeric keypad open, the pay button is visible.

**Invoices**
27. Every history row shows the statement descriptor.
28. A mid-cycle plan change produces at least two named proration lines, not one netted number.
29. The in-progress invoice is labelled with the period it accrues for and its finalisation date.
30. PDF download works without re-authenticating.

**Dunning**
31. Set a subscription to `past_due`. A band appears on every route, on day 1, for admins.
32. Non-admins see a version naming the admins, with no dead action.
33. Simulate `stolen_card`. Retry language disappears; the message says a new method is required.
34. Update the card. The outstanding invoice retries immediately and confirms with an amount.
35. At the end of the window, the app is read-only and export works.

**Seats and proration**
36. Change the seat count. The preview shows *charged today* and *next invoice* as two numbers.
37. The amount previewed equals the amount charged, exactly. (Pin the proration date.)
38. Removing a member from the members list changes the seat count and the preview.

**Cancellation**
39. From a logged-in state, `Cancel subscription` is reachable in the same number of clicks as
    upgrading, without using search.
40. The whole flow completes with the keyboard only.
41. The decline-the-offer control is a full-weight button whose accessible name says
    `Cancel my subscription`.
42. No step has a timed delay or a disabled-then-enabled confirm.
43. A confirmation appears on screen **and** as an email, both stating the end date.
44. `Reactivate` restores the exact prior plan and seat count.
45. If any subscription is billed through an app store, the cancel UI detects it and deep-links.

**Refunds**
46. A refunded charge shows the settlement expectation (`5–10 business days`) and the destination
    method in the row, not in a tooltip.

---

# Sources

**Walked and screenshotted (2026-09-09).** Files are in `.cache/shots/`.

| URL | What I saw | File |
|---|---|---|
| `vercel.com/pricing` | 3 plans, hairline dividers, no card chrome; `$0/$20/Custom` at 56px/450/GeistSans/−3.36px tracking; `Popular` chip inline with plan name; `All Hobby features, plus:` inheritance; unique icon per feature row. Mobile: vertical stack, full cards. | `bpc-vercel-pricing-1440.png`, `-390.png` |
| `linear.app/pricing` | 4 plans; **per-column `Billed yearly` switch**; `Free for everyone` / `Annual billing only` occupy the same slot in the non-toggling columns; no "most popular"; `250 issues` → `Unlimited issues` as adjacent values. | `bpc-linear-pricing-1440.png`, `-390.png` |
| `notion.com/pricing` | 4 plans grouped into 2 narrative cards; `Recommended` chip on Business; CTA **above** the feature list; `Save up to 20% with yearly`; `Price in USD`. Mobile: group headings survive the stack; chat widget occludes the feature list. | `bpc-notion-pricing-1440.png`, `-390.png` |
| `figma.com/pricing` | 4 plans × 3 seat types nested as rows in each column; product-icon strip as the feature matrix; per-column Monthly/Annual; `+3,000 AI credits/mo`; `role="switch"` labelled `Show only key features`. | `bpc-figma-pricing-1440.png`, `-390.png` |
| `shopify.com/pricing` | `Try 3 days free, then $1/month for 3 months`; mobile **carousel with peek**, price on the plan-name line, CTA above features, hairline feature rows, `Compare all features` link. | `bpc-shopify-pricing-1440.png`, `-390.png` |
| `stripe.com/pricing` | Sub-nav pill (`Standard pricing` / `Custom pricing` / `FAQs`); feature grid with hover tooltips carrying numbers (`195 countries`, `135+ currencies`). | `bpc-stripe-pricing-1-1440.png`, `-390.png` |
| `modal.com/pricing` | Usage rate card with a **`Per hour` / `Per second`** segmented control; `$0.001972 / sec`; footnote `*minimum of 0.125 cores per container` under the CPU rate. | `bpc-modal-pricing-1440.png` |
| `platform.openai.com/docs/pricing` | `Standard`/`Batch`/`Flex`/`Fast mode` control; `Short context` / `Long context` column groups over Input / Cached input / Cache writes / Output; `Prices per 1M tokens.` once; dated footnotes; last column clipped at 1440. | `bpc-openai-platpricing-1440.png` |
| `twilio.com/en-us/sms/pricing/us` | Country `<select>` as the first control above all rates; `No credit card required` in the hero. | `bpc-twilio-sms-1440.png` |
| `spotify.com/us/premium/` | Consumer trial: `Try 3 months for $0`, `then $12.99/month. Cancel anytime.`, and the full legal paragraph with eligibility and an offer-expiry date under the CTA. | `bpc-spotify-premium-1440.png`, `-390.png` |
| `checkout.stripe.dev/checkout` | **Live Stripe Checkout.** Total above itemisation; promo as a tag chip with `10% off` sub-label; `Tax ⓘ  Enter address to calculate`; `Total due`; `Hide ⌃`; Apple Pay full-width above an `OR` divider. | `bpc-stripe-hosted-checkout-1440.png`, `-390.png` |
| `checkout.stripe.dev` (configurator) | The complete inventory of Checkout's configurable surface — 13 toggles across Payment setup / Customer details / Advanced options. | `bpc-stripe-co-demo2-1440.png` |
| `docs.stripe.com/customer-management` | Customer portal scope: billing info, payment methods, subscription status, invoice history, plus `Add a cancellation page` and `Retention`. | `bpc-stripe-portal-docs-1440.png` |
| `vercel.com/docs/spend-management` | 50/75/100% thresholds; web/email/SMS; pause-all-projects; `503 DEPLOYMENT_PAUSED`; webhook payload `{budgetAmount,currentSpend,teamId,thresholdPercent}`; the two honest disclosures about non-instant pausing and manual per-project resume. | `bpc-vercel-spend-docs-1440.png` |
| `docs.stripe.com/payments/checkout/pricing-table` | Embeddable pricing table; supported models flat-rate / per-seat / tiered / free trials. | `bpc-stripe-pricingtable-docs-1440.png` |

**Measured from the live DOM (Playwright, 1440px, 2026-09-09):** across vercel.com/pricing,
figma.com/pricing, notion.com/pricing and linear.app/pricing — `<table>`: 0/0/0/0; `role="table"`:
0/1/0/1; `<th>`: 0/0/0/0; `th[scope]`: 0/0/0/0; unlabelled `<svg>` with no sibling text:
294/56/199/281; sticky-positioned elements: 3/3/9/1. Vercel's price token: `font-size: 56px;
font-weight: 450; font-family: GeistSans; letter-spacing: -3.36px`.

**Research and documentation**

- Baymard Institute, *Cart Abandonment Rate* (aggregate of 50 studies) — 70.22% average; the ten
  abandonment reasons and their percentages; 12–14 ideal form elements / 7–8 fields vs. a US average
  of 23.48 elements / 14.88 fields; 35.26% average available conversion uplift; $260bn recoverable.
  <https://baymard.com/lists/cart-abandonment-rate>
- Baymard Institute, *Checkout form field optimization* — 11.3 average fields (2024), 8 achievable
  (−29%); 42% typed full names into "First Name"; 30% hesitated at Address Line 2; adoption gaps of
  89% / 75% / 35% / 24% / 84%; average 5.1 checkout steps.
  <https://baymard.com/blog/checkout-flow-average-form-fields>
- Stripe newsroom, *Businesses using Stripe's newest checkout optimizations saw 10.5% more revenue* —
  Payment Element vs Card Element, 5,000 businesses per arm; Link +14% conversion for large
  returning-customer bases. <https://stripe.com/newsroom/news/payments-revenue-uplift>
- Stripe, *Link by Stripe* — +7% from autofill; ~6-second checkout. Apple Pay: +22.3% conversion and
  +22.5% revenue among eligible checkouts (April 2025). <https://stripe.com/payments/link>
- Stripe docs, *Automate payment retries (Smart Retries)* — recommended default 8 tries in 2 weeks;
  retry windows; payment-method priority order; the nine non-retryable hard decline codes; ACH 2/40
  days, SEPA 2/30; end states `canceled` / `unpaid` / `past_due`.
  <https://docs.stripe.com/billing/revenue-recovery/smart-retries>
- Stripe docs, *Prorations* — the worked −$5/+$10 example; the real line-item strings (`Unused time
  on Silver plan after 01 Sep 2020`, `Remaining time on Gold plan after 01 Sep 2020`, `1 × Gold
  product (at $32.52 / month)`); prorates to the second; the `proration_date` pinning rule;
  `create_prorations` / `always_invoice` / `none`; `billing_mode` classic vs flexible credit
  differences. <https://docs.stripe.com/billing/subscriptions/prorations>
- Stripe docs, *Add a cancellation page to the customer portal* — the eight cancellation reasons
  verbatim; retention coupon deflection; where reasons surface.
  <https://docs.stripe.com/customer-management/cancellation-page>
- Eighth Circuit vacatur of the FTC Negative Option Rule, 8 July 2025 (APA / §22 preliminary
  regulatory analysis grounds) — Morgan Lewis, Mayer Brown, DLA Piper client alerts.
- FTC ANPRM to revive the Click-to-Cancel Rule, 5 March 2026; comments closed 13 April 2026; no final
  rule as of May 2026 — Jones Day, *FTC Revives Click-to-Cancel Rule*.
  <https://www.jonesday.com/en/insights/2026/05/ftc-revives-clicktocancel-rule-new-risks-for-subscription-businesses>
- California Automatic Renewal Law as amended by AB 2863, in force 1 July 2025 — Lowenstein Sandler,
  *FTC Click-to-Cancel Rule on Hold, but California's Automatic Renewal Law Remains Intact*.
- Germany §312k BGB Kündigungsbutton (July 2022) and EU Directive 2023/2673 withdrawal button via
  §356a BGB from 19 June 2026, two-step + confirmation email, penalties to €2m / 4% EU turnover —
  Bird & Bird, Freshfields and ADVANT Beiten notes on the Widerrufsbutton.

**Practitioner complaints** — Hacker News thread on Vercel's pricing page (September 2026,
`news.ycombinator.com/item?id=47967508`), read via the Algolia API:

- *mslev*, on unit opacity: "MIUs are 1 unit = $1, but the rate at which MIU are consumed vary by
  SKU. Which SKUs do you need, which are you using? Best of luck figuring that out. Cache hit? Fast
  Data Transfer. Cache miss? Fast Data Transfer *and* Fast Origin Transfer, so 2x the cost." And:
  "they have an internal quoting tool, Copper… This shows super detailed breakdowns of usage and
  pricing… and would be really useful to see…but of course they couldn't actually share that
  information with us."
- *graypegg*, on missing links: "they SHOULD link to the /limits docs from here."
- *benatkin*, on in-progress invoices: a page titled "March 2026: Monthly Pro Plan" that simultaneously
  said "This invoice will continue updating until the end of your billing period on May 20."
- Reported bill-shock cases circulating alongside the thread: a $23,000 DDoS-driven bandwidth bill,
  a $1,141 bill from a viral post (~50,000 visitors in 24h), a $3,200 student bill. All three had
  24 hours of visible signal before the invoice.

**Not walked, and why:** in-product billing settings, seat editors, dunning banners and cancellation
flows for Linear, Notion, Figma and Shopify are behind authenticated paywalls. Those sections are
built from the vendors' own documentation (Stripe's portal and Billing docs, Vercel's Spend
Management docs) plus the observed public surfaces, and every claim about them is attributed above.
Stripe's embedded Checkout iframe would not render under a headless browser at the default wait; the
live capture required extracting the iframe `src` and loading `checkout.stripe.dev/checkout`
directly.
