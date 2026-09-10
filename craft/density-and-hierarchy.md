# Information density and hierarchy

**Evaluated:** 2026-09 · All values below were read out of live products with Playwright (computed
styles, CSS custom properties, `getBoundingClientRect`) or measured off 1440×900 renders at 2× and
converted back to CSS pixels. Values are exact unless marked *approx*. Nothing here is recalled.

This is the single most-botched dimension in AI-generated UI. Not color, not typography, not
motion — **scale**. The generated interface is a correct layout at the wrong size, roughly 30–40%
too large and too airy for what the user is actually doing. The rest of this file is a calibration
system: pick a target, apply the levers in order, check against measured reference values.

---

## If you only apply five things

1. **Pick the density target before writing any CSS, from usage frequency.** Glance (seconds, once
   a day) → 48–56px rows / 15–16px text. Scan (a minute, several times a day) → 36–44px rows /
   14px text. Work (hours a day, hundreds of operations) → 28–40px rows / 13–14px text. Write the
   target into the file as a comment. You will otherwise drift to "glance" by default.
2. **Row text is 14px, not 16px. Exactly once.** Every dense product measured — GitHub 14px/21,
   Attio 14px/20, Yahoo Finance 14px/17.5, Grafana 14px/22, Stripe's API reference 14px/22.4 —
   converges on 14px, and Linear goes to 13px/19.5. `text-base` (16px) is a reading size, not a UI
   size. Drop to 14 once, then never shrink type again; take every further gain from padding.
3. **Get density from vertical padding and removed chrome, never from more font shrinking.**
   Row height = tallest inline object + 2× vertical padding. Dense products run 8–10px vertical
   padding. `py-4` (16px) is the single most common cause of a 52px row that should be 36px.
4. **One filled button per view. Everything else is ghost or text.** The primary action wins by
   being the only filled thing on screen, at the *same height* as its neighbors — not by being
   bigger. GitHub's green `Code` button is **32px**, exactly matching the branch selector beside it,
   while `Fork` and `Star` are *smaller* at 28px. The primary is the only saturated control, not the
   biggest one.
5. **Hierarchy order is position → weight → color → size → space. Decoration is not on the list.**
   Inside a dense row, size does nothing: Linear's issue ID and issue title are both 13px, separated
   only by weight (400 vs 510) and color (`#8A8F98` vs `#D0D6E0`). Reach for a badge, a border, or
   an accent color only after those five are exhausted.

---

## Step 0 — choose the density target

Do not start from a component library's defaults. Start from a sentence about the user:

> "A **[role]** opens this **[frequency]** to **[task]**, and typically works through **[N]** items."

Map the answer:

| Usage pattern | Session length | Row height | UI text | Rows visible at 900px | Examples measured |
|---|---|---|---|---|---|
| **Glance** | < 10s, ≤ 1×/day | 48–64px | 15–16px | 6–12 | status pages, receipts, onboarding, notification lists |
| **Scan** | 10–90s, several ×/day | 36–44px | 14px | 14–20 | GitHub file list (41px), Yahoo Finance table (40px), Grafana dashboard list (36px) |
| **Work** | hours, 100s of ops | 28–40px | 13–14px | 20–28 | Linear issue list (40px), Attio records (36px), TradingView ticker rows (30px), Superhuman (21px lines) |

**The fold test — run this instead of guessing.**

```
usable   = viewport_height − (top chrome + toolbar + table header)
visible  = usable / row_height
```

Measured, at a 1440×900 viewport:

- **Linear**: 40px rows (measured). Over a typical app header + filter bar of ~88px (approx), that
  is **~20 rows visible**.
- **shadcn/ui Tasks example** (the closest thing to a canonical AI output, and *tighter* than most):
  **220px** between the top of the panel and the first data row (measured off a 2× render, ±2px) —
  a two-line "Welcome back!" greeting, a filter bar, and a 40px table header — on 49px rows →
  **~11 rows visible**.

That is the entire problem in one number. Same screen, same task shape, **half the information**.
Nine of Linear's twenty rows were spent on a greeting and padding.

