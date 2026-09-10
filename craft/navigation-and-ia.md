# Navigation and information architecture

Measured September 2026 against live production UI. Every number below was pulled with Playwright
from computed styles and bounding boxes on the real site, or read from the CSS custom properties the
product ships. Products measured: Grafana (play.grafana.org), Discourse (meta.discourse.org), Stripe
Docs, Vercel Docs, Sentry Docs, Supabase Docs, PostHog Docs, shopify.dev/Polaris, Notion Help, MDN,
Tailwind Docs, Linear Docs, GitHub, shadcn/ui, Excalidraw, VS Code for Web (vscode.dev), Mastodon,
Bluesky, Hugging Face, YouTube mobile web.

**Re-probed 2026-09** — Grafana rail, Discourse rail, Tailwind rail, PostHog rows, Supabase rows,
Vercel rows, GitHub tabs and counters, MDN tokens, Hugging Face header, Bluesky column, Stripe
product tabs. Two numbers were wrong; they are corrected in place and listed in the direction pass at
the end of this file.

A sidebar reading Dashboard / Analytics / Reports / Users / Settings is a confession that nobody
could name what the software does. That is what this file is for.

---

## If you only apply five things

1. **Name your product's top-level nouns before you draw any nav.** Write the list of things a user
   creates, owns or watches in this product — the objects, in the words your users say out loud.
   That list *is* your top-level nav. If it comes out as Dashboard / Analytics / Settings, you have
   not done the exercise; those are not nouns in anyone's product, they are furniture.
2. **Sidebar rows are 28–39px tall with a 4–8px radius, inset 8–12px from the rail edge.** Measured:
   PostHog 28, Grafana 32, Vercel 36, Discourse 36.8, Sentry 38.8. The rail is 240–320px, mode 280.
   Never 44px *rows* — that is a touch minimum and it makes a pointer-driven 30-item list feel like a
   phone app on a monitor. (44 is fine as a rail *width*: VS Code's icon rail is 44 wide with 36×36
   targets.)
3. **Nothing moves on hover, and hover is usually instant.** Measured hover deltas: Grafana changes
   *only* text alpha (0.65 → 1.0) with `transition: all 0s`; Vercel adds a `#f2f2f2` fill and darkens
   text; Discourse fills with 15%-alpha brand purple. Zero of the three shift, scale, or add a
   border. Two of the three animate nothing at all.
4. **The active item gets exactly two signals, and one of them is not a border.** Measured pairs:
   Grafana = 2px `#FA7339` bar at the rail's left edge + `rgb(46,48,54)` fill (a ~9% white lift over
   the `rgb(24,27,31)` ground). Stripe = accent color `#5469d4` + weight 700, **no fill at all**.
   Sentry = solid `#6a5fc1` fill + white text. Discourse = `#f2f3f3` fill + weight 600. Pick two.
   Three signals is shouting; one is missable when the user tabs back into the window.
5. **Put the state that identifies the view into the URL, and put a stable id in the path.**
   Grafana ships `/d/to6j8mh/grafana-play-home?from=now-6h&to=now&timezone=utc` — opaque id, human
   slug that can change freely, and a *relative* time range so the shared link still means "last six
   hours" next Tuesday. Discourse ships `/c/news-and-events/207` — slug plus numeric id, so renaming
   the category never breaks a link. If your filters, tab, sort and selection live only in React
   state, your product has no shareable state and no working back button.

---

## Measured reference table

### Sidebar / left-rail geometry — 1440×1000 viewport

| Product | Rail width | Row height | Row pitch | Row box | Radius | Type | Icons | Active state | Hover state |
|---|---|---|---|---|---|---|---|---|---|
| **Grafana** (app, dark) | **320** (nav 319) | **32** | 32 | inset 8, **280** wide | 6 | 14/22 | all rows | 2px `#FA7339` bar at x=7–8 + fill `rgb(46,48,54)` on `rgb(24,27,31)` + text α .65→1 | text α .65→1 **only**; `transition: all 0s` |
| **Discourse** (app) | **272** | **36.8** | 38.8 | inset 8, 255 wide | **999** (pill) | 16/22.4 | per-category, colored | fill `#f2f3f3` + weight 600 + text `#505558` | fill = 15%-α brand purple, text `#7b5fe2` |
| **Sentry Docs** | **300** (`--sidebar-width: 300px`) | **38.8** | 38.8 | pad 8, indent 12/24/36 | 4 | 15.2/22.8, gap 4 | yes | **solid `#6a5fc1` fill, white text** | — |
| **Vercel Docs** | 300 (nav 288, p-4) | **36** | 37 | inset 12, 264 wide, pad `0 8 0 10` | 6 | 14/21, gap 8 | most rows | — | fill `#f2f2f2`, text `#4d4d4d`→`#171717` |
| **shopify.dev** | 284 (inner 276 @ x=8) | **28** | 32 | pad `4 4 4 20`, 260 wide | 4 | 14/20 | yes | **white** fill on the `#f6f6f7` rail + weight 600 | — |
| **Stripe Docs** | **280** | 20 (text box) | **32** | x=12, nested pad-left +16 | **0** | 14/20 | **none** | `#5469d4` + weight **700**, no fill | — |
| **PostHog Docs** | ~250 (rows x=158) | **28** | 29 | pad `4 8`, rows 209–234 wide | 4 | 14/20 | none | fill `rgba(30,31,35,.15)` + weight 600 | — |
| **Supabase Docs** | 325 | 18.6 | 28.5 | x=40 | 0 | 13/18.6, weight 450–500 | none | text `rgb(10,132,78)` | — |
| **Notion Help** | **280** (1px `rgba(0,0,0,.08)` rule) | 36 | — | pad 8, x=16 | 0 | 16/24 | none | — | — |
| **MDN** | 296.5 (nav 264.5); `--layout-sidebar-min: 15rem` | 32 | 40 | pad `4 0` | 0 | 16/24 | none | — | — |
| **Linear Docs** (dark) | **280** | 36 | 36 | inset 20, 239 wide | 0 | 14/21, **weight 510** | yes | full-opacity `#f7f8f8` vs `#8a8f98` | — |
| **Tailwind Docs** | **288** column, **240** nav | 24 | 32 | nav x=24, 240 wide | 0 | 14/24; headers 12 upper/500 | none | weight 600 + near-black | color only |
| **VS Code for Web** (app, dark) | **44 icon rail + 300 panel** | activity item **36×36**, pitch **44** | 44 | rail x=4, panel x=48 | 8 on the rail's outer corners | **13/18.2** | icon-only rail | left edge bar + full-opacity icon | — |
| **Mastodon** (app) | **285, on the *right*** | **48** | 48 | pad `12 12 12 16`, radius 4 | 4 | **16/18** | yes | `aria-current="page"` + weight | — |
| **Bluesky** (app) | **245**, pad 16 | 28.5 (logo row) | — | rail ends exactly where the 600px feed column begins | 999 on buttons | 16 | yes | — | — |
| **GitHub** code-view file tree | **321** pane / **273** inner nav | — | — | appears only inside `/blob` and `/tree` | 6 | 14/21 | file-type glyphs | — | — |

**The signal on width:** 240–325px for a labeled rail, and **280 is the mode** (Stripe, Notion, Linear, and Vercel/Sentry
at 300 with 12px of internal padding = a 276–288 usable column). 320 and 325 appear only where the
rail carries a three-level tree (Grafana) or very long labels (Supabase). Nobody in this sample ships
a 200px rail and nobody ships 400.

**The signal on rows:** 28–39, clustered at 32 and 36–39. The pitch equals the height (0 gap) in
almost every case — these lists are dense stacks, not spaced cards. Only Discourse (38.8 pitch on a
36.8 row) and PostHog (29 on 28) add a 1–2px breather, and it is invisible.

**The signal on icons:** four of the twelve ship **no icons at all** in the sidebar, and they are the
four whose rows are all the same kind of object (doc pages). See "When a sidebar icon earns its
place" below — this is the single most-abused control in generated navigation.

### Header / top-bar heights, as shipped tokens

| Product | Token or measured height | Structure |
|---|---|---|
| Grafana (app) | **48** | rail 320 + a 1120-wide bar carrying breadcrumb, search, +, help, account |
| Discourse (app) | **52** | burger, logo, centered 550-wide search, auth |
| shopify.dev | **48** | logo + 6 destinations |
| Supabase Docs | **50** | logo + product switcher, blurred `oklab(.995 0 0 / .75)` |
| Notion | `--global-navigation-height: 64px`, `--header-height: 60px` | two different tokens, two different surfaces |
| Sentry Docs | `--header-height: 64px`, `--headerHeight: 4rem` | logo, 6 sections, search, "GO TO SENTRY" |
| Vercel Docs | `--header-height: 64px`, `--docs-header-height: 106px` | 64 chrome + 42 docs sub-bar |
| Linear Docs | 64 | `border-bottom: 1px #23252a` |
| Stripe Docs | **64 + 48 = 112** | row 1 = logo/search/auth, row 2 = 6 product tabs |
| GitHub | 72 (marketing) + 48 (repo tabs) | two independent bars |
| MDN | 66 nav + `--breadcrumbs-bar-height: 2rem` | `--sticky-header-height: calc(nav + breadcrumbs)` |
| Hugging Face | **65** | logo + **6** destinations at 16px, `padding: 2px 8px`, then a right cluster. **No sidebar anywhere in the product.** |
| VS Code for Web | **35** title bar + **28** status bar | the title bar carries only back/forward and the workspace name; every destination is in the 44px rail or the palette |
| YouTube (390 mobile web) | **48** | logo + a single 48×48 search target. No burger. |
| Mastodon | **none** | no top bar at all; nav is a 285px right-hand panel beside a ~598px centered column |

**The signal:** 48–64 for a single bar. Products that need two levels ship them as two bars of
different heights (Stripe 64+48, GitHub 72+48, MDN 66+32), never as one tall 100px bar with two rows
of things floating inside it. And Vercel and Notion each define a *separate token* for the taller
composed header — the sticky-offset math has one source of truth.

### Command palettes

