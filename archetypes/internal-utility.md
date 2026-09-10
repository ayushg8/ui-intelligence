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

- **Choose this over `enterprise-dense`** when the tool is not sold and not shared beyond the team that owns it. That neighbour buys saved views, column config, per-team permissions and virtualisation because forty people across six roles negotiate over one dataset; here, six people who sit near each other use a Slack channel instead.
- **Choose this over `technical-productivity`** when the session is bursty rather than resident. Linear earns a full keyboard grammar because its users live in it; your support agent opens the tool six times a shift. Ship `/`, Enter, Esc and Tab correctly and stop — a `j/k` grammar nobody has time to learn is decoration with a keydown handler.
- **Choose this over `analytics-bi`** when the session ends in a write. If the screen exists so someone can *understand* something, you are there. If it exists so someone can *change* a record and close the tab, you are here.
- **Choose this over `institutional-civic`** when the user is an employee who can be trained and can ask a colleague. Civic owes clarity to a stranger under stress; you owe speed to a coworker with a ticket queue. The 16–18px body and one-question-per-screen flow that are correct there are a tax here.

### Side by side with the three it is confused with

| | **internal-utility** | `enterprise-dense` | `technical-productivity` | `analytics-bi` |
|---|---|---|---|---|
| Body | 13/18 · 14/20 when cells hold prose | 13/18–19 | 13, w510 | 13 chrome / 12 data |
| Data row | **32, one tier** | 28–32 · 22–24 machine · 36–40 with avatar | 36–40 content · 26–28 nav | 22–24 · 32 filter target |
| Control | 28 / 32 | 28 / 32 | 28 / 32 | 26–30 |
| Radius | 4 / 6, **≤4 values in the product** | 4 / 6 | 6–8 rows / 12–16 panels | 4 / 6 |
| Rail | 200–240, or none | 232–256, always | 232 | 0, or 224–256 |
| Motion | **150ms colour/background. Nothing else** | 0–120 rows, 160 menus and panels | 0 in / 150 out | 120–150 / 180 |
| Theme | **light only, no toggle** | light unless the data is telemetry | dark-first | light |
| Accent's first job | **links** — every ID is navigable | selection, then primary action | selection | series palette *and* a UI accent |
| Population | 6–40, bursty, ~20 min a visit | 12–200, resident 4–8h, sold | one person, resident all day | analysts, resident |

**Read that honestly: on body size, control height, radius and rail width this archetype is inside the noise of `enterprise-dense`, and saying otherwise would be decoration.** The same physics — a colleague scanning a table on a 1440 laptop — produces the same ramp. The difference lives in four places, three of them visible in a screenshot:

1. **A colour channel is spent on *which database you are pointed at*.** No other archetype in the corpus does this. A 4px band across the viewport, the environment name in the header, and the same colour in the favicon and the `<title>`: red `PRODUCTION`, amber `STAGING`, grey `LOCAL`. Screenshot test: if a stranger cannot name the environment in under a second, this is not the archetype, whatever the row height says.
2. **The accent buys navigation, not selection.** Internal tools are link-dense — every ID in every cell goes somewhere — so the accent's dominant job is "this is navigable." `enterprise-dense` spends its accent on the selected row and the primary button, and its cells are inert text. Screenshot test: count the coloured text nodes *inside* cells. Many → here. Zero → there.
3. **The features you must *not* build.** `enterprise-dense`'s three differentiators — the bulk-selection subsystem, a role × capability surface, saved views owned by teams — are precisely what this archetype forbids. Not because they are wrong, but because six users who sit near each other negotiate in a Slack channel, and every surface you ship is a surface with no owner. A saved-view switcher for four users is dead code in a year. Diagnostic: count the humans. Under ~15, one team, one Slack channel → here.
4. **Maintenance is a design input, not an afterthought.** This is the only archetype whose geometry section ends with *pick one signature and ship no second one*, because whoever inherits the tool in eighteen months will keep one distinctive thing working and let the other rot. The two neighbours have a team; you have a rota.

Where the numbers do diverge, each delta has a reason:

- **Row: 32px flat, no machine tier.** `enterprise-dense` licenses 22–24px for machine-generated strings a resident user scans peripherally. Here the operator arrives cold, six times a shift, holding one order number, and reads one row exactly — and a per-column density tier is a tuning job with no owner.
- **Motion: 150ms on colour and background and literally nothing else**, against `enterprise-dense`'s 160ms for menus and panels — because nothing here floats. No column-config drawer, no saved-view popover, no filter builder. Nothing to give an entrance to.
- **Radius: the same 4/6, plus a cap the neighbour does not need** — four values maximum in the whole product. Their radius failure is consumer softness; yours is library sprawl. Avo ships 2/4/6/8 simultaneously because components arrived from three places and nobody consolidated.
- **Theme: `technical-productivity` is dark-first; this one refuses the toggle.** Its user lives in one window; yours has Sheets and Zendesk in the same row of tabs, and a dark tool between two light ones is a squint four hundred times a day — plus a second theme to maintain forever in a product with no maintainer.
- **Rail 200–240 against 232–256 is noise, and pretending it is a decision would be dishonest.** react-admin fits nine destinations in 200px. Defend the flat list, not the twenty pixels.

