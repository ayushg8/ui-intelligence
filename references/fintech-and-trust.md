# Fintech, money and trust-critical interfaces

**Evaluated:** 2026-09

## What this archetype is for

Interfaces where the numbers on screen are claims about money that actually exists, and where the user's next action may be irreversible within seconds. That covers business banking (Mercury, Brex), spend management (Ramp), cross-border transfer (Wise, Revolut), consumer banking and P2P (Monzo, Cash App, Nubank, Chime), brokerage (Robinhood, Coinbase), and the money-movement infrastructure layer (Stripe, Modern Treasury, Column, Increase, Plaid, Fragment, Lithic). It does *not* cover crypto-casino UI, pricing pages, invoicing-as-a-feature inside a SaaS product, or dashboards that merely display a revenue number — those show money, they don't move it. The distinguishing test: **if a mis-read digit or a mis-clicked button costs the user real money that they cannot claw back with an undo, you are in this archetype.** Everything below is downstream of that.

## The reference set

| Product | Why it's here | The single thing to steal |
|---|---|---|
| **Stripe** | The de-facto grammar for payment status, decline handling and developer-facing money UI | The `seller_message` / customer-message split: one event, two audiences, two strings, and a documented rule about which internal states you must *not* reveal |
| **Mercury** | The institutional-serious pole done at consumer polish | A persistent, non-dismissible legal-status bar ("fintech company, not an FDIC-insured bank … Choice Financial Group and Column N.A., Members FDIC") pinned in the first viewport |
| **Ramp** | Extreme color restraint in a dense finance product | Chartreuse `#E1FC53` appears exactly twice on the page — one secondary CTA and one count badge. The primary CTA is black. |
| **Brex** | Type engineering for numerals | Inter loaded with `"liga" 0, "calt" 0, "zero" 0` — ligatures and contextual alternates disabled outright, and the slashed zero deliberately turned **off** |
| **Wise** | The canonical fee-and-FX disclosure UI, fully public | Currency is a *selector pill on the left*, not a `$` glyph; the amount field carries no symbol at all |
| **Monzo** | Consumer-warm with a real fluid type system | Every step is a `clamp()` — `--step-0` is locked at exactly `1rem` with `0vw` so body text never scales, only headings do |
| **Cash App** | Loud brand, quiet product | Brand green is a marketing surface only; inside the app the chrome is white/black with neutral gray pills |
| **Robinhood** | Seriousness bought with typography | A high-contrast serif (Martina Plantijn) for editorial headlines in a product that used to be accused of gamification |
| **Coinbase** | (Cloudflare-gated to headless; measured only via challenge page) | — |
| **Plaid** | The permission/consent layer | A four-step shadow scale where only geometry changes — every level is `hsla(0,0%,7%,.08)` |
| **Modern Treasury** | Double-entry made legible | Debits and Credits panels are headed in **slate and clay**, not green and red |
| **Column** | A nationally chartered bank shipping a real design system | A cool, blue-tinted neutral ramp (`gray-900` = `rgb(18,22,30)`), and `font-weight: 300` named "regular" |
| **Nubank / Revolut** | The consumer-warm pole at scale | Revolut's home balance is `£6,012` — no decimals, symbol at full size and weight |
| **Increase** *(off-list)* | The most typographically serious money product I measured | The only site in my sample that actually applies `font-variant-numeric: tabular-nums` — plus a licensed **MRZ Mono** (the passport machine-readable-zone face) in the stack |
| **Copilot Money** *(off-list)* | Consumer money app with institutional numeral discipline | Aggregates render whole-dollar, individual transactions render to the cent, in the same screen |
| **Fragment** *(off-list)* | Ledger infrastructure as pure monospace | A whole marketing site set in mono, where `$` is used as a letterform (`Payment$ f•r agent$`) |

**How I found the off-list three.** Mercury's own FDIC disclosure names **Column N.A.** as its partner bank; following that partner-bank/BaaS layer one hop further surfaced **Increase**, confirmed as serious by its own customer wall ("Ramp processes millions of bill payments with Increase," Nik Koblov, Head of Engineering). **Fragment** surfaced the same way from the Modern Treasury adjacency — the ledger-API cohort — and its logo wall (Bilt, Ramp, AtoB, Nala, Basic Capital, Whop) confirms it's shipping to real money movers. **Copilot Money** I went looking for deliberately: I wanted the consumer-warm pole executed with institutional numeral discipline, which the named consumer products (Cash App, Monzo, Revolut) all decline to do.

---

## Measured specifics

All values read from computed styles via Playwright at 1440×900 (or 390 for mobile), September 2026. Nothing here is recalled.

### Wise — the money-entry card (`wise.com/us/send-money/`)

