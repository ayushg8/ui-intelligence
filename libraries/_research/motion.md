# Motion, animation and micro-interaction systems

**Evaluated:** 2026-09 · **Researcher note:** Two things reset this category. GSAP went free on 2025-04-30 under Webflow — but "free" is a proprietary no-charge license with a clause forbidding competitors to Webflow's visual animation builder, and the repo has slowed to two releases a year (3.13.0 Apr 2025 → 3.14.0 Dec 2025 → 3.15.0 Apr 2026). Meanwhile the browser absorbed the easy 80%: `@starting-style` is at 91.9% support, same-document View Transitions hit 91.75% once Firefox 144 shipped, `linear()` gives you real springs in pure CSS, and Safari 26 landed scroll-driven animations. The libraries that still matter are the ones doing what CSS genuinely cannot: interruptible springs with velocity handoff, layout/FLIP animation, and gesture-attached motion. Almost everything else in this category is a marketing-site tool wearing a product-UI costume.

## Verdict at a glance
| Library | Tier | One-line verdict | Vibecode risk |
|---|---|---|---|
| Motion (motion.dev) | `essential` | The one JS motion library a product app should install; springs, layout, presence, reduced-motion in one MIT package | low as an engine, high via copy-paste "motion component" culture |
| Native CSS motion (`transition`, `@starting-style`, `linear()`) | `essential` | Handles 80% of product motion at 0kb and on the compositor | low |
| View Transitions API (same-document) | `strong` | Finally cross-browser at 91.75%; the correct tool for "this element became that element" | low |
| AutoAnimate | `strong` | 1 line, ~3kb, correct for list add/remove/reorder — and nothing else | low |
| CSS scroll-driven animations | `strong` | Kills 90% of ScrollTrigger use cases with zero JS; Firefox still flagged | low |
| GSAP | `strong` | Peerless timeline engine, now free-as-in-beer but not open source; cadence has slowed under Webflow | high — its culture is scroll-jacked marketing sites |
| NumberFlow | `strong` | Best-in-class animated number; solves a problem everyone hand-rolls badly | low |
| Rive | `strong` | State-machine character/illustration motion; runtime MIT, editor is the product | low |
| dotLottie (`dotlottie-web`) | `strong` | The Lottie runtime you should actually use now — Rust/WASM + WebGPU | medium |
| anime.js v4 | `situational` | Excellent readable engine; 72k stars vastly overstate real usage (874k/wk) | low |
| react-spring | `situational` | Still healthy, but Motion took its lane; its usual partner `use-gesture` is 26 months stale | low |
| `tw-animate-css` | `situational` | 25M/wk because shadcn ships it; fine, low ceiling, not a motion system | high |
| Motion+ (£299) | `situational` | Good components, real license fine print; buy for Ticker/SplitText, not as a strategy | medium |
| Lenis | `situational` | The least-bad smooth scroll, which is still usually the wrong idea in a product | high |
| `interpolate-size` / `calc-size()` | `experimental` | The real fix for `height: auto`; Chromium-only, ship behind `@supports` | low |
| tailwindcss-motion (Rombo) | `experimental` | Nice utility syntax, 38k/wk, last push 2026-02 | medium |
| animations.dev (Emil Kowalski) | `reference-only` | The best teaching in the category — but enrollment is closed until 2027 | — |
| Theatre.js | `reference-only` | Last commit 2024-08, last npm 2024-05. Site still has a "Jobs" link | — |
| lottie-web | `avoid` (new work) | 6.5M/wk of inertia, 857 open issues, no publish since 2025-05 | medium |
| `@lottiefiles/lottie-react` | `avoid` | Archived on GitHub | — |
| popmotion | `avoid` | 2.0M/wk of zombie installs; folded into Motion years ago | — |
| Scroll-jacked page-by-page "storytelling" | `avoid` | NN/g measured lower accuracy *and* lower satisfaction | high |

## Recommendations by need
- **Default choice:** Native CSS first, Motion second. Write the hover, focus, press and enter/exit in CSS; reach for Motion the moment you need shared-layout (`layoutId`), exit animation of unmounting React trees (`AnimatePresence`), or a spring that must survive being grabbed mid-flight.
- **Best engineering:** GSAP's timeline model is still the most complete sequencing abstraction anyone has built, and its plugin surface (ScrollTrigger, Flip, MorphSVG, SplitText, Observer) has no free equivalent. Motion is the better *engine* for product UI; GSAP is the better *orchestrator* for anything with a storyboard.
- **Best visual quality out of the box:** Rive. It is the only tool here that produces motion a motion designer authored rather than motion a developer parameterized.
- **Best accessibility:** Motion, by a wide margin — `<MotionConfig reducedMotion="user">` automatically disables transform and layout animations while *preserving* opacity and background-color, which is exactly the right behaviour (reduced motion means cross-fade, not "no feedback"). `useReducedMotion()` covers the rest.
- **Most customizable / least house-style:** GSAP and anime.js. Both emit zero opinions about your visual language; they animate numbers.
- **Lightest:** `@starting-style` + a `linear()` spring: 0kb. If you need JS, Motion's `useAnimate` mini is 2.3kb; AutoAnimate is ~3kb for the whole list-reorder problem.
- **Promising newcomer:** NumberFlow — 7.7k stars in 14 months, 1.1M/wk, MIT, and it gets the details (tabular figures, `prefers-reduced-motion`, screen-reader-correct value announcement) that every hand-rolled counter gets wrong.
- **Premium/paid worth it:** None right now, with one asterisk. Motion+ at £299 one-time is fairly priced for SplitText + Ticker + ScrambleText if you need them this quarter, but the same money buys nothing you can't build. animations.dev is the best thing in this category and **you cannot buy it** — enrollment reopens "sometime in 2027, for 10 days."

## The judgment that actually matters

Everything below is downstream of one distinction:

**Motion that earns its place** does one of exactly three jobs — *continuity* (this thing became that thing; the sheet came from the button you tapped), *feedback* (the system received your input, right now, on pointer-down), or *physicality* (the object has weight and inherits the velocity of your finger). If an animation does none of these, it is a delay you added on purpose.

**The concrete budget.** Emil Kowalski's rule is the one to encode: *"Your animations should also usually be shorter than 300ms."* Below ~100ms is imperceptible. Above ~500ms is sluggish for anything functional. Practical defaults that hold up:

