# Fintech, money and trust-critical interfaces

**Evaluated:** 2026-09

## What this archetype is for

Interfaces where the numbers on screen are claims about money that actually exists, and where the user's next action may be irreversible within seconds. That covers business banking (Mercury, Brex), spend management (Ramp), cross-border transfer (Wise, Revolut), consumer banking and P2P (Monzo, Cash App, Nubank, Chime), brokerage (Robinhood, Coinbase), and the money-movement infrastructure layer (Stripe, Modern Treasury, Column, Increase, Plaid, Fragment, Lithic). It does *not* cover crypto-casino UI, pricing pages, invoicing-as-a-feature inside a SaaS product, or dashboards that merely display a revenue number — those show money, they don't move it. The distinguishing test: **if a mis-read digit or a mis-clicked button costs the user real money that they cannot claw back with an undo, you are in this archetype.**

## The reference set

| Product | Why it's here | The single thing to steal |
|---|---|---|
| **Stripe** | The de-facto grammar for payment status, decline handling and developer-facing money UI | The `seller_message` / customer-message split: one event, two audiences, two strings, and a documented rule about which internal states you must *not* reveal |
| **Mercury** | The institutional-serious pole done at consumer polish | A persistent, non-dismissible legal-status bar ("fintech company, not an FDIC-insured bank … Choice Financial Group and Column N.A., Members FDIC") pinned in the first viewport |
| **Ramp** | One accent, one job, enforced down a 13,700px page | Chartreuse `#E1FC53` fills six elements on the homepage and **every one of them is a button or a link-button**. Zero uses as text, icon, chart series or decorative panel. |
| **Brex** | Type engineering for numerals | Inter loaded with `"liga" 0, "calt" 0, "zero" 0` — ligatures and contextual alternates disabled outright, and the slashed zero deliberately turned **off** |
| **Wise** | The canonical fee-and-FX disclosure UI, fully public | Currency is a *selector pill on the left*, not a `$` glyph; the amount field carries no symbol at all |
| **Monzo** | Consumer-warm with a real fluid type system | Every step is a `clamp()` — `--step-0` is locked at exactly `1rem` with `0vw` so body text never scales, only headings do |
| **Cash App** | Loud brand, quiet product | Brand green is a marketing surface only; inside the app the chrome is white/black with neutral gray pills |
| **Robinhood** | Seriousness bought with typography | A high-contrast serif (Martina Plantijn) for editorial headlines in a product that used to be accused of gamification |
| **Plaid** | The permission/consent layer | A four-step shadow scale where only geometry changes — every level is `hsla(0,0%,7%,.08)` |
| **Modern Treasury** | Double-entry made legible | Debits and Credits panels are headed in **slate and clay**, not green and red |
| **Column** | A nationally chartered bank shipping a real design system | A cool, blue-tinted neutral ramp (`gray-900` = `rgb(18,22,30)`), `font-weight: 300` named "regular", and `font-feature-settings: "salt" 2` set on `body` so the alternate letterforms are the default, not an opt-in |
| **Nubank / Revolut** | The consumer-warm pole at scale | Revolut's home balance is `£6,012` — no decimals, symbol at full size and weight |
| **Increase** *(off-list)* | The most typographically serious money product I measured | The only site in my sample that actually applies `font-variant-numeric: tabular-nums` — plus a licensed **MRZ Mono** (the passport machine-readable-zone face) in the stack |
| **Copilot Money** *(off-list)* | Consumer money app with institutional numeral discipline | Aggregates render whole-dollar, individual transactions render to the cent, in the same screen |
| **Fragment** *(off-list)* | Ledger infrastructure as pure monospace | A whole marketing site set in mono, where `$` is used as a letterform (`Payment$ f•r agent$`) |

**Provenance of the off-list three.** Mercury's FDIC disclosure names Column N.A.; one hop down that partner-bank layer surfaces **Increase** (customer wall: Coast, Vantaca, Tekion, AngelList, gusto, check, AtoB, ramp). **Fragment** sits in the same ledger-API cohort as Modern Treasury. **Copilot Money** was sought deliberately as the consumer-warm pole with institutional numeral discipline — a combination Cash App, Monzo and Revolut all decline.

---

## Measured specifics

All values read from computed styles via Playwright at 1440×900 (or 390×844 for mobile), September 2026, re-verified 2026-09-10. Nothing here is recalled.

Four caveats that will bite anyone re-running this:
- **Some sites serve agents a different document.** `ramp.com` returns a plain-text "Ramp — Machine Version" markdown page to a default headless user-agent. A probe that doesn't spoof a real desktop UA silently measures that page instead, gets `font-family: Times`, zero tokens, and reports nonsense. Every Ramp number below comes from a run with a Chrome 128 macOS UA string, confirmed stable across two runs (5,822 elements each).
- **`ramp.com` ships colors in CIE Lab.** Computed values come back as `lab(92.1406 -20.4979 84.7726)`, not `rgb(225, 252, 83)`. String-matching hex against `getComputedStyle` finds nothing.
- **FX-derived numbers drift hourly.** Wise's rate read `0.8593`, `0.8595` and `0.8596` in three probes an hour apart; the recipient amount moved `25,703.51` → `25,709.04` → `25,710.15`. Treat the *format* as the finding and the digits as a timestamped sample.
- **`coinbase.com` returns a Cloudflare interstitial to headless Chromium.** Nothing from it is in this file.

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
| Exchange rate chip | `1 USD = 0.8595 EUR` — **4 decimal places** on the rate, 2 on every amount; a padlock glyph sits left of the rate inside the same pill, and a `>` chevron right of it |
| Fact-row icon rail | Each meta row (`Arrives`, `Total fees`) is led by a 40px circular 1px-outlined icon — clock, receipt — in a fixed left gutter |

**Wise's semantic color system** — three values per role, not one:

```
--color-content-positive:      #008026   /* text — dark enough for AA on white */
--color-interactive-positive:  #2EAD4B   /* fills, dots, bars — brighter */
--color-content-negative:      #CF2929
--color-interactive-negative:  #E74848
--color-content-warning:       #9A6500
--color-interactive-warning:   #DF8700
--color-content-primary:       #0E0F0C
--color-content-secondary:     #454745
--color-content-tertiary:      #6A6C6A
--color-background-positive:   rgba(54,199,151,0.10196)
--color-background-negative:   rgba(255,135,135,0.10196)
--color-background-warning:    rgba(255,172,0,0.10196)
--color-background-accent:     rgba(56,200,255,0.10196)
--color-background-neutral:    rgba(22,51,0,0.07843)
--color-border-neutral:        rgba(14,15,12,0.12157)
--color-background-celebration: #ECF9F9
--color-content-celebration:    #0B4C72
```

**Three values per semantic role — text, fill, wash — is the whole trick.** Note what the alphas actually are: the four *status* washes are `0.10196` (26/255) of a hue that is neither the text color nor the fill color. The **neutral** wash is different — `0.07843` (20/255) of the brand forest green `#163300`, not of black, and not of a blue-gray. So "neutral" here is still brand-tinted; only the four status washes share a formula.

