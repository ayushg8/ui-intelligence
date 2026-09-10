# fintech-institutional

**Evaluated:** 2026-09 · **Density:** comfortable · **Dark by default:** no — a light ground is the audit register; dark is an opt-in theme, never the default, because the artifact this UI imitates is a statement, and because operators export, print and screenshot these screens into other people's inboxes

> A finance operator moves other people's money on a rail that has no undo, and has to be able to prove afterwards exactly what they did.

## When this is the right archetype

The users are controllers, AP clerks, founders, treasury ops, and the engineers who build on money APIs. They are in the product every business day, often for hours, but the *unit of work* is not a keystroke — it is a payment, an approval, a reconciliation. They are usually accountable to somebody else for the number: a board, an auditor, a customer whose payout is late. The stakes are asymmetric and one-directional: a wire sent to the wrong counterparty at 4:55pm is gone, and the recovery is a phone call, not a Cmd-Z. The test from [`../references/fintech-and-trust.md`](../references/fintech-and-trust.md): **if a mis-read digit or a mis-clicked button costs real money that no undo can claw back, you are here.**

- **Choose this over `enterprise-dense`** when the rows are irreversible events rather than editable records. `enterprise-dense` optimises for how many rows fit; this archetype optimises for how confidently one row can be read and acted on. Mercury's ledger runs a flat **51px row at 16px body** — 60% taller than `enterprise-dense`'s 32px default, 42% taller than Attio's 36px — in a product used all day. That is not sloppiness, it is the archetype.
- **Choose this over `fintech-consumer`** when the money is not the user's own. A consumer checks a balance for 30 seconds and needs reassurance; an operator releases $2M of somebody else's payroll and needs evidence. Warmth is a liability here — every degree of it is subtracted from the impression that you are careful.
- **Choose this over `developer-platform`** when the primary surface is a dashboard someone *acts* in, even if the product also ships an API. Increase and Column are both; their docs are `developer-platform`, their dashboards are this. Two surfaces, shared tokens, different densities.
- **Choose this over `analytics-bi`** when the number is a claim about a specific transaction rather than an aggregate over many. If drilling into a figure ends at a receipt with a reference ID, you are here; if it ends at a filtered chart, you are in `analytics-bi`.

### Side by side with the three it gets confused with

| | **fintech-institutional** | `fintech-consumer` | `enterprise-dense` | `analytics-bi` |
|---|---|---|---|---|
| Body | 15–16 | 16 | 13 | 13 chrome / 12 data |
| Row height | **51** | 64 touch / 44–48 desktop | 28–32 | 22–24 |
| Radius (control/container) | 4 / 8 | 12 / 16 | 4 / 6 | 4 / 6 |
| Sidebar | 220–260 | none (tab bar) / 220–260 | 232–256 | 0 or 224–256 |
| Table width | full bleed | 720–880 | full bleed | full bleed |
| Accent jobs | **1** | 3 | 0 (status only) | 0 (series only) |
| Neutral temperature | cool, R < G < B | warm, R > G > B | alpha over surface | alpha over surface |
| Motion micro / standard | 160 / 200 | 140 / 220 | 120 / 160 | 120–150 / 180 |
| Elevation | hairline ring, diffuse ≤14% | one shadow ≤10% | borders + 2 shadows | borders + 1 overlay shadow |

Read that honestly, because two of the four columns are close.

**It shares its radius scale (4–8px) and its sidebar width with `enterprise-dense`, and those are not where they differ.** The difference lives in row height and body size — 51/16 against 32/13 — and in what a row *is*. An `enterprise-dense` row is an editable record; correcting it costs a keystroke, so the file optimises for how many fit. A row here is an event that already happened on a rail; correcting it costs a phone call, so the file optimises for how confidently one can be read. Everything downstream follows: the taller row, the larger type, the confirmation screen, the reversal state, the idempotency key. If you can undo it in the product, you are in `enterprise-dense`.

