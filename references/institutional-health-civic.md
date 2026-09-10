# Institutional, healthcare, civic and high-stakes interfaces

**Evaluated:** 2026-09

## What this archetype is for

Interfaces where the user did not choose to be here, cannot leave for a competitor, may be frightened or ill or broke while using it, and where a misunderstanding costs them a benefit, a diagnosis, a flight, or a filing deadline. That covers government transactional services (GOV.UK, IRS Direct File, Login.gov, Canada.ca), public health information and clinical software (NHS.UK, Nord/Nordhealth, Epic), benefits and insurance eligibility (HealthCare.gov, VA.gov, Oscar), care logistics (Zocdoc, One Medical), regulated telehealth intake (Hims, Ro), and operational status products where the truth is time-critical (Flighty, airline ops). It does **not** cover consumer health marketing pages, hospital brochure sites, or a "wellness" app that logs steps — those are consumer products wearing scrubs. The distinguishing test: **if the user's own competence is not a precondition of success — if the interface has to work for someone at 3am on a cracked Android with 20% vision and a second language — you are in this archetype.** Everything below is downstream of that.

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
| **Login.gov** *(off-list, observed live)* | I caught it mid-maintenance, which is the best way to evaluate this archetype | The down page is static HTML on the brand navy, two sentences, one link to a status page, and **no retry button** that would only fail again |
| **Flighty** | Status as delta-from-plan, not status-as-label | Every state carries its magnitude and its cause: "5m Early · T3", "35m delay predicted due to late arriving aircraft" |
| **IRS (irs.gov)** | The US federal identifier band | The first ~32px of every federal page is spent on provenance — "An official website of the United States government / Here's how you know" — before any brand |
| **Epic** *(counter-example)* | The EHR clinicians live in 6 hours a day | Its 404 is a cartoon cow: "We've never *herd* of that link. Please keep 'er *moooo*vin' to another page." No search, no back, no next step. Exactly what GOV.UK bans in writing. |
| **Zocdoc** *(counter-example / accidental good)* | Blocked my client, and the block page was better than most products' error pages | "Access is temporarily restricted" + a bulleted list of probable causes + a support ID (`0cdbdd42-005a-…`) + a feedback link. No status code, no jargon. |
| **Oscar / One Medical / Ro** | The consumer-warm pole of health | Oscar's h1 is 72px/70px at weight **400**; One Medical's body is 18px/31.5px at weight **200**. Marketing typography that would be malpractice inside the product. |

**How I found the off-list four.** From USWDS I followed *who extends it* — the federal agencies that fork the baseline and publish their own research. That surfaced **design.va.gov** (whose pattern names are goals, not components) and **design.cms.gov** (which powers HealthCare.gov and Medicare.gov under one themed system). From GOV.UK I followed the *international lineage* — the governments that copied the GDS model — looking specifically for one that had to solve a problem GDS never had. **Canada.ca / GC Design System** is that one: statutory bilingualism forces decisions (a 20px body, Noto Sans for orthographic coverage, a bilingual error page) that a monolingual system never confronts. **Login.gov** I did not go looking for; it happened to be in maintenance when I probed it, and a live down-page is more informative than any documented one.

**What I could not reach.** `directfile.irs.gov` refused headless traffic entirely; `irs.gov` served its 404 template to my client. `zocdoc.com` served a bot-block; `hims.com` served a Cloudflare interstitial. I have not attributed any in-product detail to Direct File, Zocdoc or Hims that I did not personally see.

---

## Measured specifics

All values read via Playwright at 1440×900 and 390×844, September 2026. Version-stamped where the system exposes it. Nothing here is recalled.

### GOV.UK — the complete type scale, both breakpoints (govuk-frontend 6.5.0)

| Class | Desktop (≥769px) | Mobile (390px) | Weight | margin-bottom (desk / mob) |
|---|---|---|---|---|
| `heading-xl` | **48 / 50** | 32 / 35 | 700 | 50 / 30 |
| `heading-l` | **36 / 40** | 24 / 25 | 700 | 30 / 20 |
| `heading-m` | 24 / 30 | 18 / 20 | 700 | 20 / 15 |
| `heading-s` | 19 / 25 | 16 / 20 | 700 | 20 / 15 |
| `body-l` | 24 / 30 | 18 / 20 | 400 | 30 / 20 |
| `body` | **19 / 25** | **16 / 20** | 400 | 20 / 15 |
| `body-s` | 16 / 20 | 14 / 16 | 400 | 20 / 15 |
| `caption-xl` | 27 / 30 | 18 / 20 | 400 | 5 / 5 |
| `caption-l` | 24 / 30 | 18 / 20 | 400 | 0 / 5 |