| Product | Width | Height | Top offset | Radius | Input | Row height | Row radius | Selected row |
|---|---|---|---|---|---|---|---|---|
| **shadcn/ui** | 512 | 408 | `top-[15%]` = y135 | **14** | 36px / 14px | **36** | 8 | 50%-α muted fill |
| **Supabase** | 576 | 500 | y200 (22% of 900) | 8 | **56px** / 15px | **44** | 6 | 4% black fill |
| **Vercel Docs** | 640 | 489 | `top-[15%]` = y135 | 12 | 28px / **18px** | **55.2** (2-line) | 6 | 5% black fill |
| **GitHub Docs** | 800 | 555 | **y16** | 12 | 30px / 14px | — | — | shadow `0 1px 3px rgba(31,35,40,.12), 0 8px 24px rgba(66,74,83,.12)` |
| **VS Code for Web** | **602** | 407 | **y6** | 8 | 24px / **13px** | **22** | 4 | **solid `rgb(4,57,94)` + white text** |

**The signal:** 512–800 wide, **anchored 6px–22% down the viewport, never vertically centered**
(GitHub pins it 16px from the top; VS Code pins it at 6). The taxonomy splits cleanly by what the
palette is *for*:

- **Navigation palettes** (shadcn 36, Supabase 44, Vercel 55) have rows *taller* than sidebar rows,
  because a palette row is a decision and a sidebar row is a habit, and the input is 15–18px because
  that is where the eye is.
- **Command palettes over thousands of commands** go the other way: VS Code ships **22px rows and a
  13px input** — the same 13px as the rest of its chrome — because the user is scanning fifty
  `Editor: …` / `Git: …` lines for a prefix match, not reading. Its selected row is a **solid**
  `rgb(4,57,94)` fill with white text, not a 5% wash, because at 22px a subtle fill is invisible.

The rule that generalizes: **row height tracks how many results the user must compare, not how
important the palette is.** Under ~10 likely results → 44–55px rows with descriptions. Hundreds →
22–32px rows with a namespace prefix (`Editor: Font Size`) doing the disambiguation instead.

**Group taxonomies actually shipped** — these are the real answer to "what goes in a palette":

- Supabase: `Docs` → `Go to` → `Quick starts` → `Support`
- shadcn/ui: `Pages` → `Styles` → `Components` → `Get Started`
- GitHub Docs: two modes side by side, `Search docs` and `Ask Copilot`
- VS Code: **no visual groups at all** — every entry is `Namespace: Verb Object` (`Accounts: Manage
  Trusted Extensions`, `Add Data Breakpoint at Address`), so the prefix does the grouping and typing
  `git ` filters to a group. Use this instead of headers once the list is too long for headers to
  fit on screen.

Note that every one of them mixes **navigation** ("Go to Auth") with **search results** and with
**actions** ("Use system theme"). That mix is the whole point of a palette; a palette that only
searches documents is a search box wearing a costume.

### Tabs, sub-navigation and counters

| Element | Measured |
|---|---|
| **GitHub repo tabs** | 7 tabs, h **30**, 14px, pad `0 8`, radius 6, gap ~8. Active: weight 600 + `::after` **2px** `rgb(253,140,115)` at `bottom: -9px`. Inactive weight 400. |
| **GitHub tab counters** | h **20**, **12px** / weight 500, radius **24** (pill), pad `0 6`, bg **`rgba(129,139,152,.12)`**, text `rgb(31,35,40)` — a neutral grey, *not* red |
| **Stripe product tabs** (row 2) | 6 items, h 34 in a 48 bar, 14px, active = `#5469d4` text + 2px underline |
| **Stripe in-page tabs** | h 49, same underline language as the global tabs |
| **Discourse view tabs** | `Latest / Hot / Top / Categories`, h **38**, 16px, radius 8, pad `0 10.4`, active = `#7b5fe2` text + underline |
| **MDN right-rail TOC** | rows h **32**, pad `4 8`, radius 0, active = fill `rgb(236,244,254)` |
| **Bluesky profile tabs** | 5 tabs (`Posts / Media / Videos / Feeds / Starter Packs`), **h47 desktop** with `padding: 14px 14px 0`, **h43 at 390** with `padding: 10px`, **16px type at both sizes**, across the full 600px column |

**The signal on responsive tabs:** Bluesky shrinks tab *padding* from 14px to 10px between 1440 and
390 and leaves the **font size alone at 16px**. Type size is legibility; padding is density. Shrink
the second, never the first — a 13px tab label on a phone is the classic generated-mobile mistake.

**The signal on counters:** GitHub carries "Issues 1k" and "Pull requests 2.3k" inline in the tab as
a **neutral 12%-grey pill**, and spends its only accent color on the 2px active indicator. Generated
UI does the reverse: red badges on six items and a grey active state.

### Breadcrumbs

| Product | Where | Size | Separator | Notes |
|---|---|---|---|---|
| **MDN** | full-width bar between nav and content | 16px, 16px gap | `>` glyph | `--breadcrumbs-bar-height: 2rem`, folded into `--sticky-header-height` |
| **Sentry Docs** | above the H1, y=110 | 14px / 24.5 | ` / ` | every segment a link in `#6a5fc1`; final segment also colored |
| **Grafana** (app) | **inside the 48px top bar**, x=352 (rail 320 + 32) | 14/22 | ` / ` | shows even at depth 1 ("Dashboards"); reflects the *folder* path, not the nav path |
| **GitHub** (code view) | its own 24px row above the file, y=202 | **16/24** | ` / ` in a **20.6px** gap between segments | every segment is a link in `#0969da` **including the repo name**; the crumb is the only path affordance on the page and doubles as the directory picker |

### Nesting and indentation — Grafana's expanded tree

Fully expanded, the rail runs past 1534px inside a 952px viewport. Indentation:

| Depth | Row x | Step | Row height |
|---|---|---|---|
| 1 (`Dashboards`, `Alerts & IRM`) | **8** | — | 32 |
| 2 (`Alerting`, `SLO`) | **40** | +32 | 32 |
| 3 (`Alert rules`, `Silences`) | **60** | +20 | 32 |

**The non-obvious part:** the steps are unequal (+32, then +20), and the row height never changes.
The first step is wider because it clears the level-1 icon column; levels 2 and 3 have no icons, so
they step by a smaller amount. Depth is expressed by x-offset only — never by shrinking the type,
never by shrinking the row.

### Mobile — 390×844

| Product | Nav at 390 | Trigger position | Overlay |
|---|---|---|---|
| **Vercel Docs** ("Browse") | left drawer, **293px of 390 (75%)** | burger x=126.7, 32×32, `aria-label="Open docs menu"` | page behind veiled toward white (`rgb(233)` at the edge → `rgb(244)`), not a black scrim; search field at the top of the sheet |
| **Vercel** (product menu) | **full-width takeover**, rows h 40 / 18px | same bar | different overlay for a different job in the same product |
| **Linear Docs** | fixed 64px bar; drawer | burger **48×48 at x=334 (top right)** | — |
| **Stripe Docs** | header collapses | burger **at x=16 (top left)**, 24px tall | — |
| **Discourse** | header 52px, sidebar hidden | burger left of logo, 50.5×33 | — |
| **YouTube** | **fixed bottom tablist, 390×57 at y=787**, 3 tabs of 130×56, 11px labels | no burger; 48px top bar is logo + search only | frosted `rgba(255,255,255,.9)`, 1px `rgba(0,0,0,.2)` top rule |
| **Bluesky** | **fixed bottom bar, 390×62 at y=782** | — | 1px `rgb(220,226,234)` top rule |

**Five of seven ship no bottom tab bar; the two that do are consumer feed apps with three
destinations.** That split is the whole rule — see Decision 11.

### The no-shell archetype — Excalidraw

| Element | Measured |
|---|---|
| Toolbar "Island" | **542×44** at x=449, y=16 — floating, centered, radius 8, white, shadow `0 0 1px rgba(0,0,0,.17), … rgba(0,0,0,.08)` |
| Menu button | 36×36 at (16,16) |
| Footer strip | y=948, h=36, full width |
| Persistent rail | **none** |

---

## Decision 1: which navigation shell

Answer these four in order. Stop at the first one that fits.

**Q1. Does the user work inside one object at a time, full-bleed, for long stretches?**
(canvas, editor, map, video timeline, terminal, IDE)
→ **No shell.** Floating islands over the work surface, plus a command palette and keyboard
shortcuts. Excalidraw's entire navigation is a 36px button at (16,16), a 542×44 floating toolbar and
a 36px footer strip. Nothing is persistent along an edge because every pixel of edge is canvas.
The failure mode is putting a 280px rail next to a canvas and permanently stealing 20% of the work
area from a user who needed it.

**Q2. Are there fewer than five destinations, and does the user rarely switch between them?**
(marketing site, docs for one small library, a single-purpose tool, a signup flow)
→ **Top bar only.** shopify.dev ships a 48px bar with 6 destinations and nothing else at that level.
A sidebar for four items is a 280px column that is 90% empty, which reads as unfinished.

**And "fewer than five destinations" is not the same as "a small product."** Hugging Face hosts
millions of models, datasets and Spaces and ships **no sidebar anywhere** — a 65px header with six
destinations (`Models`, `Datasets`, `Spaces`, `Buckets`, `Docs`, `Pricing`) at 16px with
`padding: 2px 8px`, and search doing all the rest. That works because the objects are *found*, not
*browsed*: nobody navigates a tree of two million models. Size of catalog argues for search; number
of **kinds of thing** argues for shell. Count your kinds, not your rows.

**Q3. Is the primary object a hierarchy the user navigates by browsing — a tree of pages, files,
channels, projects, categories?**
→ **Left sidebar**, because a tree needs vertical room and the hierarchy has to stay on screen while
you work in a leaf. Every docs product in the table above is this case. So is Discourse — a forum is
a two-level tree of categories and tags, and the sidebar shows both levels at once.

**Q4. Does the product have both a set of distinct product areas AND deep structure inside each?**
→ **Both bars**, split by *kind*, never by count. Stripe: the 48px second row carries the six product
areas (Get started, Payments, Revenue, Platforms and marketplaces, Money management, Developer
resources); the 280px rail carries the tree inside whichever area you picked. The top bar answers
"which product am I in," the rail answers "where in it." Grafana does the same job differently — one
320px rail with 11 collapsible top-level areas and a 48px bar carrying only breadcrumb + search +
account, i.e. no destinations at all in the top bar.

**Q5. Is the product one infinite stream of peer items — posts, videos, messages — that the user
consumes rather than organizes?**
→ **A fixed-width centered content column with nav parked beside it, not a stretching shell.**
Measured: Bluesky renders its feed in a **600px column starting at x=420** on a 1440 viewport, with a
**245px** nav rail ending exactly where the column begins. Mastodon renders a **~598px** column with
its **285px navigation panel on the *right*** and a context/search column on the left. Neither shell
stretches to fill 1440. The content column is sized for reading (600px ≈ 70–80 characters at 16px),
the nav is whatever is left, and on a 2560px monitor you get more margin, not wider posts.

