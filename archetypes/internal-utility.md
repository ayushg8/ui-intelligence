# internal-utility

**Evaluated:** 2026-09 · **Density:** compact · **Dark by default:** no — and usually *no dark mode at all*. The theme toggle is the single most over-built feature in this archetype. Ship one light theme, and spend the switcher's slot in the top bar on the environment indicator instead, which prevents a class of incident that a dark theme does not.

> Nine to forty employees have to open this thing to do a job the product itself cannot do — refund the order, unblock the account, re-run the payout, fix the row that imported wrong — and the only competitor is a CSV export into a spreadsheet.

## When this is the right archetype

Nobody chose this tool, nobody will churn, and nobody will tweet about it. It was written by two engineers on the team that owns the domain, it has no designer, and it will be maintained in the gaps between roadmap work forever. The users are colleagues: support agents, ops, finance, trust-and-safety, an on-call engineer at 2am. They use it in bursts — twenty minutes when a ticket comes in, not eight hours a day — and they were onboarded by a Slack message, not a product tour. **The stakes are asymmetric in a way that defines the whole archetype:** getting the layout wrong costs a few seconds; getting a destructive write wrong touches real customer data in production with no QA in front of it and no undo behind it. Polish has genuinely low ROI here. Safety does not.

That asymmetry is the budget, and it is worth writing down before you touch CSS:

| Spend nothing on | Spend disproportionately on |
|---|---|
| Brand, logo, custom typeface, illustration | Naming the environment on every screen (prod vs staging) |
| Dark mode, theme switching | Undo, and confirmation that names the object and the blast radius |
| A KPI dashboard homepage | An audit trail: who changed this, when, from what to what |
| Onboarding tours, empty-state illustration | Error text that names the record and the constraint, and is copy-pasteable |
| Responsive mobile layouts | Keyboard: tab order, Enter to submit, focus visible, `/` to search |
| A bespoke component library | Not losing typed input on a validation error or a nav |
| Charts, sparklines, animated counters | Bulk operations that report partial failure honestly |
| Micro-interactions, hover choreography | URL state, so a row can be pasted into Slack |

- **Choose this over `enterprise-dense`** when the tool is not sold and not shared beyond the team that owns it. `enterprise-dense` buys saved views, column config, per-team permissions, virtualisation and a view-sharing culture because forty people across six roles negotiate over one dataset. Here, six people who sit near each other share a Slack channel instead. If you find yourself building a saved-view switcher for four users, you are building the wrong archetype and it will rot unmaintained.
- **Choose this over `technical-productivity`** when the session is bursty rather than resident. Linear earns a full keyboard grammar because its users live in it; your support agent opens the tool six times a shift. Ship `/`, Enter, Esc and Tab correctly and stop — a `j/k` grammar nobody has time to learn is decoration with a keydown handler.
- **Choose this over `analytics-bi`** when the session ends in a write. If the screen exists so someone can *understand* something, you are in `analytics-bi` and this file will make it too cramped and too grey. If the screen exists so someone can *change* a record and then close the tab, you are here.
- **Choose this over `institutional-civic`** when the user is an employee who can be trained and can ask a colleague. Civic owes clarity to a stranger under stress; you owe speed to a coworker with a ticket queue. The 16–18px body and one-question-per-screen flow that are correct there are a tax here.

## When it is the wrong one

