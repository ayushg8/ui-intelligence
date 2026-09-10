# 5 — Build: structure before surface

The order in which you build determines what you end up with. Agents (and junior engineers) build
components first, assemble them into a page, and then discover the page has no hierarchy — at which
point the only available fixes are surface fixes: more color, bigger shadows, another card. That is
how generated UI happens.

**Build the page's structure first, with real content, in grayscale. Then style it.**

---

## The order

### 1. Content first, in a flat list

Before any layout, write down what is actually on this screen — the real strings, the real numbers,
the real object names from the domain. Not "Card Title" and "Lorem ipsum". If you don't have real
data, invent *plausible domain data*: real-looking shipment IDs, real carrier names, realistic
dollar amounts with realistic distributions (not five rows all at `$1,234.56`).

This matters more than it sounds. Layout decisions are responses to content, and fake content is
uniform in a way real content never is: real titles vary from 4 to 90 characters, real lists have
one item some days and 4,000 on others, real names include `Ng` and
`van der Waals-Fitzgerald III`, real numbers include `0`, `-$1,204,388.02` and `null`.
An interface designed against uniform fake content breaks the moment it meets the product.

### 2. Rank it

Order that list by importance to the user's primary verb. Then commit to **three levels** —
primary, secondary, tertiary — and no more. If everything is level one, the page has no hierarchy;
if there are six levels, nobody can perceive them.

Now assign the levels to visual properties, in this priority:

1. **Position** — top-left and above the fold beats everything else.
2. **Size** — the primary object should be visibly larger or occupy more area.
3. **Weight** — 600 vs 400 does a lot of work and costs nothing.
4. **Space** — isolation creates emphasis. A heading with 32px above and 8px below is bound to what
   follows; the same heading with 20px on both sides floats.
5. **Color** — only after the above are exhausted, and only the accent, once.

Decoration — borders, cards, shadows, backgrounds — is not on this list. It is what you reach for
when the first four failed, and reaching for it first is the defining move of generated UI.

### 3. Build the shell in grayscale

Lay out the page with real content, real proportions, no color beyond the neutral ramp, no radius,
no shadows. Screenshot it and look. **If the hierarchy doesn't work in grayscale, it doesn't work.**
Color will disguise the problem well enough to fool you and not well enough to fool a user.

This is a 10-minute step that catches the majority of structural errors.

### 4. Then surface

Now apply tokens: type scale, the accent where the direction spec permits, borders, radius,
elevation. Because the structure already works, the surface pass is quick and restrained — you are
not using style to compensate for anything.

### 5. Then states, then motion

States before motion, always. → [`6-states.md`](6-states.md), [`../craft/motion-craft.md`](../craft/motion-craft.md)

---

## Layout rules that hold across products

**Grouping is spacing, not boxes.** Proximity is the strongest grouping signal humans have. Two
items 8px apart with 32px to the next group are unambiguously grouped — no border required. Reach
for a boundary only when the group must be independently actionable, draggable, or is one of many
identical peers that need edges to be countable.

**Alignment is not optional and is mostly free.** Every element should align to something. The
small misalignments — a label 2px off its input, a right rail that doesn't share the content's
baseline, an icon that isn't optically centered — are individually invisible and collectively read
as "unfinished". Scan the left edge of your screenshot; everything should stack on a small number
of x-positions.

**Optical beats mathematical.** A centered triangle glyph in a play button is mathematically
centered and looks left-heavy; nudge it. A capital letter next to a lowercase one may need a
half-pixel. An icon at 16px next to 14px text usually wants to be 15px or nudged up 0.5px. Trust
your eyes over the computed value.

**One max-width per content type, not per component.** Prose ~65–75ch. Forms ~480–640px. Settings
~720px. Dashboards full width with page gutters. Marketing content 1120–1280px with occasional
full-bleed. Decide these once.

