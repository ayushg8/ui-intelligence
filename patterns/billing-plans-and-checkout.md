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
| Where does the CTA sit? | **Notion and Shopify put the CTA above the feature list.** Vercel and Linear put it below. | Above wins when the list is longer than about six rows. Notion's Business column has an 11-row list; a below-list CTA there is 900px down. Shopify's mobile card puts `Start for free` directly under the price with all five features beneath it. **Scope:** below wins when the feature list is the argument rather than a reminder — a product whose visitors do not already know what it does, or where one row disqualifies most of them (a region, a compliance certification). Then the list has to be read before the button is worth pressing, and a CTA above it converts people who will churn. |
| Show the discount as a % or as a price? | Notion: `Save up to 20% with yearly` as a separate blue link beside the toggle, prices stay whole-dollar. | "up to 20%" beside the control beats a struck-through monthly price inside every column: one string instead of four, and it survives the plans having different discount rates. **Scope:** show the money instead when the absolute number is the persuasive one — a $2,400/yr plan saving $480 should say `$480`, because 20% of an unknown base is not a number anyone can feel. Percentages win on cheap plans, absolute amounts on expensive ones; the crossover is roughly where the annual saving exceeds a monthly payment. |
| Currency | Notion and Figma both print **`Price in USD`** right-aligned on the toggle row. | Two words that prevent an entire category of support ticket. Nobody else in the set does it. |

**Why most pricing pages are interchangeable.** They are three bordered cards with a drop shadow,
a lifted middle column with a "Most Popular" ribbon, identical tick lists of 5/8/12 rows, and a
monthly/annual switch that says "Save 20%". The template is not wrong; it is *empty*, because no
decision in it was made by this product. The pages above each break it in exactly one place — Vercel by deleting all card chrome and giving every feature its own icon,
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

**What actually changes at 390 (Notion, re-measured 2026-09).** The desktop toggle row is three
things on one line — the `Pay monthly` / `Pay yearly` pill, the `Save up to 20% with yearly` link,
and `Price in USD` right-aligned. At 390 it becomes two rows: the pill goes full-width, then the
discount link sits left and `Price in USD` right beneath it. That is the right collapse and it is
worth naming, because the lazy version drops the currency label entirely at the breakpoint — the one
string on the page that prevents an entire category of support ticket, deleted by a media query.

**Observed mobile failure, Notion at 390 (still present, re-verified 2026-09):** the "Chat with us"
launcher floats over the bottom-right of the feature list and occludes the `Databases including
dependencies, custom properties and more` row. Any fixed support widget must be offset above the
safe area and must not overlap scrollable content on the one page where the user is reading small
print. Screenshot: `.cache/shots/billing-plans-and-checkout-v-6-390.png`.

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
become two decisions: *do I need the AI workspace?* then *which size?* One of the four pages in this
set does it; the other three keep four columns abreast and spend the legibility instead.

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
   freeze — `position: sticky; left: 0` with an opaque background and a right-edge shadow. The
   half-built version has the sticky rule and a transparent background, so plan values scroll
   *under* the feature label and the row becomes unreadable at exactly the moment it is being read.

Do not render a 6-column table at 390 and let the page body scroll sideways. That breaks the whole
document, not just the table.

## Accessibility

This is where the set fails hardest, and it is measurable. Read from the live DOM, 2026-09-09, and
re-run against the same four pages in the 2026-09 review pass — every number below reproduced:

| Page | `<table>` | `role="table"` | `<th>` | `th[scope]` | bare `<svg>` with no label and no sibling text |
|---|---|---|---|---|---|
| vercel.com/pricing | 0 | 0 | 0 | 0 | 294 |
| figma.com/pricing | 0 | 1 | 0 | 0 | 56 |
| notion.com/pricing | 0 | 0 | 0 | 0 | 199 |
| linear.app/pricing | 0 | 1 | 0 | 0 | 281 |

Sticky-positioned elements on the same run: Vercel 3, Figma 3, Linear 1, Notion 10. Figma's one
`role="switch"` carries the accessible name `Show only key features` and nothing else on the page
does — it is the only column-header-adjacent affordance in the set that a screen reader can find.

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

The user is trying to answer a question the pricing page structurally cannot answer — *what will I
actually pay?* — because the answer depends on their behaviour. The business needs the rate card to
be accurate and complete, which makes it long, and needs the headline to be small, which makes the
rate card feel like a trap.

