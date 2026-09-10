# Form and input craft

**Measured:** 2026-09, three passes. Every number was read off a live page's computed styles at 1440×1000 (Playwright, `getComputedStyle` + `getBoundingClientRect`) or quoted from shipped HTML. Products probed: **Stripe Checkout** (live embedded session), **Stripe Dashboard** signup, **GOV.UK Design System** (19 components, inside their own example iframes), **Mercury** (`demo.mercury.com`, signed in: settings and the full five-step send-money wizard), **Linear** (`linear.app/contact/sales`), **Vercel** (Geist tokens + live `vercel.com/login`), **Atlassian** textfield, **Ramp** signup, **shadcn/ui** (input and input-otp — what an agent actually reaches for).

**Re-probed 2026-09-10** (see *Direction pass* at the end): GOV.UK fixed-width scale, both GOV.UK selects, date input, character count, password input, file upload, button variants, error summary; shadcn input; `vercel.com/login`; `linear.app/contact/sales`. Corrections are folded into the tables below. Notion settings, Vercel project settings and Linear settings are behind logins; those notes are marked structure-only and carry no numbers.

---

## If you only apply five things

1. **One column. No exceptions except a genuinely paired field.** Stripe Checkout puts every field in a 378px single column — email, name, country, address, card — and splits horizontally exactly once, for expiry/CVC (173px + 173px). Ramp splits exactly once, for first/last name (290px + 290px). GOV.UK splits exactly once, for Day/Month/Year. If you cannot name the *pair*, do not split.
2. **Size every field to its content — selects included.** GOV.UK ships six fixed widths and uses them (re-measured 2026-09): 2 chars = **52.25px**, 3 = **71.25px**, 4 = **85.5px**, 5 = **104.5px**, 10 = **218.5px**, 20 = **389.5px**. A UK postcode field is 104.5px wide next to a 748px address line; their `Sort by` select is **218.5px** and their `Choose location` select **247px** — each sized to its own longest option, neither full width. The generated version makes all of them `w-full`, and that is the loudest single tell that no human laid out the form.
3. **Label above the field, 4–12px away, always visible.** Measured across the whole sample: Atlassian 4px, Stripe Checkout 4px, GOV.UK 5px, Linear 8px, Stripe Dashboard 9px, Mercury 12px. The gap scales with the label's size, and it is always far smaller than the gap between one field group and the next (GOV.UK: 5px inside a group, 30px between them — a 6:1 ratio). Nobody in this sample floats a label into the box. Placeholders are format examples (`1234 1234 1234 1234`, `MM / YY`, `For example, 27 3 2007`), never names.
4. **Do not validate on blur. Validate on submit.** GOV.UK's shipped guidance is literal: *"Do not validate when the user moves away from a field. Wait until they try to move to the next part of the service."* Measured on Stripe Checkout: typing a malformed email produced no error while the field was focused. The one legitimate live check is a hard limit you want to stop before it's wasted — GOV.UK's character count is their named exception.
5. **Set `autocomplete`, `inputmode`, and `type` on every field that holds the signed-in user's own data.** Stripe Checkout's ZIP field carries `autocomplete="shipping postal-code"` **and** `inputmode="numeric"` **and** a `--tabularnums` class. Nobody at that level ships a bare `<input type="text">`. The scope matters: `autocomplete` tokens mean *"this is the browser owner's name/address/card"*. On a field holding a **third party's** data (a payee, a patient, a lead) or on a **shared device**, the same token fills the operator's details into someone else's record — Stripe's own phone country-code `<select>` carries `autocomplete="never-autocomplete-country-code"`, a deliberately invalid token, for exactly this reason. Ask whose data the field holds; that answer decides the attribute.

---

## The measured reference table

### Input geometry, real products

`h` = measured height. `pad` = computed padding. Border/ring is what actually draws the edge — several of these products draw no `border` at all.

| Product / surface | h | Font | pad | radius | Edge | Focus |
|---|---|---|---|---|---|---|
| **Stripe Checkout** (embedded) | **44px** | 16/24 w400 `-apple-system` | `8px 12px` | 6px | `box-shadow: 0 0 0 1px #e0e0e0, 0 2px 4px rgba(0,0,0,.07), 0 1px 1.5px rgba(0,0,0,.05)` — **no `border`** | `0 0 0 1px #3297d3, 0 1px 1px rgba(0,0,0,.07), 0 0 0 3px rgba(50,151,211,.9)` |
| **Stripe Dashboard** signup (text) | 40px | 14/20 **w300** Söhne | `4px 8px` | 4px | no border or shadow *on the input* — chrome drawn by its wrapper | — |
| **Stripe Dashboard** signup (password) | 44px | 16/24 w400 | `8px 12px` | 6px | `… 0 0 0 1px #d4dee9 …` | `box-shadow .24s` |
| **GOV.UK** text input | **40px** | 19/25 w400 GDS Transport | `5px` | **0px** | `2px solid #0b0c0c` | `--govuk-focus-colour: #fd0` (yellow block) |
| **GOV.UK** textarea | **132.75px** (`rows=5`) | 19/**23.75** w400 | `5px` | 0px | `2px solid #0b0c0c` | same |
| **Vercel Geist** small | **32px** | 14/20 w400 Geist | `0 12px` | 6px | `--ds-shadow-border-base: 0 0 0 1px #00000014` | `--ds-focus-border: 0 0 0 1px #00000057, 0 0 0 4px #00000029` |
| **Vercel Geist** default | **36px** | 14/20 w400 | `0 12px` | 6px | same | same |
| **Vercel Geist** large | **40px** | 16/24 w400 | `0 12px` | **8px** | same | same |
| **Vercel Geist** select | 32 / 36 / 40 | 14/20 · 14/20 · 16/24 | `0 36px 0 12px` (chevron gutter); `0 36px 0 40px` with leading icon | 6 / 6 / 8 | same | `box-shadow .2s cubic-bezier(.4,0,.2,1)` |
| **Ramp** signup | input element measures 24px; visible chrome is on a wrapper I did not isolate | 16/24 **w300** Lausanne | `0` | 0px | — | — |
| **shadcn/ui** default | **32px** (`h-8`) | 14/20 w400 (`text-base md:text-sm`) | `4px 10px` (`px-2.5 py-1`) | **10px** (`rounded-lg`) | `1px solid var(--input)` on `bg-transparent`; **`box-shadow: none` at rest** | `ring-[3px]` utility on focus-visible |
| **Mercury** send-money (money, date, combobox) | **40px** | 15/24 w400 Arcadia Text | `7px 11px` | 8px | `1px solid rgba(112,115,147,.16)` on `bg #FBFCFD` | border → `#5266EB`; **the label recolors too** (see below) |
| **Mercury** account picker (rich select) | **68px** | 13/20 + 15/24, two lines | `0` (inner rows) | 8px | same hairline on `#FBFCFD` | indigo border + halo |
| **Linear** `contact/sales` (dark) | **40px**, 607px wide | 14/21 w400 Inter Variable, **`letter-spacing: normal`** | `0 10px` | **8px** | `1px solid rgba(255,255,255,.05)` on `bg rgba(255,255,255,.05)` | — |
| **Linear** textarea, same form | **106px** | 14/21 w400 | `10px 12px` | 8px | same | — |
| **Atlassian** textfield | **36px** | 14/20 w400 Atlassian Sans | `8px 6px` | 0px on the input; chrome on the wrapper | wrapper-drawn | — |
| **Vercel** `/login` email | **40px** | **16/24** w400 GeistSans | `0 12px` | 0px on the input (8px on the wrapper) | wrapper-drawn | Geist focus ring |
| **GOV.UK** select (`Sort by`) | 40px | 19 w400 | `5px` | 0px | `2px solid #0b0c0c` | yellow block |

Two things to take from that table. **Mercury's whole product runs on one 40px input** — money, dates, comboboxes and rich 68px account pickers all share the same hairline, radius and `#FBFCFD` fill, so the money field is not visually special even though it is the most consequential field in the app; the *label* and the affix carry that job instead. And **Vercel and Atlassian both put zero radius and zero border on the `<input>` itself** and draw all the chrome on a wrapper — which is why copying an input's computed style from a real product and pasting it into a bare `<input>` gives you a borderless box and makes you think you measured wrong.

Read the spread: **32–44px** is the entire working range. 32/36px is a dense app control (Vercel, shadcn). 40px is the general-purpose default (GOV.UK, Linear, Stripe Dashboard). 44px is what a *payment* form uses (Stripe Checkout) — deliberately at the iOS touch-target minimum because half the traffic is a thumb on a phone. Nothing in the sample ships a 56px input outside a marketing hero.

### Label, hint, error — the vertical stack

| Product | Label | Label→input gap | Hint / help | Error text | Field pitch |
|---|---|---|---|---|---|
| **Stripe Checkout** | 16/20.8 w400 `rgba(26,26,26,.9)` **13.03:1** | **4px** | — (uses placeholders as format examples) | **13**/16.9 w400 `#DC2727` **4.81:1** | 16px between groups |
| **Stripe Dashboard** | 14/20 w400 `#1A1F36` **16.2:1** | **9px** | — | — | 17px (input bottom → next label top) |
| **GOV.UK** (standard) | 19/25 w400 `#0b0c0c` **19.59:1**, `margin-bottom: 5px` | **5px** | 19/25 `#484949` **9.03:1**, `mb: 10–15px` | 19/25 **w700** `#CA3535` **5.16:1**, `mb: 15px` | `.govuk-form-group { margin-bottom: 30px }` |
| **GOV.UK** (label as page heading) | **36/40 w700** inside `<h1>`, `mb: 15px` | 15px | same | same | 30px |
| **Mercury** settings | 16/16 w360 Arcadia primary | n/a (read-only row) | **13/20** w400 `#535461` **7.48:1**, in a 296px left column | — | 1px rule between rows |
| **Vercel Geist** checkbox | 13/19.5 w400 | — | — | linked via `aria-describedby="…-error"` | — |
| **Mercury** send-money form | 13/20 w400 `#535461` **7.48:1**; **13/20 w480 `#5266EB` 4.71:1 when the field is focused** | **12px** | **below** the input, 12/20 `#70707D` **4.88:1**, id `<field>-helptext` | — | 88px (label top → next label top) |
| **Linear** `contact/sales` | 14/21 w400 **`#8A8F98` — secondary, not primary**, **6.13:1** on `#08090A` | **8px** | — | — | **24px** input bottom → next label top |
| **Atlassian** textfield | **12/16 w653** `#505258` **7.81:1** | **4px** | — | — | — |

Three things to steal. **One:** Mercury moves the *label* on focus, not the field — the 13px label goes from `#535461` w400 to `#5266EB` w480 while the input's border picks up the same indigo. Two elements change, both by colour only, nothing moves, and the eye lands on the field's *name* rather than its box. Cheaper than a 4px glow and it survives a low-contrast display. **Two:** Linear sets the label in *secondary* text color (`#8A8F98`, ~6:1 on their dark ground) and the input value in primary white — the value outranks its own label, which is correct, because the value is the content. Stripe and GOV.UK do the opposite (label at 13–19:1). Both work; what doesn't work is label and value at the *same* weight and color, which is what a default `<label>` + `<input>` gives you. **Three:** GOV.UK's error message is the only text on the page at **w700** — bold is doing the signalling as much as the red is, which is what makes it survive a monochrome or color-blind read.

### GOV.UK's fixed-width scale, measured

19px GDS Transport, `padding: 5px`, `border: 2px` → 14px of chrome per field.

| Class | Measured width | Content box | Per character | Used for |
|---|---|---|---|---|
| `govuk-input--width-2` | **52.25px** | 38.25px | 19.1px | Day, Month |
| `govuk-input--width-3` | **71.25px** | 57.25px | 19.1px | — |
| `govuk-input--width-4` | **85.5px** | 71.5px | 17.9px | Year |
| `govuk-input--width-5` | **104.5px** | 90.5px | 18.1px | UK postcode |
| `govuk-input--width-10` | **218.5px** | 204.5px | 20.45px | Phone, reference numbers |
| `govuk-input--width-20` | **389.5px** | 375.5px | 18.8px | Names |
| `govuk-!-width-one-quarter` … `-full` | 187 / 249.3 / 374 / 498.6 / 561 / **748** | — | — | Fluid, for address lines and free text |

**The derived rule:** budget **~1em per character** of expected content, plus your horizontal padding and borders. At a 19px font that's 19px/char; at 14px it's 14px/char. A digit in Inter is 0.61em wide, so 1em/char is ~1.6× the actual glyph width — deliberate slack so a full value never crowds the edge. A 5-digit US ZIP at 14px/`0 12px` padding/1px border wants **~96px**, not 400px.

### Grouped-stack radii — how Stripe joins fields into one control

Measured on the live embedded checkout. Address group (378px wide):

| Field | `border-radius` |
|---|---|
| `#shippingName` (top) | `6px 6px 0 0` |
| `#shippingCountry` (middle) | `0` |
| `#shippingAddressLine1` (bottom) | `0 0 6px 6px` |

