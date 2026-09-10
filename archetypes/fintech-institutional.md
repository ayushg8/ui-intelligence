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

Two of those three neighbours are genuinely close, and pretending otherwise is what makes an archetype system decorative.

**It shares its radius scale (4–8px) and its sidebar width with `enterprise-dense`, and those are not where they differ.** The difference lives in row height and body size — 51/16 against 32/13 — and in what a row *is*. An `enterprise-dense` row is an editable record; correcting it costs a keystroke, so the file optimises for how many fit. A row here is an event that already happened on a rail; correcting it costs a phone call, so the file optimises for how confidently one can be read. Everything downstream follows: the taller row, the larger type, the confirmation screen, the reversal state, the idempotency key. If you can undo it in the product, you are in `enterprise-dense`.

**It shares body size, and very nearly desktop row height, with `fintech-consumer`** — 16px against 16px, 51px against 44–48px. Those two numbers are within noise and there is no honest reason to push them apart: both users are reading a ledger on a large screen. The difference lives in four places that are not close. Neutral temperature is opposite (cool `#12161E` against warm `#22201D`), and it is the fork a viewer feels without naming. Radius is 4/8 against 12/16. The accent has one job here and three there. And the machinery is not shared at all: idempotency keys, a reversal state that runs backwards, an approver name inside the row, two-layer errors with a collapsed decline class. A consumer app that ships all of that is over-built; this archetype without it is a skin.

The two also diverge under constraint even where the number matches. A 51px row here is 51px because it carries a counterparty glyph, a two-line verified name, a signed amount, an account, a rail and an inline-editable category — drop three of those and it correctly becomes 40px. A 64px consumer row is 64px because a thumb needs it, and it never goes below 48px no matter what it carries.

**`analytics-bi` does not collide on any number** — 22–24px rows against 51px is not a near miss. It collides on the word "dashboard," and the test is the drill-down: a figure that ends at a receipt with a reference ID is here, a figure that ends at a filtered chart is there.

## When it is the wrong one

Five products that look like this archetype from a screenshot and break under it.

**Linear's billing settings, or Notion's plan page.** An invoices tab inside a project tool shows money but does not move it — the user reads a total and clicks a Stripe-hosted button. Apply this and you get a seven-state status vocabulary, an audit timeline and a confirmation screen for a $19 upgrade. The correct answer is the host archetype's own settings page with tabular figures on the amounts, and nothing else borrowed.

**Baremetrics, ChartMogul, Stripe Sigma.** Every number carries a dollar sign and not one of them is actionable. These are `analytics-bi`: the drill-down ends at a filtered chart, not a receipt. This archetype's restraint makes an exploratory tool feel funereal and under-charted, and its 51px row wastes the vertical space a cohort table needs.

**QuickBooks, Xero, NetSuite.** The hardest one, because these *are* ledgers, with debits, credits and reconciliation. But a journal entry is an editable record with a real undo, and the user's job is bookkeeping rather than release. That is `enterprise-dense` at 13px and 32px rows, taking only this archetype's numeral discipline — tabular figures, uniform cents, non-semantic debit/credit hues — as a guest. Building QuickBooks at 51px rows costs an accountant a third of their screen.

**Coinbase Advanced Trade, Kraken Pro.** Continuously-updating prices monitored for hours are `data-terminal`: 11–12px, 20–24px rows, dark, colour carrying data. Impose comfortable rows and the trader sees nine levels of depth instead of thirty.

**Copilot Money, Monarch, YNAB.** They borrow this archetype's numeral discipline and none of its register. When the money is the user's own, a 51px row of neutral grey with no illustration is punitive rather than trustworthy — that is `fintech-consumer`, warm ramp and all.

And one edge case worth naming: **Wise's and Revolut's send flows** move real money irreversibly and still belong in `fintech-consumer`. Irreversibility alone does not put you here. What puts you here is being accountable to a third party for the number.

## Reference products

