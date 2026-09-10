# Space, layout, grid and rhythm

Measured September 2026 against live production UI. Every number below was pulled with Playwright
from computed styles or bounding boxes on the real site, or read from the CSS custom properties the
product ships. Where a value is inferred rather than read, it says "approx."

The reason this file exists: spacing is where generated UI gives itself away. Not color, not type.
An interface where every gap is 16px, every card has 24px of padding, and every section is separated
by a card reads as machine output within half a second, even to people who cannot say why.

---

## If you only apply five things

1. **Use a 4px base with a hand-picked ramp, not every multiple.** Ship `4 8 12 16 24 32 48 64 96`
   and nothing else. Never write an arbitrary px value. Never write `padding: 18px`.
2. **Make the gap above a heading 2x to 4x the gap below it.** Measured: Vercel docs H3 = 28 above /
   12 below (2.3x). Stripe API params = 33 above / 8 below (4.1x). GitHub README H2 = 24 / 16 (1.5x).
   If a heading floats equidistant between two blocks, it belongs to neither and your page has no
   structure, no matter how many dividers you add.
3. **Default to no container.** Reach for spacing first, then a background shift, then a 1px border,
   and only then a card. GitHub's next.js repo page, one of the densest pages on the web, contains
   exactly **6** card-like surfaces and **0** nested ones. Its "About" sidebar has no container at all.
4. **Pick the content width from the reading task, not from a grid.** Measured across 15 pages the
   answer is 45ch (Apple marketing body), 57ch (Stripe API reference), 76ch (Vercel and Tailwind docs),
   86ch (Atlassian docs). Stripe alone runs 47ch at 16px on a guide and 57ch at 14px on the API
   reference, two different widths *and* two different body sizes in the same product.
5. **Sidebar rows are 28-36px, not 44px.** Measured: Stripe 28, Grafana 32, Vercel docs 36, Notion 36,
   Tailwind 24 (text-only, no chrome). The 44px minimum is a *touch* guideline. Applying it to a
   pointer-driven 30-item nav list makes the product feel like a phone app rendered on a monitor.

---

## Measured reference table

Extracted from live sites at a 1440x1000 viewport unless noted. "Ramp" is the actual token ramp the
product ships, not a description of it.

### Spacing scales, as shipped

| Product | Token base | Actual ramp shipped (px) | Notes |
|---|---|---|---|
| **Vercel / Geist** | `--geist-space: 4px` | 4, 8, 12, 16, 24, 32, 40, 64, 96, 128, 192, 256 | Skips 20, 48, 56, 80. Named `2x 3x 4x 6x 8x 10x 16x 24x 32x 48x 64x` |
| **Tailwind v4** | `--spacing: .25rem` | every multiple of 4 is *generatable*, but the docs page itself only uses 4, 8, 12, 16, 20, 24, 30, 32, 40, 96 | The scale is infinite; the usage is a dozen values |
| **Atlassian DS** | `--ds-space-100: 0.5rem` | 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80 | Names it an 8px system (`100` = 8px) and then ships 2, 4 and 6 anyway |
| **GitHub / Primer** | `--base-size-*` | 2, 4, 6, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 64, 80, 96, 112, 128 | Very fine-grained: 4px steps all the way to 48 |
| **Notion / Tatami** | `--tatami-dimension-spacing-*` | 4, 8, 12, 16, 20, 24, 28, 30, 32, 40, 48, 56, 64, 72, 80, 96, 100, 128, 160 | Note the two off-grid values (30, 100) that survive in a real design system |
| **Figma** | `--fig-space-*` | 4, 6, 8, 12, 16, 24, 32, 40, 56 | A 6 between 4 and 8, then no 20, no 48 |
| **Raycast** | `--spacing-1: 8px` | 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 112, 168, 224 | 8px-named with a `0-5` half-step; top of the ramp is for marketing sections |
| **Shopify Polaris** | (4px) | dominant observed padding: 4 (x125), 8, 12, 16, 20 | Densest padding distribution of anything measured |
| **Mercury (marketing)** | `--gap-md: 32px` | 4, 12, 20, 24, 32, 40, 56, 72, 80, 112, 128, 144 | `--gap-md` and `--gap-lg` are **both** 32px. Real systems have collisions |

