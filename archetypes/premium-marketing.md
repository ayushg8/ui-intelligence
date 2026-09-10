# premium-marketing

**Evaluated:** 2026-09 · **Density:** spacious · **Dark by default:** either, and the asset decides, not taste. The ground must match the chrome of the product shot you are leading with, or the shot floats. Linear (`#08090a`), Sanity (`#0b0b0b`) and Retool (`#151515`) run near-black because their heroes are screenshots of dark apps; Ramp (`#fff`, warm ink `#0c0a08`) and Increase run white because their product is a light dashboard. Never ship a theme toggle here — it doubles the art direction for a page a visitor sees once.

> A stranger with no account and no task gives you one scroll to prove the thing behind this page is serious, and there is no work for the interface to hide behind.

## When this is the right archetype

The visitor is not a user. They arrived from a link, an ad, a search result or a founder's post, they have between twenty and ninety seconds, they will scroll once, and they will not come back before a decision is made about you elsewhere — in a hiring conversation, a procurement thread, an investor's tab group. They have no goal beyond *is this any good*, which means every pixel is doing brand work and none of it is doing task work. That is the load-bearing fact: an app screen is judged on whether it works, and this page is judged on whether it has taste. It is therefore the single highest-risk surface in this corpus for reading as machine-made, because the usual defence — "but the workflow is correct" — does not exist. The page must also carry a mechanism: what the product is, how it works, and one checkable number.

- **Choose this over `luxury`** when the page has to explain a mechanism. Aesop need not argue that hand wash matters; Vercel must argue that agentic infrastructure matters. Structurally: premium-marketing pairs a 56–72px sentence with proof (a real product surface, a number, named customers); luxury pairs a 24–50px label with a photograph and forfeits the proof.
- **Choose this over `editorial`** when the visitor is being persuaded rather than reading. Marketing body sits in 38–56ch columns beside an image and is read once at a glance; editorial body runs 55–65ch and is read for twenty minutes. Marketing has a motion budget; editorial does not.
- **Choose this over `developer-platform`** when nobody on the page is blocked. Docs, references, changelogs and dashboards are that archetype even when they share the token file — they are scanned for a fact, so they get compact density and no reveal animations. The homepage and the docs are two surfaces, not one.
- **Choose this over `ecommerce`** when there is no cart. If the page needs a price, a returns line, a size grid and a sticky add-to-cart, conversion rate owns the design and you are in `ecommerce`, where taste arguments lose to a number.

## When it is the wrong one

**Pricing and comparison pages.** They look like marketing and behave like a table. A visitor is holding three plans in working memory and needs adjacent rows, not 224px band gaps; apply this archetype's rhythm and you triple the scroll cost of a comparison. Ship the hero and footer from here and set the table at `enterprise-dense` density.

**Single-action conversion pages** — a webinar signup, an app-download link from a paid campaign, a waitlist. One message, one field, one button genuinely is the whole page. An asymmetric editorial hero and eight bands of choreography lower conversion and are a worse use of the same effort.

**Docs, changelogs, status pages, careers listings, trust centres.** These are scanned, and every one of them is a list. Linear's own homepage changelog sits at zero extra padding for exactly this reason.

**Signed-in surfaces of any kind.** Applying 17px body, 128px gaps and 800ms reveals to an app shell makes it slow and precious — the reveals fire on every navigation, and a tool a user opens forty times a day cannot afford an animation they see forty times a day.

**Pages whose audience is forty named accounts already in a sales cycle.** That is a deck and a security questionnaire. The homepage is not where that deal is won, and building a cinematic hero for it is spending the budget in the wrong room.

## Reference products

