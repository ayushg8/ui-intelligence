# enterprise-dense

**Evaluated:** 2026-09 · **Density:** compact · **Dark by default:** no — light, unless the primary data is machine-generated telemetry. Attio, Airtable, Jira, Metabase, Grist and Rill all ship light-first; Grafana ships dark. It tracks the room the user is sitting in, not fashion.

> Twelve to two hundred people share one system of record, live inside it four to eight hours a day, and each of them needs to find the three wrong rows out of 2,813 and fix them without asking anyone's permission — except where permission is exactly the point.

## When this is the right archetype

The users are employees, not customers. They did not choose this tool and they cannot abandon it; adoption is a matter of whether the tool is faster than the spreadsheet they would otherwise export to. They arrive with a *query in mind* ("deals closing this month with no owner", "hosts in eu-west failing the p99 SLO") rather than a desire to browse. There are many object types (deals, contacts, invoices, hosts, employees, tickets), many roles with genuinely different rights, and the state of a view is something people **send each other in Slack**. Stakes are commercial and reversible-with-effort: a bad bulk edit costs a Tuesday, not a life.

- **Choose this over `technical-productivity`** when there is more than one primary object type and more than one role. Linear can afford 40px rows and a single keyboard grammar because one person triages their own issues; you have forty people, six object types, saved views owned by teams, and an admin surface. Density here is bought by removing chrome from a *shared* shell, not by optimising one expert's muscle memory.
- **Choose this over `analytics-bi`** when the terminal action is *change these records*, not *understand this trend*. If the user's session ends with a chart they screenshot into a deck, build `analytics-bi`. If it ends with 12 rows edited and an owner reassigned, build this. Products that host both (Sigma, PostHog) are this archetype hosting an `analytics-bi` pane.
- **Choose this over `data-terminal`** when the user *writes*. A terminal is 11–12px, push-updated, and read-only; nothing in it is worth a confirmation dialog. The moment a row can be edited, deleted in bulk, or restricted by role, you need selection models, optimistic writes, undo and permission surfaces — and 11px rows stop being generous and start being a liability.
- **Choose this over `internal-utility`** when the tool is sold, or shared beyond one team. `internal-utility` is correct to ship the boring version with no saved views and no theming. If your users will share links to views with people who have different permissions, you are here.

## When it is the wrong one

- **Employee-facing HR, payroll and benefits flows.** Deel, Rippling and Gusto are dense in the admin tables and deliberately not dense in the flows an employee touches four times a year. Someone entering their bank details for the first time is a `fintech-institutional`/`institutional-civic` situation: 16px body, one action per screen, generous confirmation. Applying this file there produces a 13px form for an irreversible payroll change, which is a trust failure regardless of execution.
- **Settings, billing and org-configuration screens inside your own dense product.** They are visited twice a year and are read as prose. Give them a 640–720px measure and 15–16px body inside the same shell. Workday's 8pt grid is right for these and wrong for a 300-row report; both live in one product.
- **Executive summary screens where nobody touches the table.** If the user's job ends at the number, the KPI card is the product and the grid is decoration. Do not import the anti-card discipline into a screen that is legitimately four numbers.
- **Any surface whose session is under 90 seconds.** Onboarding, invite acceptance, a one-off approval from an email link. There is nothing to scan; density buys nothing and costs comprehension.
- **Clinical order entry and anything where a wrong row harms a person.** The density is fine; the *interaction model* is not. `healthcare-clinical` forbids optimistic writes, silent bulk edits and hover-revealed destructive controls. Take the geometry, take none of the write patterns.

## Reference products