The failure mode is specific: the headline unit and the billed unit are different, and the
conversion between them is not published. From the September 2026 Hacker News thread on Vercel's
pricing, a customer who had just been on a contract call:

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
0.125 cores per container`**, and under Volumes, `*includes 1 TiB / mo free`. The constraint that
changes your bill is disclosed at the rate, not in an FAQ.

The one thing to *not* copy: Modal's default segment is **`Per second`**, so a first-time visitor
lands on `$0.0000131 / core / sec` — the billing unit, which is the unreadable one. Ship the toggle;
default it to the unit a human can compare (`Per hour`, `$0.047 / core / hr`), and let the person
reconciling an invoice switch to the other.

**OpenAI, `platform.openai.com/docs/pricing` — the axis segmented control.** Four modes across the
top (`Standard` / `Batch` / `Flex` / `Fast mode`), then a table whose columns are grouped under two
spanning headers, `Short context` and `Long context`, each with `Input`, `Cached input`,
`Cache writes`, `Output`. The unit is stated once, in prose, above the table: **`Prices per 1M
tokens.`** The two groups are not a 2× uplift across the board and the grid is what makes that
visible: on `gpt-5.6-sol`, input goes $4.00 → $8.00 (2×) while output goes $20.00 → $30.00 (1.5×).
Putting the second axis in a column group rather than in duplicate rows is what keeps a 4-model ×
8-price grid readable. Under the table, two dated prose lines carry the volatility the grid can't:
`Priority processing was renamed Fast mode on July 30, 2026.` and `GPT-5.6 Sol's promotional pricing
is available at least through November 21, 2026.` (both re-read live 2026-09-09).

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
| Rate card completeness | Every SKU that can appear on an invoice must appear on the pricing page under the same name it will have on the invoice. Test: take last month's invoice, and find every line on the public pricing page by string match. Vercel's HN thread is what failing that test looks like — `Fast Data Transfer` and `Fast Origin Transfer` bill together on a cache miss and the page does not say so. |

## The states — this is most of the work

Usage-based pricing is not really a pricing-page problem; it is an **in-product metering UI**
problem. The pricing page is read before purchase; the usage dashboard is read on every invoice, and
it is the only surface that can catch a bill before it is charged.

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
| Rate-limited or quota-exhausted mid-request | A metered API that streams has to fail *inside a response the client is already reading*. The 429 body must carry which limit (requests, tokens, concurrency), the reset time as an absolute timestamp, and whether the partial work is billed. In-product, the same event needs a row in the usage view within the lag window — a developer who sees 429s in their logs and a green usage dashboard stops trusting the dashboard. |
| Cap raised while paused | Vercel's disclosure is the rule: raising the cap does not unpause. Whatever your equivalent is, state the resume as a separate, explicit, per-resource action or make it automatic and say which. |

## The mobile version

**Measured at 390 on `modal.com/pricing`, 2026-09.** The rate card itself survives the phone: it is
already a two-column list (`Nvidia B300` left, `$0.001972 / sec` right) and it reflows without a
scroller. Two things break, and both are the reference implementation failing its own rule:

1. **The `Per hour` / `Per second` control scrolls away.** It sits inline in the `Resource costs`
   header row and is not sticky. One screen of scrolling puts eleven GPU rows on screen with no
   visible unit control and no repeated unit label in the section header — the `/ sec` suffix on
   each row is the only surviving evidence of which mode you are in.
2. **The sticky nav pill covers two rate rows.** Modal's floating rounded header overlays the list
   as you scroll; at 390 it sits on top of the `Nvidia B200` and `Nvidia A100, 80 GB` rows, hiding
   both the name and the price. A sticky chrome element over a list of numbers is worse than over a
   list of prose: there is no partial word to infer from.

So the rules:

- Never render a 9-column rate table at 390. Collapse to a per-item card: resource name as the row
  title, unit price right-aligned, secondary units on a second line.
- The unit toggle must remain visible while scrolling the rate list — sticky at the top of the list
  container, *and* offset below any sticky app chrome, tested by actually scrolling.
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
Diagnostic: if the first time a customer learns a number is on the invoice, every one of the six
states above is missing.

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
   the specific number. Offers exactly one plan — **the cheapest plan that actually raises *this*
   limit**, which is not always the next one up — with its price and the number the limit becomes.
   Getting this wrong is a specific, common bug: SAML and audit logs are usually Enterprise-only, so
   a member who hits the SSO wall and is offered "Business, $16/seat" upgrades and hits the same
   wall. If the plan you offer does not clear the limit that produced the wall, you have sold a
   support ticket. Has a secondary escape that is not "cancel": *"Remove a member instead"*,
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
| Block, or allow-and-warn? | Warn at 80%, warn harder at 100%, block only on the action that would exceed a *hard* limit (billable capacity, licence count). Never block retroactively — data already created above a limit stays readable. **Scope:** this is a rule about *monetised* limits. An abuse or safety rate limit is not an upgrade moment; selling a higher tier at the throttle teaches abusers the price of the throttle. Those get a plain 429 with a reset time and no CTA. |
| Modal or inline? | Inline if the limit is on one field (a file too large → a band under the uploader). Modal only if the action was destructive-adjacent or the whole workspace is affected (seat limit on invite). A modal over a half-written document is the worst option and the most common. |
| Who can upgrade? | In any product with an admin/member split, the wall is usually hit by someone without the billing role — they are the ones doing the work that hits limits. The permission wall is the real state: name the admins by name, and give a one-tap `Ask Priya to upgrade` that sends a request containing what the requester was trying to do. Single-seat consumer products can skip this whole branch. |
| One plan or all plans? | One. The user is mid-task. A four-column grid inside a modal is a context switch. |
| What happens after? | Return to the exact action, and **retry it automatically**. The upload resumes; the invite sends; the issue is created. If the user has to redo the action, the flow failed. |
| Attribution | The upgrade record should carry the triggering limit and the number at the time. Without it, "which limit converts" is unanswerable from billing data alone, and the plan boundary gets moved on argument rather than evidence. |

## The states

| State | Requirement |
|---|---|
| Approaching (80%) | Ambient, dismissible, never blocking. `8 of 10 seats used`. |
| At the limit, user can pay | The purchase surface described above. |
| At the limit, user cannot pay | Named admins + request-to-upgrade. Requesting must be one action and must confirm ("Request sent to Priya and Dan"). |
| Requested, awaiting approval | Show the pending state on the wall itself, with the request time. Do not let them re-request into a loop. |
| Payment in flight | The upgrade button must go to a determinate busy state and the underlying action must not be lost if the tab closes. |
| Payment failed at the wall | The worst state in the flow. Keep the work, keep the wall, show the decline reason in human words, offer a different payment method. |
| Session expired while the wall was open | The wall is often open for minutes while someone finds a card. Re-authentication must happen *without* unmounting the wall or losing the in-escrow work: authenticate in a popup or a nested step, then continue. A redirect to `/login` that returns to the app root destroys the draft and the purchase in one move. |
| Paid, entitlement not yet propagated | Payment confirmation and entitlement are different systems and the second one lags — typically the webhook round trip. The wall must poll for the entitlement, not for the payment, and must say `Payment confirmed. Unlocking your workspace…` with a bounded wait and a fallback (`Still working — we'll email you within a minute, your payment is safe`). Retrying the blocked action against a stale entitlement produces a second wall immediately after paying, which reads as being charged for nothing. |
| Upgraded, limit raised | Confirm the new limit numerically (`Now 50 seats`), then get out of the way. |
| Downgraded back below the limit | Over-limit content becomes read-only, never deleted, with an explicit count: `12 issues above your Free limit are read-only.` |

