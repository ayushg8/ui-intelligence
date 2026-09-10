# 4 — Choose the stack

**Principle: a library is a set of primitives, not a design.** If the finished product looks like
the library's documentation site, you used it wrong. The purpose of this step is to acquire
correct behavior — focus management, keyboard handling, positioning, virtualization — while
supplying your own visual language.

Ranked verdicts with evidence live in [`../libraries/README.md`](../libraries/README.md). This file
is the decision procedure.

---

## Decide in this order

**1. Does the platform already do it?**
Before installing anything: `<dialog>`, the Popover API, anchor positioning, `<details>`,
`<input type="date">` (on mobile it is genuinely good), `:has()`, container queries, scroll-driven
animations, View Transitions, `text-wrap: balance`. Modern CSS has absorbed a lot of what libraries
existed for. A dependency you don't add is a dependency you don't maintain, ship, or fight.
→ [`../libraries/css-and-styling-infra.md`](../libraries/css-and-styling-infra.md)

**2. Is this behavior hard to get right?**
Install a library for the things that are genuinely difficult and where being wrong is invisible to
you and painful for users:

- Focus trapping, focus restoration, and scroll locking (modals, drawers, popovers)
- Floating-element positioning with collision detection
- Combobox/listbox/menu keyboard semantics and ARIA
- Virtualization over large lists and tables
- Date/time handling across locales and time zones
- Drag and drop with keyboard parity
- Rich text and code editing

Write it yourself for: buttons, inputs, cards, layout, badges, tabs (usually), toggles, avatars,
breadcrumbs, and anything else where the hard part is how it looks, not how it behaves. A hand-
written button that matches your tokens is better than a wrapped library button you spend an hour
overriding.

**3. Headless or styled?**

| Situation | Choose |
|---|---|
| Distinctive product, design matters, you have time | **Headless primitives** + your own styles. Highest ceiling. |
| Need velocity, will customize substantially | **Copy-in components** (shadcn-style registries) — you own the code, so change the defaults immediately |
| Internal tool, nobody will look at it twice, ship today | **Styled system** (Mantine, MUI, Ant) — accept its house style deliberately rather than half-escaping it |
| Enterprise with an existing design system | Use theirs. Read it first. |

The dangerous middle is a styled system you fight for weeks — you get neither velocity nor
distinctiveness. Pick a side and commit.

**4. Check it before you depend on it.**
For anything load-bearing: last commit within ~6 months, an active release cadence, a real
maintainer or company behind it, a permissive license, TypeScript types that aren't `any`, and
documented accessibility behavior. Verify rather than assume — `gh api repos/OWNER/REPO --jq
'{pushed:.pushed_at, archived:.archived, license:.license.spdx_id}'` takes three seconds. Star
count measures distribution, not quality or maintenance.

---

## Override the defaults immediately

This is the single most important paragraph in this file. If you adopt a component kit and ship its
defaults, you have chosen the visual identity of every other product built the same way. Do this
**before** building features, while it is a five-minute change:

**shadcn/ui + Tailwind (the highest-risk default in 2026):**

1. **Radius.** `--radius: 0.5rem` → set to your token (usually 4–6px for product UI). This one
   change removes more of the "AI built this" signal than anything else.
2. **Neutral palette.** Replace `zinc`/`slate` with your own ramp. The stock zinc ramp is
   instantly recognizable.
3. **Card usage.** Most of what the examples put in `<Card>` should not be in a card. Delete the
   wrapper and use spacing and a divider. → [`../anti-patterns/remedies.md`](../anti-patterns/remedies.md)
4. **Density.** Default button height 36–40px and input height 40px are sized for marketing pages.
   A dense tool wants 28–32px.
5. **Shadows.** Replace `shadow-sm` on static surfaces with a border; keep shadows for overlays.
6. **Focus ring.** Restyle it to your accent — but never remove it.
7. **Typography.** The default is unstyled system sans at 14/16. Set your family, scale, weights
   and `tabular-nums`.