**It shares body size, and very nearly desktop row height, with `fintech-consumer`** — 16px against 16px, 51px against 44–48px. Those two numbers are within noise and there is no honest reason to push them apart: both users are reading a ledger on a large screen. The difference lives in four places that are not close. Neutral temperature is opposite (cool `#12161E` against warm `#22201D`), and it is the fork a viewer feels without naming. Radius is 4/8 against 12/16. The accent has one job here and three there. And the machinery is not shared at all: idempotency keys, a reversal state that runs backwards, an approver name inside the row, two-layer errors with a collapsed decline class. A consumer app that ships all of that is over-built; this archetype without it is a skin.

The two also diverge under constraint even where the number matches. A 51px row here is 51px because it carries a counterparty glyph, a two-line verified name, a signed amount, an account, a rail and an inline-editable category — drop three of those and it correctly becomes 40px. A 64px consumer row is 64px because a thumb needs it, and it never goes below 48px no matter what it carries.

**`analytics-bi` does not collide on any number** — 22–24px rows against 51px is not a near miss. It collides on the word "dashboard," and the test is the drill-down: a figure that ends at a receipt with a reference ID is here, a figure that ends at a filtered chart is there.

## When it is the wrong one

**A SaaS product with an invoices tab.** Billing inside a project tool shows money but does not move it — the user reads a total and clicks a Stripe-hosted button. Applying this archetype gives you a status vocabulary with seven states, an audit timeline and a confirmation screen for a $19 upgrade, and the user thinks something has gone wrong.

**A revenue dashboard.** "MRR by cohort" is `analytics-bi` even though every number has a dollar sign. Nothing on the screen is actionable, nothing is irreversible, and this archetype's restraint will make an exploratory tool feel funereal and under-charted.

**A crypto exchange order book.** Continuously-updating prices monitored for hours are `data-terminal`: 11–12px, 20–24px rows, dark, colour carrying data. Impose comfortable rows here and the trader can see nine levels of depth instead of thirty.

**A pricing page or a plan selector.** You are selling, and retail typographic conventions — the raised cents, the shrunken symbol, the big cheerful CTA — are correct and expected there. The specific failure is letting the pricing-page money component leak into the account screen, where it reads as a price tag rather than a quantity.

**A personal budgeting app.** Copilot Money borrows this archetype's numeral discipline but not its register. If the user is looking at their own spending, a 51px row of neutral grey with no illustration is punitive, not trustworthy.

## Reference products

| Product | Why | The one thing to steal |
|---|---|---|
| **Mercury** *(demo.mercury.com — a fully populated public product instance)* | The institutional pole at consumer polish, and the only one of these you can measure without credentials | The failed row: the amount **struck through** and a `Failed` label in `#B0175F` — the number is retracted in place, not recoloured |
| **Ramp** | Extreme colour restraint in a dense finance product | Chartreuse appears twice on the marketing page; in the product it is *only* the commit button — `#E4F222`, **56px tall, `border-radius: 0`** |
| **Brex** | Type engineering for numerals | Inter loaded with `"liga" 0, "calt" 0, "zero" 0` — ligatures and contextual alternates disabled so nothing clever can happen to a digit string |
| **Modern Treasury** | Double-entry made legible | Debits and Credits panels headed in **slate and clay** — two arbitrary hues that assert no valence — with `$1,500.00` in identical neutral type in both |
| **Column** | A nationally chartered bank shipping a real design system | A cool ramp where R < G < B at every stop (`gray-900` = `#12161E`) and elevation that is a **hairline ring plus ≤10% shadow**, never a lift |
| **Increase** *(the one to look up)* | The most typographically serious money product in the set | `MRZ Mono` — the passport machine-readable-zone face — licensed and shipped, alongside `Input Mono` with `ss01,ss02,ss12` baked into `@font-face` |
| **Fragment** *(the other one)* | Ledger infrastructure as pure monospace | An entire product site set in mono, proving how far "this is a record, not a brochure" can be pushed before it breaks |
| **Stripe** | The de-facto grammar for status and declines | The `seller_message` / customer-string split, and a documented rule for which internal states you must *not* reveal |

## The numbers