| Product | Why | The one thing to steal |
|---|---|---|
| **Mercury** *(demo.mercury.com — a fully populated public product instance)* | The institutional pole at consumer polish, and the only one of these you can measure without credentials | The failed row: the amount **struck through** and a `Failed` label in `#B0175F` — the number is retracted in place, not recoloured |
| **Ramp** | Extreme colour restraint in a dense finance product | Chartreuse is only ever a *button*: three on the homepage at `r6`, and `#E4F222` on the signed-out product's `Continue` at **56px, `border-radius: 0`**. Zero uses as text, icon, border or chart series |
| **Brex** | Type engineering for numerals | Inter loaded with `"liga" 0, "calt" 0, "zero" 0` — ligatures and contextual alternates disabled so nothing clever can happen to a digit string |
| **Modern Treasury** | Double-entry made legible | Debits and Credits panels headed in **slate and clay** — two arbitrary hues that assert no valence — with `$1,500.00` in identical neutral type in both |
| **Column** | A nationally chartered bank shipping a real design system | A cool ramp where R < G < B at every stop (`gray-900` = `#12161E`) and elevation that is a **hairline ring plus ≤10% shadow**, never a lift |
| **Increase** *(the one to look up)* | The most typographically serious money product in the set | `MRZ Mono` — the passport machine-readable-zone face — licensed and shipped, alongside `Input Mono` with `ss01,ss02,ss12` baked into `@font-face` |
| **Fragment** *(the other one)* | Ledger infrastructure as pure monospace | An entire product site set in mono, proving how far "this is a record, not a brochure" can be pushed before it breaks |
| **Stripe** | The de-facto grammar for status and declines | The `seller_message` / customer-string split, and a documented rule for which internal states you must *not* reveal |

## The numbers