| Thing | Duration | Easing |
|---|---|---|
| Hover / focus ring | 100–150ms | `ease-out` |
| Button press | 150ms, `scale(0.97)` on `:active` | `ease-out` |
| Dropdown / popover / tooltip enter | 150–200ms | `ease-out` |
| Any exit | 100–150ms (shorter than its enter) | `ease-in` |
| Modal / dialog | 200–300ms | `ease-out` |
| Sheet / drawer | spring, damping ~0.8, response ~0.3 | — |
| Page / route transition | 250–350ms | `ease-out` or `ease-in-out` |
| Progress / countdown | equal to the real duration | `linear` — time passes linearly |

**Enter with `ease-out`, exit with `ease-in`, never `linear`** (except for continuous or time-representing motion). `ease-out` starts fast, so the interface feels like it responded instantly and then settled. `ease-in` on entry is the single most common tell of an unconsidered animation — the same 300ms reads as noticeably slower.

**Springs vs easing.** Use a spring when the motion is attached to the user — drag, flick, sheet dismissal, anything that must be grabbable mid-flight and inherit gesture velocity. Use a duration + curve when the *system* is announcing a change — a toast arriving, a menu opening, a value updating. Apple's published defaults are the best starting numbers anyone has: critically damped `damping 1.0 / response 0.3–0.4` for standard UI, `damping ~0.8 / response 0.3–0.4` where a little momentum reads as physical, `damping 0.8 / response 0.3` for drawers and sheets. Motion's `spring(visualDuration, bounce)` is a better parameterization than stiffness/damping/mass because `visualDuration` is the time to *first reach* the target, not the time to stop wobbling — which is what a designer actually means.

**Interruptibility is not a nice-to-have.** From Emil Kowalski's `apple-design` skill: *"Every animation must be interruptible and redirectable at any moment… Avoid CSS transitions and `@keyframes` for anything gesture-driven — they can't be smoothly grabbed and reversed mid-flight."* Always animate from the current on-screen value, never from the target. This is the single reason a JS motion library still exists in 2026, and it is also why `linear()` CSS springs are a partial solution — Josh Comeau's caveat is that on interrupt a `linear()` transition *"turns around instantly, as though it hit a wall."*

**Perceived performance beats animation quality.** Linear's UI feels fast because the database it reads from is IndexedDB in the browser; mutations apply to in-memory state instantly and queue to the server over WebSocket, so there is no spinner to animate. That is the real lesson: the fastest transition is the one you removed because the data was already there. A skeleton is an admission; an optimistic update is a fix. Family's design lead frames the same idea as *contextual continuity* — overlays that preserve context rather than full-screen replacements, and directional logic (*"If you tap on a tab on the left, the transition moves left"*). Neither team is winning on easing curves.

**Where the frames go.** Motion's own performance tier list is the most useful mental model published: **S-tier** = `transform`, `opacity`, `filter`, `clip-path`, plus scroll/view timelines (compositor-only, immune to a blocked main thread). **A-tier** = rAF libraries driving those same properties. **B-tier** = FLIP layout animations. **C-tier** = paint-triggering — `background-color`, `color`, `border-radius`, SVG attributes, CSS variables (which *always* trigger paint) **and the View Transitions API**. **D-tier** = `width`, `height`, `margin`, `top`. **F-tier** = read/write thrashing. Two under-known specifics from that piece: CSS custom-property inheritance can invalidate style across an entire subtree even when unused (one production site burned its whole 8ms frame budget recalculating 1300+ elements), and `blur()` cost escalates sharply per pixel of radius — treat >10px blur on a large layer as a performance decision.

**`prefers-reduced-motion` done properly.** Reduced motion means *reduced*, not *removed*. Killing all animation removes the state-change signal, which is a different accessibility failure. The correct pattern: keep the transition, drop the distance. Replace slides, springs, parallax and scale with a ≤200ms opacity cross-fade; drop all overshoot and elastic; disable autoplaying video, marquees and infinite spinners; keep focus-ring transitions and real progress indicators. In CSS, prefer `0.01ms` over `0` so `transitionend`/`animationend` still fire and your JS doesn't hang waiting. In React, `<MotionConfig reducedMotion="user">` gets this right by default. Also honor `prefers-reduced-transparency` and `prefers-contrast` while you're in there.

## Scorecards

### Motion (motion.dev, ex-Framer Motion) — `essential`
- **What:** Hybrid animation engine for React, Vue and vanilla JS. Springs, gestures, `AnimatePresence` exit animations, shared-layout `layoutId`, scroll linking, and a `spring()` generator that emits pure-CSS `linear()` easing.
- **Verdict:** This is the default and the evidence is not close. It is the only library here that ships interruptible velocity-preserving springs, FLIP layout animation, exit animation of unmounting React trees, and first-class reduced-motion in one MIT package. The bundle story is worse than people assume — the docs say the full React build is "50kb or more" — but the escape hatches are real: `LazyMotion` + `m` lands "just under 4.6kb" for initial render (+15kb `domAnimation` / +25kb `domMax` loaded async), and `useAnimate` mini is 2.3kb. The site now markets *against* GSAP ("APIs up to 90% smaller than their GSAP alternative") and *at* agents ("Agent-compatible documentation, skills and API"), which tells you where the fight is.
- **Use when:** any React app that needs layout/presence/gesture motion · **Don't use when:** all you need is a hover and a fade — that is a 0kb CSS transition, and installing Motion for it is the most common mistake in this category.
- **Scores /5:** visual — · interaction 5 · a11y 5 · engineering 5 · maintenance 5 · docs 5 · customization 5 · perf 4 (main-thread rAF, A-tier by its own chart) · stability 5 · originality 4
- **Evidence:** ★33,550 · v13.2.0 2026-09-02 · last push 2026-09-09 · 18,255,133 wk npm (`motion`) **+ 41,006,870 (`framer-motion`)** · ~132 contributors · MIT · site claims "Trusted by Framer and Figma" (vendor claim, unverified independently)
- **Looked at:** https://motion.dev — Swiss-industrial: saturated cadmium yellow ground, one hard-edged near-black hero card, zero border radius anywhere, all UI labels in tracked mono caps. Version stamped in the card header (`V13.2.0`) next to `OPEN SOURCE / MIT LICENSE`. Five equal-width feature columns below the fold on a black band. No gradient, no glass, no shadow — a rare docs site with an actual position. At 390px the hero card is vertically centred, leaving ~500px of empty yellow above it before any content; the composition doesn't survive the narrow viewport as well as GSAP's does.
- **Vibecode risk:** low as an engine — it emits no markup and no styles. High in practice, because the `initial/animate/whileHover` + `y: 20, opacity: 0` staggered-fade-up-on-scroll pattern has become the single most recognizable AI-generated interface signature on the web. The library isn't the tell; the default recipe is.
- **Link:** https://motion.dev

