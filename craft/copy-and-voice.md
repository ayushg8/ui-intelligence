# Copy and voice

**Measured:** 2026-09, in two passes. The second pass added a corpus no marketing scrape can give: **24,899 English UI strings (140,068 words) taken from the shipped translation files of four real products** — Excalidraw, Grafana, Bitwarden and Mattermost — plus 33,145 English→German/French/Japanese string pairs from the same files, and harvested accessible names from GitHub, Grafana and Excalidraw. Those are in-product strings, not homepage strings, and they behave differently. Every string quoted as "real" below was captured from a live page or from a shipped locale file — a form I submitted, a search that returned nothing, a dialog I opened — not recalled. Typographic values are computed styles at 1440×900. Where I could not measure something I say so.

**Re-verified 2026-09-10 under adversarial review.** The `Intl` tables in §5 reproduce byte-for-byte. Product strings split: most held, four were stale or wrong and are corrected in place, and three could not be re-reached from this network and are named as such at the end of the file. §7b and drill three are new and were captured on that date. Read the `Adversarial pass (2026-09)` section at the end before trusting any single quoted string.

Copy is where AI-generated products announce themselves fastest: a competent agent produces a plausible layout, then labels the primary button `Submit`, headlines the page `Revolutionize Your Workflow`, and writes an empty state reading `No items found. Get started by creating your first item!` — three tells in one screen.

Organised by decision. Each section ends with the generic default you are trying not to write.

---

## If you only apply five things

1. **Make every button label the verb phrase of what happens, in sentence case, 1–3 words.** Across 281 unique interactive labels I harvested from 20 shipped products, the median label is **12 characters**, 66% are one or two words, and among multi-word labels **76% are sentence case** ("Get started", "Contact sales", "Start a free trial") against 20% Title Case and 3% uppercase. `Submit`, `OK`, `Confirm`, `Click here` and `Learn more` are not in the top of that distribution for a reason: they describe the widget, not the outcome. If the dialog says "Delete project?", the button says **Delete project**, not **Confirm**. The in-product corpus agrees and tightens it: across 10,379 unique short labels in four shipped apps, the median label is **11–15 characters**, the mean is **1.96–2.37 words**, and `Submit` appears **exactly once in each of the four products** — one legacy form apiece.
2. **Write errors as three facts in one or two sentences: what happened, why, what to do next.** Reuse the field's own words. GOV.UK's error-message guidance — the most user-tested error copy in existence — bans `please` (implies a choice), `sorry` (does not help), `valid`/`invalid` (adds nothing), and `oops`, and bans generic strings like `An error occurred`, `This field is required`, and `Fill in the field`. If your label is "How many hours do you work a week?", the error is "Enter how many hours you work a week."
3. **Delete the success message.** If the UI already shows the new state — the row appeared, the toggle moved, the badge changed — a toast saying "Success! Your changes have been saved." adds a dismissal task and nothing else. Keep confirmation only where the result is invisible (an email sent, a background job queued, an irreversible action taken) or where the user needs an undo handle.
4. **Never let a number, date or currency reach the screen as a raw string.** Use `Intl`. `Intl.NumberFormat('en-US',{notation:'compact'}).format(12500)` returns `13K` — it rounds by default and silently lies about your metric unless you set `maximumFractionDigits: 1` (`12.5K`). `de-DE` renders that same value as `12.500`, not `12,5 Tsd.` And `03/09/2026` means 3 September in London and 9 March in New York; one shipped fintech page I measured renders `09/03/26` with no month name anywhere on the page.
5. **Run the tell list before you ship a single string.** Across **20,282 words** of live homepage copy from 19 top products, the phrases `powerful yet simple`, `take it to the next level` and `delve` appear **zero times**, the sparkle and rocket emoji appear **zero times**, `revolutionize`, `elevate`, `harness`, `robust` and `cutting-edge` appear **once each in 20,000 words**, and em dashes run at **2.4 per 1,000 words** with five of the nineteen sites using none at all. Those frequencies are the empirical bar. A draft that uses `unlock` twice on one page is already an outlier against every product in the sample. **In-product strings are stricter still:** across 140,068 words of shipped UI copy, em dashes run at **0.0–0.5 per 1,000 words** (five times below the marketing rate) and emoji appear **twice in 24,899 strings**. **Re-measure the tell list; do not memorise it.** On a 2026-09 re-scrape, `delve` and ✨ are still zero — which makes them dead detectors that give false confidence — while `agentic` appears on **4 of 8** re-measured homepages and `AI-powered` on 3, above every classic tell in the table. **And the detector set is now anti-correlated with the thing it detects:** v0.app and bolt.new, the two products most responsible for generated UI copy, score a perfect zero on every punctuation and emoji check in this file while shipping `Everything you need to scale Built in.` and `Agentic by default`. See §7a, §7b and drill three. The only check that cannot be gamed is the structural one: swap a competitor's name into the sentence and see if it still reads.

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
| **Linear** docs sidebar | `Getting started`, `Issue properties`, `Find and filter` | 14px / **510** / `-0.182px` | 36px (32px for the 13px header actions) |
| **Linear** docs actions | `Copy page`, `Sign up` | 13px / 510 / normal | 32px |
| **Vercel** docs | `Ask AI`, `Copy page`, `Open page actions`, `Copy to clipboard` | 14px / 400 body, **500** on actions | 24–32px |
| **Stripe** pricing | `Contact sales`, `Sign in` | 15px / **425** / normal | 32–33px |
| **GitHub** pricing | `Start free for 30 days`, `Join for free`, `Continue with Team`, `Start a free trial`, `Contact Sales` | nav 16px / 500 · plan CTAs 16px / **700** — except the free plan's `Start free for 30 days` at 500 | nav 40px, plan CTAs **48px** |
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
| **Vercel Geist** input, error state (design system reference) | `An error message.` | **13px / 20px / `rgb(203,42,47)`**, sitting **8px** below both the 32px and 36px inputs; the 40px variant raises the error to **16px / 24px**, still at 8px. The 8px is the field wrapper's layout gap — the error element's own `margin-top` is `0` |
| **USWDS** input error | — | `rgb(181, 9, 9)` at **16.96px** — the *same size as the label*, deliberately not shrunk |
| **Adobe Spectrum** help text | — | 12px / 15.6px / `rgb(70,70,70)` with `margin-top: 8px` |
| **IBM Carbon** field label | — | 12px / 16px / `rgb(82,82,82)` |

Two things fall out of that table. First, **error text is never smaller than help text and often the same size as the label** — Vercel scales it with the input (13/13/16 for small/default/large), USWDS keeps it at body size. Second, **8px is the near-universal gap** between a control and the message beneath it (Vercel, Spectrum), with Figma at 6px. Specify that gap as a layout `gap` on the field wrapper, not a `margin-top` on the error — otherwise it collapses the moment the error renders inside a flex row.

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
| GitHub pricing | `$ 0 USD per month`, `$ 4 USD per user/month`, `$ 21 USD per user/month` | Currency code spelled out because the page serves every country. Re-verified 2026-09-10 — and note the Free row is *per month* while the paid rows are *per user/month*. The unit changes between adjacent cells of one table, which is why it is printed on every cell instead of once in a header |
| Stripe pricing | `2.9% + 30¢` | Cents glyph, not `$0.30` — the smaller unit reads smaller |
| Mercury | `Earn 1.5% cashback`, `Earn up to 3.89% yield` | Two decimal places on the rate that matters, one on the one that doesn't |

**Tabular figures are applied surgically, not globally.** Of leaf DOM nodes containing digits: Linear's changelog uses `tabular-nums` on **10 of 773**, Attio on **17 of 143**, and most marketing pages on **zero**. The rule shipping teams actually follow is: tabular in tables, counters, timers, money columns and anything that updates in place; proportional everywhere else, because tabular figures in a headline look like a spreadsheet.

### 7. The tell frequencies, measured

Full visible body text scraped at 1440px from 19 product homepages (Stripe, Zapier, Mercury, Linear, Ramp, Monday, Supabase, Slack, ClickUp, Intercom, Asana, Atlassian, GitHub, Airtable, Figma, Retool, Vercel, Duolingo, Notion). **20,282 words total.**

| Phrase | Total hits | Sites using it | Per 10,000 words |
|---|---|---|---|
| `powerful yet simple` / `simple yet powerful` | **0** | 0 / 19 | 0.00 |
| `take it to the next level` | **0** | 0 / 19 | 0.00 |
| `delve` | **0** | 0 / 19 | 0.00 |
| ✨ sparkle emoji | **0** | 0 / 19 | 0.00 |
| 🚀 rocket emoji | **0** | 0 / 19 | 0.00 |
| `revolutionize` | 1 | 1 / 19 | 0.49 |
| `robust` | 1 | 1 / 19 | 0.49 |
| `cutting-edge` | 1 | 1 / 19 | 0.49 |
| `elevate` | 1 | 1 / 19 | 0.49 |
| `harness` | 1 | 1 / 19 | 0.49 |
| `built for modern …` | 1 | 1 / 19 | 0.49 |
| `supercharge` | 2 | 2 / 19 | 0.99 |
| `effortless(ly)` | 2 | 1 / 19 | 0.99 |
| `leverage` (verb) | 2 | 2 / 19 | 0.99 |
| `game-changing` | 2 | 1 / 19 | 0.99 |
| `everything you need` | 2 | 2 / 19 | 0.99 |
| `empower` | 3 | 3 / 19 | 1.48 |
| `it's not just a/an…` | 3 | 2 / 19 | 1.48 |
| `streamline` | 4 | 4 / 19 | 1.97 |
| `all-in-one` | 4 | 3 / 19 | 1.97 |
| `in one place` | 4 | 3 / 19 | 1.97 |
| `seamless(ly)` | 5 | 3 / 19 | 2.47 |
| `unlock` | 6 | 5 / 19 | 2.96 |
| **em dash (—)** | **49** | 14 / 19 | **24.16** |
| exclamation mark | 17 | 6 / 19 | 8.38 |

Per-site punctuation, because the aggregate hides the shape:

| Site | Words | Em dashes | Em dash per 1,000 words | `!` |
|---|---|---|---|---|
| Stripe | 2,357 | 12 | 5.1 | 5 |
| Zapier | 1,833 | 12 | 6.5 | 0 |
| Mercury | 1,575 | 7 | 4.4 | **0** |
| Linear | 1,501 | **1** | 0.7 | 2 |
| Ramp | 1,473 | 1 | 0.7 | **0** |
| Airtable | 565 | 4 | 7.1 | 0 |
| GitHub | 904 | **0** | 0.0 | **0** |
| Slack | 1,309 | **0** | 0.0 | **0** |
| Intercom | 1,027 | **0** | 0.0 | **0** |
| Retool | 359 | **0** | 0.0 | **0** |
| Vercel | 357 | **0** | 0.0 | **0** |
| Duolingo | 357 | 1 | 2.8 | **3** |

Read that table as a calibration instrument. **Two em dashes on a 400-word page puts you above Stripe's rate.** And exclamation marks are concentrated: Duolingo, a company whose entire brand is enthusiasm, uses three on its homepage. Mercury, Ramp, Slack, GitHub, Intercom, Vercel and Retool use zero.


### 7a. The same pages re-measured, 2026-09 — and the vocabulary that replaced the old tells

Eight of the nineteen homepages above, re-scraped at 1440px on the same day this pass was written. The aggregate holds: **21 em dashes across 8,460 words = 2.5 per 1,000**, against the 2.4 measured on the full nineteen. The per-site shape moved, which is the point of re-measuring.

| Site | Words | Em dashes | per 1,000 | `!` | Was (19-site pass) |
|---|---|---|---|---|---|
| Stripe | 1,644 | 11 | **6.7** | 0 | 5.1 |
| Mercury | 1,540 | 7 | 4.5 | 0 | 4.4 |
| Ramp | 1,349 | 2 | 1.5 | 0 | 0.7 |
| Notion | 320 | 1 | 3.1 | 0 | — |
| Linear | 1,276 | **0** | **0.0** | 2 | 0.7 |
| GitHub | 893 | 0 | 0.0 | 0 | 0.0 |
| Slack | 1,306 | 0 | 0.0 | 0 | 0.0 |
| Vercel | 132 | 0 | 0.0 | 0 | 0.0 |

**Re-measured again 2026-09-10, and the instrument's precision is the finding.** Stripe 1,751 words / 11 em dashes = **6.3**/1k (was 6.7). Linear 1,383 / **0** with 2 `!` (unchanged). Vercel 134 / 0 (unchanged). Mercury 924 / 7 = **7.6**/1k — the same seven em dashes, but the page shed 600 words, so the rate rose 69% with no copy change. **Read per-site rates as shape, not as figures:** zero versus non-zero is stable across scrapes; anything below about 2 per 1,000 is inside the noise of what your scraper counts as body text. The aggregate is what holds.

**The classic tells are now dead detectors.** Across those 8,460 words: `revolutionize` 0, `supercharge` 0, `empower` 0, `elevate` 0, `robust` 0, `powerful yet simple` 0, `delve` 0, ✨ 0, 🚀 0. A draft that passes the 2023 checklist tells you nothing.

**What replaced them, measured on the same pass:**

| Term | Hits | Sites | Note |
|---|---|---|---|
| `agentic` | **7** | **4 / 8** | Stripe ×4, plus Vercel, Ramp, Slack. More frequent than any phrase in the §7 table |
| `AI-powered` | 4 | 3 / 8 | Mercury ×2, Slack |
| `all-in-one` | 2 | 1 / 8 | Mercury |
| `seamless` | 1 | 1 / 8 | Stripe |
| `cutting-edge` | 1 | 1 / 8 | Stripe |
| `everything you need` | 1 | 1 / 8 | Stripe |
| `effortless` | 1 | 1 / 8 | Ramp |
| `vibe cod*` | 1 | 1 / 8 | Stripe |

`agentic` and `AI-powered` are doing in 2026 exactly what `powerful` did in 2019: standing in for a capability the writer has not named. The difference is that they are currently *true* of the products using them, which is why they pass review. **The test is unchanged — can the reader tell what the software does from the sentence?** `Agentic commerce` cannot be distinguished from any other product in its category; Stripe's own nav entry is the counter-example that proves it, because the page underneath has to explain what it means.

**Rebuild your own tell list from your own corpus once a year.** The mechanism, not the word list, is what generalises: a tell is any term that (a) appears in your draft, (b) appears at near-zero rate in shipped product copy, and (c) would still be true if you swapped in a competitor's product name.

### 7b. What the generators themselves ship — measured 2026-09-10

The strongest available evidence about the model's copy prior is the marketing copy the AI builders write **for themselves**, because nobody edited it toward a house voice. Scraped at 1440px on 2026-09-10.

| Site | Words | Em dashes | `!` | ✨/🚀 | `delve` |
|---|---|---|---|---|---|
| **v0.app** | 332 | **0** | **0** | 0 | 0 |
| **bolt.new** | 419 | **0** | **0** | 0 | 0 |

**Both score a perfect zero on every punctuation and emoji detector in this file, and both are saturated.** What they actually ship, verbatim:

- bolt.new h2: `Everything you need to scale Built in.` — the canned phrase, live, on the homepage of a product that generates canned phrases.
- bolt.new h2: `Empowering product builders with the most powerful coding agents` — `empower` and `powerful` in one twelve-word sentence, both measured at ~1 per 20,000 words on shipped product homepages.
- bolt.new h2s: `Bolt gives you superpowers` · `Ready to build something amazing?` · h3 `Enterprise-grade` (a feature heading that is one adjective).
- bolt.new body: `98% less errors` (a stat with no baseline, and `less` for `fewer`), `Bolt handles projects 1,000 times larger than before` (a multiplier with no unit), `Stop building from scratch. Start building on-brand.`, `Launch a full business in days, not months.`
- v0.app h3: **`Agentic by default`** — the same `<abstract noun> by default` frame that two unrelated v0 *templates* independently shipped as `Global by default.` ([`../anti-patterns/vibecode-rubric.md`](../anti-patterns/vibecode-rubric.md) §6.2). The generator and its output converge on one sentence shape.
- v0.app h3 `Prompt. Build. Publish.` (tricolon, §taxonomy 10) and CTA section `Go from idea to production in seconds with smart, secure infrastructure`.
- v0.app nav, at 1440px: `New Chat` · `Log In` · `Sign Up` · `View Details` · `Get Started` in Title Case beside `Browse all` in sentence case. bolt.new: `Sign in` beside `Get Started` in the same nav bar. **Case drift on the generators' own surfaces, re-verified.**

**The conclusion this forces:** the 2023 detector set is not merely stale, it is *anti-correlated*. The two products most responsible for generated UI copy in 2026 pass every punctuation and emoji check in this file. Only the structural tests — canned phrase, unbaselined multiplier, adjective-as-heading, tricolon, case drift, and "could a competitor swap their name in" — fired on either page.

### 7c. The outside literature, checked 2026-09

The corpus this file measures is product copy; the detection literature measures prose, and it moved in the last six months.

- **The Economist, 2026-08** — compared its own articles against ChatGPT, Claude, Gemini and Grok across **55,940 sentences / 1.2 million words**. The tells it names: **monotonous sentence length** ("cadence uniformity"), **under-punctuation** — models skimp on commas, semicolons and parentheses and lean on `and` as their single most overused word — **`it's not X, it's Y`**, and **the rule of three**. It also explicitly demotes the lexical tells: claiming a text is machine-written because it contains `delve`, it argues, is like claiming one is Jane Austen's because it contains `imprudence`.
- **Em-dash suppression** shipped as a user-level control with GPT-5.1 (2025-11) and the rate has trended down across frontier models since, which is why §9's detector is now unstable in both directions.

Two of those four — **cadence uniformity** and **under-punctuation** — were absent from this file before this pass and are now §taxonomy 26 and 27. The other two were already here (§taxonomy 11 and 18), and the independent confirmation at that corpus size is the strongest evidence either has.

### 8. The in-product corpus — 24,899 shipped strings