| | Value | Because |
|---|---|---|
| Body | **15–16px** | Re-probed: every Mercury ledger cell, amount cells included, is **16px/16 in `Arcadia Text` at weight 360**; labels and menus sit at 15/24. Column's docs body is 16/24. The cost of misreading a digit is unbounded, so this archetype spends its budget on legibility rather than row count — three full steps above `enterprise-dense` (13px) and the `analytics-bi` data plane (12px), deliberately. Below 14px, do not ship. |
| Dense/secondary text | **14/20 `rgb(83,84,97)`** labels · **12/20 `rgb(112,112,125)`** field names and status words | Re-probed on `/transactions`: 304 nodes at 14/20 (nav, summary-strip labels), 126 at 12/20 (`Method`, `Category`, `Attachment`, the status word), 8 at 13/20. There is no 11px tier here — `enterprise-dense` and `analytics-bi` both have one, and that missing step is a real part of the difference. Never an amount and never a counterparty name below 14px. |
| Page title | **24–30px, weight 600, `ls −0.75px`** | Column docs `h1` is 30/37.5; Stripe's API reference `h1` is only **24/32**. The largest type on a money screen is a balance, not a heading — a 40px page title outranks the number and inverts the hierarchy. |
| Row / list-item height | **51px** data, **40px** header | Re-probed: every Mercury data row is exactly 51px, `padding: 8px 16px`; the header row is 40px with a 12px label in `rgb(112,112,125)`. Not a range — a fixed height, because virtualised scroll position has to be arithmetic. The row carries a counterparty glyph, a two-line name, a signed amount, an account, a rail and an inline-editable category; drop three of those and 40px is correct, but do not compress it with the fields still in it or the category select stops being clickable. |
| Control height | **32px** toolbar filter · **40px** form input · **48–56px** commit | Re-probed: Mercury's whole filter bar — `Saved views`, `Filters`, `Date`, `Keyword`, `Amount`, `Export all` — is 32px at 13.3px text; inputs are 40px at 15/24 with `r8px`. The 48–56px commit figure comes from **Ramp's signed-out `Continue`: 576×56, `border-radius: 0`, `rgb(228,242,34)` on `rgb(26,25,25)`** and from Stripe Elements, *not* from Mercury's top bar, where `Move money` is itself a 32px pill that only opens a menu. The rule holds where it matters: the control that commits money is a different, larger component than the control that filters a list. |
| Sidebar width | **220–260px** | Re-probed: Mercury exactly 220px on `rgb(251,252,253)` with a `1px rgba(112,115,147,0.1)` right edge; Column docs exactly 260px. This is the same band `enterprise-dense` uses (232–256) — sidebar width does not separate the two archetypes; what is listed inside it does. Wide enough for `International Wire` unabbreviated, because truncating a rail name is an error class of its own. |
| Content max-width | **None on the ledger — full bleed from the sidebar edge** · **560–640px** for a transfer form | Re-probed and corrected: Mercury's transactions table measures **1267px wide, starting at x=220 and running past the 1440px viewport edge** — no cap, horizontal scroll instead. The 1180px that used to sit in this row is Column's *docs* main column and has no business on a ledger. The form is narrow on purpose: a payment is a single-column sequence of facts, and a two-column payment form is how a recipient and an amount get mismatched. |
| Radius (control / container) | **4px and 8px** — two structural radii, hard cap 12px on anything holding a balance | Re-probed: Mercury runs `8px` ×275 and `4px` ×258, plus `9999px` ×127 and `50%` ×118 on pills, avatars and dots — round is *not* reserved for filter pills, and the old claim that it was is wrong. Column's docs are `6px` ×715 with `8px` ×21 and exactly one `12px`; Stripe Elements defaults to `4px`; Ramp's signed-out product is `0` and coherent. Pick one pair and hold it. **This 4–8px band is identical to `enterprise-dense` and `analytics-bi` — radius is not a differentiator between them.** It is a differentiator against `fintech-consumer` (12 / 16), where above 12px on a surface holding a balance reads as a marketing card. |
| Border weight & colour | `1px rgba(112,115,147,0.10)` dividers; `0.16` on inputs; cool-tinted, never neutral grey | Mercury measured. Structure comes from hairlines because a ledger is a ruled sheet; a table separated by shadows is not a table. |
| Elevation | A hairline ring plus diffusion under 15%, never a lift. **Two tokens total.** | Re-probed: Mercury's card shadow is four layers — `rgba(175,178,206,0.9) 0 0 1px` (the ring: near-opaque, zero spread) over diffuse layers at `0.14`, `0.08` and `0.02`. Column's `--shadow-docs-card` is a `#2b314313` ring plus `0 1px 2px #0000001a`; its `--shadow-product` stacks five layers topping out at `0.07`. The layer count is not the pattern — the pattern is that the *edge* is a hairline and the diffusion never lifts the surface. |
| Motion (micro / standard) | **160ms / 200ms**, ease-out; drawer 220–260ms on `cubic-bezier(.23, 1, .32, 1)` | Re-probed and moved up from 120/180: Mercury's two dominant durations are `0.2s` ×71 and `0.16s` ×70, with a six-element `0.35s` tail. That sits deliberately *above* `enterprise-dense`'s 120/160, and the reason is what triggers a transition. There, a user sweeps a cursor down thirty rows and fires thirty of them, so 120ms is a floor. Here the unit is a payment: the operator opens a drawer forty times a day, not four hundred, and 200ms buys legible state change without becoming a tax. Increase ships the drawer curve as `--ease-out-quint`. |
| Spacing base | **4px**, with a **2px** sub-step for inline numeric composition | Stripe Elements ships `spacingUnit: 2px` — not 4, not 8 — because a currency symbol, an integer, a delimiter and a fraction have to be spaced against each other at sub-4px precision. Layout stays on 4px; typography inside an amount gets 2px. |
| Focus ring | **2px, accent, 2px offset**, never a glow or a shadow | The keyboard path through a payment form is the accessible path *and* the fast operator path. A ring that is a soft shadow is invisible against the hairline borders this archetype uses everywhere. |
| Column alignment | Amounts right, tabular, decimal-aligned. Dates left, fixed format (`Sep 10`). Status left, next to the counterparty | Mercury's Amount header is right-aligned and its cells carry `tabular-nums`; the status sits beside the name, not beside the money, so the number's neighbourhood stays neutral. |

## Colour

**Neutrals are cool and blue-black, not grey.** Column's ramp holds R < G < B at every stop, ending at `#12161E`; Mercury's text is `rgb(30,30,42)` with secondary `rgb(83,84,97)` and muted `rgb(112,112,125)`; Increase's near-black is `rgb(26,43,59)`. Ten to twelve steps. A warm ramp reads as editorial and a pure `#808080` ramp reads as unstyled — the cool bias is what makes a screen full of digits look printed rather than rendered.