The generic alternative — a 100%-width flex row with a 280px rail and a `flex: 1` feed — produces
1160px-wide posts on a wide monitor, which nobody can read and which no shipping social product
does.

**When "command-first" is the real answer.** A palette becomes the primary navigation only when the
destination set is large, flat, and user-generated — thousands of issues, files, or documents where
no hierarchy could show them all. Even then, ship a visible shell for the ~7 stable destinations and
let the palette handle the long tail. A product whose only way in is ⌘K is unusable to the 60% of
users who have never pressed ⌘K, and it is invisible on touch. Grafana ships the palette *and* the
rail, and renders `⌘+k` as a visible chip inside the 320-wide search field in the top bar so the
shortcut is discoverable without documentation.

**The generic alternative you are avoiding:** left sidebar + top bar on everything, regardless of
shape, because that is what a dashboard template looks like. A 5-page internal tool with both bars
has ~110px of vertical chrome and a 280px rail wrapped around 40% of a screen of content.

---

## Decision 2: how many top-level destinations

Measured counts in shipping products: Stripe Docs **6** product tabs (plus two right-aligned utility
menus, `APIs & SDKs` and `Help`); shopify.dev **6**; GitHub repo **7** tabs; Sentry Docs **5**
sections; Discourse **3** view rows above the first section header; Grafana **11**.

The useful rule is not a number, it is a shape test:

- **Up to 7, flat, always visible.** This is the target. Every item is a noun a user would say.
- **8 to 12 only if every item is a collapsible container.** Grafana's 11 are legitimate because each
  one (`Alerts & IRM`, `Observability`, `Testing & synthetics`) opens a subtree of 2–9 children, and
  the rail is a directory of *product areas*, not of pages. A flat 11-item list of pages is a
  different thing and it fails.
- **Over 12 means you skipped a grouping level.** Add section headers and demote, or move the tail
  into a search/palette. Do not add a "More" that hides items 9–14 — that is a place where features
  go to die.

**The two items that are never top-level destinations:** Settings and Help. Both go to a corner, and
neither competes for the eye with the product's actual nouns. Measured: Stripe puts `Help ▾` at the
far right of the second bar (x≈1369 of 1440). Grafana puts `Administration` last in the rail with a
gear and a help `?` in the top-right cluster. Discourse pins the theme/preferences controls to the
**bottom** of the rail, below a 1px rule, at y≈877 of 900.

**The bottom of the sidebar is a real slot and generated UI never uses it.** Measured occupants:
Discourse = theme switcher + light/dark toggle + keyboard-shortcuts button. Stripe Docs = country
(`🇺🇸 United States`) and language (`English (United States)`) pickers at y=936. Grafana = the rail
collapse toggle at (289, 880) above a 44px footer strip with a top border. The rule: **navigation
goes at the top, preferences about the shell itself go at the bottom.**

---

## Decision 3: sidebar craft

### Width

Pick 280 unless you have a reason. If the rail carries a three-level tree, 300–320. If it carries a
flat list of ≤8 short labels, 240 (Tailwind). If it is icon-only, 44–52 — VS Code for Web ships a
**44px** rail with **36×36** targets at a 44px pitch. The rail width is not a grid decision, it is a *longest
label* decision: measure your longest real label at your real font size and add the icon column,
the indent, and 24px of trailing room for a chevron or a count.

Internal padding matters more than the outer number. Vercel's rail is 300 but the nav inside it is
288 with `padding: 4px`, and rows are 264 wide starting at x=12 — so the *visible* row column is 264,
not 300. Sentry declares `--sidebar-width: 300px` and puts rows at x=12 with `padding: 8px`.

### Rows

| Property | Ship this | Because |
|---|---|---|
| Height | **32** (dense app) or **36–38** (docs, roomier app) | measured range across 12 products is 28–39 |
| Pitch | = height, i.e. **gap 0** | ten of twelve products stack rows flush; visible gaps make a nav list read as a stack of cards |
| Radius | **4–6** (or 999 for a pill language) | measured: 4 (Sentry, PostHog, shopify.dev), 6 (Grafana, Vercel), 999 (Discourse), 0 (Stripe, Notion, MDN, Tailwind) |
| Inset from rail edge | **8–12** each side | Grafana 8, Vercel 12, Sentry 12, Discourse 8 |
| Font | **14px**, line-height 20–22 | 14 in nine of twelve; Notion and MDN use 16 because their rails carry few, long items |
| Icon → label gap | **4–8** | Sentry 4, Vercel 8, Discourse 8 |
| Hit target | the full row width, not the text | a 264px-wide target that starts at the rail edge is what makes a sidebar feel solid |

### When a sidebar icon earns its place

Four of twelve measured sidebars ship **zero icons** — Stripe Docs, PostHog Docs, Supabase Docs,
Tailwind Docs. All four are lists where every row is the same kind of thing: a documentation page.
An icon on every row of a homogeneous list carries zero information, costs 24–32px of horizontal
room, and forces you to invent a glyph for "Webhooks" that nobody will recognize.

Icons earn their place in exactly two situations, both visible in the measured set:

1. **The rows are different kinds of things.** Grafana's 11 top-level items are separate product
   areas — a dashboard is not an alert is not a data connection — and the icon is the fastest way to
   tell them apart at a glance in a rail you scan a hundred times a day.
2. **The icon is identity, not category.** Discourse's `CATEGORIES` section gives each category its
   own colored emoji/glyph, while the utility rows in the same section (`All categories`, `All
   tags`) use a neutral monochrome list icon. Colored icon = a specific object. Grey icon = an
   action or a view. That distinction does more for scannability than the icons themselves.

**The correction, stated as a rule:** if you cannot name a *different* icon for every row without
resorting to a generic shape (a circle, a square, a folder, a gear) for more than one of them, drop
icons from the whole list. A half-iconed list is worse than either extreme.

### Active state

Two signals, from this menu, and use the same pair everywhere in the product:

| Signal | Measured example | Note |
|---|---|---|
| Low-contrast fill | Grafana `rgb(46,48,54)` on `rgb(24,27,31)` (~9% white lift); PostHog `rgba(30,31,35,.15)`; Discourse `#f2f3f3` | the workhorse |
| Weight bump | Stripe 400→**700**; Discourse 400→600; shopify.dev 400→600; GitHub tabs 400→600 | free, and survives color-blindness and low-contrast screens |
| Accent text | Stripe `#5469d4`; Supabase `rgb(10,132,78)`; Discourse `#7b5fe2` | |
| Edge bar | Grafana **2px** `#FA7339` at x=7–8, hugging the row's left edge | reads instantly in peripheral vision |
| Solid accent fill | Sentry `#6a5fc1` with white text | high-impact; only viable when at most one row is ever active |
| Inverted surface | shopify.dev: **white** row on a `#f6f6f7` rail | works only if the rail itself is tinted |

Never use a **border** as the active state. A 1px border added on activation changes the row's box
and shoves its neighbors by a pixel unless you compensate, and it reads as "disabled input" rather
than "you are here." Not one of the twelve measured products does it.

**One mandatory exception — and it is the case where following the rule literally produces the worst
interface in this file.** Under Windows High Contrast / `forced-colors: active`, the OS repaints
backgrounds and text with system colors: your low-contrast fill is gone, your accent text is gone,
and a weight bump was never enough on its own. Both of your two signals vanish, and the active row
becomes invisible to exactly the users who cannot afford that. Ship a
`@media (forced-colors: active)` block that adds the border this section otherwise bans, using
`Highlight`/`HighlightText`, and reserve its space at rest with `border: 1px solid transparent` so
nothing shifts when the mode turns on.

### Hover state

Measured, all three products, all three identical in the thing that matters:

```
Grafana    color rgba(204,204,220,.65) → rgb(204,204,220)     transition: all 0s
Discourse  bg transparent → oklch(.581 .191 288.9 / .15)      color → #7b5fe2
Vercel     bg transparent → #f2f2f2                           color #4d4d4d → #171717
```

No transform. No border. No shadow. No scale. Two of the three have **zero transition duration** —
the fill appears on the same frame as the cursor. This is deliberate: when you sweep a cursor down
30 rows, a 150ms fade means five rows are mid-animation at any moment and the list shimmers.

**Contradicting the common advice:** "always add a smooth 200ms transition on hover" is wrong for
dense navigation lists. It is right for a single large button. The dividing line is *how many of
these will be under the cursor in the next second*. One → animate. Thirty → don't.

**Scope, and it inverts:** this rule covers rows that only change *appearance*. Any hover that
**opens a surface** — a flyout submenu, a mega-menu, a preview card — needs the opposite treatment.
Take an e-commerce category bar of eight mega-menus and apply "0ms, instant": a cursor travelling
from `Women` to `Sale` detonates six full-width panels on the way, and the page strobes. Opening on
hover requires **120–300ms of open intent, a ~200ms close delay, and a safe triangle** that keeps the
open panel alive while the cursor moves diagonally into it. Instant is for repaint; delayed is for
disclosure. A nav that does both must use both.

### Sections and headers

Measured section-header treatments:

- **Stripe Docs**: uppercase, ~12px, grey, with a **1px horizontal rule** between groups. Groups are
  the product's own taxonomy: `ONLINE PAYMENTS`, `IN-PERSON PAYMENTS`, `PAYMENT METHODS`.
- **Sentry Docs**: uppercase 12.8px / weight 500. Groups are **verbs**: `PRODUCT`, `DETECT`, `DEBUG`.
- **Discourse**: uppercase ~13.9px with a **collapse chevron on the header itself**: `CATEGORIES`,
  `TAGS`. The first three rows (`Home`, `Topics`, `More`) sit above any header — the unlabeled group.
- **Vercel Docs**: sentence-case grey labels: `Start`, `Build AI apps`, `Run agents and backends` —
  also verbs, also describing the user's intent rather than the feature family.

Two patterns worth stealing. First, **the unlabeled first group**: Discourse and most well-built
sidebars put the 2–4 views everyone uses every day at the top with no header at all, then start
labeling. A header over your top three items is bureaucracy. Second, **verb sections beat noun
sections** when the product has more features than the user has vocabulary. `Detect` / `Debug`
(Sentry) and `Build AI apps` / `Run agents and backends` (Vercel) route by intent. `Monitoring` /
`Tools` / `Advanced` routes by nothing.

### Nesting