Homepages are written by marketers. The strings a user actually lives in are written by engineers, and they are measurable: every product with a translation pipeline ships its entire English UI as a JSON file. I took four, all shipped, all open source, all in daily production use.

"Label" below means a string of **≤4 words, with no interpolated variable and no terminal punctuation** — i.e. something that is almost certainly a button, menu item, column header or tab.

| Corpus | Strings | Words | Unique labels | Median label chars | Mean words/label | ≤2 words | Sentence case (multi-word) | Title Case | ALL CAPS | Verb-first |
|---|---|---|---|---|---|---|---|---|---|---|
| **Excalidraw** | 614 | 2,586 | 398 | **11** | 1.96 | 72.6% | **93.3%** | 6.7% | 0.0% | 31.7% |
| **Grafana** | 11,500 | 50,713 | 4,736 | **14** | 2.33 | 60.1% | **89.7%** | 10.2% | 0.1% | 29.2% |
| **Bitwarden** | 4,419 | 29,702 | 2,365 | **15** | 2.37 | 58.9% | **88.9%** | 11.0% | 0.2% | 28.4% |
| **Mattermost** | 8,366 | 57,067 | 2,880 | **15** | 2.33 | 60.7% | 55.9% | **43.6%** | 0.5% | 29.8% |

Four things to take from this table.

**Sentence case is not a preference, it is the shipped default.** Three of four products run 89–93% sentence case on multi-word labels — higher than the 76% I measured on marketing pages, because marketing pages contain campaign headlines and product names. Mattermost is the control group: at 43.6% Title Case it is the one product here with no enforced convention, and you can measure exactly what that costs. **Counting multi-word labels that differ from another label only in capitalisation:**

| Corpus | Multi-word labels | Label pairs differing only in case |
|---|---|---|
| Excalidraw | 238 | **0** |
| Bitwarden | 1,928 | 24 |
| Grafana | 3,669 | 66 |
| Mattermost | 1,991 | **101** |

Mattermost ships `Try Again` and `Try again`, `Leave Channel` and `Leave channel`, `Learn More` and `Learn more`, `Save Changes` and `Save changes`, `First Name` and `First name` — 101 such pairs, which is 101 duplicated translation keys, 101 chances for two screens to disagree, and a QA problem nobody will ever finish. **This is the actual argument for sentence case, and it is not aesthetic:** Title Case requires a judgement call on every string, judgement calls drift, and drift is measurable. Excalidraw, with one enforced convention, has zero.

**The label budget is 11–15 characters, and it holds across wildly different products.** A drawing tool and an enterprise chat server land within four characters of each other. If your labels average 20+ characters, you are writing sentences on buttons.

**Only ~30% of labels start with a verb** — lower than you would guess from "always use a verb". The other 70% are nouns, because most short strings in a real app are not buttons: they are section titles, column headers, settings names and status values. The verb rule applies to *actions*, and applying it to everything produces the `Manage Your Settings` school of navigation. Top label first-words across the four: `add`, `no`, `delete`, `show`, `cancel`, `select`, `save`, `new`, `view`, `edit`, `copy`, `search` — a verb list with `no` (empty states) and `new` sitting in the middle of it.

**`Submit` appears exactly once per product.** So does `OK` in three of four. These are not extinct; they are vestigial. One per 5,000 strings is the shipped rate, and it is always in the oldest screen.

### 9. What shipped products do vs. what their own style guides say

Same four corpora. Raw counts, then rate per 10,000 words.

| Pattern | Excalidraw (2.6k words) | Grafana (50.7k) | Bitwarden (29.7k) | Mattermost (57.1k) |
|---|---|---|---|---|
| `please` | 9 · **34.8**/10k | 108 · 21.3 | 80 · 26.9 | 202 · **35.4** |
| `successfully` | **0** | 44 · 8.7 | 32 · 10.8 | 27 · 4.7 |
| `something went wrong` | **0** | 9 | 4 | 16 |
| `oops` | **0** | 1 | 0 | 3 |
| `sorry` | **0** | 7 | 1 | 0 |
| `are you sure` | 4 | **66** | 54 | **89** |
| `click here` | 0 | 2 | 1 | 3 |
| exclamation marks | 5 · 19.3/10k | 20 · 3.9 | 36 · 12.1 | 39 · 6.8 |
| em dashes (per 1,000 words) | **0 · 0.00** | 25 · **0.49** | 1 · 0.03 | 28 · **0.49** |
| emoji | 0 | 0 | 0 | 2 |

The em dash and emoji findings are unambiguous: **in-product copy runs at 0.0–0.5 em dashes per 1,000 words**, five times below the marketing rate of 2.4, and effectively zero emoji in 140,068 words. If an agent writes a settings description with an em dash in it, that string is statistically unlike every string around it.

But `please`, `sorry`, `Something went wrong` and `Are you sure` are *everywhere* in shipped software — 209 uses of `Are you sure` across three products, 399 uses of `please`. The GOV.UK and Atlassian bans on those words are real, well-argued guidance that most shipped software does not follow. So do not write "nobody says please" — that is false and an engineer will catch you. Write it as what it is: **a quality gradient.** The product with zero `successfully`, zero `sorry`, zero `Oops` and zero em dashes is the one with the best-reviewed copy in the set, and it is also the smallest. Copy discipline decays with string count unless someone owns it.

Error strings specifically (keys matching `error|fail|invalid|required|denied|unable|cannot`):

| Corpus | Error strings | Median length | Ends with a period | Contains `please` | Contains `valid`/`invalid` |
|---|---|---|---|---|---|
| Excalidraw | 48 | 7 words | 64.6% | 8.3% | 12.5% |
| Grafana | 575 | **5 words** | **31.0%** | 8.9% | 6.6% |
| Bitwarden | 203 | 8 words | 65.5% | 13.8% | 12.8% |
| Mattermost | 461 | 8 words | 62.0% | 16.9% | 4.6% |

Grafana's error strings are the shortest and least punctuated because most of them are *titles* for an error component (`Failed to load Alertmanager configuration`, `Failed to fetch contact points`), with the detail coming from the API underneath. That is the right architecture: a fixed human title naming the operation, plus the server's own message. The five-word median is what "name the operation that failed" costs.

### 10. Localisation expansion, actually measured

33,145 English→target string pairs from the same four shipped products. Ratio is target characters ÷ English characters, per string, identical strings excluded.

| Corpus | Pairs (de) | de median | de p90 | de >1.3× | de >1.5× | fr median | ja median | ja p90 |
|---|---|---|---|---|---|---|---|---|
| Excalidraw | 564 | **1.27** | 1.73 | 44.0% | 20.2% | **1.32** (p90 1.86) | **0.57** | 0.82 |
| Grafana | 10,031 | 1.24 | 1.64 | 39.0% | 16.2% | — | 0.56 | 0.80 |
| Bitwarden | 4,197 | 1.25 | 1.62 | 40.2% | 15.6% | — | — | — |
| Mattermost | 6,742 | 1.20 | 1.59 | 32.9% | 13.2% | — | — | — |

**The real German budget is +20–27% at the median and +60–86% at p90.** The familiar "+35%" is between the two and describes neither. Plan the *layout* against p90 (a control that fits 1.7× the English string never breaks) and the *copy* against the median.

**French expands more than German** in this data (1.32 vs 1.27 on the same product). German gets the reputation because its long compounds break single words across a fixed control; French adds length in small words that wrap gracefully. If you only test one language, test German for *breakage* and French for *length*.

**Japanese contracts to 0.56–0.57× the English character count**, and never exceeds 1.3× (0.2% of pairs). So a Japanese UI is not a width problem — it is a *legibility* problem: CJK needs a larger minimum font size and looser line-height than Latin at the same visual weight, in half the horizontal space. Budgeting +35% globally over-sizes every Japanese control.

**A finding that contradicts the standard expansion chart:** the well-known IBM/Microsoft tables predict that very short strings expand *hugely* (up to 200–300% for 1–10 characters). Measured across 21,534 real German pairs, the median short label (≤3 words) expands **1.21–1.27×** — essentially the same as the median full sentence (1.18–1.26×). The difference is in the tail, not the median. Design for the tail; do not repeat the "short strings triple" claim as if it were the typical case.

### 11. Accessible-name copy, harvested from live products

The strings nobody reviews. Every one of these was read off a live page at 1440px.

| Product | What is on screen | The accessible name / `title` |
|---|---|---|
| **GitHub** issue row | Issue title, an `Open` chip, `#98493`, avatar, relative time | `Stale "use cache" segment after a client-side navigation that changes a root param: Status: Open. #98493 In vercel/next.js;· amannn opened on Sep 10, 2026. More information available below.` |
| **GitHub** star button | `142k` in the header, `142.2k` in the sidebar | `142221 users starred this repository` — **the visible number is compacted and the accessible name is a raw integer**, so the two disagree about grouping, magnitude and each other. Re-measured 2026-09-10 on `vercel/next.js`; the count drifts by the hour, so quote the *pattern*, never the integer. One value, three renderings on one page, is the finding |
| **GitHub** filter menus | Chevron dropdowns labelled `Author`, `Labels`, `Projects` | `Filter by author`, `Filter by labels`, `Filter by projects` |
| **GitHub** timestamps | `Sep 10, 2026` | `title="Sep 9, 2026, 11:42 PM PDT"` — absolute, with the timezone abbreviation, and note it disagrees with the visible date because the visible one is rendered in UTC |
| **Grafana** sidebar chevrons | icon only | `Expand section: Starred`, `Collapse section: Synthetics` |
| **Grafana** row overflow menu | `⋯` | `Actions for folder Grafana Synthetic Monitoring (default)` |
| **Grafana** feedback thumbs | 👍 👎 | `I love this feature` / `I don't like this feature` |
| **Grafana** sidebar (bug) | `Alerts & IRM` | `Expand section: Alerts &amp; IRM` — the attribute is double-encoded, so a screen reader says "amp" |
| **Excalidraw** toolbar | icon + shortcut digit | `title="Rectangle — R or 2"`, `title="Keep selected tool active after drawing — Q"` |

The conventions that fall out, and they are worth copying verbatim:

1. **A row's accessible name is a linearised sentence, not a list of its chips.** GitHub concatenates title, status, id, repo, actor and date into one readable string. A screen-reader user hears one sentence per row instead of seven fragments.
2. **Icon-only controls get `verb + object + the object's name`.** `Actions for folder meta-monitoring` beats `More`, `Options` and `Actions` — because a page has 20 of those and the accessible names must be unique.
3. **State goes in the name.** `Expand section: Starred` vs `Collapse section: Synthetics` — the label says what will happen, and it changes when the state changes.
4. **Tooltips carry the shortcut after an em dash** (`Rectangle — R or 2`). This is the one place in product UI where an em dash is conventional, and it is a separator, not prose.
5. **Format numbers in accessible names too, and format them the same way.** GitHub ships `142k` in the header, `142.2k` in the sidebar and a raw `142221` in the label — one number, three renderings, on one page. Beyond the grouping problem, the two strings now make different claims, and a voice-control user reading the screen cannot say the label. Run one formatter over both, or set the label from the same value the visible text was formatted from.

### 12. The template corpus — where the slop is not

9 Tailwind UI templates (Salient, Spotlight, Syntax, Studio, Protocol, Commit, Transmit, Pocket, Keynote), 5,185 words. These are the most-cloned SaaS/marketing templates in existence and a plausible source of generated-copy habits.

| Measure | Template corpus (5,185 words) | Shipped homepages (20,282 words) |
|---|---|---|
| em dashes / 1,000 words | 1.9 | 2.4 |
| exclamation marks | 4 | 17 |
| `seamless` | 1 | 5 |
| `cutting-edge` | 2 · **3.9/10k** | 1 · 0.49/10k |
| `everything you need` | 2 | 2 |
| `harness` / `leverage` / `empower` | 1 each | 1 / 2 / 3 |
| ✨ 🚀 | **0** | **0** |
| `Get started` | **9 — five of them on one page** | — |

**The templates are not the problem.** Their prose rates sit at or below shipped marketing pages, their headlines are concrete (`Accounting made simple for small businesses.`, `Open-source Git client for macOS minimalists`, `Invest at the perfect time.`), and they contain zero emoji. One template habit is worth un-learning — **CTA monotony**: Salient ships `Get started` five times on one page, and every clone inherits it.

Generated slop is therefore not inherited from Tailwind templates; it is the model's own prior — which §7b confirms from the other direction, on the generators' own homepages.

---

## Buttons and action labels

### The label is the outcome, not the mechanism

The rule that generates almost all correct button copy: **the button label should be the second half of the sentence "When I click this, the system will ___."** Nothing else needs deciding.

- Dialog asks "Delete `marketing-site`?" → button is **Delete site**, not `Confirm`, `Yes`, or `OK`.
- Form collects an invoice → **Send invoice**, not `Submit`.
- Settings pane with pending edits → **Save changes**, not `Save` (there is nothing called "a save") and not `Update`.
- Payment sheet → **Pay $49.00**, not `Continue`. Put the amount in the button; it is the last thing the user reads before committing money.

`Submit` is the single clearest AI/legacy tell in a form. It describes an HTTP verb. It survives because `<input type="submit">` defaults to it and because the developer writing the form does not know what the form is for. If you cannot name the outcome, the form has a scoping problem, not a copy problem.

### Sentence case, and why

Measured: 76% of multi-word labels in shipped products are sentence case. The reasons are mechanical, not aesthetic.

1. **Title Case has judgement calls in it, and judgement calls drift measurably.** Is it "Sign Up for Updates", "Sign up for Updates" or "Sign Up For Updates"? Every Title Case system needs a preposition rule, and no team applies it uniformly. The cost is counted in §8: Mattermost ships **101 label pairs differing only in capitalisation**, Grafana 66, Bitwarden 24, Excalidraw — one enforced convention — **zero**. Vercel's docs drift on one page (`Deployment Methods`, `Resources Tab and Deployment Summary` beside `CLI workflows`). Sentence case has one rule: capitalise the first word and proper nouns.
2. **Sentence case survives translation.** German capitalises all nouns; French capitalises almost nothing in headings. A Title Case source string forces every localiser into a decision your pipeline cannot verify.
3. **UPPERCASE destroys length budgets.** Uppercase runs roughly 12–15% wider in the same face at the same size and removes the ascender/descender cues that make a truncated label readable. In a 28–36px control that is the difference between fitting and ellipsing.