| Product | Why | The one thing to steal |
|---|---|---|
| **Attio** | The high-water mark for a dense grid that is not a 2009 spreadsheet | 36px rows, one `1px #EFF0F0` hairline, no zebra — plus per-column aggregation pinned under the grid (`2,813 count` / `$83,560,165 sum`) instead of KPI cards above it |
| **Grafana** (`play.grafana.org`) | Two type scales in one product, publicly probeable | I measured 5,595 text nodes at **12px/18px** against **76** at 14px/22px on one Logs Drilldown screen. 12px is data, 14px is furniture |
| **Rill Data** (`ui.rilldata.com/demo`) | Nobody names it; it solves magnitude-at-a-glance better than the famous ones | **22px** leaderboard rows with the value's share of total painted as a pale fill *behind the row*, so rank and magnitude read without a chart or an extra column |
| **Grist** (`templates.getgrist.com`) | A live, logged-out, production dense grid anyone can probe — and the clearest permission IA in the set | **23px** row pitch at 13px body, and `Access Rules` sitting in the left nav as a peer of `Raw data`, not buried three levels into Settings |
| **PostHog** | The tightest control geometry measured anywhere | `--button-height-base: 30px` with `--button-padding-x-base: 6px`. Six pixels. Internalise it |
| **Atlassian DynamicTable / Jira** | The institutional default, and one genuinely good idea | 48px rows and `td padding: 4px 8px` at 14/20 — but the `<thead>` rule is **2px** against the body's 1px, a deliberate weight step that anchors the header without a fill |
| **Salesforce / SLDS** | The most misread counter-example in B2B | Its primitives are dense (`body{font-size:.8125rem}`, cells `4px 8px`). What kills it is six stacked chrome bands and `thead th{font-weight:700}` on 13px text. Steal the 13-step ramp, reject the layout |
| **Retool AI app gallery** | The negative control — what a generator produces | 68.4px rows under four KPI cards, first data row at **y≈760** in a 900px viewport. Two visible rows. Study it to recognise your own output |

## The numbers

| | Value | Because |
|---|---|---|
| Body | **13px** / 18–19px, `-0.005em` | The dominant task is scanning a column, not reading a sentence. Grist ships 13px, SLDS ships 13px, Linear ships 13px for its list. 14px is defensible when cells hold names and prose; 16px is a scroll tax |
| Dense/secondary text | **11–12px** / 16–18px for machine-generated content (logs, IDs, timestamps, leaderboards) | Grafana: 5,595 of ~5,700 text nodes at 12px. Rill's entire body is 12px/18px. Dropping the data plane one step below the chrome tells the eye "field, scan it" instead of "prose, read it" |
| Page title | **14–16px, weight 600, same colour as body** | The user knows which view they are in — they clicked it in the rail two seconds ago. A 28–40px title is 40px of vertical budget spent restating the nav. Retool's generated app spends a 40px `Dashboard` heading plus a subtitle; Attio's records view has no page title at all, only a view switcher |
| Row / list-item height | **28–32px** single-line text · **22–24px** machine data (Rill 22, Grist 23, Grafana 23.8) · **36–40px** only if the row carries a 24px avatar or a genuine second line (Attio 36) | Row height is multiplied by 200. At 1440×900 with 120px of chrome: 32px → 24 rows, 48px → 16, 68px → 2 (Retool, because its chrome eats 760px). Pick the tier from what is *in* the cell, never from taste |
| Control height | **28px** default, **32px** for the primary bar control, **36–40px** only for destructive/terminal confirms | Controls sit in a bar directly above 32px rows. A 40px button above a 32px row inverts the hierarchy — the toolbar out-weighs the data. PostHog's default is 30px/6px padding; Grafana's toolbar buttons measured 24px and 32px; Rill's 28px and 32px |
| Sidebar width | **232–256px**, fixed, never a push-drawer | Attio 232, PostHog settings nav 256, Grafana 319 (too wide once the tree is collapsed). The rail is not where you save space — a fixed rail means the grid's horizontal scroll position survives opening a nav section |
| Content max-width | **None** on grids — full-bleed to the panel edge. **68ch** inside a record's notes/description pane only | A 1200px-capped grid inside a 1440px window throws away three columns to a margin nobody reads. The prose pane is a different reading task and gets a measure |
| Radius (control / container) | **4px / 6px**. Pills (`9999px`) for status chips and avatars only | Measured dominant radii: Grafana 6px ×429, Atlassian 6px ×343, Grist 3px ×102 / 4px ×56, Geist 4 and 6 only. 12px+ on a 28px control eats horizontal room and reads consumer |
| Border weight & colour | **One** hairline for the whole product, expressed as an alpha over the surface: `oklch(0 0 0 / 0.07)` light, `oklch(1 0 0 / 0.09)` dark. **One** heavier step (2px, same colour) for the header rule and nothing else | Grafana renders a whole dense screen on `1px rgba(204,204,220,0.12)` ×178; Rill on one `#e5e5e5`-equivalent ×44; Atlassian's only second weight is the 2px `<thead>` rule ×74. An alpha composes on a hovered row, a selected row, a sticky header and a modal; a solid gray is correct on exactly one surface |
| Elevation | Borders for everything that sits in the page. **Two** shadows total: popover/menu, modal | A card that does not float does not need a shadow, and a six-step elevation ladder is enterprise ceremony that makes every surface mushy |
| Motion (micro / standard) | **120ms** hover/focus/checkbox · **160ms** menus, popovers, panel open · colour and opacity only, never transform/height/margin | Linear's shipped transition list is literally `background .16s, color .16s`. A user sweeping a cursor down 30 rows triggers 30 transitions; anything that moves geometry produces 30 reflows and a list that flinches |