| Product | Why | The one thing to steal |
|---|---|---|
| **Stripe** | The benchmark for real product UI as the hero asset — a working checkout, a fraud table with real percentages | Section headings constrained to a **column span** (`span-8/7/6` = 856/752/648px), so the measure changes section to section instead of one centred ribbon |
| **Linear** | Marketing that ships the app's own design language; four sections at `padding: 128px 0`, 1220–1232px tall | The announcement lives on the **deck's baseline, right-aligned** (`New  Loops →`) instead of in a badge pill above the headline |
| **Anthropic** | The cleanest asymmetric editorial hero shipping, with its whole token system exposed | Sans display + **serif body** at 20px/1.4, headline in cols 1–7, deck in cols 9–12, and two words underlined instead of a gradient |
| **Ramp** | 64px/64px headline at weight 400 and **−0.01px** tracking; warm near-black ink `#0c0a08` on `#f4f2f0` | The eyebrow is a **live number** — `US CORPORATE PAYMENTS PROCESSED BY RAMP: 0.8712181%` with rolling digits — and a second live ticker pins the fold line |
| **Sanity** | h1 112px/112px (lh **1.00**) at −0.04em, weight 400, bespoke Waldenburg; sections at 128px | The third CTA is a **copyable install command**, `npm create sanity@latest`, given the same visual weight as the buttons |
| **Retool** | Display at weight **300** (72px/75.6px, −0.022em) on `#151515` with warm `#e9ebdf` ink | A **sticky section index** in the left column whose items dim and lift as the right pane advances — a table of contents inside one section |
| **Increase** *(the one you would not name)* | An API-first bank's homepage: 1160px grid, prose at 768/540px, dominant type size 14px | The headline is **one sentence in two inks** — claim in near-black, elaboration in gray — so the deck is inside the h1 instead of below it |
| **Loom** *(counter-example, measured)* | Post-acquisition, ships the generic skeleton in full | Nothing. Study it: centred 63px at **weight 700**, `letter-spacing: normal`, two pill CTAs side by side, `transition: all`, and a subhead ending "to supercharge productivity" |

Also worth an hour: **framer.com/marketplace/templates** — not to copy, to calibrate. If your page is indistinguishable from a $58 trending template, the visitor's read is that you bought one.

## The numbers

