# Motion craft

**Evaluated:** 2026-09

**Measured 2026-09-10.** Every number came out of a shipping product's stylesheet, a library's
published tarball, a live browser probe, or Apple's documentation API. Nothing is recalled. Method
at the bottom; derived values say so.

Generated interfaces animate **too much, too far, and too slowly**. All three have measured answers.

---

## If you only apply five things

1. **Move things 4–12px, not 20–40px.** Real entrance keyframes: Resend's menus `translateY(4px)`,
   Apple's nav flyout `translate(8px)`, Ramp's nav `translateY(8px)`, Figma's modal
   `translateY(12px) scale(.97)`. `translateY(20px)` is a *marketing hero* distance (Resend's own
   hero uses 16px) applied to product chrome.
2. **150–200ms for anything just clicked, 200–300ms for a panel, nothing between 300 and 500ms
   unless the thing crosses more than half the viewport.** Linear's modal duration is 160ms.
   Notion's whole scale stops at 300ms. Figma's is 250ms. GitHub's buttons are 80ms.
3. **Ease-out in, ease-in out, never `linear` for anything with a body.** Airbnb ships the pair:
   `--motion-enter-curve: cubic-bezier(.1,.9,.2,1)` (90% of the distance in 32% of the time) and
   `--motion-exit-curve: cubic-bezier(.4,0,1,1)` (90% at 94% — it accelerates out the door).
   Symmetric enter/exit is the tell that nobody wrote the exit.
4. **Nothing moves geometrically on hover inside a list of more than five rows, unless the movement
   is a drag affordance.** Change background, not position. Linear moves a 1px arrow glyph and
   leaves the row still.
5. **Under `prefers-reduced-motion`, substitute the resting frame — then verify by counting.**
   `document.getAnimations().filter(a => a.playState === 'running' && a.effect.getTiming().iterations === Infinity).length`.
   Stripe goes 17 → 1. Linear goes 107 → 101. Cursor goes 37 → 37. Resend keeps a 30s `rotate`
   running, a straight vestibular trigger. Writing the media query is not passing the test.

---

## Measured reference

### 1. Travel distance

Extracted from `@keyframes` bodies: every `translate*()` pixel value in an entrance or exit,
counted across each site's full stylesheet payload.

| Product | Dominant travel in keyframes | What it's on |
|---|---|---|
| **Cursor** | **2px** ×7, 3px ×4 | micro-feedback |
| **Raycast** | **2px** ×8, 10px ×7 | small UI vs. panels |
| **Resend** | **4px** ×8, 5px, then 16px ×4 | menus 4px; scale-popover 5px; hero/header 16px |
| **Apple** (macbook-pro) | **8px** ×8, 4px ×6 | nav flyout 8px; hover chevron + link entrance 4px |
| **Ramp** | **8px** ×10 | `desktopNavContentRiseIn` |
| **Figma** | **10px** ×50, 8px ×40, **12px** ×40 | modal = `translateY(12px) scale(.97)` |
| **Linear** | **zero px translates in any keyframe** | scale + opacity only |
| **Airbnb** | 3–8px cluster, plus 50/100px for full-screen sheets | product vs. screen transitions |

Verbatim, so you can copy the actual shapes:

```css
/* Resend — menu/popover. 4px, used at .2s. */
@keyframes open-slide-down-fade  { 0%{opacity:0; transform:translateY(-4px)} to{opacity:1; transform:translateY(0)} }
@keyframes close-slide-up-fade   { 0%{opacity:1; transform:translateY(0)}    to{opacity:0; transform:translateY(-4px)} }
@keyframes open-scale-up-fade    { 0%{opacity:0; transform:scale(.98) translateY(5px)} to{opacity:1; transform:scale(1) translateY(0)} }
/* Same codebase, hero: 4× the distance and 5× the duration. */
@keyframes hero-text-slide-up-fade { 0%{opacity:0; transform:translateY(16px)} to{opacity:1; transform:translateY(0)} }
/* --animate-hero-text-slide-up-fade: hero-text-slide-up-fade 1s ease-in-out; */

/* Apple — global nav flyout. 8px, direction-aware (forward/back get mirrored keyframes). */
@keyframes globalnav-flyout-slide-forward-next     { 0%{opacity:0; transform:translate(8px)}  to{opacity:1; transform:translate(0)} }
@keyframes globalnav-flyout-slide-forward-previous { 0%{opacity:1; transform:translate(0)}    to{opacity:0; transform:translate(-8px)} }

/* Figma — ShareSheet and AiCreditsEnrollmentModal, identical geometry, different in/out. */
@keyframes modalSlideIn  { from{opacity:0; transform:translateY(12px) scale(.97)} to{opacity:1; transform:translateY(0) scale(1)} }
.modal      { animation: modalSlideIn  220ms cubic-bezier(.34,1.2,.64,1) forwards; }  /* 1.2% overshoot */
.modal.out  { animation: modalSlideOut 160ms ease-in                     forwards; }  /* 73% of enter */
```

**Travel scales with the surface, not with importance.**

| Surface | Travel | Pair with |
|---|---|---|
| Icon nudge, chevron, hover affordance | **2–4px** | 100–150ms |
| Dropdown, menu, popover, tooltip | **4–8px** | 120–200ms |
| Dialog, modal, card expand | **8–12px** + `scale(.96–.98)` | 200–250ms |
| Sheet crossing a screen edge | full height/width of the sheet | 300–500ms |
| Marketing hero text | **12–24px** | 600–1000ms |

These are CSS px at 1× on a desktop viewport. On a 10-foot TV/kiosk UI, or under a root font size
you have scaled up, express them in `rem` or they fall below perceptual threshold.

Scale is the other axis and its range is tighter. Popover/overlay entrance scales in the wild:
Vercel `--ds-motion-overlay-scale: .96`; Ramp `.96`; Raycast `.96`/`.98`; Figma `.97`; Linear
`.98`/`.96`; modals and larger surfaces reach `.9`. **`scale(0.95)` is the floor for anything the
user is looking at; `scale(0.8)` is a toy.**

### 2. Duration histograms

Occurrences of every `transition-duration` (including shorthand) across each site's whole CSS
payload. "Dominant" is the modal value — the product's house duration. Re-probed 2026-09-10;
**counts drift ±10% per deploy, so read the shape, not the integer.**

| Product | Total decls | Dominant | Rest of the distribution | reduce / no-preference blocks |
|---|---|---|---|---|
| **Figma** | 1114 | **250ms** ×436 | 200×201, 400×101, 150×100, 40×50, 100×50 | 50 / 0 |
| **Apple** (macbook-pro) | 667 | **240ms** ×79 | 320×65, 400×62, 500×50, 300×45, 0×39 | 1 / 0 |
| **Airbnb** | 539 | **200ms** ×124 | 300×98, 150×59, 250×47, 100×29, 500×26 | 5 / 2 |
| **Raycast** | 334 | **300ms** ×124 | 200×89, 150×37, 100×23, **1500×13**, 400×11 | 5 / 0 |
| **GitHub** | 250 | **200ms** ×58 | **80×48**, 300×18, 400×16, 120×14, 100×13 | 32 / 36 |
| **Linear** | 154 | **160ms** ×49 | 200×25, 120×17, 400×11, 0×9, 100×9 | 20 / 24 |
| **Vercel** | 129 | **150ms** ×34 | 200×28, 100×11, 250×10, 300×8, 500×7 | 12 / 8 |
| **Stripe** | 124 | **300ms** ×50 | 200×14, 500×11, 0×9, 150×9, 400×7 | 14 / **66** |
| **Ramp** | 98 | 200ms ×15 | 150×11, 300×11, 250×7, 400×7, 500×7 | 8 / 2 |
| **Notion** | 97 | **150ms** ×43 | 200×18, 250×8, 300×8, 100×3 | 10 / 9 |
| **Resend** | 96 | **200ms** ×22 | 300×16, 400×12, 150×8, 360×6, 100×5 | 4 / 0 |
| **Cursor** | **40** | 200ms ×8 | 150×6, 400×6, 0×3, 300×3, 100×2 | 4 / 1 |
| **Framer** | **9** | 218ms ×3 | 200×2, 300×2, 150, 400 | 0 / 0 |
| **cal.com** | **5** | 150ms ×3 | 200, 400 | 0 / 0 |
| **Vaul 1.1.2** (drawer lib) | 6 | 150ms ×4 | 500×2 (the drawer itself) | — |

