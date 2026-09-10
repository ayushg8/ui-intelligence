# Space, layout, grid and rhythm

**Evaluated:** 2026-09

**Measured against live production UI with Playwright** — computed styles, bounding boxes, and the CSS
custom properties each product ships. Baseline pass 2026-09-09/10; re-probed 2026-09-10 (see
*Direction pass* at the end for what moved). Values marked "approx." are inferred, not read.

Spacing is where generated UI gives itself away — not color, not type. An interface where every gap is
16px, every card has 24px of padding, and every group is wrapped in a rounded box reads as machine
output on sight. The fix is not "more whitespace." It is *unevenly distributed* whitespace that encodes
what belongs to what.

---

## If you only apply five things

1. **Ship a 4px-based ramp of nine values and never write an off-ramp number.**
   `4 8 12 16 24 32 48 64 96`. Every serious system measured is 4px-granular in practice, including the
   ones that call themselves 8px systems. On Attio's marketing page the four most common flex gaps are
   **6px (217×), 8px (188×), 4px (183×), 10px (183×)** — sub-8 values outrank everything else.
2. **Space below a heading = 1× its font-size. Space above = 2×.** Supabase docs implement this
   literally: H2 at 22px gets **44 above / 22 below**; H3 at 18px gets **36 above / 18 below**. Stripe's
   API reference runs 4.1:1 (33 above / 8 below) on parameter rows. A heading equidistant between two
   blocks belongs to neither.
3. **Default to no container.** Escalate one rung only when the rung above fails: nothing → space → a
   1px rule → a background shift → a border → a card. Carbon's spacing page ships **0 card-like
   surfaces and 0px radius**, separating regions with background shifts alone. GitHub's `vercel/next.js`
   page carries **no nested content cards** and gives its entire About sidebar no container at all.
4. **Pick the content width from the reading task, not from a grid.** Measured: 45ch (Stripe marketing,
   18px), 55ch (Ramp), 72–86ch (react.dev, Tailwind, Supabase, GitHub README, Atlassian). Stripe alone
   runs 47ch at 16px on a guide and 58ch at 14px on the API reference — two widths *and* two body sizes
   in one product.
5. **Sidebar rows are 28–36px, not 44px — above ~12 items, on a pointer.** Measured: Linear
   `--sidebar-width: 244px`, Carbon 32px rows, Primer 36px, shadcn 32px with a **4px** gap, Grafana 32px,
   Stripe 28px. 44px is a *touch* minimum. Below ~8 nav items the density argument earns nothing; size
   the row off its type instead.

---

## Measured reference table

All at a 1440×1000 viewport unless noted. "Ramp" is the token ramp the product ships, not a
description of it.

### Spacing scales, as shipped

| Product | Declared base | Ramp actually shipped (px) | What to take from it |
|---|---|---|---|
| **Vercel / Geist** | `--geist-space: 4px` | 4, 8, 12, 16, 24, 32, 40, 64, 96, 128, 192, 256 | Ships a *semantic* layer over the ramp: `--geist-space-gap: 24px`, `-gap-half: 12px`, `-gap-quarter: 8px`. Name the three you use most |
| **GitHub / Primer** | `--base-size-*` | 2, 4, 6, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 60, 64, 80, 88, 96, 112, 128 | 4px steps to 48, plus a named density layer: `--brand-stack-gap-condensed: 16`, `-normal: 24`, `-spacious: 48` |
| **Linear (app tokens, off the login page)** | — | editor block 16px base, `large = ×1.375` (22), `small = ×0.375` (6); settings rows `16px/12px` padding, `12px` gap, `10px` radius; `--sidebar-width: 244px`; `--column-width: 24px` | The multiplier trio (0.375× / 1× / 1.375×) *is* the vertical rhythm. Copy the pattern, not the numbers |
| **Tailwind v4** | `--spacing: .25rem` | every multiple of 4 is generatable; the docs page uses ~a dozen | An infinite scale still needs a shortlist. Pick yours and lint for it |
| **Atlassian DS** | `--ds-space-100: 0.5rem` | 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80 | Calls itself 8px (`100` = 8px), ships 2, 4 and 6 anyway |
| **Notion / Tatami** | `--tatami-dimension-spacing-*` | 4, 8, 12, 16, 20, 24, 28, **30**, 32, 40, 48, 56, 64, 72, 80, 96, **100**, 128, 160 | Two off-grid survivors (30, 100). Two deliberate overrides is a system; twelve is not |
| **Figma** | `--fig-space-*` | 4, 6, 8, 12, 16, 24, 32, 40, 56 | A 6 between 4 and 8; no 20, no 48 |
| **Raycast** | `--spacing-1: 8px` | 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 112, 168, 224 | 8px-named with a half-step; the top of the ramp is marketing sections only |
| **shadcn/ui** | `--radius: .625rem` (10px) | padding 8 (490×), 12, 2, 4, 6, 24; gaps 8 (210×), 4, 6, 24 | Every radius derives from one token: measured 6, 8, 10 and **14** — the Card is `radius + 4` |
| **IBM Carbon** | 8px mini-unit | spacing page: **16px (203×)**, 6px (30×), 32px and 7px (10× each) | The closest thing here to a true 8px system — and even it leaks a 6 |
| **Material 3 docs** | 4dp grid | observed gaps 20 (23×), 8; padding 24, 16, 56, 104 | A 20px gutter, off the 8 grid, on Google's own spec site |
| **Mercury (marketing)** | `--gap-md: 32px` | 4, 12, 20, 24, 32, 40, 56, 72, 80, 112, 128, 144 | `--gap-md` and `--gap-lg` are **both** 32px — a token collision nobody caught. Lint your ramp for duplicate values |

**The signal:** no shipped product in this sample has 8px as its *smallest* spacing token. Carbon comes
closest, and Carbon is an enterprise system built so hundreds of teams implement it identically —
uniformity is the deliverable. That is not the situation of a product built by one team.

### Container widths, measure and gutters

