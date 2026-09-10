# Form and input craft

**Measured:** 2026-09. Every number below was read off a live page's computed styles at 1440×1000 (Playwright, `getComputedStyle` + `getBoundingClientRect`), or quoted from a component's shipped HTML. Products probed: **Stripe Checkout** (live embedded session, `js.stripe.com/v3/embedded-checkout-inner`), **Stripe Dashboard** signup, **GOV.UK Design System** (13 components, measured inside their own example iframes), **Mercury** (`demo.mercury.com` — the real product, signed in as a demo user), **Linear** (marketing form + a signed-in settings screenshot), **Vercel Geist** (`vercel.com/geist/*`, plus the resolved `--ds-*` / `--geist-*` token values), **Ramp** signup, **shadcn/ui**. Where I could not measure, I say so.

---

## If you only apply five things

1. **One column. No exceptions except a genuinely paired field.** Stripe Checkout puts every field in a 378px single column — email, name, country, address, card — and splits horizontally exactly once, for expiry/CVC (173px + 173px). Ramp splits exactly once, for first/last name (290px + 290px). GOV.UK splits exactly once, for Day/Month/Year. If you cannot name the *pair*, do not split.
2. **Size every field to its content.** GOV.UK ships six fixed widths and uses them: 2 chars = **52px**, 3 = **71px**, 4 = **86px**, 5 = **105px**, 10 = **219px**, 20 = **390px**. A UK postcode field is 105px wide next to a 748px address line. The generated version makes both `w-full` and it is the single loudest tell that a human did not lay out the form.
3. **Label above the field, 4–9px away, always visible.** Stripe Checkout: 16px/20.8 label, **4px** gap to a 44px input. Stripe Dashboard: 14px/20 label, **9px** gap. Linear: 14px/21 label, **8px** gap. Nobody in this sample floats a label into the box. Placeholders are format examples (`1234 1234 1234 1234`, `MM / YY`, `For example, 27 3 2007`), never names.
4. **Do not validate on blur. Validate on submit.** GOV.UK's shipped guidance is literal: *"Do not validate when the user moves away from a field. Wait until they try to move to the next part of the service."* Measured on Stripe Checkout: typing a malformed email produced no error while the field was focused. The one legitimate live check is a hard limit you want to stop before it's wasted — GOV.UK's character count is their named exception.
5. **Set `autocomplete`, `inputmode`, and `type` on every field, even when it looks unnecessary.** Stripe Checkout's ZIP field carries `autocomplete="shipping postal-code"` **and** `inputmode="numeric"` **and** a `--tabularnums` class. Its phone country-code `<select>` carries `autocomplete="never-autocomplete-country-code"` — a deliberately invalid token to *stop* Chrome autofilling it. Nobody at that level ships a bare `<input type="text">`.

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
| **GOV.UK** textarea | 133px (5 rows) | 19/**23.75** w400 | `5px` | 0px | `2px solid #0b0c0c` | same |
| **Linear** (marketing form, dark) | 40px | 14/21 w400 Inter | `0 10px` | **8px** | `1px solid rgba(255,255,255,.05)` on `bg rgba(255,255,255,.05)` | — |
| **Vercel Geist** small | **32px** | 14/20 w400 Geist | `0 12px` | 6px | `--ds-shadow-border-base: 0 0 0 1px #00000014` | `--ds-focus-border: 0 0 0 1px #00000057, 0 0 0 4px #00000029` |
| **Vercel Geist** default | **36px** | 14/20 w400 | `0 12px` | 6px | same | same |
| **Vercel Geist** large | **40px** | 16/24 w400 | `0 12px` | **8px** | same | same |
| **Vercel Geist** select | 32 / 36 / 40 | 14/20 · 14/20 · 16/24 | `0 36px 0 12px` (chevron gutter); `0 36px 0 40px` with leading icon | 6 / 6 / 8 | same | `box-shadow .2s cubic-bezier(.4,0,.2,1)` |
| **Ramp** signup | input element measures 24px; visible chrome is on a wrapper I did not isolate | 16/24 **w300** Lausanne | `0` | 0px | — | — |
| **shadcn/ui** default | **32px** | 14/20 w400 | `4px 10px` | **10px** | `1px solid` neutral-200 | ring utility |

Read the spread: **32–44px** is the entire working range. 32/36px is a dense app control (Vercel, shadcn). 40px is the general-purpose default (GOV.UK, Linear, Stripe Dashboard). 44px is what a *payment* form uses (Stripe Checkout) — deliberately at the iOS touch-target minimum because half the traffic is a thumb on a phone. Nothing ships a 56px input except a marketing hero.

### Label, hint, error — the vertical stack

| Product | Label | Label→input gap | Hint / help | Error text | Field pitch |
|---|---|---|---|---|---|
| **Stripe Checkout** | 16/20.8 w400 `rgba(26,26,26,.9)` **13.03:1** | **4px** | — (uses placeholders as format examples) | **13**/16.9 w400 `#DC2727` **4.81:1** | 16px between groups |
| **Stripe Dashboard** | 14/20 w400 `#1A1F36` **16.2:1** | **9px** | — | — | 17px (input bottom → next label top) |
| **GOV.UK** (standard) | 19/25 w400 `#0b0c0c` **19.59:1**, `margin-bottom: 5px` | **5px** | 19/25 `#484949` **9.03:1**, `mb: 10–15px` | 19/25 **w700** `#CA3535` **5.16:1**, `mb: 15px` | `.govuk-form-group { margin-bottom: 30px }` |
| **GOV.UK** (label as page heading) | **36/40 w700** inside `<h1>`, `mb: 15px` | 15px | same | same | 30px |
| **Linear** (marketing) | 14/21 w400 **`#8A8F98` — secondary, not primary** | **8px** | — | — | 24px |
| **Mercury** settings | 16/16 w360 Arcadia primary | n/a (read-only row) | **13/20** w400 `#535461` **7.48:1**, in a 296px left column | — | 1px rule between rows |
| **Vercel Geist** checkbox | 13/19.5 w400 | — | — | linked via `aria-describedby="…-error"` | — |