### Native CSS motion — `transition`, `@starting-style`, `linear()` — `essential`
- **What:** The platform. `transition` + `transition-behavior: allow-discrete` + `@starting-style` for enter/exit including `display: none`, and `linear()` for spring and bounce curves with no library.
- **Verdict:** This should be the first thing an agent reaches for and almost never is. `@starting-style` is at 91.92% global support (Chrome/Edge 117+, Firefox 129+, Safari 17.5+), which finally makes CSS-only enter animations for popovers and dialogs real. `linear()` (~88% and Baseline since Dec 2023) lets you paste a 40-point spring curve into a design token; Jake Archibald and Adam Argyle's generator and Easing Wizard both convert stiffness/damping/mass into an optimized string, and Comeau measured three complex springs at ~1.3kB gzipped. Everything here runs S-tier on the compositor when you animate `transform`/`opacity`. The honest limit: `linear()` springs are still time-based, so a mid-flight interrupt reverses hard instead of preserving velocity — that boundary is exactly where you should reach for Motion.
- **Use when:** hover, focus, press, disclosure, popover/dialog enter-exit, any state change not attached to a finger · **Don't use when:** the motion must be grabbable mid-flight, or you need FLIP/shared-layout.
- **Scores /5:** visual — · interaction 4 · a11y 5 · engineering 5 · maintenance 5 · docs 4 · customization 5 · perf 5 · stability 5 · originality —
- **Evidence:** `@starting-style` 91.92% global (caniuse) · `linear()` ~88% as of late 2025, Baseline since Dec 2023 · 0kb
- **Vibecode risk:** low. CSS has no house style.
- **Link:** https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style · https://www.joshwcomeau.com/animation/linear-timing-function/

### View Transitions API — `strong`
- **What:** `document.startViewTransition()` for same-document state changes; `@view-transition { navigation: auto }` for cross-document MPA navigation. `view-transition-name` binds an element in the old state to its counterpart in the new one.
- **Verdict:** The same-document API crossed the line this cycle: 91.75% global, Chrome 111+, Safari 18+, and Firefox 144+ after being flag-gated in 143. That makes it the correct default for "this list row became this detail page" — the one motion problem CSS could never solve, because it needs snapshots of two DOM states at once. Cross-document is a different story: Chrome 126+ and Safari 18.2+ have it, Firefox does not, and MDN still marks `@view-transition` **limited availability, explicitly not Baseline**. Two caveats agents get wrong: React's `<ViewTransition>` and Next's exports are still `unstable_`-prefixed / canary-only, so don't present them as stable; and Motion's tier list puts the whole API in **C-tier (paint-triggering)** — it is a correctness and continuity tool, not a performance one.
- **Use when:** list→detail, tab→panel, thumbnail→lightbox, and MPA navigation where you can accept a Chromium/Safari-only enhancement · **Don't use when:** you need it to work identically in Firefox cross-document, or the transition is per-frame/gesture-driven.
- **Scores /5:** visual — · interaction 5 · a11y 4 (respects reduced motion; you must still manage focus) · engineering 4 · maintenance 5 · docs 4 · customization 4 · perf 3 · stability 3 (Level 2 still moving) · originality 5
- **Evidence:** 91.75% global for same-document (caniuse) · Firefox 144+ · cross-document Chrome 126+/Safari 18.2+, not Baseline · 0kb
- **Vibecode risk:** low — the default cross-fade is nearly invisible, which is the point.
- **Link:** https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API

### AutoAnimate — `strong`
- **What:** One hook/directive on a parent element. Children that are added, removed or reordered animate automatically. React, Vue, Svelte, Solid, Angular, Preact, vanilla.
- **Verdict:** The best effort-to-value ratio in the category and the correct answer to a specific, extremely common problem: lists that mutate. ~3kb, `useAutoAnimate()` on the `<ul>`, done — and critically it uses the Web Animations API rather than a rAF loop. Its virtue is its narrowness; the failure mode is teams reaching for it as a general motion system, where it gives you no control over choreography, no exit orchestration, and no gesture handling. Steady rather than fast-moving (0.10.0 in July 2026, 42 contributors), which is appropriate for something this small and this finished.
- **Use when:** todo lists, sortable/filterable tables, kanban columns, notification stacks, any `.map()` over changing data · **Don't use when:** you need to art-direct the motion, or the container isn't the unit of change.
- **Scores /5:** visual 3 · interaction 4 · a11y 3 (respects reduced motion; you own announcements) · engineering 4 · maintenance 4 · docs 4 · customization 2 · perf 5 · stability 5 · originality 5
- **Evidence:** ★13,915 · v0.10.0 2026-07-10 · last push 2026-07-10 · 1,303,447 wk npm · ~42 contributors · MIT
- **Looked at:** https://auto-animate.formkit.com — lavender-tinted ground with a faint dot grid, `#5B21EA` purple accent, headline with one word colored purple, and a macOS-window code panel with traffic lights and a framework tab strip. Below: a "Native JavaScript 😐 / AutoAnimate 🤩" side-by-side. That emoji comparison and the dot-grid-plus-purple combination read as 2022 SaaS-docs template; serviceable, not distinguished. The demo itself is the honest part — it shows the library doing its one job.
- **Vibecode risk:** low. It has no visual opinion, only a timing one.
- **Link:** https://auto-animate.formkit.com