Two more things worth taking:
- Every status and interactive role ships **three states** — base, `-hover`, `-active` — as literal tokens (`--color-interactive-positive`, `-hover`, `-active`), so no component ever composes a hover from an opacity guess or a `filter: brightness()`. Sixteen roles carry the full triple. The `content-*` roles that are pure text (`primary`, `secondary`, `tertiary`) correctly do not.
- There is a dedicated **`celebration`** semantic pair (`#ECF9F9` wash / `#0B4C72` text), separate from `positive`. Success and celebration are different events: a transfer settling is `positive`; hitting a savings goal is `celebration`. Most systems collapse these and end up using triumphant green on a settled-but-reversible ACH credit.

Radii: `--radius-small: 10px / medium: 16px / large: 24px / xlarge: 32px / full: 9999px`, and `--btn-radius-base: 9999px` — buttons are fully round, so radius is not a shared scale with cards. Control heights are a named ladder in raw px: `--size-x-small 24 / small 32 / medium 40 / large 48 / x-large 56 / 2x-large 72`, on top of a literal `--size-4 … --size-160` set.

### Column — the neutral ramp is cool, not gray

```
gray-50  rgb(246,246,248)   gray-500 rgb(124,127,136)
gray-100 rgb(238,239,242)   gray-600 rgb( 87, 90,100)
gray-200 rgb(227,228,232)   gray-700 rgb( 59, 62, 71)
gray-300 rgb(207,208,216)   gray-800 rgb( 35, 39, 48)
gray-400 rgb(169,172,182)   gray-900 rgb( 18, 22, 30)
```

R < G < B at every stop. `gray-900` is `#12161E` — a blue-black, never `#111`. Semantics: `red-500 #D64260`, `red-600 #A41742`; `green-500 #9CD95D`, `green-600 #72AC3F`; `yellow-600 #F3BE34`; `blue-600 #1E4199`.

**But headings aren't gray-900.** `h1`, `h2` and `h3` all compute to `rgb(17,26,74)` — `blue-800`, a true navy — while body text is `gray-600 rgb(87,90,100)`. The gray ramp carries surfaces and body; the blue ramp carries voice. `h1` is `52px / 57.2px` (ratio **1.10**) `ls -1.56px` (−0.03em) w600.

Type scale (`--text-100` → `--text-1000`): `12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 44, 56, 72px`. The token names are **not** evenly spaced — `100, 200, 300, 350, 400, 500, 550, 600, 700, 750, 800, 900, 1000`. The `350 / 550 / 750` half-steps are where 18px, 28px and 40px were inserted after the fact. That is what a scale looks like after two years of shipping, and it is a better model than a pristine ratio nobody can extend.

Weight tokens: **`--font-regular: 300`**, book 400, medium 500, semibold 600, bold 700 — so the token named "regular" is a Light. Fonts: SuisseIntl / SuisseIntlMono / Inter (UI), with `font-feature-settings: "salt" 2` on `body`, i.e. the stylistic-alternate set is the default rendering, not an opt-in class.

Elevation, the full token:

```
--shadow-product: 0px 40px 32px rgba(0,0,0,0.02),
                  0px 22px 18px rgba(0,0,0,0.03),
                  0px 12px 10px rgba(0,0,0,0.03),
                  0px  7px  5px rgba(0,0,0,0.04),
                  0px  3px  2px rgba(0,0,0,0.07)
--shadow-product-border: 0 0 0 1px rgba(0,0,0,0.05)
```

Five layers, and the opacity runs **inversely to the blur**: the widest, softest layer is the faintest (2% at 32px blur), the tightest is the strongest (7% at 2px). That is the shape of real contact shadow, and it is the opposite of the single `0 4px 12px rgba(0,0,0,0.15)` default. Max opacity anywhere in the stack is **7%**, and the card's actual edge is a `1px` `rgba(0,0,0,0.05)` ring, not a shadow.

### Stripe

- **API reference** (`docs.stripe.com/api`): body `14px / 22px`, `h1` **`24px / 32px` w700**, `h2` `21px` w700, `h3` `16px` w600, `td` `14px/20px` padding `12px`, code in Source Code Pro `14px / 18.2px`, page bg `#F4F7FA`. Body copy, table cells and every heading are **the same color** — `#1A2C44`. The entire hierarchy of the world's most-read payments document is carried by size and weight alone, with zero color steps. An `h1` at 24px is also only 1.7× body.
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
| **Modern Treasury** | Four families: `mt-neue-display` (h1 `71px/78.1px` ratio 1.10 w**450**; h2 `47px/58.75px` w450), `mt-neue-text` (h3 `32px/40px` w400), `mt-sans` (UI `14px/21px` w500), `mt-mono` (rail labels). `html { font-feature-settings: "cv10","ss07","ss08" }` set globally. Rail chips (`CARD`, `FBO ACCOUNTS`, `LOAN`, `WALLET`, `PAYOUT`) are ALL-CAPS mono on **one** plum fill — a single non-semantic hue for the entire taxonomy, not one hue per rail |
| **Brex** | `font-feature-settings: "calt" 0, "cv01", "cv05" 0, "cv10", "liga" 0, "ss01" 0, "ss03", "zero" 0`. `h1 72px / 72px` (ratio **1.0**) `ls -1.44px` (−0.02em) w500 `#15191E`; subhead `20px/24px` `ls -0.4px` `#60646C`; fine print `12px/18px` `ls -0.24px`; button radius `6px` |
| **Monzo** | `--step-0: clamp(1rem, 1rem + 0vw, 1rem)` — body is pinned; `--step-5: clamp(2.4883rem, 2.2447rem + 1.2182vw, 3.0518rem)`; `--default-line-height: 1.4`. `h1 48.83/58.59` w800, `h2 39.06/46.87` w800, `h3 25/35` w700, body `16/22.4`. Declares `font-feature-settings: "tnum"` in its stylesheet but does not apply it on marketing |
| **Robinhood** | Three families: Martina Plantijn serif for `h1 64px/72px ls -0.33px w400`; Phonic for `h2 52px/62px ls -1.5px` and `h3 40px/48px ls -1px`; Capsule Sans Text for body `18px/28px` and UI `14px/20px` w700. Page `#000` |
| **Plaid** | Plaid Sans / Cern / Inconsolata. `h1 76px / 85.12px ls -3.4px` w500 (computed `color: rgba(0,0,0,0)` — the headline is gradient-clipped text). Shadow scale where **only geometry moves**: `e1 0 16px 24px`, `e2 0 8px 16px`, `e3 0 8px 8px`, `e4 0 2px 4px` — all `hsla(0,0%,7%,.08)`, and shipped twice, once in `rem` and once in `px`. `--transition-duration: 35ms`; modal `200ms` / `500ms`; `--button-border-radius: 2px` — the sharpest corner in the whole reference set; primary easing `cubic-bezier(0.23, 1.2, 0.32, 1)`, an **overshoot** curve (y > 1) reserved for non-money chrome |
| **Cash App** | Cash Sans. `h1 56px / 53.2px` — **line-height below font-size (0.95)** — `ls -1.68px` w400; `h2/h3 40px/44px ls -1.2px` w400; body `15px/18px`; legal `12px/14.4px` `#999`; CTA radius `1000px` |
| **Column (docs)** | Sidebar is the API object graph verbatim: Entity, Bank Account, Account Number, Counterparty, ACH Transfer, Book Transfer, Check Transfer, Wire Transfer, International Wire, Realtime Transfer, Loans, Events, Webhooks, Reporting — **and `Simulation` as a peer nav item** |
| **Ramp** | Lausanne `h1 64px / 64px` (ratio **1.0**) `ls -0.01px` w400. Ships production CSS in **CIE Lab** — chartreuse computes as `lab(92.1406 -20.4979 84.7726)`, near-black as `lab(8.86531 0.515342 0.18619)`, with `oklab()` for translucent fills. 18 elements carry tabular figures, all of them inside `<number-flow-react>` animated counters at `10px` |