Two things to steal. **One:** Linear sets the label in *secondary* text color (`#8A8F98`, ~6:1 on their dark ground) and the input value in primary white — the value outranks its own label, which is correct, because the value is the content. Stripe and GOV.UK do the opposite (label at 13–19:1). Both work; what doesn't work is label and value at the *same* weight and color, which is what a default `<label>` + `<input>` gives you. **Two:** GOV.UK's error message is the only text on the page at **w700** — bold is doing the signalling as much as the red is, which is what makes it survive a monochrome or color-blind read.

### GOV.UK's fixed-width scale, measured

19px GDS Transport, `padding: 5px`, `border: 2px` → 14px of chrome per field.

| Class | Measured width | Content box | Per character | Used for |
|---|---|---|---|---|
| `govuk-input--width-2` | **52px** | 38px | 19.0px | Day, Month |
| `govuk-input--width-3` | **71px** | 57px | 19.0px | — |
| `govuk-input--width-4` | **86px** | 72px | 18.0px | Year |
| `govuk-input--width-5` | **105px** | 91px | 18.2px | UK postcode |
| `govuk-input--width-10` | **219px** | 205px | 20.5px | Phone, reference numbers |
| `govuk-input--width-20` | **390px** | 376px | 18.8px | Names |
| `govuk-!-width-one-quarter` … `-full` | 187 / 249 / 374 / 499 / 561 / **748** | — | — | Fluid, for address lines and free text |

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
| **GOV.UK** | 174×**38**, r**0**, measured fill `#0F7A52` with `box-shadow: 0 2px 0 #083D29` (a solid 2px "lip", not a blur), `padding: 8px 10px 7px`, `mb: 32px` | `Save as draft`, grey, same height, in a `.govuk-button-group` | `--warning` variant (red) for `Delete account` |
| **Linear** (marketing) | 134×44, r9999, 13px **w510**, left-aligned | — | Width fits the label |
| **Ramp** | 704×**56**, r0, `#E4F222` | — | Full width |
| **Stripe Dashboard** | 444×36, r4 | — | Full width |

---

## The decisions