| Element | Measured |
|---|---|
| Amount input | `52px / 78px`, weight **400**, `letter-spacing: normal`, `color: #163300`, `text-align: right`, Wise Sans |
| Field label ("You send exactly") | `14px / 21.7px`, w400, `ls -0.084px`, `#0E0F0C` |
| Meta row label ("Total fees") | `14px / 21.7px`, w400, `#454745` |
| Meta row **value** ("Included in USD amount", "by Friday") | `16px / 24px`, w**600**, `ls -0.176px`, `#0E0F0C` |
| Fee drill-down chip ("88.83 USD") | `14px` w600 `#163300`, `border-radius: 9999px`, height `32px` |
| Savings chip ("4.91 USD volume discount") | `14px`, `#054D28` on `#E2F6D5`, radius `10px`, height `30px` |
| Primary CTA ("Send money") | bg `#9FE870`, text `#163300`, height `48px`, radius `9999px` |
| Comparison table | header `#163300` bg / white `14px/26px` w700; body row height **74px**; value cell `16px/26px` w600 |
| Exchange rate chip | `1 USD = 0.8594 EUR` — **4 decimal places** on the rate, 2 on every amount |

**Wise's two-ramp semantic color system** (this is the most transferable thing in the file):

```
--color-content-positive:      #008026   /* text — dark enough for AA on white */
--color-interactive-positive:  #2EAD4B   /* fills, dots, bars — brighter */
--color-content-negative:      #CF2929
--color-interactive-negative:  #E74848
--color-content-warning:       #9A6500
--color-interactive-warning:   #DF8700
--color-content-primary:       #37517E   /* body text is navy, not black */
--color-content-secondary:     #5D7079
--color-content-tertiary:      #768E9C
--color-background-positive:   rgba(54,199,151,0.10196)
--color-background-negative:   rgba(255,135,135,0.10196)
--color-background-warning:    rgba(255,172,0,0.10196)
--color-background-neutral:    rgba(134,167,189,0.10196)
--color-border-neutral:        rgba(0,0,0,0.10196)
```

Every status *background* is exactly `0.10196` alpha (26/255) of a **different, brighter** hue than either the text or the fill. Three separate values per semantic role — text, fill, wash — is the whole trick. Also: `--radius-small: 10px / medium: 16px / large: 24px / xlarge: 32px / full: 9999px`, but `--btn-radius-base: 3px`. Control heights are a named ladder: `24 / 32 / 40 / 48 / 56 / 72`. Nav transitions: `350ms` default, `200ms` short, `600ms` long.

### Column — the neutral ramp is cool, not gray

```
gray-50  rgb(246,246,248)   gray-500 rgb(124,127,136)
gray-100 rgb(238,239,242)   gray-600 rgb( 87, 90,100)
gray-200 rgb(227,228,232)   gray-700 rgb( 59, 62, 71)
gray-300 rgb(207,208,216)   gray-800 rgb( 35, 39, 48)
gray-400 rgb(169,172,182)   gray-900 rgb( 18, 22, 30)
```

R < G < B at every stop. `gray-900` is `#12161E` — a blue-black, never `#111`. Semantics: `red-500 #D64260`, `red-600 #A41742`; `green-500 #9CD95D`, `green-600 #72AC3F`; `yellow-600 #F3BE34`; `blue-600 #1E4199`.

Type scale (`--text-100` → `--text-1000`): `12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 44, 56, 72px`. Weight tokens: **`--font-regular: 300`**, book 400, medium 500, semibold 600, bold 700. Fonts: SuisseIntl / SuisseIntlMono / Inter (UI). Elevation is deliberately near-invisible:

```
--shadow-product: 0 40px 32px rgba(0,0,0,.02), 0 22px 18px rgba(0,0,0,.03), 0 12px 10px rgba(0,0,0,…)
--shadow-product-border: 0 0 0 1px rgba(0,0,0,0.05)
```

Max shadow opacity is **3%**, carried by a hairline ring instead. Inputs: border `gray-300` → hover `gray-500` → focus `blue-600`.

### Stripe

- **API reference** (`docs.stripe.com/api`): body `14px / 22px` `#3C4257`; headings `#1A2C44`; `h1` is only **`24px / 32px` w700**; `h2` `21px` w700; `h3` `16px` w600; page bg `#F4F7FA`; `td` `14px/20px`, padding `12px`; code in Source Code Pro `14px / 18.2px`.
- **Elements Appearance API defaults** — the closest thing to a canonical checkout token set:
  ```js
  colorPrimary: '#0570de',  colorBackground: '#ffffff',
  colorText:    '#30313d',  colorDanger:     '#df1b41',
  spacingUnit:  '2px',      borderRadius:    '4px'
  ```
  `spacingUnit: 2px`. Not 4, not 8.
- **Payout status enum:** `pending → in_transit → paid | failed | canceled`, with this documented in the API reference: *"Some payouts that fail might initially show as `paid`, then change to `failed`."*
- **Charge outcome object:** `network_status: "approved_by_network"`, `risk_level: "normal"`, `seller_message: "Payment complete."`

### Increase

- Stack: **TT Interphases Pro** (variable 100–900), **Input Mono** shipped with `font-feature-settings: "ss01","ss02","ss12"` baked into the `@font-face`, and **MRZ Mono** — the machine-readable-zone face used on passports.
- `h2` `40px / 48px` `ls -0.8px` w600 `#1D2A36`; `h3` `24px / 28.8px` `ls -0.096px` w500; lead paragraph `20px / 28px` `ls -0.2px`; nav `#334352`; secondary text `#687887`; buttons `14px/20px` w500, radius `8px`, padding `4px 8px`.
- Easing token: `--ease-out-quint: cubic-bezier(.23, 1, .32, 1)`.
- **42 elements carry `font-variant-numeric: tabular-nums`**, applied to a `$12,304,488.86` figure at `28px / 34px` medium, with each digit in its own `.products-bento-digit` span.
- Error object shape (RFC 7807): `{ type: "invalid_operation_error", title: "The action you specified can't be performed on the object in its current state.", detail: "There's an insufficient balance in the account.", status: 409 }`.

