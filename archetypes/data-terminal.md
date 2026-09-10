# data-terminal

**Evaluated:** 2026-09 · **Density:** very compact · **Dark by default:** yes — for a measurable reason, not a mood. At 11–12px the up/down pair has to clear AA against the ground, and on a dark ground you can raise lightness without surrendering chroma: Hyperliquid's bid/ask pair measures **5.73:1** and **6.12:1** on `#0f1a1f`; TradingView ships the same two meanings on white at **3.57:1** and **3.90:1**, below AA for the 11px text it paints them on.

> Someone is watching a screen they did not open and will not close, waiting for the one change in ten thousand that requires them to act inside a minute.

## When this is the right archetype

The users are traders, on-call SREs, NOC and dispatch operators, exchange and broadcast ops. The screen is **ambient**: it runs on a second monitor or a wall for an entire shift, and for most of that shift it is being watched with peripheral vision rather than read. Data arrives by push; the user does not fetch it. There is no queue to empty and no session to end — the market does not close and the pods keep restarting. Expertise is total: the operator has seen this screen ten thousand times and knows what nominal looks like, which means the interface's only real job is **deviation detection** and its two costs are latency-to-noticing and false alarms. An operator who has learned to ignore your red is a worse outcome than one who never had red.

- **Choose this over `enterprise-dense`** when the data arrives without being asked for and the user mostly does not write. A system of record needs selection models, optimistic writes, undo, bulk edit and permission surfaces, and 28–32px rows to hold them; a terminal is read-mostly with a narrow, violent write path (place order, ack, silence, reroute). The moment rows are routinely edited, go there — 19px rows and no confirmation step stop being generous and become a liability.
- **Choose this over `analytics-bi`** when the question is *what is happening right now*, not *what happened and why*. A BI session ends with an answer someone screenshots into a deck and is allowed to take four seconds to compute. A terminal's contract is a fixed cadence that never ends, which is why its whole apparatus — live edge, tick flash, connection state, staleness clock — has no equivalent there.
- **Choose this over `technical-productivity`** when there is no zero to get to. Linear and Superhuman are shaped by triage-to-empty: a keyboard grammar for disposing of items. Nothing here gets disposed of; the feed outlives every operator on it.
- **Do not choose it on refresh interval alone.** Under ~60s of expected staleness you are in this file. Over ~5 minutes you have a dashboard, and every mechanism below is dead weight.

## When it is the wrong one

- **Executive and ops dashboards checked once or twice a day.** They look like terminals in a screenshot and are not: nobody is watching at 3am, so the alarm design is theatre, and 12px on a screen consulted twice a day is illegible for no throughput gain. That is `analytics-bi`.
- **A "live" tab inside an analytics product** (live events, realtime users). One live pane inside an `analytics-bi` host. Guest archetype, one pane; it does not get to reset the shell's density or palette.
- **Patient monitoring and anything where an alarm has statutory meaning.** IEC 60601-1-8 prescribes alarm priorities, their colours and their audible tone patterns for medical electrical equipment; you do not get to invent a nicer scheme. Take the geometry, take none of the alarm semantics, and see `healthcare-clinical` for the write patterns.
- **Anything a customer sees.** A public status page is not a NOC display: 16px, plain language, named components, `institutional-civic` register. Density here signals "for insiders" to exactly the audience that must not feel excluded.
- **Consumer finance in terminal costume.** If the user checks a portfolio three times a day on a phone, candlesticks and a depth ladder are cosplay. `fintech-consumer`.
- **Any screen where the wrong action is unrecoverable and rare.** Terminals earn their lack of confirmation dialogs through frequency and undo windows. A once-a-quarter irreversible action gets a `fintech-institutional` confirm step even inside a terminal shell.

## Reference products

