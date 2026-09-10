# Dense enterprise and internal tools

**Evaluated:** 2026-09

## What this archetype is for

Software someone sits inside for four to eight hours a day, where the screen's job is to hold more true facts than the user can hold in working memory: CRMs (Attio, Salesforce, Twenty), issue and work trackers (Linear, Jira), observability consoles (Grafana, Datadog, Sentry), analytics and BI (PostHog, Amplitude, Mixpanel, Sigma, Hex, Looker, Metabase), spreadsheet-databases (Airtable), internal-tool builders (Retool), and HR/payroll systems of record (Workday, Rippling, Deel, Gusto). The defining constraint is that the user is *not* browsing — they are scanning a list of 200 rows for the three that are wrong, or comparing column 7 against column 12, and every pixel of chrome you add is a row they can't see. This is not the archetype for a consumer signup flow, a marketing site, a settings page someone visits twice a year, or a mobile-first product. If your user's session is under 90 seconds, do not build from this file.

## The reference set

| Product | Why it's here | The single thing to steal |
|---|---|---|
| **Attio** | The current high-water mark for a dense grid that doesn't feel like a spreadsheet from 2009 | 36px record rows on a pure-white ground with one 1px `#EFF0F0` hairline and **no zebra striping**, plus a per-column aggregation footer (`2,813 count` / `$83,560,165 sum`) pinned under the grid |
| **Linear** | Density achieved by removing chrome, not shrinking it | Hover is a `#ffffff08` overlay painted on a `::before` at `inset:0` with `border-radius:8px` — the row itself never gains a border, never shifts, never reflows |
| **Grafana** (play.grafana.org) | Two type scales in one product: 14px chrome, 12px data | Table cells at `padding: 2px 8px`, 12px/18px, giving **23.8px rows**; one hairline color (`rgba(204,204,220,0.12)`) used 297 times on a single screen |
| **PostHog** | The tightest control geometry of any product measured | `--button-height-base: 30px` with `--button-padding-x-base: 6px`; `--scene-padding: 0.5rem`; breadcrumbs that collapse 60px → 44px on scroll |
| **Hex** | Notebook output grids at the density of a terminal | 24px result-grid rows with a left index gutter (`0 1 2`), header band the same 24px height |
| **Retool** | Shows what happens when a generator writes the layout | Its AI-authored gallery app ships **68px table rows** — the exact failure this file exists to prevent. Study it as a negative control |
| **Salesforce / SLDS** | The most instructive counter-example, and not for the reason people think | SLDS's *primitives* are dense (13px body, 4px/8px cell padding). The failure is chrome depth and border density stacked on top. Steal the 13-step neutral ramp, reject the layout |
| **Jira / Atlassian Design System** | The 48px row as institutional default | `DynamicTable` rows are 48px with 14px/20px text and a **2px** header underline — 33% fewer rows on screen than Attio for identical information |
| **Workday Canvas** | Tokens designed by committee for a 16px world | Base font scale starts at `1rem` for body; the whole system is pinned to an explicitly named "8pt sizing grid." Correct for a form-heavy HR flow, wrong for a 400-row report |
| **Twenty** (open source CRM) | A fully published token set for an Attio-class product | 12-step gray ramp + separate `--t-border-color-{light,medium,strong}` roles, and a font scale expressed in awkward fractions (`.92rem`, `1.23rem`) because it was tuned by eye, not by ratio |
| **Sentry** | Issue-stream information hierarchy | Title + culprit + counts + sparkline + assignee in a single scannable row band |
| **Vercel Geist** | The cleanest neutral-ramp architecture in public | Two parallel 10-step gray scales: `--ds-gray-100…1000` (solid) **and** `--ds-gray-alpha-100…1000` — overlays composite correctly on any surface |
| **Amplitude / Mixpanel / Sigma / Looker / Snowflake / Metabase / Datadog** | Studied for nav depth, saved views, and toolbar stacking | Amplitude's three-deep collapsible left rail with per-section chevrons and a single 32px-ish global bar |
| **Deel / Rippling / Gusto** | The HR/payroll subgenre | These correctly refuse full density in employee-facing flows and use it only in admin tables — the density decision is per-surface, not per-product |

**Two exceptional products not on the brief, and how I found them:**

1. **Twenty** (`twenty.com`, demo at `demo.twenty.com`) — found by searching for open-source Attio/Salesforce alternatives on GitHub. It is the only Attio-class CRM that ships its complete design-token set to the browser unminified, so you can read the whole system (below). Its public demo gates behind an auth wall, but the token CSS loads on the login screen.
2. **Vercel Geist** (`vercel.com/geist`) — found by looking for design systems whose *dashboard* is dense B2B rather than marketing. Geist's docs render live components, so `getComputedStyle` returns production values: 14px/20px is 121 of the 163 text nodes on the colors page, radii are only 4px and 6px, and there is exactly one border color (`#EBEBEB`) in use 51 times.

Honorable mention: **play.grafana.org** is a fully public, logged-out, production Grafana instance. It is the single best free source of real dense-B2B computed styles on the internet. Use it.

## Measured specifics

Everything below was read with `getComputedStyle` in a headless Chromium at a 1512×945 viewport, pulled from the product's own published CSS, or measured pixel-by-pixel off a 1:1 (deviceScaleFactor 1) screenshot. Nothing here is recalled.

### Data-row geometry — the core table