| Product / page | Page container | Content column | Body type | Measure | Gutter @1440 | Gutter @390 |
|---|---|---|---|---|---|---|
| **react.dev /learn** | 1280 (rail 320 + 1120) | **896px** | 17/30 Optimistic Text | **76ch** | rail flush | **20px** |
| **Vercel docs** | `--ds-page-width: 1400px` | 809px | 16/27.2 Geist | **76ch** | rail flush | 24px |
| **Carbon docs** | 1584px | **704px** | 16/24 IBM Plex | **73ch** | rail 256 + **128px indent** | n/a |
| **Primer docs** | — | **800px**, padding `40px 36px` | 16/24 Mona Sans | approx 72ch | rail 300 | n/a |
| **Material 3 docs** | 1112 / 1360 | **760px** | 16/24 Google Sans | **71ch** | 88px | n/a |
| **Tailwind docs** | 1024 grid | **672px** | 14/28 Inter | **76ch** | 24px | n/a |
| **Stripe docs (guide)** | full-bleed | 474–486 (split with code pane) | 16/26 system | **47ch** | rail flush | 28px |
| **Stripe API reference** | 1160px | **503px** prose | **14/22** system | **58ch** | 280px rail | 28px |
| **GitHub repo page** | `container-xl: 1280px` | 952 / README **838** | 16/24 Mona Sans | **86ch** | 80px | 17px |
| **Supabase docs** | `max-w-6xl: 1152px` | **706px** | **15**/28 Inter | **73ch** | 40px | n/a |
| **Atlassian DS docs** | 1028px | 756px | 14/20 | **86ch** | 350px rail | n/a |
| **Shopify Polaris** | 1228px | 810px | 16/24 Inter | approx 80ch | 284px rail | n/a |
| **shadcn/ui site** | `container: 1400px` | 896px | 18/28 Geist | 74ch | 24px | n/a |
| **Stripe.com (marketing)** | **1266px** | 504px body | 18/25.2 Söhne | **45ch** | 87px | **16px** |
| **Ramp** | 1440 outer / **1312 inner** | 533px body | 16/22 Lausanne | **55ch** | **64px** | **16px** |
| **Resend** | **1280px** | 512px hero body | 18/27 Inter | 45ch | 80px | **24px** |
| **Attio** | 1440 (full-bleed sections) | 880 / 560 / 352 blocks | 12–16 Inter | 37–45ch | varies | n/a |
| **Apple (MacBook Pro)** | 1260px | 480px | 17/25 SF Pro | **45ch** | 90px | 24px |
| **Linear (marketing)** | 1436px inner | 566px | 24/31.9 Inter | 38ch | 78px | 23px |
| **Raycast** | `--container-width: 1204px` | 818px | 18 Inter | 69ch | 24px | n/a |
| **Plausible (live dashboard)** | **1120px**, panels 1088 | full-bleed panels | 14 | n/a | 160px | n/a |
| **Grafana (live dashboard)** | full-bleed | full-bleed panels | 14/22 Inter | 55ch | 320px rail | n/a |
| **Grafana profile / settings** | full-bleed shell | **600px form**, 350px sub-column | 14 | n/a | 320px rail | n/a |
| **Stripe login** | — | **412px form** in a 540px panel | — | — | centred | — |
| **Supabase sign-in** | — | **384px / 512px** stack, padding `64px 20px 32px` | — | — | centred | — |
| **Figma (marketing)** | `--fig-grid-max-content-width: 95rem` (1520) | 650px | 18/25.2 | approx 56ch | 155px | n/a |

**Measure.** "65–75 characters" is book typography and it is wrong for reference docs. Every technical
docs site measured lands **71–86ch** because the reader is hunting a parameter name, not reading three
pages of prose. Marketing body runs the other way — **45–55ch** — read once, at a glance, beside an
image. 65–75ch is correct for essays, changelogs and tutorials.

**Marketing container.** The 1120–1280 band is real but its low end is dated. Measured 2026: Stripe
1266, Resend 1280, Vercel 1400, shadcn 1400, Ramp 1312 inner, Attio 1440, Carbon 1584. **Pick 1280.**
Nothing here ships 1120 for marketing; Plausible uses 1120 for a *dashboard*.

**Settings and forms.** The commonly repeated "640–720" is the *pane*, not the input column. Measured
input columns: Grafana profile **600**, Supabase auth **384/512**, Stripe login **412**. Use **560–640
for the pane, 320–480 for a single-column input stack** — a 700px text input reads as a mistake because
the eye has to travel to the far right to find the cursor.

**Mobile gutters.** At 390px every product measured lands between **16 and 28px**: Stripe 16, Ramp 16,
react.dev 20, GitHub 17, Resend 24, Apple 24, Linear 23, Stripe docs 28. Nobody ships 8. Nobody ships 40.

### Shell geometry

| Product | Left rail | Content | Right rail | Row height | Row v-gap | Row radius | Row padding |
|---|---|---|---|---|---|---|---|
| **Linear (app token)** | **244px** | fluid | — | — | — | 10px (settings) | 16/12 (settings) |
| **shadcn `sidebar-07`** | **256px** | 1184px | — | **28–32px** | **4px** | 8px | `0 8px` |
| **shadcn `dashboard-01`** | **288px** | 1144px | — | 32px | 4px | 8px | `8px` |
| **Carbon docs** | **256px** | 704px (+128 indent) | — | **32px** | **0** | **0** | `0 16px 0 32px` |
| **Primer docs** | **300px** | 800px | — | **36px** | 0 | 6px | `8px` |
| **react.dev** | **320px** (inner pane 342, overhung to hide the scrollbar) | 1120px (896 prose) | in-page | 31 / **46px** | 0 | 0 | `8px 8px 8px 20px` |
| **Discourse meta** | **272px** | 1110px | — | 37px | — | 0 / pill | `4px 8px` |
| **Grafana** | 320px | full-bleed | — | 32px | 0 | 6px | — |
| **Vercel docs** | 300px (nav 264) | 809px | 240px TOC | 36px | 0 | 6px | `0 8px 0 10px` |
| **Stripe API ref** | 280px | 1160px | inline code pane | 28px | 4px | — | — |
| **Notion help** | 280px (1px rule, no fill) | 804px | — | 36px | — | 0 | `8px` |
| **Atlassian DS** | 350px | 756px | — | — | — | 4/6px | — |
| **Tailwind docs** | 240px | 672px | TOC | 24px (text only) | 0 | 0 | — |

Rail width clusters at **244–300px, mode 256–280**. 320–350 appears only where the rail carries a
second level of nested navigation (react.dev, Grafana, Atlassian). Row *gap* is 0 or 4 — never 8 — and
row radius is 0, 6 or 8, never 12+: a 12px radius on a 32px row eats the corners.

### Card and panel treatment

| Product | Card-like surfaces on one page | Max nesting | Padding | Radius | Edge |
|---|---|---|---|---|---|
| **Carbon** docs | **0** | **0** | — | **0px** | none — background shift only |
| **shadcn** blocks index | 5 | **0** | — | 6 / 8 / 10 / **14** | 1px + shadow |
| **GitHub** repo page | 3–8 (depends where you draw the line) | **1**, and **0** among content cards | 0 (padding on inner rows) | 8px | 1px `#d1d9e0` |
| **Plausible** dashboard | **7** | 1 | **20px** | **6px** | no border, soft shadow |
| **shadcn** dashboard-01 | 7 | **1** | **`24px 0`** (see below) | **14px** | 1px + shadow |
| **Discourse** meta | 11 | **0** | 12px | 16px | no border, shadow |
| **Vercel docs** | 12 | 0 | 24px | 12px | fill, **no border** |
| **Grafana** dashboard | 10 | 0 | **8px** | 10px | 1px `rgba(204,204,220,.12)` |
| **Notion help** | 17 | 0 | 24 (tiles) / 16 (chips) | 16 / 12px | `#f6f5f4` fill, no border |
| **Ramp** marketing | 34 | 1 | 0–24px | **12px (42×)** | 1px `rgba(33,33,33,.1)` |
| **Resend** marketing | 50 | 1 | `96px 24px` (sections) | **24px** | 1px `rgba(214,235,253,.19)` |
| **Attio** marketing | 65 | 2 | 0–6px | 8, 12, 16, **23**, 4.8, 9, 7 | mixed |