Three things worth internalising. **(1)** Line-height ratios are tight and get tighter as size grows: 19/25 = 1.32, 36/40 = 1.11, 48/50 = **1.04**. **(2)** `margin-bottom` is a property of the type class, not a per-instance decision — pick a heading size and the vertical rhythm comes with it. **(3)** The spacing scale underneath is `0 / 5 / 10 / 15 / 20 / 25 / 30 / 40 / 50 / 60`. That is a **5px** base, not 8px, in the most-used government design system on earth.

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
```

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

Header container: `padding: 16px 32px 15px`, `h2` at 26/32 w600. Body: `padding: 32px`, list items 19/28. There is **no icon and no exclamation mark anywhere in the component**. The visible heading is the instruction ("Call 999 or go to A&E now if:"), and the severity *word* exists only for assistive tech.

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

`.usa-alert__body { padding: 16px 20px }`. Heading 21.28px w700 at line-height **19.15px (0.9)** — deliberately sub-1.0 so a one-line heading doesn't add leading. Body text 16.96/25.44. Two extra variants ship: **slim** (4px bar, no heading, one line) and **no-icon**. Alert text colour never changes with severity; only the bar and the wash do.

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

Note the split Nord makes that most systems don't: `--n-color-text-error` (the message you read) is a *different, darker* value from `--n-color-status-danger` (`#d24023` vs the fill/dot use). Statuses come in three tiers — `status-X`, `status-X-weak` (the wash), and `border-X` — and there are **seven** of them: neutral, warning, highlight, danger, success, info, **progress**. "Progress" as a first-class status is a clinical-software decision: a lab result that is *pending* is not neutral and not a warning.

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
Measured on HealthCare.gov itself: h1 48/62.4 at **weight 400** in `#034866` (9.89:1); text input `border: 2px solid #262626`, `radius: 0`, height 41px; primary button `#12890E`, white w700, `padding: 8px 24px`, `radius: 3px`, height 39px; focus outline `3px solid #DD3603` (the theme overrides core magenta with the accent orange).

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

Body `Source Sans Pro Web` 16/24 on `#f9f9f9`; content column 952px; h1 40/52 w700 `#1b1b1b`; h2 32/41.6; nav links 16/24 **w500** with `padding: 10px 15px` (44px hit box). Patterns are versioned with a `USE:` status badge (`DEPLOYED`, `CANDIDATE`, `DEPRECATED`) and every one links out to Research, Figma, Code and Open Issues.

### Contrast, measured across all six systems

| Role | Range observed | The generic default it beats |
|---|---|---|
| Body text | 12.6 – 19.6:1 | `#111827` on white ≈ 16:1 (fine) |
| **Secondary / "muted" text** | **4.7 – 9.1:1** | `text-gray-400 #9CA3AF` = **2.54:1** (fails), `gray-500 #6B7280` = 4.83:1 (marginal) |
| Error text | 4.67 – 5.16:1 | `red-500 #EF4444` = **3.76:1** (fails AA for body) |
| Link | 6.08 – 9.16:1 | `blue-500 #3B82F6` = **3.68:1** (fails) |
| Focus indicator | 5.99 – 14.55:1 | a 2px `blue-500` ring at 3.68:1 |

**This is the single most transferable number in the file.** In this archetype the *weakest* text tier still passes AA at body size. There is no 2.5:1 "subtle" grey anywhere in any of these systems, because "subtle" is a synonym for "invisible to a 70-year-old on a glare-lit phone."

---

## The decisions that make it work

### 1. One question per page — and the label *is* the `<h1>`

**Observed:** GOV.UK's question-page pattern sets the `<label>` or `<legend>` as the page heading, styled `govuk-heading-l` (36/40 desktop, 27/30 mobile). On the error example I measured, `.govuk-fieldset__legend` renders at 36px w700 and *is* the `h1`. The design system states the reason: *"users of screen readers will only hear the contents once."*

**Why it works:** the question and the page title cannot drift apart, the `<title>`, the `h1`, the error-summary link text and the inline error all derive from one string, and there is exactly one decision on screen.

**Beats:** the AI default — a card containing eight labelled fields under a generic "Personal Information" heading, where the label is 14px grey above a 40px input.

**Does NOT apply when:** the user is an expert doing the same task repeatedly. GOV.UK says so explicitly: *"if you're designing an internal service for government users who need to repeat and switch between tasks quickly,"* group the questions and use a statement as the heading. One-thing-per-page is a rule for *the public's first and only encounter*, not for a claims adjuster's 40th form of the day.

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

