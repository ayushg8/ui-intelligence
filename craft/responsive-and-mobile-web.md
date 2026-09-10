# Responsive design and mobile web craft

**Evaluated:** 2026-09

Measured September 2026 against live production UI. Breakpoints were extracted by capturing every
`text/css` response a page loads, plus its inline `<style>` blocks, and tallying every `@media` and
`@container` condition in the shipped bytes. Everything else was read from computed styles and
bounding boxes at real device viewports (`iPhone 14 Pro` = 393x660, `320x568` iPhone SE, `744`,
`1440`). Where a value is inferred rather than read, it says "approx."

**Which numbers here you can quote.** A re-probe on 2026-09-10 (see the adversarial pass at the end)
found they split three ways, not two:

- **Geometry and computed style — heights, paddings, sticky offsets, scroll widths, document
  `scrollWidth` at 320 — reproduced exactly.** Vercel's 78 overflowing elements / 77 `hidden` /
  1 `clip` / 0 leaks came back identical. Quote these.
- **Declaration counts in shipped CSS drift ±20% per load,** because the CSS is code-split and which
  chunks a page pulls depends on route, experiment bucket and what lazy-loads before your snapshot.
  Stripe's `min-640` was 190, then 194; Linear's `max-1024` 66, then 48. Read them as **ratios
  between products**, never as a spec.
- **Timing-derived numbers (LCP, CLS, long tasks) drift badly and one moved 3x.** Re-probe or ignore.

And one whole class of claim that is neither: **which bundle a site serves you.** Spotify at a phone
UA ships a different application than Spotify at 1440 — 0 container queries versus 123. Any count
taken at one viewport describes that build only.

The reason this file exists: responsive is the single most reliable place to detect generated UI.
Not because the mobile view is ugly — because it is *the desktop view with smaller padding*. Real
products do not shrink at a breakpoint. They **change shape**: a three-field search bar becomes one
pill, a sidebar becomes a bottom tab bar, a table becomes a stack of cards, a hover menu becomes a
sheet. The generated version keeps every element in place and reduces `padding: 32px` to
`padding: 16px`, and it reads as a desktop page being punished.

---

## If you only apply five things

1. **Pick breakpoints by opening a browser and dragging.** Find the width where *your* layout breaks,
   and set the breakpoint one pixel there. Stripe ships **two** breakpoints for the entire marketing
   site: 640 and 940 (190 and 100 rule uses; everything else is a rounding error). Apple ships
   **734 / 833 / 1068 / 1440**. Airbnb ships **744 / 1128**. Vercel ships **400 / 600 / 960 / 1200**.
   Not one of these products uses 768/1024 as its primary breakpoint. Those two numbers are Tailwind
   defaults inherited from a 2010 iPad, and reaching for them is the tell.
2. **Reach for `@container`, not `@media`, for anything inside a shell.** Spotify's **desktop** web
   player ships **123 `@container` rules** (re-probed 2026-09-10) against named containers
   (`main-view-grid-area`, `search-item-container`, `below-fold-cards`) because its sidebar is
   user-resizable and viewport width does not predict card width. Vercel ships 105. Set
   `container-type: inline-size` on the wrapper and query the wrapper. (Load `open.spotify.com` with a
   phone UA and you get a different application entirely — **0 container rules**, plain 768/992
   breakpoints, half the CSS. See "when responsive is the wrong answer.")
3. **Never let a mobile input's `font-size` drop below 16px.** Safari zooms the whole viewport when
   you focus a sub-16px field, and it does not zoom back out. Still true in 2026 — it is an
   intentional Apple accessibility behaviour, not a bug awaiting a fix, and it keys off the
   *computed* font-size of the focused control only, so labels and helper text may stay small. Measured on real login forms at 393px:
   Stripe 16px, GitHub 16px, Google 16px, X 17px, Shortcut 16px, Vercel 16px. The one product in the
   sample that ships **15px** — the Supabase dashboard sign-in — zooms on every focus.
4. **`100vh` is a bug on mobile. Use `100svh` for anything that must never be clipped, `100dvh` only
   for things that may resize as you scroll.** On iOS, `vh` resolves to the *large* viewport, so
   `height: 100vh` is taller than the visible area whenever the toolbars are showing and your
   bottom-anchored button sits under them. Vercel uses `svh` 23 times to `dvh`'s 8. Airbnb ships the
   safe pair everywhere: `min-height:100vh; min-height:100dvh`.
5. **Test at 320px with `documentElement.scrollWidth` — twice, at load and after the page settles —
   and clip decorative overflow at the component, never on `body`.** Twelve of the fourteen top
   products measured have **zero** horizontal document overflow at 320x568. The two that leak, both
   re-confirmed 2026-09-10, are the whole lesson:
   - **supabase.com: 339px** in a 320px viewport. The culprit, identified by element: the hero's
     second CTA, `<a>Request a demo</a>`, inside a `div.flex.items-center.gap-2` with
     `flex-wrap: nowrap`. Two buttons that will not wrap. 19px, visible as a clipped button label.
   - **airbnb.com: 482px for the first ~3 seconds, then 320.** A `position: fixed` header laid out at
     482px before hydration corrects it. Reproduced on 3 of 3 cold loads; invisible to any check that
     waits 5s first, and it is the state the user actually lands in.

   `320` is the iPhone SE and the Galaxy S9+; it is a live device, not a museum piece. Note what
   "zero overflow" does *not* mean: at 320px Stripe has **772 elements whose right edge is past the
   viewport** and still `scrollWidth === 320`, because every one of them sits inside an explicit clip
   (467 `overflow:hidden` ancestors, 67 `overflow:clip`, 238 `overflow:auto`). Overflow is normal;
   *unclipped* overflow is the bug.

---

## Measured reference table

### Breakpoints actually shipped (count = number of rule blocks using that condition)

| Product | Direction | Real breakpoints, by usage | Notes |
|---|---|---|---|
| **Stripe** | mobile-first | `min-640` (190), `min-940` (100), `max-639` (40) | Two breakpoints. `min-1264`/`min-1300` appear 4 and 3 times |
| **Apple** | desktop-first | `max-833` (151), `max-734` (56), `max-1068` (46), `max-1023` (25), `min-1441` (12) | Pairs are 734/735, 833/834, 1068/1069, 1440/1441 |
| **Airbnb** | mixed | `744` (32 total), `1128` (19), `950` (11), `1440` (5) | 744 is where their 3-segment search bar fits |
| **Vercel** | both | `max-600` (83), `max-960` (69), `min-601` (35), `min-961` (31), `min-401` (20), `min-1200` (13) | Also 350, 370, 418, 454, 480, 560 for individual components |
| **Linear** | desktop-first | `max-640` (106), `max-1024` (66), `max-768` (54), `max-1280` (19), `max-928` (5) | Tailwind numbers, but authored max-width-down |
| **Notion** | mobile-first | `min-600` (363), `min-840` (361), `min-1080` (329), `min-1280` (202), `min-1440` (192) | Five evenly-loaded tiers — a true multi-tier system |
| **NYT** | mobile-first | `min-740` (79), `min-764` (69), `min-975` (46), `min-1024` (17) | 740 *and* 764: two article layouts 24px apart |
| **Raycast** | mobile-first | `min-720` (161), `min-480` (126), `min-768` (123), `min-1064` (42), `min-840` (39) | |
| **Figma** | mobile-first | `max-299` (120), `min-960` (58), `min-300` (50), `min-240` (40), `min-480` (32) | 240/300 tier is component-level, not page-level |
| **Booking** | mobile-first | `min-1024` (104), `min-576` (92), `min-1280` (79), `max-575` (22) | |
| **Square** | mobile-first | `min-1024` (115), `min-1280` (62), `min-740` (23), `min-1680` (20), `min-320` (11), `min-374` (9) | 374 targets iPhone SE-class |
| **Mercury** | mobile-first | `min-1024` (101), `min-768` (43), `min-1536` (36), `min-1952` (21) | Tailwind + a custom 1952 ultrawide tier |
| **Robinhood** | both | `768/767` (93), `1024/1023` (123), `426/425` (72), `1280/1279` (48) | Tailwind, plus a hand-added 425/426 |
| **Klarna / Supabase / Tailwind site** | mobile-first | 640 / 768 / 1024 / 1280 / 1536 — now shipped as **40 / 48 / 64 / 80 / 96rem** | Unmodified Tailwind defaults |
| **Hacker News** | n/a | `min-796` (1) | One breakpoint. The entire site. 7.4KB of CSS |

**Tailwind v4 breakpoints are in `rem`, and that changes behaviour.** Verified in the shipped bytes of
both tailwindcss.com and supabase.com on 2026-09-10: every default media query is now
`(min-width: 40rem)`, not `(min-width: 640px)`. `rem` in a media query resolves against the
**browser's** root font size, not yours — so a reader who has set their default text to 20px gets
your `md` layout at 960 CSS px, not 768. That is deliberate (layout tiers scale with text) and it is
also a behaviour nobody on your team has seen, because nobody on your team changed their default
font size. If you author breakpoints in `px` and use a Tailwind v4 component, you now have two
systems that disagree for those users. Pick one unit for breakpoints and stay in it.

**The signal:** breakpoint counts are low and the numbers are odd. Stripe runs a global commerce
brand on two. Apple runs the world's most-visited product marketing on four. If your file has six
breakpoints and they are all round numbers ending in 0 or 8, you picked them from a list instead of
from your content.

### Container queries in production

| Product | `@container` rules | `container-type` decls | Named containers | Thresholds observed |
|---|---|---|---|---|
| **Spotify** (desktop build only) | 123 | 15 | `main-view-grid-area`, `search-item-container`, `below-fold-cards` | `width>=600`, `>=778`, `>=1102`, `>952`, `<1200`, `<2304` |
| **Vercel** | 105 | 13 | (unnamed) | 401, 418, 454, 480, 560, 600, 601, 768, 960, 961, 1200 |
| **Notion** | 47 | 19 | style queries: `style(--hero-layout-row:1) and (min-width:800px)` | 600, 800, 840, 900, 1024, 1252, 1392 |
| **Airbnb** | 44 | 1 | `cohost-pdp`, `facepile-overflow`, `banner-grid` | **32, 40, 48, 64**, 256, 270, 300, 325, 357, 366, 370, 535, 620, 744, 950, 1128 |
| **Supabase** | 32 | 2 | — | — |
| **NYT** | 28 | 10 | — | — |
| **Tailwind site** | 27 | 2 | `main` | — |
| **GitHub** | 23 | 10 | `controlbox`, `banner`, `blankslate`, `budget-approvals` | `width<=320`, `<=500`, `<=768`, `>=1280` |
| **Stripe** | 11 | 6 | — | — |
| **Apple / Figma / Raycast / Arc / Robinhood / Klarna** | 0 | 0-10 | — | — |

Airbnb's `facepile-overflow` container queries at **32px, 40px, 48px, 64px** are the clearest proof
of the idea: an avatar stack decides how many faces to show based on its own box, and no viewport
breakpoint could ever express that.

### Mobile inputs at 393px (the 16px rule, verified)