Raw surface counts move with where you draw the line — a menu popover, a hover chip and a code block all
have a fill and a radius. **Nesting depth does not, and it is the number that matters.** Attio's and
Linear's depth-2 nesting is a *rendered screenshot of their own app* — a device frame containing a window
containing panels — not content nesting. In real content, **Carbon, Discourse, Grafana, Vercel docs,
Notion and shadcn's own index all sit at zero nested cards**, and GitHub's only depth-1 case is a nav
popover, not page content.

---

## The decisions

### Decision: what is my base unit?

**4px.** Define a ramp and never leave it:

```css
--space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px;
--space-5:24px; --space-6:32px; --space-7:48px; --space-8:64px; --space-9:96px;
```

Nine values. Notice what is missing: 20, 28, 40, 56, 80. You will want 20px. Resist it once; if you need
it twice, add it deliberately. Notion shipped a `30` and a `100` into an otherwise clean ramp — two
deliberate overrides. Twelve overrides is not a system.

Why 4 and not 8: **sub-8 values do the most work.** Measured padding/gap histograms: Attio's four most
common gaps are 6, 8, 4, 10 — in that order, with 6 ahead of 8. On Stripe's API reference, 4px is the
third-most-common spacing value after 8 and 16. Vercel docs uses 2px hundreds of times. Icon-to-label
gaps, chip padding, the inset between a focus ring and its element, the vertical padding on a 24px table
cell: none of those work at 8. If your smallest token is 8, you will write `padding: 4px` as an arbitrary
value within a day — and one arbitrary value makes the whole system advisory.

**Where the 8pt grid came from and where it still applies.** It entered mainstream practice through
mobile design systems, where a unit that divides evenly at 1×/1.5×/2×/3× device-pixel ratios avoids
half-pixel rendering on physical screens. That constraint is real for native mobile layout, for specs
handed to iOS/Android engineers, and for icon artboards. It is not real for a browser rendering CSS
pixels at arbitrary zoom, which is why every web system above quietly ships 2, 4 and 6 — Carbon
included (30 instances of 6px on its own spacing page).

Carbon is still the honest counterexample: 16px accounts for 203 of the padding values on that page and
almost nothing else competes. It is 8px-dominant because its job is to be implemented identically by
hundreds of IBM teams who will never talk to each other. If that is your situation, use 8. Otherwise:
**8px is your dominant rhythm, not your floor.**

### Decision: how much space between these two things?

Spacing encodes grouping. A uniform gap communicates "these are all peers," which is almost never true.

**The heading formula, measured.** Supabase docs: heading font-size *s* gets `s` below and `2s` above.

| Heading | Font size | Above | Below | Ratio |
|---|---|---|---|---|
| Supabase H2 | 22px | **44** | **22** | 2.0 |
| Supabase H3 | 18px | **36** | **18** | 2.0 |
| Vercel docs H3 | 14px | 28 | 12 | 2.3 |
| Stripe API param name | 14px | 33 | 8 | **4.1** |
| GitHub README H2 | 24px | 24 | 16 | 1.5 |
| react.dev H2 | 28px | 24 | 24 | **1.0** |

Default to **2:1, computed from the heading's own font-size**. react.dev gets away with 1:1 because its
H2 is 28px against 17px body — a 1.65× size jump plus a weight jump does the grouping on its own, and
the H2's 40px line-box adds ~6px of optical air above. The tighter the size contrast between heading and
body, the more the *space* has to carry: Stripe's parameter names are the same 14px as their
descriptions, so the ratio goes to 4:1.

**The three-tier rule.** Take the gap *inside* a group as your unit. Group-to-group is 2–3×.
Section-to-section is 2–3× again. Primer ships this as named tokens: `condensed: 16`, `normal: 24`,
`spacious: 48`. Concretely: list items 8px apart → groups 24px apart → sections 64px apart.

| Relationship | Multiplier | Measured |
|---|---|---|
| Label to its value | 0.25–0.5× | Stripe param name → description: 8px |
| Item to item in a group | 1× | Stripe rail rows 4px; shadcn sidebar rows 4px; Vercel rail rows 0 |
| Group to group | 2–3× | Vercel H3 28 vs 12; Primer normal 24 vs condensed 16 |
| Section to section | 4–6× | Primer spacious 48; GitHub 24/16 at 16px body |
| Marketing page section | 12–25× | Resend **96px** ×11 sections; Ramp 128; Apple 144–196; Raycast 224 |

**Proximity beats dividers, quantified.** Stripe's API reference lists 40+ parameters. Each name sits
33px below the previous description and 8px above its own. That 4.1:1 ratio does all the grouping. Cover
the hairline rules and the structure is still legible; equalize the gaps to 16/16 and no number of
hairlines saves it. **Before adding a divider, double one gap and halve another. Then check whether you
still want it.**

**Scope — where the 2–3× ratio is wrong.** Any surface whose job is comparison across many rows: a
spreadsheet, a trading blotter, a log viewer, a 20px-row table. There, everything is one tier and
grouping comes from rules, colour and alignment. A 3× gap in a 20px-row table costs a screen of rows,
which is the whole product.

### Decision: how wide is the content column?

Ask what the reader is doing.

| Task | Width | Evidence |
|---|---|---|
| Reading prose end to end | **60–75ch** | react.dev 76ch, Carbon 73ch, M3 71ch, Supabase 73ch |
| Scanning reference material | **75–86ch at 14–15px** | Stripe API 58ch @14px, Atlassian 86ch @14px, GitHub README 86ch |
| Marketing body beside an image | **40–55ch** | Stripe 45ch @18px, Ramp 55ch @16px, Apple 45ch @17px |
| Settings pane / form | **560–640 pane, 320–480 inputs** | Grafana 600, Supabase 384/512, Stripe login 412 |
| Dashboard, table, canvas, editor | **full-bleed** | Grafana `main { padding-left: 320px }`, no max-width at all |

Two consequences that contradict common advice:

- **There is no single content width for a product.** Stripe runs 486px prose on a guide and 1160px on
  the API reference, and changes body size from 16px to 14px between them. One `--content-max-width`
  applied everywhere is the mistake.