### Empirical: who actually uses tabular figures

I scanned eight production sites for computed `font-variant-numeric: tabular-nums` or `font-feature-settings: "tnum"`:

| Site | Elements with tabular figures | What they are |
|---|---|---|
| increase.com | **42** | One `$12,304,488.86` counter, digits ticking, each in its own span |
| ramp.com | **18** | `<number-flow-react>` counters rendering an animating `0.8711986%` at `10px` |
| monzo.com | 0 applied, **6 rules declared** | `.Form_tnum`, `.DonutChart_donutChartTotalValue`, `.NumberRange_valueField` — form fields, chart totals, range sliders |
| column.com | 0 applied, declared in stylesheet | — |
| wise.com/us/send-money | 0 | Not even on the `52px` hero amount |
| mercury.com | 0 | — |
| moderntreasury.com | 0 | Including the `$1,500.00` ledger panels |
| docs.stripe.com/api | 0 | — |

**Both** sites that apply tabular figures apply them to a number that is *animating*, and to nothing else. Monzo's three declared classes name the other legitimate case: fields the user edits, and totals that recompute. Nobody applies it to static display type. Read that before you cargo-cult `tabular-nums` onto `body`. See finding 1.

---

## The decisions that make it work

### 1. Tabular figures are for *columns and mutation*, not for every number

Wise sets its `52px` hero amount in **proportional** figures with `letter-spacing: normal` — no tabular. So do Mercury, Modern Treasury (including the `$1,500.00` ledger panels) and Stripe's docs. The two sites in the sample that *do* apply it apply it to the same thing: Increase's `$12,304,488.86` counter with per-digit spans, and Ramp's `<number-flow-react>` percentage counters at `10px`. Both are animating. Monzo declares `tnum` in exactly three named classes — `.Form_tnum`, `.DonutChart_donutChartTotalValue`, `.NumberRange_valueField` — form input, chart total, range slider. Three cases: mutating, recomputing, editable.

**Why it works:** tabular figures exist to solve two problems — vertical alignment down a column, and horizontal jitter when a digit changes in place. A single hero amount that never changes has neither problem, and proportional figures in a well-drawn face are simply better-looking (the `1` isn't marooned in a monospace slot).

**Generic alternative it beats:** slapping `font-variant-numeric: tabular-nums` on `body` because a blog post said fintech uses tabular numbers. You get evenly-spaced but visually gappy display type and no benefit.

**Where it does not apply:** any transaction ledger, balance column, invoice line-item table, editable amount field, or number that animates. There, tabular is non-negotiable — Increase's per-digit counter would visibly reflow without it, and an amount field that re-lays-out as you type reads as broken.

**And where the rule inverts entirely:** a genuinely monospaced face. Increase's Input Mono, Column's SuisseIntlMono and Fragment's whole site are already fixed-advance — adding `tabular-nums` there is a no-op, and reaching for a proportional face *because* you want a hero amount to look good is the actual decision. Don't set a ledger in a display face and then patch it with `tnum`.

### 2. Currency is a control, not a prefix, the moment there is more than one currency

Wise's amount field contains `30,000.00` with **no symbol whatsoever**. The currency lives in a separate `USD ▾` pill with a flag, to the left of the field. The fee below is written `88.83 USD` — code as a suffix. The rate chip reads `1 USD = 0.8595 EUR`, with a padlock glyph inside the pill to its left — the rate is a *held* value, and the lock says so.

**Why it works:** in a converter, currency is a variable the user changes, so it must be a target with a hit area. Baking `$` into the field forces you to re-render the glyph on every switch, and `$` is ambiguous across USD/CAD/AUD/MXN/SGD anyway. Suffixing the ISO code on derived values (`88.83 USD`) removes the ambiguity without stealing space from the number.

**Generic alternative it beats:** `<span>$</span><input>` with a hardcoded dollar sign, then a currency dropdown somewhere else that doesn't visibly change the field.

**Where it does not apply:** single-currency consumer apps. Revolut's home balance is `£6,012` with the symbol inline at full size and weight, and that's correct — there's one currency, and the glyph is a fast visual anchor.

### 3. Never superscript the cents, and never shrink the currency symbol

Retail pricing shrinks the symbol and raises the cents (`$29⁹⁹`) because it makes the number *feel* smaller. That is the entire reason to avoid it here. Wise renders `30,000.00` and `25,709.04` at a single size and weight — one `52px/78px` w400 run for the send amount, one `40px` run for the receive amount, symbol-free, with the fraction identical to the integer. Modern Treasury's ledger panels render `$1,500.00` uniformly, including the totals row.

**Why it works:** money UI's job is to make the number feel *accurate*, not small. Uniform weight across symbol, integer and fraction reads as a quantity; a raised superscript fraction reads as a price tag.

**Generic alternative it beats:** the `<sup>` cents treatment, or `font-size: 0.6em` on the currency symbol — both of which an AI reaches for because they look "designed."

**Where it does not apply:** actual pricing pages and plan selectors, where you are selling and the retail convention is correct and expected. The mistake is letting the pricing-page component leak into the account screen.

### 4. Precision is a function of what the number is *for*, and it changes within one screen

Copilot Money's dashboard, in a single view: the sidebar account list shows `$832` and `$1,594`; the "Top categories" list shows `$368`, `$84`, `$263`, `$21`; the transaction list shows `$10.99`, `$32.86`, `$21.35`, `$56.40`. Aggregates are whole-dollar, line items are exact. *(These are read from Copilot's app screenshots; the marketing site rotates its imagery, so treat the pattern as the finding.)* Wise shows amounts to 2 decimals but the FX rate to **4** — `1 USD = 0.8595 EUR`, right in the pill above the field. Revolut's home balance is `£6,012` with no decimals at all. Modern Treasury goes the other way and keeps cents in its `Total Debits` / `Total Credits` rows, because those rows have to tie out.

**Why it works:** cents on an aggregate are noise you cannot act on — nobody reconciles a category total. Cents on a line item are the thing you're checking against your receipt. Four decimals on an FX rate matter because the third and fourth decimal move real money at size.

**Generic alternative it beats:** `toFixed(2)` everywhere, which turns a scannable category list into `$368.00 $84.00 $263.00 $21.00` — four columns of dead zeros.

**Where it does not apply:** anything that must reconcile to the penny. A statement, an invoice, a ledger export, a tax document, and every column that has a `Total` row must show cents everywhere including the total, or the column doesn't add up on screen.

### 5. Debits and credits are not good and bad — do not color them green and red

Modern Treasury's Ledgers page shows a **Debits** panel headed in dark slate-teal and a **Credits** panel headed in clay/maroon, with `$1,500.00` in identical neutral type in both — including in the `Total Debits` and `Total Credits` rows, which also carry cents. Two distinct hues, neither of which is a status color. The `Account` / `Amount` column headers are small mono chips on a mint wash, borrowed from code annotation rather than from table styling. And the JSON rendered beside the panels encodes direction as a word — `"direction": "credit"`, `"direction": "debit"` — never as a sign on the amount, which stays `1500` in both entries.