Card group (346px wide):

| Field | width | `border-radius` |
|---|---|---|
| `#cardNumber` | 346px | `6px 6px 0 0` |
| `#cardExpiry` | 173px | `0 0 0 6px` |
| `#cardCvc` | 173px | `0 0 6px 0` |

Every member keeps the same 1px shadow-ring, so adjacent rings overlap into a single hairline. The result reads as one bordered card with internal rules — three inputs, one perceived object, **one** label above it (`Shipping address`, `Card information`) and **one** error message below it.

### Choice controls, hit targets and joined groups, measured

Checkboxes, radios, switches and OTP boxes are where generated forms leak accessibility, because the visual is 16px and the target is 16px.

| Product | Control | Visual | **Target** | Label | Gap between items |
|---|---|---|---|---|---|
| **GOV.UK** | checkbox | 40×40 drawn | **44×44 input**, row 44px tall | 19/25, `padding: 7px 15px`, starts at x=+44 | **10px** |
| **GOV.UK** | radio | 40×40 drawn | **44×44 input** | same | 10px |
| **Mercury** | radio (Person / Business) | 18×18 | **the whole 117–130×50 card** (width fits the label): `bg #FBFCFD`, `1px solid rgba(112,115,147,.16)`, `r8`, `padding 12px 18px` | 15/24 inside the card | 8px between cards |
| **Mercury** | switch (`Repeat this payment`) | **40×20**, `r10` | 40×20 + the 140px label to its right | 15/24 `#535461` | — |
| **Stripe Checkout** | checkbox (`Billing info is same as shipping`) | 16×16, checked by default | whole row | — | — |
| **shadcn/ui** | OTP slot | 32×32 | the *hidden real input* spans all six | — | 0 (borders shared) |

Two decisions live in that table. **GOV.UK pads the target out to 44px and leaves the drawing at 40px** — the extra 4px is invisible and is the difference between a control a thumb can hit and one it can't. **Mercury turns a 2-option radio group into two 50px-tall cards** — same semantics, ~7× the target area, and it reads as a segmented choice rather than as a form field. Use the card form when there are 2–4 options with short labels; use GOV.UK's row form when there are 5+ or the labels wrap.

### The OTP component, dissected (shadcn `input-otp`, measured)

Six boxes are usually a mistake. shadcn's is built the one way that isn't, and the mechanism is not obvious:

- **One real `<input>`** spans the whole 192px group: `autocomplete="one-time-code"`, `inputmode="numeric"`, `font-variant-numeric: tabular-nums`, `color: transparent`, and `letter-spacing: -16px` at `font-size: 32px` — the value is *actually there* for paste, autofill, backspace and screen readers, it is simply invisible.
- **Six 32×32 `<div>` slots** render the characters, and are pure presentation.
- The slots are joined the way Stripe joins address fields: first slot `border-radius: 10px 0 0 10px`, last `0 10px 10px 0`, middle `0`; borders are `1px 1px 1px 0` on every slot after the first so adjacent edges never double into 2px.
- The separator variant splits 6 into 2+2 or 3+3 groups by inserting a dash, which is how the code arrives in the SMS.

If you cannot afford that machinery, ship **one plain input** sized to the code (`~6em` + padding), tabular figures, `autocomplete="one-time-code"`. Never ship six `<input maxlength="1">` elements with `onKeyUp` focus-advance: paste dies, backspace dies, and a screen reader announces six unlabelled fields.

### Attribute discipline, Stripe Checkout (read off the live DOM)

| Field | `type` | `autocomplete` | `inputmode` | placeholder | other |
|---|---|---|---|---|---|
| Email | `text` | `email` | `email` | `email@example.com` | — |
| Full name | `text` | `shipping name` | — | `Full name` | — |
| Country | `select` | `shipping country` | — | — | — |
| Address | `text` | `shipping address-line1` | — | `Address` | — |
| Address 2 | `text` | `shipping address-line2` | — | `Address line 2` | hidden until expanded |
| City | `text` | `shipping address-level2` | — | `City` | — |
| State | `select` | `shipping address-level1` | — | — | — |
| ZIP | `text` | `shipping postal-code` | **`numeric`** | `ZIP` | `.CheckoutInput--tabularnums` |
| Card number | `text` | `cc-number` | **`numeric`** | `1234 1234 1234 1234` | `--tabularnums`; `padding-right: 132px` to clear a 120px brand-icon strip |
| Expiry | `text` | `cc-exp` | **`numeric`** | `MM / YY` | — |
| CVC | `text` | `cc-csc` | **`numeric`** | `CVC` | — |
| Phone | `text` | `tel` | — | `(201) 555-0123` | 32px country-code `<select>` inline, left |
| Phone country code | `select` | **`never-autocomplete-country-code`** | — | — | intentionally poisoned |

Note what is *not* there: no `type="number"` anywhere, and no `type="tel"` on the phone field either — `type` stays `text` and `inputmode` does the keyboard work. GOV.UK ships the same combination in its date input: `type="text" inputmode="numeric"`.

### GOV.UK error components, measured

| Piece | Value |
|---|---|
| Error summary box | `border: 5px solid #CA3535`, `padding: 20px`, `margin-bottom: 50px` |
| Summary title | `There is a problem` — 24/30 w700, `margin-bottom: 20px`, inside `<div role="alert">` |
| Errored form group | `border-left: 5px solid #CA3535; padding-left: 15px` |
| Errored input | `border: 2px solid #CA3535` (from `#0b0c0c`) |
| Inline message | `<p class="govuk-error-message">` 19/25 **w700** `#CA3535`, `mb: 15px`, prefixed `<span class="govuk-visually-hidden">Error: </span>` |
| Wiring | `aria-describedby="passport-issued-hint passport-issued-error"` — hint **and** error, hint first |
| Focus colour | `--govuk-focus-colour: #fd0` |

### Buttons and submit rows

| Product | Submit | Secondary | Notes |
|---|---|---|---|
| **Stripe Checkout** | 378×**55**, r6, `#0073E6`, `inset 0 0 0 1px rgba(50,50,93,.1), 0 2px 5px rgba(50,50,93,.1), 0 1px 1px rgba(0,0,0,.07)`, `transition: transform .15s` | — | Full column width |
| **GOV.UK** | 174.03×**38**, r**0**, fill `#0F7A52` with `box-shadow: 0 2px 0 #083D29` (a solid 2px "lip", not a blur), `padding: 8px 10px 7px`, `mb: 32px` | `Save as draft` 129.5×38, `#F3F3F3` with a `#858686` lip | `--warning` = **white on `#CA3535`**, lip `#651B1B`, 149.7×38 — same height, colour does the work. `--start` is the one exception at **157.7×43, 24px** |
| **Linear** (marketing) | 134×44, r9999, 13px **w510**, left-aligned | — | Width fits the label |
| **Ramp** | 704×**56**, r0, `#E4F222` | — | Full width |
| **Stripe Dashboard** | 444×36, r4 | — | Full width |
| **Mercury** wizard footer | `Next` 109×**40**, r**9999**, `#5266EB` → `#465BD1` under the pointer, `padding: 8px 28px 8px 32px` (asymmetric — the chevron eats the right side) | `Back` / `Go back` 110–122×40, r9999, `rgba(112,115,147,.1)`, same height | Both sit in a sticky footer above a hairline, **left-aligned with the 560px form column at x=440**, not right-aligned to the viewport |
| **Vercel** `/login` | 320×**40**, r8, `#171717`, 16/24 w500 | Six more identical 320×40 r8 white boxes: Google, GitHub, **ChatGPT**, SAML SSO, Passkey, `Show other options` | Seven buttons, one size — the primary is distinguished **only** by fill |

---

## The decisions

### Single column, and the three real exceptions

Two-column forms cost you the reading path. The eye finishes field 1 (left) and has to decide whether field 2 is to the right or below; every field re-poses the question. Measured evidence that the good products know this: Stripe Checkout is 378px wide on a 1440px viewport — it does not expand to fill. GOV.UK's form column is two-thirds of its grid and never wider — 748px as measured inside the design system's 809px example iframe, **630px** on a real service page, where `main` is 960px at a 1440px viewport (re-measured 2026-09; see [`../archetypes/institutional-civic.md`](../archetypes/institutional-civic.md)).

Split horizontally only when the two fields are **one fact the user holds as one fact**:

- **First / last name.** Ramp: 290px + 290px with a 70px gutter inside a 704px form. One name, two boxes.
- **Expiry / CVC.** Stripe: 173px + 173px under a 346px card number, all three joined into one card.
- **Day / Month / Year.** GOV.UK: 52.25 + 52.25 + 85.5 with their own tiny labels, inside one `<fieldset>` with one `<legend>`.

Everything else — city and state, email and phone, amount and currency — goes on its own row. The AI default is a `grid grid-cols-2 gap-4` wrapper around whatever fields happen to be adjacent, which produces "Email | Phone" side by side and a 400px-wide ZIP code. That is the generated look.

**When two columns are actually right:** a settings *page* (not a form) where the left column is label + explanation and the right is the current value. Mercury's company profile does exactly this — 296px label column at x=346, values at x=722. But note that's a definition list, not a form: see *Settings pages* below.

### Field width is the highest-signal decision you make

Do it per field, before you write any CSS. Write down the *maximum* content each field will hold, then apply ~1em/char + padding:

| Field | Expected content | Width at 14px/`0 12px`/1px |
|---|---|---|
| Day, Month, CVC, 2-digit anything | 2 | ~54px |
| Year, US ZIP+0, expiry `MM / YY` | 4–5 | ~82–96px |
| UK postcode | 8 incl. space | ~138px |
| Phone | 14 | ~222px |
| Email, name, company | 30+ | full column |
| Address line 1 | 40+ | full column |
| Street/City | 20–25 | full column is fine — it's prose-shaped |

**Selects obey the same rule and are missed even more often — including by products that get everything else right.** Measured on `linear.app/contact/sales` (2026-09-10): three text fields and a `Company size` select, and the select is **607px**, the same full-column width as `Tell us about your requirements`, for options like `1-10`. Linear sets `autocomplete="name"` and `autocomplete="email"` correctly, puts every label 8px above its field, and writes three real placeholder examples — and still ships a 607px dropdown for a two-character answer. This is the easiest rule to skip and the easiest to spot.

Two GOV.UK selects in the same 748px column measure **218.5px** (`Sort by`, longest option `Recently published`) and **247px** (`Choose location`, longest option `Yorkshire and the Humber`) — same component, different widths, each sized to its own longest option. A country select needs ~300px; a `Yes/No` select needs ~90px and probably shouldn't be a select at all. The generated default makes every `<select>` `w-full`, which is how you get a 640px-wide dropdown containing the word `USD`.

The nuance most people miss: **short fields do not need to be the same width as each other.** GOV.UK's Day is 52.25px and its Year is 85.5px, sitting side by side. Making them equal (a `grid-cols-3`) would be *more* symmetric and *less* informative — the widths are telling you how many digits go in each box before you read the label.

**When to ignore this:** dense settings tables and inline-edit grids where every control shares a column, and a ragged right edge would read as a layout bug rather than as information. Vercel's Geist docs show every input at the same 178px in the size comparison for the same reason. If the fields are in a *table*, align them; if they're in a *form*, size them.

### Label placement: top-aligned, and why floating labels are usually wrong

Every product measured puts the label above the field. Nobody floats. The gap is 4–9px — tight enough that the label is unambiguously bound to the field below it, not to the one above.

Left-aligned labels (label in a column to the left of the input) are a legacy of desktop-database UI. They cost horizontal space, force the input column narrow, and break entirely at 390px. Skip.

**Floating labels** — the label that starts as a placeholder and animates to a small caption inside the box on focus — fail for four specific reasons, in order of severity:

1. **The resting state is a placeholder.** Before the user focuses, the field is labelled by grey text that disappears the moment they start typing. Anyone who is interrupted mid-form, comes back, and looks at a filled form has no labels at all. This is the same failure as a bare placeholder, just deferred.
2. **The floated label is too small to read.** To fit inside the box it typically shrinks to 11–12px, at the same 400 weight as the value. Compare the measured set: GOV.UK's label is **19px**, Stripe Checkout's **16px**, Linear's and Vercel Geist's **14px**, Mercury's **13px**. The one genuine 12px label in the sample is Atlassian's — and it is **12/16 at weight 653** in `#505258` (**7.81:1**), against a 14px w400 value. That is the deal: below 13px a label has to buy back its legibility with weight and contrast, and a floated label sitting *inside* the field at w400 in grey never does. If you want a small label, copy Atlassian's numbers, not the float.
3. **It fights browser autofill.** Chrome fills a field without firing the events some float implementations listen for, so the label sits on top of the value. Stripe works around autofill so aggressively that its input transition string literally reads `box-shadow 0.08s ease-in, color 0.08s ease-in, **filter 50000s**` — a 50,000-second transition on `filter` used to defeat Chrome's autofill background repaint.
4. **It removes the hint slot.** Once the label is inside the box, there is nowhere for the 19px hint line that GOV.UK puts under a third of its labels — and hints prevent more errors than any validation does.