**Does NOT apply when:** the field is free text of genuinely unknown length (address line 1, "describe your symptoms"), or in a dense internal table where column width is set by the grid.

### 6. The focus indicator is a block, not a ring

**Observed:** GOV.UK focus is `box-shadow: 0 -2px 0 0 #FFDD00, 0 4px 0 0 #0B0C0C` — the element sits in a yellow field with a 4px black underline, 14.55:1 against the focus text colour — plus `outline: 3px solid transparent` (invisible normally; becomes a real outline in Windows High Contrast / forced-colors). GCDS does the same idea differently: `--gcds-focus-background: #1354ec` with `--gcds-focus-text: #fff` — focus *inverts* the element. CMS picks `#bd13b8` magenta specifically so the focus colour is not confusable with primary blue, error red, warning yellow or success green. USWDS uses `4px solid #2491FF` at zero offset.

**Why it works:** a filled block survives being drawn over a photo, a coloured header, a dark card, and a user stylesheet. A 2px accent-coloured ring does not, and in a design where the accent is also the link colour, a focused link and an unfocused link look the same.

**Beats:** `focus:ring-2 focus:ring-blue-500` (3.68:1 against white) — the single most common AI-generated focus state, and it is not a compliant focus indicator.

**Does NOT apply when:** you are in a dark, dense operator UI where a yellow block would flash 40 times a minute during keyboard nav. Then invert: a light 2px inset border plus a background shift, still ≥3:1 against both adjacent surfaces. But it must never be *only* a colour change to the border.

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

**Does NOT apply when:** the message is genuinely disposable ("Copied"). Auto-dismiss is correct there — it's auto-dismiss on *actionable* messages that is the crime.

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

**Service unavailable.** Login.gov, caught live in maintenance: full-bleed `#112E51`, the logo, `<h1>` "Temporarily Down" at 32/40 w700 white, "Login.gov is temporarily down for maintenance." / "Please try back later.", and one underlined link — "Login Status". No illustration, no spinner, **no retry button**, and it renders without JavaScript because the app that would serve the JS is the thing that's down. Ship your down page as static HTML on a different origin.

**404.** Four in my sample, ranked.
- *Canada.ca* — best. `Page could not be found` / `Page introuvable` stacked at the same size and weight, red rule under the pair, one sentence of advice in each language, and `Date modified: 2026-09-09` at the bottom. It is bilingual because you cannot know which language the dead URL was in.
- *IRS* — competent: a red warning triangle, "Page Not Found." / "Error 404." / "Sorry, this page is not available." / "Please check the web address or try searching by the keyword below." + a search box. GOV.UK would strike the "Sorry"; the search box is the right call.
- *Nord* — minimal and correct: "Couldn't find it! This page may have been moved or deleted. Please double check the address or browse back to home page." + a "Go to home" button.
- *Epic* — a cartoon cow, "We've never *herd* of that link. Please keep 'er *moooo*vin' to another page." No search, no back link, no next step, set in a serif. This is the vendor whose EHR clinicians use six hours a day.

**Permission denied / blocked.** Zocdoc's bot-block, which I hit by accident, is better than most products' deliberate error pages: `Access is temporarily restricted` as the heading, then *"We detected unusual activity from your device or network"*, then a bulleted list of **probable causes** ("Rapid taps or clicks", "JavaScript disabled or not working", "Automated (bot) activity on your network (IP 73.158.164.19)", "Use of developer or inspection tools"), then `Need help? Submit feedback.` and `ID: 0cdbdd42-005a-bd71-9741-2c2b0d610b08`. Three moves worth copying: name the observed behaviour rather than the verdict, enumerate causes so the user can self-diagnose, and print a support ID they can quote.

**Ineligibility.** This is the state this archetype handles best and everyone else handles worst. GOV.UK's rule: ineligibility is **not** a validation error — *"take the user to a page that explains the problem… and provides useful information about what to do next."* HealthCare.gov does the softer version: a blue-bar notice **before** you invest effort — "Life changes? You can still get 2026 health insurance — You can enroll or change plans only if you have certain life changes, or qualify for Medicaid or CHIP" — so the user learns the gate exists before filling anything.

**Prefilled and uneditable data.** VA.gov, on collecting an SSN: *"When a user is authenticated, identity proofed, and we have their SSN on file… we should use that information and not allow the user to change the SSN in the form."* The field becomes displayed, locked data with a separate documented route to change it. Their "Help users to know when their information is prefilled" is a first-class pattern, not a tooltip.

**Zero data.** Nord ships `nord-empty-state` as a component with the same status vocabulary as everything else, so an empty patient list is styled by the system rather than improvised per screen.