**The accent gets exactly one job: the primary action.** Mercury's blue-violet is the Send button and nothing else — active nav is a neutral fill, not a tinted one. Ramp is the cleanest proof, re-probed: chartreuse `lab(92.1406 -20.4979 84.7726)` fills `See a demo` (34px, `r6`), `Get started for free` (51px, `r6`) and `Switch in days, not months` (43px, `r6`) on the homepage and `rgb(228,242,34)` on the signed-out `Continue` (56px, `r0`) — every single instance a button, zero as text, icon, border, chart series or panel, with near-black `lab(2.84 0.37 0.97)` carrying the rest. Not "use it rarely": it means *press this* and never anything else. Count the accent's appearances on your densest screen; more than three and it has become decoration. It may not colour headings, icons, borders, chart series, or a "premium" badge.

**Semantics need three values per role, not one.** Steal Wise's split: `content-positive #008026` for text, `interactive-positive #2EAD4B` for fills and dots, and a wash at exactly `0.10196` alpha of a *third*, brighter hue for backgrounds. Then apply the archetype's own constraint on top: **direction is not valence.** Money in may be green (`rgb(3,110,67)`); money out is the same neutral as everything else; red is reserved for `Failed` (`rgb(176,23,95)`), a state; debits and credits get two non-semantic hues. The failure list below has the diagnostic version.

**Light by default.** Ship dark as a real theme if operators ask for it, re-mapped rather than inverted, with borders carrying more structural load. Do not ship it as the default: this archetype's screens get printed to PDF, pasted into audit packets and screenshotted into emails, and a dark ledger arrives at those destinations looking like a terminal emulator.

## Type

A neutral grotesque with unambiguous digits — the `1`, `7`, `9` and `0` must be distinguishable at 12px in a column. Mercury licensed `Arcadia Text` and runs it at a non-standard **weight 360**; Column ships `SuisseIntl` with `--font-regular: 300`; Increase ships `TT Interphases Pro`. The pattern is real: this archetype runs its UI *lighter* than the 400/500/600 default, because a page of near-black digits at 400 reads as heavy and shouty. Take three weights from a variable face — around 360/400/500 — and let 600 exist only for a total row.

**The scale is deliberately flat.** Body 16, secondary 12–14, title 24–30. That is a ratio of under 2:1 from smallest to largest, against 6:1 in `premium-marketing`. Hierarchy comes from weight, colour and position, not size — because the one thing allowed to be visually loud is an amount, and a large heading competes with it.

**Numerals.** Tabular figures in every column, every total, every timestamp and anything that mutates in place — Mercury's app carries `tabular-nums` on **507** elements (re-counted) while its marketing site carries it on zero, and that split is the correct instinct. A single hero balance that never changes may use proportional figures; it has neither of the problems tabular exists to solve. Disable ligatures and contextual alternates on numeric type (`"liga" 0, "calt" 0`, Brex's approach) so no face can fuse `1` and `/`.

**Monospace earns its place on identifiers, not on money.** Reference IDs, routing and account numbers, IBANs, API object names, rail codes, error enums, webhook payloads. Increase's `MRZ Mono` and Modern Treasury's `mt-mono` sit on rail chips and record identifiers. Amounts stay in the proportional UI face with tabular figures on — mono amounts read as a code sample, and the digit widths are worse than a good face's tabular set.

## Layout and navigation

**Left sidebar, 220–260px, persistent, no top-level tabs.** The nav is the object model, verbatim: Accounts, Transactions, Cards, Payments, Invoicing, Accounting. Column's docs sidebar lists `Entity, Bank Account, Counterparty, ACH Transfer, Book Transfer, Check Transfer, Wire Transfer, International Wire, Realtime Transfer, Events, Webhooks, Reporting` — and `Simulation` as a peer. If the nav label and the API noun differ, support tickets are the cost.

