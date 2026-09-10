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

1. **Title Case requires a style guide nobody reads.** Is it "Sign Up for Updates" or "Sign up for Updates" or "Sign Up For Updates"? Every Title Case system needs a rule for prepositions, and every team applies it inconsistently, so Title Case products drift within a single screen. Vercel's docs — an otherwise very disciplined product — carries `Deployment Methods`, `Accessing Deployments`, `Using the Dashboard` and `Resources Tab and Deployment Summary` next to `CLI workflows` and `Explore deployments`. That inconsistency is not carelessness; it is the predictable output of a rule with judgement calls in it. Sentence case has one rule: capitalise the first word and proper nouns.
2. **Sentence case is shorter to read.** Capitals reduce word-shape variation, which is the cue readers use for fast recognition.
3. **Sentence case survives translation.** German capitalises all nouns; French capitalises almost nothing in headings. A Title Case source string forces every localiser to make a decision your system cannot verify.
4. **UPPERCASE destroys length budgets.** Uppercase text runs roughly 12–15% wider in the same face at the same size, and it disables the descender/ascender cues that make truncation readable. In an interface with 28–36px controls, that is the difference between a label fitting and ellipsing.

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
| Raycast | `It's not about saving time.` | Contradicts its own category's cliché |
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
| `sorry` | does not help fix the problem |
| `valid` / `invalid` | adds nothing the user can act on |
| `oops`, humour | wrong register when someone is stuck |
| `forbidden`, `illegal`, `prohibited`, `you forgot` | blames the user |
| `An error occurred`, `This field is required`, `Fill in the field`, `Select an option` | make no sense out of context, and are identical for every field on the page |
| jargon: `form post error`, `unspecified error`, `error 0x0000000643` | unactionable |

Two more of their rules that agents routinely violate:

- **The error must reuse the label's words.** Label `How many hours do you work a week?` → error `Enter how many hours you work a week`. Label `Address line 1` → error `Enter address line 1, typically the building and street`. This is what lets a screen-reader user, hearing the error out of context in an error summary, know which field it belongs to.
- **Instructions for empty, descriptions for wrong.** `Enter your name` (empty) but `Name must be 35 characters or less` (too long). `Enter a date after 31 August 2017 for when you started the course` is worse than `Date you started the course must be after 31 August 2017`. Pick per situation, then be consistent across the product.
- **Do not clear the fields.** Keep both the passing and the failing answers.
- **Do not repeat an on-screen example in the error.** If the hint already shows `QQ 12 34 56 C`, the error does not need to.

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
7. **Ellipsis convention:** one character `…` or three periods, chosen once. Trailing ellipsis means "in progress"; on a *menu item* it means "this opens a dialog that asks for more input" (`Export…`). Do not mix the two meanings on one surface.

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
- **Front-load, because it truncates.** Assume ~40 characters visible on a lock screen and ~60 in a notification centre. The subject and verb go first; details go last.
- **Never batch into a count when a name will do.** `3 new activities` is unactionable. `Priya and 2 others commented on "Q3 pricing"` is.
- **Say what changed, not that something changed.** `Deploy failed: build exceeded 45 min timeout` beats `Your deployment status has been updated`.
- **Time is relative in the notification, absolute in the record.** `2 hours ago` in the feed; `Sep 3, 2026 at 2:05 PM` on hover or in the detail view.
- **No exclamation marks, no emoji prefixes** in any professional tool. The one place emoji earn their space is as a status *token* in a list (a green dot, a warning triangle) — and then it should be an icon, not an emoji, so it can be themed and coloured.

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

**Tense.** Present tense for state (`3 issues are blocked`), simple past for completed events (`Deploy failed`), simple future only for things that will actually happen later (`Your card will be charged $49 on Oct 1`). Avoid the perfect tenses — `Your changes have been saved` is passive and longer than `Changes saved`, which is longer than showing the saved state.