- **Anything a customer can see.** The moment a link to this surface goes outside the company — a vendor portal, a partner console, a "manage your account" page — the trust register changes and you need `fintech-institutional`, `institutional-civic` or `enterprise-dense`. Internal-utility's honest bluntness (`hard_bounce`, `Yes, I'm sure`, raw enum values in cells) reads as unfinished to someone who did not write the schema.
- **A tool that is being quietly commercialised.** Every internal tool's roadmap ends with "could we sell this?" The day the answer is yes, the cost model inverts: adoption becomes voluntary, onboarding matters, and the things this file told you to skip become the product. Re-archetype deliberately rather than sanding it up feature by feature.
- **The primary workspace of a full-time team.** If eight people are inside this tool six hours a day, the compounding maths of `enterprise-dense` and `technical-productivity` now pay: virtualisation, saved views, bulk-select semantics, a real keyboard grammar. "It's just an internal tool" is how a system-of-record grows into a hostile one.
- **Clinical, safety or physical-control surfaces.** An internal tool that dispatches a driver, adjusts a dose or opens a gate is `healthcare-clinical` in its interaction model regardless of who its users are. Take this file's geometry; take none of its write patterns — no optimistic writes, no hover-revealed destructive controls, no undo-instead-of-confirm.
- **A screen four executives look at once a quarter.** That is a report. Give it 16px type, a measure, and no table.

## Reference products

| Product | Why | The one thing to steal |
|---|---|---|
| **Django admin** (probed live, 5.x) | Twenty years old, unfashionable, and denser than every framework that replaced it | The delete page enumerates the **cascade** before you confirm: *"All of the following related items will be deleted"* + a Summary count + an Objects tree, then `Yes, I'm sure` / `No, take me back` |
| **Odoo** (`demo.odoo.com` → Sales) | The largest back-office console anybody can log into without a sales call | **144px of chrome above row one** and no sidebar at all — a top menu bar, then data. Plus the active filter rendered as a removable chip *inside* the search field |
| **Filament** (`demo.filamentphp.com/shop/orders`) | The best-crafted admin framework of the current generation, and it still ships the failure | Queue depth as a **badge on the nav item** (`Orders 150`, `Leave Requests 85`, `Notifications 6`) — the operator sees where the work is without opening anything |
| **Avo** (`main.avodemo.com`, Rails) | Nobody names it; it solved keyboard discoverability better than the famous tools | Shortcut hints rendered **inline in the nav and on the buttons** (`Projects R J`, `Create new User C`, `Search /`) instead of hidden behind a `?` sheet nobody presses |
| **react-admin** (`marmelab.com/react-admin-demo`) | The most-installed internal-tool framework in JS, measurable in one click | Status as **tabs with live counts** (`ORDERED (21)` / `DELIVERED (520)` / `CANCELLED (59)`) — the aggregate and the filter are the same control, which is what a stat card should have been |
| **AdminJS** (`demo.adminjs.co`) | The generated-CRUD baseline | Study it as a warning: 65px rows, 16px cell padding, one row of data in a 900px viewport, and a paid-tier upsell card in the sidebar of a tool with nine users |
| **Refine** (`example.admin.refine.dev`) | What the category thinks its front door should be | Its demo opens on three chart cards and a delivery map. Nobody's ops job starts with a chart. Recognise this instinct in yourself |
| **Retool app gallery** | The generator's output, already measured in this corpus | 68.4px rows, first data row at **y≈760** of a 900px viewport — two visible rows. Numbers carried from `references/enterprise-and-dense-b2b.md`, not re-derived |

## The numbers

