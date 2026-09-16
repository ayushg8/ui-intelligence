# Craft — fast path

**Generated** by `tools/digest.mjs` from the files in `craft/` — do not edit; edit the source.

The highest-leverage rule from each craft file, plus its self-check. Open the full file only when a decision needs the measured detail behind a rule.

## Color systems for interfaces

`craft/color.md` · 2026-09 · full file ~24,073 tok · self-check: `node tools/digest.mjs --check-list craft/color.md`

1. **Build the neutral ramp first and make the screen work in grayscale.** 10–12 steps spaced by
   perceptual lightness. If the layout isn't legible and hierarchical with zero hue, color won't
   save it — it will only hide the problem.
2. **Never `#000` text, never `#fff` text.** Light mode text at L 0.24–0.29
   (measured: Radix `slate-12` `#1c2024` L 24.1 · Primer `#1f2328` L 25.4 · Mercury `#272735`
   L 27.9 · Linear `#282a2f` L 28.5). Dark mode text at L 0.94–0.97 (Linear `#f7f8f8` L 97.8 ·
   Primer `#f0f6fc` L 97.0 · Geist `#ededed` L 94.7 · Radix `slate-12` `#edeef0` L 94.9).
   Nobody ships `#000`. shadcn's default theme does — that is the tell.
   *Scope:* this is a rule about **emissive displays rendering antialiased type.** Pure black is
   correct on e-ink and any 1-bit or few-shade panel (L 0.26 gray dithers into mush on a reMarkable
   or a Kobo), in print, and under `prefers-contrast: more` / `forced-colors: active`, where
   `CanvasText` is the point. Ship the off-black as the default and let those media override it.
3. **Choose semantic colors by target lightness, not by hue name.** Every foreground status color
   in GitHub Primer's light theme lands in **L 49.5–56.5** and chroma falls wherever the sRGB gamut
   allows (0.117 for amber, 0.207 for purple). Mercury goes further: *seven* hue families share one
   lightness ladder to within 0.2 L. Naive `#f00 / #ff0 / #0f0` sit at L 62.8 / 96.8 / 86.6 — which
   is why traffic-light palettes look broken.
4. **One accent, split into at least two roles.** A *fill* value at L 0.54–0.58 (so white text
   passes on it) and a *text* value that changes per theme (plus `fill-hover` and a `wash` — four
   tokens in a finished system; see §4). Measured: Primer's fill moves +2.9 L
   from light to dark while its foreground moves +12.3 L. Allowed uses of the accent, exhaustively:
   primary action, current selection, focus ring, link, one live indicator.
   *Scope:* one accent **per context**, not per product. Identity color is a separate budget:
   per-workspace theming (which Slack is), multiplayer cursors and avatars, per-tenant white-label
   surfaces, and a paid-tier CTA that must not read as the same action as the primary button are
   all legitimate second chromatic channels. What is never legitimate is a second accent that
   encodes nothing.
5. **Dark mode is not an inversion.** Elevation is lightness (+3 to +5 L per step, roughly 2× the
   light-mode step size). Borders carry the structural load — Linear's dark borders sit +12.6 to
   +22.7 L above the page while its light borders sit only −6.8 to −10.7 L below it. Text-role
   accents gain +10 to +24 L; fill-role accents stay put. Chroma barely moves in either.

---

---

## Copy and voice

`craft/copy-and-voice.md` · 2026-09 · full file ~37,445 tok · self-check: `node tools/digest.mjs --check-list craft/copy-and-voice.md`

