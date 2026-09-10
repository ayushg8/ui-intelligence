# Forms, validation and input components

**Evaluated:** 2026-09 · **Researcher note:** Two structural shifts landed in the last twelve months and most advice online hasn't caught up. (1) shadcn/ui switched its default primitive layer from Radix to Base UI in July 2026, explicitly citing weak combobox support and awkward form integration — which means the `cmdk` + Popover combobox kludge and the Radix `Select`-with-no-multiple era is over. (2) Validation consolidated around Standard Schema, so the schema library is now a swappable detail rather than an architecture decision. The form-state layer itself is settled and boring: React Hook Form won and nothing has dislodged it. What's still genuinely unsolved is the *component* layer — date range pickers, tag inputs and phone/currency masks are all still stitched together from libraries that are one maintainer deep or years stale.

## Verdict at a glance
| Library | Tier | One-line verdict | Vibecode risk |
|---|---|---|---|
| React Hook Form | `essential` | The default form-state layer; boring, fast, 38M downloads/wk, still shipping monthly | low (headless) |
| Base UI | `essential` | `Field` + `Combobox` finally make label/error/chips wiring correct by construction | low |
| Zod 4 | `essential` | The schema default; ecosystem gravity is overwhelming and v4 fixed the perf story | n/a |
| React Aria Components | `essential` | Best-in-class DateField/DatePicker and the only serious i18n calendar story | low |
| input-otp | `essential` | One person solved OTP inputs completely; nobody needs to write another | medium |
| Valibot | `strong` | Zod's ideas at ~1.4 kB tree-shaken; correct choice for edge/bundle-sensitive code | n/a |
| TanStack Form | `strong` | Best TypeScript inference and cross-framework story, at real API-surface cost | low |
| Conform | `strong` | The only library that treats the server as the authority; niche but excellent | low |
| react-day-picker / @daypicker/react | `strong` | The calendar everyone actually ships; note the v10 package rename | high (shadcn default look) |
| react-dropzone | `strong` | 3 open issues, 11.6M/wk, zero opinions about your UI. Still correct. | low (headless) |
| Uppy | `strong` | v5 added headless components/hooks, escaping the pink Dashboard house style | medium (was high) |
| Formisch | `experimental` | Valibot author's form library; shadcn already lists it, adoption hasn't followed | low |
| Cally | `experimental` | Framework-agnostic web-component calendar, 25k/wk, still 0.x, 7 contributors | low |
| ArkType | `situational` | Fastest validator and the nicest syntax; smallest ecosystem of the big three | n/a |
| react-number-format / react-phone-number-input | `situational` | Correct for currency and phone specifically; do not reach for a generic masker | low |
| Pintura | `situational` | Paid, genuinely good image editor; only when cropping is a product feature | medium |
| Formik | `avoid` | 34k stars, 840 open issues, last release Nov 2025. A reputation, not a library. | — |
| react-select | `avoid` | Instantly recognizable 2018 look; 14 months since last publish | high |
| react-input-mask | `avoid` | **Archived repo**, still pulling 613k downloads/wk | — |
| imask / react-imask | `avoid` (new work) | Last npm publish May 2024, repo untouched since Oct 2024 | — |
| cmdk (as a combobox) | `avoid` (new work) | Last publish Mar 2025; Base UI Combobox supersedes it for form fields | high |
| Origin UI / coss ui | `reference-only` | Great input catalogue, now AGPL-3.0 outside two directories | high |

## Recommendations by need
- **Default choice:** React Hook Form + Zod 4 + Base UI `Field`. Three libraries, no house style, every piece independently swappable via Standard Schema.
- **Best engineering:** TanStack Form. Its typed-state model is genuinely better than RHF's; you pay in API surface and a much smaller ecosystem of pre-built adapters.
- **Best visual quality out of the box:** none of the headless options — that is the point. Of the things that ship visuals, **input-otp**'s demo is the only one I'd ship nearly unchanged.
- **Best accessibility:** React Aria Components, not close. Its `DateField` segmented mm/dd/yyyy input, live-region announcements and non-Gregorian calendar support are years ahead of everyone.
- **Most customizable / least house-style:** Base UI. Every part is a slot; the unstyled default is a bare 1px box, so nothing leaks into your design.
- **Lightest:** Valibot (~1.4 kB gzipped tree-shaken) for schemas; Formisch (~2.5 kB) for form state if you can accept a v1.1 library.
- **Promising newcomer:** Formisch. Schema-first, framework-agnostic core with native reactivity per framework, already listed on shadcn's Forms page alongside RHF and TanStack.
- **Premium/paid worth it:** Pintura, but only if in-browser cropping/annotation is a product feature rather than an avatar upload.