| | Value | Because |
|---|---|---|
| Body | **15–16px** | Mercury's ledger cells are 16px/16 (`Arcadia Text`, weight **360**); Column's docs body is 16/24. An operator reads for hours but the cost of misreading a digit is unbounded, so this archetype spends its budget on legibility rather than row count. Below 14px, do not ship. |
| Dense/secondary text | **13px/20px, `letter-spacing: 0.1px`, `#70707D`** | Mercury's table header cells, measured. Column labels and row metadata only — never a value, never a status, never anything a user must act on. |
| Page title | **24–30px, weight 600, `ls −0.75px`** | Column docs `h1` is 30/37.5; Stripe's API reference `h1` is only **24/32**. The largest type on a money screen is a balance, not a heading — a 40px page title outranks the number and inverts the hierarchy. |
| Row / list-item height | **48–52px** data, **40px** header | Mercury measured at 49–51px with `padding: 8px 16px`. The row carries a counterparty glyph, a two-line name, a signed amount, an account, a rail and an inline-editable category; compress it and the category select stops being clickable. |
| Control height | **32px** toolbar filter · **40px** form input · **48–56px** commit | Mercury: filter pills 32px (13.3px text, `r9999px`), inputs 40px (15/24, `r8px`, border `1px rgba(112,115,147,0.16)`). Ramp's "Continue" is 56px. The button that moves money is physically larger than the button that filters a list, and never the same component. |
| Sidebar width | **220–260px** | Mercury 220px on `#FBFCFD` with a `1px rgba(112,115,147,0.1)` right edge; Column 260px. Wide enough for `International Wire` unabbreviated — truncating a rail name is an error class of its own. |
| Content max-width | **1180px** for tables · **560–640px** for a transfer form | Column's docs main column measures 1180. The form is narrow on purpose: a payment is a single-column sequence of facts, and a two-column payment form is how a recipient and an amount get mismatched. |
| Radius (control / container) | **6–8px / 8–12px**. Full-round reserved for *filter* pills only | Mercury nav `r8`, input `r8`, filter chips `9999px`; Column cards `r8`/`r12`; Stripe Elements default `4px`; Ramp's product is **`0`** and coherent. Above 12px on a surface that holds a balance reads as a marketing card. |
| Border weight & colour | `1px rgba(112,115,147,0.10)` dividers; `0.16` on inputs; cool-tinted, never neutral grey | Mercury measured. Structure comes from hairlines because a ledger is a ruled sheet; a table separated by shadows is not a table. |
| Elevation | A `0 0 0 1px rgba(0,0,0,0.10)` ring plus a ≤10%-opacity, ≤2px shadow. **Two tokens total.** | Column's `--shadow-docs-card` is a `#2b314313` ring with `0 1px 2px #0000001a`; Plaid's whole four-step scale is a constant `hsla(0,0%,7%,.08)` with only geometry changing. Nothing on a balance screen floats. |
| Motion (micro / standard) | **120ms / 180ms**, ease-out; panels on `cubic-bezier(.23, 1, .32, 1)` | Increase ships that curve as `--ease-out-quint`; Plaid's base `--transition-duration` is **35ms**. An approval queue is worked 200 times a day; anything longer than 200ms is an obstacle you have installed deliberately. |
| Spacing base | **4px**, with a **2px** sub-step for inline numeric composition | Stripe Elements ships `spacingUnit: 2px` — not 4, not 8 — because a currency symbol, an integer, a delimiter and a fraction have to be spaced against each other at sub-4px precision. Layout stays on 4px; typography inside an amount gets 2px. |
| Focus ring | **2px, accent, 2px offset**, never a glow or a shadow | The keyboard path through a payment form is the accessible path *and* the fast operator path. A ring that is a soft shadow is invisible against the hairline borders this archetype uses everywhere. |
| Column alignment | Amounts right, tabular, decimal-aligned. Dates left, fixed format (`Sep 10`). Status left, next to the counterparty | Mercury's Amount header is right-aligned and its cells carry `tabular-nums`; the status sits beside the name, not beside the money, so the number's neighbourhood stays neutral. |

## Colour