1. **Make every button label the verb phrase of what happens, in sentence case, 1–3 words.** Across 281 unique interactive labels I harvested from 20 shipped products, the median label is **12 characters**, 66% are one or two words, and among multi-word labels **76% are sentence case** ("Get started", "Contact sales", "Start a free trial") against 20% Title Case and 3% uppercase. `Submit`, `OK`, `Confirm`, `Click here` and `Learn more` are not in the top of that distribution for a reason: they describe the widget, not the outcome. If the dialog says "Delete project?", the button says **Delete project**, not **Confirm**. The in-product corpus agrees and tightens it: across 10,379 unique short labels in four shipped apps, the median label is **11–15 characters**, the mean is **1.96–2.37 words**, and `Submit` appears **exactly once in each of the four products** — one legacy form apiece.
2. **Write errors as three facts in one or two sentences: what happened, why, what to do next.** Reuse the field's own words. GOV.UK's error-message guidance — the most user-tested error copy in existence — bans `please` (implies a choice), `sorry` (does not help), `valid`/`invalid` (adds nothing), and `oops`, and bans generic strings like `An error occurred`, `This field is required`, and `Fill in the field`. If your label is "How many hours do you work a week?", the error is "Enter how many hours you work a week."
3. **Delete the success message.** If the UI already shows the new state — the row appeared, the toggle moved, the badge changed — a toast saying "Success! Your changes have been saved." adds a dismissal task and nothing else. Keep confirmation only where the result is invisible (an email sent, a background job queued, an irreversible action taken) or where the user needs an undo handle.
4. **Never let a number, date or currency reach the screen as a raw string.** Use `Intl`. `Intl.NumberFormat('en-US',{notation:'compact'}).format(12500)` returns `13K` — it rounds by default and silently lies about your metric unless you set `maximumFractionDigits: 1` (`12.5K`). `de-DE` renders that same value as `12.500`, not `12,5 Tsd.` And `03/09/2026` means 3 September in London and 9 March in New York; one shipped fintech page I measured renders `09/03/26` with no month name anywhere on the page.
5. **Run the tell list before you ship a single string.** Across **20,282 words** of live homepage copy from 19 top products, the phrases `powerful yet simple`, `take it to the next level` and `delve` appear **zero times**, the sparkle and rocket emoji appear **zero times**, `revolutionize`, `elevate`, `harness`, `robust` and `cutting-edge` appear **once each in 20,000 words**, and em dashes run at **2.4 per 1,000 words** with five of the nineteen sites using none at all. Those frequencies are the empirical bar. A draft that uses `unlock` twice on one page is already an outlier against every product in the sample. **In-product strings are stricter still:** across 140,068 words of shipped UI copy, em dashes run at **0.0–0.5 per 1,000 words** (five times below the marketing rate) and emoji appear **twice in 24,899 strings**. **Re-measure the tell list; do not memorise it.** On a 2026-09 re-scrape, `delve` and ✨ are still zero — which makes them dead detectors that give false confidence — while `agentic` appears on **4 of 8** re-measured homepages and `AI-powered` on 3, above every classic tell in the table. **And the detector set is now anti-correlated with the thing it detects:** v0.app and bolt.new, the two products most responsible for generated UI copy, score a perfect zero on every punctuation and emoji check in this file while shipping `Everything you need to scale Built in.` and `Agentic by default`. See §7a, §7b and drill three. The only check that cannot be gamed is the structural one: swap a competitor's name into the sentence and see if it still reads.

---

---

## Information density and hierarchy

`craft/density-and-hierarchy.md` · 2026-09 · full file ~12,924 tok · self-check: `node tools/digest.mjs --check-list craft/density-and-hierarchy.md`

1. **Compute the fold before you write CSS.** `rows_visible = (viewport_height − chrome_above_first_row) / row_height`.
   Write the target in a comment: `/* density-target: work · 32px rows · ≥15 visible @1440×900 */`.
   **Scope: this test applies when N can exceed ~20.** A surface whose N is structurally small — five
   environments, four invoices, eight team members — passes at 6 visible rows and fails if you chase
   15. Check N first, then the fold.
2. **Row height is set by the tallest control inside the row, not by the text.** Measured on
   shadcn `dashboard-01`: cells have `p-2` (8px), text is 14px/20, and the row is **53px** because
   one cell holds a 36px `<Button>` (36 + 8 + 8 + 1px border). Note the trap: the same row also
   holds **two 32px `<Input>`s and a 32px icon button**, so deleting only the 36px button gives 49px,
   not 37px. You reach 37px (20 + 16 + 1) only when *every* control is out. Enumerate all cells;
   fixing the tallest one just promotes the second-tallest.