| Product (login form) | Field | `font-size` | Height | Radius | Padding |
|---|---|---|---|---|---|
| Google accounts | text | 16px | **52px** | 4px | 12px 14px |
| Stripe | email | 16px | **44px** | 6px | 8px 12px |
| X (Twitter) | text | 17px | 41px | 0 | 0 |
| GitHub | text / password | 16px | 40px | 6px | 5px 12px |
| Vercel | email | 16px | 40px | 0 | 0 12px |
| Shortcut | text / password | 16px | 38px | 4px | 8px 10px |
| Mercury (marketing) | email | 16px | 38px | — | — |
| **Supabase dashboard** | email / password | **15px** | 34px | 6px | 8px 12px |

### Primary CTA / nav item heights at 393px

| Product | Mobile primary button | Mobile nav bar | Nav item height |
|---|---|---|---|
| Google | 48px | — | — |
| Notion | 48px | — | — |
| Apple | median 48px (range 33-53) | 48px globalnav + **48px** sticky localnav (re-measured at 320, 2026-09-10) | 34px |
| Stripe | 44px | — | — |
| Linear | 44px | 65px fixed header | 44px |
| Supabase | 42px | — | — |
| Vercel | 40px | 64px sticky header | 40px |
| GitHub | 40px | — | — |
| Airbnb | 40px median | 68px sticky + fixed bottom tab bar (`padding-bottom: 60px`) | 40px |

### Viewport-unit strategy

| Product | `dvh` | `svh` | `lvh` | `vh` | Shipped pattern |
|---|---|---|---|---|---|
| **Airbnb** | 42 | 8 | 1 | 158 | `min-height:100vh; min-height:100dvh` (paired fallback), plus a legacy `--vh` JS var still in the sheet |
| **GitHub** | 46 | 0 | 0 | 118 | `dvh` only |
| **Tailwind site** | 28 | 13 | 11 | 11 | ships all three as utilities |
| **Vercel** | 8 | **23** | 0 | 56 | `height: min(840px, 100svh)`, `min-height: min(calc(100svh - var(--header-height)), 1100px)` |
| **Supabase** | 16 | 14 | 0 | 61 | |
| **Mercury** | 9 | 4 | **14** | 24 | one of the few products using `lvh` deliberately |
| **Linear** | 6 | 3 | 0 | 12 | `--dvh: 1dvh` then `calc(100 * var(--dvh))` — a JS-overridable indirection |
| **Apple** | 4 | 0 | 0 | 16 | `height: calc(100dvh - var(--globalnav-preceding-element-height, 0px))`; also `transform: translateY(calc(100dvh - 100vh))` to measure the toolbar delta |
| **Stripe** | 2 | 2 | 3 | 4 | barely uses viewport height at all |

### Safe-area usage (`env(safe-area-inset-*)` declarations)

| Product | Uses | `viewport-fit=cover`? |
|---|---|---|
| **Airbnb** | 79 | yes |
| **Apple** | 31 | yes |
| **NYT** | 10 | no |
| **Supabase** | 4 | no |
| **Linear** | 2 | yes |
| **Stripe, Vercel, Tailwind, Mercury, Shopify, Booking, Square, Klarna, Spotify, Figma, Raycast** | 0 | mixed |

Zero is the correct answer for a page with no fixed bottom bar and no full-bleed edge content. Apple
and Airbnb need it because both ship persistent bottom chrome.

### Mobile-craft declarations actually shipped (counts in production CSS, iPhone 14 Pro load)

| Product | `aspect-ratio` | `text-size-adjust` | `-webkit-tap-highlight-color` | `touch-action` | `overflow-wrap` / `word-break` | `scroll-margin` / `-padding` | `content-visibility` | `min-width:0` |
|---|---|---|---|---|---|---|---|---|
| **Vercel** | **108** | 6 | 3 (`transparent`, `#0000`) | 7 | 10 / 12 | **20** / 2 | 3 | 13 |
| **Airbnb** | **80** | 3 | 2 | 8 | 7 / 11 | 9 / **18** | **8** | 10 |
| **Stripe** | 53 | 3 | 0 (keeps the default) | 3 | 1 / 1 | 6 / 2 | 2 | 8 |
| **GitHub** | 20 | 0 | 0 | 0 | 4 / 0 | 3 / 0 | 0 | 9 |
| **Notion** | 12 | 2 | 0 | 1 | 0 / 1 (+22 `hyphens`) | 0 / 2 | 1 | 8 |
| **Apple** | 0 | 4 | 4 | 0 | 0 / 0 | 0 / 0 | 0 | 0 |
| **Linear** | **1** | 0 | 2 | 4 | 4 / 0 | 0 / 0 | 0 | 3 |

Counts are from a single homepage load at 393px (Linear's 62KB and Apple's 245KB are marketing-page
sheets, not the logged-in app), so read them as ratios between products, not as totals for the
codebase.

Read that table as a checklist of things nobody thinks to write. `aspect-ratio` at 108 uses is Vercel
saying "no image on this site will ever shift the layout." Linear at 1 use is a product whose
marketing page is mostly type and whose app is behind a login. Neither is wrong; the difference is
image density, and it tells you which lever matters for *your* page.

Literal values worth copying:

```
text-size-adjust: 100%;                     /* Apple, Stripe, Airbnb, Vercel, Notion, GitHub, Tailwind — universal */
touch-action: pan-x pan-y pinch-zoom;       /* Vercel — kills the tap delay, KEEPS pinch-zoom     */
touch-action: pan-x pan-y;                  /* Stripe — same, minus zoom; use only on a canvas    */
overflow-wrap: anywhere;                    /* Airbnb — the one that actually breaks a long token */
word-break: keep-all;                       /* Airbnb — CJK: do NOT break mid-word                */
overscroll-behavior-inline: contain;        /* Airbnb — stops swipe-back on a horizontal rail     */
content-visibility: auto;
contain-intrinsic-size: calc(var(--vw) - 48px) 100px;   /* Airbnb — skip offscreen card paint     */
```

### Main-thread cost on a mid-tier phone (Pixel 5 profile, cold load, 6x CPU throttle)

`6x` approximates a mid-range Android against this Mac. `longTaskMs` is total time the main thread
was blocked for >50ms — the thing that makes a tap feel dead.

Captured 2026-09-09, one cold sample each. **These are the volatile kind of number** — quote the
shape, re-probe the digits, and use
[`performance-and-perceived-speed.md`](performance-and-perceived-speed.md) for anything current. Five
rows, chosen because each carries one of the three lessons below:

| Site | LCP 1x → 6x | Long tasks 1x → 6x | Total blocked (6x) | Longest single task (6x) | CLS (6x) | JS heap |
|---|---|---|---|---|---|---|
| **Hacker News** | 192 → **280 ms** | 0 → 1 | **91 ms** | 91 ms | 0 | 9.5 MB |
| **Apple** | 292 → **700 ms** | 0 → 5 | **391 ms** | 108 ms | 0 | 9.5 MB |
| **Airbnb** | 1,020 → **3,344 ms** | 0 → 22 | 3,388 ms | 359 ms | 0.019 | 16 MB |
| **Stripe** | 544 → 740 ms | 3 → 18 | **4,625 ms** | **1,073 ms** | 0 | 40 MB |
| **NYT** | 2,800 → **15,676 ms** | 4 → 43 | **11,374 ms** | **2,220 ms** | **0.474** | 125 MB |

Three things fall out of this and they are the whole mobile performance story:

- **The gap between the best and worst is 56x on LCP** (280ms vs 15.7s) and both are shipped by
  companies with money. It is a choice, made in the bundle.
- **Fast paint does not mean responsive.** Stripe's LCP at 6x is 740ms — third best in the table —
  and it still blocks the main thread for 4.6 seconds afterward, including one unbroken 1,073ms task.
  Every tap in that window does nothing. Measure `longtask`, not just LCP.
- **CLS only appears under throttle.** NYT is 0.437 at 1x and 0.474 at 6x; Airbnb is 0.000 at 1x and
  0.019 at 6x. If you test layout stability on a fast machine you will measure zero and ship shift.

How volatile: `linear.app`'s 1× LCP was 3,556ms in the first pass and **1,344ms** a day later. The
four rows cut from this table in the 2026-09 adversarial pass (Vercel, Notion, Linear, Figma) were
cut for that reason — they carried no lesson the remaining five do not, and their digits were already
moving. Nothing in this file's advice depended on them.

Note also that the CLS figures in this table and the ones in
[`performance-and-perceived-speed.md`](performance-and-perceived-speed.md) §Table A are of the same
pages and do not match — 0.437 here vs 0.127 there for NYT. Neither is wrong: **CLS accumulates over
the observation window**, and this table observes longer and scrolls. A CLS number without its
window is not comparable to any other CLS number.

```js
// paste this in the console on a throttled device profile — it is the whole audit
new PerformanceObserver(l => l.getEntries().forEach(e =>
  console.log('BLOCKED', Math.round(e.duration), 'ms'))).observe({type:'longtask', buffered:true});
```

### Payload on a mobile connection (uncompressed bytes over the wire, `iPhone 14 Pro` emulation)

| Site | JS | CSS | Images | Total | Requests | `srcset` coverage | `<source media>` |
|---|---|---|---|---|---|---|---|
| **Apple** | 848 KB | 50 KB | 189 KB | **2.1 MB** | **41** | 0/12 | 18 |
| **Stripe** | 2.07 MB | 60 KB | 770 KB | 3.6 MB | 175 | **42/44** (43 lazy) | 5 |
| **Airbnb** | 2.34 MB | 316 KB | 1.85 MB | 5.1 MB | 169 | 0/41 | **96** |
| **Vercel** | 3.96 MB | 936 KB | 45 KB | 6.1 MB | 116 | 14/19 | 0 |
| **Linear** | 3.91 MB | 445 KB | 97 KB | 7.6 MB | **422** | 0/39 | 0 |
| **NYT** | 5.58 MB | 120 KB | 864 KB | **14.8 MB** | **557** | 20/24 | 23 |

Apple's homepage is 41 requests. It is also, visually, the most elaborate page in the table. The
constraint is a choice.

### Real device viewports (Playwright device registry, portrait)

| CSS width | Height | DPR | Device |
|---|---|---|---|
| **320** | 568 | 2 | iPhone SE |
| **320** | 658 | **4.5** | Galaxy S9+ |
| 360 | 780 | 3 | Galaxy S24 |
| 360 | 640 | 3 | Nexus 5 |
| 390 | 664 | 3 | iPhone 12 / 13 / 14 |
| **393** | 660 | 3 | iPhone 14 Pro |
| 393 | 727 | 2.75 | Pixel 5 |
| 412 | 839 | 2.625 | Pixel 7 |
| 430 | 740 | 3 | iPhone 14 Pro Max |
| 640 | 1024 | 2.5 | Galaxy Tab S9 |
| 656 | 944 | 2.5 | iPad (gen 11) |
| 768 | 1024 | 2 | iPad Mini / gen 5 / gen 6 |
| 810 | 1080 | 2 | iPad (gen 7) |
| 834 | 1194 | 2 | iPad Pro 11 |