**The signal:** every serious system is 4px-granular in practice. Even the ones that call themselves
8px systems (Atlassian, Raycast) ship 2, 4 and 6px steps because icon-to-label gaps, badge padding
and border compensation all need sub-8 values. There is no shipped product in this sample where the
smallest spacing token is 8px.

### Container widths, gutters and measure

| Product / page | Page container | Content column | Body type | Measure | Gutter @1440 | Gutter @390 |
|---|---|---|---|---|---|---|
| **Vercel docs** | `--ds-page-width: 1400px` | 809px | 16px / 27.2px Geist | **76ch** | rail flush to edge | 24px |
| **Tailwind docs** | 1024px grid | 672px `.prose` | 14px / 28px Inter | **76ch** | 24px (rail at 24) | n/a |
| **Stripe docs (guide)** | full-bleed | 474-486px (split with code pane) | 16px / 26px system | **47ch** | rail flush | 28px |
| **Stripe API reference** | 1160px | 503px prose | **14px / 22px** system | **57ch** | 280px sidebar | 28px |
| **GitHub repo page** | `container-xl: 1280px` | 952px content / 838px README | 16px / 24px Mona Sans | approx **83ch** | 80px | 17px |
| **Supabase docs** | `max-w-6xl: 1152px` | 706px `.prose` | **15px** / 28px Inter | **73ch** | 40px | n/a |
| **Atlassian DS docs** | 1028px | 756px | 14px / 20px | **86ch** | 350px nav | n/a |
| **Radix Themes docs** | 858px section | 730px | 16px / 24px | **67ch** | 64px section pad | n/a |
| **Shopify Polaris** | 1228px | 810px article | 16px / 24px Inter | approx **80ch** | 284px sidebar | n/a |
| **shadcn/ui site** | `container: 1400px` | 896px (`max-w-4xl`) | 18px / 28px Geist | **75ch** | 24px | n/a |
| **Apple (MacBook Pro)** | 1260px `viewport-content` | 480px body copy | 17px / 25px SF Pro | **45ch** | 90px | 24px |
| **Linear (marketing)** | 1436px inner | 566px paragraph | 24px / 31.9px Inter | **38ch** | 78px | 23px |
| **Raycast (marketing)** | `--container-width: 1204px` | 818px hero text | 18px Inter | **69ch** | 24px section pad | n/a |
| **Grafana (app)** | full-bleed | full-bleed panels | 14px / 22px Inter | 55ch | 320px nav | n/a |
| **Figma (marketing)** | `--fig-grid-max-content-width: 95rem` (1520px) | 650px article | 18px / 25.2px | approx 56ch | 155px | n/a |

**The signal on measure:** the "65-75 characters" rule is book typography and it is *wrong for docs*.
Every technical documentation site measured lands 73-86ch, because the reader is scanning for a
parameter name, not reading three pages of prose. Marketing body copy runs the other way: Apple 45ch,
Linear 38ch, Figma approx 56ch, because that copy is read once, at a glance, next to an image.
65-75ch is correct for essays, changelog entries, and long-form docs where someone actually reads
paragraph after paragraph.

**The signal on gutters:** at 390px wide, every single product measured lands between **16px and 28px**.
Nobody ships 8px. Nobody ships 40px. At 1440 the spread is enormous (4px to 90px) because the desktop
gutter is a function of the shell, not a constant.

### Shell geometry

| Product | Left rail | Content | Right rail | Rail row height | Row radius | Row hover |
|---|---|---|---|---|---|---|
| Stripe API ref | 280px | 1160px | inline code pane | **28px**, 4px gap | - | tinted fill |
| Vercel docs | 300px (nav 264) | 809px | 240px TOC | **36px**, 0 gap, pad `0 8 0 10` | 6px | light fill |
| Linear docs | 280px | fluid | - | - | 8px | fill |
| Notion help | 280px (1px rule, no fill) | 804px | - | **36px**, 8px pad | 0 | none visible |
| Shopify Polaris | 284px (8px inset) | 810px | - | - | 4px | fill |
| Grafana | 320px | full-bleed | - | **32px** | 6px | fill |
| GitHub | - | 952px | approx 300px About (**no container**) | 24px (nav) | 6px | fill |
| Atlassian DS | 350px | 756px | - | - | 4/6px | fill |
| Tailwind docs | 240px | 672px | TOC present | **24px** text, 16px indent, no chrome | 0 | color only |

