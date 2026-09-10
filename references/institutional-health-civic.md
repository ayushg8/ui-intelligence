# Institutional, healthcare, civic and high-stakes interfaces

**Evaluated:** 2026-09

## What this archetype is for

Interfaces where the user did not choose to be here, cannot leave for a competitor, may be frightened or ill or broke while using it, and where a misunderstanding costs them a benefit, a diagnosis, a flight, or a filing deadline. That covers government transactional services (GOV.UK, IRS Direct File, Login.gov, Canada.ca), public health information and clinical software (NHS.UK, Nord/Nordhealth, Epic), benefits and insurance eligibility (HealthCare.gov, VA.gov, Oscar), care logistics (Zocdoc, One Medical), regulated telehealth intake (Hims, Ro), and operational status products where the truth is time-critical (Flighty, airline ops). It does **not** cover consumer health marketing pages, hospital brochure sites, or a "wellness" app that logs steps — those are consumer products wearing scrubs. The distinguishing test: **if the user's own competence is not a precondition of success — if the interface has to work for someone at 3am on a cracked Android with 20% vision and a second language — you are in this archetype.**

## The reference set

| Product | Why it's here | The single thing to steal |
|---|---|---|
| **GOV.UK Design System** (govuk-frontend 6.5.0) | The most research-backed transactional form system in existence, and it publishes the reasoning | The focus state: `box-shadow: 0 -2px 0 #FFDD00, 0 4px 0 #0B0C0C` — a yellow *block* with a black underline, plus a transparent 3px outline that only appears in forced-colors mode |
| **NHS digital service manual** (nhsuk-frontend 10.6.1) | Clinical-safety-driven severity hierarchy, publicly documented | Urgent and Emergency care cards share the **same red** (`#d5281b`); the escalation is that the emergency card's *body* inverts to `#212b32` with white text |
| **USWDS v3.14.0** | The federal baseline; the spacing scale ties spacing tokens directly to breakpoint names | Five alert severities all use an 8px left bar on a pale tint — except `--emergency`, which is a solid `#9C3D10` fill. Only the top tier inverts. |
| **Nord Design System** (Nordhealth) | Clinical/veterinary software built for all-day workstation use; ships an `llms.txt` and raw markdown docs | `--n-font-features: 'tnum' 1, 'zero' 1` on body/data and `--n-font-feature-settings-heading: var(--n-font-features-reduced)` (`tnum 0, zero 0`) on headings — tabular figures and slashed zero for data, off for display |
| **VA.gov Design System** *(off-list)* | Patterns are named as user goals, not components, and each ships a research link and a "when not to use" | Pattern taxonomy `Ask users for… / Help users to…`, plus an explicit **Deprecated** shelf that currently contains "Wizard" |
| **GC Design System / Canada.ca** *(off-list)* | The only system I measured that solves genuine bilingual delivery | The 404 renders **both languages stacked on the same page** — "Page could not be found / Page introuvable" at identical size and weight, because you cannot know which language the broken URL was in |
| **CMS Design System** (HealthCare.gov, Medicare.gov) *(off-list)* | One system, four themes, and the most interesting focus-color decision I found | `--color-focus-dark: #bd13b8` — a magenta chosen precisely because it collides with no semantic color in the palette |
| **HealthCare.gov** | Eligibility disclosure done honestly | Splits "estimated prices … before you apply" from "log in to apply, get **final** prices" — a non-binding number with zero account, the binding number after identity |
| **Login.gov** *(off-list, observed live)* | Caught mid-maintenance on 2026-09; re-probed 2026-09-10 and it is back up, so the down page below is a dated capture, not a live claim | The down page was static HTML on `#112E51`, two sentences, one link to a status page, and **no retry button** that would only fail again. Live, the sign-in page ships a named escape (`Cancel sign in`) and suffixes every external link with a visible `(opens new tab)` |
| **Flighty** | Status as delta-from-plan, not status-as-label | Every state carries its magnitude and its cause: "5m Early · T3", "35m delay predicted due to late arriving aircraft" |
| **IRS (irs.gov)** | The US federal identifier band, and a 7-language footer | The first **25px** of every federal page (measured at 1440) is provenance — "An official website of the United States government / Here's how you know" at 14px — before any brand. The footer then lists 7 languages as plain links: Español, 中文 (简体), 中文 (繁體), 한국어, Русский, Tiếng Việt, Kreyòl ayisyen |
| **Epic** *(counter-example)* | The EHR clinicians live in 6 hours a day | Its 404 `h1` is **"Ope!" at 128px w600 in `#c62715`** over a cartoon cow — 4× the 30px `h1` on its own product pages — then "We've never *herd* of that link. Please keep 'er *moooo*vin' to another page." No search, no back link, no next step. Exactly what GOV.UK bans in writing. |
| **Zocdoc** *(counter-example / accidental good)* | Blocked my client, and the block page was better than most products' error pages | "Access is temporarily restricted" + a bulleted list of probable causes + a support ID (`0cdbdd42-005a-…`) + a feedback link. No status code, no jargon. |
| **Oscar / One Medical / Ro** | The consumer-warm pole of health | Oscar's h1 is 72px/70px at weight **400**; One Medical's body is 18px/31.5px at weight **200**. Marketing typography that would be malpractice inside the product. |

**How I found the off-list four.** From USWDS I followed *who extends it* — the federal agencies that fork the baseline and publish their own research. That surfaced **design.va.gov** (whose pattern names are goals, not components) and **design.cms.gov** (which powers HealthCare.gov and Medicare.gov under one themed system). From GOV.UK I followed the *international lineage* — the governments that copied the GDS model — looking specifically for one that had to solve a problem GDS never had. **Canada.ca / GC Design System** is that one: statutory bilingualism forces decisions (a 20px body, Noto Sans for orthographic coverage, a bilingual error page) that a monolingual system never confronts. **Login.gov** I did not go looking for; it happened to be in maintenance when I probed it, and a live down-page is more informative than any documented one.

**What I could not reach.** `directfile.irs.gov` refused headless traffic entirely; `irs.gov` served its 404 template to my client. `zocdoc.com` served a bot-block; `hims.com` served a Cloudflare interstitial. I have not attributed any in-product detail to Direct File, Zocdoc or Hims that I did not personally see.

---

## Measured specifics

All values read via Playwright at 1440×900 and 390×844, and re-probed 2026-09-10 by a second pass. Version-stamped where the system exposes it. Nothing here is recalled. Where the second pass disagreed with the first, the second pass wins and the note says so.

**Probe technique, so you can re-run this.** `page.goto(url)` → wait 2.5s → `page.evaluate` a function that reads `getComputedStyle` + `getBoundingClientRect` off named selectors, plus `getComputedStyle(document.documentElement).getPropertyValue('--token')` for the token set. For a type scale, inject a bare `<p class="…">` into `main`, measure, remove — that reads the *shipped* scale rather than whatever the demo page happens to use. Run the same script at 1440 and 390 and diff the two. Contrast is computed locally from the measured hex (WCAG 2.x relative luminance), never eyeballed.

### GOV.UK — the complete type scale, both breakpoints (govuk-frontend 6.5.0)

| Class | ≥641px | ≤640px (measured at 390) | Weight | margin-bottom (desk / mob) |
|---|---|---|---|---|
| `heading-xl` | **48 / 50** | 32 / 35 | 700 | 50 / 30 |
| `heading-l` | **36 / 40** | 27 / 30 | 700 | 30 / 20 |
| `heading-m` | 24 / 30 | 21 / 25 | 700 | 20 / 15 |
| `heading-s` | 19 / 25 | **19 / 25 — unchanged** | 700 | 20 / 15 |
| `body-l` | 24 / 30 | 21 / 25 | 400 | 30 / 20 |
| `body` | **19 / 25** | **19 / 25 — unchanged** | 400 | 20 / 15 |
| `body-s` | 16 / 20 | **16 / 20 — unchanged** | 400 | 20 / 15 |
| `caption-xl` | 27 / 30 | 21 / 25 | 400 | 5 / 5 |
| `caption-l` | 24 / 30 | 21 / 25 | 400 | 0 / 5 |
| `caption-m` | 19 / 25 | **19 / 25 — unchanged** | 400 | 19 / 19 |

Probed by injecting each class into the live page and stepping the viewport: the switch fires at **641px**, not 769px. An earlier pass of this file carried the pre-v5 mobile column (body 16, `body-s` 14, `heading-l` 24); that scale is gone in govuk-frontend 6.5.0 and the numbers above are what ships.

Four things worth internalising. **(1)** Line-height ratios tighten as size grows: 19/25 = 1.32, 36/40 = 1.11, 48/50 = **1.04**. **(2)** `margin-bottom` is a property of the type class, not a per-instance decision — pick a heading size and the vertical rhythm comes with it. **(3)** **Four of the ten classes do not change size at all between 1440 and 390** — `body`, `body-s`, `heading-s` and `caption-m` are fixed. Only the four display sizes shrink, by 25–33%. The 19px body is a floor, not a responsive variable, and the mobile "concession" is entirely in the headings. **(4)** The spacing scale underneath is `0 / 5 / 10 / 15 / 20 / 25 / 30 / 40 / 50 / 60`. That is a **5px** base, not 8px, in the most-used government design system on earth.

