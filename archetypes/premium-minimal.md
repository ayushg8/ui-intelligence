# premium-minimal

**Evaluated:** 2026-09 · **Density:** comfortable (content) over compact (chrome) · **Dark by default:** no — either, but both themes must be complete, because these apps get opened in bed and the audience is the one that notices a half-built dark mode

> One person, one object type, opened twenty times a day by choice — and the reason they chose it over the free alternative is that it feels made.

## When this is the right archetype

The user is an individual, not a seat. They bought the product or they could leave tomorrow at zero switching cost, and there is no admin who can force them to stay. They open it many times a day for short bursts — capture a task, read three articles, check a flight, log a meal — and they never read a manual. There is exactly **one primary object** (a task, a note, a feed item, a recipe, a trip) and the whole interface is a list of that object plus a way to look at one closely. Stakes per action are low and everything is reversible, which is what buys the design budget: nothing has to be defensive, so the entire surface can go into feel. The product's competitive position is craft — this is the archetype where a 1px misalignment is a business problem.

- **Choose this over `technical-productivity`** when the row is a *stack*, not a *table without gridlines*. There, a row is 3–5 aligned fields the user compares against each other; here it is the object's own words, one column, ragged. Linear's density exists because someone triages 200 issues; if your user has 40 tasks and looks at them fondly, a bulk-select toolbar makes the product feel like work. No assignees, no workflow states, no saved views → you are here.
- **Choose this over `editorial`** when the user *acts* on items as well as reading them. A reader that only reads (an article page, a magazine) is editorial and should give the measure everything. A reader with unread counts, starring, keyboard next/prev and sync is premium-minimal — NetNewsWire, not NYT.
- **Choose this over `expressive-consumer`** when the user already decided. Duolingo has to earn the next session with streaks, confetti and color; Things assumes you came back on purpose. If your metric is DAU-through-persuasion, you are not here, and the restraint will read as cold rather than confident.
- **Choose this over `premium-marketing`** — and this is the one people get wrong — for the *app*. Every reference below has a marketing site, and none of those sites are this archetype. Mela's site is a yellow field with a slab wordmark; Craft's is a paper-collage sky with a 66px serif headline; Bear's is a hero and a screenshot. Craft-scene marketing pages are `premium-marketing` with a house voice. Do not import their hero rhythm into the product shell.

## Against its neighbours

Four archetypes describe an app shell with a list in it. The numbers only separate them side by side.

| | **premium-minimal** | `technical-productivity` | `editorial` | `luxury` |
|---|---|---|---|---|
| Interface body | **15 / 20, w400** | 13 / 19.5, w510 | 12–14, furniture only | 15–17 / 1.40–1.65 — one scale, no chrome/content split |
| Reading body | **17 / 27 (1.6)** | 15 / 24, one pane | 17–19 / 1.40–1.50 | same; captions are 11–14 caps at +0.03em |
| Page title | **22 / 26 w600 — 1.47× body** | 17 w590 — 1.31× | 32–48 w400–500 — 2.0–2.4× | 24–50 w200–400 |
| Source / nav row | **28–32px** | 26–28px | none | none |
| Object row | **30–36 single-line · 56–72 stacked** | 36–40, columnar | 88–112, index item | none; image aspect sets height |
| Radius | **6 / 10 / 12** | 6–8 rows, 12–16 overlays | 2–4, 0 on media | 0–3 |
| Accent jobs | **4** | 5 (adds links, active nav) | 1 (links) | 0–1 |
| Semantic hues | **≤ 2** | 3–4, each with a 15% companion | 0 | 0 |
| Shadow definitions | **1** | 3, overlays only | 1 | 0 |
| Motion | **100 / 200 ease-out + one 300–400ms moment** | 0 in / 150 out / 100 hover, **no choreography** | 120ms controls, 0 in the text | 200–250 hover / 400 / 500–1200 reveal |

