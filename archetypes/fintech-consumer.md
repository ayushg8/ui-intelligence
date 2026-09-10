# fintech-consumer

**Evaluated:** 2026-09 · **Density:** comfortable — spacious at the balance and money-entry moments, never compact · **Dark by default:** no. Light default, dark theme mandatory (people check balances in bed). Dark-*first* is defensible only when the job is watching money rather than moving it — Copilot Money ships a blue-black `rgb(0,8,20)` app because you sit in it for ten minutes reviewing; Cash App, Monzo and Nubank are white-chromed inside because you are there for twenty seconds.

> Somebody with no financial training, holding a phone, needs to know whether they can afford the thing in front of them — and occasionally has to move money they cannot get back.

## When this is the right archetype

The user is not an operator. They opened the app because of a feeling — did it land, did it clear, can I afford this — and they will close it in 20 to 90 seconds. They do this several times a week for years. They have no runbook, no support contract and no second pair of eyes; if they send £400 to the wrong person, they call a phone number and hope. So the product carries the full trust burden of `fintech-institutional` — same irreversibility, same regulatory surface, same rule that a mis-read digit costs real money — while serving someone who is anxious rather than trained, and who will abandon the flow if it feels like a form at a bank branch. **Warmth is how you keep an untrained person moving through a high-stakes flow. It is not decoration and it is not a brand voice; it is the thing that stops them from freezing.**

- **Choose this over `fintech-institutional`** when the money belongs to the person looking at it, nobody approves anything, and there is no reconciliation job. Operators scan for exceptions across hundreds of rows; consumers ask one question about one number. A freelancer's business account is still `fintech-institutional` — the artifacts (invoices, CSV export, the accountant handoff) are institutional even when the user count is one.
- **Choose this over `expressive-consumer`** the moment a mistake costs money. Duolingo can gamify a streak because the downside of losing it is nothing. A savings streak that shames someone who missed a deposit because rent went up is a product that punishes poverty.
- **Choose this over `consumer-marketplace`** when the primary object is a balance you own, not a listing you pick between. Marketplaces optimize for comparison and browsing; nobody browses their own money. Reciprocally, a marketplace's *checkout* is this archetype's guest pane — the 440px measure and the copy discipline below, and the grid's density stops at its edge (`consumer-marketplace.md` states the same rule from its side).

**The fork from `fintech-institutional`, dimension by dimension.** Same trust requirement, opposite tone. What survives the fork is everything about the *facts*; what inverts is everything about the *frame*.