**Voice.** Active, with the actor named. Passive voice is a tell because it is what you write when you do not want to say who did it. The exception is when the actor genuinely does not matter or is the user themselves at fault — `The file was deleted` may be kinder than `You deleted the file`.

---

## Numbers, dates and currency

### Numbers

- **Group with `Intl.NumberFormat`, never a regex.** German uses `.` where English uses `,`; Hindi groups in lakhs.
- **Round to the precision the decision needs, not to the precision you have.** `$1,234.56` in a ledger; `$1.2K` in a summary tile; never `$1234.5600000001`.
- **Compact notation rounds by default.** `12,500` renders `13K` unless you pass `maximumFractionDigits: 1`. Decide whether your dashboard is allowed to be 4% wrong.
- **Tabular figures on every column of numbers that aligns or updates.** Inter's `1` is ~41% narrower than its `0`; a right-aligned money column jitters without `font-variant-numeric: tabular-nums`. Measured: real products apply it to ~2–12% of digit-bearing nodes, not globally.
- **Zero is a value, not an empty state.** `0 open issues` is information; a blank cell is ambiguous between zero and unknown. Use `—` for unknown and `0` for zero, and never the same glyph for both.
- **Units go next to the number, spaced by locale rule.** `4.2 MB`, `250 ms`. In German the percent sign takes a space (`3 %`), in English it does not (`3.4%`) — `Intl` knows this and you do not.

### Dates

- **Absolute for records, relative for recency, and give the other on hover.** Attio's live pattern: `6 hours ago`, `2 days ago`, `yesterday` for anything under about a week, then `Sep 30, 2026`. Linear's changelog uses `Today` for the newest entry and `September 3, 2026` for everything else.
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
3. **Budget +35% length.** German runs roughly a third longer than English; a 12-character button label becomes 16. If your control is sized to the English string, it will ellipse. This is why fixed-width buttons and single-line nav items are localisation traps.
4. **Do not encode grammar in code.** Gendered adjectives, articles that depend on the following noun (`a`/`an`), and possessives (`Priya's project`) all break outside English. Prefer `Project owner: Priya`.
5. **Avoid idiom, sport metaphor and alliteration.** `Knock it out of the park` is untranslatable. `Set and forget` requires an explanation. Product copy that leans on wordplay ships as literal nonsense in twelve languages.
6. **Avoid text in images and icon-only labels for text-heavy actions.** Both are invisible to translation pipelines.
7. **Give translators context.** A key named `button.save` with the comment "Primary action on the invoice edit form; max 16 chars" produces a better translation than `save`.
8. **Watch RTL.** Arabic and Hebrew mirror layout; `Intl` emits directional marks inside formatted dates, which will fight a manual `text-align`. Use logical CSS properties (`margin-inline-start`) rather than `margin-left`.

---

## Tone calibration by archetype

Tone is not decoration; it is a claim about what kind of consequence the user is facing. The measured signals below come from the homepages and product surfaces I scraped.

| Archetype | Measured signals | Sentence shape | Never |
|---|---|---|---|
| **Fintech / money** (Mercury, Ramp, Brex, Stripe) | **0 exclamation marks** on mercury.com (1,575 words) and ramp.com (1,473 words). Exact figures everywhere: `1.5% cashback`, `3.89% yield`, `3.72%`, `2.9% + 30¢` | Declarative, short, numeric. `Radically different banking`. `Time is money. Save both.` | Jokes near a balance. Emoji. Vague ranges. Anything that reads as a promotion where a fact belongs |
| **Developer tools** (Vercel, Railway, Supabase, Fly.io) | Vercel and Retool: **0 em dashes, 0 exclamation marks**. Changelog entries state the delta: `Deployment step now 10% faster`, `Vercel Sandbox routing is now 18x faster globally` | Imperative and mechanical. `Build in a weekend. Scale to millions.` `Computers for agents.` | Explaining what an API is. Marketing adjectives in error messages. Hiding the real error behind a friendly one |
| **Consumer / habit** (Duolingo, Headspace) | Duolingo: uppercase CTAs (`TRY 1 WEEK FREE`), lowercase section heads (`free. fun. effective.`), 3 exclamation marks in 357 words | Warm, second person, short. `The most fun way to learn languages, chess, and more!` | Formality. Jargon. Long sentences. Making the user feel behind |
| **Healthcare** (One Medical) | Concrete promises, no exclamation marks: `Same/next-day appointments, in person or over video, that start on time`; `Longer appointments so you don't feel rushed` | Plain, calm, specific about time and cost. Reading level deliberately low | Cheerfulness about outcomes. Hedged language where a fact is known. Euphemism (`unexpected result`) |
| **Enterprise / admin** (Atlassian, Retool, Grafana) | Category-labelled navigation, no personality in settings | Neutral noun phrases. Consequences stated for every toggle | Delight. Personality in destructive flows. Any string an auditor would have to interpret |

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