**Full-bleed must be earned.** A section that breaks the container should be doing something the
container prevents — an image, a chart, a table that needs the width. Full-bleed as decoration is
just an inconsistent page.

**Don't nest.** Card in a card in a tab in a panel is four boundaries around one piece of content.
Each nesting level should be justified out loud. Two is usually the limit.

---

## Component craft

**Compose, don't configure.** A `<Button variant size loading icon iconPosition fullWidth rounded>`
with nine booleans is a design system that has stopped making decisions. Prefer a small set of
composed parts. When a component grows a boolean for every visual variation, the variations
themselves are the problem.

**Make the primitive first.** Build `Button`, `Input`, `Field`, `Stack` and `Text` against your
tokens before building features. Everything downstream inherits their quality, and it forces the
token system to be real.

**A component owns its internals, never its outer spacing.** Margins that leak out of components
make layout unpredictable. The parent decides gaps (`gap`, not `margin-bottom` on children).

**Icons carry meaning or they're removed.** An icon next to every label is decoration and adds
scan cost. Use icons where they aid recognition (status, file type, action in a toolbar) and
where the same icon means the same thing everywhere. One icon set, one weight, one size logic,
optically aligned to the text baseline — never `align-items: center` on a 16px icon next to 13px
text and hope.

**No hover-only affordances.** Anything discoverable only on hover is invisible on touch and to
keyboard users. Row actions can *emphasize* on hover, but must be reachable on focus and present
(even if quiet) on touch.

---

## Writing the CSS

- **Every value comes from a token.** If you type `padding: 13px`, either 13 belongs in the scale
  or the layout is wrong.
- **Logical properties** (`padding-inline`, `margin-block`, `inset-inline-start`) — free RTL support.
- **`gap` over margins** for spacing between siblings.
- **Container queries over media queries** for components. A card should respond to its container,
  not the viewport; that's what makes it reusable in a sidebar and in a full-width grid.
- **Don't fight the cascade with `!important`.** It means a specificity problem you should fix.
- **`:focus-visible`, not `:focus`,** so mouse clicks don't show rings but keyboards do.
- **Transition specific properties**, never `all` — `transition: all` animates layout properties
  you didn't intend and costs frames.
- **`prefers-reduced-motion` from the start**, not as a later pass.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Semantics: get these right the first time

Retrofitting accessibility is expensive; building it in costs nothing.

- `<button>` for actions, `<a href>` for navigation. Never a `<div onClick>`. This single rule
  fixes keyboard access, focus, Enter/Space handling and screen-reader announcement for free.
- One `<h1>`, headings in order, no level skipping, and never chosen for size — size is CSS.
- `<ul>/<li>` for lists, `<table>` with `<th scope>` for tabular data, `<nav>/<main>/<aside>` for
  regions, `<label for>` on every input.
- Icon-only buttons need an accessible name (`aria-label`) — and a tooltip, since sighted users
  need it too.
- Live regions for async status (`aria-live="polite"` for saves and loads, `role="alert"` for
  errors).
- Landmarks and a skip link, so keyboard users don't tab through the nav on every page.
- Real ARIA only where semantics don't exist. Bad ARIA is worse than none.

→ [`8-gates.md`](8-gates.md) for the verification pass.

---

## Self-check before moving on

- [ ] The page contains real, varied, domain-specific content — not lorem, not uniform fakes.
- [ ] Hierarchy is legible in a grayscale screenshot.
- [ ] Three hierarchy levels, not six.
- [ ] Every card is justified; no card is inside another card.
- [ ] Every value traces to a token.
- [ ] Everything aligns to a small number of x-positions.
- [ ] Nothing moves on hover.
- [ ] No `<div onClick>`; every control is reachable and visible on keyboard.
- [ ] Component spacing is owned by parents.
- [ ] The primary object is the most prominent thing on screen — not the nav, not the filter bar.

---

**Next:** [`6-states.md`](6-states.md) — the states that turn a mockup into a product.