3. **UI text is 14px. Once.** Measured: 14px/21 w400 is **434** of the text elements on a GitHub repo
   page — 4× the next bucket. Attio's product surface uses 14px/20 w500; Grafana 14px/22; Linear
   13px/19.5; Grist 13px. `text-base` (16px) is a *reading* size — Notion's document body is 16px/24
   in a 720px column, correct *for a document*. Drop to 14 once, then take every further gain from
   padding, not from shrinking type again.
4. **Hierarchy comes from position, then weight, then color. Size is fourth and decoration is not
   on the list.** Inside a GitHub file row, the filename, the commit message and the date are all
   14px/21 weight 400. The only difference is color: `#1F2328` (15.80:1) vs `#59636E` (6.11:1).
   Three ranks, one size, one weight, zero badges.
5. **One filled control per view, at the same height as its neighbors.** GitHub's green `Code`
   button is 32px, `0 12px`, radius 6px, weight **400** — identical geometry to the grey branch
   picker beside it. It wins by being the only saturated thing on screen. `Star`/`Fork`/`Notifications`
   are *smaller* (28px, 12px/20 w500). Bigger is not more primary. **Scope: one fill assumes one
   intended action.** On a surface whose whole job is a repeated binary decision, two fills are
   correct — see *Two primaries* below.

---

---

## Form and input craft

`craft/forms-craft.md` · 2026-09 · full file ~24,293 tok · self-check: `node tools/digest.mjs --check-list craft/forms-craft.md`

1. **One column. No exceptions except a genuinely paired field.** Stripe Checkout puts every field in a 378px single column — email, name, country, address, card — and splits horizontally exactly once, for expiry/CVC (173px + 173px). Ramp splits exactly once, for first/last name (290px + 290px). GOV.UK splits exactly once, for Day/Month/Year. If you cannot name the *pair*, do not split.
2. **Size every field to its content — selects included.** GOV.UK ships six fixed widths and uses them (re-measured 2026-09): 2 chars = **52.25px**, 3 = **71.25px**, 4 = **85.5px**, 5 = **104.5px**, 10 = **218.5px**, 20 = **389.5px**. A UK postcode field is 104.5px wide next to a 748px address line; their `Sort by` select is **218.5px** and their `Choose location` select **247px** — each sized to its own longest option, neither full width. The generated version makes all of them `w-full`, and that is the loudest single tell that no human laid out the form.
3. **Label above the field, 4–12px away, always visible.** Measured across the whole sample: Atlassian 4px, Stripe Checkout 4px, GOV.UK 5px, Linear 8px, Stripe Dashboard 9px, Mercury 12px. The gap scales with the label's size, and it is always far smaller than the gap between one field group and the next (GOV.UK: 5px inside a group, 30px between them — a 6:1 ratio). Nobody in this sample floats a label into the box. Placeholders are format examples (`1234 1234 1234 1234`, `MM / YY`, `For example, 27 3 2007`), never names.
4. **Do not validate on blur. Validate on submit.** GOV.UK's shipped guidance is literal: *"Do not validate when the user moves away from a field. Wait until they try to move to the next part of the service."* Measured on Stripe Checkout: typing a malformed email produced no error while the field was focused. The one legitimate live check is a hard limit you want to stop before it's wasted — GOV.UK's character count is their named exception.
5. **Set `autocomplete`, `inputmode`, and `type` on every field that holds the signed-in user's own data.** Stripe Checkout's ZIP field carries `autocomplete="shipping postal-code"` **and** `inputmode="numeric"` **and** a `--tabularnums` class. Nobody at that level ships a bare `<input type="text">`. The scope matters: `autocomplete` tokens mean *"this is the browser owner's name/address/card"*. On a field holding a **third party's** data (a payee, a patient, a lead) or on a **shared device**, the same token fills the operator's details into someone else's record — Stripe's own phone country-code `<select>` carries `autocomplete="never-autocomplete-country-code"`, a deliberately invalid token, for exactly this reason. Ask whose data the field holds; that answer decides the attribute.

---

---

## Internationalization, RTL and global interfaces