## When it is the wrong one

Each of these is an admin console operated by employees, which is exactly why it gets miscast here.

- **Retool, Appsmith, Budibase, Internal.io — the builders themselves.** They render this archetype's output and are not this archetype. Their user *authors* the screen: drags a table, binds a query, defines the columns. That is a `creative-tool` shell wrapped around a dense grid, and everything this file says about pre-tuning a column set is undefined when the user defines it.
- **Stripe Dashboard, Shopify Admin, AWS Console, Vercel's dashboard.** These read as back-office consoles and are sold products with millions of tenants, voluntary adoption, real onboarding and support costs. `developer-platform` or `enterprise-dense`. What breaks first if you build them from this file: no empty states worth the name, raw enum values in cells, and error copy written for the engineer who owns the schema rather than the customer who does not.
- **Zendesk Agent Workspace, Intercom's inbox, Front, Missive.** Employees, a queue, tickets — a perfect superficial match. But the agent is *resident* in it for a full shift, which is the one fact this archetype is built around not being true. That resident session pays for a full keyboard grammar, a triage rhythm and 36–40px action rows: `technical-productivity`. Ship `/`-and-Enter to someone who lives in the tool and you have under-built it.
- **Jira Service Management's agent queue, Salesforce Service Cloud, ServiceNow.** Many roles with genuinely different rights, saved views people send each other, and a portal on the other side. `enterprise-dense`. The tell is the first feature request: "can I share this view with the EMEA team" means you are not here.
- **Metabase, Superset, or the "internal dashboard" someone built in Looker.** The session ends in understanding, not in a write. `analytics-bi`, where a metric tile is legal because clicking it re-plots the chart. This file will make that screen too cramped and too grey.
- **Grafana or Datadog on an on-call rotation.** Read-only, push-updated, watched continuously: `data-terminal`. Nothing in it is worth a confirmation dialog, and 32px rows are wasteful where 22px is generous.
- **A tool that is being quietly commercialised.** Every internal tool's roadmap ends with "could we sell this?" The day the answer is yes, the cost model inverts: adoption becomes voluntary, onboarding matters, and the things this file told you to skip become the product. Re-archetype deliberately rather than sanding it up feature by feature.
- **Dispatch, dosing and physical control — an Onfleet-style driver console, a pharmacy verification queue, a warehouse pick station, anything that opens a gate.** `healthcare-clinical` in its interaction model regardless of who the users are. Take this file's geometry; take none of its write patterns — no optimistic writes, no hover-revealed destructive controls, no undo-instead-of-confirm.
- **A screen four executives look at once a quarter.** That is a report. Give it 16px type, a measure, and no table.

## Reference products

| Product | Why | The one thing to steal |
|---|---|---|
| **Django admin** (5.2.17, run locally) | Twenty years old, unfashionable, and denser than every framework that replaced it | The delete page enumerates the **cascade** before you confirm: *"All of the following related items will be deleted"* + a Summary count + an Objects tree, then `Yes, I'm sure` / `No, take me back` |
| **Odoo** (`demo.odoo.com` → Sales) | The largest back-office console anybody can log into without a sales call | **144px of chrome above row one** and no sidebar at all — a top menu bar, then data. Plus the active filter rendered as a removable chip *inside* the search field |
| **Filament** (`demo.filamentphp.com/shop/orders`) | The best-crafted admin framework of the current generation, and it still ships the failure | Queue depth as a **badge on the nav item** (`Orders 152`, `Leave Requests 75`, `Expenses 63`) — the operator sees where the work is without opening anything |
| **Avo** (`main.avodemo.com`, Rails) | Nobody names it; it solved keyboard discoverability better than the famous tools | Shortcut hints rendered **inline on the control itself** — the `Actions` button carries its `A` in the button, and the rail carries `⌘K` — instead of hidden behind a `?` sheet nobody presses |
| **react-admin** (`marmelab.com/react-admin-demo`) | The most-installed internal-tool framework in JS, measurable in one click | Status as **tabs with live counts** (`ordered (18)` / `delivered (537)` / `cancelled (45)`, 48px tall) — the aggregate and the filter are the same control, which is what a stat card should have been |
| **AdminJS** (`demo.adminjs.co`) | The generated-CRUD baseline | Study it as a warning: 65px rows, 16px cell padding, one row of data in a 900px viewport, and a paid-tier upsell card in the sidebar of a tool with nine users |
| **Refine** (`example.admin.refine.dev`) | What the category thinks its front door should be | Re-probed 2026-09-10: three 267px stat cards at y=140, a 491px delivery map, and the `Recent Orders` table's first row at **y=989** — zero data rows above the fold. The third card reads `New Customers 11,000.00%`, a percentage where a count belongs, shipped and unnoticed. That is what an unowned stat card becomes |