Rail width clusters hard at **240-300px, with 280 the mode**. 320 and 350 appear only where the rail
carries a second level of nested navigation.

### Card and panel treatment

| Product | Surfaces on page | Nested | Padding | Radius | Edge treatment |
|---|---|---|---|---|---|
| **GitHub** repo page | **6** | **0** | 0 (padding lives on inner rows) | 6px | 1px `#d1d9e0` |
| **Vercel docs** | 12 | 0 | 24px (link cards) | 12px | white fill, **no border** |
| **Grafana** dashboard | 10 | 0 | 8px | 10px | 1px `rgba(204,204,220,.12)` on `#181b1f` |
| **Notion help** | 17 | 0 | 24px (tiles) / 16px (chips) | 16px / 12px | `#f6f5f4` fill, **no border** |
| **Linear** marketing | 50 | 37, depth 3 | 8-16px | 8, 9, 12, 22px | 1px `rgba(255,255,255,.08)` + inset ring |

Linear is the exception that proves the rule: those 37 nested surfaces are a *device frame*
containing an *app window* containing *panels*, i.e. a rendered product screenshot, not content
nesting. In real content, four of five products measured have **zero** nested cards.

---

## The decisions

### Decision: what is my base unit?

**Use 4px.** Then define a ramp and never leave it:

```css
--space-1:  4px;   --space-2:  8px;   --space-3: 12px;  --space-4: 16px;
--space-5: 24px;   --space-6: 32px;   --space-7: 48px;  --space-8: 64px;  --space-9: 96px;
```

Nine values. Notice what is missing: 20, 28, 40, 56, 80. You will want 20px at some point. Resist it
once; if you need it twice, add it deliberately and document why. Notion shipped a `30` and a `100`
in an otherwise clean scale, and those two values are where a real human overrode the system for a
real reason. That is fine. Twelve overrides is not.

Why 4 and not 8: **the sub-8 values are the ones that do the most work.** In the measured padding
histograms, 4px was the single most common padding value on Stripe's API reference (599 occurrences),
Polaris (125) and Vercel docs (72 at 4px, 140 at 6px, 521 at 2px). Icon-to-label gaps, chip padding,
the inset between a focus ring and its element, the vertical padding on a 24px-tall table cell: none
of those work at 8px. If your smallest token is 8, you will write `padding: 4px` as an arbitrary
value within a day, and once you have written one arbitrary value the system is advisory.

**Where the 8px grid actually came from and where it still applies.** The 8pt grid entered mainstream
UI practice through mobile design systems, where a layout unit that divides evenly at 1x, 1.5x, 2x and
3x device pixel ratios avoids half-pixel rendering on physical screens. That constraint is real and it
still applies to: native mobile layout, exported design specs handed to iOS/Android engineers, and
icon/artboard sizing. It does **not** apply to a browser rendering CSS pixels at arbitrary zoom on a
2x display, which is why every web design system in the table above quietly ships 4 and 6 and 2. Use
8px as your *dominant rhythm* (most of your gaps will be 8, 16, 24, 32). Do not use it as your *floor*.

### Decision: how much space between these two things?

Spacing encodes grouping. This is the highest-leverage thing in this document and the thing generated
UI gets most consistently wrong, because a uniform gap communicates "these things are all peers,"
which is almost never true.

**The ratio, measured:**

| Relationship | Ratio to base | Measured examples |
|---|---|---|
| Label to its own value | 0.25-0.5x | Stripe param name to description: **8px** below a 33px gap above |
| Item to item within a group | 1x | Stripe sidebar rows: 28px tall, **4px** apart. Vercel rail rows: 36px, **0** apart |
| Group to group | 2-3x | Vercel docs H3: **28px** above vs 12px below |
| Section to section | 4-6x | GitHub README H2: 24px above / 16px below at 16px body; Vercel H2 36/28 |
| Page section (marketing) | 12-25x | Raycast `--spacing-13: 224px`; Apple `--global-section-aap-padding: 196px`; Apple observed 144px section padding x18 |

**Concrete rule.** Take the gap *inside* a group as your unit. The gap *between* groups is 2x to 3x
that. The gap between sections is 2x to 3x again. If you have list items 8px apart, groups are 24px
apart and sections are 64px apart. Three tiers, each roughly triple.