### GOV.UK — colour tokens as currently shipped, with measured contrast on white

```
--govuk-text-colour:            #0b0c0c   19.59:1
--govuk-secondary-text-colour:  #484949    9.03:1   ← the "muted" tier is still 9:1
--govuk-link-colour:            #1a65a6    6.08:1   (was #1d70b8 = 5.17:1 in v4)
--govuk-link-visited-colour:    #54319f    9.06:1
--govuk-link-hover-colour:      #0f385c
--govuk-error-colour:           #ca3535    5.16:1   (was #d4351c = 4.86:1 in v4)
--govuk-success-colour:         #0f7a52    5.35:1 white-on-fill
--govuk-focus-colour:           #ffdd00   14.55:1 against #0b0c0c focus text
--govuk-border-colour:          #cecece    1.57:1  (decorative only, never a text colour)
--govuk-input-border-colour:    #0b0c0c   ← inputs get a near-black 2px border
--govuk-template-background-colour: #f4f8fb
--govuk-brand-colour:           #1d70b8   ← the old v4 link blue, demoted to brand-only
```
25 `--govuk-*` custom properties on `:root` in 6.5.0, including a `--govuk-surface-{background,border,text}` trio and `--govuk-frontend-version`. That is the whole public token surface — no scale ramps, no 50→900 hues.

The v4→v6 drift is the tell: links went **darker** (5.17 → 6.08) and error red went **darker** (4.86 → 5.16). Nobody made those changes for aesthetics.

### GOV.UK — the error stack, measured on a real error page

| Element | Measured |
|---|---|
| `.govuk-error-summary` | `border: 5px solid #CA3535` on **all four sides**, `padding: 20px` (15px mobile), `margin-bottom: 50px` (30px mobile), width 630px, **no icon, no red fill** |
| `.govuk-error-summary__title` | "There is a problem" — 24/30 w700, colour `#0b0c0c` (**black, not red**), `margin-bottom: 20px` |
| `.govuk-error-summary__list a` | 19/25 **w700**, `#CA3535`, underlined, links to the field |
| `.govuk-form-group--error` | `border-left: 5px solid #CA3535`, `padding-left: 15px`, `margin-bottom: 30px`, **no background tint** |
| `.govuk-fieldset__legend` (as h1) | 36/40 w700 desktop, 27/30 mobile, `margin-bottom: 15px` |
| `.govuk-error-message` | 19/25 **w700** `#CA3535`, `margin-bottom: 15px`, prefixed by a visually-hidden `Error:` |
| errored `<input>` | `border: 2px solid #CA3535`, `border-radius: 0`, `padding: 5px`, height 40px |
| date sub-inputs | day 52px · month 52px · year 86px; **only the year input carried the red border** when the message was "must include a year" |
| `.govuk-button` | `#0F7A52` bg, 19/19 w400, `padding: 8px 10px 7px`, `border-radius: 0`, `box-shadow: 0 2px 0 #083D29`; **99px wide on desktop, 360px (full-bleed) on mobile**; hit height 40px including the shadow |
| focus (any link/button) | `box-shadow: 0 -2px 0 0 #FFDD00, 0 4px 0 0 #0B0C0C`, plus `outline: 3px solid transparent` |

Three things the token dump does not tell you, from looking at the rendered page at 390:
- **The error summary sits above the `h1`.** Page order is back link → error summary → `h1`/legend → inline error → inputs → button. The count of problems arrives before the question is even restated.
- **The 5px red left border wraps the whole question block, `h1` included** — it is `.govuk-form-group--error`, and the legend/`h1` is inside it. The red rule runs from the top of the heading to the bottom of the inputs. It is not an input-level marker.
- **Day / Month / Year are visible 19px labels above their boxes**, not placeholders. Nothing about the field is destroyed by typing into it.

### GOV.UK — task list and summary list

```
.govuk-task-list__item      padding: 10px 0     row height 46–47px, whole row clickable
.govuk-task-list__hint      19/25  #484949
.govuk-tag--blue            bg #D2E2F1  text #0F385C  padding 2px 8px 3px
                            border-radius: 1px  height 30px  font 19px w400  sentence case
```
That tag is **19px, weight 400, sentence case, 1px radius**. Not 11px uppercase bold in a pill. And the "Completed" state is *plain text with no tag at all* — only the outstanding rows get the visual weight.

### NHS — tokens (nhsuk-frontend 10.6.1)

```
--nhsuk-blue-colour        #005eb8    6.38:1     --nhsuk-text-colour        #212b32   14.42:1
--nhsuk-red-colour         #d5281b    5.06:1     --nhsuk-secondary-text     #4c6272    6.37:1
--nhsuk-green-colour       #007f3b               --nhsuk-focus-colour       #ffeb3b   11.81:1
--nhsuk-warm-yellow        #ffb81c               --nhsuk-pale-yellow        #fff9c4
--nhsuk-grey-1 … grey-5    #4c6272 #768692 #aeb7bd #d8dde0 #f0f4f5
--nhsuk-body-background    #f0f4f5   ← the page ground is grey; cards are white
--nhsuk-input-border-colour #4c6272  --nhsuk-link-hover-colour  #7c2855 (dark pink, not a blue tint)
```
Button colours are a full named ladder — `button / hover / active / **shadow**` for each of default, secondary, secondary-solid, reverse, warning and login. The `-shadow-colour` token exists because NHS buttons carry a 4px solid bottom edge that compresses on `:active`; the button is 56px tall with `padding: 12px 16px` and `border-radius: 4px`.

### NHS — the three-tier care card (the best alarm hierarchy I measured)

| Tier | Header bar | Card body | Screen-reader-only prefix |
|---|---|---|---|
| Non-urgent | `#005eb8` blue, white text | white, `#212b32` text | "Non-urgent advice:" |
| Urgent | `#d5281b` red, white text | white, `#212b32` text | "Urgent advice:" |
| **Emergency** | `#d5281b` — **the same red** | **`#212b32` with white text** | "Immediate action required:" |

Header container: `padding: 16px 32px 15px`, `h2` at 26/32 w600. Body: `padding: 32px`, list items 19/28. White on `#212b32` is 14.42:1.

**There is no severity icon** — no triangle, no exclamation mark, no emoji, and no colour-coded glyph. The visible heading is the instruction ("Call 999 or go to A&E now if:"), and the severity *word* ("Immediate action required:") exists only inside a `nhsuk-u-visually-hidden` span, wrapped in `role="text"` so a screen reader reads prefix and instruction as one utterance. The component does contain exactly two glyphs, and both are directional rather than semantic: a red triangular tail on the underside of the header pointing down into the body, and a 36px filled arrow-in-circle on the closing action link. Which is the detail an earlier pass missed and the one worth stealing — **the top-severity card ends with a next step inside the card**: "→ Find your nearest A&E", w700 white, part of the same dark surface. Naming the emergency and then leaving the user to find the exit is the failure this design closes.

### NHS — warning callout

```
.nhsuk-card--warning   bg #fff9c4   border 1px solid #ffeb3b   padding 0 32px 32px
  h3                   bg #ffeb3b   padding 8px 32px   26/32 w600   ← a yellow tab that
                                                                       overhangs the card edge
  p                    19/28  #212b32
```

### USWDS v3.14.0 — alerts and spacing

| Variant | Background | 8px left bar | Text |
|---|---|---|---|
| info | `#E7F6F8` | `#00BDE3` | `#1B1B1B` |
| warning | `#FAF3D1` | `#FFBE2E` | `#1B1B1B` |
| error | `#F4E3DB` | `#D54309` | `#1B1B1B` (13.83:1) |
| success | `#ECF3EC` | `#00A91C` | `#1B1B1B` |
| **emergency** | **`#9C3D10` solid** | same | **white (6.8:1)** |

`.usa-alert__body { padding: 16px 20px }`. Heading 21.28px w700 at line-height **19.15px (0.9)** — deliberately sub-1.0 so a one-line heading doesn't add leading. Body text 16.96/25.44. Two extra variants ship: **slim** (same 8px bar, vertical padding halved to `8px 20px`, icon 32 → 24px, no heading) and **no-icon**.

Two rules the table hides. **Alert text colour never changes with severity** — `#1B1B1B` on every tint, white only on the emergency fill. And **every standard variant does carry an icon**, contrary to the "icons are the tell" instinct: a 32px filled glyph rendered as a `::before` mask in the body's left gutter. The discipline is that the icons are *monochrome black* and *shape-differentiated* — `i` in a circle, triangle, check, exclamation — so the severity survives greyscale, and none of them is the only carrier. Icons are not the failure. Coloured icons doing the ranking alone are.