- **Reason in `ch`, ship in `px` — unless you honour user font scaling.** Measure in ch to pick the
  number, then write `max-width: 680px` so the column does not shift when the webfont loads.
  **Scope:** if your product must reflow at 200% zoom or respect an OS/browser font-size preference
  (WCAG 1.4.10, any accessibility-regulated product, anything with an in-app text-size control), ship
  `max-width: 42rem` instead. A hard px cap does not grow with the user's font, so their 17px body inside
  your 680px column silently collapses from 76ch to ~45ch and doubles the line count. Px is correct only
  when the font size beside it is also fixed.

**Scope — do not add a max-width to text that is already constrained.** A prose block inside a table
cell, a chat bubble in a 420px column, or a card that is itself 320px wide. A second constraint there
just produces a ragged short column inside a correctly-sized one. The rule is "no running text against
an unbounded parent," not "every `<p>` gets a `max-w`."

### Decision: what shell does this screen need?

**Sidebar + content.** The default past eight destinations. Rail 244–300px, fixed, its own scroll
container. Content gets its own max-width *inside* the remainder, not the whole remainder — react.dev
does exactly this: 320px rail, 1120px remainder, 896px prose column inside it. The failure is `flex: 1`
with no cap, which stretches 17px prose to 180 characters per line on a 27-inch monitor.

**Three-column (rail + content + TOC).** Right when content is long, linear, and jumped around in.
Vercel, Stripe, Supabase and Tailwind all ship it. The TOC is narrower than the rail (Vercel: 240 vs
300). Matching their widths creates a symmetric layout that reads as two equal navs.

**Master / detail.** The list pane wants **320–400px** — wider than a nav rail because rows hold two
lines of content, not one label. Apply the prose max-width *inside* the detail pane and left-align it, so
the reader's eye returns to a stable left edge when they switch items. Centring the detail text makes
every item selection feel like the page moved.

**Full-bleed.** Dashboards, tables, editors, canvases. Grafana's `main` is `padding-left: 320px` and
nothing else — no max-width, no centring. Plausible caps at 1120px and puts 20px between panels.
Constraining a dashboard to 1200px wastes exactly the real estate the user opened it for.

### Decision: grid or flex?

- **Flex** when one axis matters and sizes are content-driven — toolbars, rows, button groups, anything
  with `gap` and `flex-wrap`. This is ~80% of UI. Measured `display:flex` vs `display:grid` on live
  pages: Stripe 3.7:1, GitHub 4.3:1, **Attio 15:1**, shadcn dashboard 21:1, react.dev **62:1**. Grid is
  the specialist; do not "modernize" a working flex row into a grid.
- **Grid** when you need alignment *across independent rows*. The tell: row 2's second column must line
  up with row 1's second column, and the rows are separate DOM elements. Flex cannot do that; subgrid
  can, if the rows are grid items of the same parent.
- **Grid for the page shell.** `grid-template-columns: 300px minmax(0, 1fr) 240px` expresses the
  three-column doc layout in one line. **`minmax(0, 1fr)` is not optional** — plain `1fr` has a
  min-content floor, so one wide code block blows the layout out horizontally.
- **`auto-fit`/`minmax` for card grids**, not media queries:
  `repeat(auto-fit, minmax(260px, 1fr))` replaces three breakpoints. Failure mode: with `auto-fit` a
  single leftover card stretches full width — use `auto-fill` if you would rather it stay card-sized.
  Measured real card grids: shadcn `262px ×4` with 24px gap; Plausible `534px ×2` with 20px gap;
  shadcn's chart row is **`686px 352px`** — an asymmetric 2:1 split, not four equal columns.

### Decision: should I use container queries?

Measured rule counts in shipped CSS: Stripe **10** `@container` vs 404 `@media`; Vercel docs 20 vs 160;
GitHub 0 vs 193; Figma 0 vs 205; Linear 0 vs 23. Container queries have not replaced media queries
anywhere. They are used surgically — Stripe's three named containers are `feature-detail`,
`startups-program-card`, `developer-systems`: components that appear in both a wide slot and a narrow
slot on the same page.

Use one when a single component genuinely renders at two different widths:

```css
.card-host { container-type: inline-size; }
@container (min-width: 380px) { .card { display: grid; grid-template-columns: 64px 1fr; } }
```

**Do not** convert page-level breakpoints; page layout depends on the viewport. And `container-type:
inline-size` applies layout, style and inline-size containment, which makes the element a containing
block for `position: fixed` descendants — put it on a big wrapper and every dropdown, tooltip and modal
inside it will position against that wrapper.

### Decision: how do I get vertical rhythm without a baseline grid?

Strict baseline grids fail on the web structurally: webfonts load asynchronously and change metrics
mid-render; the user's minimum font size overrides yours; images, embeds and code blocks are arbitrary
heights; and `line-height` centres text in its box, so a heading's optical top is not its box's top.

What produces rhythm instead:

1. **Line-heights that resolve to whole pixels.** Measured real pairs: 14/20, 14/22, 15/28, 16/24,
   16/26, 17/30, 18/27. Vercel's `1.7` at 16px computes to **27.2px** — fractional, and it will never
   stack cleanly. Set unitless in tokens, then check the computed value.
2. **A named multiplier trio instead of ad-hoc margins.** Linear's editor: `--editor-block-spacing: 1rem`,
   `-large: calc(1.375 × base)` = 22px, `-small: calc(0.375 × base)` = 6px. Three values, one source.
3. **Ownership.** Every block owns only its bottom margin, or only its top — never both. Mixing produces
   collapse bugs that look like random 4px inconsistencies. Pick `margin-block-start` on headings and
   `margin-block-end` on everything else, and hold the line.
4. **A `:first-child` reset.** `h2:first-child { margin-top: 0 }` and `:last-child { margin-bottom: 0 }`.
   This omission is the most common cause of "the top of this card has more padding than the bottom."

### Decision: this gap is mathematically right but looks wrong

Four cases that come up constantly:

**Borders eat space.** A 16px gap containing a 1px rule reads as two 15.5px gaps. A bordered card at
16px padding looks tighter than a borderless one at 16px padding. Add 1–2px inside the border.

**Icons are optically larger than text.** A 16×16 icon beside 14px text out-weighs it, because the
text's cap height is ~10px. Real products compensate asymmetrically: Vercel's rail rows are
`padding: 0 8px 0 10px` on a 36px row; Carbon's are `0 16px 0 32px`; react.dev's are `8px 8px 8px 20px`.
**Asymmetric padding on nav rows is correct, not sloppy.**

**Text carries built-in leading; boxes do not.** A 24px gap between two paragraphs at `line-height:
1.6`/16px includes ~4.8px of half-leading each side, so the optical gap is ~33px. The same 24px between
a paragraph and an image is a real 24px. That is why a heading above an image needs less top margin than
the same heading above a paragraph.

**The hover target should be bigger than the text without moving the text.** Plausible's dashboard metric
cells are `padding: 8px; margin: 0 -8px; border-radius: 6px; hover:bg-gray-100` — the negative margin
cancels the padding, so the label stays on the same left edge as everything else in the panel while the
hover fill extends 8px past it on both sides. Use this wherever you want a padded hit area inside an
already-aligned column.