## Scorecards

### React Hook Form — `essential`
- **What:** Uncontrolled-first React form state, validation orchestration and error surface.
- **Verdict:** The argument is over. 38.2M weekly downloads is roughly 15× TanStack Form and 10× Formik, and unlike Formik it is still shipping — v7.87.0 landed 2026-08-30 with 7 open issues against 411 contributors. The uncontrolled model means typing in one field doesn't re-render the form, which matters more than any benchmark blog admits once you have 30 fields. Its real weakness is TypeScript: deep path inference on nested field arrays degrades, and that is precisely where TanStack Form and Formisch beat it.
- **Use when:** any React form, by default. · **Don't use when:** the form's authority is a server action and you need it to work without JS — use Conform.
- **Scores /5:** visual — · interaction 4 · a11y 3 · engineering 5 · maintenance 5 · docs 4 · customization 5 · perf 5 · stability 5 · originality 3
- **Evidence:** ★44,850 · last release v7.87.0 2026-08-30 · last push 2026-09-09 · 38,214,452 wk npm · ~411 contributors · MIT · listed as a first-class option on shadcn/ui's Forms page (verified 2026-09)
- **Looked at:** https://ui.shadcn.com/docs/components/form — shadcn's Forms page now offers four framework tiles: React Hook Form, TanStack Form, Formisch, and `useActionState` (Coming Soon). RHF is first.
- **Vibecode risk:** low — it renders nothing. The recognizable look comes from whatever `<FormMessage>` you pair it with.
- **Link:** https://react-hook-form.com

### Base UI — `essential`
- **What:** Unstyled, accessible React primitives from the MUI team; `Field`, `Fieldset`, `Combobox`, `Select`, `Autocomplete`, `NumberField`.
- **Verdict:** The most consequential thing to happen to form components in two years. `Field.Root / Label / Control / Description / Error` makes the label-to-input and error-to-input associations structural rather than something you remember to wire, which is the single most common accessibility failure in hand-built forms. `Combobox` ships `Chips` / `Chip` / `ChipRemove` parts, so tag input and multi-select are first-class instead of a react-select dependency. shadcn/ui made it the default in July 2026 citing Radix's weak combobox and awkward form integration; Radix itself was acquired by WorkOS and slowed.
- **Use when:** you are building form components you intend to own. · **Don't use when:** you need Adobe-grade date/i18n — React Aria still wins there.
- **Scores /5:** visual 3 (unstyled by design) · interaction 5 · a11y 5 · engineering 5 · maintenance 5 · docs 5 · customization 5 · perf 4 · stability 4 · originality 4
- **Evidence:** ★10,869 · last release v1.8.0 2026-09-04 · last push 2026-09-09 · 429,187 wk npm · ~305 contributors · MIT · default primitive layer of shadcn/ui since 2026-07 (verified)
- **Looked at:** https://base-ui.com/react/components/combobox — the demo renders a genuinely unstyled control: square corners, 1px near-black border, native-looking caret, no radius, no shadow. Docs lead with four *Usage guidelines* that draw the Combobox / Autocomplete / Select boundary and state "Form controls must have an accessible name" before showing a single prop. The right sidebar lists 15+ named parts. On 390px the `Field` page is clean but its own code panel clips horizontally — a docs bug, not a component one.
- **Vibecode risk:** low — there is no default look to leak. The risk is downstream: everyone copying shadcn's Base UI theme lands on the same 6px-radius grey-border field.
- **Link:** https://base-ui.com

### Zod 4 — `essential`
- **What:** TypeScript-first schema declaration and validation; the de facto standard.
- **Verdict:** 246.7M weekly downloads is not a typo and not a fair fight — Zod is now infrastructure, and roughly every form library, tRPC, and AI SDK accepts it. v4 answered the two real criticisms: `zod/mini` gets you to ~3.9 kB gzipped, and runtime perf is now roughly at parity with Valibot. It is still the heaviest of the three big options in a full build, and if you are shipping a library rather than an app you should not force Zod on your consumers — accept Standard Schema instead.
- **Use when:** default, especially anywhere the schema is shared with a server. · **Don't use when:** the schema ships to an edge worker or a widget where 15 kB matters.
- **Scores /5:** visual — · interaction — · a11y — · engineering 5 · maintenance 5 · docs 5 · customization 4 · perf 4 · stability 5 · originality 4
- **Evidence:** ★43,917 · last release v4.6.1 2026-09-09 · last push 2026-09-09 · 246,731,317 wk npm · ~462 contributors · MIT
- **Looked at:** not screenshotted — no UI surface to judge.
- **Vibecode risk:** n/a
- **Link:** https://zod.dev