Spacing units (multiples of 8, with named large tokens):
```
1px  2px  0.5=4  1=8  1.5=12  2=16  2.5=20  3=24  4=32  5=40  6=48  7=56  8=64  9=72  10=80  15=120
'card'=160  'card-lg'=240  'mobile'=320  'mobile-lg'=480  'tablet'=640  'tablet-lg'=880
'desktop'=1024  'desktop-lg'=1200  'widescreen'=1400
```
The large tokens are named after breakpoints, so a card's max-width is literally the same token as the mobile breakpoint. Focus: `outline: 4px solid #2491FF; outline-offset: 0`.

### Nord Design System — the clinical-software token set

```
--n-font-size-xxs…xxxl   10 · 11 · 12 · 14 · 16 · 20 · 24 · 36 px      base = 14px
--n-font-weight          400   --active 500   --heading 600   --strong 670   ← not 700
--n-line-height          1.5   --heading 1.2   --caption 1.3   --tight 1.15   --form 20px
--n-space-xs…xxl         4 · 8 · 16 · 24 · 36 · 72
--n-border-radius        5px   --s 3px   --sharp 0.02em   --pill 999px
--n-transition-quickly   0.05s ease   --slowly 0.2s ease   --mobile 0.4s ease
--n-size-top-bar         52px
--n-font-features          'kern' 1,'tnum' 1,'calt' 1,'case' 1,'cv05' 1,'zero' 1,'cv08' 0,'ss03' 1
--n-font-features-reduced  'kern' 1,'tnum' 0,'calt' 1,'case' 1,'cv05' 1,'zero' 0,'cv08' 0,'ss03' 1
--n-font-feature-settings          var(--n-font-features)            ← body and data
--n-font-feature-settings-heading  var(--n-font-features-reduced)    ← headings
```
Semantic text ramp, measured on white: `--n-color-text #0c1a3d` (17.06:1) · `--text-weak #36434a` · `--text-weaker #667680` (4.7:1) · `--text-weakest #b2babf` (decorative only) · `--text-error #d24023` (4.67:1) · `--text-danger #b23015` · `--text-warning #946900` (4.91:1) · `--text-success #117627` · `--text-progress #016d83`.

**Correction from the re-probe.** An earlier pass claimed `--n-color-text-error` was a darker value than `--n-color-status-danger`. It is not — both resolve to `#d24023` (4.67:1). The split that actually exists is three-role, and it is better than the one I claimed: `--n-color-status-danger #d24023` (the fill / dot), `--n-color-text-danger #b23015` (6.31:1 — the darker one, for text sitting *on* the `-weak` wash), `--n-color-border-danger #fac7be` (a pale tint that is a border and nothing else). One hue, three jobs, three different values, none of them interchangeable.

Statuses come in tiers — `status-X` and `status-X-weak` (the wash), plus `border-X` — and there are **seven** paired ones: neutral, warning, highlight, danger, success, info, **progress**, with an eighth unpaired `--n-color-status-notification` for the count dot. "Progress" as a first-class status is a clinical-software decision: a lab result that is *pending* is not neutral and not a warning. 174 `--n-*` properties resolve on `:root`.

Nord's own docs, verbatim: *"Nord Design System uses functional coloring that supports products designed to be run on workstations. Color is used to communicate not to decorate… The color system facilitates all-day use while minimizing visual fatigue."* And: the brand typeface (Armin Grotesk) *"should not be used for application UIs where we use a typeface called Inter."*

### CMS Design System (HealthCare.gov / Medicare.gov themes)

```
--measure-narrow 45ex   --measure-base 65ex   --measure-wide 80ex     ← measure in ex, not ch
--field-max-width 460px   --field-max-width--small 6rem   --medium 12rem
--site-max-width 1104px   --site-margins 3rem / mobile 1.5rem
--spacer-half 4  --spacer-1…7  8 16 24 32 40 48 56
--radius-small 2  --default 3  --medium 4  --large 8  --pill 9999
--color-focus-dark #bd13b8   (5.32:1)   ← magenta, colliding with nothing else
--color-error #e31c3d   --error-lightest #fef5f7   --muted #5a5a5a (6.9:1)
--alert-bar__width var(--spacer-1)   --alert__padding var(--spacer-2)   --alert__icon-size 1.5rem
--font-weight-heading-4xl / -3xl = 400   (2xl, xl, lg, md, 5xl = 700)
--animation-speed-1…4  250 · 300 · 500 · 800ms
--choice__size 32px   --choice__size-radio 22px   --choice__border-width 2px
--choice__border-radius 0px     ← checkboxes are square-cornered 32px squares
```
Measured live on HealthCare.gov (re-probed 2026-09-10): h1 48/62.4 at **weight 400** in `#034866` (9.89:1); text input `border: 2px solid #262626`, `radius: 0`, `padding: 8px`; primary button `#12890E`, white w700, `padding: 8px 24px`, `radius: 3px`. `--color-focus-dark` resolves to **`#dd3603`** on this theme, not the core `#bd13b8` — the theme file overrides the magenta with the accent orange, and drops from 5.32:1 to **4.56:1** doing it. The magenta is the better decision and the shipping site does not use it.

The `Español` link is 16px **weight 700** in the top-right header at `top: 52px` — same weight as `Log in`, no dropdown, no globe icon. At 390 it is gone: it collapses into `Menu` along with everything else, which is the one place this page is worse than irs.gov, where the language control stays in the header at every width.

And the page is a **counter-example to the no-cards rule below**: the ZIP form sits in a white panel floating over a full-bleed photograph. It survives because the panel is doing contrast work against a photo, not decoration — square-ish corners, no shadow, no nested card, and the form inside it is still a labelled question above a bordered input.

### GC Design System (Canada.ca)

```
--gcds-font-text          400 1.25rem/160% "Noto Sans"     ← 20px body
--gcds-font-text-mobile   400 1.125rem/155%                ← 18px body
--gcds-font-text-small    400 1.125rem/155%  (mobile 1rem)
--gcds-font-h1  700 2.5625rem/117% Lato   (41px)   h1-mobile 2.3125rem (37px)
--gcds-font-h2  700 2.4375rem/123%        (39px)
--gcds-font-h3  700 1.8125rem/137%        (29px)
--gcds-font-h4  700 1.6875rem/133%        (27px)
--gcds-font-h5  700 1.5rem/133%           (24px)
--gcds-font-h6  700 1.375rem/145%         (22px)
--gcds-spacing-0…1250   0.125rem steps: 2 4 6 8 10 12 14 16 18 20 24 28 32 … 100px
--gcds-container-xs…xl  20 · 30 · 48 · 62 · 71.25 rem
--gcds-border-radius    sm 0.125rem · md 0.375rem · lg 3rem · xl 100%
--gcds-focus-background #1354ec   --gcds-focus-text #fff       ← focus is a filled block
--gcds-text-primary #333 (12.63:1)  --text-secondary #595959 (7.0:1)
--gcds-link-default #1f497a (9.16:1)  --link-visited #4b248f
```
Two observations you will not find elsewhere. **Body is 20px** — larger than GOV.UK's 19 and NHS's 19, and 25% larger than the 16px SaaS default. And **h1 (41px) and h2 (39px) are 2px apart**; the whole top of the heading scale is compressed, so hierarchy is carried by weight, position and the rule under the h1, not by size ratio. Every hue ships as a 19-step ramp in 50-increments (`blue-50` … `blue-900`) plus two off-ramp semantics (`blue-muted #26374a`, `blue-vivid #1354ec`).

### VA.gov Design System

Body `Source Sans Pro Web` 16/24 on `#f9f9f9`; content column 952px; h1 40/52 w700 `#1b1b1b`; h2 32/41.6. Top-nav items measure 16/24 **w700** with `padding: 16px 20px` → a **56px** hit box (an earlier pass recorded w500 / `10px 15px` / 44px; the re-probe does not reproduce it). Patterns are versioned with a `USE:` status badge (`DEPLOYED`, `CANDIDATE`, `DEPRECATED`) and every one links out to Research, Figma, Code and Open Issues.

Note that VA.gov runs a **16px** body where GOV.UK runs 19 and Canada.ca runs 20. Same archetype, same population, 25% apart. Nobody in this set has proven the other two wrong; what they agree on is the *contrast* floor, not the size.

### Contrast, measured across all six systems

| Role | Range observed | The generic default it beats |
|---|---|---|
| Body text | 12.6 – 19.6:1 | `#111827` on white ≈ 16:1 (fine) |
| **Secondary / "muted" text** | **4.7 – 9.1:1** | `text-gray-400 #9CA3AF` = **2.54:1** (fails), `gray-500 #6B7280` = 4.83:1 (marginal) |
| Error text | 4.67 – 5.16:1 | `red-500 #EF4444` = **3.76:1** (fails AA for body) |
| Link | 6.08 – 9.16:1 | `blue-500 #3B82F6` = **3.68:1** (fails) |
| Focus indicator | **3.20 – 14.55:1** | a 2px `blue-500` ring at 3.68:1 |