## The mobile version

- The wall is a **bottom sheet**, not a centred modal. It reaches the thumb, it doesn't cover the
  content the user is trying to keep in view, and it can be dragged to peek at what's behind.
- Show the price and the one CTA above the fold of the sheet. Feature lists go below the fold.
- The wallet button (Apple Pay / Google Pay) belongs at the top of the sheet: on mobile it converts a
  three-screen card entry into one biometric confirmation (numbers in §6). It must render
  conditionally — on a device where no wallet is available, an empty slot above an `OR` divider is
  worse than no divider.
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
payment method on file, because a card on file converts the trial by default instead of requiring a
second decision — and wants a large top of funnel, which the card suppresses. (The direction is not
in dispute; the published magnitudes are vendor benchmarks, not measurements, so no number is quoted
here.) These genuinely conflict; the honest resolutions are (a) pick one and be loud about it, and
(b) whichever you pick, make the end date unmissable.

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
| Trial of the top plan, or of the plan they picked? | Trial the plan they picked, and say what they're missing. A trial of Enterprise that silently downgrades to Starter on day 15 produces a feature-loss support ticket, not a conversion. **Scope:** invert this when one gated feature decides whether the product works at all for that buyer — SSO, an admin API, a data-residency region. If evaluation is impossible without it, trial the tier that has it and say the trial tier is above what they picked, with the day-15 difference named in advance. |
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
- If the trial requires a card, use the wallet path: Apple Pay / Google Pay at the top of the sheet
  (numbers in §6).
- iOS/Android app-store trials have their own legally-mandated strings and their own cancellation
  path (Settings → Subscriptions). If you sell both ways, the in-app cancel UI must detect the
  store-billed case and deep-link to it rather than showing a cancel button that cannot work.

**Measured at 390 on `spotify.com/us/premium/`, 2026-09.** The material-terms paragraph — *"Premium
Individual only. Free for 3 months, then $12.99 per month after… Offer ends September 23, 2026."* —
is the last element above the fold, in the smallest type on the screen, and Spotify's floating
audio-player control sits on top of its bottom-right corner. A locale interstitial (`Estados Unidos
(Español)`) takes the top ~100px, pushing everything down. Two lessons: the disclosure that has to
be *"in a manner they can actually notice and understand before they are charged"* is the element
your fixed overlays will land on, because it is the one at the bottom; and a locale or cookie band
at the top of a 390 viewport moves the fold by 12%, so test the disclosure's position with those
bands present, not on your dismissed-everything dev machine.

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

The user wants to be finished. The business needs a payment method, a billing address for tax, and —
for subscriptions — consent to recurring charges that will hold up in a chargeback. The measurable
version of "helping them finish" is field count: Baymard's average US checkout is 11.3 fields
against an achievable 8, and users judge complexity by fields on screen rather than by step count.
Anything on the page that is not a field, the total, or a wallet button is being paid for out of
that budget.

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

**Stripe Checkout**, walked live at `checkout.stripe.dev/checkout` on 2026-09-09 and re-walked
2026-09 for this pass; every string below is unchanged. The demo's default configuration produces
this screen — `One-time payment`, `Promotion codes`, `Calculate tax` and `Shipping address` on;
`Recurring payment`, `Phone`, `Billing address`, `Shipping options`, `Save payment details`, `Tax ID
or VAT`, `Terms of service`, `Custom fields`, `Suggest product` off; `Button text: Pay`. Change any
of those and the page below changes; the inventory is the point. In order down the page:

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
8. **Apple Pay, full width, black, above an `OR` divider**, then the form. Note what this costs to
   copy honestly: the demo advertises a wallet unconditionally, but a real Checkout renders the
   button only where the browser reports a usable wallet. Your implementation needs the
   availability check to gate the button **and** the divider, or the majority of desktop buyers get
   an `OR` with nothing above it.

