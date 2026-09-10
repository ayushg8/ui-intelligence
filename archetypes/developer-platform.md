# developer-platform

**Evaluated:** 2026-09 · **Density:** compact in the app, comfortable in the docs · **Dark by default:** either — and the reason has to be operational, not aesthetic (see [Colour](#colour))

> A developer is blocked — a deploy failed, a webhook 400s, a query got slow — and your product is one of three surfaces they are triangulating between (terminal, editor, docs), so its only jobs are to not slow them down and to be honest about what is true right now.

## When this is the right archetype

The users write code. They arrive mid-task, usually from a terminal, usually because something broke or something shipped. They do not live in your UI the way a support agent lives in a ticket queue — they enter, answer one question, and leave, several times a day. Stakes are production: the actions here cost money, downtime, or a leaked credential. The defining structural fact is that this archetype ships **two products with one token file** — a dashboard and a documentation site — and they need different type scales, because a reference page is *scanned* and a guide is *read*. Everything visible in the dashboard also exists as an API call and a CLI command, and the interface is judged on whether it admits that.

- **Choose this over `technical-productivity`** when the user is passing through rather than living in the app. Linear's density comes from triaging 200 issues a day; here a user opens three deployments. A command palette is table stakes there and a nice-to-have here; a docs surface is mandatory here and absent there.
- **Choose this over `enterprise-dense`** when every resource has a public API. Attio and Retool serve operators with saved views, roles, and no terminal; that archetype has no docs product, no version selector, and no reason to render an identifier in mono. The numbers behind both calls are in the side-by-side table below — they are closer than they look, and the separation is structural.
- **Choose this over `premium-marketing`** for everything behind the login. The landing page is a separate surface with a separate scale that shares only tokens. One host, one guest: never let the marketing scale reach the dashboard.

## When it is the wrong one

- **OpenAI Platform, Anthropic Console.** API keys, usage charts, rate-limit tables, docs — every surface tell of this archetype. But the thing the user opened the tab for is the playground, and a playground is a streaming chat surface: `ai-product`, 16–17px body, composer at r12–28, per-token reveal. Only the docs are `developer-platform`, hosted as a guest.
- **Postman, Insomnia, TablePlus.** Identifier-dense and developer-shaped, but the user sits in them for four hours driving one object by keyboard. That is `technical-productivity`: two row heights, a command palette as table stakes, 0ms-in motion, and no docs surface at all.
- **Retool apps and internal admin panels.** No public API, no untrusted reader, no docs. `internal-utility`. A version selector and a `Copy for LLM` button on an internal CRUD page is costume.
- **Zapier, Make, Airtable automations.** Their users never type an identifier, so mono-as-machine-value carries no signal — you get the aesthetic with none of the meaning, and 13px rows the audience cannot read.
- **Stripe's own payout confirmation.** Stripe's *docs* are this archetype; the screen that moves money is `fintech-institutional`. A wire needs weight, a second look and an audit trail; a redeploy needs none of them and gets an undo instead.
- **Grafana on a wall-mounted TV.** Same product, different archetype at a different distance. Unattended and watched continuously is `data-terminal` — 11–12px, 20–24px rows, colour carrying data. This archetype assumes a human opened the page on purpose and will close it in ninety seconds.
- **A forty-minute conceptual guide** — "How TLS works", a book-shaped tutorial. That pane is `editorial`: wider leading, narrower measure, light ground. Ship it inside your docs with the reference scale switched off.

Applied wrongly, the specific breakages are: 12px mono in front of a user who never reads a stack trace; dark-by-default on prose read for an hour; and — worst — "show the structure, gate the payload" applied to a surface where the structure itself is the private data.

### Side by side with the three it is confused with

| | **developer-platform** | `technical-productivity` | `enterprise-dense` | `analytics-bi` |
|---|---|---|---|---|
| Body | app 13–14 · **docs 15–16/1.6–1.75 · reference 14/22** | 13, w510 | 13 / 18–19 | 13 chrome / 12 data |
| Data row | **41** single-line · 62 two-line · 61 live-tail | 36–40 content · 26–28 nav | 28–32 (22–24 machine) | 22–24 |
| Control | 28–32 app · **36 docs** | 28 inline / 32 standalone | 28 / 32 | 26–30 |
| Page title | app 20–24 w600 · **docs h1 32–36** | **17** w590 | 14–16 w600 | 16–20 w600 |
| Radius | 4 control / 6 container / **8 code block** | 6–8 row / **12–16 panel** | 4 / 6 | 4 / 6 |
| Dark separation | **1px border, four named steps** (`#222` · `#2a2a2a` · `#3a3a3a` · `#b4b4b4`) | **prefer no border** — a 7-point background step | one alpha hairline + one 2px header rule | one hairline; gridline one step lighter |
| Motion in / out | **150 / 200–300** | **0** / 150 | 120 / 160 | 120–150 / 180 |
| Mono | **a value type**, 12/16, one step under sans | rare | ID, log and code-valued cells | rare |
| Second surface | **docs, mandatory, its own type scale** | none | none | none |

**Read it honestly: on body size, control height and radius this archetype sits inside the noise of `enterprise-dense`.** Both are compact tools for people scanning tables of resources, and the same physics produces the same ramp. The difference lives in four places, each checkable in a screenshot:

1. **The second surface.** This is the only archetype in the corpus that ships two type scales out of one token file, because the docs site is part of the product: a reference page is *scanned*, a guide is *read*. Delete the docs and this archetype has no reason to exist apart from its neighbours. `enterprise-dense` has no docs product, no version selector, and no reason to set an identifier in mono.
2. **No selection gutter.** `enterprise-dense` earns a ~34px checkbox column, a tri-state header checkbox and an explicit `Select all 2,813` because its terminal action is *change these records*. Here the batch operation is a shell loop, so the table ships no multi-select, no bulk-edit bar and no saved views. If you are designing a selection model, you are enterprise-dense.
3. **Mono is a semantic, not a cell type.** There it marks a column. Here it marks a *string you can copy, diff or type*, which is why the mono scale runs one step below the sans scale and why a mono nav label is a defect rather than a taste.
4. **The row carries live state.** 41px against enterprise-dense's 28–32px is not laxity: the cell holds a status glyph, a quota meter (`▍7/4096`), a region and a duration, not a string. Row height follows what is in the cell.

**It shares the ~40px content row with `technical-productivity`; the difference lives in the shell, and in why each one refuses to animate a list.** There the row is a target the next keystroke acts on, so that product ships two row heights — 26–28px nav against 36–40px content — and a 17px page title, because a view visited sixty times a day is a locator. Here there is often no sidebar at all: a 48–56px top bar with a path-shaped scope switcher (`▲ / gravy-truck ⌄ / production ⌄`) replaces it, and the page title runs 20–24px because the user arrived from a terminal and has to confirm *which* resource they landed on before doing anything irreversible. Motion inverts for the same reason. `technical-productivity` animates 0ms in because the keypress is racing the frame; 150ms in is free here because the interaction is mouse-initiated and infrequent — but per-row animation is banned outright, because rows arrive on their own, hundreds a minute. Both archetypes refuse to animate a list: one because the user is fast, the other because the data is.

## Reference products

| Product | Why | The one thing to steal |
|---|---|---|
| **Stripe docs + API reference** | The only product shipping two body sizes for two reading modes in one system | Guides 16px/26px at ~59ch; API reference **14px/22px at ~72ch** with a pinned code column. Size the reference for scanning, the guide for reading. |
| **Vercel / Geist** | The most-copied dev token set, worth copying correctly | `gray-700` (56% L) and `gray-800` (49% L) are **identical in light and dark** — anchor mid-greys so secondary-text contrast doesn't flip with the theme. |
| **Axiom** (`play.axiom.co`, no login) | Densest legible dark UI measured, and the best token artifact in the set | Two parallel scales — sans 10/11/13/15, mono 10/12/14 — because mono needs to be ~1px smaller to read as the same size in the same row. |
| **GitHub Actions** | The canonical run/log/status vocabulary every CI UI is judged against | Three status glyphs that differ in **shape**, not just colour, and `Sign in to view logs` gating only the log bodies. |
| **Railway** | Best environment model in the category | The breadcrumb-shaped scope switcher plus a floating **`1 unapplied change · Details · Deploy ⌘⏎`** bar. Infra changes stage, then apply. |
| **Resend** | Cleanest small-surface docs and the sanest API-key vocabulary | Every key has a **name, a permission, and an optional resource restriction**, and per-key logs so you can revoke on evidence. |
| **Modal** | Best dark-first docs | Deprecations name the version inline: *"Prior to v0.73.82, this function was named `@modal.web_endpoint`."* |
| **Inngest** (few will name it) | Best SDK-scope switching and run-table conventions | A persistent **language `<select>` in the sidebar** that reskins the whole tree — separate from per-block package-manager tabs — and `No additional runs found.` at the end of a finite list. |

## The numbers

| | Value | Because |
|---|---|---|
| Body | **App 13–14px.** Docs prose 15–16px/1.6–1.75; API reference 14px/22px | Re-probed 2026-09-10: Vercel docs 16/27.2 GeistSans at 809px, Stripe guides 16/26 at 474px, Stripe reference 14/22 at 503px. Also Neon 18/27, Clerk 15/28. The app is chrome around data and must not compete with it; prose is the product on a docs page. |
| Dense/secondary text | **Mono 12px/16px; sans 11–12px** | Re-probed: Axiom's live-tail stream runs **552 of 577 visible text nodes at Berkeley Mono 12/16**; the datasets grid is where the one-step rule is actually visible, pairing 12/16 mono with 13/16 Inter *in the same row*. 16px leading at every size ≤13px keeps a wrapped log line from opening a gap. |
| Page title | App **20–24px w600**. Docs h1 **32–36px w500/600, ls −0.03em** | Neon 36/45 w500 ls −1.44px; Stripe *guides* 32 w700 — and Stripe's *reference* h1 is **24/32 w700**, the two-scale rule applied to headings. Vercel's docs h1 is **56px/56 w600 ls −3.36px** and wraps to four lines in its 381px column — the outer bound, and a marketing gesture that costs a viewport. |
| Row / list-item height | Resource-table header **40px**, single-line data row **41px**, two-line **62px**, live-tail log row **61px**; docs sidebar row **32–36px** | Re-probed on Axiom 2026-09-10: grid cells at `11px 8px` around 12/16 mono give 41px; the stream's `6px 10px` cells carry two lines and give 61px. 41px lands ~20 rows above the fold at 1440×900 — the number of log lines it takes to see a pattern. A table set *inside docs prose* is a different object and runs 48px (Vercel). |
| Control height | App **28–32px**; docs and marketing **36px** | Axiom button/input 28 at r4 and Primer `control-medium` 32, against Geist's **small 32 / default 36 / large 40** — 36px is what Vercel's own docs render, so "Geist button = 32" is the *small* size and copying it as a default is an accident, not a decision. The consumer 44px touch target is wrong on both surfaces; it makes the tool feel like a website. |
| Sidebar width | App nav 220–260px; **docs nav 260–300px**; right TOC 224–288px | 240 is too tight for `Managing tables, views, and data`; 360 steals the prose column. Cloudflare 300, Stripe 260, Modal 278, Clerk ~330. |
| Content max-width | Docs prose **60–75ch** (474–620px). App: **none** — tables run full-bleed | Stripe reference 503px ≈ 72ch, guides 474px ≈ 59ch. Vercel's 809px ≈ 95ch is the cautionary end. A log table capped at 1200px wastes exactly the columns you widened the window for. |
| Radius (control / container) | **4px control · 6px container · 8px code block**. Nothing at 12px except nav pills | Axiom 4, Geist 6, Primer 6. A 12px radius on a data container is the single loudest tell of generated UI in this archetype. |
| Border weight & colour | **Always 1px.** Light `#ebebeb` ×44 and `rgba(0,0,0,.08)` ×32 on one Vercel docs page; dark needs **four named steps** — Axiom `--border-faint #222` · `--border-muted #2a2a2a` · `--border-base #3a3a3a` · `--border-strong #b4b4b4` | Re-probed 2026-09-10. In dark the border is the only thing separating two panels, and those panels sit beside code blocks and status chips carrying their own backgrounds, so one value cannot serve divider, panel edge, hover and selection at once. The opposite call is also defensible and belongs to a different archetype: `technical-productivity` in dark prefers **no** border and separates surfaces with a 7-point background step. |
| Elevation | Borders and a **1px ring**, not shadows. Light surface delta 98%→100% L; dark **0%→4%** | Geist's legacy dark shadows collapse to `0 0 0 1px var(--accents-2)`. Measured: Geist's dark `--ds-background-100` is 4% L against a 0% page. Dark needs ~2× the luminance separation to read as the same elevation, and still needs the ring. Reserve real shadows for menus, popovers, modals. |
| Motion (micro / standard) | **150ms** hover/focus, **200ms** popover, **300ms** overlay, `cubic-bezier(.4,0,.2,1)` | Geist's own values. Cloudflare's sidebar link: `background-color .15s, color .1s`. |

The two scales as a direction spec, ready to copy:

```
Archetype:   developer-platform (app host, docs as a second surface, shared tokens)
Density:     app compact — 41px rows, 13px sans / 12px mono, 28–32px controls, 56px top bar
             docs comfortable — 16/26 prose at 65ch, 32-36px sidebar rows, 36px h1
Type:        app  11 / 12 / 13 / 14 / 16 / 20   (flat: the shell must not outshout the data)
             docs 14 / 16 / 20 / 24 / 36        (steep: one column needs landmarks)
             mono one step below sans; inline code in em; tabular-nums on sans numbers only
Neutrals:    15-step achromatic ramp — 12 steps below 50% L, 3 above. Borders 1px in 4 named steps.
Accent:      one, for: primary button, active tab underline, focus ring, docs links. Nothing else.
Semantics:   success / warning / danger / info as text+surface pairs; the 5th state (skipped,
             queued, cancelled) is a GLYPH SHAPE, never a 5th hue.
Radius:      4 control / 6 container / 8 code block. Never 12 outside nav pills.
Elevation:   1px border + ring. Light 98→100% L, dark 0→4% L. Shadows only for overlays.
Motion:      150 micro / 200 popover / 300 overlay, cubic-bezier(.4,0,.2,1). Nothing per-row.
Chrome:      path-shaped scope switcher (org / project / env ⌄) + tab row. Sidebar only for flat lists.
Theme:       three states — system / light / dark — with system honoured.
```

## Colour

**Neutrals are achromatic or nearly so.** Axiom's ramp is literally grey: `#0b0b0b #0d0d0d #111111 #191919 #222222 #2a2a2a #313131 #3a3a3a #484848 #606060 #6e6e6e #7b7b7b #b4b4b4 #eeeeee #ffffff`. The reason is not taste: syntax highlighting, log levels, diff green/red and chart series all have to sit on this ground, and a warm or blue-tinted neutral fights every one of them. Note the **distribution** — **twelve steps below 50% lightness, three above** (`#7b7b7b` at 48% is the last one below; `#b4b4b4`, `#eeeeee`, `#ffffff` are the whole light half). Dark UI needs many closely-spaced dark values — page, panel, recessed, four border steps, hover, selected — and only two or three text values. An evenly-spaced Tailwind ramp gives the opposite and is why generated dark dashboards have edgeless panels.

**One accent, and it is small.** Permitted: the primary button, the active tab's 2px underline, the focus ring, docs links. Forbidden: status (that's semantics), headings, icons in general, and the logo colour poured over surfaces. The accent competes with syntax highlighting for attention and loses.

**Semantics need four states plus a shape.** success / warning / danger / info, each a text colour paired with a dark surface for chips — Axiom: danger `#ff9592` on `#3b1219`, warning `#ffa057` on `#331e0b`, info `#70b8ff` on `#0d2847`, success `#3dd68c` on `#132d21`. Note where those come from: Axiom ships a four-part quad (`--text-` / `--bg-` / `--border-` / `--icon-alert-*`) for danger, warning and info only, and takes success from the plain green ramp (`--text-green` on `--background-green`). Alerts are three; status is four. Do not manufacture a `success` alert banner nobody needs. The fifth state — skipped, cancelled, queued — must be a **different glyph shape**, not a fifth hue: GitHub's hollow circle with a diagonal slash beside its filled check and filled ✕. Around 8% of male developers cannot separate your red dot from your green one.

**Dark by default is defensible here, for one real reason:** the surfaces on either side of yours — terminal and editor — are already dark, and a developer alt-tabbing between them thirty times an hour pays a real adaptation cost each time your page flashes white. That argument covers the **dashboard**, especially logs and traces. It does **not** automatically cover the docs, which are 16px prose read for twenty minutes, where light wins for most readers. So ship the switcher, and ship it as **three states — system, light, dark** — with system honoured, not a two-way toggle that ignores the OS preference the user already set. Resend puts the three as monitor/sun/moon icons at the foot of the sidebar; that position is right, because it is a preference, not navigation.

## Type

A neutral grotesque with real numerals: Inter, Geist, Söhne, or the system stack. Nothing with personality in the app — the personality budget belongs to the docs headings, where Railway's IBM Plex Serif `h1` and Fly.io's 17px/27.2 weight-325 grotesk both work because the *voice* backs them up.

**The two scales differ in shape, not just size.** The app scale is nearly flat — 11 / 12 / 13 / 14 / 16 / 20, a 1.8× range — because the shell must not out-shout the data inside it. The docs scale is steep — 14 / 16 / 20 / 24 / 36, a 2.6× range — because a docs page is one long column and needs landmarks you can find at scroll speed. Copying the docs scale into the dashboard is how you get a 32px page title over a 13px table.

Three weights: 400 / 500 / 600. Headings at 500–600 with **−0.02 to −0.04em** tracking above 28px, 0 below. Mono runs **one step smaller than sans** at the same optical position (Axiom 12 mono / 13 sans; Modal 14 mono / 16 sans) because monospace carries more ink per em.

**Mono is a semantic, not a texture.** It means: *this string is a machine value you might copy, diff, or type.* `ch_3MmlLrLkdIwHu7ix0snN0B15`, `re_1a2b…x9y0`, `actions/checkout@de0fac2e`, `9.67B`, `3650 days`, `2026-08-26.dahlia`. It does not mean "technical vibe." A mono nav label or mono `h1` burns the signal permanently — after that, the reader cannot tell an identifier from a label at a glance. The one earned exception is Supabase's uppercase-mono *section* labels (`ON THIS PAGE`), which read as system chrome rather than as content.

Inline code is sized in **em, never px** — Primer `0.9285em`, Vercel `0.9em` (14.4px inside 16px prose) — or its line-height is pinned to the paragraph's, as Prisma does at `13px/28px`. Otherwise a paragraph containing two code spans gets uneven leading. `tabular-nums` on every proportional-sans number; it is **redundant when the number is already in mono**, which is why Axiom's computed `font-variant-numeric` is `normal` everywhere.

## Layout and navigation

**Two shells, deliberately different.**

*App:* a 48–56px top bar carrying a **path-shaped scope switcher** — `▲ / gravy-truck ⌄ / production ⌄` — then a tab row for that resource's views (`Architecture · Observability · Logs · Settings`) with a 2px accent underline. The slash is doing work: it says an environment is *contained by* a project, which two side-by-side `<select>`s never communicate and which users constantly mis-set. Below that, the resource is full-bleed. A left sidebar earns its place only when there is a genuinely flat list of many resources.

*Docs:* 260–300px nav (with a `Filter sidebar /` input above the tree once it passes ~30 items), 60–75ch prose, 224–288px right TOC. Two scopes of switcher, and they are different components: the **SDK/language selector lives in the sidebar and reskins the whole tree**; the **package-manager tabs live on the individual code block** and navigate nothing.

**The primary object gets priority by occupying the column, not by being decorated.** On a deployment page the log is the page. Metadata goes to a rail. Do not open a dashboard of vanity metric cards in front of a user who came to check one build.

**Cards:** almost never. Rows for lists, tables for data, panels for grouped controls. The one case a card is right is a resource *list* where each entry carries live state a row cannot hold — a status glyph, a sparkline, a region, last-deploy time. A log line in a card is a bug.

## Components

**Belongs here:** path-shaped scope switcher · staged-change bar with the diff behind a `Details` link and the shortcut printed in the button · run/step list with shape-distinct status glyphs · live-tail log with a follow toggle and a fixed-width mono timestamp gutter · faceted filter rail showing counts **including zeros** · sidebar filter input · copy-on-click identifiers (full value, never truncated to uselessness) · inline quota meters in the resource table (`▍7/4096`) · time-range cluster with window steppers, zoom-out and its own refresh interval · three-state theme switcher · `Copy page` / `View as Markdown` / `llms.txt` · reveal-once API-key creation · the CLI equivalent printed beside the dashboard action · changelog entries with version, price, plan and named engineers.

**API keys, specifically** — this is the one flow where security constraints dictate the UI, so get it exactly right. The key is shown in full **once**, at creation, with a copy button and a sentence saying it will not be shown again; thereafter only prefix + last four (`re_1a2b…x9y0`), always in mono, always copyable in full nowhere. Every key carries a name, a permission scope, and an optional resource restriction, because a key without a name becomes un-revokable within a quarter — nobody dares delete `Key 3`. Test and live keys are distinguished **by prefix**, not by a badge you will forget to check, so the distinction survives being pasted into a terminal. Every key row links to its own request log, and "delete inactive keys" is a documented workflow rather than a cleanup afterthought. The create/rotate/revoke operations exist identically in the API and CLI, and the docs say which properties are dashboard-only.

**The log pane is a component with its own rules.** A fixed-width mono gutter for the timestamp; the message wraps rather than truncating, because a truncated stack trace is worthless; key names at full contrast and values dimmed (or the reverse — pick one and hold it) so `status: 500` is findable in a 200-character line; a 3–4px left rail carrying the level so severity is scannable down the column without a level column; follow-tail toggle that disengages the moment the user scrolls up and says so; and absolute timestamps to the second, because the user is correlating with their own logs in another window.

**Does not belong:** illustrated empty states in a data region (use the CLI command that creates the first resource) · onboarding steppers with progress dots · 44px rows and 12px radii · a toast as the only record of an infra change (stage it instead) · confirmation modals on reversible actions (use undo) · skeleton *shimmer* (use static skeletons at the exact final row height) · mono headings · relative timestamps on incidents and audit rows · a gated "interactive demo" behind a work-email form · unmodified Mintlify or Docusaurus defaults.

## States in this archetype

**Empty must never be louder than full.** Grafana renders `No data` at ~90px on a full-bleed blue gradient because its stat panel auto-fits text to the panel; the empty panel becomes the loudest thing on the dashboard. The timeseries panels on the same page get it right: muted, normal size, centred, ordinary background.

**Zero resources** is answered with a command, not an illustration: one paste-able CLI line in a code block with a copy button, package-manager tabs above it, expected output below. The user has a terminal open already.

**Filtered-empty is a different state from truly-empty** and must name the filter and offer to clear it. Conflating them sends people to the docs to solve a problem they created two clicks ago.

**Loading:** skeleton rows at exactly the final row height — 41px, not 40 — so the layout never jumps; a running build shows elapsed seconds counting, not a spinner; a log stream tails rather than blanking between polls.

**Error:** a stable machine-readable code you can grep, plus which of *your* resources it happened to, plus the next action. `Build failed for backend (production) — exit code 1 at step "Run pnpm build"`, with an `Annotations · 1 error` summary above the log so nobody scrolls 4,000 lines to find the red one.

**Too much:** facets with counts, a scoped search input, plain text-button filters (boxed selects out-weigh the rows they filter), and honest counts — GitHub writes `2,500+` rather than lying with a precise number. End a finite list with `No additional runs found.` plus a way back to the top and a way to re-check.

**Permission denied:** render everything the viewer may see and gate only the payload, with a specific label. `Sign in to view logs` beats `You do not have permission to view this page` by an enormous margin, and it is also your best marketing.

## Motion budget

150ms micro, 200ms popover, 300ms overlay, `cubic-bezier(.4,0,.2,1)`, `prefers-reduced-motion` honoured.

**May animate:** hover and focus (background and border colour only), menu and popover entry, drawer slide, the active tab underline, a chevron rotating on disclosure.

**Must not:** rows entering a live log stream, skeleton shimmer, number counters ticking up, chart draw-in on every refresh, page transitions in docs, anything that delays a copy button's confirmation.

The frequency argument is decisive here and settles most disputes: a tailing log emits hundreds of rows a minute. Any per-row animation is seen thousands of times per session, costs legibility exactly when the user is pattern-matching, and burns CPU on a machine already running a dev server. The same 200ms fade that is charming on a marketing hero is an obstacle here.

## Mobile

**Docs are fully mobile, and the type does not shrink.** Measured at 390px: Stripe's API reference is 14/22 at both widths, Cloudflare 16/28 at both, Clerk 15/28 at both. The type was already sized for reading — what changes is the number of columns. The three-column reference becomes one column and the code panel is **dropped, not stacked**. The sidebar becomes a **scope indicator** (`CHARGES ⌄` — where you are, tappable) rather than an anonymous hamburger. Hover-revealed affordances (anchor links, copy buttons) become persistent. LLM affordances survive; the AI-chat entry point does not.

**The dashboard mostly should not try.** A seven-column mono log table has no honest mobile form, and every product that attempts one ships a card list worse than a horizontally scrolling table. The defensible mobile scope is the 2am set: **status, alerts, and one-tap actions** — redeploy, rollback, acknowledge, rotate a key. Everything else says "open on desktop", which developers accept without complaint. One caution, re-measured 2026-09-10 on a 390×844 iPhone profile: Stripe's *guide* pages report `window.innerWidth: 980` — they never enter a mobile layout at all, they render at 980 and scale. Its *API reference* on the same device reports 390 and holds 14/22. The reference was designed for the phone; the guide was not. If Stripe ships that, check yours.

## Copy register

A competent colleague writing a commit message. Declarative, present tense, no adverbs, no exclamation marks, a number wherever a number exists. One noun per concept, forever — synonym drift ("project" in the nav, "app" in the docs, "workspace" in billing) is the fastest way to make a technical product feel unowned.

- `failed 3 weeks ago in 3m 14s` — outcome, when, how long, no labels. Beats `Build unsuccessful`.
- `Build failed for backend (production) — exit code 1 at step "Run pnpm build"` — beats `Something went wrong!`, which names no resource, no code, and no action.
- `Prior to v0.73.82, this function was named @modal.web_endpoint.` — beats `This method has been renamed.`
- `You will not be able to view this key again. Copy it now.` — beats `Keep your API key safe!`, which is advice instead of information.
- `No additional runs found.` — beats an infinite spinner, and beats `That's everything!`.

## Signature decisions that fit here

Pick **one**. Two compete and read as noise.

1. **The staged-change bar.** Field edits accumulate as a pending diff and apply in a single named deploy — `↻ 1 unapplied change · Details · Deploy ⌘⏎` — instead of firing a save, a toast and a deploy per field. This is `terraform plan` rendered as UI, and it is only right where the change costs money or downtime; staging a theme preference is bureaucracy.
2. **Quota as a bar meter inside the resource table.** `▍7/4096` in the Fields column, current value at full contrast, limit dimmed. The limit lives where the resource does instead of on a billing page the user has to remember exists.
3. **A fixed-width mono time gutter on the log stream.** Timestamps form a hard left column at a constant width while messages wrap freely to the right, so the eye never has to re-find the edge while scanning three hundred lines.
4. **The CLI equivalent printed under every destructive dashboard action**, in the exact form you would paste. The dashboard teaches the CLI, and the second time the user does it they do not open the dashboard at all — which is the correct outcome.
5. **A request-log link on every API-key row.** Revocation becomes a decision made from evidence about which key is noisy, rather than a guess followed by an outage.

## The characteristic failure

**A marketing site wearing infrastructure's clothes.** The look is imitated and the logic is absent. Nine of the ten tells are visible in a screenshot, so an agent can run this on its own output before anyone else sees it.

**On the dashboard screenshot alone, no source access:**

1. **Eyedrop four surfaces — page, panel, hovered row, border.** Fewer than six distinct greys below 50% lightness and the ramp is fake. The giveaway triple is `#0f172a` page, `#1e293b` card, `white` + `gray-400` text: panel edges vanish, hover has nowhere to go, every surface floats at one depth. Axiom's distribution is twelve steps below 50%, three above.
2. **Divide the largest text in the shot by the smallest.** Above ~2× and you have pasted the docs scale into the app — a 32px page title standing over a 13px table. The app ramp is 11/12/13/14/16/20, a 1.8× range; the 2.6× ramp belongs to the docs, where one long column needs landmarks.
3. **Measure the corner radius of the largest container.** 12px or more on a data panel is the loudest single tell in this archetype. The ceiling is 6px, 8px is for code blocks, and 12px is legal only on a nav pill.
4. **Count the mono strings that are not machine values.** One mono nav label, button or `h1` spends the signal permanently, and the real identifiers — now indistinguishable — end up set in Inter.
5. **Read every timestamp in the frame.** `about 2 months ago` on an incident row means `formatDistanceToNow` is doing all the work. Relative time is for what just happened; audit rows get `18 Nov 2024`; incidents and runs get `Sep 9, 2026, 1:09 PM` with an explicit timezone control; durations get `3m 14s`, never `194 seconds`.
6. **Look for one version string** — API version pinned in the header (`2026-08-26.dahlia`), SDK version in the install snippet, `Last updated Aug 25, 2026` on the docs page, a version named in a deprecation note. Zero visible versions reads as a demo of a product rather than a product.
7. **Look for one command.** No `$`, no `npx`, no CLI equivalent beside the destructive action, no note saying which properties are dashboard-only: developers conclude there is no CLI and stop evaluating.
8. **Look at the empty region.** `No data` set larger than any real value on the same screen (Grafana's auto-fitting stat panel does it at ~90px), or a 300px cartoon inside a data table, means the empty case was designed after the full one instead of alongside it.
9. **Look for the gate.** A work-email form over a blurred screenshot signals a sales motion, which is precisely what this archetype's users are scanning you for. Axiom and Grafana let strangers drive the real product.

**Three greps if you have the source:**

- **`box-shadow` on a dark surface.** `0 4px 12px rgba(0,0,0,.1)` on `#111` is invisible; the card simply has no edge. Dark elevation is a 4% luminance lift plus `0 0 0 1px`.
- **One `prose` class serving both the guide and the API reference.** 16px/1.75 on a reference page makes it ~40% longer than it needs to be and buries the parameter three viewports down.
- **Framework fingerprints.** Fractional type sizes (`14.25px`, `13.125px`) mean nobody touched the Docusaurus base. 36px sidebar rows plus 12px radius pills plus `paperMono` mean unmodified Mintlify — three products in this category are currently interchangeable for exactly that reason.

## Sources

Loaded at 1440×900 (390×844 where mobile is cited) on 2026-09-09, with Axiom, Vercel and Stripe re-probed on 2026-09-10; screenshots captured and viewed, computed styles and custom properties extracted with a Playwright probe.

- `https://play.axiom.co/axiom-play-qf1k/datasets` and `/stream/sample-http-logs` — logged-out product. **Re-probed 2026-09-10:** 1,019 custom properties resolve on `:root`, 503 of them declared in `:root` rules on the datasets route and 527 on the stream route — one artifact, two counting methods, and `references/developer-platforms.md` quotes the computed count; the 15-step ramp resolves verbatim `--gray--1 #0b0b0b` → `--gray-13 #ffffff` (twelve steps below 50% L); `--border-faint #222` / `--border-muted #2a2a2a` / `--border-base #3a3a3a` / `--border-strong #b4b4b4`; alert quads for danger/warning/info only, success from `--text-green #3dd68c` on `--background-green #132d21`; grid header row 40px, single-line 40.9px, two-line 62px, cells `11px 8px`; live-tail rows 61px, cells `6px 10px`, 552 of 577 text nodes at Berkeley Mono 12/16; buttons 28px r4; page `#111111`; `font-variant-numeric: normal`.
- `https://vercel.com/docs/deployments` — **re-probed 2026-09-10, light and dark:** 383 root properties, `--geist-radius: 6px`, `--ds-motion-popover-duration .2s` / `--ds-motion-overlay-duration .3s`, `--ds-shadow-border-base: 0 0 0 1px #00000014`, space ladder 4→256. `--ds-gray-700` (56% L) and `--ds-gray-800` (49% L) are **byte-identical in both themes**; `--ds-background-100` is 4% L in dark. Measured h1 56/56 w600 ls −3.36px in a 381px column, h2 24/32 w600, prose 16/27.2 at 809px, code GeistMono 16/24 in an r8 wrapper, inline code 14.4px on `#f2f2f2` r4, controls 36px ×6 / 32px ×4 / 28px ×2 all at r6, radii 6px ×150 / 4px ×20 / 8px ×16, borders `#ebebeb` ×44 and `rgba(0,0,0,.08)` ×32, sidebar rows 32px.
- `https://neon.com/docs/guides/nextjs` — probed: prose 18px/27 ls −0.45 Inter at 688px ≈ 72ch on `rgb(73,75,80)`; h1 36/45 w500 ls −1.44; GeistMono code 14/24, inline 14/16.8 r4; 34px sidebar rows; `llms.txt` in the nav; numbered right-rail TOC used as a progress checklist; `Copy page ⌄`.
- `https://docs.stripe.com/api/charges/object` and `/payments/quickstart` — **re-probed 2026-09-10:** reference prose 14/22 at 503px `rgb(26,44,68)` against guide prose 16/26 at 474px `rgb(60,66,87)`; reference h1 24/32 w700 against guide h1 32 w700; JSON panel Source Code Pro 14/18.2 at 501px; inline code 11.9/20 w500; radii 4px ×212 / 8px ×114 / 6px ×28; one border colour `#d4dee9` ×150. Plus `Ask about this section / Copy for LLM / View as Markdown`, API version `2026-08-26.dahlia` pinned in the header, `Show child attributes` progressive disclosure, `Expandable` field badges.
- `https://github.com/vercel/next.js/actions/runs/32617336090/job/97140065787` — logged-out job page: three shape-distinct status glyphs, full action refs at full SHA length, `failed 3 weeks ago in 3m 14s`, collapsed `Annotations / 1 error`, `Sign in to view logs` gating only the log bodies.
- `https://www.cloudflarestatus.com/` — `Identified` amber pill on a tinted card for active incidents vs. a green check with no pill for `Resolved` (visual weight descending with severity), absolute `Sep 9, 2026, 1:09 PM` timestamps, `🌐 Local time ⌄` selector, maintenance titled `AMS (Amsterdam) on 2026-09-09`.
- `https://resend.com/docs/dashboard/api-keys/introduction` — key vocabulary (name / permission / optional domain restriction, per-key logs, `Delete inactive API keys` as a first-class workflow, "other properties can only be edited in the Dashboard"), monitor/sun/moon theme switcher at the sidebar foot, three docs modes as top-level tabs.
- `https://modal.com/docs/guide/webhooks` — dark-first docs, green unlined prose links, `Beta` sidebar pills, `Copy page ⌄`, three-level right TOC, the version-pinned deprecation note.
- `https://play.grafana.org/d/aynhtvb/agent-observability` — the time-range cluster (`« 🕐 Last 30 minutes ⌄ » 🔍− ↻ Refresh 30s ⌄`), template-variable filter row, and the oversized `No data` stat-panel failure at ~90px on a full-bleed gradient.
- `https://val.town/x/stevekrouse/reactHonoStarter/code/main.tsx` → 404 — `Not found` / `This val could not be found.` / a single `🏠 Home` action: names the missing noun, one primary action.
- Cross-checked against `references/developer-platforms.md` (2026-09), which carries the full measurement tables for Cloudflare, Clerk, Prisma, Railway, Upstash, Turso, Convex, Fly.io, Supabase, Inngest and the Geist/Primer token sets cited above.

## Differentiation pass (2026-09)

Compared against `technical-productivity`, `enterprise-dense` and `analytics-bi` — the three neighbours that share "compact" with this file and are the plausible substitutions for it. (`data-terminal`, `internal-utility`, `ai-product` and `premium-marketing` are cited in the boundary bullets; the first two have no file yet.)

**Pushed apart.** Added a side-by-side numbers table and stated the two overlaps honestly instead of implying separation that the numbers do not support. Body size, control height and radius are inside the noise of `enterprise-dense`; the difference is named as four screenshot-checkable things — the second surface (docs, two type scales from one token file), the absence of a selection gutter (the batch operation here is a shell loop, so there is no multi-select, no bulk-edit bar, no saved views), mono as a semantic rather than a cell type, and a 41px row because the cell holds live state rather than a string. The ~40px content row is shared with `technical-productivity`; the difference is the shell (top-bar scope path against a two-height sidebar, 20–24px page title against 17px) and the inverted motion argument — both forbid animating a list, one because the user is fast, the other because the data is.

**Re-probed live (Playwright, 1440×900 and 390×844, 2026-09-10).** `play.axiom.co` (datasets + stream), `vercel.com/docs/deployments` (light and dark), `docs.stripe.com/api/charges/object` and `/payments/quickstart`. Seven corrections:

1. **Row heights were wrong.** The table header is **40px**, not 38; the single-line data row is **40.9px**, not 40; two-line 62px; the live-tail log row 61px. The cell padding was also conflated: the datasets grid is `11px 8px`, only the stream is `6px 10px`. Skeleton rows now say 41px.
2. **"Control height 32px default, citing Geist" was a misread.** Geist ships small 32 / default 36 / large 40, and Vercel's own docs render 36px ×6 against 32px ×4. The row now reads 28–32 in the app (Axiom 28, Primer `control-medium` 32) and 36 on docs and marketing surfaces. `craft/forms-craft.md` already had the correct 32/36/40 and now agrees.
3. **The grey ramp splits twelve/three, not eleven/three.** `#7b7b7b` is 48% L and is the last step below the midpoint. `references/developer-platforms.md` said eleven/two and has been corrected.
4. **Dark borders are four named steps, not three** — `--border-faint #222`, `--border-muted #2a2a2a`, `--border-base #3a3a3a`, `--border-strong #b4b4b4`. The old text also mislabelled `#3a3a3a` as "emphasis" when it is Axiom's *base*.
5. **The semantic set is not symmetric.** Axiom ships four-part alert quads for danger, warning and info only; success comes from the plain green ramp. The file said all four were alert quads.
6. **The mono-density figure was understated and misattributed.** The stream page runs 552 of 577 visible text nodes at Berkeley Mono 12/16 (the file said 240); the 12-mono-beside-13-sans pairing that proves the one-step rule is in the datasets grid, not the stream.
7. **Three Axiom token counts were in circulation** — 527 here, 1,019 and 577 in `references/`. Two of them are right and measure different things: **1,019** custom properties resolve on `:root`; **503** are declared in `:root` rules on the datasets route, **527** on the stream route. Both files now say which count they quote.

Verified unchanged and now cited with counts: Vercel `--geist-radius 6px`, popover `.2s` / overlay `.3s`, `--ds-shadow-border-base`, h1 56/56 ls −3.36px in a 381px column, prose 16/27.2 at 809px, inline code 14.4px on `#f2f2f2`; `--ds-gray-700`/`-800` byte-identical across themes (the headline steal — confirmed rather than assumed); Stripe reference 14/22 at 503px against guides 16/26 at 474px, and the reference h1 24/32 against the guide's 32, which extends the two-scale rule to headings.

**Mobile claim sharpened.** Stripe's guide pages do not merely overflow at 390px — they report `innerWidth: 980`, meaning they never enter a mobile layout. The API reference on the same device profile reports 390 and holds 14/22.

**"When it is the wrong one" rewritten.** Every bullet is now a named product that superficially fits and specifically breaks: OpenAI Platform / Anthropic Console, Postman / Insomnia / TablePlus, Retool admin panels, Zapier / Make / Airtable, Stripe's own payout screen, Grafana on a wall-mounted TV.

**Characteristic failure hardened.** Restructured into nine tells readable from a dashboard screenshot with no source access — eyedrop four surfaces and count greys, divide largest text by smallest (over 2× means the docs scale leaked into the app), measure the largest container's radius, count non-machine mono strings, read every timestamp, find one version string, find one command, check the empty region, check for a gated demo — plus three greps for when the source is available.

**Corpus consistency.** Four edits outside this file. `references/developer-platforms.md`: the ramp distribution (eleven/two → twelve/three), the Axiom border row (it listed `#313131` as the "strong" border step — that is `--gray-05`, not a border token; the four real ones are faint/muted/base/strong), the Axiom table row heights, and the "Control height: 32px" constant. `archetypes/technical-productivity.md` and `archetypes/enterprise-dense.md`: the `developer-platform` column of their side-by-side tables (row 40 → 41, control `32 / 28` → `28–32 app · 36 docs`). `craft/forms-craft.md` and `craft/tables-dashboards-data.md` were checked and already agreed — forms-craft is where the correct Geist 32/36/40 ladder already was, and tables-dashboards-data's 48px Vercel row is a table set inside docs prose, now labelled as such here rather than read as a contradiction.

**Cut.** The `data-terminal` "choose this over" bullet — the new Grafana-on-a-wall entry says it better, because the thing that changes the archetype is the viewing distance and the absence of a person, not the product; and the Stripe reference measurements that appeared twice inside one Sources line.