- Row height is **constant at every depth** (Grafana: 32px at depths 1, 2 and 3). Do not shrink
  nested rows and do not shrink their type.
- Indent by x only. Grafana steps 8 → 40 → 60; Sentry steps 12 → 24 → 36; Stripe adds a flat
  `padding-left: 16px` for children.
- **Three levels is the limit in a rail.** Grafana's fully-expanded tree is 1534px+ tall in a 952px
  rail; even with everything collapsed by default, a fourth level means the user is scrolling a
  navigation column to find navigation.
- Put the disclosure chevron on the **left** when it toggles the subtree (Stripe: `> Use Payment
  Links`, with childless siblings indented to match so the labels align). Put it on the **right**
  when the row is itself a destination *and* has children (Grafana, Vercel, Sentry) — clicking the
  label navigates, clicking the chevron expands. Those are two different components; do not use one
  glyph position to mean both things in one product.
- **Collapse everything except the ancestors of the current page on load — but only when the expanded
  tree is taller than the rail.** A 14-page docs site whose whole tree fits in 900px should ship it
  open: collapsing hides ten siblings to save no scrolling at all, and sibling visibility is the only
  reason the rail exists. Measure the expanded height against the viewport, then decide.

### Workspace and project switchers

Three shapes, in order of how much room they deserve:

1. **The identity is fixed for a session** (most B2B tools): a row at the very top of the rail
   showing the current workspace's name + avatar, opening a menu. It is not a nav item — it does not
   get an active state, and it sits above the first divider.
2. **The identity changes constantly** (agencies, multi-tenant admin): promote it to the top bar as a
   dropdown next to the logo, so it stays visible when the rail is collapsed.
3. **Scope is a filter, not an identity** — "which projects am I looking at" rather than "which
   company am I". Then it is not a switcher at all; it is a filter chip row above the content.
   Sentry's app does exactly this: `My Projects ▾  All Envs ▾  90D ▾` sit as dropdowns above the
   issue table, not in the rail. If two of those can be true at once, it is a filter.

Getting this wrong is expensive: a workspace switcher that is really a filter makes users think data
disappeared; a filter that is really a switcher makes them think they are in the wrong account.

### Collapsibility

Ship a rail collapse only if (a) the content is width-hungry — tables, canvases, diffs, code — and
(b) you have somewhere sensible to put the toggle. Grafana puts it at the **bottom-left** (289, 880),
above a 44px footer strip with a top border, so it never competes with navigation. Stripe puts a
`←|` glyph at the **top-right of the rail** (255, 135). Discourse puts the toggle in the **top bar**,
left of the logo, because collapsing is a page-level action there.

**The reference implementation of a collapsed rail is VS Code's activity bar**: 44px wide, six
36×36 targets on a 44px pitch, pinned to the left edge with 8px radius on its outer corners, and
`Accounts` + `Manage` (settings) pushed to the bottom at y=784 and y=828 in an 807px column. Six
icons, each one a genuinely different *mode* of the product (files, search, source control, run,
remote, extensions) — which is the only condition under which naked glyphs are legible. Note it does
not collapse to icons; the 44px rail is the permanent state and the 300px panel beside it is what
opens and closes. That is a better model than a rail that shape-shifts: the mode switcher never
moves, so muscle memory survives.

If you do collapse a labeled rail to icons, keep the labels. An icon-plus-label rail (Sentry's app
ships `Issues`, `Explore`, `Dashboards`, `Insights`, `Settings` this way, help pinned at the bottom)
is far more usable than naked glyphs with tooltips, and the label is what lets you exceed six items.
Budget ~52–64px of width for it rather than the 44 a glyph-only rail needs — that number is a
consequence of your longest label at 11–12px, so measure it. Persist the collapsed state per user,
not per session.

---

## Decision 4: breadcrumbs — when they earn their place

Breadcrumbs earn their place when **the hierarchy is deeper than two levels and the user can arrive
in the middle of it from outside** — search results, a shared link, a notification. That is
documentation, file systems, catalogs, and folder-organized dashboards. It is not a five-page app.

Measured placements, and what each is for:

- **Grafana** puts it *inside the 48px top bar* at x=352 (rail 320 + 32px gutter), 14/22, showing
  even at depth 1. Because the rail already answers "which area," the breadcrumb only has to answer
  "which folder inside it" — and Grafana's breadcrumb reflects the **dashboard's folder path**, not
  the navigation path. That is the right call: a breadcrumb describes where the *object* lives, not
  the route you happened to take.
- **MDN** ships a dedicated full-width bar, `--breadcrumbs-bar-height: 2rem`, 16px type, 16px gap,
  folded into `--sticky-header-height: calc(var(--navigation-height) + var(--breadcrumbs-bar-height))`
  so the sticky offset has one source of truth.
- **Sentry Docs** puts `Home / Product Walkthroughs / Issues` at 14px directly above the H1, every
  segment a link in `#6a5fc1`.

Rules:

- **Never a substitute for a back affordance.** A breadcrumb tells you where you are; it does not
  tell you where you came from. If a user can reach a page from three parents, the breadcrumb shows
  the canonical one and the browser back button does the rest.
- **Truncate the middle, never the ends.** `Docs / … / Reference / display`. The first segment is the
  scope and the last is the identity; the middle is the part you can afford to lose.
- **Give the last segment a color.** Sentry colors every segment including the current one. A grey
  final crumb that is not clickable is fine, but it must still be legible — do not drop it to 40%.
- **Skip them entirely when the sidebar already shows the path.** Stripe Docs has a 280px rail with
  the current page highlighted inside its section, and ships **no breadcrumb** on doc pages. Adding
  one would state the same fact twice.

---

## Decision 5: tabs vs sub-navigation vs segmented controls vs filters

These are four different components and generated UI collapses them into one. The distinguishing
question is **what changes when you click**.

| Component | What changes | URL | Visual language | Measured example |
|---|---|---|---|---|
| **Tabs (underline)** | the *view* of one object; same object, different facet | new path segment | 14px, weight 400→600, 2px accent underline | GitHub repo: `Code / Issues / Pull requests / …`, h30, `::after` 2px `rgb(253,140,115)` |
| **Sub-navigation** | a different *page* within a section | new path segment | same as sidebar rows | Stripe's second bar, 6 items, h34 |
| **Segmented control** | a *display mode* — grid vs list, chart vs table | query param at most | small, enclosed in a tinted track, one pill slides | Grafana's folder/list toggle in the toolbar |
| **Filter chips** | *which rows*, not which view | query params | dropdown pills with a caret | Sentry app: `My Projects ▾  All Envs ▾  90D ▾`; Discourse: `categories ›  tags ›` |

Discourse shows all four idioms coexisting correctly on one screen: two dropdown pills (`categories
›`, `tags ›`) that narrow the query, then four underline tabs (`Latest / Hot / Top / Categories`, h38,
active `#7b5fe2` + underline) that switch the view, then a table. The pills look like pills and the
tabs look like tabs and no one has to guess which one destroys their filter.

**Rules that come out of the measurements:**

- Use **one** tab idiom per product. Stripe uses the identical underline treatment for global product
  tabs and for in-page content tabs — so "underline" reliably means "same thing, different facet" no
  matter where you see it.
- Tabs go **above** the content they control and are **left-aligned**, not centered. Centered tabs
  make the eye re-find the start of the list every time the labels change length.
- **Never scroll tabs horizontally on desktop — unless the user authored the tabs.** More than ~7
  *product-defined* facets means it is sub-navigation, not tabs. But saved views (Linear, Notion,
  Airtable) are user-created and unbounded: demoting them into a rail moves the thing the user made
  out of the place they made it, and capping the count means refusing to save a view. There the
  shipped answer is a scrolling strip with a pinned `+` and an overflow menu listing every view.
  **The test is authorship: if you wrote the list, cap it; if the user writes it, let it scroll.**
  On mobile, scroll either kind, always with a visible cut-off edge.
- Put the count **in the tab**, as a neutral pill, not as a red dot. GitHub: 12px / weight 500,
  radius 24, pad `0 6`, bg `rgba(129,139,152,.12)`. The accent is reserved for the active indicator.
- A segmented control needs **2–4 options, all short, all mutually exclusive, all instantly
  reversible**. Five options is a select. Options that trigger a fetch are tabs, not a segment.

---

## Decision 6: search and command palettes as navigation

**Search becomes primary navigation when the destination count exceeds what any tree can display** —
issues, messages, files, customers, logs. In that world the sidebar's job changes: it stops being a
list of destinations and becomes a list of *saved queries* (Grafana: `Starred`; Discourse: `Latest`,
`Topics`; GitHub: `Issues`, `Pull requests`). That reframing is the actual insight — a saved query in
the nav is worth ten static pages.

**Palette geometry, from the measured table:** 512–640 wide for a nav palette, up to 800 when the
palette also does full-text search with snippets. Anchor it **15–22% from the top** of the viewport,
not centered — results grow downward and a centered dialog jumps as they arrive. Radius 8–14. The
input is 28–56px tall; the discipline is that its font size is 15–18px, larger than the result rows,
because that is where the user is looking.

**Result rows: 36–44px for a nav palette, 55px when each result carries a snippet.** Vercel's 55.2px
rows fit a title plus one line of body text at 14px, which is what makes their palette a real search
tool rather than a jump list. Selected row = **4–5% black fill**, radius 6–8. Never a border, never
an outline, never a color change on the text.

**Non-negotiables the measured products all get right:**

- Render the shortcut as a **visible chip** in the search affordance. Grafana ships `⌘+k` inside its
  320px-wide header search field. Stripe ships `/`. Sentry ships `⌘K`. A palette nobody can discover
  is a palette nobody uses.
- **Mix kinds and label the groups.** Supabase: `Docs` (search results) / `Go to` (navigation) /
  `Quick starts` (tasks) / `Support` (escape hatch). Its second row is literally "Ask Supabase AI" —
  the palette is where the product puts things that do not fit the nav.
- Keep it working with **no query typed**. An empty palette should show recents and the top
  destinations, not an empty state. That is what makes it faster than the sidebar for the second
  visit.
- Escape closes; the trigger key toggles; focus returns to where it was. A palette that leaves focus
  on `<body>` after closing breaks keyboard users for the rest of the session.

---

## Decision 7: URL design is information architecture

The URL is the only part of your IA that survives a screenshot, a Slack paste, a bookmark and a
rewrite of the frontend. Design it first; the nav is a rendering of it.

**Measured patterns worth copying:**