**The transferable number is the secondary tier: 4.7:1 is the floor, not 2.5:1.** Every one of these systems keeps its *named text* ramp above AA at body size. Tailwind's `gray-400` at 2.54:1 is a colour none of them would ship as text.

Two honest caveats, because the clean version of this claim is false:
- **Nord does ship a sub-2:1 grey.** `--n-color-text-weakest #b2babf` is **1.97:1** on white. The discipline is not that the value doesn't exist — it is that it is named as the end of the ramp and scoped to disabled/decorative use, so choosing it is a deliberate act rather than a default.
- **USWDS's focus ring is the weakest indicator in the set.** `#2491FF` on white is **3.20:1** — over the 3:1 non-text minimum by 0.2, and the reason the range above starts at 3.20 and not 5.99. It survives because it is 4px at zero offset on a system whose surfaces are white or near-white. Copy the 4px, not the hue: at 2px that same blue is a failing indicator.

---

## The decisions that make it work

### 1. One question per page — and the label *is* the `<h1>`

**Observed:** GOV.UK's question-page pattern sets the `<label>` or `<legend>` as the page heading, styled `govuk-heading-l` (36/40 desktop, 27/30 mobile). On the error example I measured, `.govuk-fieldset__legend` renders at 36px w700 and *is* the `h1`. The design system states the reason: *"users of screen readers will only hear the contents once."*

**Why it works:** the question and the page title cannot drift apart, the `<title>`, the `h1`, the error-summary link text and the inline error all derive from one string, and there is exactly one decision on screen.

**Beats:** the AI default — a card containing eight labelled fields under a generic "Personal Information" heading, where the label is 14px grey above a 40px input.

**Observed, precisely:** the `h1` is nested *inside* the `<legend>` (`<legend class="…--l"><h1 class="govuk-fieldset__heading">…</h1></legend>`), not a sibling of it. That is the whole trick — one string, one element, two roles.

**Does NOT apply when:** (a) the user is an expert doing the same task repeatedly. GOV.UK says so explicitly: *"if you're designing an internal service for government users who need to repeat and switch between tasks quickly,"* group the questions and use a statement as the heading. One-thing-per-page is a rule for *the public's first and only encounter*, not for a claims adjuster's 40th form of the day. (b) The questions are genuinely one unit that is meaningless split — day/month/year is one question in three boxes, and GOV.UK ships it as one page, not three. (c) Each page is a server round trip: on a high-latency or metered connection, twelve pages is twelve loads. GOV.UK absorbs that because the pages are ~10KB of server-rendered HTML with no client bundle. Split a question per page on top of a 400KB SPA shell and you have made it worse, not better.

### 2. Two error surfaces, one string, verbatim

**Observed:** on the GOV.UK date example, the exact string "Passport issue date must include a year" appears twice — once as a `w700` red link inside a 5px-bordered summary at the top, once as a `w700` red `<p>` immediately above the input, prefixed by a visually-hidden `Error:`. The summary title is "There is a problem" in **black**, not red. The form group gets a `5px` red left border; the input gets a `2px` red border; nothing gets a red background.

**Why it works:** the summary is where a screen-reader user lands after submit and where a sighted user sees the count; the inline message is where the fix happens. Duplicating the string means it "makes sense out of context" (their words) and costs the reader zero re-parsing.

**Beats:** a toast that says "Please fix the errors below" and vanishes in 4s; or a single summary with no inline messages; or inline messages with no summary; or two differently-worded versions of the same complaint.

**Does NOT apply when:** the failure is not the user's fault. GOV.UK is explicit: *"Do not use error messages to tell a user that they are not eligible or do not have permission… because the problem is with the service rather than with the information the user has provided."* Ineligibility gets its own page with a next step, not a red field.

### 3. Never clear the fields

**Observed, quoted from the GOV.UK error-message guidance:** *"Do not clear any form fields when showing the Error message component. Keep both passing and failing answers."* The date example ships with `5` and `12` still in the day and month inputs and only the empty year highlighted.

**Why it works:** the user can see what they typed, edit it, and not re-key six fields to fix one.

**Beats:** the framework default where a failed POST re-renders a blank form, or a client-side validator that blanks a field it considers malformed.

**Does NOT apply when:** the value is a secret (password, one-time code, card CVC) or when retaining it would leak across a shared device. Those get cleared and *say* they were cleared.

### 4. Error targeting inside a compound field

**Observed:** in the passport-date error, day (52px) and month (52px) kept `border: 2px solid #0b0c0c`; only the year input (86px) got `2px solid #CA3535`. The guidance: *"if the error relates to a specific field within the question, give it a red border and refer to that field in the error message."*

**Why it works:** you have told the user which of three boxes to touch without a word.

**Beats:** reddening the whole fieldset, which makes the user re-check all three.

**Does NOT apply when:** the error is a cross-field relationship ("start date must be before end date") — then the whole group is the error and you say which relationship failed.

### 5. Field width encodes expected input length

**Observed:** GOV.UK date sub-inputs are 52 / 52 / 86px and **stay that width at 390px** while the submit button goes full-bleed. CMS ships `--field-max-width: 460px`, `--field-max-width--small: 6rem`, `--field-max-width--medium: 12rem`. HealthCare.gov's ZIP field is a short box next to Continue, not a full-width input.

**Why it works:** the box is a silent hint. A 4-character box invites four characters and prevents a whole class of paste errors.

**Beats:** `width: 100%` on every input in the form, which tells the user a postcode and a paragraph deserve the same 720px.

**Does NOT apply when:** the field is free text of genuinely unknown length (address line 1, "describe your symptoms"), or in a dense internal table where column width is set by the grid. And it has a real cost: those day and month boxes are **52px wide at 390px**, which is well under any touch-target width guidance. GOV.UK accepts that because they are 40px tall, numeric, adjacent, and mis-tapping one puts the caret in a neighbouring box rather than firing an action. Copy the narrow box for adjacent numeric sub-fields; do not copy it for a standalone control where a miss costs a navigation.

### 6. The focus indicator is a block, not a ring

**Observed:** GOV.UK focus is `box-shadow: 0 -2px 0 0 #FFDD00, 0 4px 0 0 #0B0C0C` — the element sits in a yellow field with a 4px black underline, 14.55:1 against the focus text colour — plus `outline: 3px solid transparent` (invisible normally; becomes a real outline in Windows High Contrast / forced-colors). GCDS does the same idea differently: `--gcds-focus-background: #1354ec` with `--gcds-focus-text: #fff` — focus *inverts* the element. CMS picks `#bd13b8` magenta specifically so the focus colour is not confusable with primary blue, error red, warning yellow or success green. USWDS uses `4px solid #2491FF` at zero offset.

**Why it works:** a filled block survives being drawn over a photo, a coloured header, a dark card, and a user stylesheet. A 2px accent-coloured ring does not, and in a design where the accent is also the link colour, a focused link and an unfocused link look the same.

**Beats:** `focus:ring-2 focus:ring-blue-500` (3.68:1 against white) — the single most common AI-generated focus state, and it is not a compliant focus indicator.

**Does NOT apply when:** (a) you are in a dark, dense operator UI where a yellow block would flash 40 times a minute during keyboard nav. Then invert: a light 2px inset border plus a background shift, still ≥3:1 against both adjacent surfaces. But it must never be *only* a colour change to the border. (b) Your surfaces are guaranteed light and uniform — that is the case USWDS's 4px `#2491FF` ring solves, and at **3.20:1** it is the weakest indicator in this whole reference set. It clears the bar by 0.2 because the ring is 4px at zero offset. The block is the safer default precisely because it stops depending on what is behind it.

### 7. The top severity tier is the only one that inverts

**Observed, in two systems that did not copy each other.** NHS: non-urgent = blue header / white body; urgent = red header / white body; **emergency = same red header / `#212b32` body with white text**. USWDS: info, warning, error and success are all a pale tint with an 8px saturated left bar; **emergency is a solid `#9C3D10` fill with white text**.

**Why it works:** there is no redder red. Once you have spent saturation on "urgent," the only escalation left is a change of *kind* — surface inversion — which reads instantly even in peripheral vision and even in greyscale.

**Beats:** five severity levels each with its own slightly-different red/orange/amber, which users cannot rank and which collapse under colour-blindness.

**Does NOT apply when:** you have fewer than three real severity levels. If everything you ship is "info" and "error," inverting the error is theatre. Earn the third tier first.

### 8. Alert fatigue is a design failure, and the fix is written into the component docs

**Observed, quoting Nord's `nord-notification` guidance verbatim:**
- *"Don't use for transient or unimportant messages. Consider using a Toast instead."*
- *"Don't remove a notification until a user has explicitly dismissed, or acted on the notification."*
- *"Don't use for error messages unless absolutely necessary. Try to favor a Banner for error messaging instead."*