### React Aria Components — `essential`
- **What:** Adobe's accessible, unstyled React component layer; the reference implementation for `DateField`, `DatePicker`, `DateRangePicker`, `ComboBox`, `NumberField`.
- **Verdict:** If your form has a date in it, look here first. The `DateField` segmented input — three focusable `mm` / `dd` / `yyyy` segments that take arrow keys and never make the user fight a text mask — is the correct date-entry UX and almost nobody else implements it. `@internationalized/date` (10.3M/wk on its own) gives you Hijri, Buddhist, Hebrew and Japanese calendars without a second library, and it is a clean landing pad when Temporal becomes Baseline. The cost is verbosity: a styled DatePicker is a lot of code compared to dropping in a shadcn Calendar.
- **Use when:** dates, times, number fields, or any product with a real accessibility bar. · **Don't use when:** you want a date picker in ten minutes.
- **Scores /5:** visual 3 · interaction 5 · a11y 5 · engineering 5 · maintenance 5 · docs 5 · customization 5 · perf 4 · stability 5 · originality 5
- **Evidence:** ★15,860 (react-spectrum monorepo) · last release react-aria-components@1.21.1 2026-09-04 · last push 2026-09-10 · 3,520,784 wk npm (`react-aria-components`), 7,614,682 (`react-aria`), 10,286,530 (`@internationalized/date`) · ~409 contributors · Apache-2.0
- **Looked at:** https://react-spectrum.adobe.com/react-aria/DatePicker.html — the live example is a bordered `mm/dd/yyyy` segmented field with a chevron trigger, and the docs put a *Vanilla CSS / Tailwind* toggle plus a live theme picker directly above it. Typography is a confident geometric sans at generous size; hierarchy is instant. The docs are the strongest of anything in this category.
- **Vibecode risk:** low — unstyled. The default "Indigo" doc theme is a doc theme, not a shipped default.
- **Link:** https://react-spectrum.adobe.com/react-aria/

### input-otp — `essential`
- **What:** A one-time-passcode input for React: unstyled, paste-friendly, correct on mobile keyboards.
- **Verdict:** The clearest case in this whole category of a tiny library completely solving one problem. 21.1M weekly downloads off 16 contributors, and it is what shadcn's `InputOTP` wraps. It handles the things everyone gets wrong by hand: pasting a 6-digit code from a text message, `autocomplete="one-time-code"`, backspace across slot boundaries, and a real caret rather than a fake one. Reach for it instead of writing six `<input maxlength=1>` elements, always.
- **Use when:** any OTP / 2FA / verification-code field. · **Don't use when:** never, in its lane.
- **Scores /5:** visual 4 · interaction 5 · a11y 4 · engineering 5 · maintenance 4 · docs 4 · customization 5 · perf 5 · stability 5 · originality 5
- **Evidence:** ★3,249 · last release v1.5.0 2026-08-18 · last push 2026-08-26 · 21,117,032 wk npm · ~16 contributors · MIT · site self-reports use by Cluely and MongoDB (logos shown on their own page; not independently verified)
- **Looked at:** https://input-otp.rodz.dev — pure `#000` ground with a faint ASCII-character texture, tight-tracked bold headline, and six slots at ~12px radius with a 2px white ring plus caret on the active slot and a small separator dot between groups of three. It is restrained: no gradient CTA, no glow. Would pass a strong product designer.
- **Vibecode risk:** medium — the shadcn `InputOTP` default (grey bordered slots joined into one group with the middle dash) is now so widespread it reads as "this app was built last week". Restyle the slots.
- **Link:** https://input-otp.rodz.dev