**Two corollaries most people get backwards:**

- **Density is a function of N, not of taste.** A list of 5 items gains nothing from 28px rows and
  will look cramped and cheap. Below ~10 items, use comfortable density. Above ~50, every pixel of
  row height costs a scroll.
- **Density is per-surface, not per-product.** Stripe runs 16px prose in its guides and drops the
  API reference to 14px/22.4 because that reader is scanning parameter tables, not reading. Picking
  one body size for a whole product is the mistake, not the inconsistency.

---

## The measured reference table

Everything in this table was read from a live page. `ls` = letter-spacing. Contrast ratios computed
from the measured colors.

### Real products — list and table rows

*Linear and Attio render their app shells as real DOM on their marketing sites, so the computed
values are exact; they are a designed representation of the product, not a logged-in session.
Everything else in this table is the shipped product.*

| Product / surface | Row height | Text | Line-height | ls | Padding | Divider | Notes |
|---|---|---|---|---|---|---|---|
| **Linear** — issue row (app shell rendered in DOM on linear.app, dark) | **40px** | 13px | 19.5px (1.5) | −0.13px | `0 28px 0 36px` | **none** | Title `#D0D6E0` w510; ID `#8A8F98` w400; both 13px |
| **Linear** — sidebar item | **28px** | 13px | 19.5px | −0.13px | 0 | none | Inactive label `#8A8F98` |
| **Linear** — inline label chip | 24px | 12px | 14px | normal | `4px 8px 4px 6px` | none | `border-radius: 9999px`, `#8A8F98` |
| **GitHub** — repo file row | **41px** | 14px | 21px (1.5) | normal | `0 0 0 16px` per cell | 1px `#D1D9E0` (1.43:1) | 3 columns: name / commit msg / date |
| **GitHub** — repo tab (`Code`, `Issues`) | 30px | 14px | 30px | normal | `0 8px` | — | radius 6px; **active = weight 600**, inactive 400 |
| **GitHub** — PR row (2-line) | 63.3px | 16px title w600 + 12px meta | 24px / 18px | normal | — | 1px | Meta line `#59636E` |
| **Attio** — record row (DOM app mock on attio.com, light) | **36px** | 14px | 20px | −0.14px | `0 4px 0 16px`, gap 8px | 1px `#EEEFF1` (1.15:1) | Row text weight **500**, not 400 |
| **Yahoo Finance** — most-active table | **40px** | 14px | 17.5px (1.25) | normal | — | 1px `#DDE0E4` (1.32:1) | All numerics right-aligned |
| **TradingView** — ticker strip row | 30px | 11px | 16px | normal | — | none | weight 700; top toolbar 38px, symbol 14px/18 w600 |
| **Grafana** (play.grafana.org) — dashboard list | 36px | 14px | 22px | **+0.15px** | gap 8px | none | Nav item 32px |
| **Grafana** — left nav item | 32px | 14px | 22px | +0.15px | 0 | none | Text `#CCCCDC` on `#111217` (11.8:1) |
| **Supabase docs** — sidebar link | 18.6px | 13px | 18.57px | normal | 0 | none | weight 450 |
| **Hacker News** — story row | 19px | 13.33px | normal | normal | 0 | none | The floor. Verdana, no chrome at all |
| **Superhuman** (marketing DOM mock) | 21px per line | 14px | 21px | normal | gap 8px | — | Mock, not the shipped app — treat as directional |

### Real products — type and color hierarchy

| Product | Level 1 | Level 2 | Level 3 | Measured contrast |
|---|---|---|---|---|
| **Linear** (dark, bg `#08090A`) | `#F7F8F8` body | `#D0D6E0` row title, w510 | `#8A8F98` ID / meta | 18.7 : 13.6 : **6.13** |
| **GitHub** (light, bg `#FFFFFF`) | `#1F2328` body | `#59636E` muted | — (weight instead) | 15.8 : **6.11** |
| **Attio** (light) | `#242629` | — | — | 15.2 |
| **Stripe API reference** | `#1A2C44`, 14px/22.4 | — | — | 14.1 |