**Too much data.** Nord's typography doc: *"our users can control the application layout width, meaning that a line length can not always be specified. For this reason, it's good practice to design for an ideal line length range"* — target 50–90 characters. CMS encodes the same as tokens: `--measure-narrow 45ex / --measure-base 65ex / --measure-wide 80ex`. Note `ex`, not `ch` — measured against x-height, which tracks actual legibility better across the font-size range.

**Offline / degraded.** Every page I measured in the government set renders and submits without JavaScript. GOV.UK's error summary, task list, tags and summary lists are server-rendered HTML with no client dependency; the only JS-dependent behaviour is progressive enhancement (focus management, the accordion). Design the failure of your JS bundle as a supported state, not an outage.

---

## Mobile

**Body text shrinks; the shrink is small and explicit.** GOV.UK: body 19 → 16px, `body-s` 16 → 14, `heading-xl` 48 → 32, `heading-l` 36 → 24. GCDS: body 20 → 18px, h1 41 → 37px. The headings drop 25–33%; the body drops one step and stops. Nobody ships a 12px mobile body.

**Primary action goes full-bleed; sized inputs do not.** Measured on the same GOV.UK page at 390px: `.govuk-button` 99px → **360px** (edge to edge), while the day/month/year inputs stayed 52/52/86px. The button becomes a thumb target; the field keeps its semantic width.

**Spacing halves, roughly.** `main` padding 40 → 20px; error-summary padding 20 → 15px; error-summary `margin-bottom` 50 → 30px; `heading-xl` `margin-bottom` 50 → 30px.

**Touch targets are honest about the trade-off.** The GOV.UK button measures 38px of box plus a 2px bottom shadow = **40px** of hit area — under the 44px iOS guideline. They know; the full-bleed width buys back the miss rate. VA.gov's nav links use `padding: 10px 15px` on 16/24 text = 44px. NHS buttons are 56px. Do not cargo-cult 44px onto a 19px full-width button and end up with a 60px slab; do not ship a 28px icon-only control either.

**Where this archetype admits it shouldn't go to mobile:** clinical worklists, air-ops boards and claims-adjudication screens. Nord says out loud that it is designed for *workstations*, and its 14px base, 52px top bar and 4/8/16/24/36/72 spacing are workstation numbers. The right mobile answer for those products is a deliberately narrower app — the three things you'd do standing up — not a responsive reflow of a 12-column grid.

---

## How this archetype fails

The bad imitation is recognisable in about two seconds. It has:

1. **A card.** Institutional forms are not in cards. GOV.UK, NHS and Canada.ca put the question directly on the page background at `border-radius: 0`. The moment you wrap a question in `rounded-xl shadow-lg border p-8`, you have added a frame that carries no meaning, consumed 64px of a 390px screen, and signalled "app" to someone who needs to be told "government record."
2. **Grey labels.** 14px `text-gray-500` above a 40px input with a `#E5E7EB` border. Every system I measured does the opposite: the label is the largest text on the page, the input border is 1–2px of **near-black** (`#0b0c0c`, `#262626`, `#4c6272`), and the "muted" tier is still 4.7:1 or better.
3. **Ring focus.** `focus:ring-2 ring-blue-500` at 3.68:1, which disappears on any coloured surface and is indistinguishable from a hover state.
4. **A toast.** Validation errors that appear in the corner and leave. No error summary, no inline messages, no anchor links, nothing for a screen reader to land on after submit.
5. **A stepper.** Numbered circles across the top of a flow whose length depends on eligibility answers, so it lies from step 2 onward.
6. **Icon-led severity.** ⚠️ 🚨 ❗ carrying the severity load, five near-identical ambers, and an emoji doing a job that inverted surface + literal words should be doing. NHS's emergency card has **no icon at all**.
7. **Personality in failure.** "Oops! Something went wrong 🙈". GOV.UK's banned-word list is explicit: no `forbidden`, `illegal`, `you forgot`, `prohibited`, no `please` (*"because it implies a choice"*), no `sorry` (*"because it does not help fix the problem"*), no `valid`/`invalid` (*"because they do not add anything"*), no `oops`, no error codes like `0x0000000643`.
8. **Uniform badge chrome.** 11px uppercase bold pills for every status. GOV.UK's tag is 19px, weight 400, sentence case, `border-radius: 1px` — and "Completed" gets no tag at all, because the *outstanding* items are the ones that need weight.
9. **Prose set at 16px in a 1200px column.** No measure constraint, 140 characters a line. The measured targets here are 50–90 characters (Nord), 65ex (CMS), and GOV.UK's two-thirds grid.
10. **Animation.** These systems ship 0.05s / 0.2s (Nord) and 250–800ms (CMS) and use them for drawers and dialogs. There are no entrance animations on form fields, no staggered fades, no hover lifts. A page that reflows while a user with a tremor is aiming at a radio button is a hazard.