### Valibot — `strong`
- **What:** Modular, tree-shakeable schema validation; every validator is a separate import.
- **Verdict:** The right answer whenever the schema crosses a bundle boundary. ~1.4 kB gzipped tree-shaken against Zod's full build is the kind of gap that actually changes a Lighthouse score on an edge-rendered signup page. Runtime perf is now roughly at parity with Zod v4, so this is a bundle argument, not a speed one. The functional pipe API (`v.pipe(v.string(), v.email())`) reads worse than Zod's chaining to most people — that is the real cost, not capability. 16.75M/wk means it is past the "will this survive" question.
- **Use when:** edge runtimes, published libraries, widgets, anything client-bundled. · **Don't use when:** the team already knows Zod and bundle size isn't binding — the migration isn't worth it.
- **Scores /5:** visual — · interaction — · a11y — · engineering 5 · maintenance 5 · docs 5 · customization 4 · perf 5 · stability 5 · originality 5
- **Evidence:** ★8,981 · last release v1.5.0 2026-09-09 · last push 2026-09-10 · 16,750,502 wk npm · ~201 contributors · MIT · co-author of the Standard Schema spec
- **Looked at:** not screenshotted — no UI surface.
- **Vibecode risk:** n/a
- **Link:** https://valibot.dev

### TanStack Form — `strong`
- **What:** Framework-agnostic, fully typed form state for React, Vue, Angular, Solid and Lit.
- **Verdict:** Technically the most interesting form library here, and the one whose reputation most exceeds its adoption: 2.6M weekly downloads to RHF's 38.2M. Its TypeScript inference through nested objects and field arrays genuinely does not degrade the way RHF's does, and its per-field subscription model avoids the "re-render everything" problem without going uncontrolled. The costs are real: more ceremony per field, a smaller adapter ecosystem, and a v2 alpha already in flight across the non-React packages while v1 is barely a year old.
- **Use when:** deeply nested dynamic forms, or a codebase already on TanStack Query/Router. · **Don't use when:** you want the largest pool of copy-pasteable examples — that is still RHF.
- **Scores /5:** visual — · interaction 4 · a11y 3 · engineering 5 · maintenance 5 · docs 4 · customization 5 · perf 5 · stability 4 · originality 4
- **Evidence:** ★6,679 · last release @tanstack/react-form 1.33.5 2026-08-11 (v2 alphas shipping for Vue/Svelte/Solid as of 2026-08-21) · last push 2026-09-05 · 2,637,357 wk npm · ~218 contributors · MIT
- **Looked at:** https://ui.shadcn.com/docs/components/form — TanStack Form is one of shadcn's four blessed form layers, which is meaningful third-party validation.
- **Vibecode risk:** low — headless.
- **Link:** https://tanstack.com/form

### Conform — `strong`
- **What:** Progressive-enhancement form library built on `FormData`, native constraint validation and server actions.
- **Verdict:** The only library here with a genuinely different thesis: the server is the authority and the form works with JavaScript disabled. If you are on the Next.js App Router or React Router with server actions, that is not ideology, it is less code — you write the schema once, `parseWithZod` on the server, and hand `lastResult` back through `useActionState`. 215k weekly downloads is small but it is up and the release cadence is healthy (v1.21.1 in August, releases roughly monthly). It is the wrong tool for a heavily interactive client form with cross-field reactivity.
- **Use when:** server actions, progressive enhancement, or forms where the server already owns validation. · **Don't use when:** the form is a rich client-side wizard with live dependent fields.
- **Scores /5:** visual — · interaction 3 · a11y 5 · engineering 5 · maintenance 4 · docs 4 · customization 4 · perf 5 · stability 4 · originality 5
- **Evidence:** ★2,577 · last release v1.21.1 2026-08-18 · last push 2026-09-10 · 215,076 wk npm · ~81 contributors · MIT
- **Looked at:** not screenshotted — no UI surface.
- **Vibecode risk:** low — it renders your markup.
- **Link:** https://conform.guide