**Why it works:** in double-entry, a debit is not a loss and a credit is not a gain — the sign depends on the account type. Coloring them green/red teaches the user a lie and then makes the lie load-bearing. Two arbitrary, memorable, non-semantic hues let you distinguish the columns without asserting a valence.

**Generic alternative it beats:** green for credits, red for debits — the single most common mistake in AI-generated accounting UI. It also collides with your actual error color.

**Where it does not apply:** a consumer transaction feed, where money-in and money-out *do* map to a user-meaningful direction. Even there, prefer a sign or an explicit direction word over color alone.

**It also does not apply if you have no double-entry model.** If your backend stores a signed `amount` on a single row and nobody in the company can tell you what the contra account is, two panels headed slate and clay are cosplay. Ship the signed feed honestly and add the ledger when you have one. The failure this finding prevents is *teaching a lie*; inventing accounting vocabulary you don't implement teaches a different one.

### 6. Reserve every accent color for exactly one job, then count the uses

Ramp's chartreuse `#E1FC53` fills exactly six visible elements across a 13,722px homepage — `See a demo`, `Get started for free` (×3), `Switch in days, not months`, `Explore Ramp Intelligence` — and **every one of them is a button or a link-button**. Zero uses as text color, icon fill, chart series, badge, border or decorative panel. That's the discipline: not "use it rarely," but "it means *press this*, and it never means anything else." (Near-black `lab(8.87 0.52 0.19)` carries the other five buttons; which of the two is "primary" varies by section, and both are the same shape.) Mercury's blue-violet appears only on `Open account`. Wise splits `content-positive #008026` (text) from `interactive-positive #2EAD4B` (fills) so the accessible dark green never becomes a background and the vivid green never becomes body text.

**Why it works:** trust reads as *predictability*. If green means "settled" in one place and "primary action" in another and "brand" in a third, the user has to reason about color instead of consuming it. One meaning per hue makes status legible at a glance across a 40-row table.

**Generic alternative it beats:** a brand gradient on the balance card, colored icons for every nav item, and a green "Send" button next to green "Completed" chips.

**Where it does not apply:** the marketing site, and the gap is enormous. Stripe's `/payments` page runs a full-bleed indigo→cyan diagonal gradient wedge across the lower half — and the checkout mock sitting **on top of it** is flat white with near-black type and a single `Subtotal £240.00 / VAT (20%) £48.00 / Total £288.00` column. One screenshot, both palettes, the boundary drawn as a literal edge. Copilot Money runs chrome-bevelled headline type over blurred floating category pills on marketing, then renders whole-dollar aggregates in flat neutral type in the app. Increase runs a saturated green→cyan→blue gradient bar-chart illustration next to a headline, and an acid-yellow announcement pill, while its product numbers stay `#1D2A36` on white.

Keep two palettes and don't let them meet. The tell that you've failed is that the balance card and the hero share a fill.

**And it does not mean one accent total.** Increase runs mint (`Contact sales`), acid yellow (announcement pill) and a full gradient (hero art) on one page without ambiguity, because each occupies a different *slot* — CTA, announcement, illustration — and none of them appears in a status chip. The rule is one meaning per hue, not one hue per product.

### 7. Status is a state machine with a documented vocabulary, and states can go backwards

Stripe's payout enum: `pending → in_transit → paid | failed | canceled`. The API reference then says out loud: *"Some payouts that fail might initially show as `paid`, then change to `failed`."* Column's docs nav mirrors the same discipline — object types as first-class sections, with **`Simulation`** listed as a peer so you can trigger a return in sandbox.

**Why it works:** money statuses are not a progress bar. `settled` can reverse into `returned` days later via an ACH R-code; a card auth can expire; a wire can be recalled. A UI that renders `paid` as a permanently-green terminal chip has to lie or crash when the state flips.

**Generic alternative it beats:** a three-step stepper with a checkmark on the last node, and no code path for regression.

**How to build it:** pick a closed vocabulary and show *when* alongside *what* — `Settled · Sep 4`, `Pending · expected Sep 6`, `Returned · R01 insufficient funds`. Give reversible-terminal states (`paid`, `settled`) a neutral or muted-positive treatment rather than a triumphant one, and reserve saturated success for states that genuinely cannot reverse.

**Where it does not apply:** rails that are genuinely terminal on completion. An internal book transfer between two accounts on your own ledger is one — the money never left. Be careful with the ones that only *feel* terminal: RTP and FedNow are irrevocable for the sender, but the receiving institution can still return funds, and the network carries a request-for-return message. "Irrevocable" and "final" are not the same word. If your rail has any message type that moves money backwards, you are in the state-machine case.

**It also does not apply to a status the user cannot act on.** If a payment passes through four internal states in 900ms, surfacing all four is theater. Collapse them and show the one the user can respond to.

### 8. Errors are three registers from one event: a machine identity, a human class, and a specific detail

Increase returns `{ type: "invalid_operation_error", title: "The action you specified can't be performed on the object in its current state.", detail: "There's an insufficient balance in the account.", status: 409 }`. Their UI renders the same shape: a validation card reading `beneficial_owner_identity` in mono, with plain English beneath — *"Check their details or add a second identification document."* Stripe's charge outcome carries a `seller_message` ("Payment complete.") separate from the customer-facing decline string.

**Why it works:** three audiences need three registers from one event. The support agent needs the machine enum to search. The operator needs the field name to fix the record. The end user needs the sentence that tells them what to do. Collapsing them produces either `Error 409` or a cheerful "Oops! Something went wrong."

**Generic alternative it beats:** one toast that says "Transaction failed. Please try again." — which is both useless and, when the real cause is `insufficient_funds`, actively wrong advice.

**Where it does not apply:** field-level form validation. `Routing number must be 9 digits` needs one register, inline, next to the field — wrapping it in a machine enum and a support code is over-engineering an error the user fixes in two seconds. The three-register shape earns its cost when the error (a) came back from a rail rather than a validator, (b) will generate a support ticket, or (c) the user cannot resolve alone.

**And a constraint, not an exception:** never omit the machine identity, but suppress it visually in consumer surfaces — behind a "Details" disclosure or a copyable reference code, never in the headline.

### 9. Some true reasons must never be shown to the payer — design for the collapse

Stripe's decline-code table carries an explicit instruction for `fraudulent`, `lost_card`, `stolen_card` and `merchant_blacklist`: *"Don't report more detailed information to your customer. Instead, present it in the same manner as `generic_decline`."* Meanwhile `incorrect_cvc`, `incorrect_zip`, `expired_card` and `insufficient_funds` each get a specific, actionable next step. The API also ships an `advice_code` field carrying the recommended action separately from the reason.

**Why it works:** telling a fraudster which of their stolen cards is flagged is a free oracle. So the decline UI must be able to map several distinct internal states onto one indistinguishable user-facing string — same wording, same styling, same retry affordance — while your logs keep the truth.

**Generic alternative it beats:** rendering `error.code` directly into the UI, which leaks `lost_card` to whoever is holding the lost card.

**Where it does not apply:** the merchant-facing dashboard, where the full reason is exactly what the operator needs. Two surfaces, two truths, and the split has to exist in your component API from day one — not bolted on.