| Source | Row pitch | Cell padding | Text | Separator | Ground |
|---|---|---|---|---|---|
| Grafana table panel (Loki Drilldown, dark) | **23.8px** | `2px 8px` | 12px / 18.86px, ls +0.15px | `1px rgba(204,204,220,0.12)` | transparent on `#111217` |
| Hex SQL result grid | **24px** | — (measured from pixels) | ~11–12px | `1px #ECEDF2` | `#FFFFFF`, no zebra |
| Salesforce SLDS `.slds-table th, td` | ~24–32px | `0.25rem 0.5rem` (**4px 8px**) | 13px (`body{font-size:.8125rem}`) | — | `th` band `#F3F3F3`, `th` color `#444444`, **weight 700** |
| Attio records grid | **36px** (separators at y=442,478,514,550,586,622,658,…) | — | 14px / 20px, ls −0.28px (−0.02em), w500 | `1px #EFF0F0` | `#FFFFFF`, **no zebra** |
| Linear issue row | **40px** | `padding-inline: 36px 28px`, `margin-inline: 8px` | 13px | none — hover overlay only | `#08090A` |
| PostHog `.LemonRow` | `min-height: 2.5rem` (40px) | `0.25rem 1rem` | 14px / 20px | — | — |
| PostHog `.LemonTable--xs td` | — | `padding-block: 0.25rem` | — | — | — |
| Atlassian `DynamicTable` (Jira) | **48px** | `4px 8px` | 14px / 20px | `1px rgba(11,18,14,0.14)`; header **2px** | `#FFFFFF` |
| Retool AI-generated gallery app | **68–69px** | — | 12–14px | `1px rgba(233,235,223,0.12)` | `#151515` |

At a 900px-tall content area: 24px rows → 37 rows visible. 36px → 25. 48px → 18. 68px → 13. Attio shows **39% more rows than Jira**, and **92% more than the Retool template**, with the same font size.

### Type scales (real token values)

**Linear** (`static.linear.app/.../index.CD2COVl5.css`):
```
--font-size-micro   : .6875rem  /* 11px */
--font-size-mini    : .75rem    /* 12px */
--font-size-small   : .8125rem  /* 13px */
--font-size-regular : .9375rem  /* 15px  <- body */
--font-size-large   : 1.125rem  /* 18px */
--font-size-title3  : 1.25rem   /* 20px */
--font-size-title2  : 1.5rem    /* 24px */
--font-size-title1  : 2.25rem   /* 36px */
--font-weight-light:300  normal:400  medium:510  semibold:590  bold:680
```
Note the weights. Linear runs Inter Variable at **510 / 590 / 680**, not 500 / 600 / 700, because at 13px on a dark ground 500 is nearly indistinguishable from 400.

**PostHog** (production app CSS):
```
--text-xxs: .625rem  (--line-height .75rem)   /* 10 / 12 */
--text-xs : .75rem   (1rem)                    /* 12 / 16 */
--text-sm : .875rem  (1.25rem)                 /* 14 / 20  <- body */
--text-base: 1rem    (1.5)
--button-height-xxs/xs/sm/base/lg  = 20 / 24 / 28 / 30 / 40px
--button-padding-x-xxs…lg          =  4 /  4 /  4 /  6 /  8px
--button-padding-y-xxs…lg          =  3 /  3 /  3 /  4 /  7px
--button-icon-size-xxs…lg          = 12 / 12 / 12 / 16 / 20px
```
Six pixels of horizontal padding on the default button. That is the number to internalise.

**Twenty** (`--t-*`, dark theme):
```
font-size xxs .625 / xs .85 / sm .92 / md 1 / lg 1.23 / xl 1.54 / xxl 1.85 rem
line-height md 1.1, lg 1.5          <- 1.1 for UI labels, 1.5 only for prose
weights 400 / 500 / 600
spacing multiplicator 4 → --t-spacing-1..32 = 4..128px, plus 0_5 = 2px, 1_5 = 6px
radius xs 2 / sm 4 / md 8 / lg 16 / xl 20 / xxl 40 / pill 999
```
`--t-text-line-height-md: 1.1` is the important one: dense UI labels get 1.1, not 1.4.

**Grafana** (measured): body 14px/22px ls +0.15px Inter; data plane 12px/18px (5,556 of 5,798 text nodes on the Drilldown screen were 12px); h1 28px/32px ls −0.25px; h2 16px/22px w500.

**Attio** (measured on `app.attio.com`): `html { font-size: 10px }` — the whole app's rem scale is in tenths, so `1.4rem` = 14px. Grid text 14px/20px, ls −0.28px, weight 500.

**Atlassian** (measured on the live DynamicTable example): body 14px/20px; `th` 12px/16px at weight 653 (variable-font interpolation); page h1 40px/44px w700.

**Workday Canvas** (`@workday/canvas-tokens-web`): `--cnvs-base-font-size-25…1050` = 10, 12, 14, **16**, 18, 20, 24, 28, 32, 40, 48, 56, 72, 88, 104px. Line heights 16, 20, 24, 28, 32, 36, 40, 48, 56, 64px. `--cnvs-base-baseline: 0.5rem /* Baseline unit used for the 8pt sizing grid */`. This is a 16px-body system with an 8pt grid — internally consistent and structurally wrong for a 300-row report.

### Neutral ramps

