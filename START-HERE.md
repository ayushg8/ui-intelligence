# UI Intelligence — start here

You are about to build or change a user interface. Read this file. It is the router; everything
else loads on demand.

The purpose of this system is narrow and specific: **AI-generated interfaces look AI-generated,
and this is a fixable engineering problem.** Not because models lack taste, but because the default
path — reach for a component library, accept its defaults, wrap everything in cards, ship without
looking — produces the same interface every time. This system replaces that default path with a
better one.

---

## The four rules that do most of the work

If you read nothing else, do these. They are ordered by leverage.

**1. Decide what you are building before you decide how it looks.**
A trading terminal and a meditation app are not the same product with different colors. The
archetype determines density, type scale, color restraint, motion budget, and which components are
even appropriate. Choosing this consciously is the single highest-leverage act in the process.
→ [`system/2-direction.md`](system/2-direction.md)

**2. Build a token system first, then never write an arbitrary value.**
Not "use design tokens" as a slogan — literally: before the first component, write down your
neutral ramp, type scale, spacing scale, radius scale, and the one accent. Every subsequent value
comes from those. Interfaces read as unintentional when the 17th padding value appears.
→ [`system/3-tokens.md`](system/3-tokens.md)

**3. Render it and look at it.**
Code that compiles is not an interface. Screenshot the running product at 1440 and 390, open the
image, and judge it as a designer would. You cannot evaluate visual design by reading JSX. This is
the step agents skip, and skipping it is why the output looks the way it does.
→ [`system/7-critique.md`](system/7-critique.md)

**4. Put real content in it.**
The fastest way to make an interface look designed-for-this-product is for it to contain this
product's actual words, numbers, and objects. Lorem ipsum, "Product Name", `$1,234.56`, and
"Revolutionize your workflow" are not placeholders you fix later — they are the thing that makes
the layout wrong, because you laid out fake content.

---

## The procedure

Follow it in order. Each file is short. Do not read all of them up front.

| # | Step | Read | When to skip |
|---|---|---|---|
| 1 | Understand the product, user and primary workflow | [`system/1-discover.md`](system/1-discover.md) | Never. Takes 2 minutes. |
| 2 | Choose the design direction and archetype | [`system/2-direction.md`](system/2-direction.md) | Only if extending an existing design system |
| 3 | Establish tokens | [`system/3-tokens.md`](system/3-tokens.md) | Only if the codebase already has them — then read them first |
| 4 | Choose the stack and primitives | [`system/4-stack.md`](system/4-stack.md) | If the stack is fixed. Still check the section on defaults to override. |
| 5 | Build structure, then surface | [`system/5-build.md`](system/5-build.md) | Never |
| 6 | Add the states that make it a product | [`system/6-states.md`](system/6-states.md) | Never — this is where "looks like a mockup" is cured |
| 7 | Render, look, critique, fix, repeat | [`system/7-critique.md`](system/7-critique.md) | Never |
| 8 | Accessibility, responsive and ship gates | [`system/8-gates.md`](system/8-gates.md) | Never |

For a small change — one component, a color tweak, a bug — skip to the relevant craft file and the
self-check at the end of it. The full procedure is for anything with a layout.

---

## Where things are

**Design direction.** [`archetypes/`](archetypes/) — 20 product-design directions, each with its
own density, type, color, motion and component logic, plus its reference products and its
characteristic failure. Start at [`archetypes/README.md`](archetypes/README.md) for the selector.

**Craft.** [`craft/`](craft/) — the deep, measured guidance. Load the one you need:

| Question | File |
|---|---|
| What typeface, what sizes, what weights? | [`craft/typography.md`](craft/typography.md) |
| What colors, how many, light/dark? | [`craft/color.md`](craft/color.md) |
| How much space, what widths, what grid? | [`craft/space-and-layout.md`](craft/space-and-layout.md) |
| How dense should this be? What's the hierarchy? | [`craft/density-and-hierarchy.md`](craft/density-and-hierarchy.md) |
| Hover, focus, loading, optimistic, undo | [`craft/interaction-and-states.md`](craft/interaction-and-states.md) |
| Should this animate, and how much? | [`craft/motion-craft.md`](craft/motion-craft.md) |
| Forms, inputs, validation, settings | [`craft/forms-craft.md`](craft/forms-craft.md) |
| Tables, dashboards, charts | [`craft/tables-dashboards-data.md`](craft/tables-dashboards-data.md) |
| Navigation, IA, sidebars, search | [`craft/navigation-and-ia.md`](craft/navigation-and-ia.md) |
| Button labels, errors, empty states, tone | [`craft/copy-and-voice.md`](craft/copy-and-voice.md) |
| Breakpoints, mobile, touch | [`craft/responsive-and-mobile-web.md`](craft/responsive-and-mobile-web.md) |
| Photos, illustration, screenshots, logos, icons in place | [`craft/imagery-and-illustration.md`](craft/imagery-and-illustration.md) |
| Does it feel fast? Loading, CLS, INP, fonts, optimistic UI | [`craft/performance-and-perceived-speed.md`](craft/performance-and-perceived-speed.md) |