**The number worth memorizing: secondary text sits at ≈6:1 in both themes.** Linear's `#8A8F98`
on near-black is 6.13:1. GitHub's `#59636E` on white is 6.11:1. Two different companies, opposite
themes, the same answer. Compare `text-gray-400` (`#9CA3AF` on white) at **2.54:1** — the value AI
reaches for, which is illegible — and shadcn's `text-muted-foreground` (`#737373`) at 4.74:1, which
is defensible but a full step lighter than either real product.

Note also: **light mode gives you two text levels, dark mode gives you three.** GitHub carries
hierarchy with only `#1F2328` / `#59636E` and then switches to weight; Linear gets a genuine third
level for free because there is more usable range between `#F7F8F8` and `#8A8F98`. If you're in
light mode and reaching for a third gray, use weight 500 instead.

### Framework defaults — the substrate AI composes from

| Source | Element | Measured / derived |
|---|---|---|
| **shadcn/ui** | Button (default) | **32px**, 14px/20, `0 10px`, radius 10px, gap 6px |
| **shadcn/ui** | Input | **32px**, 14px/20, `4px 10px`, radius 10px, 1px border |
| **shadcn/ui** | Table row (Tasks example) | **49px** — 14px/20 text, `p-2` cells, 1px border **per row** |
| **shadcn/ui** | Table header | 40px, 14px, weight 500 |
| **shadcn/ui** | `--border` | `#E5E5E5` → 1.26:1 on white |
| **MUI** | `<TableRow>` default | **53px**, 14px/20.02, ls +0.15px (Roboto) |
| **MUI** | `<Table size="small">` | **33px** |
| **MUI** | DataGrid row | 52px (`min-height: 52px`) |
| **Ant Design** | Table row default | **55px**, 14px/22, cell padding 16px |
| **Tailwind** (arithmetic) | `text-base` / `p-6` / `py-4` / `gap-6` / `rounded-xl` / `h-11` | 16px/24 · 24px · 16px · 24px · 12px · 44px |

shadcn's own primitives are fine — a 32px button is a *dense* button. The damage is done by what
gets written around them: `p-6` wrappers, `space-y-6`, `text-base`, `h-11` overrides, and a
`<Card>` around every list item.

---

## The correction table

Apply directly. "AI default" is the value produced by the Tailwind/shadcn utilities models actually
reach for, or the measured library default where one exists.

| Element | AI default | → Comfortable (scan) | → Compact (work) |
|---|---|---|---|
| Table / list row height | 48–56px (`py-4` + 16px text) | **40px** | **32px** |
| Row text | 16px / 24px | **14px / 20px** | **13px / 18px** |
| Cell padding (vertical) | 16px | **10px** | **8px** |
| Cell padding (horizontal) | 24px | **16px** | **12px** |
| Sidebar / nav item | 44–48px | **32px** | **28px** |
| Button height | 40–44px (`h-10`/`h-11`) | **32px** | **28px** |
| Input height | 40–44px | **32px** | **28px** |
| Toolbar / page header | 64–80px | **48px** | **40px** |
| Card / panel padding | 24px (`p-6`) | **16px** | **12px** |
| Gap *within* a group | 16–24px (`gap-4`/`gap-6`) | **8px** | **6px** |
| Gap *between* groups | 32px | **16px** | **12px** |
| Gap between page sections | 48–64px | **32px** | **24px** |
| Page gutter | 32–48px | **24px** | **16px** |
| Border radius (on ≤40px elements) | 12px (`rounded-xl`) | **8px** | **6px** |
| Row dividers | 1px on every row | 1px between **groups** only | **none** |
| Secondary text color | `gray-400` (2.5:1) | **≈6:1** (`#59636E` / `#8A8F98`) | same |
| Section label | 20–24px semibold | 13px weight 600 | 11–12px, uppercase, `#8A8F98`, ls +0.04em |
| KPI / stat block | 3-col grid of 120px cards | 56px strip of label/value pairs | 40px strip |

