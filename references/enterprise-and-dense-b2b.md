# Dense enterprise and internal tools

**Evaluated:** 2026-09

## What this archetype is for

Software someone sits inside for four to eight hours a day, where the screen's job is to hold more true facts than the user can hold in working memory: CRMs (Attio, Salesforce, Twenty), issue and work trackers (Linear, Jira), observability consoles (Grafana, Datadog, Sentry), analytics and BI (PostHog, Amplitude, Mixpanel, Sigma, Hex, Looker, Metabase), spreadsheet-databases (Airtable), internal-tool builders (Retool), and HR/payroll systems of record (Workday, Rippling, Deel, Gusto). The defining constraint is that the user is *not* browsing — they are scanning a list of 200 rows for the three that are wrong, or comparing column 7 against column 12, and every pixel of chrome you add is a row they can't see. This is not the archetype for a consumer signup flow, a marketing site, a settings page someone visits twice a year, or a mobile-first product. If your user's session is under 90 seconds, do not build from this file.

## The reference set

| Product | Why it's here | The single thing to steal |
|---|---|---|
| **Attio** | 36px rows carrying a 16px avatar, a chip and a currency value without growing | 36px record rows on white with one 1px `#EFF0F0` hairline, **no zebra**, a header row at the *same* 36px, and a per-column aggregation footer (`2,813 count` / `$83,560,165 sum`) pinned under the grid |
| **Linear** | 40px rows with 64px of internal padding and zero row rules | Hover is a `#ffffff08` overlay on a `::before` at `inset:0`, `border-radius:8px`, opacity 0→1 **with no transition** — the row's own box is never touched, so nothing reflows and nothing lags a fast cursor |
| **Grafana** (play.grafana.org) | Two type scales in one product: 14px chrome, 12px data, in a 95/5 split | Table cells at `padding: 2px 8px`, 12px/18.86px, giving **23.84px rows**; one hairline *hue* (`204,204,220`) at four alphas — 0.12 (×300), 0.3 (×84), 0.08 (×56), 0.2 (×20) |
| **PostHog** | The tightest control geometry of any product measured | `--button-height-base: 30px` with `--button-padding-x-base: 6px`; `--scene-padding: 0.5rem`; breadcrumbs that collapse 60px → 44px on scroll |
| **Hex** | Notebook output grids at the density of a terminal | 24px result-grid rows with a left index gutter (`0 1 2`), header band the same 24px height |
| **Retool** | Shows what happens when a generator writes the layout | Its AI-authored gallery app ships **68px table rows** — the exact failure this file exists to prevent. Study it as a negative control |
| **Salesforce / SLDS** | The most instructive counter-example, and not for the reason people think | SLDS's *primitives* are dense (13px body, 4px/8px cell padding). The failure is chrome depth and border density stacked on top. Steal the 13-step neutral ramp, reject the layout |
| **Jira / Atlassian Design System** | The 48px row as institutional default | `DynamicTable` rows are 48px with 14px/20px text and a **2px** header underline — 33% fewer rows on screen than Attio for identical information |
| **Workday Canvas** | Tokens designed by committee for a 16px world | Base font scale starts at `1rem` for body; the whole system is pinned to an explicitly named "8pt sizing grid." Correct for a form-heavy HR flow, wrong for a 400-row report |
| **Twenty** (open source CRM) | A fully published token set for an Attio-class product | 12-step gray ramp + separate `--t-border-color-{light,medium,strong}` roles, and a font scale expressed in awkward fractions (`.92rem`, `1.23rem`) because it was tuned by eye, not by ratio |
| **Sentry** | Issue-stream information hierarchy | Five facts in one row band — title, culprit path, event count, user count, sparkline, assignee — with only the title at full text contrast. *Measured off a static marketing composite behind an email gate; treat the layout as sound and the pixel values as unverified.* |
| **Vercel Geist** | The only public system shipping a full alpha ramp in parallel with its solid one | Two 10-step gray scales: `--ds-gray-100…1000` (solid) **and** `--ds-gray-alpha-100…1000` — overlays composite correctly on any surface |
| **Amplitude / Mixpanel / Sigma / Looker / Snowflake / Metabase / Datadog** | Studied for nav depth, saved views, and toolbar stacking | Amplitude's three-deep collapsible left rail with per-section chevrons and a single 32px-ish global bar |
| **Deel / Rippling / Gusto** | The HR/payroll subgenre | These correctly refuse full density in employee-facing flows and use it only in admin tables — the density decision is per-surface, not per-product |

**Two exceptional products not on the brief, and how I found them:**

1. **Twenty** (`twenty.com`, demo at `demo.twenty.com`) — found by searching for open-source Attio/Salesforce alternatives on GitHub. It is the only Attio-class CRM that ships its complete design-token set to the browser unminified, so you can read the whole system (below). Its public demo gates behind an auth wall, but the token CSS loads on the login screen.
2. **Vercel Geist** (`vercel.com/geist`) — found by looking for design systems whose *dashboard* is dense B2B rather than marketing. Geist's docs render live components, so `getComputedStyle` returns production values. Re-probed 2026-09: 14px/20px carries **123 of 176 text nodes** on the colors page (the token default is 16px/24px, which reaches 11 nodes); radii are 4px ×98 and 6px ×88, with 12px appearing twice and nothing else; and one border colour, `#EBEBEB`, is used 51 times against 7 uses of everything else combined. The absolute node counts drift a few percent between deploys — the *ratio* is the finding, not the integer.

Honourable mention: **play.grafana.org** is a fully public, logged-out, production Grafana instance — a real app with real data behind no auth wall, so `getComputedStyle` returns shipping values for a 5,000-node dense screen. Nothing else in this reference set can be probed that deeply without an account. Use it as the probe target when you need ground truth.

## Measured specifics

Everything below was read with `getComputedStyle` in a headless Chromium at a 1512×945 viewport, pulled from the product's own published CSS, or measured pixel-by-pixel off a 1:1 (deviceScaleFactor 1) screenshot. Nothing here is recalled.

### Data-row geometry — the core table