**Reference products.** [`references/`](references/) — teardowns of the best interfaces in the
world, with measured values. Read the one matching your archetype before you design, and use it for
comparative critique after you build.

**Libraries.** [`libraries/README.md`](libraries/README.md) — ranked, evidence-backed and
opinionated, with a vibecode-risk column. Not a catalogue; a set of verdicts.

**UX patterns.** [`patterns/`](patterns/) — how auth, onboarding, settings, billing, search,
notifications, permissions, checkout and AI flows actually work in good products.

**Anti-vibecode.** [`anti-patterns/`](anti-patterns/) — the taxonomy of AI tells, the 0–10 risk
rubric, the correction playbook, and the method for critiquing a rendered interface.

---

## The non-negotiables

These are the rules that separate an interface that looks designed from one that looks generated.
Violating one is allowed; violating one *by default, without noticing* is the failure.

1. **A card is a claim that something is an independently actionable object.** If it isn't one,
   don't put it in a card. Most AI-generated layouts are card soup because a card is the safest way
   to group things and the safest way is not the right way. Dividers, spacing, and a single
   background shift do the same job without the visual debt. Never nest a card in a card.

2. **One accent color, used rarely.** Color in a good interface carries meaning: the primary
   action, the current selection, the error. When everything is colored, nothing is. Gradients on
   text, buttons, and backgrounds are the loudest single tell.

3. **Hierarchy comes from size, weight, and space — in that order.** Reach for color, borders,
   shadows and boxes only after those three are exhausted. Generated UI reaches for decoration
   first because decoration is easy to specify.

4. **Density is a decision, not a default.** AI output is typically 30–40% too airy for its
   purpose. A tool someone uses six hours a day should show more, at smaller sizes, in tighter
   rows, than a marketing page. Set a density target consciously.
   → [`craft/density-and-hierarchy.md`](craft/density-and-hierarchy.md)

5. **Nothing moves on hover.** Change color, background, opacity — never size, position, or border
   width, which shift layout and make lists feel unstable under a moving cursor.

6. **Every interactive element has `:hover`, `:focus-visible`, `:active` and a disabled state, and
   focus is never removed.** If you wrote `outline: none` without replacing it, you broke the
   product for keyboard users.

7. **Every data surface has four states: empty, loading, error, and too-much.** An interface that
   only handles the happy path is a mockup. This is the single biggest difference between generated
   UI and shipped UI. → [`system/6-states.md`](system/6-states.md)

8. **Copy is design.** "Get started", "Something went wrong", "No items found" are three separate
   design failures. Say what happened, why, and what to do.
   → [`craft/copy-and-voice.md`](craft/copy-and-voice.md)

9. **Test at 390px and 320px, not just "responsive".** A table that overflows, a nav that collapses
   into an unusable hamburger, and a fixed height that clips are all invisible at desktop width.

10. **Look at the rendered result before you claim it is done.** Then compare it side by side with
    an excellent product in the same archetype and name three differences.

---

## Rendering and looking

The system ships a screenshot tool so this step has no excuses:

```bash
node tools/shot.mjs http://localhost:3000 --out .cache/shots --name app --widths 1440,390
# then open the PNGs and actually look at them
```

Flags: `--full` (whole page), `--dark`, `--scroll 3` (sample a long page), `--wait 4000`,
`--click "button.open"`. Full protocol in [`system/7-critique.md`](system/7-critique.md).

---

## What this system is not

It is not a component catalogue, and adding more components will not improve your output. An
excellent interface is mostly hierarchy, layout, spacing, typography, content and restraint;
components are the last 20%. A library is a set of primitives, not a design — if the product looks
like the library's documentation site, you have used it wrong.

It is also not a mandate for novelty. The failure mode opposite to "generic" is "trying too hard,"
and it is worse. A restrained, conventional, well-executed interface is a success. The goal is
*intentional*, not *unusual*.

---

**Freshness:** every file carries an `Evaluated:` date. The ecosystem moves; a verdict older than
about six months should be checked before it is trusted. [`automation/`](automation/) holds the
monthly refresh task that keeps this current.