| Product | Why | The one thing to steal |
|---|---|---|
| **Hyperliquid** (`app.hyperliquid.xyz/trade`) | A fully live, logged-out, probeable trading terminal — the only one in this set that a machine can measure end to end | **327 of 335** text nodes at 12px; order book on a **25px pitch / 23px rows**; `font-variant-numeric: lining-nums tabular-nums` on every numeric cell; and `transition: all 0s` on the rows that update fastest |
| **tar1090 / ADS-B Exchange** (`globe.adsbexchange.com`) | Nobody names it; it is the density floor of the whole corpus, running 24/7 on real ops screens | **19.4px row pitch** at 13px with **1px** cell padding — and altitude rendered as one continuous colour ramp with a printed legend, plus ▲/▼ beside the number so climb/descent never depends on hue |
| **Grafana** (`play.grafana.org`) | The panel grid, publicly probeable | **8px gutter**, **40px** panel header at 14px w400 in the *normal* text colour, 10px radius, one border `rgba(204,204,220,0.12)` — and one text colour at two alphas (`1.0` / `0.65`) instead of a second gray |
| **Kibana Discover** (`demo.elastic.co`) | The log-search terminal, and the best argument for monospace anywhere in this corpus | **1,098 of 1,397** text nodes in Roboto Mono, **1,173** at 12px — and field names at w700 against values at w400 in the same face and size, so weight alone is the key/value delimiter |
| **TradingView** | The tick flash, done at the only scale that works | The flash is scoped to **the digits that changed**, not the cell and not the row. Also the contrast counter-example: `#089981`/`#f23645` on white is 3.57:1 / 3.90:1 |
| **Grafana Alerting** (`/alerting/list`) | Alarm state modelling | Four states named after the domain — `Firing` / `Pending` / `Recovering` / `Normal` — each carrying a **distinct glyph**, with the label text left neutral at 12px muted. Colour is in the icon, not the sentence |
| **Prometheus expression browser** (`demo.promlabs.com`) | The honest shape of a query-first terminal | One mono expression bar as the primary control, `Table / Graph / Explain` tabs under it, and resolution and end-time as *explicit* controls rather than hidden auto-magic |
| **Bloomberg Terminal** | The archetype's origin, and **not measurable** — bloomberg.com serves a bot challenge and the terminal itself is licensed software on leased hardware | What is worth taking is structural and documented, not visual: a persistent command line where a mnemonic + `<GO>` replaces navigation entirely, and four independently-scoped panels on one screen, each with its own security and its own time base |

## The numbers

