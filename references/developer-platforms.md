# Developer Platforms and Technical Products

**Evaluated:** 2026-09

## What this archetype is for

Products whose user is holding a terminal in the other hand: hosting and compute (Vercel, Railway, Fly.io, Modal, Cloudflare), managed data (Supabase, Neon, PlanetScale, Turso, Upstash, Convex, Prisma), API primitives (Stripe, Resend, Clerk, Unkey), and observability (Sentry, Axiom, Grafana, GitHub Actions). The defining situation: the user is *blocked* — a deploy failed, a webhook 400s, a query is slow — and the UI is one of two or three surfaces they are triangulating between (terminal, editor, dashboard, docs). They already know what they want; the interface's only job is to not slow them down and to be *trustworthy about what is actually true right now*. This is why docs are a first-class product surface here and nowhere else, and why the aesthetic bar is "does this look like it was built by people who run production" rather than "is this delightful." It does **not** cover consumer SaaS with a technical flavor (Notion, Figma), internal admin tools (no docs surface, no public API), or AI chat products that happen to have an API key page.

## The reference set

| Product | Why it's here | The single thing to steal |
|---|---|---|
| **Stripe docs + API reference** | The only product that ships two different body sizes for two different reading modes, in one design system | Guides run 16px/26px at 474px (~59ch); the API reference runs **14px/22.4px at 503px (~72ch)** in a pinned three-column layout. Reference is scanned, prose is read — size them differently. |
| **Cloudflare docs** | 40+ sub-products and 3000+ pages navigated without an accordion tree | A **"Filter sidebar /" input above the nav tree**, plus a product-scope switcher at the top. When your tree exceeds ~30 items, add a filter, not more accordions. |
| **Axiom** (play.axiom.co) | Densest legible dark UI measured; open playground, no login | **Two parallel type scales** — sans 10/11/13/15, mono 10/12/14 — because mono needs to be ~1px smaller than sans to look the same size in the same row. |
| **Vercel / Geist** | The most-copied dev token system; worth copying correctly | `gray-700` (56% L) and `gray-800` (49% L) are **identical in light and dark**. Anchor your mid-greys so secondary text contrast doesn't flip when the theme does. |
| **GitHub (Primer) + Actions** | The canonical run/log/status vocabulary every CI UI is judged against | Inline code sized in **`em` (0.9285em), not px** — so it never disturbs the line box of whatever text it sits in. |
| **Railway** | A path-shaped scope switcher and a stage-then-apply model for infra | Breadcrumb-shaped switcher (`logo / gravy-truck ⌄ / production ⌄`) plus a floating **"1 unapplied change · Details · Deploy ⌘⏎"** bar. Infra changes stage, then apply. |
| **Resend docs** | Three docs modes as top-level icon tabs on a ~272px sidebar | Theme switcher as **three icons (monitor/sun/moon) at the bottom of the sidebar**, not a toggle in the header. System is a real third state. |
| **Modal docs** | Dark-first docs; version-precise deprecation notes | Deprecations name the exact version inline: *"Prior to v0.73.82, this function was named `@modal.web_endpoint`."* |
| **Clerk docs** | One typographic decision worth stealing outright | Body stack is `geistNumbers, suisse` — **a numerals-only webfont in front of the text face**, because the text face's default figures don't tabulate. |
| **Supabase docs** | Monospace used as a *labelling* device rather than as decoration | Section labels (`FUNDAMENTALS`, `ON THIS PAGE`, `AI TOOLS`) set in uppercase mono; body in Inter. Mono means "this is a system-level label," not "this is code." |
| **Inngest docs** (off-list) | Two switcher scopes, correctly separated, plus run-table conventions | **Language selector as a persistent sidebar `<select>`** ("TS TypeScript") that reskins the whole tree — global switch — separate from per-block package-manager tabs. |
| **Grafana / Grafana Play** (off-list) | The reference time-range control, and a cautionary empty state | The control cluster: `«  🕐 Last 30 minutes ⌄  »  🔍−  ↻ Refresh 30s ⌄` — window steppers flanking the picker, zoom-out, refresh with its own interval. |
| **Cloudflare Status** | The incident-timeline conventions | Absolute timestamps + an explicit **"Local time ⌄" timezone selector** in the header. Never relative time on an incident page. |
| **Fly.io docs** | The productive violation of every convention on this page | 17px/27.2px body at **weight 325** in a custom grotesk, headings in a serif-ish display face, purple-tinted body grey `rgb(76,78,103)`. It works because the voice matches. |

**Method for the two off-list products.** Search returns listicles, so the productive move is to curl the `play.`, `demo.` and `app.` subdomains of infra vendors looking for an unauthenticated product surface, and to look for docs that embed unretouched product screenshots rather than illustrations.
- **Axiom** — `play.axiom.co` serves the entire logged-out product (Datasets, Explorer, Dashboards). Its stylesheet exposes **1,019 computed root custom properties** including a 15-step neutral ramp and dual mono/sans type scales; it is the single richest token artifact in this teardown.
- **Inngest** — its docs embed screenshots of the local Dev Server at `localhost:8288`, the CLI/web-parity case that is otherwise unstudiable without an account.
- Dead ends worth knowing: `app.unkey.com` returns 429 to a probe, `depot.dev` times out on screenshot, and Sentry's "Interactive Sandbox" is a work-email form over a blurred issues list.

## Measured specifics

### Docs typography (measured at 1440×900, computed styles)

