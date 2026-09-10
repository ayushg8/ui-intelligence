---
name: ui-direction
description: Use at the start of any new product, app, site or major redesign — before writing UI code — to establish a design direction and token system. Turns a one-line brief into a named archetype, a written direction spec, a signature decision, and a token file. Use when asked "what should this look like", "pick a design direction", "set up a design system", "choose colors and fonts", or when starting a greenfield UI and there is no existing design language to inherit.
---

# UI Direction

An interface without a chosen direction defaults to the aesthetic of whatever library was
installed. This produces work that is technically competent and visually anonymous. Ten minutes
here changes the outcome more than anything downstream.

**Library root:** `$UI_LIBRARY` if set, else `~/Ayush/UI_Library`.

## 1. Brief — six lines, two minutes

Read `system/1-discover.md`. Infer from the request; don't interrogate the user. Ask a question
only when two readings lead to materially different interfaces.

```
Product:   what it is, for whom
Object:    the one noun at the center (issue / transaction / shipment / patient / track)
Verb:      what the user does to it — scan many · work inside one · compare · create fast ·
           monitor · browse · complete a linear task
User:      how many, how often, how expert, how technical
Stakes:    what happens when they make a mistake here
Shape:     desktop-primary or mobile-primary (not "responsive"), and the density target
```

The primary verb determines the shell. The frequency determines the density. The stakes determine
how much friction the destructive paths need.

## 2. Archetype

Pick one from `archetypes/README.md` — 20 directions, each a coherent set of answers to density,
type, color, motion and component questions, derived from what its users are actually doing.

Match the **user situation** (frequency, stakes, density, expertise), not the industry and not the
look you like. Products that span two archetypes have a *host* — the host governs the shell, type,
density and color; the guest governs its own pane. Never average two.

Then read that archetype's file. It will answer most of your next fifty decisions, and it names the
characteristic failure of that archetype so you can avoid it deliberately.

## 3. Direction spec — ten lines, written down

```
Archetype:   technical-productivity
Density:     compact — 28px rows, 13px body, 32px header
Type:        family · sizes · weights · numeral treatment
Neutrals:    the ramp, warm or cool, and the page/surface/sunken assignments
Accent:      one color, and the exhaustive list of what it is allowed to do
Semantics:   success/warning/danger, meaning-only
Radius:      by element role
Elevation:   borders or shadows, and where each
Motion:      durations, easing, what does NOT animate
Chrome:      nav shell, sidebar width, whether there's a top bar
Signature:   the one domain-derived decision that could only belong to this product
```

Every number must be justified by the brief, not by habit. If you can't fill a line, you haven't
made the decision — make it now rather than implicitly, inside a component, later.

## 4. Signature decision — exactly one

The difference between *correct* and *specific to this product*. It must come from the domain:

- A freight console encodes on-time/at-risk/late as a 4px rail on every row, because scanning for
  exceptions is the entire job.
- A calendar renders duration as literal vertical height everywhere, including in lists.
- A bank shows pending balance in the same weight and position as settled, in a different color,
  because "what can I actually spend" is the only question.

A signature is a **structural decision about how this product's information is shaped**. It is not
a gradient, a custom cursor, an unusual font, a scroll animation, or a bento grid — those are style
applied on top. Two signatures compete and read as noise; pick one and let the rest be quiet.

## 5. Tokens

`system/3-tokens.md` has a good, deliberately non-generic default — warm neutral ramp in oklch, one
accent, compact type scale, borders instead of shadows, verified contrast — plus per-archetype
adjustments. Adapt it; don't ship it unchanged.

Keep counts small: 10–12 neutrals, **1** accent, 3–4 semantics, 5–7 type sizes, 3 weights, 8–10
spacing steps, 3–4 radii, 2–3 shadows, 3 durations. Scarcity is the point.

Verify before trusting:

```bash
node tools/contrast.mjs --pairs app/globals.css
```

## The line between distinctive and effortful

**Distinctive** = a choice that serves the product's job and would be wrong for a different
product. **Effortful** = a choice that serves the designer's need to be noticed — novel navigation,
motion that delays the user, layouts that make you hunt.

Test: does this make the product better at its job, or only more memorable? The failure opposite to
generic is trying too hard, and it is worse. Be conventional in the plumbing and specific in the
substance; a login form should look like a login form.

## Deliverable

A written direction spec, a token file, and one sentence naming the signature decision. Then
proceed to `system/4-stack.md`.