### CSS scroll-driven animations — `strong`
- **What:** `animation-timeline: scroll()` and `view()` drive a keyframe animation from scroll position instead of time. Zero JS, runs on the compositor.
- **Verdict:** This is what kills most ScrollTrigger usage, and agents have not caught up. Chrome/Edge 115+, Safari 26+ (with threaded scroll-driven animations added in 26.4), roughly 84% global mid-2026 — but Firefox stable still has it behind `layout.css.scroll-driven-animations.enabled`, so it is **not Baseline**, and it is a named Interop 2026 priority. Because it's declarative and compositor-driven it survives a blocked main thread, which no rAF scroll library does. Ship it behind `@supports (animation-timeline: scroll())` with a static fallback and you have a genuinely free upgrade. The trap is the same one ScrollTrigger sets: the technology being easy does not make scroll-linked reveal animations a good idea on a page someone is trying to read.
- **Use when:** reading-progress bars, sticky-header shrink, image reveal on entry, scroll-linked parallax you were going to build anyway · **Don't use when:** you need pinning/scrubbing with complex timeline sequencing (still GSAP ScrollTrigger), or Firefox parity is a requirement.
- **Scores /5:** visual — · interaction 4 · a11y 4 (wrap in `prefers-reduced-motion`) · engineering 5 · maintenance 5 · docs 4 · customization 4 · perf 5 · stability 4 · originality 5
- **Evidence:** Chrome/Edge 115+ · Safari 26+ · Firefox behind flag as of 152 · ~84% global mid-2026 · not Baseline · 0kb
- **Looked at:** https://scroll-driven-animations.style — Bramus's demo index, deliberately undesigned: white ground, a hand-drawn mouse-with-up-down-arrow illustration, a bookish serif headline and italic serif subtitle, emoji utility buttons floating bottom-right. It is a lab notebook, not a product, and it's correct for it to look like one. The value is the demo grid below the fold, not the page.
- **Vibecode risk:** low.
- **Link:** https://scroll-driven-animations.style

### GSAP — `strong`
- **What:** The timeline-based JS animation platform, plus ScrollTrigger, Flip, MorphSVG, DrawSVG, SplitText, Observer, Draggable and the rest — all free since 2025-04-30 under Webflow.
- **Verdict:** Still the best sequencing engine ever built for the web, and now free of charge — but read the license before you assume that means open source. It is **not an OSI license**: the GSAP Standard "No Charge" license explicitly restricts use in *"tools that allow users to build visual animations without code that encourages, induces, or materially assists in creating a solution that competes with Webflow's visual animation building capabilities."* If you are building a no-code website or animation builder, this affects you. The maintenance signal is the other thing nobody says out loud: three releases in 17 months (3.13.0 2025-04-30, 3.14.0 2025-12-08, 3.15.0 2026-04-13) and no commit to `master` since April. Webflow has publicly committed to maintaining it and 5 open issues is a real number, not a neglected one (they triage in forums) — but this is a library in stewardship mode, not development mode. For product UI it is usually the wrong tool anyway: you want CSS or Motion. For a storyboarded sequence with 40 tweens that must scrub, reverse and re-time, nothing else is close.
- **Use when:** complex timelines, SVG morphing, `Flip` for layout choreography, scroll-scrubbed sequences with pinning, canvas/WebGL orchestration · **Don't use when:** you're building an app UI, or you're a no-code/visual-builder product (license), or you need an OSI-approved license for procurement.
- **Scores /5:** visual — · interaction 5 · a11y 3 (you own reduced motion entirely; `gsap.matchMedia()` helps) · engineering 5 · maintenance 3 · docs 5 · customization 5 · perf 4 · stability 5 · originality 4
- **Evidence:** ★28,330 · v3.15.0 2026-04-13 · last push 2026-04-13 · 3,301,517 wk npm · GitHub license field `null` (npm reads "Standard 'no charge' license: https://gsap.com/standard-license", effective 2025-04-30) · 5 open issues (support runs through forums, not GitHub)
- **Looked at:** https://gsap.com — near-black ground, cream display type at roughly 180px with tight negative leading, an acid-green announcement bar reading "GSAP is now free for everyone, thanks to Webflow's support!", the `i` in "anyth!ng" swapped for an exclamation mark, hand-set curly braces around the tagline, and two gradient blob ornaments (orange/pink pinwheel, purple squiggle). Confident, and unmistakably awwwards-agency rather than product. That aesthetic is the honest signal of what the library's community builds. At 390px it holds up better than most: the display type reflows to ~72px without breaking, the brace-wrapped tagline survives, and the CTA goes full-width — though the two-line announcement bar eats 100px of the fold.
- **Vibecode risk:** high, culturally rather than technically. GSAP emits no styles, but the pattern library an agent will copy from GSAP's own showcase is pinned scroll sections, split-text character reveals and horizontal scroll-jacking — the exact set of things that make a product site feel like a 2019 portfolio.
- **Link:** https://gsap.com

### NumberFlow — `strong`
- **What:** A dependency-free animated number component for React, Vue, Svelte and vanilla. Transitions digits, handles grouping, currency and unit formatting via `Intl.NumberFormat`.
- **Verdict:** Solves a problem every dashboard hand-rolls and every hand-roll gets wrong — jittering widths because the figures aren't tabular, screen readers announcing every intermediate frame, and no reduced-motion path. 7.7k stars in 14 months and 1.1M weekly downloads with a single primary maintainer is fast adoption for something this narrow, which is the honest risk here (bus factor of roughly one). Emil Kowalski endorses it on the site. The `Limitations` section in its own docs is a maturity signal: a library that publishes what it can't do is telling you the truth about the rest.
- **Use when:** metrics, counters, prices, live totals, anything numeric that changes in place · **Don't use when:** the number changes more than a few times a second (you're animating noise).
- **Scores /5:** visual 5 · interaction 5 · a11y 5 · engineering 4 · maintenance 4 · docs 5 · customization 4 · perf 4 · stability 4 · originality 5
- **Evidence:** ★7,687 · last push 2026-07-18 · 1,107,260 wk npm (`@number-flow/react`) · MIT · created 2024-07-15
- **Looked at:** https://number-flow.barvian.me — near-white ground, and the hero *is* the demo: one 96px number reading `($3,243.60)`, negative currency rendered in parentheses, which is an accountant's convention and a tell that whoever built this has typeset real financial data. A black pill "Shuffle" re-rolls it. Sidebar nav is plain text with the active item in black and the rest mid-grey — no pill, no box, no left border. Floating bottom dock (Docs / Examples / Showcase / 7.7k / Follow) in a light glass capsule. This is product-grade restraint; most component docs sites should look at it.
- **Vibecode risk:** low — it renders your typeface at your size.
- **Link:** https://number-flow.barvian.me