### Single column, and the three real exceptions

Two-column forms cost you the reading path. The eye finishes field 1 (left) and has to decide whether field 2 is to the right or below; every field re-poses the question. Measured evidence that the good products know this: Stripe Checkout is 378px wide on a 1440px viewport — it does not expand to fill. GOV.UK's form column is 748px on the same viewport (two-thirds of a 12-column grid) and never wider.

Split horizontally only when the two fields are **one fact the user holds as one fact**:

- **First / last name.** Ramp: 290px + 290px with a 70px gutter inside a 704px form. One name, two boxes.
- **Expiry / CVC.** Stripe: 173px + 173px under a 346px card number, all three joined into one card.
- **Day / Month / Year.** GOV.UK: 52 + 52 + 86 with their own tiny labels, inside one `<fieldset>` with one `<legend>`.

Everything else — city and state, email and phone, amount and currency — goes on its own row. The AI default is a `grid grid-cols-2 gap-4` wrapper around whatever fields happen to be adjacent, which produces "Email | Phone" side by side and a 400px-wide ZIP code. That is the generated look.

**When two columns are actually right:** a settings *page* (not a form) where the left column is label + explanation and the right is the current value. Mercury's company profile does exactly this — 296px label column at x=346, values at x=722. But note that's a definition list, not a form: see *Settings pages* below.

### Field width is the highest-signal decision you make

This is the one that separates real forms from generated ones, so do it deliberately, per field, before you write any CSS.

Write down the *maximum* content each field will hold, then apply ~1em/char + padding:

| Field | Expected content | Width at 14px/`0 12px`/1px |
|---|---|---|
| Day, Month, CVC, 2-digit anything | 2 | ~54px |
| Year, US ZIP+0, expiry `MM / YY` | 4–5 | ~82–96px |
| UK postcode | 8 incl. space | ~138px |
| Phone | 14 | ~222px |
| Email, name, company | 30+ | full column |
| Address line 1 | 40+ | full column |
| Street/City | 20–25 | full column is fine — it's prose-shaped |

The nuance most people miss: **short fields do not need to be the same width as each other.** GOV.UK's Day is 52px and its Year is 86px, sitting side by side. Making them equal (a `grid-cols-3`) would be *more* symmetric and *less* informative — the widths are telling you how many digits go in each box before you read the label.

**When to ignore this:** dense settings tables and inline-edit grids where every control shares a column, and a ragged right edge would read as a layout bug rather than as information. Vercel's Geist docs show every input at the same 178px in the size comparison for the same reason. If the fields are in a *table*, align them; if they're in a *form*, size them.

### Label placement: top-aligned, and why floating labels are usually wrong

Every product measured puts the label above the field. Nobody floats. The gap is 4–9px — tight enough that the label is unambiguously bound to the field below it, not to the one above.

Left-aligned labels (label in a column to the left of the input) are a legacy of desktop-database UI. They cost horizontal space, force the input column narrow, and break entirely at 390px. Skip.

**Floating labels** — the label that starts as a placeholder and animates to a small caption inside the box on focus — fail for four specific reasons, in order of severity:

1. **The resting state is a placeholder.** Before the user focuses, the field is labelled by grey text that disappears the moment they start typing. Anyone who is interrupted mid-form, comes back, and looks at a filled form has no labels at all. This is the same failure as a bare placeholder, just deferred.
2. **The floated label is too small to read.** To fit inside the box it typically shrinks to 11–12px. Compare the smallest label in the whole measured set: GOV.UK's is **19px**, Stripe's is **16px**, Linear's and Vercel's are **14px**. Nothing ships a 12px label as a field's primary name.
3. **It fights browser autofill.** Chrome fills a field without firing the events some float implementations listen for, so the label sits on top of the value. Stripe works around autofill so aggressively that its input transition string literally reads `box-shadow 0.08s ease-in, color 0.08s ease-in, **filter 50000s**` — a 50,000-second transition on `filter` used to defeat Chrome's autofill background repaint. Products that fight this hard about autofill do not also introduce a label that autofill can break.
4. **It removes the hint slot.** Once the label is inside the box, there is nowhere for the 19px hint line that GOV.UK puts under a third of its labels — and hints prevent more errors than any validation does.

