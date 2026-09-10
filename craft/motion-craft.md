# Motion craft

**Measured 2026-09.** Every number here came out of a shipping product's stylesheet, a library's
published tarball, a live browser probe, or Apple's documentation API. Nothing is recalled. Method
at the bottom; where a value is derived rather than read it says so.

This is not a library survey (that's `libraries/_research/motion.md`). This is the craft: how long,
how far, which curve, in what order, and — most of the time — whether to animate at all.

The reason this file exists: generated interfaces animate **too much, too far, and too slowly.**
Not one of those three is a taste question. All three have measured answers.

---

## If you only apply five things

1. **Move things 4–12px, not 20–40px.** This is the single most common numeric error. Real
   entrance keyframes: Resend's menus `translateY(4px)`, Apple's nav flyout `translate(8px)`,
   Ramp's nav `translateY(8px)`, Figma's modal `translateY(12px) scale(.97)`. The AI default of
   `translateY(20px)` or `40px` is a *marketing hero* distance (Resend's own hero uses 16px) applied
   to product chrome, and it is why generated UI feels like it's flapping.
2. **150–200ms for anything the user just clicked, 200–300ms for a panel, and nothing between
   300ms and 500ms unless the thing crosses more than half the viewport.** Linear's modal duration
   is 160ms (49 declarations). Notion's whole scale stops at 300ms. Figma's is 250ms (462
   declarations). GitHub's buttons are 80ms. If you wrote 700ms, you were decorating.
3. **Ease-out in, ease-in out, and never `linear` for anything with a body.** Airbnb ships the pair
   as two tokens: `--motion-enter-curve: cubic-bezier(.1,.9,.2,1)` (90% of the distance covered by
   32% of the time) and `--motion-exit-curve: cubic-bezier(.4,0,1,1)` (90% at 94% — it accelerates
   out the door). Figma's modal enters over 220ms on an overshoot curve and exits over 160ms on
   `ease-in`. Symmetric enter/exit is the reliable tell that nobody wrote the exit.
4. **Nothing moves geometrically on hover inside a list.** Change background, not position. The
   `translateY(-4px)` card-lift applied to a 30-row table makes it breathe. Linear moves a 1px arrow
   glyph and leaves the row still.
5. **Under `prefers-reduced-motion`, substitute the resting frame — then verify by counting.** Open
   DevTools with the preference on and run
   `document.getAnimations().filter(a => a.playState === 'running' && a.effect.getTiming().iterations === Infinity).length`.
   Stripe goes 18 → 1. Linear goes 107 → 101. Cursor goes 37 → 37. Resend keeps a 30s `rotate`
   running, which is a straight vestibular trigger. Writing the media query is not the same as
   passing the test.

---

## Measured reference

### 1. Travel distance — the number nobody publishes

Extracted from `@keyframes` bodies: every `translate*()` pixel value used in an entrance or exit,
counted across each site's full stylesheet payload.

| Product | Dominant travel in keyframes | What it's on |
|---|---|---|
| **Cursor** | **2px** ×7, 3px ×4 | micro-feedback |
| **Raycast** | **2px** ×8, 10px ×7 | small UI vs. panels |
| **Resend** | **4px** ×8, then 16px ×4 | menus at 4px; hero/header at 16px |
| **Apple** (macbook-pro) | **8px** ×8, 4px ×6 | nav flyout 8px; hover chevron + link entrance 4px |
| **Ramp** | **8px** ×10 | `desktopNavContentRiseIn` |
| **Figma** | **10px** ×50, 8px ×40, **12px** ×40 | modal = `translateY(12px) scale(.97)` |
| **Linear** | **zero px translates in any keyframe** | Linear animates scale + opacity only |
| **Airbnb** | 3–8px cluster, plus 50/100px for full-screen sheets | product vs. screen transitions |

Verbatim, so you can copy the actual shapes:

```css
/* Resend — menu/popover. 4px. */
@keyframes open-slide-down-fade  { 0%{opacity:0; transform:translateY(-4px)} to{opacity:1; transform:translateY(0)} }
@keyframes close-slide-up-fade   { 0%{opacity:1; transform:translateY(0)}    to{opacity:0; transform:translateY(-4px)} }
/* …used at .2s. And the same product's hero: */
@keyframes hero-text-slide-up-fade { 0%{opacity:0; transform:translateY(16px)} to{opacity:1; transform:translateY(0)} }
/* …used at 1s ease-in-out. Same codebase: 4× the distance and 5× the duration for marketing. */

/* Apple — global nav flyout. 8px, direction-aware (forward/back get mirrored keyframes). */
@keyframes globalnav-flyout-slide-forward-next     { 0%{opacity:0; transform:translate(8px)}  to{opacity:1; transform:translate(0)} }
@keyframes globalnav-flyout-slide-forward-previous { 0%{opacity:1; transform:translate(0)}    to{opacity:0; transform:translate(-8px)} }

/* Figma — modal. 12px + a 3% scale, enter 220ms with 1.2% overshoot, exit 160ms ease-in. */
@keyframes modalSlideIn  { from{opacity:0; transform:translateY(12px) scale(.97)} to{opacity:1; transform:translateY(0) scale(1)} }
.modal      { animation: modalSlideIn  220ms cubic-bezier(.34,1.2,.64,1) forwards; }
.modal.out  { animation: modalSlideOut 160ms ease-in forwards; }
```

**The rule that falls out:** travel scales with the surface, not with importance.

| Surface | Travel | Pair with |
|---|---|---|
| Icon nudge, chevron, hover affordance | **2–4px** | 100–150ms |
| Dropdown, menu, popover, tooltip | **4–8px** | 120–200ms |
| Dialog, modal, card expand | **8–12px** + `scale(.96–.98)` | 200–250ms |
| Sheet crossing a screen edge | full height/width of the sheet | 300–500ms |
| Marketing hero text | **12–24px** | 600–1000ms |

Scale is the other axis, and its range is even tighter. Popover/overlay entrance scales in the
wild: Vercel `--ds-motion-overlay-scale: .96`; Ramp `.96`; Raycast `.96` / `.98`; Figma `.97`;
Linear `.98` / `.96`; modals and larger surfaces reach `.9`. **`scale(0.95)` is the floor for
anything the user is looking at; `scale(0.8)` is a toy.**

### 2. Duration histograms — what products actually ship

Counted occurrences of every `transition-duration` (including shorthand) across each site's whole
CSS payload. "Dominant" is the modal value — the product's real house duration.

| Product | Total decls | Dominant | Rest of the distribution | Reduced-motion blocks |
|---|---|---|---|---|
| **Figma** | 1188 | **250ms** ×462 | 200×202, 400×102, 150×100, 180×88, 40×50 | 50 `reduce` |
| **Apple** (macbook-pro) | 841 | **240ms** ×117 | 320×93, 400×80, 500×68, 300×54, 250×47 | 1 |
| **Airbnb** | 528 | **200ms** ×126 | 300×100, 150×60, 250×47, 100×30, 500×27 | 5 |
| **Raycast** | 336 | **300ms** ×124 | 200×89, 150×37, 100×23 | 5 |
| **GitHub** | 249 | **200ms** ×60 | **80×48**, 300×18, 400×16, 120×15, 100×13 | 32 + 36 `no-preference` |
| **Linear** | 145 | **160ms** ×49 | 200×25, 120×17, 400×11, 100×9 | 20 + 24 `no-preference` |
| **Vercel** | 127 | **150ms** ×34 | 200×28, 100×11, 250×10, 300×8 | 12 + 8 `no-preference` |
| **Stripe** | 117 | **300ms** ×51 | 200×14, 500×12, 150×9, 400×7 | 14 + **66 `no-preference`** |
| **Notion** | 100 | **150ms** ×43 | 200×19, 300×9, 250×8 | 10 + 9 `no-preference` |
| **Ramp** | 95 | 200ms ×15 | 150×11, 300×11, 500×7, 250×7 | 8 |
| **Resend** | 94 | **200ms** ×22 | 300×16, 400×12, 150×8, 360×6 | 4 |
| **Cursor** | **38** | 200ms ×8 | 150×7, 400×6, 300×3 | 4 |
| **Framer** | **14** | 218ms ×6 | 200×3, 300×3 | 0 |
| **cal.com** | **5** | 150ms ×3 | 200, 400 | 0 |
| **Vaul 1.1.2** (drawer lib) | 6 | 150ms ×4 | 500×2 (the drawer itself) | — |

Read the bottom of that table twice. Framer's marketing site ships **14** transition declarations
and cal.com ships **5**; Figma's app shell ships 1188. Neither end is wrong. But "how many distinct
animations does this interface contain" is a decision you are making whether or not you notice, and
the default answer for a tool is *far fewer than a component library gives you for free*.

Also note GitHub's second peak: **80ms, 48 times.** That's `--duration-fast`, and it is on buttons
and inputs. The house duration is 200ms; the *response* duration is 80ms. Two numbers, two jobs.

### 3. Perceived duration — the table that changes decisions

`transition-duration` is not how long the motion looks. I sampled each shipping curve at 20,000
points and recorded **the fraction of the duration at which 90% of the movement is complete.**
Multiply that by your duration to get what the user actually perceives.

| Curve | Where it ships | 90% done at | 200ms feels like | 300ms feels like |
|---|---|---|---|---|
| `cubic-bezier(.1,.9,.2,1)` | **Airbnb `--motion-enter-curve`** | **32%** | 64ms | 96ms |
| `cubic-bezier(.16,1,.3,1)` (outExpo) | Radix, GitHub, Stripe | **33%** | 66ms | 99ms |
| `cubic-bezier(.175,.885,.32,1.1)` | Vercel `timing-swift` | 34% | 68ms | 102ms |
| `cubic-bezier(.32,.72,0,1)` | Vaul, Linear, shadcn | 37% | 74ms | 111ms |
| `cubic-bezier(.22,1,.36,1)` | Cursor (`.42s` mobile sheet) | 37% | 74ms | 111ms |
| `cubic-bezier(.25,1,.5,1)` (outQuart) | **Stripe's house curve** | 44% | 88ms | 132ms |
| `cubic-bezier(.2,0,0,1)` | Airbnb `standard`, M3 `emphasized` | 54% | 108ms | 162ms |
| `cubic-bezier(0,0,.2,1)` | Tailwind `ease-out` | 60% | 120ms | 180ms |
| `cubic-bezier(.4,0,.2,1)` | **Tailwind v4 default** | 63% | 126ms | 189ms |
| `cubic-bezier(.25,.46,.45,.94)` (outQuad) | **Linear's buttons** | 68% | 136ms | 204ms |
| `ease-out` (keyword) | — | 74% | 148ms | 222ms |
| `ease-in-out` (keyword) | — | 78% | 156ms | 234ms |
| `cubic-bezier(.4,0,.6,1)` | **Apple's house curve** | 79% | 158ms | 237ms |
| `cubic-bezier(.4,0,1,1)` | **Airbnb `--motion-exit-curve`** | **94%** | 188ms | 282ms |
| `linear` | spinners only | 90% | 180ms | 270ms |

Two things fall out of this that people get wrong constantly:

- **A slow curve at a short duration feels sluggish; a fast curve at a long duration feels
  expensive.** Stripe's 300ms outQuart reads snappier than a Tailwind-default 200ms, because
  Stripe has already moved 44% of the distance in the first 60ms while Tailwind's default spends
  its first 40% accelerating.
- **Fast curves demand short durations.** `outExpo` at 400ms looks *broken*: 90% of the move
  happens in the first 132ms and then it crawls for a quarter second. This pairing constraint is
  what people miss when they copy a curve off a gallery.

And look at the exit curve. Airbnb's `cubic-bezier(.4,0,1,1)` reaches 90% at 94% of its duration —
almost the entire travel happens in the last frames. That's exactly right for an exit: the element
lingers for a beat so you register that it's leaving, then it's gone.

### 4. Overshoot — measured peak of every "springy" bezier in the wild

| Curve | Product | Peak | Overshoot | At progress |
|---|---|---|---|---|
| `cubic-bezier(.34,1.2,.64,1)` | **Figma modal enter** | 1.013 | **1.2%** | 74% |
| `linear(…)` ~95-stop | **Vercel `--timing`** | 1.013 | **1.3%** | 53% |
| `cubic-bezier(.175,.885,.32,1.1)` | Vercel `timing-swift` | 1.023 | 2.3% | 73% |
| `cubic-bezier(.18,.89,.32,1.2)` | Figma | 1.058 | 5.8% | 66% |
| `cubic-bezier(.45,1.45,.8,1)` | Linear | 1.066 | 6.6% | 71% |
| `linear(…)` 9-stop | **Airbnb `springs-fast-bounce`** | 1.044 | 4.4% | 63% |
| `cubic-bezier(.175,.885,.32,1.275)` | Clerk (easeOutBack) | 1.087 | 8.7% | 63% |
| `linear(…)` 13-stop | Airbnb (gallery) | 1.095 | **9.5%** | 42% |
| `cubic-bezier(.34,1.56,.64,1)` | Raycast | 1.098 | 9.8% | 57% |
| `linear(…)` 10-stop | Airbnb (gallery, most aggressive) | 1.155 | **15.5%** | 33% |
| `cubic-bezier(0.4,0,0.3,2)` | Apple (one element) | 1.280 | 28% | 67% |

**1–3% overshoot is invisible-but-felt and is what shipping product chrome uses. 4–10% is visible
and reads as playful. Above 15% you have made a toy** — and note that Airbnb only goes there inside
a photo gallery, never on a form control. Vercel's 1.3% and Figma's 1.2% are the values to steal.

### 5. Springs — the best production reference I found

Airbnb ships a **complete spring token system in pure CSS**, with the source physics parameters
left in the stylesheet next to the precompiled `linear()` easing. This is the closest thing to a
public answer for "what stiffness and damping actually feel right."

```css
--motion-springs-fast-source-stiffness:          300px;  --motion-springs-fast-source-damping:          35px;
--motion-springs-fast-bounce-source-stiffness:   250px;  --motion-springs-fast-bounce-source-damping:   22px;
--motion-springs-standard-source-stiffness:      175px;  --motion-springs-standard-source-damping:      26px;
--motion-springs-medium-bounce-source-stiffness: 175px;  --motion-springs-medium-bounce-source-damping: 18.5px;
--motion-springs-slow-source-stiffness:          100px;  --motion-springs-slow-source-damping:          20px;
--motion-springs-slow-bounce-source-stiffness:   100px;  --motion-springs-slow-bounce-source-damping:   14px;
/* mass is 1 for all six */
```

Converted (ζ = c / 2√(km); overshoot = e^(−πζ/√(1−ζ²)); settle = 4/ζωₙ):

| Airbnb token | k | c | **ζ** | overshoot | theoretical settle | **duration they ship** |
|---|---|---|---|---|---|---|
| `springs-fast` | 300 | 35 | **1.010** | 0% | 229ms | 451.75ms |
| `springs-fast-bounce` | 250 | 22 | **0.696** | 4.8% | 364ms | 449.12ms |
| `springs-standard` | 175 | 26 | **0.983** | 0% | 308ms | 583.77ms |
| `springs-medium-bounce` | 175 | 18.5 | **0.699** | 4.6% | 432ms | 574.12ms |
| `springs-slow` | 100 | 20 | **1.000** | 0% | 400ms | 745.61ms |
| `springs-slow-bounce` | 100 | 14 | **0.700** | 4.6% | 571ms | 762.28ms |

**Every non-bounce spring is ζ ≈ 1.0. Every bounce spring is ζ ≈ 0.70. They only vary stiffness.**
That is the entire design of the system, and it is the correct way to think about springs: pick
your damping ratio once for the product's character, then move stiffness to change tempo. Nudging
stiffness and damping independently until it "feels right" is how you end up with an 800ms wobble.

The ζ = 0.70 figure is not an Airbnb quirk. It is the industry's converged answer:

| Source | Named "bouncy" preset | ζ | overshoot |
|---|---|---|---|
| Airbnb `*-bounce` | — | 0.696–0.700 | 4.6–4.8% |
| Motion (`bounce: 0.3`, the default) | — | 0.70 | 4.6% |
| SwiftUI `.bouncy` (base bounce 0.3) | — | 0.70 | 4.6% |
| SwiftUI `.snappy` (base bounce 0.15) | — | 0.85 | **0.63%** |
| SwiftUI `.smooth` / Motion `bounce: 0` | — | 1.00 | 0% |

`bounce → ζ` is just `ζ = 1 − bounce`, so you can pick a number instead of a slider:

| bounce | ζ | overshoot |
|---|---|---|
| 0.00 | 1.00 | 0% |
| 0.15 (`.snappy`) | 0.85 | **0.63%** |
| 0.20 | 0.80 | 1.5% |
| 0.25 | 0.75 | 2.8% |
| 0.30 (`.bouncy`, Motion default) | 0.70 | **4.6%** |
| 0.40 | 0.60 | 9.5% |
| 0.50 | 0.50 | 16.3% |

`.snappy` overshoots by six-tenths of one percent. Everyone calls it "the bouncy one." It isn't —
it just decelerates hard. That's the whole trick.

**Library defaults, from source, not docs:**

```js
// Motion 13.2.0, dist/motion.dev.js
springDefaults        = { stiffness:100, damping:10, mass:1, velocity:0, duration:800, bounce:0.3, visualDuration:0.3 }
underDampedSpring     = { stiffness:500, damping:25 }   // default for translate/rotate → ζ 0.559, 12.0% overshoot, 320ms
criticallyDampedSpring= { stiffness:550, damping:30 }   // default for scale*          → ζ 0.640,  7.3% overshoot, 267ms
ease                  = { ease:[0.25,0.1,0.35,1], duration:0.3 }   // default for non-transforms
```

```swift
// SwiftUI, from the documentation API's declared signatures
.smooth(duration: 0.5, extraBounce: 0.0)   // base bounce 0
.snappy(duration: 0.5, extraBounce: 0.0)   // base bounce 0.15
.bouncy(duration: 0.5, extraBounce: 0.0)   // base bounce 0.3
.spring(response: 0.5, dampingFraction: 0.825, blendDuration: 0)
.interactiveSpring(response: 0.15, dampingFraction: 0.86, blendDuration: 0.25)
```

Apple's headline number is **`duration: 0.5` on all three presets** — but their "duration" is
perceptual settling time, not a clock. And `.interactiveSpring`'s response of **0.15**, one third of
the default, is the value to copy for anything attached to a finger or a cursor.

Motion's own bare default (`stiffness:100, damping:10`) is ζ = 0.5, 16% overshoot, **800ms to
settle**. That is a fallback, not a recommendation, and it is what you get if you type
`type: "spring"` on a non-transform property with no other options.

### 6. Published motion token systems, verbatim

**Airbnb** — three curves and six springs, and that's the whole system:
```css
--motion-enter-curve-animation-timing-function:  cubic-bezier(0.1, 0.9, 0.2, 1);   /* 90% at 32% */
--motion-exit-curve-animation-timing-function:   cubic-bezier(0.4, 0,   1,   1);   /* 90% at 94% */
--motion-standard-curve-animation-timing-function: cubic-bezier(0.2, 0, 0, 1);     /* 90% at 54% */
--motion-linear-curve-animation-timing-function: cubic-bezier(0, 0, 1, 1);         /* literally linear */
```

**GitHub Primer** — the most complete public enter/exit spec. Note it does not expose a duration
for you to pick; it exposes an *intent*:
```css
--base-duration-50: 50ms;  --base-duration-100…500: .1s….5s;
--base-easing-ease:      cubic-bezier(.25, .1,  .25, 1);
--base-easing-easeIn:    cubic-bezier(.7,  .1,  .75, .9);
--base-easing-easeOut:   cubic-bezier(.3,  .8,  .6,  1);
--base-easing-easeInOut: cubic-bezier(.6,  0,   .2,  1);
--motion-transition-enter:       300ms easeOut;
--motion-transition-exit:        200ms easeIn;      /* 67% of enter */
--motion-transition-hover:       100ms ease;
--motion-transition-stateChange: 200ms easeInOut;
--duration-fast: 80ms;   /* what buttons and inputs actually use, at cubic-bezier(.65,0,.35,1) */
```

**Linear** — a full Penner set plus four semantic speeds. The two `highlight` values are the most
instructive numbers in this document:
```css
--speed-quickTransition:   .1s;    /* menus, popovers */
--speed-regularTransition: .25s;
--speed-highlightFadeIn:   0s;     /* ← selection/hover appears INSTANTLY  */
--speed-highlightFadeOut:  .15s;   /* ← and releases over 150ms            */
--ease-out-quad:  cubic-bezier(.25,.46,.45,.94);   --ease-in-quad:  cubic-bezier(.55,.085,.68,.53);
--ease-out-cubic: cubic-bezier(.215,.61,.355,1);   --ease-in-cubic: cubic-bezier(.55,.055,.675,.19);
--ease-out-quart: cubic-bezier(.165,.84,.44,1);    --ease-out-quint: cubic-bezier(.23,1,.32,1);
--ease-out-expo:  cubic-bezier(.19,1,.22,1);       --ease-out-circ:  cubic-bezier(.075,.82,.165,1);
```

**Vercel Geist** — three tokens plus one `linear()` spring:
```css
--ds-motion-timing-swift:     cubic-bezier(.175,.885,.32,1.1);   /* 2.3% overshoot at 73% */
--ds-motion-overlay-duration: .3s;   --ds-motion-overlay-scale: .96;
--ds-motion-popover-duration: .2s;
--timing: linear(0 0%, … 1.01269 53% … );   /* 95 stops, 1.3% overshoot; feeds --tw-ease */
```

**Notion "tatami"** — the notable thing is what's absent. Five durations, hard ceiling at 300ms:
```css
--tatami-motion-duration-100…300: .1s .15s .2s .25s .3s;   /* nothing longer exists */
--tatami-motion-timing-function-ease-out: cubic-bezier(0, 0, .58, 1);
--tatami-motion-timing-function-ease-in:  cubic-bezier(.42, 0, 1, 1);
```

**Material 3** (`@material/web@2.5.0`): durations `short1–4` 50/100/150/200, `medium1–4`
250/300/350/400, `long1–4` 450–600, `extra-long1–4` 700–1000; easings `emphasized`
`cubic-bezier(.2,0,0,1)`, `emphasized-decelerate` `cubic-bezier(.05,.7,.1,1)`,
`emphasized-accelerate` `cubic-bezier(.3,0,.8,.15)`, `legacy` `cubic-bezier(.4,0,.2,1)` (which is
Tailwind's default).

**Tailwind v4.3.3** `theme.css`: `--default-transition-duration: 150ms`,
`--default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)`.

`cubic-bezier(.4,0,.2,1)` at 150ms is the most common motion signature on the web right now,
because it's Tailwind's default and nobody overrides it. It's fine. It is also why every generated
interface moves identically. **Overriding those two variables in your theme block is a two-line
change that de-genericises an entire product** — that is exactly what Vercel does with `--timing`
and Resend does with `--tw-ease`.

### 7. Stagger, measured

| Source | Step | Item duration | Notes |
|---|---|---|---|
| **Apple** localnav (closing) | **20ms** | 320ms flat | delays 240/260/280/300/320/340/360/380ms |
| **Apple** localnav (opening) | **0ms delay** | **400→320ms, −20ms/item** | all start together, finish staggered |
| **Apple** globalnav submenu | 80ms then 40ms | 320ms | delays 80/160/200ms — decelerating, not uniform |
| **Figma** | 50ms | 180–250ms | `nth-child(3){50ms} nth-child(4){.1s}` |
| **Airbnb** page-header (View Transition) | 100ms delay on *enter only* | 200ms in / 100ms out | old header is gone before new one starts |
| **GitHub** product UI | 100ms | 160ms | `nth-child(2){.1s} … nth-child(4){.3s}` |
| **GitHub** marketing hero | 100–200ms | **800ms** | scroll-reveal, not product motion |

Apple's opening trick deserves its own line: **zero delay, decreasing duration.** Every item starts
on the same frame, so the menu registers as one object appearing; they land 20ms apart, so it still
reads as a cascade. Nothing is ever sitting invisible waiting for its cue. Strictly better than
delay-based stagger for a menu, and it costs the same.

---

## Decisions

### Does this animation earn its place?

Motion does exactly five jobs. If yours isn't doing one of them, delete it.

1. **Continuity** — the thing that was here is now there, and you showed the trip. Sidebar
   collapse, tab underline slide, drawer.
2. **Spatial orientation** — where did this come from and where does dismissing it send me. A sheet
   from the bottom edge; a popover scaling from its trigger's corner.
3. **Feedback confirmation** — the system received your input. Button press, checkbox, toggle knob.
4. **Attention direction** — something changed that you did not cause. A row appearing in a live
   list, a validation error, a toast.
5. **Perceived speed** — masking latency by giving the eye something to track. Skeleton, optimistic
   row.

**Test one:** turn it off and redo the interaction. If nothing became confusing, ambiguous, or
unacknowledged, it was decoration.

**Test two, for anything on a frequently-repeated path: multiply the duration by 50.** A 300ms panel
animation on a route you hit fifty times a day is fifteen seconds a day of waiting you designed in.
That's why Linear's menus are 100ms and Radix's are 120ms and Cursor's entire site has 38
transitions. Frequency is the variable everyone forgets.

### How far should it move?

See §1. The short version: **4–8px for chrome, 8–12px for dialogs, and the actual dimension of the
surface for anything crossing a screen edge.** Pair every translate with a scale between 0.96 and
0.98 if the thing is a surface rather than a line of text — that's what reads as "this popped out of
the trigger" rather than "this slid in from nowhere."

If the element has a spatial origin (a menu belongs to its button), animate `transform-origin`
toward that origin and let the scale do the work; you may not need a translate at all. That's why
Linear has **zero pixel translates in any keyframe** — everything scales from where it came from.

### How long?

Duration follows **distance and surface size**, not importance.

| What's moving | Duration | Real reference |
|---|---|---|
| Color, opacity, border, shadow on a control | **80–150ms** | GitHub 80ms; Linear 100ms; Notion 150ms |
| Icon rotate, checkbox check, toggle knob | **120–200ms** | Radix 120ms; GitHub checkmark 200ms |
| Dropdown / popover / context menu | **100–200ms** | Linear 100ms; Resend 200ms; Vercel popover 200ms |
| Dialog / modal / accordion | **200–300ms** | Figma modal 220ms; Vercel overlay 300ms + `scale(.96)` |
| Sheet / drawer crossing an edge | **300–500ms** | Vaul 500ms; Cursor mobile sheet 420ms; Sonner 400ms |
| Full-page or hero-scale spatial move | **400–600ms** | Apple 400–500ms; Airbnb springs 450–760ms |
| Anything longer | you are making a video | — |

Two corrections to the naive version of this rule:

- **Scale duration with distance, not sub-linearly with importance.** A 40px move and a 400px move
  at the same 250ms have wildly different apparent velocities; the short one looks lazy. Working
  rule from the data: under ~100px → 150–200ms; 100–400px → 250–300ms; more than half the viewport
  → 350–500ms.
- **Large surfaces need *longer* durations at the *same* velocity**, because a big object moving
  fast reads as violent. This is why Apple's 240ms house duration coexists with 500ms values on
  full-bleed sections.

### Which curve?

The physical intuition is the only one you need: **ease-out is a thing arriving and settling;
ease-in is a thing leaving and accelerating away; ease-in-out is a thing traveling between two
places while you watch.**

- **Entrances, and anything the user just triggered: ease-out.** The response begins at maximum
  velocity, which is what makes the UI feel like it *reacted* to you rather than considered your
  request.
- **Exits: ease-in.** Airbnb's `cubic-bezier(.4,0,1,1)` is the shape — 90% of the travel in the last
  6% of the time. An ease-out exit looks like the element is reluctant to leave.
- **Moves between two on-screen positions (tab indicator, reorder, layout shift): ease-in-out.**
  Both endpoints are visible, so both need to be resolved.
- **`linear` is wrong for anything with mass.** It is correct for: spinners, marquees, determinate
  progress bars, cross-fades where nothing moves, and shimmer sweeps. Airbnb even ships it as
  `cubic-bezier(0,0,1,1)` under an explicit `--motion-linear-curve` name so its use is deliberate.

Curves worth memorizing, ranked by usefulness:

```css
--ease-out-quad:  cubic-bezier(.25, .46, .45, .94);  /* Linear's default. Calm, unshowy. 90% at 68% */
--ease-out-quart: cubic-bezier(.25, 1,   .5,  1);    /* Stripe's. Fast start, long tail. 90% at 44% */
--ease-out-expo:  cubic-bezier(.16, 1,   .3,  1);    /* Radix/GitHub. Near-instant. Use ≤200ms. 90% at 33% */
--ease-enter:     cubic-bezier(.1,  .9,  .2,  1);    /* Airbnb. Best all-round entrance. 90% at 32% */
--ease-exit:      cubic-bezier(.4,  0,   1,   1);    /* Airbnb. The exit partner. 90% at 94% */
--ease-swift:     cubic-bezier(.175,.885,.32, 1.1);  /* Vercel. 2.3% overshoot. Popovers. */
```

### Spring or curve?

Use a **curve** when the animation has a known start, a known end, and nobody is touching it. That's
~90% of product UI, and it should be plain CSS.

Use a **spring** when any of these are true:

- The animation can be **interrupted** and must retarget without a visible glitch. A curve
  restarting from a new position produces a velocity discontinuity you can see; a spring carries its
  velocity across.
- The motion is **attached to a gesture** — drag, swipe-to-dismiss, pull-to-refresh. Use
  `.interactiveSpring`-class parameters (response ≈ 0.15).
- You want a **specific settle character** a bezier can't express — a controlled overshoot with a
  decaying tail.

Parameter starting points, derived from §5 rather than from taste:

| Feel | bounce | ζ | Motion | SwiftUI | Airbnb equivalent |
|---|---|---|---|---|---|
| Mechanical, no overshoot | 0 | 1.0 | `{ visualDuration: .2, bounce: 0 }` | `.smooth(duration: .3)` | `springs-fast` (300/35) |
| Crisp, product-safe | 0.15 | 0.85 | `{ visualDuration: .3, bounce: .15 }` | `.snappy` | — |
| Alive | 0.30 | 0.70 | `{ visualDuration: .35, bounce: .3 }` | `.bouncy` | `springs-fast-bounce` (250/22) |
| Toy | 0.4+ | ≤0.6 | — | — | — |

**Prefer `visualDuration` + `bounce` over `stiffness`/`damping`/`mass`.** Stiffness and damping are
coupled — you can't change one without changing both the speed and the feel — which is why
hand-tuned springs drift into 800ms wobble. Airbnb's system is the proof: fixed ζ, variable k.

And springs are expressible in pure CSS now, running on the compositor with zero JS. Airbnb ships 31
`linear()` easings, Raycast 2, Vercel 1. The pattern:

```css
/* Precompile the spring at build time; keep the physics in a comment or a sibling token */
--spring-fast-bounce: linear(0,.2548,.6435,.9062,1.0208,1.0438,1.0303,1.0120,1); /* k=250 c=22 m=1, ζ=.70 */
.thing { transition: transform 450ms var(--spring-fast-bounce); }
```

9–12 stops is plenty for a spring with a single overshoot (Airbnb's shipping tokens use 9–13).
Vercel's ~95-stop curve is over-specified; the extra stops cost bytes and buy nothing perceptible.

### Enter/exit asymmetry

Symmetric enter/exit is the reliable signature of an animation system nobody thought about. Three
things should differ between in and out, in priority order:

1. **Easing** (out → in). Non-negotiable.
2. **Duration** (exit at 60–75% of enter). Figma: **220ms in / 160ms out = 73%**. GitHub Primer:
   300 / 200 = 67%. shadcn's sheet: `.5s` / `.3s` = 60%.
3. **Which properties animate.** Sonner's toast enters with transform *and* opacity over 400ms, but
   swipes out with `transform 500ms, opacity 200ms` — the opacity beats the transform out the door,
   so the toast is invisible long before it finishes traveling. That's what makes a dismissal feel
   decisive rather than drawn-out.

The shipping example to copy, in full:

```css
/* Figma modal — same keyframe geometry, different duration AND curve */
.modal      { animation: modalSlideIn  220ms cubic-bezier(.34,1.2,.64,1) forwards; }  /* 1.2% overshoot */
.modal.out  { animation: modalSlideOut 160ms ease-in                     forwards; }
```

Linear's `--speed-highlightFadeIn: 0s` / `--speed-highlightFadeOut: .15s` is the extreme, correct
form for hover and selection: **response is instantaneous, release is gentle.** The generic
implementation gives both directions the same 150ms, which puts a measurable lag between the cursor
arriving and the row lighting up. That lag is exactly the thing that makes cheap UI feel cheap.

### Choreography and stagger

Stagger exists to say "these things are related but ordered." It costs latency, so keep it short and
make it end.

- **20–50ms per item, never more.** Apple ships 20ms; Figma 50ms. At 80ms a five-item menu spends
  320ms in pure delay before the last item begins; at 100ms — the value every tutorial suggests — a
  ten-item list has a one-second tail. That's the "sluggish" everyone reports.
- **Cap the total.** Stagger the first 5–8 items, then give everything after that the same maximum
  delay. An uncapped ladder means row 40 arrives four seconds late.
- **Prefer Apple's duration-stagger for menus**: identical zero delay, durations descending in 20ms
  steps (400/380/360/340/320ms). Everything starts on the same frame, which is what makes a menu
  read as one object; the staggered *landings* still give you the cascade.
- **Never stagger on exit.** Dismissal is one decision. Close everything on one frame, ease-in,
  done.
- **Reverse the order for reverse motion.** A menu that opens top-down closes bottom-up if it
  staggers at all; anything else reads as a bug.

Stagger belongs to: menus opening, notifications arriving in a burst, an initial list paint on a
cold route. It does **not** belong to: filtering an existing list, re-sorting, pagination, or
anything the user does more than a few times an hour.

### Animating things that appear and disappear (`@starting-style`, `allow-discrete`)

This is the modern answer to "my exit animation doesn't play" and "my element flashes in at full
size." It is shipping: Resend uses `@starting-style` ×10 and `transition-behavior` ×4; Vercel ×5
and ×3; Apple ×1 and ×2; Stripe has `allow-discrete` once.

The problem: `display: none → block`, `popover`, `<dialog>`, and elements that mount fresh have no
"before" state to transition from, and discrete properties like `display` and `overlay` don't
interpolate at all. Two features fix it:

```css
.panel {
  transition: opacity 200ms var(--ease-enter),
              translate 200ms var(--ease-enter),
              display 200ms allow-discrete,      /* keeps it rendered through the exit */
              overlay 200ms allow-discrete;      /* same, for popover / <dialog> top-layer */
  transition-behavior: allow-discrete;           /* shorthand form */
  opacity: 1; translate: 0 0; display: block;
}
.panel[hidden] { opacity: 0; translate: 0 -4px; display: none; }

@starting-style {                                 /* the "before" frame for a fresh mount */
  .panel { opacity: 0; translate: 0 -4px; }
}
```

Resend's build emits exactly this shape as utilities — `starting:opacity-0`,
`starting:translate-y-2`, `starting:grid-rows-[0fr]`. Vercel's uses
`starting:open:opacity-0:is([open],:popover-open,:open)`.

Two notes that save you an hour:
- `@starting-style` must come **after** the rule it applies to, or specificity/order will drop it.
- Without `allow-discrete` on `display`, your exit transition never plays — the element vanishes on
  frame one. This is the number one reason hand-rolled dropdown exits "don't work."

The `height: auto` cousin: `interpolate-size: allow-keywords` (GitHub, Stripe, Vercel, Resend and
Notion all ship it) plus `calc-size()` (Notion) makes `height: 0 → auto` transition natively. Guard
it with `@supports` and fall back to `grid-template-rows: 0fr → 1fr`.

### Shared elements, layout transitions, View Transitions

The correct default: **animate the element's identity, not two separate fades.** When a card expands
into a detail view, the user should be able to point at the thing that moved.

Airbnb runs the deepest production View Transitions deployment I found — 122 `view-transition-name`
declarations and 759 `::view-transition-*` rules — and the lessons in it are worth more than the
spec:

```css
/* 1. Opt heavy or stateful elements OUT, explicitly. */
::view-transition-new(map) { animation: none; }

/* 2. Enter and exit are asymmetric INSIDE the transition, with a delay on enter
      so the outgoing element clears before the incoming one starts. */
::view-transition-old(page-header) { animation: kf-exit  100ms linear   0ms both; }
::view-transition-new(page-header) { animation: kf-enter 200ms linear 100ms both; }

/* 3. transform-origin is set per named element — the browser's default corner is rarely right. */
::view-transition-new(postcard) { transform-origin: var(--p5_transform-origin); }
```

Beyond that:

- **Give exactly one element a `view-transition-name` per view.** Names must be unique at capture
  time; the classic failure is naming every card in a grid the same thing, which silently skips the
  whole transition.
- **The default root cross-fade is usually worse than nothing** in an app shell — the entire page
  dissolves, including the parts that didn't change. Turn it off and opt specific elements in:
  ```css
  ::view-transition-old(root), ::view-transition-new(root) { animation: none; }
  ```
- **For list add/remove/reorder inside one component, View Transitions is overkill.** A FLIP helper
  (or Motion's `layout` prop) is less code and interruptible.
- **Kill it under reduced motion**, which Linear does exactly like this:
  ```css
  @media (prefers-reduced-motion: reduce) {
    ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) { animation: none !important; }
  }
  ```

### Scroll-driven animation (`animation-timeline`) — what it's actually for

Native scroll-driven animation has shipped and is in production: Notion uses `animation-timeline`
30 times and `view-timeline` 9 times; Resend 6; Stripe 5; Airbnb 5; GitHub 4.

**Not one of them uses it for "fade each section in as you scroll."** Look at what Notion attaches
it to: nav background changing as the hero scrolls out, nav shadow appearing when it sticks, a
sticky bar revealing at a marquee sentinel, a scroll-scrubbed hero graphic. GitHub uses
`scroll(self)` to draw a border on a dialog body only when it can actually scroll.

The distinction that matters: **scroll-driven animation is for state that must track scroll position
continuously and reversibly** — nav chrome, progress, scrubbed illustration. It is not a nicer way
to do entrance reveals. An entrance reveal fires once and is a decision about whether the content
should have been visible; scroll-linked state is a continuous function of position.

Ship it the way Notion does — feature-detected, with a non-animated fallback that is a plain state
change, and gated behind the motion preference:

```css
@supports (animation-timeline: scroll()) {
  @media (prefers-reduced-motion: no-preference) {
    .nav { animation: navShadow linear both; animation-timeline: --nav-stuck; }
  }
}
@supports not (animation-timeline: scroll()) {
  .nav.is-scrolled { box-shadow: 0 1px var(--border); }   /* the same end state, no animation */
}
```

### Loading, waiting, and motion that marks time

- **Below ~300ms of latency, show nothing.** A spinner that flashes for 120ms is worse than a frozen
  button; it registers as a glitch. Delay the indicator — don't mount it until a 300ms timer fires.
- **Above ~1s, a spinner stops carrying information.** Switch to a skeleton shaped like the incoming
  content, or a progress indication with a real denominator.
- **A spinner that outlives its usefulness is worse than a stalled screen**, because it promises
  imminent completion on every rotation. If the operation can exceed 10s you owe the user progress
  or a cancel affordance.
- **Skeletons shimmer slowly or not at all.** GitHub's `.SkeletonBox` runs a 1s linear shimmer;
  Airbnb's `--dls-shimmer-duration` is **1.35s**. Under 800ms a shimmer reads as strobing.
- **Never animate a number that represents real, current data.** A count-up on a live balance means
  that for 600ms your interface is displaying values that are false. Animate a number only when it
  changes *while the user is watching* and the transition itself is the information — and use
  tabular figures so nothing reflows.

### `prefers-reduced-motion`, done properly — and how to verify it

The media query does not mean "no feedback." It means **no vestibular-triggering motion**: no large
translations, no parallax, no rotation, no zoom, no autoplaying loops. Opacity and color changes are
fine and should be kept, because they are the feedback channel.

Three real strategies, in ascending order of quality:

**1. GitHub — nuclear, scoped per component.** Blunt but effective:
```css
@media (prefers-reduced-motion: reduce) {
  .Button, .Button *, .Button::before, .Button::after {
    transition: none !important; animation: none !important; scroll-behavior: auto !important;
  }
  .hide-reduced-motion { display: none !important; }
}
```

**2. Linear, Vercel, Notion — motion is opt-in.** Linear puts 24 of its motion blocks inside
`@media (prefers-reduced-motion: no-preference)`; Vercel uses Tailwind's `motion-safe:` variant 48
times; Stripe has **66** `no-preference` blocks against 14 `reduce` blocks. Structurally the safest
approach: you cannot ship an element stuck at `opacity: 0`, because the `opacity: 0` never existed
for that user.

**3. Stripe — substitution.** The best of the three. Zero the durations at the token layer, then per
component ship the resting frame:
```css
@media (prefers-reduced-motion: reduce) {
  :root { --navigation-duration: 0s; --navigation-duration-slow: 0s; }
  .chart-bar                 { opacity: 1; transform: none; }   /* show the end state       */
  .agent-bubble-dots         { display: none; }                 /* animated typing dots…    */
  .agent-bubble-text--fallback { display: block; }              /* …become static text      */
  .invoice__line-arrow--static { opacity: 1; }                  /* moving arrow → still one */
}
```

**Now verify it, because writing the query is not passing the test.** I loaded nine products twice —
once with `prefers-reduced-motion: no-preference`, once with `reduce` — scrolled 4000px, and counted
running animations via `document.getAnimations()`:

| Product | Running animations, no-preference | With `reduce` | What survives |
|---|---|---|---|
| **Stripe** | 18 | **1** | — |
| **Notion** | 1 | **0** | — |
| **Ramp** | 1 | **0** | — |
| **cal.com** | 3 | 3 | — |
| **Resend** | 9 | **9** | 3× `scroll-x` marquee (180s ∞), 2× **`rotate` (30s ∞)**, `disco` (6s ∞) |
| **Linear** | 107 | **101** | 100× `grid-dot-*-agent` opacity loops (3.2s ∞) |
| **Cursor** | 37 | **37** | 36× opacity loops (3.1s ∞) + `shimmer` (1.6s ∞) |

None of these companies is careless. And yet: Resend leaves a **rotation** running under `reduce`,
which is explicitly a vestibular trigger; Cursor removes zero of thirty-seven infinite loops; Linear
removes six of a hundred and seven. Linear's and Cursor's survivors are opacity-only, which is the
defensible end of this — but they're still a hundred infinite animations on the compositor.

**The runnable check**, which takes ten seconds and which almost nobody does:
```js
// DevTools → Rendering → Emulate prefers-reduced-motion: reduce, reload, then:
document.getAnimations()
  .filter(a => a.playState === 'running' && a.effect.getTiming().iterations === Infinity)
  .map(a => [a.animationName, a.effect.target.className]);
// Every survivor must be opacity- or color-only. Anything with transform, rotate, or
// translate in its keyframes is a bug.
```

**The authoring rule:** for every animation you write, name the still frame that replaces it. If
your answer is "it just doesn't animate," check whether the element's initial state is visible. A
scroll-reveal whose `from` is `opacity: 0` and whose reduced-motion rule is `animation: none`
produces an invisible page. That is the most common real accessibility bug in generated marketing
sites.

### Performance

- **Animate `transform` and `opacity`. Everything else is a compromise.** These two are handled by
  the compositor and never touch layout or paint. `filter` and `backdrop-filter` are
  compositor-eligible but expensive per pixel; `clip-path` is fine but paints. `width`, `height`,
  `top`, `left`, `margin`, `padding` trigger layout every frame — 60 reflows a second of your whole
  subtree.
- **`will-change` is a budget, not a hint,** and the field data is grim. Framer's marketing site
  declares `will-change` **104 times** (88 of them the same wholesale
  `var(--framer-will-change-override, transform)`); cal.com, same builder, 48. Compare Apple: 15 targeted `will-change: transform`
  declarations and **8 explicit `will-change: unset`** to hand the layer back. Compare Stripe: 12
  `transform`, 3 `transform,opacity`, each on a specific animating element. Add it on hover-intent
  or immediately before the animation; remove it after. A page-wide `* { will-change: transform }`
  is a memory leak with good intentions.
- **The `height: auto` problem.** In order of preference: `interpolate-size: allow-keywords` behind
  `@supports` (shipping at GitHub, Stripe, Vercel, Resend, Notion); `grid-template-rows: 0fr → 1fr`;
  a wrapper `transform: scaleY()` with a counter-scaled child; or animate to a measured pixel value
  from a CSS variable (what shadcn's accordion does).
- **Avoid layout thrash in JS-driven motion.** Never read `getBoundingClientRect()` in the same
  frame you write styles. Batch all reads, then all writes. FLIP is that discipline formalized.
- **`content-visibility: auto`** on long off-screen lists removes their animation work from the
  frame budget entirely and costs nothing.
- Verify, don't assume: DevTools → Rendering → **Paint flashing** and **Layer borders**. If your
  hover animation flashes green rectangles, it's repainting.

---

## When this advice is wrong

- **Marketing pages get a longer budget than product UI — and the same company should run two
  systems.** Resend proves it inside one stylesheet: menus at `translateY(4px)` / 200ms, hero text
  at `translateY(16px)` / 1000ms `ease-in-out`. GitHub's marketing hero staggers at 100ms with 800ms
  durations, numbers that would be indefensible in the issues list two clicks away. The mistake is
  applying the marketing numbers to the app, which is the direction the error always goes.
- **Games, creative tools, and onboarding are different genres.** A 600ms spring with 15% overshoot
  is wrong in a settings panel and right inside a photo gallery — which is exactly the only place
  Airbnb uses its 15.5%-overshoot `linear()` curve.
- **"Nothing moves on hover" is a density rule, not a universal one.** A three-card pricing grid
  should lift on hover; there are three of them and the cursor isn't sweeping. Apple lifts cards
  `scale(1.0161)`, GitHub `scale(1.025)`. The rule binds when the list is long enough that the
  cursor crosses many items on the way somewhere else.
- **Small elements need bigger scale deltas.** A 2% scale on a 400px card is legible; on a 16px
  icon it's invisible. Figma scales reaction emoji `1.2` and avatars `1.1`. Scale delta is roughly
  inverse to element size.
- **"Always 150ms" is meaningless without the curve.** 300ms on outQuart feels faster than 200ms on
  the Tailwind default. Specify the pair or specify nothing.
- **`linear` is right sometimes, and `ease-in-out` more often than purists admit.** Anything
  traveling between two visible positions — a tab indicator, a reordering row, a carousel — wants
  ease-in-out. Apple's single most-used curve is the symmetric `cubic-bezier(.4,0,.6,1)`, because
  most of Apple's motion is scroll-linked travel, not response.
- **A 100ms menu is wrong on a touch screen.** Touch has no hover to telegraph intent and a finger
  occludes the target, so touch UI genuinely benefits from 200–300ms and a visible spatial origin.
  Vaul's 500ms drawer and Cursor's 420ms mobile sheet are touch-first numbers and they're right.
- **Reduced motion is not the only accessibility axis.** Vestibular users need less movement;
  cognitive-load users often need *more* transition, not less, to track what changed. When you
  substitute, prefer a 100ms cross-fade over an instant cut.
- **Zero animation is a legitimate house style.** cal.com ships 5 transition declarations, Framer 14,
  Cursor 38. If your product's character is "gets out of the way," the correct number of animations
  is close to zero and no amount of this document changes that.

---

## Anti-patterns: what generated UI does, and the specific fix

| The tell | Why it happens | The fix |
|---|---|---|
| **`translateY(20px)` or `40px` on an entrance.** | It's the distance in every tutorial, and it's a hero distance. | 4px for menus, 8px for nav/panels, 12px + `scale(.97)` for modals. 16px+ only for a marketing hero. |
| **Every section fades and slides up on scroll.** The #1 signature of a generated marketing page. | Scroll-reveal is the easiest impressive-looking thing to add. | At most the hero, once, never replaying. Everything below the fold already has a motion primitive: scrolling. If you keep one, `translateY(8px)`, 300ms. |
| **`transition: all 300ms ease-in-out` on everything.** | One line, and it "works." | Name the properties. `all` transitions layout properties you didn't intend and forces a per-frame check of every property. `transition: background-color 100ms var(--ease-out-quad), color 100ms var(--ease-out-quad)`. |
| **Rows lift 4px on hover.** | The tutorial card-hover applied to a data table. | Background change only — a 4–8% overlay. Linear moves a 1px arrow glyph and leaves the row still. |
| **Symmetric enter/exit.** | Nobody wrote the exit; the transition ran backwards. | Exit at 60–75% of enter, on ease-in. Figma: 220ms in, 160ms out. |
| **The exit animation "doesn't work" so it got deleted.** | `display: none` is discrete and kills the transition on frame one. | `transition-behavior: allow-discrete` (plus `overlay` for popover/`<dialog>`), and `@starting-style` for the enter frame. |
| **Spinner on every action, mounted instantly.** | Loading state bound directly to `isLoading`. | 300ms delay before anything appears; skeleton past 1s; disable the button and keep its label — the label is information, the spinner isn't. |
| **Animated counters on real numbers.** | Looks impressive in a demo. | Render the value. Animate only a value changing under observation, in tabular figures. |
| **50–150ms stagger on lists.** | Every stagger tutorial uses 100ms. | 20–50ms, capped after 5–8 items, never on exit. Or Apple's zero-delay/descending-duration trick. |
| **Parallax on content.** | Depth reads as "designed." | Decorative background layers only, ≤10–15% differential. Content moving at a different speed than the scroll is unreadable and is a vestibular trigger. |
| **Scroll-jacking.** | Flagship demo of every scroll library. | Don't. Use sections and let the browser scroll. Native `animation-timeline` for *state* (nav, progress) is the legitimate version. |
| **`prefers-reduced-motion` handled with `animation: none`.** | It's what the snippet says. | Substitute the end state. Then run the `document.getAnimations()` check above with the preference emulated. |
| **Infinite decorative loops surviving reduced motion.** | The media query only covered the components someone remembered. | Audit by count, not by grep. A `rotate` or `translate` loop under `reduce` is a bug; even opacity loops should be capped. |
| **Springs tuned by nudging `stiffness` until it feels right.** | The API exposes physics, so people tune physics. | Fix ζ (1.0 or 0.7), vary stiffness for tempo — Airbnb's whole system. In Motion: `visualDuration` + `bounce`, starting at `{ visualDuration: .3, bounce: .15 }`. |
| **`will-change: transform` on a wrapper "for performance."** | Cargo-culted from a perf article. | Only on the specific animating element, only while it animates, then `unset` — 8 of Apple's `will-change` declarations are the reset. |
| **A 700ms "premium" easing on a button.** | Long = luxurious. | 80–150ms. GitHub's buttons are 80ms. Luxury is in the curve and the color, not the wait. |
| **Inheriting `150ms cubic-bezier(.4,0,.2,1)` on 40 elements.** | Tailwind's default and nobody overrode it. | Override `--default-transition-duration` and `--default-transition-timing-function` once in your theme block. Vercel and Resend both do exactly this. |

---

## Self-check

Run this against your own output before you call motion done.

1. **What is my largest translate distance, and is it over 12px on anything that isn't a hero or a
   sheet?** `grep -oE 'translate[XY]?\(-?[0-9]+px' src/**` and look at the distribution.
2. Can I name which of the five jobs each animation does? Delete every one I can't.
3. Did I turn each animation off and confirm the interaction got *worse*?
4. Is any duration over 300ms attached to something moving less than half a viewport?
5. Are entrances ease-out, exits ease-in, and is the exit 60–75% of the enter duration?
6. Did I specify a duration **and** a curve together, or inherit Tailwind's default by accident?
7. Does anything move geometrically on hover inside a list longer than five items?
8. Is my stagger step ≤50ms, capped, and absent on exit?
9. Does every animated property resolve to `transform` or `opacity`? For each that doesn't, have I
   checked paint flashing?
10. Do my dropdowns and dialogs have a working *exit*, i.e. did I write `allow-discrete` and
    `@starting-style`?
11. With `prefers-reduced-motion: reduce` emulated: is every element visible and in its final
    position, does interaction still give feedback, and what does
    `document.getAnimations().filter(a => a.playState==='running' && a.effect.getTiming().iterations===Infinity).length`
    return? Anything with transform or rotate in it is a bug.
12. Is there a `will-change` I didn't remove?
13. Does any spinner appear before 300ms or persist past 10s without progress or a cancel?
14. Does any number on screen animate that represents live data?
15. On the marketing page: how many separate entrance animations fire between the top and the fold?
    More than one is one too many.

---

## Method

Chromium via Playwright, 1440×900, real UA, `networkidle` + 3s settle. For each product I captured
every stylesheet response plus inline `<style>` blocks (0.03–2.5 MB per site, 16 sites), then:
counted `transition-duration` / `transition` shorthand / `transition-timing-function` /
`transition-delay` / `animation-duration` / `will-change` declarations; parsed every `@keyframes`
body and extracted the pixel values inside `translate*()` and the ratios inside `scale*()`;
extracted `:root`/`html` custom properties matching `motion|dur|ease|spring|timing|curve`; counted
`prefers-reduced-motion: reduce` vs `: no-preference` blocks; and counted modern-feature usage
(`@starting-style`, `transition-behavior`, `allow-discrete`, `animation-timeline`, `view-timeline`,
`view-transition-name`, `::view-transition-*`, `linear()`, `interpolate-size`, `calc-size()`).

The reduced-motion audit loaded each site twice in fresh contexts with Playwright's `reducedMotion`
option, scrolled 4000px in 800px steps, waited 2.5s, and enumerated `document.getAnimations()`,
recording `animationName`, duration and iteration count for everything still in `playState:
'running'`.

Bezier peaks and 90%-progress points were computed by sampling each curve at 20,000 points.
`linear()` easings were parsed stop-by-stop for peak value and position. Damping ratios and
overshoots from ζ = c / 2√(km) and e^(−πζ/√(1−ζ²)); settling time from 4/ζωₙ. Library values
(Motion 13.2.0, Tailwind 4.3.3, Vaul 1.1.2, Sonner 2.0.8, `@material/web` 2.5.0) come from the
published tarballs, not documentation. SwiftUI values come from Apple's documentation API, which
returns declared signature defaults.

Sites probed: linear.app, stripe.com, vercel.com, notion.com, github.com, figma.com, raycast.com,
resend.com, ramp.com, framer.com, cursor.com, cal.com, airbnb.com, apple.com/macbook-pro,
vaul.emilkowal.ski.