```
Grafana     /d/to6j8mh/grafana-play-home?from=now-6h&to=now&timezone=utc
Discourse   /c/news-and-events/207        /tag/official/83        /latest    /categories
GitHub      /vercel/next.js/blob/canary/packages/next/package.json
            /vercel/next.js/{issues,pulls,discussions,actions,security,pulse}
            /login?return_to=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Fblob%2F…
MDN         /en-US/docs/Web/CSS/display  →  301  →  /en-US/docs/Web/CSS/Reference/Properties/display
```

Six rules fall straight out of those:

1. **Stable id + human slug, in that order of authority.** Grafana `/d/<uid>/<slug>` and Discourse
   `/c/<slug>/<id>`. The id resolves; the slug is decoration that can be renamed at any time without
   breaking a single existing link. GitHub is the exception that proves it: `owner/repo` *is* the
   stable id because GitHub enforces uniqueness and issues redirects on rename.
2. **Store relative state, not resolved state.** Grafana writes `from=now-6h&to=now`, not two
   timestamps. A link shared in an incident channel still means "the last six hours" tomorrow. The
   generic version — serializing the resolved epoch millis — produces links that quietly go stale.
3. **The path is identity; the query is view.** Which object → path. Which filters, sort, tab,
   page, time range, selected row → query. Getting this backwards (`/issues/open/assigned/me/page/3`)
   makes every filter combination a new route and every route a new cache entry.
4. **Every top-level nav item is one path segment, and it matches its label.** GitHub's seven repo
   tabs are `/issues`, `/pulls`, `/discussions`, `/actions`, `/security`, `/pulse`. If a user cannot
   guess the URL from the label, the label is wrong or the route is.
5. **Preserve the destination through auth.** GitHub's every logged-out link carries
   `?return_to=<url-encoded current page>`. A login flow that dumps everyone on `/dashboard` throws
   away the intent that brought them.
6. **When you restructure, redirect.** MDN moved `display` two levels deeper and still serves the old
   path with a 301. Restructuring IA without redirects is how a product loses its search traffic and
   its users' bookmarks in one deploy.

**The state that must be in the URL, as a checklist:** the object being viewed; the active tab; every
active filter; the sort; the page or cursor; the selected row when the page has a detail pane; the
time range; the search query. If your app has a "copy link" button that produces a URL that does not
restore the screen the user is looking at, the button is lying.

**Two products where following that checklist literally makes the product worse, and the scopes that
fix it:**

- **A patient chart, a candidate pipeline, a payroll run, a legal matter.**
  `?patient=MRN-4482913&filter=dx%3Ahiv` restores the screen perfectly and also writes a diagnosis
  into the load balancer's access log, the shared-workstation history dropdown, the Slack unfurl
  preview, and the `Referer` header sent to every third-party script on the page. **Scope: the path
  carries an opaque id and nothing else; no attribute of a person ever appears in a query string.**
  Filters over sensitive attributes become a server-side saved view (`/views/xk3f`) whose id is
  meaningless outside an authenticated session, and "copy link" copies the view id.
- **A multi-step flow — checkout, onboarding, a tax return, a KYC form.** Give step 4 its own URL and
  a pasted link lands a cold user on a form whose validity depends on steps 1–3; it renders empty and
  cannot submit. **Scope: steps get `push`ed history entries so Back works, but a step URL loaded
  cold redirects to the furthest *valid* step.** The URL is a bookmark into a session, not a
  standalone address.

---

## Decision 8: back button and history semantics in an SPA

The rule: **`pushState` for anything the user would expect Back to undo, `replaceState` for anything
else.** In practice:

| Action | History op | Why |
|---|---|---|
| Navigate to a different object or page | `push` | Back returns to the list |
| Switch tabs within an object | `push` | users treat tabs as places |
| Open a detail pane / drawer over a list | `push` | Back closes it — this is the single biggest SPA win, and it also makes the row deep-linkable |
| Open a modal that is a *step* (checkout, wizard) | `push` | Back = previous step |
| Open a confirm/destructive dialog | **neither** | Back must not silently confirm or dismiss ambiguously; use Escape |
| Type in a search box | `replace`, debounced ≥300ms | otherwise ten keystrokes = ten history entries and Back is destroyed |
| Toggle a filter chip | `replace` | filters are a continuous adjustment, not a destination |
| Change sort or page size | `replace` | |
| Paginate | `push` | users expect Back to return to page 2 |
| Scroll | neither, but **restore scroll on `popstate`** | landing at the top of a 400-row list after Back is the classic SPA failure |

Two more things the measured products get right and generated code usually does not:

- **Restore scroll position and list state on back-navigation**, including expanded sidebar sections
  and virtualized-list offset. Cache the list data; do not refetch from scratch and re-scroll to top.
- **Do not trap the user in a redirect loop between `/` and `/dashboard`.** If `/` redirects to
  `/dashboard`, pressing Back from `/dashboard` must not land on `/` and bounce forward again. Use a
  `replace` on the entry redirect.

---

## Decision 9: settings IA — the most-neglected surface

Settings is where products go feral, because every team adds one toggle and nobody owns the page.
Three structural decisions fix 90% of it.

**1. Split by *who it affects*, at the top level, and say so out loud.**

```
Account     — this human, everywhere (name, password, 2FA, notification prefs, theme)
Workspace   — everyone in this org (members, roles, billing, SSO, domains, audit log)
Project     — this one object (integrations, environments, webhooks, danger zone)
```

Grafana makes the scope literal: `/admin` renders `Administration` with the subtitle
**"Organization: Play Grafana"** directly under the H1. One line, and the user knows whose settings
they are editing. The generic alternative is a settings page with no scope statement, where a user
changes a workspace-wide default thinking it was personal.