Framer's marketing site ships **9** transition declarations and cal.com **5**; Figma's app shell
ships 1114. Neither end is wrong, but the count is a decision you are making whether or not you
notice, and for a tool it is far lower than a component library gives you for free.

GitHub's second peak is **80ms, 48 times** — `--duration-fast`, on buttons and inputs. House
duration 200ms; response duration 80ms. Two numbers, two jobs.

### 3. Perceived duration

`transition-duration` is not how long the motion looks. Each shipping curve sampled at 20,000
points; the column is **the fraction of the duration at which 90% of the movement is complete.**
Multiply by your duration to get what the user perceives.

| Curve | Where it ships | 90% done at | 200ms feels like | 300ms feels like |
|---|---|---|---|---|
| `cubic-bezier(.1,.9,.2,1)` | **Airbnb `--motion-enter-curve`** | **32%** | 64ms | 96ms |
| `cubic-bezier(.16,1,.3,1)` (outExpo) | Radix, GitHub, Stripe | **33%** | 66ms | 99ms |
| `cubic-bezier(.175,.885,.32,1.1)` | Vercel `timing-swift` | 34% | 68ms | 103ms |
| `cubic-bezier(.32,.72,0,1)` | Vaul, Linear, shadcn | 37% | 73ms | 110ms |
| `cubic-bezier(.22,1,.36,1)` | Cursor (`.42s` mobile sheet) | 37% | 75ms | 112ms |
| `cubic-bezier(.25,1,.5,1)` (outQuart) | **Stripe's house curve** | 44% | 88ms | 132ms |
| `cubic-bezier(.2,0,0,1)` | Airbnb `standard`, M3 `emphasized` | 54% | 108ms | 162ms |
| `cubic-bezier(0,0,.2,1)` | Tailwind `ease-out` | 60% | 119ms | 179ms |
| `ease` (keyword; `.25,.1,.25,1`) | **shadcn `animate-in`/`animate-out` default** | 62% | 125ms | 187ms |
| `cubic-bezier(.4,0,.2,1)` | **Tailwind v4 default** | 63% | 127ms | 190ms |
| `cubic-bezier(.25,.46,.45,.94)` (outQuad) | **Linear's buttons** | 68% | 135ms | 203ms |
| `ease-out` (keyword; `0,0,.58,1`) | — | 74% | 148ms | 222ms |
| `ease-in-out` (keyword) | — | 78% | 156ms | 234ms |
| `cubic-bezier(.4,0,.6,1)` | **Apple's house curve** | 79% | 157ms | 236ms |
| `linear` | spinners only | 90% | 180ms | 270ms |
| `cubic-bezier(.4,0,1,1)` | **Airbnb `--motion-exit-curve`** | **94%** | 187ms | 281ms |

- **A slow curve at a short duration feels sluggish; a fast curve at a long duration feels
  expensive.** Stripe's 300ms outQuart reads snappier than a Tailwind-default 200ms: Stripe has
  covered 44% of the distance in 60ms while Tailwind's default is still accelerating.
- **Fast curves demand short durations.** `outExpo` at 400ms looks broken — 90% of the move in the
  first 132ms, then a quarter second of crawl. This pairing constraint is what people miss when
  they copy a curve off a gallery.
- Airbnb's exit reaches 90% at 94%: the element lingers long enough to register that it is leaving,
  then goes. An ease-out exit reads as reluctance.

### 4. Overshoot — measured peak of every "springy" bezier in the wild

| Curve | Product | Peak | Overshoot | At progress |
|---|---|---|---|---|
| `cubic-bezier(.34,1.2,.64,1)` | **Figma modal enter** | 1.013 | **1.2%** | 74% |
| `linear(…)` ~95-stop | **Vercel `--timing`** | 1.013 | **1.3%** | 53% |
| `cubic-bezier(.175,.885,.32,1.1)` | Vercel `timing-swift` | 1.023 | 2.3% | 73% |
| `linear(…)` 9-stop | **Airbnb `springs-fast-bounce`** | 1.044 | 4.4% | 63% |
| `cubic-bezier(.18,.89,.32,1.2)` | Figma | 1.058 | 5.8% | 66% |
| `cubic-bezier(.45,1.45,.8,1)` | Linear | 1.066 | 6.6% | 71% |
| `cubic-bezier(.175,.885,.32,1.275)` | Clerk (easeOutBack) | 1.087 | 8.7% | 63% |
| `linear(…)` 13-stop | Airbnb (gallery) | 1.095 | **9.5%** | 42% |
| `cubic-bezier(.34,1.56,.64,1)` | Raycast | 1.098 | 9.8% | 57% |
| `linear(…)` 10-stop | Airbnb (gallery, most aggressive) | 1.155 | **15.5%** | 33% |
| `cubic-bezier(0.4,0,0.3,2)` | Apple (one element) | 1.280 | 28% | 67% |

**1–3% overshoot is invisible-but-felt and is what shipping product chrome uses. 4–10% reads as
playful. Above 15% you have made a toy** — Airbnb only goes there inside a photo gallery, never on
a form control. Vercel's 1.3% and Figma's 1.2% are the values to steal.

### 5. Springs

Airbnb ships a complete spring token system in pure CSS, with the source physics parameters left in
the stylesheet next to the precompiled `linear()` easing.

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

**Every non-bounce spring is ζ ≈ 1.0. Every bounce spring is ζ ≈ 0.70. Only stiffness varies.**
Pick your damping ratio once for the product's character, then move stiffness to change tempo.
Nudging stiffness and damping independently until it "feels right" produces an 800ms wobble.

ζ = 0.70 is the industry's converged answer, not an Airbnb quirk:

| Source | ζ | overshoot |
|---|---|---|
| Airbnb `*-bounce` | 0.696–0.700 | 4.6–4.8% |
| Motion (`bounce: 0.3`, the default) | 0.70 | 4.6% |
| SwiftUI `.bouncy` (base bounce 0.3) | 0.70 | 4.6% |
| SwiftUI `.snappy` (base bounce 0.15) | 0.85 | **0.63%** |
| SwiftUI `.smooth` / Motion `bounce: 0` | 1.00 | 0% |

`ζ = 1 − bounce`, so pick a number instead of a slider:

| bounce | ζ | overshoot |
|---|---|---|
| 0.00 | 1.00 | 0% |
| 0.15 (`.snappy`) | 0.85 | **0.63%** |
| 0.20 | 0.80 | 1.5% |
| 0.25 | 0.75 | 2.8% |
| 0.30 (`.bouncy`, Motion default) | 0.70 | **4.6%** |
| 0.40 | 0.60 | 9.5% |
| 0.50 | 0.50 | 16.3% |