### react-day-picker / @daypicker/react — `strong`
- **What:** A calendar component — grid, selection modes, localisation. Not a date picker: no input, no popover.
- **Verdict:** The calendar that everything ships, largely because shadcn's `Calendar` wraps it — 28.8M weekly downloads is downstream of that, not of independent choice. It is well built: WCAG 2.1 AA, ISO/Persian/Hijri/Buddhist/Ethiopic/Hebrew calendars, timezone-aware, 12 open issues against 185 contributors. **Important, and widely missed:** v10 (Feb 2026) renamed the package to `@daypicker/react`; the old name still publishes the same API for compatibility, and the new name has only 324k/wk against the old name's 28.8M, so nearly nobody has migrated. Know which one you're installing. For an actual date *picker* you still supply the input, popover and keyboard handling yourself — that is where React Aria wins.
- **Use when:** you need a styleable month grid inside your own design system. · **Don't use when:** you want a complete accessible date picker without assembling one.
- **Scores /5:** visual 3 · interaction 4 · a11y 4 · engineering 4 · maintenance 5 · docs 4 · customization 5 · perf 4 · stability 4 · originality 3
- **Evidence:** ★6,850 · last release v10.0.1 2026-05-15 · last push 2026-08-26 · 28,801,645 wk npm (`react-day-picker`) / 324,624 (`@daypicker/react`) · ~185 contributors · MIT
- **Looked at:** https://daypicker.dev — utilitarian Nextra-style docs, emoji bullet list, no design ambition. Zero styling ships by default, which is honest; the recognizable look comes entirely from shadcn's stylesheet.
- **Vibecode risk:** high, indirectly — the shadcn Calendar skin (36px round day cells, muted outside days, a single accent-filled selected day) is one of the most identifiable "AI-built app" tells in circulation. Restyle the day cell.
- **Link:** https://daypicker.dev

### react-dropzone — `strong`
- **What:** A hook that turns any element into a file drop target. Nothing else.
- **Verdict:** A rare case of a library that is finished. **Three** open issues, 174 contributors, 11.6M weekly downloads, last push 2026-08-30. It has no UI, no upload transport and no opinions — you get `getRootProps` / `getInputProps` and file-type/size rejection, and you build the rest. For the ~90% of products where "file upload" means an avatar or a PDF attachment posted to your own endpoint, this plus a `<progress>` is the whole job, and it will not date your interface.
- **Use when:** you own the upload endpoint and the UI. · **Don't use when:** you need resumable/chunked uploads, remote sources, or image transforms.
- **Scores /5:** visual — · interaction 4 · a11y 4 · engineering 5 · maintenance 5 · docs 4 · customization 5 · perf 5 · stability 5 · originality 2
- **Evidence:** ★11,014 · last push 2026-08-30 · 11,610,219 wk npm · ~174 contributors · MIT · 3 open issues
- **Looked at:** not screenshotted — renders nothing of its own.
- **Vibecode risk:** low — but the dashed-border grey rectangle with a centred cloud icon that everyone builds on top of it is itself a tell. Vary the empty state.
- **Link:** https://react-dropzone.js.org

### Uppy — `strong`
- **What:** Full file-upload stack: dropzone, remote sources (Drive, Dropbox, Box, Unsplash, webcam, screencast), resumable tus/S3 multipart, Companion server.
- **Verdict:** Historically the most capable and the most visually compromising choice in this category — the Dashboard's pink-and-charcoal identity leaked into every product that used it. **v5 fixed the actual objection**: headless components (`UploadButton`, `Dropzone`, `FilesList`, `FilesGrid`, `Thumbnail`) and hooks (`useDropzone`, `useFileInput`, `useRemoteSource`, `useWebcam`, `useScreenCapture`) let you keep the transport and throw away the chrome. It is now on v6.0.1 with a genuinely healthy 435-contributor project behind it. Note the v5 breaking changes: CSS moved to `css/styles.min.css` and React imports moved to subpaths.
- **Use when:** resumable uploads, multi-GB files, or importing from Drive/Dropbox. · **Don't use when:** you're uploading one avatar — that is react-dropzone's job.
- **Scores /5:** visual 3 · interaction 5 · a11y 4 · engineering 5 · maintenance 5 · docs 4 · customization 4 · perf 4 · stability 4 · originality 4
- **Evidence:** ★30,969 · last release uppy@6.0.1 2026-09-07 · last push 2026-09-10 · 1,089,091 wk npm (`@uppy/core`), 455,832 (`@uppy/react`) · ~435 contributors · MIT
- **Looked at:** https://uppy.io — top banner reads "5.0 Headless components and hooks are here". The hero Dashboard shows twelve source tiles (My Device, Camera, Dropbox, Link, OneDrive, Unsplash, Box, Screencast, Audio, Zoom, Google Drive, Google Photos) — genuinely more capable than anything else here, and instantly recognizable, which is exactly the problem headless mode solves. Their install panel now leads with a "Build with Agents" tab ahead of Next.js/React/Vue.
- **Vibecode risk:** medium, down from high — only if you ship the prebuilt Dashboard.
- **Link:** https://uppy.io

