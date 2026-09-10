# premium-marketing

**Evaluated:** 2026-09 · **Numbers re-probed:** 2026-09-10 · **Density:** spacious · **Dark by default:** either, and the asset decides, not taste. The ground must match the chrome of the product shot you are leading with, or the shot floats. Linear (`#08090a`) and Retool (`#151515`) run near-black because their heroes are screenshots of dark apps; Ramp (white page, warm ink `#0c0a08`, `#f4f2f0` bands) and Increase run light because their product is a light dashboard. Sanity is the instructive case: the *document* ground is white and the hero is art-directed as a `#0b0b0b` band, which is the honest version of this decision — the ground is a property of the band, not of the page. Never ship a theme toggle here; it doubles the art direction for a page a visitor sees once.

> A stranger with no account and no task gives you one scroll to prove the thing behind this page is serious, and there is no work for the interface to hide behind.

## When this is the right archetype

The visitor is not a user. They arrived from a link, an ad, a search result or a founder's post, they have between twenty and ninety seconds, they will scroll once, and they will not come back before a decision is made about you elsewhere — in a hiring conversation, a procurement thread, an investor's tab group. They have no goal beyond *is this any good*, which means every pixel is doing brand work and none of it is doing task work. That is the load-bearing fact: an app screen is judged on whether it works, and this page is judged on whether it has taste. It is therefore the single highest-risk surface in this corpus for reading as machine-made, because the usual defence — "but the workflow is correct" — does not exist. The page must also carry a mechanism: what the product is, how it works, and one checkable number.

- **Choose this over `luxury`** when the page has to explain a mechanism. Aesop need not argue that hand wash matters; Vercel must argue that agentic infrastructure matters. Test: if the case can be made with a photograph and a wordmark, it is `luxury`; if it needs a number, a named customer and a screenshot of the thing running, it is here.
- **Choose this over `editorial`** when the visitor is being persuaded rather than reading. Marketing body sits in 38–56ch beside an image and is read once at a glance; editorial runs 55–65ch and is read for twenty minutes.
- **Choose this over `developer-platform`** when nobody on the page is blocked. Docs, references, changelogs and dashboards are that archetype even when they share the token file — they are scanned for a fact, so they get compact density and no reveal animations. The homepage and the docs are two surfaces, not one.
- **`premium-minimal` is not an alternative to this file** — it is the archetype of the *app*. The landing page for a `premium-minimal` product is still this one: arc.net ships a 45px download button, a `#3139fb` band with a torn edge and a serif display, none of which would survive inside the browser window it is selling.
- **Choose this over `ecommerce`** when there is no cart. If the page needs a price, a returns line, a size grid and a sticky add-to-cart, conversion rate owns the design and you are in `ecommerce`, where taste arguments lose to a number.

### Against its neighbours, with the numbers side by side

Four archetypes in this corpus are spacious, light on chrome, and built around one big asset. Each column is that archetype's own measured band.

| | **premium-marketing** | `luxury` | `editorial` | `developer-platform` (docs) |
|---|---|---|---|---|
| Body | 16–17 / 1.5–1.6 for the deck and prose — but **14px is the page's dominant size** | 15–17 / **1.40–1.65** | 17–19 serif · 18–20 grotesque / 1.40–1.50 | 15–16 prose, **14/22 reference** |
| Measure | **38–56ch**, three widths in play at once | 600–720px, varied band to band | **55–65ch, one value, held** | 60–75ch |
| Page title | **48–112px, mode 56–72**, w300–510 | **24–50px**, w200–400 | 32–48px, w400–500 | 32–36px w500/600 |
| Row / list-item height | 28–44 — nav, changelog, footer only | **no row**; the image's crop sets it | index rows 88–112, content-sized | 40 header / 41 data / 62 two-line |
| Control height | nav **28–44** · hero **44–56** | 44–48, one per band | 36–40 | app 28–32 · docs 36 |
| Radius | **0–6 or pill — pick one lane** (Increase is the one 8px lane, and holds it everywhere) | 0–3; pill only on photography | 2–4 control, 0 in the column | 4 / 6 / 8 |
| Elevation | near-zero cards **+ one 6-stop hero slab** | zero anywhere | none in the column | 1px ring |
| Accent | **one CTA and nothing else** | never touches a button | links and kickers only | one accent + a four-role semantic set |
| Hover | 100–300ms, colour on the link | 200–250ms colour | 120ms controls, **0ms in the text** | 150ms |
| Reveal | **600–1000ms** opacity / clip-path | 500–1200ms | **0ms** | none |
| Section rhythm | **128–288px of ground** | 96–160px | a heading's asymmetric margin (~30/12px) | — (no bands) |
| Ground down the page | **alternates band to band** | changes per band | one, unchanging | one |
| Theme control | never a toggle | never a toggle | light / sepia / dark, user setting | system / light / dark |

Read the collisions honestly.