Note the iPhone 14 Pro row: the device is 393x852 points, and the usable viewport is **660px**. About
**192px — 22% of the screen — is browser chrome.** That is the whole reason `dvh` exists, and the
reason a "full screen" hero designed at 852 will have its call to action below the fold on the actual
phone.

---

## Decision: what breakpoints do I pick?

**Do not start from a device list.** Start from the layout. Open the page at 1440 and drag the window
narrower. There are exactly three kinds of moment worth a breakpoint:

1. **A multi-column grid runs out of room** — cards drop below their minimum readable width.
2. **A horizontal control cannot fit its parts** — a 3-segment search bar, a toolbar, a tab strip.
3. **Prose exceeds or falls below its measure** — the column is over 86ch or under 45ch.

The width where that happens is your breakpoint. Airbnb's 744 is not "iPad" — it is the width where
`Where | When | Who` plus a search button stops being cramped. Measured at 744, Airbnb serves the
full three-segment desktop search bar and **no bottom tab bar**; at 320 it serves a single
"Start your search" pill plus a native-style bottom tab bar. The 744 number is load-bearing for that
one component and Airbnb built the tier around it.

**Concrete default if you genuinely have no content signal yet:**

```css
/* mobile-first; every value is a place a real product breaks */
/* base: 320-599   one column, no chrome              */
@media (min-width: 600px)  { /* two columns appear; 600 is Vercel's and Notion's first tier */ }
@media (min-width: 960px)  { /* sidebar + content; Stripe uses 940, Vercel 961, Figma 960  */ }
@media (min-width: 1280px) { /* wide content, third column                                  */ }
```

Three breakpoints. Then *delete any of them that your layout does not actually need*, and *add* the
odd one your content demands (Vercel's 418, NYT's 764, Airbnb's 744).

**Mobile-first or desktop-first?** Both ship. Stripe, Notion, Raycast, Booking, Square and Mercury
author `min-width` up. Apple, Linear and Vercel author `max-width` down. The rule that matters:
**pick one and do not mix them in the same component.** A component with `min-width: 768` in one rule
and `max-width: 767` in another has two sources of truth and will disagree at exactly 767.5px on a
2.625 DPR Pixel. Note that everyone who authors desktop-first uses `max-width: 640` and
`min-width: 641`, one pixel apart, never both at 640.

**Do not name breakpoints after devices.** `--bp-tablet` guarantees someone will eventually ask "is a
Galaxy Tab S9 at 640px a tablet?" (it is; it is also narrower than an iPad Mini and narrower than a
lot of phones in landscape). Name them after what the layout does: `--bp-two-col`, `--bp-sidebar`.

---

## Decision: `@media` or `@container`?

**Default to `@container` for any component that could appear in more than one context.** A card that
lives in a 1200px feed, a 320px sidebar, and a 640px modal has three widths at one viewport width.
`@media` cannot see that. This is not future tech — Spotify ships 120 container rules, Vercel 105,
Notion 47.

```css
.card-grid { container-type: inline-size; container-name: results; }

@container results (min-width: 480px) {
  .card { grid-template-columns: 96px 1fr; }   /* thumbnail beside text */
}
```

Reserve `@media` for three things, and only three:

- **Page chrome** — where the sidebar goes, whether there is a bottom tab bar, gutters.
- **Capability** — `(any-hover: hover)`, `(pointer: coarse)`, `(prefers-reduced-motion)`.
- **Viewport height** — see the landscape section.

Two mechanics that catch people:

- `container-type: inline-size` establishes containment on the *inline* axis only, which is what you
  want 95% of the time. `container-type: size` requires the element to have an explicit height or it
  collapses. Vercel ships 12 `inline-size` and exactly one `size`.
- **A container cannot query itself.** The wrapper carries `container-type`; its children carry the
  `@container` rules. Putting both on one element silently does nothing.

Style queries are real and shipping: Notion uses
`@container style(--hero-layout-row: 1) and (min-width: 800px)` five times. That is a component
reading a custom property set by an ancestor — layout variants without a class-name explosion.

---

## Decision: how does this component change shape?

A layout does not "become responsive." Each component picks one of these transforms. Name the
transform before you write CSS.

**1. Reflow (columns → rows).** The only one AI reliably gets right. `grid-template-columns:
repeat(auto-fit, minmax(280px, 1fr))` covers most of it. Note `auto-fit` collapses empty tracks and
`auto-fill` keeps them; measured usage is nearly even (Airbnb 4/4, Mercury 9/0, Spotify 0/8), so pick
by whether you want a lone card to stretch full width (`auto-fit`) or stay card-sized (`auto-fill`).

**2. Reveal-and-collapse.** The desktop shows everything; mobile shows the top N and a "Show more."
Airbnb's destination grid at 744 shows 12 cities in 2 columns with `Show more ⌄`; at 320 it is one
column of the same list. Same DOM, different disclosure.

**3. Absorb into a trigger.** A row of controls becomes one button that opens a sheet. Airbnb's
three-field search bar (Where / When / Who, 1300px wide) becomes a single 300px pill reading
"Start your search." **This is the transform generated UI never does**, and it is the highest-value
one: it converts a horizontal-space problem into a vertical-space problem, which mobile has plenty of.

**4. Horizontal scroll with peek.** A row that keeps its shape and scrolls, with the next item
deliberately cut off at the right edge so the scroll is discoverable. Airbnb's listing carousels at
320px cut the third card mid-image; its category tab strip at 744 fades out under a chevron. Add
`scroll-snap-type: x mandatory` on the rail and `scroll-snap-align: start` on items.
Measured `scroll-snap-type` usage: Airbnb 14, NYT 13, Stripe 6, Notion 6.

**5. Drill-down.** A master-detail split at 1440 becomes two full-screen views with a back button at
393. Correct for email, chat, file browsers, and any list where the detail is itself a full task.

**6. Swap the component entirely.** Different DOM, different behavior. A desktop date-range picker
with two visible months becomes a native `<input type="date">` or a one-month scroller.

**Do not use `display: none` to build transform 6 at scale.** Shipping both trees means shipping both
bundles, and every accessibility tree, every form field, and every analytics event exists twice.
Below roughly one component per page it is fine; above that, branch at the component boundary in
your framework.

---

## Decision: what do I do with this table?

A dense table cannot shrink. 8 columns at 320px is 40px per column. Pick one of six, by the reader's
task. Every one below was verified against a live product at 320 or 390 on 2026-09-10; where a
pattern is in this list because it is *right* rather than because it is *common*, it says so.

**A. Horizontal scroll inside a bounded container, first column sticky.** Correct when the reader is
comparing rows and every column matters (financial statements, spec sheets, log tables). **This is by
far the most-shipped answer** — of the production tables probed for this pass, A and B accounted for
all of them.

Verified in the wild:

| Product @390 | Shipped mechanics |
|---|---|
| **CoinMarketCap** | `<table>` in an `overflow-x: scroll` wrapper (client 358 → scroll 371); first cell `position: sticky; left: 0; background: #fff`; **and `thead th` `position: sticky; top: 0`** — pinned on *both* axes; 12px cells |
| **GitHub → branches** | `role="table"` with flex cells in an `overflow-x: auto` wrapper, 358 → **806** at 390. Same product, different table, different answer than its file list (B, below) |
| **Tailwind docs** | `display: grid` table in a 358px `overflow-x: auto` parent, scrolling to 738 |

Two-axis pinning is the part most implementations miss and CoinMarketCap gets right: on a phone you
lose the header row after two scrolls of a 40-row table, and a pinned first column without a pinned
header just tells you *which* row you are lost in.

```css
.table-wrap { overflow-x: auto; overscroll-behavior-x: contain; }
.table-wrap table { min-width: max-content; }        /* stop the browser squeezing cells */
th:first-child, td:first-child {
  position: sticky; left: 0; z-index: 1;
  background: var(--bg);                              /* required — sticky cells are transparent */
  box-shadow: 1px 0 0 var(--border);                  /* the seam that says "this is pinned"     */
}
```

Measured: Tailwind's docs `font-size` table is a `display: grid` table in a 358px `overflow-x: auto`
parent, scrolling to 738px — **and the cell padding (`10px 8px`) and cell font (14px) are identical at
390, 744 and 1440** (re-measured 2026-09-10; the values were 8px/12px in the first pass, the
*invariance* is the durable part). They did not make it denser for mobile or looser for desktop. The
container scrolls; the table is the table. That is the whole trick and it costs four lines of CSS.

**A-variant: two tables, one frozen.** Instead of `position: sticky` cells, split the table in half in
the DOM: a narrow label table that does not scroll, beside a wide data table that does. ESPN's NBA
standings at **320** ships exactly this — a **136px** single-column team table next to a **543px**
13-column stats table inside a **254px** `overflow-x: auto` scroller, with the next column deliberately
clipped at the right edge as the peek. It also does the content half of the transform: team names
become three-letter codes so the frozen column can be 136px at all.

Why anyone still does this in 2026: sticky cells inside a horizontal scroller are the buggiest thing
in mobile CSS — borders drop, shadows tear, and iOS repaints them late. Two tables cannot desync.
**The cost is real and you must decide it is acceptable:** a screen reader now reads two unrelated
tables, and the association between "DET" and "60-22" exists only visually. If the data matters to
non-visual users, pay the sticky-cell tax instead, or provide the same data as a definition list
(pattern D).

Two things that break this and are easy to miss: `overscroll-behavior-x: contain` prevents the swipe
from triggering browser back-navigation once the rail hits its end (Airbnb ships
`overscroll-behavior-inline: contain` for exactly this), and the container needs a visible edge
treatment or nobody knows to scroll — a right-edge mask-image gradient or a partially clipped column.

**B. Priority columns.** Keep 2-3 columns, drop the rest (optionally behind a per-row expander).
Correct when one column is the answer and the others are supporting detail. This is a *product*
decision, not a CSS one: someone has to rank the columns.

Verified: GitHub's repository file list. At 1440 the row is name / commit message / date, 904px wide.
At 390 the commit-message cell is `display: none` and a **different, narrower name cell** takes over
(GitHub ships both and toggles them), leaving name + date in 358px with no scroll at all. Four cells
in the DOM, two rendered. Column-level `display: none` is fine — it is *component*-level duplication
the file warns about, not cell-level.

**C. Card transform.** Each row becomes a stacked block: primary value large, label/value pairs
beneath. Correct when rows are read one at a time, not compared. **The mistake here is repeating the
column header on every card** — 40 rows × 8 labels is 320 redundant strings. Show labels only for
the values that are ambiguous without them.

*Honesty about this one:* it is the pattern most written about and the one this pass could not find
shipping on any public table it probed (CoinMarketCap, ESPN, GitHub ×2, Tailwind docs, Wikipedia,
AWS pricing). Real products either scroll (A) or drop columns (B). Card transform is still right when
rows are genuinely read one at a time — an order history, a transaction list — but if you are
reaching for it on a table people *compare*, you are choosing the pattern with the best blog posts
rather than the one the task needs.