**This archetype shares its shell with `technical-productivity`** — sidebar width (200–240 vs Linear's 232), the 6px control radius, the 28/32px control heights, the three-pane split, and shipping dark. Those are genuinely the same numbers and pretending otherwise would be theatre. The difference lives in three places, and all three fall out of what the user is doing:

1. **What a row contains.** A stacked row has one thing to read, so 15px is affordable; a columnar row has five, so 13px is mandatory. This is also why the object row here is *taller* than Linear's, not shorter — 56–72px against 36–40px — and why the loss in visible rows is real: 12 rows under 900px against Linear's 20.
2. **The colour budget.** Linear ships 3–4 status hues, each with a paired ~15% alpha companion, because state *is* the data. A note has no state. Two semantic hues is the ceiling here; needing four means you are building the other archetype.
3. **Choreography.** `technical-productivity` forbids it outright — 0ms in, 150ms out, nothing takes 300ms. This archetype *requires* exactly one 300–400ms moment, because the user performs the signature action by choice forty times a day and the animation is the receipt. A tool you were assigned gets no receipt.

**It shares its reading pane with `editorial`** — 17px, 620–740px, serif permitted, no shadow in the column. Two things differ. **Leading:** 650px at 17px is ~72ch, a documentation measure, so 1.6 is correct; `editorial` targets 55–65ch at 1.40–1.50 and names 1.6-at-58ch as its own most common over-correction. **And the pane is a selection target:** arrow keys move to the next object, it cross-fades in 150ms, scroll resets, and a 200–240px sidebar sits to its left permanently. An article page has none of that, which is why `editorial` gives the measure everything and this archetype cannot.

**It shares almost nothing with `luxury`** but the body size. Radius (6/10/12 vs 0–3), elevation (one vs zero) and the object model — a list you act on against an image you desire — all diverge.

## When it is the wrong one

These six all look like this archetype from a screenshot, and each breaks on something specific.

**Superhuman.** The strongest false positive in the set: one object, keyboard-first, obsessive craft, a paid personal subscription. It is `technical-productivity`. The user triages 200 messages a day against a split inbox, so a 64px stacked row costs about 8 of the 20 visible rows; and the whole promise is sub-100ms per keystroke, which a 200ms selection cross-fade and a 300–400ms send animation contradict directly.

**Notion.** One object (the page), personal-feeling, beautifully made — and it has a second user. Shares, comments, mentions, guest access, workspace admin. This archetype has no component for "who can see this," so you ship a lovely app that cannot answer "why can't Sam open it." → `enterprise-dense` for the shell.

**Copilot Money / Monarch.** Personal, daily, one object, craft is the pitch — and it is money. A transaction carries pending / needs-review / failed-sync / disputed, which is four semantic hues past the ceiling here, and mis-categorising is not covered by "do it and offer undo." → `fintech-consumer`, and `healthcare-clinical` for anything with a dose or a diagnosis; both need the friction this archetype deliberately removes.

**Obsidian, Raycast, Alfred.** A single-purpose costume over a configuration surface: 40 preference panes, a plugin registry, hotkey remapping, community themes. The settings spec here — 3–5 tabs, no search — is a claim that there is nothing to search for. If your settings window needs a search field, it is not a premium-minimal settings window. Ship the density and put the craft into the controls.

**Duolingo, Strava, Spotify free.** Measured on first-session conversion and on users who have not decided yet. Quiet empty states, "the app, already usable" as onboarding, and no in-product selling are right for a paid app with a trial and catastrophic for a freemium funnel. → `expressive-consumer`.

**Feedly.** The same object as NetNewsWire, the wrong archetype: team boards, saved searches, AI feed filters, a Pro tier sold in the sidebar. **The tell is saved views** — the moment a personal collection needs stored queries, it is a queue.

## Reference products

| Product | Why | The one thing to steal |
|---|---|---|
| **Things** (Cultured Code) | Fifteen years of one object type with almost no chrome; the reference point everyone else is measured against | It ships exactly two transition durations — `0.1s` and `0.2s`, both `ease-out`, across 9 elements — and `letter-spacing: normal` on every text style on the page. Restraint is a count, not a mood. |
| **NetNewsWire** | Free, open-source, and still the cleanest three-pane reader on the Mac; proves craft is not a price tier | `--content-width: 650px` and **zero** CSS transitions on the whole site. A product that never animates reads as fast, not as unfinished. |
| **Amie** — *the non-obvious one* | Ships its real app tokens on its public marketing page, so you can read a premium-minimal web app's spec directly | `--nav-width: 74px`, `--inbox-width: 200px`, `--grid-row-height: 60px`, a 23-step gray ramp stored as raw `R,G,B` triples, and one tinted shadow colour used for both inner and outer elevation. |
| **Bear** | The clearest example of the ground and the accent doing all the personality work | Selection is a 3px accent rail on the note's left edge plus a faint fill — one signature glyph in the app's one color, on the app's one object. |
| **Mela** — *the other non-obvious one* | A recipe app that deviates from Apple deliberately, not ignorantly | SF Rounded body type with **5px and 7px** corners. When one axis is soft, the others go crisp. |
| **Craft** | Content and chrome given genuinely different typefaces (Untitled Sans / Untitled Serif) | The ground is `#FCF9F7`, not white. One tinted ground is the cheapest whole-personality decision available. |
| **Flighty** | An iOS app whose site borrows the app's metrics rather than the reverse | 15px/22.5px body with secondary text at `rgba(0,0,0,0.55)` — alpha grays, so the same secondary color survives being dropped on a tinted card. |
| **Halide** | Domain-derived look: a camera app is an instrument, not a document | Black chassis, yellow readout, wide geometric numerals. The archetype does not mandate white and blue; it mandates that the look come from the object. |

## The numbers

| | Value | Because |
|---|---|---|
| Body (interface) | **15px / 20px**, weight 400 | Apple's own App Store web app sets sidebar rows at 15/20 and macOS Body at 13/16; 15px is the honest middle for a pointer-driven web app that also has to be legible to a non-power user. Not 14 — this user is not a developer squinting at a terminal. |
| Content / reading body | **17px / 1.6** (27px) | NetNewsWire ships 17px/27.2px and Bear 16px/27.2px. Where the user's own words or an article live, reading distance sets the size, not the viewport. **Do not `clamp()` it.** |
| Dense/secondary text | **13px / 18px**, `rgba(0,0,0,0.56)` in light, `rgba(255,255,255,0.60)` in dark | Timestamps, counts, feed source, "Yesterday." Measured on Apple's App Store web app and independently on Flighty (`rgba(59,59,67,0.6)`). Alpha, never a hex from a ramp, because it lands on tinted rows and colored cards. |
| Page title | **22px / 26px, weight 600** | macOS Title 1 is 22/26. The title is a *label on a list*, not a headline — the list is the page. A 32px page title here is the single fastest way to make a tool look like a landing page. |
| Row heights | **Three numbers, and conflating them is the defect.** Source / nav row **28–32px** · single-line object row **30–36px** · **stacked** object row (title + preview + meta) **56–72px** · **44px minimum** on touch | Apple's own App Store sidebar rows measure 30px at 3px padding; 32 rather than 30 buys a comfortable 15px label. The object row is taller than the nav row because it carries the object's own words, not a label — NetNewsWire's timeline and Bear's note list are both three-line. Do **not** take `technical-productivity`'s 36–40px *columnar* row and fill it with 15px stacked text; that row is sized for five aligned fields at 13px. The jump to 44 on touch is not optional and is why the same app ships two row specs. |
| Control height | **28px** compact · **32px** default (pointer) · **44px** touch | macOS minimum hit target is 28×28pt, recommended 28; iOS is 44×44pt. A single 40px control height across both is wrong twice. |
| Sidebar width | **200–240px**, plus **56–74px** if there is an icon rail | Amie ships `--inbox-width: 200px` and `--nav-width: 74px`. Below 200 the source names truncate; above 240 you are stealing from the object, which is the only thing on screen that matters. Fixed, not fluid — its content doesn't reflow. |
| Content max-width | **650–720px** for reading; the object list takes the remainder | NetNewsWire pins `--content-width: 650px` — **~72ch at 17px**, a documentation measure rather than an article measure, which is exactly why the leading is 1.6 here and 1.45 in `editorial`. Pick the pair, never one number from each. Detail panes are read, not scanned, so measure governs. Never full-bleed prose. |
| Radius (control / container) | **6px** controls · **10px** containers · **12px** overlays · pill for status only | 6px dominates Apple's own product UI — 37 instances on the App Store web app against 10 at 8px and 3 at 10px, and **zero at 12px or 16px anywhere**. Mela runs 5/7 across its whole app chrome. (Both companies' *marketing sites* run large: Things' own site leads at 18px ×17. The small-radius claim is about product chrome, not about these brands.) Radius ≥16px on structural surfaces is the loudest tell of generated UI. Concentricity: a 10px container with 8px padding gets 2px children. |
| Border weight & colour | **1px**, `rgba(0,0,0,0.08)` light / `rgba(255,255,255,0.10)` dark; separators only where scanning needs a stop | NetNewsWire's separator `#d4dce8` on `#f5f8fc` is ~4% of luminance. Rows in a list of one object type need **no** dividers — grouping and whitespace do it. Borders here mark panes, not items. |
| Elevation | **One** shadow, for things genuinely floating, and **it is not black**: `0 1px 2px rgba(134,141,150,0.12), 0 8px 16px rgba(0,0,0,0.12)` | Amie ships a single tinted shadow colour — `--shadow-wysiwyg-inner` and `--shadow-wysiwyg-outer` are *both* `rgba(134,141,150,0.12)`, a blue-gray — and its floating card measures `0 8px 16px rgba(0,0,0,0.12)`. Tinting the shadow toward the ground is what stops a light-mode card reading as dirty. Panes are separated by ground-tone change, not shadow. A card-with-shadow inside a pane is this archetype's most common wrong instinct. |
| Motion (micro / standard) | **100ms** / **200ms**, `ease-out`; one choreographed moment at **300–400ms** | Things ships literally `0.1s` and `0.2s` `ease-out` and nothing else, across 9 elements. Amie runs `0.15s`/`0.3s` on `cubic-bezier(0.4, 0, 0.2, 1)`. The user performs the core action dozens of times a day; only *one* action per app earns choreography. |

## Colour

**The ground is tinted, and that is the whole personality decision.** Every reference deviates from `#FFFFFF`: Things `#F2F5F7` (cool blue-gray), Craft `#FCF9F7` (beige), Sofa `#FFF4EE` (cream), Mela `#1E1E19` on `#FFD609`, Amie `#FAFAFA`. Pick one ground, derive the surface as pure white (or one step lighter in dark), and you have spent zero components on brand. Neutrals: 10–12 steps, **stored as `R,G,B` triples**, not hexes, so every gray composes at any alpha (Amie ships 23 steps this way). Warm or cool is a real choice — warm for anything holding the user's own writing, cool for anything holding data.

**One accent, and it comes from the app icon**, not from a palette generator: Bear's `#DD4C4F`, Mela's `#FFD609`, NetNewsWire's `#2b6fc0`, Things' blue. In *this* archetype the accent is permitted to do four things: the selected row's fill or rail, the primary action, the focus ring, and **the one domain glyph** that is the product's signature (an unread dot, a due-today marker, a checkbox tick). It is not permitted on headings, section icons, empty-state illustrations, or any gradient. That last exclusion matters more here than anywhere: a gradient in a premium-minimal app reads as a template, instantly.

**Semantics are nearly absent** and that is correct. There is no "failed" state on a note. Reserve red for destructive confirmation and for one genuine domain alarm (Flighty's delay); reserve green for the one moment of completion. If you find yourself needing four semantic colors, the product has states you have not designed, and the archetype is wrong.

**Light and dark are both first-class.** A personal app is used at 7am and at midnight; this is the audience that will find your `#000` halation and your dark-mode border that vanished. Dark is a re-map, not an inversion: ground ≈ `oklch(0.17)`, surfaces get *lighter* as they rise, borders go up in weight because shadow is invisible, and the accent drops chroma and gains lightness or it vibrates on the dark ground.

## Type

**The system UI face is a legitimate first choice here** — the only archetype where that is true — because a craft app is expected to look like it belongs to the platform. `system-ui` on the web gets you SF on Apple, Segoe on Windows, Roboto on Android; that is a *feature* for chrome and a hazard for anything you tuned. The honest split, which Flighty ships: a self-hosted face for the parts that mimic the app, `system-ui` for prose. If you license a face, the ground tint and the face should be one decision (Craft: beige + Untitled Sans/Serif; Bear: custom `bearsans`).

**The scale is deliberately low-contrast: 13 / 15 / 17 / 22, weights 400/500/600.** From interface body to page title is 1.47×. Compare `editorial` or `premium-marketing`, where 16→64 is 4×. The reason is structural: there is one object type on screen, so nothing is competing, so hierarchy comes from position, weight and color — not size. A large heading in a single-object app is size spent on nothing.

**Content and chrome may take different families** when the content is genuinely the user's — Mela sets recipes in `ui-serif` and every label in SF Rounded; Craft pairs Untitled Serif content with Untitled Sans chrome; Bear ships two families. The frame should not compete with the picture. This **does not apply** when the content *is* interface: a task, a flight, a feed row. Things uses one family and is right to.

**Line-height splits at two ratios, not one:** 1.5–1.7 at 13–17px, 1.15–1.2 at 20–28px. Bear ships 1.70 body / 1.10 display.

**Numerals:** `tabular-nums` on times, counts, durations, unread badges and anything in a right-aligned column — this is a right-aligned-timestamp archetype and proportional figures visibly jitter as minutes tick. Proportional in prose. **Monospace earns its place only for user content that is genuinely fixed-width** (a code block, a hash). A monospace timestamp or metadata chip here is developer-tool cosplay borrowed from `technical-productivity`.

**Do not transplant Apple's SF tracking table onto a non-SF face.** Things — the most Apple-adjacent product in the set — ships `letter-spacing: normal` on every single text style. Copying `-0.022em` onto Inter produces text that is measurably too tight.

## Layout and navigation

**The shell is the three-pane: source list → object list → detail.** It is not a style; it is the direct expression of "one collection of one object type." The source list (200–240px) holds smart views and user-made groups; the object list holds the object; the detail pane takes the remainder. NetNewsWire, Bear, Reeder, Craft and Amie all resolve to it. On narrow windows the detail pane goes full-width over the list; on wide ones, the two narrow panes stay near-equal and the content pane absorbs the growth — never let the object list stretch to 700px because the window did.

The alternative shell is **single-column with a persistent capture affordance** (Things' Magic Plus, a compose bar) for products where there is only one view of the collection. Pick one; do not put a top nav bar *and* a sidebar on a product with four destinations.

**The object gets priority by getting the pixels.** The chrome is compact — 28–32px nav rows, 15px labels, 28px toolbar buttons — so the object row can run to 56–72px and breathe. That inversion is the whole archetype in one sentence, and it is the opposite of what generated UI does (roomy chrome, cramped content).

**Grouping is by time or by the user's own structure**, and section headers are quiet: 11–12px, weight 600, secondary alpha, sticky. Amie's "Yesterday / Last week / Previous 30 days" is the pattern. Never paginate a personal collection.

**Cards are almost always wrong here.** A list of one object type is a list. Cards are right only when the object is visually distinguishable at a glance — a recipe with a photo, a document with a cover, a shot. When they are right, the artwork is a full-bleed band with the text in a solid strip beneath it, not a gradient scrim over the image.

## Components

**Belongs here:** three-pane split with draggable, remembered dividers · sidebar rows (icon + label + right-aligned count) · single-line and stacked (2–3 line) list rows · inline row editing (click the title, type) · a persistent capture control · keyboard shortcuts with a discoverable list · contextual menus on right-click and on a row's hover-revealed `⋯` · a quiet ambient sync glyph on the affected row · relative-date section headers · undo (toast or `⌘Z`), replacing confirmation dialogs · a settings window with 3–5 tabs, no search · alternate app icons / accent choice as a real preference.

**Does not belong here:** a top navigation bar with 7 destinations (the sidebar is the nav) · breadcrumbs (depth is 2) · a dashboard of summary tiles (there is one number and it lives in the sidebar) · KPI cards, sparklines, "welcome back" banners · bulk-select checkbox columns with a floating action bar → use multi-select plus a contextual menu · a filter builder → use one search field and 2–3 fixed smart views · toasts for routine success → the row already changed · modals for anything reversible → do it and offer undo · in-app upsell cards in the object list → put it in Settings and in the trial's final day · skeleton shimmer on a local read → it's local, it's instant.

## States in this archetype

**Empty has two completely different designs and conflating them is the classic error.** *Finished* — the inbox is clear, today's tasks are done — is the **reward**; render the void. Things shows an empty list and a small mark, no illustration, no copy telling you well done. *Not started* — first run, a new folder — is a **door**: one line naming the state, one line of explanation, and the action as a real button, not a text link. `No flights yet` + `Add a flight`. The generated version puts a 200px illustration and an exclamation mark on both.

**Loading:** these apps are local-first, so most reads are instant and any spinner is a lie about your architecture. For genuine network waits, render the destination's chrome — sidebar, section headers, row skeletons at the exact final row height — and fill in. No spinner under ~1s. A centered spinner on a blank pane throws away the continuity that makes the app feel fast.

**Error:** on the row, in the row's own space, in the app's voice. What happened, then what to do, one sentence each: `Couldn't reach iCloud. Your changes are saved on this device and will sync when you're back online.` Offline is not a takeover here — an ambient indicator on the affected item, never a modal. (That inverts for `fintech-institutional`, where the takeover is correct.)

**Too much:** sticky relative-date headers, a search field that filters the current list in place, and keyboard next/prev so position is never lost. Not infinite scroll without anchoring, and not pagination. When the collection genuinely outgrows a list — 5,000 notes — the honest answer is that the product is drifting toward `technical-productivity` and needs its density revisited, not a filter panel bolted on.

## Motion budget

Micro **100ms**, standard **200ms**, `ease-out`. Permitted: hover and selection fills, disclosure triangles, popover and sheet entry, the detail pane cross-fading when the selection changes (150ms opacity only — never a slide, or fast keyboard navigation turns into a slideshow).

Forbidden: hover lift, `scale()` on rows, entrance animations on list content, staggered reveals, shimmer on local data, anything that moves when the cursor sweeps a list. Hover is a **~3% luminance shift on the fill and nothing else** — sweep the cursor down 30 rows and if things move, it reads as instability. This is the fastest tell of a generated interface.

**One choreographed moment per app, 300–400ms, and it must be the action the product is named for**: the task completing, the article marking read, the message sending. The user does it forty times a day and the animation is the receipt. Two such moments and both become obstacles. Everything else is 100ms.

`prefers-reduced-motion` gets a real alternative, not `animation: none` — the choreographed moment becomes an instant state change with a 100ms opacity cross-fade, and the row still visibly changed.

## Mobile

**This archetype is genuinely dual-native, not desktop-first.** Most of the references were phone apps before they were anything else. What changes:

- **Every row spec floors at 44px.** A 30px nav row and a 32px single-line object row are pointer answers; on touch both become 44. Same product, same tokens, different row spec by pointer type. A Mac-density row shipped to a phone is the single most common failure of a desktop-first craft team.
- **Type holds; chrome shrinks.** Body stays 15–17px. What shrinks is the gutters, the toolbar and the number of visible panes.
- **Three panes become a push stack** — source → list → detail — with the back control labeled by the previous view. On the web, keep real URLs and real history for this; a JS nav stack that breaks the browser back button is a downgrade dressed as native.
- **Sheets replace side panels**, resting at a half or full height, with a grabber if resizable.
- **Marketing pages must not shrink the desktop app screenshot.** Amie's own 390px page renders its three-pane app shot at roughly 700px wide scaled into 340 — unreadable. Ship a phone-framed crop of one pane instead.

## Copy register

Declarative, present tense, sentence case. Specific nouns over category nouns. No exclamation marks in chrome, no emoji in system copy, no apologies. Periods on full sentences; none on buttons, nav items or rows. Buttons are verb + object, ≤3 words.

- `No flights yet` / `Add a flight` — not `Nothing here yet! Add your first item to get started.`
- `Couldn't reach iCloud. Your changes are saved on this device and will sync when you're back online.` — not `Sync error (code 4097).`
- `Restored support for ⌘⌫ in Quick Entry's checklists.` — not `Bug fixes and performance improvements.` Release notes at keystroke granularity are the cheapest craft signal that exists and almost nobody ships them.
- `Free, 30-day trial · 75.8 MB · Requires macOS 15.6+` — not `Get started today!` The three facts this user actually wants, in one line.

## The characteristic failure

The bad version has a recognizable shape, and it fails in two directions at once.

**Direction one: minimal is read as "fewer pixels used" instead of "fewer things shown."** The agent centers a 640px column in a 1440px window, sets 80px of vertical padding, 44px rows, 16px radius everywhere, and a 40px page title above eleven items. It looks like a landing page for a product rather than the product. The actual archetype is the opposite arrangement: **chrome compact, content comfortable.** Apple puts a 15px label in a 30px sidebar row so the list beside it can run to 64px.

**Direction two: the craft cargo cult.** Cream background, Inter at `tracking-tight`, a 3D rendered blob, a fake macOS window frame with traffic lights around a `<div>`, a mesh gradient behind a glassmorphic card, and — under all of it — hover lift, shadow bloom, `rounded-xl` on a 24px chip, a spinner on a local read, and a toast that says "Saved!" with an emoji. Every one of those is a visual quotation of craft with none of the decisions that produce it. Reflect's shipped homepage is a live example of the gradient-glow half of this; the app behind it is fine, the page is a purple singularity.

**And the copy gives it away independently of the pixels.** `Welcome back, Alex 👋` · `Get started` · `Saved!` · `Your workspace` · `Oops! Something went wrong` · `No items yet — create your first item to get started` · `Bug fixes and performance improvements`. Every one of those is from a different product than the one you are claiming to have built.

**The screenshot test — seven measurements you can run against your own render.** Six of the seven are arithmetic on values you already have.

1. **Largest UI text ÷ interface body.** Should be ≤ 1.6× (22/15 = 1.47). At 2.5× you have built a landing page with a list on it.
2. **Single-line row height ÷ that row's line-height.** 1.5–1.8× (32/20). Above 2.2× the row is padding with text in it.
3. **Count distinct radii, then find the largest one on anything wider than 400px.** More than four values, or any 16px+ on a pane, sidebar or list container → generated.
4. **Count distinct transition durations.** Things ships 2. Three is defensible. Nine is the tell.
5. **Count shadow definitions, then check where they land.** More than one, or any shadow on something that sits *in* the page rather than above it.
6. **Screenshot row 7 at rest and hovered, and diff the two images.** The only pixels permitted to change are the fill's luminance, by about 3%. Any geometry change — a lift, a `scale()`, a border appearing — is the fastest tell there is.
7. **Sample your secondary text colour.** An opaque hex on a tinted ground is detaching, and you cannot see it any more because you have looked at it for six hours.

**Then the ones no measurement catches:**
- Is `letter-spacing: -0.02em` on every heading? That is wrong at 20px and at 48px simultaneously.
- Is there a gradient anywhere in the *product* (the marketing page is allowed one)? Delete it.
- Does the empty state congratulate the user for having nothing and, on first run, show them nothing to do? You built one empty state where two were needed.
- Is your dark mode an inversion? Do the borders survive it?

And the structural one: **if the interface would still make sense with a different primary object dropped in, it has no signature.** Premium-minimal without a domain-derived structural decision is just a well-behaved shell, and a well-behaved shell is exactly what everyone else's build week also produced.

## Signature decisions that fit here

- **Bear's selection rail** — the selected note carries a 3px accent stripe on its left edge plus a faint fill, so selection is legible in the peripheral vision of a three-pane window without a border or a shadow. One glyph, the app's one color, on the app's one object.
- **A duration-proportional row.** A calendar or time-tracking product renders duration as literal height everywhere, including in lists, so a 15-minute and a 3-hour block can never look alike. Amie's `--grid-row-height: 60px` makes an hour a fixed, memorized distance.
- **Unread as a rail, not a badge.** A reader puts the unread dot in a dedicated 12px gutter to the left of every row, so the eye reads a single vertical line of dots down the list instead of hunting bold text — NetNewsWire's list is scannable at arm's length for this reason.
- **The ground tint carries the brand so no component has to.** Mela on `#FFD609`/`#1E1E19`, Sofa on `#FFF4EE`, Things on `#F2F5F7`. Zero components spent on personality; every component free to be plain.
- **Instrument chrome for an instrument object.** Halide is black with a yellow readout and wide geometric numerals because a camera is a tool with a dial, not a document. The look is derived from what the object *is* — which is the test any signature here has to pass.

## Platform-craft ideas: what transfers to the web, and what makes web apps worse

**Transfers.** Alpha grays instead of ramp hexes for secondary text. Two scales, one for chrome and one for content. Hover as a luminance shift with nothing moving. Small, role-assigned radii (6/10/12). Body size that does not scale with the viewport. Row heights that change with pointer type, not breakpoint. The finished/not-started empty-state split. Skeletons at the exact final row height instead of a spinner. Ambient per-row sync state instead of a global toast. `prefers-reduced-motion` with a real alternative, plus `prefers-contrast: more` for semantic colors. Release notes written at keystroke granularity.

**Makes web apps worse.**
- **Apple's SF tracking table on a non-SF face.** Derived from SF's optical curve; on Inter or Geist it is measurably too tight. Things ships `letter-spacing: normal`.
- **`-apple-system` as the entire type decision.** Your tuned tracking is now wrong on Windows and Android, where the user gets Segoe and Roboto.
- **Native furniture: a fake status bar, a bottom tab bar at 1440px, a `‹ Back` chevron on a page with browser history.** It promises gesture behavior the page cannot honor.
- **A JS navigation stack that replaces URLs.** The web's back button, deep links and reload are worth more than a push transition. Keep routes; animate within them if you must.
- **Sheet detents and drag-to-dismiss.** Without the OS's rubber-banding and velocity model, a half-dragged web sheet feels broken. Ship a dialog.
- **`backdrop-filter` translucency (Liquid Glass).** Free on native because the compositor samples a system material; on the web it costs GPU on every scroll frame and produces unpredictable contrast over user content. If you use it, it is on floating chrome only, never on a content surface, and there is a solid fallback.
- **Substituting animation for haptics.** There is no web equivalent; a bounce where a tap-tick belonged is worse than silence.
- **Scroll-jacking and custom scrollbars** in pursuit of "native feel." Both make the trackpad fight the page.
- **Auto-hiding chrome on hover** (the macOS scrollbar habit). On native, the menu bar still holds every command; on the web, hidden chrome is gone.
- **The 44pt target as a global default.** It is correct for touch and 60% too large for a pointer; ship both, keyed to `(pointer: coarse)`.

## Sources

- `https://culturedcode.com/things/` — **re-probed 2026-09-10, Playwright, 1440×900.** Body element 18px/25.2px, dominant paragraph 18px/24.3px, on ground `#F2F5F7`, ink `rgb(48,51,54)`. `letter-spacing: normal` on all 8 dominant text styles. Exactly two transition durations, `0.2s` (5 elements) and `0.1s` (4), all `ease-out` — 9 elements, not the 7 previously recorded. Radii on the *site*: 18px (17), 3px (16), 4.5px (14), 6px (10); the 6px control-radius claim comes from Apple's App Store web app, not from here.
- `https://netnewswire.com` — **re-probed 2026-09-10.** Body 17px/27.2px (1.60) at 650px = ~72ch, `--content-width: 650px`, `--secondary-text: rgba(0,0,0,0.45)`, `--separator-color: #d4dce8` on `--body-background: #f5f8fc`, ink `#2a2e3a`, link `rgb(43,111,192)` = `#2b6fc0`, **zero** transition durations and zero easings across the whole page, two radii total (4px ×2, 12px ×1); also the source of the three-pane app shot (sidebar rows with icon + label + right-aligned count, accent-filled selection, unread-dot gutter).
- `https://amie.so` — **re-probed 2026-09-10. 247 custom properties**, not the 186 previously recorded, including the shipped app layout tokens `--nav-width: 74px`, `--inbox-width: 200px`, `--grid-row-height: 60px`, `--grid-allday-event-height: 24px`, `--sidebar-top-height: 36px`, `--sidebar-bottom-height: 64px`; a 23-step gray ramp (`--color-gray-950 … --color-gray-50`) stored as `R,G,B` triples; **`--shadow-wysiwyg-inner` and `--shadow-wysiwyg-outer` are both `rgba(134,141,150,0.12)`** — one tinted colour, not the `rgba(0,0,0,0.04)`/`0.12` pair previously recorded — with the floating card measuring `0 8px 16px rgba(0,0,0,0.12)`; durations 0.3s (23 elements) / 0.15s (10) on `cubic-bezier(0.4,0,0.2,1)`; body 16px/28px on `#FAFAFA`. The 390px shot is the mobile-screenshot failure cited above.
- `https://www.craft.do` — **re-probed 2026-09-10:** ground `rgb(252,249,247)` = `#FCF9F7` confirmed, ink `#030302`, `UntitledSansFont` (chrome) + Untitled Serif (display), body 16px/24px, radii 24 (192) / 14 (96) / 4 (44) / 8 (31) / 12 (21), durations 0.2s (127) / 0.15s (86) / 0.3s (52) — a marketing page's motion budget, not the app's; app shot shows sidebar rows with fill-on-select and no hover borders.
- `https://bear.app` — screenshotted; app window shows dark sidebar, the 3px red selection rail on the note list, and the two-family split. Measured values (`bearsans`, 16px/27.2px = 1.70, display 1.10, `#DD4C4F`) cited from `references/apple-and-craft-standard.md`.
- `https://mela.recipes`, `https://www.sofahq.com`, `https://tapbots.com/ivory/`, `https://arc.net` — screenshotted for ground-tint and marketing-voice comparison; Mela's `#FFD609`/`#1E1E19` and 5px/7px radii, Sofa's `#FFF4EE`, Ivory's rendered hero, Arc/Dia's app-window-on-brand-field composition.
- `https://reflect.app` — screenshotted as the live example of the gradient-glow failure mode.
- `references/apple-and-craft-standard.md` — all Apple-side numbers reused rather than re-derived: App Store web app sidebar rows (30px / 3px / 6px / 15px-20px), alpha label colors `rgba(0,0,0,0.88/0.56/0.48)`, the 6px macOS control radius frequency count, macOS vs iOS type ladders (13/16 vs 17/22), hit targets (28pt macOS / 44pt iOS), and Flighty's `rgba(59,59,67,0.6)` secondary.

---

## Differentiation pass (2026-09)

Compared against `technical-productivity`, `editorial` and `luxury` — the three neighbours a screenshot of this archetype can be mistaken for. (`premium-marketing` and `expressive-consumer` were already handled by the "Choose this over" bullets and did not need a numbers comparison; the confusion there is about surface, not density.)

**Pushed apart.** Added `## Against its neighbours`, a ten-row side-by-side plus three named overlaps stated honestly rather than papered over. This archetype **shares its shell with `technical-productivity`** — 200–240px sidebar, 6px control radius, 28/32px controls, three panes, dark mode — and the difference now lives in three things that follow from the user's task: a stacked row against a columnar one (which is why 15px is affordable here and 13px is mandatory there), ≤2 semantic hues against 3–4 with alpha companions, and one required 300–400ms choreographed moment against a category that forbids choreography entirely. It **shares its reading pane with `editorial`** — 17px, 620–740px — and the difference is leading tied to measure (1.6 at ~72ch here, 1.45 at 58ch there) plus the fact that this pane is a keyboard selection target inside a shell.

**Corrected a backwards claim.** "The 32px row costs you roughly a third of the visible rows versus `technical-productivity`" was wrong in the direction it was arguing: Linear's content row is 36–40px and this file's was 32px, so the archetype was, as written, the *denser* of the two. The row spec now splits into three numbers — nav 28–32, single-line object 30–36, **stacked object 56–72** — which is what the references actually ship (NetNewsWire's timeline and Bear's note list are both three-line) and which restores the visible-rows argument with a real number: 12 rows under 900px against Linear's 20. This also brings the file back into line with `craft/density-and-hierarchy.md`'s comfortable band (36–44px) and the README's density table, which the flat 32px contradicted.

**Re-probed live (Playwright, 1440×900, 2026-09-10).** culturedcode.com/things, netnewswire.com, amie.so, craft.do. Four corrections:

1. **Amie's elevation token was wrong.** The file claimed `--shadow-wysiwyg-inner/outer` at `rgba(0,0,0,0.04)`/`0.12`. Both tokens are in fact `rgba(134,141,150,0.12)` — a single *blue-gray* colour. The recommended shadow now carries the tint, which is the more useful fact anyway.
2. **Amie ships 247 custom properties, not 186.**
3. **Things' two durations run across 9 elements, not 7.**
4. **The radius evidence was misattributed.** "37 instances vs 14 at 10px" is not the measured distribution — it is 6px ×37 against 8px ×10 and 10px ×3, with zero at 12px or 16px, all on Apple's App Store web app. And "Things 6" is false of Things' own site, which leads at 18px ×17; the small-radius claim is about product chrome, and the file now says so. `references/apple-and-craft-standard.md` already had this right and the two now agree.

Verified unchanged: NetNewsWire's `--content-width: 650px`, 17px/27.2px, `--secondary-text: rgba(0,0,0,0.45)`, `#d4dce8` on `#f5f8fc`, and zero transitions; Amie's `--nav-width: 74px` / `--inbox-width: 200px` / `--grid-row-height: 60px` and the 23-step `R,G,B` ramp; Things' `#F2F5F7`, `rgb(48,51,54)` and `letter-spacing: normal` everywhere; Craft's `#FCF9F7`.

**"When it is the wrong one" rewritten.** All five entries were categories. They are now six named products that pass a screenshot test and fail a specific one: Superhuman (triage volume plus a sub-100ms keystroke promise), Notion (a second user and no permission affordance), Copilot Money / Monarch (four semantic states and non-undoable consequences), Obsidian / Raycast / Alfred (a settings window that needs search), Duolingo / Strava / Spotify free (a freemium funnel), Feedly (saved views).

**Characteristic failure hardened.** Added a seven-point screenshot test an agent can run on its own render — six of them arithmetic on values it already has (title ÷ body ≤ 1.6×, row ÷ line-height ≤ 1.8×, radius count and largest structural radius, duration count against Things' 2, shadow count and placement, a rest-vs-hover pixel diff, a secondary-colour sample) — plus the seven copy strings that give the failure away without any pixels at all.

**Cut.** The Ivory/Tapbots reference row (the site-is-not-the-app point is already the fourth "Choose this over" bullet and appears in Sources), and the closing sentence of failure direction one, now duplicated by measurements 1 and 2.