This is the payload. Each entry: the pattern, why it is empty, and the specific rewrite move. The moves are always one of four: **name the actual thing**, **use the user's words**, **cite a real number**, **describe the mechanism**.

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
**Move:** convert each em dash to the relationship it was hiding. A period if the clauses are independent. A colon if the second explains the first. A comma if it is an aside. Then re-read; usually one of the two clauses was filler and can go.
→ `We rebuilt sync — it's faster now — and added conflict resolution.` becomes `Sync is 4x faster and now resolves conflicts automatically.`

### 10. Tricolon headlines (`Fast. Simple. Secure.`)

**Why it's a tell:** Three adjectives in a row with periods is a rhythm, not an argument. It reads as emphasis while delivering three unverifiable claims for the price of one. It is also self-similar: every product in the category can run the identical line.
**Move — keep the rhythm only if each member is concrete and different in kind.** Supabase's `Build in a weekend. Scale to millions.` works because it is two clauses naming two different time horizons with a number in the second. `Fast. Simple. Secure.` works for nobody.
→ `Fast. Simple. Secure.` becomes `p50 under 40ms. One config file. SOC 2 Type II.`

### 11. `It's not just a X — it's a Y`

**Why it's a tell:** The negation-elevation construction manufactures profundity by defining the product against a strawman. It also concedes the frame ("so it IS a X") while adding no evidence for Y. Measured 3 times in 20,282 words, all in the same two sites.
**Move — delete the first half.** If Y is true, assert Y with evidence.
→ `It's not just a CRM — it's a revenue platform.` becomes `Every email, call and Stripe charge lands on the contact record automatically.`

### 12. Vague benefit stacking

**Why it's empty:** Three cards headed `Save time`, `Reduce costs`, `Increase visibility`, each with two lines of body that restate the heading. It is the shape of an argument with the argument removed. The tell is that you could shuffle the three cards between any two products in the category and nobody would notice.
**Move — replace each benefit with the mechanism that produces it**, and make the three mechanisms different in kind (one about speed, one about a specific integration, one about a guarantee).
→ `Save time` becomes `Auto-categorises transactions using your last 90 days of coding decisions.`

### 13. The sparkle emoji (and its family)

**Why it's a tell:** ✨ 🚀 🎉 💡 🔥 appear **zero times** across 20,282 words of copy from nineteen top products. In generated UI they appear in headings, empty states, buttons and toasts. They are also unthemeable (they carry their own colour, which will clash with your palette in dark mode), inconsistently rendered across platforms, and read aloud by screen readers ("sparkles").
**Move:** delete. If the emoji was carrying meaning (status, category), use a real icon from your icon set so it inherits `currentColor`. The single legitimate use of an emoji in product UI is user-authored content — a reaction, a status a person chose.

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

---

## The rewrite drill

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