## The numbers

| | Value | Because |
|---|---|---|
| Body | **13px / 18px** when cells hold IDs, dates, amounts and enums; **14px / 20px** when they hold names and prose | Django admin's data plane measured 13px/16px on 185 of 289 text nodes; react-admin's cells 14px/20px; Odoo's 14px/21px. 13px is not a squint when the cell is `OR941634` — it is a squint when the cell is a sentence. Pick per product, not per taste |
| Dense/secondary text | **11px / 16px, muted**, for column headers, timestamps, row meta and IDs | Django's `th` is 11px weight 500 at `#666` — a full step below the body, which is what tells the eye "label, not value". Avo runs a whole 10px/14px micro-plane for the same job (29 nodes on its user list) |
| Page title | **16px, weight 600, in the toolbar row next to the primary action.** No subtitle, no eyebrow, no 30px hero | Odoo puts `Quotations` beside the `New` button at 16.8px weight 400 and spends zero vertical band on it. Filament spends a 30px title plus a breadcrumb plus three stat cards and its first row lands at **y=461**; Avo's lands at **y=681** — four visible rows. The user clicked the nav item two seconds ago |
| Row / list-item height | **32px** single-line · **36–40px** only if the row carries a 24px avatar or a genuine second line | Django 33.08px, react-admin 33.02px, Odoo 41px. At 1440×900 with ~150px of chrome, 32px shows 23 rows and 57px shows 13. The support agent is looking for one row out of eighty; every row they cannot see is a scroll and a re-orient |
| Control height | **28px** default (`padding: 4px 8px`), **32px** for the primary bar action, **36px** only for a destructive confirm inside a dialog | Django's search input measured 25px with `2px 5px`; Odoo's menu-bar items 26px with `0 8px` against a **33px** primary `New` with `5px 10px` — the exact 28/32 relationship, measured; react-admin's `Add filter`/`Columns`/`Export` 27.5px with `4px 5px`. A 40px button above a 32px row inverts the hierarchy — the toolbar out-weighs the data |
| Sidebar width | **200–240px**, fixed, flat list of objects, no collapsible tree until you have more than ~15 destinations | react-admin ships 200px and fits nine destinations; Django spends 276px and Filament 320px on the same job. Above ~15 objects, add a filter input at the top of the rail (Django's `Start typing to filter…`) rather than nesting — nesting hides destinations from people who visit twice a week |
| Content max-width | **None** on tables — full-bleed to the panel edge. **640px, single column** on forms and record pages | A capped table throws away columns to a margin. But a form is read top-to-bottom: Django's inputs sit at ~480px inside a full-width page and the label→input relationship survives; a full-bleed 1440px input is unreadable and looks broken |
| Radius (control / container) | **4px / 6px**, and *four values maximum in the whole product* | Django ships one (4px, on inputs) and reads as a tool. Avo ships 2/4/6/8 simultaneously (174/94/79/34 elements on one list view) and reads as four component libraries in a trench coat. Radius above 8px on a 28px control is the loudest generated-UI tell |
| Border weight & colour | **One** 1px hairline, one value, expressed as an alpha over the surface (`oklch(0 0 0 / 0.08)`) | Django renders an entire admin on `1px #e8e8e8` ×395 elements. Odoo on `1px #d8dadd` ×176 (next colour: ×32). If you have three border colours you have three unrelated opinions about what a container is |
| Elevation | **None** in the resting page. Two shadows total, for menus and modals | Nothing in an internal tool floats. A card that sits in the page needs a hairline, or more likely needs to not be a card |
| Motion (micro / standard) | **150ms** colour and background only · **0** for everything else | Django's entire shipped transition declaration is `color 0.15s, background 0.15s`. That is the correct budget, arrived at by a project with no motion designer, and it is not an accident: it is what is left when nothing is added for its own sake |

**If you generated this from component-library defaults**, apply the multipliers in `enterprise-dense.md` before looking again — row height ×0.6, cell padding ×0.5, button height ×0.78, page padding ×0.4, radius ×0.55. **The single check:** at 1440×900 with real data, count *fully visible* rows. Re-counted 2026-09-10: Django 18, Odoo 18, react-admin 18 — the three that got the geometry right land on the same number, which is where the floor comes from. Filament 7. Avo 4. Refine's dashboard 0, because its table starts at y=989. Under 18 and you have a decoration problem, not a taste problem.

## Colour

Eight neutral steps, near-achromatic (chroma ≤ 0.006), plus an alpha ramp for hover and selection. Eight, not twelve — you are not shipping a design system, you are shipping a tool, and every step you define is a step someone will misuse at 2am.

**One accent, and in this archetype it is spent on links and the primary action, in that order.** Internal tools are link-dense — every ID in every cell goes somewhere — so the accent's dominant job is "this is navigable", which is the opposite of `enterprise-dense`, where the accent is reserved for selection and the primary action. Django spends its one accent (`#417893`) on links, the header band and the focus ring, and it never appears as decoration. Do not add a second accent for "sections" or object types.

Semantic colour: **three values, on record state only** — success/warning/danger. Status is a 20px chip at 11px in sentence case (`Processing`, not `PROCESSING`). Two status vocabularies in one row is a real and common failure — Avo's user list renders `rejected` as a grey dot, `waiting` as a red icon, and `Inactive` as a pale pill, all in the same row, so nothing means anything.

Then the one colour this archetype has that no other archetype has: **the environment colour.** Production gets a persistent, unmissable marker — a 4px top band and the environment name in the top bar, in danger red. Staging gets amber, local gets grey. This is not decoration and it is not negotiable: the failure mode it prevents is an operator running a destructive action against the wrong database because both tabs look identical, which is the single most expensive mistake this archetype enables.

Light by default, and honestly, light only. These users have a spreadsheet, a Zendesk tab and your tool open simultaneously; a dark tool in that row is a squint every time they switch, and a second theme is a maintenance liability forever in a product with no maintainer. Django is the obvious counterexample — it ships `dark_mode.css` and a three-state toggle — and it is also a framework installed by hundreds of thousands of teams with a release process behind it. Yours is not. If you ship it anyway, re-map the semantic layer, never invert the ramp, and verify the environment marker still reads at every step.

## Type

**The system stack, and no webfont.** Django admin runs `system-ui` / `"Segoe UI"` and loses nothing that matters; a webfont here is a render-blocking request on a tool that gets opened four hundred times a day, sometimes over a VPN from a support floor, in exchange for a personality nobody asked for. If you must load one, load one weight axis of one variable face and self-host it.

**The scale is flat and short: 11 / 12 / 13 / 14 / 16.** Five sizes, top to bottom, and 16px appears only as a page title or a modal heading. Hierarchy comes from weight (400/500/600), colour (two text colours that carry meaning, one that does not) and position. Size contrast costs rows, and rows are the product. Django's whole admin lives between 11px and 24px, and 248 of its 289 text nodes — 86% — are at 13px.

Numerals: `font-variant-numeric: tabular-nums` on every amount, count, ID and timestamp, right-align numeric columns, left-align text. Odoo's totals column reads correctly at a glance for exactly this reason.

**Monospace earns its place here more than in any other archetype**, and for a specific reason: values in an internal tool get copied into terminals, tickets and Slack. Mono on record IDs, hashes, API keys, JSON payloads, stack traces, SQL, and enum values that are literally code (`hard_bounce`, `PAYMENT_INTENT_FAILED`). Not on money, not on dates, not on names, and not as a mood.

## Layout and navigation

**Shell:** a 200–240px fixed left rail listing objects as a flat list, or — if there are fewer than eight destinations — Odoo's answer, a single top menu bar and no rail at all. Then one toolbar row carrying the view name, the primary action, search, and filters. That is the entire chrome budget: **≤150px above row one.** Odoo achieves 144.3px — a menu bar, one control row, done. Django, the density exemplar of this file, does **not**: its user changelist spends **285px** on breadcrumb + a 20px `Select user to change` + search + action bar before row one, which is the band this budget exists to cut. (An earlier pass in this corpus recorded Django at y=167; that was the *nav sidebar's* own table, not the changelist. Corrected here.) Every band beyond 150px is a row the operator cannot see.