**When floating labels are acceptable:** a single-field surface where the label is redundant to context and vertical space is genuinely scarce — a search bar in a toolbar, an amount field in a compact money-transfer sheet. Not a 12-field application form.

### Required vs optional: mark the minority

GOV.UK's shipped guidance is unambiguous: *"in most contexts, add '(optional)' to the labels of optional fields… Never mark mandatory fields with asterisks."*

The logic is arithmetic. In a form where 11 of 12 fields are required, asterisking the required ones puts 11 asterisks on the page and communicates nothing; the one unmarked field is what carries information, and it's marked by absence, which nobody notices. Marking the one optional field puts one mark on the page and it is exactly the piece of information the user needs.

Flip it if the ratio flips. In a settings form where 2 of 15 fields are required, mark those two — with the word `Required`, not an asterisk. An asterisk is a footnote glyph with no meaning to a screen reader unless you also ship "fields marked * are required" legend text, and the legend is above the fold on a form the user scrolled past.

Where to put it: **in the label text**, not in a badge. `Company name (optional)` at the same size and color as the rest of the label. Not `Company name` + a grey pill.

### Help text vs placeholder — the full case

A placeholder is a value that isn't there. That is its whole semantic. It is drawn in the value's position, in the value's font, and it vanishes when the value arrives. Everything that follows comes from that.

**Placeholders cannot be labels because:**
- They disappear on input, so a filled form loses its labels — the exact moment a user re-reads a form is when they're checking their answers before submitting.
- They are low-contrast by construction. Stripe's is `rgba(26,26,26,.6)` = **4.57:1** — barely over AA, and Stripe is the *careful* end of the range. The common `#999` is **2.85:1** and fails.
- Users mistake them for filled values and skip the field.
- Some screen reader / browser combinations announce them, some don't, and none announce them reliably as the field's name.

**What placeholders are actually for — format examples.** Look at what Stripe puts in them: `1234 1234 1234 1234`, `MM / YY`, `(201) 555-0123`, `email@example.com`. Every one of those is a *shape*, not a name. The name is in the label above (`Card information`, `Email`). This is the correct use and it's a good one: the format example sits exactly where the user's eyes and cursor already are.

**When you need a persistent explanation, use hint text.** GOV.UK's hint sits between the label and the input, 19/25 at `#484949` (**9.03:1** — note it's *not* faint), with `margin-bottom: 10–15px`, and is wired in via `aria-describedby`. A real example from their shipped HTML: label `National Insurance number`, hint `It's on your National Insurance card, benefit letter, payslip or P60 – for example, 'QQ 12 34 56 C'`. That hint is longer than the label and it belongs there, because it eliminates the error instead of catching it.

Mercury's settings help text is the same idea at a smaller scale: 13/20 at `#535461` (**7.48:1**), in a 296px column, e.g. *"This is the name that appears on Mercury and in your notifications."* — it explains the *consequence* of the field, not its format.

**Below-field help** is for a consequence that only matters after entry ("We'll email a receipt here"). **Above-field hint** is for anything that shapes what they type. If in doubt, above.

### Grouping and sectioning

Three mechanisms, in increasing strength. Use the weakest one that works.

1. **Spacing alone.** GOV.UK: 30px between form groups, 0 extra between the label/hint/input inside one. That 30px vs. 5px ratio is 6:1 and it is enough to group without any border.
2. **A `<fieldset>` with a `<legend>`.** When several inputs answer one question. GOV.UK's date input: one legend (`When was your passport issued?`), one hint (`For example, 27 3 2007`), three labelled inputs. The legend is the accessible group name; the tiny `Day`/`Month`/`Year` labels are the field names.
3. **A joined visual stack.** Stripe's radius trick above. Reserve this for fields that are *one* value in the user's head — an address, a card. Do not join "Email + Password"; those are two facts.

For a long form, section headings between groups. GOV.UK's Mercury-scale equivalent is one question per page (below); Mercury's settings pages use an `h2` at 19/28 w400 with rows beneath. Note that heading is *lighter* than the page `h1` (28/36 w380) but the same weight class — sectioning by size, not by adding a rule and a box.