**How much smaller than the default:** if you generated this with component-library defaults, multiply before you look again — row height ×0.6, cell padding ×0.5 (`12px 16px` → `4px 8px`), button height ×0.78, button padding-x ×0.5, page padding ×0.4 (`p-6` → 8–12px), gaps ×0.4, section headings ×0.6, badge height ×0.72, icons ×0.65, radius ×0.55, hover duration ×0.53. **The single check:** at 1440×900 with real data, count visible rows. Under 18 and the multipliers are not suggestions.

## Colour

Neutrals are **near-achromatic** — chroma ≤ 0.006 — with a faint cool cast if the product is technical and a faint warm one if it is commercial (CRM, HR). Ten to twelve steps, plus a **parallel alpha ramp** at the same lightness targets. Geist, SLDS and Linear all ship both; the alpha ramp is what lets one hover value work on the page ground, a raised panel, a tinted selected row and a sticky header. Nineteen steps (PostHog) is more than anyone uses; four is not enough once panels stack.

The accent does **exactly four things**: primary action, current selection, focus ring, active nav item. Not headings, not icons, not links inside cells, not borders, not chart series. Write that list into the direction spec — it is the only mechanism that stops colour leaking once you are twelve components deep.

Semantic colour is spent on **record state**, and record state only: a deal stage, a run status, an SLO breach, a payment failure. Three or four values. The moment a colour means "this is a Marketing record" you have burned your budget on taxonomy and the failures stop reading as failures. Status is a **20–24px chip at 11–12px in sentence case** — `At risk`, not `AT RISK`. All-caps lozenges on every row turn a table into shouting (the Jira tell, and the Retool generation reproduced it verbatim: `CRITICAL`, `OVERDUE`, `IN PROGRESS`).

Light by default. This archetype's users sit in offices under fluorescent light with a spreadsheet open in the next tab; a dark grid next to a white spreadsheet is a squint. Dark-first is correct only when the data is machine telemetry viewed in a dark room — observability, log search, on-call. Ship one excellent theme before two mediocre ones, and if you ship both, **re-pick** the dark ramp rather than inverting it: borders carry far more structural load in dark, and surfaces rise by getting lighter, not by gaining a shadow.

## Type

One neutral grotesque with real tabular figures and a variable weight axis — Inter, Geist, Atlassian Sans, or the system stack (Grist runs `-apple-system` and loses nothing). The face is not where this archetype's personality lives; the *information shape* is.

**The scale is deliberately flat.** Editorial runs 3–5× contrast between body and title; here the whole product lives inside 11 → 20px, and the top of the scale is a 16px section heading. `11 / 12 / 13 / 14 / 16 / 20` is the complete set — six sizes, and 20px appears only in an empty state or a modal title. Hierarchy is carried by **weight, colour and position**, because size contrast costs vertical space that rows want.

