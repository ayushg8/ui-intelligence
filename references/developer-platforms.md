# Developer Platforms and Technical Products

**Evaluated:** 2026-09

## What this archetype is for

Products whose user is holding a terminal in the other hand: hosting and compute (Vercel, Railway, Fly.io, Modal, Cloudflare), managed data (Supabase, Neon, PlanetScale, Turso, Upstash, Convex, Prisma), API primitives (Stripe, Resend, Clerk, Unkey), and observability (Sentry, Axiom, Grafana, GitHub Actions). The defining situation: the user is *blocked* — a deploy failed, a webhook 400s, a query is slow — and the UI is one of two or three surfaces they are triangulating between (terminal, editor, dashboard, docs). They already know what they want; the interface's only job is to not slow them down and to be *trustworthy about what is actually true right now*. This is why docs are a first-class product surface here and nowhere else, and why the aesthetic bar is "does this look like it was built by people who run production" rather than "is this delightful." It does **not** cover consumer SaaS with a technical flavor (Notion, Figma), internal admin tools (no docs surface, no public API), or AI chat products that happen to have an API key page.

## The reference set

| Product | Why it's here | The single thing to steal |
|---|---|---|
| **Stripe docs + API reference** | The only product that ships two different body sizes for two different reading modes, in one design system | Guides run 16px/26px at ~59ch; the API reference runs **14px/22px at ~72ch** with a pinned three-column layout. Reference is scanned, prose is read — size them differently. |
| **Cloudflare docs** | Best IA for a product with 40+ sub-products and 3000+ pages | A **"Filter sidebar /" input above the nav tree**, plus a product-scope switcher at the top. When your tree exceeds ~30 items, add a filter, not more accordions. |
| **Axiom** (play.axiom.co) | Densest legible dark UI measured; open playground, no login | **Two parallel type scales** — sans 10/11/13/15, mono 10/12/14 — because mono needs to be ~1px smaller than sans to look the same size in the same row. |
| **Vercel / Geist** | The most-copied dev token system; worth copying correctly | `gray-700` (56% L) and `gray-800` (49% L) are **identical in light and dark**. Anchor your mid-greys so secondary text contrast doesn't flip when the theme does. |
| **GitHub (Primer) + Actions** | The canonical run/log/status vocabulary every CI UI is judged against | Inline code sized in **`em` (0.9285em), not px** — so it never disturbs the line box of whatever text it sits in. |
| **Railway** | Best environment/project switcher and the "staged changes" model | Breadcrumb-shaped switcher (`logo / gravy-truck ⌄ / production ⌄`) plus a floating **"1 unapplied change · Details · Deploy ⌘⏎"** bar. Infra changes stage, then apply. |
| **Resend docs** | Cleanest small-surface docs; three docs modes as top-level tabs | Theme switcher as **three icons (monitor/sun/moon) at the bottom of the sidebar**, not a toggle in the header. System is a real third state. |
| **Modal docs** | Best dark-first docs; version-precise deprecation notes | Deprecations name the exact version inline: *"Prior to v0.73.82, this function was named `@modal.web_endpoint`."* |
| **Clerk docs** | Elite typographic detail hidden in the font stack | Body stack is `geistNumbers, suisse` — **a numerals-only webfont in front of the text face**, because the text face's default figures don't tabulate. |
| **Supabase docs** | Best use of monospace as a *labelling* device rather than decoration | Section labels (`FUNDAMENTALS`, `ON THIS PAGE`, `AI TOOLS`) set in uppercase mono; body in Inter. Mono means "this is a system-level label," not "this is code." |
| **Inngest docs** (off-list) | Best-in-class SDK/language switching and run-table conventions | **Language selector as a persistent sidebar `<select>`** ("TS TypeScript") that reskins the whole tree — global switch — separate from per-block package-manager tabs. |
| **Grafana / Grafana Play** (off-list) | The reference time-range control, and a cautionary empty state | The control cluster: `«  🕐 Last 30 minutes ⌄  »  🔍−  ↻ Refresh 30s ⌄` — window steppers flanking the picker, zoom-out, refresh with its own interval. |
| **Cloudflare Status** | The incident-timeline conventions | Absolute timestamps + an explicit **"Local time ⌄" timezone selector** in the header. Never relative time on an incident page. |
| **Fly.io docs** | The productive violation of every convention on this page | 17px/27.2px body at **weight 325** in a custom grotesk, headings in a serif-ish display face, purple-tinted body grey `rgb(76,78,103)`. It works because the voice matches. |

**Two exceptional products not on the assignment list, and how I found them.** A web search for "best-designed developer dashboards" returned nothing but listicles, so I switched method: I curl-probed the `play.`, `demo.`, and `app.` subdomains of ~10 infra vendors looking for an unauthenticated product surface, and separately looked for docs sites that embed full-resolution real product screenshots rather than illustrations.
- **Axiom** — `play.axiom.co` returned `200` with the entire logged-out product (Datasets, Explorer, Dashboards) usable. It is the densest well-built dark UI I measured, and its token file (577 root variables, 15-step neutral ramp, dual mono/sans type scales) is the single best artifact in this teardown.
- **Inngest** — found by following the durable-execution adjacency out of Convex/Trigger.dev; its docs embed unretouched screenshots of the local Dev Server at `localhost:8288`, which is exactly the CLI/web-parity case that is otherwise impossible to study without an account.
- Also checked: `app.unkey.com` (429, rate-limited — its marketing site does show mono panel labels and a GitHub star count in the nav), `depot.dev` (timed out on screenshot), Sentry's "Interactive Sandbox" (**gated behind a work-email form**, which is a self-inflicted wound: Axiom and Grafana let you in and Sentry doesn't).

