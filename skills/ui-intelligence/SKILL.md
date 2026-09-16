---
name: ui-intelligence
description: >-
  ALWAYS invoke FIRST for any product UI work — app, dashboard, admin or internal tool, settings
  page, form, table, onboarding flow, mobile screen, component, design system, or a marketing/landing
  page for a product. Invoke before writing any CSS or JSX, and before any other design skill.
  This is the process layer: it picks the product archetype, sets density and tokens, and runs the
  render-look-score loop. It COMPOSES WITH the aesthetic skills rather than competing with them —
  if `design-taste` applies (Ayush's own brand surfaces) invoke this first to choose the archetype,
  then let design-taste supply the palette and voice inside it. It SUPERSEDES `frontend-design`,
  `web-design-guidelines`, `ui-ux-pro-max` and `canvas-design` for product UI, because those set a
  look without first deciding what is being built. Also invoke when asked to review, critique, audit,
  polish or de-genericize an interface, or when UI looks "AI-generated", "generic", "off", or "like
  a template".
---

# UI Intelligence

A design-intelligence system for building interfaces that don't look AI-generated. It exists
because the default path — install a component library, accept its defaults, wrap everything in
cards, ship without looking — produces the same interface every time.

**Library root:** `$UI_LIBRARY` if set, else `~/Ayush/UI_Library`. Read
[`START-HERE.md`](../../START-HERE.md) there first; it is the router and it is short.

## How to use this

Do not read the whole library. Read `START-HERE.md`, then load only the files the current decision
needs. The library is designed for progressive disclosure — most files are irrelevant to any given
task.

### Building something new with a layout

Follow `system/1-discover.md` → `8-gates.md` in order. Do not skip steps 1, 2 and 7 — they are
where the quality comes from, and they are the ones that feel skippable.

The abbreviated shape:

1. **Brief** — name the primary object, the primary verb, the user, the stakes, the density, the
   primary platform. Six lines. Infer rather than interrogate; ask only what changes the work.
2. **Direction** — pick an archetype from `archetypes/`, write a ten-line direction spec, choose
   one signature decision that comes from the domain.
3. **Tokens** — write them before the first component. `system/3-tokens.md` has a good non-generic
   default to adapt.
4. **Stack** — acquire behavior, supply your own visuals. Override library defaults immediately
   (radius, neutrals, density, shadows) — `system/4-stack.md`.
5. **Build** — content first, then hierarchy, then grayscale structure, then surface.
6. **States** — empty, loading, error, too-much. This is what separates a product from a mockup.
7. **Render and look** — screenshot it and open the image. Score it. Fix structure before surface.
8. **Gates** — accessibility, responsive, states, design.

### Small changes

One component, a color, a spacing fix: skip to the relevant `craft/` file and run its self-check.
Don't run the whole procedure for a button.

### Reviewing or fixing an existing interface

Use the `ui-critique` skill.

## Tools in the library

```bash
node tools/shot.mjs <url> --widths 1440,390 --out .cache/shots --name x   # screenshot, then READ the png
node tools/audit.mjs <url> --widths 1440,390,320                          # axe + overflow + contrast + consistency
node tools/contrast.mjs <fg> <bg>   |   --pairs <stylesheet.css>          # WCAG contrast, understands oklch()
```

`shot.mjs` supports `--full`, `--dark`, `--scroll N`, `--wait MS`, `--click SELECTOR`.

## The rules that do most of the work

1. **Decide the archetype before deciding how it looks.** A trading terminal and a meditation app
   are not the same product with different colors.
2. **Tokens before components.** Then never write an arbitrary value.
3. **Render it and look at it.** You cannot judge visual design by reading JSX. This is the step
   agents skip.
4. **Real content, real copy.** Fake content is uniform in a way real content never is, so you end
   up designing a layout for data that doesn't exist.
5. **A card is a claim that something is an independently actionable object.** Most things aren't.
   Never nest one.
6. **One accent, used rarely.** Color carries meaning; when everything is colored, nothing is.
7. **Hierarchy from size, weight and space** — before color, and long before decoration.
8. **Density is a decision.** AI output is typically 30–40% too airy for its purpose.
9. **Nothing moves on hover.** Never remove focus rings.
10. **Every data surface has empty, loading, error and too-much states.**

## Reporting back

Say what you rendered, what you checked, what the vibecode score was and why, and what you skipped.
Not "I've created a clean, modern interface."