`.snappy` overshoots by 0.63%. It reads as bouncy because it decelerates hard, not because it
bounces — which is the whole trick, and it is cheaper than a real overshoot.

**Library defaults, from source:**

```js
// Motion 13.2.0 (current), dist/motion.dev.js
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

Apple's `duration: 0.5` is perceptual settling time, not a clock. `.interactiveSpring`'s response
of **0.15**, one third of the default, is the value to copy for anything attached to a finger or a
cursor.

Motion's bare default (`stiffness:100, damping:10`) is ζ = 0.5, 16% overshoot, **800ms to settle** —
what you get from `type: "spring"` on a non-transform property with no other options. A fallback,
not a recommendation.

### 6. Published motion token systems, verbatim

**Airbnb** — three curves and six springs, and that's the whole system:
```css
--motion-enter-curve-animation-timing-function:  cubic-bezier(0.1, 0.9, 0.2, 1);   /* 90% at 32% */
--motion-exit-curve-animation-timing-function:   cubic-bezier(0.4, 0,   1,   1);   /* 90% at 94% */
--motion-standard-curve-animation-timing-function: cubic-bezier(0.2, 0, 0, 1);     /* 90% at 54% */
--motion-linear-curve-animation-timing-function: cubic-bezier(0, 0, 1, 1);         /* literally linear */
```

**GitHub Primer** — the most complete public enter/exit spec. It does not expose a duration to
pick; it exposes an *intent*, aliased onto a numeric base scale:
```css
--base-duration-0: 0s;  --base-duration-50: 50ms;  --base-duration-100…1000: .1s…1s;
--base-easing-ease:      cubic-bezier(.25, .1,  .25, 1);
--base-easing-easeIn:    cubic-bezier(.7,  .1,  .75, .9);
--base-easing-easeOut:   cubic-bezier(.3,  .8,  .6,  1);
--base-easing-easeInOut: cubic-bezier(.6,  0,   .2,  1);
--motion-duration-micro: var(--base-duration-100);   --motion-duration-short:  var(--base-duration-200);
--motion-duration-medium: var(--base-duration-300);  --motion-duration-long:   var(--base-duration-500);
--motion-transition-enter:       var(--motion-duration-medium) easeOut;   /* 300ms */
--motion-transition-exit:        var(--motion-duration-short)  easeIn;    /* 200ms — 67% of enter */
--motion-transition-hover:       var(--motion-duration-micro)  ease;      /* 100ms */
--motion-transition-stateChange: var(--motion-duration-short)  easeInOut; /* 200ms */
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
--ds-motion-overlay-timing:   var(--ds-motion-timing-swift);
--ds-motion-popover-duration: .2s;   --ds-motion-popover-timing: var(--ds-motion-timing-swift);
--timing: linear(0 0%, … 1.01269 53% … );   /* 95 stops, 1.3% overshoot; assigned to --tw-ease at call sites */
```

**Notion "tatami"** — the notable thing is what's absent. Five durations, hard ceiling at 300ms:
```css
--tatami-motion-duration-100…300: .1s .15s .2s .25s .3s;   /* nothing longer exists */
--tatami-motion-global-fade-in-duration:  var(--tatami-motion-duration-150);  /* enter 150ms ease-out */
--tatami-motion-global-fade-out-duration: var(--tatami-motion-duration-200);  /* exit  200ms ease-in  */
--tatami-motion-timing-function-ease-out: cubic-bezier(0, 0, .58, 1);
--tatami-motion-timing-function-ease-in:  cubic-bezier(.42, 0, 1, 1);
```

**Material 3** (`@material/web@2.5.0`): durations `short1–4` 50/100/150/200, `medium1–4`
250/300/350/400, `long1–4` 450–600, `extra-long1–4` 700–1000; easings `emphasized`
`cubic-bezier(.2,0,0,1)`, `emphasized-decelerate` `cubic-bezier(.05,.7,.1,1)`,
`emphasized-accelerate` `cubic-bezier(.3,0,.8,.15)`, `legacy` `cubic-bezier(.4,0,.2,1)` (which is
Tailwind's default).

**Tailwind v4.3.3** `theme.css`: `--default-transition-duration: 150ms`,
`--default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)`,
`--animate-pulse: pulse 2s cubic-bezier(0.4,0,0.6,1) infinite`.

`cubic-bezier(.4,0,.2,1)` at 150ms is the most common motion signature on the web, because it's
Tailwind's default and nobody overrides it. **Vercel, Resend and Cursor all still ship Tailwind's
two defaults untouched** — I checked; the strings are byte-identical. What they change is the *call
site*: Vercel assigns its 95-stop `linear()` spring to `--tw-ease`, and Resend defines 17 distinct
`--tw-ease` values consumed by named `ease-*` utilities. **Give your house curves names and use
them at call sites; overriding the global default silently re-times every `transition-*` in the
app, including third-party components you did not write.**

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

Apple's opening trick: **zero delay, decreasing duration.** Every item starts on the same frame, so
the menu registers as one object appearing; they land 20ms apart, so it still reads as a cascade.
Nothing sits invisible waiting for its cue. Strictly better than delay-based stagger for a menu,
and it costs the same.

### 8. The defaults your tooling ships — read before you write a class name

These are the numbers an agent inherits by *not* deciding. Pulled from source 2026-09-10.

**`tw-animate-css@1.4.0`** (the Tailwind v4 successor to `tailwindcss-animate`; what shadcn
installs today):

```css
--animate-in:  enter var(--tw-animation-duration, var(--tw-duration, .15s)) var(--tw-ease, ease) …;
--animate-out: exit  var(--tw-animation-duration, var(--tw-duration, .15s)) var(--tw-ease, ease) …;
--animate-accordion-down / -up:   .2s ease-out
```

| Bare utility | Value it sets | Suffixed form |
|---|---|---|
| `slide-in-from-bottom` | `translateY(100%)` — **the element's full height** | `slide-in-from-bottom-2` = 8px (`2 × --spacing`) |
| `zoom-in` | `scale(0)` — **from nothing** | `zoom-in-95` = `scale(.95)` |
| `blur-in` | `blur(20px)` | `blur-in-4` = `blur(4px)` |
| `spin-in` | `rotate(30deg)` | `spin-in-3` = `rotate(3deg)` |
| `fade-in` | `opacity: 0` | `fade-in-50` = `opacity: .5` |

**Every bare form is a cliff.** `animate-in slide-in-from-bottom` is a 100%-height slide at 150ms;
`animate-in zoom-in` scales from zero. The suffix is not optional decoration, it is the entire
value. And **`animate-in` and `animate-out` are the same 150ms on the same `ease` keyword** —
`cubic-bezier(.25,.1,.25,1)`, an ease-*in-out* shape, 90% done at 62%. So shadcn's default enter is
symmetric with its exit and neither is an ease-out. Fix both at the call site:

```css
/* shadcn dialog/dropdown, as installed:  data-[state=open]:animate-in  fade-in-0 zoom-in-95
                                          data-[state=closed]:animate-out fade-out-0 zoom-out-95 */