- **vs `luxury` — body size, radius policy and reveal duration are within noise (≈16px, 0–3 vs 0–6, ≈600–1000ms) and always will be. The difference lives in display scale, in what carries the proof, and in what is allowed to move.** Marketing spends its whole type budget on one 48–112px sentence and then attaches something checkable to it: Ramp's eyebrow is a live odometer (`US CORPORATE PAYMENTS PROCESSED BY RAMP:`, 34 `number-flow` counters on the page), Stripe's is `Global GDP running on Stripe: 1.71306539%` — re-read live, the digits had moved since the last probe. Luxury's ceiling is 50px and it attaches a photograph — the bands graze each other at 48–50px, and the tie-breaker there is not the size but what is bolted to it: a checkable fact or a picture. Motion splits the same way: luxury transforms nothing, while here `transform` is legal **on media** — Stripe reveals with `0.8s cubic-bezier(0.165,0.84,0.44,1)` on transform ×46 and clip-path ×12, Ramp scales two hero product images at 0.3s — and illegal on the text link the cursor is crossing.
- **vs `editorial` — density label, warm grounds, near-zero elevation and body size all overlap; 17px/1.5 is legal in both.** The page title *nearly* separates them and no longer quite does: Stripe's h1 re-probed at **48/55.2 w300**, which is the top of editorial's band — so at 48px use weight and box (Stripe runs w300 across 959px as one sentence; editorial runs w400–500 across a 55–65ch column). The row with **no** overlap is **section rhythm**: 128–288px of empty ground here, a heading's asymmetric ~30/12px margin there — an order of magnitude, visible in a thumbnail. The reason is the reader: ground between bands is what lets a stranger skip one, and a stranger who has not committed is allowed to skip; in an article the same ground is just scrolling.
- **vs `developer-platform` — this is the collision that actually happens, because the same company ships both surfaces off the same token file.** Nothing in the palette or the typeface separates them; the geometry does, and it does so by roughly 2× in both directions. Vercel's homepage h1 is 64/64 −0.06em **w400**; its docs h1 is 56/56 −3.36px **w600** and wraps to four lines in a 381px column. Stripe's homepage h1 is 48/55.2 −0.96px **w300** across a 959px box; its API reference h1 is 24/32 **w700**. Controls run 44–56px here and 28–36px there. The homepage reveals at 600–1000ms; the docs page has a 150ms hover and nothing else, because someone on it is blocked. **If the page has a right-hand table of contents that people actually use, you are not in this archetype.**

## When it is the wrong one

**Pricing and comparison pages — and Linear's own is the proof.** `linear.app/pricing` ships the same wordmark, face, accent and nav as the homepage and none of its geometry (measured 2026-09-10): h1 **48/48 w510** instead of 64/64, dominant body **15/24 across 88 nodes** instead of the homepage's 14px chrome, plan columns **551px** tall instead of 1220–1232, comparison rows at **44px ×56**, and not one `padding: 128px 0` band. A visitor holding three plans in working memory needs adjacent rows, not 224px band gaps. Ship the hero and footer from here and set the table at `enterprise-dense` density.

**Single-action conversion pages** — a webinar signup, an app-download link from a paid campaign, a waitlist. One message, one field, one button genuinely is the whole page. An asymmetric editorial hero and eight bands of choreography lower conversion and are a worse use of the same effort.

**Docs, changelogs, status pages, careers listings, trust centres.** Every one of them is a list, and lists are scanned. `linear.app/changelog` is a single **23,905px** section at zero band padding, h1 48/48, entry rows **54px**, dominant text 15/24 across 373 nodes — the same brand, one archetype over. Vercel does the same thing in the other direction: 64/64 w400 on the homepage, 56/56 **w600** in the docs (→ [`developer-platform`](developer-platform.md)).

**Signed-in surfaces of any kind.** Applying 17px body, 128px gaps and 800ms reveals to an app shell makes it slow and precious. Stripe's homepage reveals 46 elements at `0.8s cubic-bezier(0.165,0.84,0.44,1)`; fire that on every navigation of a tool someone opens forty times a day and each visit starts with 0.8s of content that is already loaded refusing to be visible — 32 seconds a day, spent on nothing.

**Pages whose audience is forty named accounts already in a sales cycle.** That is a deck and a security questionnaire. The homepage is not where that deal is won, and building a cinematic hero for it is spending the budget in the wrong room.

## Reference products

| Product | Why | The one thing to steal |
|---|---|---|
| **Stripe** | The benchmark for real product UI as the hero asset — a working checkout, a fraud table with real percentages | Section headings constrained to a **column span** (`span-8/7/6` = 856/752/648px), so the measure changes section to section instead of one centred ribbon |
| **Linear** | Marketing that ships the app's own design language; four sections at `padding: 128px 0`, 1220–1232px tall | The announcement lives on the **deck's baseline, right-aligned** (`New  Loops →`) instead of in a badge pill above the headline |
| **Anthropic** | The cleanest asymmetric editorial hero shipping, with its whole token system exposed | Sans display + **serif body** at 20px/1.4, headline in cols 1–7, deck in cols 9–12, and two words underlined instead of a gradient |
| **Ramp** | 64px/64px headline at weight 400 and **−0.01px** tracking; warm near-black ink `#0c0a08` on white, `#f4f2f0` for bands | The eyebrow is a **live number** — `US CORPORATE PAYMENTS PROCESSED BY RAMP:` with rolling digits, 34 counter elements on the page — and a five-item ticker (`AGENTS AT WORK TODAY · RECEIPTS PROCESSED · ACCOUNTING FIELDS CODED · AGENT INTERACTIONS · EXPENSES REVIEWED`) pins the fold line |
| **Sanity** | h1 112px/112px (lh **1.00**) at −0.04em, weight 400, bespoke Waldenburg; sections at 128px | The third CTA is a **copyable install command**, `npm create sanity@latest`, given the same visual weight as the buttons |
| **Retool** | Display at weight **300** (72px/75.6px, −0.022em) on `#151515` with warm `#e9ebdf` ink | A **sticky section index** in the left column whose items dim and lift as the right pane advances — a table of contents inside one section |
| **Increase** *(the one you would not name)* | An API-first bank's homepage: 1160px grid, prose at 768/528/456px, dominant type size 14px | The headline is **one sentence in two inks** — claim in near-black, elaboration in gray — so the deck is inside the h1 instead of below it |
| **Loom** *(counter-example, measured)* | Post-acquisition, ships the generic skeleton in full | Nothing. Study it: centred 63px at **weight 700**, `letter-spacing: normal`, two pill CTAs side by side, `transition: all`, and a subhead ending "to supercharge productivity" |

Also worth an hour: **framer.com/marketplace/templates** — not to copy, to calibrate. If your page is indistinguishable from a $58 trending template, the visitor's read is that you bought one.

## The numbers