**"Empty states should be text-only" is wrong for:**
- Consumer onboarding, where an illustration carries brand and reduces perceived effort.
- Large empty canvases in creative tools, where the emptiness is spatial and needs anchoring. Excalidraw's hand-drawn arrows pointing at the toolbar (`Pick a tool & Start drawing!`) work precisely because the alternative is an undifferentiated 1440×900 void.
- Marketing screenshots of empty products, where the illustration exists for the reader of the screenshot.

**"Never use a confirmation dialog" is wrong for:**
- Actions that are irreversible *and* fast to trigger accidentally (keyboard shortcut range).
- Multi-user consequences: deleting something other people depend on.
- Regulated flows where an explicit acknowledgement is the audit artefact.

**"Personality is bad in tools" is wrong for:**
- The one or two places a product can afford to be human: the 404 page, the first-run empty state, the changelog. Linear's changelog heading is literally `Now`.
- Teams whose users chose them partly for the voice. Raycast's `It's not about saving time.` is doing brand work that a neutral string could not.

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
| 7 | Em dash in every second sentence | The model's default connector | 2.4 per 1,000 words is the shipped rate. Convert each to a period, colon or comma and delete the filler clause |
| 8 | ✨ 🚀 🎉 in headings and buttons | Emoji read as "friendly" in training data | Zero across 20,282 words of real product copy. Delete; use a themed icon if it carried meaning |
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

---

## Self-check

Run this against your own strings before you call the screen done.

**Buttons and actions**
- [ ] Every button label completes "When I click this, the system will ___."
- [ ] No `Submit`, `OK`, `Confirm`, `Yes`/`No` pair, or `Click here` anywhere.
- [ ] Every label is sentence case unless it is a proper noun or an 11–12px uppercase micro-label.
- [ ] The destructive button repeats the verb from the dialog title.
- [ ] No two links on the page share the same accessible name with different destinations.

**Errors and empty states**
- [ ] Every error says what happened and what to do next; the "why" is there only if it changes the action.
- [ ] No `please`, `sorry`, `oops`, `valid`, `invalid`, or `Something went wrong` (unless deliberately vague for auth/fraud, and you can say which).
- [ ] Every error reuses the words from its field's label.
- [ ] Each empty state is branched by cause: first-run / filtered / successfully-empty / blocked.
- [ ] The filtered empty state echoes the query and offers a way out — not a "create your first" button.

**Feedback**
- [ ] Every success toast survives the question "would the user notice this without it?" If yes, delete it.
- [ ] Anything irreversible produces a receipt with an identifier.
- [ ] Loading copy shows nothing under 1s, a skeleton to 5s, and a named step or count beyond.
- [ ] No progress percentage that the code cannot actually compute.

**Data**
- [ ] Every number, date and currency goes through `Intl` with explicit options.
- [ ] Compact notation has `maximumFractionDigits` set (or you have accepted `13K` for 12,500).
- [ ] No bare numeric dates. Relative under a week, absolute after, one capitalisation for both.
- [ ] Currency includes the code where the audience is multi-country, and the billing period wherever a price appears.
- [ ] `tabular-nums` on aligning and updating figures; not on headlines.

**Voice**
- [ ] Second person throughout, except `me` in filters.
- [ ] No passive voice hiding an actor.
- [ ] Exclamation marks: count them. More than zero in a professional tool needs a reason.
- [ ] Emoji count in system-authored strings: zero.
- [ ] Em dashes per 1,000 words is under 5. Count them.

**The tell sweep** — search your strings for each and justify or delete:
`seamless` · `effortless` · `unlock` · `supercharge` · `revolutionize` · `empower` · `elevate` · `leverage` · `harness` · `streamline` · `robust` · `cutting-edge` · `game-chang` · `next level` · `powerful yet simple` · `everything you need` · `built for modern` · `all-in-one` · `it's not just` · `in today's` · `please note` · `we're excited to announce` · `delve` · `✨` · `🚀` · `successfully`

If a string survives all of that and still reads like nobody in particular wrote it, the problem is one level up: you do not yet know what the product does that its competitor does not, and no amount of rewriting will produce that sentence.