| Product | Body prose | Measure | h1 | h2 | Code block | Inline code | Sidebar row |
|---|---|---|---|---|---|---|---|
| Stripe **API ref** | 14px/22.4px (1.60) | 503px ≈ 72ch | 24/32 w700 | — | 14/18.2 Source Code Pro (1.30), pad 8/16 | 11.9/20 w500, pad 2/4, r6, 1px `#d4dee9` | — |
| Stripe **guides** | 16px/26px (1.63) | 474px ≈ 59ch | 32/normal w700 | 21 w700 | 13/20 Menlo | 14.4/**26** Menlo on `#f4f7fa`, pad 2/4, r6 — lh copied from the paragraph | — |
| Cloudflare | 16px/28px (1.75) | 648px ≈ 81ch | 35/43.75 w600 ls −0.875 | 20.8/36.4 w600 ls −0.312 | 14/22.75 JetBrains Mono, pad 12/16 | 14/24.5 w450, `oklch(.687 .208 38.8)` on `oklch(.985 0 0)`, 1px `oklch(.92 0 0)`, r6, pad 2/6 | 40px, 13/19.5 w500 |
| Clerk | 15px/28px (**1.87**) | 696px top-level / 622px inside a numbered step | 32/40 w600 ls −0.48 | 20/28 w600 ls −0.3 | 13/24 Söhne Mono | — | 34px, 14/20 **w450**, pad 7/8, r6 |
| Resend | 16px/28px | ~575px | 36/40 w600 ls −0.9 | — | 14/24 paperMono | 14/21 w400, pad 2/8, r6 | 32px, pad 6/12/6/16, **r12** |
| Modal (dark) | 16px/24px | 784px | 36/45 w500 ls −0.9 | 24/33 w500 | 14/20 Fira Mono | 14/20 on `#242424`, r4, pad 2/4 | 36px, 14/20 w500, pad 8/16 |
| Supabase | 15px/28px **w500** | 706px | 34/37.8 w600 Manrope | 22/29.3 w600 | — | — | — |
| Prisma | 16px/28px **w380** | 747px | 36/41.4 w500 Sora | 24/32 w500 | 13/20 monaSansMono | 13px/**28px** (lh matched to prose), r5, pad 3 | 36px, 14/20 w500, r10 |
| Railway | 16px/28px | 628px | 36/40 w600 **IBM Plex Serif** | 24/32 w600 Inter | — | 14/20 JetBrains Mono on `#f0eff5`, r8, pad 2/6 | 26px, 14/20 |
| Upstash | 15px/22.5px (1.5) | 521px | 30/36 w600 ls −0.75 | 20/28 w500 | 14/22 ui-monospace | 14/21 w500, r5, pad 2.1/5.6 | — |
| Turso | — | — | 36/40 w600 ls −0.9 | 16/24 w600 | 14/24 paperMono | 14/21 w500, r6, pad 2/8 | 36px, r12 |
| Convex | 15px/24px | **1110px ≈ 148ch** (see failure 13) | 37.5/46.9 w700 GT America | — | 14.25/20.66 | 14.25/22.8 w400, but 14.25/**14.25** w700 for the linked variant — inconsistent on one page | — |
| Fly.io | 17px/27.2px **w325** | 768px | 30/37.5 w500 Mackinac | 24/31.8 w500 | — | — | 35px, 14.5/23 w500, r8 |

Body-copy colour is never pure black or pure white: Cloudflare `oklch(.21 0 0)`, Stripe guides `rgb(60,66,87)` but Stripe API reference `rgb(26,44,68)` (the reference runs darker because it is smaller), Clerk `rgb(66,67,77)`, Railway `rgb(101,99,110)`, Prisma `oklab(.3517 … / 0.9)`, Fly `rgb(76,78,103)`, Modal (dark) `rgb(209,209,209)`.

### Docs layout geometry (1440px viewport)

| | Left nav | Content column | Right TOC | Header |
|---|---|---|---|---|
| Stripe API ref | 260px @ x16 | 503px prose + ~500px code panel @ x882 | — (the code panel *is* the third column) | 56px, 1px `#d4dee9` |
| Cloudflare | 300px @ x0 | 852px region / 648px prose @ x402 | 288px @ x1152 (232px inner) | 57px, 1px `oklch(.92 0 0)` |
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
borders          --border-faint #222 · --border-muted #2a2a2a · --border-base #3a3a3a · --border-strong #b4b4b4
                 (all 1px; light-mode twins #f0f0f0 / #e8e8e8 / #d9d9d9 / #646464)
radius           4px default (button/dropdown) · 2px tooltip · 6px, 8px rare
                 a --ax-radius-full: 9999px token exists, used only for avatars and pills
type scale       sans 10 / 11 / 13 / 15 px      mono 10 / 12 / 14 px
line-height      16px for every size at 13px and below
table            header row 40px · single-line data row 40.9px · two-line row 62px · cell pad 11px 8px
                 live-tail log row 61px · stream cell pad 6px 10px   (re-measured 2026-09-10)
input            28px tall · pad 5px 8px · r4 · 1px #2a2a2a   (re-measured 2026-09-10)
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

- **Control height: 28–32px in an app, 36px on a docs surface.** GitHub `control-medium` 32, Axiom input 28, Primer 32 — against Geist's **small 32 / default 36 / large 40**, of which Vercel's own docs render the 36. "Geist button = 32" is the *small* size; copying it as your default is an accident. Cloudflare docs button 36, Resend/Turso sidebar rows 32–36. The 44px "touch target" default from consumer design is wrong here and makes a dev tool feel like a marketing site.
- **Border radius: 4px or 6px.** Axiom 4, Geist 6, Primer 6, docs code blocks 8. Nothing in this archetype has a 12px card radius except Resend/Turso/Mintlify sidebar pills (r12 on a 32–36px row, which is nearly a stadium and reads as a *nav* affordance, not a card).
- **Borders are always exactly 1px, never 2px, never a shadow substitute.**
- **Transition duration: 150ms**, `cubic-bezier(.4,0,.2,1)`; popovers 200ms; overlays 300ms. Cloudflare's sidebar link: `background-color .15s cubic-bezier(0,0,.2,1), color .1s`.

## The decisions that make it work

**1. Two body sizes, chosen by reading mode, not by breakpoint.**
Stripe's guides run 16px/26px at a 474px measure (≈59 characters). Stripe's API reference runs 14px/22.4px at a 503px measure (≈72 characters) — same design system, same fonts, same week. The reference is scanned (you are hunting for `balance_transaction`), the guide is read (you are following steps). Tighter leading and a wider measure get more parameters on screen; looser leading and a narrower measure make prose readable. Clerk pushes this to 15px/**28px** — a 1.87 line-height — because its measure is 622px ≈ 83 characters and long lines need proportionally more leading to keep the eye on the return sweep.
*The generic alternative:* one `prose` class at 16px/1.75 everywhere, which makes your API reference 40% longer than it needs to be and forces the reader to scroll past three viewports of whitespace to find a parameter.
*When it does not apply:* below roughly 40 endpoints the reference isn't dense enough to repay a second scale. It also fails when the two modes share a page — a guide with a long parameter table inside it should stay at one size, because two scales stacked vertically read as a rendering bug rather than a mode change. The second scale needs its own route.

**2. Monospace is a semantic, not a texture.**
Axiom's dataset table sets every *quantity, identifier and date* in Berkeley Mono at 12px and every *human-written name and label* in Inter at 13px, in the same row. Supabase sets its docs section labels (`FUNDAMENTALS`, `ON THIS PAGE`) in uppercase Source Code Pro. GitHub renders a git ref inline in a step name at full length — `actions/checkout@de0fac2e4500dabe0009e67214ff5f5447ce83dd` — because a truncated SHA is useless. The rule: **mono means "this string is a machine value you might copy, diff, or type"**. `9.67B`, `ch_3MmlLrLkdIwHu7ix0snN0B15`, `01JHNZGYHGPW3QZBRN7Y3ZHZRK`, `3650 days`, `2026-08-26.dahlia`.
*The generic alternative:* mono as a "techy" font for headings and nav labels, which destroys the signal — once your section headers are mono, the reader can no longer tell an identifier from a label at a glance.
*When it does not apply:* prose — nobody sets a docs paragraph in mono, and a mono `<h1>` reads as a 2014 startup landing page. It also breaks down where the machine value is *long*: GitHub renders the full `actions/checkout@de0fac2e…ce83dd` ref at 1440px, but truncates the same string with an ellipsis at 390px, which destroys the copy/diff affordance the mono was signalling. If a value can exceed the container, mono is not enough — it needs a copy button or a wrap rule, not a middle-truncation.

**3. Mono runs one step smaller than sans at the same optical size.**
Axiom ships two parallel scales: sans `10 / 11 / 13 / 15`, mono `10 / 12 / 14`. In the datasets table, 12px Berkeley Mono sits beside 13px Inter and they read as the same size, because monospace faces carry more ink per em. Modal: 16px Inter prose, 14px Fira Mono code. Cloudflare: 16px Inter prose, 14px JetBrains Mono code. Stripe guides: 16px prose, 13px Menlo code.
*The generic alternative:* setting code to the same px as prose, which makes every code block look shouty and unbalanced.
*When it does not apply:* when the two faces never sit in the same optical field. Stripe's API reference sets its JSON panel at 14px against 14px prose, because the panel is a separate column with its own background 379px away. The one-step rule is about adjacency, not about mono in general — and it inverts for very small sizes, where a 10px mono is already at its legibility floor and dropping below the sans would be unreadable (Axiom's scales converge at 10px for exactly this reason).

**4. Inline code is sized in `em`, or its line-height is pinned to the paragraph's.**
Primer: `--text-codeInline-size: 0.9285em` (verified in Primer's live token set). Prisma: inline code is `13px/**28px**` — the line-height copied verbatim from the surrounding 16px/28px paragraph. Stripe's guides: `14.4px/**26px**` against a 16px/26px paragraph — both numbers derived from the paragraph, not chosen. Three products, three mechanisms, one problem: an inline `<code>` with its own larger line-height silently pushes apart the lines around it, so a paragraph containing code has uneven leading.
*The generic alternative:* `code { font-size: 13px; padding: 2px 6px; border-radius: 4px; }` with an inherited line-height — the single most common typographic bug in AI-generated docs. Look at any paragraph with two inline code spans on different lines and you will see the leading jump.
*The counterexample, measured:* Convex sets inline code at `14.25px/22.8px` in prose but `14.25px/14.25px` on the *linked* variant, on the same page — so its own paragraphs jump. Pinning the line-height only works if every inline-code variant is pinned; one unstyled `<a><code>` reintroduces the bug.
*When it does not apply:* headings and table cells, where the line box is set by the row rather than the text, and where a `0.9285em` code span inside a 32px `h1` will look undersized. Size inline code inside a heading relative to that heading, or leave it at the heading's size and change only the weight.

**5. The environment/project switcher is path-shaped, not two dropdowns.**
Railway: `▲ / gravy-truck ⌄ / production ⌄` — logo, slash, project chevron, slash, environment chevron, then a tab row (`Architecture · Observability · Logs · Settings`) with a 2px purple underline on the active tab. Stripe puts the API version (`2026-08-26.dahlia ⌄`) in the same position. Cloudflare docs put the product scope (`⊞ Workers`) at the top of the sidebar.
*Why it works:* it mirrors the CLI's mental model (`railway up --environment production`), it makes the current scope readable in one saccade, and the slash makes the containment relationship explicit — an environment belongs to a project. Two independent `<select>` elements side by side do not communicate containment and get mis-set constantly.
*When it does not apply:* two ways. Single-tenant products with one resource — don't invent a hierarchy so you can render a breadcrumb. And **orthogonal axes are correctly two dropdowns**: Stripe's quickstart puts `Frontend: HTML ⌄` and `Backend: Ruby ⌄` side by side at the top of the guide, because a backend does not contain a frontend. The slash is a claim about containment; use it only when the claim is true.

**6. Infra changes stage and then apply.**
Railway floats a pill at the top of the canvas: `↻ 1 unapplied change  [Details]  [Deploy ⌘⏎]`. (State-dependent — the homepage canvas re-shot on 2026-09-10 was in its empty `Create ›` command-palette state, with no staged changes and therefore no bar. Verify against a project that has pending edits, not the marketing screenshot.) The Deploy button shows its own keyboard shortcut in a dimmer inline chip. This is `git add` / `terraform plan` rendered as UI: you make several edits, review the diff, and commit them in one operation.
*The generic alternative:* every field change fires a save and a toast, so a five-field edit produces five deploys and five toasts, and there's no moment where the user can see what they're about to do to production.
*When it does not apply:* read-only or low-stakes settings (theme, display density) — staging those is bureaucratic. The test is whether the change costs money or downtime.

**7. Time is rendered three different ways, and choosing wrong is the tell.**
- **Relative** for things that just happened and whose exact moment is irrelevant: GitHub Actions run list — `2 minutes ago`, `failed 3 weeks ago`. Railway — `Just deployed via GitHub`.
- **Absolute, no year, no seconds** for creation/audit dates: Axiom — `18 Nov 2024`, `06 Feb 2026` (in mono, dimmed, `DD Mon YYYY`).
- **Absolute with seconds and an explicit timezone control** for incidents and runs: Cloudflare Status — `Sep 9, 2026, 1:09 PM` with a `🌐 Local time ⌄` selector in the header. Inngest run table — `1/15/2025, 4:57:13 PM`.
- **Durations are always short-form units**: `8s`, `21s`, `3m 14s`. Never `194 seconds`, never `00:03:14`.
*The generic alternative:* `formatDistanceToNow()` on everything, which produces `about 2 months ago` on an incident postmortem — unusable for correlating with your own logs — and `less than a minute ago` on a row that will be stale by the time you read it.
*When it does not apply:* relative time is right, not wrong, when the row is *live* and the reader is watching it change — a running deploy, a tailing log. An absolute timestamp on a row that updates every second is noise. And absolute time without a timezone control is worse than relative time, because the reader cannot tell whose clock it is; if you cannot ship the selector, ship the offset in the string.

**8. Docs now ship LLM affordances, and their absence dates a product.**
Every top-tier docs site measured in September 2026 has them, in the same position (top-right of the `h1`, or immediately under it):
- Stripe: `✨ Ask about this section | 📋 Copy for LLM | Ⓜ️ View as Markdown`
- Cloudflare: `🕐 Last updated Aug 25, 2026 | Copy as Markdown | View as Markdown | Agent setup`
- Supabase (right rail, under a mono `AI TOOLS` label): `Connect your AI agent · Copy as Markdown · Ask ChatGPT · Ask Claude`
- Modal: `📋 Copy page ⌄` · Inngest: `[Copy Markdown] [Open ⌄]` as solid buttons
- Supabase's **404 page** offers `Documentation · Sitemap · llms.txt` as recovery links.
*The generic alternative:* a copy-to-clipboard button on code blocks only. In 2026 that reads as a docs site last touched in 2023.
*When it does not apply:* the *hosted-chat* affordances (`Ask ChatGPT`, `Ask Claude`) send your page to a third party and are wrong for docs behind an NDA, docs describing an unreleased version, or anything where a wrong answer costs money. The *export* affordances (`Copy as Markdown`, `View as Markdown`, `llms.txt`) carry none of that risk and are the ones to ship first. Stripe already splits them by surface — it keeps `Copy for LLM` on mobile and drops `Ask about this section`.

**9. Two scopes of switcher, and they are different components.**
Inngest puts a **language selector as a persistent `<select>` at the top of the sidebar** (`TS TypeScript`) — changing it reskins the entire tree, because a Python user should never see a TypeScript page. Cloudflare puts **package-manager tabs on the individual code block** (`npm | yarn | pnpm` in a segmented control in a header strip attached to the block, copy button at the right of the code line) — because that choice is per-snippet and shouldn't navigate you anywhere. Inngest additionally puts a `Learn | Reference` segmented toggle *above* the language selector: mode, then language, then tree.
*The generic alternative:* language tabs on every code block including the ones with only one language, and no global SDK scope — so a Python user scrolls past twelve TypeScript examples clicking "Python" on each.

**10. Show the structure, gate the payload.**
GitHub's Actions job page, logged out, renders: run title with status icon, run number, `failed 3 weeks ago in 3m 14s`, the full sidebar job list with per-job status, the complete step list with per-step status icons and full action refs, and a collapsed `Annotations / 1 error` disclosure at the top. Only the log *bodies* are replaced by a `Sign in to view logs` button in the header. You can diagnose most of the failure without an account.
*The generic alternative:* a full-page login wall, or a blurred screenshot with a modal over it — which is what Sentry's "Interactive Sandbox" does (a work-email form over a blurred issues list). If your product is credible, letting people see the shape of it is the best marketing you have; Axiom and Grafana Play both let you drive the real product with no account.
*When it does not apply:* when the shape **is** the secret. A single-tenant admin console leaks the customer list through its own nav; an ACL-scoped resource tree tells an attacker what exists. The test is whether the structure is public knowledge that happens to be rendered (a workflow's step names, an API's object graph) or private knowledge encoded as structure (row counts, tenant names, feature entitlements). Rendering costs, too — a logged-out page that hydrates a real query is a free-tier DoS surface, which is why Grafana Play pins fixed demo dashboards rather than a live query editor.
*And the honest caveat on Axiom:* the playground opens with an "Introduction" modal over the datasets table, so the first thing a logged-out visitor sees is an interstitial, not the product. At 390px that modal renders with overlapping headline text and clipped cards. Structure-first only pays if nothing is parked in front of it.

**11. Status vocabulary: icon + colour + a distinct glyph for the third state.**
GitHub's step list uses three glyphs that differ in *shape*, not just colour: a filled check circle (success), a filled ✕ circle in red (failure), and a hollow circle with a diagonal slash (skipped). Inngest uses a filled dot plus the word (`● Completed`). Cloudflare Status uses a filled amber pill for `Identified` and a green check + green text (no pill) for `Resolved` — visual weight descends as severity descends. Axiom labels a missing value `N/A` in dimmed mono rather than leaving the cell blank.
*The generic alternative:* a coloured dot with no shape difference, which is invisible to 8% of male developers, and an empty cell for "no data," which is indistinguishable from a rendering bug.
*When it does not apply:* a list where every row has the same state — a table of 200 successful runs gains nothing from 200 green checks, and the glyph column becomes texture. Render the glyph only where the state varies, or invert it and mark only the exceptions. The three-shape rule also caps out at about five states; past that, glyph shape stops being learnable and you need the word.

**12. Numbers are compacted, quotas are inline, counts are honest.**
Axiom's dataset table: `9.67B` events, `4.03 TB`, `275.96M`, `681.31 MB` — SI compaction to two decimals, unit attached directly for counts and space-separated for bytes. Field usage renders as `▍7/4096` — a tiny bar meter, the current value in full-contrast text, the limit dimmed — so the quota lives in the table instead of on a billing page. Retention is `3650 days`, not "10 years," because the API takes days. GitHub's Actions header says `2,500+ workflow runs` — it refuses to count precisely rather than lying with a number.
*The generic alternative:* `9,670,000,000` right-aligned with `tabular-nums`, and a separate "Usage" page you have to remember exists.
*Note on `tabular-nums`:* Axiom's computed `font-variant-numeric` is `normal` everywhere — because Berkeley Mono is already monospaced. **If your numbers are in mono, `tabular-nums` is redundant.** You need it only when numbers are set in a proportional sans, which is Clerk's problem and why Clerk's font stack is `geistNumbers, suisse` — a numerals-only webfont placed *ahead* of the text face.
*When it does not apply:* compaction destroys the value where the exact digits are the point — an invoice line, a diff of two counts, a quota you are about to be billed for, anything the user will paste into a ticket. Axiom compacts the `Events` column to `9.67B` but leaves `Retention` at `3650 days` and the field quota at `7/4096`, both exact, because both are values you act on. Compact what is being *scanned*; leave exact what is being *used*. And never compact a number the reader must compare to a threshold they hold in their head.

## States, edges and the unglamorous parts

**Zero data — the hardest one, and where Grafana fails.** A Grafana stat panel auto-fits its text to the panel, so an empty panel renders the words **"No data"** at ~90px on a full-bleed blue gradient. The empty state becomes the loudest thing on the dashboard. The fix is the same one the timeseries panels on the same page get right: `No data` in *muted* text at normal size, centred, on the panel's normal background. **An empty state must never be higher-contrast than a full one.**

**First run / zero resources.** The best pattern here is not an illustration — it's the command. Fly, Railway, Modal, Cloudflare all converge on: one paste-able CLI line in a code block with a copy button, the package-manager tabs above it, and the expected output shown below. Cloudflare numbers its headings (`1. Create a new Worker project`, `2. Develop with Wrangler CLI`) so the right-rail TOC doubles as a progress checklist. Do not put a "Create your first project" empty state with a rocket illustration in front of a developer who already has a terminal open.

**Where the code runs.** Stripe's quickstart tags every code block with a dim mono `Server` or `Client` marker below it, and pairs `Frontend: HTML ⌄` with `Backend: Ruby ⌄` as two global selectors at the top of the page. A snippet with no execution context is the reason people paste secret keys into browser bundles. If your quickstart spans a boundary, label the side.

**Severity descends as visual weight descends — at the card level, not just the pill.** Cloudflare Status renders an active incident as a filled pale-yellow card with a 1px amber border and an `Identified` pill; a resolved one as a flat grey card with no border, a green check and green text, no pill. The card, the border, the fill and the pill all move together. A design that keeps one card treatment and only swaps the pill colour makes the reader hunt for severity instead of seeing it.

**Errors.** Two things separate credible from theatrical: (a) the error carries a **stable machine-readable code** you can grep and search — Stripe's `failure_code`, `network_status`, the whole `outcome` object rendered in the reference; (b) the error tells you *which* of your resources it happened to. `Failed to deploy` is useless; `Build failed for backend (production) — exit code 1 at step "Run pnpm build"` is not. GitHub summarises errors above the log (`Annotations · 1 error`) so you don't scroll 4000 lines to find the red line.

**Too much data.** Axiom's answer: a faceted left rail with counts (`Type: Internal 14, External 0` — **the zero-count facet is shown, not hidden**, because its absence is information), plus a search input scoped to the table. Cloudflare's answer for a 3000-page tree: a `Filter sidebar /` input above the nav. GitHub's answer for 2500 runs: five dropdown filters (`Workflow · Event · Status · Branch · Actor`) rendered as plain text buttons with carets, not boxed selects, so they don't out-weigh the rows.

**End of list.** Inngest's Dev Server run table ends with `No additional runs found.` + `Back to top` + a `↻ Refresh runs` button. Three things at the bottom of a finite list: confirmation that it's finite, a way back, and a way to re-check. Not an infinite spinner.

**404 / not found.** Three measured examples, ranked. Supabase: `Looking for something? 🔍` / `We couldn't find the page that you're looking for!` / `[Head back]` / `Documentation · Sitemap · llms.txt` — the recovery links do the work. Grafana: illustration + `Dashboard not found` + `We're looking but can't seem to find this dashboard. Please check the URL and try again.` + `[← Back to Home] [? Community Help]` — a primary action and an escalation path. Val Town: illustration + `Not found` + `This val could not be found.` + `[🏠 Home]` — correct but minimal. The pattern: name the missing *noun* (`dashboard`, `val`, `page`), not "Error 404."

**Permission denied.** Render everything the viewer is allowed to see and gate only the sensitive payload, in place, with a specific action label. GitHub's `Sign in to view logs` beats a generic `You do not have permission to view this page` by an enormous margin.

**API keys — the security/UX problem.** The conventions that actually ship: keys are shown in full **exactly once** at creation with a copy button and an explicit "you will not see this again" warning; thereafter only a prefix and last four characters (`re_1a2b…x9y0`), always in mono; every key carries a **name, a permission scope, and an optional resource restriction** (Resend: "name, permission, and optional domain restriction"); keys have **per-key logs** so you can attribute traffic and revoke the noisy one (Resend: "use multiple keys to isolate different application actions… view logs per key, detect possible abuse, and control any damage"); "Delete inactive API keys" is a first-class documented workflow, not a cleanup afterthought; and the same operations exist in the API and the CLI, with the docs saying *which* properties are dashboard-only ("Update an API key's name — other properties can only be edited in the Dashboard"). Publishable/secret and test/live keys are visually distinguished by prefix, not by a badge you'll forget to look at.

**Loading.** Dense tables get skeleton rows at the exact final row height (40px), not spinners — otherwise the layout jumps by hundreds of pixels. Log streams get a live tail with a follow toggle, not a full-page spinner between polls.

## Mobile

**Nothing scales.** Measured at 1440 and again at 390: Stripe's API reference is 14px/22.4px at both. Cloudflare is 16px/28px at both. Clerk is 15px/28px at both. Code is 14px, 13px and 12px respectively at both. GitHub's Actions **step rows are 40px tall at 14px at both widths** — identical row height, identical type, only the container narrows (1054px → 390px). Only Resend scales its `h1` (36→30px). The type was already sized for reading; what changes is the number of columns and what gets dropped.

What actually collapses, all measured:
- **The three-column API reference becomes one column and the code panel is dropped entirely**, not stacked. Stripe's mobile Charge-object page shows the attribute list with no JSON example at the top.
- **The sidebar becomes a scope indicator, not a hamburger.** Stripe's mobile header is `CHARGES ⌄` — your position in the tree, tappable to open it. GitHub does the same on a job page: the desktop left rail of jobs collapses into a second header line reading `✕ Test Examples (20) ⌄`, keeping the failure glyph and the job name. Two independent products converged on "current node plus chevron," not on ☰.
- **A tab row becomes a fixed bottom bar, not a select.** Cloudflare Status turns its four-item segmented row (`Overview · Services & Sites · Locations · History`) into a fixed icon-only bottom tab bar. Note the defect while you copy the pattern: the icons ship **without labels**, and a server glyph for "Services & Sites" is not guessable. Label them.
- **One control is worth keeping in the mobile header, and it is the one that changes what the numbers mean.** Cloudflare Status drops `Support` and `Dashboard` and shrinks the wordmark to the mark, but keeps `🌐 Local time ⌄` at full size. On an incident page the timezone selector is not chrome.
- **Rows restack in severity order, not source order.** A Cloudflare incident row goes from `title | severity | status | timestamp` on one line to title → `Identified` pill → product tag stacked — the pill is promoted above the tag it sat after on desktop.
- **Hover-revealed affordances become persistent.** Stripe's per-attribute anchor-link icons are always visible at 390px since there is no hover.
- **The LLM export affordances survive; the AI-chat one doesn't.** Stripe keeps `Copy for LLM | View as Markdown` on mobile and drops `Ask about this section`.
- **The primary gated action gets demoted into an overflow.** GitHub's `Sign in to view logs` is a visible header button at 1440 and is buried under `…` at 390. This is a regression, not a pattern — the one action a logged-out reader came for should survive the breakpoint.

**Two products that decline mobile, and the honest way to do it.**
- **Stripe's guides ship no `<meta name="viewport">` at all.** At a 390pt viewport the page lays out at the 980px legacy default and the browser zooms the whole thing out; 16px body renders at roughly 6.4 effective pixels. But Stripe *says so*: a banner at the top reads `This page is optimized for wider screens. You might prefer the text version of this guide.` with a link to a single-column alternate. Declining mobile and routing to a document that works is defensible. Silently shipping a 980px page is not — and Stripe's own API reference does ship `width=device-width`, so the guide's omission is a deliberate split, not an oversight.
- **Railway drops its product canvas entirely at 390** and substitutes a customer logo wall. The product that leads with a real, working canvas 500px down its desktop homepage does not shrink that canvas; it removes it.

**Dashboards mostly should not try.** A logs table with seven columns of mono has no honest mobile form, and the card list that replaces it is worse than a horizontally scrolling table. The defensible mobile scope for a dev-platform dashboard is **status, alerts, and one-tap actions** (redeploy, rollback, acknowledge) — what you do from a phone at 2am. Everything else can say "open on desktop."

**But an unresponsive dashboard is not a licence for an unresponsive modal.** Axiom's playground is desktop-only, which is fine; its onboarding modal still opens at 390px, where the headline "Explore the Axiom Playground" overlaps itself, three feature cards are clipped mid-word, and two buttons render on top of each other. Interstitials, auth screens, error pages and email-linked routes are the surfaces a phone will reach whatever you intend. Those have to work at 390 even when the product behind them doesn't.

## How this archetype fails

The failure mode is not "ugly." It is a marketing site wearing infrastructure's clothes: correct components, consumer proportions, no evidence that anything is actually running. Each item below pairs a **grep-able tell** an agent can run against its own output with the **fix** and the product that demonstrates it. If three or more tells fire, the surface is a mock, not a dev tool.

1. **Dark mode with no dark ramp.**
   *Artifact:* `bg-slate-900` page, `bg-slate-800` cards, `text-white` / `text-gray-400`.
   *Tell:* count the distinct background and border values below 50% luminance in your stylesheet. If the answer is under six, you have no ramp. The real ones ship eleven: Axiom runs `#0b0b0b #0d0d0d #111111 #191919 #222222 #2a2a2a #313131 #3a3a3a #484848 #606060 #6e6e6e` before its first text value.
   *Fix:* twelve steps below 50% L, three above — `#7b7b7b` (48% L) is the last step below the midpoint, and `#b4b4b4 #eeeeee #ffffff` are the entire light half. Tailwind's evenly-spaced `neutral-950…50` gives you the opposite distribution and is the direct cause of the muddy, edgeless panels.
2. **Drop shadows in dark mode.**
   *Tell:* any `box-shadow` in a dark block whose colour is `rgba(0,0,0,…)` and whose spread carries no `0 0 0 1px` ring term.
   *Fix:* Geist's legacy shadow tokens *collapse to a 1px ring* in dark and its modern ones add `0 0 0 1px #ffffff25` alongside the blur. Black shadow on a near-black surface is invisible; the card simply has no edge. Elevation in dark comes from a 4% luminance step (0%→4% in Geist) plus a ring — roughly double the 2% step light mode needs.
3. **Consumer control sizing.**
   *Tell:* `h-11` / `44px` rows, `rounded-xl`, `py-3`, 16px body inside app chrome, `gap-6` between dense controls.
   *Fix:* every measured product sits at 28–40px controls (Primer's default is `--control-medium-size: 2rem`, Axiom's input is 28px), 4–6px radii, 13–14px chrome text. The 44px touch-target default is a mobile rule imported into a desktop tool; it makes the product read as a Bubble app.
4. **Monospace as decoration.**
   *Tell:* `font-mono` on any `h1`, `h2`, nav item, button label or metric *label*; simultaneously, an ID, SHA, timestamp or size rendered in the sans body face.
   *Fix:* mono means "machine value you might copy, diff or type." One rule, applied both directions.
5. **Fake precision and fake imprecision.**
   *Tell:* `toLocaleString()` on a metric above ~1e5 (`1,247,331 requests` where `1.25M` was wanted); `formatDistanceToNow()` on anything with a permalink; a count rendered exactly that was derived from a sampled or capped query.
   *Fix:* compact what is scanned, keep exact what is acted on, and when the number is an estimate, say so the way GitHub does — `2,500+ workflow runs`.
6. **No version anywhere.**
   *Tell:* grep your rendered output for a `v`-prefixed semver, an API date, or the string "Last updated." Zero hits across a docs page, an install snippet and a deprecation note is the failure.
   *Fix:* Modal writes *"Prior to v0.73.82"*; Cloudflare stamps *"Last updated Aug 25, 2026"*; Stripe pins *`2026-08-26.dahlia`* in the header. A technical product with no visible versions reads as a demo of a product.
7. **Empty states louder than full ones.**
   *Tell:* an empty-state block whose height or font-size exceeds that of one populated row, or an SVG illustration inside a data container.
   *Fix:* Grafana demonstrates the failure — its stat panel auto-fits text to the panel, so `No data` renders at ~90px on a full-bleed gradient and becomes the loudest thing on the dashboard. Muted text, normal size, normal background, and where a first run is meant, a paste-able CLI line instead of a rocket.
8. **No CLI, or a CLI the UI never mentions.**
   *Tell:* the word "terminal", "CLI", `npx`, or `curl` appears zero times outside the marketing page.
   *Fix:* cross-reference constantly. Resend's docs say keys are managed "using the API or the Resend CLI" and name which properties are dashboard-only; Cloudflare's first quickstart is literally titled `CLI` with `Dashboard` as its sibling.
9. **A gated demo.**
   *Tell:* the only path to seeing the product is a form, a blur, or a video.
   *Fix:* Sentry's "Interactive Sandbox" is a work-email form over a blurred issues list; Axiom, Grafana Play and GitHub's logged-out Actions pages let you drive the real thing. The gate signals "sales motion," the exact thing this archetype's users are scanning for.
10. **Default framework skin, unmodified.**
    *Tell:* `paperMono` in the font stack, 36px sidebar rows with 12px-radius pills and `padding: 6px 12px 6px 16px` (untouched Mintlify); or fractional computed sizes like `14.25px` / `13.125px` / `20.6625px` (untouched Docusaurus, where nobody changed the base font size).
    *Fix:* Resend has customised enough to have a voice; Turso and PlanetScale have not, and are interchangeable with each other.
11. **Illustrations where data belongs.**
    *Tell:* an abstract 3D render, gradient mesh or isometric server in the hero; a stock chart image inside a dashboard shell.
    *Fix:* Railway puts a real, working project canvas — breadcrumb switcher, tab row, live command palette — about 500px down its own homepage, above the fold on a laptop.
12. **No named humans.**
    *Tell:* a changelog with no author, an incident page with no owner, a status page with no "we".
    *Fix:* Vercel's changelog attributes every entry to specific engineers with stacked avatars: *"Kit Foster, Caleb Boyd, and 2 others."* Infrastructure credibility is partly visible evidence that identifiable people are on the hook.
13. **An unconstrained measure.**
    *Tell:* prose in a container with no `max-width`, or one whose max-width exceeds ~80 characters at the body size.
    *Fix:* this one is not hypothetical — Convex ships 15px prose across a **1110px** column, about 148 characters per line, which is roughly double the readable ceiling and the reason its quickstart is tiring despite correct type. Every other product here lands between 474px and 784px. Measure in characters, not pixels: `columnWidth / (fontSize × 0.5)`.
14. **A dashboard that declines mobile, and a modal that didn't get the memo.**
    *Tell:* a component tree where the app shell has responsive rules but dialogs, auth screens, error pages and email-linked routes do not; any fixed pixel width on a modal.
    *Fix:* Axiom's dark UI is the best-measured artifact in this file and its onboarding modal still self-overlaps at 390px. Declining mobile for a seven-column log table is a decision; shipping a broken interstitial in front of it is an oversight.
15. **Copy that congratulates rather than reports.**
    *Tell:* an exclamation mark, an emoji, or any of `blazing`, `supercharge`, `effortless`, `amazing`, `seamlessly`, `easy` in a product string; a loading state containing an adjective.
    *Fix:* the voice is a commit message. See the next section.

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

All URLs below were loaded at 1440×900 (and 390×844 where mobile is cited) on 2026-09-09; computed styles and CSS custom properties were extracted with a Playwright probe and screenshots were captured and viewed. **Re-probed 2026-09-10** (direction pass): Stripe API reference, Stripe quickstart at both widths, Cloudflare Workers guide, Clerk quickstart, Prisma CRUD, Convex quickstart, Vercel Geist in both colour schemes, GitHub Primer's live token set, GitHub's logged-out job page at both widths, and Axiom's playground token set. Corrections from that pass are marked in the sections above and listed under *Direction pass*.

- `https://docs.stripe.com/api/charges/object` — three-column API reference; measured 14/22.4 prose at 503px in `rgb(26,44,68)`, 260px sidebar, Source Code Pro 14/18.2 JSON panel at x882 with `pad 8px 16px`; `Ask about this section / Copy for LLM / View as Markdown`; API version `2026-08-26.dahlia` in the header; `Show child attributes` progressive disclosure. Also viewed at 390px (code panel dropped, `CHARGES ⌄` scope header).
- `https://docs.stripe.com/payments/quickstart` — guide-mode typography, 16/26 at 474px, Menlo 13/20 code, inline code 14.4/26 on `#f4f7fa`; `Frontend: HTML ⌄` / `Backend: Ruby ⌄` global stack selectors; per-block `Terminal | Bundler | GitHub` tabs and dim mono `Server` markers. At 390×844 the page reports `innerWidth: 980` because it ships **no `<meta name="viewport">`**, and heads the page with `This page is optimized for wider screens. You might prefer the text version of this guide.`
- `https://developers.cloudflare.com/workers/get-started/guide/` — 300px nav @ x0, 852px content region @ x300, 648px prose @ x402, 288px TOC @ x1152 (232px inner); `Filter sidebar /`, product-scope switcher, `Last updated Aug 25, 2026 | Copy as Markdown | View as Markdown | Agent setup`, npm/yarn/pnpm segmented control on the code block, numbered step headings mirrored in the right-rail TOC, `Was this helpful? [👍 Yes] [👎 No]`, `Edit page` / `Report issue`. Viewed at 390px too.
- `https://www.cloudflarestatus.com/` — active incidents as filled pale-yellow cards with a 1px amber border and an `Identified` pill; resolved as flat grey cards, no border, green check and green text, no pill; `Local time ⌄` timezone selector; `Sep 9, 2026, 1:09 PM` absolute timestamps; maintenance titled `DEN (Denver) on 2026-09-10`. At 390 the four-item tab row becomes a fixed icon-only bottom bar and `Local time ⌄` is the one header control kept.
- `https://play.axiom.co/axiom-play-qf1k/datasets` — full logged-out product; **1,019 computed root CSS variables** (re-counted 2026-09-10) including `--gray--1 … --gray-13` (15 steps, `#0b0b0b`→`#fff`), the `--grayA-*` alpha ramp, `--mono-text-size-sm/md/lg` = 10/12/14 and `--sans-text-size-xs/sm/md/lg` = 10/11/13/15, `--axi-default-border-radius: 4px`, `--axi-tooltip-border-radius: 2px`, Berkeley Mono / Inter stacks, the dropdown shadow stack, and semantic pairs (`#ff9592` on `#3b1219`, `#3dd68c` on `#132d21`). Search input measured 28px tall, `pad 5px 8px`, `r4`. The table is a div grid, not a `<table>`. At 390×844 the onboarding modal renders with self-overlapping headline text and clipped cards.
- `https://vercel.com/geist/colors` — extracted Geist tokens: `--ds-gray-*-value` HSL ramps for both themes, `--geist-space-*`, `--ds-shadow-*`, `--geist-radius: 6px`, `--geist-marketing-radius: 8px`, `font-feature-settings: "calt" 0, "rlig", "ss11"`. Re-extracted 2026-09-10 under both `prefers-color-scheme` values, 467 root variables: light L% `95 92 90 92 79 66 56 49 30 9`, dark L% `10 12 16 18 27 53 56 49 63 93` — `gray-700` (56%) and `gray-800` (49%) confirmed identical in both. Dark `--ds-background-200` = 0% L (page), `--ds-background-100` = 4% L (surface).
- `https://vercel.com/changelog` — timeline rail with date ticks, per-entry engineer attribution with stacked avatars, filter pills, RSS.
- `https://github.com/vercel/next.js/actions` — run list, two-line ~78px rows, icon-only status, mono branch pill, `2,500+ workflow runs`, text-button filter row.
- `https://github.com/vercel/next.js/actions/runs/32617336090/job/97140065787` — logged-out job page: full step list with three distinct status glyphs, `failed 3 weeks ago in 3m 14s`, collapsed `Annotations / 1 error`, `Sign in to view logs` gating only the log bodies. **Step rows measured 40px tall at 14px at both 1440 and 390**; at 390 the job sidebar becomes a header line reading `✕ Test Examples (20) ⌄`, the action ref truncates mid-SHA, and `Sign in to view logs` moves into a `…` overflow. Primer tokens re-extracted from the same origin: `--control-xsmall/small/medium/large/xlarge-size` = 1.5/1.75/2/2.5/3rem, `--borderRadius-small/medium/large/full` = .1875/.375/.75/624.938rem, `--text-body-size-small/medium/large` = .75/.875/1rem, `--text-codeInline-size: .9285em`.
- `https://supabase.com/docs/guides/database/tables` and `/guides/auth` — uppercase-mono section labels, `AI TOOLS` rail (`Connect your AI agent / Copy as Markdown / Ask ChatGPT / Ask Claude`), `Is this helpful? ✕ ✓`, Manrope headings against Inter body at 15/28 w500.
- `https://supabase.com/features/table-editor` → 404 — `Looking for something? 🔍` with `Documentation · Sitemap · llms.txt` recovery links.
- `https://resend.com/docs/dashboard/api-keys/introduction` and `/docs/send-with-nodejs` — three docs modes as icon tabs, floating white content card on grey, split copy button on the `h1`, monitor/sun/moon theme switcher at the sidebar foot, underline-only prose links, the API-key management vocabulary quoted above.
- `https://clerk.com/docs/quickstarts/nextjs` — 15/28 prose at 622px, `geistNumbers, suisse` font stack, Söhne Mono at 13/24, 34px sidebar rows at weight 450.
- `https://modal.com/docs/guide/webhooks` and `/docs/guide` — dark-first docs, green unlined prose links, `Beta` sidebar pills, `Copy page ⌄`, three-level right-rail TOC, version-pinned deprecation note.
- `https://railway.com/` and `https://docs.railway.com/quick-start` — real product canvas embedded in the homepage, its top edge ~500px down at 1440×900 (dropped entirely at 390 in favour of a customer logo wall), breadcrumb project/environment switcher, `1 unapplied change · Details · Deploy ⌘⏎` staged-change bar, IBM Plex Serif `h1` in the docs against Inter body.
- `https://www.inngest.com/docs/local-development` — `Learn | Reference` segmented toggle, persistent `TS TypeScript` sidebar language selector, `[Copy Markdown] [Open ⌄]`, `beta` / `new` badge variants, embedded Dev Server run table (mono ULIDs, `● Completed`, absolute timestamps with seconds, `No additional runs found.`).
- `https://play.grafana.org/d/aynhtvb/agent-observability` and `/d/000000012/...` (404) — the time-range control cluster, template-variable filter row, the oversized `No data` stat-panel failure, and a two-button 404 (`Back to Home` / `Community Help`).
- `https://sandbox.sentry.io/issues/` — work-email gate over a blurred issues list (cited as the anti-pattern).
- `https://val.town/x/stevekrouse/reactHonoStarter` (404) — minimal illustrated not-found with a single primary action.
- `https://www.unkey.com/` — GitHub star count and Discord in the nav, mono panel labels (`Branch Overview`, `Manage API Keys`, `Control Plane`, `Usage 30 Days`).
- Element-level probes also run against: `https://fly.io/docs/languages-and-frameworks/node/`, `https://docs.convex.dev/quickstart/nextjs` (re-measured 2026-09-10: prose column 1110px, not the 442px previously recorded — the 442px element was a nested aside), `https://docs.turso.tech/quickstart`, `https://upstash.com/docs/redis/overall/getstarted`, `https://www.prisma.io/docs/orm/prisma-client/queries/crud`, `https://www.sanity.io/docs/studio`, `https://neon.com/docs/introduction`, `https://planetscale.com/docs/vitess/overview`, `https://vercel.com/docs/deployments`.

## Direction pass (2026-09)

Re-probed and re-shot on 2026-09-10. Every number below was checked against the live site, not against the previous draft.

**Corrected — wrong numbers are worse than no numbers.**
- **Convex measure: 442px → 1110px.** The 442px figure came from a nested aside. The real prose column is 1110px at 15px, about 148 characters — roughly double the readable ceiling. Convex moved from a neutral row in the type table to failure mode 13, which is new.
- **Stripe guides inline code: "14/20 Menlo, no background" → `14.4px/26px` Menlo on `#f4f7fa`, `pad 2px 4px`, `r6`.** It has a background, and its line-height is copied from the 16px/26px paragraph. That makes it a third worked example for finding 4, which previously leaned on Convex — and Convex turns out to contradict itself on one page (`14.25/22.8` in prose, `14.25/14.25` on the linked variant), so it is now the counterexample instead.
- **Cloudflare prose measure: 614px → 648px (≈81ch).** 614px was an aside. Layout geometry row updated with the full set: 300 / 852 / 648 @ x402 / 288 @ x1152.
- **Stripe API reference body: 14/22 → 14/22.4**, and its body colour is `rgb(26,44,68)`, not the `rgb(60,66,87)` used on the guides. Two surfaces, two greys; the reference runs darker because it runs smaller.
- **Clerk measure: "622px ≈ 83ch" → 696px top-level, 622px inside a numbered step.**
- **Axiom root variables: 577 → 1,019.** Radius claim "nothing larger anywhere" was false — a `--ax-radius-full: 9999px` token exists for avatars and pills; noted rather than deleted.
- **Railway's homepage canvas: "700px down" → ~500px**, above the fold at 1440×900.
- **The Stripe mobile claim was a misdiagnosis.** "`scrollWidth: 980` — the page horizontally overflows" is wrong: the guide ships **no viewport meta at all**, so it lays out at the 980px legacy default and the browser zooms out. Stripe also ships a banner offering a text-only alternate, which turns it from a bug into a declared decision. Rewritten in Mobile.

**Verified unchanged** (so they can be trusted): Primer's full control-size and radius scales and `--text-codeInline-size: .9285em`; Geist's light and dark L% ramps including the identical `gray-700`/`gray-800`; Axiom's dual type scales, 15-step ramp, alpha overlays, semantic pairs and 28px input; Prisma's `13px/28px` inline code and 16/28 w380 body; Cloudflare's `35/43.75 ls −0.875` h1, `20.8/36.4` h2 and JetBrains Mono `14/22.75 pad 12/16`; Stripe's 503px reference column and 474px guide column.

**Cut.** The "how I found them" narrative (a paragraph of search-strategy autobiography, compressed to three lines of method); four soft superlatives in the reference table ("cleanest", "elite", "best-in-class", "best dark-first") replaced with what the row actually contains; and the old failure list's unfalsifiable adjectives.

**Added.**
- Real limits on findings 1, 2, 3, 4, 5, 7, 8, 10, 11 and 12, which previously had none or had trivial ones. The non-obvious ones: mono breaks where the value can overflow (GitHub truncates its own SHA at 390); the mono-one-step-smaller rule inverts at 10px; "show the structure" fails when the structure *is* the secret, and costs you a free-tier DoS surface; hosted-chat LLM affordances carry a data-egress risk that the export ones don't; two dropdowns are correct when the axes are orthogonal (Stripe's `Frontend ⌄` / `Backend ⌄`), wrong only when one contains the other; compaction destroys any number the reader will paste into a ticket.
- Mobile section roughly tripled, all measured: GitHub's step rows are 40px at 14px at **both** widths; its job sidebar becomes a `✕ Test Examples (20) ⌄` scope line, converging with Stripe's `CHARGES ⌄`; Cloudflare Status turns its tab row into a fixed icon-only bottom bar and keeps exactly one header control, the timezone selector; incident rows restack severity-first; Railway deletes its canvas rather than shrinking it; GitHub demotes its one gated action into a `…` overflow, which is a regression worth naming as one.
- The rule that an unresponsive dashboard does not licence an unresponsive modal — evidenced by Axiom's own onboarding dialog self-overlapping at 390px, in the product this file otherwise holds up as the best artifact in it.
- Two states: execution-context labelling (Stripe's dim mono `Server` / `Client` markers under each snippet) and severity carried at the card level, not just the pill (Cloudflare Status's filled-and-bordered active card vs. flat grey resolved card).
- The failure section rebuilt from 12 adjectives into 15 entries, each pairing a grep-able tell an agent can run against its own output with a fix and the product that demonstrates it. Three or more tells firing means the surface is a mock. Two entries are new: an unconstrained measure, and a mobile-declining dashboard with a non-responsive modal.