| System | Steps | Values |
|---|---|---|
| **Salesforce SLDS** | 13 solid + 4 border + 8 alpha | `#181818 #242424 #2E2E2E #444444 #5C5C5C #747474 #939393 #A0A0A0 #AEAEAE #C9C9C9 #E5E5E5 #F3F3F3 #FFFFFF`; borders `#C9C9C9 #AEAEAE #939393 #747474`; alphas `rgba(24,24,24,.1/.25/.5/.75)` and the white mirror |
| **PostHog** | 19, evenly spaced, zero hue | `50 #F2F2F2, 100 #E6E6E6, 150 #D9D9D9, 200 #CCC, 250 #BFBFBF, 300 #B3B3B3, 350 #A6A6A6, 400 #999, 450 #8C8C8C, 500 grey, 550 #737373, 600 #666, 650 #595959, 700 #4D4D4D, 750 #404040, 800 #333, 850 #262626, 900 #1A1A1A, 950 #0D0D0D` |
| **Twenty** | 12 | `gray1 #171717, 2 #1B1B1B, 3 #191919, 4 #1D1D1D, 5 #222, 6 #484848, 7 #4C4C4C, 8 #666, 9 #818181, 10 #7B7B7B, 11 #B3B3B3, 12 #EBEBEB` |
| **Vercel Geist** | 10 solid **+ 10 alpha in parallel** | `--ds-gray-100…1000` as `hsla(0,0%,L,1)` (L = 95, 92, 90, 92, 79, 66, 56, 49, 63, 93 across modes) and `--ds-gray-alpha-100 #0000000d … alpha-1000 #000000e8`, with the `#ffffff0f … #ffffffeb` mirror for dark |
| **Linear** | 4 text + 3 border + 5 surface, per theme | dark text `#F7F8F8 / #D0D6E0 / #8A8F98 / #62666D`; dark borders `#23252A / #34343A / #3E3E44`; dark surfaces `#08090A / #0F1011 / #141516 / #191A1B`; light text `#282A30 / #3C4149 / #6F6E77 / #86848D`; light borders `#E9E8EA / #E4E2E4 / #DCDBDD` |
| **Workday** | 13 per hue in oklch (25, 50, 100–950, 975) plus a 4-step alpha set per hue | e.g. `--cnvs-base-palette-azure-500: oklch(0.6555 0.1553 244.48)` |

Two lessons: (a) 10–13 steps is the working range; 19 (PostHog) is more than anyone uses and 4 is not enough for a product with cards on cards. (b) **Ship an alpha ramp alongside the solid ramp.** Geist, SLDS and Linear all do. Solid grays break the moment a row sits on a tinted or elevated surface.

### Hairlines and borders

- Grafana: exactly one border value dominates a whole screen — `1px rgba(204,204,220,0.12)`, 297 uses. Second place is a transparent 1px placeholder (124 uses) held so focus rings don't reflow.
- Linear: `1px rgba(255,255,255,0.08)` on 276 elements, and `--border-hairline: 1px` that becomes **`0.5px` at `min-device-pixel-ratio: 2`**. Half-pixel hairlines on retina.
- Attio grid separator: `1px #EFF0F0` (≈6% black). Table has row rules *and* column rules; both the same weight.
- Atlassian: body rules `1px rgba(11,18,14,0.14)` but the `<thead>` underline is **2px** — a deliberate weight step to anchor the header.
- Vercel Geist: `1px #EBEBEB`, 51 uses, and essentially nothing else.

The pattern: **one hairline value for the whole product, expressed as an alpha over the surface, not a solid gray.** A second, heavier weight exists only to separate the header from the body.

### Radii

| Product | In use |
|---|---|
| Grafana | 6px (421 elements), 10px, 9999px |
| Vercel Geist | 4px (98) and 6px (88). Nothing else above 12px |
| Attio | 9px on sidebar rows, 8px on the command bar |
| Linear | scale of 4 / 6 / 8 / 12 / 16 / 24 / 32 / 50% / 9999px; rows and hover overlays use 8px, chips use `9999px` |
| Salesforce SLDS | 3px (131 elements) — the tell of a 2015 system |
| Atlassian | 6px (341), 2px, 4px, 9999px |
| PostHog | Tailwind v4 scale, `--radius-sm .25rem`, `--radius-md .375rem` |

Dense B2B lives at **4–8px**. 12px+ radii read as consumer and eat horizontal room in a 24px-tall control.

### Spacing, layout constants

```
PostHog   --scene-padding: .5rem                  /* 8px around the whole scene */
          --scene-layout-header-height: 40px
          --scene-title-section-height: 50px
          --scene-layout-panel-width: 300px
          --settings-nav-width: 16rem   (256px)
          --side-panel-min-width: 28rem (448px)
          --breadcrumbs-height-full: 3.75rem (60px)
          --breadcrumbs-height-compact: 2.75rem (44px)   /* collapses on scroll */
Linear    header 44px, view bar 44px (padding 8px 12px), group header 36px,
          filter tab 28px, badge 24px (small 22px), right sidebar 320px → 280px <1280px,
          issue-id column fixed 72px, date column fixed 40px right-aligned
Attio     sidebar item 25.9px tall, 32px pitch, radius 9px, padding 0 8px,
          sidebar content width 232px; active bg #EEEFF1 (flat fill, no border)
Grafana   sidebar 319px + 1px rgb(46,48,54) divider; nav item 32px, radius 6px
Twenty    --t-spacing-N = N × 4px, with half-steps at 2px and 6px
Workday   --cnvs-base-baseline: 0.5rem  ("8pt sizing grid")
```

### Motion

- Linear: `transition: background .16s var(--ease-out-quad)` on rows, buttons and tabs. **160ms, background and color only.** No transform, no height, no margin.
- Workday publishes durations in 50ms steps from 50→1000ms and three easing families (`--cnvs-base-easing-a-100: cubic-bezier(0.2,0,0.2,1)`).
- PostHog: `--animate-skeleton: skeleton 2s -1s infinite linear` — note the negative delay, so a freshly-mounted skeleton is already mid-cycle instead of starting from a dead frame.

## The decisions that make it work

**1. Two type scales, not one: chrome at 14px, data at 12px.**
Grafana's Drilldown screen has 5,556 text nodes at 12px/18px and 72 at 14px/22px. The 14px is the nav, the breadcrumb, the buttons — furniture you read once. The 12px is the log lines, the label counts, the series names — content you scan. Attio does the same split in the other direction (14px grid, 12px chips and metadata).
*Why it works:* the eye calibrates to the dominant size. If the whole product is 14px, a 14px table row reads as prose and you read it linearly. Dropping the data plane one step tells the eye "this is a field, scan it."
*Generic alternative it beats:* picking 16px (or `text-base`) for everything because that's the Tailwind default and someone said 16px is accessible. You end up with a 44px row and 40% of the information.
*When it does NOT apply:* long-form surfaces inside the product — a wiki page, an incident postmortem, a release note. Those go back to 15–16px at 1.5–1.6. Linear does exactly this: `--font-size-regular: 15px` for reading, 13px for the issue list.