### Formisch — `experimental`
- **What:** Schema-first, headless form library for React, Vue, Svelte, Solid, Angular, Preact, Qwik and React Native, by Valibot's author.
- **Verdict:** The most interesting new thing in this category and the biggest gap between endorsement and adoption I found. shadcn/ui lists Formisch as one of four blessed form layers next to React Hook Form and TanStack Form — that is remarkable for a library at 1,176 stars — yet `@formisch/react` pulls 5,690 weekly downloads. The design is good: a framework-agnostic core with framework-native reactivity compiled in, ~2.5 kB starting bundle, and end-to-end typed nested paths. The risk is concentration: ~23 contributors, and the same author already maintains Valibot, Standard Schema and Modular Forms.
- **Use when:** a side surface, or a multi-framework design system where one form model across React and Svelte is worth real money. · **Don't use when:** it's the checkout flow.
- **Scores /5:** visual — · interaction 4 · a11y 3 · engineering 5 · maintenance 3 · docs 4 · customization 4 · perf 5 · stability 3 · originality 5
- **Evidence:** ★1,176 · last release v1.1.0 2026-09-08 · last push 2026-09-08 · 5,690 wk npm (`@formisch/react`) · ~23 contributors · MIT · listed on shadcn/ui's Forms page (verified 2026-09)
- **Looked at:** https://formisch.dev — note the docs site 404s on `/react`; you land on a clean but unremarkable Nextra-style page (blue pill CTAs, a cardboard-box mascot). Docs design is not where the effort went.
- **Vibecode risk:** low — headless.
- **Link:** https://formisch.dev

### Cally — `experimental`
- **What:** Calendar and date-range custom elements. Framework-agnostic, ~9 kB, no React dependency.
- **Verdict:** The genuinely underrated find here. Being web components means it drops into React, Vue, Svelte, Astro or plain HTML unchanged, and it styles entirely through CSS custom properties and slots rather than a className API — which is a better customization model than anything else in this list. It is also small, focused and clearly built by someone with taste. The caveats are unavoidable: 25k weekly downloads, 7 contributors, still 0.9.2 with no 1.0 after four years, and last release Feb 2026. Do not put it in a checkout path.
- **Use when:** a multi-framework or framework-free context, or a marketing/booking surface where a 9 kB calendar beats a React dependency. · **Don't use when:** it's core infrastructure or you need non-Gregorian calendars.
- **Scores /5:** visual 4 · interaction 4 · a11y 4 · engineering 4 · maintenance 2 · docs 3 · customization 5 · perf 5 · stability 2 · originality 5
- **Evidence:** ★1,643 · last release v0.9.2 2026-02-05 · last push 2026-07-10 · 25,004 wk npm · ~7 contributors · MIT
- **Looked at:** https://wicky.nillia.ms/cally/ — the two-month `<calendar-range months="2">` demo gets the hard detail right: the selected range renders as a red band with rounded end-caps that correctly breaks and restarts across the week boundary rather than drawing one broken rectangle. Monday-start, no chrome, generous cell spacing, icons passed in via `slot="previous"`. Nav arrows are a plain 1px bordered square — a bit undesigned, but it is a demo, not a house style.
- **Vibecode risk:** low — the demo red is a demo; nothing is baked in.
- **Link:** https://wicky.nillia.ms/cally/

### ArkType — `situational`
- **What:** Schema validation where the schema is written as TypeScript-like type syntax in a string: `type({ name: "string", age: "number>0" })`.
- **Verdict:** The fastest of the big three by a wide margin (~8M ops/sec on a five-field object in published benchmarks, roughly 4× Zod v4) and the most pleasant to read if you already think in TypeScript. It is also the least adopted — 1.45M weekly downloads against Zod's 246.7M — with 254 open issues, a larger baseline bundle than either competitor, and a last release in July 2026. It participates in Standard Schema, so trying it costs less than it used to.
- **Use when:** hot validation paths, or a team that finds Zod's chaining noisy. · **Don't use when:** you need the widest ecosystem of resolvers and codegen.
- **Scores /5:** visual — · interaction — · a11y — · engineering 5 · maintenance 3 · docs 3 · customization 4 · perf 5 · stability 3 · originality 5
- **Evidence:** ★7,858 · last release 2.2.3 2026-07-07 · last push 2026-09-09 · 1,451,490 wk npm · MIT · 254 open issues
- **Looked at:** not screenshotted — no UI surface.
- **Vibecode risk:** n/a
- **Link:** https://arktype.io