| Source | Row pitch | Cell padding | Text | Separator | Ground |
|---|---|---|---|---|---|
| Grafana table panel (Loki Drilldown, dark) | **23.84px** | `2px 8px` | 12px / 18.86px, ls +0.14994px | `1px rgba(204,204,220,0.12)` | transparent on `#111217` |
| Hex SQL result grid | **24px** | — (measured from pixels) | ~11–12px | `1px #ECEDF2` | `#FFFFFF`, no zebra |
| Salesforce SLDS `.slds-table th, td` | ~24–32px | `0.25rem 0.5rem` (**4px 8px**) | 13px (`body{font-size:.8125rem}`) | — | `th` band `#F3F3F3`, `th` color `#444444`, **weight 700** |
| Attio records grid | **36px** (re-measured 2026-09: 10 consecutive baselines at a 36.0px pitch, header row the same 36px) | — | 14px / 20px, ls −0.14px (−0.01em), w500 | `1px #EFF0F0` | `#FFFFFF`, **no zebra**; row rules *and* column rules at the same weight |
| Linear issue row | **40px** | `padding-inline: 36px 28px`, `margin-inline: 8px` | 13px | none — hover overlay only | `#08090A` |
| PostHog `.LemonRow` | `min-height: 2.5rem` (40px) | `0.25rem 1rem` | 14px / 20px | — | — |
| PostHog `.LemonTable--xs td` | — | `padding-block: 0.25rem` | — | — | — |
| Atlassian `DynamicTable` (Jira) | **28px** text-only, **48px** with a 24px avatar | `4px 8px` | 14px / 20px | rows: **none**; `th` underline **2px rgba(11,18,14,0.14)** | `#FFFFFF` |
| Retool AI-generated gallery app | **68–69px** | — | 12–14px | `1px rgba(233,235,223,0.12)` | `#151515` |

At a 900px-tall content area: 24px rows → 37 rows visible. 36px → 25. 48px → 18. 68px → 13. Attio shows **39% more rows than a 48px Jira row**, and **92% more than the Retool template**, at the same font size.

Re-probed 2026-09, and the Atlassian number needed correcting: `DynamicTable`'s cell primitive is `4px 8px` on 14px/20px text, which yields a **28px** row. The live examples measure 48, 45, 28 and 26px in the same page — the 48 comes from a 24px avatar in a wrapper, not from a table token. That is the same lesson as the Salesforce one (#11) at component scale: **the primitive is dense and the content inflates it.** Attio puts a 16px avatar inline with 14px text and holds 36px. Your row height is whatever your tallest inline element is; measure it rather than setting it.

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

**Attio** (re-probed 2026-09 on `app.attio.com`): `html { font-size: 10px }` — the whole app's rem scale is in tenths, so `1.4rem` = 14px, `1.2rem` = 12px. Text runs 14px/20px ls −0.14px w500 and 12px/16px ls −0.12px w500. A −0.28px (−0.02em) variant also ships on the marketing grid. Treat *negative tracking on 14px UI text* as the signature and −0.01 to −0.02em as the range; the exact value is not load-bearing.

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

Two lessons: (a) 10–13 steps is the working range; PostHog's 19 evenly-spaced steps at zero hue means adjacent steps differ by 5% lightness, which is below the threshold anyone picks between, and Linear's 4 text steps are not enough for a product with cards on cards. (b) **Ship an alpha ramp alongside the solid ramp.** Geist, SLDS and Linear all do — Linear ships *three* border ramps (light solid, dark solid, translucent) precisely so a border can land on an unknown surface. Solid grays break the moment a row sits on a tinted or elevated one.

### Hairlines and borders

- Grafana: one border *hue* — `204,204,220` — at four alphas across a whole screen: 0.12 (×300, the default hairline), 0.3 (×84, inputs and popovers), 0.08 (×56, internal panel splits), 0.2 (×20). Plus 124 uses of `1px solid transparent` held as placeholders so focus rings don't reflow, and `1px rgb(110,159,255)` ×80 for the focus ring itself. The discipline is the single hue, not a single value.
- Linear: `1px rgba(255,255,255,0.08)` on 276 elements, and `--border-hairline: 1px` that becomes **`0.5px` at `min-device-pixel-ratio: 2`**. Half-pixel hairlines on retina.
- Attio grid separator: `1px #EFF0F0` (≈6% black). Table has row rules *and* column rules; both the same weight.
- Atlassian: `DynamicTable` rows carry **no bottom border at all** (`border-bottom-width: 0px` on every `td`). The only rule in the table is the `<thead>` underline at **2px rgba(11,18,14,0.14)** — 74 uses across the page against 38 uses of the 1px value elsewhere. Row separation comes from the 4px cell padding alone.
- Vercel Geist: `1px #EBEBEB`, 51 uses, and essentially nothing else.

The pattern: **one hairline hue for the whole product, expressed as an alpha over the surface, not a solid gray, at no more than four steps.** A second, heavier weight exists only to separate the header from the body — and at Atlassian's density that header rule is the *only* rule in the table.

### Radii

| Product | In use |
|---|---|
| Grafana | 6px (421 elements), 10px, 9999px |
| Vercel Geist | 4px (×98) and 6px (×88) carry the page; 12px appears twice, and nothing else exists |
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

- Linear: `transition: background .16s var(--ease-out-quad), color .16s var(--ease-out-quad)` on **buttons, tabs and pills** — 160ms, background and colour only, no transform, no height, no margin. The **issue row itself has no transition at all**: `.row:before` flips `opacity` 0→1 instantly. Verified in `IssueListView.BH55qTC9.css`. This is deliberate and it is the harder call — a 160ms fade lags a cursor sweeping 30 rows a second, so the list that feels fastest is the one that doesn't animate. Animate the thing you click; don't animate the thing you pass over.
- PostHog is the honest counter-example: `.LemonRow` transitions `background-color, color, border, opacity` at `.2s ease` — four properties, 200ms, including `border`. It is fine because a LemonRow is a menu item you land on, not a grid row you sweep.
- Workday publishes durations in 50ms steps from 50→1000ms and three easing families (`--cnvs-base-easing-a-100: cubic-bezier(0.2,0,0.2,1)`).
- PostHog: `--animate-skeleton: skeleton 2s -1s infinite linear` — note the negative delay, so a freshly-mounted skeleton is already mid-cycle instead of starting from a dead frame.

## The decisions that make it work

**1. Two type scales, not one: chrome at 14px, data at 12px.**
Grafana's Drilldown screen, re-probed 2026-09, renders 5,332 text nodes: 5,080 at 12px and 70 at 14px/22px — a 95/1 split. (The absolute count moves with log volume; the ratio does not.) The 14px is the nav, the breadcrumb, the buttons — furniture you read once. The 12px is the log lines, the label counts, the series names — content you scan. Attio does the same split in the other direction (14px grid, 12px chips and metadata).
*Why it works:* the eye calibrates to the dominant size. If the whole product is 14px, a 14px table row reads as prose and you read it linearly. Dropping the data plane one step tells the eye "this is a field, scan it."
*Generic alternative it beats:* picking 16px (or `text-base`) for everything because that's the Tailwind default and someone said 16px is accessible. You end up with a 44px row and 40% of the information.
*When it does NOT apply:* long-form surfaces inside the product — a wiki page, an incident postmortem, a release note. Those go back to 15–16px at 1.5–1.6. Linear does exactly this: `--font-size-regular: 15px` for reading, 13px for the issue list.

