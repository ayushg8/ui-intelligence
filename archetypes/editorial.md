# editorial

**Evaluated:** 2026-09 · **Density:** spacious · **Dark by default:** no — light by default, with dark and sepia as first-class *user settings* wherever a session lasts longer than ten minutes. Dark-by-default is right only when the reading surface is itself the night product (Stripe Press's book pages ship a `#201819` ground) or when the reader stores documents and reads at 11pm (Readwise Reader). A news site that ships dark-first is imitating a developer tool.

> Someone has committed several minutes of attention to a body of text, and every decision in the interface either protects that commitment or spends it.

## When this is the right archetype

The reader is voluntary, mostly new to this specific page, and reading **sequentially** — first sentence to last — rather than hunting a value. Sessions are 3–40 minutes; frequency is low (a few times a week) so nothing is learned by muscle memory and nothing needs to be compressed for the hundredth pass. The stakes are attention, not money: the failure mode is abandonment, not error. The primary object is a *body of text*, and everything else on the page — nav, share, subscribe, related links, the author's face — is furniture competing with it. This is the only archetype where **more whitespace and larger type are the correct engineering answer**, because comprehension, not throughput, is the metric.

- **Choose this over `developer-platform` when** the reader goes top-to-bottom instead of jumping to a parameter. Stripe ships both on one domain and sizes them differently: guides at 16/26, the API reference at 14/22 in a 57ch three-column shell (measured, `craft/typography.md`). If your page has a right-hand TOC that people actually use, you are closer to `developer-platform`.
- **Choose this over `premium-marketing` when** the text is the product rather than an argument for a product. Marketing body runs 38–56ch next to an image and is read once at a glance (Linear 38ch, Apple 45ch); editorial body runs 55–65ch and is read for twenty minutes. Marketing gets a motion budget; editorial does not.
- **Choose this over `social-community` when** the unit is a finished, edited piece with an author, not a stream of posts with a reply box. A feed's job is to be scanned and re-entered; an article's job is to be finished once.
- **Choose this over `premium-minimal` when** the reader is consuming someone else's words rather than manipulating their own objects. Bear and Things are quiet for a different reason: the user is *making* something.

## When it is the wrong one

- **A help centre or knowledge base.** It looks like articles, and it is not: people arrive with a specific question, search, land mid-page, and scan for the one paragraph that answers them. Apply editorial and you get 18px serif at 58ch with no search, no breadcrumbs, and no in-page anchors — a beautiful surface that fails the only task it has. Use `developer-platform` geometry: 15px, 73–86ch, persistent search, TOC.
- **A CMS, newsroom back-office, or the authoring side of any publication.** Editors touch it eight hours a day and handle two hundred items. That is `enterprise-dense` wearing the publication's brand fonts. Editorial density here costs an editor real hours per week.
- **A data-narrative that is actually a dashboard.** The Pudding is editorial because each piece is authored once and read start-to-finish. A "storytelling" layer over a live metrics feed is `analytics-bi`; the moment the numbers update without an author, prose measure is the wrong constraint.
- **A collection browser.** Are.na's channel view runs 14.4/20.9 grotesque in grid cells (measured) — that is `creative-tool`/`social-community` shaped, and only Are.na *Editorial* (19.2/27.8 at 57.6ch, measured) is this archetype. Products routinely confuse "we host writing" with "our surface is a reading surface."
- **Anything with a form in the critical path.** Long-form type on a checkout or signup makes the field labels float and the tap targets ambiguous. Guest the form in at product density; do not let the article scale touch it.

## Reference products

| Product | Why | The one thing to steal |
|---|---|---|
| **The Guardian** (article) | The most disciplined news typography on the web; three custom faces, each with one job | Body **17/23.8 slab-serif at 620px (57.7ch)** with `margin-bottom: 12px` between paragraphs — half a line, not a full one. Tight paragraph spacing plus a short measure reads faster than the airy 1.7-leading alternative. |
| **NYT** (front page) | A five-face system (`nyt-cheltenham`, `-imperial`, `-franklin`, `-karnak`, `-karnak-cond`) with a 10→72px size ramp in tokens | Summary decks set in the **serif** at 14/19 with `+0.1px` tracking; section labels in the **sans** at 11/20 with `+0.44px` (≈+0.04em). Face carries role; size carries hierarchy. |
| **Stripe docs** (guides) | Proof that one company can ship two reading densities coherently | 16/26 prose in guide mode vs 14/22 in reference mode, same tokens. Size is a function of *reading vs scanning*, not of brand. |
| **Every** | Best contemporary essay page; serif at a size most teams are afraid of | Body **20/30 Signifier at 736px (61.3ch)** on a warm `#FDFAF7` ground, but `figcaption` at **12/18 system sans, `#909090`** — furniture drops out of the reading face entirely. |
| **The Pudding** | Data narrative where the prose is subordinate to the graphic | Body **18/25.2 IBM Plex Sans w300 at 576px (53.3ch)** — a deliberately *narrow* column, because the paragraph is a caption to a full-width visual. Radius token: `2px`. |
| **Are.na Editorial** | A grotesque body face proving serif is not a requirement | **19.2/27.8 (1.45) at 648px** — the sans is set ~2px larger than the serif comparables to compensate for a smaller apparent x-height in running text. |
| **Works in Progress** *(few will name it)* | The best sidenote layout shipping | Asymmetric three-zone page: 330px note rail at x=40, **728px text column at x=395** (18/27 serif, 56.7ch), second rail at x=1148. Sidenotes set in **GT America Mono** — a different face so a citation never reads as prose. |
| **Stripe Press** *(few will name it)* | Dark-ground long-form done right | 17/25.5 Ivar Text at **weight 500** on `#201819` with `#DEE6FF` text — the body weight is raised one step for dark, exactly as `craft/color.md` prescribes. Plus a left-edge **tick ladder** marking chapter position instead of a percentage bar. |

## The numbers

| | Value | Because |
|---|---|---|
| Body | **17–19px** serif · **18–20px** grotesque · **16px** only when the column is split with code | Measured: Guardian 17, WiP 18, Pudding 18, Are.na 19.2, Every 20, Stripe guides 16. A grotesque needs +1–2px over a text serif at the same apparent size. Below 16px, sustained reading fatigues; above 20px, a 58ch column stops fitting a laptop. |
| Line-height | **1.4–1.5 at 17–19px** (Guardian 1.40, Are.na 1.45, WiP 1.50, Every 1.50); **1.6–1.7 only at 15–16px** | Leading is a function of *measure*, not size. At 55–60ch the eye's return sweep is short and 1.4 is comfortable; the 1.7 default belongs to 76ch docs columns (Vercel 16/27.2). Shipping 1.75 at 58ch is the single most common editorial over-correction. |
| Paragraph spacing | **0.5–0.75 line** (Guardian 12px on 23.8 leading; Every 20px on 30; WiP 20px on 27) | A full blank line between paragraphs breaks the block into unrelated slabs. Indent-or-space, never both. |
| Dense/secondary text | **12–14px in the sans/furniture face**, muted (Guardian figcaption 12/16 `#707070`; Every 12/18 `#909090`; NYT deck 14/19 `#5A5A5A`) | Captions, credits, timestamps and kickers are not read, they are consulted. Dropping them out of the reading face is what stops them competing with the prose. |
| Page title | **32–48px, weight 400–500** (Every h1 48 w400; Guardian h1 34/39.1 w500; WiP h2 32/40 w400; Stripe guides 32/40 w700) | A well-drawn display cut at 40px does not need bold to dominate 18px body — the size ratio (2.0–2.4×) already carries it. Weight 700 at 48px is a blog-template tell. Line-height goes to 1.10–1.20 at this size. |
| Section heading (h2) | **26–32px, 1.2–1.3**, with **2–3× more space above than below** (WiP 32/40 mb 15px; Every 30/37.5 mt 30 mb 12) | The gap belongs to the *break*, not the heading. Equal margins make a heading look unattached to its own section. |
| Row / list-item height | Index rows are **content-sized, 88–112px** (2 lines of a 20/26 headline + 12px meta + 24px padding + 1px rule); a reading-app queue row is **56–64px** | An article index is not a table. Fixing row height forces truncated headlines, and the headline is the only thing the reader is deciding on. |
| Control height | **36–40px** desktop, **44px** mobile; controls appear at most 3–4 times on a page | Editorial has almost no controls; the ones it has (share, save, theme, font size) are pressed rarely and often on a phone mid-article, so they get consumer touch targets rather than the 32px `developer-platform` norm. |
| Sidebar width | **260–320px** for an index/contents rail; **240–330px** for a sidenote rail (WiP 330) | The note rail holds full sentences, so it cannot go below ~240px without becoming a 25ch column of its own. The text column never gives up width to make rails symmetric. |
| Content max-width | **620–740px** — target **55–65ch**, ship in px (Guardian 620, Pudding 576, Are.na 648, WiP 728, Every 736) | This is the one place the archetype overrides `system/3-tokens.md`'s `--measure: 68ch`. That number is calibrated for documentation, where the corpus measured 69–95ch. Continuous prose wants the bottom of that band or below. |
| Radius (control / container) | **2–4px controls · 0 on images, pull-quotes, rules and the text column** (Pudding ships `--border-radius: 2px`; Guardian's article furniture is square) | There are no cards in an article, so there is nothing to round. A rounded image inside a text column reads as a widget rather than as evidence. |
| Border weight & colour | **1px hairlines at ~8% ink** — Guardian `--article-border: #DCDCDC` on white; rules under kickers, above footers, between index items, and nowhere else | Borders are separators of *content classes* (article / meta / related), not decoration. Four rules on a page is a lot. |
| Elevation | **None inside the reading column.** One shadow, for a genuinely floating overlay (share sheet, settings popover) | Nothing in a page of text is above anything else. A shadowed article card is the fastest way to make a publication look like a SaaS blog. |
| Motion (micro / standard) | **120ms** for controls · **160–200ms** for the settings popover · **0ms for anything in the text** | The reader is scrolling continuously; anything that animates on scroll competes with the words moving under their eye. |

## Colour

**Neutral character: warm, low-step, near-black.** The measured grounds are warm off-whites — Every `#FDFAF7`, Works in Progress `#FFF7F4`, Substack's default theme `#fff7f4` — or true white for news (Guardian `#FFFFFF`, furniture `#F6F6F6`). Warmth here is doing a job: a paper-toned ground lowers the luminance the reader stares at for twenty minutes without dropping text contrast the way a grey ground does. Cool-grey grounds (`#F8F9FA`, Wikipedia) read as *software*, which is exactly the association a publication is trying to avoid.

You need **six neutral steps, not twelve**: ground, raised furniture, hairline, muted text, secondary text, primary text. Editorial has no surface hierarchy to encode, so most of a twelve-step ramp goes unused and the spare steps get spent on decoration.

**Text is near-black, not grey.** Measured: Guardian `#121212`, Every `#111`, Pudding `#262626`, Are.na `#333`, WiP `#000`. That is 15–19:1, and it is deliberate: at 18px/1.45 across 60ch, a `#374151` body (the Tailwind reflex, 9:1) visibly greys out over a full screen of text. Secondary lands at `#5A5A5A`–`#909090` (4.5–7:1) and carries only captions and credits. **Three levels, no fourth** — consistent with `craft/typography.md`.

**The accent's entire job in this archetype is to mark a link, and optionally a kicker.** Guardian: `#C70000` on inline links, `#8B0000` on headlines, `#DCDCDC` link underline going red on hover. The Pudding: `#E32064`, underlined. Nothing else in the reading column is coloured. The accent does *not* get: buttons scattered through the text, coloured h2s, coloured icons, tinted callout boxes, a gradient anywhere. One colour, one meaning: "this is a departure from the page."

**Links must be distinguishable without colour.** Underline them, or give them a 1px bottom border at hairline that darkens to the accent on hover (Guardian's pattern). Colour-only links fail for 8% of male readers and are unreadable in the sepia theme.

**Semantic colour barely exists here** — there are no states to encode. If you find yourself defining success/warning/danger, you are building the account settings page, which is a different archetype hosted inside this one.

**Light / dark / sepia.** Light is default. Ship dark when the product stores things people come back to at night (a reader, a docs site, a book); skip it for a 900-word news page where the session is four minutes and the reader is outdoors. When you ship dark: re-map, do not invert — ground `oklch(0.16–0.19)` not `#000` (halation against light serif text is worse than against sans), raise the body **weight one step** (Stripe Press ships w500 on dark against w400 conventions), and drop the accent's chroma. Sepia is not a gimmick: a `#F5EDE0`-class ground at ~4000K is the setting readers actually pick for evening long-form, and it costs one extra token block.

## Type

**Three roles, and they should not be one family.** Every reference measured runs a **display face** (headlines), a **text face** (body, optimised for 17–19px), and a **furniture face** (captions, kickers, UI), and the furniture face is usually a sans even when the body is a serif. NYT: Cheltenham / Imperial / Franklin. Guardian: GH Guardian Headline / GuardianTextEgyptian / GuardianTextSans. Every: Signifier / Signifier / system sans. Works in Progress: Editor / Editor / GT America Mono. This three-role split is what makes a page legible as a publication before a word is read — and it is cheap: two families, or one superfamily with a display cut.

**Face character.** A text serif with a large x-height and sturdy stems (Guardian Text Egyptian is a slab for this reason — it survives at 17px on a screen where a Didone would not). If you go sans, pick a grotesque with real text drawing and set it **1–2px larger** than you would the serif (Are.na 19.2, Pudding 18). Avoid anything with visible personality in the lowercase at reading size — per `craft/typography.md`, Basis Grotesque's hand-drawn `a`/`g`/`t` collapse into noise below display sizes.

**The scale's shape: high contrast, few levels.** Editorial wants roughly **h1 : body ≈ 2.0–2.4×** with only four steps in the entire article (h1, h2, body, caption). Compare `technical-productivity`, which needs six or seven levels separated by 1–2px because it packs many object types into one screen. Here the page holds one object, so the levels can be far apart and few. A 24px h2 above 18px body — a 1.33× step — is the most common failure of nerve; it reads as bold body text.

**Weights: 400 for body, 400–500 for display, 500–600 for the sans furniture.** Guardian's h1 is w500 at 34px; Every's is w400 at 48px. Bold body text belongs only to the lede paragraph, if at all.

**Numerals: proportional lining in prose, always.** `tabular-nums` inside a sentence produces gappy `1`s. Turn tabular on only in an actual data table or a results panel. If the body face ships old-style figures by default, force `lining-nums` unless the whole design is a book.

**Monospace earns its place in exactly three roles here:** code, sidenotes/citations (Works in Progress sets the note rail in GT America Mono so a citation can never be misread as body), and section labels/kickers set in uppercase mono at 11–12px with **+0.04 to +0.10em tracking** (NYT's `+0.44px` at 11px; Supabase's label convention). It does not belong in the body, the headline, or the byline.

## Layout and navigation

**The shell is a single column on an asymmetric page.** Not centered — measured on Works in Progress, the 728px text column sits at x=395 in a 1440 viewport with a 330px note rail at x=40, so the page's optical centre is off to the right and the notes have a permanent home. Centering the column and letting the margins be empty is fine, but then you have nowhere to put marginalia and you will end up putting it inline.

**The primary object is the text block, and it gets priority by being the only thing at reading size.** Every other element on the page is smaller, quieter, or outside the column. This is the whole mechanism: not a bigger container, not a card, not a shadow — nothing else is allowed to be 18px near-black.

**Grouping strategy: rules and space, in that order.** Sections are separated by the heading's asymmetric margin (2–3× above vs below). Content *classes* — article vs meta vs related vs footer — are separated by a single hairline. Never by a background tint; a tinted block inside prose reads as an ad.

**Cards are right in exactly one place: the index.** An archive, a section front, or a "more from this author" strip. Inside the article, cards are wrong — a pull-quote is type and rules, a callout is an indented block with a left border, an embedded figure is an image with a caption. If you find a `border-radius` and a `box-shadow` between two paragraphs, you have built a widget.

**Images have three widths and you must choose deliberately:** at measure (an illustration that belongs to the sentence), measure + 120–160px (a figure that needs detail), and full-bleed (an image that is the argument). Captions align to the image's left edge, in the furniture face, 12–14px, muted. Always reserve the aspect ratio so text does not jump — CLS in a reading surface loses the reader's line.

**Navigation is minimal and top-anchored.** A masthead, a section, a back-to-index. No persistent sidebar for a single article. A right-hand TOC is appropriate only when the piece is long enough that people leave and return — Pudding's pieces run to a 28,375px scroll height, and that is the threshold where section anchors stop being clutter and start being necessary.

## Components

**Belongs here:** article body with a fixed measure · kicker → headline → standfirst → byline → dateline triad · drop cap (Guardian ships a 4-line dark-red drop cap on mobile; it is a *first-paragraph* signal, not decoration) · pull-quote as type-and-rules · figure + caption + credit · sidenote/footnote rail with an inline fallback · inline links with underline · section anchors · reading progress (only where the reader returns) · theme and text-size settings · save/highlight (reading apps) · article index rows · "related" strip below the fold · subscribe block, placed once, at the end or in a single interruption.

**Does not belong here:** cards wrapping paragraphs · box-shadows in the reading column · a floating share bar that follows the scroll (it occupies the left margin you need for marginalia) · "5 min read ⏱" pills with emoji · autoplaying video adjacent to text · toast notifications · skeleton shimmer over paragraph placeholders (server-render the text; text is the cheapest thing on the page) · tooltips carrying content · a right-hand TOC on a 900-word piece · avatar-plus-name-plus-follow-button author blocks lifted from a social product · tabbed article sections · accordions hiding prose from search and from Cmd-F.

For each: the replacement is nearly always *typography and space*. A callout is an indented block with a 2px left rule and the same body size. An author credit is a line of 14px furniture-face text. A "key takeaway" is a pull-quote.

## States in this archetype

**Empty.** Two different problems. An empty *index* (no articles in this section yet) is a publishing state — say what will appear here and when, and link to what does exist; never an illustration of an empty box. An empty *reading queue* in a reader app is an onboarding state — it should offer sources (paste a URL, connect a newsletter address, install the extension) because an empty queue means the product has not been wired up yet, not that the user is done.

**Loading.** Text should never load. Server-render the article; the paragraph is 4KB and the hero image is 400KB. What you reserve space for is media: aspect-ratio boxes for every image and embed, so the first paint has the final geometry. Skeleton paragraph bars are actively harmful here — they are grey shapes at exactly the position and size the reader is about to look at, and they train the eye to start reading nothing.

**Error.** A 404 in editorial is a navigational failure of the *corpus*, so the recovery is a route back into it. Measured, Guardian's 404 does precisely this: statement in the headline face, one sentence of explanation, one button ("The Guardian homepage"), and giant outlined `Error 404` type as the only decoration — the brand voice survives the failure. What is wrong: an apologetic paragraph, a search box as the only affordance, or a cartoon.

**Paywall / gate.** The honest version of a state most editorial products have. Every's gate (measured) fades the article body under a modal that keeps the same serif and warm ground — the gate is part of the publication, not a Stripe-branded overlay. Show enough that the reader can judge the piece; never truncate mid-sentence with a gradient fade and no indication of length.

**Too much.** Long pieces need a spine: section anchors, a position indicator that maps *sections* rather than a percentage, and a stable "where am I" affordance. Stripe Press's left tick-ladder is the good version — each tick is a chapter, the current one is filled. A 3px accent progress bar pinned to the top of the viewport is the generic version and tells the reader nothing they cannot feel from the scrollbar.

## Motion budget

**The text never moves.** No fade-in-on-scroll, no per-paragraph reveal, no parallax on figures, no scroll-jacked sections. `craft/motion-craft.md` names section-fade-on-scroll as the #1 signature of a generated page; in editorial it is worse than elsewhere, because the reader's eye is already tracking moving text and a second motion source breaks the line.

What may animate: control affordances (share, save, theme toggle) at **120ms**; the settings popover and the mobile nav at **160–200ms** with `ease-out`; a highlight or annotation confirmation at **120ms** (this one is worth it — it is feedback on a destructive-feeling action). Image loads cross-fade at **200ms** *only* into a reserved box, never with a layout shift.

The frequency argument: a reader scrolls a long article a hundred times in one session. Anything that fires on scroll fires a hundred times. That is the same maths that gives `technical-productivity` its 120ms ceiling, arriving from the opposite direction.

`prefers-reduced-motion` removes all of it, including smooth-scroll on anchor jumps.

## Mobile

**This archetype is mobile-first in a way most are not** — the majority of long-form reading happens on a phone, and the desktop layout is the reduced one (it loses nothing but gains rails it does not strictly need).

**Do not scale the body down.** Measured: the Guardian ships **17/23.8 at 390px, identical to desktop** (370px column ≈ 34.4ch); Every drops only 20→18px (358px ≈ 33.1ch). The corpus found the same for docs — Stripe, Cloudflare and Clerk hold body size across 1440 and 390. What changes is the measure, and it changes by itself: 33–35ch is the mobile reading column, and it is fine, because the phone is held closer.

What actually adapts: rails collapse (sidenotes become inline expandable disclosures under the paragraph that cites them — do not drop them to the bottom of the page, they will never be read); the gutter lands at **16–28px** (every product measured, none ship 8 or 40); figures go edge-to-edge with the caption inset to the text gutter; the headline drops one step (Guardian 34→~28) while the body does not; controls go to 44px targets.

**One pattern worth stealing:** Stripe's docs, on a 390px viewport, ship a banner reading *"This page is optimized for wider screens. You might prefer the text version of this guide."* — an explicit linear-text alternative when the desktop layout is two-column. If your reading surface has a companion column (code, data, media), the phone version is a different document, and saying so beats squeezing.

## Copy register

The voice is the publication's, not the product's. Three rules: **the headline makes a claim**, the interface speaks in nouns rather than encouragement, and nothing in the chrome tries to be as interesting as the text.

- **"More than 2,000 flights have been cancelled after an air traffic control system failure."** (Guardian, measured) beats *"Travel chaos: what you need to know"* — the standfirst carries the fact, not a tease.
- **"Sign in to read for free."** (Every, measured) beats *"Unlock unlimited access to premium content!"* — states the transaction in five words, no exclamation, no "premium".
- **"Prior to v0.73.82, this function was named `@modal.web_endpoint`."** (Modal, cited in `references/developer-platforms.md`) beats *"This has been renamed."* — in editorial-technical writing, the version *is* the information.
- **"Sorry — we haven't been able to serve the page you asked for. You may have followed an outdated link, or have mistyped a URL."** (Guardian 404, measured) beats *"Oops! Something went wrong 😕"* — plain, specific about the likely cause, no cartoon apology.

Bylines are names, not handles. Dates are absolute and include the year (`Wed 9 Sep 2026 14.31 EDT`, measured) because articles are read years later. Kickers name a section, not a mood. And never write "read more" — write what more there is to read.

## The characteristic failure

**The Medium-skin.** A team decides the product needs "an editorial feel", installs `@tailwindcss/typography`, wraps the CMS output in `prose lg:prose-xl`, and ships. The result is recognisable at fifty paces and every one of its symptoms is a default that was never chosen:

- **The body is Inter at 18px/1.75 in a 65ch container** — a sans face drawn for UI labels, at documentation leading, in a book measure. Three defaults from three different design problems, none of them this one. Nothing measured in this file leads above 1.5 at 18px.
- **The body colour is `text-gray-600`/`#4B5563`.** It looks refined in a Figma frame and greys out over a full screen of continuous text. The references run `#111`–`#333`.
- **Everything is centred and symmetric.** Column centred, headline centred, byline centred under an avatar, empty margins on both sides — so when footnotes, figure credits or a position indicator arrive, there is nowhere to put them and they get dumped inline or at the bottom.
- **One family at three sizes.** No display cut, no furniture face, so the h2 is body-text-but-bolder and the caption is body-text-but-smaller-and-grey. The page has no typographic *colour*, which is the actual thing readers respond to and the actual reason the references pay for three faces.
- **Cards have leaked into the article.** A rounded, shadowed "Key takeaways" box; a bordered author card; a related-posts grid three paragraphs from the end. Radius above 12px on a text surface is the single strongest generated-UI tell (`system/3-tokens.md`), and it is strongest here because a page of prose contains nothing that should be a container.
- **Motion has been added because the page felt static.** Each section fades and slides on scroll; a 3px gradient progress bar rides the top; the hero image parallaxes. All of it fires while the reader's eye is tracking a line of text.
- **The chrome competes.** Floating share rail in the left margin, sticky subscribe bar at the bottom, "5 min read ⏱" pill, newsletter modal at 40% scroll. Four interruptions before the second section.
- **The one image is a stock hero at 21:9**, full-bleed, decorative, followed by no other images at all — because no one decided what images are *for* in this publication.

**Self-diagnosis, in order of severity.** Open the article at 1440 and check:

1. Measure the body column in `ch`. If it is above 70, you are shipping documentation geometry for a reading task.
2. Compute h1 ÷ body. If it is under 1.9, your hierarchy is carried by weight instead of scale, and the page will read as a blog template.
3. Count faces. One family means the reader has no cue to distinguish a caption from a claim.
4. Sample the body colour's contrast. Under 12:1 on the ground and you have chosen "refined" over "readable".
5. Scroll and watch for anything that moves other than the page.
6. Count elements between the first and last paragraph that have a `border-radius` or a `box-shadow`. The correct answer is zero.

**The root cause is always the same:** the team imitated the *look* of a reading surface — serif-ish, airy, centred — without making the one decision the look comes from, which is that a single body of text is the only thing on the page allowed to be at reading size. Every symptom above is another element promoted to compete with the prose.

## Signature decisions that fit here

1. **Citations become the second column.** At ≥1200px, every footnote renders as a sidenote in a 300–330px rail, vertically aligned to the sentence that cites it, in the mono/furniture face; below that width it collapses to an inline disclosure under its own paragraph. The reader never leaves the flow to check a source, and the note is never further from its claim than a glance. (Works in Progress ships exactly this.)
2. **A position ladder instead of a progress bar.** A left-edge column of ticks, one per section, filled up to the current position, each a jump target and each labelled on hover. It answers "how much is left" *and* "what is left", which a percentage cannot. (Stripe Press.)
3. **Three image scales, declared in the CMS.** `evidence` (at measure), `figure` (measure + 160px), `atmosphere` (full-bleed). The author picks a meaning; the system picks the geometry. This stops the usual drift where every image is full-bleed because full-bleed looks impressive.
4. **A kicker/headline/standfirst triad set in three different faces**, so a category label, a claim and a summary are distinguishable before they are read. Cheap, structural, and it survives being embedded in someone else's feed.
5. **Reader typographic settings persisted across the corpus** — size (3 steps), measure (2 steps), theme (light/sepia/dark) — stored per-reader, applied on the server so the first paint is already correct. Correct only for products people return to; a news site shipping a font-size menu is decoration.

## Sources

- `https://www.theguardian.com/business/2026/sep/09/baggage-reclaim-was-pandemonium-…` — Playwright-probed at 1440 and 390. Body 17/23.8 GuardianTextEgyptian at 620px (57.7ch), `mb: 12px`; h1 34/39.1 w500 `#8B0000`; h2 28/32.2 w500; figcaption 12/16 GuardianTextSans; tokens `--article-text #121212`, `--article-border #DCDCDC`, `--article-link-text #C70000`, `--caption-text #707070`. Mobile: 17/23.8 at 370px (34.4ch), 4-line drop cap. 404 page screenshotted.
- `https://www.nytimes.com/international/` — probed; 85 `--tpl-*` tokens: five font families (`cheltenham`, `imperial`, `franklin`, `karnak`, `karnak-cond`), weights 100–900, line-height tokens 1.0–1.5, size ramp 10→72px. Deck 14/19 `#5A5A5A` `+0.1px` at 291px; section label 11/20 w500 `+0.44px` sans. Article pages return a bot-block to headless Chromium, so no article-body numbers were taken from NYT.
- `https://docs.stripe.com/payments/quickstart` — screenshotted at 1440 and 390; two-column guide + code pane, and the 390px *"This page is optimized for wider screens… text version of this guide"* banner. Guide/reference type figures cited from `craft/typography.md` and `craft/space-and-layout.md` rather than re-derived.
- `https://every.to/chain-of-thought/the-moral-of-fable` — probed and screenshotted. Body 20/30 Signifier at 736px (61.3ch), `mb: 20px`; h1 48 w400; h2 30/37.5 w700; figcaption 12/18 system sans `#909090`; ground `#FDFAF7`. Mobile 18/27 at 358px (33.1ch). Sign-in gate observed.
- `https://pudding.cool/2025/03/language` — probed and screenshotted. Body 18/25.2 IBM Plex Sans **w300** at 576px (53.3ch), `#262626`; h3 28/39.2 w500; links `#E32064` underlined; `--border-radius: 2px`; `scrollHeight: 28,375px`.
- `https://www.are.na/editorial/on-ornamental-palms` and `https://www.are.na/are-na-team/are-na-blog` — probed and screenshotted. Editorial body 19.2/27.84 `areal` grotesque at 648px (57.6ch), `#333`; channel view 14.4/20.9 in grid cells — the two surfaces are different archetypes.
- `https://worksinprogress.co/issue/how-to-build-a-state/` — probed and screenshotted. Ground `#FFF7F4`; body 18/27 `Editor-Regular` at 728px (56.7ch) offset to x=395; h2 32/40 w400 `mb: 15px`; note rail 330px at x=40 set in `GT America Mono Light`.
- `https://press.stripe.com/scaling-people` — probed and screenshotted. Ivar Text 17/25.5 **w500** at 508px (49ch), `#DEE6FF` on `#201819`; square-bordered controls; left-edge chapter tick ladder.
- `https://en.wikipedia.org/wiki/Typography` — probed as a counter-example: 16/26 at 912px = **102.5ch** on a cool `#F8F9FA` ground. The measure a reading surface gets when nobody owns it.
- `https://readwise.io/read` — marketing surface probed only (Inter 16/24 on `#000`); the Reader app itself is behind auth, so its reading-mode numbers are not asserted here.
- Cross-referenced without re-deriving: `craft/typography.md` (line-height and measure tables, Stripe 16/26 vs 14/22, tracking on caps), `craft/space-and-layout.md` (content-width-by-task table, 16–28px mobile gutters), `craft/color.md` (warm-neutral hues, dark-mode weight compensation, APCA), `references/developer-platforms.md` (docs body sizes hold across breakpoints).
