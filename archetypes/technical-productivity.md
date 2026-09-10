# technical-productivity

**Evaluated:** 2026-09 · **Density:** compact · **Dark by default:** either — dark is the convention, not the requirement. Choose by ambient environment and by whether colour is carrying data, never because it screenshots well. Light mode is the harder problem and the far less imitated one.

> A specialist who already knows what they want spends four to eight hours a day draining a queue, and the interface's only job is to shorten the distance between intent and effect.

## When this is the right archetype

The user chose this tool, uses it every working day for hours, and performs the same dozen operations — triage, assign, snooze, schedule, approve, navigate — several hundred times per session. They are not learning; they are executing. Individual stakes are low because almost everything is undoable, but friction compounds: 150ms of animation on an action performed 400 times is 60 seconds of a person's day spent watching an easing curve. The product's competitive claim is speed, and every visual decision is downstream of that claim. Issue trackers, mail clients, CRMs, code review, calendars, launchers, terminals, agent queues.

- **Choose this over `enterprise-dense` when** the user drives one object at a time through a personal queue by keyboard. Enterprise-dense's user *configures views over many objects* for many roles — saved views, column config, permissions, bulk edit. Diagnostic: if the top feature request is "can I add a column," you are enterprise-dense. If it is "can I bind that to a key," you are here.
- **Choose this over `data-terminal` when** the user *acts* rather than *watches*. If the screen changes without anyone touching it and the job is to notice, that is data-terminal: 20–24px rows, 11–12px type, colour carrying data. Here, nothing on screen moves unless a key was pressed.
- **Choose this over `premium-minimal` when** N is large. Things and Bear serve one person with a dozen items and spend the space; the craft bar is identical but the density logic is inverted. Below ~10 rows, compact density reads as cramped and cheap, not fast.
- **Choose this over `developer-platform` when** there is no docs surface inside the app. Developer-platform users show up weekly or at incident time and read; here the shortcut chip printed on the command *is* the documentation.

## When it is the wrong one

**Low-frequency queues wearing the costume.** An approval inbox a manager opens three times a week with twelve items in it. The density is illegible to someone who hasn't built muscle memory, the keyboard model is never learned because it is never repeated, and you have shipped a slower product that looks faster.

**Anything without undo.** The entire gesture vocabulary here — no confirmation, no spinner, state applied on frame 0 — is a loan against a working undo stack. If an action moves money, deletes data permanently, or deploys to production, either build undo first or use a different archetype's confirmation register. A merge is fine (revert exists); a wire transfer is not.

**The low-frequency surfaces inside your own product.** Settings, billing, invite flows, integration setup and first-run are visited rarely even by a power user. Applying 28px rows and 13px type to a settings form is the most common self-inflicted wound in this archetype. Loosen those pages to comfortable and keep the shell compact — density is per-surface, not per-product.

**Reading surfaces.** 13px at `-0.01em` tracking is a scanning size. A doc, a long comment thread, a report someone forwards to an executive, a changelog: those want `editorial` inside this shell, at 15–16px on a 624–740px measure.

**Products where colour is data.** If a row needs six semantic colours simultaneously, you are borrowing `data-terminal`'s colour budget and will end up with neither its density nor this archetype's restraint.

**Mobile-first products.** The core mechanic does not exist on a phone. See Mobile.

## Reference products