The working rule, with its limit: **trust your eye over the ruler, but only by one step on the ramp, and
only where you can name the optical reason** (a border, an icon, leading, a radius). 16 → 12 or 16 → 20,
because a 1px border is eating the gap. Not 16 → 17, and not five times on one screen. The ramp protects
you from 200 ad-hoc decisions; it is not meant to protect you from three deliberate ones.

### Decision: nothing, spacing, background, border, or card?

The escalation ladder, cheapest first. **Go down only when the level above has failed.**

| Level | Use when | Cost |
|---|---|---|
| **Nothing** | Proximity and reading order already group it | 0 |
| **Space** | Two groups need separating on one page | 0 |
| **A 1px rule** | A repeating list needs a *scannable* boundary and space alone is ambiguous | 1 line |
| **Background shift** | The region has a different *function* — sidebar, code block, callout | reads as a plane |
| **Border, no fill** | Scannable edge that should stay on the page plane — a table, a README | 1px |
| **Card (fill + edge + radius)** | The region is an **independently actionable object**: clickable, draggable, dismissible, or one record in a set | high |

This ladder is why GitHub's About sidebar has no container — it is not actionable as a unit. It is why
Carbon's spacing page has **zero** card-like surfaces and **0px** radius everywhere. It is why Notion's
topic tiles *are* cards: each one is a link.

**Scope — three cases where "default to no container" produces a worse interface.** Skip the ladder and
go straight to a bordered surface when:

- **The region is a drag source or a drop target.** A kanban board, a dashboard the user rearranges, a
  form builder, a playlist. The edge is not decoration; it is the answer to "what am I picking up, and
  where does it land?" Without it the user drags an invisible bounding box. Grafana ships hairline rows
  *inside* panels precisely because the panel itself is the draggable unit.
- **You do not control the background.** An embeddable widget, a Chrome extension panel, an email, a
  block rendered inside someone's CMS. Proximity grouping assumes a known ground; on an unknown one your
  content merges with the host's.
- **The region can be dismissed, or floats above the page.** A popover, a toast, a menu, a modal. Depth
  cues are what say "this is temporary and will go away." A borderless toast reads as a layout bug.

**Two structural tricks worth stealing:**

- **Put horizontal padding on the card's children, not the card.** shadcn's Card computes to
  `padding: 24px 0` with `px-6` on the header, content and footer. That is what lets a divider or a table
  run edge-to-edge inside a padded card. A card with uniform `p-6` can never have a full-bleed row.
- **Concentric radii must satisfy `inner = outer − padding`.** shadcn derives its whole set from one
  token — `--radius: 10px`, and every radius measured on its site is 6, 8, 10 or 14, with the Card at 14.
  A 12px radius inside a 12px radius with 16px of padding between them looks wrong even when nobody can
  say why.

**Never nest a card in a card — with one named exception.** Maximum surface depth is 2: page > panel. If
a panel's contents need separation, use a 1px internal rule, a background shift on one sub-region, or
more padding. Grafana does exactly this: one panel, hairline-separated rows inside, no inner cards.

**Scope — depth 3 is correct when the data is genuinely three levels deep and each level is separately
actionable.** A code-review thread (file → comment → suggested-change block, each independently
resolvable); an email client showing a forwarded chain; an AI chat where a tool-call result sits inside
an assistant turn inside a conversation. Applying "max depth 2" there forces you to flatten a real
hierarchy into an ambiguous one, and the user loses track of which reply belongs to which comment. The
constraint that still holds at depth 3: **only the outermost level gets the full card treatment.** Inner
levels get indentation plus a background shift, or a left rule, or a radius one step smaller — never
three concentric border-plus-shadow-plus-radius surfaces.

### Decision: are these edges actually aligned?

The small misalignments that read as "unfinished," in frequency order:

- **A section heading not sharing a left edge with its content**, because the heading has no padding and
  the content sits in a padded card. Non-negotiable: one left edge.
- **Icons in a list off a common edge** because some rows have icons and some do not. Reserve the icon
  column on every row, or drop icons entirely.
- **Right edges of two columns disagreeing** because one column has a scrollbar. Use
  `scrollbar-gutter: stable` on every scrolling pane.
- **Optical left edge of large display type**, where a round or open letterform starts. Visible above
  32px, invisible at 16px. Fix only above 32px, with 1–2px of negative margin.
- **The last row of a card sitting closer to the border than the first**, from a `margin-bottom` on the
  last child.

Prefer `gap` over margins wherever a flex or grid parent exists. Gap cannot collapse, cannot double, and
has no first/last-child exceptions. Most alignment bugs are margin bugs.

### Decision: how do I pace a long page?

Measured vertical section padding:

- **Resend: 96px top and bottom on nine consecutive sections**, plus a 96/0 closer
- Ramp: 128px and 64px; Apple: 144px observed, `--global-section-aap-padding: 196px`
- Raycast: `--spacing-12: 168px`, `--spacing-13: 224px`; Attio: 152 top / 112 bottom
- Product UI (Grafana, GitHub, Vercel docs, Plausible): **nothing above 48px anywhere**

So: **marketing sections are 96–224px apart; product sections are 24–48px apart.** That 4× difference is
the single biggest cause of a dashboard that feels empty — someone applied marketing spacing to a work
surface.

Resend corrects "always vary your section rhythm": nine consecutive sections at exactly 96/96 read as
calm because the *content type* alternates (copy block, product shot, code sample, logo wall) even though
the padding does not. Vary the type of gap or the width of the content block; you do not also have to
vary the number. What you must not do is vary it randomly — 96, 80, 112, 88 reads as an accident.

**Scope — 96px+ sections are wrong on a comparison page.** A pricing page, a plan-comparison table, a
spec sheet, a feature matrix. The user is holding row 4 in their head while reading row 30; every 96px
band is scrolling that breaks the comparison. Use 32–48px between comparison blocks even on marketing,
and reserve the big bands for the narrative sections around them. Same for any page whose entire pitch
is supposed to land above the fold — a single-offer campaign page has no second section to pace.

---

## When this advice is wrong

- **4px base, on a native mobile target.** Shipping React Native, or handing specs to iOS/Android
  engineers: use an 8pt base with 4pt half-steps. It matches the platform grids and the design tooling.
- **4px base, on a large multi-team design system.** Carbon is 8px-dominant on purpose. When 200
  engineers who will never meet implement the same components, a coarser grid produces fewer
  disagreements than an optimal one.
- **28–36px rows, on a touch-first product.** 28px is unhittable with a thumb. Consumer mobile, kiosks,
  in-car, gloves: 44–48px is a floor, not a target.