### Everyone else, briefly

| Product | Measured |
|---|---|
| **Mercury** | Custom variable font `arcadia` / `arcadiaDisplay` at **non-standard axis values: 480, 420, 400, 360**. `h1 49.35px / 54.28px` (ratio 1.10) w480 `#EDEDF3`; `h2 42px / 48.3px` `ls +0.42px` w480; nav/button `16px/16px` w420, radius `40px`, padding `0 20px`; light-mode body `#2A2924` |
| **Modern Treasury** | Four families: `mt-neue-display` (h1 `71px/78.1px`, ratio 1.10, w**450**), `mt-neue-text` (h3 `32px/40px`), `mt-sans` (UI `14px/21px` w500), `mt-mono` (rail labels). `html { font-feature-settings: "cv10","ss07","ss08" }` set globally |
| **Brex** | `font-feature-settings: "calt" 0, "cv01", "cv05" 0, "cv10", "liga" 0, "ss01" 0, "ss03", "zero" 0`. `h1 72px / 72px` (ratio **1.0**) `ls -1.44px` (−0.02em) w500 `#15191E`; subhead `20px/24px` `ls -0.4px` `#60646C`; fine print `12px/18px` `ls -0.24px`; button radius `6px` |
| **Monzo** | `--step-0: clamp(1rem, 1rem + 0vw, 1rem)` — body is pinned; `--step-5: clamp(2.4883rem, 2.2447rem + 1.2182vw, 3.0518rem)`; `--default-line-height: 1.4`. `h1 48.83/58.59` w800, `h2 39.06/46.87` w800, `h3 25/35` w700, body `16/22.4`. Declares `font-feature-settings: "tnum"` in its stylesheet but does not apply it on marketing |
| **Robinhood** | Three families: Martina Plantijn serif for `h1 64px/72px ls -0.33px w400`; Phonic for `h2 52px/62px ls -1.5px` and `h3 40px/48px ls -1px`; Capsule Sans Text for body `18px/28px` and UI `14px/20px` w700. Page `#000` |
| **Plaid** | Plaid Sans / Cern / Inconsolata. `h1 76px / 85.12px ls -3.4px` w500. Shadow scale where **only geometry moves**: `e1 0 16px 24px`, `e2 0 8px 16px`, `e3 0 8px 8px`, `e4 0 2px 4px` — all `hsla(0,0%,7%,.08)`. `--transition-duration: 35ms`; modal `200ms` short / `500ms` longer |
| **Cash App** | Cash Sans. `h1 56px / 53.2px` — **line-height below font-size (0.95)** — `ls -1.68px` w400; `h2/h3 40px/44px ls -1.2px` w400; body `15px/18px`; legal `12px/14.4px` `#999`; CTA radius `1000px` |
| **Column (docs)** | Sidebar is the API object graph verbatim: Entity, Bank Account, Account Number, Counterparty, ACH Transfer, Book Transfer, Check Transfer, Wire Transfer, International Wire, Realtime Transfer, Loans, Events, Webhooks, Reporting — **and `Simulation` as a peer nav item** |

### Empirical: who actually uses tabular figures

I scanned eight production sites for computed `font-variant-numeric: tabular-nums` or `font-feature-settings: "tnum"`:

| Site | Elements with tabular figures |
|---|---|
| increase.com | **42** |
| column.com | 0 applied — `"tnum"` **declared** in stylesheet |
| monzo.com | 0 applied — `"tnum"` **declared** in stylesheet |
| wise.com/us/send-money | 0 |
| mercury.com | 0 |
| ramp.com | 0 |
| moderntreasury.com | 0 |
| docs.stripe.com/api | 0 |

Read that carefully before you cargo-cult `tabular-nums` onto everything. See finding 1.

---

## The decisions that make it work

### 1. Tabular figures are for *columns and mutation*, not for every number

Wise sets its `52px` hero amount in **proportional** figures with `letter-spacing: normal` — no tabular. So do Mercury, Ramp, Modern Treasury and Stripe's docs. Increase applies `tabular-nums` in exactly one situation: a `$12,304,488.86` counter whose digits tick, wrapped in per-digit spans. Column and Monzo define a `tnum` token and reserve it for app surfaces not exposed on marketing.