**Proximity beats dividers, quantified.** Stripe's API reference lists 40+ parameters. Each parameter
name sits 33px below the previous parameter's description and 8px above its own description. That
4.1:1 ratio is doing all the grouping work. There is a hairline rule as well, but cover it and the
structure is still completely legible; equalize the gaps to 16/16 and no number of hairlines will
save it. Dividers are a *reinforcement* of a grouping that spacing has already established, and if
spacing has not established it, the divider is a confession.

The corollary an agent should internalize: **when you feel the urge to add a divider, first try
doubling one gap and halving another.** Then check whether you still want the divider. Usually not.

### Decision: how wide is the content column?

Ask what the reader is doing.

| Task | Width | Evidence |
|---|---|---|
| Reading prose end to end (essay, guide, changelog) | **60-75ch** | Radix docs 67ch, Raycast 69ch, Supabase 73ch |
| Scanning reference material (params, API, tables) | **75-86ch**, and drop the body size to 14-15px | Stripe API ref 14px/22px; Atlassian 14px/20px at 86ch; Supabase 15px/28px |
| Marketing body next to an image | **40-60ch** | Apple 45ch at 17px; Linear 38ch at 24px |
| Form / settings | **440-640px** | Vercel docs link card 397px; Figma's form column 440px; Notion's inline card 390px |
| Dashboard, table, canvas, editor | **full-bleed** | Grafana: `main` has `padding-left: 320px` and no max-width at all |

Two things fall out of this that contradict common advice:

- **There is no single "content width" for a product.** Stripe uses 486px prose on a guide page and
  1160px full-width on the API reference, and the body size changes from 16px to 14px between them.
  Picking one `--content-max-width` and applying it everywhere is the mistake.
- **`ch` is the right unit to reason in, `px` is the right unit to ship.** Measure in ch to pick the
  number; write `max-width: 680px` so it does not shift when the font loads.

Page container widths, measured, cluster into three bands: **1024-1200** (docs, app content),
**1260-1400** (marketing and dense app shells: Apple 1260, GitHub 1280, Vercel 1400, shadcn 1400),
and **1440+ / full-bleed** (Figma 1520, Mercury 1952, Linear 1436, any dashboard). If you are picking
one number for a marketing site in 2026, **1200 or 1280**. 1120 is now visibly narrow on a 1440
laptop; nothing in this sample uses it.

### Decision: what shell does this screen need?

**Sidebar + content** (the default for any product with more than eight destinations). Rail 240-300px,
fixed, its own scroll container. Content gets its own max-width *inside* the remaining space, not the
full remainder. Vercel does exactly this: 300px rail, then an 809px content column inside a 1024px
`max-w-5xl`, then a 240px TOC.

The mistake to avoid: making content `flex: 1` with no max-width, so prose stretches to 1100ch on a
27-inch monitor. Rail width is fixed; content width is capped; the leftover is margin.

**Three-column (rail + content + TOC)** is right when the content is long and linear and the reader
needs to jump. Vercel, Stripe, Supabase and Tailwind all ship it. The TOC is narrower than the rail
(240 vs 300 at Vercel), which is correct: it is a secondary index, and making it match the rail width
creates a symmetric layout that reads as two equal navs.

**Master/detail** (list left, item right). The list pane wants 320-400px, wider than a nav rail
because it holds two lines of content per row rather than one label. The detail pane is where you
apply a *prose* max-width, left-aligned inside the pane, not centered, so the reader's eye returns to
a stable left edge when they switch items.

**Full-bleed** for dashboards, tables, editors and canvases. Grafana's `main` is `padding-left: 320px`
and nothing else: no max-width, no centering. Panels sit on an 8px gap grid. Constraining a dashboard
to 1200px wastes the exact real estate the user opened the dashboard for.

### Decision: grid or flex?

- **Flex** when one axis matters and sizes are content-driven: toolbars, row layouts, button groups,
  anything with `gap` and `flex-wrap`. This is 80% of the UI.
- **Grid** when you need *alignment across independent rows*. The tell: if row 2's second column must
  line up with row 1's second column, and the rows are separate DOM elements, you need grid (or
  subgrid). Flex cannot do that.
- **Grid** for the page shell: `grid-template-columns: 300px minmax(0, 1fr) 240px` is one line and it
  expresses the three-column doc layout completely. The `minmax(0, 1fr)` matters: plain `1fr` has a
  min-content floor and a wide code block will blow the layout out horizontally. This bug ships
  constantly.