| | Value | Because |
|---|---|---|
| Body | **13px / 18px** when cells hold IDs, dates, amounts and enums; **14px / 20px** when they hold names and prose | Django admin's data plane measured 13px/16px on 185 of ~300 text nodes; react-admin's cells 14px/20px; Odoo's 14px/21px. 13px is not a squint when the cell is `OR941634` — it is a squint when the cell is a sentence. Pick per product, not per taste |
| Dense/secondary text | **11px / 16px, muted**, for column headers, timestamps, row meta and IDs | Django's `th` is 11px weight 500 at `#666` — a full step below the body, which is what tells the eye "label, not value". Avo runs 113 nodes at 10px/14px for the same job |
| Page title | **16px, weight 600, in the toolbar row next to the primary action.** No subtitle, no eyebrow, no 30px hero | Odoo puts `Quotations` beside the `New` button and spends zero vertical band on it. Filament spends a 30px title plus a breadcrumb plus three stat cards and its first row lands at **y=461**; Avo's lands at **y=681** — four visible rows. The user clicked the nav item two seconds ago |
| Row / list-item height | **32px** single-line · **36–40px** only if the row carries a 24px avatar or a genuine second line | Django 33.08px, react-admin 33.02px, Odoo 41px. At 1440×900 with ~150px of chrome, 32px shows 23 rows and 57px shows 13. The support agent is looking for one row out of eighty; every row they cannot see is a scroll and a re-orient |
| Control height | **28px** default (`padding: 4px 8px`), **32px** for the primary bar action, **36px** only for a destructive confirm inside a dialog | Django's inputs and buttons measured 24–26px with `4px 8px`; Odoo's toolbar buttons 26px with `0 8px`; react-admin's `ADD FILTER`/`COLUMNS`/`EXPORT` 27.5px with `4px 5px`. A 40px button above a 32px row inverts the hierarchy — the toolbar out-weighs the data |
| Sidebar width | **200–240px**, fixed, flat list of objects, no collapsible tree until you have more than ~15 destinations | react-admin ships 200px and fits nine destinations; Django spends 276px and Filament 320px on the same job. Above ~15 objects, add a filter input at the top of the rail (Django's `Start typing to filter…`) rather than nesting — nesting hides destinations from people who visit twice a week |
| Content max-width | **None** on tables — full-bleed to the panel edge. **640px, single column** on forms and record pages | A capped table throws away columns to a margin. But a form is read top-to-bottom: Django's inputs sit at ~480px inside a full-width page and the label→input relationship survives; a full-bleed 1440px input is unreadable and looks broken |
| Radius (control / container) | **4px / 6px**, and *four values maximum in the whole product* | Django ships one (4px, on inputs) and reads as a tool. Avo ships 2/4/6/8 simultaneously (188/177/147/123 elements) and reads as four component libraries in a trench coat. Radius above 8px on a 28px control is the loudest generated-UI tell |
| Border weight & colour | **One** 1px hairline, one value, expressed as an alpha over the surface (`oklch(0 0 0 / 0.08)`) | Django renders an entire admin on `1px #e8e8e8` × 393 elements. Odoo on `1px #d8dadd` × 109. If you have three border colours you have three unrelated opinions about what a container is |
| Elevation | **None** in the resting page. Two shadows total, for menus and modals | Nothing in an internal tool floats. A card that sits in the page needs a hairline, or more likely needs to not be a card |
| Motion (micro / standard) | **150ms** colour and background only · **0** for everything else | Django's entire shipped transition declaration is `color 0.15s, background 0.15s`. That is the correct budget, arrived at by a project with no motion designer, and it is not an accident: it is what is left when nothing is added for its own sake |

**If you generated this from component-library defaults**, apply the multipliers in `enterprise-dense.md` before looking again — row height ×0.6, cell padding ×0.5, button height ×0.78, page padding ×0.4, radius ×0.55. **The single check:** at 1440×900 with real data, count visible rows. Django gets 22. Odoo gets 19. react-admin gets 21. Filament gets 8. Avo gets 4. Retool's generated app gets 2. Under 18 and you have a decoration problem, not a taste problem.

## Colour

Eight neutral steps, near-achromatic (chroma ≤ 0.006), plus an alpha ramp for hover and selection. Eight, not twelve — you are not shipping a design system, you are shipping a tool, and every step you define is a step someone will misuse at 2am.

**One accent, and in this archetype it is spent on links and the primary action, in that order.** Internal tools are link-dense — every ID in every cell goes somewhere — so the accent's dominant job is "this is navigable", which is the opposite of `enterprise-dense`, where the accent is reserved for selection and the primary action. Django spends its one accent (`#417893`) on links, the header band and the focus ring, and it never appears as decoration. Do not add a second accent for "sections" or object types.

Semantic colour: **three values, on record state only** — success/warning/danger. Status is a 20px chip at 11px in sentence case (`Processing`, not `PROCESSING`). Two status vocabularies in one row is a real and common failure — Avo's user list renders `rejected` as a grey dot, `waiting` as a red icon, and `Inactive` as a pale pill, all in the same row, so nothing means anything.

Then the one colour this archetype has that no other archetype has: **the environment colour.** Production gets a persistent, unmissable marker — a 4px top band and the environment name in the top bar, in danger red. Staging gets amber, local gets grey. This is not decoration and it is not negotiable: the failure mode it prevents is an operator running a destructive action against the wrong database because both tabs look identical, which is the single most expensive mistake this archetype enables.

Light by default, and honestly, light only. These users have a spreadsheet, a Zendesk tab and your tool open simultaneously; a dark tool in that row is a squint every time they switch. A dark mode is two themes to maintain forever, in a product with no maintainer. If you ship it anyway, re-map the semantic layer — never invert the ramp — and verify the environment marker still reads.

## Type

**The system stack, and no webfont.** Django admin runs `system-ui` / `"Segoe UI"` and loses nothing that matters; a webfont here is a render-blocking request on a tool that gets opened four hundred times a day, sometimes over a VPN from a support floor, in exchange for a personality nobody asked for. If you must load one, load one weight axis of one variable face and self-host it.

**The scale is flat and short: 11 / 12 / 13 / 14 / 16.** Five sizes, top to bottom, and 16px appears only as a page title or a modal heading. Hierarchy comes from weight (400/500/600), colour (two text colours that carry meaning, one that does not) and position. Size contrast costs rows, and rows are the product. Django's whole admin lives between 11px and 24px and 90% of its text is at one size.

Numerals: `font-variant-numeric: tabular-nums` on every amount, count, ID and timestamp, right-align numeric columns, left-align text. Odoo's totals column reads correctly at a glance for exactly this reason.

**Monospace earns its place here more than in any other archetype**, and for a specific reason: values in an internal tool get copied into terminals, tickets and Slack. Mono on record IDs, hashes, API keys, JSON payloads, stack traces, SQL, and enum values that are literally code (`hard_bounce`, `PAYMENT_INTENT_FAILED`). Not on money, not on dates, not on names, and not as a mood.

## Layout and navigation

**Shell:** a 200–240px fixed left rail listing objects as a flat list, or — if there are fewer than eight destinations — Odoo's answer, a single top menu bar and no rail at all. Then one toolbar row carrying the view name, the primary action, search, and filters. That is the entire chrome budget: **≤150px above row one.** Odoo achieves 144px, Django 167px. Every band beyond that is a row the operator cannot see.

**The primary object is the row, and the primary interaction is finding one specific row you already know exists.** The operator arrives with an order number from a ticket. So: search is the first control, it is focusable with `/`, and it searches the identifier fields. Filters are secondary and their state lives in the URL — Odoo renders the active filter as a removable chip inside the search field, which is the clearest solution measured, because the thing hiding your rows and the thing you type into are the same control.

**Group by making the nav carry the counts, not by making the page carry a dashboard.** Filament's `Orders 150` badge does the job a KPI card pretends to do, in 40px of rail that already existed. Status tabs with counts (react-admin's `DELIVERED (520)`) do the rest: they are an aggregate and a filter in one control, and unlike a stat card, clicking one is meaningful.