**2. The hover state is an overlay, not a border and not a movement.**
Linear's issue row paints a `::before` at `inset: 0` with `background: #ffffff08; border-radius: 8px; opacity: 0` and flips opacity to 1 on hover — **with no transition declared**, so it is instant. The row's own box is untouched. Attio's active sidebar item is a flat `#EEEFF1` fill with 9px radius. Grafana's nav item is a filled rect at 6px radius.
*Why it works:* sweeping a cursor down 30 rows with a border-on-hover produces 30 layout recalculations and 30 one-pixel jumps. The overlay produces none. It also composes: a selected row, a hovered row and a focused row can stack three overlays without fighting over the same border property.
*Generic alternative it beats:* `hover:border-gray-300` or `hover:shadow-md hover:-translate-y-0.5`. The translate is the worst — a list that flinches.
*When it does NOT apply:* three real cases. (a) A card grid where cards are targets rather than rows — a template gallery, an app launcher — where lift is legible because there are 8 cards, not 200. (b) A row whose *only* affordance is hover, e.g. a read-only log line with a hidden copy button: there the overlay alone is too quiet and you need the button to appear. (c) Windows high-contrast / forced-colors mode, where alpha overlays are stripped entirely and you must fall back to a real border — `@media (forced-colors: active)` is the one place `hover:border` is correct.

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
*Why it works:* each bar has one job — identity, view selection, ad-hoc filtering — so no bar needs an internal `|` divider, and a control's meaning is given by which bar it sits in. Three 40px bars cost 120px; one 72px bar holding the same eight controls costs 72px but forces two internal dividers and leaves the user parsing groups left-to-right instead of top-to-bottom.
*Generic alternative it beats:* one `h-16` header with `justify-between`, a search field, three buttons, an avatar stack and a kebab — the standard AI dashboard header, which manages to be both taller and less capable.
*When it does NOT apply:* (a) Below ~1100px wide, where three bars start wrapping and you are better off collapsing to one bar plus an overflow menu — stacking only pays while each bar stays one line. (b) When your total control count is under four: two bars for one dropdown is worse than one. (c) When the bars would exceed the 120px chrome budget in #11 — three bars is the ceiling, not a pattern to extend to five. Attio's three bars *are* the ~120px budget.

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
*When it does NOT apply:* (a) Products with genuinely flat IA — Sentry's Issues / Explore / Dashboards / Insights / Settings. Don't build a tree for five destinations; a rail with five items and no chevrons is correct. (b) Products whose primary object *is* a hierarchy the user edits — a file tree, a folder-based BI catalogue. There the rail is the content, it must resize, and a fixed width is wrong. (c) Single-tenant internal tools where the user has one workspace and one section: the rail becomes a 44px top bar and you get 319px of width back.

**10. Saved views are a first-class object with their own switcher, and filters live under the switcher.**
Attio: `All deals ▾` sits in its own bar with View settings and Import/Export to the right; Sort and Filter live in a *separate, lower* bar. Linear: filter tabs at 28px, `data-active=true` → `background: #ffffff14`, sitting in the 44px view bar. Grafana ships the current query as a URL parameter set (`?var-filters=&var-fields=&var-levels=&from=now-15m&to=now`) so a view is a link.
*Why it works:* separating "which view am I in" from "what am I filtering right now" is the difference between a tool people share links in and a tool people screenshot. Put the saved view above the ad-hoc filters and the mental model follows the layout.
*Generic alternative it beats:* one filter bar where saved views are just another chip, so nobody can tell whether their filter is persistent.
*When it does NOT apply:* (a) When view state cannot be URL-encoded honestly — a filter over data the recipient can't see. Sharing a link that renders differently per viewer is worse than not sharing; show the permission-scoped row count next to the filter instead. (b) When views are per-user and never shared (a personal inbox): the switcher costs a bar and buys nothing, so persist the last filter and skip it. (c) Under roughly five saved views, a row of tabs beats a dropdown switcher — the switcher only earns its bar past the point where tabs would wrap.

**11. Salesforce's problem is chrome depth, not row height — and this is the most misread lesson in B2B design.**
Measured from the shipping SLDS package: `body { font-size: 0.8125rem }` (13px) and `.slds-table th, .slds-table td { padding: 0.25rem 0.5rem }` (4px / 8px). That is **denser than Atlassian's DynamicTable** (14px, 4px/8px, 48px rows) and denser than Linear's issue row. The SLDS neutral ramp is a well-built 13 steps.
What actually breaks Salesforce is everything above the table: a global header, an app launcher bar, an object tab strip, a list-view header with its own title and action row, a filter panel, and a highlights panel — five to six stacked chrome bands before row one, each with its own `1px` border and its own background. Plus `thead th { font-weight: 700 }` on 13px text, which turns every column header into a shout.
*The rule this yields:* budget **chrome height** as a hard number before you design anything. Attio spends ~120px above row one at 1512px wide. Linear spends 88px. The Retool AI gallery app spends **562px**. Give yourself 120px and force every band to justify itself.
*The same failure at component scale:* Atlassian's `DynamicTable` cell is `4px 8px` on 14px/20px — a 28px row — and the shipping examples are 48px because someone put a 24px avatar in a wrapper inside the cell. Dense primitives do not survive careless content. Measure the row you actually rendered, not the token you set.
*When the counter-example doesn't apply:* if your users genuinely need six levels of context (org → app → object → view → record → related list), you may need the bands. But collapse them on scroll, the way PostHog collapses breadcrumbs 60px → 44px.

**12. Empty, error and zero-data states get real illustration and two real buttons — but only in the content area.**
Grafana's dashboard-not-found state: mascot illustration, `Dashboard not found` at ~20px, one sentence of body, then **two** buttons — `← Back to Home` (primary blue) and `⊙ Community Help` (secondary). The 319px rail and the breadcrumb stay intact behind it. The error does not take over the app.
*Why it works:* the nav is how the user recovers. Replacing the whole viewport with a sad face removes their escape route.
*Generic alternative it beats:* a full-page 404 that unmounts the shell, or an empty state with one greyed line of text and no action.
*When it does NOT apply:* (a) Auth failures and hard outages, where the shell itself is untrustworthy — a session that has expired must not render a nav that 401s on every click. (b) Errors scoped to one panel in a dashboard of twelve: that gets an inline message inside the panel frame, no illustration, because twelve mascots is a joke. Illustration is for the *whole content area*, once.