And `nord-banner`: *"Move focus to the banner if it's relevant to the current workflow"* / *"Don't move focus to banner if it appears on page load."*

**Why it works:** it makes the *routing* decision explicit — transient → toast, page-scoped condition → banner, requires-your-action → notification that persists until acted on. The failure mode of clinical UI is 40 dismissible yellow strips that clinicians learn to swipe away without reading, and the swipe-without-reading habit is what kills someone.

**Beats:** one `<Toast variant="error">` used for everything from "saved" to "this patient has a documented penicillin allergy."

**Does NOT apply when:** (a) the message is genuinely disposable ("Copied"). Auto-dismiss is correct there — it's auto-dismiss on *actionable* messages that is the crime. (b) The condition is a regulated record — a drug interaction, a consent withdrawal, a benefit denial — where "the user dismissed it" is itself something the system has to be able to prove later. A persistent notification is then not enough; the acknowledgement has to be captured, and the component is a dialog with an explicit action, not a strip with an ×. (c) Volume is the actual problem. If a clinician sees forty of these a shift, no routing rule saves you: the fix is upstream, in what qualifies as an alert at all, and shipping a better-designed strip forty times a day is the failure wearing a design system.

### 9. Missing data is a link, not a dash

**Observed:** GOV.UK's summary list with missing information renders `Contact information → "Enter contact information"` as a blue underlined link in the value column, and the "Change" action for that row **disappears entirely**. Complete rows show the value plus "Change".

**Why it works:** the empty state of a row is not "nothing" — it's the highest-value call to action on the page. And the action column stops offering "Change" for something that does not yet exist.

**Beats:** `—`, `N/A`, `Not provided`, a grey italic "None", or an empty cell — all of which are dead ends the user has to reverse-engineer a route out of.

**Does NOT apply when:** absence is a legitimate final answer (no middle name, no prior claims). Then say the answer — "None" — and keep the Change link.

### 10. Progress indicators are opt-in, and one style is banned outright

**Observed, GOV.UK question-pages guidance:** *"Start by testing your form without a progress indicator… Try improving the order, type or number of questions before adding a progress indicator."* And explicitly: do not use an indicator that simultaneously shows all questions, allows navigation back, and shows the current step — because *"they are often not noticed, take up lots of space, do not scale well on small screens, can distract and confuse some users, make it hard to write good labels for the steps, make it hard to handle conditional sections."* They cite the Carer's Allowance team removing a **12-step** indicator with no effect on completion rates or times.

**Why it works:** conditional eligibility logic means the number of remaining steps is often unknowable; a stepper that lies is worse than no stepper. And its cost in vertical space on a 390px screen is a whole question.

**Beats:** the default multi-step wizard chrome with numbered circles, which AI reaches for the moment it sees more than one form page.

**Does NOT apply when:** the path is fixed, short, and the user has committed something (payment in flight, document upload). Then a plain "Step 2 of 4" line — GOV.UK's own minimal variant — earns its keep.

### 11. Consent choices get equal visual weight

**Observed:** the NHS cookie banner ships "I'm OK with analytics cookies" and "Do not use analytics cookies" as two **identical** 56px green buttons. GOV.UK does the same with "Accept analytics cookies" / "Reject analytics cookies" — same `#0F7A52` fill, same size, same weight.

**Why it works:** it is a genuine choice, and it is regulated as one. Making refusal a ghost button is a dark pattern with a legal name.

**Beats:** a solid "Accept all" next to a text link "manage preferences" — the pattern the entire commercial web defaults to.

**Does NOT apply when:** the two actions are genuinely asymmetric in risk (Save vs Delete account). Then the destructive one is quieter *and* gated by confirmation — but that is risk asymmetry, not preference steering.

### 12. Numerals: tabular by default, slashed zero on, in data — off in headings

**Observed:** Nord sets `--n-font-feature-settings: 'tnum' 1, 'zero' 1` globally and `--n-font-feature-settings-heading: 'tnum' 0, 'zero' 0`. Their docs give the reason for the slashed zero: *"for when you need to disambiguate '0' from 'O'."*

**Why it works:** in a clinical or financial column, a proportional `1` makes numbers of the same magnitude look different lengths, and an unslashed `0` next to an `O` in a drug code or a policy number is a real transcription error. In a 36px heading, tabular figures look mechanically spaced and the slash looks like a typo.

**Beats:** the fintech-adjacent habit of turning the slashed zero **off** for brand reasons (Brex ships Inter with `"zero" 0`). That is right for a marketing surface and wrong for a medication list.

**Does NOT apply when:** the numbers are in running prose ("we have 3 clinics"), or in a display headline. Scope the feature settings to the data, not the document.

---

## States, edges and the unglamorous parts

**Service unavailable.** Login.gov, caught in maintenance on 2026-09 (re-probed 2026-09-10: back up, so this is a dated capture and not re-verifiable): full-bleed `#112E51`, the logo, `<h1>` "Temporarily Down" at 32/40 w700 white, "Login.gov is temporarily down for maintenance." / "Please try back later.", and one underlined link — "Login Status". No illustration, no spinner, **no retry button**, and it rendered without JavaScript because the app that would serve the JS is the thing that's down. Ship your down page as static HTML on a different origin.

Two things the healthy Login.gov does that the down page's reputation obscures, both measured live: the sign-in page carries a **"Cancel sign in"** button — a named way out of an auth flow, which almost nothing on the commercial web offers — and **every external link's text ends in a visible `(opens new tab)`**, not a `↗` glyph and not an `aria-label`. The `h1` is 28/37.8 w700 in `#454545` on `#ebf3fa` (8.55:1) — notably *not* the near-black the rest of this archetype uses, and the one place I'd argue the palette is soft.

**404.** Four in my sample, ranked.
- *Canada.ca* — best. `Page could not be found` / `Page introuvable` stacked at the same size and weight, red rule under the pair, one sentence of advice in each language, and `Date modified: 2026-09-09` at the bottom. It is bilingual because you cannot know which language the dead URL was in.
- *IRS* — competent, with a scale problem: a red warning triangle, `h1` "Page Not Found." at **60/64 w700** `#1b1b1b`, then "Error 404." / "Sorry, this page is not available." / "Please check the web address or try searching by the keyword below." + a search box. Everything is centre-aligned, including the search field, which is the only centred column on the site. 60px is larger than any heading in the live IRS type system. GOV.UK would strike the "Sorry"; the search box is the right call.
- *Nord* — minimal and correct: "Couldn't find it! This page may have been moved or deleted. Please double check the address or browse back to home page." + a "Go to home" button.
- *Epic* — worst, and re-confirmed 2026-09-10 at `epic.com/<any-dead-path>`: `h1` **"Ope!" at 128px w600 in `#c62715`** over a cartoon cow, then "We've never *herd* of that link. Please keep 'er *moooo*vin' to another page." No search, no back link, no next step. The 128px is the tell — the largest type Epic sets anywhere on its site is spent on a joke about the user's failed navigation, at 4× the 30px `h1` on its actual product pages. This is the vendor whose EHR clinicians use six hours a day.

**Permission denied / blocked.** Zocdoc's bot-block, which I hit by accident, is better than most products' deliberate error pages: `Access is temporarily restricted` as the heading, then *"We detected unusual activity from your device or network"*, then a bulleted list of **probable causes** ("Rapid taps or clicks", "JavaScript disabled or not working", "Automated (bot) activity on your network (IP 73.158.164.19)", "Use of developer or inspection tools"), then `Need help? Submit feedback.` and `ID: 0cdbdd42-005a-bd71-9741-2c2b0d610b08`. Three moves worth copying: name the observed behaviour rather than the verdict, enumerate causes so the user can self-diagnose, and print a support ID they can quote.

**Multilingual delivery, when you are not bilingual by statute.** irs.gov's footer ships seven languages as plain sibling links — Español, 中文 (简体), 中文 (繁體), 한국어, Русский, Tiếng Việt, Kreyòl ayisyen — plus a `English ▾` control that stays in the top header at every width. HealthCare.gov ships one (`Español`, 16px w700, top right) and **loses it entirely at 390**, where it collapses into `Menu`. If your language control is inside a hamburger, the users most likely to need it are the users least likely to find it.

**Ineligibility.** The state this archetype handles best and consumer products handle worst, because a consumer product's ineligibility is a lost signup and here it is a lost benefit. GOV.UK's rule: ineligibility is **not** a validation error — *"take the user to a page that explains the problem… and provides useful information about what to do next."* HealthCare.gov does the softer version: a blue-bar notice **before** you invest effort — "Life changes? You can still get 2026 health insurance — You can enroll or change plans only if you have certain life changes, or qualify for Medicaid or CHIP" — so the user learns the gate exists before filling anything.