- **`auto-fit` / `minmax` for card grids**, not media queries:
  `grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))`. One line replaces three breakpoints.
  Watch the failure mode: with `auto-fit`, a single remaining card stretches to full width. Use
  `auto-fill` if you would rather it stay card-sized.

Measured usage: `display: flex` outnumbers `display: grid` roughly 4:1 in the CSS of every product
scanned (Figma 195 vs 30, GitHub 64 vs 15, Stripe 407 vs 110). Grid is the specialist.

### Decision: should I use container queries?

Here is the measured state of the art in September 2026, counting rules in the shipped CSS:

| Product | `@container` rules | `@media` rules |
|---|---|---|
| Stripe | **10** (3 named containers) | 404 |
| Vercel docs | 20 | 160 |
| GitHub | 0 | 193 |
| Figma | 0 | 205 |
| Linear | 0 | 23 |

Container queries are not replacing media queries in production, four years after shipping. They are
being used surgically: Stripe's named containers are `feature-detail`, `startups-program-card`,
`developer-systems`, i.e. **three specific components that appear in both a wide slot and a narrow
slot on the same page.**

**Use one when a single component genuinely renders in two different-width slots** (a card that goes
in both the main column and the sidebar; a stat tile in a 4-up grid and in a 2-up grid). Then:

```css
.card-host { container-type: inline-size; }
@container (min-width: 380px) { .card { display: grid; grid-template-columns: 64px 1fr; } }
```

**Do not** convert your page-level breakpoints to container queries. Page layout depends on the
viewport, that is a media query. `container-type: inline-size` also applies layout, style and
inline-size containment, which makes the element a containing block for absolutely and fixed-positioned
descendants. Put it on a large wrapper and any dropdown, tooltip or modal rendered inside it will
suddenly position against that wrapper instead of the viewport.

### Decision: how do I get vertical rhythm without a baseline grid?

Strict baseline grids fail on the web and you should stop trying. The reasons are structural, not
matters of effort: web fonts load asynchronously and change metrics mid-render; a user's browser
minimum font size overrides yours; images, embeds and code blocks are arbitrary heights that will
never be multiples of your baseline; and `line-height` centers text in its box (half-leading above
and below), so a heading's optical top does not sit where its box's top sits.

What actually produces vertical rhythm:

1. **Line heights on a 2px grid, resolving to whole pixels.** Real measured pairs from this sample:
   14/20, 14/22, 15/28, 16/24, 16/26, 16/28, 17/25, 18/28. Every one is an integer. Set line-height
   unitless in your tokens, then check the computed value: Vercel's `1.7` at 16px lands on 27.2px, a
   fractional value that will not stack cleanly against anything else on the page.
2. **Margins from the same ramp.** Heading top margins measured: 24, 28, 32, 36. Paragraph gaps: 12,
   16, 20.
3. **Ownership.** Every block owns only its *bottom* margin, or only its top. Mixing produces margin
   collapse bugs that look like random 4px inconsistencies. Pick `margin-block-start` on headings and
   `margin-block-end` on everything else, or the reverse, and hold the line.
4. **A `:first-child` reset.** `h2:first-child { margin-top: 0 }`. The single most common source of
   "the top of this card has more padding than the bottom."

### Decision: this gap is mathematically right but looks wrong

It probably is wrong. Four cases that come up constantly:

**Borders and dividers eat space.** A 16px gap that contains a 1px border reads as two 15.5px gaps.
Between a bordered card at 16px padding and a borderless one at 16px padding, the bordered one looks
tighter. Add 1-2px, or set the padding *inside* the border to 17 and accept an off-ramp value.

**Optical alignment of icons.** A 16x16 icon next to 14px text is optically larger than the text
because the text's cap height is about 10px. Measured: Grafana's nav uses a 24x18 icon box offset 4px
from the row's left edge with a 32px row, i.e. the icon is inset less than the text would be. Vercel's
rail uses `padding: 0 8px 0 10px` on a 36px row, an asymmetric 10/8 because the chevron on the right
has its own optical whitespace. **Asymmetric padding on nav rows is correct, not sloppy.**