Mobile (390) is the same document with the summary expanded by default and `Hide` available; the
Apple Pay button lands at ~650 CSS px, inside a 390×844 fold but below a 390×667 one. `Shipping
information` is the first form heading and it is already below the fold on the smaller device —
which is the correct trade, because the summary is what prevents the 40%-of-abandonment category.

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
| Guest checkout? | Yes, and offer account creation **after** payment on the confirmation screen. **Scope:** this is a one-time-commerce rule. For a subscription the account *is* the thing being bought — there is nothing to deliver to a guest — so the correct version is "collect an email and nothing else at checkout, set the password after payment". A B2B checkout that must bind the purchase to an existing workspace has no guest branch at all; it has a workspace picker. | Forced account creation is **18%** of abandonment; **84%** of sites don't defer it. |
| One page or several? | Fields matter more than steps. If you must split, put payment last and never re-ask a field. | Average 5.1 steps; complexity judged by fields. |
| Name: one field or two? | One `Full name`. **Scope:** split only where a downstream system requires the split and will reject a guess — airline and rail ticketing (name must match travel document), some AVS/3-DS issuer checks, KYC. If you must split, label them `Given name` / `Family name`, not `First` / `Last`, and never assume the order. | **42%** of test users typed a full name into "First name"; **89%** of sites still split it. |
| Address line 2 | Hide behind a link (`+ Apartment, suite, etc.`). | **30%** of participants hesitated at it; **75%** of sites don't hide it. |
| Billing address | Default to "same as shipping", checkbox to differ. | **24%** of sites don't default it. |
| Coupon field | Collapse it behind a link; never a wide empty box labelled "Promo code". | **35%** of sites don't collapse it. An open coupon field sends users out of checkout to hunt for a code. |
| Wallets | Above the form, above the fold, above an `OR` divider — **rendered conditionally on availability**, divider included. A Chrome-on-Windows buyer seeing an `OR` with blank space above it has been shown a broken page. **Scope:** in an invoice/PO/ACH B2B checkout, wallets are noise; the top slot belongs to `Pay by invoice`. | Apple Pay +22.3% conversion on eligible checkouts. |
| Card fields | Use the provider's unified element (Payment Element / equivalent), not a hand-rolled card form. | +10.5% revenue vs. the older single-card element, n=5,000 per arm. |
| Tax display | Render the row before you can fill it. | 40% + 12% of abandonment is "cost appeared late". |
| Validation | On blur, not on keystroke, and never only on submit. Never wipe the card field on a decline. | Card declined is **10%** of abandonment; a decline that clears the form converts a retry into an exit. |
| Terms/consent for subscriptions | Explicit, adjacent to the pay button, stating amount + interval + how to cancel. | CARL (as amended, in force 1 July 2025) requires consent to the auto-renewal terms *themselves*, not to an agreement containing them. |
| Disable the pay button? | Never *before* submit (see Accessibility). Always *after* submit, for the duration of the in-flight request, paired with a client-side idempotency key — the two rules are about different moments and people conflate them into "never disable", which is how double charges happen. | Card declined is 10% of abandonment; a double charge is a chargeback. |

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
| Wallet unavailable | No wallet button, no `OR` divider, no empty slot. Decide this before first paint, not after a flash. |
| Paid, confirmation not yet received | The payment succeeded and your webhook has not landed. Show `Payment received. Setting up your account…` with a bounded poll and an email fallback, never a generic spinner and never a second pay button. This is the same failure as the entitlement lag in §4 and it needs the same treatment. |
| Off-session SCA on a renewal | `authentication_required` on a stored card is a hard decline that no retry can clear (§8). The in-app version is not "payment failed" — it is `Your bank needs you to confirm this payment`, with a button that re-opens the challenge. Treating it as a decline sends the customer to replace a card that works. |
| Zero-amount (100% coupon, trial) | The pay button must not say "Pay $0". Say `Start trial` or `Confirm`. Stripe exposes `Button text` as a configuration for exactly this reason. |

## The mobile version