| Product | Why | The one thing to steal |
|---|---|---|
| **Linear** | The canonical implementation, and it ships its whole token file in the marketing bundle so you can read it | `--speed-highlightFadeIn: 0s` / `--speed-highlightFadeOut: 0.15s`. State appears on frame 0; only *removal* is animated. |
| **Superhuman** | Split-inbox as top-level tabs with live counts; the progenitor of "a shortcut for everything" | Counts live inside the tab label — `Important 12  Calendar 13  Docs 8  Other 19` — not in badge bubbles, so the tab row stays one line tall |
| **Raycast** | Palette-as-the-entire-product: the hardest version of the problem | Every accent ships with a paired 15% alpha (`--color-blue #57c1ff` / `#57c1ff26`), so one status pill token survives both a panel and a popover |
| **Zed** | Rejects the Inter/8px-grid orthodoxy deliberately and is better for it | Heading weight *decreases* as size increases (`--h0-weight: 340` → `--h4-weight: 410`) — optical compensation instead of one weight ramp |
| **Missive** | Best-in-class dense *light-mode* three-pane mail, which is much harder than dark | Selected row is **solid blue with white text**, not a tint, because focus regularly leaves that pane for the reading pane and the caret must survive it |
| **Amie** *(less-named)* | A colour-heavy calendar built on a deliberately colourless neutral system | 24-step **perfectly achromatic** gray ramp (`rgb(235,235,235)`, `rgb(160,160,160)` — identical triples), because event colour is user data and any tint in the neutrals would poison it |
| **Attio** *(less-named)* | Linear-grade density executed in light mode, which almost nobody attempts | `--text-sm--font-weight: 500`. Small text on white defaults to *medium*; that one substitution is what buys you light-mode density. |
| **Graphite** *(less-named)* | Keyboard-first code review that ships accelerators on the marketing site | A `G` key chip inside the `Log in` nav button — the keyboard promise is made before signup |

`height.app` no longer resolves and Fey has shut down; do not cite either.

## The numbers