**Text has built-in leading; boxes do not.** A 24px gap between two paragraphs with `line-height: 1.6`
at 16px carries 4.8px of half-leading on each side, so the *optical* gap is about 33px. The same 24px
between a paragraph and an image is a real 24px. This is why a heading directly above an image needs
less top margin than the same heading above a paragraph, and why "just use the same value everywhere"
produces a page that breathes unevenly.

**Trailing punctuation and right edges.** In a right-aligned numeric column, a value ending in `%`
optically sits further left than one ending in `9`. Tabular figures fix the digits; nothing fixes the
symbol except padding the column by the symbol's width.

The working rule: **measure with the pixel ruler, then trust your eye over the ruler.** If a 16px gap
next to a 16px gap looks wrong, make one of them 12 or 20 and move on. The scale is a default, not a
law. What it is protecting you against is 200 *ad hoc* decisions, not 3 deliberate ones.

### Decision: nothing, spacing, background, border, or card?

The escalation ladder, cheapest first. **Go down the list only when the level above has failed.**

| Level | Use when | Cost |
|---|---|---|
| **Nothing** | Content is already grouped by proximity and reading order | 0 |
| **Space** | Two groups need separating on one page | 0 |
| **A 1px rule** | You need a *scannable* boundary across a repeating list, and space alone is ambiguous | 1 line |
| **Background shift** | The region has a different *function* (a sidebar, a code block, a callout) | reads as a plane |
| **Border only, no fill** | The region has a scannable edge but should stay on the page plane (a table, a README) | 1px |
| **Card (fill + border/shadow + radius)** | The region is an **independently actionable object**: clickable, draggable, dismissible, or a self-contained record | high |

This ladder is why GitHub's About sidebar has no container: it is not actionable as a unit, so it gets
nothing, and it works. It is why the README gets a 1px border with 6px radius and no fill: it is a
scannable region on the page plane. It is why Notion's topic tiles are cards: each one is a link.

**Never nest a card in a card.** If you have a card and its contents need visual separation, the tools
are: a 1px internal rule, an internal background shift for one sub-region, or more padding. Grafana
does this exactly: one panel, and inside it a list of rows separated by hairlines, no inner cards.

**Maximum surface depth is 2**: page > panel. Three levels (page > card > inner card) always reads as
generated. If you counted three, one of them should be a divider.

### Decision: are these edges actually aligned?

The small misalignments that read as "unfinished," in order of how often they appear:

- **Section heading not aligned with the content below it**, because the heading has no padding but
  the content is in a padded card. Every heading and its content share one left edge. Non-negotiable.
- **Icons in a list not on a common left edge** because some rows have icons and some do not. Reserve
  the icon column on every row (a fixed-width empty box), or drop icons entirely.
- **Right edges of a two-column layout not aligned** because one column has a scrollbar. Use
  `scrollbar-gutter: stable` on scrolling panes.
- **Optical left edge of a heading vs body**, when the heading is a large size with a letter that
  starts with a round or open shape. At 40px+ display type this is visible; at 16px it is not. Only
  fix it above 32px, with a negative margin of 1-2px.
- **The last row of a card touching the border at a different distance than the first row**, from
  `margin-bottom` on the last child. Use `:last-child { margin-bottom: 0 }` or `gap` on the parent.

Prefer `gap` over margins wherever a flex or grid parent exists. Gap cannot collapse, cannot double,
and has no first/last-child exceptions. Most alignment bugs are margin bugs.

### Decision: how do I pace a long page?

Marketing pages and long docs need a rhythm the reader can feel. Measured section padding:

- Apple: `--global-section-aap-padding: 196px`; observed 144px vertical padding across 18 elements
- Raycast: `--spacing-12: 168px`, `--spacing-13: 224px`; observed 224px padding x15, 50px x25
- Mercury: `--layout-padding-xl: var(--spacing-144)`, `--gap-3xl: var(--spacing-128)`; observed 112px and 128px padding
- Linear: 32px dominant inner padding with 64px+ between sections
- Product UI (Grafana, GitHub, Vercel docs): nothing above 48px anywhere

So: **marketing sections are 96-224px apart; product sections are 24-48px apart.** That is a 4x
difference, and applying marketing spacing to a product screen is the single biggest cause of a
dashboard that feels empty.