**When floating labels are acceptable:** a single-field surface where the label is redundant to context and vertical space is genuinely scarce — a search bar in a toolbar, an amount field in a compact money-transfer sheet. Not a 12-field application form.

### Required vs optional: mark the minority

GOV.UK's shipped guidance is unambiguous: *"in most contexts, add '(optional)' to the labels of optional fields… Never mark mandatory fields with asterisks."*

The logic is arithmetic. In a form where 11 of 12 fields are required, asterisking the required ones puts 11 asterisks on the page and communicates nothing; the one unmarked field is what carries information, and it's marked by absence, which nobody notices. Marking the one optional field puts one mark on the page and it is exactly the piece of information the user needs.

Flip it if the ratio flips. In a settings form where 2 of 15 fields are required, mark those two — with the word `Required`, not an asterisk. An asterisk is a footnote glyph with no meaning to a screen reader unless you also ship "fields marked * are required" legend text, and the legend is above the fold on a form the user scrolled past.

Where to put it: **in the label text**, not in a badge. `Company name (optional)` at the same size and color as the rest of the label. Not `Company name` + a grey pill.

### Help text vs placeholder — the full case

A placeholder is a value that isn't there: drawn in the value's position, in the value's font, gone when the value arrives. Every rule below follows from that.

**Placeholders cannot be labels because:**
- They disappear on input, so a filled form loses its labels — the exact moment a user re-reads a form is when they're checking their answers before submitting.
- They are low-contrast by construction. Stripe's is `rgba(26,26,26,.6)` = **4.57:1** — barely over AA, and Stripe is the *careful* end of the range. The common `#999` is **2.85:1** and fails.
- Users mistake them for filled values and skip the field.
- Some screen reader / browser combinations announce them, some don't, and none announce them reliably as the field's name.

**What placeholders are actually for — format examples.** Look at what Stripe puts in them: `1234 1234 1234 1234`, `MM / YY`, `(201) 555-0123`, `email@example.com`. Every one of those is a *shape*, not a name. The name is in the label above (`Card information`, `Email`). This is the correct use and it's a good one: the format example sits exactly where the user's eyes and cursor already are.

The second correct use is a *specific* example that shows the shape of an acceptable answer. Linear's sales form, measured live: `Full name` → `Kevin Flynn`, `Work email` → `kevin@encom.com`, `Tell us about your requirements` → `I'm interested in Linear for my team...`. Three real strings, written by a person, none of them `Enter your full name` restating the label. If your placeholder is the label again, delete it.

**An honest counterexample, measured.** `vercel.com/login` ships a single 320×40 email field with `placeholder="Email Address"` and **no visible label** — a company with one of the most disciplined design systems in the industry taking the shortcut this document tells you not to take. It survives for the exact reasons the exception allows: one field, on a page whose `<h1>` already says what it is, with a submit button reading `Continue with Email` 16px below it. Nothing is lost when the placeholder disappears, because there is nothing to confuse it with. Take that as the boundary of the exception, not as permission: the same shortcut in Vercel's own project-settings forms would be indefensible.

**When you need a persistent explanation, use hint text.** GOV.UK's hint sits between the label and the input, 19/25 at `#484949` (**9.03:1** — note it's *not* faint), with `margin-bottom: 10–15px`, and is wired in via `aria-describedby`. A real example from their shipped HTML: label `National Insurance number`, hint `It's on your National Insurance card, benefit letter, payslip or P60 – for example, 'QQ 12 34 56 C'`. That hint is longer than the label and it belongs there, because it eliminates the error instead of catching it.

Mercury's settings help text is the same idea at a smaller scale: 13/20 at `#535461` (**7.48:1**), in a 296px column, e.g. *"This is the name that appears on Mercury and in your notifications."* — it explains the *consequence* of the field, not its format.

Mercury's send-money form is the clean demonstration of the split, all of it measured at 12/20 `#70707D` (**4.88:1** — the weakest text in their form, and the floor you should treat as a hard minimum at 12px), each wired by an id of the form `<field>-helptext`:

| Field | Help text | What it's doing |
|---|---|---|
| `Email (optional)` | `For payment receipts` | why you'd fill it in |
| `Nickname (optional)` | `For your reference only - not visible to the recipient` | who else sees it |
| `Payment method` | `0-1 business days · No fee` | the consequence of the *choice* |
| `Send on` | `Payment expected to arrive in 0-1 business days` | the consequence of the *value* |

None of them describe a format. Notice also that Mercury marks `(optional)` in the label text, at the same size and colour as the label — a commercial product independently arriving at GOV.UK's rule.

**Below-field help** is for a consequence that only matters after entry ("We'll email a receipt here"). **Above-field hint** is for anything that shapes what they type. If in doubt, above.

**Where "hint above" stops working:** a field that repeats. Twenty invoice line items, each with `Description`, `Quantity`, `Unit price` — a 19/25 hint above every input adds ~35px × 20 rows and turns a scannable grid into six screens. In a repeating structure the hint belongs **once**, in the column header or a single line above the whole array, and the per-row field gets nothing. Same rule for a filter bar and for an inline-edit table. Hint-above assumes each field is asked once.

### Grouping and sectioning

Three mechanisms, in increasing strength. Use the weakest one that works.

1. **Spacing alone.** GOV.UK: 30px between form groups, 0 extra between the label/hint/input inside one. That 30px vs. 5px ratio is 6:1 and it is enough to group without any border.
2. **A `<fieldset>` with a `<legend>`.** When several inputs answer one question. GOV.UK's date input: one legend (`When was your passport issued?`), one hint (`For example, 27 3 2007`), three labelled inputs. The legend is the accessible group name; the tiny `Day`/`Month`/`Year` labels are the field names.
3. **A joined visual stack.** Stripe's radius trick above. Reserve this for fields that are *one* value in the user's head — an address, a card. Do not join "Email + Password"; those are two facts.

For a long form, section headings between groups. GOV.UK's Mercury-scale equivalent is one question per page (below); Mercury's settings pages use an `h2` at 19/28 w400 with rows beneath. Note that heading is *lighter* than the page `h1` (28/36 w380) but the same weight class — sectioning by size, not by adding a rule and a box.

**A caution about card-per-section.** Wrapping every group in a bordered card is the generated default and it's usually wrong at 4+ sections: you get a page of identical rounded rectangles with no hierarchy between them. Mercury uses cards for exactly three notification categories (312×136, r12, `padding: 20px`) at the top of the page, then switches to plain 950×68 rows with hairline rules for the other twelve. Cards mark the *few* things worth marking.

### Input types, `inputmode`, `autocomplete`

**`type`.** Use `email`, `url`, `tel`, `password`, `file`, `date` where the browser behaviour is what you want. **Do not use `type="number"`** for anything that isn't a true quantity you want spinners on: it silently drops leading zeros, rejects pasted values with spaces or hyphens, adds scroll-to-change (which corrupts values when a user scrolls the page over the field), and behaves differently across locales. Both Stripe and GOV.UK ship `type="text" inputmode="numeric"` for card numbers, ZIPs, and dates. Copy that.

**`inputmode`** picks the mobile keyboard without changing validation or parsing: `numeric` (digits only, no `+`/`-`), `decimal` (adds the locale separator — use for money), `tel` (the phone keypad with `+*#`), `email`, `url`, `search`. Stripe sets `inputmode="numeric"` on four fields and `inputmode="email"` on one. This is a two-word change that removes a keyboard-switch tap on every mobile session.

**`autocomplete`** is the one that actually saves the user thirty seconds. The tokens that matter:

```
name  given-name  family-name  organization
email  tel  tel-national  tel-country-code
street-address  address-line1  address-line2
address-level2 (city)  address-level1 (state/province)  postal-code  country  country-name
cc-name  cc-number  cc-exp  cc-exp-month  cc-exp-year  cc-csc  cc-type
username  current-password  new-password  one-time-code
bday  bday-day  bday-month  bday-year
```

Two mechanics people get wrong:

- **Section prefixes.** When a page has two addresses, prefix with `shipping ` or `billing ` — Stripe ships `autocomplete="shipping address-line1"`. Without the prefix the browser fills one address into both.
- **`new-password` vs `current-password`.** `new-password` tells the password manager to *offer to generate*; `current-password` tells it to *fill*. Stripe Dashboard's signup and Ramp's both use `new-password`. Getting this backwards is why some signup forms get the user's existing password autofilled into the "choose a password" box.
- **`one-time-code`** on the OTP field enables the iOS/macOS SMS autofill suggestion. This is free and almost never present in generated code.

WCAG 2.2 SC 1.3.5 (*Identify Input Purpose*) makes `autocomplete` on personal-data fields a legal requirement in a lot of jurisdictions, which is worth knowing if the form is going anywhere near a public sector or enterprise procurement.

**When to suppress autofill:** when the field holds data that is not the browser owner's. Three concrete cases: a **recipient/payee** form in a banking or invoicing product (autofilling *your* name into `Recipient name` is a wrong-account wire waiting to happen); a **back-office record** where staff type a customer's address on their own machine (the token both fills the wrong address and teaches Chrome to offer that customer's data to the next one); a **shared or kiosk device**. In all three, use an unrecognised token per field — `autocomplete="off"` is ignored by Chrome for anything it recognises, which is why Stripe ships `autocomplete="never-autocomplete-country-code"` rather than `off`. Everywhere the field really does hold the signed-in user's own data, the tokens are mandatory.

### Validation timing

The rule, from GOV.UK's shipped validation pattern:

> *"Do not validate when the user moves away from a field. Wait until they try to move to the next part of the service — usually by clicking the 'continue' or 'submit' button at the bottom of the page."*

and

> *"Generally speaking, avoid validating the information in a field before the user has finished entering it. This sort of validation can cause problems — especially for users who type more slowly."*

and, bluntly:

> *"Turn off HTML5 validation… add `novalidate` to your form tags. Do not add `required` to your input fields."*

That last one is the most contrarian thing in this document and it is correct for the reason they give: you cannot style, position, or word the browser's native bubble, and you cannot make it read consistently across screen readers. Ship `novalidate` and own the messages. (Keep `required` if you're *only* using it for `aria-required` semantics and you've turned validation off — but GOV.UK's position is to drop it, and their reasoning is that they haven't found research showing screen reader users are harmed by its absence when the error handling is right.)

**Measured on Stripe Checkout**, which is not a government form and does validate client-side: typing `notanemail` produced **no** error while the field was focused. The error appeared only after focus had moved on. So even the aggressive end of the industry holds to "never while they're typing in this field."

**The refinements that are actually safe:**
- **Re-validate on change *after* the field has already errored.** Once you've told someone their email is wrong, clearing the error as soon as it becomes right is a kindness, not an interruption. Validate-on-blur-then-live-on-input.
- **Live count for a hard limit.** GOV.UK's own named exception, and the wiring is the opposite of what most people assume. Measured: the **visible** `.govuk-character-count__message` reads `You can enter up to 200 characters` at rest (19/25, `#484949`, under a 132.75px `rows=5` textarea) and switches to `You have N characters remaining` as you type. A second, visually-hidden `.govuk-character-count__sr-status` holds the remaining-count string and is announced on a debounce, not per keystroke. Ship both elements; announcing the visible one live is what makes a screen reader read a number on every key. Their justification: *"it's important that users do not spend time and effort writing out a response that turns out to be too long."*
- **Async availability checks** (username taken, domain unreachable) fire on blur or debounce, never on keystroke, and must show a pending state — otherwise the field flickers between "fine" and "taken" as the user types.

**Be forgiving about input, not strict.** GOV.UK: *"Use validation to ignore unwanted characters"* — spaces in postcodes and card numbers, hyphens in phone numbers, stray whitespace from a paste, punctuation inserted by dictation software. Strip it server-side. A form that rejects `4242 4242 4242 4242` because of the spaces it *told the user to type via its own placeholder* is a bug.

### Message wording

These are GOV.UK's shipped rules and their own examples.

**Match the label.**
- Label `How many hours do you work a week?` → `Enter how many hours you work a week`
- Label `Address line 1` → `Enter address line 1, typically the building and street`

**Don't say:** `please` (implies a choice), `sorry` (doesn't fix anything), `valid` / `invalid` (adds nothing), `forbidden`, `illegal`, `prohibited`, `you forgot`, `oops`, or any error code.

**Don't be general.** These are all listed as things to avoid: `An error occurred`, `Answer the question`, `Select an option`, `Fill in the field`, **`This field is required`**. That last one is the single most common string in generated forms.

**Instruction vs description — pick per case, be consistent per class:**
- Empty → instruction: `Enter your first name` (clearer than `First name must have an entry`)
- Too long → description: `First name must be 35 characters or less` (less wordy than `Enter a first name that is 35 characters or less`)
- Out of range → description: `Date you started the course must be after 31 August 2017`

**Don't repeat an example that's already on screen.** If the hint says `for example, 'QQ 12 34 56 C'`, the error is just `Enter a National Insurance number in the correct format`.