- **28–36px rows, on a short nav or an accessibility-regulated product.** The density argument is a
  trade: you buy visible items with hit area. With 6 nav items there is nothing to buy — 32px rows in a
  244px rail read as a stranded fragment, and the row should be sized off its type (~40px at 14px text).
  Same when the product must stay usable at 200% browser zoom or by users with motor impairments: WCAG
  2.5.8 sets a 24×24 CSS-px floor and 2.5.5 asks for 44×44. 28px rows with 0 gap fail 2.5.8 the moment
  the clickable region is the text rather than the row.
- **65–75ch, for a reference table.** If the reader is scanning for a symbol, wider and smaller is
  faster. Stripe's 14px API reference is not a downgrade from its 16px guides; it is a different task
  correctly served.
- **"Never nest a card," when rendering a genuinely nested object.** See the depth-3 scope above.
- **"Cap the content width," for tables, dashboards and editors.** Full-bleed is right; centring a data
  table in a 1200px column is actively harmful.
- **Container queries for page layout.** Media queries are correct for the shell.
- **The 2–3× hierarchy ratio, in extremely dense UI.** A spreadsheet, an editor gutter, a trading
  terminal: everything is one tier.
- **The 2:1 heading rule, when size contrast is already ≥1.6×.** react.dev runs 28px headings over 17px
  body at 24/24 and reads fine. Big type buys back the space.
- **"Three distinct padding values per screen," in a component gallery or a data grid.** Where the
  screen's job is to show that things are the same kind of thing, uniformity is the content.
- **Generous whitespace, when the user's job is comparison.** If the user must compare row 4 to row 30,
  every pixel of padding is a comparison they cannot make. Density is the feature.

---

## Anti-patterns: what generated UI does here

### The 2026 tells, in order of how fast they give the output away

These are the current defaults — the ones a 2026 model reaches for when nothing told it what to do.
Each has a grep signature; run them against your own output.

| # | Tell | Grep signature |
|---|---|---|
| 1 | **The untouched shadcn Card**: `rounded-2xl shadow-lg p-6` on every surface, radius and shadow identical from a 64px chip to a 600px panel | `grep -rEo 'rounded-2xl[^"]*shadow-(lg\|xl)' src/` |
| 2 | **Centered hero + exactly three feature cards.** Three because three is the mode of the training set, not because there are three things | `grep -rn 'grid-cols-3' src/` then check whether the count is content-driven |
| 3 | **The boilerplate container**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` on every page, including the dashboard | `grep -rn 'max-w-7xl mx-auto' src/` |
| 4 | **The stat-tile row**: four tiles, big number over small caps label, one accent line each, all equal weight, occupying the top 240px of every dashboard | `grep -rc 'text-3xl font-bold' src/` |
| 5 | **Bento grid where every cell has equal weight.** A bento grid's entire premise is that a 2×2 cell outranks a 1×1. Uniform cells are just a card grid with extra `col-span` | `grep -rEn 'col-span-\|row-span-' src/` — if every span is 1, it is not a bento |
| 6 | **`min-h-screen` on pages that are not landing pages**, forcing one screen of content to fill 100vh with dead air | `grep -rEn 'min-h-screen\|h-screen' src/` |
| 7 | **Centered past the hero**: `text-center` on body copy, feature descriptions, empty states, form labels | `grep -rn 'text-center' src/ \| wc -l` — more than ~3 per page is a smell |
| 8 | **All-caps eyebrow above every section heading**, adding a third type tier that carries no information | `grep -rEn 'uppercase tracking-wide\|tracking-widest' src/` |
| 9 | **`space-y-*` as the only spacing mechanism**, so every relationship on the page is one distance | `grep -roE 'space-y-[0-9]+' src/ \| sort \| uniq -c` — one dominant value is the failure |
| 10 | **Emoji as sidebar/nav icons**, which breaks the icon column's optical alignment because emoji have their own metrics | `rg -n '[\x{1F300}-\x{1FAFF}]' src/` (or `grep -rnP`, GNU/ugrep only) |

Tells 1–5 are the ones a designer names in under two seconds. Tells 6–10 are what they mean when they
say it "feels generated" but cannot point at anything.

### 1. Card overuse — everything wrapped in a rounded box

**What it looks like:** every heading-plus-content group becomes `<Card>`; the page is a stack of 6–10
white rounded rectangles on a grey background; nothing has hierarchy because everything has the same
treatment. It happens because a card removes the need to decide how much space goes between things.

**The correction, with a measured A/B.** Both of these are real analytics dashboards showing six headline
metrics:

- **shadcn `dashboard-01`** (the template most AI output imitates): four separate surfaces, each
  `border: 1px`, `border-radius: 14px`, `box-shadow`, `padding: 24px 0`, in a `262px ×4` grid with 24px
  gaps. Four borders, four shadows, four radii to render six numbers.
- **Plausible** (live product): **one** panel, 1088px wide, with the six metrics as flex cells at
  `padding: 0 16px` separated by 1px vertical rules. The selected metric is marked by a background fill
  on an 8px-padded, `-8px`-margined inner box. One border, one shadow, one radius.

Plausible's version is denser, faster to compare across, and has one-quarter of the visual noise. Reach
for a card only when the region is independently actionable — clickable, draggable, dismissible, or one
record in a set.

### 2. Nested cards

**What it looks like:** `<Card>` → `<CardContent>` → three more `<Card>`s, each with its own border,
radius and shadow. Three concentric rounded rectangles, each inset 24px. It happens because the component
library exports `Card` and it composes.

**The correction:** maximum surface depth 2, except for genuinely three-level data (see the depth-3 scope
above), where only the outer level keeps the full treatment. Inside a panel, separate children with a 1px
rule, a background shift, or spacing. Measured: Carbon 0 nested, Discourse 0, Grafana 0, Vercel docs 0,
Notion 0, shadcn's own index 0, GitHub 0 among content cards.

The tell to grep for: a `border-radius` inside an element that has a `border-radius` *and* its own
background. If the inner radius is not `outer − padding`, it is also geometrically wrong.

### 3. Everything is 24px padding

**What it looks like:** `p-6` on every container — card padding 24, section padding 24, gutter 24, gap 24.
24px is the safe middle: never obviously wrong on any single element, wrong at the page level.

**The correction:** padding scales with the surface's size and importance. Measured, one page each:

| Surface | Padding |
|---|---|
| Grafana panel (dense data) | **8px** |
| Discourse list card | 12px |
| Notion chip | 16px |
| Plausible dashboard panel | **20px** |
| Vercel docs link card / shadcn Card | 24px |
| Resend marketing section | **96px** |
| Apple marketing section | 144px |

Use at least three distinct padding values per screen. Heuristic: a surface's padding is roughly its
shortest dimension ÷ 12, snapped to the ramp. A 100px-tall panel gets 8; a 200px card gets 16; a 400px
hero gets 32.

### 4. Uniform gaps everywhere

**What it looks like:** `space-y-4` on the page, `space-y-4` inside each section, `gap-4` in every row.
Every relationship is the same distance, so the interface has one flat level of structure.

**The correction:** three tiers minimum, each 2–3× the last (8 / 24 / 64). Primer names them
`condensed / normal / spacious` = 16 / 24 / 48. Verify by squinting: distinct blocks should appear, not
an even texture.

### 5. Too much whitespace pretending to be design

**What it looks like:** six stat cards at 48px padding and 32px gaps on a 1440px page that shows 30% of
the information it should, with data below the fold that would have fit. "Use more whitespace" is the
most-repeated design advice in existence, and it is almost always given to people whose problem is the
opposite.

**The correction:** whitespace is a *contrast* mechanism, not a quality mechanism. Its value comes
entirely from being unevenly distributed. 200px of margin around a page whose interior is evenly spaced
communicates nothing; 8px between rows and 64px above the section heading communicates grouping
instantly. **Give the thing the user scans most the least padding.**

Diagnostic: count the information units in one 1440×900 viewport of your output and compare against the
closest row in the tables above. Plausible fits six metrics, a 28-day chart, and the top of two breakdown
tables in one viewport. If yours shows four stat cards and a title, you are ~60% too airy.

### 6. `flex: 1` on a text container with no max-width

Prose stretching to 1400px — 180 characters a line. Any element containing running text against an
unbounded parent gets a `max-width` in the 45–86ch band for its task. **The shell is fluid; the text is
not.**

### 7. Dividers compensating for equal gaps

Every list item gets `border-bottom`, every section gets an `<hr>`, and the page becomes a ladder. Fix the
gaps first. Then keep the divider only in repeating scannable lists where the row boundary genuinely
matters — a table, a settings list, a transaction log. One divider style per page, 1px at roughly 8–12%
foreground opacity, not a solid grey.

### 8. Row height inflation

44px sidebar rows, 56px table rows, 48px list items — mobile touch targets applied to a pointer product.
Measured desktop reality: shadcn 32, Carbon 32, Grafana 32, Primer 36, Vercel 36, Stripe 28, with 0–4px
between them. Decide once, deliberately, based on input device, session length and item count.

---

## Self-check

Run this against your own output. Any "no" is a bug. Each item is either a shell command or something
visible in a screenshot — nothing here requires taste.

**Grep checks** (run from the repo root; adjust `src/` to your source dir):

```bash
# 1. No off-ramp spacing. Both commands must print nothing.
grep -rEo '\b(p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|gap|gap-x|gap-y|space-x|space-y)-\[[^]]+\]' src/
grep -rEo "(padding|margin|gap)[a-zA-Z-]*:[[:space:]]*['\"]?[0-9]+px" src/ | grep -vE "[:'\" ](0|1|2|4|6|8|12|16|24|32|48|64|96)px$"