### Rive — `strong`
- **What:** A vector animation editor plus state machines, with MIT runtimes for web, React, React Native, iOS, Android, Flutter, Unity and Unreal. Animations respond to app state and input rather than playing back linearly.
- **Verdict:** The only tool here that produces motion a *motion designer* authored. The state-machine model is the real differentiator over Lottie: Duolingo's published approach combines eight head and eight body animations into 64+ variants under 1MB using nested artboards and event-driven expressions — that is a system, not a clip. Rive's own blog confirms Spotify used it for the Wrapped 2025 motion layer. The trade is honest and should be stated plainly: the runtime is MIT but the editor is the business (Free / Cadet $9 / Voyager $32 / Enterprise $120 per seat per month), so adopting Rive means adopting a proprietary authoring dependency and a `.riv` asset your engineers cannot edit. The web runtime is also a canvas surface, which means no text selection and no screen-reader access to anything inside it.
- **Use when:** mascots, onboarding illustration, empty-state characters, loading states with personality, game/product UI that reacts to state · **Don't use when:** the animation carries information a screen reader needs, or you can't accept a per-seat editor dependency.
- **Scores /5:** visual 5 · interaction 5 · a11y 2 (canvas) · engineering 4 · maintenance 5 · docs 4 · customization 4 · perf 4 · stability 4 · originality 5
- **Evidence:** `rive-app/rive-react` ★1,157 · `@rive-app/react-canvas` 4.34.1 2026-09-04 · last push 2026-09-04 · 839,030 wk npm · ~18 contributors on the React wrapper · MIT runtime · editor $0–$120/seat/mo · Spotify Wrapped 2025 verified via Rive's own case study; "2 billion users" is a vendor claim
- **Looked at:** https://rive.app — pure black, a thin wide-tracked "RIVE" wordmark, condensed technical caps for the headline, and a bronze-gradient CTA with a small red glowing dot floating above it (a nice, weird detail). Below the fold, a horizontally scrolling strip of category cards — PRODUCT UI / GAME UI / MOBILE APPS / FILM + TV / WEBSITES — each a live video: a circular smart-display clock, a game menu, a Duolingo-style streak screen showing "127 day streak", a Figma canvas. Showing five different industries in one scroll strip is a positioning choice, and it works. "SCRIPTING IS LIVE" under the CTA.
- **Vibecode risk:** low — the output is whatever your designer drew.
- **Link:** https://rive.app

### dotLottie (`@lottiefiles/dotlottie-web`) — `strong`
- **What:** The modern Lottie runtime: a Rust core (`dotlottie-rs`) rendering through ThorVG, compiled to WASM, with WebGL and WebGPU backends shipped in 2026. React, Vue, Svelte, Solid and Web Component wrappers.
- **Verdict:** If you are shipping Lottie in 2026, this is the runtime, not `lottie-web`. It is the first production-grade hardware-accelerated Lottie player on the web, and the `.lottie` container bundles the JSON plus its assets into one much smaller file. The reason this sits at `strong` and not `essential` is upstream of the runtime: Lottie itself is an After Effects export format, which means the animation is a *clip*, not a *system* — it cannot respond to state, and the temptation to drop a 400kb looping illustration into an empty state because it was free on lottiefiles.com is the format's main contribution to bad interfaces. Also note the ecosystem is bifurcated: LottieFiles archived `@lottiefiles/lottie-react` and Airbnb's `lottie-web` hasn't published since 2025-05.
- **Use when:** you have real After Effects assets from a motion designer and need them on the web at speed · **Don't use when:** the animation should react to state (use Rive), or it's decorative and you're about to ship a megabyte for it.
- **Scores /5:** visual 4 · interaction 2 · a11y 2 (canvas) · engineering 5 · maintenance 5 · docs 4 · customization 3 · perf 5 · stability 4 · originality 4
- **Evidence:** `LottieFiles/dotlottie-web` ★873 · `@lottiefiles/dotlottie-react` 0.19.16 2026-08-28 · last push 2026-09-09 · 1,191,168 wk npm · ~22 contributors · MIT · ThorVG reports 150%+ GPU rendering gain over its own prior baseline (vendor benchmark)
- **Vibecode risk:** medium — not from the runtime, from the stock-animation marketplace attached to it. A free rocket-ship loop in an empty state is the most legible "we didn't have a designer" signal available.
- **Link:** https://github.com/LottieFiles/dotlottie-web

### anime.js v4 — `situational`
- **What:** A complete ESM-first rewrite of the classic animation engine, with `Timer`, `Draggable`, `Scope`, `ScrollObserver`, a WAAPI bridge, and a linked-list render loop.
- **Verdict:** The most under-recognized engineering in the category, and the clearest example of stars lying: 72,752 stars — more than double GSAP's — against 874,020 weekly npm downloads, roughly a quarter of GSAP's. Most of those stars are from the v2 era. v4 is genuinely good: `Scope` gives you media-query-reactive animation with batch revert (the thing that makes cleanup in component frameworks tractable), the WAAPI bridge delegates to the browser where it can, and the source is readable enough to extend — a real distinction from GSAP's minified plugin culture. It sits at `situational` because it does not solve React's presence/layout problem, its Scope and Draggable docs are thin, and there is no compelling reason to choose it over GSAP for timelines or Motion for product UI. Choose it when you specifically want an MIT-licensed, hackable engine with no corporate owner.
- **Use when:** you need GSAP-class control under a real open-source license, canvas/SVG/JS-object animation, or you're allergic to proprietary licenses · **Don't use when:** you're in React and need layout/exit animation.
- **Scores /5:** visual — · interaction 4 · a11y 3 · engineering 5 · maintenance 4 · docs 3 · customization 5 · perf 4 · stability 4 · originality 4
- **Evidence:** ★72,752 · v4.5.0 2026-06-22 · last push 2026-08-21 · 874,020 wk npm · ~54 contributors · MIT
- **Looked at:** https://animejs.com — charcoal `#1F1F1F` ground, white grotesk headline hard-left, and a live circular oscilloscope on the right: a rainbow-segmented outer ring, a red bar-graph diamond that breathes, and dot trails plotting easing curves in real time. It is a running demo of the engine, not a hero image. Install command in a mono chip bottom-left; an "EASINGS" nav item with a curve glyph. No gradient text, no glass, no card. A tool that respects itself.
- **Vibecode risk:** low.
- **Link:** https://animejs.com