| | Value | Because |
|---|---|---|
| Body | **12px** / 15–18px, tracking 0 | Measured as the shipped consensus across four unrelated products with nothing else in common: Hyperliquid 327/335 nodes, Kibana 1,173/1,397, Grafana's data plane 12px/18px, tar1090 13px. Do not defend it with ergonomics you have not measured — defend it with the row count it buys, and ship an operator-controlled density/zoom setting, which is also how a wall display gets legible (the display is scaled up; the *ratio* of rows to screen is what you are designing) |
| Dense/secondary text | **11px** for column headers, units, IDs and axis labels | The header is read once per session and the value is read continuously; dropping the label a step is how the value gets to be the loudest thing in the cell without going up in size |
| Page title | **None.** A 12–14px view name in the toolbar, or nothing at all | Nobody is navigating. The operator has had this pane open since the shift started; a title is 40px of a wall display spent restating what the pane has always shown. Grafana's Play home spends its most valuable panel on a welcome card, and its Logs Drilldown screen spends ~300px of a 900px viewport on two dismissible banners and starts the log table at y≈600 — measure yours before assuming you're better |
| Row / list-item height | **19–25px** — 19.4px (tar1090, 1px cell padding, machine data), 23.8px (Grafana table), 25px (Hyperliquid order book) | The row is multiplied by every row on the wall. At 1440×900 with a 48px chrome budget: 19px → **44 rows**, 25px → 34, 32px → 26, 48px → 17. On a 2560×1440 wall at 100%, 19px rows hold ~70. Pick the tier from what is in the cell: pure numerics 19–21, numerics plus a glyph or a depth fill 23–25 |
| Control height | **24–28px** in-pane, **32px** for the global time-range/refresh bar only | Grafana's toolbar buttons measure 24px and 32px; its inputs 32px. Controls sit above 20px rows — a 40px button over a 20px row makes the chrome outweigh two rows of data |
| Sidebar width | **0.** A 48–56px icon rail if you must; a **240–360px data rail** only if it holds a table (tar1090 docks its aircraft list over the map) | Grafana's 319px tree rail is the wrong instinct carried in from `enterprise-dense`. The operator lives in 3–6 views and reaches them by keystroke or by pop-out window, not by browsing a tree |
| Content max-width | **None, ever.** Full-bleed to the pane edge, and every pane individually pop-out-able to its own window with its state in the URL | The layout is a multi-monitor problem, not a page problem. A capped measure throws away the exact columns the operator bought the second monitor for |
| Radius (control / container) | **0–4px controls / 6–10px panels** (tar1090 2–3px, Grafana 6px ×429 and 10px panels, Hyperliquid 8px) | 12px+ on a 24px control eats horizontal room and reads consumer. Radius above the panel level is the fastest visual tell that a dashboard was styled rather than instrumented |
| Border weight & colour | **One hue at two or three alphas**, expressed over the surface: `rgba(204,204,220,0.12)` default, `0.20` for inputs and popovers, `0.08` for internal splits (Grafana's shipped set) | Alphas compose over the ground, a raised panel, a selected row and a colour-filled cell alike. A solid gray is correct on exactly one of those, and a terminal has all four on screen at once |
| Elevation | **None in-plane.** A panel is `+0.04 L` over the ground plus a 1px border (Grafana: ground `#111217` L 0.183 → panel `#181B1F` L 0.221). **One** shadow, for the command palette and menus | A shadow says "this floats above the page". Nothing in a monitoring plane floats; everything is coplanar and simultaneously true |
| Motion (micro / standard) | **0ms on the data plane.** 120ms on chrome hover/focus/menus. One exception: a **300–600ms** decaying change flash | Hyperliquid's order book rows carry `transition: all 0s`, measured. At a 10Hz feed a 200ms transition leaves every row permanently mid-animation, which reads as blur rather than as change |

**How much smaller than `enterprise-dense`:** row height ×0.65 (32 → 20), body ×0.92 (13 → 12), control height ×0.85 (28 → 24), page padding ×0.5 (12 → 6), panel gutter to a flat 8px, and the page title to zero. **The single check:** freeze the feed and count rows visible at 1440×900. Under 30 for a list-shaped terminal, the geometry came from a component library.

## Colour

**Colour is the data channel, and everything else has to live without it.** That is the entire colour policy and it is a budget, not a taste: every hue spent on a nav item, a panel header, an icon in a tinted square or a "brand moment" is a hue that can no longer mean something on the wall. Nav, panels, borders, labels, buttons and icons are neutral. Only values carry hue.

**Neutrals: not black.** `#111217` (Grafana, L 0.183), `#0f1a1f` (Hyperliquid, L 0.210), `#242424`/`#313131` (tar1090). Pure `#000` under 12px light text halates, and you need at least two steps *below* the panel surface for the ground and a sunken well. Keep chroma under ~0.02 so data colour reads against it. Tint the **text**, not the ground, if you want warmth: Grafana's `#ccccdc` is `oklch(0.850 0.022 286)`, and every muted variant is that same colour at `0.65` alpha rather than a second gray — one text colour, two alphas, is the correct count here.

**Hue has exactly four jobs.** (1) *Polarity* — up/down, in/out, bid/ask. (2) *Magnitude* — one sequential ramp, monotonic in lightness (tar1090's altitude ramp). (3) *Severity* — the alarm ladder. (4) *Series identity* in charts (five max; use the IBM CVD-safe set from `craft/color.md`, never the Tailwind rainbow). If all four are on one screen you have a collision: give magnitude the ramp, give severity the only saturated **fills**, and let polarity be text colour only. Measured: Hyperliquid colours the *price* column red or green and leaves size and total in neutral `rgb(210,218,215)` — the row is not a mood, one column is a direction.

**Alarm design is the part everyone gets wrong.**
- **Reserve the alarm colour.** Red must appear **zero** times in the nominal state. If a normal screen has red on it for a chart series or a logo, the operator's red-detector is recalibrated to ignore red by Wednesday.
- **All-green is the same failure.** Grafana's Kubernetes home paints four fully saturated green tiles for the all-clear, making "nothing is wrong" the loudest object on the screen. A terminal at rest should look almost monochrome; the absence of colour *is* the all-clear.
- **Severity is ordinal, not categorical**, and needs a second channel: hue plus glyph, or hue plus position in a fixed rail. Strip the colour from your screenshot and the priority order must survive.
- **Never blink.** Motion earns attention exactly once; a blinking row in a 400-row list is a strobe and above 3 flashes/second it is a WCAG 2.3.1 failure. One-shot flash on arrival, then hold a static state.
- **Four alarm states, not two:** unacked, acked, cleared, suppressed. Silence must have an expiry and a visible receipt — `Silenced by mkr until 14:00 UTC · 47 suppressed` — because suppression nobody can see is how outages get missed, and an alarm that cannot be silenced gets muted by taping over the monitor.

**Dark by default, with the contrast argument above** — but the theme is an *operator setting*, not a brand decision, because control rooms with daylight glare need the light variant. Re-pick the data hues for each theme rather than inverting: the green that measures 5.73:1 on `#0f1a1f` is 3.57:1 on white, and a polarity pair that fails AA in one theme is a defect, not a preference.

## Type

One neutral grotesque for chrome and **a real monospace for the data plane** — this is the archetype where mono is the body text, not an accent. Kibana Discover renders 79% of its text nodes in Roboto Mono. Mono earns its place on log lines, IDs and hashes, timestamps, query text, and any column where digits change in place; it does not earn it on labels, nav, prose, or a numeric table that already has tabular figures — a monospace forces every glyph to the width of the widest one, so a nine-column numeric grid pays for the letters it does not contain.

**The scale is nearly flat and deliberately so:** `11 / 12 / 14`, plus one 28–40px slot for the single hero metric a panel is allowed (Grafana's stat panel is 40px/48 w500). Everything between 14 and 28 is unused. Hierarchy is carried by weight, colour and position, because size contrast costs rows.

`font-variant-numeric: lining-nums tabular-nums` is **not optional** and this is the archetype where proportional digits are a data error rather than a blemish: a price that shifts horizontally as it updates manufactures an apparent movement that is not in the data. Hyperliquid sets it on every price cell. Keep tracking at 0 through numeric columns so digits sit on their tabular grid, right-align every magnitude, left-align identifiers.

Weights 400/500/700. Kibana's w700-vs-w400 mono pair does the work a colon or a colour would otherwise do. Never truncate a number; truncate identifiers **from the left** (`…-prod-7f3a`), because in machine-generated names the discriminating characters are at the tail.

## Layout and navigation

**The shell is a pane manager, not a page.** The primary object is the pane, and the operator owns the grid — position, size, and which stream is in which pane. Grafana's 8px gutter with per-panel headers is the reference geometry; Bloomberg's four scoped panels plus a command line is the reference *model*. Every pane is independently addressable: its own URL, its own time base, its own pop-out window, so a six-monitor desk is six URLs and not one impossible layout.

**Chrome budget: ≤ 48px above the data, and it holds only what the operator cannot infer** — the time range with window steppers, the refresh cadence, the connection state, and the clock with its zone. Grafana's `« ⏱ Last 30 minutes » ⊖ ↻ Refresh 10s ⌄` is the correct control cluster: presets first, steppers flanking, refresh interval as its own control. No breadcrumb, no page title, no subtitle, no welcome card.

**Feed status is permanent chrome, not a state.** Connection, age of the last tick, and the count of what is on screen versus what exists — tar1090 prints `Total Aircraft: 10692 / On Screen: 112` at all times. A terminal that cannot tell you it is frozen is worse than no terminal, because it is confidently wrong at exactly the moment it matters.

**Grouping follows topology** — region, cluster, desk, sector — because that is both the operator's mental model and the escalation path. Sticky group headers at 20px, 11px, muted, with a count.

**Cards are never right here.** A panel is a border plus a 40px header; a card is an item you might click. Card padding, card radius and card shadow together convert 40% of a wall display into chrome, and the operator paid for that wall by the square inch.

## Components

**Belongs here:** an operator-owned panel grid with per-pane URLs and pop-out; a two-sided ladder (order book / depth) with in-row magnitude fill; a live tail with pin-to-bottom and an explicit `Paused · 1,240 new` resume affordance; an alarm table with ack, silence-with-expiry and a suppressed count; sparklines inside rows; one sequential colour ramp with a printed legend; the time-range cluster with an explicit refresh interval; a command bar or keystroke grammar as the primary navigation; a connection/heartbeat strip; timestamps with the zone always printed.

**Does not belong here:** a row of KPI stat cards (one hero number *per panel*, in the panel that produced it); modals of any kind — a modal covers the thing being monitored, so use a side pane that leaves the alarm rail visible; toast-only notification (a toast that expires while the operator is looking at another monitor is a lost alarm; every toast must be backed by a durable list); skeleton shimmer on every tick (skeleton the first paint only — after that a panel holds its last good value and marks it stale); infinite scroll on a live feed; hover-revealed actions on anything that runs on a wall nobody can hover; confirmation dialogs on high-frequency actions (use an undo window, or hold-to-confirm for the violent ones); animated number count-ups; zebra striping on a fast list, where it beats against the change flash — Kibana can afford it on paginated, wrapped log documents and a 10Hz ladder cannot.

## States in this archetype

**Loading exists exactly once.** After first paint there is no loading state, there is **stale**: a refetching panel keeps its last value at full contrast and shows its age; it dims or turns its age amber only after it exceeds its own expected interval. Never blank a panel to fetch — a blank pane and a genuinely empty pane are indistinguishable at a glance, and one of them means the world ended.

**Empty is four different things** and a terminal must tell them apart: *no data in this window* (say the window), *no series matched* (say the filter), *the source is unreachable* (say the source, and this is an error, not an empty), and *genuinely zero* — which is a value and renders `0`, never "No data". A gap in a line is null; a point at zero is a measurement. And an empty state must never be louder than a full one: Grafana's stat panel auto-fits the words `No data` to ~90px, making the emptiest panel the most visually dominant object on the dashboard.

**Error is a panel-level event.** One dead query must not take the wall down. Print the failure where the data would be, keep the header, the time range and the last-good timestamp, and keep every other pane live.

**Frozen / disconnected is the state this archetype has and no other does.** Not a toast — a persistent bar: `Live · reconnecting… last tick 14s ago`. On reconnect, do not silently backfill under the operator's cursor; report `+312 rows while disconnected` and offer the jump. `craft/tables-dashboards-data.md` says never auto-refresh silently under a reader's cursor; here auto-refresh *is* the product, and the reconciliation is that the **cadence** is silent while a **discontinuity** never is.

**Too much means alarm storm.** Collapse duplicates to one row with a count and a first/last timestamp (`× 47 · 09:41:12 → 09:44:08`), group by cause rather than by instance, cap the DOM and keep the count honest above the cap. An alarm list that grows unbounded stops being read in the first ninety seconds of the incident it exists for.

## Motion budget

**The data plane animates nothing.** No row insert transition, no reflow, no chart draw-on, no count-up, no panel mount. A new row appears at its final position on the frame it arrives. Measured: `transition: all 0s` on Hyperliquid's order book rows, which are the fastest-updating elements in the product.

**The one permitted animation is the change flash**, and it is information rather than delight: a background tint at the moment of change decaying over 300–600ms, applied to **the smallest element that changed** — TradingView flashes the changed digits, not the cell and not the row. Rate-cap it: above roughly 4 changes/second, drop the flash and let the value change silently, because past flicker fusion you are producing a strobe rather than a signal.

Chrome gets 120ms on hover, focus and menu open, colour and opacity only. Under `prefers-reduced-motion`, **substitute** the flash with a one-frame border or a persistent "changed since you last looked" mark — do not delete it, because unlike a decorative transition it carries meaning. The frequency argument here is brutal and simple: a 5s refresh with a 1s chart draw-in means the chart is animating 20% of the time the operator is trying to read it.

## Mobile

**Desktop and wall only, and mobile is a different product — the alerting product.** The terminal's geometry inverts on touch: 19px rows cannot be tapped, and every multiplier in this file points down while touch targets point up, so a responsive terminal is a contradiction rather than an engineering problem. Ship the on-call slice: the push notification, the alarm list at 44px rows and 15–16px type, ack and silence, one drill-in chart, and an "open on desktop" link that carries the full URL state. No panel grid, no ladder, no live tail, no layout editing. If someone genuinely must act from a phone, design that as its own product with its own archetype rather than shrinking this one.

## Copy register

Machine-terse, unit-explicit, and written for a specialist parsing it at a glance for the ten-thousandth time. No sentences where a field will do. **Relative time is wrong here** — the `enterprise-dense` rule ("relative under a day, absolute past it") inverts, because two events 300ms apart are both "just now" and a screenshot pasted into an incident channel must be datable a year later. Absolute, to the millisecond where the domain warrants it, with the zone always printed.

| Right | Beats |
|---|---|
| `Live · 10s · last tick 2s ago` | `Data is updating automatically` — which is also what it says while frozen |
| `Disconnected 14s — showing last known values` | `Something went wrong` — the operator now cannot tell a dead feed from a quiet one |
| `12 firing · 3 acked · 4 silenced until 14:00 UTC` | `You have several active alerts` — the whole content of the sentence is the counts |
| `2026-09-10 09:48:55.947 UTC` | `just now` — undatable in a screenshot, and identical for every event in the last minute |
| `p99 1,240 ms · p50 38 ms` | `Latency is high` — and never silently re-scale one number to seconds while its neighbour is in ms |

## The characteristic failure

It is **mission-control cosplay**: the look of a terminal with none of the instrumentation, and it is what a generator produces from the words "real-time monitoring dashboard". Its anatomy:

1. **Pure `#000` with a neon accent** — cyan or lime at full chroma, often with a `text-shadow` glow. The glow halates at 12px, and the accent is now occupying the exact perceptual slot the alarm needs.
2. **Every panel is a card**: 12px radius, 16px padding, a shadow, a coloured icon in a tinted rounded square. Eight cards at 1440×900 hold about eleven data points.
3. **Colour spent on decoration** — coloured panel headers, gradient borders, a hue per metric. The alarm red is now the ninth hue on screen and reads as one more label.
4. **Everything is green because everything is nominal**, so the all-clear is the brightest thing on the wall and the operator's calibration is destroyed before the first incident.
5. **Animation on the data plane**: rows sliding in, numbers counting up, charts drawing left-to-right on every refresh, a pulsing "LIVE" dot. Each one delays the information by its own duration.
6. **Relative timestamps with no zone**, so no screenshot from this product can ever be entered into an incident timeline.
7. **No connection state at all** — because the demo never disconnects, the UI renders identically when frozen. This is the symptom that gets someone hurt.
8. **Fake density**: 12px type inside 44px rows. Small text with library geometry is the signature of a look copied without the arithmetic behind it.

**Self-diagnosis, fastest first:**

- Screenshot the **nominal** state and look for saturated patches. More than a couple on an all-clear screen → colour is decoration, not data.
- Count distinct hues on screen including the ramp. Over four → you have a collision and the alarm has already lost.
- **Block the socket.** If the screen looks the same after 60s, the product has no honest state and everything else in this file is moot.
- Count visible rows at 1440×900 with real volume. Under 30 for a list-shaped terminal → the geometry came from defaults.
- Grep the row and cell components for `transition`, `animate`, `translate`. Any hit on a push-updated element → the data plane blurs.
- Read one timestamp. No zone printed → the screenshots are worthless downstream.
- Ask: what turns red, and how often is it already red?

**The deeper diagnosis:** every consumer convention this failure imports — generous padding, friendly colour, motion as feedback, cards, relative time — exists to guide a novice through a *first* encounter. This user is on their ten-thousandth. The same devices that orient a beginner raise the noise floor for an expert, and in a product whose only job is deviation detection, raising the noise floor is not a stylistic misstep; it is the whole failure.

The rarer opposite failure is **the undifferentiated wall**: 19px rows, forty columns, everything at full contrast, no grouping, no ramp, no reserved alarm colour — density with no hierarchy, which is where the "dense UIs are hostile" folklore comes from. The fix is never taller rows; it is one identifying column at full contrast, everything else muted, topology group headers, and colour held back for the two or three things that actually mean something.

## Signature decisions that fit here

- **The live edge as a drawn object.** Mark the trailing partial bucket (hatched, or at reduced opacity) and put a 1px "now" rule where the settled data stops — Kibana's Discover histogram does this at the right edge. Generalise it: everywhere a number appears, the boundary between *settled* and *still arriving* is explicit, so nobody ever reads a half-filled bucket as a drop.
- **Magnitude painted into the row.** Hyperliquid's depth bar fills each ladder row proportionally to resting size behind the text; Rill does the same in a leaderboard (cited from `enterprise-dense`). Any column whose comparative size is the question earns an in-row fill rather than a sparkline column — a second dimension for zero horizontal cost.
- **One domain ramp, used everywhere.** tar1090 encodes altitude as one continuous ramp with a printed legend and then uses that identical ramp for the map glyph, the table cell and the chart. Pick your most-scanned scalar and let its colour mean exactly one thing product-wide; a hue that means two things means neither.
- **The command line as navigation.** Bloomberg's `<mnemonic> GO` and Prometheus's expression bar solve the same problem: an operator who runs the same twenty views types faster than they browse. Ship the mnemonics, print them next to the view name so they are learnable, and let the bar accept a query as readily as a destination.
- **A staleness clock per pane, not per page.** Each pane owns its own cadence and prints its own age, because on a six-pane wall one dead upstream is the failure mode, and a single page-level "updated 4m ago" is a lie about five of the six panes.

## Sources

- `https://app.hyperliquid.xyz/trade` — probed live 2026-09 at 1440×900: **327/335** text nodes at 12px; order book rows at y = 203/228/253/278/303/328 → **25px pitch, 23px box, 12px/23px**; `lining-nums tabular-nums` on every numeric cell; `transition: all 0s` on ladder rows against `background,color,border-color 0.2s` on the tick-size control; tokens `--hl-surface #0f1a1f`, `--hl-border #273035`, `--hl-divider #ffffff0f`, `--hl-text #f6fefd`, `--hl-text-muted #9aa3a4`, `--hl-accent-soft #50d2c1`; bid `rgb(31,166,125)` / ask `rgb(237,112,136)` on the price column only, depth fills `rgb(23,69,63)` / `rgb(115,42,54)`.
- `https://globe.adsbexchange.com/` (tar1090) — probed and screenshotted live: body 13px `Helvetica Neue`, **711/814** text nodes at 13px, aircraft rows at 472.6/491.6/511.6/530.6/550.6/570.6 → **19.4px pitch, 17–18px box, 1px cell padding**, data cells in `monospace`, row state fill `rgb(42,83,99)`, text `#d8d8d8` on `#313131` (9.13:1), radii 2–3px, altitude ramp with a printed legend and ▲/▼ climb markers.
- `https://demo.elastic.co/app/discover` (Kibana) — probed and screenshotted live: **1,173/1,397** text nodes at 12px and **1,098/1,397** in `Roboto Mono`; 12px/19.2px; **475** nodes at mono w700 (field names) against w400 values; separator `1px rgb(211,218,230)`; zebra `rgb(239,244,249)`; histogram interval printed (`interval: Auto - 30 seconds`) with the live edge marked at the right.
- `https://play.grafana.org/d/lAoEVhD7z/home-kubernetes-integration` — probed and screenshotted live: panel `#181B1F` on ground `#111217`, `1px solid rgba(204,204,220,0.12)`, radius 10px, **8px** gutter, **40px** panel header at 14px w400 `rgb(204,204,220)`, stat number 40px/48 w500; text muted is `rgba(204,204,220,0.65)`, the same colour at a second alpha. Also the negative control: four saturated green all-clear tiles and a "Running pods 92" with no baseline.
- `https://play.grafana.org/alerting/list` — screenshotted and probed: state filter renders `Firing / Normal / Pending / Recovering` as 12px muted labels with the semantic colour carried entirely by a per-state glyph.
- `https://play.grafana.org/a/grafana-lokiexplore-app/explore` — screenshotted at 1440×900: two dismissible banners consuming ~300px above the log table, first log line at y≈600. Grafana's 12px/14px 95/5 data-to-chrome split, 23.84px table rows, `2px 8px` cell padding and the four border alphas are carried unchanged from `references/enterprise-and-dense-b2b.md`.
- `https://www.tradingview.com/chart/` — probed live: down `rgb(242,54,69)` / up `rgb(8,153,129)` measuring **3.90:1** and **3.57:1** on white at 11–13px; accent `#2962ff`; watchlist rows on a **30px pitch** (31px box, 14px) — the prosumer end of the range; a 20-step `--color-cold-gray-*` ramp; tick flash scoped to changed digits.
- `https://demo.promlabs.com/graph` — screenshotted: mono expression bar as the primary control, explicit resolution and end-time controls, `Table / Graph / Explain` tabs.
- `https://www.bloomberg.com/professional/products/bloomberg-terminal/` — **could not be measured**; the site served a bot challenge. Nothing numeric about the Terminal is claimed in this file.
- Contrast figures computed with `tools/contrast.mjs`; OKLCH conversions of every measured hex done locally. `craft/color.md` (fixed-lightness semantic algorithm, IBM CVD-safe five, ramp construction) and `craft/tables-dashboards-data.md` (refresh/staleness, null-vs-zero, partial-bucket marking) are cited rather than re-derived.
