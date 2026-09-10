# Performance and perceived speed

**Evaluated:** 2026-09 · **re-probed 2026-09-10** — rows marked † changed between passes.

Measured against live products with Playwright and the browser's own performance APIs; cold-load
figures are the median of foregrounded runs in a fresh context. Method and caveats at the bottom.
Read them before quoting a number: on re-probe, one product's cold-load figures had moved by 4×
and one font-loading row was simply wrong. Numbers about *shipped CSS* — skeleton colours, radii,
font-metric overrides — reproduced exactly. Numbers about *network timing* did not always.

This file covers the half of speed that lives in the design. The other half — bundle size, cache
headers, database indexes — is real and not covered here. It exists because a product can win the
engineering half and still feel slow: `docs.stripe.com` paints in 700ms and then blocks the main
thread for seconds, and no amount of CSS changes that.

Loading, spinner-vs-skeleton and optimistic-rollback *behaviour* is specified in
[`interaction-and-states.md`](interaction-and-states.md) §"Latency and perceived performance". This
file gives the measured evidence underneath it, the architecture that removes the wait, and the
layout-stability and font work that decides whether the arrival reads as finished or broken.

---

## If you only apply five things

1. **Delete the spinner from anything whose p95 is under 300ms, and put a 300ms appear-delay plus a
   400ms minimum-visible on every one that survives.** Measured: `react.dev` replaces its entire
   main column on an in-app navigation in **85ms**, `docs.stripe.com` in a similar window. Any
   indicator there is a flash the user reads as a glitch. Gate on **p95, not p75** — p75 hides the
   tail, and the tail is the only part anyone sees a spinner during. The two guards are specified
   in [`interaction-and-states.md`](interaction-and-states.md): without the appear-delay every
   cached response flashes; without the minimum-visible a skeleton that appears at 305ms and leaves
   at 340ms is worse than either extreme.
2. **Do not animate a skeleton that resolves in under a second.** Airbnb (`#EBEBEB`), YouTube
   (`#E3E3E3`) and GitHub (`#f6f8fa`) all ship skeletons with `animation: none` — re-verified
   2026-09-10, all three unchanged. Tailwind's `animate-pulse` (`pulse 2s cubic-bezier(.4,0,.6,1)`,
   `@keyframes pulse { 50% { opacity: .5 } }` — read from source) is ~5× the amplitude and 2× the
   period of a *tuned* skeleton like Radix's, and it is the most reliable loading-state tell in
   generated UI. The scope matters: past ~1s of waiting, motion becomes the only cheap evidence the
   pipe is alive — see §Animation.
3. **Reserve the box before the content lands, and reserve the *inner* box too.** The largest layout
   shift on `nytimes.com` is **0.0529 at 4.1 seconds**, from
   `IFRAME#google_ads_iframe_/29390238/nyt/homepage_0` growing from 1440×8 to 1440×270. The slot
   around it was reserved. The iframe inside it was not.
4. **Prefetch the next view on hover, and make navigation a state change, not a document load.**
   Re-measured 2026-09-10: `react.dev` fires `GET /_next/data/<buildId>/learn/thinking-in-react.json`
   **32ms after `mouseover`** on the link, then swaps main content in **85ms**. GitHub's soft
   navigation on the same class of click takes **830ms** and prefetches nothing on hover. That ~10×
   gap is the whole "feels native" difference, and it is routing config, not an architecture.
5. **Test on a 4× CPU throttle over Slow 4G before you believe anything.** Measured FCP going from
   desktop to that profile: HN 180 → 556ms (3.1×), Stripe docs 568 → 1,156ms (2.0×), Notion
   544 → 5,928ms (10.9×), Tailwind 316 → 5,268ms (16.7×), GitHub 952 → 9,216ms (9.7×). The
   ranking changes. Your loading states are never seen by you.

---

## The measured reference

### Table A — cold load, desktop 1440×900

CLS here is accumulated over a **~6s no-scroll window**. That is not the same measurement as the
0.437 NYT figure in [`responsive-and-mobile-web.md`](responsive-and-mobile-web.md), which observes
longer and scrolls. Neither is wrong; a bare CLS number is meaningless without its window, and this
is the single most common way CLS gets misquoted.

| Product | TTFB | FCP | LCP | CLS (6s) | JS req | Font files/KB | `<img>` without dimensions |
|---|---|---|---|---|---|---|---|
| `news.ycombinator.com` † | 160 | **228** | 228 | **0** | 1 | 0 / 0 | 0 of 2 |
| `react.dev/learn` † | 72 | **164** | 164 | **0** | 22 | 9 / 315 | 0 of 9 |
| `tailwindcss.com` † | 138 | 376 | 376 | 0.0009 | 21 | 10 / **1,175** | 24 of 40 |
| `apple.com/macbook-pro/` | 112 | 248 | 1,252 | 0.005 | 13 | 7 / 801 | 24 of 111 |
| `linear.app` † | 240 | **468** | 1,344 | **0** | 333 | 2 / — | 4 of 39 |
| `vercel.com` | 140 | 380 | 400 | **0** | 70 | 7 / 222 | **0 of 19** |
| `github.com/vercel/next.js` | 129 | 440 | 800 | 0.0008 | 112 | **0 / 0** | 4 of 27 |
| `nytimes.com` † | 285 | 428 | 3,932 | **0.127** | 381 | **15** | **128 of 128** |
| `airbnb.com/s/Tokyo--Japan/homes` | 124 | 444 | 2,432 | 0.0338 | 128 | 1 / — | 15 of 43 |
| `docs.stripe.com/payments` † | 376 | 700 | 700 | **0** | 43 | **0 / 0** | 1 of 1 |

† re-probed 2026-09-10. **FCP is the noisiest column in this file** — `linear.app` alone spanned
708–2,352ms across the first pass's three runs and 448–552ms across four runs on re-probe. Treat
any single FCP as a range, and never rank two products whose FCP is within ~30% of each other.

Three things fall out:

- **The two fastest-painting pages ship the least JavaScript, or preload their fonts behind a 72ms
  TTFB.** FCP is bought with bytes on the critical path, not with cleverness after them.
- **`linear.app`'s marketing site is not slow, and the first pass said it was.** Re-probed: FCP
  median 468ms, LCP 1,344ms, CLS 0, and screenshots at 1,600ms on both 1440 and 390 show the hero
  headline, subhead and the full product screenshot rendered — not the "empty dark rectangle" the
  first pass reported. [`imagery-and-illustration.md`](imagery-and-illustration.md) independently
  re-probed the same hero and found the same thing. The surviving point is narrower and still true:
  **local-first buys nothing on a page the user visits once**, so do not cite "Linear is fast" as
  evidence for a marketing-page decision. The mechanism that makes the *app* fast does not transfer.
- **`nytimes.com` has 128 of 128 images with no `width`/`height` and a CLS of 0.127, and not one of
  the shifts came from an image.** They all came from third-party iframes, a custom element that
  mounted at 8×8, and post-hydration reflow — the same three causes as the first pass, at the same
  timestamps. Images-without-dimensions is the CLS cause everyone repeats; it is not the CLS cause
  that fires on sites that have done the other work.

### Table B — mid-tier Android profile, 412×915, 4× CPU throttle, 150ms RTT / 1.6 Mbps down

Lighthouse's "Slow 4G" plus a Pixel-6a-class CPU multiplier, via CDP
`Emulation.setCPUThrottlingRate {rate: 4}` and `Network.emulateNetworkConditions {latency: 150,
downloadThroughput: 1.6 Mbps}`.

| Product | FCP desktop → phone | LCP desktop → phone | TBT desktop → phone | CLS on phone |
|---|---|---|---|---|
| `news.ycombinator.com` | 180 → **556** (3.1×) | 180 → 556 | 1 → **1** | 0 |
| `docs.stripe.com/payments` | 568 → **1,156** (2.0×) | 568 → 1,156 | 731 → **5,139** | 0 |
| `nytimes.com` | 448 → 3,000 (6.7×) | 2,588 → 3,072 | 575 → 3,596 | **0.1389** |
| `tailwindcss.com` | 316 → 5,268 (16.7×) | 316 → 5,268 | 0 → 465 | 0.0208 |
| `notion.so` | 544 → 5,928 (10.9×) | 544 → 5,928 | 16 → 1,413 | 0.0031 |
| `linear.app` | 432 → 5,628 (13.0×) | 3,564 → **11,012** | 18 → 798 | 0 |
| `github.com/vercel/next.js` | 952 → 9,216 (9.7×) | 960 → 9,664 | 71 → **2,231** | 0.0017 |

Note the desktop FCP for `linear.app` here — **432ms** — against the 1,840ms the first pass put in
Table A for the same page on the same day. The two tables contradicted each other and nobody
noticed, which is what a single un-repeated run buys you. 432ms is the number that reproduced.

**The multiplier is 2× to 17×, and it is not correlated with the desktop rank.** Tailwind is the
second-fastest desktop paint and the fourth-slowest phone paint. Stripe docs is a slow desktop
paint and a fast phone paint, because its HTML is server-rendered and its critical path holds no
fonts.

And the most useful row: **Stripe docs paints in 1,156ms on the phone and then blocks the main
thread for 5,139ms.** A `frontend.js` bundle of 1,820KB compressed has to parse and execute. For
five seconds the page looks finished and does nothing when you touch it. Fast paint plus a dead
main thread is worse than a slower paint, because the first one lies.

### Table C — interaction latency, decomposed

`PerformanceEventTiming` with `durationThreshold: 0` on scripted input (typing at 80ms/key, real
mouse events). `input delay` = `processingStart − startTime`; `processing` =
`processingEnd − processingStart`; `presentation` = the rest of `duration`.

| Product | Interaction | Total | input delay | processing | presentation |
|---|---|---|---|---|---|
| `docs.stripe.com` | keydown, search field | 48–72ms | 0–1ms | **1–17ms** | 42–71ms |
| `docs.stripe.com` | click, opening search | 120ms | 19ms | **55ms** | 46ms |
| `react.dev` | keydown, search field | 48–56ms | 0ms | **1–4ms** | 44–56ms |
| `notion.so` | click, nav menu | 48–56ms | 9–13ms | **3–8ms** | 28–44ms |
| `figma.com` | click, nav menu | 96ms | 2ms | **34ms** | 60ms |