**Radius rule that keeps things from looking inflated:** radius ≤ ⅓ of the element's height. 6px on
a 30px control (GitHub's tabs), 8px on a 32–40px control, 12px only on surfaces ≥ 64px. Or go fully
round — Linear's 24px chip uses `9999px`. `rounded-xl` on a 32px button is the single most reliable
visual tell of generated UI.

---

## The levers, in order of impact

Ordered by pixels recovered per unit of legibility risk. Work top-down and stop when you hit the
target; do not skip ahead.

**1. Chrome and wrapper nesting.** Free, and usually the biggest single win. Delete: the greeting
block above the data, the `<Card>` wrapping a table that already has a border, the breadcrumb that
repeats the page title, the empty-state illustration on a populated view, the description under
every section header. shadcn's Tasks example loses **220px** — five Linear rows — to a two-line
greeting, a filter bar, and a header. Put the page title *inline* in a 40–48px toolbar with its
actions, not stacked above them.

**2. Vertical padding on rows and controls.** The continuous lever. `py-4` → `py-2` on a 20px line
takes a row from 52px to 36px, a 31% gain, with zero effect on readability. Remember: **row height
is set by the tallest inline object, not the text.** Linear fits a 24px chip inside a 40px row
(8px above and below). If your rows are 49px with 20px text, an oversized badge or avatar is the
cause and shrinking the padding will not fix it.

**3. Line-height on single-line UI text.** 1.5 is a *reading* value. Single-line row text works at
1.3–1.4: Yahoo Finance runs 14px/17.5 (1.25), Attio 14px/20 (1.43), Linear 13px/19.5 (1.5). Never
touch line-height on multi-line prose — Stripe keeps 1.6 even in its dense API reference.

**4. Gaps — collapse to three values.** Most generated UI uses one gap (24px) everywhere, which
destroys grouping: everything is equally far from everything. Use exactly three: **within a group /
between groups / between sections** = 8 / 16 / 32 (comfortable) or 6 / 12 / 24 (compact). Spacing
is a hierarchy signal; spending it uniformly wastes it.

**5. Font size — one step, once.** 16 → 14. That is the whole move. 14 → 13 only for a
work-all-day surface where the user has been trained. Below 13px you are trading legibility for
rows and you will lose that trade in every context except a ticker strip.

**6. Border weight and count.** Not weight — **count**. Real dense products keep divider contrast at
1.15–1.43:1 (Attio `#EEEFF1`, Yahoo `#DDE0E4`, GitHub `#D1D9E0`), so the color is rarely the
problem. Twenty-five 1px lines across a viewport is. **Single-line rows ≤40px need no dividers at
all** — Linear ships zero. Add dividers only when rows are multi-line and a reader could confuse
which line belongs to which record (GitHub's file rows have them; its 2-line PR rows need them).

**7. Radius.** Last and smallest, but it is a strong *perceptual* density signal: large radii read
as "consumer" and inflate apparent size. See the ⅓ rule above.

---

## Comfortable and compact modes

Ship both when: rows exceed ~30 in normal use, **and** the same view is used by both power users and
occasional users, **and** the surface is desktop-first. That is roughly issue trackers, CRMs, admin
consoles, log/observability views, and mail. It is not most products.

Implementation that doesn't rot:

```css
:root { --row-h: 40px; --row-py: 10px; --ui-size: 14px; --ui-lh: 20px; --gap-in: 8px; --gap-out: 16px; }
[data-density="compact"] { --row-h: 32px; --row-py: 8px;  --ui-size: 13px; --ui-lh: 18px; --gap-in: 6px; --gap-out: 12px; }
```

Rules that make the second mode worth its cost:

- **Six tokens, not two stylesheets.** If compact mode requires touching components, it will drift.
- **Compact changes spacing and type size only.** Never hide columns, never change interaction
  targets, never reflow. A user toggling density is changing their glasses, not their app.
- **Compact is desktop-only.** Below the touch breakpoint, force comfortable — 32px rows are below
  the 44px minimum touch target and no amount of density is worth a mis-tap.
- **Persist it per user, and do not auto-detect it.** Guessing from viewport width gets laptops
  wrong.

Do not ship both when your list is under ~20 items, when the product is used a few times a month, or
when you have not yet made comfortable mode good. A bad layout at two densities is two bad layouts.

---

## Scannability

**The F-pattern is real for prose and mostly wrong for lists.** It comes from eyetracking of
text-heavy pages, where the reader doesn't know where anything is. In a table of uniform rows, the
eye does something else entirely: it runs **vertically down one column** — the one carrying the
identifier — and only breaks horizontally when a row becomes a candidate. Design for that:

- **One identifying column, first, left-aligned, at a fixed x for every row.** GitHub's file names
  all begin at the same offset behind a fixed 16px icon. Linear's issue IDs sit behind a
  fixed-width 16px priority slot at a constant 36px left padding. Nothing in a scannable list
  should be indented by content — no variable-width leading icon, no nesting that shifts text.
- **Numbers right-aligned, in tabular figures.** Every numeric column in Yahoo Finance and
  TradingView is right-aligned, which is what makes magnitudes comparable down the column
  (`148.171M` over `96.066M` aligns on the M). Left-aligned numbers in a table are a bug.
- **Center exactly nothing** except a single icon inside a fixed-width column, or one focal element
  on an empty state. Centered text has no stable left edge, which means every line costs a
  re-acquisition. This is why left-aligned form labels beat centered ones in dense UI — one edge to
  follow down the whole form — and why centered card content in a grid reads as slower even when it
  looks tidier.
- **Right-align the low-value trailing column** (age, count, size) and dim it. GitHub puts
  `yesterday` / `5 months ago` hard right in muted gray; Linear puts `Oct 6` at 12px `#8A8F98`.
  This creates a second, weaker vertical edge the eye can use without competing with the first.
- **Keep the identifier column narrow.** Truncate with ellipsis rather than wrapping. A row that can
  become two rows breaks the vertical rhythm that makes the column scannable at all.

---

## Hierarchy without decoration

Preference order. Exhaust each before moving down.

**1. Position.** First and leftmost is primary. This is free and no one can miss it. If the most
important thing on the screen is not in the first 200px of the reading order, no amount of styling
fixes it.

**2. Weight.** 400 → 500/600 is one clean step and costs zero space. GitHub's active repo tab is
weight **600** against 400 siblings, with a 2px underline; it does not change color. Attio sets
*all* row text to weight 500 in light mode, using 400 only for de-emphasis. Dark UIs need slightly
more weight than light ones for the same perceived strength — Linear's row titles run 510, not 400
— because light text on a dark ground blooms.

**3. Color / value.** Two or three levels, at the ratios measured above: ~15:1, ~6:1, and (dark
only) something between. Color as *hierarchy* means lightness, not hue. Hue is for state.

**4. Size.** Works **across** levels (page title 20–24px vs. row text 14px), does nothing **within**
a row. Linear's ID and title are both 13px. A 1–2px difference inside a row is invisible and just
breaks alignment. If you're tempted to make one thing in a row 15px, you actually want weight.

**5. Space.** Grouping, via the three-value gap system. Space says "these belong together"; it is
weak at saying "this one matters more."

**Not on the list, and why AI reaches for them first:** background fills, borders, badges, colored
pills, icons, shadows, accent colors. They're the most *visible* difference in a diff and the
easiest to specify in a sentence, so a model that is optimizing for "make the hierarchy clearer"
adds a colored badge. But every badge is a second object competing for the row's height budget, and
a screen with six accent colors has no accent at all. Rule: **a decoration must encode information
that the five levers above cannot** — a status dot encodes an enum, so it earns its place; a
purple gradient on the section header encodes nothing.

### The 3-level rule

**Any single visual region gets at most three levels of text treatment.** Not three per page —
three per region. A row has: primary (the thing you're looking for), secondary (context you'd read
if the row is a candidate), tertiary (metadata you'd notice but not read). Linear's issue row is
exactly this and nothing more:

```
[16px icon] ENG-2076   [16px icon] Reduce ETA jitter      #55423  Performance  Working…  Oct 6
             13/400/#8A8F98          13/510/#D0D6E0        ← all 12px/510/#8A8F98, chips →
```

Three treatments, two font sizes, one weight change, one color change, zero borders, zero fills. If
you need a fourth level, you have two regions, and you should separate them with space or move one
out of the row.

---

## Making the primary action obvious without shouting

Measured pattern, consistent across every product examined: **the primary action is the only filled
element on the screen, and it is the same size as everything next to it.**

- GitHub: `Code` is filled green (`#1F883D`, white text, radius 6px, padding `0 12px`, 14px/400) at
  **32px** — the same height as the `canary` branch selector next to it. `Fork`, `Star` and
  `Notifications` are 28px, 12px/500, on `#F6F8FA` with a 1px `#D1D9E0` border. The primary is not
  the biggest control on the page; it is the only saturated one.
- Attio: `Start for free` is filled near-black; `Talk to sales` is transparent with a border; same
  height, adjacent.
- shadcn's own hero: `Get Started` filled black, `View Components` filled light gray — and this is
  the weaker pattern, because two fills at different strengths make the reader compare rather than
  choose. Make the secondary ghost, not "lighter filled."

Rules:

- **One fill per view.** If a page has two filled buttons, one of them is not primary.
- **Do not scale the primary up.** A 44px primary next to 32px secondaries reads as an ad. Fill is
  already a 10× signal; size on top of it is shouting.
- **Position beats size too.** Bottom-right in a dialog, top-right in a toolbar, end of the form —
  the conventional slot is worth more than any amount of styling.
- **The primary in a *destructive* dialog is the destructive button**, and it is the only red on
  screen. Red as a fill is a once-per-screen resource.

---

## The quiet-action problem

Destructive and rare actions must be **findable in under three seconds by someone looking for
them**, and **invisible to someone who isn't**. The pattern, as shipped:

1. **Per-row destructive actions live behind a `···` overflow at the far right of the row**,
   after the low-value trailing column. Verified on GitHub, on Linear's issue header, in
   TradingView's watchlist header, and in the shadcn Tasks table. Right edge = "actions on this
   object"; it's a learned location.
2. **Inside the menu: last item, after a separator, red text on a transparent background.** Not a
   filled red menu item — a filled red row inside a neutral menu drags the eye to exactly the thing
   you don't want mis-clicked.
3. **The confirmation dialog is where red becomes a fill**, and it should require typing the object
   name only when the action is unrecoverable and cross-user. A "type DELETE to confirm" gate on a
   reversible single-user action is theater and trains people to type it without reading.
4. **Group account-level destructive settings into their own bordered region at the bottom of the
   page**, below everything else, with its own heading. The border is doing real work here: it says
   "different rules apply inside."
5. **Never put a destructive action adjacent to a frequent one at the same visual weight.** Delete
   next to Duplicate, both as plain menu items, is a mis-click generator. Separator, or distance.

The hover-reveal caveat: an overflow menu that only appears on `:hover` is invisible to touch and to
keyboard. Reveal on `:hover, :focus-within` — and on touch, show it always.

---

## Progressive disclosure

**What to hide:** per-row actions (behind `···`), filters beyond the two most used (behind "More
filters"), advanced settings (behind a disclosure at the bottom, never a separate page), long
enumerations (behind "+4 more"), bulk operations (until something is selected), and secondary
metadata that is identical on most rows.

**What hiding costs, and why the cost is usually underestimated:**

- One interaction, every time, forever. If 40% of sessions need the hidden thing, it isn't secondary.
- Discoverability. Anything only reachable through hover is undiscoverable to a large fraction of
  users and unreachable by keyboard unless you handle `:focus-within`.
- Searchability. Hidden text is often not in the DOM, so `⌘F` misses it. That surprises people badly
  in reference and settings UI.
- Truthfulness. A collapsed section with a count (`Labels · 4`) is disclosure. One without a count
  is concealment, and the user cannot tell whether opening it is worth the click. **Always show the
  count on a collapsed group.**

**The inversion worth internalizing: progressive disclosure is the tax you pay for low density.**
GitHub shows the filename, the full commit message, *and* the relative date in a 41px row — three
fields, no disclosure needed. At 56px rows with 16px text, that third column doesn't fit, and now
you need a hover card. Getting the density right removes the need for most of the hiding you were
about to design.

---

## When this advice is wrong

- **Consumer onboarding, signup, checkout, first-run, and any flow with a novice under pressure.**
  Use glance density: 48–56px controls, 16px text, one decision per screen. The density that makes
  Linear fast makes a tax form unusable. This is the most common misapplication of everything above.
- **Touch-primary surfaces.** 44px minimum interactive height, full stop. Compact mode is a desktop
  feature. If your product is mobile-first, most of this file applies only to your admin console.
- **Low-vision users and OS text scaling.** If you set 13px in `px`, it will not scale with the
  user's browser font-size setting. In products with a general audience, set text in `rem` and let
  the 13px be *your* default rather than a hard cap. In a professional tool with a trained user
  base, px is defensible.
- **Prose. Always.** 15–16px at 1.5–1.7, 60–75 characters. Stripe's *dense* API reference still
  runs 14px/22.4 (1.6). Nothing in the "compact" column applies to a paragraph a human reads
  end-to-end.
- **Marketing and landing pages.** Density is a liability; a hero exists to carry one idea. Linear's
  own homepage runs a 64px/64px headline (weight 510, ls −1.408px) directly above a screenshot of
  its 40px-row, 13px-text app. Same company, 5× the type scale, one page apart.
- **High-consequence, low-frequency rows** — medical orders, legal filings, wire approvals, prod
  deploys. Add space, add confirmation, add a second read of the critical field. Speed is not the
  goal when the error is unrecoverable.
- **"Always use an 8px grid."** Wrong at this scale. Real dense products use 4px increments freely
  (Linear's 28px sidebar rows, GitHub's 30px tabs, Attio's 36px rows, MUI's 33px dense row) and
  non-grid values where optical alignment demands it (Yahoo's 17.5px line-height, Linear's 19.5px).
  The 8px grid is a coordination tool for large teams, not a law of perception. Use 4px steps below
  48px and 8px steps above.
- **"Always use Inter."** Inter ships with *positive* default tracking, which Grafana keeps
  (+0.15px at 14px) and Linear overrides (−0.13px at 13px). At small sizes in a dense list, the
  negative tracking is measurably tighter and reads better; at 11–12px, positive tracking helps.
  Set tracking deliberately per size instead of accepting the font's default.
- **"Animate the hover state."** Measured on GitHub, shadcn, and Linear: hovering a row changes the
  **background color only**. Height, border, box-shadow, and transform were byte-identical before
  and after. Sweeping a cursor down 30 rows with a `translate-y` or `shadow-lg` on hover produces a
  twitching list. Background-only, ≤150ms, or nothing.

---

## Anti-patterns in AI-generated UI, with the correction

| # | What generated UI does | Why it happens | Correction |
|---|---|---|---|
| 1 | Every list item is a `<Card>` with `p-6` | "Card" is the most-represented container in training data | Homogeneous lists are **rows**, not cards. Cards are for 3–9 heterogeneous objects. Never nest a card in a card |
| 2 | `p-6` (24px) on every container | It's the shadcn Card default and looks safe | 12–16px inside dense panels; 24px only on the outermost page gutter |
| 3 | `text-base` (16px) for row and label text | `text-base` sounds like "the default" | 14px for UI text, 13px for work-all-day. 16px is a prose size |
| 4 | `gap-6` / `space-y-6` between everything | One spacing value is easier to write | Exactly three gaps: 8 / 16 / 32 (or 6 / 12 / 24). Uniform spacing destroys grouping |
| 5 | Border on every row + on the table + on the wrapping card | Borders make structure legible in a diff | One border total. Single-line rows ≤40px need **zero** dividers (Linear ships none) |
| 6 | A colored pill for every enum value | Badges read as "polished" | 8px status dot + plain text. Reserve the filled pill for the one status that changes behavior |
| 7 | `h-11` / `h-12` buttons and inputs (44–48px) | Touch-target advice applied to desktop | 32px on desktop (shadcn's own default), 28px compact, 44px only on touch |
| 8 | `rounded-xl` (12px) on 32px controls | Large radii read as "modern" | Radius ≤ ⅓ of height: 6px at 30px, 8px at 32–40px, 12px at ≥64px, or fully round |
| 9 | `text-gray-400` for secondary text | Looks appropriately "muted" | 2.54:1 is unreadable. Target ≈6:1 — `#59636E` on white, `#8A8F98` on near-black |
| 10 | A centered "Welcome back!" + subtitle above the data | Dashboards in training data start with a greeting | Page title goes **inline** in a 40–48px toolbar with the actions. That block costs ~180px = 4½ rows |
| 11 | Hover: `hover:shadow-lg hover:-translate-y-0.5` | Motion signals interactivity | Background change only. Measured: GitHub, shadcn, and Linear all change nothing but `background-color` |
| 12 | Two-line rows where line 2 is boilerplate | More information looks more useful | One line. Move the second field to a right-aligned column and dim it |
| 13 | KPI cards in a 3-column grid, 120px each | "Dashboard" implies stat cards | A 40–56px strip of label/value pairs. Four numbers do not need 360px of vertical space |
| 14 | `min-h-screen flex items-center justify-center` on an app page | Centering is the landing-page reflex | Application content starts at the top-left. Centering is for empty states and single-message dialogs |
| 15 | Six accent colors on one screen (green/blue/amber/purple/red) | Each state got its own color, independently | One accent, used rarely. Hue is for state that changes behavior; hierarchy comes from lightness |
| 16 | Icon + label + description on every sidebar item | Nav items look "explained" | Label only, 28–32px rows. If the label needs a description, the label is wrong |
| 17 | `size="lg"` on the primary and `size="default"` on the secondary | Bigger = more primary | Same height. Fill vs. ghost is the entire signal |
| 18 | Uniform `text-sm text-muted-foreground` on every non-title element | One "muted" token applied everywhere | Three levels, deliberately assigned. If everything is secondary, nothing is |

---

## Self-check

Run this against your own output before calling it done. Screenshot at 1440×900 and **look at it** —
none of these are answerable from the JSX.

1. Can I state the density target in one sentence — glance, scan, or work — and does the row height
   match the table above?
2. How many rows are visible above the fold at 900px? Under 14 on a scan/work surface means go back
   to lever 1 or 2.
3. How many CSS pixels sit between the top of the content panel and the first row of real data?
   Over ~120px on a data surface is chrome you should delete.
4. What is the computed font-size of my row text? If it is 16px on a scan or work surface, fix that
   first.
5. How many distinct gap values are in this file? More than four means spacing carries no grouping
   information.
6. Count the horizontal lines across one screen. Over ~6 on a single-line list means drop the row
   dividers.
7. Sample the secondary text color and compute its contrast against the background. Under 4.5:1 is
   a bug; ~6:1 is the target; over 10:1 means it isn't actually secondary.
8. How many filled buttons are visible? More than one means the primary isn't primary.
9. In a single row, does hierarchy come from weight and color, or did I change the font size? Two
   sizes inside one row is a smell.
10. Hover a row and diff the computed styles. If anything other than `background-color` changed,
    remove it.
11. Where is the destructive action, and could someone hit it by accident while doing the frequent
    action next to it?
12. Is anything reachable *only* by hover? If so, does it also appear on `:focus-within`, and is it
    always visible on touch?
13. At 390px wide, are all interactive rows ≥44px? Compact mode must not survive the touch
    breakpoint.