The unifying diagnosis: **the imitation optimises the first impression; the real thing optimises the worst case.** Every decision above is legible as an answer to "what happens to the person for whom this goes wrong?"

---

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

**Mechanical conventions, and where they disagree.** Nord: *"always write it in sentence case, not title case"* and *"always end in punctuation."* GOV.UK: sentence case too, but hint text is *"a single short sentence, without any full stops."* Both are defensible; **pick one and encode it in the component**, because the failure mode is a product where half the hints have periods.

**Labels and optionality.** GOV.UK: *"Never mark mandatory fields with asterisks."* Mark the **optional** ones — append `(optional)` to the label, or to the `<legend>` for radio/checkbox groups. The asterisk convention makes the default state look like an exception and requires a legend to decode.

**Hint text has a hard ceiling.** One short sentence, and **no links inside it** — *"screen readers will read out the link text when describing the field, but usually do not tell users the text is a link."* If the explanation needs a paragraph, make the `h1` a statement ("Interview needs"), write the explanation as normal body copy, and put a short specific question in the label above the input.

**Allow "I don't know."** GOV.UK: *"allow users to answer 'I do not know' or 'I'm not sure' if they are valid responses."* An eligibility form that forces a guess produces a wrong record, and a wrong record in this archetype is a denied claim.

**Declarations, not tick-boxes.** GOV.UK's check-answers page ends with an `h2` "Now send your application", one sentence — "By submitting this application you are confirming that, to the best of your knowledge, the details you are providing are correct." — and a button labelled **"Accept and send"**. No "I agree" checkbox. The button label carries the consequence.

**Bilingual and translation.** Canada.ca ships `Noto Sans` for body specifically for orthographic coverage, sets body at 20px, and renders its 404 in both official languages simultaneously. HealthCare.gov and irs.gov both put the language switch in the **top-right header at the same weight as "Log in"** (`Español`), not in a footer dropdown. Two practical consequences for layout: your longest string is not the English one (French runs ~20% longer), so never size a button to its label; and the error-summary string is the one most likely to be machine-translated badly, so keep it to one clause.

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
- **https://nordhealth.design/components/nord-input/** — 144 `--n-*` custom properties including both `font-features` sets and the seven-status colour system.
- **https://design.cms.gov/components/text-field/** — 493 component-level tokens (`--alert-bar__width`, `--choice__size`, `--field-max-width`, `--measure-*`, `--color-focus-dark`).
- **https://www.healthcare.gov/see-plans/** — measured live: 48px w400 `#034866` h1, 2px black square inputs, `#12890E` button, `#DD3603` focus, the estimated-vs-final-price copy, the `Español` header link.
- **https://design.va.gov/components/form/text-input** and **/patterns/ask-users-for/social-security-number** — the `Ask users for… / Help users to…` taxonomy, `USE: DEPLOYED` status badges, the Deprecated shelf, the prefilled-SSN read-only rule.
- **https://design-system.alpha.canada.ca/en/components/input/** — 1,133 `--gcds-*` tokens: the 19-step hue ramps, the 20px body, the compressed heading scale, the filled focus block.
- **https://design-system.alpha.canada.ca/en/components/gcds-error-summary/** (served the 404) — the bilingual error page, screenshotted.
- **https://secure.login.gov/** — caught live in maintenance; the static down page, screenshotted and measured.
- **https://www.irs.gov/…** — served its 404 to my client; the federal identifier band and the 404 copy, screenshotted. `directfile.irs.gov` refused headless traffic entirely.
- **https://www.epic.com/software/** (404) — the cow, screenshotted.
- **https://www.zocdoc.com/search?…** — served a bot-block; the block page's cause list and support ID, screenshotted.
- **https://apps.apple.com/us/app/flighty-live-flight-tracker/id1358823008** — real in-product imagery: "5m Early · T3", "1h 20m UNTIL GATE ARRIVAL", the amber gate pill, "RUNNING LATE — 35m delay predicted due to late arriving aircraft".
- **https://www.hioscar.com/**, **https://www.onemedical.com/**, **https://ro.co/** — measured marketing type only (Oscar h1 72/70 w400; One Medical body 18/31.5 w200; Ro body "Ro Sans" 16/18.4). `hims.com` served a Cloudflare interstitial.
- Contrast ratios computed locally (WCAG 2.x relative luminance) from the measured hex values, including the Tailwind default comparisons.