**2. The settings landing page is a directory, not a redirect.** Measured: Grafana's `/admin` shows
cards — a title (`Plugins and data`) plus a one-line description ("Install plugins and define the
relationships between data") — rather than bouncing to the first sub-tab. That description line is
the entire feature: it is what lets someone find the SSO settings without opening six tabs.
Redirecting `/settings` to `/settings/general` is the default behavior of every routing library and
it is the wrong one, because it removes the only page that could have shown the map.

**2b. Measured: the best settings surface in shipping software is search-first.** VS Code for Web's
settings editor, probed at 1440×900:

| Element | Measured |
|---|---|
| Search field | **1094×26**, radius 4, the **first** element in the pane, full width, above everything |
| Scope selector | `User` / `Workspace` tabs, **22px** tall, directly under the search field — plus `Remote` and `Folder` when they apply |
| Table of contents | **200px** pane, rows **22px**, radius 4, 13px type, active row = fill `rgb(31,31,31)` + white text |
| TOC top level | **9 items**: `Commonly Used`, `Text Editor`, `Workbench`, `Window`, `Chat`, `Features`, `Application`, `Security`, `Extensions` |
| One setting's row | **98–125px tall** — bold `Namespace: Setting Name`, one line of description, then the control |

Four things to steal from that, each of which most products get wrong:

- **`Commonly Used` is the first TOC entry.** A curated shortlist of the ~8 settings people actually
  change, duplicated out of the deeper tree. Duplication in settings navigation is correct;
  duplication in product navigation is not.
- **The scope tabs are two clicks from every setting, always visible.** `User` vs `Workspace` is the
  Account/Workspace split rendered as a control instead of as two separate pages, so you can never
  edit the wrong scope without having chosen it.
- **Labels are namespaced** — `Editor: Font Size`, `Files: Auto Save`, `Extensions: GitHub Copilot
  Chat`. That prefix is what makes a settings search result self-describing, and it is what lets the
  same settings appear in the command palette without context.
- **Descriptions cross-link other settings.** "Format a file on save. A formatter must be available…
  When `Files: Auto Save` is set to `afterDelay`, the file will only be formatted when saved
  explicitly." Settings that interact should say so and link, because the alternative is a support
  ticket.

The 98–125px per setting is the real cost of doing this right, and it is why "one line of help text
at rest" is a structural decision, not a polish decision: it roughly triples the height of every
settings page and you must design the IA for that from the start.

**3. Inside a settings section, group by task and put destructive last.** The order that works:

```
1. Identity          what this thing is called, its icon, its slug
2. Access            who can see and do what
3. Behavior          the toggles that change how it works day to day
4. Integrations      connected services, API keys, webhooks
5. Danger zone       transfer, archive, delete — visually separated, red-bordered, confirm by typing the name
```

Additional rules that come from watching real settings pages fail:

- **Every setting gets one line of help text**, present at rest, not in a tooltip. If you cannot
  write the line, the setting's label is wrong.
- **Settings are searchable.** Once you pass ~30 settings, add them to the command palette as their
  own group. Supabase's palette does this with a `Go to` group and by exposing preference actions
  ("Use system theme") as palette items.
- **Save behavior must be consistent and stated.** Either every settings page auto-saves per field
  with an inline confirmation, or every page has a sticky save bar that appears only when dirty.
  Mixing the two inside one product is how people lose work.
- **Deep-link every section.** `/settings/workspace/members` — because support answers, docs and
  onboarding emails all need to point at one specific setting.
- Do **not** put settings behind an avatar menu only. The avatar menu is for the *account*; workspace
  and project settings belong in the rail or the section they configure.

---

## Decision 10: notifications and inbox patterns

The three shapes, and when each is correct:

| Shape | Use when | Measured reference |
|---|---|---|
| **Count on the destination** | the items live somewhere that already exists in the nav | GitHub tabs: `Issues 1k`, `Pull requests 2.3k`, `Security and quality 61` — 12px / weight 500 pills, radius 24, `rgba(129,139,152,.12)` |
| **A dot, no number** | "something changed" is enough, and the count is not actionable | any nav row where the number would be noise |
| **A real inbox destination** | the user's work *starts* from a triage queue | Sentry's `Issues Inbox`; Discourse's `/latest`, `/new`, `/unread` routes |

**The measured lesson is about color.** GitHub carries five-figure counts on a repo page and none of
them are red. The counter is a **neutral 12% grey pill**; the only accent color on that bar is the
2px active-tab indicator. Red is reserved for a state the user must act on — a failing build, an
unhandled error. Generated UI inverts this: red badges on Messages, Notifications, Updates and Tasks
simultaneously, which trains the user to ignore all four within a week.

Rules:

- **Never show a badge the user cannot clear.** If clicking through does not zero the count, do not
  show a count.
- **Cap the display, keep the truth.** GitHub renders `1k` and `2.3k`, not `1043`. Precision above
  ~99 is noise; the useful signal is the order of magnitude.
- **An inbox needs a read/unread model and a triage verb.** Read state, an archive/done action, and
  filters for `unread` / `assigned to me` / `mentions`. Without a done action it is a feed, and feeds
  make people anxious rather than productive.
- **Put the notification bell in the top-right cluster, next to help and account** — never in the
  sidebar. Grafana's top bar carries `+ ▾`, `?`, an assistant button and the account, all right-
  aligned in a 48px bar. That cluster is a well-learned convention and it is the one place users
  look without thinking.

---

## Decision 11: mobile navigation

**The real evidence, measured at 390×844, splits cleanly along one line — and it is not the line
most style guides draw.**

Products that ship **no** bottom bar: Stripe Docs, Vercel Docs, Linear Docs, Discourse, Grafana. All
five keep a 48–64px top bar and put navigation in a drawer or a full-width takeover.

Products that ship a **fixed bottom bar on the mobile web**, measured:

| Product | Bar | Tabs | Item | Label | Surface |
|---|---|---|---|---|---|
| **YouTube** (m.youtube.com) | `position: fixed`, **390×57 at y=787**, `role="tablist"` | **3** (`Home`, `Shorts`, `You`) | **130×56** each | icon over **11px** label | `rgba(255,255,255,.9)` frosted + **1px `rgba(0,0,0,.2)`** top rule |
| **Bluesky** (bsky.app) | `position: fixed`, **390×62 at y=782** | measured signed out, so the bar carried auth CTAs rather than tabs — the chrome itself is the same fixed 62px strip | — | — | opaque white + **1px `rgb(220,226,234)`** top rule |

YouTube's top bar in the same layout is **48px carrying only a logo and one 48×48 search target** —
no burger at all. The entire IA is three bottom tabs plus search.

So the honest rule is not "bottom tabs are for native apps." It is:

- **Ship bottom tabs when the product is a small set of peer *feeds or modes* the user flips between
  mid-session, and the session is long.** Three to five, equal weight, no hierarchy underneath them
  worth showing. YouTube ships **three**. That is the shape.
- **Ship a drawer when navigation is a hierarchy you *enter*, use, and leave.** Docs, dashboards,
  admin tools, anything with sections and sub-sections. A drawer costs one tap and buys unlimited
  depth; a tab bar costs 57–62px of every screen forever and caps you at five.
- **Never both**, and never a tab bar over a nav set that will grow. The tab bar is the hardest nav
  to change later because it is the most memorized.

Two mechanical facts to design around if you do ship one:

- Mobile Safari's URL bar and Chrome-on-Android's toolbar occupy the same edge and show/hide on
  scroll. Use `100dvh`/`svh`, add `padding-bottom: env(safe-area-inset-bottom)`, and expect the bar
  to be briefly overlapped during the browser's own transition. YouTube's answer is a **translucent**
  bar — when browser chrome slides over it the collision reads as layering rather than as breakage.
- **57–62px is the measured height**, not 44 and not 80, and the label is **11px** — smaller than any
  other text in the product. A bottom bar with 14px labels and 72px height is a phone-app pastiche.

On thumb reach: the ~49% one-handed figure everyone cites traces to Hoober's 2013 observation of
1,333 people. Directional, and a decade old. Do not size a control from it.

**What to ship on mobile web, with measurements:**

Vercel Docs is the reference implementation. Its docs drawer is **293px of 390 (75%)**, left-anchored,
with the page behind veiled toward white (`rgb(233)` at the sheet edge fading to `rgb(244)`) rather
than covered by a black scrim. The remaining 97px is a tap target for "dismiss" and a reminder that
the page is still there. Inside the sheet: a title (`Browse`) and a `×` at top, then a **search field
first**, then the same section-grouped list with chevrons.

Note that the same product ships a **different** mobile menu for its marketing nav: full 390 width,
40px rows, 18px text. Two menus, two jobs — a dense hierarchy you scan vs. six destinations you pick.
That is correct, not inconsistent.

The rest:

- Trigger placement is genuinely unsettled: Stripe puts the burger at **x=16 (top left)**, Linear at
  **x=334 (top right, 48×48)**, Discourse left of the logo. Pick one and never move it. Right side is
  marginally better for thumb reach on large phones; left is more conventional.
- **Search before navigation** in the sheet. On a phone, typing three characters beats scrolling
  forty rows.
- Rows can go to **40–44px on touch** — this is where the 44px minimum actually applies, and it is
  the reason a 32px desktop row is *not* a violation.
- Closing must work three ways: the `×`, tapping the veil, and the back button (`push` the drawer
  onto history).
- Keep the current section expanded and scrolled into view when the sheet opens. A 40-row list that
  opens at the top, with the user's location 600px down, is the same as no navigation.

---

## The three-question test

Run this against any screen, at any depth, arriving cold from a shared link:

1. **Where am I?** Can you answer without reading the body content? You need the active nav item, a
   page title, and — if you are more than two levels deep — a breadcrumb. Grafana answers it three
   times over: the rail highlights `Administration` with an orange edge bar, the top bar shows the
   breadcrumb, and the H1 says `Administration` with `Organization: Play Grafana` under it.
2. **Where can I go?** Are the other destinations at this level visible, or did you have to open
   something to see them? Sibling visibility is the entire argument for a persistent rail.
3. **How do I get back?** Is there a route up that is not the browser back button? Breadcrumb, a
   parent link, or a persistent nav item. And does the browser back button actually work — including
   after opening a detail pane, changing a filter and paginating?

A screen that fails any of the three needs structural work, not styling.

---

## When this advice is wrong

- **Dense 32px rows are wrong for a consumer product used twice a month.** Grafana's density is right
  for a rail an SRE scans hundreds of times a day. A tax filing app, a healthcare portal, a utility
  bill payment flow should ship 44–48px rows, 16px type, and half as many items. Density is earned by
  usage frequency, not by taste.
- **"Never move on hover" is wrong for marketing pages and card grids.** A landing page's feature
  cards *should* lift; it signals affordance to a first-time visitor who has no idea what is
  clickable. The rule applies to dense, repeated, high-frequency lists.
- **Breadcrumbs are wrong in a flat product.** Three of the twelve products measured ship none.
  `Home / Settings` is a breadcrumb that has never helped anyone.
- **A command palette is wrong for a product with 12 destinations and non-technical users.** It costs
  real implementation and maintenance and will be used by under 2% of that audience. Ship search;
  skip the palette.
- **Icons in the sidebar are wrong when every row is the same kind of thing.** Stripe, PostHog,
  Supabase and Tailwind all ship zero. This is the most commonly ignored boundary in this document.
- **URL-encoding all state is wrong when the state is huge or sensitive.** A 40-node filter tree
  belongs in a saved-view id (`/views/xk3f`), not in a 2KB query string. Never put anything in a URL
  that you would not want in a server access log, a Slack unfurl, or a referrer header.
- **The 8-item ceiling is wrong for platforms.** Grafana ships 11 top-level items legitimately
  because it is eleven products. If you genuinely have eleven product areas, group and collapse them
  — do not pretend you have six.
- **"Bottom tabs are only for native apps" is wrong**, and the corpus of advice repeating it is out
  of date. YouTube and Bluesky both ship fixed bottom bars on the mobile *web* (57px and 62px). The
  real boundary is the shape of the destination set: 3–5 peer feeds you flip between mid-session →
  bottom bar; a hierarchy you enter and leave → drawer. Docs sites are drawers because docs are a
  tree, not because the web forbids bottom bars.
- **"Never nest navigation" is wrong for section-scoped nav.** GitHub renders a **321px** file-tree
  pane that exists only inside `/blob` and `/tree` and nowhere else in the product — a third level of
  navigation, scoped to one section, that would be absurd if it were global. Nav local to a section
  is cheaper than forcing that section's structure into the global rail.
- **Duplicating an item in settings navigation is right**, even though duplicating a product nav item
  is wrong. VS Code's `Commonly Used` group repeats eight settings that also live in the deeper tree.
  Settings are searched, not memorized; a shortcut list at the top saves more time than consistency
  costs.
- **"Always use a left sidebar for apps" is wrong for canvases and editors.** Excalidraw's shell is
  three floating elements and it is more usable than any rail would be.
- **Auto-saving settings is wrong for anything with a blast radius.** Toggling "Require SSO for all
  members" should require an explicit save and a confirmation. Auto-save is for preferences, not for
  policy.

---

## The AI navigation tell

Four failures, in the order a reviewer notices them.

### Tell 1: the generic IA

**What it looks like:** `Dashboard / Analytics / Reports / Users / Settings`, or `Home / Projects /
Team / Billing / Help`. Sometimes `Overview` instead of `Dashboard`. This nav would fit any of ten
thousand products, which means it fits none of them.

**Why it happens:** the model was asked for "a dashboard" and produced the mean of every dashboard
in its training data, without ever asking what this software is for.

**The corrective procedure:**

1. Write down the **nouns** the product creates, owns or watches, in the user's own words. Not
   feature names — object names. For Sentry: issues, traces, replays, releases. For Discourse:
   topics, categories, tags. For Grafana: dashboards, alerts, data connections.
2. Write down the **top three things a user does in their first minute of a normal workday.** Those
   are your first three rows, above any section header.
3. Cross out any nav item that is not one of those nouns or one of those actions. `Dashboard`
   survives only if there is a real, distinct artifact called a dashboard. `Analytics` almost never
   survives — it is a category of thinking, not a place.
4. `Settings` and `Help` move to a corner. They are not destinations, they are utilities.
5. Read the remaining list out loud. If it sounds like a product tour, redo it; if it sounds like a
   filing cabinet the user already has in their head, ship it.

### Tell 2: eight identical icon+label rows

**What it looks like:** a 240–280px rail with 8–10 rows, each a 20px outline icon plus a label, all
the same weight, all the same color, no sections, no dividers, no counts, no active state beyond a
faint background — and at least three of the icons are a generic square, circle or folder because
the model ran out of meaningful glyphs.

**Why it fails:** a list where every row looks identical has no hierarchy, so the eye has nothing to
land on and the user reads all eight labels every single time.

**The 2026 form of this is not hand-drawn, it is a copied block** — see "The 2026 tells" below. The
generic-square-icon version still appears; more often the icons are now real Lucide glyphs on a
homogeneous list, which is the same failure with better art.

**The corrective procedure:**

1. **Delete the icons** unless the rows are genuinely different kinds of objects (Decision 3). Four
   of twelve measured products ship none. This alone fixes most instances.
2. **Add sections**, and make at least one of them the unlabeled top group of 2–4 daily-use rows —
   the way Discourse puts `Home / Topics / More` above any header.
3. **Differentiate by content, not decoration.** Add counts to the rows that have counts (as neutral
   grey pills, per GitHub). Add per-object color only where the object has an identity, the way
   Discourse colors category glyphs and leaves `All categories` monochrome.
4. **Give the active row two signals** from the measured menu — a fill plus a weight bump, or an
   accent color plus an edge bar — and verify it is still obvious in a squint test.
5. **Vary the density deliberately:** a divider before the utility rows, the shell preferences pinned
   to the bottom above a 1px rule.

### Tell 3: nav that does not match the mental model

**What it looks like:** the nav is organized by the engineering team's module boundaries, or by which
API endpoint serves the data. `Ingestion`, `Processing`, `Egress`. Or the same object reachable
under three different parents so no route feels canonical. Or a settings page containing four
personal preferences and two org-wide policies with no visible boundary between them.

**The corrective procedure:**

1. Write, in one sentence each, the three most common tasks. If a task requires visiting two
   different top-level sections, those sections are wrong.
2. Group by **the user's intent** where the feature set is bigger than the user's vocabulary. This is
   what Sentry (`Detect` / `Debug`) and Vercel (`Build AI apps` / `Run agents and backends`) do, and
   it is measurably how the best documentation IAs are organized.
3. Pick **one canonical parent per object** and make the URL reflect it. Other paths become filters
   or cross-links, not duplicate routes.
4. Label with the word the user says, not the word in the codebase. If support tickets say "the
   report," the nav says Reports, even if the table is called `aggregation_runs`.

### Tell 4: chrome with nothing in it

**What it looks like:** a 64px top bar carrying a logo, a search box and an avatar, sitting above a
280px sidebar with five items, on a page with two cards. Roughly 110px of vertical chrome and 280px
of horizontal chrome wrapped around 40% of a screen of content. Plus a breadcrumb reading
`Home / Dashboard`.

**The corrective procedure:** apply Decision 1 honestly. Five destinations means top bar only. Two
levels of hierarchy means no breadcrumb. Take the vertical space back and give it to the content.

---

### Tell 5: settings as one long page of toggles

**What it looks like:** `/settings` renders a single scrolling column of 24 switches with two-word
labels (`Email notifications`, `Dark mode`, `Public profile`, `Advanced`), no scope statement, no
search, no grouping beyond a couple of `<h2>`s, auto-saving silently, with `Delete account` sitting
between two harmless preferences. Every setting is one 40px row because the generator produced a
`<Switch>` list.

**Why it fails:** settings are the surface with the worst ratio of *time spent designing* to *cost of
getting it wrong*. Users arrive at settings from a support answer or a moment of frustration, looking
for one specific control they cannot name precisely. A flat toggle list is unsearchable by eye and
gives no signal about blast radius — the whole point of the page.

**The corrective procedure:**

1. **State the scope at the top of every settings screen.** Grafana prints `Organization: Play
   Grafana` under the H1; VS Code puts `User` / `Workspace` tabs directly under the search field.
   Pick one of those two shapes and apply it everywhere.
2. **Put a search field first**, full width, before any group. Once you pass ~30 settings this is not
   optional, and it is the cheapest thing on this list to build.
3. **Namespace every label** — `Editor: Font Size`, not `Font size`. It makes search results and
   palette entries self-describing.
4. **Give every setting one line of help text at rest**, not in a tooltip, and budget for it: a real
   setting row is 98–125px tall, not 40. If your settings page got 3× taller, you did it right.
5. **Cross-link interacting settings** in the description rather than letting users discover the
   interaction by breaking something.
6. **Add a `Commonly Used` group at the top** duplicating the 6–10 settings people actually change.
7. **Separate the danger zone**, put it last, and confirm destructive actions by typing the object's
   name.
8. **Deep-link every section** and pick one save model — auto-save for preferences, explicit save for
   policy — and use it in the entire product.

---

## The 2026 tells: what current generators actually emit

Tells 1–5 are shape failures. These are fingerprints — specific, current, and checkable. They are not
2023's tells. An agent in 2026 rarely emits bad geometry, because the block it copies has good
geometry. It emits somebody else's product.

**Measured at `ui.shadcn.com/view/new-york-v4/sidebar-07`, 1440×1000, 2026-09** — the sidebar block
that v0, Lovable, Bolt and Claude reach for by default:

| Element | Measured | Verdict against this file |
|---|---|---|
| Rail | **256** wide | fine — inside the 240–320 band |
| Top-level row | **32** high, x=8, **239** wide, radius **8**, 14px | height and inset fine; radius 8 sits above the measured 4–6 band |
| Sub-row | **28** high, x=33, 190 wide | fine; constant type, x-offset only |
| Header row | `Acme Inc` / `Enterprise`, **48** high | the workspace switcher, unrenamed |
| Footer row | `shadcn` / `m@example.com`, **48** high | fixture identity |
| Group labels | `Platform`, `Projects` | neither is a noun in anyone's product |
| Rows | `Playground`, `History`, `Starred`, `Settings`, `Models`, `Documentation`, `Settings` | **`Settings` appears twice**, at two depths |
| Projects | `Design Engineering`, `Sales & Marketing`, `Travel`, `More` | fixtures |
| Icons | on **every** top-level row | homogeneous list — violates "when a sidebar icon earns its place" |
| Breadcrumb | `Build Your Application` / `Data Fetching` | a breadcrumb of the docs that describe the block |

Six tells, each with a check you can run:

1. **Fixture identity in the shell.** `Acme Inc`, `Enterprise`, `shadcn`, `m@example.com`,
   `Design Engineering`, `Sales & Marketing`, `Travel`.
   → `grep -rniE "acme inc|m@example\.com|design engineering|sales & marketing" src/`
2. **The block's own breadcrumb.** `Build Your Application` / `Data Fetching` is copy from shadcn's
   demo page, not from any product.
   → `grep -rniE "build your application|data fetching" src/`
3. **`Settings` twice.** The block ships it as a child of `Playground` *and* as a top-level row — two
   canonical parents for one destination, which is Tell 3 shipped as a default.
   → list every nav label; the count of exact duplicates must be zero.
4. **Icon-collapse on a rail with no reason to collapse.** `collapsible="icon"` on a five-item nav
   beside a page of cards. Collapsibility is earned by width-hungry content — tables, canvases,
   diffs, code (Decision 3). The default earns it by nobody deleting a prop.
   → `grep -rn 'collapsible="icon"' src/`, then look at what the content actually is.
5. **The sparkle destination.** `✨ AI Assistant` as a top-level nav row that opens a chat drawer.
   Note the boundary carefully: Grafana ships a real `AI` area in its rail (measured 2026-09,
   between `Drilldown` and `Alerts & IRM`), and that is legitimate — it is a product area with its
   own subtree and its own objects. A row that opens a *chat panel* is not a destination; it is an
   input method, and it belongs in the palette and the top-right cluster beside `?` and the account.
   → screenshot the rail: is there a row whose only behavior is "opens a text box"?
6. **Glass over nothing.** `backdrop-blur` on a rail whose background is a flat color, so the blur
   composites against a solid and buys a paint layer for no visual effect. Blur earns its place over
   content that scrolls under it — Supabase's 50px header, YouTube's translucent bottom bar.
   → `grep -rn "backdrop-blur" src/` and check what is behind each hit.

**The generalizable version:** the 2026 tell is not that the geometry is wrong. shadcn's geometry
falls inside nearly every band in this file. The tell is that **the shell is right and the product is
missing** — correct rail width, correct row height, correct radius, and not one string that could
only belong to this software. Grade the strings before the pixels.

---

## Self-check

Every item below is checkable in under a minute by one of three moves: **grep** the source,
**look** at a screenshot, or **drive** the running app. If you cannot run the check, the item is not
done.
**IA** — grep the nav config (the array or object your rail renders from)

- [ ] No exact-duplicate labels in the nav config. → list every `label`/`title`; duplicate count is 0.
- [ ] `grep -rniE "acme inc|m@example\.com|design engineering|sales & marketing|build your application|data fetching|lorem ipsum|john doe"` over the app returns nothing.
- [ ] `grep -rniE "\b(dashboard|analytics|overview|reports?|management)\b"` over the nav config: every hit names an artifact the user can create or open. If it names a category of thinking, delete it.
- [ ] Top-level item count is ≤7, **or** 8–12 with every item carrying a `children`/`items` array. → count the array.
- [ ] `Settings` and `Help` are not in the top-level array. → grep the nav config; they belong to the corner cluster's config instead.
- [ ] The nav config's first group has no `label` field and holds 2–4 items. → read the config.
- [ ] Every item's `href` is unique across the whole config. → sort the hrefs, `uniq -d` is empty.

**Shell** — one full-page screenshot at 1440×1000, plus computed styles

- [ ] Count destinations in the nav config. If ≤4 and the DOM contains a persistent `<aside>`/rail, the shell is wrong (Decision 1, Q2).
- [ ] Measure the rail in the screenshot: 240–320px, or 44–52 if every row is icon-only.
- [ ] Measure three adjacent rows: height 28–39, and row *pitch* equals row *height* (rows touch).
- [ ] Row `border-radius` is 0–6, or 999 on every row. → computed style on one row.
- [ ] Row `font-size` is 14px (16 only if the rail holds fewer than 8 long labels). → computed style.
- [ ] The clickable box spans the full row width. → hover 4px inside the rail edge, level with a label; the row must highlight.
- [ ] If the main content is a reading stream, measure its column: ~600px fixed, unchanged at 1440 and 2560.
- [ ] Icon count in the rail is 0 or equal to the row count. → count `<svg>` inside rail rows. No two rows share a glyph.
- [ ] **Active row, squint test:** blur the screenshot to 8px; the active row is still findable. Then count the visual differences between the active row and its neighbour: exactly 2, and neither is a border.
- [ ] `@media (forced-colors: active)` exists for the active row. → `grep -rn "forced-colors" src/`. Load the page with forced colors on; the active row is still identifiable.
- [ ] Hover CSS on a rail row contains no `transform`, `translate`, `scale`, `box-shadow` or `border`. → `grep -rnE "hover:(translate|scale|shadow|border)" src/` finds nothing in nav components.
- [ ] Row hover `transition-duration` is ≤120ms or 0s. → computed style.
- [ ] Any hover that *opens a panel* has ≥120ms of open intent. → sweep the cursor fast across a flyout trigger; nothing opens in passing.
- [ ] Nested rows: identical computed `height` and `font-size` at depths 1, 2 and 3; only `padding-left`/x differs; no depth 4.
- [ ] Load a deep page cold: only ancestors of the current page are expanded — **unless** the fully expanded tree is shorter than the rail, in which case everything is open.
- [ ] The bottom-most rail element is a preference control (theme, collapse, locale), not a destination. → screenshot.

**URLs and history** — drive the running app

- [ ] Click every top-level item; each produces one new path segment matching its label. → compare address bar to label.
- [ ] Open a detail row, apply two filters, sort, go to page 2, copy the URL, open it in a private window. → the screen is identical.
- [ ] Nothing in that query string names a person or an attribute of one. → read it out loud; if any of it would be a problem in an access log, it is a problem.
- [ ] Type 10 characters into search, press Back once. → you land on the pre-search screen, not on keystroke 9.
- [ ] Open a detail pane, press Back. → the pane closes, the list is behind it, scrolled where you left it.
- [ ] Load a step-4 wizard URL cold. → it redirects to the furthest valid step; it does not render empty.
- [ ] Load `/`, then press Back from wherever it redirects. → you leave the app; you do not bounce.
- [ ] Log out, open a deep link, log in. → you land on the deep link. `grep -rn "return_to\|returnTo\|redirect_uri\|[?&]next=" src/` shows it is implemented.

**Components** — screenshot plus grep

- [ ] Screenshot a screen carrying two of {tabs, sub-nav, segmented control, filter chips} and cover the labels. → you can still tell which is which from shape alone.
- [ ] Sample the pixel of every count badge: neutral grey. If any is red, the thing it counts must be actionable *now*.
- [ ] Click through each badge. → the count reaches 0. If it cannot, delete the badge.
- [ ] Counts above 99 are abbreviated (`1k`, `2.3k`). → grep the formatter.
- [ ] Screenshot one depth-2 page and one depth-3 page. → the breadcrumb appears only on the second, and only if the rail does not already show the path.
- [ ] The palette shortcut is a visible chip in the search field before anything is opened. → screenshot.
- [ ] Press the shortcut and screenshot before typing. → recents plus top destinations, not an empty state.
- [ ] Palette group headings cover more than one kind (navigation / search / actions). → same screenshot.
- [ ] Palette selected row is a 4–5% fill, not a border or outline. → computed style.
- [ ] Press Escape in the palette, then read `document.activeElement`. → it is the trigger, not `<body>`.

**Settings**

- [ ] Load `/settings`. → it renders a list of sections with one-line descriptions; it does not 302.
- [ ] Screenshot the top 100px of three settings pages. → each names its scope (`Organization: …`, or `User`/`Workspace` tabs).
- [ ] Load the settings surface and press Tab once. → focus is in a search input.
- [ ] Setting labels are namespaced. → grep the settings config for `:` in labels; the ratio is near 1.
- [ ] Count setting rows vs. count of description nodes. → they match, and a row measures ≈98–125px, not 40.
- [ ] Click each section and watch the address bar. → every section has its own URL.
- [ ] Screenshot the bottom of a destructive page, then press delete with the confirm field empty. → the block is last, separated, and the button stays disabled.
- [ ] `grep -rn "autoSave\|onBlur.*save\|isDirty" src/settings/`. → one pattern across the directory, not two.
- [ ] Grep setting descriptions for backticked setting names. → every setting that depends on another names it.

**Mobile at 390×844** — screenshot the drawer open and closed

- [ ] Top bar measures 48–64px.
- [ ] Drawer measures ~290px of 390 with the page visible beside it, or is a full-width takeover for a flat list of ≤8.
- [ ] The first element inside the sheet is a search field. → screenshot.
- [ ] Sheet rows measure 40–44px.
- [ ] Close via `×`, via veil tap, and via the back button. → all three work.
- [ ] Open the sheet from a deep page. → the current section is expanded and scrolled into view.
- [ ] If a fixed bottom bar exists: 3–5 items, 57–62px tall, labels 11–12px, and `grep -rn "safe-area-inset-bottom" src/` finds it. If the nav is a hierarchy, there is no bottom bar at all.
- [ ] `grep -rn "100vh" src/` finds nothing in shell layout; it is `100dvh` or `100svh`.

**Finally**

- [ ] Paste a link to the deepest screen in the product into a private window. From that one screenshot, answer: where am I, where can I go, how do I get back. Three answers, no scrolling.

---

## Direction pass (2026-09)

**What was re-measured.** Eleven claims were re-probed live with Playwright at 1440×1000. Nine came
back exact:

| Claim | Re-probed against | Result |
|---|---|---|
| Grafana rail 320, rows 32, pitch 32, x=8 w=280, r6, 14/22, `transition: 0s` | play.grafana.org | exact, including the 0s duration and the depth-2 step to x=40 |
| Discourse rail 272, rows 36.8, pitch 38.8, x=8 w=255, radius 999, 16px, header 52 | meta.discourse.org | exact |
| PostHog rows 28, pitch 29, radius 4, 14/20, active `rgba(30,31,35,.15)` + w600, no icons | posthog.com/docs | exact |
| Supabase rows 18.6, pitch 28.5, x=40, 13/18.57, w500, active `rgb(10,132,78)` | supabase.com/docs | exact |
| Vercel rows 36, x=12, w=264, radius 6, 14/21 | vercel.com/docs | exact |
| GitHub 7 repo tabs h30, 14px, pad `0 8`, r6, active w600; counters h20, 12px/500, radius 24, `rgba(129,139,152,.12)` | github.com/vercel/next.js | exact — `Issues 1k`, `Pull requests 2.3k`, `Security and quality 61` all still live |
| MDN `--breadcrumbs-bar-height: 2rem`, `--sticky-header-height: calc(4.125rem + 2rem)`, `--layout-sidebar-min: 15rem`, bar h32/16px | developer.mozilla.org | exact; the `/Web/CSS/display` → `/Web/CSS/Reference/Properties/display` 301 still resolves |
| Hugging Face header 65, six 16px destinations at `padding: 2px 8px`, no sidebar | huggingface.co | exact; `Buckets` now carries a `new` flag |
| Bluesky 600px feed column at x=420 | bsky.app | exact |
| Stripe product tabs h34, 14px, accent `#5469d4` | docs.stripe.com | exact |

**Two numbers were wrong and are corrected in the tables above:**

1. **Tailwind Docs was listed as a 240px rail with `pad-left 16`.** Measured: a **288px** sticky
   column at x=0 containing a **240px** nav at **x=24**. Row height 24 and pitch 32 were right;
   section headers are 12px uppercase weight 500. The rail is wider than claimed and the inset is 24.
2. **PostHog Docs was listed as a flat 250px rail with `pad 4 8`.** Measured: doc rows are
   **209–234px wide starting at x=158** — the docs nav is a second column beside a left product
   strip, not the leftmost element on the page. Row metrics were right; the geometry claim was not.

**Three rules were tested adversarially and now carry scopes.** Each was previously stated without
limits, which is how an agent follows a rule off a cliff:

1. **"Nothing moves on hover, and hover is instant."** Adversarial product: an e-commerce category
   bar of eight mega-menus. At 0ms, a cursor travelling from `Women` to `Sale` opens six full-width
   panels in passing and the page strobes. Scope added under **Hover state**: instant is for
   *repaint*; anything that *opens a surface* needs 120–300ms of open intent, a ~200ms close delay,
   and a safe triangle.
2. **"The active item gets two signals, and never a border."** Adversarial product: any app used
   under Windows High Contrast. `forced-colors: active` repaints backgrounds and text with system
   colors, so a low-contrast fill and an accent color both vanish and the active row becomes
   unfindable for the users least able to absorb it. Scope added under **Active state**: a mandatory
   `@media (forced-colors: active)` border with its space reserved at rest.
3. **"Put every piece of view state in the URL."** Adversarial products: a patient chart, and a
   multi-step application form. The first writes a diagnosis into access logs, shared-workstation
   history, Slack unfurls and `Referer` headers; the second produces pasted links that render an
   unsubmittable step 4. Scope added under **Decision 7**: opaque id in the path only, no personal
   attribute in a query string, saved-view ids for sensitive filters, and cold-loaded step URLs that
   redirect to the furthest valid step.

Two further limits came out of the same pass: **horizontal tab scrolling is correct when the user
authored the tabs** — saved views in Linear, Notion and Airtable cannot be demoted into a rail
without moving the thing the user made out of the place they made it — and **collapse-on-load is
wrong when the expanded tree already fits the rail**, where it hides siblings to save no scrolling.

**Anti-patterns were brought current.** The old Tell 2 described a 2023 failure: generic square
icons, no sections, a faint active state. The 2026 failure has better art and worse honesty — a
copied shadcn `sidebar-07` block whose geometry sits inside nearly every band in this file and whose
every string belongs to somebody else. A new section, *The 2026 tells*, measures that block (256px
rail, 32px rows, radius 8, `Acme Inc` / `Enterprise`, groups `Platform` / `Projects`, `Settings`
shipped twice at two depths, `Build Your Application / Data Fetching` as the breadcrumb) and gives
six greppable checks: fixture identity, the block's own breadcrumb copy, duplicate labels,
`collapsible="icon"` on a rail with nothing to collapse, the sparkle row whose only behavior is
opening a text box, and `backdrop-blur` composited against a flat color. The boundary is drawn
against a real counter-example rather than a slogan: Grafana ships a genuine `AI` product area in its
rail — measured this pass, between `Drilldown` and `Alerts & IRM` — so an AI entry in the nav is not
itself the tell.

**The self-check was rewritten to be runnable.** Every item now resolves to a grep, a screenshot
measurement, or a scripted interaction. Items that could only be judged by taste — "the shell choice
was made from the product's shape," "every top-level item is a noun from this product's domain,"
"nothing is reachable under two different canonical parents" — were replaced by counts and greps that
produce the same verdict: count destinations and check for an `<aside>`; grep the nav config for the
five furniture words and require each hit to name a real artifact; sort the hrefs and run `uniq -d`.

**Cut for carrying no decision:** the "spacing tells you the agent didn't look" framing in the
preamble; the "values marked approx." caveat and the one measurement that depended on it (an
icon-rail width read off a product screenshot, now stated as a width budget to measure rather than a
number to copy); the loose thumb-reach paragraph, compressed to the citation and its expiry; and the
Excalidraw reprise at the end of Tell 4, which restated Decision 1.