`craft/i18n-rtl-and-global.md` · 2026-09 · full file ~20,415 tok · self-check: `node tools/digest.mjs --check-list craft/i18n-rtl-and-global.md`

1. **Size every text container for 1.8× the English pixel width, not 1.3×.** The median German UI string is 1.29× the rendered width of its English source, but the p90 is 1.78× and the p90 for strings under 10 characters is **2.16×**. Russian p90 is 2.03×, and 2.41× for short strings. Buttons, tabs, table headers and nav labels are exactly the short strings, so the median is the wrong number to design against. A 96px "Save" button needs to survive "Speichern" at 2.16× before it is safe.
2. **Never build a sentence from string fragments. Emit one ICU message per sentence.** `t('deleted') + ' ' + n + ' ' + t('items')` cannot be translated into Russian (four plural forms, and 21 takes `one` while 22 takes `few`), Arabic (six forms, and `Intl.DurationFormat('ar')` renders 2 hours as **ساعتان** — the number vanishes into a dual noun), or Polish. Write `{count, plural, one {...} few {...} many {...} other {...}}` and let the library pick.
3. **Write CSS in logical properties and you get ~90% of RTL for free.** Apple ships apple.com and apple.com/ae-ar/ from the same stylesheets: I counted **409 logical vs 23 physical** direction-bearing declarations on the English page and **419 vs 23** on the Arabic one — one codebase, `dir="rtl"` on `<html>`, done. IKEA, at 78% logical, has to serve a *different* CSS bundle to `/sa/ar/`. `padding-inline`, `margin-inline`, `inset-inline-start`, `border-start-start-radius`, `text-align: start`, `margin-inline-start: auto`. The residual 10% is three things: **`scrollLeft` runs 0 → −N in RTL** so every carousel is inert (§9), shadows and gradients stay physical, and `translateX` keyframes slide from the wrong side.
4. **Wrap every interpolated value — the whole value, never a fragment — in `<bdi>`.** Measured: `Sent by עמית 5 minutes ago` in an LTR container renders visually as **"Sent by 5 תימע minutes ago"** — the digit teleports past the name. `<bdi>` around the name fixes it. But `<bdi>` around *part* of a mixed token makes it worse: `Uploaded <bdi>تقرير.pdf</bdi> (2 MB)` renders the filename as **`pdf.ريرقت`**. Isolate at the interpolation boundary; never inside a value.
5. **Use `Intl` for every number, date, currency and list, and never a hand-rolled format string.** `Intl.NumberFormat('hi-IN').format(1234567.89)` is **`12,34,567.89`** — lakh grouping, not a separator swap. `new Intl.DateTimeFormat('th-TH').format(today)` returns **`9/9/69`** because Thailand defaults to the Buddhist era; `fa-IR` returns **`۱۴۰۵/۶/۱۸`** on the Solar Hijri calendar. `zh-CN` puts the timezone *before* the clock. Any of these hardcoded is a bug you will not see until a user reports it. The scope: `Intl` gives you the *domestic* convention, which is not always the one your product wants — `dateStyle:'short'` in `th-TH` is `9/9/69`, a two-digit Buddhist year that every non-Thai reader parses as 1969. Cross-border surfaces pin `{calendar:'gregory'}` and never use `dateStyle:'short'`. `Intl` also kills the lists you were about to hardcode: `new Intl.Locale(t).getTextInfo().direction` replaces your RTL-locale array, `new Intl.DisplayNames([t],{type:'language'}).of(t)` gives the **autonym** your language switcher needs (`Deutsch`, not `German`), and `getCalendars()` tells you `ja` wants a Japanese-imperial option (§10).

---

---

## Imagery, illustration and visual assets

`craft/imagery-and-illustration.md` · 2026-09 · full file ~19,665 tok · self-check: `node tools/digest.mjs --check-list craft/imagery-and-illustration.md`

