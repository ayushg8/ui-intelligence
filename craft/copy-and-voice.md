# Copy and voice

**Measured:** 2026-09. Every string quoted as "real" below was captured from a live page — a form I submitted, a search that returned nothing, a dialog I opened — not recalled. Typographic values are computed styles at 1440×900. Where I could not measure something I say so.

Copy is the part of the interface a user actually reads. It is also the part where AI-generated products announce themselves fastest: a competent agent can produce a plausible layout, and then label the primary button `Submit`, headline the page `Revolutionize Your Workflow`, and write an empty state that says `No items found. Get started by creating your first item!` — three tells in one screen.

This file is organised by decision. Each section ends with the generic default you are trying not to write.

---

## If you only apply five things

1. **Make every button label the verb phrase of what happens, in sentence case, 1–3 words.** Across 281 unique interactive labels I harvested from 20 shipped products, the median label is **12 characters**, 66% are one or two words, and among multi-word labels **76% are sentence case** ("Get started", "Contact sales", "Start a free trial") against 20% Title Case and 3% uppercase. `Submit`, `OK`, `Confirm`, `Click here` and `Learn more` are not in the top of that distribution for a reason: they describe the widget, not the outcome. If the dialog says "Delete project?", the button says **Delete project**, not **Confirm**.
2. **Write errors as three facts in one or two sentences: what happened, why, what to do next.** Reuse the field's own words. GOV.UK's error-message guidance — the most user-tested error copy in existence — bans `please` (implies a choice), `sorry` (does not help), `valid`/`invalid` (adds nothing), and `oops`, and bans generic strings like `An error occurred`, `This field is required`, and `Fill in the field`. If your label is "How many hours do you work a week?", the error is "Enter how many hours you work a week."
3. **Delete the success message.** If the UI already shows the new state — the row appeared, the toggle moved, the badge changed — a toast saying "Success! Your changes have been saved." adds a dismissal task and nothing else. Keep confirmation only where the result is invisible (an email sent, a background job queued, an irreversible action taken) or where the user needs an undo handle.
4. **Never let a number, date or currency reach the screen as a raw string.** Use `Intl`. `Intl.NumberFormat('en-US',{notation:'compact'}).format(12500)` returns `13K` — it rounds by default and silently lies about your metric unless you set `maximumFractionDigits: 1` (`12.5K`). `de-DE` renders that same value as `12.500`, not `12,5 Tsd.` And `03/09/2026` means 3 September in London and 9 March in New York; one shipped fintech page I measured renders `09/03/26` with no month name anywhere on the page.
5. **Run the tell list before you ship a single string.** Across **20,282 words** of live homepage copy from 19 top products, the phrases `powerful yet simple`, `take it to the next level` and `delve` appear **zero times**, the sparkle and rocket emoji appear **zero times**, `revolutionize`, `elevate`, `harness`, `robust` and `cutting-edge` appear **once each in 20,000 words**, and em dashes run at **2.4 per 1,000 words** with five of the nineteen sites using none at all. Those frequencies are the empirical bar. A draft that uses `unlock` twice on one page is already an outlier against every product in the sample.

---

## The measured reference table

### 1. Label case, across 20 shipped products

281 unique visible interactive labels (buttons, submit inputs, primary nav links) harvested at 1440px from Linear, Stripe, Vercel, GitHub, Notion, Mercury, Ramp, Brex, Wise, Attio, Supabase, Railway, Fly.io, Raycast, Duolingo, Headspace, Robinhood, One Medical, Figma and Excalidraw.

| Measure | Value |
|---|---|
| Unique labels | 281 |
| Mean words per label | **2.33** |
| One or two words | **186 / 281 (66%)** |
| Median label length | **12 characters** |
| 90th percentile length | **25 characters** |
| Longest | 54 chars (a docs link masquerading as a button) |
| Multi-word labels in **sentence case** | **133 / 174 (76%)** |
| Multi-word labels in **Title Case** | 35 / 174 (20%) |
| Multi-word labels in **ALL CAPS** | 5 / 174 (3%) |
| Labels using CSS `text-transform: uppercase` | **4 / 281** |

Those four uppercase labels are worth naming: two are GitHub's legal footer links (`MANAGE COOKIES`, `DO NOT SHARE MY PERSONAL INFORMATION`) and two are Duolingo's consumer CTAs (`TRY 1 WEEK FREE`, `I ALREADY HAVE AN ACCOUNT`). Nobody uppercases a working product button. If your design system has `text-transform: uppercase` on `.btn`, you are copying 2014 Material, not anything shipping now.

### 2. Real button labels with their measured type