**Where Title Case is still right:** product names and features that are proper nouns (`Deploy Hooks`, `Vercel Drop`, `GitHub Advanced Security`), legal document titles, and consumer brands whose whole voice is built on it. **Where UPPERCASE is still right:** eyebrows and table column headers set at 11–12px with positive tracking (Attio's eyebrows run 12px w600 with `+0.06em`), keyboard-key caps, and status chips.

### Length

Median shipped label is 12 characters. The practical budget:

| Context | Budget | Example |
|---|---|---|
| Toolbar / icon-adjacent | 1 word | `Share`, `Export`, `Invite` |
| Primary action in a dialog | 1–3 words | `Delete project`, `Send invoice` |
| Primary CTA on a marketing page | 2–4 words | `Start free for 30 days` (GitHub, 22 chars) |
| Destructive confirm | verb + object | `Delete 12 issues` |
| Never | full sentence | `Click here to get started with your free trial today` |

If the label needs a qualifier, the qualifier goes *under* the button as help text, not inside it. GitHub does this on the pricing page: button `Join for free`, and the constraint lives in the plan card above it.

### Never write

`Click here` (breaks on touch, on keyboard, and for screen readers reading a link list out of context), `Learn more` as the only label on a page with four of them (the accessible name must be unique — `Learn more about SSO`), `OK` on anything destructive, `Yes` / `No` as a pair (they force the user to re-read the question to decide which is which), and `Cancel` next to a `Cancel subscription` action (now "Cancel" means two things — use `Keep subscription` / `Cancel subscription`).

**The generic default you are avoiding:** `Submit` / `Cancel`, Title Case, on a 44px-tall button, with a `→` glued to the end.

---

## Headings that say something

A heading earns its line by carrying information the body would otherwise have to repeat. Three failure modes cover almost everything:

**1. The category label.** `Overview`, `Features`, `Getting started`, `Our solutions`. These name the container. They are correct in navigation and in documentation sidebars (Linear's docs sidebar is entirely category labels: `Account`, `Preferences`, `Issue properties`) and wrong as a page's leading heading, where the reader needs to know what is true, not where they are.

**2. The restatement.** A heading that says `Fast deployments` above a paragraph saying deployments are fast. Delete one of them. Real example of the correct move, from Vercel's changelog: `Deployment step now 10% faster` and `Vercel Sandbox routing is now 18x faster globally`. The number *is* the heading.

**3. The claim with no referent.** `Built for teams who move fast`. Which teams, moving how fast, doing what? Compare real headings I captured:

| Product | Heading | What makes it work |
|---|---|---|
| One Medical | `Same/next-day appointments, in person or over video, that start on time` | Three specific promises, one of which ("start on time") is a real grievance |
| One Medical | `Longer appointments so you don't feel rushed` | Mechanism → felt outcome |
| Mercury | `Loved by 300K+ of the most ambitious entrepreneurs on the planet` | A number you can check |
| Ramp | `Time is money. Save both.` | Four words, a pun that resolves into the actual product claim |
| Ramp | `Join 70,000 of the world's most ambitious companies growing 3.2x faster than the average American business.` | Two verifiable numbers |
| Supabase | `Build in a weekend. Scale to millions.` | Two ends of a range, no adjectives |
| Railway | `Ship software peacefully` | One unexpected adverb doing all the work |
| Raycast | `It's not about saving time.` / `It's about feeling like you're never wasting it.` | Contradicts its own category's cliche — **and is a live instance of the negative parallelism this file calls the #1 2026 tell (§taxonomy 11).** Verified verbatim on raycast.com, 2026-09-10. It survives because the second clause carries a claim a competitor could not make; the *construction* is not what makes it work. Copy the construction without that second clause and you get `It's not a CRM — it's a revenue platform.` The exception has to earn itself |
| Fly.io | `Computers for agents` | Three words, a category claim, no adjective |
| Attio | `Picks up leads at 2am. Catches renewals before they slip.` | Two scenarios, not two benefits |

Every one of those either contains a number, a concrete scenario, or a deliberate surprise. None of them contains an adjective stack.

**In-product headings are different.** A settings section heading should be a flat noun phrase in sentence case: Linear's preferences page runs `General`, `Interface and theme`, `Desktop application`, `Automations and workflows`, and its individual settings read `Default home view`, `Display full names`, `First day of the week`, `Auto-assign to self`. No personality, no verbs, no delight. That is correct — the user is scanning for a switch, and every clever word costs them a fixation.

**The generic default you are avoiding:** `Powerful Features for Modern Teams`, followed by three cards headed `Fast`, `Secure`, and `Scalable`.

---

## Empty states

An empty state has exactly one job: **turn "nothing here" into "here is the next action, and here is why the space is empty."** There are four kinds and they take different copy.

### 1. First-run empty (the user has never had data here)

This is the only empty state that deserves real teaching copy, because it is the only one where the user does not yet know what the feature is for.

```
Heading    No projects yet
Body       Projects group issues by outcome and track progress across cycles.
Action     Create a project        Secondary: Import from Jira
```

Rules: name the object in the heading, explain what the object *does for them* in one sentence (not what it is), and give a primary action plus, where migration is plausible, an import path. Keep it to a heading, one line, and up to two buttons.

### 2. Search or filter returned nothing (the user's query is the cause)

**This is the one AI gets wrong most often, by writing first-run copy for it.** The user knows what projects are — they just filtered them all away. GitHub's version, measured: `No results` at ~16px semibold, `Try adjusting your search filters.` at 14px, centred in the table body, **no illustration and no button**. GitHub's repo search is slightly warmer: `Your search did not match any repositories` / `You could try one of the tips below.`

Correct shape:

```
No issues match "payment bug" in Backlog.
Clear filters
```

Echo the query back. Offer the escape hatch (clear filters / broaden search), never "Create your first issue".

**Scope — the echo needs three limits, and agents ship it with none.** The query is user input being written back to the page, so: **escape it** (this is a reflected-XSS sink; render it as text, never as HTML, and never via `innerHTML` or `dangerouslySetInnerHTML`); **truncate it** to about 40 characters with an ellipsis, because a pasted 400-character log line will otherwise reflow the empty state into a wall of grey text and push the `Clear filters` action below the fold; and **drop the echo entirely on shared or observable surfaces** — a search on a clinical workstation, a support agent's screen-shared console, a kiosk — where repeating the query back is how a searched term outlives the search. GitHub's `No results` / `Try adjusting your search filters.` is the correct fallback when any of those three apply: it is a worse empty state in general and the right one there.

### 3. Successfully empty (the user cleared it, and that is good)

Inbox zero, no failed jobs, no open alerts. The copy should read as an achievement or a fact, not a void, and there is usually **no action at all**:

```
No failed deployments in the last 7 days.
```

Not `You have no data yet. Get started by deploying your first project!` — the user has 400 successful deployments.

### 4. Blocked empty (permissions, a missing connection, a disabled feature)

The copy must name the blocker and who can unblock it:

```
Analytics needs the GitHub integration.
Only workspace admins can connect it. Ask an admin →
```

### Two names for two things, and the numbers that go with them

Atlassian's design system splits what most teams call "empty state" into two, and the split is worth adopting because it forces the branch:

- **Blank slate** — the person has never used this feature. Teaching copy is allowed here.
- **Empty state** — the person cleared it or finished it. "These messages are a way to celebrate, add energy, and motivate people to get on with their next task."

Their published budgets, which match what shipped products actually do: **title 3–4 words**, **body 1–2 sentences**, **CTA 1–2 words**, title in sentence case with **no terminal punctuation unless it is a question**. Their success-message page adds the rule most generated UI breaks first: *"Avoid using 'Success!' or 'successfully' in a title"*, and *"Avoid using exclamations! We don't want to be overly enthusiastic about everything!"*

What the shipped corpus does with empty states: of the strings starting with `No `, the overwhelming majority are three or four words naming the missing object — `No teams found via LDAP`, `No datasources found`, `No saved searches yet`, `No access rules yet`, `No critical applications at risk`. Two habits in there are worth stealing and one worth avoiding:

- **Steal:** `yet` for a genuine blank slate (`No saved searches yet`) and no `yet` for a filtered result (`No applications match these filters`). That one word carries the entire branch, and it is free.
- **Steal:** naming the mechanism in the body — Mattermost's `No attributes yet. Click "New attribute" to create one.` names the control by its label so the sentence still works when the button moves.
- **Avoid:** the trailing ellipsis. Excalidraw ships `No items added yet...`, `No matching items found...`, `No matches found...`, `No matching commands...` — four empty states that all imply something is still loading. An empty state is a finished state. No ellipsis.

### The specifics that make empty states good

- **The heading names the object, not the absence.** `No invoices yet` beats `Nothing here`.
- **The body says what will appear here and when.** "Invoices appear here the day after a customer's first payment" is more useful than any illustration.
- **Illustrations are optional and mostly wrong in dense tools.** GitHub, Linear and Vercel use text-only empty states in their data surfaces. A 200px cartoon inside a 320px-tall table region is the strongest single visual tell of AI-generated product UI.
- **One primary action, maximum.** Two buttons only when the second is a genuinely different path (import, invite, docs).
- **Never say `Get started by…`** unless it is literally the first run.

**The generic default you are avoiding:** a centred grey illustration, `No items found`, `Get started by creating your first item!`, and a `+ Create New Item` button — shown to a user who has 400 items and an active filter.

---

## Error messages

### The three-part shape

**What happened → why (only if it changes what they do) → what to do next.** In one or two sentences, in the user's vocabulary, positioned where the problem is.

GOV.UK's guidance, which has been tested with live users on tax services, is the sharpest published version of this and bans specific words for specific reasons:

| Banned | Reason (theirs) |
|---|---|
| `please` | implies the user has a choice about fixing it |
| `sorry` | does not help fix the problem — **scoped:** the ban holds where the user is blocked mid-task and has an action to take. Where your product failed and there is nothing for the user to do, an apology is the correct register: the Guardian's live 404 reads `Sorry — we haven't been able to serve the page you asked for. You may have followed an outdated link, or have mistyped a URL.` and [`../archetypes/editorial.md`](../archetypes/editorial.md) ships it as a *good* example. Apologise for outages, 404s and data loss you caused; never for a field the user left empty |
| `valid` / `invalid` | adds nothing the user can act on |
| `oops`, humour | wrong register when someone is stuck |
| `forbidden`, `illegal`, `prohibited`, `you forgot` | blames the user |
| `An error occurred`, `This field is required`, `Fill in the field`, `Select an option` | make no sense out of context, and are identical for every field on the page |
| jargon: `form post error`, `unspecified error`, `error 0x0000000643` | unactionable |

Two more of their rules that agents routinely violate:

- **The error must reuse the label's words.** Label `How many hours do you work a week?` → error `Enter how many hours you work a week`. Label `Address line 1` → error `Enter address line 1, typically the building and street`. This is what lets a screen-reader user, hearing the error out of context in an error summary, know which field it belongs to.
  **Scope — reuse the label's *distinguishing noun*, not the whole label, once the label runs past about six words.** GOV.UK's examples are short question labels, and the rule was fitted to them. Applied literally to an enterprise form, the label `How many hours do you work in a typical week, excluding unpaid overtime and on-call time?` generates a sixteen-word error under a 200px field, and a form with eight of those produces an error summary nobody reads to the end. Take the noun that identifies the field and drop the qualifiers: `Enter your typical weekly hours`. The test is still the summary test — could a user hearing this string alone find the field? — and a distinguishing noun passes it at a quarter of the length. Where the qualifier is the constraint being violated, it belongs in the error; where it is scoping the question, it stays in the label.
- **Instructions for empty, descriptions for wrong.** `Enter your name` (empty) but `Name must be 35 characters or less` (too long). `Enter a date after 31 August 2017 for when you started the course` is worse than `Date you started the course must be after 31 August 2017`. Pick per situation, then be consistent across the product.
- **Do not clear the fields.** Keep both the passing and the failing answers.
- **Do not repeat an on-screen example in the error.** If the hint already shows `QQ 12 34 56 C`, the error does not need to.

### The shape that scales: a written title, a server-supplied body

Grafana's 575 error strings have a **five-word median** and are almost all titles, not sentences: `Failed to create alert rule`, `Failed to load Alertmanager configuration`, `Failed to fetch contact points`, `Unable to display all events`. The detail comes from the API response rendered underneath.

That split is the only error architecture that survives a large product. **The human writes one title per operation — `Failed to <operation>` or `Couldn't <operation>` — and the system supplies the specifics.** It gives you: a string that is always accurate (the operation is known at the call site even when the failure is not), a stable translation key, and a body that can carry a real cause without anyone having to pre-write 500 of them.

The failure mode it prevents is the one generated UI always ships: a single `Something went wrong. Please try again.` reused at 40 call sites, each of which knew exactly which operation had failed and threw that information away.

Excalidraw's variant is the same idea in the other verb: `Couldn't create shareable link: the scene is too big`, `Couldn't insert SVG image. The SVG markup looks invalid.`, `Couldn't import scene from the supplied URL. It's either malformed, or doesn't contain valid Excalidraw JSON data.` Pick `Couldn't` (warmer, contracted, user-facing) or `Failed to` (flatter, closer to a log line) and use one of them everywhere. Do not mix.

### Real errors, graded

| String | Source | Grade | Why |
|---|---|---|---|
| `That email and password combination is incorrect.` | Figma, live | **Good** | Deliberately does not say *which* is wrong — telling an attacker "that email exists" is an account-enumeration leak. The vagueness is a security decision, not laziness. |
| `Password must be at least 8 characters` | Supabase, live | **Good** | Description form, states the rule, no `please`, no `invalid`. |
| `Email is required` | Supabase, live | **OK** | Correct but generic; `Enter the email you'll sign in with` would be better and would still be three words longer. |
| `Please fill out this field.` | Chrome default, fires on GitHub / Stripe / Vercel logins | **Bad, and it's yours** | Every product that leaves `required` on and does not intercept `invalid` is shipping this string. It says `please`, names no field, and is identical for all fields on the page. |
| `You can't perform that action at this time.` | GitHub, live | **Bad** | No what, no why, no next step. Classic rate-limit-shaped non-message. |
| `Something went wrong. Please try again.` | ubiquitous | **Bad** | Says nothing. If you genuinely have no detail, at least add what the user can do and what you did: `We couldn't save your changes. Your draft is still here — try again, or copy your text somewhere safe.` |

### When to be vague on purpose

Three cases, and only three:

1. **Authentication.** Never distinguish "no such account" from "wrong password" on a login form. Figma's string is the model.
2. **Fraud.** Stripe's own documentation, on the `fraudulent` decline code, instructs integrators: *"Don't report more detailed information to your customer. Instead, present it in the same manner as generic_decline."* Telling someone precisely which rule flagged them is telling the next fraudster how to pass.
3. **Anything where the detail is an internal identifier.** A stack trace or `error 0x...` is not detail, it is noise. Show a short support code the user can quote instead: `Reference: 8FQ2-40B1`.

### Error placement and treatment

Measured norms: the message goes **directly below the control, 6–8px away**, at 13–17px depending on the control's size, in a red that clears 4.5:1 on the surface. Vercel's Geist scales error text with the input (13px under a 32/36px input, 16px under a 40px input); USWDS keeps error text at the same 16.96px as the label; Figma inverts it — white text on a filled dark-red bar the full width of the field.

For a form with multiple errors, summarise at the top **and** mark each field, with the same string in both places, so they "look, sound and mean the same" (GOV.UK). Add a visually hidden `Error:` prefix so screen readers announce the state before the text.

**The generic default you are avoiding:** a red toast in the top-right that says `Error: Something went wrong. Please try again later.`, auto-dismissing after 3 seconds, while the form sits untouched.

---

## Confirmation dialogs

### The title is the question

Almost every bad confirm dialog comes from splitting the question across the title and the body, then labelling the buttons `Yes`/`No` or `Cancel`/`Confirm`. The fix is structural:

```
Title    Delete "Q3 pricing experiment"?
Body     3 documents and 41 comments will be deleted. This can't be undone.
Buttons  Cancel        Delete experiment
```

- **Title = the question, with the object named.** Include the actual name of the thing. `Delete project?` is weaker than `Delete "Q3 pricing experiment"?` because the second one lets a user catch that they had the wrong row selected.
  **Scope — three cases where naming the object in the title makes the dialog worse:** (a) **the name is long.** `Delete "Q3 pricing experiment — Northern Europe rollout (v4 final)"?` truncates in a 400px dialog and ellipses away the distinguishing suffix, which is the exact half that would have caught the wrong row. Over ~30 characters, the title goes generic (`Delete this experiment?`) and the full name moves to the body, where it can wrap. (b) **the selection is a bulk one.** Never build a title out of a list. `Delete 12 experiments?` in the title, the names enumerated in the body, and the body scrolls. (c) **the name is sensitive or observable.** In a clinical, HR or support tool, a dialog title is the string that survives into a screenshot, a screen share and a session recording. `Delete record for Maria Alvarez?` puts a patient name in the most-captured 40 characters on the screen. Use the non-identifying handle (`Delete record #40182?`) and put the name in the body, which is what the recorder's redaction rules can reach.
- **Body = the consequence, quantified.** "3 documents and 41 comments" is the whole value of the dialog. "Are you sure?" is not information; it is a speed bump. If you cannot state a consequence, you probably do not need a dialog.
- **Buttons = the verbs, not the answers.** The destructive button repeats the title's verb. A user who reads only the buttons must still be able to act correctly.

Excalidraw's live dialog is a useful counter-example from a good product: title `Clear canvas` (a command, not a question), body `This will clear the whole canvas. Are you sure?` (the consequence is unquantified — how many shapes?), buttons `Cancel` / `Confirm` (the destructive verb is missing from the button the user clicks). Sharpened:

```
Title    Clear the canvas?
Body     47 shapes will be deleted. You can undo this with ⌘Z.
Buttons  Cancel        Clear canvas
```

### When not to use a dialog at all

**Most of the time.** A confirm dialog is a tax on every user to protect against a mistake made by a few. The alternatives, in order of preference:

1. **Undo.** Do the thing, show a toast with `Undo` for 5–10 seconds. Correct for anything reversible: archive, delete-to-trash, bulk edit, send (Gmail's send-undo window).
2. **Soft delete.** "Moved to trash. Deleted permanently in 30 days." No dialog at all.
3. **Type-to-confirm.** Reserve for the genuinely irreversible and catastrophic — deleting a repository, an org, a production database. The user types the resource name. GitHub's version works because the friction is proportionate.
4. **Dialog with quantified consequence.** Only when the action is irreversible, immediate, and not worth type-to-confirm friction.

**The generic default you are avoiding:** `Are you sure?` / `This action cannot be undone.` / `Cancel` `Confirm` — a dialog that contains no information about what is being deleted or how much of it there is.

---

## Form labels, placeholders and help text

### Labels

- **Always a real `<label>`.** Placeholder-as-label (Vercel's login field: no label, placeholder `Email Address`) fails the moment the user types — the label vanishes, and anyone who was interrupted has to clear the field to remember what it wanted. It also breaks autofill review and voice control.
- **Sentence case, no colon, no "Please".** `Email address`, not `Email Address:` and not `Please enter your email address`.
- **Name the thing, not the data type.** `Card number` not `Number`; `Company legal name` not `Name`.
- **Mark the minority.** If most fields are required, mark the optional ones `(optional)`. If most are optional, mark the required ones. Never both. Never a bare asterisk with no key.

### Placeholders

A placeholder is for **format**, never for meaning. Supabase's `you@example.com` under a real `Email` label is the correct pattern: the label says what, the placeholder says what shape.

| Field | Good placeholder | Bad placeholder |
|---|---|---|
| Email | `you@example.com` | `Email` |
| Phone | `+1 (555) 000-0000` | `Enter your phone number` |
| Custom domain | `app.yourcompany.com` | `Domain` |
| Search in a table | `Search 1,240 invoices` | `Search...` |
| Amount | `0.00` | `Enter amount` |

Placeholder text is also the lowest-contrast text in your interface. If the placeholder carries meaning, that meaning is being delivered at ~3:1 contrast to a user who may be on a phone in sunlight.

### Help text

Help text answers the question the user would otherwise abandon the form to research. Measured treatment: Spectrum sets it at 12px/15.6px in `rgb(70,70,70)` with `margin-top: 8px`; Carbon labels at 12px/16px `rgb(82,82,82)`.

- **Put it under the label and above the field** when it changes what the user types (`Use the name exactly as it appears on your bank account`).
- **Put it under the field** when it is a consequence or a constraint (`Members can see this. Admins can edit it.`).
- **Cut it entirely** when it restates the label. `Email — enter your email address` is a line of noise on every form in the world.
- **Never write help text that says "This field is required."**

One live anti-pattern worth naming, from a good product: Supabase's signup shows `Password must be at least 8 characters` as an error *and* a five-item checklist that includes `8 characters or more`. Same rule, two places, two phrasings. Pick the checklist (it is live-updating and teaches while typing) and drop the duplicate error, or keep the error and drop that one checklist row.

**The generic default you are avoiding:** every field labelled by its placeholder, one asterisk with no legend, and a helper line under each input that repeats the label.

---

## Onboarding copy

The whole discipline is: **say what this screen wants and why, in the fewest words that still let a stranger comply.**

- **The screen's heading is the task**, not a greeting. `Name your workspace` beats `Welcome to Acme!` — the greeting screen is the one everybody clicks past without reading, which means your first real instruction lands on a user who has already switched off.
- **Justify anything invasive, inline, at the point of asking.** `We'll use this to route billing questions — we never email your team.` Under the field, not in a tooltip.
- **Give the escape hatch a real label.** `Skip for now` beats `Skip`, and `I'll do this later` beats `No thanks` because it tells the user the task persists.
- **Progress copy should count, not encourage.** `Step 2 of 4` beats `Almost there!` Users who are actually almost there can see it.
- **Legal microcopy goes under the button, not above the form.** Supabase's live version: `By continuing, you agree to Supabase's Terms of Service and Privacy Policy, and to receive periodic emails with updates.` Note that it discloses the marketing email consent in the same sentence rather than in a pre-ticked checkbox.
- **The empty product after onboarding is part of onboarding.** Most of the teaching belongs in the first-run empty states, in context, not in a five-screen carousel the user swipes through.

**A shipped first-run screen worth studying.** Excalidraw's welcome state, at 1440px, contains no greeting, no benefit, no carousel and no account prompt. Under the wordmark, three sentences at 18px/21.6px:

```
Your drawings are saved in your browser's storage.
Browser storage can be cleared unexpectedly.
Save your work to a file regularly to avoid losing it.
```

Then four menu items — `Open  Cmd+O`, `Help  ?`, `Live collaboration...`, `Sign up` — and two hand-drawn arrows annotating the real UI (`Export, preferences, languages, …` pointing at the hamburger; `Pick a tool & Start drawing!` pointing at the toolbar).

The entire first-run copy is a **risk disclosure**, not a pitch: the one thing that will hurt this user is losing work to cleared browser storage, so that is the only thing the screen says. Compare what a model produces for "write an onboarding screen for a whiteboard app" — a welcome, three benefits and a `Get Started` button. **The test for first-run copy is not "what is great about this product" but "what will this person get wrong in the next ten minutes".**

**The generic default you are avoiding:** `Welcome to [Product]! 👋 Let's get you set up in just a few steps.` followed by a carousel of three benefit slides.

---

## Loading and progress copy

Rules ordered by how often they are broken:

1. **Below ~1 second, show nothing but the disabled control.** A flash of "Loading..." is worse than a 400ms wait.
2. **1–5 seconds: a skeleton or spinner with no text**, or a label naming the object: `Loading invoices`. Not `Please wait...`.
3. **Over ~5 seconds: name the step and, if you can, the count.** `Importing 1,240 of 3,500 issues` is the difference between a user waiting and a user reloading the tab. If you have no count, name the phase: `Building`, `Deploying`, `Running tests` — the vocabulary developer tools already use in deploy logs.
4. **Never fabricate a percentage.** A progress bar that sits at 92% for forty seconds destroys more trust than an indeterminate spinner ever did.
5. **Never use jokes on a timer.** "Reticulating splines" is funny the first time and infuriating the ninth, and it is unlocalisable.
6. **Change the button, not the page.** A submit button going `Save changes` → `Saving…` (disabled) keeps the user's eyes where they already are. Do not also show a full-screen overlay.
7. **Ellipsis convention — the meaning is what you standardise, not the glyph.** There are two ellipses and they say different things. **In-progress** (`Saving...`) means the system is still working. **Second-step** on a menu item or command (`Export…`, `Assign to…`) means "this opens something that will ask you for more input" — a keyboard user reading a palette is deciding whether to keep typing, so it is load-bearing, not decoration. **Measured:** shipped products overwhelmingly type three periods — Grafana 210 `...` vs 21 `…`, Excalidraw 18 vs 2, Mattermost 107 vs 19 — and they mix them *on one screen*: Excalidraw's welcome screen (re-verified live, 2026-09-10) shows the annotation `Export, preferences, languages, …` directly above the menu item `Live collaboration...`.
   **Corpus reconciliation:** [`../archetypes/technical-productivity.md`](../archetypes/technical-productivity.md) prescribes the glyph for the second-step form (`Assign to…` · `Change status…` · `Snooze until…`) and it is right for a command palette in the macOS lineage, where that glyph is the platform convention. So: **one glyph per meaning, both linted.** Whichever pair you pick, the rule that actually catches bugs is that the *in-progress* form must never appear on a finished state — an empty state, a completed toast, a settled value.

**The generic default you are avoiding:** a full-screen spinner over `Loading your data, please wait...` for a 200ms fetch.

---

## Success messages

**Default to none.** The state change is the confirmation. If the row appears in the table, a toast saying "Item created successfully!" is telling the user something their eyes just told them, and it costs a dismissal.

Keep a success message when one of these is true:

| Condition | Example |
|---|---|
| The result is **invisible** | `Invoice sent to maria@acme.com` |
| The result is **elsewhere** | `Report will be emailed to you when it's ready` |
| The user needs an **undo handle** | `Issue archived` + `Undo` |
| The action was **irreversible and consequential** | `API key deleted. Existing requests using it will fail.` |
| The result is **delayed** | `Deploy queued — this usually takes about 2 minutes` |

And when you do write one: **name the object and the destination.** `Sent` is weak. `Invoice #1084 sent to maria@acme.com` is a receipt. Never write the word `Success!`, never write `successfully` (it is a word that only appears in software), and never use an exclamation mark in a tool people use all day.

**The generic default you are avoiding:** a green toast, top-right, `Success! Your changes have been saved successfully.` with a checkmark icon and a 5-second auto-dismiss.

---

## Notification copy

A notification competes with whatever the user is doing. It has to survive being read out of context, often on a lock screen, often hours late.

- **Lead with the actor and the object.** `Priya commented on "Q3 pricing"` — not `New comment` and not `You have a new notification`.
- **Front-load the field that *varies*, which is usually but not always the actor.** Assume ~40 characters visible on a lock screen and ~60 in a notification centre.
  **Scope — front-loading the grammatical subject is wrong whenever the subject is near-constant across the user's notification set.** A CI or monitoring product sends every notification from the same actor, so `Vercel Bot: deployment to acme-mar…` spends the entire visible budget on the one word the user already knew and truncates away the project, the environment and the outcome. There the varying field is the outcome: `Failed: acme-marketing → production (build timeout)`. Same rule for a single-project workspace, where the project name is constant, and for a per-channel feed, where the channel is. **Decide by looking at ten consecutive real notifications and front-loading the first field that differs between them** — not by applying actor-verb-object as a template.
- **Never batch into a count when a name will do.** `3 new activities` is unactionable. `Priya and 2 others commented on "Q3 pricing"` is.
- **Say what changed, not that something changed.** `Deploy failed: build exceeded 45 min timeout` beats `Your deployment status has been updated`.
- **Time is relative in the notification, absolute in the record.** `2 hours ago` in the feed; `Sep 3, 2026 at 2:05 PM` on hover or in the detail view.
- **No exclamation marks, no emoji prefixes** in any professional tool. The one place emoji earn their space is as a status *token* in a list (a green dot, a warning triangle) — and then it should be an icon, not an emoji, so it can be themed and coloured.

---

## The strings nobody reviews: accessible names, tooltips and placeholders

Three surfaces carry copy that never appears in a design review because it is not visible in the mock. All three are measurable, and all three are where generated UI is worst — the model writes the visible string and leaves the invisible ones as `aria-label="button"`.

### Accessible names

An accessible name is the string a screen reader announces. It is also the string a voice-control user has to say out loud to click the thing. Rules, taken from what GitHub and Grafana actually ship (see table 11):

- **Icon-only control:** `verb + object + the object's own name`. `Actions for folder meta-monitoring`, not `More`. If a page has six overflow menus, six identical `More` buttons make the page unusable by voice.
  **Scope — this rule inverts in a long table.** Grafana's page has a dozen rows; a virtualised invoice table has five thousand. Naming every one of them `Actions for invoice INV-2026-000841 from Northwind Traders` means a screen-reader user arrowing down the column hears forty syllables of already-announced row context before reaching the word `Actions`, on every single row — the uniqueness rule was written to *save* time and here it costs it. **The rule is that the name must be distinguishable within the page's tab order, not globally unique as a string.** Above roughly 20 repeated rows, use a bare `Actions` on the button and let the row supply identity: put the control in a `<td>` inside a row whose first cell is the row header (`scope="row"`), so the row name is announced by table navigation rather than duplicated into every control. Keep the long form for the handful of icon-only controls that sit outside a table — toolbar buttons, card overflow menus, sidebar chevrons — where nothing else carries the object's name.
- **A row or card:** one linearised sentence, in reading order, with the status included. GitHub's issue rows are the model: `«title»: Status: Open. #98493 In vercel/next.js;· amannn opened on Sep 10, 2026.`
- **A toggle or disclosure:** name the action *and* the target, and swap it with state: `Expand section: Starred` / `Collapse section: Synthetics`.
- **Never duplicate the visible text into `aria-label` with different words.** A voice-control user says what they see. If the button says `Save changes` and the label says `Submit form`, saying "Save changes" does nothing.
- **Run your number, date and currency formatters over accessible names.** GitHub's star button is the counter-example, shipping a raw `142221 users starred this repository` beside a visible `142k` (re-verified 2026-09-10).
- **`aria-live` for anything you decided not to toast.** If you deleted the success message because the state change is visible, the change is still invisible to a screen reader. A polite live region carrying `Invoice sent` costs nothing and is the actual reason "delete the success toast" is safe advice.

### Tooltip copy

- **A tooltip is a label, not a paragraph.** Excalidraw's are the shape to copy: `Rectangle — R or 2`, `Hand (panning tool) — H`, `Keep selected tool active after drawing — Q`. Name, then the shortcut after an em dash. That is the one conventional em dash in product UI.
- **Never put information only in a tooltip.** It does not exist on touch, and it is a hover-delay away from existing on desktop.
- **Do not restate the visible label.** A tooltip that says `Save` on a button that says `Save` is noise with a 500ms delay.

### Placeholder copy, and the two-search problem

Grafana's Checks page shows both halves of this on one screen at 1440px: the global search box reads `Search...` and the page's own search box reads `Search by job name, endpoint, or label`. The second is right and the first is a default nobody revisited.

**Rule:** a scoped search names its scope and its searchable fields; only a true omnisearch may be generic, and even then `Search or jump to…` (GitHub) beats `Search...`. If a user cannot tell which of two search boxes on the screen will find their thing, the placeholder is the only thing that can tell them, and `Search...` refuses to.

**The same rule already governs the AI input box.** Measured 2026-09: ChatGPT `Ask ChatGPT`, Gemini `Ask Gemini`, Perplexity `Ask anything…`. **Correction, re-measured 2026-09-10: v0 no longer ships `Ask v0 to build…`** — its composer sits under the heading `What do you want to create?` with no placeholder at all, and bolt.new ships an *animating* placeholder that types `Let's build a prototype...` one character at a time. An animated placeholder is worse than a generic one: a user arriving mid-cycle reads a fragment (screenshotted at 1440px, it read `Let's build a c`), it is meaningless under reduced motion, and it is not a format example. Naming the thing being asked; naming it is what tells the user which of the boxes on screen reaches the model and what it can do. `Ask anything…` is the `Search...` of AI surfaces — it is defensible on a product that is only that box, and wrong the moment the box sits inside a larger app. Scope it the same way: `Ask about this invoice`, `Ask about your 2026 spend`.

### Marketing voice inside the product

On that same Grafana screen, a dismissible banner sits above the page heading reading **`Your Users Shouldn't Be Your Monitors`** — Title Case, five words, an aphorism — directly above a sentence-case product heading (`Checks`) and a sentence-case nav (`Testing & synthetics`, `Alerts & IRM`, `Machine learning`). Mattermost's admin console ships `Effortlessly collaborate across languages with auto-translation. Messages in shared channels are instantly translated based on each user's language preference—no extra steps required.` — an `Effortlessly`, an unspaced em dash, and a benefit stack, inside an admin settings page.

Upsells, feature-discovery cards and trial banners are the single most reliable place for marketing voice to leak into a product. **The rule is that in-product promotional copy takes the product's voice, not the homepage's:** sentence case like everything around it, a specific capability instead of an aphorism, and the constraint stated (`Enterprise Advanced only`) rather than buried. If the banner's headline would look wrong as a settings heading on the same page, it is wrong.

---

## Person, tense and voice

The one convention worth memorising: **"your" for things belonging to the user, imperative for things the user does to the system, and "we" only when a human at the company is genuinely the actor.**

| Situation | Write | Not |
|---|---|---|
| Labelling the user's data in navigation | `Your projects`, or just `Projects` | `My Projects` |
| A button the user presses | `Create project` | `Create My Project` |
| The system reporting on itself | `We couldn't reach the payment provider` | `An error was encountered by the system` |
| A statement about the user's account | `Your trial ends on Sep 30` | `The trial period will expire` |
| A promise the company is making | `We'll email you when it's ready` | `You will be notified` |

**Why not "My".** `My Files` / `My Account` reads as the product talking in the user's voice, which is a 2005 desktop convention. It also collides badly the moment the interface addresses the user in second person elsewhere on the same screen: "My Projects — invite people to your projects." Pick second person and hold it. **Exception:** where the possessive genuinely disambiguates ownership in a shared space — `Assigned to me` and `Created by me` are *correct* in GitHub's issue sidebar, because there `me` distinguishes a filter from `Assigned to Priya`. First person for filters, second person for everything else.

**Two respected systems flatly contradict each other here, and you have to pick.** Apple's Human Interface Guidelines: *"Use possessive pronouns sparingly… 'Favorites' conveys the same message as 'Your Favorites', and is more succinct. Avoid using we altogether because it may be unclear who the 'we' in question refers to. This is particularly problematic in error messages like 'We're having trouble loading this content.' Something like 'Unable to load content' is much clearer."* Atlassian's error-message guidance says the opposite: *"Use we instead of you, as emphasizing the relationship between the person and the problem could make them feel like they're being held responsible."*

They are both right inside their own domain. Apple writes for an OS where the software is not a company — there is no "we" that could have done anything, and screen real estate is measured in millimetres. Atlassian writes for a hosted service where a server your company operates genuinely failed, and saying so protects the user from feeling blamed. **The decision rule:** if a named party (your servers, your API, your billing provider) actually did the thing, say `We couldn't reach the payment provider`. If nothing did — a file is malformed, a field is empty — drop the actor entirely: `Unable to load content`, not `We couldn't load this content`. Never use `we` as a friendliness marker on a failure that is nobody's doing.

**Tense.** Present tense for state (`3 issues are blocked`), simple past for completed events (`Deploy failed`), simple future only for things that will actually happen later (`Your card will be charged $49 on Oct 1`). Avoid the perfect tenses — `Your changes have been saved` is passive and longer than `Changes saved`, which is longer than showing the saved state.

**Voice.** Active, with the actor named. Passive voice is a tell because it is what you write when you do not want to say who did it. The exception is when the actor genuinely does not matter or is the user themselves at fault — `The file was deleted` may be kinder than `You deleted the file`.

---

## Numbers, dates and currency

### Numbers

- **Group with `Intl.NumberFormat`, never a regex.** German uses `.` where English uses `,`; Hindi groups in lakhs.
- **Round to the precision the decision needs, not to the precision you have.** `$1,234.56` in a ledger; `$1.2K` in a summary tile; never `$1234.5600000001`.
- **Compact notation rounds by default** (§5). Decide whether your dashboard is allowed to be 4% wrong.
- **Tabular figures on every column of numbers that aligns or updates.** Inter's `1` is ~41% narrower than its `0`; a right-aligned money column jitters without `font-variant-numeric: tabular-nums`. Measured: marketing pages apply it to ~2–12% of digit-bearing nodes, but a real data surface is the opposite — on Grafana's Checks page, **72 of 133 digit-bearing leaf nodes (54%)** carry `tabular-nums`. The rule is not "use it sparingly", it is "use it wherever numbers stack", and a dashboard is nearly all stacked numbers.
- **The grouping bug is real and it ships.** On that same Grafana page, at 1440px, the check cards read `8928 executions / month`, `133920 executions / month` and `5963ms` — six-digit counts with no thousands separator, in a monitoring product whose entire job is numbers. This is what `${n} executions / month` produces. Every number that reaches a user goes through a formatter, including the ones in chips, badges, tooltips and `aria-label`s.
- **Zero is a value, not an empty state.** `0 open issues` is information; a blank cell is ambiguous between zero and unknown. Use `—` for unknown and `0` for zero, and never the same glyph for both.
- **Units go next to the number, spaced by locale rule.** `4.2 MB`, `250 ms`. In German the percent sign takes a space (`3 %`), in English it does not (`3.4%`) — `Intl` knows this and you do not.

### Dates

- **Absolute for records, relative for recency, and give the other on hover.** Attio's live pattern: `6 hours ago`, `2 days ago`, `yesterday` for anything under about a week, then `Sep 30, 2026`. Linear's changelog uses `Today` for the newest entry and `September 3, 2026` for everything else.
  **Scope — this inverts entirely on an operational surface.** On a monitoring console, an incident timeline or a log view, relative time is wrong at every horizon: two events 300ms apart are both "just now", and a screenshot pasted into an incident channel has to be datable a year later. There it is absolute to the resolution the domain warrants, with the zone always printed — `2026-09-10 09:48:55.947 UTC`. Stated with its reasoning in [`../archetypes/data-terminal.md`](../archetypes/data-terminal.md), which is the authority for that archetype.
- **Never render a bare numeric date to a global audience.** `09/03/26` is 9 March in most of the world and 3 September in the US. If you must be compact, use `3 Sep 2026` or ISO `2026-09-03`.
- **`Intl.RelativeTimeFormat` with `numeric: 'auto'`** gives you `yesterday` and `last week` free; without it you get `1 day ago` and `1 week ago`.
- **Match the capitalisation of relative strings across the app.** Railway's own site shows `2 days ago` and `10 Days ago` on one page. This is what happens when relative time is formatted in two places.
- **Show the timezone when it changes a decision.** `2:05 PM PST` on a meeting, not on a comment timestamp.

### Currency

- **Include the currency code when your users span currencies.** GitHub's pricing page renders `$4 USD per user/month` rather than `$4` — because `$` means eight different currencies.
- **Never superscript the cents.** Superscript cents is retail-pricing typography; it reads as a marketing device and undercuts a product that handles real money.
- **Use the smaller unit for genuinely small amounts.** Stripe writes `2.9% + 30¢`, not `2.9% + $0.30` — the glyph itself signals the magnitude.
- **Say the billing period every time you say a price.** `$20 / user / month, billed annually` — the number without the period is the single most common pricing-page ambiguity.
- **Match decimal places to the currency, not to a habit.** JPY has zero decimals; `Intl` handles this and `.toFixed(2)` does not.

---

## Internationalisation-safe copy

Even if you never localise, these rules make copy better in English. If you do localise, breaking them costs a rewrite of every string.

1. **Never concatenate a sentence from fragments.** `"You have " + n + " new " + (n === 1 ? "message" : "messages")` is unlocalisable: `Intl.PluralRules` classifies 2 as `few` in Polish and Russian, and word order differs. Use full templated strings per plural category (ICU MessageFormat), one message per category.
2. **Never build a sentence around an injected UI element.** `Click [Save] to continue` puts a button in the middle of a sentence and forces a word order English has and Japanese does not. Write `Select Save to continue.`
3. **Budget the measured expansion, not the folklore number** (§10 has the table). Size controls against German p90 (≈1.7×) and write against the median (≈1.25×). Fixed-width buttons and single-line nav items are the localisation traps, and a global "+35% padding" rule silently ruins your Japanese UI, which contracts to 0.56× and needs a larger font in less width, not more room.
4. **Do not encode grammar in code.** Gendered adjectives, articles that depend on the following noun (`a`/`an`), and possessives (`Priya's project`) all break outside English. Prefer `Project owner: Priya`.
5. **Avoid idiom, sport metaphor and alliteration.** `Knock it out of the park` is untranslatable. `Set and forget` requires an explanation. Product copy that leans on wordplay ships as literal nonsense in twelve languages.
6. **Avoid text in images and icon-only labels for text-heavy actions.** Both are invisible to translation pipelines.
7. **Give translators context.** A key named `button.save` with the comment "Primary action on the invoice edit form; max 16 chars" produces a better translation than `save`.
8. **Watch RTL.** Arabic and Hebrew mirror layout; `Intl` emits directional marks inside formatted dates, which will fight a manual `text-align`. Use logical CSS properties (`margin-inline-start`) rather than `margin-left`.

---

## Tone calibration by archetype

Tone is not decoration; it is a claim about what kind of consequence the user is facing. The measured signals below come from the homepages and product surfaces I scraped.

**Precedence, because this table is not the only one in the corpus.** All 20 files in [`../archetypes/`](../archetypes/) carry a `## Copy register` section with worked right/wrong string pairs. **Where an archetype file and this table disagree, the archetype file wins for its own archetype** — it was written against that archetype's reference products and it knows things this table generalises away. This table is the *cross-archetype instrument*: it tells you which dimensions move between archetypes and by how much. Read your archetype's register first, then use this to see what your neighbours do differently.

The five rows below are grouped by consequence class, and each names the archetype files it summarises. **They were checked against all 20 registers on this pass; the four places where the corpus genuinely contradicted itself are resolved in-place** — the ellipsis glyph (§Loading 7), `sorry` (§Error messages), relative time (§Dates) and the separator em dash (§taxonomy 9).

| Archetype | Measured signals | Sentence shape | Never |
|---|---|---|---|
| **Money** → [`fintech-consumer`](../archetypes/fintech-consumer.md), [`fintech-institutional`](../archetypes/fintech-institutional.md), [`ecommerce`](../archetypes/ecommerce.md) | **0 exclamation marks** on mercury.com (1,575 words) and ramp.com (1,473 words). Exact figures everywhere: `1.5% cashback`, `3.89% yield`, `3.72%`, `2.9% + 30¢` | Declarative, short, numeric. `Radically different banking`. `Time is money. Save both.` | Jokes near a balance. Emoji. Vague ranges. Anything that reads as a promotion where a fact belongs |
| **Technical** → [`developer-platform`](../archetypes/developer-platform.md), [`technical-productivity`](../archetypes/technical-productivity.md), [`data-terminal`](../archetypes/data-terminal.md), [`ai-product`](../archetypes/ai-product.md) | Vercel and Retool: **0 em dashes, 0 exclamation marks**. Changelog entries state the delta: `Deployment step now 10% faster`, `Vercel Sandbox routing is now 18x faster globally` | Imperative and mechanical. `Build in a weekend. Scale to millions.` `Computers for agents.` | Explaining what an API is. Marketing adjectives in error messages. Hiding the real error behind a friendly one |
| **Consumer** → [`expressive-consumer`](../archetypes/expressive-consumer.md), [`consumer-marketplace`](../archetypes/consumer-marketplace.md), [`social-community`](../archetypes/social-community.md) | Duolingo: uppercase CTAs (`TRY 1 WEEK FREE`), lowercase section heads (`free. fun. effective.`), 3 exclamation marks in 357 words | Warm, second person, short. `The most fun way to learn languages, chess, and more!` | Formality. Jargon. Long sentences. Making the user feel behind |
| **High-consequence civic** → [`healthcare-clinical`](../archetypes/healthcare-clinical.md), [`institutional-civic`](../archetypes/institutional-civic.md) | Concrete promises, no exclamation marks: `Same/next-day appointments, in person or over video, that start on time`; `Longer appointments so you don't feel rushed` | Plain, calm, specific about time and cost. Reading level deliberately low | Cheerfulness about outcomes. Hedged language where a fact is known. Euphemism (`unexpected result`) |
| **Operational** → [`enterprise-dense`](../archetypes/enterprise-dense.md), [`internal-utility`](../archetypes/internal-utility.md), [`analytics-bi`](../archetypes/analytics-bi.md) | Category-labelled navigation, no personality in settings | Neutral noun phrases. Consequences stated for every toggle | Delight. Personality in destructive flows. Any string an auditor would have to interpret |
| **Composed voice** → [`luxury`](../archetypes/luxury.md), [`editorial`](../archetypes/editorial.md), [`premium-marketing`](../archetypes/premium-marketing.md), [`premium-minimal`](../archetypes/premium-minimal.md), [`creative-tool`](../archetypes/creative-tool.md) | The one group where a written voice is the product. `Est. 1925`, `Buy &#124; Read` (Kinfolk), `Restored support for ⌘⌫ in Quick Entry's checklists.` (Things) | Full sentences with subordinate clauses are *allowed here and nowhere else in this file*; the product named plainly and completely; the photograph or the text carries the argument | Explaining why the thing is good. Adoption metrics used as prestige. `Shop Now` where the object has a name. Also: two of these five (`luxury`, `editorial`) legitimately break this file's sentence-case and `sorry` rules — see their registers |

### The same message in five voices

**Situation:** a scheduled export failed because the connected Google Drive token expired.

| Voice | String |
|---|---|
| **Fintech** | `Export to Google Drive failed. The connection expired on Sep 1. Reconnect Google Drive to resume the daily 6:00 AM export.` |
| **Developer tool** | `Export failed: Google Drive OAuth token expired (401). Reconnect to resume the 06:00 UTC schedule. Last successful run: Aug 31.` |
| **Consumer** | `We couldn't save your export to Google Drive — the connection expired. Reconnect and we'll pick up where we left off.` |
| **Healthcare** | `Your records were not sent to Google Drive. The connection expired on September 1 and no data was lost. Reconnect Google Drive to send them.` |
| **Enterprise admin** | `Scheduled export "Daily activity" failed at 06:00 UTC. Cause: Google Drive credential expired 2026-09-01. Action: a workspace admin must reauthorise the connection. Affected exports: 8.` |

Notice what does *not* change across all five: the fact of the failure comes first, the cause is named, the next action is stated, and nobody apologises. What changes is precision level, vocabulary, and whether the actor is named. **Voice is which facts you include and how you order them — not which adjectives you use.** That is the single most useful thing to understand about product tone, and it is why "make the copy friendlier" almost always produces worse copy: friendliness gets added as adjectives and exclamation marks instead of as clarity.

### Two boundaries

- **Personality scales inversely with consequence.** The same product can be playful in its empty states and dead flat in its billing flow. Duolingo is exuberant in the lesson loop and completely plain on the payment screen. Rule: as the cost of a mistake rises, subtract voice.
- **Personality scales inversely with frequency.** A joke in a once-a-year flow is charming. The same joke in a string a user sees forty times a day is an irritant. This is why in-product settings copy (Linear: `Default home view`, `Display full names`) has no voice at all.

---

## The AI copy taxonomy

Each entry: the pattern, why it is empty, and the rewrite move. The moves are always one of four — **name the actual thing**, **use the user's words**, **cite a real number**, **describe the mechanism**.

### 1. `Revolutionize your workflow`

**Why it's empty:** "Revolutionize" is a claim of magnitude with no content, and "workflow" is a placeholder for the thing you did not want to name. Measured: `revolutionize` appears **once in 20,282 words** of real product homepage copy.
**Move — name the actual thing.** What workflow? Whose? What does it currently cost them?
→ `Close the books in 3 days instead of 11.`

### 2. `Seamlessly integrate with your favorite tools`

**Why it's empty:** "Seamlessly" is the adverb form of "we hope you don't ask how", and "your favorite tools" is a way of not listing the integrations because you have four. Also: users do not experience seams; they experience specific failures (auth expiring, fields not mapping, sync lag).
**Move — name the actual thing, and count.**
→ `Two-way sync with Salesforce, HubSpot and Pipedrive. Field mapping included; no Zapier step.`

### 3. `Powerful yet simple`

**Why it's empty:** It is a claim that you have escaped a tradeoff, made without describing either side. It appears **zero times in 20,282 words** of real product copy. It is a phrase that exists almost exclusively in generated copy and in template marketplaces.
**Move — describe the mechanism** that resolves the tradeoff, or drop the claim.
→ `Every action has a keyboard shortcut. None of them are required.`

### 4. `Everything you need to manage your team`

**Why it's empty:** "Everything you need" is unfalsifiable and, worse, it is what a category page says when it cannot rank its own features. It also silently promises completeness you will be judged against.
**Move — cite the three things that matter, in order.**
→ `Time off, payroll and one-on-ones in one place. No headcount planning yet.` (Naming what you *don't* do buys more credibility than any superlative.)

### 5. `Built for modern teams`

**Why it's empty:** "Modern" dates instantly and describes the reader, not the product. Every product in history was built for modern teams at the time. Measured once in 20,282 words.
**Move — name the actual segment and the constraint that shaped the product.**
→ `Built for finance teams at 50–500 person companies who close monthly.`

### 6. `Supercharge` / `Turbocharge` / `10x` your anything

**Why it's empty:** A multiplier with no baseline. "10x your productivity" is a number that cannot be checked, which is worse than no number, because a reader who notices will discount everything else you claim.
**Move — cite a real number with the baseline attached.**
→ `Median PR review time dropped from 19 hours to 4 in the 30 days after switching.` (If you do not have the number, say the mechanism instead, never the multiplier.)

### 7. `Unlock the power of your data`

**Why it's empty:** "Unlock" implies the value already existed and something was in the way — a metaphor that carries no information about what your product does. It is the most common of the tells I measured (6 uses across 19 sites), which means it is not *never* used — it means it is the tell most likely to sneak past you.
**Move — describe the mechanism.**
→ `Query your production Postgres in SQL and chart the result, without a data warehouse.`

### 8. `Effortlessly` / `Simply` / `Just`

**Why it's empty:** These are the writer reassuring themselves. They are also actively hostile: if a user is stuck on a step you have described as "simple", the copy has told them the problem is them. `effortless` appears twice in 20,282 words; `just` in an instruction is worse than either.
**Move — delete the adverb and count the steps.**
→ `Connect a repo, pick a branch, deploy. Three steps, about 90 seconds.`

### 9. Em-dash-heavy rhythm

**Why it's a tell:** The em dash is the model's favourite connector because it can join two clauses without committing to a logical relationship. Real product copy uses it at **2.4 per 1,000 words**, and five of nineteen top products use **none**. AI drafts routinely run 15–30 per 1,000 — one in most paragraphs, often two in a sentence.
**Two em dashes, and only one of them is the tell.** The **connector** — joining two clauses in prose without committing to a logical relationship — is the tell. The **separator** — `label — detail`, `fact — consequence` — is a conventional typographic device in status lines, tooltips and error strings, and it is what six archetype files in this corpus prescribe: `Rectangle — R or 2` (Excalidraw), `Card declined — insufficient funds.`, `Couldn't export — the file is still saved.`, `Documented allergy: penicillin — anaphylaxis.` Those are not prose and they are not the tell. **Count connectors, not glyphs**, and read grep check #10 as a smell test on prose rather than a hard gate on a locale file.

**And the detector is now unstable in the other direction.** OpenAI shipped user-level em-dash suppression with GPT-5.1 (2025-11), and the trend across frontier models since has been downward. So a zero em-dash count no longer proves a human wrote it, and a high count may only mean a different model or a different setting. The em-dash rate remains a good *house-style* rule — it is a bad *detector* in 2026, and this file's own §7a is the reason: the classic lexical tells and the punctuation tells are decaying together.

**Move:** convert each connector em dash to the relationship it was hiding. A period if the clauses are independent. A colon if the second explains the first. A comma if it is an aside. Then re-read; usually one of the two clauses was filler and can go.
→ `We rebuilt sync — it's faster now — and added conflict resolution.` becomes `Sync is 4x faster and now resolves conflicts automatically.`

### 10. Tricolon headlines (`Fast. Simple. Secure.`)

**Why it's a tell:** Three adjectives in a row with periods is a rhythm, not an argument. It reads as emphasis while delivering three unverifiable claims for the price of one. It is also self-similar: every product in the category can run the identical line.
**Move — keep the rhythm only if each member is concrete and different in kind.** Supabase's `Build in a weekend. Scale to millions.` works because it is two clauses naming two different time horizons with a number in the second. `Fast. Simple. Secure.` works for nobody.
→ `Fast. Simple. Secure.` becomes `p50 under 40ms. One config file. SOC 2 Type II.`

### 11. Negative parallelism: `It's not X, it's Y` — the single most persistent 2026 tell

**Why it's a tell:** The negation-elevation construction manufactures profundity by defining the product against a strawman. It concedes the frame ("so it IS a CRM") while adding no evidence for Y. Measured 3 times in 20,282 words of shipped marketing copy — and this is the one entry in this list where the *outside* frequency, not the shipped frequency, is what matters: as of a 2026-08 Atlantic piece it is the recognised signature of machine-written text, the tic that outlasted `delve` and survived every round of model tuning, and its use in corporate communications more than quadrupled between 2023 and 2025 (Barron's). Readers now recognise it faster than they recognise em dashes.

**It has migrated out of headlines and into product copy**, which is where an agent will place it: feature descriptions (`This isn't a setting — it's a policy.`), changelogs (`Not a redesign. A rewrite.`), empty states (`It's not empty. It's ready.`), and onboarding. Every variant of the shape counts: `X isn't just Y`, `Not X. Y.`, `Less X, more Y`, `X? No. Y.`

**Move — delete the first half.** If Y is true, assert Y with evidence. Then grep your whole string file for the shape, because one instance is a style and four is a signature.
→ `It's not just a CRM — it's a revenue platform.` becomes `Every email, call and Stripe charge lands on the contact record automatically.`
→ `This isn't a setting — it's a policy.` becomes `Applies to all 40 workspace members and can't be overridden per-user.`

### 12. Vague benefit stacking

**Why it's empty:** Three cards headed `Save time`, `Reduce costs`, `Increase visibility`, each with two lines of body that restate the heading. It is the shape of an argument with the argument removed. The tell is that you could shuffle the three cards between any two products in the category and nobody would notice.
**Move — replace each benefit with the mechanism that produces it**, and make the three mechanisms different in kind (one about speed, one about a specific integration, one about a guarantee).
→ `Save time` becomes `Auto-categorises transactions using your last 90 days of coding decisions.`

### 13. The sparkle — now an icon problem, not an emoji problem

**Why it's a tell:** ✨ 🚀 🎉 💡 🔥 appear **zero times** across 20,282 words from nineteen top products, and zero across the 8,460-word 2026-09 re-scrape. That part of the tell is dead as a detector — models mostly stopped emitting emoji into headings.

**Where it went instead:** ✨ became the universal *icon* for every AI entry point, and by 2026 it has inverted in meaning. The critique is well documented — a sparkle now reads to a meaningful slice of power users as "the button not to click", because it marks the feature whose output has to be checked. Shipping a sparkle beside a label is a positioning decision that says "this part is generated", and most of the time the team did not intend to say it.

**Move:** delete the emoji outright; if it carried meaning (status, category), use an icon from your set so it inherits `currentColor` and themes in dark mode. For an AI action specifically, **name the action instead of marking it as AI** — `Summarize thread`, `Draft reply`, `Find similar issues`, not `✨ AI` or `Ask AI ✨`. The user does not need to know which feature is a model; they need to know what pressing it does. The single legitimate emoji in product UI remains user-authored content — a reaction, a status a person chose.

### 14. `Get started` as every CTA

**Why it's weak:** It is true of every button in every product, so it does no work distinguishing this one. Measured, it *is* the most common first word (10 of 281 labels) — so this is a soft tell, not a hard one. It is correct on a homepage hero where the next step genuinely is "begin"; it is lazy on the fifth button down the page.
**Move — name the destination.** `Deploy your first project`, `Create a free workspace`, `Import from Jira`.

### 15. `Please note that` / `Kindly` / `We're excited to announce`

**Why it's a tell:** Corporate-register throat-clearing. `Please note that` prefaces information that would be equally clear without it; `We're excited to announce` puts the company's emotional state ahead of the user's information.
**Move — start at the information.**
→ `We're excited to announce that we've launched a new dashboard!` becomes `The new dashboard is live. It loads 3x faster and adds saved filters.`

### 16. Adjective stacks in product nouns

**Why it's a tell:** `A comprehensive, intuitive, enterprise-grade solution` — four words that each mean "good" without saying how. Applies equally to `robust`, `cutting-edge`, `world-class`, `best-in-class`, `state-of-the-art`, `next-generation`. Each measured once or never in 20,282 words.
**Move — delete every adjective, then add back only ones that would be false if the opposite were written.** "Enterprise-grade" survives only if you can follow it with a specific artefact: `SOC 2 Type II, SSO via SAML, audit log export`.

### 17. The "in today's fast-paced world" opener

**Why it's a tell:** Setting-the-scene copy that assumes the reader needs convincing their problem exists. Products with real users start at the product; content marketing starts at the world.
**Move — cut every sentence before the first specific noun.** Nine times out of ten the draft's third sentence is the real first sentence.

### 18. Symmetry and parallelism everywhere

**Why it's a tell:** Generated copy compulsively balances: three features with three-word headings and two-line bodies of near-identical length, every section a triplet, every sentence the same length. Human product copy is lumpy — Ramp's homepage runs a four-word headline next to a 20-word subhead.
**Move — deliberately break one member of every set.** If two features deserve a sentence and one deserves a paragraph, give it the paragraph.

### 19. `Effortless`-adjacent verb inflation: `elevate`, `empower`, `harness`, `leverage`, `streamline`, `optimize`

**Why it's empty:** These are all "make better" with a costume on. Measured: 1–4 uses each across 20,282 words, mostly in enterprise-marketing contexts.
**Move — use the plainest verb that is true.** `leverage your data` → `use your data`. Then notice that "use your data" is obviously vacuous, and write the mechanism instead. That is the point of the plain verb: it makes the emptiness visible.

### 20. The over-explained empty state

**Why it's a tell:** Three sentences and an illustration where one sentence would do, because a model asked to "write an empty state" produces a paragraph. Real ones are two lines (GitHub: `No results` / `Try adjusting your search filters.`).
**Move — cut to a heading plus one line, and check whether it is a first-run or a filtered empty state.** They need different copy and generated UI almost always ships the first-run version for both.

### 21. `Agentic`, `AI-powered`, `AI-native`, `intelligent`

**Why it's empty:** This is the 2026 replacement for `powerful`, and it is harder to catch because it is usually *true* (rates in §7a). The word names your implementation, not the user's outcome, and it is true of every competitor in the category simultaneously, which is the definition of a non-differentiating claim.
**Move — describe what it does without the word.** If the sentence collapses, the sentence was the word.
→ `AI-powered expense categorisation` becomes `Categorises each expense from your last 90 days of coding decisions; you correct it once and it stops asking.`
**In-product corollary:** never prefix a feature name with `AI`. `AI Insights` tells a user nothing about what is in the panel. `Spend anomalies` does.

### 22. The blanket AI disclaimer

**Why it's a tell:** `AI can make mistakes. Check important info.` sits under every generated surface in every product, and it is measured on the shipped ones — Gemini's live string is `Gemini is AI and can make mistakes.` It is the `Please note that` of 2026: identical everywhere, unactionable, and the research is consistent that it does not move users' assessment of the message. Worse, an agent copies it under features where nothing is generated.
**Move — say what specifically is unverified and give the check.** `Drawn from 4 support tickets — open them to verify.` `Amounts are estimated from unreconciled transactions.` If you genuinely have nothing specific, put one disclosure at the feature boundary (once, where the user opts in) rather than under every response, where it becomes furniture.

### 23. Shimmering `Thinking…` as the universal loading state

**Why it's a tell:** The shimmer-plus-`Thinking…` pattern was a chat affordance and has spread to loading states that are not chat and not generative. It breaks two rules at once: it is text under one second (see loading copy), and it names the *system's* internal condition rather than the step. A shimmer is a texture; it carries no information.
**Move — name the step, and keep the shimmer only as a skeleton.** `Reading 12 files`, `Searching 4,200 invoices`, `Drafting reply`. If the phases are known, count them: `Step 2 of 4 · Checking permissions`. Reserve `Thinking…` for the case where you genuinely cannot name a step, and even then prefer naming the elapsed budget.
**Related:** streaming text token-by-token into a table cell, a summary field or a form value. Streaming is a conversation convention; outside a conversation it slows reading and forbids scanning.

### 24. Parallel feature headings — the shape, not the word

**Why it's a tell:** The measurable version of #18, and it is shipping on the AI builders' own sites. Lovable's homepage, live at 1440px: `Hosting, handled` · `Your app stack, connected` · `Payments, processed` · `Safe and secure, as standard` · `Works wherever, whenever`. Five headings, one grammatical frame, four of them noun-then-past-participle. It reads as designed and is exactly the artefact a model produces when asked for five feature headings in one call.
**Move — write the set, then break it.** At least one member of every set of three or more must differ in grammatical shape and in length. If two features deserve four words and one deserves a sentence, give it the sentence.

### 25. Case drift inherited from the generator

**Why it's a tell:** The tools generating most AI UI drift on their own surfaces. Measured 2026-09: v0.app ships `New Chat`, `Log In`, `Sign Up`, `View Details` in Title Case beside `Browse all` in sentence case; bolt.new ships `Get Started` beside `Sign in` on one page. An agent that pattern-matches its own tooling inherits both conventions and therefore neither.
**Move — pick one convention and lint it**, which is the §8 argument in one line: Excalidraw enforces one and has zero case-duplicate label pairs; Mattermost enforces none and has 101.

### 26. Cadence uniformity — the tell that replaced the em dash

**Why it's a tell:** The Economist's 2026-08 study across 55,940 sentences names this as the strongest surviving signal: model output runs sentence after sentence at near-identical length, because nothing in the generation process has a reason to vary. Human product copy is lumpy — a four-word headline beside a twenty-word subhead, a one-word answer after a paragraph. Uniform cadence reads as competent and anonymous, which is exactly what generated UI copy reads as.

**It is the one tell in this file you can measure without a word list.** For any block of prose — a landing page, a docs page, a settings description set — compute the sentence-length standard deviation. Human editorial and shipped marketing prose runs wide; generated prose clusters.

```bash
python3 -c "import re,sys,statistics as st;s=[len(x.split()) for x in re.split(r'(?<=[.!?]) +',sys.stdin.read()) if x.strip()];print(len(s),'sentences, mean',round(st.mean(s),1),'sd',round(st.pstdev(s),1))"
```

**Move — break the rhythm on purpose.** After a three-sentence paragraph, write a two-word one. Let one feature description be a fragment and the next be two clauses. The point is not variety for its own sake: uniform length means every sentence was given the same weight, and in real copy some facts matter more than others.

### 27. Under-punctuation and `and`-chaining

**Why it's a tell:** the same study's second finding. Models under-use commas, semicolons and parentheses, and instead chain clauses with `and`, producing long flat sentences with no internal hierarchy. In product copy this shows up as help text and feature descriptions that read as one breath: `Connect your account and we'll sync your transactions and categorise them automatically and you can review them later.`

**Move — punctuate the hierarchy you already have.** The parenthetical goes in parentheses, the consequence goes after a colon, the aside goes between commas. Then delete whichever clause survives being cut. `Connect your account. Transactions sync and categorise themselves; you review the ones we weren't sure about.`

**The interaction with §9 that matters:** you cannot fix under-punctuation by adding em dashes, which is the move a model reaches for first. Colons and periods carry the same load and are not a signature.

---

## The rewrite drill

### Drill one: fifteen generic strings

Fifteen strings, sharpened. Each rewrite uses one of the four moves: **name the thing**, **user's words**, **real number**, **mechanism**.

| # | Generic | Sharpened | Move |
|---|---|---|---|
| 1 | `Submit` | `Send invoice` | name the thing |
| 2 | `Are you sure? This action cannot be undone.` | `Delete "Q3 pricing experiment"? 3 documents and 41 comments will be deleted. This can't be undone.` | name the thing + real number |
| 3 | `Error: Something went wrong. Please try again.` | `We couldn't save your changes — the connection dropped. Your draft is still here. Try again.` | mechanism |
| 4 | `No items found. Get started by creating your first item!` | `No issues match "payment" in Backlog.` + `Clear filters` | user's words |
| 5 | `Revolutionize your team's productivity` | `Cut standup to 5 minutes: everyone's updates are already in the doc.` | mechanism |
| 6 | `Success! Your changes have been saved successfully.` | *(delete — the saved state is visible)* | delete |
| 7 | `Loading your data, please wait...` | `Importing 1,240 of 3,500 issues` | real number |
| 8 | `Please enter a valid email address` | `Enter an email address in the format name@example.com` | user's words |
| 9 | `Powerful analytics at your fingertips` | `Query production Postgres in SQL. Charts update on every commit.` | mechanism |
| 10 | `Welcome! 👋 Let's get you set up in just a few steps.` | `Name your workspace` + `Step 1 of 3` | name the thing |
| 11 | `Your subscription has been successfully cancelled.` | `Subscription cancelled. You keep Pro features until Oct 14, then move to Free.` | real number |
| 12 | `Seamlessly sync with all your favorite tools` | `Two-way sync with Linear, GitHub and Slack. Changes appear within 5 seconds.` | name the thing + real number |
| 13 | `You have 3 new notifications` | `Priya and 2 others commented on "Q3 pricing"` | name the thing |
| 14 | `This field is required` | `Enter the company's legal name, exactly as it appears on your incorporation documents` | user's words |
| 15 | `Upgrade now to unlock more features!` | `You've used 4 of 5 free projects. Pro is $20/user/month and lifts the limit.` | real number |

Two patterns to extract from that table. First, **the sharpened version is often longer**, and that is fine: length is not the enemy, emptiness is. Second, **six of the fifteen contain a number that the generic version did not**. If you are rewriting a string and cannot find a number to put in it, you usually do not know enough about the situation to write the string.

---

### Drill two: twelve strings that actually shipped

The first drill uses invented generics. This one uses strings I pulled verbatim out of four shipped products' translation files and one live page. These are not strawmen — they are in production right now, in software people pay for. That is the point: this is the level the bar actually sits at.

| # | Shipped string (source) | What's wrong | Sharpened |
|---|---|---|---|
| 1 | `Something went wrong...` (Bitwarden) | No object, no next step, and a trailing ellipsis that implies it is still trying | `We couldn't load your vault. Check your connection, then reload. Nothing was changed.` |
| 2 | `Please try again` (Bitwarden) | A whole string that is only politeness | `Try again` — and name the failed operation in the title above it |
| 3 | `Oops, something went wrong` (Grafana) | Interjection + the union of all errors | `Couldn't load the Alertmanager configuration.` + a `Retry` button + the server's own message underneath |
| 4 | `Sorry! You do not have permission to edit this rule.` (Grafana) | Apology, exclamation, dead end | `You don't have permission to edit this rule. Ask an org admin for the Editor role.` |
| 5 | `Rules successfully deleted from folder` (Grafana) | `successfully`, no count, no object name, no undo | `3 rules deleted from "Production alerts"` + `Undo` |
| 6 | `Your new account has been created! You may now log in.` (Bitwarden) | Passive perfect, exclamation, and it tells you to do the thing it could have just done | `Account created` — then log them in |
| 7 | `Hold your horses, you're too fast for us! Please wait a moment before trying again.` (Excalidraw) | A joke on a rate limit, an idiom that will not localise, and "a moment" is not a duration | `Too many requests. Try again in 30 seconds.` |
| 8 | `No items added yet...` (Excalidraw library) | Empty state punctuated as if still loading; does not say how to fill it | `No saved shapes yet. Select shapes, then choose Add to library.` |
| 9 | `Data successfully imported` (Bitwarden) | `successfully`, no count, no destination, no way to see the result | `Imported 348 items into Personal vault` + `View items` |
| 10 | `Something went wrong. Try again` (Mattermost channel search) | Right shape, wrong specificity — the code knows which call failed | `Couldn't search channels. Try again` |
| 11 | `Congratulations! Platform adoption is strong across your organization. To ensure uninterrupted growth, our team can assist in scaling your license to meet operational requirements.` (Mattermost, admin seat alert) | Sales copy in an admin console; 27 words to avoid saying "you are over your seat count" | `You're using 512 of 500 licensed seats. Add seats to keep new users active.` |
| 12 | `8928 executions / month` (Grafana Checks, live at 1440px) | Unformatted integer in a monitoring product | `8,928 executions/month` |

Read down the "what's wrong" column and notice how few of these are *tone* problems. Ten of twelve are missing a noun, a number, or a next step. **Tone is almost never the reason a string is bad.** That is why "make it friendlier" is the least useful instruction in product copy, and "which object, how many, what now?" is the most useful.

---

### Drill three: eleven strings generated by the tools, verbatim

Drill one is invented generics; drill two is shipped human copy. This one is the actual output distribution — strings written by or for the AI builders themselves, and by the templates they emit. Nine were captured live on 2026-09-10 (marked *live*); two come from this corpus's template sampling ([`../anti-patterns/vibecode-rubric.md`](../anti-patterns/vibecode-rubric.md), [`../anti-patterns/vibecode-taxonomy.md`](../anti-patterns/vibecode-taxonomy.md) §G5–G6). **None of them is invented, and none of them trips a single punctuation or emoji check in this file.**

| # | Generated string (source) | What's actually wrong | Sharpened | Move |
|---|---|---|---|---|
| 1 | `Everything you need to scale Built in.` — bolt.new h2, *live* | The canned phrase, plus a missing conjunction between two sentence fragments. "Everything" is unfalsifiable and it commits you to completeness a reviewer will test | `Postgres, auth, file storage and a custom domain. No second account, no second bill.` | name the thing |
| 2 | `Empowering product builders with the most powerful coding agents` — bolt.new h2, *live* | `empower` + `powerful` in twelve words; both measured ~1 per 20,000 words on shipped homepages. Neither word names a capability | `Routes each task to the model that handles it best, and tells you which one it picked.` | mechanism |
| 3 | `Bolt gives you superpowers` — bolt.new h2, *live* | A multiplier with the number removed. The reader cannot check it, and cannot even tell which axis improved | `Ships a working prototype in the time a spec review takes.` | mechanism |
| 4 | `Enterprise-grade` — bolt.new h3, *live* | A feature heading that is one adjective meaning "good". §taxonomy 16: the word survives only if a specific artefact follows it | `SOC 2 Type II · SAML SSO · audit log export` | name the thing |
| 5 | `98% less errors` — bolt.new, *live* | A statistic with no baseline, no window and no definition of "error" — and `less` where the count noun needs `fewer`. §anti-pattern 13: the model knows the shape of proof | `Builds that failed on first run dropped from 34% to under 1% after the September agent change.` | real number |
| 6 | `Agentic by default` — v0.app h3, *live* | The exact `<abstract noun> by default` frame that two *unrelated* v0 templates shipped as `Global by default.` The generator and its output converge on one sentence | `Plans the work, opens the tasks, and connects the database before you ask.` | mechanism |
| 7 | `Prompt. Build. Publish.` — v0.app h3, *live* | Tricolon of three verbs that are true of every tool in the category (§taxonomy 10). It is a rhythm, not an argument | `Type a sentence. Get a URL. About ninety seconds.` | real number |
| 8 | `Go from idea to production in seconds with smart, secure infrastructure` — v0.app CTA, *live* | On this corpus's own 2026 canned-phrase list, plus two adjectives ("smart, secure") that carry no artefact | `Deploys to Vercel on the same account you already have. Preview URL first, production on approval.` | mechanism |
| 9 | `Uh oh! There was an error while loading. Please reload this page .` — github.com/pricing, *live* | Shipped by a company with a style guide. An interjection, an exclamation, `Please`, no object, no cause, no automatic retry — and a stray space before the period, which is the tell that nobody read the rendered string | `Couldn't load the plan comparison. Reload the page, or see pricing at github.com/pricing.` | name the thing |
| 10 | `Build & orchestrate AI agents while you sleep.` — v0 template *AGENTIC*, h1 | Capability nouns, an unfalsifiable promise, a period on a fragment, and `while you sleep` — an idiom that will not localise and a claim nobody would put in a contract | `Runs your nightly reconciliation and files the exceptions before you're up.` | name the thing |
| 11 | `You earn $3287 today, it's higher than last month. Keep up your good work!` — TailAdmin dashboard template | Four failures in one string: an ungrouped integer (`$3287`), a comma splice, a tense error, and a dashboard congratulating an operator on a number they are paid to watch | `$3,287 today · up 12% on the same day last month` | real number |

**What to take from this drill and not from the other two.** Every one of these eleven scores **zero** on the em-dash, exclamation-in-prose, emoji, `delve` and `powerful yet simple` checks — the whole 2023 detector set — except #9 and #11, and those two were written by humans. The tells that actually fired: canned phrase (1, 8), adjective standing in for an artefact (2, 4, 8), unbaselined multiplier (3, 5), the generator's own sentence frame (6), tricolon (7), and an unformatted number (11).

**And the shape of the sharpened column is the finding.** Nine of the eleven rewrites are longer than the original and every one of them contains a noun, a number or a limit that the writer had to go and find out. That is the whole discipline: generated copy is short because it is empty, and the fix costs you words because it costs you facts.

---

## When this advice is wrong

Every rule above has a domain. These are the boundaries.

**"Sentence case always" is wrong for:**
- Products whose entire brand is typographic formality — luxury, legal, some finance. If the wordmark and the headings are Title Case by design, the buttons follow.
- Proper nouns and named features. `Deploy Hooks`, `Vercel Drop`, `GitHub Advanced Security` and `Linear Asks` are names, and lowercasing them makes them read as generic nouns.
- Eyebrows, table headers and status chips at 11–12px, where UPPERCASE with `+0.05–0.06em` tracking is a legible and conventional micro-label (measured: Attio 12px w600 `+0.06em`, Cursor 12px `+0.05em`, Tailwind's docs headers 12px `+0.1em`).
- German UI, where nouns are capitalised by grammar.

**"Delete the success message" is wrong for:**
- Anything irreversible or financial. A payment, a submitted application, a deleted API key — the user needs a receipt, and the receipt should contain an identifier they can quote.
- Anything asynchronous. If the work happens off-screen, the only feedback the user gets is the message.
- Screen-reader users, always: a visible state change that is not announced does not exist. Use an `aria-live` region even when you skip the visible toast.

**"Errors must be specific" is wrong for:**
- Authentication and account existence (enumeration attacks).
- Fraud and risk decisions — Stripe's own guidance is to present a `fraudulent` decline exactly like a generic one.
- Any case where the specific reason is a security control's threshold. "Blocked: 6 failed attempts in 10 minutes" tells an attacker the exact budget.

**"Use `Intl` for everything" is wrong for:**
- Machine-readable output. Logs, CSV exports, API responses and filenames want ISO 8601 and unformatted decimals, always, regardless of locale.
- Content the user typed. Do not reformat someone's own text input.
- Currency in a table that must sum visibly: sometimes a fixed `$` prefix column plus tabular right-aligned digits is more legible than the locale's native placement.

**"No exclamation marks, no emoji" is wrong for:**
- Consumer habit products where enthusiasm is the product. Duolingo's three exclamation marks are load-bearing.
- User-authored content and reactions.
- Genuine celebration moments in a consumer app — a streak, a milestone — where the entire retention mechanic is the feeling.

**"Sentence case, always" has one platform-shaped exception worth knowing:** Apple's HIG explicitly declines to mandate either — *"Title case is generally considered formal, while sentence case is more casual. Choose a style for each UI element type and use it consistently"* — and native Apple platforms conventionally use Title Case for alert buttons and many controls (`Get Started`, `Done`, `Allow Once`). If you are building a SwiftUI or Catalyst app, sentence-case buttons will read as foreign in a way they never do on the web. The web default and the Apple-platform default genuinely differ; consistency inside the platform beats consistency with this file.

**Two archetypes make the `please` / `sorry` gradient a hard ban, and they are right to.** [`healthcare-clinical`](../archetypes/healthcare-clinical.md) and [`institutional-civic`](../archetypes/institutional-civic.md) ban `please`, `sorry`, `valid`/`invalid` and `oops` outright, because in those domains a softened error produces a wrong record and a wrong record is a denied claim or a missed diagnosis. Everywhere else:

**"Never say `please`, `sorry`, or `Are you sure`" is stated more absolutely than the evidence supports.** GOV.UK bans them, Atlassian bans `please` and `sorry` explicitly (*"saying 'please' can undermine the authority and credibility of your message and lead people to think a required step is optional"*), and I agree with both. But measured: 399 uses of `please` and 209 of `Are you sure` across four shipped products. Use this as a quality gradient, not a law — and never argue the point with an engineer by claiming real products don't do it. They do. The argument is that the ones with the best copy don't.

**"Errors should be short" is wrong for:** anything the user must act on outside your product. A string like `Reconnect Google Drive` is short and useless if the person does not know that reconnecting happens in Settings → Integrations and requires admin rights. Atlassian's own rule allows for this: keep the message to 1–2 sentences, then link — but the link must be the *action*, not "learn more".

**"Empty states should be text-only" is wrong for:**
- Consumer onboarding, where an illustration carries brand and reduces perceived effort.
- Large empty canvases in creative tools, where the emptiness is spatial and needs anchoring. Excalidraw's hand-drawn arrows pointing at the toolbar (`Pick a tool & Start drawing!`) work precisely because the alternative is an undifferentiated 1440×900 void.
- Marketing screenshots of empty products, where the illustration exists for the reader of the screenshot.

**"Never use a confirmation dialog" is wrong for:**
- Actions that are irreversible *and* fast to trigger accidentally (keyboard shortcut range).
- Multi-user consequences: deleting something other people depend on.
- Regulated flows where an explicit acknowledgement is the audit artefact.

### Three ways this file makes copy worse, and the correction for each

The scopes above are about *rules that invert*. These three are different: they are cases where an agent applies this file correctly, in good faith, and produces a worse string than the generic one it replaced. Each has fired in real review.

**1. Terse where the reader needed the reassuring fact.** This file's centre of gravity — delete the success message, no exclamation marks, `Changes saved` beats `Your changes have been saved` — is calibrated for a competent user doing routine work. Apply it to someone frightened and it strips the only sentence they were reading for. `Payment declined.` is correct, three words, and cruel: the user's actual question is *have I been charged twice.* Same for a medical result, a rejected benefits claim, a failed transfer on the day rent is due, a bereavement flow.
**The correction is not adjectives, and this is the part agents get backwards.** Warmth in this register is a *fact*, not a tone: name the thing the reader is afraid of and say what is true about it. `Your payment didn't go through — your bank declined it, and you haven't been charged.` is fourteen words longer than the terse version, contains no adjective and no exclamation mark, and the whole value is the last clause. Compare [`../archetypes/fintech-consumer.md`](../archetypes/fintech-consumer.md)'s `Your money's on the way. It'll land by Friday.` and [`../archetypes/creative-tool.md`](../archetypes/creative-tool.md)'s `Couldn't export — the file is still saved.` Both are warmer than anything this file's rules would generate and neither adds a single adjective. **Test: if the reader is anxious, one clause must answer "what is the damage".**

**2. Domain jargon where the reader needed plain language.** "Reuse the field's own words" and "use the user's words" are the same rule pointed at two different people, and [`../archetypes/internal-utility.md`](../archetypes/internal-utility.md) makes the sharper version explicit — use the real vocabulary the team says in Slack (`chargeback`, `hard bounce`, `dunning`), because inventing friendlier synonyms for words your users already own makes the tool harder. **That is right for an operator and catastrophic one surface over.** The failure is an agent reading both files and carrying the operator's vocabulary onto a customer screen: a patient portal writing `Your specimen was hemolyzed`, a consumer bank writing `Returned — R01`, a shipping app writing `Exception scan at origin facility`. Each is the correct term, sourced from the domain, and unreadable by the person it is shown to.
**The correction: "the user's words" means the words of the person reading *this* string, and the operator's vocabulary and the customer's vocabulary are two different string files.** Where one string serves both, lead with plain and carry the code in parentheses so the support call still works: `Your transfer was returned — there wasn't enough money in the account (code R01).` [`../archetypes/fintech-institutional.md`](../archetypes/fintech-institutional.md)'s `Returned — R01 Insufficient funds.` is correct *because its reader is an operations analyst*, not because the code belongs everywhere.

**3. Specific where the honest answer is that you do not know.** This file pushes hard for numbers — "if you cannot find a number to put in it, you usually do not know enough about the situation" — and for a named cause in every error. Aimed at a genuinely unknown state, that instruction manufactures precision: `Deploy queued — this usually takes about 2 minutes` written by an agent with no such measurement is an invented statistic, which is this file's own §anti-pattern 13. The same failure produces an ETA on a queue with no depth signal, a percentage the code cannot compute, and a cause on a 500 the server never classified.
**The correction: the ban on fabricated numbers outranks the demand for numbers, and "unknown" is a state you write, not a gap you fill.** Say what is known, name what is not, and say what you are doing: `Still importing — 1,240 of 3,500 done. We don't have an estimate for the rest yet.` `Couldn't save. The server didn't say why; your draft is still here. Reference 8FQ2-40B1.` This is the copy half of a rule this file already states numerically: `—` for unknown, `0` for zero, never one glyph for both. Extend it to prose — **an honest "we don't know yet" is a specific string; a plausible number is not.**

**Eight rules in this file invert under load, and the scope is stated where the rule is** — read them there before applying the rule to anything at scale: naming the object in a **confirm-dialog title** (breaks on long names, bulk selections, and screens that get recorded); **echoing the query** into a filtered empty state (an XSS sink, a layout bomb, and a disclosure on shared screens); **`verb + object + name` on every icon-only control** (inverts above ~20 repeated table rows, where it slows the screen-reader user it was written to help); **reusing the label's words** in an error (generates sixteen-word errors from question-style labels — reuse the distinguishing noun instead); **front-loading the actor** in a notification (wastes the whole visible budget when the actor is a bot that sends every notification); **terseness** (strips the reassuring fact from a frightened reader); **the user's words** (carries operator jargon onto a customer screen); and **demanding a number** (manufactures a fabricated one where the honest answer is unknown).

**"Personality is bad in tools" is wrong for:**
- The one or two places a product can afford to be human: the 404 page, the first-run empty state, the changelog. Linear's changelog heading is literally `Now`.
- Teams whose users chose them partly for the voice. Raycast's `It's not about saving time. It's about feeling like you're never wasting it.` (verified live, 2026-09-10) is doing brand work a neutral string could not — while being the exact construction §taxonomy 11 tells you to delete. **The reconciliation: the ban is on negation used as a substitute for evidence.** Raycast's second clause *is* the evidence, and it names a feeling no other launcher is claiming. One instance, load-bearing, is voice. Four is a signature.

---

## Anti-patterns: what AI-generated UI copy does, and the correction

| # | The tell | Why it happens | The correction |
|---|---|---|---|
| 1 | `Submit` on the primary button | The model writes the form's mechanism because it was not told the form's purpose | Name the outcome: `Send invoice`, `Create account`, `Request access` |
| 2 | Title Case on every label and heading | Training data is dominated by marketing pages and older design systems | Sentence case for everything except proper nouns; measured 76% of shipped labels |
| 3 | `Something went wrong. Please try again.` | The model has no error taxonomy, so it writes the union of all errors | Three-part error: what happened, why, what to do. If you truly have no detail, still say what the user can do and what state their work is in |
| 4 | Empty state with an illustration, a paragraph, and a `Create New Item` button — shown on a filtered list | The model writes one empty state and reuses it | Branch on cause: first-run vs. filtered vs. successfully-empty vs. blocked. Only the first gets teaching copy |
| 5 | `Success!` toast after every action | Symmetry instinct: every action gets feedback | Delete it when the state change is visible. Keep it for invisible, delayed, or irreversible results |
| 6 | `Are you sure?` / `Cancel` / `Confirm` | Dialog template with no knowledge of the object | Title = the question with the object named; body = the quantified consequence; button = the verb |
| 7 | Em dash in every second sentence | The model's default connector | 2.4 per 1,000 words marketing, 0.0–0.5 in-product, re-confirmed at 2.5 in 2026-09. Convert each *connector* to a period, colon or comma and delete the filler clause. **Count connectors, not glyphs** — the `label — detail` separator is conventional. And treat this as house style, not detection: em-dash suppression shipped in GPT-5.1, and both AI builders measured in §7b score zero |
| 8 | ✨ 🚀 🎉 in headings and buttons | Emoji read as "friendly" in training data | Zero across 20,282 words of real product copy — and now a **stale detector**; the live problem is the sparkle *icon* on AI entry points. Delete the emoji; name the AI action instead of badging it |
| 9 | Tricolon adjective headlines (`Fast. Simple. Secure.`) | Rhythm mistaken for argument | Each member must be concrete and different in kind, or collapse to one claim with evidence |
| 10 | Placeholder used as label | Shorter markup, looks tidy in a mock | Real `<label>`; placeholder carries format only (`you@example.com`) |
| 11 | `Please` in errors and `Kindly` anywhere | Politeness as a proxy for tone | GOV.UK bans it: the user has no choice about fixing the error |
| 12 | Every feature card headed with a two-word benefit | Benefit-stacking template | Replace each with the mechanism, and make the three different in kind |
| 13 | Fabricated statistics (`10x faster`, `save 5 hours a week`) | The model knows the shape of proof | Never invent a number. Use the mechanism if you lack the measurement |
| 14 | `Click here` / four identical `Learn more` links | Link text written for sighted, mouse-using, in-context readers | Unique, descriptive accessible names: `Learn more about SSO` |
| 15 | Uppercase button labels via `text-transform` | Copied from 2014-era Material | 4 of 281 shipped labels do this, two of them legal footers |
| 16 | Dates rendered as `MM/DD/YYYY` or `new Date().toLocaleString()` with no options | Default path of least resistance | `Intl.DateTimeFormat` with an explicit `dateStyle`; relative under a week; never bare numeric for a global audience |
| 17 | `${n} item${n===1?'':'s'}` | Plurals treated as an English `if` | ICU plural categories; `Intl.PluralRules` has six, English uses two |
| 18 | Loading copy: `Loading your data, please wait...` | Filling silence | Nothing under 1s, skeleton to 5s, named step and count beyond |
| 19 | Sentences assembled from fragments around UI elements (`Click [Save] to continue`) | Component-first thinking | Full sentences; refer to controls by name in text |
| 20 | Mixed `My` and `Your` on one screen | No person convention | Second person by default; first person only for filters (`Assigned to me`) |
| 21 | Notification copy: `You have a new notification` | No access to the event's content | Actor + verb + object, front-loaded for truncation |
| 22 | Every heading a category label (`Overview`, `Features`, `Benefits`) | Structure without content | A heading either names a place (nav, docs) or states something true. Never a claim-shaped nothing |
| 23 | `aria-label="button"`, `aria-label="More"` ×6, or no accessible name at all on icon buttons | The invisible string is not in the mock, so it is never reviewed | `verb + object + name`: `Actions for folder meta-monitoring`. Every accessible name on a page must be unique |
| 24 | Numbers formatted in the visible text but raw in `aria-label`, tooltips, badges and page titles | The formatter is applied at one call site | One formatting layer; every surface reads through it. Shipped counter-example: GitHub's raw `142221 users starred this repository` beside a visible `142k` |
| 25 | `…` and `...` mixed on one screen; empty states punctuated with a trailing ellipsis | Two authors, or one model with no convention | Three periods everywhere, and never on an empty state — an empty state is a finished state |
| 26 | Marketing voice in an in-product banner: Title Case aphorism, `Effortlessly`, benefit stack | The upsell copy is written by a different pipeline than the product copy | In-product promo takes the product's voice: sentence case, one specific capability, the constraint stated |
| 27 | A generic `Search...` placeholder on a scoped search box | The placeholder ships as the component default | Name the scope and the fields: `Search by job name, endpoint, or label` |
| 28 | "+35% for localisation" applied as global padding, including CJK | A remembered rule of thumb | Measured: de 1.20–1.27× median / 1.6–1.7× p90, fr slightly longer, **ja 0.56×**. Size to p90, and treat CJK as a font-size problem, not a width problem |

**Current as of this pass (2026-09). The rows below are the ones that did not exist in a 2023 tell list, and they are now the ones that fire.**

| # | The tell | Why it happens | The correction |
|---|---|---|---|
| 29 | `It's not X — it's Y`, `Not a redesign. A rewrite.`, `X isn't just Y` | Negative parallelism is the construction RLHF rated as sounding insightful; it outlasted `delve` and every other lexical tell | Delete the first half and assert Y with evidence. Grep the whole string file for the shape — one is a style, four is a signature |
| 30 | `Agentic`, `AI-powered`, `AI-native`, `AI Insights` as a feature name | 2026's replacement for `powerful`, and usually literally true, so it passes review | Measured on 4 of 8 homepages, above every classic tell. Describe the outcome without the word; never prefix a feature name with `AI` |
| 31 | `AI can make mistakes. Check important info.` under every generated surface | Copied from the chat assistants as boilerplate, then applied to features that generate nothing | Name what is unverified and give the check (`Drawn from 4 tickets — open them to verify`), or disclose once at the feature boundary rather than under every response |
| 32 | Shimmering `Thinking…`, and token-streamed text outside a conversation | Chat affordances imported wholesale into non-chat surfaces | Name the step (`Searching 4,200 invoices`), count phases where known. Streaming forbids scanning; do not stream into a cell, a field or a summary |
| 33 | Five feature headings in one grammatical frame (`Hosting, handled` · `Payments, processed`) | Generated as a set in one call, so the set is uniform | Break at least one member of every set of three or more in shape and in length. Live example: lovable.dev's own homepage ships five |
| 34 | Case drift inherited from the generator (`New Chat` beside `Browse all`) | v0.app and bolt.new drift on their own surfaces; the agent pattern-matches its tooling | One convention, linted. Excalidraw enforces one and has 0 case-duplicate pairs; Mattermost enforces none and has 101 |
| 35 | Passing the 2023 checklist and shipping anyway | `delve`, ✨, `powerful yet simple` now measure zero on real *and* generated copy, so a clean sweep proves nothing | Re-derive the word list from a fresh corpus annually (§7a). The durable test is structural: could a competitor's name be swapped into this sentence unchanged? |
| 36 | Cadence uniformity — every sentence 15–25 words, paragraph after paragraph | Nothing in generation has a reason to vary sentence length | The Economist, 2026-08, 55,940 sentences: the strongest surviving signal. Measure sentence-length standard deviation (§taxonomy 26); break the rhythm on purpose |
| 37 | `and`-chaining, with commas, semicolons and parentheses missing | Models under-punctuate and lean on `and` as the only connector | Punctuate the hierarchy already in the sentence: parentheses for the aside, colon for the consequence, period for the independent clause. Do **not** fix it with em dashes |

---

## Self-check

Two lists. Everything in the first is a command you run; everything in the second is a question you answer by looking at a rendered PNG. Nothing here asks you to introspect.

Set `S` to where your user-facing strings live — a locale file if you have one, the source tree if they are inline:

```bash
S=locales/en.json      # or: S=src/
```

### A. Grep checks — each has a stated pass condition

| # | Check | Command | Pass |
|---|---|---|---|
| 1 | No mechanism labels | `grep -rniE ':[[:space:]]*"(submit\|ok\|confirm\|yes\|no\|click here\|learn more)"' $S` | 0 hits, or each hit justified in a comment |
| 2 | No `Submit` in JSX/HTML button text | `grep -rniE '>[[:space:]]*(submit\|ok\|confirm\|click here)[[:space:]]*<' $S` | 0 |
| 3 | **Case-duplicate labels** (the Mattermost-101 check) | `grep -rhoE '"[^"]{2,40}"' $S \| tr -d '"' \| sort -u \| awk '{k=tolower($0); if(k in a && a[k]!=$0) print a[k]" ⟷ "$0; a[k]=$0}'` | 0 pairs |
| 4 | Title Case multi-word labels | `grep -rhoE '"[A-Z][a-z]+ [A-Z][a-z]+([ ][A-Z][a-z]+)?"' $S \| sort -u` | every hit is a proper noun or product name |
| 5 | Banned error words | `grep -rniE '\b(please\|sorry\|oops\|invalid\|kindly\|please note)\b' $S` | 0, or auth/fraud-vagueness justified |
| 6 | Generic error bodies | `grep -rniE 'something went wrong\|an error occurred\|this field is required\|try again later' $S` | 0 |
| 7 | `Success!` / `successfully` | `grep -rniE 'success(fully)?' $S` | 0 in user-facing strings |
| 8 | Exclamation marks in strings | `grep -rniE '"[^"]*!' $S` | 0 lines in a professional tool; a stated number in a consumer one |
| 9 | Emoji in system strings | `python3 -c "import re,pathlib;P=pathlib.Path('$S');F=[P] if P.is_file() else [f for f in P.rglob('*') if f.is_file()];p=re.compile('[\U0001F300-\U0001FAFF✨⭐✅⚠]');[print(f,i+1,l.rstrip()) for f in F for i,l in enumerate(f.read_text(errors='ignore').splitlines()) if p.search(l)]"` | 0 |
| 10 | **Em dash rate per 1,000 words** | `python3 -c "import pathlib;P=pathlib.Path('$S');F=[P] if P.is_file() else [f for f in P.rglob('*') if f.is_file()];t=''.join(f.read_text(errors='ignore') for f in F);w=len(t.split());print(t.count('—'),'em dashes,',w,'words →',round(t.count('—')/max(w,1)*1000,2),'per 1k')"` | **< 0.5** in-product, **< 2.5** marketing |
| 11 | **Negative parallelism** (§ taxonomy 11) | `grep -rniE "(isn'?t\|is not\|not)( just)?( a\| an\| the)? [A-Za-z-]+ *[—,;:-]+ *it'?s\|not (a\|an\|just) [A-Za-z-]+\. +[A-Z]\|less [a-z]+, more [a-z]+" $S` | 0 |
| 12 | 2026 vocabulary | `grep -rniE 'agentic\|ai-powered\|ai-native\|intelligent\|"AI [A-Z]' $S` | each hit survives "could a competitor swap their name in?" |
| 13 | Blanket AI disclaimer | `grep -rniE 'can make mistakes\|check important info\|may be inaccurate\|double-check' $S` | ≤1 occurrence, at the feature boundary |
| 14 | Chat loading copy | `grep -rniE 'loading\.\.\.\|please wait\|thinking[.…]' $S` | 0 |
| 15 | Ellipsis **meaning** mixed | `grep -rniE '"[^"]*(ing\|s)(\.\.\.\|…)"' $S` (in-progress form) vs `grep -rniE '"[^"]*(to\|until\|as\|from)(\.\.\.\|…)"' $S` (second-step form) | each meaning uses one glyph consistently, and the in-progress form never appears on a finished state |
| 16 | Ellipsis on an empty state | `grep -rniE '"No [^"]*(\.\.\.\|…)"' $S` | 0 |
| 17 | Hand-rolled plurals | `grep -rniE "\?[[:space:]]*'' *: *'s'\|\? *\"\" *: *\"s\"\|\+ *'s'" $S` | 0 |
| 18 | Unformatted interpolated numbers | `grep -rniE '\{[a-z_.]*(count\|total\|amount\|price\|qty\|num\|size)[a-z_.]*\}' $S \| grep -viE 'format\|intl'` | 0 |
| 19 | Default date/number formatting | `grep -rnE 'toLocaleDateString\(\)\|toLocaleString\(\)\|toLocaleTimeString\(\)\|toFixed\(2\)' $S` | 0 — every call takes explicit options |
| 20 | Compact notation without a digit cap | `grep -rn "notation: *['\"]compact" $S \| grep -v maximumFractionDigits` | 0 |
| 21 | Generic accessible names | `grep -rniE 'aria-label=["'"'"']?(button\|more\|options\|actions\|icon\|close\|menu\|link)["'"'"']' $S` | 0 |
| 22 | **Duplicate accessible names** | `grep -rhoE 'aria-label="[^"]+"' $S \| sort \| uniq -d` | 0, unless the controls are in a repeated table row (see the §11 scope) |
| 23 | Placeholder-as-label | `grep -rn 'placeholder=' $S` | every hit has a real `<label>`; the placeholder is a format example |
| 24 | Bare `Search...` | `grep -rniE 'placeholder=["'"'"'][^"'"'"']*search[.…]' $S` | 0 outside a global omnisearch |
| 25 | Passive voice hiding an actor | `grep -rniE '\b(was\|were\|has been\|have been\|had been\|is being\|are being) [a-z]+(ed\|en)\b' $S` | 0, or the actor genuinely does not matter |
| 26 | First person outside filters | `grep -rnE '\bMy [A-Z]' $S` | 0 except `Assigned to me` / `Created by me` |
| 27 | **Label length budget** | `python3 -c "import re,json,statistics as st;d=json.load(open('$S'));v=[x for x in d.values() if isinstance(x,str) and len(x.split())<=4 and '{' not in x and x[-1:] not in '.?!'];print(len(v),'labels, median',st.median(map(len,v)),'chars, mean',round(st.mean([len(x.split()) for x in v]),2),'words')"` | median **11–15 chars**, mean **≤2.4 words** |
| 28 | CTA monotony | `grep -rhoiE '"get started"' $S \| wc -l` | ≤1 per page |
| 29 | **Cadence uniformity** (§taxonomy 26) | `python3 -c "import re,statistics as st;s=[len(x.split()) for x in re.split(r'(?<=[.!?]) +',open('$S').read()) if x.strip()];print(len(s),'sentences, mean',round(st.mean(s),1),'sd',round(st.pstdev(s),1))"` | sd is a meaningful fraction of the mean, not a fifth of it |
| 30 | **Structural swap test** | none — read it | swap your product name for a competitor's. If the page still reads correctly, the copy says nothing |
| 31 | **Tell sweep** | see the single command below | each survivor justified out loud |

```bash
grep -rniE 'seamless|effortless|unlock|supercharg|revolution|empower|elevate|leverag|streamlin|robust|cutting.edge|game.chang|next level|powerful yet simple|simple yet powerful|everything you need|built for modern|all.in.one|in today.s|we.re excited to announce|delve|agentic|ai.powered|ai.native|world.class|best.in.class|state.of.the.art|next.generation' $S
```

The 2023 half of that list (`delve`, `powerful yet simple`, ✨) now measures zero on real *and* generated copy, so a clean sweep proves nothing on its own. **Proof, measured 2026-09-10: v0.app and bolt.new score a perfect zero on checks 8, 9, 10 and 31 while shipping the copy quoted in §7b and drill three.** Checks 3, 11, 12, 27, 29 and 30 are the ones that fire in 2026, and 30 is the only one that cannot be gamed.

### B. Screenshot checks — answerable from a PNG

Render at 1440 and 390 (`node $UI_LIBRARY/tools/shot.mjs <url> --widths 1440,390`), then answer each. A "no" is a fix, not a note.

| # | Look at | The question | Fail looks like |
|---|---|---|---|
| 1 | Every button in the shot | Does the label name the outcome, in ≤3 words, sentence case? | `Submit`, `Confirm`, `Get Started`, or a full sentence on a button |
| 2 | The primary button | Is it visually the only primary on screen? | two filled buttons of equal weight |
| 3 | Any uppercase label | Is it ≤12px with visible letter-spacing? | a 14px+ uppercase button label |
| 4 | The empty state | Is there a filter chip, search box or query visible in the same shot? | filter applied *and* the copy says "yet" or offers "Create your first…" |
| 5 | The empty state | Is any illustration taller than ~120px inside a table or list region? | a 200px cartoon in a 320px-tall table body |
| 6 | The error message | Is it directly under its control, ~6–8px away, at least as large as the help text? | error text smaller than the label, or floated to a corner toast |
| 7 | The error message | Read it alone, with the field cropped out — can you tell which field it belongs to? | `This field is required` |
| 8 | A confirm dialog | Does the destructive button repeat the verb in the title, and does the body carry a count? | `Are you sure?` / `Cancel` / `Confirm` |
| 9 | Any toast | Is the thing it announces already visible in the same screenshot? | a `Saved!` toast above a visibly-saved row |
| 10 | Every number of 4+ digits | Is it grouped? Including in badges, chips and axis labels | `8928 executions / month` |
| 11 | A column of numbers | Do the digits align vertically? | jitter — `tabular-nums` missing |
| 12 | Any date | Is it a bare `09/03/26`? | numeric date with no month name anywhere on screen |
| 13 | Two search boxes on one screen | Can you tell which one finds what, from the placeholders alone? | both read `Search...` |
| 14 | Any AI surface | Is there a sparkle marking it, and does the label name the action? | `✨ AI` instead of `Summarize thread` |
| 15 | Any loading state | Does the text name a step or a count? | shimmering `Thinking…` on a non-chat surface |
| 16 | Any progress bar | Does it show a percentage? | a `%` the code cannot actually compute — cross-check the call site |
| 17 | A set of 3+ feature headings | Do at least two differ in grammatical shape and length? | five headings in one frame (`Hosting, handled` · `Payments, processed`) |
| 18 | The same screen at **1.7× string length** | Does every control still fit? | any ellipsed label — that is German p90 |
| 19 | The whole shot | Count exclamation marks and emoji | more than zero of either in a professional tool |
| 20 | The whole shot | Count em dashes | more than one per screen of body copy |

If a string survives all of that and still reads like nobody in particular wrote it, the problem is one level up: you do not yet know what the product does that its competitor does not, and no amount of rewriting will produce that sentence.

---

## Adversarial pass (2026-09)

First adversarial review of this file. Method: re-fetch every quoted product string, re-run every
computable value, read all 20 `## Copy register` sections in [`../archetypes/`](../archetypes/), and
search the AI-copy detection literature published since 2026-03. Date of record: **2026-09-10**.

### What changed

**Corrected — four stale or wrong quotes.**

1. **GitHub's star-button accessible name appeared with two different integers in this file** (`142215` in §11, `142216` two sections later). One fact, two numbers, which is exactly the defect this corpus exists to prevent. Re-measured live on `vercel/next.js`: `aria-label="142221 users starred this repository"` beside a visible `142k` in the header **and** `142.2k` in the sidebar. The count drifts hourly, so the file now quotes the *pattern* and the three-renderings finding, never the integer.
2. **GitHub pricing.** §6 read `$ 0 USD per user/month` for the Free plan. Live it is `$ 0 USD per month` — the unit changes between adjacent cells, which turns out to be the more useful observation.
3. **v0's AI-input placeholder.** The file claimed `Ask v0 to build…`. Not present 2026-09-10; v0's composer has no placeholder and sits under the heading `What do you want to create?`. bolt.new ships an *animating* placeholder instead, which is worse than a generic one.
4. **Raycast's `It's not about saving time.`** was quoted in two places as a model heading — while §taxonomy 11 calls that construction the single most persistent 2026 tell. The file was praising and banning the same sentence. Verified live: the full string is `It's not about saving time. It's about feeling like you're never wasting it.` Both places now carry the reconciliation — the ban is on negation substituting for evidence, and Raycast's second clause *is* the evidence.

**Added — evidence that did not exist in the file.**

- **§7b, the generators' own homepages, measured.** v0.app (332 words) and bolt.new (419 words) both score **zero** em dashes, zero exclamation marks, zero emoji, zero `delve` — a perfect pass on every punctuation and lexical detector in this file — while shipping `Everything you need to scale Built in.`, `Empowering product builders with the most powerful coding agents`, `Enterprise-grade` as a feature heading, `98% less errors`, and `Agentic by default`. That last one is the same `<abstract noun> by default` frame two unrelated v0 *templates* independently shipped as `Global by default.` The detector set is not merely stale; on these two pages it is anti-correlated with the thing it detects.
- **§7c, the outside literature.** The Economist (2026-08) compared its own articles to ChatGPT, Claude, Gemini and Grok across **55,940 sentences / 1.2M words** and named four tells: cadence uniformity, under-punctuation with `and`-chaining, `it's not X, it's Y`, and the rule of three. Two were already here; the other two are now §taxonomy 26 and 27 and self-check 29. Separately, em-dash suppression shipped as a user control in GPT-5.1 (2025-11), so §taxonomy 9 is now stated as house style rather than as detection.
- **Drill three: eleven verbatim generated strings, sharpened.** Nine captured live on 2026-09-10, two from this corpus's template sampling. Nine of the eleven rewrites are longer than the original, and every one contains a fact the writer had to go and find.
- **Three ways this file makes copy worse**, in `When this advice is wrong`: terseness stripping the reassuring fact from a frightened reader; "the user's words" carrying operator jargon onto a customer screen; and the demand for a number manufacturing a fabricated one where the honest answer is unknown. The "rules that invert under load" list goes from five to eight.

**Reconciled — four places the corpus contradicted itself.** In every case the fix is here, not in the archetype file, because the archetype file was right about its own domain and this file had over-generalised.

| Conflict | Other file | Resolution |
|---|---|---|
| Ellipsis: "pick three periods, lint the glyph" | [`technical-productivity`](../archetypes/technical-productivity.md) prescribes `Assign to…` | **Standardise the meaning, not the glyph.** Two ellipses exist — in-progress and second-step. One glyph per meaning; the lint that matters is that the in-progress form never lands on a finished state |
| `sorry` banned outright | [`editorial`](../archetypes/editorial.md) ships the Guardian's `Sorry — we haven't been able to serve the page…` as a *good* example | The ban holds where the user is blocked mid-task with an action to take. Apologise for outages, 404s and data loss you caused; never for an empty field |
| "Relative for recency" | [`data-terminal`](../archetypes/data-terminal.md) explicitly inverts it | Scoped: on monitoring, incident and log surfaces, absolute to the domain's resolution with the zone printed. `data-terminal.md` is the authority there |
| Em-dash rate | Six archetype registers prescribe `fact — detail` strings | **Count connectors, not glyphs.** The separator is conventional; the clause-joining connector is the tell |

The tone-by-archetype table now names the archetype files it summarises, states precedence
(the archetype file wins for its own archetype), and gains a sixth row — **composed voice**
(`luxury`, `editorial`, `premium-marketing`, `premium-minimal`, `creative-tool`) — which the
five-row version had no home for, and which is the one group where full sentences with subordinate
clauses are correct.

**Cut.** Four measurements that were stated a third time in a section that already pointed at the
table holding them (`agentic` rates, German expansion, compact rounding, and §12's closing claim,
now better made by §7b). **The file should stay long.** It is dense with values that are load-bearing
individually, and the length audit found restatement rather than filler; cutting to a target would
have removed specifics an agent needs at the point of decision. The right compression already exists
in the file's shape — the five-item summary at the top and the self-check at the bottom.

### What I tried to shake and could not

- **The `Intl` tables in §5 reproduce byte-for-byte** on Node 24, all eight locales, both the format
  table and the compact table, plus `Intl.PluralRules` classifying 2 as `other`/`few`/`few`. This is
  the durable half of START-HERE's split, confirmed.
- **§7a's per-site em-dash shape held on a fresh scrape.** Stripe 6.3/1k (was 6.7), Linear **0.0**
  with 2 `!`, Vercel 0.0, Mercury 7.6 (was 4.5 — same seven em dashes, 600 fewer words on the page).
  Zero-versus-non-zero is stable; the decimal is not, and the file now says so. Below about 2 per
  1,000 words, per-site rates are inside the noise of what a scraper counts as body text.
- **Excalidraw's first-run screen is verbatim unchanged**, all three risk-disclosure sentences, the
  four menu items and both hand-drawn annotations. Still the best shipped counter-example to
  benefit-carousel onboarding in this corpus.
- **Case drift on the generators' own surfaces, re-verified at 1440px.** v0.app: `New Chat` · `Log In`
  · `Sign Up` · `View Details` · `Get Started` beside `Browse all`. bolt.new: `Sign in` beside
  `Get Started` in one nav bar, confirmed in the screenshot.
- Live and unchanged: Supabase `Build in a weekend. Scale to millions.`, Railway
  `Ship software peacefully`, Fly.io `Computers for agents`, Attio
  `Picks up leads at 2am. Catches renewals before they slip.`, Stripe `2.9% + 30¢`, GitHub's
  `Start free for 30 days` / `Join for free` / `Continue with Team` / `Contact Sales`, Mercury's
  ambitious-entrepreneurs line, Linear's `product development system` headline.

### What I could not verify, and you should not trust until someone does

- **Lovable's five parallel headings** (`Hosting, handled` · `Payments, processed` · …), the measured
  example under §taxonomy 24 and anti-pattern 33. lovable.dev now sits behind a Cloudflare bot
  challenge that blocks both fetch and headless browser. The *pattern* is independently confirmed on
  v0.app and bolt.new, so the row stands on other evidence; the specific five strings are as of the
  original pass and unre-checked.
- **One Medical's headings** (§Headings table, tone table healthcare row). onemedical.com returned a
  CloudFront `403 ERROR — The request could not be satisfied.` from this network. Unverified.
- **ChatGPT, Gemini and Perplexity input placeholders.** All three bot-blocked. Only the v0 claim was
  re-measurable, and it was the one that had gone stale — treat the other three as of the original
  pass.
- **Figma's login error, Supabase's signup errors, Grafana's in-product banner and the GitHub empty
  states.** These require submitting a form or holding a session, which this pass did not do. They
  were captured live in an earlier pass and are unre-checked here.
- **The Economist's per-model figures.** The study's headline findings and corpus size are reported
  consistently across secondary coverage, but the article itself is paywalled, so the four named
  tells are cited without their underlying per-model numbers. Treat the direction as sound and the
  magnitudes as unverified.

### The one thing that would change this file most

Every check in the self-check that a 2023 tell list would have run now passes on the copy this file
exists to prevent. The next pass should stop adding words to the sweep and instead build the
structural checks — cadence variance, the competitor-name swap, the canned-phrase collision across
two independently generated pages — into something an agent runs rather than reads.