# 2. At least three distinct gap sizes, largest >= 3x smallest.
grep -rhoE '\b(gap|space-y)-[0-9]+' src/ | sort | uniq -c | sort -rn

# 9. Every shell-grid 1fr is minmax(0, 1fr). Must print nothing.
grep -rEn 'grid-?[Tt]emplate-?[Cc]olumns' src/ | grep -E '\b1fr' | grep -v 'minmax(0'

# 10. Hover states never change size or position. Must print nothing.
grep -rEn 'hover:(scale|translate|-?m[trblxy]?-|p[trblxy]?-|text-(xs|sm|base|lg|xl))' src/

# 13. Every flex-1 text container has a max-width. Inspect each hit.
grep -rn 'flex-1' src/ | grep -vE 'max-w-'

# 2026 tells — see the anti-pattern table for what each hit means.
grep -rEo 'rounded-2xl[^"]*shadow-(lg|xl)' src/ | wc -l   # want 0
grep -rn 'max-w-7xl mx-auto' src/                          # want 0 outside marketing
grep -rEn 'min-h-screen|h-screen' src/                     # want 0 outside a landing hero
grep -rc 'text-center' src/ | awk -F: '$2>3'               # >3 per file is a smell
```

**DOM checks** (paste into the devtools console on your running page):

```js
// 3. Heading gap ratio: above should be ~2x font-size, below ~1x.
[...document.querySelectorAll('h2,h3')].map(h=>{const c=getComputedStyle(h);
  return {tag:h.tagName, fs:c.fontSize, above:c.marginTop, below:c.marginBottom,
    ratio:+(parseFloat(c.marginTop)/parseFloat(c.fontSize)).toFixed(2)};});
// PASS: ratio 1.8-2.4, or >=1.0 when the heading is >=1.6x body size.

// 4. Card count and nesting depth.
(()=>{const isCard=el=>{const c=getComputedStyle(el),r=el.getBoundingClientRect();
  return r.width>120&&r.height>48&&parseFloat(c.borderTopLeftRadius)>=4&&
    (parseFloat(c.borderTopWidth)>0||c.boxShadow!=='none');};
 const all=[...document.querySelectorAll('body *')].filter(isCard),s=new Set(all);
 let d=0; for(const e of all){let n=0,p=e.parentElement;while(p){if(s.has(p))n++;p=p.parentElement;}d=Math.max(d,n);}
 return {count:all.length, maxNesting:d};})();
// PASS: count < 8 on a product screen; maxNesting 0 or 1.

// 5. Every running-text block is 45-86ch.
[...document.querySelectorAll('p,li')].filter(e=>e.textContent.trim().length>120).map(e=>{
  const c=getComputedStyle(e),x=document.createElement('canvas').getContext('2d');
  x.font=c.fontWeight+' '+c.fontSize+' '+c.fontFamily;
  return +(e.getBoundingClientRect().width/x.measureText('0').width).toFixed(1);});
// PASS: every value 45-86.

// 7. One left edge: list the distinct left offsets of headings and body.
[...new Set([...document.querySelectorAll('h1,h2,h3,p')]
  .map(e=>Math.round(e.getBoundingClientRect().left)))].sort((a,b)=>a-b);
// PASS: 1-2 distinct values per column, not 5.

// 8. Sidebar row heights.
[...new Set([...document.querySelectorAll('nav a, aside a')]
  .map(e=>Math.round(e.getBoundingClientRect().height)))].filter(h=>h>0);