**Neutrals are cool and blue-black, not grey.** Column's ramp holds R < G < B at every stop, ending at `#12161E`; Mercury's text is `rgb(30,30,42)` with secondary `rgb(83,84,97)` and muted `rgb(112,112,125)`; Increase's near-black is `rgb(26,43,59)`. Ten to twelve steps. A warm ramp reads as editorial and a pure `#808080` ramp reads as unstyled — the cool bias is what makes a screen full of digits look printed rather than rendered.

**The accent gets exactly one job: the primary action.** Mercury's blue-violet is the Send button and nothing else — active nav is a neutral fill, not a tinted one. Ramp's chartreuse is the commit button in-product and a secondary CTA on marketing; the primary CTA on marketing is *black*. Count the accent's appearances on your densest screen; more than three and it has become decoration. The accent may not colour headings, icons, borders, chart series, or a "premium" badge.

**Semantics need three values per role, not one.** Steal Wise's split: `content-positive #008026` for text, `interactive-positive #2EAD4B` for fills and dots, and a wash at exactly `0.10196` alpha of a *third*, brighter hue for backgrounds. Then apply the archetype's own constraint on top: **money out is not an error.** Mercury renders `Money in $400,716.98` in green `rgb(3,110,67)` and `Money out −$472,856.05` in the same neutral `rgb(83,84,97)` as the net-change figure. Red is reserved for `Failed` (`#B0175F`) — a state, not a direction. Debits and credits get two non-semantic hues (Modern Treasury's slate and clay) because in double-entry a debit is not a loss.

**Light by default.** Ship dark as a real theme if operators ask for it, re-mapped rather than inverted, with borders carrying more structural load. Do not ship it as the default: this archetype's screens get printed to PDF, pasted into audit packets and screenshotted into emails, and a dark ledger arrives at those destinations looking like a terminal emulator.

## Type

A neutral grotesque with unambiguous digits — the `1`, `7`, `9` and `0` must be distinguishable at 13px in a column. Mercury licensed `Arcadia Text` and runs it at a non-standard **weight 360**; Column ships `SuisseIntl` with `--font-regular: 300`; Increase ships `TT Interphases Pro`. The pattern is real: this archetype runs its UI *lighter* than the 400/500/600 default, because a page of near-black digits at 400 reads as heavy and shouty. Take three weights from a variable face — around 360/400/500 — and let 600 exist only for a total row.

**The scale is deliberately flat.** Body 16, secondary 13–14, title 24–30. That is a ratio of under 2:1 from smallest to largest, against 6:1 in `premium-marketing`. Hierarchy comes from weight, colour and position, not size — because the one thing allowed to be visually loud is an amount, and a large heading competes with it.

**Numerals.** Tabular figures in every column, every total, every timestamp and anything that mutates in place — Mercury's app carries `tabular-nums` on ~500 elements while its marketing site carries it on zero, and that split is the correct instinct. A single hero balance that never changes may use proportional figures; it has neither of the problems tabular exists to solve. Disable ligatures and contextual alternates on numeric type (`"liga" 0, "calt" 0`, Brex's approach) so no face can fuse `1` and `/`.

**Monospace earns its place on identifiers, not on money.** Reference IDs, routing and account numbers, IBANs, API object names, rail codes, error enums, webhook payloads. Increase's `MRZ Mono` and Modern Treasury's `mt-mono` sit on rail chips and record identifiers. Amounts stay in the proportional UI face with tabular figures on — mono amounts read as a code sample, and the digit widths are worse than a good face's tabular set.

## Layout and navigation

**Left sidebar, 220–260px, persistent, no top-level tabs.** The nav is the object model, verbatim: Accounts, Transactions, Cards, Payments, Invoicing, Accounting. Column's docs sidebar lists `Entity, Bank Account, Counterparty, ACH Transfer, Book Transfer, Check Transfer, Wire Transfer, International Wire, Realtime Transfer, Events, Webhooks, Reporting` — and `Simulation` as a peer. If the nav label and the API noun differ, support tickets are the cost.