| Product / surface | Sample labels | Size / weight / letter-spacing | Control height |
|---|---|---|---|
| **Linear** docs sidebar | `Getting started`, `Issue properties`, `Find and filter` | 14px / **510** / `-0.182px` | 32–36px |
| **Linear** docs actions | `Copy page`, `Sign up` | 13px / 510 / normal | 32px |
| **Vercel** docs | `Ask AI`, `Copy page`, `Open page actions`, `Copy to clipboard` | 14px / 400 body, **500** on actions | 24–32px |
| **Stripe** pricing | `Get started`, `Contact sales`, `See pricing details`, `Compare plans` | 15px / **425** / normal | 33px |
| **GitHub** pricing | `Start free for 30 days`, `Join for free`, `Continue with Team`, `Contact Sales` | 16px / 500 nav, **700** on plan CTAs | 40–48px |
| **Notion** help | `Get Notion free`, `Start learning`, `Chat with us`, `View more` | 16px / 400–500 | 32–36px |
| **Mercury** | `Open account`, `Products`, `Solutions` | 16px / **420** (Arcadia's text weight) | 40px |
| **Attio** | `Start for free`, `Talk to sales`, `View docs`, `Explore the ecosystem` | — | — |
| **Supabase** signup | `Continue with GitHub`, `Continue with SSO`, `Sign up` | — | — |
| **Duolingo** | `TRY 1 WEEK FREE`, `I ALREADY HAVE AN ACCOUNT` | uppercase, brand voice | — |

Weight distribution over all 281 labels: **400 (111), 600 (42), 500 (39), 510 (29), 425 (23), 700 (18), 420 (7), 450 (7), 300 (5)**. Note that 400 dominates because nav links count; the *primary action* in nearly every product runs 500–700. Note also Stripe's 425 and Linear's 510 — intermediate variable-font weights, not the CSS keywords.

Most common first words across the set: `get` (10), `sign` (8), `send` (6), `see` (5), `view` (5), `start` (5), `explore` (4), `contact` (4), `open` (4), `select` (4). Nine of the top ten are verbs.

### 3. Real error strings, captured live

| Source | Exact string | Treatment (computed) |
|---|---|---|
| **Chrome default** (fires on GitHub login, Stripe Dashboard login, Vercel login — all leave `required` on) | `Please fill out this field.` | Native bubble; no product control over wording |
| **Figma** login, wrong credentials | `That email and password combination is incorrect.` | 14px / 400 / white on dark-red filled bar, full field width, `margin-top: 6px`, sits between the password field and the Log in button |
| **Supabase** signup, empty email | `Email is required` | red, below field, no period |
| **Supabase** signup, short password | `Password must be at least 8 characters` | red, below field, plus a live checklist |
| **Supabase** password checklist | `Uppercase letter` · `Lowercase letter` · `Number` · `Special character (e.g. !?<>@#$%)` · `8 characters or more` | radio-style ticks that fill as you type |
| **GitHub** issue search, no matches | `No results` / `Try adjusting your search filters.` | ~16px semibold + 14px/400 secondary, centred in the empty table, **no illustration, no button** |
| **GitHub** repo search, no matches | `Your search did not match any repositories` / `You could try one of the tips below.` | 20px / 600 + 14px / 400 |
| **GitHub** rate-limited action | `You can't perform that action at this time.` | 14px flash banner |
| **Excalidraw** destructive confirm | Title `Clear canvas` / body `This will clear the whole canvas. Are you sure?` / buttons `Cancel` · `Confirm` | red-filled confirm button |
| **Vercel Geist** input, error state (design system reference) | `An error message.` | **13px / 20px / `rgb(203,42,47)` / `margin-top: 8px`** under a 36px-tall, 14px input; the large 40px variant raises the error to **16px / 24px** |
| **USWDS** input error | — | `rgb(181, 9, 9)` at **16.96px** — the *same size as the label*, deliberately not shrunk |
| **Adobe Spectrum** help text | — | 12px / 15.6px / `rgb(70,70,70)` with `margin-top: 8px` |
| **IBM Carbon** field label | — | 12px / 16px / `rgb(82,82,82)` |

Two things fall out of that table. First, **error text is never smaller than help text and often the same size as the label** — Vercel scales it with the input (13/13/16 for small/default/large), USWDS keeps it at body size. Second, **8px is the near-universal gap** between a control and the message beneath it (Vercel, Spectrum), with Figma at 6px.

### 4. What real products actually put in a form

| Product | Label | Placeholder | Notes |
|---|---|---|---|
| GitHub login | `Username or email address`, `Password` | **none** | Real `<label>` elements; `required` left on, so the empty-submit error is Chrome's |
| Stripe Dashboard login | `Email`, `Password` | **none** | "Forgot your password?" link is inside the password label block, right-aligned |
| Supabase signup | `Email`, `Password` | `you@example.com` | Placeholder is a *format example*, not a repeat of the label |
| Vercel login | **none** | `Email Address` | Placeholder-as-label, in Title Case — the one pattern in this table you should not copy |
| Figma login | `EMAIL`, `PASSWORD` | none | Labels are ~11px uppercase micro-labels *inside* the field box |

Also from Figma's login screen, measured on one viewport: the page heading reads **`Sign in to Figma`** and the submit button reads **`Log in`**. Two verbs for one action, 360px apart. Even excellent teams drift; a written verb table is what prevents it.

### 5. Numbers, dates and currency — what `Intl` actually returns

Computed locally, `1234567.891`, `1234.50`, and `2026-09-03T14:05Z`:

| Locale | Number | Currency (USD) | Currency (local) | Date short | Date medium | Time |
|---|---|---|---|---|---|---|
| en-US | `1,234,567.891` | `$1,234.50` | `$1,234.50` | `9/3/26` | `Sep 3, 2026` | `7:05 AM` |
| en-GB | `1,234,567.891` | `US$1,234.50` | `£1,234.50` | `03/09/2026` | **`3 Sept 2026`** | `07:05` |
| de-DE | `1.234.567,891` | `1.234,50 $` | `1.234,50 €` | `03.09.26` | `03.09.2026` | `07:05` |
| fr-FR | `1 234 567,891` | `1 234,50 $US` | `1 234,50 €` | `03/09/2026` | `3 sept. 2026` | `07:05` |
| ja-JP | `1,234,567.891` | `$1,234.50` | **`￥1,235`** | `2026/09/03` | `2026/09/03` | `7:05` |
| hi-IN | **`12,34,567.891`** | `$1,234.50` | `₹1,234.50` | `3/9/26` | `3 सित॰ 2026` | `7:05 am` |
| pt-BR | `1.234.567,891` | `US$ 1.234,50` | `R$ 1.234,50` | `03/09/2026` | `3 de set. de 2026` | `07:05` |
| ar-EG | `١٬٢٣٤٬٥٦٧٫٨٩١` | `‏١٬٢٣٤٫٥٠ US$` | `‏١٬٢٣٤٫٥٠ ج.م.‏` | `٣‏/٩‏/٢٠٢٦` | `٠٣‏/٠٩‏/٢٠٢٦` | `٧:٠٥ ص` |

Things that break naive code, all visible above: **hi-IN groups in lakhs** (`12,34,567`), **ja-JP has zero decimal places for yen** (`￥1,235` — your `.toFixed(2)` is wrong currency-side, not just cosmetically), **en-GB's medium month is `Sept`** (four letters, unlike every other abbreviation), **de-DE uses `.` as the thousands separator** so a hand-rolled regex swap corrupts it, and **ar-EG returns RTL marks inside the string** that will fight your `text-align: right`.

Compact and relative:

| Input | `compact` (default) | `compact, maxFractionDigits: 1` | de-DE `compact` |
|---|---|---|---|
| 999 | `999` | `999` | `999` |
| 1,000 | `1K` | `1K` | **`1000`** |
| 12,500 | **`13K`** | `12.5K` | `12.500` |
| 1,250,000 | `1.3M` | `1.3M` | `1,3 Mio.` |
| 1,000,000,000 | `1B` | `1B` | `1 Mrd.` |

`Intl.RelativeTimeFormat('en', { numeric: 'auto' })` gives you `yesterday`, `2 days ago`, `1 hour ago`, `30 minutes ago`, `last week`, `3 months ago` — the `numeric: 'auto'` flag is what turns "1 day ago" into "yesterday" and "1 week ago" into "last week". Write that flag or you will hand-code a table of special cases.

Plurals are not an English problem: `Intl.PluralRules` classifies **2** as `other` in English, `few` in Russian and Polish. Any string built as `` `${n} item${n === 1 ? '' : 's'}` `` is untranslatable by construction.

### 6. Date and number formats observed in shipped UI

| Product / surface | What it renders | Comment |
|---|---|---|
| Linear changelog | `September 3, 2026`, and `Today` for the newest entry | Full month name; relative only for the newest |
| Attio | `Sep 30, 2026`, `6 hours ago`, `2 days ago`, `yesterday` | Abbreviated absolute + relative under ~1 week |
| Railway | `Nov 12, 2024`, `2 days ago`, and — on the same page — **`10 Days ago`** | Capital D. A real drift bug in a real product, visible at 1440px |
| Brex | `March 2025` and **`09/03/26`** | Ambiguous numeric date with no month name anywhere near it |
| Wise | **`17/12/2025`** | DD/MM, correct for their audience, wrong if you copy it into a US product |
| GitHub pricing | `$ 0 USD per user/month`, `$ 4 USD per user/month` | Currency code spelled out because the page serves every country |
| Stripe pricing | `2.9% + 30¢` | Cents glyph, not `$0.30` — the smaller unit reads smaller |
| Mercury | `Earn 1.5% cashback`, `Earn up to 3.89% yield` | Two decimal places on the rate that matters, one on the one that doesn't |

**Tabular figures are applied surgically, not globally.** Of leaf DOM nodes containing digits: Linear's changelog uses `tabular-nums` on **10 of 773**, Attio on **17 of 143**, and most marketing pages on **zero**. The rule shipping teams actually follow is: tabular in tables, counters, timers, money columns and anything that updates in place; proportional everywhere else, because tabular figures in a headline look like a spreadsheet.