**On a well-built page the JavaScript you wrote is 1–17ms of a 50ms interaction.** The rest is
input delay (the thread being busy when the event arrives) and presentation delay (waiting for the
next frame and the compositor). This is the correction to the reflexive "wrap it in `useMemo`":
memoising a handler that already runs in 4ms buys nothing. What buys something is (a) not being
mid-long-task when the input arrives, and (b) not adding a synchronous layout read to the same frame.

Caveat: presentation delay never dropped below ~28ms in this harness, a property of driving a shared
remote Chromium, not of the sites. Treat the *ratio* as the finding and the absolute presentation
numbers as an upper bound.

Thresholds (Google's, field data at p75): **INP ≤ 200ms good, 200–500ms needs improvement, > 500ms
poor. CLS ≤ 0.1. LCP ≤ 2.5s.**

### Table D — how the biggest skeletons on the web are actually built

Captured by navigating with `waitUntil: 'commit'` and reading computed styles at a fixed offset —
the states a real user sees, not a Storybook entry. **All three rows re-verified 2026-09-10,
byte-for-byte unchanged**, including Airbnb's declared-but-not-running 1.3s animation and GitHub's
exactly-10 inline `span.Skeleton` at 55×18. Shipped CSS is the most durable evidence in this file.

| Product | Element | Colour | Animation | Radius, by role | Sizes |
|---|---|---|---|---|---|
| Airbnb search, @900ms | `span.s15ewrxi` | `rgb(235,235,235)` `#EBEBEB` | **none running** (`animation-duration: 1.3s` declared, `element.getAnimations()` returns `[]`) | 4px text · **20px** on card images · 50% on avatars · 8px on chips | 116 text bars at 67×22, 56×22, 75×22, 34×16 · 20 image blocks at 307×292 · avatars 36×36 |
| YouTube home, @600ms | `.rich-thumbnail.skeleton-bg-color`, `.rich-video-title.text-shell`, `.masthead-skeleton-icon` | `rgb(227,227,227)` `#E3E3E3` | **`none`** | 2px title lines · 8px thumbnails · 50% avatars | thumbnails 373×210 · title line 1 at 293×20, line 2 at **195×20** · avatars 32×32 |
| GitHub PR list, @600ms | `span.Skeleton.Skeleton--text` | `rgb(246,248,250)` `#f6f8fa` | **`none`** | 0px | 55×18, inline, exactly the label chip it becomes |

What this says, concretely:

- **Three of the largest skeleton systems in production do not animate.** A flat neutral block is
  the shipping default. YouTube even *defines* a shimmer — `simple-shimmer`, opacity 1 → 0.5 at
  28.57% → 1, `ease-in` down and `ease-out` up, an asymmetric curve — and does not apply it to the
  home grid. Note that YouTube's own shimmer swings the same 50% of opacity `animate-pulse` does:
  the objection to `animate-pulse` is the symmetric 2s curve applied to every block at once, not the
  amplitude on its own.
- **The radius is per-role, not global.** Airbnb uses 4px on text bars and 20px on the image
  block, because the real card image has a 20px radius. A skeleton with one radius everywhere
  announces itself.
- **The bar widths are unequal on purpose.** YouTube's two title lines are 293px and 195px — the
  second is 66% of the first, which is what a wrapped two-line title looks like. Airbnb's text bars
  run 34–75px wide in the same card. Equal-width bars read as a loading graphic; unequal ones read
  as text that hasn't arrived.
- **Only the data is skeletonised.** In the Airbnb capture the logo, "Become a host", the account
  menu and the search button are fully rendered and interactive while the listings are grey. The
  chrome is never a skeleton, because the chrome does not depend on the request.

### Table E — font loading, measured

| Product | `@font-face` declared | Files fetched | Bytes | `<link rel=preload as=font>` | `font-display` | Metric-matched fallback |
|---|---|---|---|---|---|---|
| `docs.stripe.com` † | **40** — every one `src: local()` | **0** | **0** | 0 | `auto` (never applies) | n/a — the faces *are* the stack |
| `github.com` (signed-out repo) | 1 (`Noto Sans Backtick Fix`, `src: local()` only) | **0** | **0** | 0 | `swap` | n/a — `document.fonts` holds one face, status `unloaded` |
| `vercel.com` † | 8 | 7 | 222KB | 7 | `swap` (Sans), **`block`** (Geist Mono) | **yes** |
| `tailwindcss.com` † | 14 | 10 | **1,175KB** | 10 | `swap` | **yes**, all four families |
| `react.dev` † | 38 | 9 | 315KB | 9 | `swap` | **no** |
| `notion.so` | 35 | 5 | 144KB | 3 | `swap` | no |

† re-probed 2026-09-10; the four override blocks below came back digit-for-digit identical.

**The Stripe row is the correction that changes a decision.** The first pass recorded "0 `@font-face`
declared" and called it a system stack. `document.fonts` actually holds **40 faces**, every one a
zero-byte `src: local()` alias — Segoe UI, Hiragino Sans, Hiragino Kaku Gothic ProN, Yu Gothic UI and
the rest, at four weights each, all `status: unloaded`. That is not "no font strategy". It is a
*deliberately enumerated* cross-script system stack: one named family in CSS, resolved per platform
and per script, costing zero bytes. If you ship a system stack for a product with CJK readers, this
is the shape to copy — a bare `font-family: system-ui, sans-serif` gives Japanese readers whatever
the OS picks, which is not a decision anyone made.

The published override values, read from the live stylesheets:

```css
/* vercel.com — Geist over Arial. The people who drew the font wrote these numbers. */
@font-face { font-family: "GeistSans Fallback"; src: local("Arial");
  size-adjust: 106.28%; ascent-override: 94.56%; descent-override: 27.76%; line-gap-override: 0%; }

/* tailwindcss.com — four families, four different overrides, all over Arial (next/font generated) */
"inter Fallback"      size-adjust: 107.89%  ascent-override:  89.79%  descent-override: 22.36%
"source Fallback"     size-adjust:  94.19%  ascent-override: 104.47%  descent-override: 28.98%
"plexMono Fallback"   size-adjust: 131.49%  ascent-override:  77.95%  descent-override: 20.91%
"ubuntuMono Fallback" size-adjust: 109.58%  ascent-override:  75.75%  descent-override: 15.51%
```

Note `plexMono` at **131.49%** — a mono over a proportional Arial needs a third more width to
occupy the same line. If you use one number for all your families you will get one of them right.

The corpus already carries the Vercel override in [`typography.md`](typography.md) §font loading;
this is the same value, re-measured twice, plus the other three.

### Table F — how much a list costs, synthetic

My own benchmark, not a product: a plain list of `div.row` (flex, 6px padding, 1px border, a dot, a
title, a right-aligned meta column, `:hover` and `.sel` in CSS). Two ways to select one row:
`classList.toggle` on that one row, versus rebuilding the whole list — the shape you get when the
selected id lives in a parent component and every row is a child of that render.

Median of 12 toggles, synchronous work (style + layout, forced with `offsetHeight`):

| Rows | DOM nodes | Toggle one row — 1× CPU | 4× CPU | Rebuild the list — 1× CPU | **4× CPU** | First build, 4× CPU |
|---|---|---|---|---|---|---|
| 50 | 207 | 0.1ms | 0.2ms | 1.2ms | 4.1ms | 379ms |
| 200 | 807 | 0.0ms | 0.1ms | 3.5ms | 13.5ms | 459ms |
| 500 | 2,007 | 0.0ms | 0.0ms | 7.7ms | 35.1ms | 681ms |
| 1,000 | 4,007 | 0.0ms | 0.0ms | 15.2ms | **69.5ms** | 1,105ms |
| 3,000 | 12,007 | 0.1ms | 0.0ms | 42.5ms | **184.8ms** | 2,579ms |
| 10,000 | 40,007 | 0.0ms | 0.1ms | 154.1ms | **655.5ms** | 8,431ms |

- **Targeted DOM mutation is free at every size tested, on a throttled CPU, up to 40,000 nodes.**
  Style invalidation is scoped to the element you touched. 10,000 rows in the DOM does not make
  selecting one of them slow.
- **Rebuilding the list crosses "feels instant" (100ms) between 1,000 and 3,000 rows on a mid-tier
  phone, and crosses Google's "poor INP" line (200ms) at about 3,000.**
- **The real cliff is mount cost.** Building 10,000 rows takes 8.4 seconds at 4× CPU. Virtualisation
  buys you that, not the interaction.
- The rebuild column is a full `innerHTML` reconstruction — harsher than React with stable keys and
  `memo`, gentler than React without them plus a context that re-renders every consumer. A memoised
  list sits nearer the toggle column; an un-memoised one with an inline
  `onClick={() => setSelected(id)}` per row sits nearer this one.

Threshold, stated as a rule: **virtualise a client-rendered list above ~2,000 rows because of mount
cost; below that, virtualise only if you have measured a reason.**

Scope, because this number and the tables file's look like they disagree and do not:
[`tables-dashboards-data.md`](tables-dashboards-data.md) puts the pagination-vs-virtual-scroll line
at ~5,000. Different question. ~2,000 is where *mounting* a list the client already holds stops
being free. ~5,000 is where you should stop sending the client the whole list at all. If the server
is already paginating, you never reach the mount-cost threshold and the tables file governs.

---

## The thresholds: what is research, what is Google, what is folklore

100ms / 300ms / 1s / 10s get quoted as one set of numbers. They come from three places and only one
is a study.

**Research (Miller 1968; Card, Robertson & Mackinlay 1991; popularised by Nielsen 1993).** Quoted
verbatim from Nielsen's own summary:

> 0.1 second is about the limit for having the user feel that the system is reacting
> *instantaneously*, meaning that no special feedback is necessary except to display the result.
> 1.0 second is about the limit for the user's flow of thought to stay uninterrupted…
> 10 seconds is about the limit for keeping the user's attention focused on the dialogue.

And, in the same passage:
> Normally, no special feedback is necessary during delays of more than 0.1 but less than 1.0
> second.

**Nielsen's rule says show nothing until one second.** Not 300ms. Not "always give feedback".

**Google's RAIL model (engineering guidance, not perception research).** Respond to input in under
100ms, but budget only **50ms** of your own work, because the browser needs the rest: "For actions
that take longer than 50 ms to complete, always provide feedback." Produce an animation frame in
10ms of a 16ms budget, same reason. Load and become interactive in under 5s on a mid-range device
on slow 3G for a first load, under 2s for a repeat load.

**Google's Web Vitals thresholds (field data, p75).** INP ≤ 200ms good, > 500ms poor. CLS ≤ 0.1.
LCP ≤ 2.5s. These are distribution cut-offs chosen from CrUX, not perceptual limits. They are the
right thing to be graded on and the wrong thing to reason from.

**Folklore: the ~300ms spinner boundary.** No study behind it. It is craft convention and it is
nonetheless correct, for a mechanical reason: a spinner needs roughly two rotations to read as
rotation rather than as an object appearing. Stripe's docs spinner rotates every 600ms (measured,
and in [`interaction-and-states.md`](interaction-and-states.md)), so under ~300ms the user sees an
arc appear and vanish — a rendering bug, worse than the 300ms of nothing it was hiding. Keep the
300ms rule. Stop citing Nielsen for it.