/* what to add: */
data-[state=open]:duration-200  data-[state=open]:ease-[cubic-bezier(.1,.9,.2,1)]
data-[state=closed]:duration-150 data-[state=closed]:ease-[cubic-bezier(.4,0,1,1)]
```

**Magic UI / Aceternity component defaults** (the 2026 landing-page stack):

| Component | Defaults from source | Verdict |
|---|---|---|
| `BlurFade` | `duration .4s, offset 6px, blur 6px, once: true, margin -50px` | Distance and duration are fine. The animated `filter: blur()` is a per-pixel paint cost on text; drop the blur, keep the 6px. |
| `TextAnimate` | `once = false`, per-word/char spring `stiffness 300, damping 15` → **ζ 0.43, 22% overshoot, 533ms settle** | A toy by §4's scale, applied to body copy, **replaying every time it re-enters the viewport.** Set `once`, or delete. |
| `NumberTicker` | spring `stiffness 100, damping 60`, `once: true` | Animates a real number. See §"Loading" — only legitimate when the count-up is itself the reward. |
| `BorderBeam` | `duration 6s, repeat: Infinity, colorFrom #ffaa40, colorTo #9c40ff` | An infinite decorative loop in the default AI-slop gradient. Nothing gates it on `prefers-reduced-motion`. |
| `Marquee` | `--duration: 40s`, `repeat 4`, infinite | Infinite translate. Must be killed under `reduce`. |

---

## Decisions

### Does this animation earn its place?

Motion does exactly five jobs. If yours isn't doing one, delete it.

1. **Continuity** — the thing that was here is now there, and you showed the trip. Sidebar
   collapse, tab underline slide, drawer.
2. **Spatial orientation** — where did this come from, where does dismissing it send me. A sheet
   from the bottom edge; a popover scaling from its trigger's corner.
3. **Feedback confirmation** — the system received your input. Button press, checkbox, toggle knob.
4. **Attention direction** — something changed that you did not cause. A row appearing in a live
   list, a validation error, a toast.
5. **Perceived speed** — masking latency by giving the eye something to track. Skeleton,
   optimistic row.

**Test one:** turn it off and redo the interaction. If nothing became confusing, ambiguous, or
unacknowledged, it was decoration.

**Test two, for anything on a repeated path: multiply the duration by 50.** A 300ms panel
animation on a route hit fifty times a day is fifteen seconds a day you designed in. That's why
Linear's menus are 100ms, Radix's are 120ms, and Cursor's entire site has 40 transitions.

### How far should it move?

See §1. **4–8px for chrome, 8–12px for dialogs, the actual dimension of the surface for anything
crossing a screen edge.** Pair every translate with a scale between 0.96 and 0.98 if the thing is a
surface rather than a line of text — that reads as "this popped out of the trigger" rather than
"this slid in from nowhere."

If the element has a spatial origin (a menu belongs to its button), animate `transform-origin`
toward that origin and let the scale do the work; you may not need a translate at all. That's why
Linear has zero pixel translates in any keyframe.

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

- **Scale duration with distance, not sub-linearly with importance.** A 40px move and a 400px move
  at the same 250ms have wildly different apparent velocities; the short one looks lazy. Under
  ~100px → 150–200ms; 100–400px → 250–300ms; more than half the viewport → 350–500ms.
- **Large surfaces need longer durations at the same velocity**, because a big object moving fast
  reads as violent. Apple's 240ms house duration coexists with 500ms on full-bleed sections.

### Which curve?

**Ease-out is a thing arriving and settling; ease-in is a thing leaving and accelerating away;
ease-in-out is a thing traveling between two places while you watch.**

- **Entrances, and anything the user just triggered: ease-out.** The response begins at maximum
  velocity, which is what makes the UI feel like it reacted rather than deliberated.
- **Exits: ease-in.** Airbnb's `cubic-bezier(.4,0,1,1)` — 90% of the travel in the last 6% of the
  time.
- **Moves between two on-screen positions (tab indicator, reorder, layout shift): ease-in-out.**
  Both endpoints are visible, so both need resolving.
- **`linear` is wrong for anything with mass.** Correct for spinners, marquees, determinate
  progress bars, cross-fades where nothing moves, and shimmer sweeps. Airbnb ships it as
  `cubic-bezier(0,0,1,1)` under an explicit `--motion-linear-curve` name so its use is deliberate.

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
  restarting from a new position produces a velocity discontinuity you can see; a spring carries
  velocity across.
- The motion is **attached to a gesture** — drag, swipe-to-dismiss, pull-to-refresh. Use
  `.interactiveSpring`-class parameters (response ≈ 0.15).
- You want a **settle character** a bezier can't express — a controlled overshoot with a decaying
  tail.

| Feel | bounce | ζ | Motion | SwiftUI | Airbnb equivalent |
|---|---|---|---|---|---|
| Mechanical, no overshoot | 0 | 1.0 | `{ visualDuration: .2, bounce: 0 }` | `.smooth(duration: .3)` | `springs-fast` (300/35) |
| Crisp, product-safe | 0.15 | 0.85 | `{ visualDuration: .3, bounce: .15 }` | `.snappy` | — |
| Alive | 0.30 | 0.70 | `{ visualDuration: .35, bounce: .3 }` | `.bouncy` | `springs-fast-bounce` (250/22) |
| Toy | 0.4+ | ≤0.6 | — | — | — |

**Prefer `visualDuration` + `bounce` over `stiffness`/`damping`/`mass`.** Stiffness and damping are
coupled — you can't change one without changing both speed and feel — which is why hand-tuned
springs drift into 800ms wobble. Airbnb's system is the proof: fixed ζ, variable k.

Springs run in pure CSS on the compositor with zero JS. Airbnb ships 31 `linear()` easings, Raycast
2, Vercel 1:

```css
/* Precompile the spring at build time; keep the physics in a comment or a sibling token */
--spring-fast-bounce: linear(0,.2548,.6435,.9062,1.0208,1.0438,1.0303,1.0120,1); /* k=250 c=22 m=1, ζ=.70 */
.thing { transition: transform 450ms var(--spring-fast-bounce); }
```