### 10. Disclose the fee, name whether it is included, and make it drillable

Wise's card states, in this order: `Arrives / by Friday`, then `Total fees / Included in USD amount` with `88.83 USD →` as an underlined chip, then a green `4.91 USD volume discount` chip. The label is `14px` gray, the answer is `16px` **semibold** near-black. The field label is literally *"You send exactly."*

Wise then does something most products skip: it surfaces the discount **twice** — once as the compact `4.91 USD volume discount` chip, and once as a full mint-wash panel beneath the fee row headed *"You're sending a lot so we discounted our fee"* with a `Learn more about sending large amounts` link. The chip is for the scanner; the panel is for the person who wants to know why.

**Why it works:** the two questions a sender actually has are "how much do they get" and "what did this cost me," and the second one is where every legacy remitter hides. Stating *included vs. added* removes the last ambiguity. The chevron makes the fee a claim you can audit rather than a number you must accept. Surfacing the discount rather than silently applying it converts a cost line into a trust moment.

**Generic alternative it beats:** a footnote reading "Fees may apply" or an FX rate quoted without disclosing the spread — which is the same as hiding the fee.

**Where it does not apply:** genuinely zero-fee flows. Don't invent a fee row to look transparent; a `Fee — $0.00` line on an internal transfer is noise. Say the word, not the number — Stripe's own checkout mock renders `Shipping Estimate — FREE`, not `£0.00`, and names the rate inline as `VAT (20%)` rather than leaving a bare `£48.00` for the user to reverse-engineer.

**It also does not apply where the fee isn't yours to state.** If a correspondent bank will deduct an unknown amount mid-route, `Total fees` is a lie either way. Name the mechanism (`Intermediary banks may deduct a fee we can't see`) instead of a number you'd have to retract.

### 11. Label above, value below, differentiated on three channels at once

Wise's meta rows: label `14px / w400 / #454745`; value `16px / w600 / #0E0F0C`. Size, weight and color all step together. Increase's tables run the same idea horizontally: primary amount `$3,100,000` in bold near-black, secondary `$24.8M` in gray, percentage `62%` in gray — three tiers in one row, distinguished by weight and color, never by a divider.

**Why it works:** a `2px` size difference alone is invisible at a glance; a color difference alone fails for a red-green-deficient user reading a gray-on-gray pair; a weight difference alone gets flattened by variable-font rendering at small sizes. Stack all three and the hierarchy survives any single channel failing.

**Generic alternative it beats:** label and value at the same 14px separated by a colon, or the label in ALL-CAPS `11px` letterspaced — which is the AI default and turns a scannable card into a wall of shouting micro-type.

**Where it does not apply:** dense operator tables where every row is the same tier. There, rely on column position and let the type be uniform.

### 12. The legal disclosure is a design element with a permanent slot

Mercury pins a dark pill in the first viewport: *"Mercury is a fintech company, not an FDIC-insured bank. Banking services provided through Choice Financial Group and Column N.A., Members FDIC."* It survives at 390px — same three lines, still above the fold, still not dismissible — which is the hard case, because the mobile viewport is where disclosures normally get pushed to a footer. Mercury also runs a superscript `¹` on the word "banking" in its subhead, so the qualifying footnote is bound to the specific claim rather than floating at the page bottom. Increase's top banner reads *"Introducing Increase Bank, Member FDIC"* — an acid-yellow pill above the `h1`, above the CTA. Both name a chartered entity.

**Why it works:** a neobank's most common trust objection is "is my money actually insured, and by whom." Naming the partner bank answers it and simultaneously signals that you understand the regulatory structure you operate in. Hiding it in the footer reads as evasion to exactly the sophisticated user you want.

**Generic alternative it beats:** an "FDIC Insured" lockup image in the footer with no entity named, or a "Bank-level security 🔒" marketing line — which asserts trust rather than evidencing it.

**Where it does not apply:** pure infrastructure with no consumer deposit relationship (Plaid, Fragment). There the equivalent proof is compliance posture and uptime, not deposit insurance.

---

## States, edges and the unglamorous parts

**Loading a balance.** Never render `$0.00` while fetching — a user who sees zero for 400ms has a heart attack. Show a skeleton bar sized to the *widest plausible* value so the layout doesn't jump when the number lands. Never animate a real balance counting up from zero on load; that's an unearned dopamine hit on money the user already had. (Increase's ticking `$12,304,488.86` is a *marketing aggregate* — a company-wide processed-volume figure — not anyone's balance. That distinction is the whole license.)

**Stale data.** Balances go stale. Show the timestamp — `As of 2:14 PM` — rather than implying live. If a rail is down, say which: `Wire transfers are delayed. ACH and internal transfers are unaffected.` Blanket "some features may be unavailable" destroys more trust than the outage.

**Empty ledger, first run.** A brand-new account has a genuinely empty transaction list, and it is the single most anxious moment in the product ("did my deposit arrive?"). Do not draw an illustration of a piggy bank. Show the account and routing numbers, the exact status of any inbound funds, and a single action. Column and Increase both make **`Simulation` / Sandbox Simulations a first-class API surface** so a developer can populate that empty state with a real webhook-driven event instead of a mock — the empty state is a feature to be tested, not a screen to be decorated.