**2. The hover state is an overlay, not a border and not a movement.**
Linear's issue row paints a `::before` pseudo-element at `inset: 0` with `background: #ffffff08; border-radius: 8px; opacity: 0` and flips opacity to 1 on hover. The row's own box is untouched. Attio's active sidebar item is a flat `#EEEFF1` fill with 9px radius. Grafana's nav item is a filled rect at 6px radius.
*Why it works:* sweeping a cursor down 30 rows with a border-on-hover produces 30 layout recalculations and 30 one-pixel jumps. The overlay produces none. It also composes: a selected row, a hovered row and a focused row can stack three overlays without fighting over the same border property.
*Generic alternative it beats:* `hover:border-gray-300` or `hover:shadow-md hover:-translate-y-0.5`. The translate is the worst — a list that flinches.
*When it does NOT apply:* a card grid where cards are targets rather than rows (a template gallery, an app launcher). There, lift is legible because there are 8 cards, not 200 rows.

**3. Alpha overlays in a fixed ladder, not arbitrary grays.**
Linear's entire interaction system on dark is four white alphas: `#ffffff05` (resting tint), `#ffffff08` (hover), `#ffffff0d` (strong hover / secondary surface), `#ffffff14` (active/selected). That's 2%, 3%, 5%, 8%. Vercel formalises the same idea as a full parallel `--ds-gray-alpha-100…1000` ramp.
*Why it works:* an alpha overlay is correct on every surface it lands on — the base canvas, a panel, a modal, a sticky header. A solid `#1C1C1F` hover is correct on exactly one.
*Generic alternative it beats:* `hover:bg-gray-100` in light mode and `dark:hover:bg-gray-800` in dark, then discovering the modal has a different background and the hover disappears.
*When it does NOT apply:* when you need the hover to survive over user-supplied imagery or a chart canvas — there, use a solid with a defined contrast floor.