**D. Not a table at all.** Stripe's API reference has **zero `<table>` elements** on the Charge object
page — verified again 2026-09-10. The parameter list is a definition-style stack: name (mono), type
(gray), description below. It reads identically at 320 and at 1440 because it was never a grid. If
your "table" is really key/value documentation, this is the answer and it is free.

**E. Switch the column, don't scroll it.** Keep 2-3 columns and put the rest behind a chip row that
swaps which one is shown. Correct when the reader wants **one variable across many rows** — the
opposite of A's "every column matters."

Verified: weather.com's hourly forecast at 390. The table is Time / Sky / [metric], and a horizontal
chip row — `Temperature · Feels Like · Precipitation · Wind …` — selects the third column. Twelve
columns of data, three columns of layout, no horizontal scroll, and the reader never loses the row
labels. A 12-column table where each column is the same *kind* of thing is nearly always this pattern
rather than A.

**F. Show two, let them choose which two.** For comparison tables — where the *columns* are the
records — cut to the number that fits and put a picker in each column header.

Verified: apple.com/iphone/compare at 390 renders exactly **two** product columns, each headed by a
dropdown that swaps which product occupies that slot. Desktop shows four. Nobody scrolls, nobody
drops information, and the comparison stays a comparison — which A would destroy, because comparing
two things you cannot see at once is not comparing.

**Never** use `display: block` on `<tr>`/`<td>` with `::before { content: attr(data-label) }`. It
destroys the accessibility tree — screen readers lose the table semantics entirely — and it produces
the label-repetition problem in its worst form.

---

## Decision: how big is this touch target?

Apple's HIG says 44x44pt. Material says 48x48dp. Both are correct and both are widely ignored, on
purpose. Measured mobile primary buttons cluster at **40-48px**, median 44 — but 41% of Apple's
homepage targets and 52% of Airbnb's are *under* 44px, and neither product is hard to use. Measured
at **320px** across five homepages on 2026-09-10: Stripe median 21px (135 of 181 under 44), Vercel
24px (119/132), GitHub 26px (130/176), Apple 28px (107/123), Airbnb 40px (24/47). Every one of them
ships a median target under 44px. It works because those items are chip labels, nav links and text
links inside larger padded rows; the *hit area*, not the painted box, is what clears 44. (The
per-page counts move with what is in the DOM — a cookie modal alone changes them — so read the
pattern, not the digits.)

The sharpest instance is Apple's own: on `apple.com/macbook-pro` at 320 the persistent blue **Buy**
pill in the sticky localnav paints at **24 x 45px with 12px type**. Apple, whose HIG says 44x44,
ships a 24px-tall primary CTA — and it is still the easiest thing on the page to hit, because the
44px belongs to the padded link box around it.

The resolution is that **44px is a hit-area minimum, not a paint minimum.** Linear's shipped pattern,
found on their interactive controls:

```css
.control { position: relative; }
.control::after {                       /* invisible hit expander */
  content: ""; position: absolute;
  left: 50%; top: 50%; transform: translate(-50%, -50%);
  width:  max(100%, 2.75rem);           /* 2.75rem = 44px */
  height: max(100%, 2.75rem);
  touch-action: inherit;
}
```

The visible control can be a 20px icon or a 4px slider track; the finger gets 44px. Linear also
ships `--moreHitArea-inset: -24px -8px` on a 7px-tall slider and `-12px -2px` on a 4px one — the same
idea via negative inset.

Rules that follow:

- **Spacing between targets matters more than target size.** Two 32px buttons with 12px between them
  are more reliably tappable than two 44px buttons that touch. Give adjacent targets at least 8px of
  gap, and never let two hit expanders overlap (the one later in the DOM wins, silently).
- **Targets in the bottom 20% of the screen need to be bigger,** because that is thumb-reach territory
  and the aim error is larger. Airbnb's bottom tab bar is the shipped example: 125px of nav for three
  destinations.
- **Exceptions where under-44 is right:** inline text links inside prose (making these 44px would
  double-space your paragraphs — Linear's marketing page median target height is 14px because it is
  mostly prose links); dense data grids where the row itself is the target and the row is 44px+;
  destructive actions you deliberately want to be slightly harder to hit.

---

## Decision: this design depends on hover. Now what?

Most desktop interfaces have at least one affordance that exists only on hover: a row's action menu,
a delete button, a tooltip, a "copy" icon. On touch there is no hover, and the first tap is
either the hover or the click — the browser guesses.

**Gate hover styling, never hover *content*.**

```css
@media (any-hover: hover) {
  .row:hover .row-actions { opacity: 1; }
}
```

Measured: Linear ships `@media (any-hover: hover)` **83 times** and
`(any-hover: hover) and (any-pointer: fine)` 36 times. They use `any-hover`, not `hover` — and that
is the right call. `hover` reports the *primary* pointer; `any-hover` reports whether *any* attached
pointer can hover. A Surface with a trackpad, an iPad with a Magic Keyboard, and a touchscreen laptop
all report `hover: none` while having a perfectly good mouse plugged in. Stripe uses plain
`(hover: hover)` 3 times and pairs it with `pointer: fine`. GitHub goes the other direction with 18
`(pointer: coarse)` blocks that *add* affordances rather than subtracting them.

Replacements, by what the hover was doing:

| Hover was… | Touch replacement |
|---|---|
| Revealing row actions | Always-visible overflow `⋯` button, or long-press → context sheet |
| A tooltip explaining an icon | Put the label next to the icon; there is vertical room |
| A dropdown menu on a nav item | Tap opens it; the first tap must not also navigate |
| Preview on hover (link cards) | Nothing. Drop it. Do not fake it with a tap-to-preview that eats the tap |
| Showing a delete/edit affordance | Swipe-to-reveal, or a selection mode |

**The trap:** `:hover` styles on touch devices are *sticky*. Tap a card with a `:hover { transform:
scale(1.02) }` and it stays scaled until you tap elsewhere. Gate every hover transform behind
`any-hover`, and never use `:hover` to communicate state that matters.

---

## Decision: how tall is "full screen"?

There are four viewport-height units and they mean different things when the iOS toolbars slide.

| Unit | Resolves to | Changes as you scroll? | Use it for |
|---|---|---|---|
| `vh` | **large** viewport (toolbars hidden) | no | almost nothing on mobile |
| `lvh` | large viewport | no | backgrounds/decoration that should cover under the toolbars |
| `svh` | **small** viewport (toolbars visible) | no | anything that must always be fully visible |
| `dvh` | current viewport | **yes, constantly** | a scroll container that should fill remaining space |

All four have been Baseline Widely Available since June 2025, so the `min-height:100vh; min-height:100dvh`
paired fallback Airbnb still ships is now legacy support, not a correctness requirement. Write the
unit you mean.

**`height: 100vh` is the single most common mobile bug in generated UI**, and it is subtle: it does
not look broken on desktop, and it does not look broken in a Chrome device-emulator either, because
neither has a collapsing toolbar. On a real iPhone it produces a hero whose CTA sits under the
Safari toolbar and a modal whose Save button is unreachable.

```css
/* full-height hero: nothing gets clipped, nothing jumps */
.hero { min-height: 100svh; }

/* app shell: fill what's actually there right now */
.app { height: 100dvh; }

/* if a stable full-bleed background is what you want */
.backdrop { height: 100lvh; }
```

**Do not use `dvh` for anything that contains laid-out content on a scrolling page.** `dvh` updates
on every toolbar transition, so a `min-height: 100dvh` section reflows mid-scroll and content
visibly shifts. That is why Vercel ships 23 `svh` to 8 `dvh`, and why Linear indirects through a
custom property (`--dvh: 1dvh`, then `calc(100 * var(--dvh))`) so JS can freeze the value:

```js
// freeze the height at load so toolbar transitions don't reflow the page
const setDvh = () => document.documentElement.style
  .setProperty('--dvh', `${window.innerHeight / 100}px`);
setDvh();
window.addEventListener('orientationchange', setDvh);   // NOT 'resize'
```

Listening to `resize` reintroduces the jank you were avoiding, because the on-screen keyboard fires
it too.

Apple's trick for measuring the toolbar height in pure CSS is worth stealing:
`transform: translateY(calc(100dvh - 100vh))` yields exactly the current chrome offset, negative,
with no JS.

**iOS 26 changed the ground under this and Apple documented none of it for the web.** Since the
Liquid Glass redesign, Safari's controls float *over* the page rather than sitting above it, and the
consistent developer reports through 2026 are: `viewport-fit=cover` is now what buys you a
transparent bottom bar (without it you get an opaque fallback strip); a fixed or sticky element that
carries its own `background-color` or `backdrop-filter` interacts badly with the floating tab bar and
should put those on an absolutely-positioned child instead; and a full-screen overlay's dimming no
longer necessarily covers the browser chrome. **None of this is reproducible in Chromium device
emulation — including everything in this file that depends on a collapsing toolbar — so treat it as a
"test on a real iOS 26 device" flag rather than a rule.** The durable advice is unchanged: `svh` for
what must always be visible, `dvh` only for scroll containers, and never `vh`.

---

## Decision: safe areas and `env()`

`env(safe-area-inset-*)` returns `0` unless the viewport meta says `viewport-fit=cover`. Measured:
Stripe, Linear, Apple, Airbnb, Robinhood and Square all set it; Vercel, Tailwind, Notion, Mercury and
Shopify do not.

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

Then there are two shapes, and choosing the wrong one is the actual craft:

```css
/* max() — "at least my normal padding, more if the notch demands it" */
.page { padding-inline: max(22px, env(safe-area-inset-left)); }

/* calc() — "my normal padding, PLUS clearance for the home indicator" */
.bottom-bar { padding-bottom: calc(11px + env(safe-area-inset-bottom)); }
```

Apple ships both, and the split is principled. Horizontal insets use `max()` because the notch cutout
*replaces* the gutter — landscape iPhone already has 44px of unusable edge and adding your 22px on
top of it produces a 66px gutter. Bottom insets use `calc()` because the home indicator *sits on top
of* your content: you want your padding plus its clearance. Apple's shipped rules, verbatim:

```
padding-inline-start: max(22px, env(safe-area-inset-left));
padding-bottom: calc(11px + env(safe-area-inset-bottom));
padding-bottom: max(11px, env(safe-area-inset-bottom));      /* also used, on chromeless bars */
```

Airbnb goes further and layers the insets into design tokens so floating elements clear *both* the
home indicator and their own tab bar:

```
--dls-toast_bottom: calc(env(safe-area-inset-bottom) + 80px);        /* above the 80px tab bar */
--dls-toast_top:    calc(env(safe-area-inset-top) + 80px + 16px);
padding: 24px 24px calc(34px + env(safe-area-inset-bottom)) 24px;    /* bottom sheet          */
```

**RTL:** both Apple and Airbnb flip the insets in their RTL blocks
(`--safe-area-inset-start: env(safe-area-inset-right, 0)`). `env()` is physical, not logical, so a
naive `padding-inline-start: env(safe-area-inset-left)` pads the wrong edge in Arabic or Hebrew.