**Prefilled and uneditable data.** VA.gov, on collecting an SSN: *"When a user is authenticated, identity proofed, and we have their SSN on file… we should use that information and not allow the user to change the SSN in the form."* The field becomes displayed, locked data with a separate documented route to change it. Their "Help users to know when their information is prefilled" is a first-class pattern, not a tooltip.

**Zero data.** Nord ships `nord-empty-state` as a component with the same status vocabulary as everything else, so an empty patient list is styled by the system rather than improvised per screen. The test that separates a real empty state from an illustration: does it name *why* the list is empty (no results for this filter / nothing scheduled today / you do not have access) and offer the one action that changes that? Three different causes, three different screens. A single centred graphic that says "Nothing here yet" for all of them is a decoration, not a state.

**Too much data.** Nord's typography doc: *"our users can control the application layout width, meaning that a line length can not always be specified. For this reason, it's good practice to design for an ideal line length range"* — target 50–90 characters. CMS encodes the same as tokens: `--measure-narrow 45ex / --measure-base 65ex / --measure-wide 80ex`. Note `ex`, not `ch` — measured against x-height, which tracks actual legibility better across the font-size range.

**Offline / degraded.** Every page I measured in the government set renders and submits without JavaScript. GOV.UK's error summary, task list, tags and summary lists are server-rendered HTML with no client dependency; the only JS-dependent behaviour is progressive enhancement (focus management, the accordion). Design the failure of your JS bundle as a supported state, not an outage.

---

## Mobile

Everything here re-measured at 390×844 against the same pages at 1440×900.

**The body size does not move. Only the headings do.** This is the correction that matters most in the file. In govuk-frontend 6.5.0, `body` (19/25), `body-s` (16/20), `heading-s` (19/25) and `caption-m` (19/25) are **identical at 390 and 1440**. The four display classes shrink: `heading-xl` 48 → 32 (−33%), `heading-l` 36 → 27 (−25%), `heading-m` 24 → 21, `body-l` 24 → 21. The switch fires at 641px. GCDS does the same shape differently — body 20 → 18px (−10%), h1 41 → 37px (−10%) — a *smaller* concession than GOV.UK's on headings and the only one of the two that touches body copy at all. Neither ships anything under 16px. The mobile move in this archetype is to compress the display type and leave the reading type alone; the SaaS habit of scaling everything by a `clamp()` ratio compresses the text that was already at the legibility floor.

**Primary action goes full-bleed; sized inputs do not.** Same GOV.UK page at 390: `.govuk-button` 99px → **360px**, edge to edge inside the 15px page margin, while day/month/year stayed at 52/52/86px. The button's font stays 19px too — it does not shrink to fit, it grows the box. The button becomes a thumb target; the field keeps its semantic width.

**Spacing halves, roughly, and it is the type class that carries it.** `main` padding 40 → 20px; error-summary padding 20 → 15px; error-summary `margin-bottom` 50 → 30px; form-group `margin-bottom` 30 → 20px; `heading-xl` `margin-bottom` 50 → 30px. Nothing is a per-component media query — the margin ships with the type class, so a heading that shrinks brings its rhythm down with it.

**Touch targets are honest about the trade-off, and the numbers disagree.** GOV.UK's button is 38px of box plus a 2px bottom shadow = **40px** of hit area, under the 44px iOS guideline; the full-bleed width buys back the miss rate. NHS buttons are **56px** (`padding: 12px 16px`, `border-radius: 4px`, with a 4px solid bottom edge that compresses on `:active`). VA.gov top-nav items measure **56px** (`padding: 16px 20px` on 16/24). So the archetype's own range is 40–56px, and the systems with the most research behind them are at opposite ends of it. Do not cargo-cult 44px onto a 19px full-width button and end up with a 60px slab; do not ship a 28px icon-only control either.

**What breaks at 390 in these products, seen rather than measured.**
- On the GOV.UK error page the reading order is back link → error summary → `h1` → inline error → inputs → button. On a 390px screen the error summary consumes the entire fold: nothing else is visible above it. That is the point — you cannot scroll past the problem count without seeing it — but it means the summary has to be short, which is why the copy rule says one clause per error.
- The NHS emergency card is full-bleed to the container at 390 with `padding: 32px` retained, so the dark body starts ~310px down a 844px screen and the action link ("Find your nearest A&E") lands inside the first fold. The card is designed so the *exit* is above the fold, not just the symptoms.
- HealthCare.gov's white panel over a photo still works at 390, but its `Español` link is gone into `Menu`, and the federal identifier band wraps from one line to two. Provenance grows on mobile; the language control disappears. That is backwards.

**Where this archetype admits it shouldn't go to mobile:** clinical worklists, air-ops boards and claims-adjudication screens. Nord says out loud that it is designed for *workstations*, and its 14px base, 52px top bar and 4/8/16/24/36/72 spacing are workstation numbers. The right mobile answer for those products is a deliberately narrower app — the three things you'd do standing up — not a responsive reflow of a 12-column grid.

## How this archetype fails

Not "a bad government site" — the specific artefact a language model produces when told *"build a benefits eligibility form"* or *"a patient intake flow."* Each item below is written so you can run it against your own output as a check with a pass/fail, because self-diagnosis by vibe does not work: the imitation looks *tidier* than the real thing, which is exactly why it survives review.

**The generating mistake.** The model has been trained on a million marketing pages and a hundred thousand SaaS dashboards, and roughly zero transactional government services. So it reaches for the consumer-product prior and then *decorates it with seriousness* — muted palette, a shield icon, the word "secure" — instead of changing the structure. Every symptom below is that one substitution.

1. **The card reflex.** Grep your own output for `rounded-`, `shadow-`, `border` and `p-8` on the element that wraps the question. GOV.UK, NHS and Canada.ca put the question directly on the page background at `border-radius: 0`. A `rounded-xl shadow-lg border p-8` wrapper adds a frame that carries no meaning and eats ~64px of a 390px screen. *The honest limit:* HealthCare.gov, in this very reference set, floats its ZIP form in a white panel over a photograph — a panel earning contrast against an image is legitimate. A card around a question on a white page is not. The fail condition is elevation and radius as default chrome, and nested cards inside cards.
2. **Inverted type hierarchy.** Measure the label and the heading. In the imitation the label is 14px `text-gray-500` and the section heading is 24px bold. In every system here the **label *is* the largest text on the page** — GOV.UK renders the question at 36/40 w700 and the whole page carries one. If your form's largest text is a section title and not a question, you have built a settings screen.
3. **The `#E5E7EB` input.** The imitation's input border is a 1px hairline grey at roughly 1.2:1. Measured borders in this archetype: `#0b0c0c` 2px (GOV.UK), `#262626` 2px (HealthCare.gov), `#4c6272` (NHS). Fail condition: input border contrast under 3:1 against the page, or a border that only appears on focus.
4. **Ring focus.** `focus:ring-2 ring-blue-500` is 3.68:1 on white and lower on anything else, and in a design where the accent is also the link colour, a focused link and an unfocused link look the same. Fail condition: the focus indicator is a colour change with no shape change, or is under 3:1 against *both* adjacent surfaces. Compliant references: a yellow block with a black underline (GOV.UK), a filled inversion (GCDS), a 4px ring on a guaranteed-light surface (USWDS).
5. **The toast.** Validation errors appear bottom-right and leave after 4s. There is no summary at the top of the page, no inline message next to the field, no anchor link, and nothing for a screen reader to land on after submit. Fail condition: after a failed submit, the error text exists in exactly one place, or in zero places after four seconds.
6. **Two differently-worded copies of the same error.** The subtler version of the same bug: a summary that says "Please correct the highlighted fields" and an inline message that says "Invalid date." GOV.UK ships the identical string in both places — I measured "Passport issue date must include a year" rendered verbatim twice on one page. Fail condition: `summaryText !== inlineText`.
7. **The stepper.** Numbered circles across the top of a flow whose length depends on eligibility answers, so it lies from step 2 onward. GOV.UK cites the Carer's Allowance team removing a **12-step** indicator with no effect on completion rate or time. Fail condition: you cannot state the total number of steps for every possible path.
8. **Severity carried by hue.** Five near-identical ambers, or ⚠️ 🚨 ❗ doing the ranking. The test is greyscale: desaturate your alerts and see whether the ordering survives. USWDS's do — the icons are monochrome black and shape-differentiated, and only the top tier changes *surface* (`#9C3D10` solid, white text). NHS's do — urgent and emergency share `#d5281b` and the escalation is the body inverting to `#212b32`. Fail condition: two severities that are distinguishable only by hue, or an emoji as the severity marker.
9. **Personality in failure.** "Oops! Something went wrong 🙈"; "Our hamsters need a nap"; a 128px "Ope!". GOV.UK's banned list is explicit: no `forbidden`, `illegal`, `you forgot`, `prohibited`, no `please` (*"because it implies a choice"*), no `sorry` (*"because it does not help fix the problem"*), no `valid`/`invalid` (*"because they do not add anything"*), no `oops`, no error codes like `0x0000000643`. Fail condition: any of those strings, an exclamation mark, or an illustration on an error state.
10. **A failure state with no exit.** The deeper version of 9, and the one that actually hurts: Epic's 404 has no search box, no back link, no next step. Zocdoc's *accidental* block page has a cause list and a support ID. Fail condition: an error, empty, blocked or ineligible state that does not contain at least one link or button to somewhere the user can act.
11. **Uniform badge chrome.** 11px uppercase bold pills for every status. GOV.UK's tag is **19px, weight 400, sentence case, `border-radius: 1px`, `padding: 2px 8px 3px`** — and "Completed" gets no tag at all, because the *outstanding* items are the ones that need weight. Fail condition: every row in a task list carries a badge.
12. **The dash.** `—` / `N/A` / a grey italic "None" in a value column. GOV.UK renders missing information as a blue underlined link — "Enter contact information" — and *removes* the "Change" action for that row. Fail condition: an empty value that is not a link, next to an action that acts on nothing.
13. **Prose at 16px in a 1200px column.** No measure constraint, ~140 characters a line. The measured targets: 50–90 characters (Nord), `--measure-base: 65ex` (CMS), GOV.UK's two-thirds grid. Fail condition: a text column whose measured line length exceeds ~90 characters at 1440.
14. **Motion.** These systems ship 50ms / 0.2s (Nord) and 250–800ms (CMS) and spend them on drawers and dialogs. There are no entrance animations on form fields, no staggered fades, no hover lifts, no skeleton shimmer on a form. Fail condition: any layout-affecting animation on the path between reading a question and answering it. A page that reflows while a user with a tremor is aiming at a radio button is a hazard.
15. **Ambient consumer-product furniture.** A dark-mode toggle, an avatar menu, a "Powered by" badge, a chatbot bubble, a cookie banner with a solid "Accept all" and a ghost "Manage" — the last one being a dark pattern with a legal name in the jurisdictions this archetype ships in. NHS and GOV.UK both give accept and reject **identical** buttons.

