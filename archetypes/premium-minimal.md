# premium-minimal

**Evaluated:** 2026-09 · **Density:** comfortable (content) over compact (chrome) · **Dark by default:** no — either, but both themes must be complete, because these apps get opened in bed and the audience is the one that notices a half-built dark mode

> One person, one object type, opened twenty times a day by choice — and the reason they chose it over the free alternative is that it feels made.

## When this is the right archetype

The user is an individual, not a seat. They bought the product or they could leave tomorrow at zero switching cost, and there is no admin who can force them to stay. They open it many times a day for short bursts — capture a task, read three articles, check a flight, log a meal — and they never read a manual. There is exactly **one primary object** (a task, a note, a feed item, a recipe, a trip) and the whole interface is a list of that object plus a way to look at one closely. Stakes per action are low and everything is reversible, which is what buys the design budget: nothing has to be defensive, so the entire surface can go into feel. The product's competitive position is craft — this is the archetype where a 1px misalignment is a business problem.

- **Choose this over `technical-productivity`** when the user has one collection, not a queue owned by a team. Linear's density exists because someone triages 200 issues; if your user has 40 tasks and looks at them fondly, 28px rows and a bulk-select toolbar make the product feel like work. No assignees, no workflow states, no saved views → you are here.
- **Choose this over `editorial`** when the user *acts* on items as well as reading them. A reader that only reads (an article page, a magazine) is editorial and should give the measure everything. A reader with unread counts, starring, keyboard next/prev and sync is premium-minimal — NetNewsWire, not NYT.
- **Choose this over `expressive-consumer`** when the user already decided. Duolingo has to earn the next session with streaks, confetti and color; Things assumes you came back on purpose. If your metric is DAU-through-persuasion, you are not here, and the restraint will read as cold rather than confident.
- **Choose this over `premium-marketing`** — and this is the one people get wrong — for the *app*. Every reference below has a marketing site, and none of those sites are this archetype. Mela's site is a yellow field with a slab wordmark; Craft's is a paper-collage sky with a 66px serif headline; Bear's is a hero and a screenshot. Craft-scene marketing pages are `premium-marketing` with a house voice. Do not import their hero rhythm into the product shell.

## When it is the wrong one

**Anything with a second user.** The moment there are shared objects, roles, invites, an audit trail or a billing admin, the archetype breaks: you need per-object permission affordances, a "who changed this" column, and an empty state that explains a team concept. Applying premium-minimal there produces a beautiful app that cannot answer "why can't Sam see this," and the fix is `enterprise-dense` or `internal-utility`, not more polish.

**Anything where the user scans for exceptions across hundreds of rows.** The 32px row and generous content column cost you roughly a third of the visible rows versus `technical-productivity`. For a dispatcher, a support queue, or an on-call console, that is a real loss of situational awareness dressed as taste.

**Anything with irreversible money or health consequences.** The archetype's motion budget, its optimistic local writes and its refusal to confirm are all correct for a note and wrong for a wire transfer. `fintech-institutional` and `healthcare-clinical` need the friction this archetype deliberately removes.

**Anything measured on first-session conversion.** Premium-minimal's empty states are quiet, its onboarding is "the app, already usable," and it does not sell inside itself. That is right for a paid app with a trial and catastrophic for a freemium funnel.

**A configuration surface wearing a single-purpose costume.** If the object list has 40 optional columns, a filter builder and a saved-view menu, the product is dense and you are decorating it. Ship the density and put the craft into the controls.

## Reference products

| Product | Why | The one thing to steal |
|---|---|---|
| **Things** (Cultured Code) | Fifteen years of one object type with almost no chrome; the reference point everyone else is measured against | It ships exactly two transition durations — `0.1s` and `0.2s`, both `ease-out`, on 7 elements total — and no letter-spacing overrides anywhere. Restraint is a count, not a mood. |
| **NetNewsWire** | Free, open-source, and still the cleanest three-pane reader on the Mac; proves craft is not a price tier | `--content-width: 650px` and **zero** CSS transitions on the whole site. A product that never animates reads as fast, not as unfinished. |
| **Amie** — *the non-obvious one* | Ships its real app tokens on its public marketing page, so you can read a premium-minimal web app's spec directly | `--nav-width: 74px`, `--inbox-width: 200px`, `--grid-row-height: 60px`, and a 23-step gray ramp stored as raw `R,G,B` triples so every gray can be composed at any alpha. |
| **Bear** | The clearest example of the ground and the accent doing all the personality work | Selection is a 3px accent rail on the note's left edge plus a faint fill — one signature glyph in the app's one color, on the app's one object. |
| **Mela** — *the other non-obvious one* | A recipe app that deviates from Apple deliberately, not ignorantly | SF Rounded body type with **5px and 7px** corners. When one axis is soft, the others go crisp. |
| **Craft** | Content and chrome given genuinely different typefaces (Untitled Sans / Untitled Serif) | The ground is `#FCF9F7`, not white. One tinted ground is the cheapest whole-personality decision available. |
| **Flighty** | An iOS app whose site borrows the app's metrics rather than the reverse | 15px/22.5px body with secondary text at `rgba(0,0,0,0.55)` — alpha grays, so the same secondary color survives being dropped on a tinted card. |
| **Halide** | Domain-derived look: a camera app is an instrument, not a document | Black chassis, yellow readout, wide geometric numerals. The archetype does not mandate white and blue; it mandates that the look come from the object. |
| **Ivory / Tapbots** | The website and the app are allowed to be different genres | Rendered hero art on the site, pure system controls in the app. Craft in the product, voice on the page. |