9–12 stops is plenty for a single overshoot (Airbnb's shipping tokens use 9–13). Vercel's ~95-stop
curve is over-specified; the extra stops cost bytes and buy nothing perceptible.

### Enter/exit asymmetry

Symmetric enter/exit is the signature of an animation system nobody thought about. Three things
should differ, in priority order:

1. **Easing** (out → in). Non-negotiable.
2. **Duration** (exit at 60–75% of enter). Figma: **220ms in / 160ms out = 73%**. GitHub Primer:
   300 / 200 = 67%. Notion: 150 / 200 — *inverted*, and deliberate: Notion's global token fades in
   fast and out slow, because its overlays are dismissed by clicking through to what's behind.
   shadcn's default: 150 / 150 on the same keyword, which is the thing to fix.
3. **Which properties animate.** Sonner's toast enters with transform *and* opacity over 400ms but
   swipes out with `transform 500ms, opacity 200ms` — opacity beats transform out the door, so the
   toast is invisible long before it stops traveling. That's what makes dismissal feel decisive.

Linear's `--speed-highlightFadeIn: 0s` / `--speed-highlightFadeOut: .15s` is the extreme, correct
form for hover and selection: **response instantaneous, release gentle.** Giving both directions
150ms puts a measurable lag between the cursor arriving and the row lighting up.

### Choreography and stagger

Stagger says "these things are related but ordered." It costs latency, so keep it short and make it
end.

- **20–50ms per item, never more.** Apple ships 20ms; Figma 50ms. At 80ms a five-item menu spends
  320ms in pure delay before the last item begins; at 100ms — every tutorial's value — a ten-item
  list has a one-second tail.
- **Cap the total.** Stagger the first 5–8 items, then give everything after the same maximum
  delay. An uncapped ladder means row 40 arrives four seconds late.
- **Prefer Apple's duration-stagger for menus**: zero delay, durations descending in 20ms steps
  (400/380/360/340/320ms).
- **Never stagger on exit.** Dismissal is one decision. Close everything on one frame, ease-in.
- **Reverse the order for reverse motion.** A menu that opens top-down closes bottom-up if it
  staggers at all.

Stagger belongs to: menus opening, notifications arriving in a burst, an initial list paint on a
cold route. It does **not** belong to: filtering an existing list, re-sorting, pagination, or
anything the user does more than a few times an hour.

### Things that appear and disappear (`@starting-style`, `allow-discrete`)

The modern answer to "my exit animation doesn't play" and "my element flashes in at full size."
Shipping: Resend uses `@starting-style` ×10 and `transition-behavior` ×4; Vercel ×5 and ×3; Apple
×1 and ×2; Stripe has `allow-discrete` once.

`display: none → block`, `popover`, `<dialog>`, and fresh mounts have no "before" state to
transition from, and discrete properties like `display` and `overlay` don't interpolate:

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

Resend's build emits this as utilities — `starting:opacity-0`, `starting:translate-y-2`,
`starting:grid-rows-[0fr]`. Vercel's uses
`starting:open:opacity-0:is([open],:popover-open,:open)`.

- `@starting-style` must come **after** the rule it applies to, or order drops it.
- Without `allow-discrete` on `display`, the exit never plays — the element vanishes on frame one.
  This is the number one reason hand-rolled dropdown exits "don't work."

For `height: auto`: `interpolate-size: allow-keywords` (GitHub, Stripe, Vercel, Resend, Notion all
ship it) plus `calc-size()` (Notion) makes `0 → auto` transition natively. Guard with `@supports`
and fall back to `grid-template-rows: 0fr → 1fr`.

### Shared elements, layout transitions, View Transitions

**Animate the element's identity, not two separate fades.** When a card expands into a detail view,
the user should be able to point at the thing that moved.

Airbnb runs the deepest production View Transitions deployment I found — 122 `view-transition-name`
declarations and 759 `::view-transition-*` rules:

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

- **One element per `view-transition-name` per view.** Names must be unique at capture time; naming
  every card in a grid the same thing silently skips the whole transition.
- **The default root cross-fade is usually worse than nothing** in an app shell — the entire page
  dissolves, including the parts that didn't change:
  ```css
  ::view-transition-old(root), ::view-transition-new(root) { animation: none; }
  ```
- **For list add/remove/reorder inside one component, View Transitions is overkill.** A FLIP helper
  (or Motion's `layout` prop) is less code and interruptible.
- **Kill it under reduced motion**, as Linear does:
  ```css
  @media (prefers-reduced-motion: reduce) {
    ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) { animation: none !important; }
  }
  ```

### Scroll-driven animation (`animation-timeline`)

In production: Notion uses `animation-timeline` 30 times and `view-timeline` 9; Resend 6; Stripe 5;
Airbnb 5; GitHub 4.

**Not one of them uses it for "fade each section in as you scroll."** Notion attaches it to: nav
background changing as the hero scrolls out, nav shadow appearing when it sticks, a sticky bar
revealing at a marquee sentinel, a scroll-scrubbed hero graphic. GitHub uses `scroll(self)` to draw
a border on a dialog body only when it can actually scroll.

**Scroll-driven animation is for state that must track scroll position continuously and
reversibly** — nav chrome, progress, scrubbed illustration. It is not a nicer way to do entrance
reveals. An entrance reveal fires once and is a decision about whether the content should have been
visible; scroll-linked state is a continuous function of position.

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

- **Below ~300ms of latency, show no spinner** — but change state at 0ms. The 300ms delay applies
  to the *indicator glyph only*. The button must go disabled and `aria-busy` on the same frame as
  the click, or you have built a double-submit.
- **Above ~1s, a spinner stops carrying information.** Switch to a skeleton shaped like the
  incoming content, or a progress indication with a real denominator.
- **A spinner that outlives its usefulness is worse than a stalled screen**, because it promises
  imminent completion on every rotation. Past 10s you owe progress or a cancel affordance.
- **Skeletons shimmer slowly or not at all.** GitHub's `.SkeletonBox` runs a 1s linear shimmer;
  Airbnb's `--dls-shimmer-duration` is **1.35s**; Tailwind's `animate-pulse` is a 2s opacity cycle.
  Under 800ms a shimmer reads as strobing.
- **Never animate a number that represents real, current data.** A count-up on a live balance means
  that for 600ms your interface displays false values. Animate a number only when it changes while
  the user is watching *and* the transition itself is the information (a rate, a score being
  earned) — and use tabular figures so nothing reflows.

### `prefers-reduced-motion`, done properly — and how to verify it

The query does not mean "no feedback." It means **no vestibular-triggering motion**: no large
translations, no parallax, no rotation, no zoom, no autoplaying loops. Opacity and color changes
are fine and should be kept — they are the feedback channel.

**1. GitHub — nuclear, scoped per component.** Blunt but effective:
```css
@media (prefers-reduced-motion: reduce) {
  .Button, .Button *, .Button::before, .Button::after {
    transition: none !important; animation: none !important; scroll-behavior: auto !important;
  }
  .hide-reduced-motion { display: none !important; }
}
```

**2. Linear, Vercel, Notion — motion is opt-in.** Linear puts 24 motion blocks inside
`@media (prefers-reduced-motion: no-preference)`; Vercel uses Tailwind's `motion-safe:` variant 48
times; Stripe has **66** `no-preference` blocks against 14 `reduce` blocks. Structurally safest:
you cannot ship an element stuck at `opacity: 0`, because the `opacity: 0` never existed for that
user.

**3. Stripe — substitution.** The best of the three. Zero the durations at the token layer, then
per component ship the resting frame:
```css
@media (prefers-reduced-motion: reduce) {
  :root { --navigation-duration: 0s; --navigation-duration-slow: 0s; }
  .chart-bar                 { opacity: 1; transform: none; }   /* show the end state       */
  .agent-bubble-dots         { display: none; }                 /* animated typing dots…    */
  .agent-bubble-text--fallback { display: block; }              /* …become static text      */
  .invoice__line-arrow--static { opacity: 1; }                  /* moving arrow → still one */
}
```

**Now verify it.** Nine products loaded twice — once `no-preference`, once `reduce` — scrolled
4000px, running animations counted via `document.getAnimations()` (2026-09-10):

| Product | Running, no-preference | With `reduce` | What survives `reduce` |
|---|---|---|---|
| **Vercel** | 0 | **0** | — |
| **Ramp** | 0 | **0** | — |
| **Notion** | 1 | **0** | — |
| **GitHub** | 2 | **0** | — |
| **Stripe** | 17 | **1** | — |
| **cal.com** | 4 | 4 | 4 finite transitions, no infinite loops |
| **Resend** | 9 | **9** | 3× `scroll-x` marquee (180s ∞), 2× **`rotate` (30s ∞)**, `disco` (6s ∞) |
| **Cursor** | 37 | **37** | 36 infinite opacity loops (3.1s) + `shimmer` (1.6s) |
| **Linear** | 107 | **101** | 100× `grid-dot-*-agent` opacity loops (3.2s ∞) |

Resend leaves a **rotation** running under `reduce`, an explicit vestibular trigger. Cursor removes
zero of thirty-seven infinite loops. Linear removes six of a hundred and seven — its survivors are
opacity-only, the defensible end, but that is still a hundred infinite animations on the
compositor.

**The runnable check:**
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
produces an invisible page — the most common real accessibility bug in generated marketing sites.

### Performance

- **Animate `transform` and `opacity`. Everything else is a compromise.** These two are handled by
  the compositor and never touch layout or paint. `filter` and `backdrop-filter` are
  compositor-eligible but expensive per pixel — that is why an animated `blur()` on a paragraph of
  text costs more than the 6px translate next to it. `clip-path` is fine but paints. `width`,
  `height`, `top`, `left`, `margin`, `padding` trigger layout every frame.
- **`will-change` is a budget, not a hint.** Framer's marketing site declares it **104 times** (88
  of them the same wholesale `var(--framer-will-change-override, transform)`); cal.com, same
  builder, 48. Apple: 15 targeted `will-change: transform` and **8 explicit `will-change: unset`**
  to hand the layer back. Stripe: 12 `transform`, 3 `transform,opacity`, each on a specific
  animating element. Add on hover-intent or immediately before; remove after. `* { will-change:
  transform }` is a memory leak with good intentions.
- **`height: auto`,** in order of preference: `interpolate-size: allow-keywords` behind `@supports`
  (shipping at GitHub, Stripe, Vercel, Resend, Notion); `grid-template-rows: 0fr → 1fr`; a wrapper
  `transform: scaleY()` with a counter-scaled child; a measured pixel value from a CSS variable
  (shadcn's accordion).
- **Avoid layout thrash in JS-driven motion.** Never read `getBoundingClientRect()` in the same
  frame you write styles. Batch reads, then writes. FLIP is that discipline formalized.
- **`content-visibility: auto`** on long off-screen lists removes their animation work from the
  frame budget and costs nothing.
- Verify: DevTools → Rendering → **Paint flashing** and **Layer borders**. If a hover animation
  flashes green rectangles, it's repainting.

---

## Scope limits — where these rules invert

Every rule above has a domain. These are the realistic products where following it literally
produces a worse interface.

**"Nothing moves geometrically on hover inside a list" breaks on drag-reorderable lists.** In a
Kanban board, a playlist, a Notion database row, or a form-builder field list, the hover lift *is*
the drag affordance — it's how the user learns the row is grabbable before they press. Background
change alone teaches nothing. **Scope:** the rule binds when the list is a *destination* the cursor
sweeps across. When a row is a *handle*, keep the lift, but bound it: `translateY(-1px)` plus a
shadow step, ≤100ms, and only under `@media (hover: hover)`. It is also vacuous on touch — there is
no hover — so a touch-primary list needs a persistent visible drag handle instead, not a hover
state that never fires.

**"Delay the spinner 300ms" breaks on anything irreversible, and on search-as-you-type.** An agent
reads "show nothing below 300ms" and ships a live button through a 200ms delete, which the user
double-clicks. The delay governs the *glyph*, never the *state*: disable, `aria-busy`, and lock the
label on the click frame. Separately, in a search-as-you-type list, results that swap in under
300ms with no indicator change under the cursor, so the user clicks the row that was there a frame
ago. **Scope:** below 300ms, suppress the spinner and instead mark the stale content (`opacity:
.6`, `pointer-events: none`) so the swap is legible without adding a widget.

**"150–200ms for anything just clicked" breaks on surfaces that appear under the pointer with a
destructive default.** A delete-confirmation dialog that lands in 160ms can catch the tail of the
click that opened it. Speeding the animation makes it worse, not better. **Scope:** for a
destructive confirm, keep the 200ms enter but add an input-blocking window —
`pointer-events: none` on the confirm control until the enter animation completes — and never
autofocus the destructive option. The same applies to a panel whose content isn't ready: a 160ms
open followed by 900ms of skeleton reads as a stutter. Either hold the trigger's pressed state
until data lands, or open at 250ms and land with content.

**The px travel numbers assume 1× on a desktop viewport.** At 200% browser zoom, on a 10-foot TV
UI, or in a kiosk build with a 24px root, 4px is below perceptual threshold and the entrance simply
does not read. **Scope:** express travel in `rem` (`0.25rem`/`0.5rem`/`0.75rem`) for anything whose
root font size you scale. And a surface genuinely arriving from off-canvas — a toast, a bottom
sheet — is measured in *its own dimension*, not in px: Sonner and Vaul both travel 100%+ of the
element. A 4px toast entrance is a flicker, not an arrival.

**"Never animate a real number" breaks where the count-up is the reward.** A step counter, an XP
bar, a live auction or vote tally, a fundraising thermometer — there the animation communicates
*rate of change*, which is the information. **Scope:** the ban applies to values the user will act
on or transcribe (balances, prices, quotas, row counts). For the reward case, animate only the
delta the user just caused, in tabular figures, ≤600ms, and show the true value immediately under
`prefers-reduced-motion`.

**"Cap stagger at 5–8 items, 20–50ms" breaks in guided onboarding.** In a product tour or a
first-run explainer, the stagger *is* the reading order and a 300ms+ step is correct, because
you're pacing attention rather than revealing a list. **Scope:** deliberate sequencing that the
user watches once, with a skip control. Never on a surface they will see twice.

**Other domain limits:**

- **Marketing pages get a longer budget than product UI — and the same company should run two
  systems.** Resend proves it inside one stylesheet: menus at `translateY(4px)` / 200ms, hero text
  at `translateY(16px)` / 1000ms `ease-in-out`. GitHub's marketing hero staggers at 100ms with
  800ms durations, indefensible in the issues list two clicks away. The error always goes the same
  direction: marketing numbers applied to the app.
- **Games, creative tools, and celebration moments are a different genre.** A 600ms spring with 15%
  overshoot is wrong in a settings panel and right inside a photo gallery — exactly the only place
  Airbnb uses its 15.5%-overshoot `linear()` curve.
- **Small elements need bigger scale deltas.** A 2% scale on a 400px card is legible; on a 16px
  icon it's invisible. Figma scales reaction emoji `1.2` and avatars `1.1`. Scale delta is roughly
  inverse to element size.
- **"Always 150ms" is meaningless without the curve.** 300ms on outQuart feels faster than 200ms on
  the Tailwind default. Specify the pair or specify nothing.
- **`ease-in-out` is right more often than purists admit.** Anything traveling between two visible
  positions — tab indicator, reordering row, carousel — wants it. Apple's most-used curve is the
  symmetric `cubic-bezier(.4,0,.6,1)`, because most of Apple's motion is scroll-linked travel, not
  response.
- **A 100ms menu is wrong on a touch screen.** Touch has no hover to telegraph intent and a finger
  occludes the target, so touch UI benefits from 200–300ms and a visible spatial origin. Vaul's
  500ms drawer and Cursor's 420ms mobile sheet are touch-first numbers and they're right.
- **Reduced motion is not the only accessibility axis.** Vestibular users need less movement;
  cognitive-load users often need *more* transition to track what changed. When substituting,
  prefer a 100ms cross-fade over an instant cut.
- **Zero animation is a legitimate house style.** cal.com ships 5 transition declarations, Framer
  9, Cursor 40. If the product's character is "gets out of the way," the correct number is close to
  zero.

---

## Anti-patterns: what generated UI does in 2026, and the specific fix

The 2023 tells (jQuery fades, 700ms hero slides) are gone. These are the current ones, and most
arrive as a *library default* rather than a typed number.

| The tell | Why it happens | The fix |
|---|---|---|
| **`animate-in slide-in-from-bottom` with no suffix.** | Bare `tw-animate-css` utilities are full-magnitude: `slide-in-from-bottom` = 100% of element height, `zoom-in` = `scale(0)`, `blur-in` = 20px. | Always suffix: `slide-in-from-bottom-2` (8px), `zoom-in-95`, `blur-in-4`. Grep for a bare form and treat every hit as a bug. |
| **shadcn dialogs/dropdowns shipped as installed.** | `data-[state=open]:animate-in` and `data-[state=closed]:animate-out` are both 150ms on the `ease` keyword — symmetric, and `ease` is an ease-in-out. | Add `duration-200 ease-[cubic-bezier(.1,.9,.2,1)]` to open and `duration-150 ease-[cubic-bezier(.4,0,1,1)]` to closed. Two classes. |
| **Blur-in on text.** `filter: blur(10px) → 0` on every heading. | `BlurFade`, `TextAnimate`, and every "blur text" copy-paste component. | It's a per-pixel paint on a glyph run and it makes type illegible mid-flight. Keep the 6px translate, drop the blur. If you keep it, ≤4px and headings only. |
| **Per-word or per-character text reveals.** | `TextAnimate` defaults to `once = false` with `stiffness 300, damping 15` — ζ 0.43, **22% overshoot, 533ms settle**, replaying on every scroll-in. | Delete on body copy. If you keep it for one hero line: `once: true`, whole-line, ≤300ms, no spring. |
| **Every section fades and slides up on scroll.** Still the #1 signature. | `whileInView` is one prop; the scroll-reveal component is one import. | At most the hero, once, never replaying. Everything below the fold already has a motion primitive: scrolling. If you keep one, `translateY(8px)`, 300ms, `once`. |
| **Infinite decorative loops: border beams, meteors, animated gradient borders, aurora blobs.** | `BorderBeam` defaults to `duration 6s, repeat: Infinity` in `#ffaa40 → #9c40ff`; nothing gates it on the motion preference. | Every infinite loop needs a `reduce` kill and a reason. Count them with the `getAnimations()` check — an infinite decorative animation you cannot name the purpose of is a delete. |
| **Logo marquees at the default 40s.** | `Marquee`'s `--duration: 40s`, `repeat 4`, infinite. | Static grid, or `pauseOnHover` plus a `reduce` stop. Resend's three surviving `scroll-x` marquees under `reduce` are the failure mode. |
| **`translateY(20px)` or `40px` on an entrance.** | Hero distance from a tutorial, applied to chrome. | 4px menus, 8px nav/panels, 12px + `scale(.97)` modals. 16px+ only for a marketing hero. |
| **`transition: all 300ms ease-in-out` on everything.** | One line, and it "works." | Name the properties. `all` transitions layout properties you didn't intend and forces a per-frame check of every property. |
| **Rows lift 4px on hover.** | Tutorial card-hover applied to a data table. | Background change only — a 4–8% overlay. Exception: drag-reorderable rows (see Scope limits). |
| **Symmetric enter/exit.** | The library default, not a decision. | Exit at 60–75% of enter, on ease-in. Figma: 220ms in, 160ms out. |
| **The exit animation "doesn't work" so it got deleted.** | `display: none` is discrete and kills the transition on frame one. | `transition-behavior: allow-discrete` (plus `overlay` for popover/`<dialog>`), and `@starting-style` for the enter frame. |
| **Spinner on every action, mounted instantly.** | Loading state bound directly to `isLoading`. | 300ms delay on the glyph; disable + `aria-busy` at 0ms; skeleton past 1s; keep the label — the label is information, the spinner isn't. |
| **`NumberTicker` on a stat block.** | It's a one-line import and it looks impressive in a demo. | Render the value. Animate only a delta the user just caused, in tabular figures. |
| **50–150ms stagger on lists.** | Every stagger tutorial uses 100ms. | 20–50ms, capped after 5–8 items, never on exit. Or Apple's zero-delay/descending-duration trick. |
| **Parallax on content.** | Depth reads as "designed." | Decorative background layers only, ≤10–15% differential. Content moving at a different speed than the scroll is unreadable and is a vestibular trigger. |
| **Scroll-jacking, and "scrollytelling" pinned sections.** | Flagship demo of every scroll library. | Don't. Native `animation-timeline` for *state* (nav, progress) is the legitimate version. |
| **`prefers-reduced-motion` handled with `animation: none`.** | It's what the snippet says. | Substitute the end state. Then run the `getAnimations()` check with the preference emulated. |
| **Springs tuned by nudging `stiffness` until it feels right.** | The API exposes physics, so people tune physics. | Fix ζ (1.0 or 0.7), vary stiffness for tempo. In Motion: `visualDuration` + `bounce`, starting at `{ visualDuration: .3, bounce: .15 }`. |
| **`will-change: transform` on a wrapper "for performance."** | Cargo-culted from a perf article. | Only on the specific animating element, only while it animates, then `unset` — 8 of Apple's `will-change` declarations are the reset. |
| **A 700ms "premium" easing on a button.** | Long = luxurious. | 80–150ms. GitHub's buttons are 80ms. Luxury is in the curve and the color, not the wait. |
| **Every transition at `150ms cubic-bezier(.4,0,.2,1)`.** | Tailwind's default, inherited by 40 elements. | Define named house curves (`--ease-enter`, `--ease-exit`) and apply them at call sites via `ease-*` utilities — what Vercel and Resend do. Don't override the global default; it silently re-times third-party components too. |

---

## Self-check

Every item is a grep or a screenshot. Run them; don't read them.

**Grep the source.** All ERE, tested on BSD and GNU grep. A hit is a finding; empty is a pass.

```bash
# 1. Translates of 10px or more. Every hit must be a hero, a sheet, or a toast.
grep -rnoE 'translate[XY]?\(-?[0-9]{2,}px' src

# 2. Suffix-less tw-animate-css utilities — full-magnitude cliffs. Must be empty.
grep -rnE 'slide-in-from-(top|bottom|left|right)([^-0-9]|$)' src
grep -rnE '(^|[^-])(zoom-in|zoom-out|blur-in|blur-out|spin-in|spin-out)([^-0-9]|$)' src

# 3. `all` transitions. Must be empty.
grep -rnE "transition-all|transition: *['\"\`]?all" src

# 4. Exits with no explicit duration, i.e. symmetric with the enter. Must be empty.
grep -rn 'data-\[state=closed\]' src | grep -v 'duration-'

# 5. Scroll reveals that replay on every re-entry. Must be empty.
grep -rn 'whileInView' src | grep -v 'once'

# 6. Every infinite loop. For each, name its job from "Does this animation earn its place"
#    and confirm it sits inside a prefers-reduced-motion guard.
grep -rnE 'repeat: *Infinity|infinite' src

# 7. Animated blur, usually on text. Each hit is a per-pixel paint cost.
grep -rnE "filter: *['\"\`]? *blur|blur-in|BlurFade|TextAnimate" src

# 8. Hand-tuned springs. Replace with visualDuration + bounce.
grep -rnE 'stiffness|damping' src

# 9. Each will-change must be paired with a removal (`unset`, or a JS cleanup on the same element).
grep -rnE 'will-change|willChange' src

# 10. Discrete display changes near a transition need transition-behavior: allow-discrete
#     and @starting-style in the same rule.
grep -rnE 'display: *none' src --include='*.css' --include='*.scss'

# 11. Animated numbers. Each must be a delta the user caused, not a live figure.
grep -rnE 'NumberTicker|CountUp|animateValue' src

# 12. Durations over 300ms. Each must move more than half a viewport.
grep -rnoE '[3-9][0-9]{2}ms|[0-9]+\.[0-9]+s' src

# 13. Stagger. Step must be <=50ms and capped after 8 items.
grep -rnE 'staggerChildren|delayChildren' src; grep -rn 'nth-child' src | grep -i delay
```

**Look at the screen:**

14. Open a dropdown, a dialog, and a toast. Screen-record at 60fps and step frame by frame: does
    the exit take visibly fewer frames than the enter? If they're equal, the exit was never written.
15. Hover a row in your longest list and screenshot both states. Diff them. If anything but color
    changed position, it's a bug unless the row is draggable.
16. Emulate `prefers-reduced-motion: reduce`, reload, screenshot the full page. Every element must
    be visible and in its final position — no blanks, no half-faded blocks. Then run:
    `document.getAnimations().filter(a=>a.playState==='running'&&a.effect.getTiming().iterations===Infinity).map(a=>a.animationName)`
    Every survivor must be opacity- or color-only.
17. DevTools → Rendering → **Paint flashing** on. Hover every interactive element. Green rectangles
    on a hover state = you animated a paint property.
18. For the three highest-traffic interactions in your analytics, compute `animation duration ×
    daily events per user`. Anything over 10 seconds a day is a tax you designed in; cut the
    duration until it isn't.
19. Load the marketing page and count entrance animations between the top and the fold. More than
    one is one too many.
20. Throttle the network to Slow 4G and click a submit button. Does the button lock on the click
    frame, or does it stay live for 300ms waiting for a spinner?

---

## Method

Chromium via Playwright, 1440×900, real UA, `domcontentloaded` + 6s settle. For each product I
captured every stylesheet response plus inline `<style>` blocks (0.4–2.5 MB per site, 14 sites),
then: counted `transition-duration` / `transition` shorthand / `transition-timing-function` /
`transition-delay` / `animation-duration` / `will-change` declarations; parsed every `@keyframes`
body and extracted the pixel values inside `translate*()` and the ratios inside `scale*()`;
extracted `:root`/`html` custom properties matching `motion|dur|ease|spring|timing|curve`; counted
`prefers-reduced-motion: reduce` vs `: no-preference` blocks; and counted modern-feature usage
(`@starting-style`, `transition-behavior`, `allow-discrete`, `animation-timeline`, `view-timeline`,
`view-transition-name`, `::view-transition-*`, `linear()`, `interpolate-size`, `calc-size()`).

The reduced-motion audit loaded each site twice in fresh contexts with Playwright's `reducedMotion`
option, scrolled 4000px in 800px steps, waited 2.5s, and enumerated `document.getAnimations()`,
recording `animationName`, duration and iteration count for everything still in
`playState: 'running'`.

Bezier peaks and 90%-progress points were computed by sampling each curve at 20,000 points, with
`x(t)` inverted by bisection. `linear()` easings were parsed stop-by-stop for peak value and
position. Damping ratios and overshoots from ζ = c / 2√(km) and e^(−πζ/√(1−ζ²)); settling time from
4/ζωₙ. Library values (Motion 13.2.0, Tailwind 4.3.3, `tw-animate-css` 1.4.0, Vaul 1.1.2, Sonner
2.0.8, `@material/web` 2.5.0) come from published tarballs and registry JSON, not documentation.
shadcn and Magic UI component defaults come from the current registry sources. SwiftUI values come
from Apple's documentation API, which returns declared signature defaults.

Sites probed: linear.app, stripe.com, vercel.com, notion.com, github.com, figma.com, raycast.com,
resend.com, ramp.com, framer.com, cursor.com, cal.com, airbnb.com, apple.com/macbook-pro,
vaul.emilkowal.ski.

---

## Direction pass (2026-09)

**Re-probed live, 2026-09-10.** Fourteen sites re-crawled with Playwright; the reduced-motion audit
re-run across nine; every bezier and spring figure recomputed from scratch rather than carried
forward.

**Confirmed unchanged** (byte-identical to the previous pass): Linear's four `--speed-*` tokens
including `highlightFadeIn: 0s`; Vercel's `--ds-motion-overlay-scale: .96` and
`--ds-motion-popover-duration: .2s`; GitHub's `--duration-fast: 80ms`; Airbnb's four motion curves
and all eighteen spring source parameters plus the six shipped durations; Notion's five-value
tatami scale capped at 300ms; Apple's four `globalnav-flyout-*` 8px keyframes; Resend's 4px menu
and 16px hero keyframes; Figma's modal at **220ms `cubic-bezier(.34,1.2,.64,1)` in / 160ms
`ease-in` out** (found on `ShareSheet` and `AiCreditsEnrollmentModal`, now named in §1); Tailwind
v4.3.3's two defaults; Linear's zero pixel translates in any keyframe. Every entry in the perceived-
duration and overshoot tables reproduced to within 0.5 percentage points.

**Numbers corrected:** all fourteen duration-histogram rows refreshed (Figma 1188 → 1114, Apple 841
→ 667, Framer 14 → 9, Airbnb 528 → 539, Linear 145 → 154, Stripe 117 → 124, and the per-value
distributions with them), plus a caveat that these counts drift with each deploy. Reduced-motion
counts refreshed (Stripe 18 → 17, Ramp 1 → 0, cal.com 3 → 4) with two products added (Vercel 0/0,
GitHub 2 → 0); Linear's 107 → 101 and Cursor's 37 → 37 reproduced exactly, and Resend's surviving
30s `rotate` is still there. GitHub's base duration scale corrected from "100…500" to the actual
0–1000 with the semantic aliases shown.

**One claim was wrong and is now reversed.** The file previously said to override
`--default-transition-duration` and `--default-transition-timing-function` in your theme block, and
credited Vercel and Resend with doing exactly that. Neither does — both, plus Cursor, ship
Tailwind's defaults untouched and override at the *call site* via `--tw-ease` (Resend defines 17
distinct values). The advice is now the opposite, with the reason: a global override silently
re-times third-party components you did not write.

**New section §8, "The defaults your tooling ships."** The 2026 tells arrive as library defaults,
not typed numbers, so the file now carries them with their source values: `tw-animate-css@1.4.0`'s
bare utilities (`slide-in-from-bottom` = 100%, `zoom-in` = `scale(0)`, `blur-in` = 20px) and its
symmetric 150ms `ease` for both `animate-in` and `animate-out`; shadcn's dialog/dropdown as
installed; and Magic UI's `BlurFade` (400ms/6px/6px blur), `TextAnimate` (`once = false`, ζ 0.43,
22% overshoot), `NumberTicker`, `BorderBeam` (6s infinite, `#ffaa40 → #9c40ff`) and `Marquee` (40s
infinite). The anti-pattern table was rewritten around these; blur-in on text, per-character
reveals, infinite border beams and default logo marquees are new rows.

**New section "Scope limits."** Six rules were stated without limits and would be followed off a
cliff: the hover rule breaks on drag-reorderable lists where the lift *is* the affordance; the
300ms spinner delay breaks on irreversible actions and search-as-you-type unless it governs only
the glyph; fast durations break on destructive confirmations that catch the opening click; the px
travel numbers break at 200% zoom and on 10-foot UIs; the ban on animated numbers breaks where the
count-up is the reward; the stagger cap breaks in guided onboarding. Each now carries its scope and
the bounded alternative.

**Self-check rewritten as twenty executable checks** — thirteen greps (run against a fixture and
confirmed portable on BSD and GNU grep; a hit is a finding, empty is a pass) and seven things you
do to a screen with a stated pass condition. Prose items like "can I name which of the five jobs
each animation does" were replaced with the grep that surfaces the candidates.

**Cut:** roughly 60 lines of commentary that restated a table without changing a decision — "read
the bottom of that table twice," "two things fall out of this that people get wrong constantly,"
"that lag is exactly the thing that makes cheap UI feel cheap," "none of these companies is
careless," "the lessons in it are worth more than the spec," and the opening's self-description of
what the file is not.