**The unifying diagnosis: the imitation optimises the first impression; the real thing optimises the worst case.** Every decision above is legible as an answer to "what happens to the person for whom this goes wrong?" The imitation has no answer because it never modelled that person — it modelled a screenshot.

**The fastest single test.** Turn JavaScript off and submit the form with one field empty. In this archetype you get a re-rendered page with a bordered summary at the top, your other answers still in their boxes, and the same sentence beside the field that failed. In the imitation you get nothing at all.

## Copy and tone

**Register:** second person, present tense, active voice, sentence case everywhere including buttons and headings. No exclamation marks. No brand voice. The reader is not delighted, they are trying to finish.

**The GOV.UK error-message rules, which are the closest thing this field has to a standard:**
- Say what happened and how to fix it, in that order.
- Reuse the words from the label. Label "How many hours do you work a week?" → error "Enter how many hours you work a week". Label "Address line 1" → "Enter address line 1, typically the building and street".
- Identical string in the summary and inline, so they *"look, sound and mean the same"* and *"make sense out of context."*
- Don't repeat an example already on screen. If the hint shows `QQ 12 34 56 C`, the error does not.
- *"Read the message out loud to see if it sounds like something you would say."*

**Right / wrong, from the systems themselves:**

| Right | Wrong | Source |
|---|---|---|
| Enter an event name | Please enter a valid event name | GOV.UK |
| Passport issue date must include a year | Invalid date format | GOV.UK |
| There is a problem | Oops! Something went wrong | GOV.UK |
| We're experiencing an incident. Please see our status page for more details. | There was an error. | Nord |
| Ariel Salminen arrived to clinic with Pixie cat. | Patient arrived | Nord |
| You've reached the limit of 30 users included in your plan. Upgrade to add more. | You have reached the user limit. Your clinic can only have a maximum of 30 users. To add more users, remove users you no longer need or upgrade your plan to add more. | Nord |
| Start consultation | Click here | Nord |
| Call 999 or go to A&E now if: | ⚠️ EMERGENCY | NHS |
| Accept and send | Submit | GOV.UK |
| Continue | Next | GOV.UK |
| Login.gov is temporarily down for maintenance. Please try back later. | We're sorry! Our hamsters need a nap 🐹 | Login.gov |
| Please check the web address or try searching by the keyword below. | Ope! We've never *herd* of that link. | IRS / Epic (both real, both 404s) |
| Cancel sign in | *(no way out of the auth flow at all)* | Login.gov |

**Mechanical conventions, and where they disagree.** Nord: *"always write it in sentence case, not title case"* and *"always end in punctuation."* GOV.UK: sentence case too, but hint text is *"a single short sentence, without any full stops."* Both are defensible; **pick one and encode it in the component**, because the failure mode is a product where half the hints have periods.

**Labels and optionality.** GOV.UK: *"Never mark mandatory fields with asterisks."* Mark the **optional** ones — append `(optional)` to the label, or to the `<legend>` for radio/checkbox groups. The asterisk convention makes the default state look like an exception and requires a legend to decode.

**Hint text has a hard ceiling.** One short sentence, and **no links inside it** — *"screen readers will read out the link text when describing the field, but usually do not tell users the text is a link."* If the explanation needs a paragraph, make the `h1` a statement ("Interview needs"), write the explanation as normal body copy, and put a short specific question in the label above the input.

**Allow "I don't know."** GOV.UK: *"allow users to answer 'I do not know' or 'I'm not sure' if they are valid responses."* An eligibility form that forces a guess produces a wrong record, and a wrong record in this archetype is a denied claim.

**Declarations, not tick-boxes.** GOV.UK's check-answers page ends with an `h2` "Now send your application", one sentence — "By submitting this application you are confirming that, to the best of your knowledge, the details you are providing are correct." — and a button labelled **"Accept and send"**. No "I agree" checkbox. The button label carries the consequence.

**Bilingual and translation.** Canada.ca ships `Noto Sans` for body specifically for orthographic coverage, sets body at 20px, and renders its 404 in both official languages simultaneously (`Page could not be found` / `Page introuvable`, same size, same weight, one sentence of advice in each). irs.gov puts an `English ▾` control in the top header at every width and lists **seven** languages as plain footer links. HealthCare.gov puts `Español` in the top-right header at 16px **w700** — and drops it into the hamburger at 390, which is the wrong end to economise. Three practical consequences for layout: your longest string is not the English one (French runs ~20% longer), so never size a button to its label; the error-summary string is the one most likely to be machine-translated badly, so keep it to one clause; and the language control is the one header item that must survive every breakpoint, because the users who need it cannot read the label on the menu that hides it.

---

## Sources