| | Value | Because |
|---|---|---|
| Body | **16–17px / 1.5–1.6** for the deck and real prose — but the page's *dominant* size is **14px**, and getting this backwards is what makes a page feel inflated | Re-probed 2026-09-10: Vercel 16/24 appears on **4** nodes against 14/20 on **120**; Ramp's deck is 16/22 and 14/20 runs **124** nodes; Increase's deck is 20/28 at 584px against 14/20 ×116; Linear marketing body is 15/24; Sanity ships **no 16px body at all** — 13/16.9 ×105 and 13/19.5 ×70 under a 32/35.2 **w425** deck. 16–17px is for the two or three paragraphs anyone actually reads; every label, caption and nav item around them is 14 |
| Dense/secondary text | **14px** for nav, captions, CTA labels, meta, eyebrows; 11–12px mono uppercase at +0.04–0.06em for figure labels and tickers | One secondary size covering five roles is what keeps the page from having eight sizes. Re-probed node counts at 14px: Linear **220**, Ramp **124**, Vercel **120**, Increase **116** (82 at w400 + 34 at w500) — in every case the largest single group on the page |
| Page title | **56–72px / 0.95–1.05** is the mode; the measured band is **48–112px**, tracking −0.02 to −0.04em, weight **300–510** | Re-probed 2026-09-10: Sanity 112/112/−4.48px/**400** · Retool 72/75.6/−1.584px/**300** · Linear 64/64/−1.408px/**510** · Ramp 64/64/−0.01px/**400** · Vercel 64/64/−3.84px (−0.06em)/**400** · Stripe 48/55.2/−0.96px/**300** across a 959px box · Increase 40/48/−0.8px/**600**, and it has no `h1` element at all. The rule that survives every one of them: **nothing at or above 56px exceeds weight 510.** The two exceptions run small — Increase at 40px, and the counter-example, Loom, at 63.27px/w700, which is exactly why Loom's headline reads as a template. Section h2 = 32–48px, one step, not five |
| Row / list-item height | **28–44px** — the only lists here are the nav mega-menu, the changelog and the footer | Re-probed: Increase nav items **28px** at 14/500; Linear nav 32px at 13px; Linear's changelog entries **54px**. These are app numbers because they are app objects; do not inflate them to match the page's spaciousness |
| Control height | **Two heights, by role.** Nav 28–44px · hero and prefooter 44–56px | An AI ships one 44px button everywhere. Re-probed 2026-09-10: Stripe nav 40 / hero 48 (r4) · Ramp nav 44 / hero 51 inside a 60px input group (r6) · Sanity nav 35 / hero 55, all pills · Retool nav 40 · Increase nav 28, sign-in 36, hero 46 · Linear nav 32, hero 44. Every reference splits; none ships one height |
| Sidebar width | **None.** Top bar at 64–72px, transparent over the hero, solid on scroll. The number that replaces it is the **page side margin: 32→80px** (`clamp`, ~2.5× range, not proportional) | A marketing page has no persistent navigation because the visitor has no place to be. Two nav actions maximum: a text sign-in and one button |
| Content max-width | **1400–1440px outer** (Vercel 1400 · Anthropic 1432 · Linear 1436/1416 · Ramp 1440), **prose 540–768px**, headings **648–856px by span**, hero media **full-bleed** | Increase runs 1160 content with 768/528/456px prose blocks. The rule is three widths in play at once; a single `max-w-3xl mx-auto` down a 1440 page leaves 336px of dead space per side and reads as a template |
| Radius (control / container) | **Bimodal: 0–6px or fully round** for six of eight references. The real rule is narrower and harder: **hold two values across controls *and* containers**, whatever they are. Slabs and image cards 12–24px only when they are photographs | Re-probed: Stripe 4 (nav and hero) · Ramp 0 ×64 / 6 ×17 · Retool 0 ×133 / pill ×7 · Sanity pill ×32 / 0 ×27 · Linear 0 ×54 / pill ×11 / 8 ×16 · Loom pill. **Increase holds 8px on all 20 of its buttons, its nav and its cards with 0px on everything else; Arc holds 10px.** Both are lanes, not defaults. The tell is not the number, it is holding two values on purpose; `rounded-lg` on every element from the badge to the section container is the shadcn default and reads as one |
| Border weight & colour | 1px hairline at **5–10% ink**, usually as an inset ring so it survives on any band. Linear `inset 0 0 0 1px rgba(255,255,255,0.05)` · Sanity `inset 0 0 0 1px #353535` on `#0b0b0b` · Vercel `0 0 0 1px #00000014` | On a page with dark and light bands alternating, a solid border colour breaks on the second band. Alpha composes |
| Elevation | **Near-zero for cards (peak 6% black, Vercel's whole scale).** One exception: the hero slab gets a deep multi-stop shadow. Re-probed 2026-09-10, Ramp is the live example and it is the *only* real shadow on its page — six stops on one 1312px element, `0 232px 65px rgba(0,0,0,.008)`, `0 35px 59px rgba(0,0,0,.03)`, `0 20px 50px rgba(0,0,0,.09)`, `0 37px 37px rgba(0,0,0,.067)`, `0 9px 20px rgba(0,0,0,.086)` | That is not a card shadow, it is the shadow of a physical object held above the page, and it is affordable precisely because nothing else on the page has one. Increase and Retool both shipped one in an earlier pass and both now ship **zero** real shadows — which is the more common correct answer. If a shadow reads as a gray area on anything smaller than the hero asset, it is 3× too strong |
| Motion (micro / standard) | **Two budgets, never one number. Hover 100–300ms on colour. Reveal 600–1000ms on opacity, transform and clip-path.** Re-probed: Linear `color 0.1s` ×216 · Stripe `color 0.3s` ×150 and `0.8s cubic-bezier(0.165,0.84,0.44,1)` on transform ×46 / clip-path ×12 · Retool `opacity 0.6s cubic-bezier(0.72,0,0.12,1)` ×108 · Sanity colour `0.15s` ×34 and `opacity 1s` ×18 | 300ms for both is the generic collapse: too slow for a pointer, too fast to read as the page settling. Detail and the transform rule → **Motion budget** below |

## Colour

Neutrals run **0–3% saturation**, and the asymmetry is not optional: **light grounds skew warm or pure** (Ramp runs a white page with `#f4f2f0` bands and warm ink `#0c0a08`, Anthropic ivory `#faf9f5`, Arc `#fffcec`, Vercel `#fafafa`), **dark grounds skew very slightly blue or neutral** (`#08090a`, `#0b0b0b`, `#151515`). Never the reverse. `slate-600` on `slate-50` is 16.3% saturated — five to eight times any reference here — and is the fastest colour tell in existence.

Derive muted text as an **alpha of the ink**, not a second gray: Ramp ships `--text-hushed: #0c0a0899` (60%) and its reverse `#fff9`, which is why the same token survives a dark band. Three text levels maximum, two of which carry meaning.

The accent gets **exactly one job on this page: the single primary action.** Ramp's acid yellow appears on the hero CTA and the nav demo button and nowhere else. Sanity's orange appears on `Start building`, one full-bleed band and the logo strip inside it. Increase's green appears on `Contact sales` alone. What the accent may *not* do here, specifically: tint the headline, fill an icon, colour a card background, or run as a gradient behind anything. Semantic colour barely exists on a marketing page — there is no success, warning or error state to encode — so a saturated area that is not the CTA is decoration, and reads as such.

Colour that is *not* the accent belongs to **assets**: photographs, product screenshots, per-story mats. That is the budget. Dark/light is a per-band art-direction decision (Sanity alternates black bands with an orange one; Apple alternates the whole page), and the alternation is one of the few structural tools that keeps a 10,000px page readable.

## Type

The display face **is** the design here, and every reference on this list self-hosts a licensed or bespoke one: Waldenburg (Sanity), Lausanne (Ramp), saansFont (Retool), Geist, Söhne, Inter Variable at 510, TT Interphases Pro (Increase), Marlin (Arc). A page set in Inter 400/700 announces that no typographic decision was made. If the budget is zero, use one licensed grotesque for display and the system stack for body, not the reverse.

**Scale shape: high contrast at the top, flat at the bottom.** Hero-to-body ratio is 3.5–7× at 1440 (Sanity 112:16 = 7×, Linear 64:16 = 4×) and compresses to ~1.6–2.4× at 390. Between them, few steps: hero, section h2 (32–48px), body (16–17), secondary (14), micro-label (11–12). Five sizes. Weight range 300–510 for display, 400 for body, 500–600 for the primary CTA label only — Retool's display at **300** and Linear's at **510** are variable-font axis values, and intermediate weights are one of the cheapest signals that a person set this type.

**Bind tracking to size, not to the page.** −0.02 to −0.04em on display, 0 on body, **+0.04 to +0.06em on 11–12px uppercase labels**. A single global `tracking-tight` makes 14px labels illegible and 64px headlines not tight enough.

Monospace earns its place in exactly four roles: an install or curl command (Sanity's `npm create sanity@latest` is a copyable control, not a decoration), a live metric or ticker (Ramp), a figure/eyebrow label, and inline identifiers. It does not belong in nav, buttons, headlines or body. Tabular numerals on every stat, price and rolling counter.

## Layout and navigation

The shell is a **top bar over a full-width grid**: 12 columns, 1400–1440px, 32→80px margins, no sidebar, no breadcrumb. The bar carries the wordmark, four to six section links, one text sign-in and one button. It is transparent over the hero and gains a solid ground on scroll, because the hero asset needs the full viewport height and the bar needs to survive the band change.

**The primary object is the proof asset**, and it gets visual priority over the copy: a real product surface (Linear, Sanity, Retool, Stripe), a real photograph, or a live input the visitor can type into (Retool's composer, OpenAI's prompt). It is full-bleed or near-full-bleed, cropped by the viewport bottom so the page promises more below the fold, and it is *real* — real IDs, real numbers, real timestamps. Retool's hero terminal shows actual UUIDs; Stripe's fraud panel shows `0.06% / 0.02% / 0.08%`.

The hero is **asymmetric**: headline in cols 1–7, second element (deck, announcement, asset, CTA) placed deliberately somewhere else. Centring is what you do when you have not decided what the second element is. Linear puts the deck bottom-left and the announcement bottom-right on the same baseline; Increase puts the headline left and lets the illustration bleed off the right edge; Anthropic runs headline 1–7 and serif deck 9–12.

Grouping below the fold is **one idea per band**, and the bands must be different sizes and different treatments. Measured section heights on a single page: Sanity 838 / 1055 / 1164 / 4416px; Retool 496 / 887 / 1008 / 4076 / 10944px; Apple 525 → 7,329px. Section padding 128px (Linear, Sanity, Ramp, Oxide) up to 144px (Apple), never `py-16`.

**Cards are right here only when you have five or more genuinely different real artifacts** — a bento of actual product surfaces, a press wall, a template gallery. Three cards with an outlined icon each are not a layout, they are an admission that the section had no asset. Use full-width bands instead: one idea, one screenshot, one sentence, at 1200px tall.

## Components

**Belongs here:** full-bleed product slab cropped by the fold · live metric or odometer as the eyebrow (Ramp) · a copyable install command as a CTA (Sanity) · an email input and button fused into one control · announcement as a line of text on the deck's baseline (Linear) · logo row in **true black at real proportions**, cropped off one edge · sticky section index that dims as the pane advances (Retool) · a one-sentence customer claim containing a number · a two-ink headline where the elaboration is inside the h1 (Increase) · alternating dark/light bands · footnote asterisks with a real disclosure link · a plain changelog list at zero extra padding · mono figure labels used consistently, never once.

**Does not belong here:** the sparkle badge pill (`✨ Introducing v2 →`) — use a text line with a chevron · grayscale `opacity-60` logo clouds — desaturation destroys the one thing that makes a logo recognisable at 24px · three-up feature cards with outlined icons — use three bands · testimonial trios with headshots and five-star rows — stars are retail furniture and undercut a B2B claim · FAQ accordions — six of eight measured homepages contain no `FAQ` string at all · the gradient CTA band above the footer · `hover:scale-105 hover:shadow-lg` on anything repeated · glassmorphic floating cards · fake dashboards with `Lorem` labels and `$12,345.67` · a stat row of round numbers nobody can check.

## States in this archetype

**Empty and sparse.** The real failure state of a marketing page is *not enough proof*: four customers, two case studies, one changelog entry. A centred, evenly spaced row of four logos in a 1400px container reads as a shortfall. **Crop, left-align, or marquee — never centre a short row.** Oxide crops its leftmost logo off the edge so five logos read as a selection from many; Linear's three-entry changelog gets zero extra padding so it looks like a list, not a gap.

**Loading.** The hero image or video is the LCP element: never lazy-load it, always ship a poster frame that is literally the first frame. The font is the other half — a 64px headline at −0.04em reflowing from a fallback is a violent shift, so ship a metric-matched fallback face (Vercel ships a generated `GeistSans Fallback`; Sanity and Increase both serve hash-named self-hosted faces with an Arial metric override). If a live embedded demo is the hero, its fallback is a static screenshot, never a spinner.

**Error.** Full-bleed media that fails leaves white text on white. Every band with an image behind type needs a background colour sampled from that image. A dead video is a poster frame; a dead third-party embed is the screenshot.

**Reduced motion.** This is the only state on the page that can break it completely: if reveals start at `opacity: 0` and the trigger is disabled, the page is blank. Render end-states immediately under `prefers-reduced-motion: reduce`.

**Too much.** Long is fine — 10,000 to 30,000px pages are normal here — and they survive on **variance**, not on brevity. Fourteen sections between 525px and 7,329px works; eight 800px sections does not.

**The cookie banner is a state you own**, and Sanity is now the worked example of fixing it. Re-probed 2026-09-10: the Osano dialog renders at **600×175** in Sanity's own white with 27px pill buttons at 13px — the same pill and the same label size as the nav — where an earlier pass caught it in Osano's vendor palette (`#f36458` buttons on a `#121923` dialog) on a black-and-orange page. It is a third-party component that ships with its own design system and lands on top of your hero; restyle it to your tokens, and check it at 390 where it is tall enough to cover the CTA.

## Motion budget

The frequency argument runs the opposite way from every other archetype: this page is seen **once**, so choreography is affordable and the whole budget can go into the first scroll. What it may never do is delay a fact.

- **Hover: colour only, 100–300ms — on anything made of text.** The measured hover property list is `color, background-color, border-color, outline-color`: Linear `color 0.1s` ×216, Stripe `color 0.3s` ×150, Ramp colour `0.3s` ×28, Sanity colour `0.15s` ×34. `transform` is not banned here the way it is in `luxury`; it is **confined to media** — Ramp scales two hero product images at 0.3s and nothing else, Stripe transforms 60 elements and none of them is a nav item. On a page with forty text links, transform-on-hover makes the layout shiver as the cursor crosses it.
- **Reveal: 600ms–1000ms, opacity and `clip-path`, one trigger per band, staggered by no more than 60ms.** Retool `opacity 0.6s cubic-bezier(0.72,0,0.12,1)` ×108 (plus `transform, opacity 0.3s` ×81 for the shorter in-band moves); Sanity `opacity 1s` ×18; Stripe `0.8s cubic-bezier(0.165,0.84,0.44,1)` on transform ×46 and clip-path ×12. An 800ms expo-out reads as the page settling; a 300ms ease-out reads as a component mounting, six times on the way down.
- **One scroll-scrubbed sequence per page, maximum**, and it must scrub — the page keeps native scroll velocity and you can scroll back out. Hijacking `wheel` for full-screen slides is the most resented pattern in the archetype.
- **Never animate:** the nav, anything above the fold on load (the hero is already there), numbers counting up on a stat the visitor is trying to read, or anything that has to finish before a link is clickable.

## Mobile

This archetype adapts, and the adaptation is measured, not proportional. Re-probed 2026-09-10 at 390×844 with an iPhone UA:

| Site | Desktop h1 | Mobile h1 | Ratio | lh | Left margin |
|---|---|---|---|---|---|
| Sanity | 112 / 112 | 60 / 60 | **0.54** | 1.00 → 1.00 | 24px |
| Retool | 72 / 75.6 | 40 / 42 | **0.56** | 1.05 → 1.05 | 15px, **centred** |
| Linear | 64 / 64 | 38 / 41.8 | **0.59** | 1.00 → 1.10 | 23px |

1. **Display drops to 0.54–0.6× of desktop**, not 0.9×. A `clamp()` whose min is 80% of its max is a rounding error, not a responsive scale.
2. **Line-height relaxes as size falls** (Vercel 1.0 → 1.167, Linear 1.0 → 1.10); tracking relaxes with it (Retool −0.022em → −0.01em).
3. **Left alignment should survive, and it is the first thing to go.** Sanity and Linear hold their ragged right edge at x = 23–24px; Retool, which is left-aligned at 1440, now **centres** its 40px mobile headline. Watch the pattern rather than copying it: centring on mobile "because it looks balanced" is how a page that was art-directed at desktop ends up looking generic on the device most of its traffic uses.
4. **Section gaps compress to 64–96px** from 128–224px, roughly halving, and side margins go 32→80px desktop, 16–33px mobile — a 2.5× range, not a scaled one.
5. **Buttons go full-bleed-minus-margins or stay small; nothing between.** Stripe's mobile CTA is 358px wide on a 390px viewport at 44px tall. A 60%-width centred button is the generic answer.
6. **If your hero is a two-object spatial relationship, ship a different mobile hero.** Oxide drops its leader-line diagram entirely and gives mobile the photograph and the headline. Squashing a composition that depends on left-right tension produces a stack of unrelated things.

## Copy register

Declarative and specific. Headlines are **claims that can be disputed**, not benefits. Body carries numbers and nouns. Buttons are verb phrases naming what happens, in sentence case, one to three words.

- `Time is money. Save both.` (Ramp) beats `The all-in-one spend management platform for modern finance teams`.
- `Banking for ambitious technology companies. Build great financial products with an API-first bank.` (Increase, claim in black + elaboration in gray, one sentence run) beats `Modern banking infrastructure, built for developers`.
- `The product development system for teams and agents` (Linear) beats `Streamline your workflow with AI-powered project management`.
- `npm create sanity@latest` as a third CTA beats `Learn More` next to `Get Started`.
- Eyebrows are labels, not teasers: `US CORPORATE PAYMENTS PROCESSED BY RAMP: 0.8712181%` (Ramp), `Introducing Increase Bank, Member FDIC` (a regulatory fact), `New  Loops →` (Linear). None of them say `Introducing` for its own sake and none carry a sparkle.

The measured counter-example, live in 2026-09: Loom's `Easily record and share AI-powered video messages with your teammates and customers to supercharge productivity` — three hedged verbs, one abstract noun, no number, and a claim that any of eight competitors could ship unchanged. Its headline is `One video is worth a thousand words`, which is a proverb, not a claim about the product.

Footnotes are part of the voice. Ramp's subhead ends `banking*` with a real disclosure; Apple ships `From $1999 or $166.58/mo. for 12 mo.` rather than "starting at". Showing the asterisk builds more trust than hiding it.

## The characteristic failure

**The eight-block skeleton.** A rushed team or an agent producing this archetype from the look rather than the logic emits the same page every time, in this order. Each slot below is what gets generated, and the specific alternative a measured reference actually ships.

1. **Badge pill** — `✨ Introducing v2.0 →`, rounded-full, gradient border, centred above the headline. → **A line of text with a chevron.** Vercel's is a 16px sentence with no pill and no icon; Linear's rides the deck's baseline, right-aligned, at the far edge of the hero; Anthropic ships nothing above the headline at all.
2. **Centred 60px gradient headline** — `text-6xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent`. Zero of the eight primary references carry a gradient or transparent text fill on `h1`/`h2`; re-counted 2026-09-10 on sanity.io, retool.com, linear.app, ramp.com and increase.com — zero on all five. → **Solid ink, left-aligned, 56–72px at weight 300–510, lh ≤ 1.05, tracking −0.02 to −0.04em.** If you want colour in the headline, do what Increase does and change the *ink* mid-sentence, or what Anthropic does and underline two words.
3. **Two equal CTAs side by side** — filled primary, outlined `Learn more`, both 44px, both 8px radius. It tells the visitor you don't know which action you want. → **Make them unequal in kind, not just in fill.** Ramp fuses an email field and a button into one control. Sanity runs a filled pill, a white pill and a copyable `npm` command. Anthropic ships zero hero buttons and puts the only one in the nav. Kinfolk ships `Buy | Read` as two text links and a pipe.
4. **Logo cloud** — six to eight logos in `grayscale opacity-60`, evenly spaced, under `Trusted by teams at`. → **True black, real proportions, sized by optical weight, cropped off one edge**, with a label that is a claim (`POWERING THE BEST TEAMS`) or no label at all. Sanity puts its logo strip in a full-bleed orange band at the fold line; Increase runs its row cropped at both edges.
5. **Three feature cards** — 3-col grid, outlined 24px icon in a rounded square, 20px title, three lines, `hover:shadow-lg`. → **One idea per full-width band, each 1000–1230px tall at 128px padding, each carrying a real screenshot of that feature.** Linear ships exactly four such sections. If you have three real assets you have three bands, not a grid.
6. **Bento grid** — `rounded-2xl` cards, `bg-gradient-to-br from-gray-50`, abstract 3D shapes. Bento is a layout for showing *many real artifacts at once*; with placeholder content it is a mood board. → **Only at five or more genuinely different real surfaces.** Stripe's largest bento cell contains a 516px live DOM rendering of the product, not an image of one.
7. **Testimonial trio** — three quote cards, circular headshot, title, five stars. → **One sentence per customer, containing a number, set at 24px, no card and no face.** `Zapier serves over 100 million monthly webhook requests`. `50% of Fortune 100 companies have used Stripe`. If you have no number, you have no testimonial section.
8. **FAQ accordion + gradient CTA band** — six `<details>`, then a full-width purple-to-blue band with centred white text. The band is the only saturated area on an otherwise restrained page, so it reads as a bolted-on conversion widget. → **Delete the FAQ** (if a question matters enough for the homepage, answer it in a band; if it doesn't, it belongs in docs), and make the prefooter an *asset*: Anthropic's is a full-bleed photograph card with a 68px serif headline on it; Apple's is a single pill containing the price and the Buy button; Linear's is a plain headline with `margin: 224px 0`.

**Recognise it in your own screenshot, before you open devtools.** Take one full-page capture at 1440 and look for these, in order of how badly they give you away:

1. **The headline is centred.** Every reference measured is left-aligned and ragged-right; the one centred 63px headline in the set belongs to the counter-example. Centring is the visible residue of never deciding what the second element was.
2. **Two buttons of the same size sit side by side under it**, one filled and one outlined. Real pages make the second CTA a different *kind* of object — an email field, an `npm` command, a text link, or nothing.
3. **Your sections are all about the same height.** Scrub the thumbnail: Sanity runs 838 / 1055 / 1164 / 4416, Retool 496 / 887 / 1008 / 4076 / 10944. Eight bands within 20% of each other is the single strongest structural signal of a template.
4. **Three slots from the skeleton above are visible at thumbnail size** and are the ones to look for: a centred row of gray logos, a 3-up of icon cards, and a saturated gradient band above the footer that is the only saturated area on the page.
5. **Every corner is the same radius.** Zoom to the badge, the button, the card and the section container: if all four are 8px, that is a framework default, not a decision.
6. **No pixel on the page is a photograph of your product doing its job.** If the largest asset above the fold is an abstract shape, a mockup frame or a stock face, the page has nothing to say and the skeleton is saying it.

**Then one measurement each, in order of severity.** (a) Could a competitor ship this page by swapping the logo and six strings? Then the page has no asset and the skeleton is doing all the work. (b) Is `py-16`/`py-20` (64–80px) your section gap? That is 2–4× too tight; the references run 128–288px. (c) Is any `h1` at 56px or above set heavier than weight 510? (d) Does a hover rule contain `transform` on anything that is not an image? (e) Do you have a stat you cannot source? Delete it — an unverifiable number is worse than no number, and it is the one failure on this page that costs trust rather than taste.

## Signature decisions that fit here

- **The eyebrow is a live number.** Ramp and Stripe both replace the badge pill with a running figure (`Global GDP running on Stripe: 1.71306539%`). The claim and the proof become the same object, and it can only exist because they have the data — which is the point.
- **The install command is a CTA.** Sanity gives `npm create sanity@latest` the same height and prominence as `Start building`, with a copy affordance. For a product whose first minute happens in a terminal, the third button *is* the funnel.
- **The section index is sticky and dims.** Retool's left column lists that band's sub-topics; each dims until the right pane reaches it. It turns one 4,000px section into a readable sequence without eight more headings.
- **The deck's baseline carries the announcement.** Linear right-aligns `New  Loops →` on the same line as the hero deck. It gets the placement a badge wanted, at the moment the eye has finished the headline, without adding a component.
- **The headline changes ink mid-sentence.** Increase sets the claim in near-black and the elaboration in gray *inside one h1*, so the hero is one sentence instead of a headline-plus-deck stack — the right move when the second sentence is the technically checkable part.

## Sources

Screenshots at 1440 and 390 in `/Users/ayushgarg/Ayush/UI_Library/.cache/shots/arch-pm-*.png`; Playwright probes (computed styles, transition census, size census, section geometry) run 2026-09 and **re-run 2026-09-10 at 1440×900 with a desktop UA** on sanity.io, ramp.com, retool.com, linear.app, linear.app/pricing, linear.app/changelog, increase.com, vercel.com, stripe.com and loom.com.

- **sanity.io** — re-probed 2026-09-10. h1 112/112/−4.48px/w400 `Waldenburg`, deck 32/35.2 **w425**; document ground white with the hero art-directed as a `#0b0b0b` band; sections at `padding: 128px 0`, heights 838/1055/1164/4416px; hover colour `0.15s cubic-bezier(0.4,0,0.2,1)` ×34, reveals `opacity 1s` ×18; zero gradient headings; inset hairline `#353535`; nav 35px pills at 13px, hero CTAs 55px pills at 24px including `npm create sanity@latest` at 439×55; **no 16px body anywhere** (13/16.9 ×105, 13/19.5 ×70, 12/18 ×348 below the fold); Osano dialog now restyled to a white 600×175 sheet with 27px pill buttons. Mobile 60/60 at x=24.
- **ramp.com** — h1 64/64/−0.01px/w400 `Lausanne`; tokens `--grayLight #f4f2f0`, `--grayMedium #d2cecb`, `--grayDark #6e6a68`, `--text-primary #0c0a08`, `--text-hushed #0c0a0899`, `--spacer-m 40px`, `--spacer-l 80px`; 14px dominates the page (**124 nodes**, re-counted 2026-09-10); one section at `padding: 128px 0`; nav 44px at r6, hero CTA 176×51 at r6 inside a 268×60 email input group; the page's **only** real shadow is a six-stop slab shadow topping out at `0 232px 65px rgba(0,0,0,.008)`; live odometer eyebrow plus a five-item fold-line ticker; two hero product images transition `transform 0.3s` and nothing else does. Note: ramp.com serves a plain-markdown "machine version" to default headless user agents — measured with a real UA.
- **retool.com** — h1 72/75.6/−1.584px/**w300** `saansFont`; ground `#151515`, ink `#e9ebdf`; reveals `opacity 0.6s cubic-bezier(0.72,0,0.12,1)` ×108 and `transform, opacity 0.3s` ×81; nav 40px; button radius 0 ×133 against pill ×7; section heights 496/887/1008/4076/10944px; **zero real shadows on the current hero** (an earlier pass measured `0 68px 116px rgba(0,0,0,0.35)`); sticky dimming section index; mobile 40/42 at ls −0.4px, x=15 and now **centred**.
- **linear.app** — h1 64/64/−1.408px/w510 Inter Variable on `#08090a`; four sections at `padding: 128px 0`, measured 1226/1229/1232/1220px tall; hover `color 0.1s` ×216; max-width 1436/1416; 14px is the largest size group (220 nodes); mobile 38/41.8 at x=23; announcement on the deck baseline. **`/pricing`** (2026-09-10): h1 48/48 w510, body 15/24 ×88, plan columns 551px, comparison rows 44px ×56, no 128px bands. **`/changelog`**: one 23,905px section at zero band padding, h1 48/48, entry rows 54px, 15/24 ×373.
- **increase.com** — re-probed 2026-09-10. No `h1` element; the two-ink headline is 40/48/−0.8px **w600** `TT Interphases Pro` in a 768px box, deck 20/28 at 584px; 14px dominates (82 at w400 + 34 at w500); nav items 28px, sign-in/up 36px, hero CTAs 46px, **8px radius on all 20 buttons and 0px on everything else**; content 1160px with 768/528/456px prose blocks; **zero real shadows** (an earlier pass measured a nine-stop hero shadow); leaks `transition: all 0.15s` on 29 elements.
- **arc.net** — ground `#fffcec`, display `Marlin Soft SQ` serif; download buttons 45px at 14/600, radius 10px; a blue `#3139fb` band with a torn edge; transform+shadow hover on 6 elements only.
- **loom.com** *(counter-example, re-confirmed 2026-09-10)* — h1 63.27/65.104 at **w700**, `letter-spacing: normal`, **centred**, `Charlie Display`; subhead 26.65/40.62 centred; two 58px pill CTAs side by side; `transition: all 0.2s` ×6 and `all 0.25s` ×4; sections at 111.04px; 230 tokens of an inherited Atlassian system.
- **stripe.com** — re-probed 2026-09-10. h1 48/55.2/−0.96px **w300** `sohne-var`, left-aligned across a 959px box, headline and deck in one sentence; live eyebrow `Global GDP running on Stripe: 1.71306539%`; nav 40px and hero CTA 48px, both r4; hover `color 0.3s cubic-bezier(0.25,1,0.5,1)` ×150; reveals `0.8s cubic-bezier(0.165,0.84,0.44,1)` on transform ×46 and clip-path ×12.
- **vercel.com** — re-probed 2026-09-10. h1 `Agentic Infrastructure` 64/64/−3.84px (−0.06em) **w400** `GeistSans`, left-aligned on `#fafafa`; 14/20 ×120 against 16/24 ×4; intermediate weights at 450 (24/32 and 56/56). Its docs h1 (56/56 w600) is cited from [`developer-platform`](developer-platform.md).
- **framer.com/marketplace/templates** — the trending grid, as a calibration surface for "does my page look bought".
- **`../references/editorial-luxury-and-marketing.md`** — Apple, Anthropic, Rivian, OpenAI, Aesop, Kinfolk, The Row, The Pudding, Oxide and teenage.engineering measurements are cited from that teardown rather than re-derived: section rhythm (128/144/224px), the 0–3% saturation claim, Vercel's 6%-peak shadow scale, the bimodal radius distribution, the nine-slot generic sequence this file's eight-block version compresses. Its Linear row (64/64/−1.408px/w510) and Vercel row (64/64/−3.84px/w400) agree with this file's re-probe.
- **Neighbour files compared against:** [`luxury`](luxury.md), [`editorial`](editorial.md), [`developer-platform`](developer-platform.md). Each carries its own cross-table naming this archetype's band; the numbers reconcile in both directions.

## Differentiation pass (2026-09)

Compared against [`luxury`](luxury.md), [`editorial`](editorial.md) and [`developer-platform`](developer-platform.md) — the three files whose bands actually collide with this one. (`ecommerce` was checked and stays a one-line boundary: it has a cart, this does not.) Live re-probes at 1440×900 with a desktop UA on sanity.io, ramp.com, retool.com, linear.app (+ `/pricing`, `/changelog`), increase.com, vercel.com, stripe.com, loom.com.

**Added** — a side-by-side numbers table against the three neighbours, plus three paragraphs saying out loud what is shared and where the difference actually lives: with `luxury`, body size / radius / reveal duration are noise and the difference is display scale, attached proof and what is allowed to `transform`; with `editorial`, the clean discriminator is section rhythm (128–288px vs ~30px), not the page title, which now touches at 48px; with `developer-platform`, nothing in the palette separates them and the geometry separates them by 2× in both directions (Vercel 64/64 w400 home vs 56/56 w600 docs; Stripe 48/55.2 w300 home vs 24/32 w700 reference).

**Corrected** — eleven measurements that were wrong or stale:
1. **Body.** "Sanity 16/24" was false: sanity.io ships no 16px body at all (13/16.9 ×105, 13/19.5 ×70) under a 32/35.2 w425 deck. The row now says what is true across the set — 16–17px is the deck and the two or three real paragraphs, and **14px is the page's dominant size**.
2. **Radius.** "Nothing in the reference set puts 8px on a button" was contradicted by this file's own Sources entry: increase.com puts 8px on **all 20** of its buttons, its nav and its cards. Rewritten as a third lane held deliberately, with the real tell (holding two values on purpose) stated instead.
3. **Page title.** Band widened from 56–72 to a measured 48–112 with 56–72 as the mode, after Stripe re-probed at 48/55.2 **w300** and Increase at 40/48 **w600**. The rule that actually survives: nothing at or above 56px exceeds weight 510.
4. **Hover motion.** "Zero `transform` across nine measured sites" was wrong — Stripe transitions transform on 60 elements, Ramp on two hero images. Restated precisely: colour-only on anything made of text, `transform` confined to media.
5. **Elevation.** Increase's nine-stop hero shadow and Retool's `0 68px 116px` are both gone; both pages now ship zero real shadows. Replaced with Ramp's measured six-stop slab shadow, and the fact that it is the only shadow on the page.
6. **Node counts** re-counted: 14px dominance is Linear 220 / Ramp 124 / Vercel 120 / Increase 116 (was 211 / 196 / — / 155).
7. **Grounds.** Sanity serves a white document ground and art-directs the hero as a `#0b0b0b` band; Ramp's page is white with `#f4f2f0` bands. Both were recorded as page grounds.
8. **Cookie banner.** Sanity has restyled Osano to a white 600×175 sheet with 27px pill buttons; the vendor-palette version is now the before, not the current state.
9. **Control heights.** Nav band corrected to 28–44 (Increase 28, Linear 32, Sanity 35, Stripe/Retool 40, Ramp 44).
10. **Mobile alignment.** "Left alignment survives; all three hold their edge" is no longer true — Retool now **centres** its 40px mobile headline (re-probed at 390×844). The 0.54–0.6× ratio and the leading/tracking relaxation both re-confirmed: Sanity 60/60 at x=24, Retool 40/42 at ls −0.4px, Linear 38/41.8 at x=23.
11. **Increase prose widths** 768/540 → 768/528/456.

**Hardened** — "when it is the wrong one" now names surfaces the same brands ship one archetype over, with numbers: `linear.app/pricing` (h1 48/48, body 15/24, 551px plan columns, 44px comparison rows, zero 128px bands) and `linear.app/changelog` (one 23,905px section, 54px rows). The characteristic failure gained a six-item **screenshot** test that needs no devtools — centred headline, twin equal CTAs, sections within 20% of one height, the three thumbnail-visible skeleton slots, one radius everywhere, no photograph of the product working — ahead of the five measurements that follow it.

**Cut** — duplicate framer.com Sources entry; the numbers table's motion row now points at the motion section instead of restating it; the Ramp odometer, which appeared four times, appears once as evidence and once as a signature.

**Also added** — one line stating that `premium-minimal` is the archetype of the app, not an alternative for its landing page, since arc.net is cited in both files.

**Neighbour files edited for consistency** — `luxury.md` (this archetype's display band 48–112, nav control band 28–44) and `editorial.md` (its page-title discriminator now notes the 48px touch point and that weight breaks the tie).