| | `fintech-institutional` | `fintech-consumer` |
|---|---|---|
| The question on screen | "Does this reconcile, and who approved it?" | "Can I afford this, and did it land?" |
| Session | 40 min, daily, desktop, with a spreadsheet open | 20–90 s, several times a week, on a phone |
| Neutral temperature | **Cool.** Column `#12161E`, R<G<B | **Warm.** Monarch `#22201D` on `#F6F5F3`, R>G>B |
| Radius | 3–8px (Stripe Elements `4px`, Mercury nav/input `r8`, Ramp's product `0`) | 12–16px containers, `9999px` actions |
| Rows | 44–48px, dense, twelve columns, virtualized | 64px on mobile, three fields, day-grouped |
| Type scale | Flat — Stripe's docs `h1` is `24/32` because thirty things compete | Steep — one 40–56px balance against 16px body |
| Copy verbs | `initiate · submit · settle · return · recall` | `send · land · clear · saved · left` |
| Mobile | The reduced product; build an approval flow, not a table | **The product.** Desktop is the reduced one |
| Warmth budget | Zero, everywhere | Frame only: ground, illustration, empty states, chips, card art |
| **Unchanged across the fork** | Precision rules · closed status vocabulary · two-layer errors · named deposit protection · no gradient on a balance · no animated counter · no colour on an amount | ← identical |

**The near-collision with `expressive-consumer`.** This is the real risk in the corpus, because the *numbers do not fork* — both files were measured in 2026-09 and they land on top of each other:

| | `expressive-consumer` | `fintech-consumer` |
|---|---|---|
| Body | 16/24 | 16/24 |
| Content row | 56–64px | 64px mobile |
| Primary control | 48px (50–54 for the one CTA) | 48px (56px input) |
| Radius cap | 16px structural, two values total | 16px structural, `9999px` actions |
| Micro motion | 150ms | 140ms |
| Shell | bottom tabs, ≤5 items | bottom tabs, ≤5 items |
| Dark by default | either | light |

Six of seven inside noise, and that is correct rather than a defect: **both serve one untrained person holding one phone for ninety seconds, so the ergonomics are the same problem and have the same answer.** Pushing the geometry apart to manufacture a difference would make one of the two files wrong. So say it plainly — *this archetype shares its density, its shell and its motion budget with `expressive-consumer`; the difference lives entirely in four rules that constrain what may touch a number*:

1. **Colour may not touch a fact.** Duolingo colours the streak count, because the streak *is* the feeling. Here the number is a claim about money that exists, and it stays neutral. Count the colours adjacent to an amount, a status or a fee: `expressive-consumer` has no budget on this, and this archetype's answer is zero.
2. **Status is a word from a closed set** — `Pending / Settled / Returned / Failed / Cancelled` — identical in the app, the email, the export and the API. `expressive-consumer` may ship an icon, a colour, or a mascot state, because nothing downstream has to reconcile against it.
3. **Nothing animates a quantity.** `expressive-consumer` spends its one 400–700ms celebration *on the number* (the XP count-up is the product). Here a count-up on a real balance is forbidden outright, and celebration fires on a lifecycle event, never a routine one.
4. **Precision is stated, never rounded to feel better.** `$1.2k` is legitimate in a habit tracker and a defect here, because the user is comparing it to a bank statement.

The mechanical test is one question: **can the user lose money by tapping the wrong thing on this screen?** If yes, this file governs that screen — even inside a product that is otherwise `expressive-consumer`, and even if the streak, the round-up mascot and the goal celebration two screens away are perfectly legitimate. `expressive-consumer` states the same boundary from its side; the two files agree, which is why the boundary is enforceable.

**Mixing.** A consumer bank with an AI money assistant is `fintech-consumer` *hosting* an `ai-product` drawer — the assistant does not get to restyle the ledger, and it never states a balance the ledger isn't already showing. A tracker like Copilot is `fintech-consumer` hosting `analytics-bi` in its charts pane, which is why its desktop rows compress and its mobile ones don't.

## When it is the wrong one

**Robinhood, Coinbase, Webull.** A retail brokerage is the closest false positive in the set: consumer user, own money, phone, twenty-second session. It breaks on one property — the number moves on its own. A live P&L is `data-terminal` content wearing a consumer shell, and it needs tick colours, tabular digits and a serious register. Robinhood buys that seriousness deliberately — warm near-black `rgb(17,14,8)`, a `Martina Plantijn` serif at `72/64.8`, zero shadows, zero transitions — because the gamification accusation nearly killed it and it removed its confetti in 2021 (measured in `expressive-consumer.md`). Apply this file's warmth to a live P&L and you have built a casino.

**MetaMask, Phantom, and any self-custody wallet.** Superficially the purest version of this archetype — your money, your phone, one balance. It breaks on the component this file makes mandatory: there is no deposit-protection line to put in the first viewport, no chargeback, no phone number, and no recall. Warmth over an irreversible on-chain send is worse than warmth over a bank transfer, not equivalent. The send flow goes institutional; the address string gets the mono-identifier treatment below and then some.

**Klarna, Afterpay, Affirm, Zilch; Chime Credit Builder, Credit Karma, Cleo.** BNPL, lending, overdraft and credit-building all present as consumer money apps and all invert the incentive: the product profits when the user commits to a repayment they may not make. `You've got £200 of Spend Now available!` is a payday-loan ad with a design system. These need the institutional register plus `institutional-civic` clarity duties — APR at body size, *total repayable* stated above the CTA rather than under it, the late-fee schedule on the confirm screen, and no celebratory colour anywhere in the flow. The specific tell that you got this wrong: a green chip on a disbursement.

**Gusto, Deel, TurboTax, HMRC Self Assessment, Universal Credit, IRS Direct File.** Payroll, tax, benefits and disputes look adjacent — money, a phone, an anxious non-expert — and break on the shape of the fear. It is not "can I afford this," it is "will I be penalised, and by when." Deadlines and legal consequence make friendly copy read as evasive: `Nearly there!` above a filing deadline is a product hiding a date. Go `institutional-civic`.

**QuickBooks, Xero, FreeAgent, Wave — and the freelancer's business account.** The moment the output is a statement that must reconcile to the penny, or a CSV someone else imports, the precision rules flip to institutional and the layout has to survive being a table. A one-person business is still `fintech-institutional`: the artifacts are institutional even when the user count is one.

**Venmo's feed, specifically.** One product, two archetypes, and the split is visible in the app: the public payment feed is `social-community` (a payment there is a post, with an author, a caption and reactions), while the balance, the send sheet and the transaction history are governed here. Ship one register across both and either the feed is funereal or the send flow is a chat app.

What breaks if you apply this archetype anyway: rounded 16px cards and pill buttons around a margin call; a green celebratory chip on a loan disbursement; a 64px row height in a screen that needs to show forty positions; and — most damaging — copy that sounds like a friend in a moment where the user needs it to sound like a bank.

## Reference products

| Product | Why | The one thing to steal |
|---|---|---|
| **Cash App** | Loudest consumer brand, quietest product | The brand green is the *marketing ground*; inside the app the chrome is white/black with neutral gray pills (~46–48px, `radius: 999px`). The brand does not enter the room where the money is |
| **Monzo** | Consumer warmth with real regulatory discipline | FSCS Protected and Current Account Switch Guarantee marks sit **directly under the hero CTA** — `y≈790` at 1440×900, above the fold; `y≈841` at 390 — never in the footer, and the amount is stated (`protected by the FSCS up to £120,000 per person`). Body type is pinned at exactly `1rem` (`--step-0: clamp(1rem, 1rem + 0vw, 1rem)`) while headings scale to `--step-6` |
| **Nubank** | The warm pole at national scale | The signup input is in the hero: a `56px`-tall CPF field at `18px` with a `56px` `Continuar` CTA directly under it (the `48px` button is the nav's `Quero ser Nubank`, a different job). Radii 2026-09: `999px` ×41, `12px` ×36, `16px` ×9 — pills for actions, gentle rectangles for containers, one 24px instance in 88 |
| **Wise** | The transparency grammar consumers borrow from | Arrival as a weekday (`Arrives — by Friday`) and fee inclusion stated in words (`Included in USD amount`) with a drill-down chip. Measured in `references/fintech-and-trust.md` |
| **Copilot Money** | Consumer warmth with institutional numeral discipline | Whole-dollar aggregates (`$832`, `$368`) beside cent-exact line items (`$10.99`, `$32.86`) *in one view*. Precision is a property of the row's job, not of the product |
| **Monarch Money** *(less-named)* | The warm-neutral consumer ramp done as a system | A 12-step warm gray (`#FBFAF8` → `#22201D`, R>G>B at every stop) on a `#F6F5F3` ground, with shadows tinted `rgba(34,32,29,0.05)` — the *text* colour at 5%, never black |
| **bunq** *(off-list)* | The counter-example that proves the split | Full rainbow-gradient dark marketing site; the app behind it is flat and white. If you only ever see bunq's homepage you will build the wrong product |
| **Revolut** | Single-currency balance treatment | Home balance is `£6,012` — no decimals, symbol inline at full size and weight, `Personal` as a small light label above it |

## The numbers

| | Value | Because |
|---|---|---|
| Body | **16px / 24px** | Measured 2026-09: Monarch's `body` computes to `16/24` (its marketing prose runs `18/25.2 w350`, a reading size, not a UI size); Monzo pins `--step-0` at exactly `1rem` so body never shrinks on a phone, and its own leaf body type measures `16/22.4`. This is a first-run surface read by someone in a hurry who may be 55; 14px is hostile here even though it is correct in `technical-productivity` (`craft/typography.md`). 16px is also the iOS input floor — below it Safari zooms the viewport on focus, which mid-payment feels like a crash |
| Dense/secondary text | **14px** for metadata, **12px** for legal only (`#999`-class muted) | Cash App's legal line measures `12px / 14.4px` at `rgb(153,153,153)`, re-probed 2026-09. 12px is permitted *only* for statutory text nobody acts on. A category, a date or a status at 12px is an accessibility failure with a legal downside |
| Page title | **The balance is the title. 40–56px, weight 500–600** | Revolut's `£6,012` and Cash App's in-app `$789.13` are display-scale. There is no "Home" heading above it — the number is the heading. Marketing h1s run larger (Cash App `56/53.2`, Nubank `112/105.28`) and must not leak into the app |
| Row / list-item height | **64px mobile, 44–48px desktop ledger** | A row carries merchant, category chip, date and amount and must be hit with a thumb; 48px is the floor for touch (`craft/space-and-layout.md`), 64 gives two lines. Copilot's desktop transaction rows read ~40–44px because a mouse is precise and the job there is review, not tapping |
| Control height | **48px primary action, 56px input** | Measured 2026-09: Wise CTA `48px`, Cash App pills `42–48px`, Nubank nav CTA `48px`; Nubank's in-hero signup input is `56px` at `18px` and its `Continuar` CTA matches it at `56px`. The input is taller than the button because it takes a keyboard and a caret; a signup CTA may match the input it sits under |
| Sidebar width | **None on mobile — bottom tab bar, ≤5 items.** Desktop app: 220–260px | Copilot's desktop sidebar is the account list itself, with a colour dot and a whole-dollar balance per account. On a phone, a drawer hides the one thing the user came for |
| Content max-width | **440px for any money-entry or confirmation flow, even at 1440px.** 720–880px for ledgers and statements | A send form stretched across 1200px puts the amount and the confirm button in different visual fields. The flow was designed for a thumb; keep its measure |
| Radius (control / container) | **Control 12px · container 16px · actions and chips `9999px`.** Hard cap 16px on structural surfaces | Re-probed 2026-09 — Nubank `999px`×41 / `12px`×36 / `16px`×9 / `8px`×1 / `24px`×1; Monarch `9999px`×16 / `12px`×14 / `8px`×10; Wise `--radius-small 10 / medium 16 / large 24 / xlarge 32`. Counts drift as marketing pages rotate; the *ordering* is the finding — pills dominate, then 12, then 16, and almost nothing above. The institutional pole sits at 3–8px (Stripe Elements `borderRadius: 4px`, Mercury `r8`, Ramp `0`). Consumer earns the extra 8px; 24px+ everywhere is the generated-UI tell |
| Border weight & colour | **1px, and mostly absent.** Separate by ground: `#F6F5F3` page vs `#FFFFFF` card | Monarch's page is `gray-2` and its cards are white — the card is defined by being *lighter than the page*, not by a line. Where a border is needed, use the warm text neutral at 8–10% alpha, never a cool `#E5E7EB` |
| Elevation | **One shadow, tinted with the text neutral, max 10% alpha** | Monarch: `rgba(34,32,29,0.05)` and `rgba(34,32,29,0.1)`. Compare institutional Column, which caps at `rgba(0,0,0,0.03)` and carries the card on a hairline ring. Consumer buys the extra few percent because its cards are tap targets and lift signals tappability — that is the entire licence, and it does not extend to a 20% drop shadow |
| Motion (micro / standard) | **140ms tap · 220ms sheet · 280ms native bottom sheet** | Wise's site runs `350ms` default / `200ms` short / `600ms` long — marketing-page numbers. In a 20-second session a 400ms entrance is 2% of the visit spent watching |

## Colour

**The neutral is warm and it is the single clearest fork from `fintech-institutional`.** Monarch's ramp runs `#FBFAF8 · #F6F5F3 · #EFECEA · … · #8F8C8A · #22201D` — R > G > B at every stop. Column, a chartered bank, runs `#F6F6F8 … #12161E` — R < G < B at every stop. Same twelve steps, opposite temperature, and nobody can name the difference while everybody feels it: warm paper reads as *your money*, cool paper reads as *the institution's records*. In OKLCH terms stay at hue 60–100, chroma 0.006–0.015 (`craft/color.md`). Twelve steps, not six — you need three greys of muted text and three of surface to build a ledger without lines.

**The accent is the brand colour and it gets exactly three jobs: the primary action, the brand mark, and one identity surface (the card art, the pot illustration).** It never touches a balance, an amount, a status or a chart series. Cash App is the proof: its green is the entire homepage ground and *disappears* inside the app. Nubank's `#8D0DE3` is on the CTA and the logo; the hero heading beside it is white and the secondary surface is a warm beige `#F3EFE6`.

**Semantics are asymmetric here, unlike institutional.** In a consumer feed money-in and money-out *do* have a direction the user feels, so money-in may be green — but money-out is **neutral, not red**. Red means something failed. If every debit is red, a genuine failure has nowhere to go, and the ledger tells someone their entire life is an error. Use the two-ramp discipline from Wise: one dark green for positive *text* (`#008026`), a brighter one for *fills* (`#2EAD4B`), a ~10% wash for *backgrounds*, and no other green anywhere.

**Where warmth is allowed, and where it is a trust failure.** Allowed: the page ground, illustration, empty states, onboarding, category chips, pot and goal art, the card design. Forbidden: the amount, the balance, the status word, the confirmation screen, the fee line, and any error. The rule is one sentence — **colour and personality live on the frame, never on the facts.** Copilot enforces it by position rather than taste — see the category-chip spec under Components.

**Light default; dark as a real re-map, not an inversion.** Consumers check balances at night, so dark must exist and must be built (`system/3-tokens.md`). Do not ship dark-first for a money-movement app: a dark balance screen reads as trading, and the demographic that most needs your product least expects it.

## Type

A face with **open apertures and a little warmth** — a humanist or soft-grotesque, not an engineered one. `craft/typography.md` is explicit that Geist's closed apertures read cold at small sizes; that is exactly the wrong instinct here. The serious consumer products all ship a bespoke optical pair: Nubank has `nuSansDisplay` and `nuSansText` as separate faces, Cash App has Cash Sans, Monarch pairs a **serif display (Copernicus) with a sans UI face (ABC Oracle)** — the serif buys gravity for the headline while the numbers stay in the sans.

**Scale shape: high contrast at the top, flat at the bottom.** The balance at 40–56px against a 16px body is a 3× jump, and everything between 16 and 40 is nearly empty. That is the opposite of institutional, where Stripe's own API-reference `h1` is only `24px / 32px` because thirty things on screen compete. Here one thing wins and the type scale says so.

**Weights: 400 / 500 / 600.** The balance sits at 500–600 — not 800. Monzo's `w800` and Nubank's `w600` at 112px are marketing weights; a balance set in a marketing weight reads as a claim rather than a fact. Monarch runs everything, headings included, at **350**, which is a defensible warm-quiet alternative but only works with a face drawn for it.

**Numerals.** Tabular in the ledger column and in anything that ticks. Proportional for the single hero balance — Wise sets its 52px amount in proportional figures at `letter-spacing: normal`, and a number that never changes has neither an alignment nor a jitter problem. Never superscript the cents and never shrink the currency symbol: `$29⁹⁹` is a retail device engineered to make a number *feel smaller*, which is the precise opposite of the job. Precision changes within one screen — aggregates whole-dollar, line items to the cent (Copilot, measured).

**Monospace earns its place on exactly one class of string: digits you copy or read aloud.** Account and routing numbers, sort code, IBAN, reference IDs, the last-four. Those get mono at 18–20px with generous tracking and a one-tap copy. The balance does not get mono — it is a quantity, not an identifier.

## Layout and navigation

**The shell is a phone even when it is a browser.** Bottom tab bar, five items maximum, with the money action given a distinct centre affordance so it is reachable without a hand shuffle. Desktop, when it exists, is a left rail carrying the account list with a live balance per account (Copilot) — the rail is the account switcher, not a menu.

**The primary object is the balance, and it gets an uncontested band.** Nothing shares its horizontal row: no avatar, no notification bell, no "hi Sarah 👋". Revolut's treatment is the reference — a small light `Personal` label above, then the number at display size, and air below it before anything else starts. Second object is the transaction, and it is a *row*, not a card.

**Grouping is temporal, because the question is temporal.** Transactions group by day with sticky headers (`TODAY`, `YESTERDAY`, then dates) — Copilot's ledger, and every consumer bank worth copying. Grouping by category is a secondary view, never the default: nobody opens their bank asking "what did I spend on groceries," they ask "what happened."

**Cards: yes, with one rule.** A card is an account, a pot, a goal, or a scheduled payment — an independently actionable object with its own balance. A transaction is never a card, and no card is ever nested inside another. The moment you wrap each ledger row in a rounded white rectangle you have tripled the vertical cost of the screen and destroyed the column alignment that lets someone scan amounts.

## Components

**Belongs here:** bottom tab bar; a **custom numeric keypad** for amount entry (you control the decimal behaviour, the thousands separator and the maximum, and you get a large action in the thumb zone — the system keyboard gives you none of that); bottom sheet for confirmation; day-grouped ledger with sticky headers; category chip (tinted, emoji inside, ~10px, far side of the row from the amount); pots/goals with a progress ring and a plain "£183 left" / "£206 over" label whose *word* changes with the state, not just its colour (Copilot); a status word chip from a closed set; a "Details" disclosure hiding the machine reference code; a big copyable account-number row; a freshness stamp (`Updated 1 minute ago` — Monarch renders one beside every connected account balance); and a permanent, named deposit-protection line — Monzo puts FSCS and the Switch Guarantee in the first viewport, not the footer.

**Does not belong here:** a gradient balance card (the single loudest tell); an animated count-up on a real balance; confetti on a completed payment; streaks, leaderboards or any gamified savings mechanic; a data table on a phone; ✅/❌ as a status indicator — status must be a *word*, because words survive screen readers, search, CSV export and colour blindness; a toast as the only error surface for a money action; a modal that dismisses on backdrop tap during a send confirmation; a carousel anywhere near a number; a shimmer skeleton that renders `$0.00` before the real value lands. Use instead: a flat surface, a number that appears once and correctly, a bottom sheet with an explicit dismiss, and an inline error attached to the field or the action that failed.

## States in this archetype

**Empty.** The first-run ledger is the most anxious screen in the entire product — the user has just moved money in and is asking *did it arrive*. Do not draw a piggy bank. Show the account and sort/routing number at display size with a copy affordance, the exact status of any inbound funds, and one action. One warm sentence is allowed above it and must not replace any of the numbers: `Nothing here yet. Anything you receive shows up straight away.`

**Loading.** Never render `$0.00` while fetching; a user who sees zero for 400ms has a small heart attack. Skeleton the balance at the width of the *widest plausible* value so nothing jumps when it lands, and render everything you already know — the nav, the account name, the card art — instead of a full-screen spinner. Do not shimmer the money.

**Error.** Two layers, both required. A human sentence that says what happened then what to do, and a machine reference tucked behind "Details" or a copyable code. Never joke: someone whose card just declined is often short, and `Yikes! 😅 Your card said no` is a product laughing at a person in a bad moment. Never guess the reason — `Your bank declined this payment` is honest; `Insufficient funds` when the code was `do_not_honor` will enrage a user who has money.

**Too much.** Consumers accumulate five years of transactions and they *scroll*; do not paginate a personal ledger. Virtualize at a fixed row height so scroll position is arithmetic, add merchant search and a month jump, and keep the month header sticky so the user always knows where they have landed. The institutional answer — a filter set mirroring the object model — is wrong here; a consumer does not know what a rail is.

**Stale / offline.** Show `Balance as of 2:14 PM` rather than implying live. If a payment was submitted and the network dropped, say `Submitting…` and then `We couldn't confirm this. Check Activity before trying again` — never a bare retry button that fires a fresh request without an idempotency key.

## Motion budget

**Allowed:** 140ms tap feedback (opacity, or scale to 0.98 — not a bounce); 220ms sheet and tab transitions; a 280ms spring on a native bottom sheet; a one-time draw-in on a chart the first time it is seen in a session, never on every navigation. **One celebration per genuine lifecycle event** — a savings goal actually reached, the first salary landing — fired once and never on a routine deposit.

**Forbidden:** counting a real balance up from zero (it is a slot machine, it delays the only answer on screen, and a user who navigates mid-animation sees a false number); confetti on a send; shimmer on money; any hover motion; parallax; and motion that gates the confirm button. If a number must animate because it changed while you watched, tick only the changed digits with tabular figures so nothing reflows. Honour `prefers-reduced-motion` by dropping to opacity-only.

## Mobile

**This archetype is mobile. The desktop is the reduced product** — the inverse of `fintech-institutional`, where the phone is the reduced one. Cash App, Monzo, Nubank and Revolut all market themselves in phone screenshots because that is where the product actually is.

Web earns its place for the jobs a phone is bad at: statements and downloads, disputes with evidence upload, tax documents, connecting external accounts, and long ledger review. The exception is the *tracker* subclass — Copilot and Monarch are genuinely co-primary on desktop, because reviewing three hundred transactions and re-categorising them is mouse work; note that both then run a compact desktop ledger (~40–44px rows) and a comfortable mobile one (64px), which is the correct answer, not a compromise.

Non-negotiables: 48px minimum touch targets; the primary action inside the bottom third; a custom numeric keypad for amounts; and body copy that never shrinks to fit a layout — Monzo pins `--step-0` for exactly this reason, because shrinking body text on a phone is how a legal disclosure becomes unreadable.

## Copy register

Second person, contractions, short sentences, and a personality — spent entirely on the **frame** (headlines, empty states, onboarding, a genuine milestone) and withheld entirely from the **facts** (amounts, statuses, fees, errors, confirmations). Status words are a closed set — pick `Pending / Settled / Returned / Failed / Cancelled` and use exactly those in the app, the email, the export and the API. Arrival is a weekday, never a duration: "by Friday" is checkable, "1–3 business days" makes the user do calendar maths and know your holiday schedule.

- `Your money's on the way. It'll land by Friday.` — beats *"Payment initiated successfully. Settlement pending."* (correct, and nobody talks like that to a person)
- `That didn't go through — your bank declined it. Try another card, or call the number on the back.` — beats *"Transaction failed. Please try again."* (useless, and actively wrong advice when the cause is `insufficient_funds`)
- `Send £420.00 to Marcus Hale (Barclays ••4471)? Arrives instantly.` — beats *"Confirm this transfer?"* (a confirmation that restates nothing is a speed bump, not a confirmation)
- `Nothing here yet. Anything you receive shows up straight away.` with the account number right underneath — beats *"No transactions found."* (which reads, to an anxious first-week user, like the money is gone)

Never: an exclamation mark on a money fact; an emoji in a failure string; "Oops"; or the word "instant" unless the rail genuinely is.

## The characteristic failure

**The friendly-bank mockup.** Recognisable from a screenshot in about two seconds, and it is always the same stack at once. The tells, at the values they actually ship at:

- A **gradient balance card** — `linear-gradient(135deg, #7C3AED, #EC4899)` or the teal→lime variant — at `border-radius: 24px` with `box-shadow: 0 20px 40px rgba(0,0,0,0.2)`. This one alone is diagnostic.
- The **balance counting up** from `$0.00` over ~800ms on every mount, usually a `CountUp`/`react-spring` import.
- A **rounded geometric face on the number** — Poppins, Nunito, Quicksand, Baloo. Circular digits with closed apertures on a quantity.
- A **pastel status pill per state**: `Pending` `#EDE9FE`, `Settled` `#D1FAE5`, `Failed` `#FEE2E2`. Nothing reads as urgent because nothing is *not* pretty, and failure sits one hue-step from pending.
- **Emoji as the status** — ✅ ⏳ ❌ — or one emoji per merchant, LLM-picked.
- **`$1.2k`** where the real number is `$1,247.83`, and a `+12.4%` delta in green next to it.
- **Confetti on send**, and a `🎉 Payment sent!` toast as the only confirmation surface.
- Each ledger row wrapped in **its own white rounded card** with 16px gaps, so nine transactions fill a phone screen and no two amounts align.
- An **empty state with a piggy-bank or a coin-stack illustration** and no account number anywhere on it.
- Copy: `Yikes! 😅`, `Oops, something went wrong`, `You're crushing it!`, `Let's get you paid! 🚀`.

Self-diagnosis against your own screenshot, in order:
1. Is there a gradient, a shadow above 10% alpha, or a radius above 16px on any surface that holds a number? Every one is a marketing material that walked through the login.
2. Does anything animate a real balance? Delete it.
3. Count the colours touching an amount, a status or a fee. The answer must be zero.
4. Is any status an emoji, an icon alone, or a colour alone rather than a word?
5. Is a number rounded anywhere the user would reconcile it against their bank statement?
6. Is a ledger row a card? Cover the amounts column with a finger — if the remaining rows are ragged rather than aligned, you have built cards.
7. Read the error string aloud to someone whose card just declined. If it would embarrass you, it ships to them thousands of times a day.

The underlying error in every case is the same and it is worth naming precisely: **the team applied warmth to the facts instead of to the frame.** Cash App's homepage is a full-bleed brand green and its balance screen is black type on white. Copilot's marketing hero is 148px type over a blue-black ground with a dozen saturated pills flying past, and its transaction row is a merchant name, a small tinted chip, and `$32.86` in plain type. The warmth is real in both, and it stops at the number.

The opposite failure exists and is rarer but worse for retention: cloning the institutional pole — cool blue-black neutrals, 4px radii, `Transaction settled`, `Initiate transfer` — into a consumer app, which reads to a nervous person as a debt collector rather than a bank.

## Signature decisions that fit here

1. **A running balance on every ledger row** — `−£24.60 · £412.18 left` — in the same row as the amount, muted. The user's actual question after any transaction is "what's left", and every product that omits this makes them do arithmetic on a phone in a shop.
2. **The category chip is the only coloured object in the ledger, and it is anchored to the opposite edge from the amount.** Colour then never touches a number anywhere in the product, and the rule is enforceable by position rather than by taste.
3. **Paired rows for split events.** A round-up, a fee, a pot transfer and its trigger purchase render as two rows joined by a hairline tie with one shared timestamp — because a user who sees two entries for one coffee believes they were charged twice, and that is a support ticket and a trust loss.
4. **Arrival is a chip in the amount's row, present at entry and again on the receipt** — `Lands Friday` — so the commitment is made before the user is asked to confirm and is still visible afterwards, instead of appearing once in a success screen they swipe away.
5. **The account-number screen is a first-class destination**, one tap from home, with the digits in mono at 18–20px, generous tracking, and a copy affordance per field. "Where do I find my number" is the most common first-week support ticket in every consumer bank, and it is a layout problem, not a help-centre problem.

## Sources

Screenshots at 1440×900 and 390×844 read as images; computed styles and custom properties extracted with a Playwright probe, September 2026.

- `https://cash.app` — Cash Sans `h1 56/53.2` w400 `ls -1.68px`, body `15/18`, legal `12/14.4` `#999`, CTA `radius 100–1000px` at 42–48px; the in-app card screen showing brand green as page ground and the app chrome as white/black with neutral gray pills and `$789.13` in flat near-black
- `https://www.monarchmoney.com` — the full 12-step warm gray (`#FBFAF8`→`#22201D`) plus Radix-derived orange/green/red scales; `--font-primary: ABC Oracle`, `--font-secondary: Copernicus`; `body` computes `16/24` `#22201D` on `#F6F5F3` while marketing prose runs `18/25.2 w350`; `h1 48/57.6 w350 ls -3.2px` in the serif; radii `9999px`×16 / `12px`×14 / `8px`×10; shadows tinted `rgba(34,32,29,0.05)`, `0.075` and `0.1`; hero product imagery with `NET WORTH $335,595.28`, a `$3,353.81` delta, and `Mark Checking $5,259.00 · 1 minute ago`
- `https://copilot.money` — marketing: `rgb(0,8,20)` ground, Jokker at `h1 148/133.2 w600`, radii census `24px`×55 / `20px`×37 / `16px`×30. Product screenshots: sidebar accounts at whole dollars (`$832`, `$1,594`), transactions cent-exact (`$10.99`, `$32.86`, `$21.35`, `$56.40`), `TODAY`/`YESTERDAY` day groups, emoji category chips opposite the amount, `Mark 6 as reviewed`, budget rings labelled `$206 over` / `$63.25 left`, mobile `$2,272 left out of $5,400 budgeted`
- `https://nubank.com.br` — `nuSansDisplay` / `nuSansText` optical pair, `h1 112/105.28 w600 ls -1.4px`, accent `rgb(141,13,227)`, secondary surface beige `#F3EFE6`, CPF input `56px` tall at `18px` with a `56px` `Continuar` CTA under it (nav CTA `48px`), radii `999px`×41 / `12px`×36 / `16px`×9 / `8px`×1 / `24px`×1
- `https://monzo.com` — FSCS Protected and Current Account Switch Guarantee marks inside the first viewport; `--step-0: clamp(1rem, 1rem + 0vw, 1rem)` pinning body while headings scale; `h1 48.83/58.59` w800
- `https://www.bunq.com` — dark rainbow-gradient marketing against a flat white app; the clearest available demonstration that the marketing palette and the product palette are two systems
- `https://wise.com/us/send-money/` — re-probed 2026-09 and matching `references/fintech-and-trust.md`: `48px` CTA at `radius 9999px` on `#9FE870`, `Arrives` `14/21.7` → `by Friday` `16/24 w600`, `Total fees` → `Included in USD amount`, amount input at `52px`, rate pill `1 USD = 0.8595 EUR / Guaranteed for 12h`, `--radius-small 10 / medium 16 / large 24 / xlarge 32 / full 9999`. **Corrected from the prior pass:** `--btn-radius-base` is `9999px`, not `3px` — Wise's buttons are fully round and radius is not a shared scale with its cards, so Wise is no longer usable as evidence for the institutional 3–4px pole
- `references/fintech-and-trust.md` — all Wise, Revolut, Column, Stripe, Increase and Mercury values are cited from that teardown rather than re-derived: the two-ramp semantic system at `0.10196` alpha, Column's cool ramp `#12161E`, Stripe Elements `borderRadius: 4px` and the 16px mobile-input rule, Revolut's `£6,012`, the tabular-figures census
- `https://www.revolut.com`, `https://www.chime.com`, `https://lunchmoney.app` — all three returned Cloudflare interstitials to headless Chromium. No values were taken from them; Revolut's figures here come from the prior teardown, and Chime and Lunch Money contributed nothing

## Differentiation pass (2026-09)

Compared against `fintech-institutional.md`, `expressive-consumer.md` and `consumer-marketplace.md`; cross-checked against `references/fintech-and-trust.md`.

**Differentiation.** The institutional fork was already explicit and survives. The real collision was `expressive-consumer`, whose body size, row height, control height, radius cap, micro-motion duration and navigation shell are all within measurement noise of this file's. Rather than manufacture a numeric split — which would have made one of the two files wrong, since both serve one untrained person on one phone for ninety seconds — the shared geometry is now stated outright and the fork is relocated to four enforceable rules about what may touch a number, plus a one-question mechanical test. Added the reciprocal `consumer-marketplace` line (checkout is this archetype's guest pane), which that file already asserted from its side.

**Numbers re-probed** (Playwright, headless Chromium, 1440×900 and 390×844, 2026-09):
- **Wise `--btn-radius-base` is `9999px`, not `3px`.** Corrected in three places. Wise's buttons are fully round; it can no longer be cited as evidence for the institutional 3–4px pole, which now rests on Stripe Elements `4px`, Mercury `r8` and Ramp `0`. `references/fintech-and-trust.md` had already corrected this — the archetype file was the stale copy. Re-confirmed on the same page: `48px` CTA at `r9999px`, `Arrives / by Friday`, `Total fees / Included in USD amount`, `52px` amount input, `--radius-small 10 / medium 16 / large 24 / xlarge 32`.
- **Nubank's in-hero signup CTA is `56px`, not `48px`** — it matches the `56px` CPF input above it; the `48px` button is the nav's. Radii census refreshed to `999px`×41 / `12px`×36 / `16px`×9 / `8px`×1 / `24px`×1 and reframed as an ordering rather than exact counts, which drift. `h1 112/105.28 w600 ls-1.4px` and accent `rgb(141,13,227)` re-confirmed.
- **Monzo's FSCS and Switch Guarantee marks sit under the hero CTA at `y≈790` (1440) / `y≈841` (390)**, not "next to the hero" — above the fold at desktop, at the fold on mobile. Protection amount is now `£120,000`, not the older `£85,000`. `--step-0: clamp(1rem, 1rem + 0vw, 1rem)` and `h1 48.83/58.59 w800` re-confirmed.
- **Monarch:** `body` computes to `16/24`; the marketing prose is `18/25.2 w350`, so the "16/24 measured" claim was ambiguous and is now split. Ground `rgb(246,245,243)`, text `rgb(34,32,29)`, `h1 48/57.6 w350 ls-3.2px` Copernicus, shadows `rgba(34,32,29,0.05)` and `0.1` — all confirmed. Radii `9999px`×16 (was ×22).
- **Cash App:** `h1 56/53.2 w400 ls-1.68px` and legal `12/14.4` at `rgb(153,153,153)` confirmed exactly. CTA heights span 42–48px (was stated 42–46), radius `100–1000px`.

**Wrong-archetype section** rewritten from four generic categories to named products that superficially fit and specifically break: Robinhood/Coinbase/Webull (the number moves on its own); MetaMask/Phantom (no protection line exists to put in the first viewport, no recall); Klarna/Afterpay/Affirm/Zilch/Chime Credit Builder/Credit Karma/Cleo (the product profits from a commitment the user may not make); Gusto/Deel/TurboTax/HMRC/Universal Credit/IRS Direct File (the fear is penalty, not affordability); QuickBooks/Xero/FreeAgent/Wave (output must reconcile to the penny); and Venmo's feed as the one product that splits inside itself.

**Characteristic failure hardened** from an eight-item prose list into ten tells at the values they ship at — the exact gradient, `border-radius: 24px`, `0 20px 40px rgba(0,0,0,0.2)`, the ~800ms count-up, the four rounded-geometric faces, the three pastel status hex values, the row-as-card pattern, and the copy strings — so an agent can match its own screenshot and its own CSS against them. Self-diagnosis grew two checks: cover the amounts column to detect cards, and read the decline string aloud.

**Cut:** the Copilot category-chip anatomy stated four times, now once as a spec plus once as a rule; the motion-budget preamble that restated the numbers table; the third repetition of the 16px iOS-input floor.