**Tailwind generally:** the default scale is good but its *ubiquity* is the problem. `rounded-lg
border bg-card p-6 shadow-sm` is a fingerprint. Define your own semantic utilities in `@theme` and
use those, so the markup expresses your system rather than the framework's.

**MUI / Ant / Mantine:** theme first, at the provider level — typography, shape, palette, spacing,
component defaults — not with per-component `sx` overrides. Escaping Material's density and
elevation conventions in particular takes deliberate work.

---

## Category quick reference

Full evidence and verdicts in [`../libraries/`](../libraries/). Load the category file when you're
choosing; don't read them all.

| Need | File |
|---|---|
| Unstyled behavior primitives | [`headless-primitives.md`](../libraries/headless-primitives.md) |
| Component kits and design systems | [`styled-component-systems.md`](../libraries/styled-component-systems.md) |
| Tables, grids, virtualization | [`tables-and-grids.md`](../libraries/tables-and-grids.md) |
| Charts and data viz | [`charts-and-dataviz.md`](../libraries/charts-and-dataviz.md) |
| Forms, validation, inputs, dates, upload | [`forms-and-inputs.md`](../libraries/forms-and-inputs.md) |
| Modals, menus, toasts, command palettes | [`overlays-command-nav.md`](../libraries/overlays-command-nav.md) |
| Rich text, code, canvas, node editors | [`editors-canvas-nodes.md`](../libraries/editors-canvas-nodes.md) |
| Animation | [`motion.md`](../libraries/motion.md) |
| Icons and typefaces | [`icons-and-typography.md`](../libraries/icons-and-typography.md) |
| Chat, streaming, agent UI | [`ai-interfaces.md`](../libraries/ai-interfaces.md) |
| React Native and mobile | [`mobile-and-native.md`](../libraries/mobile-and-native.md) |
| Drag & drop, kanban, panels | [`dnd-kanban-layout.md`](../libraries/dnd-kanban-layout.md) |
| Maps, 3D, video, images, carousels | [`maps-3d-media.md`](../libraries/maps-3d-media.md) |
| Styling infrastructure and modern CSS | [`css-and-styling-infra.md`](../libraries/css-and-styling-infra.md) |
| Accessibility tooling | [`accessibility-tooling.md`](../libraries/accessibility-tooling.md) |
| Copy-paste effect collections | [`effect-collections.md`](../libraries/effect-collections.md) |
| Paid kits | [`premium-commercial.md`](../libraries/premium-commercial.md) |
| Published design systems to study | [`design-systems-reference.md`](../libraries/design-systems-reference.md) |
| Where to find real interface references | [`inspiration-and-reference-sites.md`](../libraries/inspiration-and-reference-sites.md) |
| Things outside the usual discourse | [`outside-the-bubble.md`](../libraries/outside-the-bubble.md) |

---

## Effect collections: read this before installing one

Aceternity, Magic UI, React Bits, Cult UI and the rest are a real category with a real use, and
also the fastest way to make a product look generated. The honest position:

- Their components are **demo-optimized**: designed to look striking in isolation on a dark
  gradient background, not to sit inside a working product for eight hours.
- A handful are genuinely useful (a well-built marquee, a number ticker, a good animated tab
  indicator). Most are not.
- Spotlight cards, animated gradient borders, beam/meteor effects, sparkle text, aurora
  backgrounds and infinite logo marquees are, collectively, the loudest visual signal that an AI
  built the page. Using one deliberately on a marketing site can be fine. Using three is a tell.
- **Never** in an application surface. Effects belong on pages people visit once.

If you use one, own the code and restyle it to your tokens. → [`../libraries/effect-collections.md`](../libraries/effect-collections.md)

---

## Bundle and performance sanity

- Prefer a 4KB library that does one thing over a 200KB kit you use 5% of.
- Check whether it tree-shakes, whether it works with SSR/RSC, and whether it forces a client
  boundary around half your app.
- Icons: import individually, never the barrel file.
- Locale data, timezone data and chart libraries are common surprise weight.
- Charting and editors are the heaviest categories — lazy-load them below the fold or behind a
  route.

---

**Next:** [`5-build.md`](5-build.md) — structure before surface.