## Measured specifics

### Docs typography (measured at 1440×900, computed styles)

| Product | Body prose | Measure | h1 | h2 | Code block | Inline code | Sidebar row |
|---|---|---|---|---|---|---|---|
| Stripe **API ref** | 14px/22px (1.57) | 503px ≈ 72ch | 24/32 w700 | — | 14/18.2 Source Code Pro (1.30) | 11.9/20 w500, pad 2/4, r6, 1px `#d4dee9` | — |
| Stripe **guides** | 16px/26px (1.63) | 474px ≈ 59ch | 32/normal w700 | 21 w700 | 13/20 Menlo | 14/20 Menlo, **no background** | — |
| Cloudflare | 16px/28px (1.75) | 614px ≈ 77ch | 35/43.75 w600 ls −0.875 | 20.8/36.4 w600 ls −0.312 | 14/22.75 JetBrains Mono, pad 12/16 | 14/24.5 w450, `oklch(.687 .208 38.8)` on `oklch(.985 0 0)`, 1px `oklch(.92 0 0)`, r6, pad 2/6 | 40px, 13/19.5 w500 |
| Clerk | 15px/28px (**1.87**) | 622px ≈ 83ch | 32/40 w600 ls −0.48 | 20/28 w600 ls −0.3 | 13/24 Söhne Mono | — | 34px, 14/20 **w450**, pad 7/8, r6 |
| Resend | 16px/28px | ~575px | 36/40 w600 ls −0.9 | — | 14/24 paperMono | 14/21 w400, pad 2/8, r6 | 32px, pad 6/12/6/16, **r12** |
| Modal (dark) | 16px/24px | 784px | 36/45 w500 ls −0.9 | 24/33 w500 | 14/20 Fira Mono | 14/20 on `#242424`, r4, pad 2/4 | 36px, 14/20 w500, pad 8/16 |
| Supabase | 15px/28px **w500** | 706px | 34/37.8 w600 Manrope | 22/29.3 w600 | — | — | — |
| Prisma | 16px/28px **w380** | 747px | 36/41.4 w500 Sora | 24/32 w500 | 13/20 monaSansMono | 13px/**28px** (lh matched to prose), r5, pad 3 | 36px, 14/20 w500, r10 |
| Railway | 16px/28px | 628px | 36/40 w600 **IBM Plex Serif** | 24/32 w600 Inter | — | 14/20 JetBrains Mono on `#f0eff5`, r8, pad 2/6 | 26px, 14/20 |
| Upstash | 15px/22.5px (1.5) | 521px | 30/36 w600 ls −0.75 | 20/28 w500 | 14/22 ui-monospace | 14/21 w500, r5, pad 2.1/5.6 | — |
| Turso | — | — | 36/40 w600 ls −0.9 | 16/24 w600 | 14/24 paperMono | 14/21 w500, r6, pad 2/8 | 36px, r12 |
| Convex | 15px/24px | 442px | 37.5/46.9 w700 GT America | — | 14.25/20.66 | 14.25/**14.25** w700, r6 | — |
| Fly.io | 17px/27.2px **w325** | 768px | 30/37.5 w500 Mackinac | 24/31.8 w500 | — | — | 35px, 14.5/23 w500, r8 |

Body-copy colour is never pure black or pure white: Cloudflare `oklch(.21 0 0)`, Stripe `rgb(60,66,87)`, Railway `rgb(101,99,110)`, Prisma `oklab(.3517 … / 0.9)`, Fly `rgb(76,78,103)`, Modal (dark) `rgb(209,209,209)`.

### Docs layout geometry (1440px viewport)

| | Left nav | Content column | Right TOC | Header |
|---|---|---|---|---|
| Stripe API ref | 260px @ x16 | 503px prose + ~500px code panel @ x882 | — (the code panel *is* the third column) | 56px, 1px `#d4dee9` |
| Cloudflare | 300px @ x0 | 852px region / 614px prose | 288px @ x1152 | 57px, 1px `oklch(.92 0 0)` |
| Clerk | ~330px | 1024px @ x350 / 622px prose | 224px @ x1150 | 64px |
| Modal | 278px @ x16 | 784px prose | — | 53px |
| Resend | ~272px | 1160px card @ x272 / ~575px prose | in-card right rail | 56px |

- **Left nav lands in a 260–300px band.** Not 240 (too tight for `Managing tables, views, and data`), not 360.
- **Right TOC lands in 224–288px.**
- **Header 53–64px, 56px modal, always a 1px hairline bottom, never a shadow.**
- **Code blocks: the `<pre>` carries no background.** The *wrapper* carries `background`, `border-radius: 8px`, and `1px` border; the `<pre>` carries only padding — Stripe `8px 16px`, Cloudflare/Clerk `12px 16px`, Modal `0 14px`. Nobody uses 24px padding on a code block.

### Axiom — full dark token set (the best measured artifact here)

```
page bg          #111111        elevated surface #191919      recessed  #0d0d0d / #0b0b0b
neutral ramp     #0b0b0b #0d0d0d #111111 #191919 #222222 #2a2a2a #313131 #3a3a3a
                 #484848 #606060 #6e6e6e #7b7b7b #b4b4b4 #eeeeee #ffffff
text             primary #eeeeee · secondary #b4b4b4 · tertiary/muted #6e6e6e · disabled #6e6e6e
alpha overlays   hover #ffffff09 (3.5%) · selected #ffffff12 (7%) · plus a full 12-step alpha ramp
borders          faint #222222 · default #2a2a2a · strong #313131 · emphasis #3a3a3a   (all 1px)
radius           4px default · 2px tooltip · 8px rare · nothing larger anywhere
type scale       sans 10 / 11 / 13 / 15 px      mono 10 / 12 / 14 px
line-height      16px for every size at 13px and below
table            header row 38px · single-line data row 40px · two-line row 62px · cell pad 11px 8px
input            28px tall · pad 5px 8px · r4 · 1px #2a2a2a
nav tab          40px tall · pad 0 12px
dark shadow      0 4px 8px rgba(0,0,0,.8), 0 0 2px rgba(0,0,0,.8), 0 0 1px rgba(0,0,0,.8)
easing           cubic-bezier(.645,.045,.355,1)
semantic text    danger #ff9592 · warning #ffa057 · info #70b8ff · success #3dd68c
semantic bg      danger #3b1219 · warning #331e0b · info #0d2847 · success #132d21
```

Note the ramp is **compressed at the dark end**: eleven steps between `#0b0b0b` and `#7b7b7b`, then a jump to `#b4b4b4` and `#eeeeee`. A dark UI needs many closely-spaced dark values (surfaces, borders, hovers, selection) and only two or three text values. Tailwind's evenly-spaced `neutral-950…50` gives you the opposite distribution and is why AI-built dark dashboards have muddy, indistinguishable panel edges.

### Vercel Geist

```
light:  page 98% L, card/surface 100% L        dark:  page 0% L (pure black), card/surface 4% L
grey L% light   95 92 90 92 79 66 56 49 30  9   (gray-100 … gray-1000)
grey L% dark    10 12 16 18 27 53 56 49 63 93
                            ^^^^^ gray-700 (56%) and gray-800 (49%) are IDENTICAL in both themes
observed        text #ededed / #a1a1a1 / #8f8f8f on #0a0a0a; borders #1f1f1f and #2e2e2e
radius          6px product · 8px marketing
space           4px base → 4 8 12 16 24 32 40 64 96 128 192 256
shadow ring     light  0 0 0 1px #00000014     dark  0 0 0 1px #ffffff25
legacy shadows in dark collapse to `0 0 0 1px var(--accents-2)` — a ring, not a shadow
motion          .15s cubic-bezier(.4,0,.2,1) default · popover .2s · overlay .3s
font-feature    "calt" 0, "rlig", "ss11"   (contextual alternates deliberately OFF)
control height  32px
```

**Elevation delta:** 2% luminance in light (98→100), 4% in dark (0→4). Dark mode needs roughly double the luminance separation to read as the same amount of elevation — and still needs the 1px ring.

### GitHub Primer

```
control heights   xsmall 24 · small 28 · medium 32 · large 40 · xlarge 48   (32 is the default)
radius            small 3px · medium 6px · large 12px · full 624.9375rem
body sizes        small 12 · medium 14 (product default) · large 16
code block        13px, line-height 1.5 → 19.5px
inline code       0.9285em  ← relative, not absolute
line-heights      tight 1.25 · snug 1.375 · normal 1.5 · relaxed 1.625 · loose 1.75
stack gap         condensed 8 · normal 16 · spacious 24
size scale        2 4 6 8 12 16 20 24 28 32 36 40 44 48 60 64 80 88 96 112 128
dark canvas       #0d1117 · borders #262c28 (muted) / #3d444d (default)
Actions run row   ~78px (two lines of metadata) · step row 40px
```

### Cross-product constants worth treating as the archetype's defaults

- **Control height: 32px.** GitHub `control-medium` 32, Vercel Geist button 32, Axiom input 28, Cloudflare docs button 36, Resend/Turso sidebar rows 32–36. The 44px "touch target" default from consumer design is wrong here and makes a dev tool feel like a marketing site.
- **Border radius: 4px or 6px.** Axiom 4, Geist 6, Primer 6, docs code blocks 8. Nothing in this archetype has a 12px card radius except Resend/Turso/Mintlify sidebar pills (r12 on a 32–36px row, which is nearly a stadium and reads as a *nav* affordance, not a card).
- **Borders are always exactly 1px, never 2px, never a shadow substitute.**
- **Transition duration: 150ms**, `cubic-bezier(.4,0,.2,1)`; popovers 200ms; overlays 300ms. Cloudflare's sidebar link: `background-color .15s cubic-bezier(0,0,.2,1), color .1s`.

## The decisions that make it work

**1. Two body sizes, chosen by reading mode, not by breakpoint.**
Stripe's guides run 16px/26px at a 474px measure (≈59 characters). Stripe's API reference runs 14px/22px at a 503px measure (≈72 characters) — same design system, same fonts, same week. The reference is scanned (you are hunting for `balance_transaction`), the guide is read (you are following steps). Tighter leading and a wider measure get more parameters on screen; looser leading and a narrower measure make prose readable. Clerk pushes this to 15px/**28px** — a 1.87 line-height — because its measure is 622px ≈ 83 characters and long lines need proportionally more leading to keep the eye on the return sweep.
*The generic alternative:* one `prose` class at 16px/1.75 everywhere, which makes your API reference 40% longer than it needs to be and forces the reader to scroll past three viewports of whitespace to find a parameter.
*When it does not apply:* if you have fewer than ~40 API endpoints, the reference isn't dense enough to justify a second scale — the switching cost exceeds the benefit. Use one scale until the reference actually hurts.

**2. Monospace is a semantic, not a texture.**
Axiom's dataset table sets every *quantity, identifier and date* in Berkeley Mono at 12px and every *human-written name and label* in Inter at 13px, in the same row. Supabase sets its docs section labels (`FUNDAMENTALS`, `ON THIS PAGE`) in uppercase Source Code Pro. GitHub renders a git ref inline in a step name at full length — `actions/checkout@de0fac2e4500dabe0009e67214ff5f5447ce83dd` — because a truncated SHA is useless. The rule: **mono means "this string is a machine value you might copy, diff, or type"**. `9.67B`, `ch_3MmlLrLkdIwHu7ix0snN0B15`, `01JHNZGYHGPW3QZBRN7Y3ZHZRK`, `3650 days`, `2026-08-26.dahlia`.
*The generic alternative:* mono as a "techy" font for headings and nav labels, which destroys the signal — once your section headers are mono, the reader can no longer tell an identifier from a label at a glance.
*When it does not apply:* prose. Nobody sets a docs paragraph in mono, and a mono `<h1>` reads as a 2014 startup landing page.

**3. Mono runs one step smaller than sans at the same optical size.**
Axiom ships two parallel scales: sans `10 / 11 / 13 / 15`, mono `10 / 12 / 14`. In the datasets table, 12px Berkeley Mono sits beside 13px Inter and they read as the same size, because monospace faces carry more ink per em. Modal: 16px Inter prose, 14px Fira Mono code. Cloudflare: 16px Inter prose, 14px JetBrains Mono code. Stripe guides: 16px prose, 13px Menlo code.
*The generic alternative:* setting code to the same px as prose, which makes every code block look shouty and unbalanced.
*When it does not apply:* Stripe's API reference sets its JSON panel at 14px against 14px prose — because the code panel is a separate column with its own background, not inline with the text, so the optical comparison never happens.

**4. Inline code is sized in `em`, or its line-height is pinned to the paragraph's.**
Primer: `--text-codeInline-size: 0.9285em`. Prisma: inline code is `13px/**28px**` — the line-height copied verbatim from the surrounding 16px/28px paragraph. Convex: `14.25px/14.25px` (lh 1.0). All three solve the same problem three ways: an inline `<code>` with its own larger line-height will silently push the lines around it apart, so a paragraph containing code has uneven leading.
*The generic alternative:* `code { font-size: 13px; padding: 2px 6px; border-radius: 4px; }` with an inherited line-height — the single most common typographic bug in AI-generated docs. Look at any paragraph with two inline code spans on different lines and you will see the leading jump.

**5. The environment/project switcher is path-shaped, not two dropdowns.**
Railway: `▲ / gravy-truck ⌄ / production ⌄` — logo, slash, project chevron, slash, environment chevron, then a tab row (`Architecture · Observability · Logs · Settings`) with a 2px purple underline on the active tab. Stripe puts the API version (`2026-08-26.dahlia ⌄`) in the same position. Cloudflare docs put the product scope (`⊞ Workers`) at the top of the sidebar.
*Why it works:* it mirrors the CLI's mental model (`railway up --environment production`), it makes the current scope readable in one saccade, and the slash makes the containment relationship explicit — an environment belongs to a project. Two independent `<select>` elements side by side do not communicate containment and get mis-set constantly.
*When it does not apply:* single-tenant products with one resource. Don't invent a hierarchy so you can render a breadcrumb.

**6. Infra changes stage and then apply.**
Railway floats a pill at the top of the canvas: `↻ 1 unapplied change  [Details]  [Deploy ⌘⏎]`. The Deploy button shows its own keyboard shortcut in a dimmer inline chip. This is `git add` / `terraform plan` rendered as UI: you make several edits, review the diff, and commit them in one operation.
*The generic alternative:* every field change fires a save and a toast, so a five-field edit produces five deploys and five toasts, and there's no moment where the user can see what they're about to do to production.
*When it does not apply:* read-only or low-stakes settings (theme, display density) — staging those is bureaucratic. The test is whether the change costs money or downtime.

**7. Time is rendered three different ways, and choosing wrong is the tell.**
- **Relative** for things that just happened and whose exact moment is irrelevant: GitHub Actions run list — `2 minutes ago`, `failed 3 weeks ago`. Railway — `Just deployed via GitHub`.
- **Absolute, no year, no seconds** for creation/audit dates: Axiom — `18 Nov 2024`, `06 Feb 2026` (in mono, dimmed, `DD Mon YYYY`).
- **Absolute with seconds and an explicit timezone control** for incidents and runs: Cloudflare Status — `Sep 9, 2026, 1:09 PM` with a `🌐 Local time ⌄` selector in the header. Inngest run table — `1/15/2025, 4:57:13 PM`.
- **Durations are always short-form units**: `8s`, `21s`, `3m 14s`. Never `194 seconds`, never `00:03:14`.
*The generic alternative:* `formatDistanceToNow()` on everything, which produces `about 2 months ago` on an incident postmortem — unusable for correlating with your own logs — and `less than a minute ago` on a row that will be stale by the time you read it.

**8. Docs now ship LLM affordances, and their absence dates a product.**
Every top-tier docs site measured in September 2026 has them, in the same position (top-right of the `h1`, or immediately under it):
- Stripe: `✨ Ask about this section | 📋 Copy for LLM | Ⓜ️ View as Markdown`
- Cloudflare: `🕐 Last updated Aug 25, 2026 | Copy as Markdown | View as Markdown | Agent setup`
- Supabase (right rail, under a mono `AI TOOLS` label): `Connect your AI agent · Copy as Markdown · Ask ChatGPT · Ask Claude`
- Modal: `📋 Copy page ⌄` · Inngest: `[Copy Markdown] [Open ⌄]` as solid buttons
- Supabase's **404 page** offers `Documentation · Sitemap · llms.txt` as recovery links.
*The generic alternative:* a copy-to-clipboard button on code blocks only. In 2026 that reads as a docs site last touched in 2023.

**9. Two scopes of switcher, and they are different components.**
Inngest puts a **language selector as a persistent `<select>` at the top of the sidebar** (`TS TypeScript`) — changing it reskins the entire tree, because a Python user should never see a TypeScript page. Cloudflare puts **package-manager tabs on the individual code block** (`npm | yarn | pnpm` in a segmented control in a header strip attached to the block, copy button at the right of the code line) — because that choice is per-snippet and shouldn't navigate you anywhere. Inngest additionally puts a `Learn | Reference` segmented toggle *above* the language selector: mode, then language, then tree.
*The generic alternative:* language tabs on every code block including the ones with only one language, and no global SDK scope — so a Python user scrolls past twelve TypeScript examples clicking "Python" on each.

**10. Show the structure, gate the payload.**
GitHub's Actions job page, logged out, renders: run title with status icon, run number, `failed 3 weeks ago in 3m 14s`, the full sidebar job list with per-job status, the complete step list with per-step status icons and full action refs, and a collapsed `Annotations / 1 error` disclosure at the top. Only the log *bodies* are replaced by a `Sign in to view logs` button in the header. You can diagnose most of the failure without an account.
*The generic alternative:* a full-page login wall, or a blurred screenshot with a modal over it — which is what Sentry's "Interactive Sandbox" does (a work-email form over a blurred issues list). If your product is credible, letting people see the shape of it is the best marketing you have; Axiom and Grafana Play both let you drive the real product with no account.

**11. Status vocabulary: icon + colour + a distinct glyph for the third state.**
GitHub's step list uses three glyphs that differ in *shape*, not just colour: a filled check circle (success), a filled ✕ circle in red (failure), and a hollow circle with a diagonal slash (skipped). Inngest uses a filled dot plus the word (`● Completed`). Cloudflare Status uses a filled amber pill for `Identified` and a green check + green text (no pill) for `Resolved` — visual weight descends as severity descends. Axiom labels a missing value `N/A` in dimmed mono rather than leaving the cell blank.
*The generic alternative:* a coloured dot with no shape difference, which is invisible to 8% of male developers, and an empty cell for "no data," which is indistinguishable from a rendering bug.

**12. Numbers are compacted, quotas are inline, counts are honest.**
Axiom's dataset table: `9.67B` events, `4.03 TB`, `275.96M`, `681.31 MB` — SI compaction to two decimals, unit attached directly for counts and space-separated for bytes. Field usage renders as `▍7/4096` — a tiny bar meter, the current value in full-contrast text, the limit dimmed — so the quota lives in the table instead of on a billing page. Retention is `3650 days`, not "10 years," because the API takes days. GitHub's Actions header says `2,500+ workflow runs` — it refuses to count precisely rather than lying with a number.
*The generic alternative:* `9,670,000,000` right-aligned with `tabular-nums`, and a separate "Usage" page you have to remember exists.
*Note on `tabular-nums`:* Axiom's computed `font-variant-numeric` is `normal` everywhere — because Berkeley Mono is already monospaced. **If your numbers are in mono, `tabular-nums` is redundant.** You need it only when numbers are set in a proportional sans, which is Clerk's problem and why Clerk's font stack is `geistNumbers, suisse` — a numerals-only webfont placed *ahead* of the text face.

## States, edges and the unglamorous parts

**Zero data — the hardest one, and where Grafana fails.** A Grafana stat panel auto-fits its text to the panel, so an empty panel renders the words **"No data"** at ~90px on a full-bleed blue gradient. The empty state becomes the loudest thing on the dashboard. The fix is the same one the timeseries panels on the same page get right: `No data` in *muted* text at normal size, centred, on the panel's normal background. **An empty state must never be higher-contrast than a full one.**

**First run / zero resources.** The best pattern here is not an illustration — it's the command. Fly, Railway, Modal, Cloudflare all converge on: one paste-able CLI line in a code block with a copy button, the package-manager tabs above it, and the expected output shown below. Cloudflare numbers its headings (`1. Create a new Worker project`, `2. Develop with Wrangler CLI`) so the right-rail TOC doubles as a progress checklist. Do not put a "Create your first project" empty state with a rocket illustration in front of a developer who already has a terminal open.

**Errors.** Two things separate credible from theatrical: (a) the error carries a **stable machine-readable code** you can grep and search — Stripe's `failure_code`, `network_status`, the whole `outcome` object rendered in the reference; (b) the error tells you *which* of your resources it happened to. `Failed to deploy` is useless; `Build failed for backend (production) — exit code 1 at step "Run pnpm build"` is not. GitHub summarises errors above the log (`Annotations · 1 error`) so you don't scroll 4000 lines to find the red line.

**Too much data.** Axiom's answer: a faceted left rail with counts (`Type: Internal 14, External 0` — **the zero-count facet is shown, not hidden**, because its absence is information), plus a search input scoped to the table. Cloudflare's answer for a 3000-page tree: a `Filter sidebar /` input above the nav. GitHub's answer for 2500 runs: five dropdown filters (`Workflow · Event · Status · Branch · Actor`) rendered as plain text buttons with carets, not boxed selects, so they don't out-weigh the rows.

**End of list.** Inngest's Dev Server run table ends with `No additional runs found.` + `Back to top` + a `↻ Refresh runs` button. Three things at the bottom of a finite list: confirmation that it's finite, a way back, and a way to re-check. Not an infinite spinner.

**404 / not found.** Three measured examples, ranked. Supabase: `Looking for something? 🔍` / `We couldn't find the page that you're looking for!` / `[Head back]` / `Documentation · Sitemap · llms.txt` — the recovery links do the work. Grafana: illustration + `Dashboard not found` + `We're looking but can't seem to find this dashboard. Please check the URL and try again.` + `[← Back to Home] [? Community Help]` — a primary action and an escalation path. Val Town: illustration + `Not found` + `This val could not be found.` + `[🏠 Home]` — correct but minimal. The pattern: name the missing *noun* (`dashboard`, `val`, `page`), not "Error 404."

**Permission denied.** Render everything the viewer is allowed to see and gate only the sensitive payload, in place, with a specific action label. GitHub's `Sign in to view logs` beats a generic `You do not have permission to view this page` by an enormous margin.

**API keys — the security/UX problem.** The conventions that actually ship: keys are shown in full **exactly once** at creation with a copy button and an explicit "you will not see this again" warning; thereafter only a prefix and last four characters (`re_1a2b…x9y0`), always in mono; every key carries a **name, a permission scope, and an optional resource restriction** (Resend: "name, permission, and optional domain restriction"); keys have **per-key logs** so you can attribute traffic and revoke the noisy one (Resend: "use multiple keys to isolate different application actions… view logs per key, detect possible abuse, and control any damage"); "Delete inactive API keys" is a first-class documented workflow, not a cleanup afterthought; and the same operations exist in the API and the CLI, with the docs saying *which* properties are dashboard-only ("Update an API key's name — other properties can only be edited in the Dashboard"). Publishable/secret and test/live keys are visually distinguished by prefix, not by a badge you'll forget to look at.

**Loading.** Dense tables get skeleton rows at the exact final row height (40px), not spinners — otherwise the layout jumps by hundreds of pixels. Log streams get a live tail with a follow toggle, not a full-page spinner between polls.

## Mobile

Measured desktop vs. 390px for five docs sites: **body size and code size do not change.** Stripe API ref is 14px/22px at both 1440 and 390. Cloudflare is 16px/28px at both. Clerk is 15px/28px at both. Code is 14px, 13px, 12px respectively at both. Only Resend scales its `h1` (36→30px); everyone else keeps the `h1` fixed. **Do not "scale down for mobile."** The type was already sized for reading; what changes is the number of columns.

What actually collapses:
- **The three-column API reference becomes one column and the code panel is dropped entirely**, not stacked. Stripe's mobile Charge-object page shows the attribute list with no JSON example at the top.
- **The sidebar becomes a scope indicator, not a hamburger.** Stripe's mobile header is `CHARGES ⌄` — your current position in the tree, tappable to open it. Far better than an anonymous ☰.
- **Hover-revealed affordances become persistent.** Stripe's per-attribute anchor-link icons are always visible on mobile since there is no hover.
- **The LLM affordances survive; the AI-chat one doesn't.** Stripe keeps `Copy for LLM | View as Markdown` on mobile and drops `Ask about this section`.

Dashboards mostly should not try. A logs table with seven columns of mono has no honest mobile form, and every product that attempts it produces a card list that is worse than a horizontally scrolling table. The defensible mobile scope for a dev platform dashboard is: **status, alerts, and one-tap actions** (redeploy, rollback, acknowledge) — the things you do from a phone at 2am. Everything else can say "open on desktop." One caution from measurement: Stripe's *guide* pages report `scrollWidth: 980` at a 390px viewport — the page horizontally overflows on mobile. If Stripe can ship that, check yours.

## How this archetype fails

The bad imitation is a marketing site wearing infrastructure's clothes. Specifically:

1. **Dark mode with no dark ramp.** A `#000` or `#0f172a` page, `#1e293b` cards, and `white`/`gray-400` text — three values where the real ones use fifteen. Panel edges disappear, hover has nowhere to go, and every surface floats at the same depth. The fix is Axiom's distribution: eleven steps below 50% luminance, two above.
2. **Drop shadows in dark mode.** Geist's legacy shadow tokens *collapse to a 1px ring* in dark, and its modern ones add `0 0 0 1px #ffffff25` alongside the shadow. A `box-shadow: 0 4px 12px rgba(0,0,0,.1)` on a dark surface is invisible; the card just has no edge.
3. **Consumer control sizing.** 44px rows, 12px radii, 16px body in the app chrome. Every measured product here sits at 28–40px controls, 4–6px radii, 13–14px chrome. A dev tool at consumer density looks like a Bubble app.
4. **Monospace as decoration.** Mono headings, mono nav labels, mono button text — which burns the one signal that tells a developer "this string is a machine value." Then the actual identifiers are set in Inter and nobody can tell them apart.
5. **Fake precision and fake imprecision.** `1,247,331 requests` where `1.25M` was wanted, and `about 2 months ago` where `Sep 9, 2026, 1:09 PM` was needed. Also: exact counts that are obviously estimates. GitHub writes `2,500+`.
6. **No version anywhere.** No API version selector, no SDK version in the install snippet, no "last updated" on the docs page, no version number in a deprecation note. Modal writes *"Prior to v0.73.82"*; Cloudflare stamps *"Last updated Aug 25, 2026"*; Stripe pins *`2026-08-26.dahlia`* in the header. A technical product with no visible versions reads as a demo.
7. **Empty states louder than full ones.** Illustrated 300px-tall zero states in a data table; giant "No data" text; a rocket-ship SVG where a copy-able CLI command belongs.
8. **No CLI, or a CLI the UI never mentions.** The credible products cross-reference constantly: Resend's docs say you can manage keys "using the API or the Resend CLI" and name which properties are dashboard-only. Cloudflare's first quickstart page is literally titled `CLI` with `Dashboard` as the sibling. If your dashboard never mentions a terminal, developers assume there isn't one.
9. **A gated demo.** Sentry's "Interactive Sandbox" is a work-email form over a blurred product. Axiom, Grafana Play, and GitHub's public Actions pages all let you drive the real thing. The gate signals "we're a sales motion," which is exactly the thing this archetype's users are scanning for.
10. **Default framework skin, unmodified.** Three of the products measured here (Resend, Turso, PlanetScale) share the identical Mintlify defaults: 36px sidebar rows, 12px radius pills, `paperMono`, `pad 6px 12px 6px 16px`. Resend has customised enough to have a voice; the others have not, and they are interchangeable. Same for Docusaurus's fractional type sizes (Convex's `14.25px`, `13.125px` — a giveaway that nobody touched the base font size).
11. **Illustrations where data belongs.** A hero with an abstract 3D render instead of the actual product canvas. Railway puts a real, working project canvas — with a real staged-change bar and a real service card — 700px down its own homepage.
12. **No named humans.** Vercel's changelog attributes every entry to specific engineers with stacked avatars: *"Kit Foster, Caleb Boyd, and 2 others."* Infrastructure credibility is partly the visible evidence that identifiable people are on the hook.

## Copy and tone

The voice is a competent colleague writing a commit message. Declarative, present tense, no adverbs, no exclamation marks, numbers wherever a number exists.

**Right:**
- `Password Protection is now $20 per month per protected project on Pro. Enterprise includes it at the team level.` (Vercel changelog — price, plan, and the exception, in two sentences)
- `failed 3 weeks ago in 3m 14s` (GitHub — outcome, when, how long, no labels)
- `Prior to v0.73.82, this function was named @modal.web_endpoint.` (Modal)
- `Amount intended to be collected by this payment. A positive integer representing how much to charge in the smallest currency unit (e.g., 100 cents to charge $1.00 or 100 to charge ¥100, a zero-decimal currency). The minimum amount is $0.50 US…` (Stripe — the definition, then the unit, then the edge cases, then the limits)
- `API keys are secret tokens used to authenticate your requests. They are unique to your account and must be kept confidential.` (Resend — says the obvious thing plainly rather than skipping it)
- `Testing background jobs, durable workflows, and event-driven functions locally is notoriously painful. Most solutions require running a full Redis stack, managing separate worker processes, or writing mocks that don't reflect how your code behaves in production.` (Inngest — names the specific pain before the pitch)
- `We're looking but can't seem to find this dashboard. Please check the URL and try again.` (Grafana — names the missing noun)
- `No additional runs found.` (Inngest — confirms the list is finite)
- `Ship software peacefully` (Railway — a hero line that is a claim about your working life, not about the technology)

**Wrong:**
- `Something went wrong!` / `Oops! An error occurred.` — no code, no resource, no action, and an exclamation mark about a production failure.
- `Supercharge your workflow with our blazing-fast, developer-first platform.` — three adjectives, zero facts.
- `Deploy in seconds ⚡` — an emoji doing the work a benchmark should do.
- `about 2 months ago` on an incident postmortem.
- `You do not have permission to view this page.` — no indication of what permission, from whom, or what to do.
- `Loading your amazing dashboard...` — an adjective in a loading state.
- `Get started in 3 easy steps!` — "easy" is a promise you're making on the user's behalf about their own competence.
- `We've made some improvements to the platform.` — a changelog entry that changelogs nothing. Compare Vercel's, which always names the resource, the plan, and the price.

Terminology discipline matters as much as tone: pick one noun per concept and never vary it. Railway says `service` and `environment` everywhere; Modal says `Function`, `App`, `entrypoint`; Axiom says `dataset`, `view`, `field`. Synonym drift ("project" in the nav, "app" in the docs, "workspace" in the billing page) is the single fastest way to make a technical product feel unowned.

## Sources

All URLs below were loaded at 1440×900 (and 390×844 where mobile is cited) between 2026-09-09; computed styles and CSS custom properties were extracted with a Playwright probe, screenshots were captured and viewed.

- `https://docs.stripe.com/api/charges/object` — three-column API reference; measured 14/22 prose at 503px, 260px sidebar, Source Code Pro 14/18.2 JSON panel; `Ask about this section / Copy for LLM / View as Markdown`; API version `2026-08-26.dahlia` in the header; `Show child attributes` progressive disclosure. Also viewed at 390px (code panel dropped, `CHARGES ⌄` scope header).
- `https://docs.stripe.com/payments/quickstart` — guide-mode typography, 16/26 at 474px, Menlo 13/20 code; measured `scrollWidth: 980` at a 390px viewport (horizontal overflow).
- `https://developers.cloudflare.com/workers/get-started/guide/` — `Filter sidebar /`, product-scope switcher, `Last updated Aug 25, 2026 | Copy as Markdown | View as Markdown | Agent setup`, npm/yarn/pnpm segmented control on the code block, numbered step headings mirrored in the right-rail TOC, `Was this helpful? [👍 Yes] [👎 No]`, `Edit page` / `Report issue`. Viewed at 390px too.
- `https://www.cloudflarestatus.com/` — active vs. resolved incident treatments, `Identified` / `Minor` severity pills, `Local time ⌄` timezone selector, `Sep 9, 2026, 1:09 PM` absolute timestamps, maintenance titled `AMS (Amsterdam) on 2026-09-09`.
- `https://play.axiom.co/axiom-play-qf1k/datasets` — full logged-out product; extracted 577 root CSS variables including the 15-step grey ramp, alpha overlay ramp, `--mono-text-size-*` / `--sans-text-size-*` dual scales, 4px default radius, dark shadow stack; measured 38/40/62px row heights and `11px 8px` cell padding.
- `https://vercel.com/geist/colors` — extracted Geist tokens: `--ds-gray-*-value` HSL ramps for both themes, `--geist-space-*`, `--ds-shadow-*`, `--geist-radius: 6px`, `font-feature-settings: "calt" 0, "rlig", "ss11"`.
- `https://vercel.com/changelog` — timeline rail with date ticks, per-entry engineer attribution with stacked avatars, filter pills, RSS.
- `https://github.com/vercel/next.js/actions` — run list, two-line ~78px rows, icon-only status, mono branch pill, `2,500+ workflow runs`, text-button filter row.
- `https://github.com/vercel/next.js/actions/runs/32617336090/job/97140065787` — logged-out job page: full step list with three distinct status glyphs, `failed 3 weeks ago in 3m 14s`, collapsed `Annotations / 1 error`, `Sign in to view logs` gating only the log bodies. Primer tokens extracted from the same origin (`--control-*-size`, `--borderRadius-*`, `--text-codeInline-size: 0.9285em`).
- `https://supabase.com/docs/guides/database/tables` and `/guides/auth` — uppercase-mono section labels, `AI TOOLS` rail (`Connect your AI agent / Copy as Markdown / Ask ChatGPT / Ask Claude`), `Is this helpful? ✕ ✓`, Manrope headings against Inter body at 15/28 w500.
- `https://supabase.com/features/table-editor` → 404 — `Looking for something? 🔍` with `Documentation · Sitemap · llms.txt` recovery links.
- `https://resend.com/docs/dashboard/api-keys/introduction` and `/docs/send-with-nodejs` — three docs modes as icon tabs, floating white content card on grey, split copy button on the `h1`, monitor/sun/moon theme switcher at the sidebar foot, underline-only prose links, the API-key management vocabulary quoted above.
- `https://clerk.com/docs/quickstarts/nextjs` — 15/28 prose at 622px, `geistNumbers, suisse` font stack, Söhne Mono at 13/24, 34px sidebar rows at weight 450.
- `https://modal.com/docs/guide/webhooks` and `/docs/guide` — dark-first docs, green unlined prose links, `Beta` sidebar pills, `Copy page ⌄`, three-level right-rail TOC, version-pinned deprecation note.
- `https://railway.com/` and `https://docs.railway.com/quick-start` — real product canvas embedded in the homepage, breadcrumb project/environment switcher, `1 unapplied change · Details · Deploy ⌘⏎` staged-change bar, IBM Plex Serif `h1` in the docs against Inter body.
- `https://www.inngest.com/docs/local-development` — `Learn | Reference` segmented toggle, persistent `TS TypeScript` sidebar language selector, `[Copy Markdown] [Open ⌄]`, `beta` / `new` badge variants, embedded Dev Server run table (mono ULIDs, `● Completed`, absolute timestamps with seconds, `No additional runs found.`).
- `https://play.grafana.org/d/aynhtvb/agent-observability` and `/d/000000012/...` (404) — the time-range control cluster, template-variable filter row, the oversized `No data` stat-panel failure, and a two-button 404 (`Back to Home` / `Community Help`).
- `https://sandbox.sentry.io/issues/` — work-email gate over a blurred issues list (cited as the anti-pattern).
- `https://val.town/x/stevekrouse/reactHonoStarter` (404) — minimal illustrated not-found with a single primary action.
- `https://www.unkey.com/` — GitHub star count and Discord in the nav, mono panel labels (`Branch Overview`, `Manage API Keys`, `Control Plane`, `Usage 30 Days`).
- Element-level probes also run against: `https://fly.io/docs/languages-and-frameworks/node/`, `https://docs.convex.dev/quickstart/nextjs`, `https://docs.turso.tech/quickstart`, `https://upstash.com/docs/redis/overall/getstarted`, `https://www.prisma.io/docs/orm/prisma-client/queries/crud`, `https://www.sanity.io/docs/studio`, `https://neon.com/docs/introduction`, `https://planetscale.com/docs/vitess/overview`, `https://vercel.com/docs/deployments`.