**A caution about card-per-section.** Wrapping every group in a bordered card is the generated default and it's usually wrong at 4+ sections: you get a page of identical rounded rectangles with no hierarchy between them. Mercury uses cards for exactly three notification categories (312×136, r12, `padding: 20px`) at the top of the page, then switches to plain 950×68 rows with hairline rules for the other twelve. Cards mark the *few* things worth marking.

### Input types, `inputmode`, `autocomplete`

This is the highest ratio of user-visible benefit to code in the whole document, and it is the thing generated forms omit most consistently.

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

**When to suppress autofill:** rarely, and deliberately. Stripe's phone country-code select carries `autocomplete="never-autocomplete-country-code"` — an intentionally meaningless token, because `autocomplete="off"` is widely ignored by Chrome for anything it recognises. If you must block a fill, an unrecognised token is more reliable than `off`.

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
- **Live count for a hard limit.** GOV.UK's own named exception. Their character count shows `You have 200 characters remaining` in 19/25 `#484949` under the textarea, plus a visually-hidden static `You can enter up to 200 characters` that is announced once rather than on every keystroke. Their justification: *"it's important that users do not spend time and effort writing out a response that turns out to be too long."*
- **Async availability checks** (username taken, domain unreachable) fire on blur or debounce, never on keystroke, and must show a pending state — otherwise the field flickers between "fine" and "taken" as the user types.

**Be forgiving about input, not strict.** GOV.UK: *"Use validation to ignore unwanted characters"* — spaces in postcodes and card numbers, hyphens in phone numbers, stray whitespace from a paste, punctuation inserted by dictation software. Strip it server-side. A form that rejects `4242 4242 4242 4242` because of the spaces it *told the user to type via its own placeholder* is a bug.

### Message wording

GOV.UK's error-message guidance is the best short writing rulebook in existence; these are their rules and their examples.

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

Geometry: `border: 5px solid #CA3535` on all four sides, `padding: 20px`, `margin-bottom: 50px` (a full 50px of air before the form resumes — this box is meant to be unmissable). Title `There is a problem` at 24/30 w700.

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

**Carry answers forward.** GOV.UK: *"only ask for a piece of information once within a single journey"* — pre-populate or offer the previous answer as a selectable option. Stripe Checkout ships the small version of this as a `Billing info is same as shipping` checkbox (16×16, checked by default) that collapses an entire address group.

### Save, cancel, and dirty state

Three models. Pick one per surface and don't mix them on the same page.

**1. Explicit save (a form).** Buttons at the bottom, left-aligned with the fields, primary first. GOV.UK's button group: `Save and continue` (green, 174×38) then `Save as draft` (grey, 130×38), 15px apart. Two rules: the primary action is a **verb about the outcome** (`Save and continue`, `Create account`, `Pay`) not `Submit`; and `Cancel` is a **link, not a button** — giving destructive-of-work and constructive actions the same visual weight is how people lose twenty minutes of typing.

Disable the submit button only while the request is in flight, never because the form is invalid. A disabled submit gives the user nothing to click to *find out* what's wrong, and screen readers skip disabled controls entirely. Let them submit, then show the error summary.

**2. Autosave (a settings surface, an editor).** No buttons at all. Linear's notification settings — observed in a signed-in screenshot — are a card of rows, each `Title` + secondary description on the left and a toggle on the right, with hairline rules between rows that inset from the card's left padding. There is no Save button anywhere on the page. Every toggle commits immediately.

Autosave requires three things generated code always omits: an **optimistic** local update so the control never lags the finger, a **rollback + inline error** if the write fails, and a **quiet confirmation** for anything the user might doubt. Never a toast per keystroke.

**3. Autosave with a debounced text field.** The hard case — settings pages with free-text inputs. Options in order of preference: (a) commit on blur, (b) commit on a 500–1000ms debounce with a `Saving…` → `Saved` micro-label near the field, (c) don't; use a modal with an explicit save, which is what Mercury does.

