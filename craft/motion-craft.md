# Motion Craft

**Measured:** 2026-09. Every number below was pulled out of a shipping product's stylesheet, a
library's published source, or Apple's own documentation API — not recalled. Method at the bottom.

This is not a library survey (that's `libraries/_research/motion.md`). This is the craft: how long,
which curve, in what order, and — most of the time — whether to animate at all.

---

## If you only apply five things

1. **Animate 150–200ms for anything the user just clicked, 200–300ms for a panel, and nothing
   between 300ms and 500ms unless the thing is crossing more than half the viewport.** Linear's
   most-used duration is 160ms (49 declarations). Notion's entire scale stops at 300ms. Figma's is
   250ms (472 declarations). If you wrote 700ms, you were decorating.
2. **Ease-out on the way in, ease-in on the way out, and never `linear` for anything that moves.**
   Linear ships this literally: its context menu opens with `--ease-out-quad` and closes with
   `--ease-in-quad`. `linear` is correct only for spinners, marquees, progress bars and
   cross-fades — things with no physical body.
3. **Exit faster than enter.** GitHub's Primer publishes the rule as tokens:
   `--motion-transition-enter: 300ms easeOut`, `--motion-transition-exit: 200ms easeIn`. Same
   element, 33% faster leaving. A symmetric enter/exit is the most common tell of a hand-rolled
   animation system.
4. **Nothing moves on hover in a dense list.** Change the background, not the geometry. Linear's
   marketing cards move a 1px arrow glyph — `transform: translateY(-1px)` on the `.arrow` child —
   and leave the card itself perfectly still. `transform: translateY(-4px)` on a row is the AI
   default and it makes a 30-row list feel like it's breathing.
5. **Handle `prefers-reduced-motion` by substituting the end state, not by deleting the
   transition.** Stripe sets `:root { --navigation-duration: 0s }` and then, per graphic, forces
   the resting frame: `.fraud-and-risk-graphic__chart-bar { opacity: 1; transform: none }`. It
   swaps the animated typing-dots for static text (`--fallback { display: block }`), and swaps a
   moving arrow for a stationary one. Blanket `animation: none` on a fade-in leaves the element at
   `opacity: 0` forever.

---

## Measured reference

### Duration histograms — what products actually ship

Counted occurrences of each `transition-duration` value across every stylesheet a page loads.
"Dominant" is the modal value, which is the product's real house duration.

| Product | Dominant | Full top of distribution | Modal easing | Reduced-motion blocks |
|---|---|---|---|---|
| **Linear** (linear.app) | **160ms** ×49 | 160, 200×26, 120×17, 400×11, 100×10 | `ease-out` ×98 | 20 `reduce` + 25 `no-preference` |
| **Figma** (figma.com) | **250ms** ×472 | 250, 200×222, 400×102, 150×100, **180×88** | `ease-in-out` ×430, `ease-out` ×348 | 52 |
| **Stripe** (stripe.com) | **300ms** ×49 | 300, 500×12, 150×9, 200×8, 400×7 | `cubic-bezier(.25,1,.5,1)` ×41 | 12 `reduce` + 62 `no-preference` |
| **Vercel** (vercel.com) | **150ms** ×35 | 150, 200×28, 100×11, 250×10, 300×8 | Tailwind default ×80 | 21 |
| **Notion** (notion.com) | **150ms** ×49 | 150, 200×19, 100×11, 300×9, 250×8 | `ease-in-out` ×22 | 23 |
| **GitHub** (github.com) | **200ms** ×60 | 200, **80×48**, 300×18, 400×17, 120×15 | `ease-out` ×47 | 32 `reduce` + 43 `no-preference` |
| **Apple** (macbook-pro) | **240ms** ×126 | 240, 320×93, 400×82, 500×68, 300×54 | `cubic-bezier(.4,0,.6,1)` ×223 | 27 |
| **Raycast** (raycast.com) | **300ms** ×124 | 300, 200×91, 150×37, 100×23 | `ease-in-out` ×48 | 5 |
| **Radix docs** | **120ms** ×14 | 120, **40×12**, 100×9, 140×8, 250×6 | `ease-out` ×11 | 8 |
| **Resend** | **150ms** ×57 | 150, 200×20, 300×17, 400×14 | Tailwind default ×98 | 5 |
| **Supabase** | 400ms ×13 | 400, 300×12, 200×11, 500×8 | `cubic-bezier(.075,.82,.165,1)` ×64 | 9 |
| **Mercury** | 300ms ×8 | 300, 500×6, 150/200/400/600/800 ×2 | Tailwind default ×39 | 6 |
| **Superhuman** | **150ms** ×28 | 150, 300×9, 400×9, 200×4 | `ease-in-out` ×18 | 25 |
| **Arc** (arc.net) | 200ms ×11 | 200, 150×5, 100×4, 250×1 — **21 declarations total** | `ease-out` ×8 | 0 |

Read that last row twice. Arc's entire site has **21 transition declarations**. Figma's has over
1,200. Neither is wrong; they're different products. But "how many distinct animations does this
interface contain" is a decision, and the default answer for a tool is "fewer than you think."

### Published motion token systems (verbatim)

**GitHub Primer** — the most complete public enter/exit spec I found. Note that it does not expose
a duration for the developer to choose; it exposes an *intent*.

```css
--base-duration-50: 50ms;   --base-duration-100: .1s;  --base-duration-200: .2s;
--base-duration-300: .3s;   --base-duration-400: .4s;  --base-duration-500: .5s;
--base-easing-ease:      cubic-bezier(.25, .1, .25, 1);
--base-easing-easeIn:    cubic-bezier(.7,  .1, .75, .9);
--base-easing-easeOut:   cubic-bezier(.3,  .8, .6,  1);
--base-easing-easeInOut: cubic-bezier(.6,  0,  .2,  1);

--motion-transition-enter:       var(--motion-duration-medium) var(--motion-easing-enter); /* 300ms easeOut */
--motion-transition-exit:        var(--motion-duration-short)  var(--motion-easing-exit);  /* 200ms easeIn  */
--motion-transition-hover:       var(--motion-duration-micro)  var(--motion-easing-hover); /* 100ms ease    */
--motion-transition-stateChange: var(--motion-duration-short)  var(--motion-easing-move);  /* 200ms easeInOut */
--duration-fast: 80ms;  /* buttons/inputs actually use this, at cubic-bezier(.65,0,.35,1) */
```

**Linear** — a full Penner set plus four semantic speeds. The two `highlight` values are the most
instructive numbers in this document:

```css
--speed-quickTransition:   .1s;   /* menus, popovers */
--speed-regularTransition: .25s;
--speed-highlightFadeIn:   0s;    /* ← selection/hover appears INSTANTLY */
--speed-highlightFadeOut:  .15s;  /* ← and releases over 150ms */
--ease-out-quad:  cubic-bezier(.25, .46, .45, .94);   --ease-in-quad:  cubic-bezier(.55, .085, .68, .53);
--ease-out-cubic: cubic-bezier(.215, .61, .355, 1);   --ease-in-cubic: cubic-bezier(.55, .055, .675, .19);
--ease-out-quart: cubic-bezier(.165, .84, .44, 1);    --ease-in-quart: cubic-bezier(.895, .03, .685, .22);
--ease-out-quint: cubic-bezier(.23, 1, .32, 1);       --ease-in-quint: cubic-bezier(.755, .05, .855, .06);
--ease-out-expo:  cubic-bezier(.19, 1, .22, 1);       --ease-in-expo:  cubic-bezier(.95, .05, .795, .035);
--ease-out-circ:  cubic-bezier(.075, .82, .165, 1);   --ease-in-circ:  cubic-bezier(.6, .04, .98, .335);
--ease-in-out-cubic: cubic-bezier(.645, .045, .355, 1);
--ease-in-out-quint: cubic-bezier(.86, 0, .07, 1);
--ease-in-out-expo:  cubic-bezier(1, 0, 0, 1);
```

**Vercel Geist** — three tokens, that's the whole system:

```css
--ds-motion-timing-swift:    cubic-bezier(.175, .885, .32, 1.1);  /* 2.26% overshoot at 73% */
--ds-motion-overlay-duration: .3s;   --ds-motion-overlay-scale: .96;
--ds-motion-popover-duration: .2s;
```

**Notion "tatami"** — the notable thing is what's *absent*. Five durations, hard ceiling at 300ms:

```css
--tatami-motion-duration-100: .1s;  --tatami-motion-duration-150: .15s;
--tatami-motion-duration-200: .2s;  --tatami-motion-duration-250: .25s;
--tatami-motion-duration-300: .3s;  /* nothing longer exists */
--tatami-motion-timing-function-ease-out: cubic-bezier(0, 0, .58, 1);
--tatami-motion-timing-function-ease-in:  cubic-bezier(.42, 0, 1, 1);
```

**Material 3** (`@material/web@2.5.0`, `tokens/versions/v0_192/_md-sys-motion.scss`):

| Duration token | ms | | Easing token | value |
|---|---|---|---|---|
| short1–4 | 50, 100, 150, 200 | | emphasized | `cubic-bezier(0.2, 0, 0, 1)` |
| medium1–4 | 250, 300, 350, 400 | | emphasized-decelerate | `cubic-bezier(0.05, 0.7, 0.1, 1)` |
| long1–4 | 450, 500, 550, 600 | | emphasized-accelerate | `cubic-bezier(0.3, 0, 0.8, 0.15)` |
| extra-long1–4 | 700, 800, 900, 1000 | | standard | `cubic-bezier(0.2, 0, 0, 1)` |
| | | | standard-decelerate | `cubic-bezier(0, 0, 0, 1)` |
| | | | standard-accelerate | `cubic-bezier(0.3, 0, 1, 1)` |
| | | | legacy (= Tailwind's default) | `cubic-bezier(0.4, 0, 0.2, 1)` |

### The perceived-duration table — the one that changes decisions

A `transition-duration` is not how long the motion *looks*. Ease-out curves deliver most of the
distance early; ease-in-out curves loiter at both ends. I computed, for each real shipping curve,
the **fraction of the duration at which 90% of the movement is complete**. Multiply that by your
duration to get what the user actually perceives.

| Curve | Where it ships | 90% done at | 200ms feels like | 300ms feels like |
|---|---|---|---|---|
| `cubic-bezier(.16,1,.3,1)` (outExpo) | Radix docs, Stripe, GitHub | **33%** | 66ms | 99ms |
| `cubic-bezier(.32,.72,0,1)` | Vaul drawer, Linear, Vercel, shadcn | **37%** | 74ms | 111ms |
| `cubic-bezier(.25,1,.5,1)` (outQuart) | **Stripe's house curve** | **44%** | 88ms | 132ms |
| `cubic-bezier(.2,0,0,1)` | Material 3 emphasized | 54% | 108ms | 162ms |
| `cubic-bezier(0,0,.2,1)` | Tailwind `ease-out`, M3 legacy-decelerate | 60% | 120ms | 180ms |
| `cubic-bezier(.3,.8,.6,1)` | GitHub Primer `easeOut` | 60% | 120ms | 180ms |
| `ease` (browser default) | everywhere by accident | 62% | 124ms | 186ms |
| `cubic-bezier(.4,0,.2,1)` | **Tailwind v4 default** | 63% | 126ms | 189ms |
| `cubic-bezier(.25,.46,.45,.94)` (outQuad) | **Linear's buttons** | 68% | 136ms | 204ms |
| `ease-out` (CSS keyword) | — | 74% | 148ms | 222ms |
| `ease-in-out` | — | 78% | 156ms | 234ms |
| `cubic-bezier(.4,0,.6,1)` | **Apple's house curve** (223 uses) | 79% | 158ms | 237ms |
| `linear` | spinners only | 90% | 180ms | 270ms |

This is why Stripe's 300ms reads as snappier than a Tailwind-default 200ms: 132ms of perceived
travel versus 126ms, but Stripe's has already moved 44% of the distance in the first 60ms while
Tailwind's default spends its first 40% accelerating. **A slow curve at a short duration feels
sluggish; a fast curve at a long duration feels expensive.** Apple deliberately picks the slow
end — `cubic-bezier(.4,0,.6,1)` at 240–320ms — because their motion is meant to be *watched*.
Radix picks the fast end — outExpo at 120ms — because their motion is meant to be *ignored*.

### Overshoot: measured peak of every "springy" bezier in the wild

| Curve | Product | Peak | Overshoot | At progress |
|---|---|---|---|---|
| `cubic-bezier(.175,.885,.32,1.1)` | Vercel `timing-swift` | 1.023 | **2.3%** | 73% |
| `cubic-bezier(.18,.89,.32,1.2)` | Figma | 1.058 | 5.8% | 66% |
| `cubic-bezier(.45,1.45,.8,1)` | Linear | 1.066 | 6.6% | 71% |
| `cubic-bezier(.175,.885,.32,1.275)` | Clerk (classic "easeOutBack") | 1.087 | 8.7% | 63% |
| `cubic-bezier(.68,-.55,.27,1.55)` | Supabase (backInOut) | 1.093 | 9.3% | 79% |
| `cubic-bezier(.34,1.56,.64,1)` | Raycast | 1.098 | 9.8% | 57% |
| `cubic-bezier(0.4,0,0.3,2)` | Apple (one element) | 1.280 | 28% | 67% |

**2–3% overshoot is invisible-but-felt. 6–10% is visible and reads as playful. Above 15% you have
made a toy.** Vercel's 2.26% is the value to steal for a product UI.

### Spring parameters, from source

**Motion 13.2.0** (`dist/motion.dev.js`, verbatim):

```js
springDefaults = { stiffness: 100, damping: 10, mass: 1.0, velocity: 0,
                   duration: 800 /*ms*/, bounce: 0.3, visualDuration: 0.3 /*s*/ }
underDampedSpring     = { stiffness: 500, damping: 25 }  // default for translate/rotate
criticallyDampedSpring= { stiffness: 550, damping: 30 }  // default for scale*
ease                  = { ease: [0.25, 0.1, 0.35, 1], duration: 0.3 }  // default for non-transforms
keyframesTransition   = { duration: 0.8 }                // when >2 keyframes
```

Converted to physics (ζ = c / 2√(km), overshoot = e^(−πζ/√(1−ζ²)), settle = 4/ζω<sub>n</sub>):

| Preset | ζ | overshoot | settles in |
|---|---|---|---|
| Motion `underDampedSpring` 500/25 | 0.559 | **12.0%** | 320ms |
| Motion `criticallyDampedSpring` 550/30 | 0.640 | 7.3% | 267ms |
| Motion `springDefaults` 100/10 | 0.500 | 16.3% | 800ms |
| Raycast's `--spring-1` (a 100-stop `linear()`, peak 1.04283 at 40%) | ≈0.708 | 4.3% | — |

**SwiftUI** (Apple's documentation API, exact signature defaults):

```swift
.smooth (duration: 0.5, extraBounce: 0.0)   // base bounce 0
.snappy (duration: 0.5, extraBounce: 0.0)   // base bounce 0.15
.bouncy (duration: 0.5, extraBounce: 0.0)   // base bounce 0.3
.spring(response: 0.5, dampingFraction: 0.825, blendDuration: 0)
.interactiveSpring(response: 0.15, dampingFraction: 0.86, blendDuration: 0.25)
```

Apple's headline number: **`duration: 0.5` on all three presets.** Their "duration" is *perceptual*
duration (roughly the settling time), not a clock. And `.interactiveSpring`'s response of **0.15** —
one-third of the default — is the value to copy for anything attached to a finger or cursor.

Bounce → overshoot, so you can pick a number instead of nudging a slider:

| bounce | ζ | overshoot |
|---|---|---|
| 0.00 | 1.00 | 0% (critically damped) |
| 0.15 (`.snappy`) | 0.85 | **0.63%** |
| 0.20 | 0.80 | 1.5% |
| 0.25 | 0.75 | 2.8% |
| 0.30 (`.bouncy`, Motion default) | 0.70 | 4.6% |
| 0.40 | 0.60 | 9.5% |
| 0.50 | 0.50 | 16.3% |

`.snappy` overshoots by less than a percent. Everyone describes it as "the bouncy one." It isn't —
it just decelerates hard. That's the whole trick.

### Component-library defaults worth knowing

| Source | Value |
|---|---|
| **Tailwind v4.3.3** `theme.css` | `--default-transition-duration: 150ms`; `--default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)` |
| **Vaul 1.1.2** (drawer) | `0.5s cubic-bezier(0.32, 0.72, 0, 1)` |
| **Sonner 2.0.8** (toast) | in: `transform 400ms, opacity 400ms, height 400ms, box-shadow 200ms`; swipe-out: `transform 500ms, opacity 200ms` |
| **tw-animate / shadcn** | `enter`/`exit` `.15s ease`; accordion `.2s ease-out`; sheet open `.5s` / closed `.3s` |
| **Radix docs site** | menu/popover in the 40–140ms band |

`cubic-bezier(0.4, 0, 0.2, 1)` at 150ms is the single most common motion signature on the web right
now, because it is Tailwind's default and nobody overrides it. It's fine. It is also the reason
every AI-generated interface moves identically. Overriding `--default-transition-timing-function`
and `--default-transition-duration` in your theme block is a two-line change that de-genericises an
entire product.

### Stagger, measured

| Source | Step | Item duration | Notes |
|---|---|---|---|
| **Apple** localnav (closing) | **20ms** | 320ms flat | items 1–5 delayed 260/280/300/320/340ms |
| **Apple** localnav (opening) | **0ms delay** | **400→320ms, −20ms/item** | all start together, finish staggered |
| **Apple** globalnav submenu | 80ms then 40ms | 320ms | delays 80/160/200ms — non-uniform, decelerating |
| **Figma** | 50ms | 180–250ms | `nth-child(3){50ms} nth-child(4){0.1s}` |
| **GitHub** product UI | 100ms | 160ms | `nth-child(2){.1s} nth-child(3){.2s} nth-child(4){.3s}` |
| **GitHub** marketing hero | 100–200ms | **800ms** | `cubic-bezier(0.2,0.4,0.2,1)` — scroll-reveal, not product motion |

Apple's opening trick deserves its own line: **zero delay, decreasing duration.** Every item starts
on the same frame, so the menu registers as one object appearing; they land 20ms apart, so it still
reads as a cascade. Nothing is ever sitting invisible waiting for its cue. That's strictly better
than delay-based stagger for a menu, and it costs the same.

---

## Decisions

### Does this animation earn its place?

Motion does exactly five jobs. If your animation isn't doing one, delete it.

1. **Continuity** — the thing that was here is now there, and you showed the trip. Sidebar
   collapse, tab underline slide, drawer.
2. **Spatial orientation** — where did this come from and where does dismissing it send me. A
   sheet from the bottom edge, a popover scaling from its trigger's corner.
3. **Feedback confirmation** — the system received your input. Button press, checkbox check,
   toggle knob.
4. **Attention direction** — something changed that you did not cause. A row appearing in a live
   list, a validation error, a toast.
5. **Perceived speed** — masking latency by giving the eye something to track while work happens.
   A skeleton, an optimistic row.

**The test:** turn the animation off and re-do the interaction. If nothing is now confusing,
ambiguous, or unacknowledged, the animation was decoration. Ship it off.

The second test, for anything on a frequently-repeated path: **multiply the duration by 50.** A
300ms panel animation on a route you hit fifty times a day is fifteen seconds a day of waiting
you designed in. That is why Linear's menus are 100ms and Radix's are 120ms and Arc's whole site
has 21 transitions. Frequency is the variable everyone forgets.

### How long?

Duration follows **distance and size**, not importance.

| What's moving | Duration | Real reference |
|---|---|---|
| Color, opacity, border, shadow on a control | **80–150ms** | GitHub buttons 80ms; Linear 100ms; Notion 150ms |
| Icon rotate, checkbox check, toggle knob | **120–200ms** | Radix 120ms; GitHub checkmark 200ms |
| Dropdown / popover / context menu | **100–200ms** | Linear 100ms; Vercel popover 200ms; Radix 120ms |
| Dialog / modal / accordion | **200–300ms** | Vercel overlay 300ms + `scale(.96)`; shadcn accordion 200ms |
| Sheet / drawer crossing an edge | **300–500ms** | Vaul 500ms; Sonner toast 400ms |
| Full-page or hero-scale spatial move | **400–600ms** | Apple 400–500ms |
| Anything longer | you are making a video | — |

Two corrections to the naive version of this rule:

- **Scale duration with distance, not sub-linearly with importance.** A 40px move and a 400px move
  at the same 250ms have wildly different apparent velocities; the short one looks lazy. Rough
  working rule from the observed data: distance under ~100px → 150–200ms; 100–400px → 250–300ms;
  more than half the viewport → 350–500ms.
- **Large surfaces need *longer* durations at the *same* velocity, because a big object moving
  fast reads as violent.** This is why Apple's 240ms house duration coexists with 500ms values on
  full-bleed sections.

### Which curve?

The physical intuition, which is the only one you need: **ease-out is a thing arriving and settling;
ease-in is a thing leaving and accelerating away; ease-in-out is a thing traveling between two
places while you watch.**

- **Entrances, and anything the user just triggered: ease-out.** The response begins at maximum
  velocity, which is what makes the UI feel like it reacted to you rather than considered your
  request. Linear uses `ease-out` in 98 declarations; GitHub's `--motion-easing-enter` is easeOut.
- **Exits: ease-in.** The element gathers speed as it leaves. Linear's context menu literally
  closes on `--ease-in-quad`. An ease-out exit looks like the element is reluctant.
- **Moves between two on-screen positions (tab indicator, reorder, layout shift): ease-in-out.**
  Both endpoints are visible so both need to be resolved.
- **`linear` is wrong for anything with mass.** It is correct for: spinners, marquees,
  determinate progress bars, cross-fades where nothing moves, and shimmer sweeps. Stripe uses it
  for a logo carousel opacity fade; Linear for a marquee. Nowhere else.

Curves worth memorizing, ranked by usefulness:

```css
/* The five I'd actually keep */
--ease-out-quad:  cubic-bezier(.25, .46, .45, .94);  /* Linear's default. Calm, unshowy. */
--ease-out-quart: cubic-bezier(.25, 1, .5, 1);       /* Stripe's. Fast start, luxurious tail. */
--ease-out-expo:  cubic-bezier(.16, 1, .3, 1);       /* Radix/GitHub. Near-instant, use ≤200ms. */
--ease-in-quad:   cubic-bezier(.55, .085, .68, .53); /* the exit partner for out-quad */
--ease-swift:     cubic-bezier(.175, .885, .32, 1.1);/* Vercel. 2.3% overshoot. Perfect for popovers. */
```

Note that `--ease-out-expo` at 400ms looks broken — 90% of the move happens in the first 132ms and
then it crawls. Fast curves demand short durations. This pairing constraint is the thing people get
wrong when they copy a curve off a gallery.

### Spring or curve?

Use a **curve** when the animation has a known start, a known end, and no one is touching it. That
is ~90% of product UI, and it should be plain CSS.

Use a **spring** when any of these are true:

- The animation can be **interrupted** and must retarget without a visible glitch. A curve
  restarting from a new position produces a velocity discontinuity you can see; a spring carries
  its velocity across.
- The motion is **attached to a gesture** — drag, swipe-to-dismiss, pull-to-refresh. Use
  `.interactiveSpring`-class parameters (response ≈0.15).
- You want a **specific settle character** that a bezier can't express, especially a controlled
  overshoot with a decaying tail.

Parameter starting points, derived from the tables above rather than from taste:

| Feel | bounce | ζ | Motion | SwiftUI |
|---|---|---|---|---|
| Mechanical, no overshoot | 0 | 1.0 | `{ visualDuration: 0.2, bounce: 0 }` | `.smooth(duration: 0.3)` |
| Crisp, product-safe | 0.15 | 0.85 | `{ visualDuration: 0.3, bounce: 0.15 }` | `.snappy` |
| Alive | 0.25–0.3 | 0.7–0.75 | `{ visualDuration: 0.35, bounce: 0.25 }` | `.bouncy` |
| Toy | 0.4+ | ≤0.6 | — | — |

**Prefer `visualDuration` + `bounce` over `stiffness`/`damping`/`mass`.** Stiffness and damping are
coupled — you cannot change one without changing both the speed and the feel — and this is why
hand-tuned springs drift into 800ms wobble. Motion's own default of `stiffness: 100, damping: 10`
is ζ=0.5, 16% overshoot, **800ms to settle**; it is a *fallback*, not a recommendation. If you type
`type: "spring"` with no other options on a non-transform property, that's the spring you get.

And springs are expressible in pure CSS now: Raycast ships a 100-stop `linear()` easing function as
`--spring-1` with a measured peak of 1.04283 at 40% progress. Zero JS, runs on the compositor.

### Enter/exit asymmetry

Symmetric enter/exit is the reliable signature of an animation system nobody thought about. The
rule, with the two real implementations:

```css
/* GitHub Primer */
--motion-transition-enter: 300ms cubic-bezier(.3,.8,.6,1);   /* easeOut */
--motion-transition-exit:  200ms cubic-bezier(.7,.1,.75,.9); /* easeIn  */

/* Linear, same element, both directions */
[data-state="open"]   { animation: contextMenuIn  var(--speed-quickTransition) var(--ease-out-quad); }
[data-state="closed"] { animation: contextMenuOut var(--speed-quickTransition) var(--ease-in-quad); }
```

Three things asymmetric between in and out, in priority order:

1. **Easing** (out → in). Non-negotiable.
2. **Duration** (exit 60–75% of enter). shadcn's sheet ships `open: .5s` / `closed: .3s`.
3. **Which properties animate.** Sonner's toast enters with transform *and* opacity over 400ms, but
   swipes out with `transform 500ms, opacity 200ms` — the opacity beats the transform out the door,
   so the toast is invisible long before it finishes traveling. That's the trick that makes a
   dismissal feel decisive rather than drawn-out.

Linear's `--speed-highlightFadeIn: 0s` / `--speed-highlightFadeOut: .15s` is the extreme, correct
form of this for hover and selection: **response is instantaneous, release is gentle.** The generic
implementation gives both directions the same 150ms, which puts a measurable lag between the cursor
arriving and the row lighting up. That lag is exactly the thing that makes cheap UI feel cheap.

### Choreography and stagger

Stagger exists to say "these things are related but ordered." It costs latency, so it should be
short and it should end.

- **Use 20–50ms per item, never more.** Apple ships 20ms; Figma 50ms. At 80ms a five-item menu takes
  320ms of pure delay before the last item is even beginning; at 100ms (the value every tutorial
  suggests) a ten-item list has a 1-second tail. That's the "sluggish" everyone reports.
- **Cap the total.** Stagger the first 5–8 items and give everything after that the same maximum
  delay. An infinite ladder means row 40 arrives 4 seconds late.
- **Prefer Apple's duration-stagger for menus**: identical zero delay, durations descending in 20ms
  steps (400/380/360/340/320ms). Everything starts on the same frame, which is what makes a menu
  read as one object; the staggered *landings* still give you the cascade.
- **Never stagger on exit.** Dismissal is one decision. Close everything on one frame, ease-in,
  done. Staggered exits are the single most annoying thing a menu can do.
- **Reverse the order for reverse motion.** A menu that opens top-down should close bottom-up if it
  staggers at all; the alternative reads as a bug.

Stagger belongs to: menus opening, notifications arriving in a burst, an initial list paint on a
cold route. It does not belong to: filtering an existing list, re-sorting, pagination, or anything
the user does more than a few times an hour.

### Shared elements, layout transitions, View Transitions

The correct default is: **animate the element's identity, not two separate fade animations.** When
a card expands into a detail view, the user should be able to point at the thing that moved.

- **Same-document View Transitions** (`document.startViewTransition`) is now the right tool for
  route-level and state-level changes in a page. Assign `view-transition-name` to the handful of
  elements that persist across the change and let the browser do the FLIP. Both Linear's and
  Vercel's sites already run with the API available.
- **Give exactly one element a `view-transition-name` per view.** Names must be unique on the page
  at capture time; the classic failure is naming every card in a grid the same thing, which throws
  and silently skips the transition.
- **The default root cross-fade is usually worse than nothing** for an app shell — the whole page
  dissolves, including the parts that didn't change. Turn it off and opt specific elements in:

```css
::view-transition-old(root), ::view-transition-new(root) { animation: none; }
```

- **For list add/remove/reorder inside a component, View Transitions is overkill.** A FLIP helper
  (or Motion's `layout` prop) is less code and interruptible.
- **Kill it under reduced motion.** Linear's exact rule:

```css
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) { animation: none !important; }
}
```

### Loading, waiting, and motion that marks time

- **Below ~300ms of latency, show nothing.** A spinner that flashes for 120ms is worse than a frozen
  button — it registers as a glitch. Delay the indicator: `animation-delay: 300ms` on the spinner's
  fade-in, or don't mount it until a 300ms timer fires.
- **Above ~1s, a spinner stops carrying information.** Switch to a skeleton that has the shape of
  the incoming content, or a progress indication with a real denominator.
- **A spinner that outlives its usefulness is worse than a stalled screen**, because it promises
  imminent completion on every rotation. If the operation can exceed 10s, you owe the user either
  progress or a cancel affordance.
- **Skeletons should shimmer slowly or not at all.** GitHub's `.SkeletonBox` runs a 1s linear
  shimmer with a masked gradient. Under 800ms a shimmer reads as strobing.
- **Never animate a number that represents real, current data.** A count-up on a live balance or a
  dashboard metric means that for 600ms your interface displays values that are false. Animate the
  number only when it changes *while the user is watching* and the transition itself is the
  information (a counter ticking up as events arrive), and use tabular figures so nothing reflows.

### `prefers-reduced-motion`, done properly

The media query does not mean "no feedback." It means **no vestibular-triggering motion**: no large
translations, no parallax, no spin, no zoom, no auto-playing loops. Opacity and color changes are
fine and should be kept, because they are the feedback channel.

Three real strategies from the probe, in ascending order of quality:

**1. GitHub — nuclear, scoped per component.** Effective, blunt:
```css
@media (prefers-reduced-motion: reduce) {
  .Primer_Brand__Button, .Primer_Brand__Button *,
  .Primer_Brand__Button::before, .Primer_Brand__Button::after {
    scroll-behavior: auto !important; transition: none !important; animation: none !important;
  }
  .hide-reduced-motion { visibility: hidden; display: none !important; }
}
```

**2. Linear and Vercel — motion is opt-in.** Linear puts 25 of its motion blocks inside
`@media (prefers-reduced-motion: no-preference)`, so the *unstyled* state is the still state and
motion is added on top. Vercel does the same with Tailwind's `motion-safe:` variants. This is
structurally the safest approach: you cannot ship an element stuck at `opacity: 0`, because the
`opacity: 0` never existed for that user.

**3. Stripe — substitution.** The best of the three. Zero the durations at the token layer, then
per component, ship the resting frame:
```css
@media (prefers-reduced-motion: reduce) {
  :root { --navigation-duration: 0s; --navigation-duration-slow: 0s; --navigation-hamburger-duration: 0s; }
  .fraud-and-risk-graphic__chart-bar        { opacity: 1; transform: none; }   /* show the end state */
  .agentic-commerce-ai-graphic__agent-bubble-dots     { display: none; }       /* animated typing dots… */
  .agentic-commerce-ai-graphic__agent-bubble-text--fallback { display: block; }/* …become static text  */
  .usage-based-billing-invoice__line-arrow--static    { opacity: 1; }          /* moving arrow → still one */
}
```

Vercel does the same for charts: `motion-reduce:[&_.recharts-line-curve]:!opacity-100` — the line is
drawn, just not drawn *in*.

**The rule:** for every animation you write, name the still frame that replaces it. If your answer
is "it just doesn't animate," check whether the element's initial state is visible. A scroll-reveal
whose `from` is `opacity: 0` and whose reduced-motion rule is `animation: none` produces an
invisible page. This is the most common real accessibility bug in AI-generated marketing sites.

### Performance

- **Animate `transform` and `opacity`. Everything else is a compromise.** These two are handled by
  the compositor and never touch layout or paint. `filter` and `backdrop-filter` are
  compositor-eligible but expensive per-pixel; `clip-path` is fine but paints. `width`, `height`,
  `top`, `left`, `margin`, and `padding` trigger layout on every frame — that's 60 reflows per
  second of your whole subtree.
- **The `height: auto` problem** is the one real exception people hit. Options in order: animate a
  wrapper's `transform: scaleY()` with a counter-scaled child; animate `grid-template-rows: 0fr →
  1fr`; or use `calc-size()` / `interpolate-size: allow-keywords` behind `@supports` where
  available. shadcn's accordion animates `height` to a measured pixel value from a Radix CSS
  variable, which is the pragmatic answer.
- **`will-change` is a budget, not a hint.** Every element with `will-change` gets its own
  compositor layer and its own chunk of GPU memory. Stripe and Linear both apply it narrowly —
  `will-change: transform`, `will-change: opacity, transform`, on individual animating elements —
  never on a container. Add it on hover-intent or just before the animation, remove it after. A
  page-wide `* { will-change: transform }` is a memory leak with good intentions.
- **Avoid layout thrash in JS-driven motion**: never read `getBoundingClientRect()` inside the same
  frame you write styles. Batch all reads, then all writes. FLIP is exactly this discipline
  formalized.
- **`content-visibility: auto`** on long off-screen lists costs you nothing and removes their
  animation work from the frame budget entirely.
- Verify, don't assume: DevTools → Rendering → **Paint flashing** and **Layer borders**. If your
  hover animation flashes green rectangles, it's repainting.

---

## When this advice is wrong

- **Games, creative tools, and onboarding are different genres.** A 600ms spring with 20% overshoot
  is wrong in a settings panel and exactly right on a canvas tool's brush-size popover, where the
  motion is part of the product's character. Figma runs overshoot curves up to 8.8% for this reason.
- **Marketing pages get a longer budget than product UI.** GitHub's marketing hero staggers at 100ms
  with 800ms durations — numbers that would be indefensible in the issues list two clicks away. The
  same company, correctly, runs two different motion systems. The mistake is applying the marketing
  numbers to the app, which is the direction the error always goes.
- **"Nothing moves on hover" is a density rule, not a universal one.** A 3-card pricing grid on a
  landing page absolutely should lift on hover — there are three of them and the user's cursor is
  not sweeping. Apple lifts cards `scale(1.0161)`; GitHub uses `scale(1.025)`. The rule binds when
  the list is long enough that the cursor crosses many items on the way somewhere else.
- **Small elements need bigger scale deltas.** A 2% scale on a 400px card is legible; on a 16px
  emoji it's invisible. Figma scales reaction emoji `1.2` and avatars `1.1`. Scale delta should be
  roughly inverse to element size.
- **The 8px-grid-style "always use 150ms" advice is wrong** because duration without easing is
  meaningless — see the perceived-duration table. 300ms on outQuart is faster-feeling than 200ms on
  the Tailwind default. Specify the pair or specify nothing.
- **`linear` is right sometimes, and `ease-in-out` is right more often than purists admit.** Any
  element traveling between two visible positions — a tab indicator, a reordering row, a carousel —
  wants ease-in-out. Apple's most-used curve is a symmetric `cubic-bezier(.4,0,.6,1)`, used 223
  times, because most of Apple's motion is scroll-linked travel, not response.
- **A 100ms menu is wrong on a touch screen.** Touch has no hover to telegraph intent and a finger
  occludes the target, so touch UI genuinely benefits from 200–300ms and a visible spatial origin.
  Vaul's 500ms drawer is a touch-first number and it is right.
- **Reduced-motion is not the only accessibility axis.** Vestibular users need less movement;
  cognitive-load users often need *more* transition, not less, to track what changed. When you
  substitute, prefer a cross-fade over an instant cut.

---

## Anti-patterns: what AI-generated UI does, and the fix

| The tell | Why it happens | The specific fix |
|---|---|---|
| **Every section fades and slides up on scroll.** The #1 signature of a generated marketing page. | Scroll-reveal is the easiest impressive-looking thing to add. | Animate at most the hero, once. Everything below the fold is already in a scroll-driven position — you have a motion primitive called "scrolling." If you must, one section, `translateY(8px)` not `40px`, 300ms, and it never replays. |
| **`transition: all 300ms ease-in-out` on everything.** | It's one line and it "works." | Name the properties. `all` transitions layout properties you didn't intend (including `width` on a resize) and forces the browser to check every property every frame. Use `transition: background-color 100ms var(--ease-out-quad), color 100ms var(--ease-out-quad)`. |
| **Rows lift 4px on hover.** | The tutorial card-hover effect applied to a data table. | Background change only: a 4% white/black overlay. Linear moves a 1px arrow glyph and leaves the row still. |
| **Symmetric enter/exit.** | Nobody wrote the exit; the transition just ran backwards. | Exit at 60–75% of enter duration, on ease-in. |
| **Spinner on every action, mounted instantly.** | The loading state is bound directly to `isLoading`. | 300ms delay before showing anything; skeleton over 1s; disable the button and keep its label rather than replacing it with a spinner (the label is information, the spinner isn't). |
| **Animated counters on real numbers.** | It looks impressive in a demo. | Render the value. Animate only a value that changes under observation, in tabular figures. A count-up on page load means your dashboard displays wrong numbers for 800ms. |
| **50–150ms stagger on lists.** | Every stagger tutorial uses 100ms. | 20–50ms, capped after 5–8 items, never on exit. |
| **Parallax on content.** | Depth reads as "designed." | Parallax on decorative background layers only, and at most 10–15% differential. Content that moves at a different speed than the scroll is unreadable and is a vestibular trigger. |
| **Scroll-jacking / scroll-hijacked storytelling.** | It's the flagship demo of every scroll library. | Don't. If the content is sequential, use sections and let the browser scroll. (The usability case against it is summarised in this library's `libraries/_research/motion.md`, which rates scroll-jacked storytelling `avoid`.) |
| **`prefers-reduced-motion` handled with `animation: none`.** | It's what the snippet says. | Substitute the end state. Test it: set the OS preference and reload. If anything is invisible or mid-transform, you shipped a bug. |
| **Springs tuned by nudging `stiffness` until it "feels right."** | The API exposes physics, so people tune physics. | `visualDuration` + `bounce`. Start at `{ visualDuration: 0.3, bounce: 0.15 }` and change one number. |
| **`will-change: transform` on a wrapper "for performance."** | Cargo-culted from a perf article. | Only on the specific animating element, only while it animates. |
| **Hover animations on a `<canvas>`-adjacent or virtualized list.** | The hover handler is on the row component. | Use CSS `:hover` (free) rather than JS state (a React re-render per row per mouse-move). |
| **A 700ms "premium" easing on a button.** | Long = luxurious. | 80–150ms. Buttons at GitHub are 80ms. Luxury is in the curve and the color, not the wait. |

---

## Self-check

Run this list against your own output before you call motion done.

1. Can I name which of the five jobs each animation does? Delete every one I can't.
2. Did I turn each animation off and confirm the interaction got worse?
3. Is any duration longer than 300ms attached to something that moves less than half a viewport?
4. Are my entrances ease-out and my exits ease-in, and is the exit shorter?
5. Did I specify a duration *and* a curve together, or did I inherit Tailwind's `150ms
   cubic-bezier(.4,0,.2,1)` by accident on 40 elements?
6. Does anything move geometrically on hover inside a list longer than five items?
7. Is my stagger step ≤50ms, capped, and absent on exit?
8. Does every animated property resolve to `transform` or `opacity`? For each one that doesn't, do I
   know why and have I checked paint flashing?
9. With the OS reduced-motion preference on, is every element visible, in its final position, and
   still giving feedback on interaction?
10. Is there a `will-change` I didn't remove?
11. If the network is slow, does any spinner appear before 300ms or persist past 10s without
    progress or a cancel?
12. Does any number on screen animate that represents live data?
13. On the marketing page: how many separate entrance animations fire between the top and the fold?
    More than one is one too many.

---

## Method

Chromium/Playwright, 1440×900, real UA, 4–5s settle. For each product I captured every stylesheet
response plus inline `<style>` blocks (0.3–2.5 MB per site), then counted `transition-duration`,
`transition-timing-function`, `animation-duration`, `transition-delay` and `will-change`
declarations; separately extracted `:root`/`html` custom properties matching
`dur|ease|transit|anim|spring|timing|motion|curve`; separately walked `@media` blocks to split
`prefers-reduced-motion: reduce` from `: no-preference`; and separately read computed styles off
live `button`, `a`, `input`, `summary` and card/item elements. Library values (Motion 13.2.0,
Tailwind 4.3.3, Vaul 1.1.2, Sonner 2.0.8, `@material/web` 2.5.0) come from `npm pack` of the
published tarball, not documentation. SwiftUI values come from
`developer.apple.com/tutorials/data/documentation/swiftui/animation/*.json`, which returns the
declared signature defaults. Bezier peaks and 90%-progress points were computed by sampling each
curve at 10,000 points; damping ratios and overshoots from ζ = c/2√(km) and e^(−πζ/√(1−ζ²)).