**The primary object is the row, and the primary interaction is finding one specific row you already know exists.** The operator arrives with an order number from a ticket. So: search is the first control, it is focusable with `/`, and it searches the identifier fields. Filters are secondary and their state lives in the URL — Odoo renders the active filter as a removable chip inside the search field, which is the clearest solution measured, because the thing hiding your rows and the thing you type into are the same control.

**Group by making the nav carry the counts, not by making the page carry a dashboard.** Filament's `Orders 152` badge does the job a KPI card pretends to do, in 40px of rail that already existed. Status tabs with counts (react-admin's `delivered (537)`) do the rest: they are an aggregate and a filter in one control, and unlike a stat card, clicking one is meaningful.

**Cards are right here exactly twice:** the app launcher when the tool is actually several tools (Odoo's 29-tile grid), and a chooser of 8–12 targets. Cards around a table, cards around a form, cards holding a single number, and cards inside cards are all wrong. A record page is a form with fieldset rules, not a stack of panels — Django's full-width fieldset bars (`Personal info`, `Permissions`) group thirty fields with zero containers.

## Components

**Belongs here:**

- A table with sortable columns, a checkbox column, a real pager showing the true count (`1-31 / 31`), and every row linking to its record by its identifier.
- Search-first toolbar (`/` focuses it), filters as removable chips whose state is in the URL.
- Bulk action as an explicit two-step: a selection count (`0 of 61 selected`), an action chooser, and a `Run` that names what it will do to how many.
- A destructive dialog that enumerates the blast radius before it asks — the cascade, the count, the irreversibility, and a confirm button that names the action (`Delete 3 shipments`), not `OK`.
- Undo (10s toast + ⌘Z) for anything your system can actually reverse; a typed confirmation only when the action is externally irreversible (money moved, email sent, webhook fired).
- A `History` affordance on every record, and a "who changed this, when, from what to what" feed. Django ships both — per-object history and a `Recent actions` list on the home screen — and that home screen is a far better default than a chart.
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

**150ms on colour and background. Nothing else animates.** No transforms, no height, no `transition-all`, no entrance animation, no staggered rows, no chart draw-on. Django's entire shipped transition declaration is `color .15s, background .15s`, on 90 elements and nothing else — that is the whole correct answer, arrived at by a project with no motion designer.

The argument is not the resident-tool frequency argument. A support agent enters this interface in a state of interruption, mid-ticket, with a customer waiting, and there is no compensating delight budget: nobody is going to enjoy your tool, and the attempt reads as a team that had time to animate but not time to add undo. Unlike `enterprise-dense`, there is also nothing to spend a panel budget on — no column-config drawer, no saved-view popover — so the 160ms tier that exists there has no occupant here.

The one permitted exception: an indeterminate progress bar on a long-running job, because it is load-bearing information about whether the system is alive. Honour `prefers-reduced-motion` by dropping to nothing.

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

1. A **dashboard homepage** with three or four stat cards and a chart, which nobody opens on purpose — every user has the object list bookmarked. Refine's demo *is* this screen, measured: three 267px cards at y=140, a 491px delivery map, the table's first row at y=989, and a `New Customers` card reading **`11,000.00%`** because nobody owns the number. Avo stacks a three-series area chart with no legend and two stat panels above its user list, pushing row one to y=681.
2. **Rows at 49–68px** from `py-4` plus `text-base`, and a first data row at y=461 (Filament), y=681 (Avo) or y≈760 (Retool's generated app). Four to seven visible rows where the same pixels hold eighteen.
3. **A dark-mode toggle that shipped before undo did.** Check the commit order; it is diagnostic.
4. **Three or four radii and three border colours** in one screen, because components arrived from three libraries and nobody consolidated. Avo, measured today: 2px ×174, 4px ×94, 8px ×79, 6px ×34, all live on one list view.
5. **`Are you sure?`** on a destructive dialog that names neither the object nor what else it will delete, and no environment indicator anywhere on the page.

**The fingerprint, so an agent can match it against its own output before rendering.** Failure one is generated code and it is generated from the same handful of primitives every time:

- **Markup:** `<Card><CardHeader><CardTitle>` wrapped around a `<Table>`; `grid gap-6 md:grid-cols-4` of stat tiles; `rounded-xl border bg-card shadow-sm`; `text-3xl font-bold` on a number; `py-4` on `<TableCell>`; `<Badge variant="destructive">`; `<Button variant="ghost" size="icon">` holding a bare `Trash2`; a `<DropdownMenu>` behind `MoreHorizontal` as the only route to a real action; a `<ThemeToggle />` in the header.
- **Copy:** `Dashboard`, `Overview`, `Total Revenue`, `Active Users`, `+20.1% from last month`, `Manage your orders here.`, `Are you sure?`, `This action cannot be undone.`, `Something went wrong`, `Success!`, Title Case column headers.
- **Values:** row ≥48px, first data row y>400, ≥3 radii, ≥3 border colours, `transition-all duration-300`, `shadow-lg` on something that does not float, and **no string anywhere in the DOM containing `production`, `staging` or the database name**.

Any four of those together and you are looking at failure one, whatever it looks like at a glance.

The deeper diagnosis: **every one of those is effort spent where it is not compounding.** The stat card, the chart and the theme cost real engineering weeks and prevent zero incidents; the cascade preview, the audit column and the environment stripe cost two days each and prevent the incidents this tool exists to create. An AI or a rushed team produces failure one because visual output is legible to a stakeholder in a screenshot and safety work is not.

**Failure two, the one that actually costs a database: the deliberately-neglected tool.** "It's internal, it doesn't matter" is not a design philosophy, it is a permission slip. Its symptoms: focus outlines removed for tidiness; a red `Delete` button sitting at rest immediately beside `Edit`; unlabelled `⋮` menus as the only path to consequential actions; a form that loses forty fields of typed input on a validation error; `confirm("Are you sure?")`; the same UI in staging and production with nothing distinguishing them; no record of who changed what; and a bulk action that reports `Done` regardless of what happened. This one does not look bad in a screenshot, which is precisely why it survives review.

**Self-diagnosis, fastest checks first:**

- Count visible data rows at 1440×900 with real data. Under 18 → geometry problem.
- Measure the y of the first data row. Over 150px → chrome problem.
- Open the tool in staging and in production side by side. If you can't tell in under one second, stop and fix that before anything else in this list.
- Try to delete something. If the dialog doesn't name the object *and* what else it takes with it, you have Django's 2005 pattern to copy and no excuse.
- Break a bulk action halfway on purpose. If the UI says `Done`, it is lying to your ops team.
- Ask the newest support agent what they do when the tool is wrong. If the answer is "export to CSV and fix it in Sheets", the tool has already lost and no amount of styling will win it back.
- `grep` the rendered page for the environment name. Zero hits → you shipped the failure regardless of everything else.
- `grep` the source for `transition-all`, `duration-300`, `shadow-lg`, `hover:-translate` near a row selector. Any hit → delete it.
- Count coloured text nodes inside cells. Zero → you built an `enterprise-dense` grid; in this archetype the identifiers are links.

## Signature decisions that fit here

- **The environment stripe.** A 4px band across the top of the viewport plus the environment name in the header: red `PRODUCTION`, amber `STAGING`, grey `LOCAL`, carried into the favicon and the page `<title>` so it is legible in a tab strip of eleven identical tabs. One structural decision, prevents the archetype's most expensive class of mistake, costs an afternoon.
- **The cascade preview, generalised.** Django's delete page shows every dependent record that dies with the one you asked about. Generalise it to every irreversible action: before a bulk status change, before a refund, before a merge, show the *count and the names* of everything that will change. The dialog's content is a query result, not a sentence.
- **Provenance as a permanent column, not an audit page.** `Changed by · when` on the row itself, and the previous value in the tooltip. In a tool where the standing question is "who did this and why", an audit log the operator has to navigate to is an audit log nobody reads.
- **The reason field on manual overrides.** Any action where a human overrides a system decision — force-approve, waive a fee, unblock an account — requires a short free-text reason, stored with the change and shown in the provenance column. It costs one input and it is the difference between an audit trail and a list of timestamps.
- **The nav counts the work.** Every object in the rail carries the number of records currently needing a human (`Refund requests 12`, not `Refunds 8,431`). The rail becomes the queue, and the homepage stops needing to exist.

Pick **one**. In this archetype that is not an aesthetic rule, it is a maintenance rule: whoever inherits this tool in eighteen months will keep one distinctive thing working and let the second one rot.

## Sources

- `http://127.0.0.1:8811/admin/auth/user/` — vanilla **Django 5.2.17**, seeded with 61 users, run locally and re-probed 2026-09-10 at 1440×900: body plane **13px/16px** on 185 of 289 text nodes (63 more at 13px/16px w500); rows on a **33.08px** pitch (tops 284.81/317.89/350.97/384.05); `td padding: 8px`; `th` **11px weight 500 uppercase** `rgb(102,102,102)`, padding `5px 10px 5px 16px`; **one** border `1px rgb(232,232,232)` ×395; radii 4px ×4 and 15px ×1 — essentially none; search input 25px with `2px 5px`; rail 276px with `Start typing to filter…`; `h1` 20px weight 300; first data row at **y=284.81** → **18 fully visible rows**; transitions `color 0.15s, background 0.15s` ×90 and nothing else; `--link-fg: #417893`, `--primary: #79aec8`. Delete page verbatim: *Are you sure you want to delete the user "ravi.sorensen0"? All of the following related items will be deleted:* + `Summary` + `Objects`. **Correction:** the earlier y=167 figure was the nav sidebar's own `<table>`, not the changelist; Django spends 285px of chrome, and ships `dark_mode.css`.
- `https://demo.odoo.com` → `https://demo5.odoo.com/odoo/sales` — re-probed live 2026-09-10 (a fresh demo database each time; geometry is stable, data is not): rows **41px** (tops 144.3/185.3/226.3/267.3…), `td padding: 8px 4.8px 8px 16px` at 14px/21px, `th` weight 500 sentence case, menu-bar items **26px** with `0 8px` against a **33px** primary `New` with `5px 10px`, dominant border `1px rgb(216,218,221)` ×176, radius 4px ×90, breadcrumb title 16.8px weight 400, control panel 58px, first data row **y=144.3** → **18 fully visible rows**, pager `1-31 / 31`, the active filter as a removable `My Quotations` chip inside the search field, 29-tile app launcher.
- `https://demo.filamentphp.com/shop/orders` — logged in and re-probed 2026-09-10: rows **57px**, `td padding: 16px 12px 16px 24px` at 14px/20px, `th` weight 700, page title **30px weight 700**, sidebar **320px** with count badges (`Orders 152`, `Leave Requests 75`, `Expenses 63` — the seed drifts, the pattern does not), radii 8px/6px/4px/12px live simultaneously, a webfont (Albert Sans) on 145 nodes, first data row **y=461.5** → **7 fully visible rows**, three stat cards with sparklines plus six counted status tabs above the table.
- `https://main.avodemo.com/avo/resources/users` — logged in and re-probed 2026-09-10: rows **49px**, first data row **y=681** → **4 fully visible rows**, four radii in use simultaneously (2px ×174, 4px ×94, 8px ×79, 6px ×34), rail 256px, `th` **16px weight 700**, a 10px/14px micro-plane (×29) beside a 14px/14px body plane (×264), the `Actions` button carrying its own `A` hint and `⌘K` in the rail, three competing status vocabularies in one row.
- `https://marmelab.com/react-admin-demo/#/orders` — logged in (`demo`/`demo`) and re-probed 2026-09-10: rows **33.02px** (tops 199.8/232.81/265.83/298.84…), `td padding: 0 8px` at **14px/20.02px** (119 nodes), toolbar buttons **27.5px** with `4px 5px` (`Add filter` / `Columns` / `Export` / `Delete`), rail **200px** fitting nine destinations, border `1px rgb(224,224,224)` ×126, MUI's 10px radius, 48px status tabs with live counts (`delivered (537)` today — the demo seeds its data locally, so the counts move and the control does not), first data row **y=199.8** → **18 fully visible rows**.
- `https://demo.adminjs.co/admin` — rows **65px**, `td padding: 16px`, first data row y=304, one row of data on a 900px screen, sidebar upsell card. **Not re-verified in the 2026-09-10 pass** — the demo now gates the resource list behind a login flow that did not complete headlessly; the numbers stand on the earlier capture.
- `https://example.admin.refine.dev/` — re-probed 2026-09-10: the framework's default front door is three **267px** stat cards at y=140 (`Daily Revenue $80.00`, `Daily Orders 150`, `New Customers 11,000.00%`), a **491px** delivery map, a timeline panel, and a `Recent Orders` table whose first row sits at **y=989** — **zero data rows above the fold**, with 77–121px row heights below it.
- `https://demo.unfoldadmin.com` and `https://pocketbase.io/demo/` — screenshotted (login walls); Django's shipped auth-failure copy read off the Unfold login: *"Please enter the correct username and password for a staff account. Note that both fields may be case-sensitive."*
- Retool's **68.4px** rows and **y≈760** first data row are carried unchanged from `archetypes/enterprise-dense.md`, which measured them on the archived `security-operations-console` capture; the URL now serves marketing HTML rather than the app DOM. The **562px of chrome → 4 visible rows** figure in `references/enterprise-and-dense-b2b.md` is a *different* app in the same gallery — two numbers, two screens, not a conflict. Not re-measured here.
- `craft/interaction-and-states.md` — undo-over-confirm policy, the 10s undo window, and the "red destructive button at rest" anti-pattern are cited from there, not re-derived.

## Differentiation pass (2026-09)

**Compared against:** `enterprise-dense.md`, `technical-productivity.md`, `analytics-bi.md` — the three neighbours on the README selector that share "compact", employees-as-users and a table as the primary object. (`institutional-civic` stays a routing bullet only: it is separated by body size alone, which needs no table.)

**Differentiation.** Side by side, this file's body size, control height, radius scale and rail width were inside the noise of `enterprise-dense`, and the four routing bullets asserted a difference without showing one. Added *Side by side with the three it is confused with*: a numeric table, an explicit statement that **the type ramp is shared and pretending otherwise would be decoration**, and four places the difference actually lives — a colour channel spent on *which database you are pointed at* (unique in the corpus, and checkable in one second from a screenshot); the accent's first job being links rather than selection, because every ID in every cell is navigable (checkable: count coloured text nodes inside cells); the three `enterprise-dense` subsystems this archetype **forbids** — bulk-selection model, role × capability surface, team-owned saved views — because six users and no maintainer make them dead code in a year; and maintenance as a design input, which is why the geometry section ends with *pick one signature*. Each remaining numeric delta now carries a reason: 32px flat with no machine-data tier (the operator arrives cold, six times a shift, holding one order number); 150ms colour-only motion with no 160ms panel tier because nothing here floats; the same 4/6 radius but with a four-values-total cap, because the failure mode is library sprawl rather than consumer softness; light-only against `technical-productivity`'s dark-first, because this tool sits between Sheets and Zendesk in a tab strip; and rail width named as noise rather than defended.

**Numbers re-probed live (Playwright, 1440×900, `deviceScaleFactor: 1`, 2026-09-10).** Django 5.2.17 stood up locally and seeded with 61 users, plus Odoo, Filament, Avo, react-admin and Refine logged in and measured. Six products. One real measurement error, and three claims cited off the wrong element:

1. **Django's first data row is y=284.81, not y=167 — and it shows 18 rows, not 22.** The old figure was the *nav sidebar's* own `<table>`, which Django renders as a table and which a `tbody tr` selector picks up first. This matters beyond the digit: the file's ≤150px chrome budget was being illustrated by a product that spends **285px**. The Layout section now says so — Odoo hits 144.3px, Django does not — which is a stronger instruction than the one it replaced.
2. **The visible-row check was recounted honestly as *fully* visible rows.** Django 18, Odoo 18, react-admin 18, Filament 7, Avo 4, Refine 0. The three that got the geometry right converge on the same number, which is where the "under 18" floor actually comes from rather than being asserted.
3. **Confirmed unchanged:** Django 13px/16px on 185 text nodes, 33.08px pitch, `td padding: 8px`, `th` 11px/500/uppercase/#666 at `5px 10px 5px 16px`, one border ×395, radii 4px ×4, `color .15s, background .15s` ×90, `--link-fg: #417893`. Odoo 41px rows at 144.3, `8px 4.8px 8px 16px`, 14/21, pager `1-31 / 31`, the `My Quotations` chip inside the search field. react-admin 33.02px (tops 199.8/232.81/265.83), `0 8px`, 14/20.02, 27.5px toolbar buttons at `4px 5px`, 200px rail. Filament 57px rows, `16px 12px 16px 24px`, 320px rail, y=461.5. Avo 49px rows, y=681, four radii at once.
4. **Corrected drift:** Odoo's border count ×109 → **×176**; Django's ×393 → **×395** and "185 of ~300" nodes → 185 of 289 (86% of the admin at 13px); Avo's 10px plane 113 nodes → 29 and its radius tally 188/177/147/123 → 174/94/79/34; Filament's and Avo's radius tallies restated as shape rather than counts, since they move with DOM state. Seeded demo counts (`Orders 150`, `DELIVERED (520)`) now carry a note that the seed drifts and the control does not.
5. **Odoo's control heights were cited off the wrong control.** "Toolbar buttons 26px" is the *menu bar*; the primary `New` measures **33px** with `5px 10px`. Stated as the 26/33 pair, which is the file's own 28/32 rule confirmed rather than a single number.
6. **Avo's keyboard hints were cited off elements that are not there.** `Projects R J` / `Create new User C` / `Search /` did not reproduce; what does render is the `Actions` button carrying its own `A` and `⌘K` in the rail. Narrowed to what is measurable — the pattern worth stealing (the hint lives on the control, not in a `?` sheet) is unchanged.

**Corpus consistency.** The Retool numbers were attributed to `references/enterprise-and-dense-b2b.md`, which measures a **different** gallery app (562px of chrome → 4 rows) from the one behind `68.4px` / `y≈760` (`archetypes/enterprise-dense.md`, archived capture). Provenance split, and the file now says the URL no longer serves the app DOM. No other number in this file is measured elsewhere in the corpus.

**When it is the wrong one** — was five category labels; now eight named products that superficially fit and specifically break: Retool/Appsmith/Budibase (the user authors the screen → `creative-tool`), Stripe Dashboard / Shopify Admin / AWS Console (sold, multi-tenant), Zendesk Agent Workspace / Front / Missive (the agent is resident, so the keyboard grammar pays → `technical-productivity`), Jira Service Management / ServiceNow (plural roles and shared views), Metabase / Superset (the session ends in understanding), Grafana on-call (read-only, push-updated → `data-terminal`), plus the commercialisation trap and the dispatch/dosing/gate-control exception.

**Characteristic failure hardened.** Failure one now carries a fingerprint an agent can match against its own output before rendering: the markup (`Card`/`CardHeader` around a `Table`, `grid gap-6 md:grid-cols-4` tiles, `rounded-xl border shadow-sm`, `text-3xl font-bold`, `py-4` cells, a bare `Trash2` in a ghost icon button, `MoreHorizontal` as the only route to a real action, a `ThemeToggle` in the header), the copy (`Dashboard`, `Total Revenue`, `+20.1% from last month`, `Are you sure?`, `Something went wrong`, `Success!`), and the values (row ≥48px, first row y>400, ≥3 radii, ≥3 border colours, `transition-all duration-300`, and **no string anywhere in the DOM containing `production` or `staging`**). Refine's dashboard is quoted as the measured specimen, including the `New Customers 11,000.00%` tile — a percentage where a count belongs, shipped and unnoticed, which is what an unowned stat card becomes. Two self-diagnosis checks added: grep the rendered page for the environment name, and count coloured text nodes inside cells.

**Cut:** the Retool row from the reference table (it is a negative control, not a thing to steal from, and its numbers already live in the check line and Sources), the duplicate environment-marker bullet in Components, and the restated frequency argument in Motion budget.