**When you need none of this:** a page with no fixed bottom bar, no full-bleed edge-to-edge imagery,
and no `viewport-fit=cover`. Eleven of the products measured ship zero `env()` calls. Adding
safe-area padding to a normal scrolling page does nothing except add unexplained bottom space on
desktop.

---

## Decision: forms and the keyboard

- **`font-size: 16px` minimum on every focusable input, textarea and select.** Non-negotiable on iOS.
  If your design system's input is 14px, override it at mobile widths rather than shipping the zoom.
  Do **not** solve this with `maximum-scale=1` in the viewport meta — that disables pinch-zoom for
  everyone, which is a real accessibility failure. Measured viewport metas: **Vercel, Spotify and
  Airbnb all ship `maximum-scale=1`** (Airbnb's full string is
  `width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover`) — three good products
  getting the same thing wrong. For contrast, GitHub ships bare `width=device-width` with no
  `initial-scale` at all, and Apple, Stripe and Linear ship the correct
  `width=device-width, initial-scale=1[, viewport-fit=cover]`. Linear additionally sets
  `height=device-height`, which is legacy and does nothing you want.
- **The keyboard covers roughly the bottom 40% of the screen and does not resize the layout on iOS
  Safari** (it resizes `visualViewport`, not the layout viewport). A submit button positioned with
  `position: fixed; bottom: 0` sits *underneath* the keyboard. Two fixes: put the submit inline at
  the end of the form so scrolling reaches it, or drive the fixed bar off `visualViewport`:

  ```js
  const vv = window.visualViewport;
  vv?.addEventListener('resize', () => {
    const overlap = window.innerHeight - vv.height - vv.offsetTop;
    document.documentElement.style.setProperty('--kb', `${Math.max(0, overlap)}px`);
  });
  /* .action-bar { bottom: calc(var(--kb, 0px) + env(safe-area-inset-bottom)); } */
  ```
  On Chrome/Android, `interactive-widget=resizes-content` in the viewport meta does this for you.
  **WebKit has still not implemented it** (bugs.webkit.org 259770, open as of 2026-09), so on iOS the
  `visualViewport` listener above is not a polyfill you can delete later this year — it is the
  implementation.
- **Set `inputmode` and `autocomplete` on every field.** `inputmode="numeric"` for a PIN,
  `inputmode="decimal"` for money, `type="email"` for email. It costs nothing and changes which
  keyboard appears. Measured: real login forms ship `autocomplete="current-password"`,
  `autocomplete="username webauthn"` (Google, X) — and *none* of the eight forms measured set
  `inputmode`. There is free ground here.
- **Never `autofocus` a field on mobile.** The keyboard flies up over the content before the user has
  read the page.
- **Input height 38-52px, radius 4-6px.** Measured range across eight production login forms; Google
  is the outlier at 52px because the form is the entire page.

---

## Decision: mobile navigation

The hamburger is not automatically wrong. It is wrong when it is the *only* thing left.

**What Apple actually ships at 320px** (re-measured on `apple.com/macbook-pro`, 2026-09-10): a 48px
global bar with logo, search, bag and a hamburger — *plus* a second **48px sticky "localnav"** bar
underneath carrying the product name as a dropdown and a persistent blue **Buy** pill (24 x 45px,
12px type). The hamburger hides site-wide navigation. The one action that matters stays on screen,
always. That is the pattern: **hide the map, keep the destination.**

Note the scope: this is a *product page* pattern. `apple.com` itself at 320 ships the 48px global bar
and nothing else, because the homepage has no single destination to keep. Do not copy the localnav
onto a page that has no one action.

**What Airbnb ships at 320px:** a fixed bottom tab bar (Explore / Wishlists / Log in) and a collapsed
search pill. No hamburger at all. At **744** the tab bar disappears and the desktop nav returns.

**What Stripe ships in docs at 320px:** the sidebar becomes a `CHARGES ⌄` dropdown in the header — a
scoped context switcher, not a drawer. You still know where you are.

Choose by count of top-level destinations:

| Destinations | Pattern |
|---|---|
| 2-5, used constantly | **Bottom tab bar.** Thumb-reachable; the top of a 660px viewport is not |
| 2-5, used occasionally | Horizontally scrolling top tab strip with a peek/fade at the right edge |
| 6+, hierarchical | Drawer or full-screen menu — **plus** one persistent primary action outside it |
| Deep tree (docs) | A dropdown labelled with the *current* section, not a generic hamburger |

Measured mobile drawer (Linear at 393px): `position: fixed`, top `65px` (below the header, not over
it), padding `32px 24px`, background `rgba(11,11,11,0.8)` with `backdrop-filter: blur(20px)`,
`overflow-y: auto`, items 44px tall at 16px, and `overflow: hidden` on `<body>` for the scroll lock.

**Scroll-lock correctly.** `body { overflow: hidden }` works on Android and mostly works on iOS but
loses scroll position on older Safari. The robust version stores and restores it:

```js
const y = window.scrollY;
document.body.style.cssText = `position:fixed; top:${-y}px; left:0; right:0; overflow:hidden`;
// on close:
document.body.style.cssText = ''; window.scrollTo(0, y);
```

And put `overscroll-behavior: contain` on the drawer's own scroll container so flicking past its end
does not scroll the page behind it.

---

## Decision: bottom sheets

A sheet is the mobile answer to a popover, a dropdown, a filter panel, and a right-hand detail rail.
Measured specs, from Linear's and Airbnb's shipped CSS:

| Property | Value | Source |
|---|---|---|
| Corner radius | `12px 12px 0 0` (top only; `border-bottom: none`) | Linear |
| Grabber handle | `32px × 5px`, `border-radius: 1rem`, `opacity: .7`, `background: #e2e2e4`, centered | Linear |
| Handle touch behavior | `touch-action: pan-y` on the handle; `touch-action: none` on sheet chrome | Linear |
| Default height | `min-height` and `max-height` both `calc(85vh - env(safe-area-inset-top))` | Airbnb |
| Padding | `24px 24px calc(34px + env(safe-area-inset-bottom)) 24px` | Airbnb |
| Header height | `57px` | Linear |
| Scroll containment | `overscroll-behavior: contain` on the body of the sheet | both |

The `touch-action` split is the part that is easy to get wrong: `pan-y` on the drag handle tells the
browser "I will handle horizontal, you keep vertical," which keeps the drag gesture responsive
without hijacking the scroll. `touch-action: none` on the sheet's non-scrolling chrome prevents the
whole sheet from being treated as a scroll surface.

Airbnb pinning `min-height` *and* `max-height` to the same 85vh is deliberate: a sheet that sizes to
its content changes height when the content changes (a filter count updates, a validation message
appears) and the jump reads as a bug.

---

## Decision: scrolling behavior

- `-webkit-overflow-scrolling: touch` has been unnecessary since iOS 13 — momentum scroll is the
  default. It still appears in production (Vercel 12 uses, Figma 21, GitHub 8) purely as legacy. Do
  not add it to new code.
- `overscroll-behavior: contain` on **every** nested scroll container: modals, drawers, sheets,
  horizontal rails, sidebars, chat panes. Without it, reaching the end of the inner scroller scrolls
  the page behind, and on iOS it can trigger the pull-to-refresh or the swipe-back gesture. Airbnb
  ships 8 distinct overscroll declarations including `overscroll-behavior-inline: contain`.
- `overscroll-behavior-y: none` on the app shell if you are building something app-like and
  pull-to-refresh would destroy state. Do not do this on a content site; users expect it.
- `scroll-snap-type: x mandatory` on horizontal rails, with `scroll-padding-inline-start` matching
  your gutter so the snapped card is not flush against the screen edge. `mandatory` for full-width
  carousels; `proximity` for card rails where a partial scroll is a legitimate resting place.
- Momentum-scrolling containers with `position: sticky` children are still janky on iOS. If a sticky
  header inside a scroll container flickers, it is not your CSS — reduce the container's paint
  complexity (`will-change` is usually the wrong fix; removing a `backdrop-filter` is usually the
  right one).

---

## Decision: where does the overflow go?

At 320px, **Stripe has 772 elements whose right edge is past the viewport and a document
`scrollWidth` of exactly 320.** So does Linear (371), GitHub (177), Vercel (78), Apple (11). Overflow
is not the bug. Overflow that reaches `<html>` is the bug.

Measured — for every one of those elements, on all five sites, the nearest ancestor with a
horizontal-overflow rule was an explicit clip or scroller. **Zero true leaks, across all five sites.**
(Re-probed 2026-09-10; the element counts moved by up to 6% and every structural conclusion held.)

| Site | Overflowing elements @320 | nearest ancestor `hidden` | `clip` | `auto`/`scroll` | true leaks | `body { overflow-x }` | doc scrollWidth |
|---|---|---|---|---|---|---|---|
| Stripe | 772 | 467 | 67 | 238 | **0** | `visible` | 320 |
| Linear | 371 | 287 | 0 | 84 | **0** | **`hidden`** | 320 |
| GitHub | 177 | 160 | 17 | 0 | **0** | `visible` | 320 |
| Vercel | 78 | 77 | 1 | 0 | **0** | `visible` | 320 |
| Apple | 11 | 0 | 11 | 0 | **0** | `visible` | 320 |
| **Supabase** | 10 | 0 | 0 | 10 | **0** ← wrong | **`auto`** | **339** |

**Read that last row: the scan says zero leaks and the document is 19px too wide.** It is the scan
that is broken, not the page. Supabase sets `body { overflow-x: auto }`, so `<body>` counts as a
"clipping ancestor" and every genuinely leaking element is filtered out as intentional. The fix is one
line in the walk — **stop at `<body>`; a scroller on `body` or `html` is the leak, not the containment**
— and it is applied in the self-check at the end of this file. With that fix the culprit resolves in
one step: `a.relative.inline-flex` reading "Request a demo", inside `div.flex.items-center.gap-2` with
`flex-wrap: nowrap`.

Apple is the outlier worth noticing: nine overflowing elements on the whole page, all nine inside
`overflow: clip`. The other four sites are running marquees and bleeding hero art, which is a
legitimate reason to have 700 clipped elements — but Apple proves you can build a visually elaborate
page that simply does not overflow anything.

**Clip at the component that owns the overflow, not on `body`.** Linear is the only one of the five
using `body { overflow-x: hidden }` and it is the pattern to avoid, for three reasons: it silently
hides the bug so you never find the element that is 40px too wide; on some engines it promotes
`<body>` to a scroll container, which breaks `position: sticky` on descendants; and it does nothing
for the *cause*, so the page still lays out 400px wide internally and every `100%` width is measured
against the wrong box.

**Prefer `overflow: clip` to `overflow: hidden` for decoration.** `hidden` creates a scroll container
(programmatically scrollable, focus-scrollable, a `position: sticky` boundary). `clip` just clips.
For a marquee, a glow, a hero illustration bleeding off the edge — the thing you want is `clip`, and
you can clip one axis while leaving the other visible, which `hidden` cannot do:

```css
.hero-art { overflow-x: clip; }              /* bleed vertically, clip horizontally */
.logo-marquee { overflow: clip; }            /* 6,192px of logos in a 320px viewport — Stripe */
```