### What to do at each budget

| Budget | Perception | Do |
|---|---|---|
| ≤ 16ms | dragging, scrolling, canvas | Nothing but the frame. Budget 10ms of JS. `transform`/`opacity` only. |
| ≤ 100ms | direct manipulation | Apply the result. No indicator of any kind. Budget 50ms of JS (RAIL). |
| 100ms – 300ms | noticeable, unbroken | Still nothing. If the action has no visible result of its own, change the control that caused it — a checked state, a disabled state, a label. |
| 300ms – 1s | the user is now waiting | Indicator, gated by a 300ms appear-delay and a 400ms minimum-visible. Skeleton if you know the shape, spinner if you don't, determinate bar if you know the fraction. |
| 1s – 10s | attention at risk | Determinate progress or a streamed partial result, plus the rest of the UI stays live and navigable. Never a full-page block. |
| > 10s | the user leaves | Name the work, give a step count or an estimate, let them leave, notify on completion. A bare spinner here is an insult. |

The rows above 300ms are detailed in [`interaction-and-states.md`](interaction-and-states.md)
§"Choosing between nothing / spinner / skeleton". The rest of this file is about not getting there.

---

## Optimistic UI

### What to apply it to

The behavioural rules — when to apply, how to roll back, why a silent revert is the worst thing on
the list — are in [`interaction-and-states.md`](interaction-and-states.md) §"Optimistic updates,
and rolling back honestly". What follows is what only shows up once you have built it.

Apply optimism when the action is **locally computable, near-certain, and idempotent-ish**: toggles,
stars, reorder, rename, mark-read, add-tag, send-message, add-to-cart. The test is: can the client
compute the exact post-state without asking anyone? If the answer needs a server round-trip to be
*correct* — not just to be persisted — you are guessing, not predicting.

### Do not apply it to

| Case | Why | What to do instead |
|---|---|---|
| Money moving | The server may decline. A card decline shown 800ms after "Paid ✓" is the single most damaging optimistic failure there is. | Pending state, real spinner, no claim of success until the server says so. |
| Anything irreversible | Rollback is a lie if there is nothing to roll back to. | Confirm, then wait. |
| Inventory, seats, slots, usernames, invite codes | Contended. Two clients can both compute "available". | Server-assigned. Show "checking…" and mean it. |
| Anything returning a server-generated ID the user will see | Your temp id leaks into URLs, into copy-to-clipboard, into a shared link that 404s. | Optimistically render the row; do not render the id until it is real. Disable the share/copy affordance until reconciliation. |
| Permission and role changes | The failure mode is a user who believes someone has access. | Wait. This is a security surface. |
| A field another user is editing right now | Last-write-wins with an optimistic local state silently discards the other person's edit. | Server-authoritative, or CRDT, or a conflict UI. Not optimism. |

### Reconciling

Three rules that decide whether the optimistic path is invisible or infuriating.

1. **Reconcile to the server's value, not to your prediction — unless the field is focused.** If
   you predicted the title `"q3 forecast"` and the server normalises to `"Q3 Forecast"`, render the
   server's; otherwise the value silently changes on the next refetch and the user learns not to
   trust what they see. The exception is absolute: **never overwrite a field the user is currently
   typing in.** Queue the server value and apply it on blur. A reconcile that fires mid-keystroke
   destroys input and is indistinguishable from a bug.
2. **Key optimistic rows by a client-generated id that survives the swap.** When the real row
   arrives, replace in place by that key. Appending the real row and removing the temp one produces
   a visible flicker and, on a sorted list, a jump.
3. **Serialise mutations per object.** Two rapid toggles on the same row with parallel requests can
   land out of order and reconcile to the wrong final state. Queue per key, or send the intended
   final state rather than a delta.

### Failing honestly

The most expensive bug in this file is the silent revert. The user watched it succeed. If it
un-succeeds with no announcement they discover the loss later, from someone else, and the product
has lied to them once — which is enough.

The correct failure:

- **Snap the value back. Do not animate it.** A 200ms fade back to the old value looks like a
  second successful edit.
- **Show a persistent, dismissible error *at the object*.** Not a toast — toasts auto-dismiss and
  the user may not be looking. `"Couldn't rename to 'Q3 forecast' — you don't have edit access.
  [Retry]"`, anchored to the row.
- **Keep their input.** A failed comment leaves the text in the composer. A failed rename leaves the
  new name in the field, selected. Never destroy typed content on a network failure.
- **Do not show a spinner during flight.** If you must show pending, drop the row to ~70% opacity,
  and only after ~500ms. Most optimistic actions should show nothing at all while in flight — that
  is the point of them.
- **Give the whole surface a way to see "N unsaved changes"** if you allow more than a couple of
  in-flight mutations. Otherwise a user who goes offline mid-session accumulates a screen full of
  changes that will all fail at once.

Offline is where optimistic UIs are judged. The optimistic path keeps working and every mutation
queues; when the connection returns, either all of them succeed quietly or you have a pile of
simultaneous errors. Decide which you are shipping before you ship the optimism.

---

## Instant navigation

### Why Linear's app feels the way it does, stated precisely

Not "it's fast". **The client holds the data before you ask for it**, so a view change is a render,
not a request. Linear syncs the workspace into an in-browser store and runs reads and writes against
local state; the server is a sync target, not a query endpoint. There is nothing to wait for, so
there is no loading state to design, so no skeleton, so no flash, so no "almost instant" — instant.

What that costs:

- **A sync engine.** Change tracking, conflict resolution, schema migration on the client, a
  transactional local store, and a bootstrap that pulls the workspace down. This is a team-year
  class of work, not a library choice.
- **A bounded dataset.** It works because a Linear workspace is megabytes, not gigabytes. It does
  not work for a product where any one user can address 40M rows.
- **Client-side authorisation.** If the client holds the data, the client holds data the user is
  allowed to see, which means your permission model has to be expressible as a partition of the
  sync set. Row-level permissions that change frequently are very hard here.
- **Bigger initial load.** You pay once, up front, to never pay again. Check what that does to a
  first-run user on the phone profile in Table B.

The boundary: **local-first buys nothing on a page the user visits once.** `linear.app`'s marketing
site is a conventional server-rendered page painting in 468ms — fast for exactly the reasons any
marketing page is fast, none of them the sync engine. (The first pass of this file claimed it was
the slowest paint in the sample. That was one unlucky run; see the Review pass.)

### The cheap 80%, in the order you should do it

Four steps that close most of the gap without a sync engine.

**1. Make in-app navigation a client-side transition.**

| Product | Router | Click → main content replaced |
|---|---|---|
| `docs.stripe.com` | client-side | **43ms** (hover-warmed: 48ms) |
| `react.dev` † | Next.js pages router | **85ms** |
| `vercel.com/docs` | Next.js app router | **74ms** (hover-warmed: 78ms) |
| `tailwindcss.com/docs` | Next.js app router | **80ms** (hover-warmed: 84ms) |
| `github.com` † | Turbo-style soft nav | **830ms** |
| `news.ycombinator.com` | full document load | hard navigation |

† re-measured 2026-09-10 by arming a rAF loop on `click` and recording when `main`'s text changed.

Everything above GitHub is at or under ~100ms, Miller's instantaneous limit. GitHub's 830ms is not —
you can watch the page go, which is why GitHub navigation feels like a website and Stripe's docs
feel like an app, despite GitHub having the faster cold FCP of the two.

**2. Prefetch, and prefetch on the right signal.** `react.dev` fires the data request for a link
**32ms after `mouseover`**, before `mousedown`; GitHub fires nothing on hover, which is most of the
830ms. Since a deliberate click lands 150–400ms after the pointer arrives, hover-prefetch converts
most of the fetch into dead time the user was going to spend anyway.

Signals, in order of cost:
- **Viewport entry.** Next.js does this by default in production for `<Link>`. Free-looking, but on
  a page with 200 links it is 200 requests; scope it.
- **Hover / focus.** ~150–400ms of runway, near-zero waste, and it is what the numbers above show.
- **`pointerdown` / `touchstart`.** ~80–120ms of runway. This is the only one that works on touch,
  where there is no hover. Use it as the mobile counterpart, not as the desktop primary.
- **Predicted intent** (cursor trajectory). Not worth it; hover already captures most of the win.

**3. Keep the shell mounted.** Header, sidebar and selected-nav state must not remount. A shell
that re-renders makes a 60ms transition look like a 300ms one, because the parts that did not change
flickered. A routing-layout decision, made once, free.

**4. Cache and revalidate rather than refetch.** Render last-known data immediately, fire the
request, reconcile when it lands. The "loading state" for a revisit becomes: the old data, then the
new data. Do not replace rendered data with skeletons while revalidating — see the next section for
the one case where you must.