1. **Pick two aspect ratios for the whole product and enforce them with `aspect-ratio` on the wrapper, not on the image.** Airbnb's Paris search page renders every photograph at `1.000` or `1.333` while the host uploads arrive at 720×480, 720×540 and **720×1080**. A portrait and a landscape land in the identical 307×230 box because the wrapper carries `aspect-ratio: 4/3` and the `<img>` carries `object-fit: cover`. Slack ships eight ratios with more than one instance each, 24 distinct in total. Two ratios is a system; eight is an accident. **Scope:** a centre `cover` crop is safe when the subject is an environment and destructive when it is a framed human or a vertical video — see *When this advice is wrong*.

2. **A real screenshot of your own product beats every abstract graphic, and the thing that makes it real is the data in it.** Basecamp's hero is one product screenshot containing named people (Geoff Collier, Leah Bernstein, Kurt Holloway, Liza Randall), a file list reading `Hero Image.png · Jul 20 · 1.86 MB` and `FAQ Entries.md · Jul 20 · 27.9 KB`, a July 2026 calendar with real events, and three external links pointing at actual Figma/Drive/Zoom URLs. Linear's hero is issue `DRV-8852` with the body text *"Render UI before `vehicle_state` sync when minimum required state is present, instead of blocking on full refresh during iOS startup."* Neither page has a single abstract shape on the fold. Lorem, `John Doe`, `$1,234.56` and `Project Alpha` destroy this in one pass.

3. **Ship AVIF, and know what it buys you.** Same Airbnb listing photo at 720px, negotiated by `Accept` on their live CDN: **AVIF 12,455 B · WebP 20,232 B · JPEG 29,997 B**. Same Linear hero screenshot at 1440px: **AVIF 5,345 B · WebP 9,074 B · PNG 69,561 B — 13× smaller than the PNG.** Photographs gain ~2.4× over JPEG; flat UI screenshots gain an order of magnitude over PNG. Slack still ships **6,823 KB of images with zero WebP and zero AVIF** (PNG 3,441 KB + JPEG 3,379 KB, re-confirmed 2026-09-10). It is not their biggest asset problem: the same page pulls **20 distinct autoplay videos, 44 MB unique** — 6.5× the image payload. On any page that autoplays, audit video before images.

4. **`srcset` without `sizes` is worse than neither.** Slack sets `srcset` on **71 images and `sizes` on zero**, so the browser assumes `100vw` and downloads the widest candidate for a 300px slot. Their G2 badges arrive at 868px natural for a 104px box — 4.17× oversupply even at 2× DPR. Stripe's four customer photographs each carry **seven candidates** plus `sizes="(min-width: 1298px) 1232px, (min-width: 640px) calc(100vw - 64px), calc(100vw - 32px)"` — re-counted 2026-09-10. Mailchimp sets `sizes` on 68 of 82 images and is the most disciplined page in this sample. If you cannot write a correct `sizes`, use a fixed-width CDN param instead — Airbnb just appends `?im_w=720` and ships no `srcset` at all.

5. **Decorative images take `alt=""`; content images take a sentence.** Stripe's homepage carries 52 `<img>`: **47 are `alt=""`**, and the five that aren't are the four documentary photographs plus a book cover, each with a full sentence — *"Aerial view of a street intersection where the crosswalks form a slanted parallelogram…"*. Apple: 73 empty, 37 descriptive. **This majority-empty shape is a *marketing-page* shape.** On a catalogue, a photo gallery, a docs page whose screenshots carry the instruction, or any clinical or scientific surface the ratio inverts and near-100% descriptive is correct. The test is never the ratio; it is whether the image carries information the adjacent text does not.

---

---

## Interaction, states and feedback

`craft/interaction-and-states.md` · 2026-09 · full file ~21,431 tok · self-check: `node tools/digest.mjs --check-list craft/interaction-and-states.md`

1. **Nothing moves on hover. Ever.** Change `background-color`, `color`, `border-color`, or the
   opacity of a pseudo-element overlay. Never `transform`, `scale`, `translate`, `padding`,
   `width`, `height`, `font-size`, `margin`, or `border-width`. If you want the pointer to feel
   responsive, make the color change *faster*, not bigger.