**Dirty state.** If a form can hold unsaved work, guard navigation — `beforeunload` for the tab, a router guard for in-app links, and a confirm dialog whose options are `Discard changes` / `Keep editing`, not `OK` / `Cancel`. And label the state: a sticky footer bar reading `You have unsaved changes` with `Save` and `Discard` is better than a silent form plus a surprise dialog, because it tells the user *before* they try to leave.

### Destructive and irreversible confirmations

Scale the friction to the blast radius. Three tiers:

**Tier 1 — reversible.** No dialog. Do it and offer `Undo` in a toast for 5–10 seconds. Archiving, removing a row from a list, unpublishing.

**Tier 2 — hard to reverse.** A dialog naming the specific object and the specific consequence. The title is the question (`Delete "Q3 forecast"?`), the body is the consequence in one sentence, and the confirm button is the **verb** (`Delete`), never `OK` or `Yes`. GOV.UK ships a dedicated `govuk-button--warning` variant for exactly this — measured red-on-white, same 38px height as every other button, so the *color* carries the warning without the button growing.

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
- **A single input is more robust than six boxes.** Six-box implementations break paste, break autofill, break backspace across boxes, and confuse screen readers about how many fields exist. If you must ship boxes, back them with one real input and treat the boxes as presentation.
- Size to the code: 6 digits ≈ 6em + padding. Tabular figures. Auto-submit on the last digit only if you also handle "the code was wrong" gracefully — otherwise the user gets an error before they've finished reading their own screen.