**Too much data.** A high-volume operator account has 40k transactions a month. Server-side pagination with a stable cursor, and a filter set that mirrors the object model (Column's docs nav *is* the filter taxonomy: type, status, counterparty, date range, amount range). Virtualized rows at a **fixed** height so scroll position is arithmetic rather than a guess — Wise's comparison rows measure exactly `74.0px`, and pick one number and hold it, because a row that grows for a long counterparty name breaks virtualization and re-introduces the jank you virtualized to avoid. Truncate with a tooltip instead.

**Permission denied.** In a money product this is usually *approval* rather than *access*: the user can see the payment but cannot release it. Say which. `You need Admin approval to send over $10,000. Request approval →` beats `403 Forbidden` and beats hiding the button, because a hidden button teaches the user the feature doesn't exist.

**Offline / submitted-but-unconfirmed.** The worst state in this archetype: the user tapped Send and the network dropped. Two mechanisms, both mandatory. (1) **Idempotency keys** — Increase and Stripe both require a client-generated `Idempotency-Key` header per intended request, so a retry cannot double-send. (2) A UI state that says `Submitting…` and, on failure, `We couldn't confirm this transfer. Check Activity before retrying.` Never a generic retry button that fires a fresh request.

**Irreversibility.** Confirmation should require the user to reproduce a fact, not just click again. The strong pattern is: restate the amount, the recipient's *verified* name (not the nickname), the rail, and the arrival estimate on one screen; require an explicit action; then show a receipt with a reference ID immediately. For high-value or first-time-recipient sends, add a hold window and say so. "Are you sure?" with Cancel/OK is not a confirmation — it's a speed bump the user learns to click through.

**Receipts and audit trail.** Every money movement needs a permanent, linkable, copyable record: reference ID, amount, currency, both parties, rail, the full status timeline with timestamps, and any fee. The test is Modern Treasury's three words — *consistency, immutability, auditability*. Immutability is the one that bites: if a status changed, the receipt shows **both** the old and the new state with times. A record that silently rewrites `pending` to `returned` is not a receipt, it's a cache.

---

## Mobile

This archetype is mobile-first on the consumer side and mobile-*hostile* on the operator side, and the two need different answers.

**The amount input is `type="text"`, not `type="number"`.** Measured on Wise at 390: `<input type="text" inputmode="decimal">`. This is the single most copyable thing in this section. `type="number"` gives you a spinner you don't want, mutates on scroll-wheel and arrow keys, rejects the user's locale separators, and returns `""` for anything it considers invalid so you cannot even see what they typed. `type="text"` + `inputmode="decimal"` raises the same numeric keypad on iOS and Android, and leaves formatting to you. If you need a currency keypad with your own decimal and thousands behavior, render your own — but start here, because the custom keypad is a week and this is a line.

**The number scales; the body copy doesn't.** Wise drops its send amount from `52px` at 1440 to `34px` at 390, and the receive value from `40px` to `24px`. Monzo does the exact opposite with prose: `--step-0: clamp(1rem, 1rem + 0vw, 1rem)` pins body text at 16px at every width while `--step-5` runs `2.4883rem → 3.0518rem`. Together that is the rule — **a number is a display element and may shrink to fit; running text and legal copy may not.** Shrinking body copy to make a layout fit is how a disclosure becomes unreadable, and the disclosure is the part a regulator reads.

**Target sizes come off the same named ladder as desktop.** Wise at 390, measured: primary CTAs `48px` tall and full-bleed to a 16px gutter (`325–358px` wide); currency selector pill `40px`; exchange-rate pill `40px`; fee drill-down chip `32px`. Everything lands on `32 / 40 / 48` — the `--size-small / medium / large` tokens, unchanged from desktop. The only sub-40 target on the card is the fee chip, which is the audit affordance, not the action. Monzo runs `44px` and `48px` buttons at `border-radius: 500px`, with secondary `Learn more` pills at `36px` / `13.28px` — the one place it goes under 44, and it's a link, not a commitment.

**The converter is not the mobile hero.** On Wise's desktop layout the money card sits beside the headline, co-equal. At 390 it is pushed **below** the headline, the subhead, three feature rows and two full-width CTAs — roughly 1,400px down. The social-proof row also drops from two store badges to one. On a phone the first job is the pitch; the calculator is what you scroll to.

**The consumer balance.** Revolut shows `Personal` in small light type above `£6,012` — symbol inline, full size, full weight, no decimals — inside a phone frame over a photographic hero. Cash App's card screen uses ~48px fully-rounded gray pills (`Lock`, `•• 4465`) side by side.

**Operator / reconciliation.** A 12-column transaction table does not become a mobile table. It becomes a card list with the three fields that matter (counterparty, amount, status) and a detail sheet for the rest. Ramp, Mercury and Modern Treasury all show desktop dashboards in their product imagery for a reason — nobody reconciles a month of AP on a phone. Building the responsive table is the wrong effort; building a good mobile *approval* flow (see one payment, approve or reject, with full context) is the right one, because approving from a phone is the genuine mobile job.

**Both.** Stripe's Elements guidance: *"Make sure that you choose a font size of at least 16px for input fields on mobile"* — under 16px, iOS Safari zooms the viewport on focus, which mid-payment feels like a crash. Monzo's `<select>` at 390 is exactly `16px` / `52px` tall. Note this constrains *inputs* only; the `12px` legal line under Cash App's copy is not an input and is fine.

---

## How this archetype fails

This section is about one specific failure: **the fintech UI a language model produces when asked for one.** It is not "bad design" in general — it is a narrow, reproducible, recognizable artifact, and it comes out the same way almost every time, because the training distribution for "fintech dashboard" is Dribbble, not a bank. What follows is written so an agent can grep its own output.

### The eight-second diagnosis

Read your own generated file and answer these. Any **yes** is a defect, not a preference.

1. Does any element with a balance, amount, or total in it have a `linear-gradient` / `radial-gradient` background? → **yes = fail**
2. Does a currency amount use `<sup>`, `<small>`, `text-transform`, `vertical-align: super`, or a different `font-size` for the cents or the symbol than for the integer? → **yes = fail**
3. Is there a `useEffect` / `requestAnimationFrame` / `framer-motion` counter animating a balance from `0` on mount? → **yes = fail**
4. Does a status render as an emoji, an icon alone, or a colored dot with no adjacent word? → **yes = fail**
5. Are there four or more distinct hues used for statuses, and can you say out loud what each one means without looking? → **can't = fail**
6. Does any actionable amount go through `Math.round`, `toFixed(0)`, `Intl.NumberFormat` with `notation: 'compact'`, or a `k`/`M` suffix? → **yes = fail**
7. Is there a `box-shadow` on a money card with alpha above `0.10`? → **yes = fail**
8. Does the confirm dialog's text contain the word "sure"? → **yes = fail**

### The specific artifacts, and what to write instead

**1. The gradient balance card.** The loudest tell, and it is almost always the same card: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)` or a purple→pink variant, `border-radius: 24px`, `box-shadow: 0 20px 40px rgba(102,126,234,0.3)`, balance in white `font-weight: 700`, a small `+2.4%` in a translucent white pill, and a decorative circle or blurred blob at 10% opacity in a corner. The model produces this because the phrase "fintech card" retrieves a Dribbble shot, not a bank.

What real products do: flat surface, near-black on white or white on near-black. Column's `--shadow-product` stacks **five** layers whose maximum alpha is `0.07`, and the actual card edge is a `1px` `rgba(0,0,0,0.05)` ring — not a shadow. Modern Treasury's ledger panels have no shadow at all; they are separated by a header fill. Gradients belong to marketing: Stripe's `/payments` page runs an indigo→cyan wedge *behind* a completely flat checkout card.

**2. Display type on the number.** Setting `$12,480.55` in the marketing headline face, or in a geometric/rounded/playful face, or at `font-weight: 800`. Reads as decorative rather than reported. What the serious products spend money on instead: Increase licenses Input Mono (shipped with `"ss01","ss02","ss12"` baked into `@font-face`) *and* MRZ Mono, the machine-readable-zone face from passports. Column ships SuisseIntlMono. Modern Treasury has `mt-mono` purely for rail labels. Brex disables Inter's ligatures and contextual alternates outright — `"liga" 0, "calt" 0` — and turns the slashed zero **off** with `"zero" 0`. Every one of those is money spent to make numerals *duller*.

**3. Animated counters on real balances.** `$0 → $4,281.19` over 800ms on mount. It is a slot machine; it delays the answer to the only question on screen; and a user who navigates mid-animation reads a false number and screenshots it. The two products in the reference set that animate numbers animate an *aggregate*, not a balance: Increase's `$12,304,488.86` is company-wide processed volume, Ramp's `<number-flow-react>` counters run a `0.8711986%` rate at `10px`. Both use tabular figures — mutation is one of the two cases that justify them. If you must animate a change, tick only the changed digits, use `tabular-nums`, and never on first paint.

**4. Emoji doing a status's job.** The boundary is not "no emoji" — Copilot Money, a five-time Apple design honoree, puts one in every category chip. Look at exactly where: a `~10px` ALL-CAPS colored tag (`💪 HEALTH`, `🥑 GROCERIES`, `💳 SUBSCRIPTIONS`, `🛍️ SHOPS`, `🚗 CAR`) sitting at the far end of the row from the amount, with per-category hue and the merchant name in plain white beside it. The amount is in flat neutral type with nothing near it. The failures are: emoji inside or adjacent to the amount; ✅/❌/⏳ **as** the status; a per-merchant emoji picked by an LLM. Status must be a word — `Settled`, `Pending`, `Returned` — because words survive screen readers, `Cmd-F`, CSV export, and color blindness. Emoji survive none of those.

**5. Precision laundering.** `$1.2k` on a statement line, or `$12.3M` on a row someone has to reconcile. `$400` where the number is `$399.87`. A rate shown as `0.86` when it is `0.8595`. `Intl.NumberFormat(… notation: 'compact')` anywhere the user might reconcile. Each of these means the user cannot check you against their bank, and the first time they catch you rounding they stop trusting every number on the page. Note the inverse failure is just as common: `toFixed(2)` on everything, which turns a category summary into `$368.00 $84.00 $263.00 $21.00` — four columns of dead zeros. Precision is per-role, and it changes within one screen.

**6. The pastel status palette.** `Pending` lavender, `Settled` mint, `Failed` coral, `Processing` peach, primary button periwinkle. Nothing reads as urgent because nothing is *not* pretty, and the failure color is one step from the pending color at a glance. Compare Wise: one dark green for positive **text** (`#008026`), one brighter green for positive **fills** (`#2EAD4B`), a **10% wash** for positive backgrounds, and no other green anywhere in the system.