**Why it works:** tabular figures exist to solve two problems — vertical alignment down a column, and horizontal jitter when a digit changes in place. A single hero amount that never changes has neither problem, and proportional figures in a well-drawn face are simply better-looking (the `1` isn't marooned in a monospace slot).

**Generic alternative it beats:** slapping `font-variant-numeric: tabular-nums` on `body` because a blog post said fintech uses tabular numbers. You get evenly-spaced but visually gappy display type and no benefit.

**Where it does not apply:** any transaction ledger, balance column, invoice line-item table, or number that animates. There, tabular is non-negotiable — Increase's per-digit counter would visibly reflow without it.

### 2. Currency is a control, not a prefix, the moment there is more than one currency

Wise's amount field contains `30,000.00` with **no symbol whatsoever**. The currency lives in a separate `USD ▾` pill with a flag, to the left of the field. The fee below is written `88.83 USD` — code as a suffix. The rate chip reads `1 USD = 0.8594 EUR`.

**Why it works:** in a converter, currency is a variable the user changes, so it must be a target with a hit area. Baking `$` into the field forces you to re-render the glyph on every switch, and `$` is ambiguous across USD/CAD/AUD/MXN/SGD anyway. Suffixing the ISO code on derived values (`88.83 USD`) removes the ambiguity without stealing space from the number.

**Generic alternative it beats:** `<span>$</span><input>` with a hardcoded dollar sign, then a currency dropdown somewhere else that doesn't visibly change the field.

**Where it does not apply:** single-currency consumer apps. Revolut's home balance is `£6,012` with the symbol inline at full size and weight, and that's correct — there's one currency, and the glyph is a fast visual anchor.

### 3. Never superscript the cents, and never shrink the currency symbol

Retail pricing shrinks the symbol and raises the cents (`$29⁹⁹`) because it makes the number *feel* smaller. That is the entire reason to avoid it here. Wise renders `30,000.00` and `25,704.61` at a single size and weight. Modern Treasury's ledger panels render `$1,500.00` uniformly, including the totals row.

**Why it works:** money UI's job is to make the number feel *accurate*, not small. Uniform weight across symbol, integer and fraction reads as a quantity; a raised superscript fraction reads as a price tag.

**Generic alternative it beats:** the `<sup>` cents treatment, or `font-size: 0.6em` on the currency symbol — both of which an AI reaches for because they look "designed."

**Where it does not apply:** actual pricing pages and plan selectors, where you are selling and the retail convention is correct and expected. The mistake is letting the pricing-page component leak into the account screen.

### 4. Precision is a function of what the number is *for*, and it changes within one screen

Copilot Money's dashboard, in a single view: the sidebar account list shows `$832` and `$1,594`; the "Top categories" list shows `$368`, `$84`, `$263`, `$21`; the transaction list shows `$10.99`, `$32.86`, `$21.35`, `$56.40`. Aggregates are whole-dollar, line items are exact. Wise shows amounts to 2 decimals but the FX rate to 4. Revolut's home balance is `£6,012` with no decimals at all.

**Why it works:** cents on an aggregate are noise you cannot act on — nobody reconciles a category total. Cents on a line item are the thing you're checking against your receipt. Four decimals on an FX rate matter because the third and fourth decimal move real money at size.

**Generic alternative it beats:** `toFixed(2)` everywhere, which turns a scannable category list into `$368.00 $84.00 $263.00 $21.00` — four columns of dead zeros.

**Where it does not apply:** anything that must reconcile to the penny. A statement, an invoice, a ledger export, a tax document, and every column that has a `Total` row must show cents everywhere including the total, or the column doesn't add up on screen.

### 5. Debits and credits are not good and bad — do not color them green and red

Modern Treasury's Ledgers page shows a **Debits** panel headed in dark slate and a **Credits** panel headed in clay/maroon, with `$1,500.00` in identical neutral type in both. Two distinct hues, neither of which is a status color.

**Why it works:** in double-entry, a debit is not a loss and a credit is not a gain — the sign depends on the account type. Coloring them green/red teaches the user a lie and then makes the lie load-bearing. Two arbitrary, memorable, non-semantic hues let you distinguish the columns without asserting a valence.

**Generic alternative it beats:** green for credits, red for debits — the single most common mistake in AI-generated accounting UI. It also collides with your actual error color.

**Where it does not apply:** a consumer transaction feed, where money-in and money-out *do* map to a user-meaningful direction. Even there, prefer a sign or an explicit direction word over color alone.

### 6. Reserve every accent color for exactly one job, then count the uses

Ramp's chartreuse `#E1FC53` appears on the entire homepage exactly twice: the "See a demo" secondary CTA and a small numeric badge. The primary CTA is black. Mercury's blue-violet appears only on "Open account." Increase's mint green appears only on the announcement link and one active icon tile. Wise splits `content-positive #008026` (text) from `interactive-positive #2EAD4B` (fills) so that the accessible dark green never gets used as a background and the vivid green never gets used as body text.

**Why it works:** trust reads as *predictability*. If green means "settled" in one place and "primary action" in another and "brand" in a third, the user has to reason about color instead of consuming it. One meaning per hue makes status legible at a glance across a 40-row table.

**Generic alternative it beats:** a brand gradient on the balance card, colored icons for every nav item, and a green "Send" button next to green "Completed" chips.

**Where it does not apply:** the marketing site. Stripe's own `/payments` page carries a full-bleed indigo→cyan→violet gradient wedge that would be indefensible on a balance. Marketing sells; product reports. Keep two palettes and don't let them meet.

### 7. Status is a state machine with a documented vocabulary, and states can go backwards

Stripe's payout enum: `pending → in_transit → paid | failed | canceled`. The API reference then says out loud: *"Some payouts that fail might initially show as `paid`, then change to `failed`."* Column's docs nav mirrors the same discipline — object types as first-class sections, with **`Simulation`** listed as a peer so you can trigger a return in sandbox.

**Why it works:** money statuses are not a progress bar. `settled` can reverse into `returned` days later via an ACH R-code; a card auth can expire; a wire can be recalled. A UI that renders `paid` as a permanently-green terminal chip has to lie or crash when the state flips.

**Generic alternative it beats:** a three-step stepper with a checkmark on the last node, and no code path for regression.

**How to build it:** pick a closed vocabulary and show *when* alongside *what* — `Settled · Sep 4`, `Pending · expected Sep 6`, `Returned · R01 insufficient funds`. Give reversible-terminal states (`paid`, `settled`) a neutral or muted-positive treatment rather than a triumphant one, and reserve saturated success for states that genuinely cannot reverse.

**Where it does not apply:** instant, irreversible rails. An internal book transfer or an RTP send really is terminal; there, a definite success state is honest.

### 8. Errors are two-layer: a machine identity, a human class, and a specific detail

Increase returns `{ type: "invalid_operation_error", title: "The action you specified can't be performed on the object in its current state.", detail: "There's an insufficient balance in the account.", status: 409 }`. Their UI renders the same shape: a validation card reading `beneficial_owner_identity` in mono, with plain English beneath — *"Check their details or add a second identification document."* Stripe's charge outcome carries a `seller_message` ("Payment complete.") separate from the customer-facing decline string.

**Why it works:** three audiences need three registers from one event. The support agent needs the machine enum to search. The operator needs the field name to fix the record. The end user needs the sentence that tells them what to do. Collapsing them produces either `Error 409` or a cheerful "Oops! Something went wrong."

**Generic alternative it beats:** one toast that says "Transaction failed. Please try again." — which is both useless and, when the real cause is `insufficient_funds`, actively wrong advice.

**Where it does not apply:** never omit the machine identity, but *do* suppress it visually in consumer surfaces — put it behind a "Details" disclosure or a copyable reference code rather than in the headline.

### 9. Some true reasons must never be shown to the payer — design for the collapse

Stripe's decline-code table carries an explicit instruction for `fraudulent`, `lost_card`, `stolen_card` and `merchant_blacklist`: *"Don't report more detailed information to your customer. Instead, present it in the same manner as `generic_decline`."* Meanwhile `incorrect_cvc`, `incorrect_zip`, `expired_card` and `insufficient_funds` each get a specific, actionable next step. The API also ships an `advice_code` field carrying the recommended action separately from the reason.

**Why it works:** telling a fraudster which of their stolen cards is flagged is a free oracle. So the decline UI must be able to map several distinct internal states onto one indistinguishable user-facing string — same wording, same styling, same retry affordance — while your logs keep the truth.

**Generic alternative it beats:** rendering `error.code` directly into the UI, which leaks `lost_card` to whoever is holding the lost card.

**Where it does not apply:** the merchant-facing dashboard, where the full reason is exactly what the operator needs. Two surfaces, two truths, and the split has to exist in your component API from day one — not bolted on.

### 10. Disclose the fee, name whether it is included, and make it drillable

Wise's card states, in this order: `Arrives / by Friday`, then `Total fees / Included in USD amount` with `88.83 USD →` as an underlined chip, then a green `4.91 USD volume discount` chip. The label is `14px` gray, the answer is `16px` **semibold** near-black. The field label is literally *"You send exactly."*

**Why it works:** the two questions a sender actually has are "how much do they get" and "what did this cost me," and the second one is where every legacy remitter hides. Stating *included vs. added* removes the last ambiguity. The chevron makes the fee a claim you can audit rather than a number you must accept. Surfacing the discount rather than silently applying it converts a cost line into a trust moment.

**Generic alternative it beats:** a footnote reading "Fees may apply" or an FX rate quoted without disclosing the spread — which is the same as hiding the fee.

**Where it does not apply:** genuinely zero-fee flows. Don't invent a fee row to look transparent; a `Fee — $0.00` line on an internal transfer is noise. Say nothing, or say "No fee" once.

### 11. Label above, value below, differentiated on three channels at once

Wise's meta rows: label `14px / w400 / #454745`; value `16px / w600 / #0E0F0C`. Size, weight and color all step together. Increase's tables run the same idea horizontally: primary amount `$3,100,000` in bold near-black, secondary `$24.8M` in gray, percentage `62%` in gray — three tiers in one row, distinguished by weight and color, never by a divider.

**Why it works:** a `2px` size difference alone is invisible at a glance; a color difference alone fails for a red-green-deficient user reading a gray-on-gray pair; a weight difference alone gets flattened by variable-font rendering at small sizes. Stack all three and the hierarchy survives any single channel failing.

**Generic alternative it beats:** label and value at the same 14px separated by a colon, or the label in ALL-CAPS `11px` letterspaced — which is the AI default and turns a scannable card into a wall of shouting micro-type.

**Where it does not apply:** dense operator tables where every row is the same tier. There, rely on column position and let the type be uniform.

### 12. The legal disclosure is a design element with a permanent slot

Mercury pins a dark pill in the first viewport: *"Mercury is a fintech company, not an FDIC-insured bank. Banking services provided through Choice Financial Group and Column N.A., Members FDIC."* Increase's own top banner reads *"Announcing Increase Bank, Member FDIC."* Both name the chartered entity, not just a badge.

**Why it works:** a neobank's most common trust objection is "is my money actually insured, and by whom." Naming the partner bank answers it and simultaneously signals that you understand the regulatory structure you operate in. Hiding it in the footer reads as evasion to exactly the sophisticated user you want.

**Generic alternative it beats:** an "FDIC Insured" lockup image in the footer with no entity named, or a "Bank-level security 🔒" marketing line — which asserts trust rather than evidencing it.

**Where it does not apply:** pure infrastructure with no consumer deposit relationship (Plaid, Fragment). There the equivalent proof is compliance posture and uptime, not deposit insurance.

---

## States, edges and the unglamorous parts

**Loading a balance.** Never render `$0.00` while fetching — a user who sees zero for 400ms has a heart attack. Show a skeleton bar sized to the *widest plausible* value so the layout doesn't jump when the number lands. Never animate a real balance counting up from zero on load; that's an unearned dopamine hit on money the user already had. (Increase's ticking `$12,304,488.86` is a *marketing aggregate* — a company-wide processed-volume figure — not anyone's balance. That distinction is the whole license.)

**Stale data.** Balances go stale. Show the timestamp — `As of 2:14 PM` — rather than implying live. If a rail is down, say which: `Wire transfers are delayed. ACH and internal transfers are unaffected.` Blanket "some features may be unavailable" destroys more trust than the outage.

**Empty ledger, first run.** A brand-new account has a genuinely empty transaction list, and it is the single most anxious moment in the product ("did my deposit arrive?"). Do not draw an illustration of a piggy bank. Show the account and routing numbers, the exact status of any inbound funds, and a single action. Column and Increase both make **`Simulation` / Sandbox Simulations a first-class API surface** so a developer can populate that empty state with a real webhook-driven event instead of a mock — the empty state is a feature to be tested, not a screen to be decorated.

**Too much data.** A high-volume operator account has 40k transactions a month. Server-side pagination with a stable cursor, and a filter set that mirrors the object model (Column's docs nav *is* the filter taxonomy: type, status, counterparty, date range, amount range). Virtualized rows at a fixed height — Wise's comparison rows are `74px`, Increase's data rows read at roughly 44–48px — so scroll position is arithmetic, not a guess.

**Permission denied.** In a money product this is usually *approval* rather than *access*: the user can see the payment but cannot release it. Say which. `You need Admin approval to send over $10,000. Request approval →` beats `403 Forbidden` and beats hiding the button, because a hidden button teaches the user the feature doesn't exist.

**Offline / submitted-but-unconfirmed.** The worst state in this archetype: the user tapped Send and the network dropped. Two mechanisms, both mandatory. (1) **Idempotency keys** — Increase and Stripe both require a client-generated `Idempotency-Key` header per intended request, so a retry cannot double-send. (2) A UI state that says `Submitting…` and, on failure, `We couldn't confirm this transfer. Check Activity before retrying.` Never a generic retry button that fires a fresh request.

**Irreversibility.** Confirmation should require the user to reproduce a fact, not just click again. The strong pattern is: restate the amount, the recipient's *verified* name (not the nickname), the rail, and the arrival estimate on one screen; require an explicit action; then show a receipt with a reference ID immediately. For high-value or first-time-recipient sends, add a hold window and say so. "Are you sure?" with Cancel/OK is not a confirmation — it's a speed bump the user learns to click through.

**Receipts and audit trail.** Every money movement needs a permanent, linkable, copyable record: reference ID, amount, currency, both parties, rail, the full status timeline with timestamps, and any fee. Modern Treasury's framing — *"double-entry accounting principles for consistency, immutability, and auditability"* — is the bar. If a status changed, the receipt shows *both* the old and new state with times; it never silently rewrites history.

---

## Mobile

This archetype is mobile-first on the consumer side and mobile-*hostile* on the operator side, and the two need different answers.

**Consumer.** Cash App, Revolut, Monzo and Nubank are all phone-primary and their marketing sites are phone screenshots. The balance is the hero: Revolut shows `Personal` in small light type above `£6,012` at display size. Monzo pins body text with `--step-0: clamp(1rem, 1rem + 0vw, 1rem)` while headings scale — the correct instinct, because shrinking body copy on a phone to fit a layout is how legal disclosures become unreadable. Amount entry gets a **custom numeric keypad**, not the system keyboard: you control decimal behavior, thousands separators and the max, and you get a large hit target for the send action in the thumb zone. Cash App's card screen uses ~48px tall fully-rounded gray pills (`Lock`, `•• 4465`) side by side — two targets, generous, unambiguous.

**Operator / reconciliation.** A 12-column transaction table does not become a mobile table. It becomes a card list with the three fields that matter (counterparty, amount, status) and a detail sheet for the rest. Ramp, Mercury and Modern Treasury all show desktop dashboards in their product imagery for a reason — nobody reconciles a month of AP on a phone. Building the responsive table is the wrong effort; building a good mobile *approval* flow (see one payment, approve or reject, with full context) is the right one, because approving from a phone is the genuine mobile job.

**Both.** Stripe's own Elements guidance: *"Make sure that you choose a font size of at least 16px for input fields on mobile"* — under 16px, iOS Safari zooms the viewport on focus, which mid-payment feels like a crash.

---

## How this archetype fails

The bad imitation is recognizable in about two seconds, and it's usually four things at once.

**A gradient on the balance.** The single loudest tell. A linear-gradient card with the balance in white over purple-to-pink, usually with a `box-shadow` at 20% opacity and a card radius of 24px. Real money products put the balance in near-black on white or white on near-black, on a flat surface, with elevation at 2–3% (Column's `--shadow-product` maxes at `rgba(0,0,0,0.03)` and carries the card on a `1px` `rgba(0,0,0,0.05)` ring instead). Gradients are a marketing-page material. Stripe uses one on `/payments`; it does not appear on a ledger.

**Display type on the number.** Setting `$12,480.55` in the same expressive display face as the marketing headline — or worse, a geometric/rounded/playful face — reads as decorative rather than reported. Note what the serious products do instead: Increase licenses **Input Mono with `ss01,ss02,ss12`** and **MRZ Mono**; Modern Treasury has a dedicated `mt-mono` for rail labels; Column ships `SuisseIntlMono`; Brex explicitly disables Inter's ligatures and contextual alternates (`"liga" 0, "calt" 0`) so nothing clever happens to a string of digits. They are all spending money to make numerals *duller*.

**Animated counters on real balances.** Money counting up from `$0` to `$4,281.19` over 800ms. It is a slot machine, it delays the answer to the only question on screen, and if the user navigates mid-animation they see a false number. If you must animate a change, tick only the digits that changed, use tabular figures so nothing reflows (this is the *only* reason Increase's counter works), and never animate on first paint.

**Emoji in the transaction list.** Careful here — Copilot Money, which is excellent, puts an emoji in every category chip. The boundary is *where*: the emoji lives inside a small colored category tag, at roughly 10px, on the opposite side of the row from the amount. The amount itself sits in plain neutral type with nothing near it. The failure mode is emoji adjacent to or inside the amount, emoji as the status indicator (✅/❌ instead of a word), or a random emoji per merchant. Status must be a word — `Settled`, `Pending`, `Returned` — because words survive screen readers, search, CSV export and color blindness. Emoji survive none of those.

**Insufficient precision, or the wrong precision.** `$1.2k` on a statement line. `$400` where the real number is `$399.87`. Rounding a rate to `0.86` when it's `0.8594`. Any of these on an actionable number means the user cannot reconcile against their bank, and once they catch you rounding once they distrust every number you show.

**One decorative color per status.** A pastel palette where `Pending` is lavender, `Settled` is mint, `Failed` is coral, and the primary button is periwinkle. Nothing is legible as urgent because nothing is *not* pretty. Compare Wise: one dark green for positive *text*, one brighter green for positive *fills*, a 10% wash for positive *backgrounds*, and no other green anywhere.

**Fake density.** Copying Linear-style 28px rows and 12px type into a banking product because "fintech is dense." Ramp and Mercury are used daily by finance operators and are dense; Cash App and Monzo are used for 30 seconds and are not. Density is a function of session length and repetition, not of the vertical.

**A confirmation dialog that confirms nothing.** "Are you sure you want to send $5,000? [Cancel] [Confirm]" with no recipient name, no rail, no arrival date and no fee. It creates friction without creating certainty, which is the worst of both.

---

## Copy and tone

The two poles genuinely diverge, and both are right.

**Institutional-serious** (Mercury, Modern Treasury, Column, Increase, Stripe). Declarative, present tense, no exclamation marks, no contractions in legal or status strings. Verbs are precise and rail-aware: *initiate, submit, settle, return, reverse, recall* — not "sent." Nouns match the API object exactly, so the docs, the dashboard and the support conversation use one word. Modern Treasury's own headline is *"Build Products That Move Money"* and its section heads are *"Unified System of Record"* and *"Built-in Accounting Guarantees"* — no adjective is doing emotional work.

- Right: `Wire submitted to the Fedwire network at 2:14 PM ET. Funds typically arrive the same business day.`
- Right: `Returned — R01 Insufficient funds. The receiving bank rejected this transfer on Sep 5.`
- Right: `You need Admin approval to send over $10,000.`
- Wrong: `Your money is on its way! 🎉`
- Wrong: `Oops! Something went wrong. Please try again.`
- Wrong: `Transaction successful` for an ACH credit that can still return for two business days.

**Consumer-warm** (Cash App, Monzo, Nubank, Revolut). Second person, contractions, short sentences, and a willingness to be a personality — Monzo's *"Spend your money on life, not your life on money"*, Cash App's *"The way money should work,"* Nubank's *"Somos incansáveis para você não precisar ser."* Warmth is spent on the *frame* — headlines, empty states, onboarding, celebration of a savings goal — and withheld from the *facts*. Even Cash App's own page carries `*See legal disclaimers` in 12px `#999` right under the friendly copy.

- Right: `Your money's on the way. It'll land by Friday.`
- Right: `That didn't go through — your card was declined. Try another card or contact your bank.`
- Wrong: `Payment initiated successfully. Settlement pending.` (correct, but nobody talks like this to a consumer)
- Wrong: `Yikes! 😅 Looks like your card said no.` (jokes about a declined card land badly on someone who is short)

**Rules that hold at both poles.**

1. Never say "instant" unless it is. Wise says *"money typically arrives in seconds"* with an info affordance, and separately commits to `Arrives — by Friday` for this specific transfer. Weasel words in the marketing, a hard commitment in the flow.
2. Give arrival as a **date or weekday**, not a duration. "By Friday" is checkable; "1–3 business days" requires the user to do calendar math and know your holiday schedule.
3. Name the amount and the recipient in the confirmation string, never a pronoun. `Send $5,000.00 to Acme Supply Co (Chase ••4471)?` — not `Confirm this transfer?`
4. Status words are a closed set and never synonymized. Pick `Pending / Settled / Returned / Failed / Canceled` and use exactly those in the UI, the email, the CSV and the API. A "Completed" that means the same as "Settled" will cost you a support ticket per thousand users.
5. Errors say what happened, then what to do, in that order, in two sentences maximum. Follow Increase's `title` + `detail` split.
6. Never apologize for a decline you didn't cause, and never guess at the reason. `Your bank declined this payment.` is honest; `Insufficient funds` when the code was `do_not_honor` is a fabrication that will make a user with money in the account furious.
7. Fee copy states inclusion explicitly. `Included in USD amount` or `Added to your total` — never a bare number.

---

## Sources

Screenshots captured with Playwright at 1440×900 and 390×844 and read as images; computed styles and CSS custom properties extracted with a Playwright evaluate probe. September 2026.

- `https://mercury.com` and `/bank` — dark-mode hero, `arcadia` variable font at weights 480/420/360, the persistent FDIC partner-bank disclosure pill naming Choice Financial Group and Column N.A.
- `https://www.moderntreasury.com` and `/products/ledgers` — mono rail chips (ACH, WIRE, RTP, FEDNOW, PUSH-TO-CARD, STABLECOINS), the Debits/Credits panels in slate and clay with `$1,500.00` in identical neutral type, four-family type stack, global `font-feature-settings: "cv10","ss07","ss08"`
- `https://column.com` and `/docs/api` — full token dump: cool gray ramp, 13-step type scale, `--font-regular: 300`, near-invisible `--shadow-product`, docs sidebar as the API object graph with `Simulation` as a peer nav item
- `https://increase.com` — TT Interphases Pro / Input Mono (`ss01,ss02,ss12`) / MRZ Mono; 42 elements with computed `tabular-nums` on a `$12,304,488.86` per-digit counter; the `beneficial_owner_identity` validation card; the three-tier amount row (`$3,100,000` bold / `$24.8M` gray / `62%` gray); Ramp customer quote
- `https://increase.com/documentation/api/overview` — the `{type,title,detail,status}` error object, `Idempotency-Key` requirement, Sandbox Simulations
- `https://wise.com/us/send-money/` — the measured money-entry card (52px/78px `#163300` right-aligned input, 14/21.7 labels vs 16/24 w600 values, `88.83 USD` drill-down chip, `#E2F6D5` discount chip, `#9FE870` CTA), plus the complete `content-*` / `interactive-*` / `background-*` token system at `0.10196` alpha
- `https://docs.stripe.com/api` — reference typography (14/22 body, 24/32 h1, `#F4F7FA` page)
- `https://docs.stripe.com/declines/codes` — the full Stripe decline table and the explicit instruction to present `fraudulent` / `lost_card` / `merchant_blacklist` as `generic_decline`; `advice_code`
- `https://docs.stripe.com/elements/appearance-api` — default `colorPrimary #0570de`, `colorText #30313d`, `colorDanger #df1b41`, `spacingUnit 2px`, `borderRadius 4px`, and the 16px-minimum mobile input rule
- `https://docs.stripe.com/api/payouts/object.md` and `/api/charges/object.md` — the payout status enum plus "may show as `paid`, then change to `failed`"; `outcome.seller_message` / `network_status` / `risk_level`
- `https://ramp.com` and `/bill-payments` — chartreuse used exactly twice, black primary CTA
- `https://www.brex.com` — the Inter feature-settings string with `"liga" 0`, `"calt" 0`, `"zero" 0`; `h1 72/72 ls -1.44px`; in-app phone imagery showing `$22,528.62 available` and cent-precise expense rows
- `https://monzo.com` — the full `clamp()` fluid step scale with `--step-0` pinned, `--default-line-height: 1.4`, declared-but-unused `"tnum"`
- `https://cash.app` — Cash Sans `h1 56/53.2` (line-height under font-size), and the in-app card screen where the brand green disappears entirely in favour of white/black and neutral gray pills
- `https://robinhood.com` — Martina Plantijn serif h1 over pure black, three-family stack
- `https://plaid.com` — the four-step shadow scale at a constant `hsla(0,0%,7%,.08)`, `--transition-duration: 35ms`
- `https://nubank.com.br`, `https://www.revolut.com` — consumer-warm pole; Revolut's `£6,012` no-decimal home balance with `Personal` label above
- `https://copilot.money` — real cross-platform app screenshots showing whole-dollar aggregates beside cent-precise transactions, emoji confined to category chips, over/left budget rings
- `https://fragment.dev` — an entire ledger-infrastructure site set in monospace
- `https://www.coinbase.com` — returned a Cloudflare interstitial to headless Chromium; measured values are from that page only and are excluded from findings