## The numbers

| | Value | Because |
|---|---|---|
| Body (interface) | **15px / 20px**, weight 400 | Apple's own App Store web app sets sidebar rows at 15/20 and macOS Body at 13/16; 15px is the honest middle for a pointer-driven web app that also has to be legible to a non-power user. Not 14 — this user is not a developer squinting at a terminal. |
| Content / reading body | **17px / 1.6** (27px) | NetNewsWire ships 17px/27.2px and Bear 16px/27.2px. Where the user's own words or an article live, reading distance sets the size, not the viewport. **Do not `clamp()` it.** |
| Dense/secondary text | **13px / 18px**, `rgba(0,0,0,0.56)` in light, `rgba(255,255,255,0.60)` in dark | Timestamps, counts, feed source, "Yesterday." Measured on Apple's App Store web app and independently on Flighty (`rgba(59,59,67,0.6)`). Alpha, never a hex from a ramp, because it lands on tinted rows and colored cards. |
| Page title | **22px / 26px, weight 600** | macOS Title 1 is 22/26. The title is a *label on a list*, not a headline — the list is the page. A 32px page title here is the single fastest way to make a tool look like a landing page. |
| Row / list-item height | **32px** single-line (pointer) · **56–64px** two-line with preview · **44px minimum** on touch | Apple's own sidebar rows measure 30px with 3px padding; Amie's inbox rows read the same. 32 rather than 30 buys a comfortable 15px label. The jump to 44 on touch is not optional and it is why the same app ships two row specs. |
| Control height | **28px** compact · **32px** default (pointer) · **44px** touch | macOS minimum hit target is 28×28pt, recommended 28; iOS is 44×44pt. A single 40px control height across both is wrong twice. |
| Sidebar width | **200–240px**, plus **56–74px** if there is an icon rail | Amie ships `--inbox-width: 200px` and `--nav-width: 74px`. Below 200 the source names truncate; above 240 you are stealing from the object, which is the only thing on screen that matters. Fixed, not fluid — its content doesn't reflow. |
| Content max-width | **650–720px** (≈68ch) for reading; the object list takes the remainder | NetNewsWire pins `--content-width: 650px`. Detail panes are read, not scanned, so measure governs. Never full-bleed prose. |
| Radius (control / container) | **6px** controls · **10px** containers · **12px** overlays · pill for status only | 6px is the dominant macOS control radius (37 instances on Apple's App Store page vs 14 at 10px). Mela runs 5/7 and Things 6. Radius ≥16px on structural surfaces is the loudest tell of generated UI. Respect concentricity: a 10px container with 8px padding gets 2px children. |
| Border weight & colour | **1px**, `rgba(0,0,0,0.08)` light / `rgba(255,255,255,0.10)` dark; separators only where scanning needs a stop | NetNewsWire's separator `#d4dce8` on `#f5f8fc` is ~4% of luminance. Rows in a list of one object type need **no** dividers — grouping and whitespace do it. Borders here mark panes, not items. |
| Elevation | **One** shadow, for things genuinely floating: `0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.12)` | Amie tokenizes exactly this pair (`--shadow-wysiwyg-inner/outer`). Panes are separated by ground-tone change, not shadow. A card-with-shadow inside a pane is the archetype's most common wrong instinct. |
| Motion (micro / standard) | **100ms** / **200ms**, `ease-out`; one choreographed moment at **300–400ms** | Things ships literally `0.1s` and `0.2s` `ease-out` and nothing else. Amie runs `0.15s`/`0.3s` on `cubic-bezier(0.4, 0, 0.2, 1)`. The user performs the core action dozens of times a day; only *one* action per app earns choreography. |

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

**The object gets priority by getting the pixels.** The chrome is compact — 32px rows, 15px labels, 28px toolbar buttons — so the object can be comfortable. That inversion is the whole archetype in one sentence, and it is the opposite of what generated UI does (roomy chrome, cramped content).

**Grouping is by time or by the user's own structure**, and section headers are quiet: 11–12px, weight 600, secondary alpha, sticky. Amie's "Yesterday / Last week / Previous 30 days" is the pattern. Never paginate a personal collection.

**Cards are almost always wrong here.** A list of one object type is a list. Cards are right only when the object is visually distinguishable at a glance — a recipe with a photo, a document with a cover, a shot. When they are right, the artwork is a full-bleed band with the text in a solid strip beneath it, not a gradient scrim over the image.

## Components

**Belongs here:** three-pane split with draggable, remembered dividers · sidebar rows (icon + label + right-aligned count) · single- and two-line list rows · inline row editing (click the title, type) · a persistent capture control · keyboard shortcuts with a discoverable list · contextual menus on right-click and on a row's hover-revealed `⋯` · a quiet ambient sync glyph on the affected row · relative-date section headers · undo (toast or `⌘Z`), replacing confirmation dialogs · a settings window with 3–5 tabs, no search · alternate app icons / accent choice as a real preference.

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

- **Rows go from 32px to 44px minimum.** Same product, same tokens, different row spec by pointer type. A Mac-density row shipped to a phone is the single most common failure of a desktop-first craft team.
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

**Direction one: minimal is read as "fewer pixels used" instead of "fewer things shown."** The agent centers a 640px column in a 1440px window, sets 80px of vertical padding, 44px rows, 16px radius everywhere, and a 40px page title above eleven items. It looks like a landing page for a product rather than the product. The actual archetype is the opposite arrangement: **chrome compact, content comfortable.** Things fits its whole navigation into 15px rows so the task list can breathe. If your page title is bigger than your object and your row height exceeds your line-height by 2×, you have built the wrong thing.

**Direction two: the craft cargo cult.** Cream background, Inter at `tracking-tight`, a 3D rendered blob, a fake macOS window frame with traffic lights around a `<div>`, a mesh gradient behind a glassmorphic card, and — under all of it — hover lift, shadow bloom, `rounded-xl` on a 24px chip, a spinner on a local read, and a toast that says "Saved!" with an emoji. Every one of those is a visual quotation of craft with none of the decisions that produce it. Reflect's shipped homepage is a live example of the gradient-glow half of this; the app behind it is fine, the page is a purple singularity.

**Self-diagnosis, in order of how fast each one gives you away:**
1. Sweep the cursor down a list. Does anything move? → generated.
2. Count your transition durations. Things has two. Do you have nine?
3. Count your radii. Is there a 16px on anything structural?
4. Is your secondary gray a hex from a ramp instead of an alpha? Drop it on a tinted row and watch it detach.
5. Is `letter-spacing: -0.02em` on every heading? That is wrong at 20px and at 48px simultaneously.
6. Is there a gradient anywhere in the product (not the marketing page)? Delete it.
7. Does the empty state congratulate the user for having nothing, and also, on first run, show them nothing to do? You built one empty state where two were needed.
8. Is your dark mode an inversion? Do the borders survive it?

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

- `https://culturedcode.com/things/` — screenshotted (1440/390) and probed: body 18px/25.2px on ground `#F2F5F7`, ink `rgb(48,51,54)`, control radius 6px, `letter-spacing: normal` on all 12 dominant text styles, exactly two transition durations (`0.1s`, `0.2s`) both `ease-out`.
- `https://netnewswire.com` — screenshotted and probed: body 17px/27.2px, `--content-width: 650px`, `--secondary-text: rgba(0,0,0,0.45)`, `--separator-color: #d4dce8` on `#f5f8fc`, link `#2b6fc0`, **zero** transitions and zero easings on the page; also the source of the three-pane app shot (sidebar rows with icon + label + right-aligned count, accent-filled selection, unread-dot gutter).
- `https://amie.so` — screenshotted (1440/390) and probed: 186 custom properties including the shipped app layout tokens `--nav-width: 74px`, `--inbox-width: 200px`, `--grid-row-height: 60px`, `--grid-allday-event-height: 24px`, `--sidebar-top-height: 36px`; a 23-step gray ramp stored as `R,G,B` triples; `--shadow-wysiwyg-inner/outer` at `rgba(0,0,0,0.04)`/`0.12`; durations 0.15s/0.3s on `cubic-bezier(0.4,0,0.2,1)`. The 390px shot is the mobile-screenshot failure cited above.
- `https://www.craft.do` — screenshotted and probed: ground `#FCF9F7`, Untitled Sans (chrome) + Untitled Serif (display), h1 66px/66px w400 `ls -1.98px`, radius clusters 24/14/8/4, durations 0.15/0.2/0.3s; app shot shows sidebar rows with fill-on-select and no hover borders.
- `https://bear.app` — screenshotted; app window shows dark sidebar, the 3px red selection rail on the note list, and the two-family split. Measured values (`bearsans`, 16px/27.2px = 1.70, display 1.10, `#DD4C4F`) cited from `references/apple-and-craft-standard.md`.
- `https://mela.recipes`, `https://www.sofahq.com`, `https://tapbots.com/ivory/`, `https://arc.net` — screenshotted for ground-tint and marketing-voice comparison; Mela's `#FFD609`/`#1E1E19` and 5px/7px radii, Sofa's `#FFF4EE`, Ivory's rendered hero, Arc/Dia's app-window-on-brand-field composition.
- `https://reflect.app` — screenshotted as the live example of the gradient-glow failure mode.
- `references/apple-and-craft-standard.md` — all Apple-side numbers reused rather than re-derived: App Store web app sidebar rows (30px / 3px / 6px / 15px-20px), alpha label colors `rgba(0,0,0,0.88/0.56/0.48)`, the 6px macOS control radius frequency count, macOS vs iOS type ladders (13/16 vs 17/22), hit targets (28pt macOS / 44pt iOS), and Flighty's `rgba(59,59,67,0.6)` secondary.