| | Value | Because |
|---|---|---|
| Body | **16–17px / 1.5–1.6**, weight 400 | Read once, at a glance, in a 38–56ch column next to an image. Sanity 16/24, Vercel 16/24, OpenAI 17/28 (1.647). Below 16px only with luxury leading (The Row 13/21.45 = 1.65) and only when the photograph is the argument |
| Dense/secondary text | **14px** for nav, captions, CTA labels, meta, eyebrows; 11–12px mono uppercase at +0.04–0.06em for figure labels and tickers | One secondary size covering five roles is what keeps the page from having eight sizes. Measured dominance: Ramp 196 nodes at 14px, Increase 155, Linear 211; OpenAI ships no 16px token at all |
| Page title | **56–72px / 0.95–1.05**, tracking −0.02 to −0.04em, weight **300–510** | Linear 64/64/−1.408px/510 · Sanity 112/112/−4.48px/400 · Retool 72/75.6/−1.584px/**300** · Ramp 64/64/−0.01px/400 · Vercel 64/64/−0.06em/400. Eleven of sixteen references sit at 300–510: display bold is the loudest tell on the page. Section h2 = 32–48px, one step, not five |
| Row / list-item height | **28–44px** — the only lists here are the nav mega-menu, the changelog and the footer | Increase nav items 28px at 14/500; Linear nav 32px at 13px. These are app numbers because they are app objects; do not inflate them to match the page's spaciousness |
| Control height | **Two heights, by role.** Nav 32–40px · hero and prefooter 44–56px | An AI ships one 44px button everywhere. Measured: Ramp nav 44px hit area / hero CTA inside a 60px input group · Arc download 45px · Stripe nav 40px, hero 48px · Linear nav 32px, hero 44px |
| Sidebar width | **None.** Top bar at 64–72px, transparent over the hero, solid on scroll. The number that replaces it is the **page side margin: 32→80px** (`clamp`, ~2.5× range, not proportional) | A marketing page has no persistent navigation because the visitor has no place to be. Two nav actions maximum: a text sign-in and one button |
| Content max-width | **1400–1440px outer** (Vercel 1400 · Anthropic 1432 · Linear 1436/1416 · Ramp 1440), **prose 540–768px**, headings **648–856px by span**, hero media **full-bleed** | Increase runs 1160 content with 768/540 prose blocks. The rule is three widths in play at once; a single `max-w-3xl mx-auto` down a 1440 page leaves 336px of dead space per side and reads as a template |
| Radius (control / container) | **Bimodal: 0–6px or fully round.** Pick one lane and hold it. Slabs and image cards 12–24px only when they are photographs | Measured: Stripe 4 · Vercel nav 6 · Ramp nav 6 · Oxide 2 · Aesop 0 · Sanity, Linear, Loom pill. Nothing in the reference set puts 8px on a button; 8px everywhere is the shadcn default and is legible as one |
| Border weight & colour | 1px hairline at **5–10% ink**, usually as an inset ring so it survives on any band. Linear `inset 0 0 0 1px rgba(255,255,255,0.05)` · Sanity `inset 0 0 0 1px #353535` on `#0b0b0b` · Vercel `0 0 0 1px #00000014` | On a page with dark and light bands alternating, a solid border colour breaks on the second band. Alpha composes |
| Elevation | **Near-zero for cards (peak 6% black, Vercel's whole scale).** One exception: the hero product slab gets a deep multi-stop shadow — Increase runs nine stops to `0 192px 136px rgba(26,43,59,0.23)`, Retool `0 68px 116px rgba(0,0,0,0.35)` | Those are not card shadows, they are the shadow of a physical object held above the page. If a shadow reads as a gray area on anything smaller than the hero asset, it is 3× too strong |
| Motion (micro / standard) | **Hover 100–300ms, colour properties only. Reveal 600ms–1000ms, opacity/clip only.** Linear `0.1s cubic-bezier(0.25,0.46,0.45,0.94)` on `color` across 216 elements · Sanity `0.15s cubic-bezier(0.4,0,0.2,1)` on colour across 34, `1s` opacity across 18 · Retool `0.6s cubic-bezier(0.72,0,0.12,1)` opacity across 108 · Stripe `0.8s cubic-bezier(0.165,0.84,0.44,1)` | Two different budgets. 300ms for both is the generic collapse: too slow for a pointer, too fast to read as the page settling |

## Colour

Neutrals run **0–3% saturation**, and the asymmetry is not optional: **light grounds skew warm or pure** (Ramp `#f4f2f0` / `#0c0a08`, Anthropic ivory `#faf9f5`, Arc `#fffcec`, Vercel `#fafafa`), **dark grounds skew very slightly blue or neutral** (`#08090a`, `#0b0b0b`, `#151515`). Never the reverse. `slate-600` on `slate-50` is 16.3% saturated — five to eight times any reference here — and is the fastest colour tell in existence.

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

**The cookie banner is a state you own.** Measured: Sanity ships Osano's default palette (`#f36458` buttons, `#121923` dialog) against its own black-and-orange page, and at 390px the banner covers the hero CTA entirely; Ramp ships Fides' blue-gray defaults against a warm ivory page. Restyle it to your tokens or it is the ugliest element on your site — and check it at 390 before you ship.

## Motion budget

The frequency argument runs the opposite way from every other archetype: this page is seen **once**, so choreography is affordable and the whole budget can go into the first scroll. What it may never do is delay a fact.

- **Hover: colour only, 100–300ms.** Across nine measured sites the hover property list is `color, background-color, border-color, outline-color` — zero `transform`. On a page with forty links, transform-on-hover makes the layout shiver as the cursor crosses it.
- **Reveal: 600ms–1000ms, opacity and `clip-path`, one trigger per band, staggered by no more than 60ms.** Retool `0.6s cubic-bezier(0.72,0,0.12,1)` × 108 elements; Sanity `1s` × 18; Stripe `0.8s cubic-bezier(0.165,0.84,0.44,1)` on transform and clip-path. An 800ms expo-out reads as the page settling; a 300ms ease-out reads as a component mounting, six times on the way down.
- **One scroll-scrubbed sequence per page, maximum**, and it must scrub — the page keeps native scroll velocity and you can scroll back out. Hijacking `wheel` for full-screen slides is the most resented pattern in the archetype.
- **Never animate:** the nav, anything above the fold on load (the hero is already there), numbers counting up on a stat the visitor is trying to read, or anything that has to finish before a link is clickable.

## Mobile

This archetype adapts, and the adaptation is measured, not proportional. From this session at 390×844:

| Site | Desktop h1 | Mobile h1 | Ratio | lh | Left margin |
|---|---|---|---|---|---|
| Sanity | 112 / 112 | 60 / 60 | **0.54** | 1.00 → 1.00 | 24px |
| Retool | 72 / 75.6 | 40 / 42 | **0.56** | 1.05 → 1.05 | 14px |
| Linear | 64 / 64 | 38 / 41.8 | **0.59** | 1.00 → 1.10 | 23px |

1. **Display drops to 0.54–0.6× of desktop**, not 0.9×. A `clamp()` whose min is 80% of its max is a rounding error, not a responsive scale.
2. **Line-height relaxes as size falls** (Vercel 1.0 → 1.167, Linear 1.0 → 1.10); tracking relaxes with it (Retool −0.022em → −0.01em).
3. **Left alignment survives.** All three hold their ragged right edge at x = 14–24px. Centring on mobile "because it looks balanced" throws away the editorial read.
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
2. **Centred 60px gradient headline** — `text-6xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent`. Zero of the eight primary references carry a gradient or transparent text fill on `h1`/`h2`; I re-checked Sanity, Retool, Linear, Ramp, Increase and Arc this session and got zero again. → **Solid ink, left-aligned, 56–72px at weight 300–510, lh ≤ 1.05, tracking −0.02 to −0.04em.** If you want colour in the headline, do what Increase does and change the *ink* mid-sentence, or what Anthropic does and underline two words.
3. **Two equal CTAs side by side** — filled primary, outlined `Learn more`, both 44px, both 8px radius. It tells the visitor you don't know which action you want. → **Make them unequal in kind, not just in fill.** Ramp fuses an email field and a button into one control. Sanity runs a filled pill, a white pill and a copyable `npm` command. Anthropic ships zero hero buttons and puts the only one in the nav. Kinfolk ships `Buy | Read` as two text links and a pipe.
4. **Logo cloud** — six to eight logos in `grayscale opacity-60`, evenly spaced, under `Trusted by teams at`. → **True black, real proportions, sized by optical weight, cropped off one edge**, with a label that is a claim (`POWERING THE BEST TEAMS`) or no label at all. Sanity puts its logo strip in a full-bleed orange band at the fold line; Increase runs its row cropped at both edges.
5. **Three feature cards** — 3-col grid, outlined 24px icon in a rounded square, 20px title, three lines, `hover:shadow-lg`. → **One idea per full-width band, each 1000–1230px tall at 128px padding, each carrying a real screenshot of that feature.** Linear ships exactly four such sections. If you have three real assets you have three bands, not a grid.
6. **Bento grid** — `rounded-2xl` cards, `bg-gradient-to-br from-gray-50`, abstract 3D shapes. Bento is a layout for showing *many real artifacts at once*; with placeholder content it is a mood board. → **Only at five or more genuinely different real surfaces.** Stripe's largest bento cell contains a 516px live DOM rendering of the product, not an image of one.
7. **Testimonial trio** — three quote cards, circular headshot, title, five stars. → **One sentence per customer, containing a number, set at 24px, no card and no face.** `Zapier serves over 100 million monthly webhook requests`. `50% of Fortune 100 companies have used Stripe`. If you have no number, you have no testimonial section.
8. **FAQ accordion + gradient CTA band** — six `<details>`, then a full-width purple-to-blue band with centred white text. The band is the only saturated area on an otherwise restrained page, so it reads as a bolted-on conversion widget. → **Delete the FAQ** (if a question matters enough for the homepage, answer it in a band; if it doesn't, it belongs in docs), and make the prefooter an *asset*: Anthropic's is a full-bleed photograph card with a 68px serif headline on it; Apple's is a single pill containing the price and the Buy button; Linear's is a plain headline with `margin: 224px 0`.

**Self-diagnosis, in order of severity.** (a) Could a competitor ship this page by swapping the logo and six strings? Then the page has no asset and the skeleton is doing all the work. (b) Are all your sections within 20% of the same height? That is the strongest structural signal of a template. (c) Is the hero centred? Then check whether you ever decided what the second element was. (d) Is `py-16`/`py-20` (64–80px) your section gap? That is 2–4× too tight; the references run 128–288px. (e) Is any `h1` above weight 600? (f) Do you have a stat you cannot source? Delete it — an unverifiable number is worse than no number, and it is the one failure on this page that costs trust rather than taste.

## Signature decisions that fit here

- **The eyebrow is a live number.** Ramp replaces the badge pill with `US CORPORATE PAYMENTS PROCESSED BY RAMP: 0.8712181%`, digits rolling, and pins a second ticker (`RECEIPTS PROCESSED · ACCOUNTING FIELDS CODED · SPEND ALLOCATED`) to the fold line. The claim and the proof are the same object, and it can only exist because they have the data.
- **The install command is a CTA.** Sanity gives `npm create sanity@latest` the same height and prominence as `Start building`, with a copy affordance. For a product whose first minute happens in a terminal, the third button *is* the funnel.
- **The section index is sticky and dims.** Retool's left column lists that band's sub-topics; each dims until the right pane reaches it. It turns one 4,000px section into a readable sequence without eight more headings.
- **The deck's baseline carries the announcement.** Linear right-aligns `New  Loops →` on the same line as the hero deck. It gets the placement a badge wanted, at the moment the eye has finished the headline, without adding a component.
- **The headline changes ink mid-sentence.** Increase sets the claim in near-black and the elaboration in gray *inside one h1*, so the hero is one sentence instead of a headline-plus-deck stack — the right move when the second sentence is the technically checkable part.

## Sources

Screenshots at 1440 and 390 in `/Users/ayushgarg/Ayush/UI_Library/.cache/shots/arch-pm-*.png`; Playwright probes (computed styles, `:root` tokens, transition census, section geometry) run 2026-09.

- **sanity.io** — h1 112/112/−4.48px/w400 `Waldenburg`; mobile 60/60 at x=24; sections at `padding: 128px 0`, heights 838/1055/1164/4416px; ground `#0b0b0b`; hover `0.15s cubic-bezier(0.4,0,0.2,1)` on colour ×34, reveals `1s` opacity ×18; zero gradient headings; inset hairline `#353535`; Osano cookie banner in vendor colours covering the hero CTA at 390.
- **ramp.com** — h1 64/64/−0.01px/w400 `Lausanne`; tokens `--grayLight #f4f2f0`, `--grayMedium #d2cecb`, `--grayDark #6e6a68`, `--text-primary #0c0a08`, `--text-hushed #0c0a0899`, `--spacer-m 40px`, `--spacer-l 80px`; 14px dominates the page (196 nodes); section at 128px; live odometer eyebrow and fold-line ticker; email+button fused CTA. Note: ramp.com serves a plain-markdown "machine version" to default headless user agents — measured with a real UA.
- **retool.com** — h1 72/75.6/−1.584px/**w300** `saansFont`; ground `#151515`, ink `#e9ebdf`; reveals `0.6s cubic-bezier(0.72,0,0.12,1)` opacity ×108 and `0.3s` transform+opacity ×81; hero shadow `0 68px 116px rgba(0,0,0,0.35)`; sticky dimming section index; mobile 40/42 at x=14.
- **linear.app** — h1 64/64/−1.408px/w510 Inter Variable on `#08090a`; four sections at `padding: 128px 0`, 1220–1232px tall; hover `0.1s` on `color` across 216 elements; max-width 1436/1416; mobile 38/41.8 at x=23; announcement on the deck baseline.
- **increase.com** — no `h1` element (two-ink headline); body `TT Interphases Pro` 16/24; size census dominated by 14px (155 nodes) and 14/500 (62); nav controls 28px, 8px radius; content 1160px with 768/540px prose; nine-stop hero shadow to `0 192px 136px rgba(26,43,59,0.23)`.
- **arc.net** — ground `#fffcec`, display `Marlin Soft SQ` serif; download buttons 45px at 14/600, radius 10px; a blue `#3139fb` band with a torn edge; transform+shadow hover on 6 elements only.
- **loom.com** *(counter-example)* — h1 63.27/65.1 at **w700**, `letter-spacing: normal`, centred, `Charlie Display`; two pill CTAs; `transition: all`; sections at 111.04px; 230 tokens of an inherited Atlassian system.
- **framer.com/marketplace/templates** — the trending grid, as a calibration surface for "does my page look bought".
- **`../references/editorial-luxury-and-marketing.md`** — Stripe, Vercel, Apple, Anthropic, Rivian, OpenAI, Aesop, Kinfolk, The Row, The Pudding, Oxide, teenage.engineering measurements are cited from that teardown rather than re-derived: section rhythm (128/144/224px), the 0–3% saturation claim, Vercel's 6%-peak shadow scale, the bimodal radius distribution, the nine-slot generic sequence this file's eight-block version compresses.