2. **Size the hover delta to how many of the thing there are.** A row in a 200-row list gets a
   3–8% overlay (GitHub: white → `#f6f8fa`, a 1.065:1 step). A one-per-page CTA can take a 1.4:1
   step (GOV.UK `#0f7a52` → `#0b5c3e` = 1.50:1; Notion's marketing CTA `#0075de` → `#005bab` =
   1.49:1 — two different houses, same number). Using the CTA delta on list rows makes lists
   strobe; using the row delta on a CTA makes it feel dead. **Then set `:active` to 1.5–2× the
   hover overlay** (Radix `gray-a3` 5.9% → `gray-a4` 9.0%; Notion 5.1% → 10.2%). A hover with no
   `:active` is why generated buttons feel like nothing happened when you click them.
3. **Hover transitions are 0–150ms, they name their properties, and they live in the `:hover`
   block — not the base rule.** Putting them on the base rule forces one symmetric duration;
   every product measured here is asymmetric (Linear fades in at `0s` and out at `150ms`; Notion
   does the exact opposite). Atlassian ships `--ds-listitem-hovered: 50ms` and
   `--ds-button-hovered: 150ms` as separate tokens; Radix's card hover is **40ms**. 300ms is wrong
   everywhere.
4. **Focus-visible is a 2px ring with a 2px page-background gap, and it is never removed.** Three
   independent teams converged on exactly 2px/2px — Vercel Geist
   (`box-shadow: 0 0 0 2px var(--ds-background-100), 0 0 0 4px var(--ds-focus-color)`), Radix
   (`outline: 2px solid var(--focus-8); outline-offset: 2px`), and Notion
   (`--tatami-dimension-interaction-focus-ring-outline-{width,offset}: .125rem`). The gap is what
   makes the ring legible on any surface — not the ring color.
5. **Undo beats confirm; a spinner under ~300ms is worse than nothing.** Do the action, show a
   toast with Undo (10s, not Sonner's 4s default). And if the request usually finishes in 120ms,
   render nothing — a spinner that flashes for two frames reads as a bug.

---

---

## Motion craft

`craft/motion-craft.md` · 2026-09 · full file ~12,780 tok · self-check: `node tools/digest.mjs --check-list craft/motion-craft.md`

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

---

## Navigation and information architecture

`craft/navigation-and-ia.md` · 2026-09 · full file ~20,233 tok · self-check: `node tools/digest.mjs --check-list craft/navigation-and-ia.md`

1. **Name your product's top-level nouns before you draw any nav.** Write the list of things a user
   creates, owns or watches in this product — the objects, in the words your users say out loud.
   That list *is* your top-level nav. If it comes out as Dashboard / Analytics / Settings, you have
   not done the exercise; those are not nouns in anyone's product, they are furniture.
2. **Sidebar rows are 28–39px tall with a 4–8px radius, inset 8–12px from the rail edge.** Measured:
   PostHog 28, Grafana 32, Vercel 36, Discourse 36.8, Sentry 38.8. The rail is 240–320px, mode 280.
   Never 44px *rows* — that is a touch minimum and it makes a pointer-driven 30-item list feel like a
   phone app on a monitor. (44 is fine as a rail *width*: VS Code's icon rail is 44 wide with 36×36
   targets.)
3. **Nothing moves on hover, and hover is usually instant.** Measured hover deltas: Grafana changes
   *only* text alpha (0.65 → 1.0) with `transition: all 0s`; Vercel adds a `#f2f2f2` fill and darkens
   text; Discourse fills with 15%-alpha brand purple. Zero of the three shift, scale, or add a
   border. Two of the three animate nothing at all.
4. **The active item gets exactly two signals, and one of them is not a border.** Measured pairs:
   Grafana = 2px `#FA7339` bar at the rail's left edge + `rgb(46,48,54)` fill (a ~9% white lift over
   the `rgb(24,27,31)` ground). Stripe = accent color `#5469d4` + weight 700, **no fill at all**.
   Sentry = solid `#6a5fc1` fill + white text. Discourse = `#f2f3f3` fill + weight 600. Pick two.
   Three signals is shouting; one is missable when the user tabs back into the window.