Cheap and frequently skipped: **restore scroll position and list state on back-navigation.** A back
button that returns you to the top of a list you had scrolled 40 items into costs more time than
the entire navigation you optimised.

---

## Skeletons, spinners, and nothing

The decision rule and the two timing guards live in
[`interaction-and-states.md`](interaction-and-states.md). What follows is the craft that decides
whether a correct decision still looks wrong.

**Everything in this section is scoped to waits under ~1s** — the range every product in Table D
lives in. Past that, see §Animation and the >1s rows of the budget table.

### Match the skeleton to the content it becomes

The failure mode is not "the skeleton is ugly", it is "the load ends in a jump". A skeleton box of a
different height from the content box converts a wait into a layout shift — the worse of the two.

From Table D, what Airbnb and YouTube get right:

- **Right count.** Airbnb renders 20 image blocks, which is the page size of the real result set.
  Not 3, not 12.
- **Right radius per role.** 20px on the card image because the card image is 20px; 4px on text;
  50% on avatars.
- **Right line count and unequal widths.** 293px then 195px for a two-line title.
- **Right position.** Airbnb's map pane skeleton occupies the exact rectangle the map will occupy,
  including its offset from the top of the results column.
- **Real chrome.** Logo, search, nav and account are live and clickable during the skeleton.

The check: screenshot the skeleton and the loaded state at the same scroll offset and flip between
them. If anything moves vertically the skeleton is wrong. If you cannot make it match, show nothing
— an empty region that fills in is honest; a skeleton that lies about the shape is not.

### Contrast

A skeleton must be quieter than the content it replaces. Shipping values against their page
backgrounds: GitHub `#f6f8fa` on white (1.04:1), Airbnb `#EBEBEB` (1.14:1), YouTube `#E3E3E3`
(1.22:1) — all barely there. Radix's skeleton animates `gray-a3 → gray-a4`, ~6% → 10% black, the
same register.

If you can read your skeleton from across the room it is wrong. A dark skeleton is a diagram of a
page, and the user reads the diagram instead of waiting for the page.

### Animation

**Under ~1s of expected wait: don't.** Airbnb, YouTube and GitHub all ship `animation: none`, and
all three resolve fast. A flat block that is replaced within a second never needs to prove it is
alive.

**Past ~1s, motion earns its place.** A cold serverless start, a large report, a first sync: a
static grey block held for eight seconds is indistinguishable from a render that failed, and users
reload. The shipping examples do not cover this scope because none of them wait that long. Past ~3s
the honest answer is not a fancier skeleton at all — it is a determinate bar, a step count, or a
streamed partial result.

If you do animate: **background-colour** oscillation between two neutral alpha steps over ~1s
`alternate-reverse` (Radix's `rt-skeleton-pulse`, `gray-a3 → gray-a4`, read from
`@radix-ui/themes@3.3.0`), or an asymmetric opacity curve like YouTube's `simple-shimmer`. Not
Tailwind's `animate-pulse` on a grid: symmetric, 2s, every block in phase. Twenty blocks breathing
in unison is a screensaver — the sin is the synchrony and the duration, not the motion.

