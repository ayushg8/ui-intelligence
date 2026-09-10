# Worked example — freight dispatch console

`enterprise-dense` · built by following [`../../START-HERE.md`](../../START-HERE.md) end to end.

Open `index.html` in a browser. The bar at the bottom switches between populated, loading, empty
and error — demo scaffolding, not part of the design.

This exists because the library's instructions are more convincing with a build attached, and
because the interesting part is not the finished screen — it is **what the critique loop caught
that the first version got wrong.** That section is at the bottom and is the point of the file.

---

## 1. Brief

```
Product:   Live dispatch console for a mid-size freight brokerage
Object:    Shipment (secondary: carrier, lane)
Verb:      Scan a live queue for exceptions, drill in, reassign
User:      8 dispatchers, all day, deep domain expertise, non-technical
Stakes:    Reassignment is reversible. Cancelling a load is not.
Shape:     Desktop-primary, dense, keyboard-driven. Mobile = read-only status check.
```

The decisive line is **8 dispatchers, all day**. That single fact sets density (compact), rules out
per-shipment cards, makes keyboard access mandatory, and caps the motion budget — an animation
these users see four hundred times a day is an obstacle, not delight.

## 2. Direction spec

```
Archetype:   enterprise-dense
Density:     compact — 30px rows, 13px body, 28px header row
Type:        Inter var · 12/13/15 · weights 400/500/600 · tabular-nums globally
Neutrals:    warm gray, oklch hue 90, 10 steps, page n-25 / surface n-0 / sunken n-50
Accent:      one blue. Allowed: primary action, current selection, active nav, focus ring.
             Nothing else.
Semantics:   amber = at risk · red = late. Meaning only, never decoration.
Radius:      4px controls, 6px containers. No pills.
Elevation:   borders. One shadow, for the (demo) floating bar only.
Motion:      120ms background/colour transitions. Nothing enters, nothing moves.
Chrome:      216px sidebar, no top bar, ⌘K search, shortcut hints in the footer.
Signature:   the exception rail.
```

## 3. The signature decision

**A 3px left edge on every row, coloured only when the shipment is at risk or late.**

The dispatcher's entire job is finding the exceptions in a list of 84. The rail puts that signal in
peripheral vision — you scan the left edge, not the rows — and it costs no column width, so the
information the dispatcher needs *after* spotting an exception (lane, carrier, ETA, delta) keeps
the horizontal space.

It comes from the domain. It is not a style applied on top, and there is exactly one of it.

## 4. What the critique loop changed

The first render looked fine. It wasn't. Every item here came from screenshotting the build and
looking at it, or from `tools/audit.mjs` — none of it was visible in the source.

| # | Found by | Problem | Fix |
|---|---|---|---|
| 1 | Looking at the 1440 shot | The rail was **green on every on-time row**. Two-thirds of the board was green, so the exception colours had to fight for attention. Color was decorating, not meaning. | On-time rows get a near-invisible neutral rail. Saturated colour only for at-risk and late. This is the biggest single improvement in the file. |
| 2 | Looking at the 1440 shot | The Status column's dots were *also* green/amber, a second colour system competing with the rail two columns away. | Status dots went neutral except "held". One system gets to say "look here". |
| 3 | Looking at the 390 shot | Mobile rows were ~200px tall — four shipments per screen for a dispatcher doing a quick status check. The mobile layout was a squeezed desktop layout. | Restructured to a two-line row, ~62px. Twelve shipments per screen. |
| 4 | Looking at the 390 shot | The unassigned load rendered as two stacked em-dashes and read as broken. | Carrier moved onto the status line, with "no carrier" instead of a dash. |
| 5 | 390 shot after the fix | The exception rail had **vanished on mobile** — the grid cell wasn't stretching, so the signature decision silently disappeared on the surface it mattered most. | `align-self: stretch` on the rail cell. |
| 6 | `audit.mjs` | Tertiary gray text at **2.94:1** — 15 elements. The exact three-levels-of-gray trap `system/3-tokens.md` warns about, committed by the author of that file. | Tertiary neutral moved from `oklch(0.660)` to `oklch(0.545)` → 4.68:1. |
| 7 | `audit.mjs` | The amber "at risk" delta was **3.72:1**, and 4.31:1 on the selected row. It carries meaning, so it has to be readable. | `oklch(0.62 0.140 75)` → `oklch(0.52 0.145 66)`. |
| 8 | `audit.mjs` | Eight touch targets at 26px on mobile. Correct for a mouse at a desk, wrong for a thumb. | Controls go to 40px under 760px. |
| 9 | `audit.mjs` | `<th aria-label>` with no text reads as an empty header to axe. | Visually-hidden text instead. |
| 10 | Looking at the 1440 shot | 15 rows on a board advertising 84 shipments left half the viewport empty — the density claim wasn't backed by the render. | 39 rows of real varied data. |

**Finding 6 is the one worth internalising.** The token file that warns about low-contrast tertiary
gray shipped low-contrast tertiary gray, and no amount of re-reading the CSS would have caught it.
Only running the tool did.

Final state: `node tools/audit.mjs <url> --widths 1440,390,320` → no violations, no hard failures.

## 5. Deliberate choices someone might question

- **11–12px labels.** Table headers and nav section labels sit at 12px. Below 12px is a real
  legibility problem; at 12px, for a daily-use tool with a 28px header row, it is the right
  trade. A consumer product should not copy this.
- **No card anywhere.** The sidebar is a background shift, the table is rows and hairlines, the
  filter chips are the only bounded objects — and they are bounded because they are individually
  removable.
- **Row hover changes background only.** No border, no shadow, no shift. Sweeping a cursor down 39
  rows should be silent.
- **The empty state is the filtered-to-nothing variant**, not first-run, and it names the two
  filters responsible and offers to clear them. Three different empties would be three different
  messages.
- **The error state says the shipment data is fine** and only positions are stale, because that
  distinction determines whether the dispatcher can keep working. "Something went wrong" would
  have destroyed that information.

## 6. What it does not do

Not a complete product. There is no detail view, no reassign flow, no command palette behind ⌘K,
no virtualization (39 rows doesn't need it; 84,000 would), no real keyboard handlers behind the
advertised J/K/A/E, and no dark mode. It is a faithful first screen, not an application.