- **https://design-system.service.gov.uk/patterns/question-pages/** — full pattern text scraped: one-question-per-page rationale, label-as-heading, back-link reasoning, "Continue" not "Next", the banned progress-indicator style and the Carer's Allowance 12-step removal.
- **https://design-system.service.gov.uk/components/error-message/** — the error copy rules, the banned word list, the "do not clear form fields" rule, the visually-hidden `Error:` prefix (with the Welsh `Gwall:` example), the label↔message matching examples.
- **https://design-system.service.gov.uk/components/error-summary/full-page-example/index.html** — measured the whole error stack: 5px summary border, black summary title, w700 red links, 5px form-group left border, per-sub-field date targeting.
- **https://design-system.service.gov.uk/components/text-input/error/index.html**, **/components/warning-text/default/index.html**, **/components/task-list/default/index.html**, **/components/summary-list/with-missing-information/index.html**, **/patterns/check-answers/default/index.html** — measured tags, task rows, missing-information links, the declaration + "Accept and send".
- **govuk-frontend 6.5.0 `:root` custom properties** and a locally-rendered type-scale harness at 390 and 1440 — the complete size/line-height/margin table and the 5px spacing base.
- **https://service-manual.nhs.uk/design-system/components/text-input** — nhsuk-frontend 10.6.1 token dump (81 `--nhsuk-*` properties including the four-part button ladders).
- **https://service-manual.nhs.uk/design-example/patterns/help-users-decide-when-and-where-to-get-care/{non-urgent,urgent,emergency}** — DOM-walked all three care cards; confirmed shared red and the emergency body inversion, and the `nhsuk-u-visually-hidden` severity prefixes.
- **https://service-manual.nhs.uk/design-example/components/warning-callout/default** — the `#fff9c4` / `#ffeb3b` overhanging-tab callout.
- **https://designsystem.digital.gov/components/alert/** and **/design-tokens/spacing-units/** — measured all six alert variants; scraped the full spacing-unit table including the breakpoint-named large tokens.
- **https://nordhealth.design/llms.txt** → **/raw/design/foundations/{principles,typography,colors}.md**, **/raw/components/{banner,notification}.md** — the "workstations / all-day use" statement, the 14px base and 8-step scale, the 50–90 character target, the brand-vs-product typeface rule, and the verbatim Do/Don't and content-guideline strings.
- **https://nordhealth.design/components/input/** — **174** `--n-*` custom properties including both `font-features` sets and the seven-status colour system. (The old `/components/nord-input/` path now 404s; an earlier pass cited it and counted 144 off the 404 page's own stylesheet.)
- **https://design.cms.gov/components/text-field/** — 493 component-level tokens (`--alert-bar__width`, `--choice__size`, `--field-max-width`, `--measure-*`, `--color-focus-dark`).
- **https://www.healthcare.gov/see-plans/** — measured live: 48px w400 `#034866` h1, 2px black square inputs, `#12890E` button, `#DD3603` focus, the estimated-vs-final-price copy, the `Español` header link.
- **https://design.va.gov/components/form/text-input** and **/patterns/ask-users-for/social-security-number** — the `Ask users for… / Help users to…` taxonomy, `USE: DEPLOYED` status badges, the Deprecated shelf, the prefilled-SSN read-only rule.
- **https://design-system.alpha.canada.ca/en/components/input/** — 1,133 `--gcds-*` tokens: the 19-step hue ramps, the 20px body, the compressed heading scale, the filled focus block.
- **https://design-system.alpha.canada.ca/en/components/gcds-error-summary/** (served the 404) — the bilingual error page, screenshotted.
- **https://secure.login.gov/** — caught in maintenance 2026-09; the static down page, screenshotted and measured. Re-probed 2026-09-10: back up, sign-in page measured (28/37.8 w700 `#454545` on `#ebf3fa`, `Cancel sign in`, `(opens new tab)` suffixes).
- **https://www.irs.gov/<dead-path>** — 404 measured and screenshotted 2026-09-10: 25px federal identifier band at 1440, `h1` 60/64 w700 `#1b1b1b`, red triangle, centred column, seven-language footer. `directfile.irs.gov` refused headless traffic entirely.
- **https://www.epic.com/<dead-path>** — 404 re-confirmed 2026-09-10: `h1` "Ope!" 128px w600 `#c62715`, the cow, no search and no back link, screenshotted. (`/software/` now returns 200; an earlier pass cited that path.)
- **https://www.zocdoc.com/search?…** — served a bot-block; the block page's cause list and support ID, screenshotted.
- **https://apps.apple.com/us/app/flighty-live-flight-tracker/id1358823008** — real in-product imagery: "5m Early · T3", "1h 20m UNTIL GATE ARRIVAL", the amber gate pill, "RUNNING LATE — 35m delay predicted due to late arriving aircraft".
- **https://www.hioscar.com/**, **https://www.onemedical.com/**, **https://ro.co/** — measured marketing type only (Oscar h1 72/70 w400; One Medical body 18/31.5 w200; Ro body "Ro Sans" 16/18.4). `hims.com` served a Cloudflare interstitial.
- Contrast ratios computed locally (WCAG 2.x relative luminance) from the measured hex values, including the Tailwind default comparisons.
- **Direction pass, 2026-09-10** — independent re-probe at 1440 and 390 of: the GOV.UK type scale (injected classes, viewport stepped through 640/641/768/769), the GOV.UK error stack and `:root` tokens, the GOV.UK task list and summary-list-with-missing-information, the NHS urgent and emergency care cards, all USWDS alert variants including slim and no-icon, GCDS tokens, Nord tokens on `/components/input/`, HealthCare.gov, VA.gov, Login.gov, the IRS and Epic 404s. Screenshots read at both widths for GOV.UK, NHS, HealthCare.gov, USWDS, IRS and Login.gov.

---

## Direction pass (2026-09)

An independent second pass re-probed the live sites, read screenshots at 1440 and 390, and edited against the original rather than trusting it. What changed:

**Numbers corrected — 9.** All confirmed by re-probe, and every one of them was wrong in a direction that made the original story cleaner than reality.

1. **The GOV.UK mobile type scale.** Six of nine rows were the pre-v5 scale. In govuk-frontend 6.5.0, `body` (19/25), `body-s` (16/20), `heading-s` and `caption-m` **do not change at all** between 1440 and 390; `heading-l` is 27/30 on mobile, not 24/25; `heading-m` and `body-l` are 21/25, not 18/20. This flipped the mobile section's headline claim from "body text shrinks" to "body text is a floor."
2. **The breakpoint** is **641px**, not 769px — verified by stepping the viewport through 640/641/768/769.
3. **USWDS slim alerts** keep the same **8px** bar; what changes is vertical padding (16 → 8px) and icon size (32 → 24px). The original said 4px.
4. **Nord's error/danger split** was stated backwards: `--n-color-text-error` and `--n-color-status-danger` are the *same* `#d24023`. The real split is three-role — `status-danger #d24023` (fill), `text-danger #b23015` (6.31:1, for text on the wash), `border-danger #fac7be`.
5. **Nord token count** 144 → **174**, and `/components/nord-input/` now 404s; the live path is `/components/input/`.
6. **Focus contrast range** 5.99–14.55:1 → **3.20**–14.55:1. USWDS's `#2491FF` is 3.20:1 on white and the original silently excluded it, which made the archetype look stricter than it is.
7. **"No 2.5:1 subtle grey anywhere"** is false. Nord ships `--n-color-text-weakest #b2babf` at **1.97:1**. The claim now says what is actually true: the *named text* ramp bottoms out at 4.7:1, and the sub-2:1 value exists but is scoped as a dead end.
8. **The federal identifier band** is **25px** at 1440 on irs.gov, not ~32px (and wraps to two lines at 390 on HealthCare.gov).
9. **VA.gov nav** measures w700 / `padding: 16px 20px` / **56px**, not w500 / `10px 15px` / 44px — which changes the touch-target section from "44px is the number" to "the archetype's own range is 40–56px and its two most-researched systems sit at opposite ends."

Also re-verified and **confirmed unchanged**: the complete GOV.UK error stack (5px four-sided summary border, black title, w700 red links, 5px form-group left border, 52/52/86 date sub-inputs with only the year reddened, button 99 → 360px, the yellow-block focus shadow); all 25 GOV.UK `:root` tokens and their contrast ratios; the task-list row (10px 0, 46–47px) and its 19px w400 1px-radius tag; the summary-list missing-information link with its action cell emptied; NHS's shared `#d5281b` and the `#212b32` emergency inversion; all five USWDS alert variants; GCDS's 1,133 tokens, 20px body and 41/39px h1/h2; HealthCare.gov's 48/62.4 w400 `#034866` h1 and 2px `#262626` inputs; every contrast figure in the file.

**Added — from looking, not from the DOM.**
- The GOV.UK error page's **reading order** (back link → summary → `h1` → inline error → inputs → button), the fact that the 5px red rule wraps the whole question block including the `h1`, and that Day/Month/Year are visible labels rather than placeholders.
- The NHS emergency card **ends with an action link inside the dark surface** ("→ Find your nearest A&E"), and its only two glyphs are directional (a tail, an arrow) — so the correct claim is "no *severity* icon," not "no icon."
- **USWDS alerts do carry icons**, monochrome black and shape-differentiated at 32px. The failure is coloured icons ranking severity alone, not icons.
- **HealthCare.gov is a card**, floating over a photograph — an honest counter-example now written into the no-cards rule instead of contradicting it silently.
- Login.gov live: a **"Cancel sign in"** escape hatch, and a visible `(opens new tab)` on every external link.
- The **multilingual delivery** state: irs.gov's seven-language footer and always-visible header control versus HealthCare.gov losing `Español` into the hamburger at 390.
- Epic's 404 `h1` is **128px** — 4× its own product-page `h1` — which is the measurable version of "personality in failure."
- A **probe technique** paragraph in the method, so this file can be re-run rather than re-believed.

**Cut or replaced.**
- The pre-v5 mobile type column and the "body 19 → 16px" mobile claim built on it.
- The false Nord error/danger split.
- "There is no 2.5:1 subtle grey anywhere in any of these systems."
- The intro's "Everything below is downstream of that."
- Login.gov's maintenance page as a live claim — now dated and marked non-reproducible, since the site is back up.
- Stale source URLs (`/components/nord-input/`, `epic.com/software/`) replaced with paths that reproduce.

**Boundaries hardened.** Findings 1, 5, 6 and 8 had single-clause limits that any product could wave through. They now carry limits with a cost attached: one-question-per-page multiplies round trips and is wrong for a compound question; the 52px date box is under any touch-width guidance and survives only because it is numeric and adjacent; the block focus exists because the ring stops working the moment the surface is not white; and the alert-routing rule does nothing about volume, which is the actual clinical failure.

**Failure section rewritten.** From ten symptoms to fifteen, each with a stated **fail condition** an agent can run against its own output (`summaryText !== inlineText`; focus indicator under 3:1 against *both* adjacent surfaces; a text column over ~90 characters; any layout-affecting animation between reading a question and answering it), plus a named generating mistake — the model decorates a consumer-product structure with seriousness instead of changing the structure — and a single fastest test: **turn JavaScript off and submit the form with one field empty.**