**The primary object is the transaction row, and it earns priority by being the widest, tallest, most typographically stable thing on the page.** Above it: a filter bar of 32px controls and a three-figure summary strip (Mercury's is label 14/20 in `rgb(83,84,97)` over value **19px/28px tabular**). Below it: nothing. Give the table the full width to the right of the sidebar; a table inside a padded card with its own radius wastes 48px per side and separates the ruled sheet from its own edge.

**Grouping is by date, then by rail.** Not by category, and never by amount — an operator reconciles chronologically against a statement. Sticky date headers, stable cursor pagination, fixed row height so scroll position is arithmetic.

The shell, measured off Mercury:

```
┌────────────┬──────────────────────────────────────────────────────────────┐
│ 220px      │ 56px  search · Move money · settings · alerts · avatar       │
│ sidebar    ├──────────────────────────────────────────────────────────────┤
│ #FBFCFD    │ Page title 24–30/600                                         │
│ 1px hair-  │ 32px filter bar: Saved views · Filters · Date · Amount · Export│
│ line right │ Summary strip: 14/20 label over 19/28 tabular value ×3       │
│ nav item   ├──────────────────────────────────────────────────────────────┤
│ 30px, r8   │ 40px header row  13/20 ls .1 #70707D                         │
│            │ 49–51px data rows, 16px/w360, pad 8×16, full width to edge   │
└────────────┴──────────────────────────────────────────────────────────────┘
```

The summary strip is not decoration and not a KPI row: it is the three numbers an operator would otherwise compute by hand before answering any question about the filtered set. It must recompute against the active filter, or delete it.

**Cards are right in exactly two places:** the account summary tiles on the home screen (one card per account, because they are genuinely separate objects with separate balances) and the receipt/detail panel. Everywhere else the answer is a table or a bordered region on the page ground. A grid of cards for transactions destroys column alignment, which is the only reason the ledger is scannable.

## Components

**Belongs here:** a virtualised table with a checkbox column and bulk actions; saved views; a filter bar mirroring the API's query params exactly (date range, amount range, status, counterparty, rail); a right-hand detail drawer with the full status timeline; a receipt with a copyable reference ID; a signed-amount cell; a status word; an approval queue with an explicit approver and timestamp; a confirmation screen that restates amount, *verified* recipient name, rail, fee inclusion and arrival date; an idempotency-protected submit; a stale-data timestamp (`As of 2:14 PM`); a permanent legal-disclosure slot naming the chartered partner bank; a CSV/OFX export whose columns match the on-screen columns.

The confirmation screen deserves its own spec, because it is the component the archetype exists for. One column, 560–640px, no card, no modal — a modal can be dismissed by a stray Escape and leaves no URL. It restates, in this order: amount at display size with uniform cents; the bank-**verified** recipient legal name plus masked account; the rail and what that rail's reversibility is; the fee and whether it is included or added; the arrival date as a weekday. Then one button, 48–56px, with the amount in its label (`Send $5,000.00`). For a first-time recipient or a value above threshold, add a stated hold window. The user must reproduce a fact — re-enter the last four digits, pick the right counterparty from two — not merely click a second time.

**Does not belong here:** a gradient balance card (use flat surface, hairline ring); an animated count-up on a real balance (render the final value); a donut chart of spend by category on the account screen (that is `analytics-bi`, put it behind a tab); emoji as status (use the word — emoji survive neither screen readers nor CSV export nor colour blindness); a toast as the only record of a money movement (a toast is not an audit trail); an "Are you sure? [Cancel] [OK]" dialog (it creates friction without creating certainty); a progress stepper with a checkmark on the terminal node (settled states reverse); a skeleton that renders `$0.00` while fetching; a floating action button; a carousel; a dark-mode toggle in the top-level nav ahead of `Move money`.

## States in this archetype

**Empty.** The most anxious moment in the product is a new account whose transaction list is genuinely empty — the user is asking "did my deposit arrive?" Do not draw a piggy bank. Show the account and routing numbers in mono with a copy affordance, the exact status of any inbound funds, and one action. Ship a sandbox simulation endpoint (Column and Increase both make `Simulation` a first-class API surface) so this state can be populated by a real webhook event rather than a mock — the empty state is a feature to be tested, not a screen to be decorated.

**Loading.** Never `$0.00`, never a spinner where a number goes. A skeleton bar sized to the *widest plausible* value, so the layout does not jump when the figure lands. Balances load before tables; a table may show 10 skeleton rows at the exact row height. Never animate a balance from zero on first paint.

**Error.** Two layers, always. A machine identity (`insufficient_balance`, `beneficial_owner_identity`) rendered in mono and copyable, plus a human sentence that says what happened then what to do, in that order, max two sentences — Increase's `{type, title, detail, status}` shape. And one class of error must *collapse*: `fraudulent`, `lost_card`, `stolen_card` and `merchant_blacklist` render identically to `generic_decline`, same wording, same styling, same retry affordance, while the log keeps the truth. That split has to exist in the component API on day one, not be bolted on.

**Too much.** 40k transactions a month is normal. Server-side pagination with a stable cursor, virtualised fixed-height rows, and filters that are the object model. When a filter produces 12,000 results, say `12,483 transactions · $4,201,338.02` above the table — the count and the sum, because the operator's next question is always the sum.

**Permission denied.** In a money product this is almost never *access* — it is *approval*. The user can see the payment and cannot release it. Say which, and give the next step in the same sentence: `You need Admin approval to send over $10,000. Request approval →`. Never hide the button; a hidden control teaches the user the feature does not exist and generates a support ticket asking for something they already have.

**Submitted but unconfirmed.** The worst state in the archetype: the user clicked Send and the network dropped. Two mechanisms, both mandatory. A client-generated idempotency key per intended request, so a retry cannot double-send. And a UI state that says `Submitting…` and, on failure, `We couldn't confirm this transfer. Check Activity before retrying.` — never a bare retry button that fires a fresh request.

**Reversal.** The state that separates this archetype from every other: a row that was `Settled` on Tuesday is `Returned — R01 Insufficient funds` on Thursday. The row must be able to change backwards, the detail timeline must show both states with timestamps, and the receipt must never silently rewrite history. Mercury's treatment is the pattern to copy: strike the amount through in place, add the state word in `#B0175F`, keep the row where it was.

## Motion budget

Hover and focus at **120ms**. Menus, popovers, filter panels at **180ms**, ease-out. The detail drawer at **220–260ms** on `cubic-bezier(.23, 1, .32, 1)`. Nothing else animates.

Specifically forbidden: count-up on any real balance; row entrance staggers (an operator refreshing a queue 40 times a day watches 12 seconds of choreography per day); success confetti; a spinner on the commit button that lasts longer than the request, which trains users to wonder whether the send went through; skeleton shimmer sweeping across a page (a static skeleton at 4% is enough). Honour `prefers-reduced-motion` by removing transform and opacity transitions entirely — this archetype loses nothing without them, which is the test.

The frequency argument: the only animation an operator sees fewer than ten times a day is the transfer-submitted confirmation, and that one should still be instant, because the user's question at that moment is "is it done" and animation is a delay in answering it.

## Mobile

**This is a desktop product, and the honest mobile answer is a different, smaller product.** A 12-column transaction table does not become a responsive table; it becomes a card list showing three fields — counterparty, signed amount, status — with a detail sheet for everything else. Do not build the responsive table. Ramp, Mercury and Modern Treasury all put desktop dashboards in their product imagery because nobody reconciles a month of AP on a phone.

Build the **approval flow** instead, because that is the genuine mobile job: a push notification, one payment, full context (amount, verified recipient, rail, requester, policy that triggered it), approve or reject, done. Everything else on mobile is read-only.

Two hard rules if you do ship input: **16px minimum on any input field** or iOS Safari zooms the viewport on focus, which mid-payment feels like a crash; and amount entry gets a custom numeric keypad so you control the decimal, the thousands separator and the maximum.

## Copy register

Declarative, present tense, no exclamation marks, no contractions in status or legal strings. Verbs are rail-aware — *initiate, submit, settle, return, reverse, recall* — never "sent" as a synonym for four different things. Status words are a **closed set** used identically in the UI, the email, the CSV and the API. Name the amount and the recipient; never a pronoun. Give arrival as a weekday or date, not a duration.

- `Wire submitted to the Fedwire network at 2:14 PM ET. Funds typically arrive the same business day.` — beats `Your transfer is on its way!`
- `Returned — R01 Insufficient funds. The receiving bank rejected this transfer on Sep 5.` — beats `Transaction failed. Please try again.` (which is also wrong advice)
- `Send $5,000.00 to Acme Supply Co (Chase ••4471) by ACH, arriving Friday, Sep 12. Fee $0.` — beats `Are you sure you want to send $5,000?`
- `You need Admin approval to send over $10,000. Request approval →` — beats `403 Forbidden`, and beats hiding the button, which teaches the user the feature does not exist
- `Wire transfers are delayed. ACH and internal transfers are unaffected.` — beats `Some features may be unavailable.`

Never say "instant" unless it is. Never apologise for a decline you did not cause. Never guess at a reason — `insufficient_funds` shown when the code was `do_not_honor` will enrage a user who has money in the account.

## The characteristic failure

The bad version is recognisable in two seconds and it is always four things at once.

**A gradient on the balance.** Purple-to-pink card, white balance, `border-radius: 24px`, `box-shadow` at 20%. This is the loudest tell in the entire corpus. The real products put the balance in near-black on white on a flat surface with a hairline ring and a ≤10% shadow. Gradients are a marketing material; Stripe uses one on `/payments` and none on a ledger.

**Retail cents.** `$29⁹⁹` — the symbol at `0.6em`, the cents raised, greyed, or rounded away. Here is the nuance an imitator gets backwards: Mercury *does* raise the cents in its ledger — `.dollarDisplay` sets the integer at 15px/24 tabular and the cents in a `.superscript` span at **10.95px (0.73em) with `font-variation-settings: "wght" 500`**, same colour, same tabular set, with dedicated spans for the decimal point and the thousands comma. The cents are made smaller *and heavier* so optical weight survives, and the column still aligns. And Mercury does **not** do it in the summary strip, where `−$72,139.07` is uniform 19px/400. The rule: cents may recede only in a scanning column where dollars carry the decision, never in a summary, a confirmation, an entry field, a total row or a receipt — and they are never grey, never rounded, never `<sup>`.

**Every status a pastel pill.** Lavender `Pending`, mint `Settled`, coral `Failed`, periwinkle primary button. Nothing reads as urgent because nothing is *not* pretty, and the palette collides with the error colour. Mercury renders status as bare coloured text — 12px/20px, `ls 0.2px`, `#B0175F` — with no chip fill at all, and reserves the visual event for the struck-through amount.

**Fake density.** 28px rows and 12px type copied from Linear because "fintech is dense." Density is a function of session length and repetition, not of the vertical, and the money-specific correction is that a row is not just a row: a wrongly-read one costs money. Measure it: Mercury, used daily by finance operators, is at 49–51px.

**Green debits and red credits.** The single most common mistake in AI-generated accounting UI. A debit is not a loss; the sign depends on the account type. Colouring them teaches a lie and then makes the lie load-bearing.

The meta-failure underneath all five: **the imitator styles the money and skips the machinery.** No idempotency key, no reversal path, no `Submitting…` state for the dropped-network case, no two-layer error, no reference ID, no timeline. A product with a beautiful balance card and no idempotency key will double-send, and no amount of typography survives that.

## Signature decisions that fit here

- **The rail rail.** A 3px left edge on every transaction row encoding the payment rail — ACH, wire, RTP, book, check — because reversibility is a property of the rail and it determines whether the operator can still do anything about the row. Reads down a 200-row list without adding a column.
- **Amount alignment as the load-bearing grid.** The amount column's decimal point is the only alignment axis on the page: summary strip, table, drawer and receipt all place the decimal at the same x-offset, so a figure never appears to move when a user drills into it.
- **Settlement, not status, on the timeline.** Every money object renders a fixed four-slot timeline — Initiated, Submitted, Settled, Final — where "Final" only fills in after the rail's return window closes (2 business days for ACH), and until then the row shows `Settled · returnable until Sep 8`. It makes reversibility a visible, dated property instead of a support conversation.
- **The counterparty is a first-class object with a verified name.** Rows show the bank-verified legal name with the user's nickname beneath in `rgb(112,112,125)`, never the nickname alone — because the nickname is the thing that gets a payment sent to last year's vendor.
- **Two-key release above a threshold.** Payments over a configured amount render the approver's name and timestamp *in the row itself*, so the ledger is also the approval log and nobody has to open a second system to answer "who authorised this."

## Sources

Screenshots captured with Playwright at 1440×900 and 390×844 and read as images; computed styles and custom properties extracted with an `evaluate` probe, September 2026.

- `https://demo.mercury.com` and `/transactions` — **the primary probe.** A fully populated public instance of the real product. Sidebar 220px on `#FBFCFD` with `1px rgba(112,115,147,0.1)`; nav items 30px/`r8px`; table header 40px at 13/20 `ls 0.1px` `rgb(112,112,125)`; data rows 49–51px at 16px `Arcadia Text` weight 360, `padding: 8px 16px`; filter pills 32px `r9999px`; input 40px 15/24 `r8px` border `rgba(112,115,147,0.16)`; summary strip label 14/20 `rgb(83,84,97)` over value 19/28 `tabular-nums`; money-in `rgb(3,110,67)`, money-out neutral; `Failed` 12/20 `ls 0.2px` `rgb(176,23,95)` with the amount struck through; `.dollarDisplay` / `.superscript` cents at 10.95px with `wght 500`; `tabular-nums` on ~500 elements in-app versus 0 on mercury.com
- `https://mercury.com` — the FDIC partner-bank disclosure pill pinned in the first viewport, naming Choice Financial Group and Column N.A.
- `https://demo.ramp.com` — the product login: `Lausanne` at weight 300, body 16px, `h1` 28/32 w400 `ls −0.56px`, commit button **56px tall at `border-radius: 0`** in `rgb(228,242,34)` on `rgb(26,25,25)`
- `https://column.com/docs/api` — sidebar 260px, main column 1180px, body 16/24 `SuisseIntl` w400 in `oklch(0.365 0.016 270.9)`, `h1` 30/37.5 w600 `ls −0.75px`, nav items 32px 14/20 w500 `r6px`, cards `r8`/`r12`, `--shadow-docs-card` (inset highlight + `#2b314313` ring + `0 1px 2px #0000001a`) and `--shadow-docs-border: 0 0 0 1px #0000001a`; the sidebar as the API object graph with `Simulation` as a peer
- `https://increase.com` and `/documentation/api` — docs sidebar 310px, controls 30/38px at 14/20 w500 `r8px`, code surfaces `r12px` on `rgb(26,43,59)`, muted `rgb(104,120,135)`, `--ease-out-quint: cubic-bezier(.23, 1, .32, 1)`, `--font-mrz-mono` / `--font-input-mono` shipped as real tokens; the FDIC announcement banner
- `https://www.moderntreasury.com/products/ledgers` — Debits panel in slate and Credits panel in clay, `$1,500.00` in identical neutral type in both including the totals rows
- `https://docs.stripe.com/api` — body 14/22 `#3C4257`, `h1` only 24/32 w700, `td` 14/20 at 12px padding, page `#F4F7FA`
- `https://www.brex.com` — the Inter feature-settings string disabling `liga`, `calt` and `zero`; in-app imagery showing cent-precise expense rows
- `https://checkout.stripe.dev` — Elements' shipped default surface, cross-checked against the documented Appearance API defaults (`colorPrimary #0570de`, `colorText #30313d`, `colorDanger #df1b41`, `spacingUnit 2px`, `borderRadius 4px`, 16px minimum mobile input)
- [`../references/fintech-and-trust.md`](../references/fintech-and-trust.md) — Wise's `content-*` / `interactive-*` / `background-*` two-ramp semantic system at `0.10196` alpha; Column's `gray-50…gray-900` ramp and `--font-regular: 300`; Plaid's constant-opacity shadow scale and `--transition-duration: 35ms`; Stripe's payout enum, decline-collapse rule and `seller_message`; Increase's `{type,title,detail,status}` error object and `Idempotency-Key` requirement. Values here are cited from that file, not re-derived.