**Address.**
- **Lookup first, manual always available.** Stripe Checkout puts an `Enter address manually` link — a 132×16 secondary text button — directly under the autocomplete field. The link is visible before the user struggles, not after.
- If you use multiple inputs, apply the `autocomplete` tokens (`address-line1`, `address-level2`, `address-level1`, `postal-code`, `country`) — GOV.UK explicitly frames this as a WCAG 1.3.5 obligation.
- Country **first**, because it changes the shape of everything below it (Stripe's order: name → country → address). Generated forms put country last, which means the state dropdown is wrong until it's re-rendered.
- Size to content: postcode 105px (GOV.UK's `--width-5`), address lines full width.
- Only make the fields you actually need mandatory. GOV.UK: county should be optional or absent — *"it's not part of a correct UK address, according to Royal Mail."*

**Phone.**
- `type="text"` (or `tel`) + `autocomplete="tel"` + a placeholder that shows the format. Stripe: `(201) 555-0123`.
- Country code as a compact leading `<select>` inside the same visual field — Stripe's is 32px wide inside a 346px field, with `autocomplete` deliberately disabled on it.
- Accept and strip spaces, dashes, parens, and a leading `+`. Never reject on formatting.
- Field width ~14 characters ≈ 220px, not full-width.

**Date.**
- For a **memorised** date (birthday, passport issue date), three text inputs beat a date picker. GOV.UK: Day (52px) / Month (52px) / Year (86px), each `type="text" inputmode="numeric"`, each with its own visible label, inside one fieldset, with a hint `For example, 27 3 2007`. A user typing their own birthday should never have to navigate a calendar back 40 years.
- For a **chosen** date (an appointment, a deadline), a calendar picker — because the user is reasoning about weekdays and availability, not recalling a number. Keep a typable text input alongside it.
- Never `type="number"` for the parts. Never `maxlength="2"` with auto-advance between boxes — it breaks backspace and paste.
- Accept `3` and `03` for the month, and accept a 2-digit year if you can disambiguate it.

**Currency / amount.**
- `inputmode="decimal"`, not `numeric` (numeric hides the decimal separator on some Android keyboards).
- **Tabular figures**, always. Mercury sets `font-variant-numeric: tabular-nums` on every amount in the product — measured on their sidebar balance `$2,023,267.12` — and goes further: each thousands separator is wrapped in its own span with `padding-right: 0.39px`, sub-pixel kerning applied to a comma so the digit groups sit at even intervals. That's the level of care fintech typography actually gets.
- Put the currency symbol in a **prefix affix inside the field**, not in the value the user types and not as a floating label. Vercel's Geist input ships exactly this affordance: a 38–71px prefix/suffix label welded to the input (measured `https://` prefix at 71px, `.com` suffix at 57px, at 36px input height). Same mechanic, `$` or `USD`.
- Right-align the value if amounts appear in a column; left-align if it's a lone field.
- Format on blur (`1234.5` → `1,234.50`), never while typing — reformatting mid-keystroke moves the caret.
- Don't use `type="number"`. Users paste `$1,234.56`.

**File upload.**
- Both affordances: a real `Choose file` button and a drop target. GOV.UK's improved component ships exactly these two.
- State the constraints **before** the picker opens, in hint text: accepted types, max size, max count. An error after a 40MB upload has already failed is the worst possible time to mention the 10MB limit.
- Show per-file progress with a cancel control, and show the file name and size after upload with a `Remove` action.
- Set `accept` to narrow the OS picker, but **also validate server-side** — `accept` is a filter, not a constraint.
- GOV.UK's rule worth stealing: *"make sure users can easily reuse a previously uploaded file within a single journey"* — if you ask for the same ID document twice, offer the first upload as a selectable option rather than making them find the file again.
- Never make the drop zone the *only* affordance. Drag-and-drop is unavailable to keyboard users and awkward on touch.

### Settings pages are forms in disguise — and the best ones aren't forms

Three patterns in the wild, all measured:

**Mercury: the read-only definition list.** Company profile at `demo.mercury.com/settings/company-profile` renders as rows, not fields. Left column (296px, at x=346): a 16/16 w360 label plus 13/20 `#535461` help text. Right column (x=722): the **current value as plain text**, with a small `Edit ›` link beneath it if the field is editable. Rows separated by 1px rules. **There are no inputs on the page and no Save button.** Fields that can't be changed — `Legal name`, `Federal EIN` — simply have no Edit link; the EIN's value is masked to `••••••••`. Clicking Edit opens a focused form for that one field.

Why this is better than the obvious alternative: a settings page is read ten times for every time it's written. Rendering it as forty live inputs makes the reading case worse (inputs are visually noisy, and a filled input is harder to scan than plain text), makes accidental edits possible, and forces you to invent a save model. Mercury's version reads like a document and edits like a dialog.

**Linear: autosave rows with toggles.** Notification settings — observed in a signed-in screenshot, so structure only, no measurements — are a card containing rows: title + secondary description on the left, control on the right, hairline rules between rows inset from the card padding. Toggles commit immediately; there's no Save. Correct because every setting is a single boolean with an instant, visible effect.

**Sectioned cards with per-section save.** Each settings section is its own card with its own footer save button, so the "dirty" scope is one card rather than the page. (I could not measure Vercel's project settings — it's behind a login — so treat this as the pattern, not as Vercel's exact numbers.) This is the right middle ground when settings are text fields, which can't autosave cleanly, but there are too many to open a dialog for each.

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

### The small physics

**Focus rings.** Two schools, both measured, both defensible:

- **Accent ring** — Stripe Checkout: `0 0 0 1px #3297d3, 0 1px 1px rgba(0,0,0,.07), 0 0 0 3px rgba(50,151,211,.9)`. The border recolors to the accent *and* a 3px halo appears. Transition `box-shadow .08s ease-in` — 80ms, fast enough to feel instant, slow enough not to flash.
- **Neutral ring** — Vercel Geist: `--ds-focus-border: 0 0 0 1px #00000057, 0 0 0 4px #00000029`. The border just darkens and gets a soft grey halo. Their *blue* ring (`--ds-focus-ring: 0 0 0 2px #fff, 0 0 0 4px hsl(212 100% 48%)` — a 2px white gap then 2px blue, so it reads on any background) is reserved for `:focus-visible` on non-input controls.

Either way: **never `outline: none` without a replacement**, and put the ring on `box-shadow` or `outline` rather than `border`, so focusing doesn't change the element's size and shift the layout by 1px.

GOV.UK's is the outlier and worth knowing about: a solid `#fd0` yellow block behind the focused element with a black bottom bar. It's ugly and it is unmissable at any contrast level, which is the whole point for a service that must work for everyone. Don't copy the look; copy the conviction.

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

**Type-to-confirm is wrong below Tier 3.** Making someone type `newsletter-draft` to delete a draft they created 30 seconds ago is theatre, and theatre trains people to do it without reading, which is exactly what you didn't want when it mattered.

---

## What AI-generated forms get wrong

Each of these is a pattern you will produce by default. The correction is specific.

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

**21. Six separate boxes for an OTP.**
Breaks paste, autofill, and backspace. → One input, `autocomplete="one-time-code"`, `inputmode="numeric"`, sized to the code length.

**22. A calendar picker for a date of birth.**
40 clicks back through months. → Three text inputs (D/M/Y), `inputmode="numeric"`, own labels, one fieldset, hint with an example date.

**23. Drag-and-drop as the only upload affordance, and constraints revealed only on failure.**
→ Button *and* drop zone. Accepted types, max size, and max count stated in hint text before the picker opens.

**24. Fields cleared after a failed submit.**
→ Re-render with everything the user typed, exactly as they typed it.

---

## Self-check

Run this against the form you just wrote.

**Layout**
- [ ] One column. Every horizontal split is a named pair (first/last, expiry/CVC, D/M/Y).
- [ ] Every field's width is derived from its expected content, not from the container. No 400px ZIP code.
- [ ] Form column has a max width (Stripe 378px, GOV.UK 748px — pick one and hold it).
- [ ] Gap between field groups is at least 4× the gap between a label and its input.

**Labels and help**
- [ ] Every input has a visible `<label>` with a matching `for`/`id`.
- [ ] Label sits above the input, 4–9px away.
- [ ] No placeholder is doing a label's job. Placeholders contain format examples only.
- [ ] Hint text (if any) is above the input, ≥7:1 contrast, wired via `aria-describedby`.
- [ ] The minority — required or optional, whichever is fewer — is marked, in the label text.

**Attributes**
- [ ] Every personal-data field has an `autocomplete` token, section-prefixed where there are two addresses.
- [ ] `new-password` on create, `current-password` on sign-in, `one-time-code` on OTP.
- [ ] Every numeric field has `inputmode` (`numeric` or `decimal`).
- [ ] No `type="number"` on identifiers, codes, or dates.
- [ ] Grouped inputs are in a `<fieldset>` with a `<legend>`.

**Validation**
- [ ] Nothing validates while the field is focused and untouched.
- [ ] Errors appear on submit; after a field has errored, it re-validates on input to clear.
- [ ] No message says "required", "invalid", "please", or an error code.
- [ ] Each message names the field and the fix, and matches the label's wording.
- [ ] Inline message and summary message are the identical string.
- [ ] Whitespace, hyphens, and parens are stripped, not rejected.
- [ ] The form re-renders with the user's values after a failed submit.

**Errors, structurally**
- [ ] Forms longer than one viewport have a summary at the top, focus moved to it, links to each field.
- [ ] Error slot is reserved or height-animated; nothing below shifts.
- [ ] Errored state is signalled by more than color (bold text, an icon, a border-width or side-bar change).
- [ ] Page `<title>` is prefixed on failure.

**Actions**
- [ ] Primary button label is the outcome verb.
- [ ] Cancel is lower-emphasis than the primary.
- [ ] Submit is enabled while the form is invalid.
- [ ] Destructive actions have friction proportional to reversibility; irreversible ones use type-to-confirm.
- [ ] Unsaved work is guarded on navigation, with `Discard` / `Keep editing` labels.

**Settings specifically**
- [ ] Autosaving controls and explicitly-saved controls are not mixed in one group.
- [ ] Autosaved writes are optimistic, silent on success, and roll back with an inline error on failure.
- [ ] Non-editable values have no edit affordance at all.

**Physics**
- [ ] Visible focus ring on every control, in both themes, that doesn't shift layout.
- [ ] Hit targets ≥44px on touch; label text is part of the target for checkboxes and radios.
- [ ] Autofill doesn't repaint the field into something that looks broken.
- [ ] Money and codes use `font-variant-numeric: tabular-nums`.
- [ ] Nothing reformats the value while the caret is in the field.