**The primary object is the transaction row, and it earns priority by being the widest, tallest, most typographically stable thing on the page.** Above it: a filter bar of 32px controls and a three-figure summary strip (Mercury's is label 14/20 in `rgb(83,84,97)` over value **19px/28px tabular**). Below it: nothing. Give the table the full width to the right of the sidebar and let it scroll horizontally — Mercury's runs 1267px from x=220 straight past the 1440px viewport edge. A table inside a padded card with its own radius wastes 48px per side and separates the ruled sheet from its own edge.

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
│ 30px, r8   │ 40px header row, 12px label rgb(112,112,125)                 │
│            │ 51px data rows, 16px/16 w360, pad 8×16, full bleed to 1267px  │
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

Hover and focus at **160ms**. Menus, popovers, filter panels at **200ms**, ease-out — Mercury's two measured durations, `0.16s` on 70 elements and `0.2s` on 71. The detail drawer at **220–260ms** on `cubic-bezier(.23, 1, .32, 1)`. Nothing else animates.

Those are 40ms slower than `enterprise-dense`'s and that is on purpose: the trigger there is a cursor sweeping rows, the trigger here is opening one payment.

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

The generic money-UI tells — the purple-to-pink gradient balance card, the count-up from `$0.00`, the pastel status pill per state, the confetti, the rounded geometric face on the digits — are catalogued with their shipped values in [`fintech-consumer.md`](fintech-consumer.md#the-characteristic-failure) and apply here too. They are not this archetype's *characteristic* failure, because an agent that avoids all five can still produce an unmistakably wrong institutional screen. These are the five that are specific to here, at the values they actually appear at.

**1. Fake density.** 28–32px rows and 12–13px type lifted from Linear because "fintech is dense," usually with `text-xs` on the amount. Density is a function of session length and stakes, not of the vertical. Measured: Mercury, used every business day by finance operators, ships a flat **51px row at 16px**. If your ledger row is under 40px you have built `enterprise-dense` and mislabelled it.

**2. Colour used to encode direction.** Green debits and red credits, or every outflow in red. Both say the same wrong thing: that direction is valence. A debit is not a loss — the sign depends on the account type — and money out is not an error. Real: Modern Treasury heads its Debits and Credits panels in **slate and clay**, `$1,500.00` in identical neutral type in both including the totals rows. Mercury renders `Money in $400,716.98` in `rgb(3,110,67)` and `Money out −$472,856.05` in the same neutral `rgb(83,84,97)` as the net-change figure, and reserves `rgb(176,23,95)` for `Failed`. If every debit is red, a genuine failure has nowhere left to go.

**3. Retail cents in the wrong slot.** `$29⁹⁹` — symbol at `0.6em`, cents raised, greyed, or rounded away. The nuance an imitator gets backwards: Mercury *does* raise the cents in its scanning column — `.dollarDisplay` sets the integer at 15px/24 tabular and the cents in a `.superscript` span at **10.95px with `font-variation-settings: "wght" 500`**, same colour, same tabular set, with dedicated spans for the decimal point and the thousands comma. Smaller *and heavier*, so optical weight survives and the column still aligns. And it does **not** do it in the summary strip, where `−$72,139.07` is uniform 19px/400. The rule: cents may recede only in a scanning column where dollars carry the decision — never in a summary, a confirmation, an entry field, a total row or a receipt — and never grey, never rounded, never `<sup>`.

**4. Accent inflation.** The accent on the active nav item, the section heading, the `Verified` badge, the chart line and the link colour, all at once. Real: Mercury's blue-violet is the Send button and nothing else — active nav is a *neutral* fill. Ramp's chartreuse fills buttons and only buttons across a 13,700px page. Count the accent on your densest screen; over three and it is decoration.

**5. The table in a card.** A `max-w-6xl` table inside a `rounded-xl border p-6` card, centred with margins either side. Real: Mercury's table is 1267px starting at the sidebar edge and running past the viewport. A card around a ledger wastes 48px per side, adds a radius the ruled sheet does not want, and hides the fact that you have fewer columns than the job needs.

**The meta-failure underneath all five: the imitator styles the money and skips the machinery.** No idempotency key, no reversal state, no `Submitting…` for the dropped-network case, no two-layer error, no reference ID, no timeline, no approver in the row. A product with a beautiful balance card and no idempotency key will double-send, and no amount of typography survives that.

### Recognise your own screenshot

Ten checks against your own render, in order. Each is a measurement or a `grep`, not a judgement, and each has a stated right answer above. A wrong one is the archetype missing, not a polish item.

1. **Measure one data row.** Under 40px, or over 64? Wrong archetype in both directions — 51px is the target.
2. **Find the accent.** Count its instances. More than three, or is any of them not a button?
3. **Cover the amounts with your thumb.** Is there any colour left on screen that is not a status word? If a debit, a category chip or a heading is carrying hue, delete it.
4. **Look at a negative amount.** Is it red? It should be the same neutral as the net-change figure.
5. **Read the cents.** Are they grey, rounded, or `<sup>`? Are they raised anywhere other than the scanning column?
6. **Find the table's left edge.** Does it start at the sidebar, or is it inside a card with a radius?
7. **Look at one status.** Is it a filled pastel pill, or bare coloured text at 12/20? Mercury's is bare text with no chip at all, and the visual event is the struck-through amount beside it.
8. **Open the confirmation.** Is it a modal? A modal dies to a stray Escape and leaves no URL. It should be a 560–640px page that restates amount, verified legal name, rail, fee and arrival weekday, with the amount in the button label.
9. **Search your code for `Idempotency-Key`.** Not there? You built a mockup.
10. **Ask what happens on Thursday** when Tuesday's `Settled` row comes back as `Returned — R01`. If the row cannot run backwards, you have shipped a feed, not a ledger.

## Signature decisions that fit here

- **The rail rail.** A 3px left edge on every transaction row encoding the payment rail — ACH, wire, RTP, book, check — because reversibility is a property of the rail and it determines whether the operator can still do anything about the row. Reads down a 200-row list without adding a column.
- **Amount alignment as the load-bearing grid.** The amount column's decimal point is the only alignment axis on the page: summary strip, table, drawer and receipt all place the decimal at the same x-offset, so a figure never appears to move when a user drills into it.
- **Settlement, not status, on the timeline.** Every money object renders a fixed four-slot timeline — Initiated, Submitted, Settled, Final — where "Final" only fills in after the rail's return window closes (2 business days for ACH), and until then the row shows `Settled · returnable until Sep 8`. It makes reversibility a visible, dated property instead of a support conversation.
- **The counterparty is a first-class object with a verified name.** Rows show the bank-verified legal name with the user's nickname beneath in `rgb(112,112,125)`, never the nickname alone — because the nickname is the thing that gets a payment sent to last year's vendor.
- **Two-key release above a threshold.** Payments over a configured amount render the approver's name and timestamp *in the row itself*, so the ledger is also the approval log and nobody has to open a second system to answer "who authorised this."

## Sources

Screenshots captured with Playwright at 1440×900 and 390×844 and read as images; computed styles and custom properties extracted with an `evaluate` probe. Original pass September 2026; **rows marked "re-probed" were re-measured 2026-09-10** at 1440×900 with a Chrome 128 macOS UA string.

- `https://demo.mercury.com/transactions` — **the primary probe, re-run 2026-09-10.** A fully populated public instance of the real product. Sidebar exactly **220px** on `rgb(251,252,253)` with `1px rgba(112,115,147,0.1)`; nav items 30px/`r8px`; header row **40px, label 12px `rgb(112,112,125)`** (the `th` itself is 13/20 `ls 0.1px`, but the visible label sits in a 12px sort button); data rows a flat **51px** at 16px/16 `Arcadia Text` weight **360**, `padding: 8px 16px`, amount cells `text-align: end`; **table 1267px wide from x=220, past the 1440 viewport edge — no max-width**; filter bar controls all 32px at 13.3px; inputs 40px 15/24 `r8px`; summary strip label 14/20 `rgb(83,84,97)` over value 19/28; money-in `rgb(3,110,67)` ×89, `Failed` `rgb(176,23,95)` ×21, money-out neutral; `.superscript` cents **10.95px, `font-variation-settings: "wght" 500`**; `tabular-nums` on **507** elements in-app versus 0 on mercury.com. Type census: 14/20 ×304, 15/24 ×196, 12/20 ×126, 19/28 ×35, 13/20 ×8. Radii: `8px` ×275, `4px` ×258, `9999px` ×127, `50%` ×118. Transitions: `0.2s` ×71, `0.16s` ×70, `0.35s` ×6. Card shadow: four layers — `rgba(175,178,206,0.9) 0 0 1px` ring over `0.14` / `0.08` / `0.02` diffuse
- `https://mercury.com` — the FDIC partner-bank disclosure pill pinned in the first viewport, naming Choice Financial Group and Column N.A.
- `https://demo.ramp.com/sign-in` — **re-probed.** `Lausanne` at weight 300, body 16px, commit button `Continue` **576×56 at `border-radius: 0`** in `rgb(228,242,34)` on `rgb(26,25,25)`, 16px label
- `https://ramp.com` — **re-probed with a Chrome 128 macOS UA** (a default headless UA is served a plain-text "Machine Version" page and measures nonsense). Chartreuse `lab(92.1406 -20.4979 84.7726)` fills `See a demo` (34×107, `r6`), `Get started for free` (51×176, `r6`) and `Switch in days, not months` (43×224, `r6`) in a 1440×900 full-DOM capture; `../references/fintech-and-trust.md` counts six over the full 13,722px page. Every instance is a button; zero as text, icon, border or series. This corrects the earlier claim in this file that chartreuse appeared twice and that the marketing primary CTA was black — it is chartreuse
- `https://column.com/docs/api` (redirects to `docs.column.com/api`) — **re-probed.** Sidebar exactly 260px, main column 1180px, body 16/24 `SuisseIntl` in `oklch(0.365 0.016 270.9)` on `oklch(1 0 0)`, lead paragraph 18/28, `h1` 30/37.5 w600 `ls −0.75px`. Radius census **`6px` ×715**, `8px` ×21, `4px` ×2, `12px` ×1 — correcting the earlier "cards `r8`/`r12`". `--shadow-docs-card` = inset highlight + `rgba(43,49,67,0.075)` ring + `0 1px 1px #00000013` + `0 1px 2px #0000001a`; `--shadow-docs-border: 0 0 0 1px` at 10%. The sidebar is the API object graph with `Simulation` as a peer
- `https://increase.com` and `/documentation/api` — docs sidebar 310px, controls 30/38px at 14/20 w500 `r8px`, code surfaces `r12px` on `rgb(26,43,59)`, muted `rgb(104,120,135)`, `--ease-out-quint: cubic-bezier(.23, 1, .32, 1)`, `--font-mrz-mono` / `--font-input-mono` shipped as real tokens; the FDIC announcement banner
- `https://www.moderntreasury.com/products/ledgers` — Debits panel in slate and Credits panel in clay, `$1,500.00` in identical neutral type in both including the totals rows
- `https://docs.stripe.com/api` — **re-probed.** `h1` only **24/32 w700**, body 14/22, `td` 14/20 at 12px padding, page `rgb(244,247,250)`. Text colour is `rgb(26,44,68)`, not the `#3C4257` previously recorded
- `https://www.brex.com` — the Inter feature-settings string disabling `liga`, `calt` and `zero`; in-app imagery showing cent-precise expense rows
- `https://checkout.stripe.dev` — Elements' shipped default surface, cross-checked against the documented Appearance API defaults (`colorPrimary #0570de`, `colorText #30313d`, `colorDanger #df1b41`, `spacingUnit 2px`, `borderRadius 4px`, 16px minimum mobile input)
- [`../references/fintech-and-trust.md`](../references/fintech-and-trust.md) — Wise's `content-*` / `interactive-*` / `background-*` two-ramp semantic system at `0.10196` alpha; Column's `gray-50…gray-900` ramp and `--font-regular: 300`; Stripe's payout enum, decline-collapse rule and `seller_message`; Increase's `{type,title,detail,status}` error object and `Idempotency-Key` requirement. Values here are cited from that file, not re-derived.

## Differentiation pass (2026-09)

Compared against `fintech-consumer.md`, `enterprise-dense.md` and `analytics-bi.md`; cross-checked against `../references/fintech-and-trust.md`, `../craft/forms-craft.md` and `../craft/copy-and-voice.md`.

**Differentiation.** Added a side-by-side numbers table plus four paragraphs naming exactly where the collisions are and what carries the difference. Two honest admissions replace what used to read as false distinctness: this archetype's **radius scale (4–8px) and sidebar width (220–260) are identical to `enterprise-dense`'s**, and its **body size and desktop row height are within noise of `fintech-consumer`'s** (16 vs 16, 51 vs 44–48). Both are stated rather than fudged, with the difference relocated to substantive ground — row semantics and undo cost against `enterprise-dense`, neutral temperature / radius / accent-job-count / irreversibility machinery against `fintech-consumer`. Motion was pushed apart with a stated reason: raised from 120/180 to **160/200** (which is also what Mercury measures), because the trigger here is a payment, not a cursor sweeping thirty rows.

**Numbers re-probed 2026-09-10** (Playwright, computed styles, 1440×900, Chrome 128 UA). Ten corrections:

1. **Row height 48–52 → a flat 51px.** Every Mercury data row measures 51.0; the header is 40px.
2. **Content max-width 1180px → none.** The table is 1267px from x=220 running past the viewport edge. 1180 was Column's *docs* column, and the row contradicted this file's own layout section.
3. **Radius "6–8 / 8–12, full-round for filter pills only" → 4 and 8, round not reserved.** Mercury: `8px` ×275, `4px` ×258, `9999px` ×127, `50%` ×118. Column docs are `6px` ×715, not `r8`/`r12`.
4. **Secondary text 13/20 → 14/20 and 12/20.** Only 8 nodes on the page are 13/20; 304 are 14/20 and 126 are 12/20.
5. **Motion 120/180 → 160/200.** Measured `0.2s` ×71, `0.16s` ×70.
6. **Elevation.** The "ring plus ≤10% shadow, two tokens" prescription stands, but Mercury actually ships four layers with a `0.9`-alpha zero-spread ring and `0.14` max diffuse. Restated so the evidence matches the rule.
7. **Ramp's chartreuse "appears twice on marketing; the primary CTA is black" → wrong on both counts.** It fills three buttons in a 1440×900 capture (six over the full page per `references/fintech-and-trust.md`), and `Get started for free` — the primary — is chartreuse. This was a live conflict with the reference file, which had already corrected the "twice" claim; the reference was right.
8. **The 48–56px commit height re-attributed.** It comes from Ramp's `Continue` (576×56, `r0`) and Stripe Elements. Mercury's `Move money` is itself a 32px pill that opens a menu — the old wording implied Mercury as evidence.
9. **Stripe docs body colour** `#3C4257` → `rgb(26,44,68)`.
10. **"60% taller than Attio's"** → 60% taller than a 32px `enterprise-dense` row, 42% taller than Attio's 36px.

Also corrected in a neighbour: `fintech-consumer.md` cited Column's shadow as capping at `rgba(0,0,0,0.03)`, a figure `references/fintech-and-trust.md` had already corrected to 7% (`--shadow-product`, five layers) and which the docs card measures at 10%.

**"When it is the wrong one" rewritten from generic to named.** Was: "a SaaS product with an invoices tab", "a revenue dashboard", "a pricing page". Now: Linear billing / Notion plans; Baremetrics / ChartMogul / Stripe Sigma; **QuickBooks / Xero / NetSuite** (new, and the sharpest — real ledgers whose rows are editable records with a real undo, so `enterprise-dense` with this archetype's numerals as a guest); Coinbase Advanced Trade / Kraken Pro; Copilot / Monarch / YNAB. Plus one edge case: Wise and Revolut send flows are irreversible and still `fintech-consumer`, because irreversibility alone is not the test — third-party accountability is.

**Characteristic failure hardened.** The four tells it shared verbatim with `fintech-consumer` (gradient card, count-up, pastel pills, confetti) are now a one-line pointer to that file instead of a duplicated list, and the section is five failures that only this archetype produces — fake density with the 51px counter-measurement, colour encoding direction, retail cents in the wrong slot, accent inflation, the table in a card. Added a 10-step **"Recognise your own screenshot"** checklist, each step a measurement or a `grep` against a stated value, ending with the two that separate a mockup from a product: `Idempotency-Key` in the codebase, and whether a row can run backwards.

**Cut:** the Plaid `35ms` motion aside (argued against the number the row now sets), the duplicated money-out paragraph (kept prescriptively in Colour, diagnostically in the failure list, not both in full), the merged green-debits / red-money-out pair, and the "always four things at once" framing that preceded a five-item list.