Vary the section rhythm rather than repeating one value. A useful pattern from the Apple page: a
dense section (144px padding), a full-bleed media break (0 padding, the image does the spacing work),
then a dense section again. Alternating the *type* of gap, not just its size, is what stops a long
page from feeling like a scroll through a spreadsheet.

---

## When this advice is wrong

- **4px base, on a native mobile target.** If you are shipping React Native or handing specs to iOS
  and Android engineers, an 8pt base with 4pt half-steps aligns with the platform grids and the
  design tooling. Use 8.
- **Sidebar rows at 28-36px, on a touch-first product.** 28px is unhittable with a thumb. Consumer
  mobile, kiosks, in-car, anything used with gloves: 44-48px minimum, and that is a floor not a
  target. The density argument applies only to pointer-driven, expert-user, long-session software.
- **Prose at 65-75ch, for a reference table.** If the reader is scanning for a symbol, wider is faster
  and smaller type is better. Stripe's 14px API reference is not a downgrade from their 16px guides;
  it is a different reading task correctly served.
- **"Never nest a card," when rendering a nested object.** A comment thread with replies, a file tree
  with folders, a kanban card that contains sub-tasks: these are genuinely nested *objects* and one
  level of visual nesting is honest. Use indentation plus a background shift, not two full card
  treatments, and stop at one level.
- **"Cap the content width," for tables and dashboards.** A data table wants every pixel. Full-bleed
  is right and centering it in a 1200px column is actively harmful.
- **Container queries, for page layout.** Media queries are correct for the shell. Do not "modernize."
- **The 2-3x hierarchy ratio, in an extremely dense UI.** In a spreadsheet, a code editor gutter, or a
  trading terminal, everything is one tier and the grouping comes from rules, color and alignment
  instead. A 3x gap in a 20px-row table would waste a screen of rows.
- **Generous whitespace, when the user's job is comparison.** If the user must compare row 4 to row 30,
  every pixel of padding is a pixel of comparison they cannot do. Density is a feature there.

---

## Anti-patterns: what generated UI does here

### 1. Card overuse: everything is wrapped in a rounded box

**What it looks like:** every heading-plus-content group becomes `<Card>`, the page becomes a stack of
6 to 10 white rounded rectangles on a gray background, and nothing has hierarchy because everything has
the same treatment.

**Why it happens:** a card is a safe, self-terminating container. It removes the need to decide how
much space goes between things, because the border does the separating. It is the visual equivalent of
wrapping every function in a try/catch.

**The correction, in order:** delete the card and see if the layout still reads. It usually does,
because the heading and the spacing were already doing the work. If it does not, escalate one level:
space (24px between groups, 8px within), then a 1px rule between repeated items, then a background
shift for a functionally different region. Reach for a card **only when the region is independently
actionable**: you can click it, drag it, dismiss it, or it represents one record in a set.

Concrete test: GitHub's next.js repo page has 6 card-like surfaces across an enormously dense page,
and the entire right-hand About column (description, topics, license, stars, forks, releases,
contributors, languages) has **no container at all**. It is headings and spacing. That is the target.

### 2. Nested cards

**What it looks like:** a `<Card>` with `<CardContent>` that contains three more `<Card>` components,
each with its own border, radius and shadow. Three concentric rounded rectangles, each inset 24px.

**Why it happens:** the component library exports `Card` and it composes, so it gets composed.

**The correction:** maximum surface depth is 2. Inside a panel, separate children with a 1px rule, a
background shift on one sub-region, or spacing. Measured: 4 of the 5 real products checked have zero
nested cards; the fifth's nesting is a rendered screenshot of an app, not content.

The tell to grep for in your own output: a `border-radius` inside another element that has a
`border-radius` and its own background. If the inner radius is smaller than the outer radius minus the
padding, it will also look geometrically wrong (concentric radii must satisfy
`inner = outer - padding` to look right).

### 3. Everything is 24px padding

**What it looks like:** `p-6` on every container. Card padding 24, section padding 24, page gutter 24,
gap between cards 24. The page is flat: no element is more or less important than any other, and the
eye has nowhere to land.

**Why it happens:** 24px is the safe middle. It is never obviously wrong on any single element, so it
gets applied to all of them, and the result is wrong at the page level.

**The correction:** padding should scale with the surface's size and importance. Measured real values
on one page each:

- Grafana panel (dense data, small surface): **8px**
- Notion chip (small): **16px**; Notion topic tile (medium, feature): **24px**
- Vercel docs link card (medium, prominent): **24px**
- Apple marketing section (large): **144px**