## States, edges and the unglamorous parts

**Loading.** Skeletons that match the real row geometry — same height, same column widths — so nothing reflows on arrival. PostHog runs `--animate-skeleton: skeleton 2s -1s infinite linear`; the `-1s` negative delay means a skeleton that mounts mid-animation is already shimmering rather than starting from a static frame. For grids, keep the header and toolbar live and skeleton only the rows; the user can start setting filters while data loads. Never use a centred spinner for a table — it hides the column layout, which is half the information.

**Zero data vs. filtered-to-zero vs. permission-denied.** These are three different screens and most products ship one.
- Zero data (first run): explain the object and give the creating action. "No deals yet — deals track revenue opportunities through your pipeline." + `Create deal` + `Import from CSV`.
- Filtered to zero: keep the filters visible and offer to clear them. "No deals match these 3 filters." + `Clear filters`. Never show the first-run onboarding here; the user has 4,000 deals.
- Permission denied: name the object, name the missing permission, and name who can grant it. "You don't have access to Finance deals. Ask a workspace admin for the *Deals: read* permission." Do not show a generic 403 and do not silently filter the row out of the list — silent filtering makes counts lie.

**Too much data.** Virtualise past ~200 rows and keep the scrollbar honest (don't infinite-scroll a dataset whose size you know). Show the true count next to the filtered count — Attio's footer showing `2,813 count` while the viewport holds 10 rows is the pattern. Cap column count with a column-configuration panel rather than horizontal scroll into infinity; Grafana, Attio and Airtable all put field visibility behind a single "View settings"/"Fields" control.

**Selection and bulk actions.** Checkbox in a fixed ~34px leading gutter, present at rest (Attio) or on hover+selection (Linear draws a 14px `border-radius: var(--radius-4)` box at `left: 12px` on the row's `::after`, opacity 0 → 1 on hover). Header checkbox is tri-state. When anything is selected, replace the *toolbar row* with a selection bar — same height, so nothing jumps — reading `3 selected` plus the verbs. Include "select all 2,813" as an explicit second step after "select all 50 on this page"; conflating them is how people mass-delete a database.

**Inline editing.** The edit affordance must not change the row's height or the column's width. Cell becomes an input with the same font, same padding, a 1px accent ring drawn as `box-shadow: inset 0 0 0 1px` (not `border`, which reflows). Escape reverts, Enter commits and moves down, Tab commits and moves right. Optimistic write with an inline revert on failure — a toast alone loses the row.

**Focus.** The focus ring must be drawn *inside* the box that already exists. Linear's row button: `outline: 2px solid var(--color-text-secondary); outline-offset: -2px; border-radius: 8px` — negative offset, so tabbing down a list never reflows and never clips against the row above. Grafana holds **124 `1px solid transparent` borders** on a single screen for the same reason: the element is already the right size before focus arrives. The failure is `focus:ring-2 ring-offset-2`, which paints 4px outside the row and is clipped by the next row's stacking context, so the bottom half of your focus ring disappears. Use `outline` with a negative offset, or `box-shadow: inset 0 0 0 2px`. Never `border`.

**Header-row parity.** Attio's column-header row is the **same 36px as a data row** — it separates itself with a per-column type glyph (text, tag, `$`, person, select) at 12px before the label and a colour step, not with extra height or a fill. Atlassian goes the other way and still refuses a taller band: 12px/16px at weight 653 with a 2px underline, in a `th` the same height as the `td`. A header at 1.5× row height is 20px you spend once and never get back, and it buys nothing a weight change doesn't.

**Status colour.** Attio's chips are a low-alpha tint of the hue with dark text — One-time blue, Recurring green, Trial neutral, Exclusive pink, Referral purple, Inbound yellow — eight categories, all legible at 12px, none of them louder than the row's own text. The generated version fills the chip at full chroma with white text. Tint carries a category across 200 rows; full chroma across 200 rows is a rash, and it steals the emphasis you need for the three rows that are actually wrong. Reserve saturated fill for the one state that means *act now*, and make sure that state is rare.

**Avatars and inline media.** Attio puts a 16px avatar inline with 14px text and the row stays 36px. Atlassian puts a 24px avatar in a wrapper and a 28px row becomes 48px. The rule: nothing inside a data cell may exceed `row height − 2 × cell padding`. At a 36px row with 4px padding that is a 28px ceiling — which rules out 32px avatars, 40px logos and any two-line cell.

**Resizable panes.** Persist the size per-user per-view. Give the handle a 4px hit area with a wider invisible target (`--vscode-sash-size: 4px; --vscode-sash-hover-size: 4px` in PostHog's embedded editor). Snap to a collapsed state rather than letting a pane reach 0px, and remember the pre-collapse width.

**Breadcrumbs.** They earn their space only when the hierarchy is real and deep. Grafana's `Dashboards › Not found` is two segments and still useful because it tells you which section failed. Attio's `Basepoint ▾` workspace switcher does the same job in one control. PostHog collapses the breadcrumb band 60px → 44px on scroll. The failure mode is a breadcrumb that restates the nav you can already see — `Home › Dashboard › Dashboard`.

**Offline / stale.** Show the staleness, not a modal. A `Last updated 4m ago` next to a refresh control, and a subdued banner if a write failed and is queued. Grafana's Drilldown keeps the time range in the URL so a stale tab is self-describing.

**Permission/role UI.** Roles as a table (role × capability), not a list of toggles. Show effective permissions, not just granted ones — "Read (inherited from Workspace member)" prevents the entire class of "why can they still see this" tickets. Never let the UI offer an action the role can't perform; disable with a tooltip naming the missing permission.

## Mobile

Mostly: don't. A 40-column grid does not become a mobile experience by stacking into cards; it becomes 40 unlabeled paragraphs. What the good ones actually ship:

- **A different product, scoped to triage.** Linear's and Attio's mobile apps are read, comment, assign, change status. No grid, no column config, no bulk edit.
- **Detail-first navigation.** Mobile enters at the record, not the list. The list becomes a search result, not a workspace.
- **Notification and approval flows.** This is the genuinely mobile-native slice of enterprise software — Workday's and Rippling's mobile value is approving PTO, not running a headcount report.
- **Honest refusal.** A tablet-and-up gate that names the width and the reason beats a broken responsive grid. If you must render a grid below 900px, freeze the first column, allow horizontal scroll, and show a persistent column indicator.

### What Grafana actually does at 390px

Captured 2026-09 at 390×844 (`play.grafana.org` Logs Drilldown). Four behaviours worth copying and one worth not:

1. **Type does not grow.** The scale ships unchanged: 14px chrome, 12px data. Nothing bumps to 16px. This is the opposite of the consumer reflex, and it is correct — widening the type on the narrowest screen you have halves an already-narrow column. What changes on mobile is *what is on screen*, not how big it is.
2. **The breadcrumb truncates per segment and never wraps.** `Drilldown › Grafana Logs Drilldown` becomes `Drill… › Grafana…` — each segment clipped independently with an ellipsis, both segments kept, one line at any width. Wrapping chrome to a second line costs a row of data; clipping a label costs nothing you can't recover from a tooltip.
3. **The toolbar degrades label → icon, not toolbar → hamburger.** The time-range control drops `Last 15 minutes UTC` and keeps its clock glyph plus chevron; the zoom, refresh and info controls stay visible as a segmented icon cluster on their own line. The control is still one tap away. A hamburger would be two.
4. **The 319px rail collapses to a single hamburger** to the left of the breadcrumb — it does not become an icon rail at 390px. Icon rails are a 900–1280px behaviour; below that the rail goes away entirely.
5. **What Grafana gets wrong, and everyone gets wrong:** nothing *above* the data collapses. Two dismissible banners that occupied ~450px on desktop reflow to ~900px on mobile, so the log table starts below a full screen and a half of scroll. On a 390px screen the announcement band is the single most expensive thing on the page. If one band collapses on mobile, make it that one.

### Touch is where the density rules invert

Every multiplier in this file points down. Touch points up, and the two cannot coexist in one layout — which is the real argument for a separate mobile surface rather than a responsive one. A 26px Attio sidebar row is a 26px touch target. Anything that survives to a phone goes to 44px minimum, at which point you are shipping a 40% denser desktop and a 60% sparser phone from one component, and one of them will be wrong. Pick.

### The 900–1280px band

Drop in this order, and declare the order rather than letting the layout discover it: (1) the secondary rail — Linear moves its right sidebar 320px → 280px at exactly `@media (max-width: 1280px)` and removes it below that; (2) the primary rail becomes icon-only at ~64px; (3) the grid sheds optional columns in a priority you declare in the column config. Never by wrapping. A wrapped table row is the one failure a user cannot work around, because the eye can no longer track a column.

## How this archetype fails

### The generated version, measured

Not a caricature — this is the Retool AI-authored gallery app `security-operations-console`, captured 2026-09 at 1440×900 and measured off the 1:1 pixels. Every number below is from that one screen. It is the archetype's failure mode rendered by an actual generator, which is why it is the calibration target.

- **562px of chrome above data row one**, in eight bands: a caps teal eyebrow (`SECURITY OPERATIONS`, ~12px, positive tracking), a ~40px page title, a one-sentence subtitle, a right-aligned pair of buttons on the title line, four KPI cards ~210px tall, a card header with its own title *and* its own subtitle (`Sorted by CVSS score (highest risk first)`), a control row with a filter field and two dropdowns, and a ~55px column-header band. **Four data rows are visible.** Attio, on the same viewport, shows 21.
- **68–69px rows** against a 24–40px reference set.
- **The four-KPI-card template, exactly:** label ~13px secondary, an icon in a ~36px tinted rounded square pinned top-right, the number at ~40px weight 600, a delta line with an arrow glyph *and* an arrow character (`↗ ↑12 last 7 days`), and a coloured footnote (`3 critical`, `Target: 14 days`, `SOC 2 + ISO 27001`). Four across, equal width. If you generated four equal-width cards, you generated this.
- **Mixed header casing inside one table.** `CVE ID`, `CVSS SCORE`, `DUE DATE` in caps with tracking, sitting next to `Package`, `Severity`, `Affected Service`, `Owner`, `Status` in sentence case. Nobody chose that — it falls out of a generator running some column names through a caps helper and passing others through. **This is the single most reliable tell in the whole archetype**, because no human reviews a table and leaves it.
- **Saturated lozenges with light text**, and one of them truncated: `CRITICAL`, `OVERDUE`, `IN PROGRESS`, `PATCH SCHED…` — the chip was sized to text that didn't fit, so the status is unreadable on the row where it matters.
- **One accent doing five jobs.** A single teal carries the brand mark, the active tab underline, the primary button fill, the link colour in the ID column, *and* a status chip. Once your accent is also a status colour, the user can no longer tell "clickable" from "fine".
- **No mobile story.** At 390px the app renders at desktop width inside a scaled frame. Not degraded — untouched.

**Self-diagnosis.** If three of those seven describe what you built, you built the generated version. Run this against your own page before you look at it again:

```js
// visible rows, row pitch, distinct border values, chrome above row one
const rows = [...document.querySelectorAll('tr,[role=row]')].filter(r => r.getBoundingClientRect().height);
const h = rows.map(r => +r.getBoundingClientRect().height.toFixed(1));
const borders = new Set();
for (const el of document.querySelectorAll('*')) { const c = getComputedStyle(el);
  for (const s of ['Top','Right','Bottom','Left']) if (parseFloat(c[`border${s}Width`]) > 0 && c[`border${s}Style`] !== 'none') borders.add(`${c[`border${s}Width`]} ${c[`border${s}Color`]}`); }
console.log({ rowHeights: [...new Set(h)], chromeAboveRow1: rows[1]?.getBoundingClientRect().top, distinctBorders: borders.size });
```
Pass marks: row heights ≤ 40, `chromeAboveRow1` ≤ 120, `distinctBorders` ≤ 6. Grafana renders a full dense screen with four border values sharing one hue. If you are over 15, you have a border problem, not a spacing problem.

### The fifteen symptoms

The bad imitation is recognisable in five seconds, and every symptom is measurable:

1. **Rows are 30–90% too tall.** 44–68px where the reference set is 24–40px. Usually caused by `py-4` on the cell plus `text-base` plus a `gap-4` inside the row. The Retool AI gallery app's 68px rows against Attio's 36px is the exact spread.
2. **One font size for the whole product.** 16px everywhere, so the nav, the column header, the cell value and the timestamp all carry the same weight and the eye has nothing to grip.
3. **Four stat cards above the table.** Icon in a tinted rounded square, ~40px number, green `↑12%` delta, coloured footnote. Four, always — because four is what fits. Real products put aggregates in the column footer (Attio) or inside the chart that produced them (Grafana), not in a card row that forces the user to work out which column each number came from.
4. **Borders on everything.** Card border + table border + row border + cell border + input border, all `1px solid #E5E7EB`. Count your distinct border values: the reference set runs 1–4, all sharing one hue, all expressed as an alpha. Atlassian's `DynamicTable` ships **zero** row borders and separates rows with 4px of cell padding alone.
5. **Hover states that move things.** `hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300` on a table row. Also `transition-all`, which animates properties you did not intend.
6. **No selection model.** No checkboxes, no bulk bar, no tri-state header, no "select all N". A B2B table without bulk actions is a report, and the user will export it to a spreadsheet within a week.
7. **No saved views, or saved views conflated with filters.** If the state isn't in the URL and isn't nameable, the tool doesn't get shared, and if it doesn't get shared it doesn't get adopted.
8. **Radii too large.** 12px on a 32px control, 16px on cards. Dense B2B lives at 4–8px; Geist uses only 4 and 6.
9. **One empty state for every emptiness.** The same "No data found 📭" for first-run, filtered-to-zero, permission-denied and load-failure.
10. **Chrome that never collapses.** Five stacked bands, none of which shrink on scroll, so the data area is 55% of the viewport. Budget it: ≤120px above row one at 1440px.
11. **Numbers in a proportional font, left-aligned.** No `tabular-nums`, no right alignment, so magnitudes can't be compared by eye.
12. **A dark mode that is `invert()` in spirit.** Real dark systems re-pick the whole ramp: Linear's dark borders are `#23252A / #34343A / #3E3E44` while its light borders are `#E9E8EA / #E4E2E4 / #DCDBDD` — not mirrored values. Linear also ships a *third* set, translucent (`#ffffff14 / #ffffff1f / #ffffff26` dark, `#0000000d` light), for borders that must sit on an unknown surface. Three border ramps, not one inverted.
13. **A single accent used for both "interactive" and "status".** The moment your primary blue is also your "in progress" chip, the user stops being able to distinguish a link from a fact. Interactive colour and semantic colour must not share a hue.
14. **Focus rings drawn outside the box.** `focus:ring-2 ring-offset-2` on a table row: 4px outside the row, clipped by the neighbouring row's stacking context, so half the ring is missing. Linear uses `outline-offset: -2px`; Grafana pre-reserves 124 transparent 1px borders so nothing reflows when focus lands.
15. **The chrome does not survive its own content.** You set a 32px row and shipped a 40px avatar. Measure the rendered row, not the token — this is how Atlassian's dense 28px primitive ships as a 48px row.

### Where conventional wisdom is wrong here

- **"Always use an 8px grid."** Wrong for this archetype. The working grid is 4px (Twenty ships `--t-spacing-N = N × 4px` plus 2px and 6px half-steps), and the load-bearing numbers are deliberately off any grid: Grafana's 23.8px rows, Attio's 25.9px nav items, PostHog's 30px buttons. Workday's tokens *say* "8pt sizing grid" in a comment, and Workday is the counter-example.
- **"Body text should never go below 16px."** Every product in the reference set violates this in the data plane: 12px (Grafana), 13px (Salesforce, Linear), 14px (Attio, PostHog, Atlassian). The accessibility obligation is met by contrast ratio, honouring browser zoom, and — best — shipping a user-controlled density setting. A 16px floor in a 40-column grid is not accessible; it is a scroll tax.
- **"Use Inter at 500 for medium."** Linear runs Inter Variable at **510 / 590 / 680**. If your font is variable, the named weights are a starting point, not the answer; interpolate until 400 and "medium" are actually distinguishable at your body size.
- **"Zebra striping helps horizontal scanning."** Attio, Linear, Grafana and Hex all use a flat ground with one hairline. Zebra fights the hover overlay, fights the selection fill, and creates a second visual rhythm that competes with grouping. Use column rules instead if the table is genuinely wide — Attio does.
- **"Animate hover."** On a control you land on: colour only, at 160–200ms. Linear's button transition list is literally `background .16s var(--ease-out-quad), color .16s var(--ease-out-quad)`; PostHog's `.LemonRow` runs `.2s ease` on four properties. On a **row you sweep past**, animate nothing: Linear's issue-row overlay declares no transition at all, because a 160ms fade running on 30 rows a second reads as smear, not polish.
- **"Dark mode is table stakes."** Attio, Airtable, Jira, Metabase and PostHog default light. Grafana and Linear default dark. It tracks the room, not fashion — observability and code tools live on dark screens in dark rooms; CRM and HR live in offices. Ship one excellent theme before two mediocre ones.
- **"Density is a hostile choice."** The hostile choice is making a user scroll for data they already asked for: a 68px row costs them 17 rows per screen against Attio's 36px, which over a 200-row review is nine extra scroll gestures. Hostility comes from *unrationed* density — no grouping, no header anchor, no whitespace anywhere — not from a 32px row. The test is whether a user can find the three wrong rows, not how many rows fit.

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

A single sanity check that catches most of it: **at 1440×900 with a full dataset, count the visible data rows.** At a 120px chrome budget, ~780px remain: 21 rows at Attio's 36px, 19 at Linear's 40px, 32 at Grafana's 23.84px. Measured on the real Retool AI app, chrome is 562px and 4 rows are visible. If you are under 18 visible rows, the multipliers above are not suggestions.

## Copy and tone

The voice is a competent colleague reporting facts. Never chirpy, never apologetic, never a brand voice. A user in this archetype reads the same empty-state string a few hundred times a week; personality that survives one reading does not survive four hundred.

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

Re-verified 2026-09 in a headless Chromium at 1512×945, `deviceScaleFactor: 1`, and against the shipping CSS files: Grafana, Atlassian `DynamicTable`, Vercel Geist, Attio (app + marketing), Linear (`index.CD2COVl5.css` + `IssueListView.BH55qTC9.css`), PostHog (`index-5ZKS6Y46.css`), SLDS 2.25.2, Workday `canvas-tokens-web`. Corrections from that pass are marked inline. Everything not re-verified in 2026-09 — Hex, Sentry, Twenty, Amplitude, Retool's computed styles — is pixel-measured or single-pass and labelled as such.

- `https://play.grafana.org/a/grafana-lokiexplore-app/explore` — live, logged-out production Grafana. Re-probed 2026-09 at 1512×945: `tr` 23.84px, `th/td padding: 2px 8px` at 12px/18.86px w500, 5,332 text nodes of which 5,080 are 12px and 70 are 14px/22px, letter-spacing +0.14994px throughout, borders `rgba(204,204,220,·)` at 0.12 ×300 / 0.3 ×84 / 0.08 ×56 / 0.2 ×20 plus `1px solid transparent` ×124 and focus `rgb(110,159,255)` ×80, radii 6px ×424 / 10px ×42 / 9px ×40 / 9999px ×32. Also captured at 390×844 for the mobile section.
- `https://play.grafana.org/d/000000012/grafana-play-home` — captured the dashboard-not-found state: 319px rail (`rgb(24,27,31)`) + 1px `rgb(46,48,54)` divider, 32px nav items at 6px radius, mascot illustration with `Back to Home` + `Community Help`.
- `https://attio.com/platform/data` and `https://attio.com/` — 1:1 screenshots of the real records grid. **Re-captured 2026-09: the page was rebuilt (the hero is now "One context. Every team." over a data-model diagram) and the grid moved below the fold, but the grid itself is unchanged** — ten consecutive row baselines at a 36.0px pitch, header row also 36px, per-column type glyphs in the header, low-alpha chips with dark text across eight categories, right-aligned currency, checkbox gutter present at rest, `Sort`/`Filter` on their own lower bar, and the footer aggregates still reading `2,813 count` / `$83,560,165 sum` / `+ Add calculation`. Original pixel measurement: separators at y = 442, 478, 514, 550, 586, 622, 658, 693, 729, 765, 801 → **36px pitch**, separator `#EFF0F0`, white ground, no zebra, per-column footer aggregates. Sidebar DOM probed live: item height 25.9px, 32px pitch, `padding: 0 8px`, `border-radius: 9px`, active fill `rgb(238,239,241)`, label 14px/20px ls −0.28px w500.
- `https://app.attio.com/welcome` — `html { font-size: 10px }`; `--web-table-scroll-thumb-bg: rgba(16,17,18,0.2)`. App CSS is StyleX-hashed, so token names are not readable.
- `https://static.linear.app/web/_next/static/css/index.CD2COVl5.css` and `.../IssueListView.BH55qTC9.css` — re-fetched 2026-09, every value confirmed byte-for-byte, plus a third *translucent* border ramp not in the original pass (`#ffffff14 / #ffffff1f / #ffffff26` dark, `#0000000d` light) and `.rowButton:focus-visible { outline: 2px solid var(--color-text-secondary); outline-offset: -2px }`. Correction: the issue row's hover overlay has **no `transition`** — only buttons, tabs and pills carry `.16s`. Linear's shipped tokens: full font-size and weight scale, four-step text ramp, three-step border ramp, five-step surface ramp per theme, `--border-hairline: 1px` → `0.5px` at 2× DPR, radius scale. Issue-list geometry: 40px rows, 36px group headers, 44px header/view bars, 28px filter tabs, 24px badges, 72px id column, 40px date column, `#ffffff05/08/0d/14` overlay ladder, `.16s ease-out-quad`.
- `https://us.posthog.com/login` + `https://app-static-prod.posthog.com/static/index-5ZKS6Y46.css` — re-fetched 2026-09, all values confirmed: `--button-height-xxs…lg` 20/24/28/30/40, `--button-padding-x` 4/4/4/6/8, `--button-padding-y` 3/3/3/4/7, `--button-icon-size` 12/12/12/16/20, `--scene-padding: .5rem`, `--scene-layout-header-height: 40px`, `--scene-title-section-height: 50px`, `--scene-layout-panel-width: 300px`, `--breadcrumbs-height-full/compact: 3.75rem/2.75rem`, the 19-step neutral ramp, `--animate-skeleton: skeleton 2s -1s infinite linear`. Full rule: `.LemonRow { font-size: .875rem; line-height: 1.25rem; min-height: 2.5rem; padding: .25rem 1rem; transition: background-color .2s ease, color .2s ease, border .2s ease, opacity .2s ease }`, with a 2rem (32px) compact variant. A scoped rule aliases `--button-height-base` to `var(--button-height-xs)` (24px) — re-fetched from `index-7EGTHLBT.css` 2026-09-10, correcting an earlier reading of `--button-height-sm` — so the default control is drifting *down*.
- `https://demo.twenty.com` — token CSS loads on the auth screen: complete `--t-spacing-*`, `--t-border-radius-*`, `--t-font-size-*`, `--t-color-gray1..12`, `--t-border-color-{light,medium,strong}`, `--t-text-line-height-md: 1.1`.
- `https://atlassian.design/components/dynamic-table/examples` — live ADS DynamicTable, re-probed 2026-09: `tr` heights of 48 / 45 / 28 / 26px on one page, `td padding 4px 8px` on 14px/20px w400 (→ a 28px baseline row), `td border-bottom: 0px`, `th` 12px/16px at weight 653 with a **2px** `rgba(11,18,14,0.14)` underline (×74 vs ×38 for the 1px value), radii 6px ×341 / 4px ×83 / 2px ×79.
- `https://cdn.jsdelivr.net/npm/@salesforce-ux/design-system@2.25.2/assets/styles/salesforce-lightning-design-system.css` — re-fetched 2026-09, confirmed: `body { font-size: .8125rem }`, `.slds-table th, .slds-table td { padding: .25rem .5rem }`, `.slds-table thead th { background: #f3f3f3; color: #444444; font-weight: 700; line-height: normal }` against `.slds-table th { font-weight: 400 }` for body cells. Note two opt-ins that undo the density: `.slds-table_cell-buffer` sets first/last-child padding to `1.5rem`, and `.slds-table_striped` ships zebra as a modifier. The primitive is dense; the modifiers are how it stops being. the 13-step `--slds-g-color-neutral-base-*` ramp and 4-step border ramp, 3px radii.
- `https://cdn.jsdelivr.net/npm/@workday/canvas-tokens-web@latest/css/base/_variables.css` and `.../system/_variables.css` — re-fetched 2026-09, confirmed: `--cnvs-base-font-size-25…1050` = 10/12/14/16/18/20/24/28/32/40/48/56/72/88/104px and `--cnvs-base-baseline: 0.5rem; /* Baseline unit used for the 8pt sizing grid */`. Font-size and line-height scales, the "8pt sizing grid" baseline comment, oklch palettes at 13 steps per hue, duration scale in 50ms increments, three easing families.
- `https://vercel.com/geist/colors` — re-probed 2026-09: 14px/20px on 123 of 176 text nodes (98 at w400, 25 at w500), 13px/18px ×14, 16px/24px ×11, 12px/16px ×5; radii 4px ×98, 6px ×88, 12px ×2; borders `#EBEBEB` ×51 against `rgba(0,0,0,0.08)` ×7 and `#EAEAEA` ×1. Chunk CSS gave the parallel `--ds-gray-100…1000` and `--ds-gray-alpha-100…1000` ramps.
- `https://retool.com/app-gallery/security-operations-console` — live embedded Retool app on a dark ground, re-captured 2026-09 at 1440×900 and 390×844. Pixel-measured: CVE rows at a 68px pitch, four KPI cards ~210px tall, **562px of chrome above data row one → 4 visible rows**, mixed caps/sentence column headers in one table, saturated status lozenges with one truncated (`PATCH SCHED…`), a single teal accent serving brand + tab + button + link + status, and a desktop-width frame at 390px. The negative control, and the source of every number in "The generated version, measured".
- `https://hex.tech/` — 1:1 capture of a notebook with a SQL result grid; pixel-measured separators at y = 261, 285, 309, 333 → **24px rows**, header band the same height, separator `#ECEDF2`, index gutter column. *Not re-verified in the 2026-09 pass; marketing-page composite, so the 24px is real pixels but may not be the shipping app.*
- `https://www.atlassian.com/software/jira/features` — real Jira screenshots: nested goal tables with disclosure triangles, `AT RISK` / `ON TRACK` / `IN PROGRESS` all-caps saturated lozenges, Name/Status/Owner column pattern.
- `https://amplitude.com/amplitude-analytics` — real product capture: three-deep collapsible left rail with per-section chevrons, `Create / Recent / Favorites / Spaces` top bar, KPI tiles with delta chips, template gallery strip.
- `https://sandbox.sentry.io/issues/` — issue-stream layout captured behind the email gate (the background is a static composite, so no computed values were taken from it); marketing chrome measured at 14px/18px, `#6C5FC7` accent, `#343A40` primary text, `#6C757D` secondary, 4px radius dominant.
- `https://posthog.com/product-analytics`, `https://www.datadoghq.com/product/platform/`, `https://www.sigmacomputing.com/product`, `https://www.metabase.com/`, `https://www.airtable.com/`, `https://www.rippling.com/hr-management`, `https://www.deel.com/global-payroll/`, `https://play.clickhouse.com/play` — captured and viewed for nav depth, toolbar stacking, and how each treats in-product imagery. Deel and Rippling ship illustrative micro-UI rather than real screenshots; Gusto blocked headless capture (Cloudflare).

## Direction pass (2026-09)

A second reviewer re-probed the sources, re-shot six products, and edited for floor, not ceiling.

**Numbers re-verified against live sites and shipping CSS** (11 sources, ~40 claims): Linear's full token set byte-for-byte (font sizes, weights 300/400/510/590/680, `--border-hairline` 1px → .5px at 2× DPR, radius scale, issue-row geometry 40px / `margin-inline: 8px` / `padding-inline: 36px 28px` / 72px id / 40px date / `#ffffff05·08·0d·14`); PostHog's complete button, scene, breadcrumb and skeleton tokens; SLDS's `body{font-size:.8125rem}` and `.slds-table th,td{padding:.25rem .5rem}` with `thead th{font-weight:700}`; Workday's 15-step font scale and 8pt baseline comment; Grafana's 23.84px row, `2px 8px` padding, 12px/18.86px; Attio's `html{font-size:10px}` and the 36.0px grid pitch, re-measured on a page that has since been rebuilt around the grid. All held.

**Corrected (five numbers were wrong or misleading):**
1. *Atlassian rows are not 48px.* The `DynamicTable` primitive is `4px 8px` on 14px/20px — a **28px** row. One page renders 48 / 45 / 28 / 26px; the 48 is a 24px avatar in a wrapper. Reframed as the component-scale version of the Salesforce lesson.
2. *Atlassian rows have no borders.* `td border-bottom: 0px`. The only rule in the table is the 2px `th` underline. The file previously claimed 1px body rules.
3. *Grafana does not use one border value.* One border **hue** at four alphas — 0.12 ×300, 0.3 ×84, 0.08 ×56, 0.2 ×20. The "single hairline value" rule was too strong; the discipline is the hue.
4. *Linear's row hover has no transition.* The `.16s` applies to buttons, tabs and pills. The row overlay flips opacity instantly — and that is the sharper finding.
5. *Attio's grid letter-spacing is −0.14px (−0.01em)*, not −0.28px, on `app.attio.com`. Text-node counts on Grafana (5,332 not 5,798) and Geist (123/176 not 121/163) drift between deploys and are now stated as ratios.

**Cut:** the Attio "spreadsheet from 2009" line, "density achieved by removing chrome" as a slogan, "the cleanest neutral-ramp architecture in public", Sentry's "single scannable row band" (now carries an explicit *unverified* label, since the source is a static composite behind an email gate), "Animate hover for polish", "the vertical rhythm stays legible", and three "when it does NOT apply" clauses that were tautologies — *"when only one control exists"*, *"single-view tools"*, *"products with two-level IA"* — each replaced with two or three limits that can actually bite (forced-colors mode killing alpha overlays; the ~1100px width where stacked bars stop paying; views that cannot be URL-encoded without leaking permissions; rails whose content *is* a hierarchy).

**Added, from looking rather than reading:**
- **"The generated version, measured"** — the Retool AI app dissected at 1440×900: **562px of chrome above row one, four visible rows**, the exact four-KPI-card template, mixed caps/sentence column headers in one table (the most reliable single tell, because no human leaves it), a truncated status lozenge, and one accent serving brand + tab + button + link + status. Plus a paste-able self-diagnosis snippet with pass marks (rows ≤ 40px, chrome ≤ 120px, ≤ 6 distinct border values). Symptom list grew 12 → 15.
- **A real mobile section.** Grafana at 390px: type does not grow, breadcrumbs truncate per segment and never wrap, toolbars degrade label → icon rather than toolbar → hamburger, the 319px rail collapses entirely rather than becoming an icon rail — and the failure nobody fixes, an announcement band that reflows from 450px to 900px and pushes the data below a screen and a half. Plus the touch inversion: every multiplier in this file points down and touch points up, which is the argument for a separate surface rather than a responsive one.
- **Four missing states:** focus rings drawn inside the box (`outline-offset: -2px`, Grafana's 124 pre-reserved transparent borders) versus `ring-offset-2` getting clipped by the next row; header-row height parity (Attio's header is 36px, the same as a data row); low-alpha status tints versus full-chroma lozenges across 200 rows; and the inline-media ceiling — nothing in a cell may exceed `row height − 2 × cell padding`.
- SLDS's two density-undoing modifiers (`_cell-buffer` at 1.5rem, `_striped`), Linear's third *translucent* border ramp, and PostHog's `--button-height-base` quietly aliasing down to 28px.