| | Value | Because |
|---|---|---|
| Body | **13px / 1.5 / `-0.01em`**, weight 510 (Linear `--text-mini`). In light mode **13–14px at weight 500** (Attio `--text-sm--font-weight: 500`) | 13px is the smallest size that survives a full workday at arm's length on a 1440 viewport. Weight, not size, carries it: at 13px on white, 400 goes gray-mushy and 500 stays crisp without reading as bold. |
| Dense/secondary text | 12px / 1.4 / tracking `0` (Linear `--text-micro`); colour at **≈6:1**, not less — `#8a8f98` on `#08090a` = 6.13:1, GitHub's `#59636e` on white = 6.11:1 | Two companies, opposite themes, the same answer. `text-gray-400` on white is 2.54:1 and is the single most common legibility failure in imitations. Tracking goes to `0` below 13px — small text gets looser, not tighter. |
| Page title | **17px / weight 590 / `-0.012em`** (Linear `--title-1`) — not 24px, not 30px | A view title someone visits sixty times a day is a locator, not a headline. Every pixel spent on it is a row not shown. The list below it is the content. |
| Row / list-item height | **Two numbers, and conflating them is a defect.** Nav / palette / menu row: **28px** dark (Linear sidebar), **26px** light (Attio, measured). Content list row: **36–40px** (Linear issue row 40px; Attio record row 36px) | A nav row carries one label and an icon. A content row carries 3–5 fields, a hover action set and often a second line. 40px at 13px type gives ~20 rows under a typical 88px of chrome at 900px; shadcn's 49px table row plus a greeting header gives 11. Same screen, half the information. |
| Control height | **28px** inline / row-level, **32px** standalone (shadcn's 32px button and input are already correct) | Inline controls must not exceed the row they live in or the list breathes unevenly on hover. Standalone controls are hit by mouse as often as keyboard. |
| Sidebar width | **232px container, 208px content column**, padding `8px 16px 16px 8px`, 28px rows at 2px gaps, 8px row radius (all measured on Linear). Icon-rail variant: **48px rail + 208–232px list** (Amie, Arc) | 208px fits a 13px label plus icon plus a right-aligned count at ~26 characters — long enough for real project names, short enough that the content column keeps 1200px at 1440. |
| Content max-width | **None on lists** — full bleed, the row is the object. **624px** for prose (Linear `--prose-max-width`), 740px for docs (Zed `--blog-content-width`) | Constraining a list wastes the column that horizontal scanning depends on. Constraining prose is what makes the one reading surface in the product readable. |
| Radius (control / container) | Rows and controls **6–8px** (Linear rows 8px; Attio nav 9px). Panels, palette, dialogs **12–16px**. Scale: `4 / 6 / 8 / 12 / 16 / 24 / 32` | 12px on a 28px row is a stadium; 12px on a 400px panel is correct. Radius is applied by element role, not globally. Concentric rule: inner radius = outer − padding. |
| Border weight & colour | **Dark: prefer none.** Linear's sidebar has `border-right: 0px none`; separation is a 7-point background step (`#0f1011` panel on `#08090a` ground). Where a border is unavoidable: `#ffffff0d` (5%) / `#ffffff14` (8%). **Light: a real hairline is required** — Attio `#eeeff1`, Missive `#e4e6e9` | A 1px line at any contrast is a hard edge the eye lands on repeatedly while scanning. 7 points of luminance reads as depth and disappears. In light mode 7 points is not enough separation, which is why Attio and Missive both draw the line and are right to. |
| Elevation | Three shadows, overlays only: `0 2px 4px #0000001a` / `0 4px 24px #0003` / `0 7px 32px #00000059` (Linear `--shadow-low/medium/high`) | Nothing that sits *in* the page gets a shadow. A palette, a popover and a dialog genuinely float; a list row and a sidebar do not. |
| Motion (micro / standard) | **0ms in, 150ms out** for highlight and selection. 100ms for hover colour (`cubic-bezier(.25,.46,.45,.94)`). 250ms reserved for reverts. Overlay entry 100–150ms | Perceived latency is dominated by the gap between keypress and first visible change; animating an *appearance* buys that gap for free. Animating a *disappearance* costs nothing because the user has already moved on. |

Focus ring: **1px** on dense surfaces at `+2px` offset (Linear `--focus-ring-width: 1px`, `--focus-ring-offset: 2px`), 2px on standalone controls. A 3px ring inside a 28px row overlaps its neighbours.

Scrollbar: **6px visible in a 12px reserved gutter**, 4px gap (Linear). Reserving the gutter is what stops every row shifting 15px the moment a list crosses the overflow threshold.

Layering: `popover 600` → **`command-menu 650`** → `dialog-overlay 699` → `dialog 700` → `toasts 800` → `tooltip 1100` → `context-menu 1200`. The palette must open *over* an open popover and *under* a confirm dialog; give it its own layer or you will spend a year fixing magic z-indexes.

## Colour

**Neutral character: near-achromatic, and cool if anything.** Linear's dark ramp (`#08090a → #0f1011 → #141516 → #1c1c1f → #232326 → #28282c`) carries a one-to-three point blue lean; Missive's light ramp (`#f5f6f6 → #e4e6e9 → #cdd0d4 → #aab0b6 → #7f8791 → #646c76 → #494d55 → #34363a → #232529`) is explicitly cool; Amie's is perfectly neutral because event colour is user data. **Warm neutrals are wrong here** — nearly every coloured element in this archetype is *status*, and a warm gray drags an amber "in progress" toward the background. That is the opposite of `fintech-consumer`, where warm neutrals are correct.

**Step size is the tell.** Linear's dark steps are 5–8 points of luminance. Tailwind's neutral ramp (`#0a0a0a → #171717 → #262626 → #404040`) has roughly twice the step and reads as stacked slabs rather than depth. Budget 10–12 dark steps, 12 light. Amie's 24 half-steps are what you need when the neutrals must sit under user colour without ever being mistaken for it.

**What the accent may do here, specifically:** the focus ring, the selection fill, the single primary action per view, the active nav marker, and links. That is the whole list. It may **not** be: a heading colour, an icon colour, a card border, a gradient, a large filled area, or a status. Linear's brand `#5e6ad2` appears as a 1px focus outline and a 40% selection wash (`color-mix(in srgb, #5e69d1 40%, transparent)`) — and its *unfocused* text selection is deliberately **gray** (`#9c9da1` at 20%), because a keyboard user needs to see at a glance whether the pane they're looking at is the one the next keystroke will hit.

**Semantic colour** is status only, and each hue ships with a paired ~15% alpha companion (Raycast: `--color-green #59d499` / `#59d49926`). The pair is what lets one status pill render correctly on the app ground, on a raised panel and inside a popover without a second token set. Three or four hues maximum. If you need six, the archetype is wrong.

**Light vs dark.** Dark suits products used in dim rooms and late sessions, and gives you a genuine *third* text level for free (there is more usable range between `#f7f8f8` and `#8a8f98` than between `#1f2328` and `#59636e`). Light suits products whose output is shared or forwarded — mail, CRM, review — and forces better discipline because you cannot hide a weak hierarchy in low contrast. In light mode you get two text levels, not three; when you reach for a third gray, use weight 500 instead. Ship both, and make dark a re-mapping, not an inversion.

## Type

**Face:** a neutral grotesque with a real variable weight axis and true tabular figures — Inter var, Geist, Söhne, or the system stack. The variable axis is not a nicety: Linear ships `--font-weight-medium: 510` and `--font-weight-semibold: 590` because at 13px the optically correct weights are not the two masters you inherited from static files, and 590 vs 600 is a visible difference in stroke evenness across a 200-row list. With a static face, snap to 500/600 and stop worrying about it.

**Scale shape: nearly flat.** Linear's entire application runs 10 / 12 / 13 / 14 / 15 / 17px — a 1.7× range from smallest to largest UI text. An editorial scale runs 6×. This is the sharpest single difference between this archetype and every spacious one, and it exists because size differences cost row height. Hierarchy comes from **colour and weight**: a row title at `--text-secondary` weight 510, its ID and meta at `--text-tertiary` weight 400, both at 13px. A long list then reads as an even gray field with no high-contrast noise, which is what makes it scannable.

**Weights: three.** 400 / 510 / 590 (or 400 / 500 / 600). Not 300, not 700, not 800. Zed's inversion — lighter weights at larger sizes — is worth copying for any display type you do have.

**Numerals:** `font-variant-numeric: tabular-nums` on every count, age, ID, diff, duration and timestamp. A right-aligned age column that reflows as `9m` becomes `10m` is the specific jitter that makes a dense product feel cheap.

**Monospace earns its place in exactly three positions:** keycaps (so `⌘K` and `⌘⇧P` align on a shared advance width down a right column), object identifiers (`DRV-8852`, `PR #4192`, hashes), and diffs or code. It does **not** earn it in headings, labels, body text or relative timestamps. Warp's all-mono type system is the only other coherent answer — go all the way or stay in those three slots; a mono heading over a sans list is a costume.

## Layout and navigation

**The shell:** a persistent left sidebar — 232px, or a 48px icon rail plus a 208–232px list column — and a single content region that is either a list or a list/detail split. The sidebar is the **scope selector**, and scope changes twenty times a session by keyboard (`G` then `I`). That is why it is persistent and why it cannot be a top nav or a hamburger: a top bar cannot hold fifteen named destinations, and a drawer costs a keystroke and an animation every time.

**The primary object is the row**, and it gets priority by being the only full-width element on the page. No wrapper, no card, no shadow — just the row and its internal type ramp. Hover is a 2% white overlay and *nothing else*: no border appears, no shadow, no transform, no height change. In a 30-row list the cursor crosses several rows per second; any property that affects layout or draws an edge produces a visible strobe in exactly the situation the list exists for.

**Selection is not hover.** In a keyboard product the highlighted row is not "the row you are pointing at," it is "the row the next keystroke will act on" — it is the caret. Give it its own opaque fill, weighted heavily enough to survive focus moving to the detail pane. Missive fills the selected mail row solid blue with white text for precisely this reason. Using one `--accent` for both `:hover` and `[data-selected]`, which is the shadcn default, makes the keyboard position invisible whenever the mouse is on screen and is the single most disqualifying defect in this archetype.

**Grouping is labels, not dividers.** Small tertiary text with a disclosure caret, no rule above or below; a 2px inter-row gap plus a larger gap before the header does the separating. A horizontal rule every six rows in a 208px column is a lot of ink for information that spacing already conveys. Lists end in a **mask fade** (`#0003`) rather than a hard clip or an inner shadow.

**Cards: almost never.** A card is the right container for an independently actionable object among heterogeneous objects. A queue is homogeneous, and wrapping each row costs a border × N and 16–24px of padding per item, which is a row you no longer show. The two legitimate exceptions are inline message bubbles in a detail pane (Linear: 13px/20, radius 8px, `#161718`, `box-shadow: 0 0 0 1px rgba(0,0,0,.2)` — a ring, not a border, so it adds no layout width) and an agent/run surface where the object genuinely carries a preview.

## Components

**Belongs here:** command palette on its own z-layer, wide enough to show a trailing shortcut plus context (the 384px shadcn default truncates); key chips printed on the commands they operate, right-aligned, mono, at ~40% text opacity; a visible palette *button* labelled with its chord (Attio's `Quick Actions ⌘K` beside a separate `/` search button); list/detail split panes; inline status and assignee popovers that commit on Enter; relative-time group headers (`Yesterday`, `Last week`, `Previous 30 days`, `Past`); a right-aligned meta column carrying age, count or diff; counts inside sidebar and tab labels; optimistic mutation with no pending state; undo toasts; roving-tabindex menus (the whole menu is one tab stop); a filter bar that is really a query language.

**Does not belong here:** confirmation dialogs on reversible actions — ship undo instead; spinners on mutations — the loudest possible signal that the app is not local-first; badge bubbles — put the count in the label; breadcrumbs — the sidebar is the location; indeterminate progress bars — use a completed-step transcript in past tense (`Read about-acme.md`, `Thought 6s`); a `?` modal as the *only* place shortcuts appear; tooltips carrying information required to act; cards around list rows; a top navigation bar; onboarding coach marks; a `<Separator />` between every group; `uppercase tracking-widest` section labels; coloured hero illustrations in empty states.

## States in this archetype

**Empty splits into three cases and conflating them is a defect.**
*Zero data* (a fresh workspace): low-contrast line art in the panel's own background family — the largest element and the lowest-contrast element on screen — one sentence naming actor and object with "yet," and at most one action that sends the user somewhere that *does* have data. *Zero results* (a filter matched nothing): **no illustration at all.** One line of tertiary text where the first row would be, filter chips still visible and still focused, so Backspace fixes it. A keyboard user reached zero because of a keystroke; the recovery is the previous keystroke, not a button. *Queue drained* (inbox zero): the one moment this archetype is allowed to be pleased with itself, because it happens once a day and is earned. It still must not animate.

**Loading.** Skeletons on the *first* paint of a list only, matched to the real row height and rhythm — not three gray bars of arbitrary width — and only if the render exceeds ~200ms. Never on a mutation. Never `animate-pulse`: a 50% opacity swing over 2s is far too loud; Radix's `gray-a3 → gray-a4` (≈6% → ≈10%) is the correct amplitude. For genuinely blocking work — first sync, a network search, an agent run — show completed steps as a growing transcript rather than a percentage.

**Error.** State the fact, not the feeling. A not-found gets no red and often no button: a line-art icon, `Not found`, one tertiary sentence, and the navigation that was already on screen, which is a better recovery path than any button. Red is reserved for *something failed and needs your action*. A failed mutation reverts the row **visibly**, animated over 250ms — the one place in this archetype where slow is correct, because the user must notice — plus a persistent, non-modal, dismissible strip. Never a dialog: a modal kills every shortcut in a product that is nothing but shortcuts.

**Too much.** Virtualize, never paginate a triage queue — pagination breaks `J`/`K` at the boundary. Group headers carry their count (`READY FOR REVIEW 5`). Prefer a second line over horizontal scroll. Truncate at the end so the first six words are always readable, never at the start. Anchor the scroll position to the selected row so an item arriving above the viewport does not move the caret.

## Motion budget

**May animate:** overlay entry (palette, popover, menu) at 100–150ms, opacity plus a 2–4px translate; highlight *removal* at 150ms; a reverted mutation at 250ms; a toast in at 150ms. If you want a spring, Raycast's peaks at **1.043 at 40%** and settles by 70% — a 4.3% overshoot, not the 15–20% a default spring config gives you.

**Must not animate:** row hover (frame 0); selection movement (0ms — the caret must be where the key put it, before the finger leaves it); a row leaving the list when its status changes (it should be gone on keyup); any entrance animation on list items; any `transform` on anything in a list; any layout-affecting property anywhere in a scan region; `transition: all`.

**Durations: four.** `0 / 100 / 150 / 250`. The frequency argument is arithmetic, not taste: an interaction performed 400 times a session with a 200ms transition spends 80 seconds of the user's day, and the perceived cost is worse than the measured one because the delay lands between intent and confirmation. The same 200ms on a marketing page, seen once, is choreography.

## Mobile

**This archetype is desktop-only, and the phone build is a different, reduced product.** Linear ships `--min-tap-size: 44px` in the same token file as its 28px desktop row, which is the honest admission.

*Survives the transition:* the information architecture, the object model, statuses, relative-time bucketing, the neutral ramp, the copy register. *Does not survive:* the 28px row (44px floor), 13px type (15–16px, and 16px on any input or iOS zooms), the 2% hover (there is no hover), the keyboard chips (delete them entirely — a `⌘K` chip on a phone is a lie), the three-pane layout (stack with a back gesture), and the palette as primary navigation (a bottom tab bar with 3–5 destinations).

Two concrete rules. When you drop the shortcut chips, **keep the right column** and fill it with the metadata that was competing with the chip on desktop — count, age, assignee — so the row shape stays recognisable across platforms. And mobile is the one place a larger radius is correct: 8px rows in a 232px sidebar are right; 44px rows edge-to-edge on a 390px screen want 10–12px.

Scope the phone app to *reading and capture*; leave heavy triage on the desktop rather than shipping a worse version of it.

## Copy register

A competent colleague who assumes you know what you are doing. Short, literal, no exclamation marks, no "Oops," no personality in error states, and **no encouragement** — nobody wants to be congratulated for archiving an email for the four-hundredth time.

- **Empty states name the actor and the object, and use "yet."**
  Right: `@Core hasn't published any extensions yet.` — Beats: `Nothing here! 🎉 Get started by creating your first extension.`
- **Relative labels carry their resolution when the user is about to commit.**
  Right: `Next week            Mon Feb 24, 8:00 AM` — Beats: `Next week` alone in a snooze menu, where the user finds out on Monday what it meant.
- **Palette commands are verb-first and match the menu wording exactly; a trailing `…` means a second step is coming.**
  Right: `Assign to…` · `Change status…` · `Snooze until…` — Beats: `Assignment` · `Status change` · `Snoozing options`. The ellipsis is load-bearing: a keyboard user is deciding whether to keep typing.
- **Async work reports completed steps in the past tense, not progress as a number.**
  Right: `Read brand-guidelines.pdf` · `Thought 6s` — Beats: `Processing… 43%`
- **Shortcut hints are never sentences.** A chip says `⌘K` or `S`. It does not say `Press ⌘K to search`.
- **Group headers are time buckets or object names in sentence case.** `Yesterday`, `Previous 30 days`, `Workspace` — not `RECENT ITEMS` or `— YOUR WORKSPACE —`.

## The characteristic failure

This is the most imitated archetype in software and the most reliably botched, because its surface is trivially copyable and its logic is not. The bad version is instantly recognisable, and every part of it is separately fixable.

**The look:** `#0a0a0a` ground, `#171717` cards with `border: 1px solid #262626`, a saturated purple or indigo accent, `rounded-xl` on everything including 32px rows, Inter 14px/400 for all text, `shadow-lg` on things that are not floating, a gradient somewhere, and `transition-all duration-200` globally.

**What is actually missing, in rough order of severity:**

1. **Hover and selected are the same state.** Both are `bg-accent`. The keyboard caret is invisible whenever the mouse is on screen. Disqualifying. Fix: hover at 2% white / 6% black overlay; selection an opaque fill of its own weight.
2. **Selection dies when focus leaves the list.** The user hits `→` into the detail pane and the list forgets where they were. Fix: a focused and an unfocused selection style, both clearly visible — Linear ships `--selection-bg` gray and `--selection-bg-active` brand-at-40% for exactly this.
3. **Focus outlines removed because they "look bad."** Combined with (1), the product has no caret at all. Fix: 1px ring at +2px offset on dense surfaces.
4. **Borders where a background level belongs.** Every card, sidebar and group gets a `1px solid #262626` edge — a 24-point contrast line against `#0a0a0a` that cuts the app in half. Count the visible edges in a Linear screenshot: the sidebar has none.
5. **The neutral ramp is twice too coarse.** Tailwind's steps read as stacked slabs. Fix: 5–8 luminance points per step, 10–12 steps.
6. **Radius applied uniformly.** 12px on a 28px row is a stadium. Fix: 6–8px rows, 12–16px panels, from one scale.
7. **Rows at 44px with 14px/400 text and a divider between each.** Twenty rows where the reference shows thirty-two; a mobile settings screen wearing a desktop costume. Fix is not only shrinking the row: 13px at weight 510 in *secondary* colour, so the denser list is also **quieter**.
8. **Everything in the sidebar is `text-primary`,** so a twenty-row sidebar is a wall of white. Linear's inactive labels sit at `#8a8f98`.
9. **An editorial type scale in a scanning product** — 14/16/20/24/30/36. Fix: a nearly flat 10/12/13/14/15/17, hierarchy from weight and colour.
10. **Everything animates, symmetrically, at 200ms.** No `fadeIn: 0s`. The product is measurably as fast and perceptibly slower.
11. **Spinners on mutations.** A status dropdown that shows a loading state for 180ms advertises the round trip. If you cannot do optimistic updates, at minimum do not announce them.
12. **Fake-optimistic updates.** The row updates instantly, then flickers when the server responds with the same value because the reconcile re-renders. Worse than a spinner.
13. **Shortcuts exist but are never shown,** or are dumped into a `?` modal read once and never again. Fix: print the chip on the thing it operates, right-aligned, tertiary, mono.
14. **Keycaps as bordered `<kbd>` in the body font at full contrast.** They out-shout the commands they annotate, and `⌘K` fails to align with `⌘⇧P` down the list because the font is proportional. Fix: mono, ~40% opacity, an inset ring instead of a border so the chip adds no layout width.
15. **The palette is the shadcn default:** 384px wide (so any item with a trailing shortcut truncates) with a 3.5% selection tint (measured: `lab(96.52%)` on white — fine for a mouse, invisible for a keyboard). Both are bugs the moment the palette is keyboard-driven.
16. **The palette only navigates.** In the reference set it *performs the mutation on the current selection*. A palette that can only jump between pages is a search box with ceremony.
17. **Shortcuts that shadow the browser or OS** (`⌘W`, `⌘T`, `⌘N`), or single-key accelerators that fire while a text input is focused, or a modal mode with no visible escape.
18. **Layout shift from scrollbars.** No reserved gutter, so adding one item shifts the column 15px.
19. **A virtualized list with no scroll anchor,** so an arriving item moves the caret out from under the user's fingers.
20. **Density applied uniformly across surfaces.** Settings, billing and onboarding get 28px rows too. Real products loosen their low-frequency surfaces and keep the shell compact.
21. **Empty states with a big coloured illustration and two buttons,** and the same empty state reused for zero-data and zero-results.
22. **Purple.** Linear's brand is a desaturated `#5e6ad2` used almost exclusively for focus, links and selection. The imitation uses `violet-500` as a card accent, a gradient and a button simultaneously.

**The one-line diagnostic:** open the app, put the mouse down, and drive it with arrow keys alone for sixty seconds. If you cannot see where you are at all times, or anything moves as you pass over it, or a status change makes you wait, it is not this archetype no matter what it looks like.

**And the inverse failure, which is rarer and worse:** applying all of the above correctly to a product whose users open it twice a week. Everything in this file is a trade of legibility and learnability for speed, priced in repetitions. At twelve items a day the trade is a straight loss, and no amount of execution quality recovers it. Check N and frequency before you check anything else.

## Signature decisions that fit here

Pick exactly one. It must answer a question the users actually have, and the rest of the interface must be quiet enough for it to read.

- **A code-review queue sorted by how long the author has been blocked on you,** with that duration as the row's only right-column value — because the reviewer's job is not "review PRs," it is "unblock people," and no other ordering surfaces that.
- **A mail triage list that gives "your last thread with this sender" a permanent one-line slot under the subject** — because 90% of triage is "who is this and what did we already say," and today that question costs a click into the detail pane on every ambiguous row.
- **Cycle position rendered as a 2px left rail on every row** rather than a column or a badge, so an eight-week backlog reads as a gradient of urgency down the list without spending horizontal space.
- **Duration rendered as literal vertical row height everywhere it appears, including in lists** — so a 15-minute and a three-hour commitment can never look alike, in a product where mistaking them is the expensive error.
- **An agent-run row whose primary line is the last completed step in past tense,** with the task title demoted to the secondary line — because for a run in flight the only question is "where is it now," and the title is already known.

## Sources

Screenshotted and read at 1440 and 390 on 2026-09; computed styles and custom properties probed live with Playwright.

- **linear.app** — screenshotted both widths; the hero renders a real DOM app shell. Token values (neutral ramp, `--text-*`, weights 510/590, `--speed-*`, `--layer-*`, `--shadow-*`, `--scrollbar-*`, `--focus-ring-*`, `--min-tap-size`, `--prose-max-width`, `--mask-ease`) and the 232/208/28px/2px/8px/`0 7px`/2%-hover geometry are carried from [`../references/keyboard-first-productivity.md`](../references/keyboard-first-productivity.md); the 40px issue-row and `#8a8f98` 6.13:1 figures from [`../craft/density-and-hierarchy.md`](../craft/density-and-hierarchy.md).
- **attio.com** — probed live: sidebar nav row **26px**, 14px weight **500**, label `rgb(36,38,41)`, radius **9px**, active row fill `rgb(238,239,241)`; `Quick Actions ⌘K` button 26×176px, 8px radius, **no border property**. Confirms the light-mode density answer and the visible palette button.
- **missiveapp.com** — screenshotted; in-product three-pane shot showing the solid-blue selected row with white text, per-account left colour rules, `Today` / `Yesterday` group headers and right-aligned sidebar counts (`Inbox 2`, `Tasks 12`). Probed: cool light neutral ramp `#f5f6f6 · #e4e6e9 · #cdd0d4 · #aab0b6 · #7f8791 · #646c76 · #565b64 · #494d55 · #414449 · #34363a · #232529 · #050607`, brand `#2266ed`.
- **amie.so** — screenshotted; relative-time group headers (`Yesterday` / `Last week` / `Previous 30 days` / `Past`), 48px icon rail, right-aligned tertiary counts. Probed: **24-step perfectly achromatic** gray ramp (`--color-gray-50: 250,250,250` … `--color-gray-950: 15,15,15`, with half-steps at 75/150/250/350/450/550/650/740/750/850/870/885) plus fifteen 9-step colour families for user event colour; `--color-primary/secondary/tertiary = gray-900 / gray-600 / gray-350`. Note `gray-350` on `gray-50` is ≈2.5:1 — decoration, not text.
- **zed.dev** — screenshotted; `⌘⇧P` chip in the header search, `S` on Sign up, `D` on Download now, `C` on Clone source; in-hero agent list with two-line rows, relative age (`4m`, `12m`, `48m`, `2h`) and inline `+23 -2` diff counts. Weight-decreases-with-size and keycap values from the reference file.
- **superhuman.com** — screenshotted; split-inbox tabs with inline counts `Important 12  Calendar 13  Docs 8  Other 19`.
- **notion.com/product/calendar** — screenshotted; right-rail rows with single-letter chips (`S` on Share availability, `F` on Meet with).
- **graphite.dev** — screenshotted and probed; `G` chip inside the `Log in` nav button. Its *marketing* site ships stock Tailwind v4 tokens (`--color-neutral-*`, `--text-*`, `--radius-*`) — a useful reminder that the marketing surface and the app are different archetypes and should not share a scale.
- **raycast.com** — screenshotted at 390 (desktop capture timed out). Ramp, accent+15%-alpha pairs, keycap recipe and the `--spring-1` 1.043 overshoot from the reference file.
- **ui.shadcn.com/docs/components/command** — probed live to re-verify the generic baseline: item **32px**, 14px/20 weight 400, padding `6px 8px`, radius 6px; root **384px**, radius 14px, `1px solid`, padding 4px; `[data-selected]` background `lab(96.52%)` — a **3.5% shift** on white.