Weights: 400 / 500 / 600, and if you are on a variable font, interpolate rather than trusting the names — Linear ships 510/590/680 because at 13px on a dark ground, 500 is not distinguishable from 400. Never 300 (13px at 300 fails on a low-DPI monitor), never 700 for column headers (`thead th{font-weight:700}` at 13px is the Salesforce shout; 500–600 at 12px in a muted colour is the fix, plus Atlassian's 2px rule to anchor the band).

`font-variant-numeric: tabular-nums` on every cell, count, timestamp, ID and metric — not just tables. Right-align numeric columns; left-align text; fix identifier and date columns to a hard width (Linear: 72px for the ID, 40px for the date) so the title column's left edge is straight, which is the edge the eye actually tracks.

Monospace earns its place on: log lines, IDs and hashes, query text, JSON, diff, and column values that are literally code (`auth-gateway-prod`). It does not earn its place on: numbers (a proportional face with tabular figures is better), names, or a "technical" mood. The Retool generation uses mono for CVE IDs *and* service names *and* dates — three uses, one of which is right.

## Layout and navigation

**Shell:** fixed left rail 232–256px, collapsible sections with per-section chevrons, no top bar or a 40px one carrying only search and identity. Then **stacked thin bars, not one fat one** — Attio runs three ~40px bands (title + collaborators / view switcher + view settings + import-export / sort + filter); Linear runs 44 + 44. Each bar has one job, so nothing inside it needs an internal divider. A single 72px header holding eight controls forces you to invent separators, which reads as noise.

**Budget the chrome as a hard number: ≤120px above row one at 1440px, ≤180px if you carry a genuine time-range and filter bar** (Rill spends 208px and earns it — date range, comparison toggle, filter set, view tabs). Retool's generated app spends 760px. Collapse what you can on scroll the way PostHog collapses breadcrumbs 60px → 44px.

**The primary object is the row.** It gets priority by being the only thing at full contrast: chrome text is muted, the row's identifying column is `--text` at weight 500, everything else in the row is muted. That single decision does more for scannability than any amount of spacing.

**Saved views are a first-class object with their own switcher, and ad-hoc filters live in a bar *below* it.** This is the difference between a tool people share links in and a tool people screenshot. The view's full state — filters, sort, columns, time range — belongs in the URL. Grafana ships its entire query state as URL params; that is why a stale tab is self-describing.

**Grouping** is sticky group headers inside one scroll container (36px, 12px, muted, with a count), never a card per group. **Cards are right here exactly once:** an 8-to-12-item chooser — app launcher, template gallery, connector picker — where the items are targets rather than rows. Cards around a table, cards around a form, cards around a chart, and cards inside cards are all wrong; reach for spacing, then a background shift, then a hairline, and only then a container.

## Components

**Belongs here:**

- Data grid with column resize, reorder, pin, and a column-visibility panel behind one control.
- Saved-view switcher in its own bar, with ad-hoc filters in a bar below it; full view state in the URL.
- Filter builder that shows its clause count (`3 filters`) so the user always knows what is hiding rows.
- Tri-state header checkbox; a selection bar that **replaces** the toolbar row at the same height so nothing jumps; an explicit second step for `Select all 2,813` after `Select all 50 on this page` — conflating them is how people mass-delete a database.
- Inline cell edit that changes neither row height nor column width: `box-shadow: inset 0 0 0 1px` for the ring (a `border` reflows), Esc reverts, Enter commits and moves down, Tab commits and moves right.
- Column-footer aggregations; sticky group headers (36px, 12px, muted, with a count).
- A record side-panel or peek that keeps the list alive behind it.
- Permission surfaces: role × capability **table** showing *effective* rights (`Read — inherited from Workspace member`), and an audit trail.
- Keyboard grammar (`j/k`, `x` to select, `/` to search, `⌘K`) with a discoverable shortcuts sheet.
- Virtualisation past ~200 rows with an honest scrollbar; per-user, per-view persisted pane sizes.

**Does not belong here:**

- A row of KPI stat cards above the table → the aggregate goes in the column footer. This is the archetype's loudest tell.
- Hero page titles with subtitles, gradients, coloured eyebrows → a 14–16px view name, or nothing.
- `hover:shadow-lg hover:-translate-y-0.5` on rows → a background alpha overlay at 120ms.
- Zebra striping → it fights the hover overlay and the selection fill and sets up a second rhythm competing with grouping. Use column rules if the table is genuinely wide.
- A modal for anything a side-panel can hold; a carousel anywhere.
- Toast-only feedback for a row write → the toast is 200px from the row that failed. Revert inline **and** toast.
- Infinite scroll on a dataset whose size you know → paginate or virtualise with a true count.
- A centred spinner over a table → it hides the column layout, which is half the information. Skeleton the rows instead.
- A full-page error that unmounts the shell → the nav is the user's escape route.
- Nav that pushes the content area, flyout mega-menus, six-step elevation scales, icon-only destructive buttons.

## States in this archetype

**Loading.** Keep the rail, the toolbar and the column headers live and interactive — the user can start setting filters while rows arrive. Skeleton only the rows, at the exact row height and column widths so nothing reflows on arrival. Start the shimmer mid-cycle (PostHog's `animation: skeleton 2s -1s infinite linear`) so a freshly-mounted skeleton isn't a dead frame. Under ~300ms, render nothing rather than a flash.

**Empty is four different screens and most products ship one.**
- *Zero data (first run)*: name the object, then two real actions. `No deals yet. Deals track revenue opportunities through your pipeline.` + `Create deal` + `Import from CSV`.
- *Filtered to zero*: keep the filters on screen and offer to clear them. `No deals match these 3 filters.` + `Clear filters`. Never show first-run onboarding here — the user has 4,000 deals.
- *Permission denied*: name the object, the missing permission, and who grants it. Never silently drop the rows from the list; silent filtering makes counts lie, and a lying count is worse than a 403. Grist gets the shape right by making Access Rules a destination with its own explanatory empty state and one enabling action.
- *Load failure*: inline in the content area, shell intact, with `Retry`. Grafana's not-found state keeps the 319px rail and the breadcrumb behind it — the nav is how the user recovers.

**Error.** Name the object, the failure and the recovery: `Couldn't save "Q3 pipeline" — the workspace is at its 50-view limit. Delete a view or upgrade.` A failed row write reverts the cell optimistically-written value **in place**, with the reason on the row.

**Too much.** Virtualise past ~200 rows. Show the true count beside the filtered count (`Showing 50 of 2,813`) — Attio's footer holding `2,813 count` while ten rows are visible is the pattern. Cap columns with a visibility panel rather than horizontal scroll into infinity. Never truncate a number; truncate a name and put the full value in a `title`.

## Motion budget

Colour and opacity. 120ms micro, 160ms standard, one ease-out curve. Nothing animates geometry — no transform, no height, no margin, and never `transition-all`, which animates properties you did not choose.

The frequency argument, quantified: a user scanning a 200-row list passes ~200 hover transitions per scroll pass, and does that a few dozen times a shift. At 300ms with a shadow and a translate, that is minutes of animation per day standing between the user and rows they are trying to read, plus a list that visibly flinches. At 120ms on a background alpha it is invisible, which is the goal — the row must not move, gain a border, or reflow. Paint hover as an overlay (`::before` at `inset:0`, alpha fill, opacity 0→1) so hovered + selected + focused can stack without fighting over one property.

Permitted: panel and popover open/close (160ms), skeleton shimmer, an indeterminate progress bar on a bulk job, a 160ms colour flash on a row that changed under the user (a push update). Forbidden: entrance animations on page load, staggered row reveals, number count-ups, chart draw-on, anything on scroll. Honour `prefers-reduced-motion` by dropping to opacity-only.

## Mobile

**This is a desktop product, and mobile is a different, smaller product.** A 40-column grid does not become mobile by stacking into cards; it becomes 40 unlabelled paragraphs. Ship the triage slice: notifications, approvals, search-to-record, comment, reassign, change status. Enter at the **record**, not the list — the list becomes a search result, not a workspace. No column config, no bulk edit, no view builder.

The degradation order between 1440 and 900px: drop the secondary/detail rail first (Linear takes its right sidebar 320 → 280 below 1280, then removes it), then the primary rail becomes a 64px icon rail, then the grid sheds optional columns in a priority order **you declare in the column config** — never by wrapping. Below ~900px, freeze the first column, allow horizontal scroll, and show a persistent column indicator. An honest tablet-and-up gate beats a broken responsive grid.

## Copy register

A competent colleague reporting facts. Sentence case everywhere including buttons and column headers. Verbs, not system nouns. Exact counts, always. Relative time under a day, absolute past it, with the absolute in the tooltip. No exclamation marks, no emoji, no celebration — these strings are read 400 times a week and anything with personality is irritating by Wednesday.

| Right | Beats |
|---|---|
| `No deals match these 3 filters.` + `Clear filters` | `No results found 📭` — which is also what you'd show on a permission failure, making it a lie |
| `You don't have access to Finance deals. Ask a workspace admin for the Deals: read permission.` | `Access denied` — names nothing, actionable by nobody |
| `Delete 12 deals? This can't be undone.` | `Are you sure?` — the count and the consequence are the entire content of the question |
| `Showing 50 of 2,813 · Last synced 4m ago` | `Showing recent items` — "recent" and "several" are how a table stops being trustworthy |
| `Import / Export`, `View settings`, `Add calculation` | `Data Management`, `Configuration Options` — Title Case, three nouns, zero verbs |

## The characteristic failure

It is called **the enterprise dashboard**, and it is recognisable in five seconds because every symptom is measurable. The Retool app-gallery template is the canonical specimen; a generator asked for "a security operations console" produced it, and it is what you will produce too unless you check.

Its anatomy, in order down the page:

1. **A 40px page title with a subtitle**, often over a coloured eyebrow (`SECURITY OPERATIONS` / `Dashboard` / `Every open CVE, ranked by risk…`). Three lines restating the nav item the user just clicked.
2. **Four KPI cards** at 140–152px tall, each with a lucide icon in a tinted rounded square, a 32px number, and a green `↑12%` delta. This is the single loudest tell. Nobody can tell you which column the number came from.
3. **A table with 44–68px rows**, produced by `py-4` on the cell plus `text-base` plus a `gap-4` inside the row, and no selection column.
4. **All-caps saturated status pills** on every row, shouting the same three words two hundred times.
5. **A border on everything** — card border + table border + row border + cell border + input border, all `1px solid #E5E7EB`, so nothing is emphasised because everything is.

**Self-diagnosis, in order of how fast it is to check:**

- Count visible data rows at 1440×900 with real data. Under 18 → the geometry is wrong. (Retool's template: **2**.)
- Measure the y-coordinate of the first data row. Over 180px → the chrome is wrong. (Retool's template: **760px**, 84% of the viewport.)
- Count stat cards above the table. Over zero → move them into the column footer, or delete them.
- Count distinct border colours on the screen. Over two → collapse to one hairline plus a 2px header rule.
- Count font sizes in the rendered DOM. Over six → the scale is decorative.
- Grep the stylesheet for `transition-all`, `translate-y`, `shadow-lg`, `duration-300` near a row selector. Any hit → the list flinches.
- Check whether any state is nameable and linkable. If a filtered view can't be saved or pasted into Slack, the tool will be replaced by a CSV export within a week.

The deeper diagnosis: **each of those five symptoms is a substitution of decoration for information.** The stat card substitutes for an aggregate anchored to its column; the tall row substitutes for the twenty rows it displaced; the giant title substitutes for the view switcher that would tell the user something they don't know; the border substitutes for the hierarchy that weight and colour would have carried. An interface built this way is not too pretty — it is carrying less information than the same pixels could, which in this archetype is the only thing that matters.

The rarer opposite failure is **unrationed density**: 22px rows, no grouping, no sticky headers, twelve columns at equal weight, no muted secondary text, everything at full contrast. That is genuinely hostile, and it is where the "density is user-hostile" folklore comes from. Density without hierarchy is a wall. The fix is never taller rows; it is one identifying column at full contrast, everything else muted, and group headers that let the eye rest.

## Signature decisions that fit here

- **Magnitude painted into the row.** Rill fills each leaderboard row to the value's share of total in a 6%-alpha accent behind the text, so rank *and* proportion read in one pass with no chart and no extra column. Generalise: any column whose comparative size is the question (spend, volume, error count) gets an in-row fill rather than a sparkline column.
- **The aggregation footer instead of stat cards.** Pin a footer row under the grid with `count` / `sum` / `avg` **in the column it describes**, and `+ Add calculation` under the rest. It removes the mapping step a KPI card creates, and it scales to five columns with no new layout.
- **Permission as a visible destination, not a settings leaf.** Grist puts `Access Rules` in the left rail beside `Raw data`. In a product where "why can they see this" is a weekly ticket, make effective permissions a first-class, inspectable view — role × capability, showing inherited rights, with a "view as this role" toggle.
- **A staleness clock, not a refresh button.** `Last synced 4m ago · Retry` in the toolbar, plus the time range in the URL, so a tab left open overnight describes its own untrustworthiness instead of quietly lying.
- **One structural rail encoding the exception.** A 3–4px coloured edge on each row for the single state the user's whole job is to spot (at-risk, over-SLO, unassigned, past-due), readable down a 200-row list without spending a column. **One** such signature — two compete and read as noise.

## Sources

- `https://play.grafana.org/a/grafana-lokiexplore-app/explore` — probed live 2026-09: body 14px/22px Inter `ls +0.15px` on `#111217`; **5,595** text nodes at 12px/18px vs **76** at 14px/22px; border `1px rgba(204,204,220,0.12)` ×178; radius 6px ×429; nav items on a 32px pitch; toolbar buttons 24px and 32px; inputs 32px.
- `https://play.grafana.org/d/000000012/grafana-play-home` — screenshotted: dashboard-not-found state with the 319px rail and breadcrumb intact behind it, two real recovery buttons.
- `https://templates.getgrist.com/doc/lightweight-crm` and `/p/acl` — probed and screenshotted live: `body{font-size:13px}` on the system stack; grid rows on a **23px** pitch (tops 127/150/173/196…); radii 3px ×102 and 4px ×56; controls 24–32px; and the Access Rules destination with its explanatory empty state.
- `https://ui.rilldata.com/demo/rill-openrtb-prog-ads/explore/auction_explore` — probed live: body **12px/18px** Inter; **120** leaderboard rows at exactly **22.0px**; one border colour (`oklab(0.922 0 0)`) ×44; controls 22/28/32px; radii pill for chips, 2–4px for controls; first data row at y=225 under a date + comparison + filter + view-tab stack; in-row magnitude fill.
- `https://atlassian.design/components/dynamic-table/examples` — probed live: rows on a **48px** pitch, `td padding: 4px 8px`, 14px/20px; `th` 12px/16px at weight 653; header rule **2px** `rgba(11,18,14,0.14)` ×74 against 1px ×25 in the body; buttons 32px; radius 6px ×343.
- `https://retool.com/app-gallery/security-operations-console` — screenshotted at 1:1 and pixel-measured: CVE rows on a **68.4px** pitch, first data row at **y≈760** of a 900px viewport (2 rows visible), four KPI cards, a 40px page title plus subtitle, all-caps `CRITICAL`/`OVERDUE`/`IN PROGRESS` lozenges. The negative control.
- `https://attio.com/platform/data`, `https://www.sigmacomputing.com/product` — screenshotted for grid geometry and for how the category talks about governance. Attio row pitch (36px), separator `#EFF0F0` and footer aggregates are carried from `references/enterprise-and-dense-b2b.md` rather than re-derived.
- `references/enterprise-and-dense-b2b.md` — PostHog (`--button-height-base: 30px`, `--button-padding-x-base: 6px`, `--scene-padding: .5rem`, skeleton negative delay), Linear (`.16s` background+color, `#ffffff05/08/0d/14` overlay ladder, 72px ID column), SLDS (`body{font-size:.8125rem}`, cells `4px 8px`, `thead th{font-weight:700}`), Geist's parallel solid + alpha ramps. Numbers cited unchanged for consistency across the corpus.