**Use the identical string inline and in the summary.** GOV.UK's requirement, and the reason is that a user who tabs into a summary link and lands on the field should see the same sentence, not a paraphrase they have to re-parse.

One more attribute detail from that Linear probe, because it cuts against Stripe: Linear ships `type="email"` on the email field while Stripe ships `type="text"`. Both are defensible — `type="email"` gets the browser's own keyboard and a free format check, `type="text"` gets you full control of the message. Pick one and be consistent; what you may not do is `type="email"` plus `novalidate` plus no client check, which is how a malformed address reaches the server silently.

Live strings measured on Stripe Checkout, for calibration on a commercial (non-government) product: `Your email is incomplete.` / `Your card number is invalid.` — first person possessive, full sentence with a period, no error code. Note Stripe does use "invalid," which GOV.UK bans; both are defensible, but pick one house style. Stripe's is warmer, GOV.UK's is plainer.

A wording table you can lift:

| Situation | Bad (generated) | Good |
|---|---|---|
| Empty required text | `This field is required` | `Enter your full name` |
| Empty select | `Please select an option` | `Select the country your card was issued in` |
| Bad email | `Invalid email` | `Enter an email address in the correct format, like name@example.com` |
| Too long | `Max length exceeded` | `Description must be 200 characters or less` |
| Date in future | `Invalid date` | `Date of birth must be in the past` |
| Partial date | `Invalid date` | `Date of birth must include a year` |
| Server rejected | `Error 400: Bad Request` | `We could not save your changes. Try again in a moment.` |
| Password too weak | `Password does not meet requirements` | `Password must be 12 characters or more` |

### The error summary, for anything longer than a few fields

The pattern, measured from GOV.UK's shipped component:

```html
<div class="govuk-error-summary" data-module="govuk-error-summary">
  <div role="alert">
    <h2 class="govuk-error-summary__title">There is a problem</h2>
    <ul class="govuk-list govuk-error-summary__list">
      <li><a href="#full-name">Enter your full name</a></li>
      <li><a href="#passport-issued-year">The date your passport was issued must be in the past</a></li>
    </ul>
  </div>
</div>
```

Geometry: `border: 5px solid #CA3535` on all four sides, `padding: 20px`, `margin-bottom: 50px` before the form resumes. Title `There is a problem` at 24/30 w700, `margin-bottom: 20px`. All four numbers re-measured 2026-09.

Their requirements, verbatim in structure:
- Show it **always** when there's a validation error, **even if there's only one**.
- Move keyboard focus to it on page load (their JS does this; `disableAutoFocus` exists to turn it off).
- Include the heading `There is a problem`.
- Link to each answer that has an error.
- The summary text must be **worded the same** as the inline messages.
- Also add `Error: ` to the start of the page `<title>` so a screen reader announces the failure immediately.
- Re-render the page with the fields **as the user filled them in** — never clear a form on failed validation.

For a **multi-field group** (a date), the summary link points at the *first field with an error* — GOV.UK's example links to the year input specifically, not to the fieldset.

**When you don't need a summary:** a form short enough that every field and its error are simultaneously visible without scrolling — a 3-field login, a single-field rename dialog. Then the inline messages are the summary. Above roughly one viewport of form, add it.

### Multi-step forms and progress

GOV.UK's structural answer is **one question per page**, with the `<label>` or `<legend>` promoted to the page `<h1>`. Measured: `.govuk-label--l` renders at **36/40 w700** inside an `<h1 class="govuk-label-wrapper">`, `margin-bottom: 15px`, over a 748px input. There is no second heading and no duplicated question text — the label *is* the heading, which is why a screen reader hears it once instead of twice.

That's an extreme, and it's right for a service someone uses once (a passport renewal) and wrong for a form someone fills in weekly. But the underlying rule generalises: **split on decisions, not on field count.** Five short factual fields (name, email, phone, company, role) belong on one page. Two fields that change what comes next belong on their own.

Their other requirements for a question page: a **back link at the top** (because *"some users do not trust browser back buttons when they're entering data"*), a page heading, and a continue button — and don't break the browser back button either.

**Progress indication.** GOV.UK's position is that a progress indicator is *optional*, added only *"if research shows it's helpful"* — because a step counter on a variable-length journey (`Step 3 of 7` when branching can make it 4 or 11) is a lie that erodes trust. When you do show progress:

- A **step counter** (`Step 3 of 5`) only when the total is fixed and knowable. Put it above the heading, small, secondary color.
- A **named step list** beats a bar for anything over three steps: the user can see what's coming and what they've done.
- A **task list** — GOV.UK's pattern for long applications — beats both when the steps are independent and resumable. It also implicitly promises "you can leave and come back," which a progress bar does not.
- Never animate the bar from 0 on each page load; it reads as a loading indicator.

**A measured commercial wizard: Mercury's send-money flow.** Five steps — `Recipient → Amount → Categorization → Details → Review`:

- **One URL per step** (`/send-money/pay/start`, `/pay/recipient-details`, `/pay/amount`). Browser back works, a step is linkable, and a refresh doesn't nuke the flow. The generated version keeps all five steps in one component's `useState` and loses everything on reload. **Two conditions on this.** The answers live in a server-side draft keyed to the session, never in query params — a URL carrying `?dob=1984-03-27` or a card BIN ends up in browser history, the Referer header, and your analytics pipeline, and on a shared clinic or kiosk device the back button hands the previous person's answers to the next one. And every step route guards itself: a deep link to step 4 with no draft redirects to the first incomplete step rather than rendering an empty form that submits garbage.
- **A named vertical step list in the left rail**, not a bar and not `Step 2 of 5`. Current step is near-black with a **2px indigo left bar**; the completed step above it is also near-black; steps not yet reached are grey (`~#9D9DA8`). No checkmarks, no percentages, no animation. You can read the whole journey before you start it.
- **The wizard takes the whole window.** Product chrome (sidebar, nav) is replaced by a logo, a workspace name and a single ✕ / `Esc` affordance at the top right. Nothing competes with the form.
- **The form column is 560px** at x=440 on a 1440 viewport — narrower than the content area it replaced, and centered on nothing in particular: the step rail sits left of it. Fields are full-column *within* those 560px.
- **A sticky footer** with `Back` (grey pill) and `Next` (indigo pill), both 40px, **left-aligned with the form column**, above a hairline. Not right-aligned to the viewport, which is the default a component library will hand you.
- **The first step offers a shortcut that skips the form**: `Upload a bill` (a 560×106 drop target that pre-fills the recipient's payment details) `OR` `Select a recipient`. Ship the skip path before you polish the fields.
- **Each step shows the consequences of the choices on it**: `0-1 business days · No fee` under the payment-method select, `Payment expected to arrive in 0-1 business days` under the date. 12/20 `#70707D`. This is help text doing decision support, not format instruction.

**Carry answers forward.** GOV.UK: *"only ask for a piece of information once within a single journey"* — pre-populate or offer the previous answer as a selectable option. Stripe Checkout ships the small version of this as a `Billing info is same as shipping` checkbox (16×16, checked by default) that collapses an entire address group.

### Save, cancel, and dirty state

Three models. Pick one per surface and don't mix them on the same page.

**1. Explicit save (a form).** Buttons at the bottom, left-aligned with the fields, primary first. GOV.UK's button group: `Save and continue` (green, 174×38) then `Save as draft` (grey, 129.5×38), both `margin-bottom: 17px` inside `.govuk-button-group`. Two rules: the primary action is a **verb about the outcome** (`Save and continue`, `Create account`, `Pay`) not `Submit`; and `Cancel` is a **link, not a button** — giving destructive-of-work and constructive actions the same visual weight is how people lose twenty minutes of typing.

Disable the submit button only while the request is in flight, never because the form is invalid. A disabled submit gives the user nothing to click to *find out* what's wrong, and screen readers skip disabled controls entirely. Let them submit, then show the error summary.

**The exception is a submit that costs something per attempt.** If a failed submit burns one of three daily identity-verification attempts, sends a rate-limited SMS, charges a payment-gateway fee, or fires an irreversible physical action, "let them submit and show the error" spends a real resource on a form the client already knows is incomplete. There, gate the button — and when you do, the disabled state must carry its own explanation adjacent to it (`Enter the 6-digit code to continue · 2 attempts left`), not a tooltip and not silence. The rule underneath both cases: **a failed submit may never be a dead end.** Free failure → keep it enabled. Costly failure → disable it *and* say what is missing.

**2. Autosave (a settings surface, an editor).** No buttons at all. Linear's notification settings — observed in a signed-in screenshot — are a card of rows, each `Title` + secondary description on the left and a toggle on the right, with hairline rules between rows that inset from the card's left padding. There is no Save button anywhere on the page. Every toggle commits immediately.

Autosave requires three things generated code always omits: an **optimistic** local update so the control never lags the finger, a **rollback + inline error** if the write fails, and a **quiet confirmation** for anything the user might doubt. Never a toast per keystroke.

**Do not autosave settings that are only valid as a set.** A rate limit with `min` and `max`, a maintenance window with a start and an end, a firewall rule with a port range, a pricing tier with a floor and a ceiling: autosaving `min` the instant it changes commits `min > max` for as long as it takes the user to reach the second field — and if the setting has an external effect, that invalid interval is live in production. Any group where an intermediate combination is invalid, or where a write triggers something outside the page (a re-deploy, a webhook, a billing change), gets an explicit save scoped to that group. Autosave is for settings that are independent, instantly reversible, and inert.

**3. Autosave with a debounced text field.** The hard case — settings pages with free-text inputs. Options in order of preference: (a) commit on blur, (b) commit on a 500–1000ms debounce with a `Saving…` → `Saved` micro-label near the field, (c) don't; use a modal with an explicit save, which is what Mercury does.

**Dirty state.** If a form can hold unsaved work, guard navigation — `beforeunload` for the tab, a router guard for in-app links, and a confirm dialog whose options are `Discard changes` / `Keep editing`, not `OK` / `Cancel`. And label the state: a sticky footer bar reading `You have unsaved changes` with `Save` and `Discard` is better than a silent form plus a surprise dialog, because it tells the user *before* they try to leave.

### Destructive and irreversible confirmations

Scale the friction to the blast radius. Three tiers:

**Tier 1 — reversible.** No dialog. Do it and offer `Undo` in a toast for 5–10 seconds. Archiving, removing a row from a list, unpublishing.

**Tier 2 — hard to reverse.** A dialog naming the specific object and the specific consequence. The title is the question (`Delete "Q3 forecast"?`), the body is the consequence in one sentence, and the confirm button is the **verb** (`Delete`), never `OK` or `Yes`. GOV.UK ships a dedicated `govuk-button--warning` variant for exactly this — measured **white on `#CA3535`** with a `#651B1B` lip, 149.7×**38** so it is exactly as tall as every other button. The colour carries the warning; the button does not grow.

**Tier 3 — irreversible and expensive.** Type-to-confirm: the user types the object's exact name into a field before the button enables. This is the one place where disabling the submit button is correct, because the gate isn't validity, it's deliberate effort. Show the string to type in a copy-resistant way (as text in the prompt, not pre-filled), match case-sensitively, and label the field explicitly (`Type "prod-api" to confirm`). Anything that destroys data belonging to other people — deleting a project, a workspace, a production database — is Tier 3.

Two details that separate real confirmations from generated ones:

- **Name the object in the button, not just the title.** `Delete project` is better than `Delete`; `Delete prod-api` is better still if it fits.
- **Never make the destructive button the visually dominant one by default.** In a two-button dialog, the destructive action gets the red fill *and* the cancel gets a real, easily-hit target. Don't put a 32px `Cancel` link next to a 44px red button.

### The individual inputs

**Password.**
- `type="password"`, `autocomplete="new-password"` on create, `current-password` on sign-in. Nothing else.
- **A show/hide toggle, always.** GOV.UK ships it as a component: input 648px + a `Show` button 95×38 to its right inside the 748px column, using their secondary button style. Note it's a real `<button>` with the visible word `Show`, not an eye icon — an eye glyph is ambiguous about which state you're in.
- **No `maxlength`. No character-class rules.** Length is the only requirement worth enforcing; 12+ characters, no composition rules, no forced special character. Composition rules push users to `Password1!` and break password managers.
- **Validate on submit, not on keystroke** — but do show a live length/strength indicator, because that's information the user is acting on, not a judgement of an unfinished value.
- Never block paste.

**OTP / one-time code.**
- Put `autocomplete="one-time-code"` and `inputmode="numeric"` on it. That alone gets you iOS/macOS SMS autofill.
- **A single input is more robust than six boxes.** Six *real* inputs break paste, break autofill, break backspace across boxes, and confuse screen readers about how many fields exist. If you want the boxes, back them with one real input and treat the boxes as presentation — see *The OTP component, dissected* above for the exact shadcn mechanism (transparent text, `letter-spacing: -16px`, shared borders).
- Size to the code: 6 digits ≈ 6em + padding. Tabular figures. Auto-submit on the last digit only if you also handle "the code was wrong" gracefully — otherwise the user gets an error before they've finished reading their own screen.

**Address.**
- **Lookup first, manual always available.** Stripe Checkout puts an `Enter address manually` link — a 132×16 secondary text button — directly under the autocomplete field. The link is visible before the user struggles, not after.
- If you use multiple inputs, apply the `autocomplete` tokens (`address-line1`, `address-level2`, `address-level1`, `postal-code`, `country`) — GOV.UK explicitly frames this as a WCAG 1.3.5 obligation.
- Country **first**, because it changes the shape of everything below it (Stripe's order: name → country → address). Generated forms put country last, which means the state dropdown is wrong until it's re-rendered.
- Size to content: postcode 104.5px (GOV.UK's `--width-5`), address lines full width.
- Only make the fields you actually need mandatory. GOV.UK: county should be optional or absent — *"it's not part of a correct UK address, according to Royal Mail."*

**Phone.**
- `type="text"` (or `tel`) + `autocomplete="tel"` + a placeholder that shows the format. Stripe: `(201) 555-0123`.
- Country code as a compact leading `<select>` inside the same visual field — Stripe's is 32px wide inside a 346px field, with `autocomplete` deliberately disabled on it.
- Accept and strip spaces, dashes, parens, and a leading `+`. Never reject on formatting.
- Field width ~14 characters ≈ 220px, not full-width.

**Date.**
- For a **memorised** date (birthday, passport issue date), three text inputs beat a date picker. GOV.UK, re-measured: Day (52.25px) / Month (52.25px) / Year (85.5px), each `type="text" inputmode="numeric"`, each with its own visible label, inside one fieldset, with a hint `For example, 27 3 2007`. A user typing their own birthday should never have to navigate a calendar back 40 years.
- For a **chosen** date (an appointment, a deadline), a calendar picker — because the user is reasoning about weekdays and availability, not recalling a number. Keep a typable text input alongside it.
- Never `type="number"` for the parts. Never `maxlength="2"` with auto-advance between boxes — it breaks backspace and paste.
- Accept `3` and `03` for the month, and accept a 2-digit year if you can disambiguate it.

**Currency / amount.**
- `inputmode="decimal"`, not `numeric` (numeric hides the decimal separator on some Android keyboards).
- **Tabular figures for displayed amounts — but not necessarily inside the input.** Mercury sets `font-variant-numeric: tabular-nums` on amounts throughout the product (their sidebar balance `$2,023,267.12`) and goes further: each thousands separator is wrapped in its own span with `padding-right: 0.39px`, sub-pixel kerning on a comma so the digit groups sit at even intervals. But their money *input* is `font-variant-numeric: normal`, 15/24, left-aligned. Measured, not assumed. The reason holds: tabular figures buy you alignment between rows, and there is only ever one row inside a text field. Use them in tables, ledgers and live-updating totals; skip them in the field itself unless your typeface's proportional digits are visibly uneven.
- Put the currency symbol in a **prefix affix inside the field**, not in the value the user types and not as a floating label. Vercel's Geist input ships exactly this affordance: a 38–71px prefix/suffix label welded to the input (measured `https://` prefix at 71px, `.com` suffix at 57px, at 36px input height). Same mechanic, `$` or `USD`.
- Right-align the value if amounts appear in a column; left-align if it's a lone field.
- **Split the formatting into two events — this is the detail nobody gets right.** Measured on Mercury's `Recipient gets` field: typing `1234.5` produced **`1,234.5` live, while typing** (thousands separators inserted on each keystroke), and blurring produced **`1,234.50`** (cents padded). That is exactly the right split. Group separators are inserted *to the left of the caret* while the user types at the end of the value, so a correct implementation re-places the caret and the user never notices. Padding the cents, rewriting the decimal, or normalising a currency symbol *while the caret is inside the number* is what moves the caret and drops keystrokes — defer all of that to blur. The blanket advice "never format while typing" is a half-truth that produces fields where `2000000` sits there unreadable until you tab away.
- The affix: Mercury renders a grey `$` as an in-field prefix with the value starting ~12px after it, inside the same 40px, `#FBFCFD`, `r8` box as every other field in the form.
- Don't use `type="number"`. Users paste `$1,234.56`.

**File upload.** Two shipped drop targets, measured:

| | **GOV.UK** enhanced file upload | **Mercury** bill upload (send-money step 1) |
|---|---|---|
| Target | 748×**156** | 560×**106** |
| Edge | `2px dashed #cecece` — **1.57:1 against white** | 1px hairline on a filled `#F7F8F9`-ish panel, `r8` |
| Inside | a real secondary `<button>` `Choose file` (**115.5×38**, `#f3f3f3`, `box-shadow: 0 2px 0 #858686`) + `or drop file` at 19/25, 7px lower | icon + `Drag and drop here or click to upload` (15/24) + `Upload images, PDFs, or spreadsheets` (13/20 secondary) |
| Status line | `No file chosen` at 19/25 on a `#d2e2f1` blue block, `padding: 15px 10px` | — |
| Semantics | the whole zone is a `<button>` whose accessible name is *"No file chosen, Choose file or drop file"*, wrapping a real `<input type="file">` | `<input type="file">` filling the panel |

The lesson from the contrast number: **a dashed 1.57:1 rectangle is decoration, not an affordance.** In both products the thing that says "you can do something here" is the solid button or the sentence inside the zone, not the border. If you delete the dashed edge, both still work; if you delete the button and keep the edge, only mouse users can upload.

- Both affordances: a real `Choose file` button and a drop target. GOV.UK's improved component ships exactly these two.
- **State the constraints inside the zone, before the picker opens** — accepted types, max size, max count — in the products' own words: `Upload images, PDFs, or spreadsheets` (Mercury, in the drop panel), `You may upload PDF, PNG, or JPEG files` (Mercury, in the upload sheet). Not in a tooltip, and never for the first time in an error: after a 40MB upload has already failed is the worst possible moment to mention the 10MB limit.
- Show per-file progress with a cancel control, and show the file name and size after upload with a `Remove` action.
- Set `accept` to narrow the OS picker, but **also validate server-side** — `accept` is a filter, not a constraint.
- GOV.UK's rule worth stealing: *"make sure users can easily reuse a previously uploaded file within a single journey"* — if you ask for the same ID document twice, offer the first upload as a selectable option rather than making them find the file again.
- Never make the drop zone the *only* affordance. Drag-and-drop is unavailable to keyboard users and awkward on touch.

### Settings pages are forms in disguise — and the best ones aren't forms

Three patterns in the wild, all measured:

**Mercury: the read-only definition list.** Company profile at `demo.mercury.com/settings/company-profile` renders as rows, not fields. Left column (296px, at x=346): a 16/16 w360 label plus 13/20 `#535461` help text. Right column (x=722): the **current value as plain text**, with a small `Edit ›` link beneath it if the field is editable. Rows separated by 1px rules. **There are no inputs on the page and no Save button.** Fields that can't be changed — `Legal name`, `Federal EIN` — simply have no Edit link; the EIN's value is masked to `••••••••`. Clicking Edit opens a focused form for that one field.

Why this is better than the obvious alternative: a settings page is read ten times for every time it's written. Rendering it as forty live inputs makes the reading case worse (inputs are visually noisy, and a filled input is harder to scan than plain text), makes accidental edits possible, and forces you to invent a save model. Render the page as text; open a one-field form on Edit.

**Linear: autosave rows with toggles.** Notification settings — observed in a signed-in screenshot, so structure only, no measurements — are a card containing rows: title + secondary description on the left, control on the right, hairline rules between rows inset from the card padding. Toggles commit immediately; there's no Save. Correct because every setting is a single boolean with an instant, visible effect.

**Mercury's edit form, measured** (`Edit recipient details`, opened from that row pattern): 584px column, `<h2>` section headings (`Profile`, `Address`) at 17/28 w400, label 13/20 `#535461`, value 15/24 `#363644` (**11.56:1** on the `#FBFCFD` field), help text 12/20 below, `(optional)` in the label text, and a two-card radio group (`Person` / `Business`) at the top because it changes which fields appear below. One column throughout. That is what "edits like a dialog" actually looks like.

**Sectioned cards with per-section save.** Each settings section is its own card with its own footer save button, so the "dirty" scope is one card rather than the page. (Vercel's project settings, Notion's settings and Linear's settings are all behind a login, and I could not get past it on this pass — `notion.com/login` and `github.com/signup` both refused an automated browser outright. Treat this pattern as described-from-structure, not as measured numbers. What *is* measured from Vercel is the Geist control scale it would be built from: 32/36/40px inputs, `r6`/`r8`, `--ds-shadow-border-base: 0 0 0 1px #00000014`.) This is the right middle ground when settings are text fields, which can't autosave cleanly, but there are too many to open a dialog for each.

**How to choose:**

| Setting shape | Pattern |
|---|---|
| Boolean with instant effect | Autosave toggle in a row. No save button. |
| Single-select with instant effect (theme, timezone) | Autosave select in a row. |
| Free text, low stakes (display name) | Autosave on blur with a `Saved` micro-label, or a per-section save. |
| Free text, high stakes (billing address, legal name) | Read-only row + `Edit` → focused form with explicit save. |
| Anything requiring verification (email, phone) | Read-only row + `Edit` → flow, never an inline input. |
| Destructive (delete project, leave org) | Its own section at the bottom, visually separated, Tier 3 confirmation. |

The one thing never to do: **mix autosaving toggles and explicitly-saved text fields in the same visual group.** The user cannot tell which of their changes stuck.

### Focus rings, autofill, error slots, hit targets

**Focus rings.** Two schools, both measured, both defensible:

- **Accent ring** — Stripe Checkout: `0 0 0 1px #3297d3, 0 1px 1px rgba(0,0,0,.07), 0 0 0 3px rgba(50,151,211,.9)`. The border recolors to the accent *and* a 3px halo appears. Transition `box-shadow .08s ease-in` — 80ms, fast enough to feel instant, slow enough not to flash.
- **Neutral ring** — Vercel Geist: `--ds-focus-border: 0 0 0 1px #00000057, 0 0 0 4px #00000029`. The border just darkens and gets a soft grey halo. Their *blue* ring (`--ds-focus-ring: 0 0 0 2px #fff, 0 0 0 4px hsl(212 100% 48%)` — a 2px white gap then 2px blue, so it reads on any background) is reserved for `:focus-visible` on non-input controls.

Either way: **never `outline: none` without a replacement**, and put the ring on `box-shadow` or `outline` rather than `border`, so focusing doesn't change the element's size and shift the layout by 1px.

GOV.UK's is the outlier and worth knowing about: a solid `#fd0` yellow block behind the focused element with a black bottom bar. It is unmissable at any contrast level and in any colour-vision profile. Copy it verbatim only for a public-service form; everywhere else, take the requirement it encodes — the ring must be findable without colour perception, so it needs a luminance jump, not just a hue change.

**Reserve space for errors.** Stripe's error slot is a container that starts at `height: 0` and animates `height .3s cubic-bezier(.3,.3,.3,1)` when a message arrives. The alternative — inserting a 16px paragraph into normal flow — pushes every field below it down, which moves the button out from under the cursor at the exact moment the user is clicking it. Either reserve the space or animate the height. Never let it jump.

**Autofill.** Chrome repaints autofilled inputs with its own background and there is no clean API to stop it. Stripe's shipped workaround, measured in their computed `transition`: `filter 50000s` — a transition so long the autofill repaint never completes. The more common variant is `-webkit-box-shadow: inset 0 0 0 1000px <your-bg>` with `-webkit-text-fill-color`. Test your form with autofill on; a form that turns pale yellow on autofill looks broken.

**Hit targets.** GOV.UK's checkbox input is **44×44px** with a 19/25 label padded `7px 15px` — the whole row is clickable, and 44px is the accessibility floor. Stripe's radio is a 16×16 visual with the whole accordion row as the target. Never ship a 16px checkbox whose only clickable area is the 16px box.

---

## When this advice is wrong

**Single column is wrong for a dense data-entry grid.** An accountant entering 200 line items, a warehouse operator scanning SKUs, a trader's order ticket — these are keyboard-driven table edits where a form layout would triple the travel. Use a grid, align columns, size every column to its content, and optimise for Tab. The single-column rule assumes a form filled once by someone who has never seen it.

**"Never validate on blur" is wrong for a form the user fills in daily.** GOV.UK's rule is calibrated for a passport renewal — a once-a-lifetime interaction by someone who may be stressed, slow, or on a shared device. An internal tool used forty times a day by the same twelve people benefits from immediate feedback, because the user has already internalised the rules and just wants to know they hit the wrong key. Keep the "not while focused" half of the rule either way.

**"Turn off HTML5 validation" is wrong if you have no error-handling story.** GOV.UK can say `novalidate` because they ship a complete, tested error summary + inline message system. If your alternative to the browser bubble is nothing, the bubble is better. Build the system first, then turn off the native one.

**"Mark the minority" breaks at 50/50.** In a form where half the fields are optional, both markings are noise. Split the form instead: required fields in the main section, optional ones under a `Add more details (optional)` disclosure. The ratio problem is a symptom of a form that's doing two jobs.

**"One question per page" is wrong for a form your user has already filled in ten times.** GOV.UK's own framing is that it *helps users understand what you're asking* — a benefit that evaporates on repeat use and is replaced by the cost of ten page loads. Weekly expense reports go on one page.

**Read-only settings rows are wrong when almost everything is editable and frequently edited.** Mercury's pattern costs a click per edit. That's right for a legal name changed once a year and wrong for a tool where the user tunes six values every session.

**44px inputs are wrong in a desktop-only dense app.** Vercel ships 32px and 36px controls and they're right to — a settings sidebar with 44px inputs wastes a third of the viewport. 44px is the mobile/payment floor, not a universal minimum.

**Tabular figures are wrong for a lone number in prose.** `font-variant-numeric: tabular-nums` widens the `1` to match the `0` and makes single numbers in a sentence look gappy. It's for columns, live-updating values, and money — not for "3 items selected."

**"Never format while the user is typing" is wrong for thousands separators.** Measured on Mercury: grouping commas go in live, cents get padded on blur. A seven-figure amount with no separators until blur is unreadable at the moment the user most needs to check it. The rule that survives is narrower: *never rewrite characters at or left of the caret* — separators appended behind a caret that sits at the end of the value are safe if you re-place the caret; cents, currency symbols and decimal normalisation are not.

**"Six OTP boxes are wrong" is wrong when they're presentational.** shadcn's `input-otp` renders six 32×32 slot divs over a single real input (`letter-spacing: -16px`, transparent text, `one-time-code`, `inputmode="numeric"`). Paste, autofill, backspace and screen readers all behave. The failure mode is six real `<input maxlength="1">` elements, not the visual.

**"Nothing below 13px for a label" is wrong at high weight.** Atlassian ships 12/16 **w653** at 7.81:1 and it reads fine above a 14px w400 value, because label and value are separated by weight rather than by size. A 12px w400 grey label is the version that fails.

**A named step rail is wrong for a two-step flow.** Mercury's five-step rail earns its 200px of horizontal space; the same component around `Details → Payment` is scaffolding for a journey the user has already finished reading. Under three steps, show the heading and the Back link and nothing else.

**Type-to-confirm is wrong below Tier 3.** Making someone type `newsletter-draft` to delete a draft they created 30 seconds ago is theatre, and theatre trains people to do it without reading, which is exactly what you didn't want when it mattered.

**"`autocomplete` on every field" is wrong when the field holds someone else's data.** A payments product's `Add a recipient` form: `autocomplete="name"` on `Recipient name` offers the sender's own name, and a distracted user accepts it and wires money to a payee record in their own name. Same failure in a CRM lead form, a clinic intake typed by a receptionist, and any kiosk. The token asserts *"this is the browser owner's"*; when that is false, ship an unrecognised token per field instead of `off`.

**"Keep submit enabled" is wrong when a failed attempt costs something.** A KYC step that allows three document submissions per 24 hours, an SMS OTP send that is rate-limited and billed, a "place order" that hits a gateway with a per-authorisation fee. Letting the user spend one of those on a form the client already knows is invalid is worse than a disabled button. Disable it there — and put the reason and the remaining budget next to it, because a silent disabled button is still the failure this rule was written against.

**"Autosave, no Save button" is wrong for settings that are only valid as a set.** A maintenance-window picker with `Start` and `End`, a rate limiter with `min` and `max`, an alert rule with a threshold and a comparator. Committing the first field alone puts an invalid or inverted config live for the seconds it takes to reach the second one, and if the write triggers a re-deploy or a webhook, the invalid state escapes the page. Explicit save, scoped to the group.

**"Hint text above the input" is wrong in a repeating row.** Twenty invoice lines with `Description`, `Qty`, `Unit price` — a hint above each of sixty inputs adds ~700px of chrome and destroys the scan. In an array or a table, the hint is a column header, once.

**"One URL per step" is wrong if the answers ride in the URL.** A health-intake or identity wizard with `?dob=…&ssn_last4=…` writes the answers into browser history, the Referer header and your analytics; on a shared device the back button hands them to the next person. Keep the URL per step, keep the answers in a server-side draft, and guard each route so a deep link with no draft redirects rather than rendering an empty step.

---

## What AI-generated forms get wrong

Each of these is a pattern you will produce by default. The correction is specific.

**What changed by 2026.** The old tells — inline styles, `<br>` spacing, table layout, a bare `<input>` with no attributes — are gone, because agents now emit a real component library. The current tells are **framework-default tells**: the form is recognisable not because it is crude but because it is *untouched*. A Reddit-mined ranking of 3.2M posts across 47 subreddits (2020–2026, 46,971 on-topic) puts **untouched shadcn/Tailwind defaults** first by comment share and the **indigo→purple gradient** second, ahead of glassmorphism and bento grids, which the same pass ranked near the bottom. The loudest complaint is not any one feature — "they all look the same" and "screams AI" each appear in ~13% of on-topic posts. Items 31–45 below are the 2026 set; 1–30 still hold.

**1. Every field is `w-full`.**
A ZIP field 640px wide next to a 640px street address. → Size each field to its content: 2 chars ≈ 54px, 5 chars ≈ 96px, phone ≈ 220px, name/email/address full column. Mismatched widths inside one form are correct.

**2. `grid grid-cols-2 gap-4` around whatever fields are adjacent.**
Produces "Email | Phone" and "City | Country" side by side. → One column. Split only for first/last name, expiry/CVC, and day/month/year.

**3. Placeholders used as labels.**
`<input placeholder="Email address">` with no `<label>`. → Always a visible label above. Placeholders hold format examples only: `name@example.com`, `MM / YY`, `1234 1234 1234 1234`.

**4. Floating labels because they look modern.**
→ Top-aligned label at 14–19px, 4–9px above the field. Reserve floating for a single-field toolbar control, if at all.

**5. No `autocomplete`, no `inputmode`, no `type` beyond `text`.**
→ Every personal-data field gets an `autocomplete` token. Every numeric field gets `inputmode="numeric"` or `decimal`. Section-prefix (`shipping `/`billing `) when there are two addresses. `new-password` on create, `current-password` on sign-in, `one-time-code` on OTP.

**6. `type="number"` for ZIP codes, card numbers, and years.**
Drops leading zeros, rejects pasted values, adds scroll-to-change. → `type="text" inputmode="numeric"`, exactly as Stripe and GOV.UK ship.

**7. Red border and error text appear on every keystroke.**
The field turns red while the user is on the third character of their email. → Validate on submit. After a field has errored once, re-validate on input to clear it. Never while focused and untouched.

**8. `This field is required`.**
Also `Invalid email`, `Please select an option`, `An error occurred`. → Name the field and the fix: `Enter your full name`, `Enter an email address in the correct format, like name@example.com`, `Select the country your card was issued in`.

**9. Asterisks on every required field.**
Eleven asterisks and no legend. → Mark the minority. `(optional)` inside the label text when most fields are required; `Required` when most are optional.

**10. No error summary on a 20-field form.**
The user submits, the page doesn't move, and the first error is 900px down. → Summary box at the top, focus moved to it, `There is a problem` heading, one link per error, identical wording to the inline messages, `Error: ` prefixed to the page title.

**11. Error text inserted into normal flow, shifting the layout.**
Every field below jumps down 20px as errors appear. → Reserve the slot or animate its height (Stripe: `height .3s cubic-bezier(.3,.3,.3,1)`).

**12. Submit disabled until the form is valid.**
The user has no way to find out what's wrong. → Keep it enabled; validate on click; show the summary. Disable only during the in-flight request, or as a type-to-confirm gate.

**13. `Submit` / `OK` / `Yes` as button labels.**
→ The verb of the outcome: `Save and continue`, `Create account`, `Pay $49.00`, `Delete project`.

**14. `Cancel` styled as a button of equal weight next to `Save`.**
→ Cancel is a text link or a low-emphasis button. Never symmetrical with the primary.

**15. A confirmation dialog with `Are you sure?` and `OK`/`Cancel`.**
→ Name the object and consequence: `Delete "Q3 forecast"?` / `This deletes the forecast and its 14 scenarios. This cannot be undone.` / buttons `Delete forecast` and `Keep`.

**16. Every section in an identical rounded card.**
Eight cards, no hierarchy. → Space (30px) and headings do the sectioning. Cards mark the few things worth marking.

**17. Settings rendered as forty live inputs plus one Save button at the bottom.**
→ Booleans autosave in rows. High-stakes text is a read-only row with `Edit`. If you need explicit save on text, scope it per section, not per page.

**18. A toast on every autosaved change.**
→ Optimistic update, silent success, inline error with rollback on failure.

**19. `outline: none` on focus, or a focus style that changes `border-width`.**
Removes the ring entirely, or shifts the layout 1px. → `box-shadow` or `outline` ring, 80–200ms transition, visible in both themes.

**20. Currency in proportional figures with no tabular setting, formatted while typing.**
Column jitters; caret jumps. → `font-variant-numeric: tabular-nums`, `inputmode="decimal"`, currency symbol as an in-field prefix, format on blur.

**21. Six separate `<input maxlength="1">` boxes for an OTP with `onKeyUp` focus-advance.**
Breaks paste, autofill, and backspace, and announces six unlabelled fields. → One real input (`autocomplete="one-time-code"`, `inputmode="numeric"`), sized to the code length. If you want the six-box look, render six presentational slots over that one input the way shadcn's `input-otp` does — the mechanism is measured above.

**22. A calendar picker for a date of birth.**
40 clicks back through months. → Three text inputs (D/M/Y), `inputmode="numeric"`, own labels, one fieldset, hint with an example date.

**23. Drag-and-drop as the only upload affordance, and constraints revealed only on failure.**
→ Button *and* drop zone. Accepted types, max size, and max count stated in hint text before the picker opens.

**24. Fields cleared after a failed submit.**
→ Re-render with everything the user typed, exactly as they typed it.

**25. A dashed 1px `border-gray-300` rectangle as the entire upload affordance.**
Measured against white, GOV.UK's dashed drop-zone border is **1.57:1** — it is decoration. → Put a real `Choose file` button and a sentence naming the accepted types *inside* the zone; the border can then be as faint as you like.

**26. `Step 3 of 5` over an animated progress bar, on a branching flow.**
The denominator is a promise you can't keep, and the bar re-animating from 0 on each page reads as loading. → A named step list (Mercury: five words in a left rail, current one marked with a 2px bar, future ones grey) or nothing.

**27. The whole wizard lives in one component's state.**
Refresh loses everything; the browser back button exits the flow. → One URL per step, as Mercury does (`/pay/recipient-details`, `/pay/amount`), with the answers in the URL or in a server-side draft.

**28. Wizard footer buttons right-aligned to the viewport.**
The eye finishes the last field at x=440 and has to travel 900px to find `Next`. → Left-align the footer actions with the form column, as Mercury does; keep them in a sticky bar above a hairline.

**29. Money formatted only on blur, so `2000000` sits there unseparated.**
→ Group separators live while typing (re-place the caret), pad the cents on blur.

**30. A `<select>` at `w-full` containing `USD`.**
→ Size the select to its longest option, exactly like a text field. In one 748px GOV.UK column, `Sort by` is 218.5px and `Choose location` is 247px.

### The 2026 set

**31. The whole form is a centered `<Card>` on a full-viewport gradient.**
`min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100` wrapping `<Card><CardHeader><CardTitle>Welcome back</CardTitle><CardDescription>Sign in to continue</CardDescription>`. Every auth screen from every tool is this screen. → Compare `vercel.com/login`: a 320px column on a flat ground, no card, no gradient, seven identical 320×40 buttons. The page's `<h1>` says what it is; the card was carrying no information.

**32. Untouched shadcn defaults as the entire visual system.**
`h-9 rounded-md border-input`, the default `--ring`, the default `--radius`, `Inter`. Nothing is wrong with any single value — the tell is that all of them are the shipped ones. → Change three things and hold them: input height (pick from the measured 32/36/40/44 range for your density), radius, and the label's colour relationship to the value (Linear puts the label at `#8A8F98` and the value at white; Stripe does the reverse). A form that made those three choices does not read as generated even if every other token is stock.

**33. `bg-gradient-to-r from-indigo-500 to-purple-500` on the submit button.**
The single most-named colour tell of 2026. → One flat fill. Every measured product ships a solid: Stripe `#0073E6`, GOV.UK `#0F7A52`, Mercury `#5266EB`, Vercel `#171717`, Ramp `#E4F222`.

**34. A Lucide icon inside every input.**
`<Mail/>` in the email field, `<Lock/>` in the password field, `<User/>` in the name field, each `absolute left-3` with `pl-10` on the input. It restates the label that is already 8px above it, eats 28px of the content box, and is invisible to a screen reader. → No icon. Reserve in-field affixes for things that carry information the label cannot: a currency prefix, a `https://` prefix, a `Show` button, a country-code select (Stripe's is 32px inside a 346px field).

**35. Emoji as icons, and in labels, errors and success text.**
`🎉 Account created!`, `⚠️ Invalid email`, `📧 Email`. Emoji render differently per platform, are announced verbatim by screen readers ("party popper"), and are a top-six ranked tell. → No emoji in form chrome.

**36. `useForm({ mode: "onChange" })`.**
React Hook Form's defaults are already what this document recommends — `mode: 'onSubmit'` and `reValidateMode: 'onChange'`, i.e. validate on submit, then clear live once a field has errored. Agents override that default and get a red border on the third character of an email. → Delete the `mode` option. The default is correct.

**37. A toast is the only place a submit error appears.**
`toast.error("Something went wrong")` from Sonner, auto-dismissing in ~4s, unanchored to any field, gone before a screen reader user has navigated to it, and impossible to re-read. → Errors belong on the field and in a summary at the top of the form. A toast may *accompany* that; it may never be the only copy. Same for `toast.success("Success!")`, which names neither what was saved nor where it went.

**38. `autoComplete="off"` on every field.**
It is in shadcn's own React Hook Form anatomy example, so it gets copied into forms that badly want autofill. → Remove it, and put the correct token on every field holding the signed-in user's own data. If you genuinely need to block a fill (see the third-party-data scope above), an unrecognised token beats `off`, which Chrome ignores.

**39. All help text below the input, because that is where `FieldDescription` renders.**
shadcn's anatomy is `FieldLabel → Input → FieldDescription → FieldError`, so a format hint that should shape what the user types lands *under* the box they already typed into. → Move anything that shapes input above the field (GOV.UK's position, 19/25 `#484949`, `aria-describedby`). Leave consequence text below (Mercury, 12/20 `#70707D`). Both wired; only the order changes.

**40. `<Progress value={(step/total)*100} />` plus an `AnimatePresence` slide between steps.**
A percentage on a flow that branches is a promise you can't keep, and a 300ms x-slide on every step means the user waits on an animation five times to fill in one form. → A named step list (Mercury: five words in a left rail, current one marked with a 2px bar). No transition, or a 120ms cross-fade.

**41. Glassmorphic fields on dark: `bg-white/5 backdrop-blur-md border-white/10`.**
Linear ships something adjacent — measured `1px solid rgba(255,255,255,.05)` on `rgba(255,255,255,.05)` — but over a *flat* `#08090A`, so the value still hits full contrast. The generated version puts the same field over a gradient or an image, where the placeholder and the border land somewhere between 1.3:1 and 2:1 depending on what is behind them. → If the field is translucent, the ground under it must be flat and dark. Measure the placeholder against the worst pixel it can sit on.

**42. An "✨ Ask AI to fill this" affordance stapled to a field.**
A sparkle button next to `Job description` in a form with four fields. It adds a control, a loading state and a failure state to save typing the user was going to do anyway. → Ship it only where it replaces a genuinely expensive answer (parse an uploaded document, as Mercury's `Upload a bill` does — a 560×106 drop target that pre-fills the whole recipient), and then make it the *primary* path with the form as fallback, not a decoration on the form.

**43. A `cmdk` Combobox with a search box for a three-option choice.**
`Popover + Command + CommandInput + CommandEmpty` to choose between `Personal`, `Team`, `Enterprise`. Two taps and a keyboard for what is one glance. → 2–4 short options: a radio card group (Mercury: two 50px cards, ~7× the target area of a dot). 5–15: a native `<select>` sized to its longest option. Search only past ~20 options.

**44. Password composition rules with a four-bar strength meter.**
`Must contain uppercase, lowercase, a number and a symbol`, plus a red/orange/yellow/green bar. Pushes everyone to `Password1!` and breaks generated passwords from managers. → Length only, 12+, and a live character count. Keep the meter only if it measures actual entropy and never blocks submit.

**45. `<Skeleton>` shimmer on a form with nothing to load.**
A create-new-record form renders three shimmering bars for 400ms before showing empty inputs it never needed to fetch. → Render the empty form immediately. Skeletons are for *pre-filled* forms waiting on a record, and even then only for the values, not the labels.

---

## Self-check

Every item below is settled by one of three things and says which: **`grep`** (a command you run against the source — ripgrep syntax, JSX/Tailwind assumed; adapt the glob for other stacks), **`shot`** (something visible in a screenshot at 1440×1000 and at 390×844), or **`run`** (a tool or a DevTools snippet). Nothing here asks you to judge whether something "feels right". A grep that returns nothing passes; a grep that returns hits is a list of things to look at, not automatically a failure.

Two snippets the checks reuse. Paste into DevTools on the rendered form:

```js
// FIELDS — geometry and attributes of every control, as a table
copy(JSON.stringify([...document.querySelectorAll('input,select,textarea')].map(e=>{
  const c=getComputedStyle(e), r=e.getBoundingClientRect();
  const lab=e.labels?.[0];
  return {name:e.name||e.id, type:e.type, w:+r.width.toFixed(1), h:+r.height.toFixed(1),
    ph:e.placeholder, ac:e.autocomplete, im:e.inputMode, req:e.required,
    label: lab?.textContent.trim(), labelGap: lab? +(r.top-lab.getBoundingClientRect().bottom).toFixed(1):null,
    describedby:e.getAttribute('aria-describedby'), radius:c.borderRadius, pad:c.padding};
}),null,1))

// GAPS — label→input gap vs group→group gap, for the 4× rule
const g=[...document.querySelectorAll('input,select,textarea')].map(e=>e.getBoundingClientRect());
console.table(g.slice(0,-1).map((r,i)=>({pitch:+(g[i+1].top-r.bottom).toFixed(1)})))
```

### Layout

- [ ] **One column; every horizontal split is a named pair** (first/last, expiry/CVC, D/M/Y).
      `grep`: `rg -n "grid-cols-[2-9]|flex-row" --glob '*form*'` — every hit must sit around one of the three named pairs.
- [ ] **No field is `w-full` when its content is under ~10 characters.**
      `grep`: `rg -n "w-full|width:\s*100%" -A2 -B2 | rg -i "zip|postal|cvc|cvv|state|year|month|day|code|currency|quantity|qty"`
- [ ] **Widths are ragged, and the raggedness matches the content.** Sort the FIELDS output by `w`: the 2-char fields are ~50–56px, 4–5 char ~82–105px, phone ~220px, email/name/address full column. A form where every `w` is identical fails.
      `shot`: no field is more than ~2× wider than its longest realistic value.
- [ ] **The form column has a stated max width and holds it.**
      `grep`: `rg -n "max-w-|maxWidth|max-width"` in the form's container — one hit, and it is between 320 and 760px. Reference points: Stripe 378, Mercury 560, Linear 607, GOV.UK 630–748.
- [ ] **Group→group gap ≥ 4× label→input gap.** Run the GAPS snippet and the FIELDS snippet; `min(pitch) / max(labelGap) ≥ 4`. GOV.UK ships 30px vs 5px = 6:1.
- [ ] **Nothing is a `<Card>` that could be a heading and 30px of space.**
      `grep`: `rg -c "<Card"` — more than 3 in one form page is the failure in item 16/31.

### Labels and help

- [ ] **Every control has a programmatic label.** In FIELDS, no row has `label: null` (or an `aria-label`/`aria-labelledby` you can point to).
      `run`: `node tools/audit.mjs <url>` — axe reports `label` violations.
- [ ] **Label is above the input, `labelGap` between 4 and 12px, every row.** Measured range in the sample: Atlassian 4, Stripe 4, GOV.UK 5, Linear 8, Stripe Dashboard 9, Mercury 12.
- [ ] **No placeholder repeats its own label.** In FIELDS, no row where `ph` ≈ `label`, and none matching `/^(enter|type|input|your )/i`.
      `grep`: `rg -n 'placeholder="(Enter|Type|Your|Input)'`
- [ ] **Every placeholder is a format example or is absent.** Read the `ph` column: `1234 1234 1234 1234`, `MM / YY`, `name@example.com`, `Kevin Flynn` pass. `Email address` fails unless it is a one-field page with an `<h1>` that names the form (the `vercel.com/login` exception, and only that shape).
- [ ] **Hint text that shapes input is above the field; consequence text is below.**
      `grep`: `rg -n "FieldDescription|FormDescription"` — shadcn renders these *below* the input, so every format hint that appears there is misplaced (item 39).
- [ ] **Hint and error are wired.** In FIELDS, every row that renders help text has a non-null `describedby` pointing at that element's `id`.
- [ ] **Help text passes contrast.** `run`: `node tools/contrast.mjs "<help color>" "<field bg>"`. Floors from the sample: above-field hint ≥7:1 (GOV.UK 9.03), below-field help ≥4.5:1 (Mercury 4.88 at 12px — the floor, not a target).
- [ ] **The minority is marked, in the label text.** Count `required` in FIELDS. If required > optional, `rg -n "\(optional\)"` returns one hit per optional field, and `rg -n "<label" -A2 | rg "[*]"` returns nothing. If optional > required, the reverse, with the word `Required`.

### Attributes

- [ ] **Every field holding the signed-in user's own data has an `autocomplete` token.** In FIELDS, `ac` is non-empty for every personal-data row.
      `grep`: `rg -n 'autoComplete="off"|autocomplete="off"'` must return nothing (item 38).
- [ ] **Third-party-data fields deliberately do not.** Recipient/payee/patient/lead name and address rows carry an unrecognised token, not a real one and not `off`.
      `grep`: `rg -n -i "recipient|payee|patient|beneficiary" -A4 | rg "autoComplete"`
- [ ] **Password tokens are the right way round.** `grep`: `rg -n 'autoComplete="(new|current)-password"'` — `new-password` on every create/reset form, `current-password` on sign-in only.
- [ ] **OTP field has `one-time-code`.** `grep`: `rg -n "one-time-code"` — one hit per OTP surface.
- [ ] **Two addresses are section-prefixed.** `grep`: `rg -n 'autoComplete="(shipping|billing) '` — if `address-line1` appears twice on one page and this returns nothing, it is broken.
- [ ] **Every numeric field has `inputMode`.** In FIELDS, every row whose value is digits has `im` of `numeric` or `decimal` (`decimal` for money).
- [ ] **No `type="number"` on identifiers, codes, dates, or money.** `grep`: `rg -n 'type="number"'`
- [ ] **Grouped inputs are in a `<fieldset>` with a `<legend>`.** `grep`: `rg -c "<fieldset"` ≥ the number of D/M/Y groups and radio groups. `run`: axe reports missing group names.

### Validation

- [ ] **Nothing validates while a clean field is focused.** `grep`: `rg -n "mode: *.onChange|validateOnChange|reValidateMode"` — React Hook Form's defaults (`mode: 'onSubmit'`, `reValidateMode: 'onChange'`) are already correct, so any explicit `mode` is a regression (item 36).
      `shot`: type three characters of a bad email; no red appears.
- [ ] **After a field has errored, it clears live.** `shot`: submit empty → error; type a valid value → error goes without a second submit.
- [ ] **No message says required / invalid / please / oops / an error code.**
      `grep`: `rg -n -i "is required|invalid|please |sorry|oops|error [0-9]{3}|something went wrong"`
- [ ] **Every message names the field and the fix, and echoes the label's wording.** Read the messages next to their labels: label `Address line 1` → `Enter address line 1, typically the building and street`.
- [ ] **Inline and summary strings are byte-identical.** `grep`: put every message in one map and render both from it — `rg -n "errorMessages|ERRORS\b|messages\." ` should show a single source. Two literal strings for one error is the failure.
- [ ] **Input is cleaned, not rejected.** `shot`: paste `4242 4242 4242 4242`, ` +44 20 7123 4567 `, `SW1A 1AA` — all accepted.
      `grep`: `rg -n "\.replace\(/" -B3 | rg -i "phone|card|postcode|zip|iban"` — a strip must exist before the validate call.
- [ ] **A failed submit re-renders the user's values.** `shot`: fill five fields, break one, submit — the other four still hold what was typed.

### Errors, structurally

- [ ] **A form taller than one viewport has a summary at the top.** `shot` at 1440×1000: if the form scrolls, the first error must be visible without scrolling after submit.
      `grep`: `rg -n "There is a problem|ErrorSummary|role=\"alert\""`
- [ ] **Focus moves to the summary on failed submit.** `shot`: submit, then screenshot without touching anything — the focus ring is on the summary.
- [ ] **The error slot does not shift the layout.** `shot`: two screenshots, before and after submit, diffed — the submit button's `y` must not move. Reserve the slot or animate `height` (Stripe: `height .3s cubic-bezier(.3,.3,.3,1)`).
- [ ] **Error state survives greyscale.** `shot`: screenshot the errored form, desaturate it — the errored field is still identifiable (GOV.UK: w700 text, a 5px left bar, and a border-width change).
- [ ] **Page `<title>` is prefixed on failure.** `shot`: browser tab reads `Error: …` after a failed submit.

### Actions

- [ ] **Primary button label is the outcome verb.** `grep`: `rg -n ">(Submit|OK|Yes|Confirm|Continue)<"` — each hit needs a reason.
- [ ] **Cancel is lower emphasis and still a real target.** In a screenshot, measure both: cancel's height is within 8px of the primary's and it is not a 32px link beside a 44px button.
- [ ] **Submit is enabled while the form is invalid — unless a failed attempt costs something.** `grep`: `rg -n "disabled={!.*isValid|disabled={!.*errors"`. Every hit must be a costly-attempt case (finite verification attempts, rate-limited SMS, a charged authorisation, an irreversible physical action) **and** must render the reason and the remaining budget adjacent to the button.
- [ ] **Destructive friction matches reversibility.** Reversible → no dialog, `Undo` toast. Hard to reverse → dialog naming the object, confirm button is the verb. Irreversible and other people's data → type-to-confirm.
      `grep`: `rg -n "Are you sure|>OK<|>Yes<"` must return nothing in dialogs.
- [ ] **Unsaved work is guarded.** `grep`: `rg -n "beforeunload|onBeforeRouteLeave|useBlocker"` returns a hit for every surface that holds a draft, and the dialog's buttons read `Discard changes` / `Keep editing`.

### Settings

- [ ] **Autosaving and explicitly-saved controls are not mixed in one visual group.** `shot`: a group containing both a toggle and a text input with a Save button is the failure.
- [ ] **Interdependent settings save as a group.** List every pair where one value constrains another (`min`/`max`, start/end, threshold/comparator). Each pair is behind one save.
- [ ] **Autosaved writes are optimistic, silent on success, and roll back visibly on failure.** `shot`: throttle the network to offline in DevTools, flip a toggle — it must return to its old position with an inline error, not stay flipped and not fire a toast per change.
- [ ] **Non-editable values have no edit affordance at all.** `shot`: greyed-out inputs and disabled Edit buttons are the failure; plain text with no control is the pass (Mercury's `Legal name`, `Federal EIN`).

### Multi-step

- [ ] **Each step has its own URL, and refresh and browser-back both work.** `shot`: refresh on step 3 — you stay on step 3 with your answers.
- [ ] **No answers in the URL.** `grep`: `rg -n "searchParams.set|router.push\(.*\?"` in wizard code — nothing writes a field value into the query string.
- [ ] **A deep link into a step with no draft redirects.** `shot`: open the step-4 URL in a fresh private window — you land on step 1, not an empty step 4.
- [ ] **Progress, if shown, is a named step list.** `grep`: `rg -n "<Progress|step.*/.*total.*100|Step \{"` — a percentage or `Step N of M` on a branching flow is the failure.
- [ ] **Footer actions align to the form column, not the viewport.** `shot`: the `Next` button's left edge and the fields' left edge are the same x (Mercury: both at x=440).
- [ ] **There is a path that skips the form.** Name it: import, upload, "same as billing", a saved value. If you cannot name one, this item fails.

### Physics

- [ ] **Every control has a visible focus ring in both themes that does not move the layout.**
      `grep`: `rg -n "outline:\s*none|outline-none"` — every hit needs a `box-shadow`/`outline` replacement within the same rule.
      `run`: `node tools/audit.mjs <url>` reports focus-visibility failures.
      `shot`: tab through; the focused field's `y` position is unchanged (put the ring on `box-shadow`/`outline`, never `border-width`).
- [ ] **Touch targets ≥44px.** In FIELDS at 390px width, every `h` ≥ 44 for tappable rows. Checkbox and radio `<input>` boxes are 44×44 even when the drawn control is 16–20px (GOV.UK draws 40, targets 44).
      `run`: `node tools/audit.mjs <url> --widths 390` reports target-size failures.
- [ ] **Checkbox and radio labels are part of the target.** `shot`: click the label text — it toggles.
- [ ] **A 2–4 option radio group is a card group, not bare dots.** `shot`: Mercury's are 117–130×50 cards, ~7× the area.
- [ ] **Autofill doesn't repaint the field into something broken.** `shot`: trigger Chrome autofill and screenshot — the field is not pale yellow and the value is readable.
- [ ] **Tabular figures are in tables and totals, not in the input.**
      `grep`: `rg -n "tabular-nums|tabular_nums"` — hits on `<td>`/totals pass; a hit on a lone text input is the failure (Mercury's money *input* is `font-variant-numeric: normal`).
- [ ] **Nothing rewrites characters at or left of the caret.** `shot`: type `1234.5` into a money field — you see `1,234.5` while typing (separators appended behind the caret) and `1,234.50` after blur. Cents padded, symbols normalised, or the decimal rewritten *while typing* is the failure.
- [ ] **The upload zone's affordance is a button and a sentence, not a dashed border.** `shot`: a real `Choose file` button inside the zone, plus the accepted types in words. `run`: `node tools/contrast.mjs "<border color>" "<zone bg>"` — if it is under 3:1 (GOV.UK's dashed edge measures 1.57:1) it is decoration and cannot be the only affordance.

---

## Direction pass (2026-09)

A design-director pass on 2026-09-10: re-probe the numbers, scope the rules that agents were following off cliffs, refresh the anti-patterns to the 2026 stack, and make the self-check runnable.

### What was re-measured (Playwright, 1440×1000, `getComputedStyle` + `getBoundingClientRect`)

Nine surfaces re-probed live: `design-system.service.gov.uk` text-input (fixed-width scale), select, date-input, character-count, password-input, file-upload, button, error-summary; `ui.shadcn.com/docs/components/input`; `vercel.com/login`; `linear.app/contact/sales`.

**Held exactly:** GOV.UK error summary (`5px solid #CA3535`, `padding 20px`, `mb 50px`, title 24/30 w700 `mb 20px`); GOV.UK checkbox (44×44 input, 40×40 drawn, label `padding 7px 15px` starting at x=+44, 10px between items); GOV.UK primary button (174.03×38, r0, `#0F7A52`, `box-shadow 0 2px 0 #083D29`, `padding 8px 10px 7px`); GOV.UK password input (648px input + `Show` button 95×38, `autocomplete="current-password"`); GOV.UK file-upload wrapper (748×156, accessible name *"No file chosen, Choose file or drop file"*); GOV.UK date input (52.25 / 52.25 / 85.5, all `type="text" inputmode="numeric"`, legend `When was your passport issued?`, hint `For example, 27 3 2007`); `Sort by` select at 218.5px in a 748px column; shadcn input (32px, r10px, `4px 10px`, 14/20); `vercel.com/login` (320×40 input, 16/24, `padding 0 12px`, r0 on the input, no `<label>`, `placeholder="Email Address"`; button 320×40 r8 `#171717`); Linear `contact/sales` (40px input, 14/21, `padding 0 10px`, r8, `1px solid rgba(255,255,255,.05)` on the same fill, label `#8A8F98` w400 8px above, textarea 106px, body `#08090A`, placeholders `Kevin Flynn` / `kevin@encom.com` / `I'm interested in Linear for my team...`).

**Corrected — nine values:**

| Claim | Was | Measured 2026-09-10 |
|---|---|---|
| GOV.UK `--width-2` | 52px | **52.25px** |
| GOV.UK `--width-3` | 71px | **71.25px** |
| GOV.UK `--width-4` | 86px | **85.5px** |
| GOV.UK `--width-5` (UK postcode) | 105px | **104.5px** |
| GOV.UK `--width-10` | 219px | **218.5px** |
| GOV.UK `--width-20` | 390px | **389.5px** |
| GOV.UK textarea, 5 rows | 133px | **132.75px** |
| Linear input letter-spacing | `-0.182px` | **`normal`** |
| GOV.UK `--warning` button | "red-on-white" | **white on `#CA3535`**, lip `#651B1B`, 149.7×38 |

**Corrected — one mechanism, stated backwards.** GOV.UK's character count: the *visible* `.govuk-character-count__message` is `You can enter up to 200 characters` and becomes `You have N characters remaining` on input; the *visually hidden* `.govuk-character-count__sr-status` is the one holding the remaining-count string, announced on a debounce. The file had the two swapped, which would have had an agent announcing a number on every keystroke.

**New measurements added:** `linear.app/contact/sales` ships a `Company size` **`<select>` at 607px** — the full column width, same as the free-text textarea, for options like `1-10`. Linear gets `autocomplete`, label placement and placeholder copy right and still misses this, which makes it the best available evidence that select-sizing is the rule products actually skip. The same probe shows Linear on `type="email"` where Stripe uses `type="text"`. GOV.UK `Choose location` select at **247px** in the same 748px column as the 218.5px `Sort by` — the same component at two widths, each sized to its own longest option, which is the single clearest evidence for the size-your-selects rule. GOV.UK `--start` button at **157.7×43, 24px** (the one variant that is not 38px). GOV.UK secondary button `#F3F3F3` with a `#858686` lip, 129.5×38. `vercel.com/login` now ships **seven** identical 320×40 buttons including `Continue with ChatGPT`. shadcn's input is `bg-transparent` with `box-shadow: none` at rest.

### Rules that were being followed off a cliff

Six rules were stated without limits. Each now carries its scope inline *and* an entry in *When this advice is wrong*:

1. **"`autocomplete` on every field."** Breaks on any field holding a third party's data — a payee name in a banking app, a patient in a clinic intake, a lead in a CRM — and on shared devices, where it both fills the operator's data into someone else's record and teaches the browser to offer that record to the next person. Scope added: the token asserts *"this is the browser owner's"*; when that is false, ship an unrecognised token per field (never `off`, which Chrome ignores).
2. **"Keep submit enabled while the form is invalid."** Breaks when a failed attempt spends a finite resource: three KYC document submissions per day, a rate-limited and billed SMS, a per-authorisation gateway fee, an irreversible physical action. Scope added, with the constraint that a disabled button must render its reason and the remaining budget adjacent to it.
3. **"Autosave settings, no Save button."** Breaks on settings that are only valid as a set — `min`/`max`, window start/end, threshold/comparator — where committing the first field puts an inverted config live, and worse if the write fires a deploy or a webhook. Scope added: autosave is for settings that are independent, instantly reversible, and inert.
4. **"Hint text above the input."** Breaks in a repeating structure: 20 invoice lines × 3 fields × a 19/25 hint is ~700px of chrome. Scope added: in an array or a table the hint is a column header, once.
5. **"One URL per wizard step."** Breaks when the answers ride in the URL — a DOB or an SSN fragment in the query string lands in history, the Referer header and analytics, and the back button on a shared device hands it to the next user. Scope added: URL per step, answers in a server-side draft, and every step route redirects a draft-less deep link to the first incomplete step.
6. **"Never format while typing"** was already correctly narrowed to the caret rule in the previous pass; left as-is.

### Anti-patterns brought current

The old list was written against tells that agents stopped producing. Items **31–45** replace them with the 2026 set, grounded in a Reddit-mined ranking of 3.2M posts across 47 subreddits (46,971 on-topic, 2020–2026) that puts untouched shadcn/Tailwind defaults first by comment share and the indigo→purple gradient second — ahead of glassmorphism and bento grids, which that pass ranked near the bottom.

The form-specific ones worth naming here, because they come straight from the current default stack rather than from taste: **`useForm({ mode: "onChange" })`** (React Hook Form's shipped defaults, `onSubmit` + `reValidateMode: 'onChange'`, are already what this document recommends — the agent overrides a correct default); **`autoComplete="off"`**, which appears in shadcn's own React Hook Form anatomy example and gets copied into forms that need autofill; **all help text below the input**, because shadcn's anatomy is `FieldLabel → Input → FieldDescription → FieldError` and a format hint lands under the box the user already typed into; **a Sonner toast as the only surface a submit error appears on**; and **a Lucide icon in every field**, which restates the label 8px above it and eats 28px of the content box.

### Self-check made runnable

Every item is now settled by a `grep` (a real ripgrep command), a `shot` (a named thing to look at or measure in a 1440×1000 and 390×844 screenshot), or a `run` (`tools/audit.mjs`, `tools/contrast.mjs`, or one of two DevTools snippets that dump every field's geometry and attributes as a table). Items that previously asked the reader to judge — "gap between field groups is at least 4× the gap between a label and its input", "hint text at ≥7:1", "errored state is signalled by more than color" — are now a ratio computed from the snippet output, a `contrast.mjs` invocation, and a desaturated screenshot respectively.

### Cut

Sentences that did not change a decision, removed or replaced with the decision they implied: *"This is the highest ratio of user-visible benefit to code in the whole document"*; *"GOV.UK's error-message guidance is the best short writing rulebook in existence"*; *"Don't copy the look; copy the conviction"* (replaced with the requirement it encodes — the ring needs a luminance jump, not a hue change); *"Products that fight this hard about autofill do not also introduce a label that autofill can break"*; *"every single design choice is worth copying"*; *"The best form question is one the user never has to answer"* (replaced with *"ship the skip path before you polish the fields"*); *"Mercury's version reads like a document and edits like a dialog"*; the section title *"The small physics"* (now *"Focus rings, autofill, error slots, hit targets"*); and the two-passes provenance paragraph, which is now a list of what was probed and a pointer to what was re-probed.