- Wallet first. On mobile this converts card entry to a biometric tap.
- The order summary starts **expanded** with a `Hide` control (Stripe's choice) rather than collapsed
  with `Show` — a collapsed summary is where the "extra costs" abandonment happens.
- Card number field: `inputmode="numeric"`, `autocomplete="cc-number"`, `pattern="[0-9\s]*"`. Expiry
  `cc-exp`, CVC `cc-csc`, name `cc-name`, postal `postal-code`. These are what let iOS and Android
  offer the saved-card and scan-card sheets; without them the buyer types sixteen digits from a
  physical card. It is a one-line change per field and there is no counter-argument.
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
| Statement descriptor | Show it in the app, on the row: `Appears as ACME*SUBSCRIPTION on your statement`. It is the only string that lets a customer match a bank line to your product without contacting you, and card networks treat "unrecognised charge" as a dispute reason in its own right. It costs one field from your payment provider. |
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

The customer usually doesn't know anything is wrong — the card expired, the bank flagged a foreign
transaction, the corporate card rotated. The business wants the money and wants to not churn a happy
customer over an expiry date. There is **no conflict here at all**, which is the whole point: this
is the only flow in this document where the user's interest and the business's interest are
identical, and it is still the one most often shipped as three emails and nothing in the product.

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
| `authentication_required` | Technically a hard decline, but the fix is not a new card — it is the cardholder completing a challenge. Its own band, its own copy (`Your bank needs you to confirm this payment`), and a button that opens the challenge rather than the card form. Lumping it in with `stolen_card` sends a customer to replace a perfectly good card. |
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
| Add a seat: charge now or next invoice? | Charge now (`always_invoice`) if access is immediate. Show the amount before the button. **Scope:** wrong for invoice/PO customers on net terms, where every mid-term charge needs a purchase order and an out-of-band charge is an accounts-payable incident. For those accounts, accumulate prorations onto the next invoice (`create_prorations`) and show the running adjustment in the seat editor instead of a charge. Decide by billing method, not by plan name. |
| Remove a seat: refund or credit? | Credit against the next invoice is standard and defensible in B2B. Say it: `You'll see a $12.44 credit on your 1 October invoice.` Silent no-refund is the thing that generates complaints. **Scope:** a credit against a *next* invoice is worth nothing to a customer who is also cancelling, and consumer-facing subscriptions in some jurisdictions owe a pro-rata refund rather than a credit. If the same action can be a downgrade or an exit, ask which. |
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
| Seat added but invite not accepted | Are you billing for it? Say which, on the seat editor, in words: `Billing starts when the invite is sent` or `…when it's accepted`. Seat-based billing on a Stripe-style quantity bills the moment the quantity increases, which is on invite — admins reliably assume acceptance. |
| Invite revoked or expired before acceptance | The seat must come back, and the credit or the un-charge must be visible in the same interaction that revoked the invite: `Invite to sam@acme.com revoked. Seat released — you'll see a $9.31 credit on your 1 October invoice.` The silent version leaves an admin paying for a person who never existed, and it is invisible because there is no member row to notice. Expiry is the same event with no human triggering it, so it needs the same accounting and an email. |
| Invite accepted after the plan already downgraded | Decide and state it: does acceptance fail, or does it push the workspace over the seat ceiling and trigger §4? Failing silently at accept time gives the *invitee* an error for the admin's billing state. |
| At the plan's seat ceiling | This is a limit-reached state — see section 4. |
| Payment fails on a seat addition | Do not add the seat and then leave it unpaid. Roll back and say so. |

## The mobile version

Seat management is mostly a desktop task, with two exceptions that are both time-sensitive and
therefore phone-shaped: **offboarding** (someone left this morning; removing them is done from a
phone, and the billing consequence has to be in the confirmation, not discovered later) and
**approving a seat request** (§4's `Ask Priya to upgrade` lands as a push notification, so the
approve path must be completable at 390 including the preview amounts — which must not be truncated
or hidden behind a tooltip). Everything else, including the full seat matrix, can be desktop-only.
**Scope:** invert this for products sold to field or shift managers, where the roster changes daily
from a phone and seat editing is the primary billing surface.

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
| Immediate or period-end? | Default to **period-end** — they paid for the period. Offer immediate as a secondary for people who want out now, and be explicit about whether that refunds. **Scope:** invert for usage-based or hybrid pricing, where staying active until period end keeps *accruing* charges. There, "cancel" defaulting to period-end can hand someone a bill after they cancelled, which is the worst possible last interaction. Default to immediate, and say what happens to work in flight. |
| Save offers | One. A discount, a pause, or a plan downgrade — pick the one that matches the stated reason. `It's too expensive` → offer the cheaper plan, not a feature tour. |
| Pause | The honest alternative, and rare. `Pause for 3 months` keeps the account and does not require permanently discounting it. **Scope:** pause is wrong where the product's value is a continuous record — monitoring, uptime checks, analytics, backups, security scanning. A three-month hole in the data makes the product less useful on return than it was at cancellation, so pausing manufactures the churn it was meant to prevent. Those products should offer a cheaper retention tier that keeps collecting, not a pause. |
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
the money and wants the interaction to cost less than the refund. The structural failure is
**status visibility**: card refunds settle in days, not immediately, so between "we refunded you"
and the money appearing there is a multi-day window in which the customer has no evidence anything
happened. Every ticket in that window is caused by a missing string, not a missing refund.

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
| Issued, not yet settled | **The critical state**, and the one the whole section exists for. `Refunded $64 on 12 September. Expect it on Visa •••• 4242 within 5–10 business days.` It converts a multi-day silence into a stated wait. |
| Settled | Status becomes `Refunded`, with the date. |
| Refund failed (closed card) | Explain and offer an alternative (bank transfer, credit). A refund to a card cancelled since the charge can bounce back weeks later, by which point the customer has stopped watching — so this state has to generate an email, not only a row. |
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

---

# 12. The failure states that cross every flow

Sections 1–11 each list the states of one flow. These are the ones that belong to no flow and break
all of them, and they are the reason billing bugs get reported as "it charged me twice" rather than
as a named state. Each is a distributed-systems fact with a UI consequence.

## The gap between "paid" and "entitled"

Payment confirmation and entitlement live in different systems, and the second one lags the first by
a webhook round trip. Every purchase surface in this document has this seam: the upgrade wall (§4),
checkout (§6), the seat editor (§9), the trial's first charge (§5).

| | |
|---|---|
| **Never** | Poll the payment. It succeeded; polling it tells you nothing you need. |
| **Always** | Poll the entitlement, bounded (say 10s), with a stated fallback: `Payment confirmed. Unlocking your workspace…` → `Still working — we'll email you the moment it's ready. Your payment went through.` |
| **Never** | Re-run the blocked action against a stale entitlement. A second wall immediately after paying reads as being charged for nothing — the user has a card statement and a locked feature at the same time, which is the exact shape of a chargeback. |
| **Never** | Show a second pay button while the first payment is unresolved. |
| **Always** | Make the success state idempotent — a reload during the gap must not start a second purchase. |

## Session and auth expiry mid-action

Every one of these flows has a step where the user leaves the keyboard: finding a card, asking an
admin, reading a legal paragraph. Sessions expire in that gap.

- **Re-authenticate in place.** A popup or a nested step that returns to the exact surface. A
  full-page redirect to `/login` that lands on the app root destroys both the in-escrow work (§4)
  and the purchase intent in one move.
- **Never 404 an expired checkout session.** Re-create it with the cart intact and say so (§6).
- **Never require re-auth to download an invoice PDF** (§7) — the finance person opening it is
  following an emailed link, weeks later, on a different device.
- **Warn before you expire.** WCAG 2.2.1: two minutes' notice and a way to extend. A payment form
  that silently expires while a card is being fetched from a wallet is the version everyone ships.

## Provider outage and webhook loss

Your billing provider will be down or slow while someone is trying to pay.

| Symptom | What the UI must do |
|---|---|
| Payment intent creation fails | Say it is your side, not their card: `We couldn't reach our payment processor. Nothing was charged. Try again in a moment.` Never `Payment failed` — that sends them to their bank. |
| Webhook never arrives | The entitlement gap above, escalated: a support-visible state and an email, not an indefinite spinner. |
| Provider degraded mid-dunning | Do not escalate the band on a retry that never executed. Retry-count-driven UI must read the retry *result*, not the schedule. |
| Usage meter ingestion stalled | Show the lag explicitly (`Usage through Sep 8, 23:00 UTC`, §3). A projection computed on stalled data is worse than no projection. |

## Rate limits, throttles and metered streams

Distinct from spend caps (§3), and the distinction is the whole design.

- A **spend cap** is a commercial limit the customer set. Hitting it is an upgrade or a
  raise-the-cap moment, and the copy is about money.
- A **rate limit** is an operational or abuse limit you set. Hitting it is not a sales opportunity;
  selling a higher tier at an abuse throttle prices the abuse. The copy is about time: which limit,
  the reset as an absolute timestamp, and whether partial work was billed.
- A limit hit **mid-stream** has to fail inside a response the client is already consuming. Ship the
  reason in the stream, not only in a header nobody reads, and make the partial-billing answer
  explicit — "you were charged for the tokens you received" is fine; silence is not.

## Two people acting at once

Billing state is shared and admins act in parallel.

- Two admins editing seats: the second commit must re-preview against current state, not apply a
  stale delta. This is the same pinning problem as `proration_date` (§9), one layer up.
- One admin cancels while another upgrades: last write wins is not an answer the customer can read.
  Show the resulting state and who changed it, in billing history.
- A member accepts an invite as the workspace crosses its seat ceiling: decide whether acceptance
  fails or the workspace goes over, and never surface the admin's billing state as an error to the
  invitee.

## Dates, clocks and renewals

- Every renewal, trial-end and finalisation date the user sees must carry a timezone or be rendered
  in theirs. `Your trial ends Friday 26 September` is a promise; if it ends at 00:00 UTC that is
  Thursday evening for a US customer and the charge lands a day "early".
- Monthly anniversaries on the 29th, 30th and 31st. State the rule you use in the billing page, once.
- A card that expires *between* the failure and the last retry (§8) is a common real case: the retry
  schedule outlives the card. Detect it and switch to hard-decline copy early rather than promising
  eight attempts that cannot succeed.

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


## Where these rules break

Every fork above has a product where the recommended branch is wrong. The scope is part of the rule;
a decision procedure that never loses is a decision procedure nobody tested.

| Rule | A product where it is wrong | The scoped version |
|---|---|---|
| The limit-reached state is the upgrade page (§4) | An API throttle that exists to stop scrapers. Offering an upgrade at the throttle publishes the price of the abuse. | Only for limits you are willing to sell more of. Operational and abuse limits get a 429 with a reset time and no CTA. |
| Offer the next plan up at the wall | SSO is Enterprise-only; the wall offers Business; the user pays and hits the same wall. | Offer the cheapest plan that raises *this specific* limit, computed from the entitlement, not from the plan ladder. |
| Guest checkout, account after payment (§6) | A subscription. There is no product to deliver to a guest — the account *is* the purchase. | One-time commerce only. For subscriptions: email at checkout, password after payment. For B2B: a workspace picker, no guest branch. |
| One `Full name` field (§6) | Air travel, rail, KYC — the name must match a document and a wrong split is rejected downstream. | Split only when a downstream system will reject a guess, and label `Given name` / `Family name`. |
| Wallets above the form (§6) | A B2B checkout billed by invoice on net-30 terms; nobody is paying $40k with Apple Pay. | Conditional on availability *and* on the buying motion. For invoiced B2B the top slot is `Pay by invoice`. |
| Never disable the pay button (§6) | Any checkout without idempotency, where an impatient second click double-charges. | Never disable *before* submit. Always disable *during* the in-flight request, with an idempotency key behind it. |
| Charge seat additions immediately (§9) | An enterprise on PO and net terms, where an unexpected card charge is an accounts-payable incident. | Decide by billing method: `always_invoice` for self-serve card accounts, `create_prorations` for invoiced accounts. |
| Credit seat removals to the next invoice (§9) | A customer who is removing seats *because* they are leaving. A credit on an invoice that will never be issued is worth zero. | Ask whether this is a downgrade or an exit, and refund pro-rata for consumer subscriptions where the jurisdiction requires it. |
| Cancel defaults to period-end (§10) | Usage-based pricing. Remaining active until period end keeps accruing charges, so the "generous" default bills someone after they cancelled. | Default to immediate wherever remaining active can increase the bill; state what happens to in-flight work. |
| Offer a pause instead of a cancel (§10) | Monitoring, uptime, analytics, backups. A three-month gap in the record makes the product less useful on return than at cancellation. | For continuous-record products, offer a cheaper tier that keeps collecting, never a pause. |
| Trial the plan they picked (§5) | An enterprise buyer evaluating a product they cannot connect to their IdP without the Enterprise-only SSO. | Trial the tier containing the feature that decides whether evaluation is possible, and name the day-15 difference in advance. |
| Show the discount as a percentage (§1) | A $2,400/yr plan. "Save 20%" of an unknown base is not a number anyone can feel. | Percentages on cheap plans, absolute amounts once the annual saving exceeds a monthly payment. |
| CTA above the feature list (§1) | A product whose visitors don't yet know what it does, or where one row (a region, a certification) disqualifies most of them. | Above when the list is a reminder; below when the list is the argument. |
| Group four plans into two buckets (§2) | Four plans on one ladder for one buyer, where the "two decisions" framing invents a distinction that isn't there. | Group only when two plans genuinely serve different buyers. Otherwise keep them abreast and shorten the lists. |
| The seat editor is a desktop surface (§9) | Field-service and shift-work products, where the roster changes daily and the manager only has a phone. | Desktop-first only when headcount changes monthly. Phone-first when it changes daily. |

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

**Cross-flow failures (§12)**
47. Block the entitlement webhook and complete a purchase. The UI polls the *entitlement*, states
    `Payment confirmed`, bounds the wait, and offers an email fallback — no infinite spinner, no
    second pay button.
48. Reload during that gap. No second charge is started.
49. Expire the session with the upgrade wall open, then pay. Re-auth happens in place and the
    in-escrow work survives.
50. Make the payment provider unreachable at intent creation. The message says nothing was charged
    and blames your side, not the card.
51. Trigger a metered rate limit mid-stream. The 429 names the limit, gives an absolute reset time,
    and states whether partial work was billed. It does *not* offer an upgrade if it is an abuse
    limit.
52. Open the seat editor in two tabs and commit both. The second re-previews rather than applying a
    stale delta.
53. Revoke a pending invite. The seat is released and the credit is stated in the same interaction.
54. Set a renewal date to the 31st and advance a month. The billing page states the rule it used.
55. Render every user-visible billing date in the viewer's timezone, or with an explicit one.
56. Simulate `authentication_required` on a renewal. The band says the bank needs confirmation and
    opens the challenge — it does not ask for a new card.

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

**Re-verified in the 2026-09 review pass.** Screenshots
`.cache/shots/billing-plans-and-checkout-v-1…v-8-{1440,390}.png`:

| Claim re-checked | Result |
|---|---|
| Stripe Checkout: total above itemisation, `SAVE10` tag chip with `10% off` sub-label, `Tax ⓘ Enter address to calculate`, `Total due`, `Hide ⌃`, Apple Pay above an `OR` divider; 13 toggles + one `Button text` select | Confirmed, string for string, at 1440 and 390 (`v-1`) |
| Vercel: `$0` / `$20` / `Custom`, `Popular` chip inline with `Pro`, `All Hobby features, plus:`, a distinct icon per feature row, hairline dividers, CTA below the list | Confirmed; mobile is a vertical stack in source order (`v-2`) |
| Linear: per-column `Billed yearly` switch, `Free for everyone` and `Annual billing only` in that same slot, `250 issues` → `Unlimited issues`, Enterprise column of concrete nouns, no "most popular" | Confirmed; longest column list is 9 rows (`v-3`) |
| Spotify: `Try 3 months of Premium Individual for $0, then $12.99/month. Cancel anytime.` plus the full material-terms paragraph ending `Offer ends September 23, 2026.` | Confirmed verbatim (`v-4`) |
| Modal: `Per hour` / `Per second` control, `$0.001972 / sec`, `$0.0000131 / core / sec`, `$0.00000222 / GiB / sec`, `*minimum of 0.125 cores per container` | Confirmed. **New:** the default segment is `Per second`, and at 390 the control scrolls away while the sticky nav pill covers two rate rows (`v-5`, `v-7`) |
| Notion: `Pay monthly` / `Pay yearly` pill defaulting to yearly, `Save up to 20% with yearly`, `Price in USD`, two narrative cards, `Recommended` on Business, CTA above the list | Confirmed; the chat widget still occludes the feature list at 390 (`v-6`) |
| OpenAI: `Standard`/`Batch`/`Flex`/`Fast mode`, `Short context` / `Long context` column groups, `Prices per 1M tokens.`, the two dated prose footnotes, last column clipped at 1440 | Confirmed. **Corrected:** the two groups are not a uniform 2× — on `gpt-5.6-sol`, input doubles ($4.00→$8.00) and output rises 1.5× ($20.00→$30.00) (`v-8`) |
| The four-page accessibility measurement below | Re-run 2026-09; `<table>` 0/0/0/0, `<th>` 0/0/0/0, bare `<svg>` 294/56/199/281 all reproduced exactly. Notion's sticky count drifted 9 → 10 |

**Measured from the live DOM (Playwright, 1440px, 2026-09-09):** across vercel.com/pricing,
figma.com/pricing, notion.com/pricing and linear.app/pricing — `<table>`: 0/0/0/0; `role="table"`:
0/1/0/1; `<th>`: 0/0/0/0; `th[scope]`: 0/0/0/0; unlabelled `<svg>` with no sibling text:
294/56/199/281; sticky-positioned elements: 3/3/9/1. Vercel's price token: `font-size: 56px;
font-weight: 450; font-family: GeistSans; letter-spacing: -3.36px`.

**Research and documentation**

- Baymard Institute, *Cart Abandonment Rate* (aggregate of 50 studies) — 70.22% average; the ten
  abandonment reasons and their percentages; 35.26% average available conversion uplift; $260bn
  recoverable. <https://baymard.com/lists/cart-abandonment-rate>
  *Note on the field counts:* two Baymard figures circulate and this file uses the newer one. The
  older benchmark is 23.48 form **elements** / 14.88 **fields** for an average US checkout against a
  12–14 element / 7–8 field ideal; the 2024 measurement in the checkout-form-field study is 11.3
  fields average against 8 achievable. Elements and fields are not the same unit — a state
  `<select>` and its label are elements — so do not mix the two series.
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


---

## Review pass (2026-09)

Adversarial pass over the whole file. What changed and why.

**Verified live, in a browser, at 1440 and 390.** Eight surfaces re-walked with
`tools/shot.mjs` (screenshots `billing-plans-and-checkout-v-1` … `v-8`), plus a re-run of the
four-page DOM measurement. Everything reproduced except one drift and one imprecision:

- **Stripe Checkout** (`checkout.stripe.dev/checkout`) — confirmed string for string, including
  `Tax ⓘ  Enter address to calculate`, the `SAVE10` tag chip with `10% off` beneath it, `Total due`,
  the `Hide ⌃` control, and Apple Pay above an `OR` divider. At 390 the summary is expanded by
  default with `Hide` present; the wallet button lands at ~650 CSS px.
- **Vercel, Linear, Notion, Modal, Spotify, OpenAI** — all headline claims confirmed, including
  Spotify's material-terms paragraph verbatim (`Offer ends September 23, 2026.`), Modal's
  `*minimum of 0.125 cores per container`, and OpenAI's two dated prose footnotes.
- **The accessibility measurement re-ran clean**: `<table>` 0/0/0/0 and `<th>` 0/0/0/0 across
  Vercel, Figma, Notion and Linear; bare unlabelled `<svg>` 294/56/199/281. Figma's single
  `role="switch"` is still `Show only key features`. Notion's sticky-element count drifted 9 → 10;
  noted rather than silently updated.
- **Corrected:** the claim that OpenAI's context groups differ by 2× was too broad. On
  `gpt-5.6-sol`, input doubles and output rises 1.5×. Fixed in §3.
- **Reconciled:** two Baymard series (form *elements* vs form *fields*) were being quoted as if they
  were one. The Sources block now says which is which and warns against mixing them.

**Failure states — the main gap, now filled.** The per-flow state tables were good; the states that
belong to no single flow were missing entirely. New **§12** covers the gap between "paid" and
"entitled" (webhook lag, the second-wall-after-paying bug), session and auth expiry mid-action,
billing-provider outage and lost webhooks, rate limits and metered streams as distinct from spend
caps, concurrent admin edits, and date/clock/renewal edge cases. Individual states added inside the
existing sections: session expiry with the upgrade wall open and entitlement lag after payment (§4);
wallet unavailable, paid-but-unconfirmed, and off-session SCA (§6); `authentication_required` as its
own dunning band rather than a `stolen_card` lookalike (§8); rate-limited mid-request and
cap-raised-while-paused (§3); invite revoked or expired before acceptance, and invite accepted after
a downgrade (§9). Ten new self-check items (47–56) exercise them.

**Mobile — three measured findings replacing assertions.** The 390 sections were the thinnest and
were mostly rules with no observation behind them. Now: Modal's `Per hour` / `Per second` control is
not sticky and scrolls away after one screen, while Modal's own floating nav pill covers two rate
rows — the reference implementation failing this file's rule, which is more useful than the rule
alone. Spotify's legally-required material-terms paragraph is the last element above the fold, in
the smallest type, with the floating player control sitting on its corner, and a locale band takes
the top ~100px. Notion's toggle row collapses correctly into two rows at 390 and keeps `Price in
USD` — worth naming because the lazy breakpoint deletes exactly that string.

**Decision procedures — every fork now carries its scope.** New *Where these rules break* table:
fifteen forks, each with a realistic product where the recommended branch is wrong. The two that
were outright wrong as written rather than merely unscoped: "offer the next plan up" at a limit wall
(the correct rule is the cheapest plan that raises *that* limit — offering Business to someone who
hit an Enterprise-only SSO wall sells a support ticket), and "never disable the pay button", which
conflated *before* submit (never) with *during* the in-flight request (always, plus an idempotency
key). Scopes also added inline for guest checkout, single-name fields, wallet placement, seat-add
proration, seat-removal credits, cancellation defaults, pause offers, trial-tier choice, discount
presentation, CTA placement, and block-vs-warn.

**Cuts.** Sentences true of any product and actionable for none: "This is the genuinely hard one",
"the gap between those two is where trust dies", "rate cards are the worst thing on a phone", "the
support thread that follows is not about the price", "this flow is neglected purely because nobody
is assigned to it", "the pricing page is read once; the usage dashboard is read every month, in
fear", "every element on the page is either helping them finish or costing conversion". Unsourced
superlatives were either scoped or given a mechanism: "the single most effective anti-chargeback UI
element", "the single highest-value rule in this section", "the most common mobile pricing bug in
the wild", "almost nobody uses it", "worth more than any layout change", "worth more than any copy
change", "almost every refund UI failure", "this happens more than teams expect", "most users
hitting the wall cannot buy", "trials with a card convert several times better" (direction kept,
the vendor-benchmark magnitude dropped). The Apple Pay and Stripe Link figures were repeated in
three places and two; they now live once, in §6, cross-referenced.

**Still unverified, and marked as such.** In-product billing settings, seat editors, dunning bands,
proration previews and cancellation flows for Linear, Notion, Figma and Shopify remain behind
authenticated paywalls; those sections are built from vendor documentation, as the Sources block
already stated. The legal timeline (FTC vacatur, ANPRM, CARL, §312k BGB, Directive 2023/2673) is
from law-firm client alerts, not primary sources, and is the part of this file most likely to be
stale first — re-check the FTC's replacement rule before relying on the federal position.