**The only overflow test that means anything:**

```js
document.documentElement.scrollWidth <= window.innerWidth   // must be true at 320
```

Run it **twice** — once as soon as the page is interactive, once after it settles and after a full
scroll. Airbnb's homepage reports **482** for the first ~3 seconds at 320 and **320** after; a check
that sleeps 5s passes a page that is visibly broken when it loads. When it fails, *then* run the
element scan — filtering out anything with a clipping ancestor **below `<body>`**, or you will get 772
results and give up.

**The five causes, in order of how often they are it:** (1) a fixed `width`/`min-width` on a card or
media element larger than 320 minus the gutters; (2) an unbreakable string — a URL, an API key, a
German compound, a file path — in a container with no `overflow-wrap`; (3) a grid whose
`minmax(320px, 1fr)` floor exceeds the viewport once you subtract padding; (4) **a flex row that will
not wrap** — two CTAs, a label and a badge, a button pair — which is Supabase's live 19px leak and is
invisible at 375 because at 375 they fit; (5) **a `position: fixed` element sized from a stale
measurement**, which is Airbnb's, leaks only before hydration settles, and is the one your CI will
never catch. Fix (2) globally and be done with it:

```css
/* Airbnb ships `overflow-wrap: anywhere`; `break-word` alone will not break a long unbroken token */
.prose, td, .cell { overflow-wrap: anywhere; }
:lang(zh), :lang(ja), :lang(ko) { word-break: keep-all; }   /* Airbnb — never break mid-word in CJK */
```

`minmax(min(320px, 100%), 1fr)` is the grid fix, and it is worth making a habit: the `min()` clamps
the track floor to the container when the container is narrower than your ideal card.

---

## Decision: anchor links under a sticky header

If you have a sticky header and in-page anchors, every `#section` link lands with the heading hidden
behind the header. The fix people reach for is `scroll-margin-top` on every heading. The fix real
products ship is **one declaration on the root**:

| Site | Sticky/fixed header height @393px | `html { scroll-padding-top }` | `scroll-margin-top` on headings | Result |
|---|---|---|---|---|
| **Vercel docs** | 64px (`position: sticky; top: 0; z-index: 75`) | **64px** | 0 | exact |
| **Stripe docs** | — | **64px** | 0 | exact |
| **Tailwind docs** | 113px (`position: fixed; top: 0`) | **`auto`** | 0 | heading lands under the header |

```css
html { scroll-padding-top: var(--header-h); }   /* one line, covers every anchor forever */
```

Two notes. `scroll-padding` on the root also fixes keyboard focus scrolling and browser find-in-page,
which `scroll-margin` on headings does not. And **none of the three ships `scroll-behavior: smooth`
globally** — all three compute to `auto`. Smooth scrolling on a 15-screen jump is a second of
motion sickness; if you want it, scope it to short in-page moves and gate it behind
`@media (prefers-reduced-motion: no-preference)`.

---

## Decision: the four mobile defaults nobody sets

Small, cheap, and each one is a class of bug.

**1. `-webkit-text-size-adjust: 100%` on `html`.** Measured on every single site probed —
Apple, Stripe, Airbnb, Vercel, Notion, GitHub, Tailwind, Mercury all compute to `100%`. Without it,
iOS Safari "boosts" the font size of text blocks it thinks are too small when you rotate to landscape,
so your carefully set 14px metadata renders at 17px in landscape only and your layout breaks in a way
you cannot reproduce in portrait. Set it to `100%` (never `none`, which also disables the
accessibility text-size setting on some engines).

**2. Decide about `-webkit-tap-highlight-color`.** It defaults to `rgba(51, 181, 229, 0.4)` — a
translucent blue box that flashes over the whole tapped element. Measured split: **Linear, Vercel,
Tailwind and Mercury set it to `transparent`; Stripe, Airbnb, GitHub, Notion and Apple leave the
default.** The rule: you may only remove it **if you ship your own `:active` state.** Removing the
highlight and providing nothing means a tap on a slow connection produces zero feedback and the user
taps three more times.

```css
button, a { -webkit-tap-highlight-color: transparent; }
button:active { background: var(--surface-pressed); }   /* the trade you just made */
```

**3. `touch-action` on interactive elements — with `pinch-zoom` preserved.** Vercel ships
`touch-action: pan-x pan-y pinch-zoom`. That combination removes the legacy ~300ms double-tap delay
without taking pinch-zoom away from anyone. `touch-action: manipulation` is the shorter equivalent
and is fine. **`touch-action: none` is only for a drag surface** — a canvas, a slider thumb, a sheet
grabber — because it disables scrolling *and* zoom on that element.

**4. `aspect-ratio` on every image and embed.** This is the CLS fix and it costs one line. Vercel
ships 108 declarations, Airbnb 80, Stripe 53. Note the measurement above: CLS reads 0.000 on a fast
machine and non-zero under 6x throttle, so "we have no layout shift" measured locally means nothing.
Set `width`/`height` attributes on `<img>` (the browser derives the ratio) or set `aspect-ratio`
explicitly on the container.

---

## Decision: horizontal rails, specified

Airbnb's category chip rail at 320px, measured in full — this is the whole spec, copy it:

| Property | Measured value |
|---|---|
| Container | `clientWidth: 320`, `scrollWidth: 467` — 147px past the right edge, so the next chip visibly peeks |
| `scroll-snap-type` | `inline mandatory` |
| `scroll-padding-inline-start` | `16px` (matches the page gutter, so a snapped chip is not flush) |
| `overscroll-behavior-x` | `contain` |
| `gap` | `8px` |

And the counter-example, on the same page: Airbnb's listing carousel is `clientWidth: 308`,
`scrollWidth: 987`, with `scroll-snap-type: none` and `overscroll-behavior-x: auto`. Even at Airbnb,
one rail is specified and the next one is not — swiping the second past its end can trigger
browser-back. The lesson is that rails need a component, not a pattern people re-implement.

**Airbnb's bottom tab bar at 320px, measured:** a `<nav>` with `position: fixed`, total height
**125px**, of which **`padding-bottom: 60px`** is dead clearance, `background: #fff`,
`border-top: 1px solid #ebebeb`, `z-index: 1`. The row of labels occupies roughly the top 65px; the
60px below it keeps them off the home indicator and out of the swipe-up gesture strip (that 60px is
a design token, not `env()` — Airbnb layers `env(safe-area-inset-bottom)` separately for notched
devices). If your fixed bottom bar is `height: 56px` with nothing under the labels, its bottom third
is fighting the OS gesture area on every modern phone.

---

## Decision: landscape and tablet

Tablet is not "a small desktop" and landscape phone is not "a wide phone." Both fail on **height**,
and almost nobody writes a height media query.

Apple does. Their shipped rules include:

```
@media (min-width: 1069px) and (min-height: 776px)                     /* 11 uses */
@media (min-width: 1441px) and (min-height: 776px)                     /* 11 uses */
@media (min-width: 735px) and (max-width: 1068px) and (min-height: 734px)  /* 11 uses */
```

A landscape iPhone 14 Pro is roughly 734x390 of usable viewport. It passes every `min-width: 640`
test you wrote and then renders your 100vh hero into 390px of height. Apple's `min-height: 734px`
gate catches exactly this case and serves the compact layout instead. Airbnb gates on `min-height:
480px` twelve times; Figma on `min-height: 430px` forty times.

**Add one height guard to any full-viewport section:**

```css
.hero { min-height: 100svh; }
@media (max-height: 600px) {
  .hero { min-height: auto; padding-block: 48px; }   /* landscape phone: let it be short */
}
```

For tablet specifically:

- **Tablet widths run 640-834px** (Galaxy Tab S9 at 640, iPad gen 11 at 656, iPad Mini at 768, iPad
  Pro 11 at 834). A single `min-width: 768` breakpoint puts the Galaxy Tab S9 and the iPad gen 11
  into the *phone* layout. If tablets matter to you, your middle tier starts around 600-640, not 768.
- **Tablets are touch devices with desktop-sized viewports.** `(pointer: coarse) and (min-width:
  768px)` is a real and useful query: desktop layout, touch-sized targets. GitHub ships 18
  `pointer: coarse` blocks; Spotify 13.
- **iPad Split View gives you a 320-507px window on an 834px device.** This is the single strongest
  argument for container queries: the viewport lies about the space your component has.

---

## When responsive is the wrong answer

Responsive means one document, one codebase, one set of URLs. It is the default and it is right most
of the time. It is the wrong answer when:

1. **The tasks genuinely differ.** Nobody reconciles a general ledger on a phone; nobody photographs
   a receipt on a desktop. When the mobile job is a *subset* with different primitives (camera,
   location, notifications), build a focused mobile experience with its own IA rather than a
   responsive version of a screen nobody will use at that size. Serving a scrollable 40-column
   accounting grid to a 393px screen is not accessibility, it is abdication.
2. **The desktop tool requires precision the touch surface cannot give.** Timeline editors,
   node graphs, CAD, spreadsheet formula editing. The honest mobile experience is *view + comment*,
   and a clear "open on desktop to edit." Figma does exactly this.
3. **Performance forces different payloads.** If the desktop app is 4MB of JS because of a chart
   library and an editor, and the mobile job needs neither, route to a different entry point. Compare
   Apple's 41-request 2.1MB homepage against NYT's 557-request 14.8MB one and note which company
   ships more visual ambition.
4. **You are competing with a native app for the same job.** A web view that mimics a native tab bar
   badly loses. A web view that does one thing the app makes hard — a shareable read-only link, a
   receipt, a boarding pass — wins.

**How to tell you are in this case:** if your mobile CSS is mostly `display: none`, you are not
building a responsive layout, you are building a second product with extra steps. Do it properly.

### Three cases, verified, where the advice in this file is the wrong advice

**1. A desktop tool that should not be made responsive at all: Figma Design.** Figma's own help
documentation states that on a mobile device "you can only access a **View Only** version of Figma
files," and that "the file browser is no longer supported on mobile phone web browsers." They did not
build a touch canvas editor and they did not build a responsive file browser — they *removed* the
file browser from phone web. If your product's core interaction is precision pointer work on an
unbounded canvas, the responsible mobile build is view + comment + a clear route to the desktop, and
every hour spent making the editor reflow at 390 is an hour spent making something nobody will use.
The failure mode this prevents is worse than a missing feature: a canvas editor that *technically*
works on a phone invites people to start work they cannot finish.

**2. Horizontal scroll is not a bug, it is the answer — for comparison data.** Every production data
table probed for this pass scrolls horizontally on purpose: ESPN's standings (254px viewport onto a
543px stats table), CoinMarketCap (358 → 371 with both axes pinned), GitHub's branch list (358 →
806). Nobody stacks them, because the reader's task is *comparison across rows*, and a card stack
destroys exactly the alignment that makes comparison possible. The rule "no horizontal scrolling on
mobile" applies to the **page**; inside a bounded, obviously-scrollable container with a peeking next
column, horizontal scroll is the correct and the shipped answer. What makes it a bug is when it is
the *document* that scrolls.