**7. Fake density.** Copying Linear's 28px rows and 12px type into a consumer banking app because "fintech is dense." Ramp and Mercury are used for hours a day by finance operators and are dense; Cash App and Monzo are used for thirty seconds and are not. Density is a function of session length and repetition, not of the vertical. The tell is `12px` type in a product whose user opens it twice a month.

**8. A confirmation that confirms nothing.** `Are you sure you want to send $5,000? [Cancel] [Confirm]` — no recipient name, no rail, no arrival date, no fee. It buys friction without buying certainty, which is strictly worse than no dialog: the user learns to click through it, and now you have trained them to dismiss the one screen that was supposed to stop them.

**9. Invented compliance furniture.** A gold "FDIC Insured" shield in the footer with no bank named. "Bank-level security 🔒" as a feature bullet. "256-bit encryption" next to a padlock. A "SOC 2 Type II" badge on a product that has not been audited. Models generate these because trust marks are visually dense in the training data and cost nothing to draw. They assert trust instead of evidencing it, and one of them is a regulatory problem rather than a design one.

**10. Success states for things that have not succeeded.** `Transaction successful ✅` on an ACH credit that can return for two business days. A three-node stepper with a checkmark on the last node and no code path for regression. Terminal-green on `paid`, which Stripe's own API reference warns can flip: *"Some payouts that fail might initially show as `paid`, then change to `failed`."*

### What is missing, rather than wrong

The generated version is usually not missing a color. It is missing the states that cost time to think about: no stale-data timestamp, no partial-outage message naming the affected rail, no `Idempotency-Key`, no submitted-but-unconfirmed state, no approval-vs-access distinction on a 403, no receipt with a reference ID, no status-change history on that receipt, and an empty state with an illustration where the account and routing numbers should be. It ships the happy path in a nice font. Every section above this one is about the other paths.

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

Screenshots captured with Playwright at 1440×900 and 390×844 and read as images; computed styles and CSS custom properties extracted with a Playwright `evaluate` probe. September 2026; re-probed and corrected 2026-09-10.

**Re-verified in the 2026-09-10 direction pass** (probe run against the live site, values confirmed or corrected in place):

- `https://wise.com/us/send-money/` — `52px/78px` `#163300` right-aligned input confirmed; `74.0px` comparison rows confirmed; full `content-*` / `interactive-*` / `background-*` / `size-*` token dump re-read. **Corrected:** `--color-content-primary` is `#0E0F0C` not `#37517E`; secondary `#454745`; tertiary `#6A6C6A`; `--color-background-neutral` is `rgba(22,51,0,0.07843)` not a blue-gray at `.10196`; `--color-border-neutral` is `rgba(14,15,12,0.12157)`; `--btn-radius-base` is `9999px` not `3px`. **Added:** the `celebration` semantic pair, the three-state hover/active roles, `type="text" inputmode="decimal"`, the mobile `32/40/48` ladder.
- `https://column.com` — gray ramp, semantic ramps, 13-step type scale and `--font-regular: 300` all confirmed exactly. **Corrected:** `--shadow-product` has five layers and maxes at `rgba(0,0,0,0.07)`, not 3%. **Added:** headings are `blue-800 rgb(17,26,74)`, `"salt" 2` global, the `350/550/750` half-steps.
- `https://increase.com` — **42** tabular elements confirmed, on `$12,304,488.86` at `28px`; `h2 40/48 ls -0.8 w600`, `h3 24/28.8`, lead `20/28`, `#687887` secondary, `--ease-out-quint` all confirmed. **Corrected:** the accent story — the announcement pill is acid yellow, `Contact sales` is mint, and the hero art is a saturated gradient.
- `https://ramp.com` — **Corrected on two counts:** chartreuse fills **six** elements, not two, all of them buttons; and Ramp applies tabular figures to **18** elements, not zero, inside `<number-flow-react>` counters. **Added:** production CSS in CIE `lab()`; `h1` Lausanne `64/64`; the agent-served "Machine Version" page.
- `https://www.brex.com` — every value confirmed unchanged: the full `"calt" 0 … "zero" 0` string, `h1 72/72 ls -1.44px w500 #15191E`, subhead `20/24 ls -0.4 #60646C`, fine print `12/18 ls -0.24`.
- `https://monzo.com` — `--step-0` pinned and `--step-5` confirmed; `h1 48.83/58.59 w800`, `h2 39.06/46.87`, `h3 25/35 w700`, body `16/22.4` confirmed. **Added:** the three classes that actually carry `"tnum"`; mobile `44/48px` targets at `border-radius: 500px`, `<select>` at `16px/52px`.
- `https://plaid.com` — four-step shadow scale at a constant `hsla(0,0%,7%,.08)` and `--transition-duration: 35ms` confirmed. **Added:** `--button-border-radius: 2px`, the overshoot easing, the gradient-clipped `h1`, the rem/px duplication.
- `https://mercury.com` — `arcadia`/`arcadiaDisplay` at 480/420, `h1 49.35/54.28`, `h2 42/48.3 ls +0.42`, `#EDEDF3` confirmed. **Added:** the FDIC pill holds its first-viewport slot at 390px; the superscript footnote marker.
- `https://www.moderntreasury.com` and `/products/ledgers` — global `"cv10","ss07","ss08"` confirmed; `h1 71/78.1 w450` confirmed. Debits-in-slate / Credits-in-clay confirmed by screenshot, with `$1,500.00` identical in both and in both `Total` rows. **Added:** `h2 47/58.75`; mono `Account`/`Amount` header chips on a mint wash; one plum fill for the whole rail taxonomy; `"direction": "credit"|"debit"` as a word not a sign.
- `https://docs.stripe.com/api` — `14/22` body, `24/32` w700 `h1`, `21` w700 `h2`, `16` w600 `h3`, `td 14/20` at `12px` padding, Source Code Pro `14/18.2`, `#F4F7FA` page all confirmed. **Corrected:** body and headings are the **same** color, `#1A2C44`; the earlier `#3C4257` body value is wrong.
- `https://stripe.com/payments` — gradient wedge confirmed by screenshot, and confirmed to be canvas/SVG rather than a CSS `background-image`. **Added:** the flat checkout card sitting on top of it, `Shipping Estimate — FREE`, `VAT (20%)`.
- `https://www.revolut.com` — `Personal` / `£6,012` confirmed at 390, inside a phone frame over a photographic hero. It is image text, so an `innerText` probe misses it.
- `https://copilot.money` — category chips confirmed by screenshot: ALL-CAPS ~10px tags with leading emoji and per-category hue (`💪 HEALTH`, `🥑 GROCERIES`, `💳 SUBSCRIPTIONS`, `🛍️ SHOPS`, `🚗 CAR`), opposite end of the row from the amount. Marketing runs chrome-bevelled display type over blurred floating pills.