A translateX sweep (Vercel's Geist skeleton: `loading-skeleton 1.5s ease-in-out infinite reverse`)
is defensible on **one** large block. On a grid of forty it is forty synchronised sweeps.

### Never swap loaded content for skeletons — when the query is the same

On a **refetch of the same query**, replacing rendered rows with skeletons is a regression, not a
loading state: the user watches their own data disappear and reads it as a crash. Keep the content,
drop it to ~60% opacity, put a 2px indeterminate bar at the edge of the section. GitHub's model is
simpler still — the rendered list stays exactly as it is and only the deferred fragment carries a
55×18 grey box.

**The exception: when the query's subject changes, clear the content.** Switch account, tenant,
currency, date range, patient — the old rows are now *mislabelled*, not stale. A treasury dashboard
holding Account A's balances at 60% opacity under a header reading "Account B" is a wrong number
attached to the right label, and someone will act on it. The test: **if the stale content and the
new chrome together assert something false, clear it.**

### Partial skeletons beat whole-page skeletons

GitHub's PR list at 600ms is fully rendered — every row, title and timestamp — with exactly ten
`span.Skeleton` elements standing in for label chips from a deferred fragment (re-verified
2026-09-10; screenshot in the Review pass). Ten small boxes, not a page of grey. The rule:
**skeleton only what is actually still in flight, at the size it will be.**

---

## Streaming and progressive rendering

### Measured: which of these pages actually stream

`responseEnd − responseStart` on the document request is how long the HTML was arriving. If FCP
falls inside that window, the browser painted the page while the server was still writing it.

| Page | TTFB | Document arriving for | HTML decoded | FCP | Painted during the stream? |
|---|---|---|---|---|---|
| `vercel.com/docs` | 70ms | **293ms** | 816KB | 300ms | **yes** |
| `tailwindcss.com` | 142ms | 90ms | 857KB | 268ms | no (all HTML first) |
| `github.com/vercel/next.js` | 666ms | 75ms | 419KB | 440ms | no |
| `docs.stripe.com/payments` | 382ms | 69ms | 451KB | 616ms | no |
| `nytimes.com` | 312ms | 56ms | 1,438KB | 500ms | no |
| `apple.com/macbook-pro/` | 102ms | 33ms | 705KB | 248ms | no |

Streaming buys the difference between "TTFB + full render" and "TTFB + first chunk" — ~290ms on
`vercel.com/docs`. On a fast origin serving a small page it buys nothing, which is why most of this
table does not bother.

### Where the boundaries go

**A Suspense boundary wraps the slowest thing, not the whole thing.** The common generated mistake
is `<Suspense fallback={<Spinner/>}>` around the page, which converts a page that could have
streamed into one spinner followed by everything at once — strictly worse than not streaming,
because you paid the complexity and kept the wait.

- **Around each independently-slow region**, not around the layout. Header, nav, and the primary
  heading should be in the shell and arrive at TTFB.
- **Not around anything above the fold that will shift when it resolves.** A boundary that resolves
  into a taller subtree pushes the content below it down, which is a layout shift you introduced on
  purpose. Give the fallback the resolved height, or move the boundary below the fold.
- **Not around a region that resolves in under ~100ms.** You will pay a fallback flash for nothing.
  Resolve it in the shell.
- **Around the tail, aggressively.** Comments, related items, recommendations, activity feeds —
  where streaming turns a 1.4s page into a 300ms page plus some filling-in.

Order matters more than count. Three boundaries resolving in reading order — heading, body, sidebar
— read as a page assembling. Three resolving in network order read as chaos.

### Streaming text specifically

- **Do not render token-by-token. Render at a fixed cadence — for prose the user reads as it
  arrives.** Tokens arrive in bursts; painting on arrival produces stutter that reads as a
  struggling system. Buffer and flush on a timer, around **30–60 characters/second**: fluent, and
  fast enough that a reader is never waiting. Past ~80 c/s the eye stops tracking and it reads as a
  dump.
- **Scope that cadence to prose.** For output the user *waits for* rather than reads along with — a
  code diff, a build log, a table, a terminal — the cap is a throttle on content that already
  arrived: a 4,000-character diff at 45 c/s takes 90 seconds to appear when it was produced in
  three. Flush those at frame rate. The rule matches reading pace; when nobody reads along there is
  no pace to match.
- **Never re-layout the whole message on each flush.** Append into a container with a stable width
  and `overflow-anchor` behaviour you control. If markdown is being parsed incrementally, parse
  into a stable tree — a heading that appears when the `#` is followed by a space will reflow
  everything below it if you re-render the block.
- **Pin the scroll deliberately.** Auto-scroll to keep the last line visible, but stop the moment
  the user scrolls up, and do not resume until they scroll back to the bottom. A stream that yanks
  the viewport away from something the user is reading is the single most complained-about
  behaviour in this pattern.
- **Reserve the code block.** Fenced code arriving character-by-character inside a syntax highlighter
  that re-tokenises the whole block per flush is the most expensive thing in a streaming renderer.
  Render the raw text in a fixed-width container while streaming and highlight once on close.
- **Show the cursor, and show the stop.** A blinking block or a bar at the insertion point is what
  distinguishes "generating" from "stalled". A Stop control must be present from the first token,
  not after the first paragraph.
- **First token is the metric that matters.** A 200ms time-to-first-token with a 20-second
  completion feels better than a 3s time-to-first-token with an 8-second completion. Optimise the
  first byte of the answer, not the total.

---

## Layout stability

A page that jumps reads as broken regardless of how good it looks once it settles. Cheapest quality
signal in the file, most often left on the floor.

### The causes, ranked by what actually fired

Not by what the checklists say. Every shift above 0.001 recorded across the sample. **All four NYT
shifts below reproduced on 2026-09-10 — same elements, same rects, within ~400ms of the same
timestamps.** Layout instability is structural; it does not drift the way network timing does.

**1. Late-injected third-party iframes and banners.** The largest single shift measured anywhere:

```
nytimes.com  ·  t = 4,538ms (first pass: 4,140–4,680ms)  ·  value 0.0529
  IFRAME#google_ads_iframe_/29390238/nyt/homepage_0
  previousRect  {x:0, y:12,  width:1440, height:8}
  currentRect   {x:0, y:0,   width:1440, height:270}
```

The slot was reserved — the screenshot at 500ms shows a 295px empty band above the masthead. The
**iframe inside the slot** started at 8px tall and grew to 270px, pushing the masthead up. Reserving
the outer container is not enough if the inner element is what grows.

Fix: set explicit dimensions on the injected element itself, not just its wrapper. If the size is
genuinely unknown, render it in a fixed-height container with `overflow: hidden` and accept the crop,
or move it below the fold. And if it is a consent banner: `position: fixed` at the bottom, never a
flow element at the top.

**2. Media sized after load.**

```
nytimes.com  ·  t = 2,910ms  ·  value 0.0528
  NYT-BETAMAX-END-SLATE   8×8  →  530×356
```

A video player's end-slate element mounting at 8×8 and expanding to its real box. Any custom
element that mounts empty and fills in later is this bug. Fix: `aspect-ratio` on the container, from
the first render, from data you already have.

**3. Post-hydration reflow.**

```
nytimes.com  ·  t = 4,007ms  ·  value 0.0172
  MAIN#site-content  {y:462, height:438}  →  {y:432, height:468}
```

The main column moves up 30px and grows 30px, three and a half seconds in, because something above
it resolved. Fix: the server-rendered markup and the hydrated markup must produce the same box.
Conditional rendering on `typeof window !== 'undefined'` guarantees they will not.

**4. Late text and label widths.**

```
nytimes.com  ·  t = 3,115ms  ·  value 0.0010   nav item  78px → 263px
apple.com    ·  t = 484–793ms · value 0.0048   text node  7.8px → 442px
apple.com    ·  t = 353–397ms · value 0.0248   DIV.marquee / P.ac-ribbon__bts-fy26-content-copy
                                                 hero moves down 68px as the promo ribbon copy swaps
```

Apple's largest shift is a promotional ribbon at the top of the page whose copy is swapped in after
first paint, pushing the hero down 68px at ~370ms. Fix: render the final copy server-side, or fix the
ribbon's height.

**5. A panel that re-measures itself, repeatedly.**

```
docs.stripe.com  ·  t = 4.6s, 8.0s, 14.3s  ·  value 0.0085, 0.0099, 0.0102 each
  DIV.CollapsibleJson / DIV.KeyValueRow
```

Three shifts, seconds apart, from the API-reference sample-response panel recalculating. Nothing
was loading; the component was measuring. Invisible in a 5-second Lighthouse run, very visible to
someone reading for two minutes. Measure for ≥15 seconds, including a scroll.

**6. Images without dimensions.** The cause everyone lists first fired on *none* of these pages,
including `nytimes.com`, which on re-probe has **128 of 128** images with no `width`/`height`. Its
images sit in sized containers. Set `width`/`height` or `aspect-ratio` anyway — it is one attribute
and it removes the need for the container — but do not assume that doing so has fixed your CLS.

### The stability checklist

- `width` + `height` (or `aspect-ratio`) on every `<img>`, `<video>`, `<iframe>`, `<canvas>`, and
  every custom element that mounts empty. Vercel and Notion score 0 of 19 and 0 of 58 undimensioned
  images respectively; it is achievable.
- Every ad, embed, consent banner, promo bar and A/B-injected element gets a reserved box **on the
  element**, or it goes below the fold, or it is `position: fixed`.
- Nothing that changes layout may run after first paint on a path the user is already reading.
  Personalisation, experiment assignment and geo-copy belong in the server response.
- SSR and hydration must produce identical boxes. Diff them.
- No `transition` on `height`, `width`, `margin`, `padding` or `top` for content that arrives
  asynchronously. An animated arrival still counts as a shift, and `transition: all` on a container
  will animate a layout change you never intended.
- Measure CLS for ≥15s with a scroll in the middle, not for 5s at rest.

---

## Font loading

### The decision

| Situation | Choice | Why |
|---|---|---|
| Body text, any product | `swap` **plus** a metric-matched fallback | Text is readable at FCP and the swap moves nothing. This is what Vercel and Tailwind ship. |
| Body text, no time to build a fallback | System stack | `docs.stripe.com` fetches 0 font files and has the best throttled-phone paint in Table B. Not a compromise; a result. For non-Latin readers, enumerate it the way Stripe does (Table E) rather than trusting `system-ui`. |
| Code / monospace | `block`, short window | Vercel ships `font-display: block` on Geist Mono. Mono glyph widths differ enough from the fallback that a swap re-wraps the code block. Briefly invisible beats re-flowing. |
| Display face in a hero, brand-critical | `optional` + preload, or `block` + preload | `optional` means: use it if it is already there, otherwise never swap. No flash, no shift, occasionally no brand font. That is often the right trade for a face used in one 80px headline. |
| Icon fonts | Do not | Use SVG. An icon font that fails leaves boxes in your UI, and it cannot be `swap`ped to anything sensible. |

### The metric-matched fallback, spelled out

`swap` without a metric-matched fallback is a promise to shift the layout. The fallback face is a
zero-byte `@font-face` that points at a locally installed font and corrects its metrics to match the
webfont:

```css
@font-face {
  font-family: "Inter Fallback";
  src: local("Arial");
  size-adjust: 107.89%;      /* Arial is narrower than Inter; scale it up */
  ascent-override: 89.79%;   /* pin the baseline so line boxes match */
  descent-override: 22.36%;
  line-gap-override: 0%;
}
body { font-family: Inter, "Inter Fallback", system-ui, sans-serif; }
```

Those numbers are `tailwindcss.com`'s, re-read from its live stylesheet 2026-09-10. Generate your
own with `next/font`, `fontaine`, or by measuring both faces; never copy Inter's numbers onto a
different typeface. Table E shows how far apart four families on one site land: 94.19%–131.49%
`size-adjust`, 75.75%–104.47% `ascent-override`.

### Preload discipline

`tailwindcss.com` preloads 10 files totalling 1,175KB and pays for it: 376ms FCP on desktop,
5,268ms on the throttled phone. `react.dev` preloads 9 files totalling 315KB with **no**
metric-matched fallback at all and still measures CLS 0 — a 72ms TTFB plus preload lands the fonts
before first paint. That is a real strategy and a fragile one: it works on a fast connection and
stops working on the phone profile, where preloads compete for a 1.6 Mbps pipe.

- **Preload only faces used above the fold, only in the weights used above the fold.** Two or three,
  not ten. Every preload competes with the LCP resource for bandwidth.
- **`crossorigin` on the preload, and it must match the `@font-face` request exactly** (same URL,
  same `crossorigin`), or you fetch the file twice and gain nothing.
- **Self-host.** A third-party font host adds a DNS lookup, a TLS handshake and a connection to the
  critical path — measurable at 150ms RTT, which is Table B's profile.
- **Subset.** A Latin subset of a variable face is typically 15–40KB. Shipping the full multi-script
  file to preload it is how you get to 1,175KB.
- **Variable fonts collapse the file count.** Vercel ships one Geist variable file covering weights
  100–900 rather than five static files.

### What getting it wrong looks like, in order of visibility

1. **FOIT past ~100ms** — the paragraph is blank while the page around it is drawn. The default if
   you write nothing: `font-display: auto` is treated as `block` with a ~3s window.
2. **Swap with a mismatched fallback** — readable, then every line reflows and the page below jumps.
3. **Swap with a matched fallback** — glyph shapes change, nothing moves. The target.
4. **Swap on a mono block** — the code re-wraps and line numbers stop lining up. Use `block`.

---

## Interaction responsiveness

### Keeping the main thread free

From Table C: the JS you wrote is 1–17ms of a 50ms interaction. Interactions go bad because of
*input delay* — the event arrived while the thread was busy. The work is not micro-optimising
handlers; it is not being busy.

What makes the thread busy, in the order it actually appears:

- **Hydration and bundle execution.** Table B: `docs.stripe.com` has a TBT of **5,139ms** on the
  throttled phone from a 1,820KB compressed `frontend.js`. `github.com` 2,231ms. `nytimes.com`
  3,596ms. During that window every tap queues.
- **A synchronous layout read inside an event handler.** Reading `offsetHeight`, `getBoundingClientRect`,
  `scrollTop` or `getComputedStyle` after a write forces layout in the same frame. In a loop over
  rows this is quadratic. Batch reads before writes.
- **Rendering more than changed.** Table F: rebuilding a 3,000-row list to select one row costs
  184.8ms at 4× CPU. Toggling a class on the one row costs 0.0ms.
- **Non-passive scroll and touch listeners.** `addEventListener('touchstart', fn)` without
  `{passive: true}` blocks scrolling on the compositor until your handler returns.
- **Work scheduled in the same frame as the response.** Analytics, prefetch, layout measurement. If
  it does not have to be in this frame, put it behind `scheduler.postTask({priority:'background'})`
  or at minimum a `setTimeout(fn, 0)` after the visual update.

The pattern that fixes the most cases: **paint the response first, then do the work.** Apply the
visual change synchronously in the handler, `await` a frame, then run the expensive part. The user
sees a 16ms response to a 200ms operation.

### Text editors and input latency

Typing is the one interaction where 100ms of lag is not "a bit slow" but unusable: the feedback loop
is per-character and the user's motor timing depends on it.

- **Never make the input a controlled component whose value round-trips through a slow parent.**
  Keydown → parent state → context → re-render of a subtree → value back into the input is how you
  get 60ms of processing per character. Keep the input uncontrolled or locally controlled, and
  publish upward on a debounce.
- **Debounce the consequence, not the character.** The character appears immediately; the search,
  the validation, the autosave, the syntax highlight all run at 150–300ms after the last keystroke.
- **Never re-highlight the whole document per keystroke.** Highlight the visible range, or the
  changed line, or highlight on idle.
- **Never move the caret, re-select, or reformat while the user is typing.** Auto-formatting that
  fires mid-word is the most-hated behaviour in this category. Format on blur, on a pause, or on an
  explicit command.
- **Measure it with `PerformanceEventTiming`, not by feel.** Table C's method: watch `keydown`
  entries and read `processingEnd − processingStart`. On `react.dev` and `docs.stripe.com` that
  number is 1–17ms. If yours is 40ms, you have a controlled-component problem, and no amount of
  `useMemo` will fix it.

### Lists

From Table F, the practical thresholds on a 4× CPU throttle:

| Rows | What to do |
|---|---|
| < 500 | Plain DOM. Selection via a class on the one row. Virtualisation here is a net loss — it breaks Cmd-F, breaks anchor links, and complicates keyboard navigation for nothing. |
| 500 – 2,000 | Plain DOM still, but the selected/hover state must be CSS or a targeted mutation, never a parent re-render. The rebuild path crosses 100ms around 1,500 rows. |
| 2,000 – 10,000 | Virtualise, primarily for mount cost — 3,000 rows takes 2,579ms to build at 4× CPU. Set `aria-rowcount`/`aria-setsize` so assistive tech still knows how many there are. |
| > 10,000 | Virtualise and paginate server-side. 10,000 rows is 8,431ms of build at 4× CPU, and frame time has already gone to 48.9ms. |

**Scope the whole table by the user's verb.** These thresholds assume the primary verb is *scroll*.
If it is **find** or **print** — an audit log a compliance reviewer Ctrl-Fs, an e-discovery review
queue, an invoice run someone prints, a table a user selects-all and pastes into a spreadsheet —
virtualisation removes the feature the product exists for, and does so silently: find-in-page
returns "no results" for a row that is right there. In those products paginate at a size the browser
can hold, or use `content-visibility: auto`, which keeps every row in the DOM and findable. Losing
2,579ms of mount is cheaper than losing Ctrl-F.

`content-visibility: auto` with a `contain-intrinsic-size` is the cheap intermediate: it skips
rendering work for off-screen sections without you writing a windowing implementation, and it keeps
the DOM intact for find-in-page. It does not help with mount cost, only with render and paint.

### Why a control that responds in >100ms feels broken even when it is fast

The perceptual system binds an action to its result inside a window; outside it, the two events are
experienced as unrelated. A button that takes 250ms to show its pressed state feels broken. A button
that shows its pressed state in 16ms and finishes its work in 2 seconds feels fine. Split them:
**acknowledge in the same frame, complete whenever.**

Concretely, for any control:
1. Frame 0: `:active` state, or the checkbox flips, or the row highlights. Always CSS or a single
   class change. Never gated on anything async.
2. Then the work.
3. Then the result.

A control that has no natural frame-0 state — a "Refresh" button, a "Run" button — needs one given
to it: disable it, change the label, show the inline state at fixed width described in
[`interaction-and-states.md`](interaction-and-states.md).

---

## Loading states and assistive technology

The 300ms appear-delay and the 400ms minimum-visible are **visual** guards. They must not gate the
accessibility announcement, and in most generated code they do, because the same `isLoading` boolean
drives both.

- **`aria-busy="true"` on the region goes up the moment the request starts** — no delay. It is not
  a flash; nothing paints.
- **Announce completion, not progress.** A polite `aria-live` region that says "Loading…" then
  "24 results" for a 200ms round-trip produces two announcements for one action, and the first is
  interrupted by the second. Announce the *result*: `"24 results"`. Announce "Loading…" only past
  the same ~1s where a sighted user gets a determinate indicator.
- **A skeleton must not be readable.** Screen readers will happily walk a grid of empty `div`s and
  report forty blank list items. `aria-hidden="true"` on the skeleton, plus the `aria-busy` on its
  container.
- **A visual-only frame-0 acknowledgement is not an acknowledgement.** The `:active` state, the
  label swap, the disabled attribute — the disabled attribute is the only one of the three a screen
  reader reports. If your frame-0 state is purely a colour change, add `aria-disabled` or a live
  announcement.
- **`prefers-reduced-motion` applies to skeletons.** If you shipped the shimmer that §Animation
  scopes to long waits, drop it to a static block under reduced motion. Indeterminate progress bars
  and the streaming-text cursor are the same case.

None of this appears in Tables A–F, because none of the instruments in this file can see it. That
is a limit of the method, not evidence the surface is fine.

---

## The honest measurement loop

### The setup, because a wrong setup produces confident wrong numbers

Three failures hit while producing this file. The third one did make it into the document.

**Background tabs lie.** Measuring in a Chromium tab that was not foregrounded produced
`tailwindcss.com` FCP = **4,720ms**. The same page, same run, with `page.bringToFront()` first:
**552ms**. Background tabs get throttled rAF and deferred paints. `notion.so` reported a single
**116,563ms** long task in a background tab. Every automated performance harness must foreground the
page.

**One run is not a measurement.** `linear.app` FCP across three consecutive identical runs: 2,352 /
1,840 / 708ms. `stripe.com/docs` CLS: 0.0184 / 0.0687 / 0.0184. Take the median of at least three
and publish the spread when it is wide.

**Publishing the median is not enough if you then reason from it.** The first pass of this file took
that 1,840ms median, wrote it into Table A, and then built three separate arguments on top of it —
including a screenshot claim ("the hero is still an empty dark rectangle at 1,600ms") that a
1,600ms screenshot flatly disproves. Table B of the same file recorded 432ms for the same page and
nobody reconciled them. **When two of your own measurements of one page disagree by 4×, stop and
re-run before you write a sentence that depends on either.** A wide spread is not a footnote; it is
a result that says you have not measured the thing yet.

### The profile to test on

```
Emulation.setCPUThrottlingRate           rate: 4
Network.emulateNetworkConditions         latency: 150ms, download: 1.6 Mbps, upload: 750 Kbps
viewport                                 412 × 915, DPR 2.6
```

Lighthouse's "Slow 4G" plus a mid-tier Android CPU multiplier. Not pessimistic — the median of a
large part of the world. Table B is what it does to sites built on fast machines.

If you can hold one real device, make it a mid-tier Android — Pixel A-series, Galaxy A5x, Moto G —
not a flagship. A flagship and a MacBook return the same verdict, which is why testing on one tells
you nothing you did not already know.

### What to measure, and with what

| Question | Instrument |
|---|---|
| Did it paint fast? | `PerformanceNavigationTiming` + `paint` entries: `responseStart`, `first-contentful-paint` |
| Did the main thing paint fast? | `PerformanceObserver({type:'largest-contentful-paint', buffered:true})`, and log `entry.element` — the LCP element is usually not what you assumed |
| Did it jump? | `PerformanceObserver({type:'layout-shift', buffered:true})`, and log `entry.sources[].node`, `previousRect`, `currentRect`. The aggregate number tells you nothing actionable; the source node tells you everything |
| Does it respond? | `PerformanceObserver({type:'event', buffered:true, durationThreshold:0})`, decomposed into input delay / processing / presentation as in Table C |
| Is the thread blocked? | `PerformanceObserver({type:'longtask'})`; TBT = Σ max(0, duration − 50) |
| Is the HTML streaming? | `responseEnd − responseStart` on the navigation entry, compared against FCP |

### Seeing your own loading states

**The person who wrote the loading state has never seen it.** On a warm cache on localhost the
skeleton renders for one frame, if at all. Three ways to look at it, in increasing order of effort:

1. **Filmstrip it.** Navigate with `waitUntil: 'commit'` and screenshot at fixed offsets — 250, 500,
   900, 1600, 3000ms. Every skeleton finding in Table D came from this; it takes about 40 seconds
   per site. Then *open the PNGs and look at them.*
2. **Freeze the state.** A dev-only query param or store flag that pins every async boundary to
   `loading`, `error` and `empty`. If your loading states are not reachable by a URL, they are not
   reviewable, and they will ship wrong.
3. **Throttle and record.** 4× CPU, Slow 4G, DevTools performance recording, and watch the
   screenshot filmstrip in the timeline.

The three questions to ask of the filmstrip:
- At 250ms, is the user looking at something or at white?
- Between any two frames, does anything move that should not have?
- At the final frame, is anything still grey?

---

## When this advice is wrong

- **"Never show an indicator under 300ms" is wrong for a submit that has no other visible result.**
  If clicking "Send" produces nothing on screen for 280ms, the user clicks again. There the answer
  is not a spinner but an immediate frame-0 state on the control — disabled, label changed — which
  costs 0ms and cannot flash.
- **"Optimistic UI is fast" is wrong under contention and wrong for money.** See the table above. It
  is also wrong when your error handling is a `toast.error(e.message)`, because that is a silent
  revert with a decoration.
- **Local-first is wrong when the dataset is unbounded, when authorisation is row-level and
  volatile, or when compliance requires that the client never holds the data.** It is also wrong for
  anything a user visits once: Linear's own marketing site is a plain server-rendered page, and it
  is the fastest thing they ship on first load.
- **Prefetch-on-hover is wrong on touch** (there is no hover) **and wrong when the target is
  expensive server-side.** Prefetching a search-results route on hover across a grid of 60 cards is
  a self-inflicted load test. Next.js's viewport-prefetch default on a page with 200 links is 200
  requests; scope it with `prefetch={false}` on link-dense regions.
- **Skeletons are wrong when you do not know the shape, wrong for actions** ("Charging your card" is
  not a skeleton), **and wrong for a region that will hold two rows.** Two grey bars are noise.
- **Virtualisation is wrong below ~1,000 rows.** Table F: the DOM cost is zero. What you lose is
  find-in-page, native anchor scrolling, print, simple keyboard navigation and, if you are careless,
  the screen reader's row count.
- **INP ≤ 200ms is wrong as a target for a canvas, editor or game.** There the target is a 16ms
  frame and 200ms is catastrophic. Web Vitals thresholds are tuned for document-shaped pages.
- **`font-display: optional` is wrong for a brand-critical display face** — you are accepting that
  some visitors never see it. That is often the right trade; make it knowingly.
- **Streaming is wrong when the shell you can show instantly is meaningless.** A page whose entire
  content is one chart gains nothing from streaming an empty chart frame; it gains from a faster
  query.
- **The 4×/Slow-4G profile is wrong for an internal tool used on corporate laptops on a LAN.** Test
  the conditions your users have. The general point survives: those conditions are not your laptop.
- **"Keep the content and dim it on refetch" is wrong the moment the query's subject changes.** A
  multi-account treasury view, a multi-tenant admin console, a patient chart: stale rows under a
  header naming a different subject are a false statement, not a loading state. Clear and skeleton.
- **"Never animate a skeleton" is wrong past a second of waiting.** Every shipping example in
  Table D resolves fast. A static grey block held for eight seconds through a cold start reads as a
  failed render and gets reloaded. Past ~1s the answer is motion; past ~3s it is a determinate bar.
- **The 30–60 c/s streaming cadence is wrong for anything the user is not reading along with.** Code
  diffs, logs, tables, terminal output — the cadence is a throttle on content that already arrived.
  Flush at frame rate.
- **"p75 under 300ms, so no indicator" is wrong for a long-tailed or consequential action.** p75 is
  a distribution cut-off, not a promise. Gate on p95, and on anything irreversible gate on p99.
- **Every timing rule in this file is a visual rule.** None of them govern `aria-busy` or a live
  region — see §"Loading states and assistive technology".

---

## The generated version

What AI-written UI does here, and the correction.

| # | The generated pattern | Why it reads as generated | The correction |
|---|---|---|---|
| 1 | `{isLoading && <Spinner />}` on every request | No appear-delay and no minimum-visible, so every cached response produces a two-frame flash the user reads as a rendering bug | 300ms appear-delay + 400ms minimum-visible, and nothing at all below a 300ms p75 |
| 2 | `<div className="animate-pulse bg-gray-200 h-4 rounded" />` | Tailwind's `pulse` is opacity 100%→50% over 2s. Airbnb, YouTube and GitHub all ship `animation: none`. A grid of blocks breathing in unison is the loudest loading tell there is | Flat `#EBEBEB`-class neutral, no animation. If you must animate, background-colour between two alpha steps over ~1s |
| 3 | Three identical skeleton bars, same width, same radius, in a card | Real content has unequal line lengths and per-role radii. YouTube's title lines are 293px and 195px; Airbnb uses 4px on text and 20px on card images | Right count, unequal widths, radius per role, and the same box height as the content |
| 4 | Skeleton replaces rendered content on refetch | The user watches their data vanish; it reads as a crash | Keep the content at ~60% opacity, 2px indeterminate bar at the section edge |
| 5 | `try { await save() } catch { setValue(previous) }` | Silent revert. The user saw it succeed. This is the most damaging item in this table | Snap back, persistent inline error at the object naming the reason, keep their input, offer Retry |
| 6 | `<img src={url} className="w-full rounded-lg" />` | No `width`/`height`, no `aspect-ratio`. Every image is a shift on a slow connection | `width` + `height` attributes, or `aspect-ratio` on the container. Vercel ships 0 of 19 undimensioned; it is achievable |
| 7 | `<link href="fonts.googleapis.com/css2?family=Inter…">` in `<head>` | Third-party origin on the critical path, no preload, no metric-matched fallback, `swap` by default → readable text that reflows the page | Self-host, subset, preload the 2–3 above-the-fold faces, and ship a `size-adjust`/`ascent-override` fallback |
| 8 | `const [selected, setSelected] = useState()` in the parent of a 2,000-row `.map()` with an inline `onClick` closure | Every selection re-renders every row. Measured: 69.5ms at 1,000 rows, 184.8ms at 3,000, on a 4× throttle. A targeted class change is 0.0ms | State on the row, or CSS `:has`/`:checked`, or a memoised row with a stable callback |
| 9 | `<Suspense fallback={<PageSpinner/>}>` wrapping the entire page | Converts a page that could have streamed into one spinner followed by everything at once — strictly worse than not streaming | Shell renders at TTFB; boundaries around individually slow regions, ordered by reading order |
| 10 | `transition: all 300ms` on cards and containers | Async content arriving animates its own layout in. An animated shift is still a shift, and `all` catches `height` and `width` you never meant to animate | Name the properties. Nothing that arrives asynchronously gets a layout transition |
| 11 | A consent banner or promo bar as the first flow element in `<body>` | It injects late and pushes the entire page down. Apple's own largest shift is exactly this: 0.0248 from a promo ribbon at ~370ms | `position: fixed` at the bottom, or a fixed-height reserved box rendered server-side |
| 12 | A controlled `<input>` whose `value` round-trips through a context provider | 40–60ms of processing per keystroke where the shipping products measure 1–17ms | Local state in the input, publish upward on a 150–300ms debounce |
| 13 | Success toast fired on `onClick`, before the request resolves | Claims success for an operation that may fail. Combined with #5 this produces "Saved ✓" followed by nothing | Toast on resolve. Optimism goes in the data, not in the announcement |
| 14 | Every metric checked on localhost with a warm cache on an M-series Mac | The loading states are unreachable and the throttled multiplier is 2×–17× | 4× CPU, Slow 4G, filmstrip at 250/500/900/1600/3000ms, and open the PNGs |
| 15 | A spinner in the middle of an empty page for a 6-second import job | A bare spinner past 1s communicates nothing and past 10s is an insult | Name the work, show step *n* of *m* or a real fraction, let the user leave, notify on completion |
| 16 | The same `isLoading` boolean drives the visual guard and `aria-busy` | The 300ms appear-delay silently delays the screen-reader announcement too, and the skeleton `div`s stay in the accessibility tree as forty blank list items | `aria-busy` immediately, `aria-hidden` on the skeleton, announce the *result* not the progress |
| 17 | Keep-and-dim applied to an account or tenant switcher | Stale rows sit under a header naming a different subject — a false statement, not a loading state | Keep-and-dim for a refetch of the same query only; clear on any change of subject |

---

## Self-check

Run these against your own output. Each is verifiable, not a matter of taste.

**Indicators**
- [ ] Every loading indicator has both a ≥300ms appear-delay and a ≥400ms minimum-visible.
- [ ] No indicator exists on any path whose **p95** you have measured to be under 300ms (p99 for
      anything irreversible).
- [ ] No skeleton in the codebase uses `animate-pulse` or any opacity animation above ~15% amplitude.
- [ ] Every skeleton's box height equals the content's box height. Verified by flipping between two
      screenshots at the same scroll offset, not by reading the JSX.
- [ ] Skeleton bar widths within a group are unequal, and radii differ by role.
- [ ] No code path replaces rendered content with a skeleton on refetch.
- [ ] Chrome (nav, logo, search) renders and is interactive during every skeleton.
- [ ] Skeletons are `aria-hidden`, their container is `aria-busy`, and `aria-busy` is not gated by
      the 300ms visual appear-delay.
- [ ] Any skeleton that can be on screen for >1s has motion; any that can be on screen for >3s has
      a determinate indicator instead. Reduced-motion drops the animation.
- [ ] Keep-and-dim is used only where the query's subject is unchanged.

**Optimistic updates**
- [ ] Every optimistic mutation has a rollback that renders a persistent inline error at the object.
- [ ] No rollback is animated.
- [ ] No optimistic path exists for payments, permissions, inventory, or anything irreversible.
- [ ] User-typed content survives every failed request.
- [ ] Reconciliation uses the server's returned value, not the local prediction.

**Navigation**
- [ ] In-app navigation is measurably under 200ms from click to new main content. Measure it: arm a
      `click` listener that starts a rAF loop and records when `main`'s text changes.
- [ ] Links prefetch on hover/focus (desktop) and `pointerdown` (touch), and link-dense regions have
      prefetch disabled.
- [ ] The shell does not remount on navigation.
- [ ] Back-navigation restores scroll position and list state.

**Stability**
- [ ] CLS ≤ 0.1 measured over ≥15s including a scroll, on the throttled mobile profile.
- [ ] Every `layout-shift` entry above 0.001 has been traced to `entry.sources[0].node` and fixed or
      knowingly accepted.
- [ ] Every `<img>`, `<video>`, `<iframe>` and empty-mounting custom element has dimensions or an
      `aspect-ratio`.
- [ ] No banner, ad, promo or experiment injects into the top of the flow after first paint.
- [ ] No `transition` on a layout property for asynchronously arriving content.

**Fonts**
- [ ] Every webfont has a metric-matched fallback `@font-face`, or is `font-display: optional`, or
      you ship a system stack.
- [ ] Preloads: only above-the-fold faces, only above-the-fold weights, ≤3, self-hosted, subset.
- [ ] Monospace faces are `block`, not `swap`.
- [ ] Font bytes on the critical path are stated as a number you have looked at.

**Responsiveness**
- [ ] INP p75 ≤ 200ms on the throttled profile, measured with `PerformanceEventTiming`.
- [ ] Keystroke `processingEnd − processingStart` ≤ 20ms in every text input.
- [ ] No list re-renders more than the row that changed on selection or hover.
- [ ] Lists over ~2,000 rows are virtualised, with `aria-rowcount`/`aria-setsize` set — **unless**
      find-in-page or print is a primary workflow, in which case paginate or use
      `content-visibility: auto`.
- [ ] Every control shows a frame-0 acknowledgement that is not gated on anything async.

**Measurement**
- [ ] Numbers were taken on a foregrounded page, median of ≥3 runs.
- [ ] Numbers exist for the 4× CPU / Slow 4G profile, not only for your machine.
- [ ] You have opened the filmstrip PNGs at 250/500/900/1600/3000ms and looked at them.

---

## Sources and method

**Instrumentation.** Playwright driving Chromium on macOS, September 2026; re-probe 2026-09-10 on a
locally launched Chromium. Each measurement in a fresh `browserContext` with `page.bringToFront()`.
Cold-load metrics are the median of repeated runs; per-run values are reported where the spread was
wide. Metrics via `PerformanceNavigationTiming`, `PerformancePaintTiming`, and
`PerformanceObserver` for `layout-shift` (excluding `hadRecentInput`),
`largest-contentful-paint`, `longtask`, and `event` with `durationThreshold: 0`. Mobile profile via
CDP `Emulation.setCPUThrottlingRate {rate: 4}` and `Network.emulateNetworkConditions {latency: 150,
downloadThroughput: 1.6 Mbps, uploadThroughput: 750 Kbps}` at 412×915 DPR 2.6.

**Known limits of these numbers.** (a) One machine, one network, one location; TTFB reflects my
route to each origin. (b) Presentation delay in Table C has a ~28ms floor that belongs to the
harness, not the sites. (c) `linear.app` and `nytimes.com` return `transferSize: 0` for cross-origin
assets without `Timing-Allow-Origin`, so their byte counts are partial and marked `—`. (d) All pages
loaded signed-out; authenticated GitHub, Notion, Linear and Airbnb will differ, sometimes a lot.
(e) Table F is a synthetic page, not a product. (f) **Network-timing rows age.** The 2026-09-10
re-probe found one product's cold-load figures had moved by 4× and one row of Table E was wrong from
the start; the CSS-derived rows were unchanged. Re-probe before quoting a timing number, and prefer
this file's shipped-CSS evidence when you need something durable.

**Pages measured:** `linear.app`, `vercel.com`, `vercel.com/docs`, `docs.stripe.com/payments`,
`github.com/vercel/next.js`, `github.com/vercel/next.js/pulls`, `react.dev/learn`,
`tailwindcss.com`, `tailwindcss.com/docs/*`, `notion.so`, `figma.com`,
`airbnb.com/s/Tokyo--Japan/homes`, `youtube.com`, `nytimes.com`, `apple.com/macbook-pro/`,
`news.ycombinator.com`.

**Filmstrips viewed** (navigate with `waitUntil: 'commit'`, screenshot at 250/500/900/1600/3000ms,
then open the images): GitHub pull request list, Airbnb Tokyo search, YouTube home, NYT home, Notion
home, Linear home, Stripe docs, Vercel home, Figma home, Hacker News. Every claim in Table D and in
the CLS section is from one of these plus its computed-style probe.

**Library evidence, read from source 2026-09-10:** `tailwindlabs/tailwindcss` v4.3.3 `theme.css`
(the `animate-pulse` keyframe and timing function); `@radix-ui/themes` v3.3.0 `skeleton.css`
(`rt-skeleton-pulse`, `gray-a3 → gray-a4`, 1000ms `alternate-reverse`).

**Thresholds quoted from primary sources, fetched and read 2026-09:**
- Jakob Nielsen, *Response Times: The 3 Important Limits* (nngroup.com), excerpting *Usability
  Engineering* ch. 5 (1993), which in turn cites Miller (1968) and Card et al. (1991) — the
  0.1s / 1.0s / 10s limits and the "no special feedback between 0.1 and 1.0 second" clause.
- web.dev, *RAIL model* — respond within 100ms with a 50ms JS budget; 10ms of a 16ms animation
  frame; "For actions that take longer than 50 ms to complete, always provide feedback."
- web.dev, *INP* — ≤200ms good, 200–500ms needs improvement, >500ms poor, at p75 of field data.
- web.dev, *CLS* — ≤0.1 good at p75.
- web.dev, *LCP* — ≤2.5s good at p75.

**Related files in this corpus:** loading-state behaviour, undo, destructive actions and the
optimistic rollback rules in [`interaction-and-states.md`](interaction-and-states.md); durations and
easings in [`motion-craft.md`](motion-craft.md); the Vercel/Geist font-metric override and font
stacks in [`typography.md`](typography.md); virtualisation from the table side in
[`tables-dashboards-data.md`](tables-dashboards-data.md); scroll and list-state restoration in
[`navigation-and-ia.md`](navigation-and-ia.md).

---

## Review pass (2026-09)

Adversarial re-read on 2026-09-10. Live re-probing with Playwright, library evidence read from
package sources and GitHub, four interfaces screenshotted at 1440 and 390 and looked at.

### What reproduced exactly

Everything about **shipped CSS**. Re-read from the live pages and from package sources, unchanged:

| Claim | Verification |
|---|---|
| Airbnb skeleton `span.s15ewrxi`, `rgb(235,235,235)`, `animation-duration: 1.3s` declared but `getAnimations()` empty, 4px text radius | live computed styles at commit + 900ms |
| GitHub PR list: exactly **10** `span.Skeleton.Skeleton--text`, `rgb(246,248,250)`, `animation: none`, `border-radius: 0`, **55×18** | live computed styles at commit + 600ms |
| YouTube `.masthead-skeleton-icon` `rgb(227,227,227)`, `animation: none`, `border-radius: 50%` | live computed styles |
| Tailwind's four fallback overrides — `inter` 107.89/89.79/22.36, `source` 94.19/104.47/28.98, `plexMono` 131.49/77.95/20.91, `ubuntuMono` 109.58/75.75/15.51 | live stylesheet, digit-for-digit |
| Vercel `GeistSans Fallback` 106.28/94.56/27.76; `font-display: block` on Geist Mono, `swap` on Sans | `document.fonts` enumeration |
| react.dev: 38 faces declared, 9 fetched, 9 preloads, **no** metric-matched fallback, CLS 0 | `document.fonts` + network |
| Tailwind `animate-pulse` = `pulse 2s cubic-bezier(.4,0,.6,1) infinite`, `@keyframes pulse { 50% { opacity: .5 } }` | `tailwindlabs/tailwindcss` source, v4.3.3 |
| Radix skeleton = `rt-skeleton-pulse 1000ms infinite alternate-reverse`, `background-color: gray-a3 → gray-a4` | `@radix-ui/themes@3.3.0` source |
| NYT's four layout shifts — ad iframe 1440×8 → 1440×270 at 0.0529, `NYT-BETAMAX-END-SLATE` 8×8 → box, `MAIN#site-content` `{y:462,h:438} → {y:432,h:468}` at 0.0172 | `layout-shift` observer, same elements, same rects |
| react.dev prefetches on `mouseover` before `mousedown`; GitHub prefetches nothing | request log, hover-armed |

### What did not

- **`linear.app` cold load.** Claimed FCP 1,840ms / LCP 3,624ms / 190 script requests / "hero still
  an empty dark rectangle at 1,600ms" / "slowest first paint in the sample". Measured: FCP median
  **468ms** across four runs (448/468/468/552), LCP **1,344ms**, 333 script requests, CLS 0 — and
  screenshots at 1,600ms on both 1440 and 390 show the headline, the subhead and the full product
  screenshot rendered. The file's own Table B recorded 432ms for the same page and contradicted
  Table A without anyone noticing.
  [`imagery-and-illustration.md`](imagery-and-illustration.md) had already independently re-probed
  this hero and described the same rendered screenshot. Corrected in four places; the surviving
  claim ("local-first buys nothing on a page visited once") does not need the bad number.
- **`docs.stripe.com` fonts.** Table E said 0 `@font-face` declared. `document.fonts` holds **40**,
  every one a zero-byte `src: local()` alias across four weights of Segoe UI, Hiragino Sans,
  Hiragino Kaku Gothic ProN, Yu Gothic UI and others. Zero bytes fetched is right; "no font
  strategy" is wrong, and the real strategy — an enumerated per-script system stack — is the more
  useful finding. Corrected and expanded.
- **`nytimes.com` fonts and images.** Table A said 0 font files; it fetches **15**. Said 102 of 134
  undimensioned images; it is now **128 of 128**. Script requests 381, not "—".
- **`docs.stripe.com` script requests:** 43, not 13.
- **Timing numbers drifted within tolerance and were updated**: react.dev prefetch 24 → 32ms after
  hover, its soft nav 62 → 85ms, GitHub's 736 → 830ms, HN FCP 208 → 228ms, tailwindcss.com FCP
  268 → 376ms, stripe docs FCP 616 → 700ms. The 12× GitHub/react.dev navigation gap is ~10×.
- **"`animate-pulse` is 5× the amplitude of anything shipping" is false.** YouTube's own
  `simple-shimmer` swings the same 50% of opacity. The objection is the symmetric 2s curve run on
  every block in phase. Reworded to match
  [`interaction-and-states.md`](interaction-and-states.md), which already said "a *tuned* skeleton".

### Corpus consistency

- **CLS windows.** This file reported NYT 0.0725;
  [`responsive-and-mobile-web.md`](responsive-and-mobile-web.md) reports 0.437 at 1×; today's probe
  reads 0.127. All three are of the same page and none is wrong — CLS accumulates over the
  observation window. Table A now states its window (~6s, no scroll) and says so explicitly, which
  is the rule readers actually need. **Do not compare a CLS number to one whose window you do not
  know.**
- **Virtualisation thresholds.** ~2,000 here vs ~5,000 in
  [`tables-dashboards-data.md`](tables-dashboards-data.md). Different questions — mount cost of a
  list the client already holds, versus whether to send the client the list at all. Scoped in place
  rather than reconciled to one number, because one number would be wrong for one of the two.
- **Radix skeleton, Stripe's 600ms spinner, the 300/400ms guards, Geist font overrides** — agree
  with `interaction-and-states.md` and `typography.md` as written.

### Scope added where a rule produced a worse interface

Three products where following this file as written makes the product worse:

1. **Multi-account treasury console.** "Never swap loaded content for skeletons — keep it at 60%
   opacity" applied to an account switcher leaves Account A's balances under a header reading
   "Account B". Not a stale loading state: a wrong number attached to the right label. Scoped —
   keep-and-dim is for a refetch of the *same* query; a change of subject must clear.
2. **Analytics tool with a cold serverless warm-up.** "Do not animate your skeletons" is drawn from
   three products that all resolve in under a second. A static grey block held for eight seconds
   reads as a failed render and gets reloaded. Scoped by expected wait: flat under ~1s, motion past
   it, determinate indicator past ~3s.
3. **Coding agent streaming a diff.** "Render at 30–60 characters/second" turns a 4,000-character
   diff that arrived in three seconds into ninety seconds of typewriter. The cadence matches reading
   pace; nobody reads a diff along with the stream. Scoped to prose.

Also added, because the file had none of it: **assistive-technology behaviour of loading states** —
`aria-busy` must not inherit the 300ms visual appear-delay, skeletons must be `aria-hidden`,
announce the result rather than the progress, and a colour-only frame-0 acknowledgement is invisible
to a screen reader. And **p95, not p75**, as the statistic that gates whether an indicator exists —
p75 hides exactly the tail a spinner is for.

### Screenshots read

`airbnb.com/s/Tokyo--Japan/homes` (1440), `linear.app` (1440 and 390 at 1,600ms — the evidence that
killed the "empty dark rectangle" claim), `github.com/vercel/next.js/pulls` (1440 at 600ms — the
partial-skeleton claim holds: every row, title and timestamp rendered, only the label chips
deferred). Cached under `.cache/shots/performance-and-perceived-speed-v-*`.

**Still unverified, and marked as such:** Table B's throttled-phone numbers, Table C's interaction
decomposition, Table F's synthetic list benchmark, and the `apple.com` / `vercel.com` /
`airbnb.com` / `github.com` rows of Table A were not re-run in this pass. Table B's `linear.app`
row in particular is now suspect: its desktop baseline was the number that reproduced, so the
throttled figures beside it may or may not still hold.