**4. Ration whitespace at the container, not the row.**
PostHog's `--scene-padding` is `0.5rem`. Linear's issue rows use `margin-inline: 8px` with `padding-inline: 36px 28px` — the *outside* of the list gets 8px, and all the real space goes inside the row where the columns are. Attio's grid runs edge-to-edge inside its panel.
*Why it works:* padding at the page level is multiplied by zero (there's one of it) but padding at the row level is multiplied by 200. Eight pixels of extra row padding costs you five rows of screen; eight pixels of extra page padding costs you nothing.
*Generic alternative it beats:* `p-6` on the page container, `p-4` on the card, `px-6 py-4` on the cell. Three nested paddings that consume 20% of the viewport before a single datum appears.
*When it does NOT apply:* a settings page or a form. There, generous container padding is the whole point, and Workday's 8pt grid is right.

**5. Stack thin toolbars instead of one fat one.**
Attio's records view is three bars, each roughly 40px: title + collaborators; then `All deals ▾` + View settings + Import/Export; then Sort + Filter. Linear runs a 44px header and a 44px view bar. PostHog gives the breadcrumb 60px and shrinks it to 44px on scroll.
*Why it works:* each bar has one job, so nothing needs a separator inside it, and the vertical rhythm stays legible. A single 72px bar holding eight controls forces you to invent internal dividers, which reads as noise.
*Generic alternative it beats:* one `h-16` header with `justify-between`, a search field, three buttons, an avatar stack and a kebab — the standard AI dashboard header, which manages to be both taller and less capable.
*When it does NOT apply:* when only one control exists. Two bars for one dropdown is worse than one.

**6. Column-level aggregation belongs in the grid, not in cards above it.**
Attio pins a footer row under the grid: `2,813 count` under the record column, `$83,560,165 sum` under the value column, and `+ Add calculation` under every other column. The aggregation is *in the column it describes*.
*Why it works:* it removes the mapping step. A KPI card that says "Total pipeline $83.5M" makes the user find which column that came from; a footer cell under the column does not. It also scales: five columns, five aggregates, no new layout.
*Generic alternative it beats:* a row of four gradient stat cards above the table — the single most recognisable AI-dashboard tell. See the Retool gallery app, which has exactly four of them at 152px tall above a 68px-row table.
*When it does NOT apply:* an executive summary screen where the user never touches the table. Then the card is the product.

**7. Fixed-width columns for identifiers and dates; right-align and tabular-align numbers.**
Linear's issue-id cell is `width: 72px; display: inline-block` and the date cell is `width: 40px; text-align: right`. Its breadcrumb labels carry `font-variant-numeric: lining-nums tabular-nums`. Attio right-aligns `$4,300` / `$70,650` / `$100,200` in the value column.
*Why it works:* proportional digits make a column of numbers ragged in a way that defeats magnitude comparison. Fixed identifier widths make the left edge of the *title* column straight, which is what the eye actually tracks.
*Generic alternative it beats:* letting every column auto-size to content, so IDs jitter between 52px and 78px and the titles never line up.
*When it does NOT apply:* single-value displays. `font-variant-numeric: tabular-nums` on a lone headline number just makes the 1 look lonely.

**8. Density is set by the primitive, and the primitive is smaller than you think.**
PostHog's default button is 30px tall with 6px of horizontal padding. Linear's filter tab is 28px. Attio's sidebar row is 26px. Grafana's nav item is 32px. None of these are on an 8px grid, and none of them are 40px.
*Why it works:* controls appear in rows next to data. A 40px button next to a 36px row forces the toolbar taller than the content it acts on, which inverts the visual hierarchy.
*Generic alternative it beats:* shadcn/Radix defaults (`h-10` = 40px button, `h-9` = 36px input) applied unchanged. They are tuned for marketing and settings surfaces, not for a grid toolbar. Override `--button-height` before you write a line of feature code.
*When it does NOT apply:* touch surfaces and primary CTAs. A 30px "Delete workspace" confirm button is hostile. Keep destructive and terminal actions at 36–40px.

**9. Nav depth is handled with collapsible sections and a fixed rail width, not with expanding mega-menus.**
Grafana: 319px rail, 11 top-level sections (Starred, Dashboards, Explore, Drilldown, AI, Alerts & IRM, Machine learning, Testing & synthetics, Observability, Connections, Administration), each 32px with a right-side chevron; active item is a filled 6px-radius rect plus a 2px accent bar at x=0. Attio: 232px rail, flat items first (Notifications, Tasks, Notes, Emails, Reports, Automations), then collapsible groups (Favorites, Records) with 12px caps-ish section labels. Amplitude: three-deep with per-section chevrons in the same rail.
*Why it works:* a fixed rail means the content area never reflows when you open a section — which matters enormously when the content area is a 40-column grid with a horizontal scroll position.
*Generic alternative it beats:* a nav that pushes content, or a flyout mega-menu that covers the data you were reading. Both are fine on marketing sites and hostile here.
*When it does NOT apply:* products with genuinely two-level IA (Sentry: Issues / Explore / Dashboards / Insights / Settings). Don't build a tree for five destinations.

**10. Saved views are a first-class object with their own switcher, and filters live under the switcher.**
Attio: `All deals ▾` sits in its own bar with View settings and Import/Export to the right; Sort and Filter live in a *separate, lower* bar. Linear: filter tabs at 28px, `data-active=true` → `background: #ffffff14`, sitting in the 44px view bar. Grafana ships the current query as a URL parameter set (`?var-filters=&var-fields=&var-levels=&from=now-15m&to=now`) so a view is a link.
*Why it works:* separating "which view am I in" from "what am I filtering right now" is the difference between a tool people share links in and a tool people screenshot. Put the saved view above the ad-hoc filters and the mental model follows the layout.
*Generic alternative it beats:* one filter bar where saved views are just another chip, so nobody can tell whether their filter is persistent.
*When it does NOT apply:* single-view tools. Don't build a view switcher for one view — Attio only shows it because a workspace has dozens.

**11. Salesforce's problem is chrome depth, not row height — and this is the most misread lesson in B2B design.**
Measured from the shipping SLDS package: `body { font-size: 0.8125rem }` (13px) and `.slds-table th, .slds-table td { padding: 0.25rem 0.5rem }` (4px / 8px). That is **denser than Atlassian's DynamicTable** (14px, 4px/8px, 48px rows) and denser than Linear's issue row. The SLDS neutral ramp is a well-built 13 steps.
What actually breaks Salesforce is everything above the table: a global header, an app launcher bar, an object tab strip, a list-view header with its own title and action row, a filter panel, and a highlights panel — five to six stacked chrome bands before row one, each with its own `1px` border and its own background. Plus `thead th { font-weight: 700 }` on 13px text, which turns every column header into a shout.
*The rule this yields:* budget **chrome height** as a hard number before you design anything. Attio spends ~120px above row one at 1512px wide. Linear spends 88px. Give yourself 120px and force every band to justify itself.
*When the counter-example doesn't apply:* if your users genuinely need six levels of context (org → app → object → view → record → related list), you may need the bands. But collapse them on scroll, the way PostHog collapses breadcrumbs 60px → 44px.

**12. Empty, error and zero-data states get real illustration and two real buttons — but only in the content area.**
Grafana's dashboard-not-found state: mascot illustration, `Dashboard not found` at ~20px, one sentence of body, then **two** buttons — `← Back to Home` (primary blue) and `⊙ Community Help` (secondary). The 319px rail and the breadcrumb stay intact behind it. The error does not take over the app.
*Why it works:* the nav is how the user recovers. Replacing the whole viewport with a sad face removes their escape route.
*Generic alternative it beats:* a full-page 404 that unmounts the shell, or an empty state with one greyed line of text and no action.
*When it does NOT apply:* auth failures and hard outages, where the shell itself is untrustworthy.

## States, edges and the unglamorous parts

**Loading.** Skeletons that match the real row geometry — same height, same column widths — so nothing reflows on arrival. PostHog runs `--animate-skeleton: skeleton 2s -1s infinite linear`; the `-1s` negative delay means a skeleton that mounts mid-animation is already shimmering rather than starting from a static frame. For grids, keep the header and toolbar live and skeleton only the rows; the user can start setting filters while data loads. Never use a centred spinner for a table — it hides the column layout, which is half the information.

**Zero data vs. filtered-to-zero vs. permission-denied.** These are three different screens and most products ship one.
- Zero data (first run): explain the object and give the creating action. "No deals yet — deals track revenue opportunities through your pipeline." + `Create deal` + `Import from CSV`.
- Filtered to zero: keep the filters visible and offer to clear them. "No deals match these 3 filters." + `Clear filters`. Never show the first-run onboarding here; the user has 4,000 deals.
- Permission denied: name the object, name the missing permission, and name who can grant it. "You don't have access to Finance deals. Ask a workspace admin for the *Deals: read* permission." Do not show a generic 403 and do not silently filter the row out of the list — silent filtering makes counts lie.

**Too much data.** Virtualise past ~200 rows and keep the scrollbar honest (don't infinite-scroll a dataset whose size you know). Show the true count next to the filtered count — Attio's footer showing `2,813 count` while the viewport holds 10 rows is the pattern. Cap column count with a column-configuration panel rather than horizontal scroll into infinity; Grafana, Attio and Airtable all put field visibility behind a single "View settings"/"Fields" control.

**Selection and bulk actions.** Checkbox in a fixed ~34px leading gutter, present at rest (Attio) or on hover+selection (Linear draws a 14px `border-radius: var(--radius-4)` box at `left: 12px` on the row's `::after`, opacity 0 → 1 on hover). Header checkbox is tri-state. When anything is selected, replace the *toolbar row* with a selection bar — same height, so nothing jumps — reading `3 selected` plus the verbs. Include "select all 2,813" as an explicit second step after "select all 50 on this page"; conflating them is how people mass-delete a database.

**Inline editing.** The edit affordance must not change the row's height or the column's width. Cell becomes an input with the same font, same padding, a 1px accent ring drawn as `box-shadow: inset 0 0 0 1px` (not `border`, which reflows). Escape reverts, Enter commits and moves down, Tab commits and moves right. Optimistic write with an inline revert on failure — a toast alone loses the row.

**Resizable panes.** Persist the size per-user per-view. Give the handle a 4px hit area with a wider invisible target (`--vscode-sash-size: 4px; --vscode-sash-hover-size: 4px` in PostHog's embedded editor). Snap to a collapsed state rather than letting a pane reach 0px, and remember the pre-collapse width.

**Breadcrumbs.** They earn their space only when the hierarchy is real and deep. Grafana's `Dashboards › Not found` is two segments and still useful because it tells you which section failed. Attio's `Basepoint ▾` workspace switcher does the same job in one control. PostHog collapses the breadcrumb band 60px → 44px on scroll. The failure mode is a breadcrumb that restates the nav you can already see — `Home › Dashboard › Dashboard`.

**Offline / stale.** Show the staleness, not a modal. A `Last updated 4m ago` next to a refresh control, and a subdued banner if a write failed and is queued. Grafana's Drilldown keeps the time range in the URL so a stale tab is self-describing.

**Permission/role UI.** Roles as a table (role × capability), not a list of toggles. Show effective permissions, not just granted ones — "Read (inherited from Workspace member)" prevents the entire class of "why can they still see this" tickets. Never let the UI offer an action the role can't perform; disable with a tooltip naming the missing permission.

## Mobile

Mostly: don't. A 40-column grid does not become a mobile experience by stacking into cards; it becomes 40 unlabeled paragraphs. What the good ones actually ship:

- **A different product, scoped to triage.** Linear's and Attio's mobile apps are read, comment, assign, change status. No grid, no column config, no bulk edit.
- **Detail-first navigation.** Mobile enters at the record, not the list. The list becomes a search result, not a workspace.
- **Notification and approval flows.** This is the genuinely mobile-native slice of enterprise software — Workday's and Rippling's mobile value is approving PTO, not running a headcount report.
- **Honest refusal.** A tablet-and-up gate with a clear message beats a broken responsive grid. If you must render a grid below 900px, freeze the first column, allow horizontal scroll, and show a persistent column indicator.

Between roughly 900px and 1280px, drop the secondary rail first (Linear moves its right sidebar 320px → 280px below 1280px, then removes it), then the primary rail becomes icon-only at ~64px, then the grid loses optional columns in a defined priority order that you declare in the column config — never by wrapping.

## How this archetype fails

The bad imitation is recognisable in five seconds, and every symptom is measurable:

1. **Rows are 30–90% too tall.** 44–68px where the reference set is 24–40px. Usually caused by `py-4` on the cell plus `text-base` plus a `gap-4` inside the row. The Retool AI gallery app's 68px rows against Attio's 36px is the exact spread.
2. **One font size for the whole product.** 16px everywhere, so the nav, the column header, the cell value and the timestamp all carry the same weight and the eye has nothing to grip.
3. **Four gradient stat cards above the table.** Almost always with an emoji or a lucide icon in a tinted rounded square, a big number, and a green `↑12%` delta. This is the archetype's single loudest tell. Real products put aggregates in the column footer or in the chart, not in a card row.
4. **Borders on everything.** Card border + table border + row border + cell border + input border, all `1px solid #E5E7EB`. The reference set uses *one* hairline value and lets whitespace do the rest. Grafana renders an entire dense screen with essentially one border color.
5. **Hover states that move things.** `hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300` on a table row. Also `transition-all`, which animates properties you did not intend.
6. **No selection model.** No checkboxes, no bulk bar, no tri-state header, no "select all N". A B2B table without bulk actions is a report, and the user will export it to a spreadsheet within a week.
7. **No saved views, or saved views conflated with filters.** If the state isn't in the URL and isn't nameable, the tool doesn't get shared, and if it doesn't get shared it doesn't get adopted.
8. **Radii too large.** 12px on a 32px control, 16px on cards. Dense B2B lives at 4–8px; Geist uses only 4 and 6.
9. **One empty state for every emptiness.** The same "No data found 📭" for first-run, filtered-to-zero, permission-denied and load-failure.
10. **Chrome that never collapses.** Five stacked bands, none of which shrink on scroll, so the data area is 55% of the viewport. Budget it: ≤120px above row one at 1440px.
11. **Numbers in a proportional font, left-aligned.** No `tabular-nums`, no right alignment, so magnitudes can't be compared by eye.
12. **A dark mode that is `invert()` in spirit.** Real dark systems re-pick the whole ramp: Linear's dark borders are `#23252A / #34343A / #3E3E44` while its light borders are `#E9E8EA / #E4E2E4 / #DCDBDD` — not mirrored values.

### Where conventional wisdom is wrong here

- **"Always use an 8px grid."** Wrong for this archetype. The working grid is 4px (Twenty ships `--t-spacing-N = N × 4px` plus 2px and 6px half-steps), and the load-bearing numbers are deliberately off any grid: Grafana's 23.8px rows, Attio's 25.9px nav items, PostHog's 30px buttons. Workday's tokens *say* "8pt sizing grid" in a comment, and Workday is the counter-example.
- **"Body text should never go below 16px."** Every product in the reference set violates this in the data plane: 12px (Grafana), 13px (Salesforce, Linear), 14px (Attio, PostHog, Atlassian). The accessibility obligation is met by contrast ratio, honouring browser zoom, and — best — shipping a user-controlled density setting. A 16px floor in a 40-column grid is not accessible; it is a scroll tax.
- **"Use Inter at 500 for medium."** Linear runs Inter Variable at **510 / 590 / 680**. If your font is variable, the named weights are a starting point, not the answer; interpolate until 400 and "medium" are actually distinguishable at your body size.
- **"Zebra striping helps horizontal scanning."** Attio, Linear, Grafana and Hex all use a flat ground with one hairline. Zebra fights the hover overlay, fights the selection fill, and creates a second visual rhythm that competes with grouping. Use column rules instead if the table is genuinely wide — Attio does.
- **"Animate hover for polish."** Animate *colour*, at 160ms, and nothing else. Linear's transition list is literally `background .16s var(--ease-out-quad), color .16s var(--ease-out-quad)`.
- **"Dark mode is table stakes."** Attio, Airtable, Jira, Metabase and PostHog default light. Grafana and Linear default dark. It tracks the room, not fashion — observability and code tools live on dark screens in dark rooms; CRM and HR live in offices. Ship one excellent theme before two mediocre ones.
- **"Density is a hostile choice."** Density is what respect for the user's time looks like in this archetype. The hostile choice is making them scroll for data they asked for. Hostility comes from *unrationed* density — no grouping, no hierarchy, no whitespace anywhere — not from a 32px row.

### The density calibration rules — the correction, quantified

If you generated a B2B interface with default component-library values, apply these multipliers before you look at it again:

| Element | Typical generated value | Correct range | Correction |
|---|---|---|---|
| Table row height | 44–68px | **28–36px** (24–28px for log/query output) | ×0.55–0.70 |
| Table cell padding | `12px 16px` | **4px 8px** to `6px 12px` | ×0.4–0.6 |
| Body / cell font | 16px | **13–14px** (12px for machine data) | ×0.81–0.88 |
| Cell line-height | 1.5 | **1.25–1.43** (Twenty uses 1.1 for labels) | ×0.8 |
| Default button height | 36–40px | **28–32px** | ×0.78 |
| Button horizontal padding | 16px | **6–12px** | ×0.4–0.75 |
| Input height | 40px | **28–32px** | ×0.75 |
| Sidebar nav item | 40–44px | **26–32px** | ×0.65–0.75 |
| Sidebar width | 256–288px | **232–320px** (keep it; the rail is not where you save) | ×1.0 |
| Page/scene padding | 24–32px | **8–16px** | ×0.33–0.5 |
| Card padding | 24px | **12–16px** | ×0.6 |
| Gap between controls | 16px | **4–8px** | ×0.4 |
| Border radius | 8–12px | **4–8px** (6px is the safest single value) | ×0.55 |
| Chrome above row one | 180–240px | **≤120px** at 1440px | ×0.55 |
| Section heading size | 20–24px | **13–14px, weight 500–600, tertiary colour** | ×0.6 |
| Badge / chip height | 28–32px | **20–24px**, 11–12px text | ×0.72 |
| Icon size in controls | 20–24px | **12–16px** | ×0.65 |
| Hover transition | 300ms, `transition-all` | **150–160ms, background+color only** | ×0.53 |

A single sanity check that catches most of it: **at 1440×900 with a full dataset, count the visible data rows.** Assume ~120px of chrome, leaving ~780px: that is 21 rows at Attio's 36px, 19 at Linear's 40px, 32 at Grafana's 23.8px, and 11 at the Retool template's 68px. If you are under 18 visible rows, the multipliers above are not suggestions.

## Copy and tone

The voice is a competent colleague reporting facts. Never chirpy, never apologetic, never a brand voice. Users read these strings 400 times a week; anything with personality becomes irritating by Wednesday.

**Rules**

- Label controls with the verb the user is doing, not the system's noun. `Import / Export`, `View settings`, `Add calculation` (Attio). Not `Data Management` or `Configuration Options`.
- Empty states state the fact, then the action, in that order, in two sentences maximum.
- Errors name the object, the failure, and the recovery. Never "Something went wrong."
- Counts are always exact and always present: `2,813 count`, `3 selected`, `Showing 50 of 2,813`. Never "many" or "several."
- Sentence case for everything, including buttons and column headers. Title Case is a Salesforce tell; ALL CAPS status lozenges are a Jira tell (`AT RISK`, `ON TRACK`, `IN PROGRESS`) and they shout on every row.
- Time is relative for recent and absolute past a day, with the absolute value in the tooltip: `4m ago` / `Dec 12, 10:40` (Attio uses exactly this).
- Destructive confirmations name the thing and the consequence and require typing only when the action is unrecoverable across an org.

**Right**

- `No deals match these 3 filters.` + `Clear filters`
- `You don't have access to Finance deals. Ask a workspace admin for the Deals: read permission.`
- `Couldn't save "Q3 pipeline" — the workspace is at its 50-view limit. Delete a view or upgrade.`
- `Delete 12 deals? This can't be undone.`
- `Last synced 4m ago` · `Retry`
- `Showing 50 of 2,813 · Load more`

**Wrong**

- `Oops! Looks like there's nothing here 🤷` — cute, uninformative, ages badly by the fiftieth viewing.
- `Something went wrong. Please try again later.` — names nothing, offers nothing.
- `Manage Your Data Configuration Settings` — Title Case, three nouns, zero verbs.
- `Great job! You've created your first deal! 🎉` — celebration copy in a tool someone uses 200 times a day.
- `No results found` on a permission failure — an actively misleading lie about why the row isn't there.
- `AT RISK` / `ON TRACK` — all-caps status on every row turns the table into noise. `At risk` in a 20px chip does the same job quietly.

## Sources

- `https://play.grafana.org/a/grafana-lokiexplore-app/explore` — live, logged-out production Grafana. Probed computed styles: body 14px/22px Inter ls +0.15px on `#111217`, table rows 23.8px with `padding: 2px 8px` at 12px/18.86px, 5,556 text nodes at 12px/18px, border `1px rgba(204,204,220,0.12)` × 297, radius 6px × 421.
- `https://play.grafana.org/d/000000012/grafana-play-home` — captured the dashboard-not-found state: 319px rail (`rgb(24,27,31)`) + 1px `rgb(46,48,54)` divider, 32px nav items at 6px radius, mascot illustration with `Back to Home` + `Community Help`.
- `https://attio.com/platform/data` and `https://attio.com/` — 1:1 screenshots of the real records grid. Pixel-measured row separators at y = 442, 478, 514, 550, 586, 622, 658, 693, 729, 765, 801 → **36px pitch**, separator `#EFF0F0`, white ground, no zebra, per-column footer aggregates. Sidebar DOM probed live: item height 25.9px, 32px pitch, `padding: 0 8px`, `border-radius: 9px`, active fill `rgb(238,239,241)`, label 14px/20px ls −0.28px w500.
- `https://app.attio.com/welcome` — `html { font-size: 10px }`; `--web-table-scroll-thumb-bg: rgba(16,17,18,0.2)`. App CSS is StyleX-hashed, so token names are not readable.
- `https://static.linear.app/web/_next/static/css/index.CD2COVl5.css` and `.../IssueListView.BH55qTC9.css` — Linear's shipped tokens: full font-size and weight scale, four-step text ramp, three-step border ramp, five-step surface ramp per theme, `--border-hairline: 1px` → `0.5px` at 2× DPR, radius scale. Issue-list geometry: 40px rows, 36px group headers, 44px header/view bars, 28px filter tabs, 24px badges, 72px id column, 40px date column, `#ffffff05/08/0d/14` overlay ladder, `.16s ease-out-quad`.
- `https://us.posthog.com/login` + `https://app-static-prod.posthog.com/static/index-5ZKS6Y46.css` — button height and padding scales, icon sizes, `--scene-padding`, `--scene-layout-*`, breadcrumb collapse heights, the 19-step neutral ramp, `.LemonRow { min-height: 2.5rem }`, `.LemonTable--xs td { padding-block: .25rem }`, `--animate-skeleton` with negative delay.
- `https://demo.twenty.com` — token CSS loads on the auth screen: complete `--t-spacing-*`, `--t-border-radius-*`, `--t-font-size-*`, `--t-color-gray1..12`, `--t-border-color-{light,medium,strong}`, `--t-text-line-height-md: 1.1`.
- `https://atlassian.design/components/dynamic-table/examples` — live ADS DynamicTable: 48px rows, 14px/20px body, `td padding 4px 8px`, `th` 12px/16px at weight 653 with a **2px** `rgba(11,18,14,0.14)` underline, 32px nav items at 6px radius.
- `https://cdn.jsdelivr.net/npm/@salesforce-ux/design-system@2.25.2/assets/styles/salesforce-lightning-design-system.css` — `body { font-size: .8125rem }`, `.slds-table th, td { padding: .25rem .5rem }`, `thead th { background: #F3F3F3; color: #444444; font-weight: 700 }`, the 13-step `--slds-g-color-neutral-base-*` ramp and 4-step border ramp, 3px radii.
- `https://cdn.jsdelivr.net/npm/@workday/canvas-tokens-web@latest/css/base/_variables.css` and `.../system/_variables.css` — font-size and line-height scales, the "8pt sizing grid" baseline comment, oklch palettes at 13 steps per hue, duration scale in 50ms increments, three easing families.
- `https://vercel.com/geist/colors` — live computed values: 14px/20px on 121 of 163 text nodes, 13px/18px and 12px/16px secondaries, radii only 4px and 6px, one border `#EBEBEB` × 51. Chunk CSS gave the parallel `--ds-gray-100…1000` and `--ds-gray-alpha-100…1000` ramps.
- `https://retool.com/app-gallery/security-operations-console` — live embedded Retool app on a dark ground; pixel-measured CVE table rows at 68–69px pitch under four 152px KPI cards. The negative control.
- `https://hex.tech/` — 1:1 capture of a notebook with a SQL result grid; pixel-measured separators at y = 261, 285, 309, 333 → **24px rows**, header band the same height, separator `#ECEDF2`, index gutter column.
- `https://www.atlassian.com/software/jira/features` — real Jira screenshots: nested goal tables with disclosure triangles, `AT RISK` / `ON TRACK` / `IN PROGRESS` all-caps saturated lozenges, Name/Status/Owner column pattern.
- `https://amplitude.com/amplitude-analytics` — real product capture: three-deep collapsible left rail with per-section chevrons, `Create / Recent / Favorites / Spaces` top bar, KPI tiles with delta chips, template gallery strip.
- `https://sandbox.sentry.io/issues/` — issue-stream layout captured behind the email gate (the background is a static composite, so no computed values were taken from it); marketing chrome measured at 14px/18px, `#6C5FC7` accent, `#343A40` primary text, `#6C757D` secondary, 4px radius dominant.
- `https://posthog.com/product-analytics`, `https://www.datadoghq.com/product/platform/`, `https://www.sigmacomputing.com/product`, `https://www.metabase.com/`, `https://www.airtable.com/`, `https://www.rippling.com/hr-management`, `https://www.deel.com/global-payroll/`, `https://play.clickhouse.com/play` — captured and viewed for nav depth, toolbar stacking, and how each treats in-product imagery. Deel and Rippling ship illustrative micro-UI rather than real screenshots; Gusto blocked headless capture (Cloudflare).