### react-number-format & react-phone-number-input — `situational`
- **What:** Purpose-built formatted inputs: currency/numeric with prefixes and separators; international phone with country logic on top of libphonenumber-js.
- **Verdict:** Grouped because the guidance is the same: for money and phone numbers, use the field that understands the data, not a generic regex masker. `react-number-format` handles decimal/thousand separators, prefixes and negative values including the cursor-position problems everyone gets wrong; `react-phone-number-input` gives you country detection and real E.164 validation from `libphonenumber-js` (24.1M/wk, the actual load-bearing dependency). Both are one-maintainer projects with mediocre maintenance signals — react-number-format has 229 open issues, react-phone-number-input has 971 stars and a May 2026 push — but they are correct and there is no better-maintained alternative.
- **Use when:** currency, percentage, or international phone entry. · **Don't use when:** you need a general mask — see the rejects; consider `@react-input/mask` or `maska` instead.
- **Scores /5:** visual 2 · interaction 4 · a11y 3 · engineering 4 · maintenance 3 · docs 3 · customization 4 · perf 4 · stability 4 · originality 2
- **Evidence:** react-number-format ★4,099 · last push 2026-03-22 · 4,514,713 wk npm · MIT · 229 open issues || react-phone-number-input ★971 · last push 2026-05-29 · 2,622,444 wk npm · MIT || libphonenumber-js 24,117,214 wk npm
- **Looked at:** not screenshotted — both render your own input.
- **Vibecode risk:** low — but the flag-dropdown-inside-the-input pattern is a strong visual tell; consider a separate country select.
- **Link:** https://github.com/s-yadav/react-number-format · https://gitlab.com/catamphetamine/react-phone-number-input

### Pintura — `situational`
- **What:** Commercial in-browser image (and video) editor: crop, rotate, filters, annotation, watermark, compression. Same author as FilePond.
- **Verdict:** The one paid thing in this category I would actually buy, and only under a specific condition: cropping is a feature your users perform deliberately, not a step you inflicted on them. If you are doing avatar crops, `react-easy-crop` is free and enough. Pintura's value is the annotation/filter/compression surface and the fact that it is framework-agnostic with no dependencies. Adoption is small — 11,696 weekly downloads on `@pqina/pintura` — which is what you expect for a paid license, but it also means fewer eyes and fewer StackOverflow answers.
- **Use when:** image editing is a product surface. · **Don't use when:** it's an avatar.
- **Scores /5:** visual 4 · interaction 5 · a11y 3 · engineering 4 · maintenance 4 · docs 4 · customization 4 · perf 4 · stability 4 · originality 4
- **Evidence:** 11,696 wk npm (`@pqina/pintura`) · commercial license, **price unverified** (pricing page not readable in this pass; a 60-day refund policy is stated) · vendor claims 3,397+ companies — unverified
- **Looked at:** https://pqina.nl/filepond/ (same vendor's design language) — dark navy hero, a single pill-shaped file row with a × on the left and an upload glyph on the right, and a cyan-gradient CTA next to a yellow "FilePond 5 Beta" badge. Competent but dated: the gradient button and the glow-behind-hero treatment read 2021.
- **Vibecode risk:** medium — the editor has a strong visual identity you will not fully override.
- **Link:** https://pqina.nl/pintura/