### react-spring — `situational`
- **What:** Spring-physics animation for React with a hooks API (`useSpring`, `useTransition`, `useTrail`, `useChain`) and an `animated` component that writes values outside the React render cycle.
- **Verdict:** Technically excellent and still maintained — v10.1.2 shipped 2026-06-24, 4.7M weekly downloads, a v11 beta tagged — but Motion has taken its lane and most of that download volume is transitive (`@react-three/*` and older dependency trees). Its real remaining advantage is a pure spring model with no time abstraction, which is the right mental model if you're doing physics-heavy interaction and think in tension/friction/mass. The catch nobody flags: its canonical gesture partner `@use-gesture/react` (5.8M/wk) has not been pushed since **2024-07-15** — 26 months — so the classic react-spring + use-gesture drag recipe rests on a stale dependency. Motion has gestures in the box.
- **Use when:** react-three-fiber scenes, physics-driven interaction where you want tension/friction/mass directly, or an existing codebase already on it · **Don't use when:** starting fresh in React — Motion is the same job with layout animation, presence, gestures and reduced-motion included.
- **Scores /5:** visual — · interaction 4 · a11y 3 · engineering 5 · maintenance 4 · docs 3 · customization 5 · perf 4 · stability 4 · originality 3
- **Evidence:** ★29,148 · `@react-spring/web` 10.1.2 2026-06-24 · last push 2026-09-09 · 4,700,271 wk npm · ~186 contributors · MIT · `v11.0.0-beta.0` tagged
- **Looked at:** https://www.react-spring.dev — a large soft-focus watermelon gradient (red / orange / mint) washing the right two-thirds, near-black grotesk headline left. Two problems visible immediately: the gradient is a heavily blurred bitmap that goes muddy where the red meets the green, and the entire top nav is icon-only — home, docs, code, GitHub, Discord, lifebuoy — with no labels, so you cannot scan it. The headline as captured begins mid-sentence ("With naturally fluid animations you will elevate your UI…"), suggesting the opening line lives in an animated block that hadn't run. Reads as 2022.
- **Vibecode risk:** low.
- **Link:** https://www.react-spring.dev

### `tw-animate-css` — `situational`
- **What:** A pure-CSS Tailwind v4 replacement for `tailwindcss-animate` — `animate-in`, `animate-out`, `fade-in-0`, `zoom-in-95`, `slide-in-from-top-2` and friends, driven by `data-state` attributes.
- **Verdict:** Included because of the number, not the ambition: **25,255,281 weekly downloads**, because shadcn/ui deprecated `tailwindcss-animate` (2025-03-19) and ships this in its Tailwind v4 setup. It is a correct, zero-JS way to animate Radix/Base UI `data-state` transitions and it costs nothing. But it is a utility pack, not a motion system: no springs, no interruption, no velocity, no orchestration. Its real effect on the ecosystem is that a very large fraction of the web's popovers now enter with the identical `fade-in-0 zoom-in-95 slide-in-from-top-2` at the identical duration. Change the numbers.
- **Use when:** you're on Tailwind v4 + shadcn and need `data-state` enter/exit · **Don't use when:** you think this is your motion design.
- **Scores /5:** visual 3 · interaction 3 · a11y 4 · engineering 4 · maintenance 3 · docs 3 · customization 3 · perf 5 · stability 4 · originality 2
- **Evidence:** ★800 (`Wombosvideo/tw-animate-css`) · last push 2026-02-28 · 25,255,281 wk npm · MIT · `tailwindcss-animate` deprecated 2025-03-19
- **Vibecode risk:** high — it is the single most-shipped set of default animation values on the web right now.
- **Link:** https://github.com/Wombosvideo/tw-animate-css