**Cards are right here exactly twice:** the app launcher when the tool is actually several tools (Odoo's 29-tile grid), and a chooser of 8–12 targets. Cards around a table, cards around a form, cards holding a single number, and cards inside cards are all wrong. A record page is a form with fieldset rules, not a stack of panels — Django's full-width fieldset bars (`Personal info`, `Permissions`) group thirty fields with zero containers.

## Components

**Belongs here:**

- A table with sortable columns, a checkbox column, a real pager showing the true count (`1-31 / 31`), and every row linking to its record by its identifier.
- Search-first toolbar (`/` focuses it), filters as removable chips whose state is in the URL.
- Bulk action as an explicit two-step: a selection count (`0 of 61 selected`), an action chooser, and a `Run` that names what it will do to how many.
- A destructive dialog that enumerates the blast radius before it asks — the cascade, the count, the irreversibility, and a confirm button that names the action (`Delete 3 shipments`), not `OK`.
- Undo (10s toast + ⌘Z) for anything your system can actually reverse; a typed confirmation only when the action is externally irreversible (money moved, email sent, webhook fired).
- A `History` affordance on every record, and a "who changed this, when, from what to what" feed. Django ships both — per-object history and a `Recent actions` list on the home screen — and that home screen is a far better default than a chart.
- A visible environment marker, and a different one per environment.
- Inline help text under a label where the field's meaning is non-obvious. Django: *"Designates whether this user should be treated as active. Unselect this instead of deleting accounts."* That one sentence prevents deletions.
- Paste-from-spreadsheet into a bulk input, and CSV export that respects the current filter. Your competitor is a spreadsheet; make the round trip cheap instead of pretending it won't happen.
- A jobs surface for anything slow: a row per run, its status, its input, its output, and a link to the log.

**Does not belong here:**

- A dashboard homepage with stat cards and charts → the object list the operator actually opens, or Django's `Recent actions`. Refine and Avo both ship the chart version; count how many of those series mean anything.
- A theme switcher → the environment indicator, in that slot.
- A red `Delete` button sitting in the resting row → neutral at rest, red inside the confirmation. A destructive control at rest tells the operator the interface expects mistakes.
- Icon-only buttons with no label for anything destructive or ambiguous. An operator who uses this six times a shift does not build icon vocabulary.
- Toast-only feedback for a row write → revert the cell in place *and* toast. The toast is 200px away from the row that failed.
- `alert()`, `confirm()`, and unlabelled `⋮` menus as the only path to important actions.
- A modal for anything a page can hold. An internal tool has no aesthetic reason to avoid a full page, and a page has a URL.
- A marketing block, an upsell, or a vendor credit in the chrome (AdminJS ships an Enterprise sales card in the sidebar and a `Made with ❤️ by` footer, in a tool with nine users).
- Infinite scroll, skeleton choreography, animated counters, and a spinner that replaces the table.
- A custom design system. Use the boring components; spend the saved week on the audit trail.

## States in this archetype

**Empty** is three different screens and only two of them matter here. *Filtered to zero* is the common one: keep the filter chips visible, say `No orders match these 2 filters`, and offer `Clear filters` — never show first-run onboarding to someone with 40,000 orders. *Permission denied* must name the object, the missing permission and who grants it (`You don't have the refunds:write permission. #ops-tooling can grant it.`) — and must never silently filter rows out of a list, because a lying count in an internal tool becomes a wrong decision. *Zero data on first run* frequently does not exist at all, because the database is populated by the product, not by this tool; do not build an illustrated onboarding state for a case that cannot occur.

**Loading.** Keep the rail, the toolbar and the column headers live so the operator can start typing a filter while rows arrive. Skeleton the rows at the exact row height. Under ~300ms, render nothing — a flash of skeleton is worse than a still frame.

**Error** is the state this archetype gets wrong most and needs most, because the operator's next action is to paste your error into a Slack thread with the engineer who owns the tool. Requirements: name the record, name the constraint, keep the shell, keep the user's typed input, and include a request or trace ID that is selectable. `Couldn't refund OR941634 — Stripe returned charge_already_refunded. Request req_8Kd2Pq.` is a ticket someone can close. `Something went wrong` is a meeting.

**Partial failure** is the state nobody builds and every internal tool needs. A bulk action over 47 rows that half-succeeds must say so: `Updated 44 of 47 orders. 3 failed: OR126786, OR251262, OR78681 — already invoiced.` with the failures still selected so the operator can retry only those. Silence here is how an ops team stops trusting the tool and goes back to the spreadsheet.

**Too much.** Paginate with a true count and never infinite-scroll a dataset whose size you know. Cap the column set rather than scrolling horizontally into infinity. Never truncate a number or an ID; truncate a name and keep the full value in a `title`.

## Motion budget

**150ms on colour and background. Nothing else animates.** No transforms, no height, no `transition-all`, no entrance animation, no staggered rows, no chart draw-on.

The frequency argument is different here than in a resident tool, and stronger: a support agent enters this interface in a state of interruption, mid-ticket, with a customer waiting. Every millisecond of transition sits between them and the row. There is no compensating delight budget — nobody is going to enjoy your tool, and the attempt reads as a team that had time to animate but not time to add undo. Django's shipped `color .15s, background .15s` is the whole correct answer. Honour `prefers-reduced-motion` by dropping to nothing.

The one permitted exception: an indeterminate progress bar on a long-running job, because it is load-bearing information about whether the system is alive.

## Mobile

**This is a desktop-only product and you should say so out loud, in the product.** A 12-column ops table does not become mobile by stacking into cards; it becomes twelve unlabelled paragraphs, and the operator will make a worse decision from it than from no tool at all. An honest gate — a single line at ≤700px saying `Ops console requires a desktop browser` with the record's identifier and a `Copy link` button — beats a broken responsive grid, costs an afternoon, and is the correct answer for perhaps 80% of internal tools.

The exception worth building, when it exists, is the **approve-from-a-notification** path: someone is paged, opens a link from Slack on a phone, and needs to see one record and take one action on it. Build that single record view and that single action, at 16px with 44px targets, and route everything else to the gate. Do not build a mobile list.

## Copy register

An engineer writing to a colleague: exact, unhedged, no personality, no apology. Sentence case everywhere. Name the object and the number in every consequential string. Use the real domain vocabulary the team uses in Slack — `chargeback`, `hard bounce`, `dunning` — because inventing friendlier synonyms for words your users already use makes the tool harder, not kinder. Never celebrate; a success toast with an exclamation mark is read four hundred times a week by someone who is not happy.

| Right | Beats |
|---|---|
| `Refund $482.10 to Marguerite Osei on order OR941634? This calls Stripe immediately and can't be undone here.` | `Are you sure?` — the amount, the person, the system it touches and the irreversibility *are* the question |
| `Updated 44 of 47 orders. 3 failed: OR126786, OR251262, OR78681 — already invoiced.` | `Some rows could not be updated` — which rows, why, and can I retry just those |
| `Deleted user ravi.sørensen0 and 1 group membership.` + `Undo` | `Success!` — an internal tool's job is to tell you exactly what it just did to production |
| `Unselect this instead of deleting accounts.` (as help text under `Active`) | `Toggle user status` — the sentence that prevents the deletion is worth more than the sentence that describes the control |
| `PRODUCTION · live customer data` in the header | a purple gradient logo reading `Admin Panel` |

## The characteristic failure

There are two, they look nothing alike, and most teams produce one while fearing the other.

**Failure one: the internal tool that got a redesign instead of a fix.** Someone senior said it looked embarrassing, so a sprint went into surface. The result is measurable in ten seconds:

1. A **dashboard homepage** with three or four stat cards and a chart, which nobody opens on purpose — every user has the object list bookmarked. Refine's own demo opens here; Avo's user list stacks a three-series area chart with no legend and two stat panels above the table, pushing the first row to y=681.
2. **Rows at 49–68px** from `py-4` plus `text-base`, and a first data row at y=460 (Filament), y=681 (Avo) or y=760 (Retool). Two to eight visible rows where the same pixels could hold twenty-two.
3. **A dark-mode toggle that shipped before undo did.** Check the commit order; it is diagnostic.
4. **Three or four radii and three border colours** in one screen, because components arrived from three libraries and nobody consolidated.
5. **`Are you sure?`** on a destructive dialog that names neither the object nor what else it will delete, and no environment indicator anywhere on the page.

The deeper diagnosis: **every one of those is effort spent where it is not compounding.** The stat card, the chart and the theme cost real engineering weeks and prevent zero incidents; the cascade preview, the audit column and the environment stripe cost two days each and prevent the incidents this tool exists to create. An AI or a rushed team produces failure one because visual output is legible to a stakeholder in a screenshot and safety work is not.

**Failure two, the one that actually costs a database: the deliberately-neglected tool.** "It's internal, it doesn't matter" is not a design philosophy, it is a permission slip. Its symptoms: focus outlines removed for tidiness; a red `Delete` button sitting at rest immediately beside `Edit`; unlabelled `⋮` menus as the only path to consequential actions; a form that loses forty fields of typed input on a validation error; `confirm("Are you sure?")`; the same UI in staging and production with nothing distinguishing them; no record of who changed what; and a bulk action that reports `Done` regardless of what happened. This one does not look bad in a screenshot, which is precisely why it survives review.

**Self-diagnosis, fastest checks first:**

- Count visible data rows at 1440×900 with real data. Under 18 → geometry problem.
- Measure the y of the first data row. Over 150px → chrome problem.
- Open the tool in staging and in production side by side. If you can't tell in under one second, stop and fix that before anything else in this list.
- Try to delete something. If the dialog doesn't name the object *and* what else it takes with it, you have Django's 2005 pattern to copy and no excuse.
- Break a bulk action halfway on purpose. If the UI says `Done`, it is lying to your ops team.
- Ask the newest support agent what they do when the tool is wrong. If the answer is "export to CSV and fix it in Sheets", the tool has already lost and no amount of styling will win it back.
- `grep` for `transition-all`, `duration-300`, `shadow-lg`, `hover:-translate` near a row selector. Any hit → delete it.

## Signature decisions that fit here

- **The environment stripe.** A 4px band across the top of the viewport plus the environment name in the header: red `PRODUCTION`, amber `STAGING`, grey `LOCAL`, carried into the favicon and the page `<title>` so it is legible in a tab strip of eleven identical tabs. One structural decision, prevents the archetype's most expensive class of mistake, costs an afternoon.
- **The cascade preview, generalised.** Django's delete page shows every dependent record that dies with the one you asked about. Generalise it to every irreversible action: before a bulk status change, before a refund, before a merge, show the *count and the names* of everything that will change. The dialog's content is a query result, not a sentence.
- **Provenance as a permanent column, not an audit page.** `Changed by · when` on the row itself, and the previous value in the tooltip. In a tool where the standing question is "who did this and why", an audit log the operator has to navigate to is an audit log nobody reads.
- **The reason field on manual overrides.** Any action where a human overrides a system decision — force-approve, waive a fee, unblock an account — requires a short free-text reason, stored with the change and shown in the provenance column. It costs one input and it is the difference between an audit trail and a list of timestamps.
- **The nav counts the work.** Every object in the rail carries the number of records currently needing a human (`Refund requests 12`, not `Refunds 8,431`). The rail becomes the queue, and the homepage stops needing to exist.

Pick **one**. In this archetype that is not an aesthetic rule, it is a maintenance rule: whoever inherits this tool in eighteen months will keep one distinctive thing working and let the second one rot.

## Sources

- `http://127.0.0.1:8811/admin/` — vanilla Django admin 5.x, seeded with 61 users and run locally, probed and screenshotted at 1440×900: body plane **13px/16px** on 185 of ~300 text nodes; rows on a **33.08px** pitch (tops 287.81/320.89/353.97/387.05); `td padding: 8px`; `th` **11px weight 500 uppercase** `#666`, padding `5px 10px 5px 16px`; **one** border `1px rgb(232,232,232)` ×393; radii 4px ×4 and 15px ×1 — essentially none; controls 24–26px; rail 276px; first data row at **y=167** (22 visible rows); transitions `color 0.15s, background 0.15s`. Screens captured: list, change form, delete confirmation, index.
- `https://demo.odoo.com` → `https://demo6.odoo.com/odoo/sales` — probed and screenshotted live: rows **41px** (tops 144.3/185.3/226.3…), `td padding: 8px 4.8px 8px 16px` at 14px/21px, `th` weight 500 sentence case, toolbar buttons **26px** with `0 8px`, dominant border `1px rgb(216,218,221)` ×109, radius 4px ×88, first data row **y=144.3** (19 visible rows), filter as a removable chip inside the search field, 7-way view switcher, 29-tile app launcher.
- `https://demo.filamentphp.com/shop/orders` — logged in and probed: rows **57px**, `td padding: 16px 12px 16px 24px` at 14px/20px, `th` weight 700, sidebar **320px** with count badges (`Orders 150`, `Leave Requests 85`), radii 8px ×88 / 6px ×79 / 4px ×17, first data row **y=461.5** (8 visible rows), three stat cards with sparklines plus six counted status tabs above the table, Tailwind's 75ms colour transition.
- `https://main.avodemo.com/avo/resources/users` — logged in and probed: rows **49px**, first data row **y=681** (4 visible rows), four radii in use simultaneously (2px ×188, 4px ×177, 8px ×147, 6px ×123), border `1px oklch(0.928 0 89.88)` ×833, rail 256px, `th` weight 700, inline keyboard hints in nav items and buttons, three competing status vocabularies in one row.
- `https://marmelab.com/react-admin-demo/#/orders` — logged in and probed: rows **33.02px** (tops 199.8/232.81/265.83…), `td padding: 0 8px` at 14px/20.02px, toolbar buttons **27.5px** with `4px 5px`, rail **200px**, border `1px rgb(224,224,224)` ×147, MUI's 10px radius and 195–300ms transitions, status tabs with counts, first data row **y=199.8** (21 visible rows). Its 404 state keeps the rail and offers one recovery action.
- `https://demo.adminjs.co/admin` — logged in and probed: rows **65px**, `td padding: 16px`, first data row y=304, one row of data on a 900px screen, sidebar upsell card.
- `https://example.admin.refine.dev/` — screenshotted: the framework's default front door is three chart cards, a delivery map and a status timeline.
- `https://demo.unfoldadmin.com` and `https://pocketbase.io/demo/` — screenshotted (login walls); Django's shipped auth-failure copy read off the Unfold login: *"Please enter the correct username and password for a staff account. Note that both fields may be case-sensitive."*
- Retool app-gallery numbers (**68.4px** rows, first data row **y≈760**, four KPI cards, 562px of chrome) are carried unchanged from `references/enterprise-and-dense-b2b.md` and `archetypes/enterprise-dense.md` for consistency across the corpus rather than re-measured.
- `craft/interaction-and-states.md` — undo-over-confirm policy, the 10s undo window, and the "red destructive button at rest" anti-pattern are cited from there, not re-derived.