## Rejected / avoid
- **Formik** — 34,319 stars, **840 open issues**, last release 2.4.9 on 2025-11-10 and last push 2025-11-10. Downloads have fallen to 3.9M/wk against RHF's 38.2M. Its controlled-by-default model re-renders the whole form on every keystroke. Agents still suggest it because of star count; that is a fossil signal. Do not start a form with it, and migrating off it is usually a day.
- **react-select** — 28,025 stars but last npm publish 5.10.2 on 2025-07-11 (14 months) and 489 open issues. Worse, its default look is a fingerprint: 1px grey border at 4px radius, a thin vertical divider before the caret, and light-grey chips with a hairline × — I looked at the current docs and they are unchanged 2018 blue-gradient-hero material. Use Base UI `Combobox` (chips included) or React Aria `ComboBox`.
- **react-input-mask** — the repository is **archived** (last push 2024-08-01) and it still pulls 613,393 downloads/wk. That gap is the single most dangerous statistic in this report. If you need a generic mask, use `@react-input/mask` (166k/wk, actively pushed 2026-08) or `maska` (2k stars, pushed 2026-09).
- **imask / react-imask** — last npm publish 7.6.1 on **2024-05-21**; repo last pushed 2024-10-11. Nearly two years cold at 1.4M + 875k weekly downloads. Not broken, but do not start here.
- **react-text-mask** — 8,206 stars, last push 2025-05, Unlicense, effectively unmaintained; 427k/wk of pure legacy. Avoid.
- **cmdk, as a form combobox** — last npm publish 1.1.1 on **2025-03-14**, repo last pushed 2025-10-29, at 36M weekly downloads (almost all of it shadcn's `Command`). It is still fine as a ⌘K command palette. It is the wrong primitive for a form field, and shadcn moving to Base UI in July 2026 — explicitly citing weak combobox support — is the ecosystem saying so.
- **Yup** — 23,665 stars, 10.6M/wk, 253 open issues, and no type inference story that competes with Zod/Valibot/ArkType. Keep it in Formik-era code; never choose it new.
- **Origin UI / coss ui** — `reference-only`, and read the license before you copy. Origin UI was acquired by Cal.com and became coss.com/ui; the repo default license is now **AGPL-3.0**, with only `apps/origin/` and `apps/ui/` under MIT, and the original Origin UI components are described as a legacy snapshot with limited maintenance. The input catalogue is still the best reference for field-state variants — study it, cite the license, do not paste blindly.
- **UploadThing** — 5,323 stars but last npm publish 7.7.4 on 2025-08-17 (13 months) at 168k/wk. It is a hosted service, so choosing it is a vendor decision, not a library one; treat the slowed release cadence accordingly.
- **Floating-label kits generally** — any component library whose *default* field is a floating label. The label shrinks out of the reading position exactly when the user is checking their answer, it collides with browser autofill's own overlay, it breaks at 200% zoom, and it forces you to choose between a placeholder and a label rather than having both. Stripe is the honourable exception and it works because their field is fixed-height and the label parks *inside* the box rather than vanishing — their Appearance API exposes "Inputs (above labels)" and "Inputs (floating labels)" as two separate rule sets, which tells you they consider it a deliberate variant, not a default.

## What surprised me
- **shadcn/ui lists Formisch — a 1,176-star, 5.7k-downloads/week library — as a first-class form layer** alongside React Hook Form and TanStack Form, with `useActionState` marked "Coming Soon". That is an enormous distribution signal running months ahead of any adoption data.
- **react-day-picker renamed itself to `@daypicker/react` in v10 (Feb 2026) and essentially nobody noticed**: 28.8M weekly downloads still flow through the old name versus 324k through the new one. Any agent that "helpfully" migrates the import will be ahead of the entire ecosystem.
- **react-input-mask has been an archived repository since 2024 and still serves 613k downloads a week.** Star count and download count are both actively lying about this package.
- **Uppy quietly removed its own biggest objection.** For years the honest verdict was "most capable uploader, but everything built with it looks like Uppy". v5's headless components and hooks make that untrue, and almost none of the 2026 comparison posts mention it.
- **Origin UI is now AGPL-3.0 by default.** The most-copied input catalogue in the shadcn world changed hands (Cal.com) and changed license, and its components are now officially a "legacy snapshot". Every agent that has been pasting Origin UI inputs from memory is pasting from a differently-licensed repo than it thinks.
- **Radix UI was acquired by WorkOS and slowed enough that shadcn switched primitives.** The Radix-is-the-default assumption that underpins thousands of blog posts and most agent priors expired in July 2026.

## Open questions
- **Pintura's actual price and license terms** — the pricing page did not render in this pass. Settle by fetching https://pqina.nl/pintura/pricing/ directly.
- **Whether `cmdk` is abandoned or merely finished.** 18 months without an npm publish while carrying 36M downloads/week is ambiguous. A statement from the maintainer, or a security advisory going unpatched, would settle it.
- **Real-world Formisch usage.** I could not find a single named production user. Evidence that would settle it: a `formisch` dependency in a public app repo of any size, or shadcn download telemetry for the Formisch form template.
- **Whether TanStack Form v2 is a breaking rewrite.** v2 alphas are shipping for Vue/Svelte/Solid while React sits at 1.33.5. A published v2 migration guide would settle whether adopting v1 today is a trap.
- **input-otp's "used by" claims.** Cluely and MongoDB logos appear on the project's own site; I did not verify either independently. DOM inspection of those products' verification screens would settle it.
- **Stripe Checkout's live field behaviour.** The demo's payment iframe would not paint in headless Chromium, so my read of Stripe's floating-label treatment comes from their Appearance API rule documentation rather than the rendered form. Worth a manual pass in a real browser.