**3. A distinct mobile product beats adaptation — and you can see it in the bytes: Spotify.** Load
`open.spotify.com` at 1440 and you get 1.02MB of CSS, 123 container queries, `pointer: coarse` blocks,
45 `clamp()`s. Load the same URL with a phone user-agent and you get a different application: 483KB,
**zero** container queries, plain `min-768` / `min-992` breakpoints, and a different viewport meta.
Spotify did not make the desktop player responsive; they built a second front end for the mobile job
(browse, resume, one-hand reach) and route to it. Google does the same with Sheets, where mobile web
is a gate to the app and "request desktop site" is the only way to reach the real editor. Both are
choices you can only make when the mobile *job* is a different job — but when it is, adaptation costs
more and delivers less than two focused products.

---

## When this advice is wrong

- **"Never below 12px text" is wrong.** Measured minimum rendered text at a 320px viewport: Stripe
  8px, Linear 10px, Mercury 10px, NYT 10px, Booking 10px, Airbnb 11px. Airbnb's mobile homepage body font is
  **12px** — 34 of 46 sampled text nodes, against a `<body>` of 14px/20.02px. Small type is correct for legal text, timestamps,
  metadata and units. The rule that actually holds is: **the primary reading text is 15-17px, and
  everything you shrink below 12px must be text a user never has to read to complete a task.**
- **"Always 44px touch targets" is wrong in prose and in dense grids.** Use the hit-expander instead.
  A paragraph where every link is 44px tall is not accessible, it is unreadable.
- **"Mobile-first always" is wrong for an internal tool used exclusively on 1440px monitors.** Linear,
  Apple and Vercel all author desktop-first for their own reasons. Author in the direction of the
  layout you actually care about most; the other direction is the override.
- **Container queries are wrong for page chrome.** Whether a bottom tab bar exists is a property of
  the device, not of any container. Use `@media` there, and do not get clever.
- **`dvh` everywhere is wrong.** It reflows on scroll. `svh` is the safer default and Vercel's 23:8
  ratio in favor of `svh` is the tell.
- **Fluid type (`clamp()`) everywhere is wrong.** Measured clamp usage is modest and targeted:
  Spotify 45, Figma 40, Airbnb 33, Vercel 29, Mercury 17 — and **zero** at Apple, Tailwind's own
  site, Robinhood and Booking, one at Klarna. Fluid display headings, stepped body text. A body size that changes
  continuously with viewport width makes your line-height, your measure and your vertical rhythm all
  unpredictable, and it means no two users see the same page.
- **`viewport-fit=cover` is wrong if you have no edge-to-edge content.** It creates safe-area padding
  obligations across the whole app in exchange for nothing.
- **"`aspect-ratio` on everything" is wrong for text containers.** It is an image and embed fix. On a
  box containing text it becomes a fixed height by another name and clips in German, Finnish and at
  200% zoom. Apple ships **zero** `aspect-ratio` declarations on its homepage and has no CLS.
- **"Always `overflow: clip`" is wrong when you need the content scrollable.** `clip` is unscrollable
  by definition — programmatically, by keyboard, by find-in-page. Decoration gets `clip`; a table
  rail, a code block or a chip row gets `auto`. Getting this backwards produces content nobody can
  reach on a small screen with no scrollbar to tell them.
- **Long-task totals are not a budget you can hit on a marketing site.** Stripe blocks the main
  thread for 4.6s at 6x and is a category-leading product. The number is a *comparison* tool: measure
  before and after your change, and care about the longest single task more than the total, because
  that is the one that eats a tap.
- **Testing in Chrome device emulation is not testing.** It has no collapsing toolbar, no keyboard,
  no safe areas, no momentum scroll, and a CPU 20x faster than the phone. Use it for layout;
  use a real device or a remote device lab for anything in this document's second half.

---

## Anti-patterns: what AI-generated responsive work gets wrong

**1. Mobile is desktop with smaller padding.**
What it looks like: `p-8 md:p-12`, `gap-4 md:gap-8`, and every element in the same place and order at
393px as at 1440px. Nothing absorbs, nothing transforms, nothing is removed.
*Correction:* for each component, name a transform from the six above before you write CSS. If the
answer for every component on the page is "reflow," you have not designed a mobile layout. At minimum
one thing should **absorb into a trigger** and one thing should be **gone**.

**2. `768px` and `1024px` as the breakpoints.**
What it looks like: `md:` and `lg:` and nothing else, everywhere, in every project.
*Correction:* drag the window and find the actual break. Then write it. Stripe uses 640 and 940. If
your layout breaks at 880 and you wrote 1024, you shipped 144px of broken.

**3. The table that overflows the page.**
What it looks like: a `<table>` with 7 columns, no wrapper, `width: 100%`, and a page that scrolls
horizontally at 390px. The site's `<body>` now scrolls sideways and every fixed element is misplaced.
*Correction:* wrap it (`overflow-x: auto; overscroll-behavior-x: contain`), give the table
`min-width: max-content`, make the first column sticky with an explicit `background`, and add a
right-edge mask so the scroll is discoverable. Or transform to cards. Never leave it bare.

**4. `height: 100vh` on the hero, the modal, and the app shell.**
What it looks like: fine in the editor, CTA under the toolbar on a real iPhone, and a modal whose
Save button cannot be reached.
*Correction:* `min-height: 100svh` for content that must be visible; `height: 100dvh` only for scroll
containers; add a `@media (max-height: 600px)` escape so landscape phones do not get a 390px-tall
"full screen" section.

**5. Fixed heights that clip.**
What it looks like: `h-16` on a nav that has to fit a two-line brand name at 320px; `height: 400px`
on a card whose text wraps to 6 lines in German; `max-height` with no `overflow`.
*Correction:* `min-height` instead of `height` on anything containing text. Test with a string twice
as long as your placeholder — real product names, real German, real city names.

**6. The hamburger that eats the product.**
What it looks like: at 390px the header is a logo and a `☰`. Behind it: everything, including the
primary CTA, the account menu, and the search.
*Correction:* Apple's rule. The hamburger hides the *map*; the *destination* stays on screen. If
there is one action this page exists for, it is a visible button at 320px. If there are 2-5 constant
destinations, use a bottom tab bar and no hamburger at all.

**7. Text dropped to 11px "so it fits."**
What it looks like: `text-xs` applied to body copy at mobile because the desktop layout was too wide.
*Correction:* the text was not the problem; the layout was. Body copy stays 15-17px on mobile
(Apple 17, Stripe 16, Vercel 16). If it does not fit, the container is wrong, or that content should
not be on the mobile screen at all.

**8. Missing or hostile viewport meta.**
What it looks like: no `<meta name="viewport">` at all (page renders at 980px and scales down), or
`maximum-scale=1, user-scalable=no` (pinch-zoom disabled — a WCAG 1.4.4 failure).
*Correction:* `width=device-width, initial-scale=1`, plus `viewport-fit=cover` only if you have
edge content. Never `maximum-scale` or `user-scalable=no`.

**9. Hover-only affordances with no touch path.**
What it looks like: `.row:hover .actions { opacity: 1 }` and no other way to reach the actions. On a
phone the row's actions are unreachable; on a tablet the first tap sticks the hover state on forever.
*Correction:* wrap in `@media (any-hover: hover)`, and give touch a real path — a visible `⋯`, a
long-press sheet, or a selection mode.

**10. Images with no `srcset` and no dimensions.**
What it looks like: a 2400px hero JPEG served to a 393px screen, and the layout jumping as each image
loads.
*Correction:* `srcset` + `sizes` for resolution switching (Stripe: 42 of 44 images), `<picture><source
media>` for actual art direction (Airbnb: 96; Apple: 18), `loading="lazy"` below the fold (Stripe: 43),
`fetchpriority="high"` on the LCP image, and explicit `width`/`height` attributes or an
`aspect-ratio` so nothing shifts.

**11. Every scroll container leaking to the page.**
What it looks like: scrolling a modal reaches its end and the page behind starts moving; swiping a
card rail triggers browser back.
*Correction:* `overscroll-behavior: contain` on every nested scroller. It is one line and it is
almost always right.

**12. `body { overflow-x: hidden }` as the fix for horizontal scroll.**
What it looks like: one line at the top of the stylesheet that makes the bug invisible and leaves the
cause in place. The page still lays out wider than the viewport internally, `100%` widths are wrong,
and `position: sticky` inside `<body>` can stop working.
*Correction:* find the element (`documentElement.scrollWidth > innerWidth`, then scan and filter out
anything with a clipping ancestor) and clip it at its own component with `overflow: clip`. Four of the
five products measured leave `body { overflow-x: visible }` and clip locally — Stripe clips 535
elements that way and still reports a 320px document.

**13. Shipping `aspect-ratio: 0` and calling CLS clean.**
What it looks like: no `width`/`height` on `<img>`, no `aspect-ratio`, CLS measured as 0.000 on a
MacBook, and a visibly jumping page on a phone. Measured: Airbnb goes 0.000 → 0.019 and NYT 0.437 →
0.474 purely from 6x CPU throttling.
*Correction:* `aspect-ratio` or explicit dimensions on every image, embed and skeleton — Vercel
ships 108 of them — and re-measure with `Emulation.setCPUThrottlingRate` at 4-6x, never at 1x.

**14. Anchors that land under the sticky header.**
What it looks like: a docs page with `position: sticky` nav and `#install` links that scroll the
heading behind it. Tailwind's own docs do this: 113px fixed header, `scroll-padding-top: auto`.
*Correction:* `html { scroll-padding-top: var(--header-h) }`. One line. Vercel docs and Stripe docs
both ship exactly `64px` to match a 64px header.

**15. `touch-action: none` sprayed on interactive elements.**
What it looks like: someone read that it removes the tap delay and put it on every button. It also
disables pinch-zoom on those elements, which is a WCAG failure, and disables scrolling that starts on
them, which makes a list of buttons unscrollable.
*Correction:* `touch-action: manipulation`, or Vercel's explicit `pan-x pan-y pinch-zoom`. Reserve
`none` for a drag handle or a canvas.

**16. Removing the tap highlight and shipping nothing in its place.**
What it looks like: `-webkit-tap-highlight-color: transparent` in the reset, no `:active` styles,
and a button that gives zero feedback for the 800ms before the route changes.
*Correction:* either keep the default highlight (Stripe, Airbnb, GitHub, Notion and Apple all do) or
remove it and add a real `:active` background/scale. Never remove it alone.

**17. Never testing 320.**
What it looks like: laid out at 375 or 390, ships, and a 320px device gets a horizontal scrollbar
from one `min-width: 340px` card or one long unbroken token.
*Correction:* the check below.

---

## Self-check

Run against your own output. Any "no" is a bug.