// PASS: all 28-36 (pointer) or all >=44 (touch). Mixed values are the bug.
```

**Screenshot checks** (capture at 1440×900 and 390×844):

- **6. Mobile gutter.** At 390px, measure from the viewport edge to the first text glyph. PASS: 16–28px
  on every screen, and the *same* value on every screen.
- **11. Information density.** Count the discrete information units in one 1440×900 viewport — a metric,
  a chart, a table row group, a nav item group each count as one. Compare to the closest product in the
  tables above (Plausible: six metrics + a 28-day chart + two partial breakdown tables). PASS: within 30%.
- **12. Squint test.** Blur the screenshot to ~8px radius. PASS: 3–5 distinct blocks of tone are visible.
  FAIL: one even texture, which means the spacing carries no information.
- **7b. Left edge, visually.** Draw a 1px vertical line down the screenshot at the content's left edge.
  PASS: heading, body and the content below all touch it.

---

## Provenance

Measured at 1440×1000 and 390×844 via Playwright — computed styles, bounding boxes, and shipped CSS
custom properties — against: react.dev, ui.shadcn.com (blocks index + `sidebar-07` + `dashboard-01`),
plausible.io (live public dashboard), carbondesignsystem.com, primer.style, m3.material.io,
meta.discourse.org, play.grafana.org (dashboard + profile/settings), stripe.com,
dashboard.stripe.com/login, docs.stripe.com (guides + API reference), supabase.com/docs +
/dashboard/sign-in, vercel.com/docs + /login, linear.app/login (which exposes the in-app token set),
attio.com, resend.com, ramp.com, excalidraw.com, notion.com/login, tailwindcss.com/docs,
github.com/vercel/next.js, developer.mozilla.org.

`ch` values are computed from a canvas `TextMetrics` probe in each element's own resolved font.
Occurrence counts (`217×`, `203×`) are over *visible* elements at that viewport and will vary ±30% with
the counting method — read the rank order, not the absolute number.

---

## Direction pass (2026-09)

Re-probed with Playwright on 2026-09-10 to check the claims this file leans hardest on. What moved:

**Confirmed exactly, no change:**

- Supabase docs — H2 22px with **44 above / 22 below**, H3 18px with **36 above / 18 below**; body 706px
  at 15/28 Inter = **72.9ch**. The heading formula in "If you only apply five things" is real and literal.
- react.dev /learn — content column **896px** at 17/30 Optimistic Text = **76.4ch**; rail slot **320px**
  (the inner scroll pane is 342px, overhung to hide its scrollbar); H2 28px at 24/24; nav rows 46px.
- Tailwind docs — **672px** at 14/28 = **76.1ch**.
- shadcn/ui — `--radius: .625rem`, radii on the page measured **6, 8, 10, 14**, Card at 14 = `radius + 4`.
- Carbon spacing page — **0 card-like surfaces, 0 nesting**, 0px radius. The strongest single datum in
  the file.
- Mobile gutters — Stripe **16px**, react.dev **20px**, Resend **24px** at 390px.
- GitHub `container-xl` = **1280px**, README column **838px**.

**Numbers corrected:**

| Was | Now | Why |
|---|---|---|
| Stripe API reference measure **57ch** | **58ch** | 503px at 14px system font measures 58.0ch |
| GitHub README "approx 83ch" | **86ch** | 838px at 16/24 Mona Sans measures 85.8ch — it is a *reference* measure, which strengthens the 71–86ch docs claim |
| Attio gaps "6px (172×), 8px (151×), 4px (145×), 10px (137×)" | **6 (217×), 8 (188×), 4 (183×), 10 (183×)** | Rank order identical; counts are method-dependent, so the file now says to read the rank |
| Carbon "16px (496×), 32px (153×) and essentially nothing else" | **16px (203×), 6px (30×), 32px and 7px (10× each)** | Carbon is 16px-dominant, not 8px-pure — it ships a 6px too. "8px-true" downgraded to "8px-dominant" |
| GitHub "exactly 6 card-like surfaces, 0 nested" | **3–8 depending on the threshold; nesting 1, and 0 among content cards** | Raw surface counts are heuristic-dependent. Nesting depth is not, so the file now leads with nesting |
| Stripe "uses 4px 599 times" | **4px is the third-most-common spacing value**, after 8 and 16 | The absolute count did not reproduce; the rank did |
| Primer "4px gaps 190 times" | cut | Same problem, and the Attio and Stripe rank data already carry the argument |

**Rules that were stated without limits, now scoped.** Each of these was followable off a cliff:

1. **"Default to no container"** → now names three products where the container is load-bearing: drag
   sources and drop targets (kanban, dashboard builders, form builders — the edge answers "what am I
   picking up?"), embedded surfaces where you do not control the background, and anything dismissible or
   floating.
2. **"Never nest a card in a card"** → now scoped to depth 3 for genuinely three-level, separately
   actionable data (code-review threads, forwarded email chains, tool-call results inside chat turns),
   with the surviving constraint stated: only the outermost level keeps the full card treatment.
3. **"Sidebar rows are 28–36px"** → now gated on item count *and* accessibility. Below ~8 nav items the
   density trade buys nothing, and WCAG 2.5.8's 24×24 floor / 2.5.5's 44×44 target bind on
   accessibility-regulated products. The headline rule now carries "above ~12 items, on a pointer."
4. **"Reason in ch, ship in px"** → now scoped. A hard px cap does not grow with a user's font-size
   preference, so at 200% zoom a 680px column collapses from 76ch to ~45ch. `rem` is correct wherever
   user font scaling is honoured; px only when the font size is also fixed.
5. **"Every prose block gets a max-width"** → scoped to text against an *unbounded* parent. Adding a cap
   inside a table cell or a 420px chat column double-constrains it.
6. **"Marketing sections are 96–224px apart"** → scoped out of comparison pages (pricing, plan matrices,
   spec sheets) and single-screen campaign pages, where the band is scrolling that breaks the comparison.
7. **"Trust your eye over the ruler"** → was an unbounded licence to leave the ramp. Now bounded: one
   step on the ramp, only where you can name the optical cause, not more than about three times a screen.

**Anti-patterns refreshed.** The eight patterns in this file were all still real but all pre-2024 in
origin, and none of them are what a designer names first in 2026. Added a leading table of ten current
tells — the untouched `rounded-2xl shadow-lg p-6` shadcn Card, centered hero plus exactly three cards,
the `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` boilerplate container, the equal-weight stat-tile row, bento
grids where every cell is 1×1, `min-h-screen` on non-landing pages, `text-center` past the hero, the
all-caps eyebrow, `space-y-*` as the sole spacing mechanism, and emoji as nav icons — each with a grep
signature. Sourced from 2026 AI-slop critiques and the anti-vibe-coding discussion, filtered to the ones
that are *layout* tells rather than color or motion tells, which belong in the sibling files.

**Self-check rewritten to be runnable.** Every one of the 13 items was previously a question requiring
judgement ("is every spacing value drawn from the ramp?"). They are now three blocks: shell commands that
must print nothing, devtools snippets that return a value with a stated PASS band, and four screenshot
checks with explicit pass criteria. An agent can execute the whole list without deciding anything.

**Cut.** About 40 lines of prose that changed no decision — the try/catch simile, "this bug ships
constantly," "Infinite scale, finite usage," "Real systems have collisions," "no amount of shadow
refinement will fix it," "and they prove the rule," "Nothing here is recalled," and the standalone "Why it
happens" paragraphs, which are now one clause inside each pattern. The reference tables lost nothing.