**Documentation, read rather than measured** (unchanged this pass):

- `https://docs.stripe.com/declines/codes` — the decline table and the explicit instruction to present `fraudulent` / `lost_card` / `stolen_card` / `merchant_blacklist` as `generic_decline`; `advice_code`
- `https://docs.stripe.com/elements/appearance-api` — `colorPrimary #0570de`, `colorText #30313d`, `colorDanger #df1b41`, `spacingUnit 2px`, `borderRadius 4px`, and the 16px-minimum mobile input rule
- `https://docs.stripe.com/api/payouts/object.md` and `/api/charges/object.md` — the payout status enum plus "may show as `paid`, then change to `failed`"; `outcome.seller_message` / `network_status` / `risk_level`
- `https://increase.com/documentation/api/overview` — the `{type,title,detail,status}` error object, `Idempotency-Key` requirement, Sandbox Simulations
- `https://column.com/docs/api` — docs sidebar as the API object graph, `Simulation` as a peer nav item

**Not re-measured this pass** (values below carry their original September 2026 reading): `https://cash.app` marketing type was re-confirmed (`h1 56/53.2 ls -1.68 w400`, `h2/h3 40/44 ls -1.2`, body `15/18`) but the in-app card-screen pills are from product imagery and were not re-probed. `https://robinhood.com`, `https://nubank.com.br`, `https://fragment.dev` were not re-probed. `https://www.coinbase.com` returns a Cloudflare interstitial to headless Chromium and contributes nothing.

---

## Direction pass (2026-09)

Re-probed ten of the reference sites and screenshotted seven at 1440 and 390.

**Corrected — these were wrong, and wrong numbers are worse than no numbers.**

- Wise `--btn-radius-base`: `3px` → `9999px`.
- Wise `--color-content-primary`: `#37517E` → `#0E0F0C`, with the "body text is navy, not black" claim deleted. Secondary and tertiary were also wrong (`#5D7079` → `#454745`, `#768E9C` → `#6A6C6A`).
- Wise "every status background is exactly `0.10196`": true for the four status washes, false for `neutral`, which is `0.07843` of the brand green. `--color-border-neutral` was `rgba(0,0,0,.10196)`, is `rgba(14,15,12,0.12157)`.
- Column "max shadow opacity is 3%": it is **7%**, across five layers, with alpha rising as blur falls. This value was also quoted a second time in the failure section; both fixed.
- Ramp "chartreuse appears exactly twice, primary CTA is black": it fills **six** elements, all buttons; near-black carries five others. Reframed as "one accent, one job."
- Ramp "0 elements with tabular figures": **18**, in `<number-flow-react>` counters. This inverts the finding into a stronger one — both sites in the sample that use tabular figures use them on animating numbers, and nowhere else.
- Stripe docs body color `#3C4257`: body and headings are both `#1A2C44`.
- Increase "mint appears only on the announcement link and one active icon tile": the announcement pill is acid yellow, mint is the primary CTA, and the hero carries a full gradient.
- Wise's `0.8594` rate and derived amounts drift hourly; now labelled as a timestamped sample with the drift range recorded.

**Cut.** The Coinbase table row (it said nothing). "Everything below is downstream of that." "This is the most transferable thing in the file." Wise's unverified `350/200/600ms` nav transitions. The three-paragraph provenance narrative, compressed to two sentences. "Modern Treasury's framing … is the bar," replaced with the three words that are the actual test. The failure section's "usually four things at once" before a list of eight.

**Added.**

- **Method caveats that change results:** `ramp.com` serves a plain-text "Machine Version" document to a default headless UA — probe it without a real UA string and you silently measure a different page; Ramp ships production colors in CIE `lab()`, so hex string-matching finds nothing; FX-derived values drift within the hour.
- **Wise:** the `celebration` semantic pair distinct from `positive`; base/hover/active triples on every interactive role; the padlock inside the rate pill; the 40px circular icon rail on fact rows.
- **Column:** headings are `blue-800`, not `gray-900`; `"salt" 2` set globally on `body`; the `350/550/750` half-steps as evidence of a scale extended in production.
- **Modern Treasury:** `Total` rows carry cents; mono `Account`/`Amount` chips on a mint wash; one plum hue for the entire rail taxonomy; `"direction"` as a word rather than a sign.
- **Stripe:** the `/payments` gradient wedge sits *behind* a flat checkout card — the two-palette rule as a literal edge in one screenshot; `Shipping Estimate — FREE` and `VAT (20%)` as evidence for finding 10's boundary.
- **Copilot:** the exact anatomy of an acceptable emoji — ~10px ALL-CAPS tag, per-category hue, far end of the row from the amount.
- **Mobile section, which was the thinnest:** `type="text" inputmode="decimal"` rather than `type="number"`, with the reasons; numbers scale on mobile while body copy is pinned (Wise `52→34px` against Monzo's `--step-0`); measured target ladder `32/40/48` at 390; the converter falls below the fold on mobile; Monzo's `44/48px` at `radius: 500px` and its `36px` secondary exception.
- **Plaid:** `--button-border-radius: 2px`; the overshoot easing curve; the gradient-clipped `h1`.

**Boundaries hardened.** Findings 1, 5, 7, 8 and 10 had limits that were restatements rather than limits. Finding 1 now names the case where the rule inverts (an already-monospaced face). Finding 5 names the case where the whole finding is cosplay (no double-entry model behind it). Finding 7 corrects "RTP is terminal" — RTP is irrevocable for the sender, which is not the same as final, and any rail with a return message type is a state machine. Finding 8 excludes field-level validation, where three registers is over-engineering. Finding 10 adds the fee you cannot state honestly because it isn't yours.

**Failure section rewritten** around the specific artifact a language model emits, not bad design generally: an eight-question self-diagnosis an agent can run against its own file (gradient on a balance, `<sup>` on cents, mount-time counters, wordless status, four-plus status hues, compact notation on actionable numbers, shadow alpha over `0.10`, the word "sure" in a confirm dialog), the literal CSS the model tends to produce (`linear-gradient(135deg, #667eea 0%, #764ba2 100%)`, `border-radius: 24px`, `box-shadow: 0 20px 40px rgba(102,126,234,0.3)`), two new failure modes — invented compliance furniture, and success states for things that have not succeeded — and a closing note that the generated version usually fails by *omission*: no stale timestamp, no idempotency key, no submitted-but-unconfirmed state, no receipt history.