### Motion+ — `situational` (paid)
- **What:** £299 one-time membership from the Motion team: `AnimateNumber`, `Carousel`, `Cursor`, `Ticker`, `Typewriter`, `ScrambleText`, `splitText`, `Curtains`, plus 450+ examples, 30 Motion UI sections, an AI Kit and a visual transition editor. Code is MIT to you.
- **Verdict:** Priced fairly for what it is and the components are the ones people actually rebuild badly — a correctly seamless infinite ticker is genuinely hard, and `splitText` is the free-GSAP-plugin equivalent. Two things to know before recommending it: adoption is thin so far (`motion-plus` at 15,459 wk npm, which for a paid package is a signal but not a damning one), and there is a **Builder's License** carve-out — if your product resells Motion+ capabilities to *your* users, the base license doesn't cover you. That is the same shape of restriction GSAP has, from the opposite direction. Buy it as a time-saver on a specific deadline; do not build a strategy on it.
- **Use when:** you need SplitText/Ticker/ScrambleText this month and £299 is cheaper than a week · **Don't use when:** you're building a design tool or animation builder (check the Builder's License), or you'd be buying it to avoid learning the free API.
- **Scores /5:** visual 4 · interaction 5 · a11y 3 · engineering 5 · maintenance 5 · docs 5 · customization 4 · perf 4 · stability 4 · originality 3
- **Evidence:** £299 one-time (Business is annual per-seat) · `motion-plus` 15,459 wk npm · code MIT to the purchaser · Builder's License required for resale-style use
- **Vibecode risk:** medium — `Cursor`, `ScrambleText` and `Curtains` are effects with a strong 2024-portfolio accent, and using three of them together will date a site precisely.
- **Link:** https://motion.dev/plus

### Lenis — `situational`, and usually the wrong idea
- **What:** Smooth scroll that eases the *native* scroll position rather than translating a fake fixed container.
- **Verdict:** Architecturally the honest one. The old generation (Locomotive and friends) pinned a wrapper and transformed it every frame, so the document never actually scrolled — which broke Ctrl+F, anchor links, the scrollbar, keyboard scrolling and screen-reader position. Lenis eases real scroll, so those keep working. Credit where due. It is still, for a product application, almost always a mistake: you are adding latency to the one interaction the user performs most, on a device whose OS already tuned that curve, and you will fight it (there are current, well-documented conflicts with CSS `scroll-snap`). The measured case against the broader pattern is unambiguous — NN/g found most participants at least mildly disoriented by scrolljacking, with some reading it as a bug, and a controlled study found statistically significantly lower accuracy *and* satisfaction. Thoughtworks has it on the Radar, which is a recommendation to know about it, not to reach for it.
- **Use when:** a campaign, portfolio or launch page where scroll *is* the narrative device and you have a reduced-motion escape hatch · **Don't use when:** anyone is trying to get work done, read a document, or scan a table.
- **Scores /5:** visual — · interaction 3 · a11y 3 (better than the alternatives; still worse than native) · engineering 4 · maintenance 5 · docs 4 · customization 4 · perf 3 · stability 4 · originality 4
- **Evidence:** ★15,763 · v1.3.26 2026-08-05 · last push 2026-09-09 · 1,323,039 wk npm (`lenis`) + 68,973 on the legacy `@studio-freight/lenis` · ~32 contributors · MIT
- **Looked at:** https://lenis.dev — a full-bleed pink blackletter "LENIS" wordmark consuming the top half of a black page, "SMOOTH SCROLL" in a wide grotesk beneath it, pink smoke and star particles drifting below, "SCROLL TO EXPLORE" bottom-left, two pink pill buttons bottom-right. Gothic-on-black by a Paris/Montreal studio (darkroom.engineering). This is the most useful evidence in the entry: nothing about this page's visual language belongs anywhere near a product interface, and it accurately describes the population of sites that ship Lenis.
- **Vibecode risk:** high — its presence in a codebase is itself a genre marker.
- **Link:** https://lenis.dev

### `interpolate-size: allow-keywords` / `calc-size()` — `experimental`
- **What:** Makes `height: auto` animatable — the single most-requested missing capability in CSS animation.
- **Verdict:** The genuine fix for a problem the whole ecosystem hacks around with `max-height` transitions, `grid-template-rows: 0fr → 1fr`, or a JS measure-and-set. And it is Chromium-only: Chrome/Edge 129+, not in Firefox or Safari, explicitly not Baseline. Use it as a pure progressive enhancement behind `@supports (interpolate-size: allow-keywords)` with a `grid-template-rows` fallback and you lose nothing; depend on it and two-thirds of Safari users get a jump cut.
- **Use when:** accordions and disclosure panels, as an enhancement · **Don't use when:** the animation is load-bearing across browsers.
- **Scores /5:** visual — · interaction 4 · a11y 4 · engineering 4 · maintenance — · docs 4 · customization 4 · perf 3 (D-tier: animating height triggers layout) · stability 2 · originality 5
- **Evidence:** Chrome/Edge 129+ only · absent in Firefox and Safari as of 2026 · not Baseline
- **Vibecode risk:** low.
- **Link:** https://developer.mozilla.org/en-US/docs/Web/CSS/interpolate-size

### tailwindcss-motion (Rombo) — `experimental`
- **What:** A Tailwind plugin giving `motion-preset-*`, `motion-translate-*`, `motion-duration-*` utilities, plus a visual animator that exports to Tailwind, Motion or GSAP.
- **Verdict:** The utility syntax is well-designed — composing motion the way you compose spacing is a real ergonomic idea, and the visual-editor-to-code path is the most interesting thing anyone shipped in this category recently. But 3,323 stars and 38,178 weekly downloads against a last push of 2026-02-12 is a seven-month gap for a young project, and the presets (`motion-preset-confetti`, `motion-preset-bounce`) push toward exactly the kind of decorative motion this file argues against. Watch it; don't put it under core interactions.
- **Use when:** prototyping, marketing surfaces, a side panel · **Don't use when:** it would become the motion vocabulary of a real design system.
- **Scores /5:** visual 3 · interaction 3 · a11y 3 · engineering 4 · maintenance 2 · docs 3 · customization 4 · perf 4 · stability 2 · originality 4
- **Evidence:** ★3,323 · last push 2026-02-12 · 38,178 wk npm · MIT · created 2024-09
- **Vibecode risk:** medium — preset names are visible in class strings and read as a signature.
- **Link:** https://rombo.co/tailwind/

### animations.dev / Emil Kowalski — `reference-only`
- **What:** The definitive course on interface animation — Animation Theory, CSS Animations, Motion, and "Good vs Great Animations", plus four build-alongs and 15 AI skills. By the author of Sonner (41.8M/wk, ★12,950) and Vaul (24.4M/wk, ★8,599), a design engineer on Linear's web team, previously Vercel.
- **Verdict:** The highest-signal teaching in this category and the source of most of the concrete numbers in this file. It is `reference-only` for a blunt reason: **enrollment is closed and the site says it reopens "sometime in 2027, for 10 days."** An agent cannot act on a recommendation to buy it. What *is* actionable and free: the essays at emilkowal.ski (the 300ms ceiling, `ease-out` for entrances, the `scale(0.97)` at 150ms press affordance, `linear` only for time-representing motion), the `animations.dev/learn` theory chapters, and his published `apple-design` skill, which is the most concrete public statement of Apple-grade motion rules — spring damping/response tables, the velocity-handoff formula, momentum projection at deceleration rate ≈0.998, ~10px gesture hysteresis, respond-on-pointer-down, and "always animate from the current on-screen value."
- **Use when:** you want to learn the judgment rather than the API · **Don't use when:** you need something purchasable today.
- **Evidence:** enrollment closed, reopens 2027 for 10 days (site, checked 2026-09) · Sonner 41,834,659 wk npm · Vaul 24,366,525 wk npm · both MIT · Vaul last push 2025-10-03
- **Looked at:** https://animations.dev at 390px — warm off-white ground, pale grey thought-bubble stickers (a spring squiggle, a cursor, a stopwatch, code brackets), a tight-leading black grotesk question as the headline, one amber "Notify me" pill top-right, and "Enrollment is closed" at the fold. The restraint is the argument: an animation course whose landing page barely moves.
- **Link:** https://animations.dev · https://emilkowal.ski

### Theatre.js — `reference-only`
- **What:** A visual sequence editor and animation library for the browser, aimed at THREE.js scenes and cinematic timelines.
- **Verdict:** Dead. Last commit 2024-08-14, last npm publish `@theatre/core` 0.7.2 on 2024-05-19 — over two years, and it never left 0.x. It remains worth studying: the idea of a scrubber and keyframe editor living *inside* the running app, editing real values, is still the best answer anyone has given to the designer/engineer handoff problem in motion. 12,659 stars is the ecosystem saying it wanted this to exist.
- **Evidence:** ★12,659 · `@theatre/core` 0.7.2 2024-05-19 · last push 2024-08-14 · 18,405 wk npm · ~23 contributors · Apache-2.0
- **Looked at:** https://www.theatrejs.com — dark `#14161A`, condensed grotesk with "motion design" in bright green, a video card below. The nav still carries a **"Jobs"** link, on a project with no commit in 25 months. That single stale link is a better maintenance signal than any badge.
- **Link:** https://www.theatrejs.com

## Rejected / avoid
- **`lottie-web` (Airbnb)** — 6,519,091 weekly downloads of pure inertia. 857 open issues, last npm publish 2025-05-21, last push 2025-09-01. Airbnb has not meaningfully invested in it for years. It still works, it is still MIT, and you should not start here — use `@lottiefiles/dotlottie-web`, which is Rust/WASM, GPU-accelerated and actively shipping.
- **`@lottiefiles/lottie-react`** — archived on GitHub. 799 stars, 49 open issues frozen in place. An agent generating this import in 2026 is working from stale training data.
- **`popmotion`** — 2,044,950 weekly downloads for a package that was folded into the Motion codebase years ago. Never install it directly; those downloads are transitive dependency archaeology.
- **`@use-gesture/react`** — 5.8M/wk and ★9,621, but no push since 2024-07-15. Still functional, but do not architect new drag interactions on it; Motion's `drag` and `whileDrag` cover most of the same ground under active maintenance.
- **Locomotive Scroll and the fake-fixed-container smooth-scroll generation** — they translate a `position: fixed` wrapper on every frame, so the document never scrolls: Ctrl+F, anchors, the scrollbar, keyboard scrolling and screen-reader position all break. If you must have smooth scroll, Lenis is the only defensible implementation.
- **Scroll-jacked, section-by-section "storytelling" pages** — the pattern, not any one library. NN/g's research found most participants at least mildly disoriented, some reading the altered scroll as a bug; a controlled study found statistically significant drops in both task accuracy and satisfaction. It also caps scroll speed at whatever the animation allows, which is the opposite of respecting someone's time.
- **The stagger-fade-up-on-scroll reveal as a default** — `initial={{ opacity: 0, y: 20 }}` on every section with a 0.1s stagger. It is the most legible AI-generated-interface tell currently in circulation, it delays content the user came for, and it fights the browser's own scroll restoration. If content matters, show it.
- **Animating `width`, `height`, `top`, `left` or `margin` directly** — D-tier: layout recalculation every frame, rippling through the DOM. Use `transform` and `clip-path`, or FLIP.
- **Nuking all motion under `prefers-reduced-motion`** — setting every duration to `0` removes the state-change signal (a different a11y failure) and can hang JS waiting on `transitionend`. Cross-fade instead, and use `0.01ms` if you must zero it.

## What surprised me
- **`framer-motion` still out-downloads `motion` 2.2:1** — 41,006,870 vs 18,255,133 weekly. The rename happened in 2024/2025 and most of the ecosystem, and every model trained before it, is still on the old package name. Expect agents to keep generating `framer-motion` imports; they work through a compatibility path, but new code should import from `motion/react`.
- **GSAP is free but not open source, and the fine print names Webflow's competitors.** The Standard "No Charge" license bars use in tools that "materially assist in creating a solution that competes with Webflow's visual animation building capabilities." A repo with a `null` license field and 28k stars is not an OSI project; procurement teams and no-code builders need to read it.
- **GSAP has shipped three releases in 17 months and no commit to master since 2026-04-13.** Webflow has publicly committed to maintaining it and this is stewardship rather than abandonment — but "actively developed" is no longer an accurate description, and everyone still describes it that way.
- **anime.js has 72,752 stars and 874,020 weekly downloads; GSAP has 28,330 stars and 3,301,517.** A 2.6x star advantage against a 3.8x download deficit. Stars are a v2-era artifact. This is the cleanest example in the corpus of distribution and reputation drifting apart.
- **Motion's own performance tier list puts the View Transitions API in C-tier** — paint-triggering, alongside `background-color` and CSS variables. The API everyone treats as the native performance win is a *correctness* win; it is not free. Same piece: inherited CSS custom properties can invalidate style across an entire subtree even when unused, and one production site burned its full 8ms frame budget recalculating 1,300+ elements because of it.
- **`tw-animate-css` quietly became the most-shipped animation code on the web** — 25.2M weekly downloads on the back of shadcn's Tailwind v4 migration, from a repo with 800 stars. Almost nobody who ships it knows its name.
- **The best course in this category cannot be bought.** animations.dev enrollment is closed until "sometime in 2027, for 10 days." The free articles and Emil's published `apple-design` skill carry most of the value anyway.
- **Theatre.js's website still advertises jobs**, 25 months after its last commit.

## Open questions
- **Does GSAP still have dedicated full-time engineers at Webflow?** The release cadence suggests reduced investment, but no public statement confirms or denies a team change. Settled by: a Webflow engineering post naming the GSAP team, or a resumption of monthly commits.
- **Motion's "2.5× faster cold start than GSAP (10.0ms vs 11.0ms)"** is a first-party benchmark from the library's own magazine, and 10.0 vs 11.0ms is not 2.5×. Settled by: an independent reproduction on the same harness.
- **Rive's "products reaching 2 billion users"** — Spotify Wrapped 2025 is confirmed by Rive's own case study, and Duolingo's Rive usage is widely documented (Duolingo also has a LottieFiles case study, so both are in play). The aggregate reach figure is unverified.
- **`ssgoi`** (a page-transition library for React/Svelte/Vue, ★966, pushed 2026-09-09) looks interesting but I could not verify real usage — npm rate-limited on the scoped package name and the unscoped `ssgoi` shows 4 downloads/week, which is almost certainly the wrong package. Settled by: downloads for `@ssgoi/react`.
- **Whether `interpolate-size` reaches Firefox or Safari in 2026.** It is the difference between a nice progressive enhancement and the end of the `max-height` hack. Settled by: a WebKit or Gecko standards-position update.
- **Real spring configs from Linear, Raycast and Arc.** None of the three publish motion tokens. The widely cited Arc figure — `.spring(response: 0.3, dampingFraction: 0.7)` — comes from a third-party SwiftUI *recreation* of Arc's search bar, not from The Browser Company, and should not be quoted as theirs. Apple's own WWDC23 spring guidance and Emil's `apple-design` skill are the defensible sources for numbers.