5. **Put the state that identifies the view into the URL, and put a stable id in the path.**
   Grafana ships `/d/to6j8mh/grafana-play-home?from=now-6h&to=now&timezone=utc` — opaque id, human
   slug that can change freely, and a *relative* time range so the shared link still means "last six
   hours" next Tuesday. Discourse ships `/c/news-and-events/207` — slug plus numeric id, so renaming
   the category never breaks a link. If your filters, tab, sort and selection live only in React
   state, your product has no shareable state and no working back button.

---

---

## Performance and perceived speed

`craft/performance-and-perceived-speed.md` · 2026-09 · full file ~18,083 tok · self-check: `node tools/digest.mjs --check-list craft/performance-and-perceived-speed.md`

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

---

## Responsive design and mobile web craft

`craft/responsive-and-mobile-web.md` · 2026-09 · full file ~19,624 tok · self-check: `node tools/digest.mjs --check-list craft/responsive-and-mobile-web.md`

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

---

## Space, layout, grid and rhythm

`craft/space-and-layout.md` · 2026-09 · full file ~12,137 tok · self-check: `node tools/digest.mjs --check-list craft/space-and-layout.md`

1. **Ship a 4px-based ramp of nine values and never write an off-ramp number.**
   `4 8 12 16 24 32 48 64 96`. Every serious system measured is 4px-granular in practice, including the
   ones that call themselves 8px systems. On Attio's marketing page the four most common flex gaps are
   **6px (217×), 8px (188×), 4px (183×), 10px (183×)** — sub-8 values outrank everything else.
2. **Space below a heading = 1× its font-size. Space above = 2×.** Supabase docs implement this
   literally: H2 at 22px gets **44 above / 22 below**; H3 at 18px gets **36 above / 18 below**. Stripe's
   API reference runs 4.1:1 (33 above / 8 below) on parameter rows. A heading equidistant between two
   blocks belongs to neither.
3. **Default to no container.** Escalate one rung only when the rung above fails: nothing → space → a
   1px rule → a background shift → a border → a card. Carbon's spacing page ships **0 card-like
   surfaces and 0px radius**, separating regions with background shifts alone. GitHub's `vercel/next.js`
   page carries **no nested content cards** and gives its entire About sidebar no container at all.
4. **Pick the content width from the reading task, not from a grid.** Measured: 45ch (Stripe marketing,
   18px), 55ch (Ramp), 72–86ch (react.dev, Tailwind, Supabase, GitHub README, Atlassian). Stripe alone
   runs 47ch at 16px on a guide and 58ch at 14px on the API reference — two widths *and* two body sizes
   in one product.
5. **Sidebar rows are 28–36px, not 44px — above ~12 items, on a pointer.** Measured: Linear
   `--sidebar-width: 244px`, Carbon 32px rows, Primer 36px, shadcn 32px with a **4px** gap, Grafana 32px,
   Stripe 28px. 44px is a *touch* minimum. Below ~8 nav items the density argument earns nothing; size
   the row off its type instead.

---

---

## Tables, dashboards and data presentation

`craft/tables-dashboards-data.md` · 2026-09 · full file ~21,901 tok · self-check: `node tools/digest.mjs --check-list craft/tables-dashboards-data.md`

1. **Right-align every number, set `font-variant-numeric: tabular-nums` on the table root, and left-align
   every string.** Not "usually." Always. Yahoo Finance, Vercel docs and Linear all set `tabular-nums`
   at the container, not per-cell. Dates go right if they're sortable timestamps in a fixed format,
   left if they're prose ("2 days ago"). Headers inherit their column's alignment — a right-aligned
   number column gets a right-aligned header. **And check the font can do it:** measured, `tabular-nums`
   is a no-op in Roboto/IBM Plex/Open Sans/Lato/Helvetica/Verdana (already uniform) and is *ignored*
   by DM Sans, Poppins and Georgia, which have no `tnum` feature and drift 35–42px per 8-digit column
   regardless. In those three, the only fix is a different font for numeric cells.