Use at least three distinct padding values per screen. A useful heuristic: a surface's padding is
roughly its shortest dimension / 12, clamped to the ramp. A 100px-tall panel gets 8px, a 200px card
gets 16px, a 400px hero panel gets 32px.

### 4. Uniform gaps everywhere

**What it looks like:** `space-y-4` on the page, `space-y-4` inside each section, `gap-4` in every
flex row. Every relationship in the interface is the same distance, so the interface has one flat
level of structure.

**The correction:** three tiers minimum on any real screen, each 2-3x the last (8 / 24 / 64). Then
verify by squinting: you should see distinct blocks, not an even texture.

### 5. Too much whitespace pretending to be design

**What it looks like:** a dashboard with 6 stat cards at 48px padding, 32px gaps, on a 1440px-wide
page that shows 30% as much information as it should, and requires scrolling for data that would fit.

**Why it happens:** "whitespace" is the most repeated piece of design advice in existence and it is
almost always given to people whose problem is the opposite. Airy layouts are also easier: fewer
adjacency decisions to get right.

**The correction:** whitespace is a *contrast* mechanism, not a quality mechanism. Its value comes
entirely from being unevenly distributed. 200px of margin around a page where everything inside is
evenly spaced communicates nothing. 8px between rows and 64px above the section heading communicates
grouping instantly. **Ask what the user is doing 6 hours a day, and give the thing they scan the most
the least padding.**

Diagnostic: count the information units visible in one 1440x900 viewport of your output, and compare
it against the equivalent screen in the reference table. If a Grafana dashboard shows 10 panels and
yours shows 4, you are 60% too airy, and no amount of shadow refinement will fix that.

### 6. `flex: 1` with no max-width

**What it looks like:** content that stretches to 1400px of 16px prose on a wide monitor, 180
characters per line, unreadable.

**The correction:** any element containing running prose gets a `max-width` in the 60-86ch band. The
shell is fluid; the text is not.

### 7. Dividers instead of spacing

**What it looks like:** every list item has `border-bottom`, every section has an `<hr>`, and the page
is a ladder. The dividers are compensating for gaps that are all equal.

**The correction:** fix the gaps first. Then keep the divider only in repeating scannable lists where
the row boundary genuinely matters (a table, a settings list, a transaction log). One divider style
per page, at `1px` and roughly 8-12% opacity of the foreground color, not a solid gray.

---

## Self-check

Run this against your own output before shipping. Any "no" is a bug.

1. Is every spacing value in the file drawn from the token ramp? Grep for `px` and count the distinct
   values. More than 12 means the system is not real.
2. Do I have at least **three distinct gap sizes** on this screen, at roughly 1x / 3x / 8x?
3. Is the gap above every heading **at least 2x** the gap below it?
4. Count the card-like surfaces (fill or border, plus radius). Is it fewer than 8? Is the nesting
   depth **0** or **1**, never 2?
5. Does every prose block have a `max-width`, and is it between 45ch and 86ch for its reading task?
6. Are the page gutters 16-28px at 390px wide?
7. Do the heading, the body, and the content below all share one left edge?
8. Are sidebar rows 28-36px (pointer product) or 44px+ (touch product), and did I choose deliberately?
9. Is the hover state on list rows a background fill with **no size or position change**?
10. Screenshot it at 1440 and at 390 and look. Count the information units in one viewport. Compare
    against the closest row in the measured table above. Am I within 30% of that density?
11. Squint at the screenshot until the text is illegible. Do distinct blocks appear, or an even
    texture? Even texture means the spacing carries no information.
12. Is there a single `flex: 1` on a text container without a `max-width`?

---

## Provenance

Values measured 2026-09-09 via Playwright at 1440x1000 and 390x844 against:
linear.app, docs.stripe.com (guides + API reference), vercel.com/docs, tailwindcss.com/docs,
github.com, supabase.com/docs, polaris.shopify.com, notion.com/help, figma.com, atlassian.design,
raycast.com, mercury.com, radix-ui.com/themes, ui.shadcn.com, play.grafana.org, apple.com.
Token ramps are read from shipped CSS custom properties; widths, gaps and row heights from computed
styles and bounding boxes; `ch` values from a 100ch probe element in the measured element's own font.