1. At a **320x568** viewport, is `document.documentElement.scrollWidth <= window.innerWidth`? Check it
   **at first paint and again after the page settles** — Airbnb's homepage fails this for three
   seconds and then passes. Only if it fails, scan for the culprit — filtering out anything with a
   clipping ancestor **below `<body>`**, or you will get hundreds of false positives (Stripe: 772, all
   intentional):
   ```js
   [...document.querySelectorAll('body *')].filter(e => {
     if (e.getBoundingClientRect().right <= innerWidth + 2) return false;
     for (let a = e.parentElement; a && a !== document.body; a = a.parentElement)   // stop at body
       if (/(hidden|clip|auto|scroll)/.test(getComputedStyle(a).overflowX)) return false;
     return true;   // this one actually leaks
   });
   ```
   The `a !== document.body` guard is load-bearing: without it, a page that sets
   `body { overflow-x: auto }` reports zero leaks while scrolling sideways (supabase.com does exactly
   this at 339px). And confirm the fix is not `body { overflow-x: hidden }`.
2. Count the distinct breakpoints in the file. More than four for a page, or more than two for a
   component, means you picked them from a list. Are any of them a number you found by dragging?
3. Does at least one component on the page **change shape** (absorb into a trigger, drill down, swap)
   rather than reflow? If every component just stacks, this is not a mobile design.
4. Is every `<input>`, `<textarea>` and `<select>` at **≥16px** at mobile widths? Grep for
   `text-sm` / `font-size: 14px` inside form controls.
5. Grep for `100vh`. Every hit is a bug unless it is decorative. Replace with `svh` or `dvh` and say
   which and why.
6. Does the page have a `max-height: 600px` (or similar) escape for landscape phone?
7. Is every nested scroll container carrying `overscroll-behavior: contain`?
8. Are all hover-revealed affordances inside `@media (any-hover: hover)`, and does touch have a
   different, working path to the same action?
9. Does every table live in an `overflow-x: auto` wrapper, or has it been deliberately transformed?
   Is the first column sticky with an explicit `background`?
10. If the design has a fixed bottom bar: is `viewport-fit=cover` set, and does the bar carry
    `padding-bottom: calc(<base> + env(safe-area-inset-bottom))`?
11. Is the viewport meta free of `maximum-scale` and `user-scalable=no`?
12. Are there any `height:` (not `min-height:`) declarations on elements containing text? Retest with
    strings twice as long.
13. At 393px, is the single most important action on this page visible without opening a menu?
14. Do the primary buttons measure 40-48px tall, and do sub-44px targets have a hit expander?
15. Take a screenshot at **320, 393, 744 and 1440** and look at all four. Not three. The 744 one is
    where "tablet as afterthought" shows up.
16. Does `html` carry `-webkit-text-size-adjust: 100%`? Every product measured does. Then rotate to
    landscape and confirm no text got bigger on its own.
17. Does `html` carry `scroll-padding-top` equal to your sticky header height? If you have anchors
    and a sticky header and this is `auto`, every anchor link is broken.
18. Does every image, embed and skeleton have `aspect-ratio` or `width`/`height`? Then re-measure CLS
    at **4-6x CPU throttle** — it reads 0.000 on your laptop regardless.
19. Run a `longtask` PerformanceObserver at 6x throttle. Total blocked time over ~2s means taps will
    feel dead; a single task over ~500ms means one of them will be swallowed entirely.
20. If you removed `-webkit-tap-highlight-color`, is there an `:active` state? If not, put the
    highlight back.

---

## Provenance

Values measured 2026-09-09 and 2026-09-10 via Playwright. Breakpoints and feature counts were extracted by
intercepting every `text/css` response plus inline `<style>` content and tallying `@media` /
`@container` conditions in the shipped bytes — these are usage counts in production CSS, not
documentation claims. Computed styles and bounding boxes were read at `iPhone 14 Pro` (393x660,
DPR 3, touch), `320x568` (DPR 2, iOS UA), 744x900 and 1440x900.

Sites measured: stripe.com + docs.stripe.com, linear.app, vercel.com, apple.com (+ macbook-pro,
macbook-pro/specs), airbnb.com, notion.com, tailwindcss.com (+ /docs), github.com, open.spotify.com,
nytimes.com, mercury.com, figma.com, shopify.com, booking.com, squareup.com, klarna.com,
robinhood.com, arc.net, raycast.com, supabase.com, news.ycombinator.com, and the mobile login forms
of Stripe, GitHub, Google, X, Vercel, Notion, Supabase and Shortcut.

The September 10 pass added: shipped-declaration counts for `aspect-ratio`, `text-size-adjust`,
`-webkit-tap-highlight-color`, `touch-action`, `overflow-wrap`/`word-break`, `scroll-margin`/
`scroll-padding`, `content-visibility` and `min-width:0` (same CSS-interception method); the 320px
overflow-and-clip audit (per-element bounding boxes plus ancestor `overflow-x`, at 320x568 DPR 2
mobile emulation); sticky-header and `scroll-padding-top` measurements on vercel.com/docs,
docs.stripe.com/api and tailwindcss.com/docs; Airbnb's chip rail, listing carousel, bottom tab bar and
touch-target distribution at 320px; and the main-thread table, captured on the Playwright `Pixel 5`
profile with `Emulation.setCPUThrottlingRate` at 1x and 6x, one cold sample per site, LCP/CLS/longtask
read from `PerformanceObserver` with `buffered: true` five seconds after load. Single samples on a
shared connection — treat LCP as order of magnitude and the long-task and CLS *deltas* between 1x and
6x as the real signal.

Device viewport table from the Playwright device registry. Payload figures are decompressed response
bytes on a cold load at the `iPhone 14 Pro` profile, one sample per site — treat them as order of
magnitude, not as benchmarks.

The 2026-09-10 adversarial re-probe added: coinmarketcap.com, espn.com/nba/standings,
weather.com's hourly forecast, apple.com/iphone/compare, apple.com/macbook-pro at 320,
github.com/vercel/next.js (file list and branch list at 1440 and 390), aws.amazon.com/ec2/pricing,
en.wikipedia.org, and open.spotify.com loaded at both a phone and a desktop user-agent.

---

## Adversarial pass (2026-09)

First hostile review of this file. Everything below was re-probed live on **2026-09-10** with
Playwright against a shared Chromium, at 320x568 (DPR 2, iOS UA), 390/393x660 (DPR 3, touch) and
1440x900, plus screenshots read at 320 and 390. Sixteen products, ~40 page loads.

**Held, could not shake.** Geometry and computed style reproduced essentially exactly a day and a
route later: Vercel's 320px overflow profile (78 elements / 77 `hidden` / 1 `clip` / 0 leaks / doc
320) came back identical; Apple's `env(safe-area-inset-*)` count is still exactly 31 and its
`aspect-ratio` count still exactly 0; Airbnb's `scroll-snap-type` still 14 and `env()` still 79;
Vercel's `svh`:`dvh` ratio still 23:8 and its `aspect-ratio` still 108; Spotify's desktop player
still 15 `container-type` and ~123 `@container`; Supabase's dashboard-sign-in 15px input and the
19px document leak both still there. The viewport-meta findings all held, including the three good
products shipping `maximum-scale=1` (Vercel, Airbnb, Spotify-desktop). The 16px iOS input-zoom rule
is current and is an intentional platform behaviour, not a bug queued for a fix. `dvh`/`svh`/`lvh`
have been Baseline Widely Available since June 2025.

**Corrected.**
1. *Airbnb leaks at 320.* Document `scrollWidth` is **482** for the first ~3 seconds of every cold
   load (3/3 runs) — a `position: fixed` header laid out before hydration corrects it — then 320. The
   old "thirteen of fourteen products have zero overflow" was a post-settle snapshot. The overflow
   test now says: run it twice.
2. *The self-check's leak scan had a false negative that hid a live bug.* It treated any ancestor
   with `overflow-x: auto` as intentional containment, including `<body>` — which is why Supabase
   scored "0 true leaks" while scrolling sideways at 339px. Walk now stops at `<body>`. With the fix,
   the culprit resolves in one step: a `flex-wrap: nowrap` CTA pair, `Request a demo`. Added as
   overflow cause (4); the fixed-element-sized-from-stale-JS case added as (5).
3. *Apple's localnav is 48px, not 60px, and its Buy pill is 24 x 45px at 12px type, not 44px.* Also
   scoped: the localnav pattern is on product pages; `apple.com` itself ships only the 48px global bar.
4. *Spotify's 120 container queries are the desktop build.* At a phone UA the same URL serves a
   different application with **zero** container rules and half the CSS. Every count in this file is
   now labelled with the build it came from.
5. *Tailwind v4 ships `rem` breakpoints* (40/48/64/80/96rem), verified in tailwindcss.com's and
   supabase.com's shipped bytes. Media-query `rem` resolves against the browser's root font size, so
   these tiers move for users who change their default text size. New paragraph in the breakpoint
   section.
6. *Tailwind docs table cells are 14px / `10px 8px` now, not 12px / 8px.* The invariance across
   390/744/1440 — the actual lesson — holds.
7. *Declaration counts drift ±20% per load* because CSS is code-split (Stripe `min-640` 190→194,
   Linear `max-1024` 66→48, Airbnb `aspect-ratio` 80→60). Framing added at the top: read them as
   ratios between products, never as specs.
8. *Cut:* four rows from the main-thread table (Vercel, Notion, Linear, Figma) and the Linear
   staleness footnote. Timing numbers, duplicated in
   [`performance-and-perceived-speed.md`](performance-and-perceived-speed.md), carrying no lesson the
   remaining five rows do not.

**Added, from looking rather than recalling.** Each pattern in the table section is now tied to a
named product verified at 320 or 390, and two patterns the file was missing were found in the wild:
**E. Switch the column, don't scroll it** (weather.com's hourly forecast: a chip row selects which
single metric column sits beside Time and Sky — twelve columns of data, three of layout) and
**F. Show two, let them choose which two** (apple.com/iphone/compare: two product columns at 390,
each headed by a picker, where desktop shows four). Also added the **split-table frozen column**
variant of A, measured on ESPN's standings at 320 (136px static team table beside a 543px stats table
in a 254px scroller, team names abbreviated to fit), with its screen-reader cost named. Pattern **C,
the card transform, was not found shipping on any public table probed** — that is now stated in the
file rather than implied away. And the three scoping cases: Figma (view-only on phone web, by their
own docs), horizontal scroll as the correct answer for comparison data, and Spotify's separate
mobile front end.

**Could not verify.** Anything that requires a real iOS toolbar: Chromium emulation has no
collapsing chrome, no software keyboard, and no safe areas, so this file's `svh`/`dvh`/`env()`
behaviour claims are argued from shipped CSS and from spec, not observed. The iOS 26 "Liquid Glass"
viewport changes are reported consistently by developers through 2026 and documented by Apple for the
web nowhere; they are flagged in-place as a device-test item rather than stated as rules.
`-webkit-tap-highlight-color`'s default value and the ~300ms tap delay were not re-measured.
The Robinhood, Klarna, Arc, Raycast, Shopify, Square and Mercury rows were not re-probed this pass.

**Reproduce it:**

```bash
node tools/browserd.mjs start
node tools/shot.mjs https://www.espn.com/nba/standings --out .cache/shots --name t --widths 320
# then, at 320x568 in the page context:
#   document.documentElement.scrollWidth              // twice: at load, and after settle
```