2. **One horizontal 1px rule at ~8–12% black, no vertical rules, no zebra, no outer box.** Measured
   band: 1.19–1.36:1 contrast. Vertical column borders appeared in exactly **zero** of the nine tables
   measured. Zebra appeared in exactly one — MDN, at `#f7f7f8` vs `#fff` (1.07:1) — and MDN runs it
   **on top of** a `#c3c7cb` cell rule at **1.70:1**, darker than any rule in the band above. That is
   the documented exception, not a contradiction: see *Zebra striping* for when two systems are correct.
3. **Pick the row height from the reading task, not from a token.** Measured: 22.8px
   (Baseball-Reference, 11px Verdana — the density ceiling), 32px (Plausible's scannable ranked list),
   40px (Yahoo Finance, Linear issue rows), 42px (AG Grid at 100k rows), 44px (Radix), 48px (Vercel
   docs), 52px (MUI DataGrid), 63–79px (GitHub's two-line rows). The generic
   answer — 48–56px because that's the "touch target" — is wrong for anything a person reads 200 rows
   of on a laptop.
4. **A number with no comparison is decoration. Ship the delta or don't ship the tile.** Plausible's
   tiles are label / value / delta-vs-previous-period, and clicking a tile *changes the chart below
   it*. Grafana's "Running pods 92" has no baseline and teaches the viewer nothing. If you cannot
   name the comparison, the metric does not belong on the dashboard.
5. **Gridlines are the text color at 10–15% opacity, in one direction only, the axis line is not
   darker than the gridlines, and no default library palette survives.** Observable Plot ships
   `rgb(60,60,67)` at `stroke-opacity: 0.1` (1.18:1), horizontal only. Recharts ships `#d6d3d1` dashed in *both* directions plus an axis line
   and tick marks at `#52525b` — **7.73:1**, as dark as body text. That single default is the loudest
   tell in an AI-generated chart. And replace the series palette: shadcn's `--chart-1..5` — the one
   you inherit in 2026 — is a **single-hue blue ramp** whose adjacent series sit 1.30–1.37:1 apart;
   Nivo's five defaults are **all five** below 3:1 against white. Our World in Data's six run 4.54:1
   to 10.79:1 against the background, which is the floor to aim at.

---

---

## Typography for interfaces

`craft/typography.md` · 2026-09 · full file ~18,128 tok · self-check: `node tools/digest.mjs --check-list craft/typography.md`

1. **Ship `(size, line-height, weight, role)` as one token, never a bare size.** Vercel's Geist
   uses `16px` in four roles with three different line-heights: `copy-16` is 16/24 w400,
   `label-16` is 16/20 w400, `heading-16` is 16/24 w600 at `-0.02em`, `button-16` is 16/20 w500.
   A "type scale" that is a list of sizes is not a type scale.
2. **Two body sizes, chosen by task, not one.** One for reading (15–16px, line-height 1.5–1.7),
   one for scanning (13–14px, line-height 1.4–1.45). Stripe runs 16/26 prose and a 13px dense
   layer on the same page — 1,248 elements on their quickstart compute to 13px and 128 to 16px.
3. **Never leave `line-height: normal` on anything you control.** Measured per 100px of font-size,
   the natural line box is 121 in Inter, 118 in SF Pro, 115 in Arial/Roboto/Segoe UI, 114 in
   Georgia, 122 in Verdana. Swapping the font silently changes every row height by up to 7%.
4. **`font-variant-numeric: tabular-nums` on numbers that stack in a column or update in place.**
   Measured in Inter: ten `1`s are 362.31px where ten `0`s are 613.28px — the `1` is **41%
   narrower**, so nothing in a right-aligned money column lines up until you say otherwise, and a
   counter reflows on every tick. **Not** on a lone display number with no alignment partner and no
   updates — it costs width for nothing (see the width budget under *Numerals*).
5. **Three neutral text levels, and the third lands between 4.5:1 and 8:1.** Measured today:
   Vercel 17.2 / 8.1 / 5.5, Atlassian 14.3 / 7.8 / 5.1, Primer 15.8 / 6.1, Radix 16.4 / 5.9,
   Resend 15.3 / 10.7 / 8.2 / 5.0, Linear (dark) 18.7 / 13.6 / 6.1. No product here ships a fourth
   *content* level. If you want a fourth distinction, change size or weight.

---

---
