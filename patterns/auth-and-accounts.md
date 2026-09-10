# Auth and Accounts

**Evaluated:** 2026-09

Signup, login, sessions, and account security. Everything below was walked in a real browser in
September 2026 unless marked otherwise. Screenshots live in `.cache/shots/auth-*`.

---

## If you only get five things right

1. **Never make the user choose "sign in" vs "sign up" before you know who they are.** Take an
   identifier, look it up, then route. Linear, Notion, Auth0, Clerk, Vercel, and Stripe have all
   converged on a first screen with either zero fields or one field. The moment you present two
   tabs, you have created a class of user who is in the wrong one and does not know it.
   *Scope:* this is a rule about tabs, not about round trips. If your accounts are provisioned by an
   admin and self-serve signup does not exist — an internal tool, an EHR, a school system, a POS —
   there is nothing to route between, and a plain username + password on one screen (GitHub's shape)
   is correct and one round trip cheaper for a user who signs in twice a day.

2. **Your login page and your signup page should have different button orders.** Vercel proves the
   point on its own two pages: `/signup` leads with four one-tap social buttons and demotes email
   to a text link under "Show other options"; `/login` leads with an email field and a black
   `Continue with Email` primary, with social below. New users convert on one tap. Returning users
   know their email and get confused by a wall of providers. Same product, opposite stacks,
   deliberately.

3. **The single most-botched state is session expiry mid-action.** The default failure is: user
   types 900 words, hits Save, gets bounced to `/login`, and the 900 words are gone. The fix is
   architectural, not visual — buffer the failed request, authenticate in an overlay or a popup
   that does not unmount the page, then replay the request. See the session section; it is the
   longest one here for a reason.

4. **"Email already exists" is not an error, it is a routing signal.** Do not throw. Send an email
   either way and show the identical screen. Vercel's exact string, captured this month:
   *"If you have a Vercel account, we sent a code to ayushg.2024@gmail.com."* One sentence that
   closes the enumeration oracle and still tells a real user what to do next.

5. **Ship the recovery path before you ship the auth method.** Every 2026 method — passkey, TOTP,
   magic link, SSO — moves the attack surface and the support burden onto recovery. An HN commenter
   on the passkey threads put it exactly right: *"It pushes phishing back to the passkey
   recovery/reset interface."* If you have not designed what happens when the phone is in the
   ocean, you have not designed auth.

---

## 1. Signup form minimalism — what to ask, and when

### The job
The user wants to see whether the product does the thing. The business wants a routable identity,
a legal basis, and enough segmentation data to sell later. These conflict directly: every field
you add before first value costs conversion, and every field you defer costs you data you may
never get.

The resolution good products use: **ask only for fields that are irreversible or that fork the
rest of the flow. Defer everything that is merely useful.**

### Reference implementation
**Stripe's `/register`** is the interesting case because it looks like it violates the rule — four
fields up front: Email, Full name, Password, Country. Country is a `<select>` defaulting to
United States with an ⓘ tooltip beside the label.

Country is there because it is not deferrable. It determines the legal entity, the KYC document
set, the supported payout rails, and the pricing table. A Stripe account cannot change country;
you have to make a new account. So Stripe pays the conversion cost at field four rather than
discover at step nine of onboarding that the whole path was wrong. Full name is there because it
is on the Terms acceptance.

Stripe also **inverts its own button order between breakpoints**, which is the most instructive
detail on the page and is invisible if you only look at desktop. At 1440 the card is: four fields →
`Create account` → "Or sign up with" → Google. At 390 it is: Google → "Or sign up with" → four
fields → `Create account`. Same page, opposite stacks. The desktop version optimises for the
deliberate operator filling in a business identity; the mobile version optimises for the one-tap
escape from typing a password on glass. Stripe also autofocuses Email at 1440 (visible focus ring)
and does not autofocus at 390 — exactly the split recommended below, shipped.

Compare **Linear's `/signup`**, which has *zero* input fields. Three stacked pills: `Continue with
Google` (filled indigo, primary), `Continue with email` (white, bordered), `Continue with SAML
SSO` (white, bordered). Title: "Create your workspace." Legal line and "Already have an account?
Log in" beneath. Everything else — your name, your workspace name, your team's size — is asked
after you are inside, in the onboarding, where the user has already sunk cost and the questions
have visible payoff.

### The decisions
| Fork | Choose | Because |
|---|---|---|
| Everything up front vs progressive | Progressive, unless a field is irreversible | Stripe asks Country (irreversible); Linear asks nothing (all deferrable) |
| Name at signup? | Only if it appears in the product's first screen or on a legal acceptance | Linear defers it; Stripe keeps it for ToS |
| Company / team size / role? | Never before first value. Ask in onboarding or enrich from the email domain | Notion infers the org from the work-email domain instead of asking |
| Password at signup? | Only if you also offer password login. If you are magic-link or OAuth first, do not collect one | A password you never verify is a liability with no benefit |
| Confirm-password field? | No. Use one field with a `Show`/`Hide` toggle | GOV.UK: "do not ask users to enter the same information twice" |

**The work-email nudge.** Notion's signup does something worth stealing. Label is "Work email",
placeholder is `name@company.com`, and directly beneath the field sits a persistent grey callout:
*"Tip: Use your work email (if you have one) so it's easier for your team to join you on Notion."*
This is a business-motivated field constraint dressed as a user benefit — and the benefit is real
(domain-based team discovery), which is why it works. Note that Notion leaves the same helper text
on the *login* screen ("Use an organization email to easily collaborate with teammates"), where it
is meaningless to someone who already has an account. That is a small bug in an otherwise strong
flow; do not copy it.

### The states
- **Slow submit:** Notion's Continue button stays the same width, keeps the label "Continue", dims
  to a pale-blue fill, and shows a small spinner to the left of the text. It does not become
  "Loading…", does not collapse to a spinner-only circle, and does not change size. Copy this. A
  button that changes width on submit reflows the layout under a user's cursor.
- **Field-level failure:** validate the email on blur, not on keypress. Validating on keypress
  shows "invalid email" to a user who has typed `a`.
- **Whole-form failure (network):** keep every value. Show the error above the primary button, not
  in a toast that auto-dismisses while the user is reading it.
- **Resumed later:** a signup abandoned at the OTP step should be resumable from the emailed code
  for at least 10 minutes, and the "check your email" screen must survive a page refresh (store
  the pending identifier in `sessionStorage`, not React state).
- **Permission wall:** invite-only or waitlisted products need a distinct screen, not an error.
  Clerk ships three access modes for this — Open, Invite-only, Waitlist — because "your email is
  not on the allowlist" and "your password is wrong" are unrelated situations that look identical
  when both render as red text under a field.

### Mobile
- Keyboard type per field: `inputmode="email"` + `autocomplete="email"` on the identifier;
  `autocomplete="one-time-code"` on OTP inputs so iOS offers the SMS/mail code above the keyboard.
- The primary action must be reachable without scrolling **after the keyboard opens**. On a 390×844
  viewport the keyboard eats ~336pt, leaving ~500pt of usable height. Measured at 390: Linear's
  three-pill signup ends at ~380pt and fits with the keyboard up. Stripe's `Create account` sits at
  ~553pt — below the fold the moment the keyboard opens, and further down than on desktop because
  the Google button is stacked above the fields. If you must have four fields, pin the primary
  button to the bottom of the viewport above the keyboard.
- Do not autofocus the first field on mobile. Autofocus opens the keyboard before the user has
  read the heading, which hides the heading. Stripe and Notion both autofocus at 1440 and not at
  390; GitHub autofocuses at both, which is why its `Sign in with a passkey` link — already last on
  the page — is off-screen for a mobile user before they have touched anything.

### Accessibility
- Every input needs a real `<label>`, not a placeholder. Placeholders vanish on focus and are
  invisible to some voice-control software.
- The submit button must be a `<button type="submit">` inside a `<form>`, so Enter works and so
  password managers recognise the form boundary.
- Error text: `aria-describedby` from the input to the error node, plus `aria-invalid="true"`.
  A single summary error goes in a `role="alert"` region above the form.
- Do not put the legal consent text *after* the submit button in DOM order while showing it
  before visually — screen reader users will hear it after they have already agreed.

### Copy
| Use | Not |
|---|---|
| "Create your workspace" (Linear) | "Sign Up" |
| "Your first deploy is just a sign-up away." (Vercel) | "Get started today!" |
| "Tip: Use your work email (if you have one) so it's easier for your team to join you on Notion" | "Please enter a valid business email address" |
| "By joining, you agree to our Terms of Service and Privacy Policy" (Vercel) | A checkbox the user must tick |

### How it goes wrong
The generated version has two tabs at the top labelled "Sign In | Sign Up", six fields (First name,
Last name, Email, Password, Confirm password, Company), a live-red password checklist with four
rules, a mandatory ToS checkbox, and a submit button labelled "Submit". It validates on keypress,
so the user sees three red errors before finishing the first field. Nothing is deferred, nothing is
inferred, and the whole thing is 900px tall on a phone.

---

## 2. Ordering the buttons — email-first, social-first, SSO

### The job
The user wants the one button that matches how they made this account. They cannot remember which
one that was. The business wants OAuth (verified email, no password liability, higher conversion)
but needs email for anyone whose Google account is a personal address and whose work identity is
elsewhere.

### Reference implementations, precisely

**Vercel `/signup`** — four full-width bordered buttons of *equal* visual weight, no filled
primary: `Continue with Google` · `Continue with GitHub` · `Continue with ChatGPT` ·
`Continue with Apple`. Then a plain-text row "Show other options", then a blue link
`Continue with Email →`. Email is fourth-class on the signup page.

**Vercel `/login`** — inverted. Email input at the top, then a **black filled** `Continue with
Email` button, then a hairline divider, then Google / GitHub / ChatGPT / SAML SSO / Passkey as
five bordered buttons, then "Show other options".

**Notion `/login` at 1440** — email field (autofocused) + helper "Use an organization email to
easily collaborate with teammates" + blue Continue, then "or continue with", then a **3×2 grid of
tiles**, each an icon *above* a text label: Google, ChatGPT, Apple / Microsoft, Passkey, SSO.
Notion's *signup* shows only three tiles (Google, Microsoft, ChatGPT). The asymmetry is deliberate:
signup constrains choice to reduce account fragmentation; login must serve every method anyone
ever used.

**Notion `/login` at 390 is a different page, and it is the cautionary one.** The email field is
gone. In its place: seven full-width stacked buttons, in order — Google, ChatGPT, Apple, Microsoft,
Passkey, SSO, **Email**. The method Notion makes primary on desktop is seventh and last on mobile,
below four providers and two exotics. A returning email-and-password user on a phone has to read
past six wrong answers. This is the NASCAR problem shipped by the same team that avoided it one
breakpoint up, and it is what happens when the mobile layout is derived by unwrapping a grid rather
than re-deciding the hierarchy. Do not copy it; it is the clearest counterexample in this file.

**Auth0 `/signup`** — an identity vendor, and it puts email first: one Email field, then the legal
line, then `Continue` (indigo filled), then "OR", then **three full-width bordered buttons with
icon + label** (Continue with GitHub, Continue with Google, Continue with Microsoft). Note the
order inside the card: the Terms line sits *above* the primary button, so DOM order and reading
order agree — the thing §1's accessibility note asks for, and rare.

**GitHub `/login`** — the outlier. Both fields visible on one screen ("Username or email address" +
"Password"), green `Sign in`, "or", Google and Apple, then "New to GitHub? Create an account", then
`Sign in with a passkey` as a bare blue link at the very bottom. GitHub cannot do identifier-first
because it accepts a *username* as well as an email, and a username lookup that reveals whether an
account exists is an enumeration leak. The cost: their best-performing method — passkey — is the
last thing on the page, below the signup link.

### The decisions
- **Three or four providers *visible*; the rest behind a disclosure.** WorkOS calls the alternative
  the "NASCAR problem" — a login box plastered with logos, "both visual noise and confusion." Each
  extra provider multiplies the chance a returning user picks the wrong one and creates a duplicate
  account.
  **Where the rule breaks:** a consumer product selling into Japan, Korea and China cannot drop
  LINE, Kakao and WeChat, and a health product cannot drop the patient-portal IdP its users are
  provisioned through. Regional fragmentation is a real constraint, not a failure of discipline.
  The cap is on *choices presented to one user*, not on providers supported. Segment on locale,
  device and last-used, show the three that apply, and put the tail behind Vercel's mechanic — a
  plain "Show other options" row rather than a longer stack. Notion's 390px login is what happens
  when you support seven and present seven.
- **Order by real usage in your product, not by market share.** Vercel puts GitHub second because
  their users deploy from GitHub. Notion puts Microsoft second because their buyers are on
  Microsoft 365. Instrument it and reorder.
- **Remember the last method used and mark it.** A "you used Google last time" hint on the provider
  the user actually used kills duplicate-account creation. Store it in `localStorage` keyed to
  nothing personal — just the provider name — and render a small "Last used" pill. None of the
  seven products walked here show one on a signed-out page.
- **Full-width buttons vs tiles.** Full-width labelled buttons ("Continue with Google") up to four.
  Tiles once you have five or more and cannot afford the vertical space — Notion's 3×2 grid puts
  six methods in the height of two buttons. Keep the text label in the tile as Notion does; a
  logo-only tile needs `aria-label="Continue with Google"`, and an unlabelled Microsoft square is
  four coloured rectangles to anyone who does not already know the mark.
- **"Continue with" beats "Sign in with".** It is true on both the signup and login screen, so the
  same component works in both places. Every product walked here uses "Continue with".

### The states
- **Popup blocked:** OAuth in a popup that the browser blocks leaves the user staring at an
  unchanged page. Detect `window.open` returning null and fall back to a full-page redirect,
  with a visible message: "Your browser blocked the sign-in window. Continue in this tab?"
- **Provider outage:** if Google's endpoint 500s, say so on the button ("Google sign-in is
  temporarily unavailable — try email") rather than showing a generic error page. Users assume
  their own account is broken.
- **Returning via a different provider than they signed up with:** this is the duplicate-account
  bomb. If `google:ayush@acme.com` arrives and you already have `password:ayush@acme.com`, do not
  silently create a second account and do not silently merge. Show an account-linking screen:
  "An account already exists for ayush@acme.com. Sign in with your password to link Google to it."
  Require the original factor before linking, or you have built an account-takeover primitive.

### Mobile
- Apple's App Store guideline still applies in 2026: an iOS app offering third-party social login
  must also offer Sign in with Apple (or an equivalent private option). On web this is optional —
  Vercel offers Apple on `/signup` but **not** on `/login` (where the slot goes to SAML SSO and
  Passkey), GitHub offers it on both, Linear and Auth0 not at all.
- **Re-decide the order at 390, do not unwrap the desktop layout.** Every product here changes shape
  at 390 and only some changed their mind about hierarchy. Stripe inverts deliberately (Google
  first on mobile, fields first on desktop). Notion unwraps its tile grid into a seven-item stack
  and demotes email from first to last without appearing to notice. If your mobile stack order is
  whatever `flex-wrap` produced, you have not designed it.
- Provider buttons are the one place a full-bleed 44pt-tall row beats a card: a returning user is
  aiming with a thumb at a logo they recognise, so target size matters more than the container.

### Copy
| Use | Not |
|---|---|
| "Continue with Google" | "Sign in with Google" / "Login with Google" |
| "Continue with SAML SSO" (Vercel/Linear) | "Enterprise Login" |
| "Show other options" (Vercel) | "More…" |
| "New to GitHub? Create an account" | "Register" |

### How it goes wrong
Eight branded buttons in a 2×4 grid, all with brand-coloured fills so the page has eight competing
primaries. Facebook and Twitter/X are in there because a template had them. There is no email
option above the fold. On login, the order is different from signup for no reason. Nothing
remembers what the user picked last time, so the same human has three accounts.

---

## 3. Passwords, and why most requirements are counterproductive

### The job
The user wants a credential their password manager can store. The business thinks it wants
"strong" passwords and mostly implements rules that produce `Password1!` across the entire
userbase.

### The authority, with the actual numbers
NIST SP 800-63B (Rev. 4, final) is now unambiguous, and it contradicts nearly every default:

- Minimum **15 characters** when the password is the only factor; **8** when it is one of several.
- Verifiers **SHOULD** permit a maximum of **at least 64 characters**.
- Verifiers **SHALL NOT** impose composition rules — no "must contain an uppercase and a symbol".
- Verifiers **SHALL NOT** require periodic rotation. Force a change only on evidence of compromise.
- **SHALL NOT** use security questions / KBA.
- **SHALL** allow password managers and autofill; **SHOULD** permit paste.
- **SHALL** check the candidate against a blocklist of breached and common passwords.
- Accept all printable ASCII plus space, and Unicode with NFC normalisation.

GOV.UK, aimed at a broader public, sets a floor of 8 with no maximum, and adds an operational
number most teams get wrong: **"Give users between 5 and 10 attempts to enter their password
correctly before you lock their account."** Three is too few; users mistype.

### Reference implementation
The **GOV.UK Design System password input** is the most completely specified one in public. Exact
values:

- Toggle button label: `Show` / `Hide` (not an eye icon alone).
- `aria-label` on the toggle: `Show password` / `Hide password`.
- A live region announces `Your password is visible` / `Your password is hidden` on toggle.
- `autocomplete="current-password"` on login, `autocomplete="new-password"` on creation.
- `spellcheck="false"`, `autocapitalize="none"`.
- The toggle is hidden until JS loads, so it never renders as a dead button.
- Password is hidden by default.

NN/g's position differs on one point and it is worth knowing the split: they recommend showing the
password **by default on mobile** with an option to hide, citing Von Zezschwitz (2014) on higher
typing error rates on small devices. GOV.UK keeps it hidden by default. The defensible middle:
hidden by default everywhere, with the toggle rendered at ≥44×44pt and placed inside the field on
mobile so it is thumb-reachable.

### The decisions
- **Show requirements before the user types, not as red errors after.** A static list under the
  label ("At least 15 characters") that turns into checkmarks as they are satisfied.
- **Strength meter?** Egelman et al. (2013) found meters do motivate stronger passwords. Use one
  only if it is driven by an actual entropy estimator (zxcvbn or similar) and a breach blocklist —
  not by counting character classes. A meter that rates `Passw0rd!` as "Strong" is worse than none.
- **Never truncate silently.** If you cap at 64, reject at 65 with a message. Silent truncation
  means the user's manager stores a password that no longer works.
- **Do not block paste. Ever.** It is the single most common self-inflicted wound in this flow and
  NIST explicitly calls it out.

### The states
- **Wrong password:** GOV.UK is explicit — "do not reveal whether username or password was wrong."
  One message: "Your email address or password is incorrect."
- **Locked out:** after 5–10 attempts, the message must say what to do, not just that it happened:
  "Too many sign-in attempts. Try again in 15 minutes, or reset your password."
- **Reset link:** time-limited, single-use, and it must invalidate on use. Never email a password.
- **Reset requested for a non-existent account:** same screen, same email-sent message. See §5.

### Accessibility
The toggle must be a `<button type="button">` (a `type="submit"` toggle submits the form on
Enter — a real and common bug). Two password fields on one page need distinguishable toggle
labels, e.g. "Show current password" / "Show new password".

### Copy
| Use | Not |
|---|---|
| "At least 15 characters" | "Must contain 1 uppercase, 1 number, 1 special character, min 8, max 20" |
| "Your email address or password is incorrect." | "Invalid password for user ayush@acme.com" |
| "Too many sign-in attempts. Try again in 15 minutes, or reset your password." | "Account locked." |
| "This password has appeared in a data breach. Choose a different one." | "Password too weak" |

### How it goes wrong
A four-rule checklist that turns red as you type. `maxlength="20"`. `onpaste="return false"`. A
"Confirm password" field. Security questions as the reset path, with "What was your first pet's
name?" — which NIST forbids outright and which is, functionally, a shared secret published on the
user's Instagram.

---

## 4. Passkeys in 2026 — the actual UX, including the fallback

### Where adoption really is
The FIDO Alliance's World Passkey Day 2026 figures: ~**5 billion** passkeys in use; **90%** consumer
awareness; **75%** have enabled a passkey on at least one account; **49%** use them regularly when
offered; **68%** of organisations have deployed or are deploying them for employee sign-in.
Industry split: fintech ~60%, ecommerce ~35%, B2B SaaS ~28%, media ~18%. Reported sign-in success
rate is ~**93% for passkeys vs ~63% for passwords** — that gap, not the security story, is what
gets passkeys funded. And still: **57%** of organisations use a phishable factor as primary.

Translation for a builder: passkeys are now table stakes as an *option*, and a mistake as the
*only* option.

### The job
The user wants to sign in without thinking. The business wants to remove the password-reset support
queue and the credential-stuffing surface. The conflict is that a passkey lives in a keychain the
user does not conceptualise as a place, so when the device changes, the user has no mental model
for what happened.

### Reference implementation
**Conditional UI ("autofill UI") is the pattern; a "Sign in with passkey" button is the fallback,
not the primary.** The correct implementation:

1. Render a normal identifier field with `autocomplete="username webauthn"`.
2. On page load, call `navigator.credentials.get({ mediation: 'conditional', publicKey: {...} })`.
3. The browser surfaces available passkeys *inside the field's autofill dropdown*. The user taps
   their account and biometric-confirms. They never chose "passkey" as a mode.
4. If no passkey resolves, the field behaves as an ordinary email field and the normal flow runs.

This matters because **webauthn.io**, the canonical Duo spec demo, shows the anti-pattern in its
purest form: one username field and two side-by-side buttons, `Register` and `Authenticate`. The
user is required to know whether they already have a credential. Never ship that. It is a spec
demo, not a design.

Products walked here expose an explicit passkey entry point *in addition* to conditional UI:
Vercel has `Continue with Passkey` as a full bordered button in the login stack; Notion has a
`Passkey` tile in its 3×2 grid; GitHub has `Sign in with a passkey` as a link below the
create-account line. Vercel's placement is right (it is a peer of the other methods). GitHub's is
wrong (below the signup link is where links go to die).

**Mercury** is the reference for the *enrollment* moment: it prompts passkey setup immediately
after the user submits their bank application — the point of highest motivation and highest
account value, before there is money to lose. Not buried in Settings → Security. Mercury also
tells users explicitly to **add a passkey to a second device** so that losing one device is not a
lockout. That instruction should be in your enrollment success screen, not in a help article.

### The decisions
| Fork | Choose | Reasoning |
|---|---|---|
| Conditional UI or explicit button? | **Both.** Conditional as the silent path, explicit button for users who have a passkey on a *different* device (cross-device / QR) | Conditional UI only surfaces credentials the local platform authenticator knows about |
| Prompt enrollment when? | Right after a successful sign-in with another method, or right after a high-value action completes | Not at signup — the user has not decided to keep the account yet |
| Passkey only, or passkey + fallback? | A fallback always — but "fallback" means *another factor of comparable strength*, not an emailed link. A second passkey on a second platform, a hardware key, or an identity-verified support path all qualify; `POST /reset` to a Gmail account does not | Device loss, shared/kiosk machines, enterprise-managed browsers that block platform authenticators. A custody or admin console may legitimately ship hardware-key-only with no self-serve reset at all — that is a stronger design, not a missing one |
| Name the credential? | Yes, and default it from the UA ("Chrome on MacBook Pro") | Otherwise the manage-passkeys list is three rows of "Passkey" |
| Delete-last-passkey guard | Block it if it is the only factor | HN, verbatim: *"How are you going to sign in and delete the public key, if you lost the private key?"* |

### The states
- **Cancelled prompt:** `NotAllowedError` fires both when the user cancels *and* when it times out.
  Do not render "Authentication failed" — the user did not fail, they hit Escape. Render the form
  unchanged with a quiet line: "Passkey sign-in was cancelled. Use your email instead?"
- **No passkey on this device:** offer the cross-device flow explicitly — "Use a passkey from
  another device" — which shows the QR code. Users do not know this exists unless you name it.
- **Unsupported browser / blocked by policy:** feature-detect
  `PublicKeyCredential.isConditionalMediationAvailable()` and do not render the passkey affordance
  at all rather than rendering a button that errors.
- **Recovery — the state that actually decides whether passkeys are safe.** Passkeys do not remove
  the recovery problem; they concentrate it. Every account-takeover attempt now aims at the reset
  path. So: the passkey reset path must be *at least as strong* as the passkey, which in practice
  means recovery codes generated at enrollment, or a verified second factor, never "click the link
  we emailed you."

### Mobile
The platform sheet is the UI and you do not control it. What you control is what surrounds it: do
not put a modal behind the sheet that closes on outside-tap, because dismissing the system sheet
registers as an outside tap on some Android builds and the user loses the page. Test cross-device
QR on a phone whose camera app is not the default.

### Accessibility
The system prompt is accessible; your trigger button often is not. Ensure the button has a text
label, not only a fingerprint glyph — "passkey" and "fingerprint" are not synonyms to a screen
reader user, and a user with no biometric hardware uses a PIN, so the fingerprint icon is a lie.
Announce the outcome in a live region: assistive tech users otherwise get no feedback that the
silent conditional-UI path even ran.

### Copy
| Use | Not |
|---|---|
| "Continue with Passkey" (Vercel) | "Use WebAuthn" / "FIDO2 Login" |
| "Use a passkey from another device" | "Cross-platform authenticator" |
| "Add a passkey to a second device so you don't get locked out if you lose this one." (Mercury's guidance) | "Passkey added!" |
| "Passkey sign-in was cancelled. Use your email instead?" | "Authentication failed" |
| "Chrome on MacBook Pro · added 12 Aug 2026" | "Passkey 1" |

### How it goes wrong
A "Sign in with Passkey" button that calls `navigator.credentials.get()` with no conditional
mediation, so it works only if the user is on the exact device where they enrolled. `NotAllowedError`
renders as a red "Authentication failed" toast. There is no enrollment prompt anywhere except a
Settings toggle. There are no recovery codes. And the Settings page cheerfully lets the user delete
their only passkey.

---

## 5. Magic links vs one-time codes

### The job
The user wants in without a password. The business wants a verified email as a side effect. The
conflict is that a link opens a session *on whichever device opened the mail app*, which is
frequently the wrong device.

### Reference implementation
**Vercel's `/login` email path sends a 6-digit code, not a link.** Walked this month: enter email
→ `Check your email` → six individual bordered boxes with the first focused → a `Use a Different
Email` link below. Nothing else on the screen.

The code beats the link on the state that matters most: user is on a laptop, mail is on a phone.
With a code they read six digits and type them. With a link they tap it, get a session on the
phone, and the laptop sits on "waiting…" forever.

**Monzo's web app** is the counterexample where a link is correct, and the reason is narrower than
it looks. `web.monzo.com` is magic-link-only — "Enter your email to get access" / "We'll send you a
secure magic link to get access." / `Get magic link`. A bank, with no password on the web at all.

The panel beside the form is the whole argument: **"Securely log in to Monzo for Emergencies — If
you've lost your phone, or there's any other reason you can't get into your Monzo app, log in here
to see a stripped-back version of your account."** It then enumerates the five things you can do —
remotely log out of Monzo on your phone, see your balance, see your accounts, see your
transactions, freeze and unfreeze your card — and warns "You'll only be able to see recent
transactions if you've used your app in the last 90 days."

So this is not a bank choosing magic links for convenience. It is a **degraded-capability recovery
channel whose entire premise is that the strong factor (the phone) is unavailable**, and the
capability list is trimmed until an emailed bearer token is a proportionate credential for what
remains. You can move no money from it. Copy the pattern only with that second half: if you ship
magic-link access to a high-value account, ship the reduced capability set alongside it and say on
the screen what the link does and does not unlock.

### The practitioner objection, in their words
From HN, August 2026, on a magic-link-only service:

> "I detest magic links. I have probably 9-10 accounts with a certain service that uses magic
> links […] There's no password field so my password manager can't fill out my login details for
> me."

and:

> "my password manager doesn't auto fill them"

That is the real cost and it is not aesthetic: **magic-link-only flows are invisible to password
managers, so the manager stops being the user's index of which account exists**, and the same
person creates a new account every time they forget. Nine accounts is not a hypothetical.

### The decisions
| Fork | Choose |
|---|---|
| Link or code? | **Code**, unless the second device is intentional (Monzo) — see the three exceptions below |
| Code length | 6 digits. Not 4 (brute-forceable at scale), not 8 (transcription errors) |
| Expiry | 10 minutes, and say so on screen |
| Single-use | Always — and expire *all* outstanding codes for that identifier when one is used |
| Paste behaviour | Pasting `483920` into box 1 must fill all six. This is the number-one bug in OTP components |
| Resend | Disabled for 30s with a live countdown, then enabled. Never a silent no-op |
| Auto-submit on 6th digit | Yes — but only once; guard against double submit |
| Rate limit | Per-identifier and per-IP. Show a human message, not a 429 page |

**Where "always use a code" is wrong.** Three product shapes:

1. **The sign-in device cannot take six digits comfortably** — a TV app, a console, a car head unit,
   a CLI. Neither a code nor a link works here; you want the inverse, a **device-authorization
   flow**: the constrained device displays a short code and a URL, the user completes it on a phone,
   the device polls. Shipping a 6-box OTP on a TV remote is a worse sin than a magic link.
2. **The destination is the mail client's own device and always will be** — a creator newsletter
   whose readers arrive from the email itself. Making them switch apps to fetch a code they carry
   back is one context switch you invented for nothing.
3. **The strong factor is gone by definition** — Monzo. Recovery channels are for people who have
   lost something, so they cannot depend on holding a second device.

Everywhere else the code wins, and there is a fourth case the code makes worse rather than better:
6 digits must be held in working memory across an app switch, which is a real cost for users with
memory or attention impairments. Mitigate it by supporting `autocomplete="one-time-code"` properly
and by keeping the identifier and the "we sent it to X" line on screen the whole time, so the user
can re-request instead of re-deriving.

**Email-client link prefetch** is the failure mode people forget: Outlook Safe Links, corporate
scanners, and some mobile clients fetch every URL in an email. If your link is single-use and
consumed on GET, the scanner burns it and the user's click returns "This link has expired." If you
must use links, make the GET render a confirm page with a POST button, or scope consumption to the
originating browser session.

### The states
- **Wrong code:** clear all six boxes, refocus box one, keep the identifier. Do not make them
  re-enter the email.
- **Expired:** "That code has expired. We sent a new one to ayush@acme.com." and actually send it.
- **Didn't arrive:** the resend row should also link "Check your spam folder" and, after the second
  resend, offer "Use a different email".
- **Refresh mid-flow:** the "Check your email" screen must survive F5. Store the pending identifier.
- **Both devices:** if the user clicks a link on their phone while the desktop is waiting, the
  desktop should complete via polling. If you cannot do that, do not use links.

### Mobile
`autocomplete="one-time-code"` + `inputmode="numeric"` on the OTP field so iOS surfaces the code
from Messages/Mail above the keyboard. If you render six separate `<input>` elements, only the
first can carry `autocomplete="one-time-code"` usefully — a single input styled to look like six
boxes is more robust and much better for screen readers.

### Accessibility
Six separate inputs are a genuine accessibility problem: each announces as "edit blank", focus
jumps unpredictably under a screen reader, and the field has no accessible name describing the
whole. Prefer one `<input>` with `aria-label="6-digit verification code"` and CSS
`letter-spacing` to fake the segmentation. If you must use six, give the group
`role="group" aria-labelledby` pointing at the "Check your email" heading.

### Copy
| Use | Not |
|---|---|
| "If you have a Vercel account, we sent a code to ayushg.2024@gmail.com." | "A magic link has been sent!" |
| "Use a Different Email" (Vercel) | "Go back" |
| "That code has expired. We sent a new one." | "Invalid token" |
| "Resend code in 0:23" | A resend button that appears to do nothing |

### How it goes wrong
Six boxes that reject paste. No resend, or a resend with no cooldown and no confirmation. The
success screen says "Check your email!" without saying *which* email, so a user who typo'd
`gmial.com` waits forever. The link expires in 15 minutes but the copy does not say so. And
`Continue` on the code screen is enabled with zero digits entered.

---

## 6. "That email already exists" — enumeration vs usability

### The job
The user typed an email they already registered and needs to be told to sign in instead. The
business must not confirm to an attacker that `ceo@target.com` has an account — that list is the
input to a credential-stuffing or phishing campaign.

### The real resolution
Not "show a generic error." That is the answer that makes the flow unusable and it is why so many
teams quietly leak instead. The resolution used by Google Identity Platform (enumeration protection
on by default for projects created after 15 Sep 2023), by Vercel, and recommended by OWASP:

**Make the response identical and move the disambiguation into the email itself.**

1. User submits `ayush@acme.com` on signup.
2. Server responds with the same screen and same timing regardless of whether the account exists.
3. Screen says: *"If you have a Vercel account, we sent a code to ayush@acme.com."*
4. **New address** → email contains the signup code.
5. **Existing address** → email says "You already have an account" and contains a sign-in code and
   a reset link.

The real user gets a correct, actionable next step in about a minute — one round trip through their
inbox that they would not have needed from an inline message. That is the price, and it is worth
paying; pretending it is free is how teams talk themselves out of the pattern later.

**Three ways teams rebuild the oracle after closing it.** All three are in shipped products:

- **Timing.** If the "already exists" branch skips a password-hash computation, the response is
  200ms faster and the oracle is back in the network tab. Equalise the latency or add a fixed floor.
- **Rate limiting.** This is the subtle one. Per-identifier throttles are usually implemented only
  on identifiers that resolve to a real account, so hammering `ceo@target.com` returns
  "Too many attempts" while hammering `nobody@target.com` returns the normal screen forever. The
  429 is now the oracle, and it is a *louder* one than the error message you removed. Rate-limit on
  a hash of the submitted identifier whether or not it resolves, and keep the response body and
  status identical — degrade by delaying, not by switching screens.
- **Downstream side effects.** A signup that provisions a workspace slug, warms a cache, or emits
  an analytics event only for new addresses leaks through response size, a `Set-Cookie`, or a
  timing tail even when the rendered HTML matches.

### When you may leak, deliberately
Enumeration protection has a real cost inside an authenticated org context. If an admin is inviting
a teammate, "this person already has an account" is useful and leaks nothing they cannot discover
by asking. Scope the protection to unauthenticated endpoints.

### The states
- **Login with an unknown email:** same treatment. "Your email address or password is incorrect."
  Never "No account found with that email."
- **Password reset for an unknown email:** always show "If that address has an account, we've sent
  a reset link" — and send a *"someone tried to reset a password for this address, but no account
  exists"* email to the address anyway, so a real user who typo'd their own address learns
  something.
- **Social login onto an existing password account:** covered in §2 — link, don't merge, and
  require the original factor.

### Copy
| Use | Not |
|---|---|
| "If you have an account, we sent a code to ayush@acme.com." | "An account with this email already exists." |
| "Your email address or password is incorrect." | "That user doesn't exist." |
| "If that address has an account, we've sent a reset link." | "No account found." |

### How it goes wrong
The signup endpoint returns HTTP 422 with `{"error":"email already in use"}` and the UI renders it
under the field in red. This is a live class of bug — it was filed against better-auth as a
security issue in 2026 for exactly this shape. The team then "fixes" it with a generic error and
now real users see "Something went wrong" and abandon.

---

## 7. Email verification timing — before or after first value?

### The job
The user wants to try the product. The business needs a deliverable address for password reset,
billing, and abuse control — and needs to not let spammers create 10,000 workspaces.

### The decision procedure
- **Verify before entry** when the account itself is the value (banking, healthcare, anything with
  KYC), when the email confers access to an org (domain-based auto-join), or when unverified
  accounts cost you money.
- **Verify after first value** for self-serve SaaS where the user must *see* something before they
  care. Let them into a sandbox, gate on the first action that has an external effect: inviting
  someone, publishing, sending, connecting a repo, spending money.
- **Where "after" is wrong even for self-serve SaaS:** if an unverified account can emit anything a
  third party receives — an invite, a comment notification, a shared link, a transactional send —
  you have built a spam relay, and the gate belongs before the *first emission*, not before entry.
  The same applies when the free tier costs you real money per request, which since 2024 means
  every product with an LLM behind it: unverified accounts are farmed at scale, and the gate is the
  first inference call, not the dashboard.
- **Verification is free when the method already proves the email.** OAuth with Google returns a
  verified email — do not send a verification mail on top of it. This is a common and infuriating
  double-step. A 6-digit code login is also proof; Vercel's flow verifies by construction.

The middle ground most products land on: **let them in, show a dismissible banner, gate the
irreversible actions.** The banner must contain the address and a resend, e.g. "Verify
ayush@acme.com to invite teammates. Resend email." — not a bare "Please verify your email."

### The states
- **Unverified + trying a gated action:** intercept at the action, not with a global block, and
  explain the connection: "Verify your email to invite people to this workspace."
- **Verification link expired:** the expired-link page must have a "Send a new link" button that
  works without re-login, keyed to the token.
- **Wrong address entered:** provide "Change email address" on the pending-verification screen.
  Without it the account is bricked and the user makes a new one.
- **Already verified, link clicked again:** "You're all set — this address is already verified."
  Not an error.
- **The verification email hard-bounces.** Your ESP knows within seconds that the mailbox does not
  exist; the user is staring at "check your email" and will wait forever. Consume the bounce webhook
  and change the pending screen in place: "We couldn't deliver to ayush@acmee.com — that address
  was rejected. [Change address]". Almost nobody wires this up, and it converts a permanently dead
  signup into a ten-second fix.
- **Invite accepted, then revoked.** A user clicks a workspace invite after the admin revoked it,
  the seat was filled, or the org downgraded its plan below its member count. Each needs its own
  screen and none of them is "Invalid token": *"This invite was revoked by dana@acme.com"*,
  *"Acme has no seats left — ask an admin to add one"*, *"This invite expired on 2 Sep. [Request a
  new one]"*, with a request button that actually notifies an admin. The default failure — a bare
  404 or a bounce to a signup form that then creates a personal account with no org — is how people
  end up with an orphan account and no idea why they cannot see anything.

### How it goes wrong
A hard wall immediately after signup: "Please verify your email to continue," with no way back, no
resend, no way to change the address, and no indication of which address it went to. Then Gmail
puts it in Promotions. This is where a measurable share of signups die.

---

## 8. 2FA/MFA enrollment and recovery codes

### The job
The user wants to not get hacked, in the abstract, and wants this over with, concretely. The
business needs enrollment high enough to matter and lockouts low enough to not drown support.

### Reference implementation
**GitHub** is the most-copied and the details are worth copying exactly: **16 recovery codes**,
presented with three actions — **Download**, **Print**, **Copy**. The copy tells users to store
them "with a secure password manager" and warns not to share them. Codes are single-use. They are
regenerated when you generate new ones or disable/re-enable 2FA, but **reconfiguring 2FA without
disabling it does not change them** — a distinction that matters and that GitHub states explicitly.
GitHub also pushes "set up two or more authentication methods" rather than one plus codes.

**Mercury** (fintech, higher stakes) requires 2FA outright and treats passkey/security key as a
first-class second factor alongside TOTP, with backup codes as the reset path and a manual
identity-verified reset request if the codes are gone too.

### The decisions
- **Show recovery codes during enrollment, before the first successful challenge, and require an
  acknowledgement** — a checkbox "I've saved these codes" or a challenge that asks the user to
  paste one back. Codes shown after enrollment on a screen the user can close are codes nobody has.
- **Download, Print, Copy — all three.** Different users have different storage strategies and
  the cost of adding all three is nil.
- **Number of codes:** 8–16. GitHub uses 16. Show how many remain in Settings ("6 of 16 unused")
  and prompt regeneration below 3.
- **TOTP setup:** show the QR *and* the base32 secret in a copyable field. Desktop password
  managers cannot scan a QR on the same screen.
- **Do not use SMS as the only second factor** — but do not refuse it either. For a mainstream
  consumer product, SMS 2FA is far better than no 2FA. Offer it, rank it last, label the tradeoff
  plainly. **The exception:** never SMS on an account that can move money or hold custody of an
  asset, and never in markets where SIM-swap is a routine attack. There the honest move is to not
  offer it at all rather than offer a factor you will not honour in a dispute.
- **Recovery codes are the right default and the wrong one for mass consumer.** Sixteen strings a
  user must file somewhere is a workflow that ~nobody outside a technical audience completes; you
  will have enrolled them in a lockout with extra steps. For consumer scale, make the *second
  enrolled passkey on a different platform* the primary recovery route (an iCloud passkey plus a
  Google-password-manager passkey survives losing either), and keep codes as the advanced option.
- **Step-up, not always-on.** Challenge on new device, new location, and before sensitive actions
  (changing email, adding a payout account, deleting the org) — not on every login from a device
  the user has used for a year.

### The states
- **Lost device, has codes:** a "Use a recovery code" link must be on the challenge screen itself,
  not two clicks away in help.
- **Lost device, no codes:** you need a real human path. Mercury's shape — submit a reset request,
  verify identity out of band, wait — is the honest one. State the expected wait. The alternative
  (no path) means account loss; the other alternative (email-only reset) means your 2FA is
  decorative.
- **Enrollment abandoned halfway:** if the user scanned the QR but never confirmed a code, do not
  mark 2FA enabled. Half-enrolled 2FA is a lockout generator.
- **Codes running out:** warn at 3 remaining, in-app, not by email.

### Accessibility
Recovery codes must be selectable text in the DOM, not an image or a canvas. Group them in a
`<ul>`, each `<li>` a code, so a screen reader reads them one at a time instead of as one
80-character run-on string. The QR needs an adjacent text alternative — the secret string *is* the
alt text.

### Copy
| Use | Not |
|---|---|
| "Save these 16 recovery codes. Each works once. You'll need one if you lose your phone." | "Backup codes" |
| "6 of 16 recovery codes remaining. Generate new codes →" | (silence) |
| "Use a recovery code instead" | "Having trouble?" |
| "We couldn't verify that code. Codes change every 30 seconds — check the current one." | "Invalid" |

### How it goes wrong
Recovery codes on a modal with a single "Close" button and no download. No count of remaining
codes. The TOTP screen shows only a QR, so a desktop-password-manager user cannot enroll. The
challenge screen has no recovery-code link. And when the codes are gone, the only option is a
support email address that answers in four days.

---

## 9. SSO/SAML and the "your org requires SSO" interception

### The job
The employee wants to get into the tool. The IT buyer needs every employee routed through the IdP
so that deprovisioning works. The conflict: the employee does not know the words "SAML", "IdP", or
their team's slug.

### The four patterns, ranked
WorkOS compares four login-box shapes. Ranked by how much the user has to know:

1. **Domain detection on keypress (best UX, worst leak).** The user types `marc@salesforce.com`; on
   each keystroke the client checks whether the domain has an SSO connection; on a match the
   password field is replaced by the SSO flow and the user just presses Continue. The user never
   learns the word SSO. Dropbox animates the password field away as this happens.
   **The catch nobody mentions:** an unauthenticated per-keystroke endpoint that answers "does this
   domain have SSO here" is a **customer-list enumeration API**. Iterate the Fortune 500 against it
   and you have your competitor's enterprise logo wall, plus a target list for a "your Okta session
   expired" phishing run that names the right IdP. If you ship pattern 1, rate-limit it hard per
   IP, require a plausible full address rather than answering on a bare domain, and accept that the
   sales team's logos are now public. If your customer list is itself commercially sensitive — most
   security and fintech vendors — ship pattern 2 instead and take the round trip.
2. **Identifier-first, check on submit.** Same routing, one round trip instead of per-keystroke, and
   the lookup sits behind a submit you can rate-limit and CAPTCHA. The right default.
3. **A separate "Sign in with SSO" button.** Works, but adds to the NASCAR problem and requires the
   user to self-identify as an enterprise user.
4. **Subdomain / team-slug entry (worst).** "Enter your team slug." Most employees do not know it.

**Vercel is on pattern 4 and it is a genuine flaw at an otherwise excellent product.** Walked this
month: clicking `Continue with SAML SSO` expands an inline field labelled "Team Slug" with a `?`
tooltip and placeholder `my-team`, in place, above the button. A new employee at a company that
bought Vercel has no idea what to type. Linear and Notion have the same third-pattern button
(`Continue with SAML SSO`, `SSO` tile) without domain detection.

If you build one thing well in this section, build **pattern 2**: identifier-first with a
server-side domain lookup on submit.

### The states — this is where SSO products fail
- **Domain matches but user is not provisioned in the IdP:** the IdP bounces them with its own
  error page, which is outside your product and usually says something like "Application not
  assigned." Catch the SAML error and render your own page: "Your IT team hasn't given you access
  to Acme on Vercel yet. Ask them to assign you in Okta." Name the IdP if you know it.
- **User has an existing password account and the org later enables SSO:** this is the
  "interception". On next login, after they enter their email, do not show the password field.
  Show: *"Acme now requires single sign-on. Continue with Okta →"*. Their old password should stop
  working, and you should say so, not just fail.
- **User is a member of two orgs, one SSO one not:** ask which after the identifier, or route by
  the email domain and provide "Sign in to a different organisation".
- **IdP-initiated login:** never accept an unsolicited SAML response at your ACS endpoint. Redirect
  the user to your own sign-in endpoint and start a normal SP-initiated request from there. This is
  WorkOS's stated recommendation and it closes a real vulnerability class.
- **SSO session expiry vs app session expiry:** they are different clocks and users experience the
  mismatch as random logouts. If the IdP session is shorter, re-auth silently via a hidden iframe
  or a redirect that preserves the return URL — §10 applies in full.
- **Break-glass:** every SSO-enforced org needs at least one non-SSO admin path, or an IdP outage
  locks out the people who could fix it. Surface it in the admin UI as a named, audited exception,
  not as a support ticket.

### Copy
| Use | Not |
|---|---|
| "Acme requires single sign-on. Continue with Okta →" | "SSO required" |
| "Your IT team hasn't given you access yet. Ask them to assign you Vercel in Okta." | "SAML authentication failed (error 403)" |
| "Continue with SAML SSO" (as a peer button) | "Enterprise Login" |
| "Sign in to a different organisation" | "Switch tenant" |

### How it goes wrong
A "Login with SSO" button that opens a page asking for a "Workspace URL", "Tenant ID", or "Team
slug" the employee has never seen. IdP errors surface as a raw XML parse failure or a bare 500.
Password login keeps working after SSO enforcement is switched on, so half the org never migrates
and deprovisioning silently does nothing.

---

## 10. Session expiry mid-action — the most-botched state in auth

### The job
The user is halfway through work. The business needs sessions to end so a stolen laptop is not a
permanent breach. These conflict absolutely, and the resolution is not a shorter or longer timeout —
it is **decoupling authentication from navigation**.

### The failure, precisely
The common implementation: a fetch returns 401 → a global interceptor calls
`window.location = '/login'`. Everything unsaved dies. Reports of this pattern are constant and
consistent: users describing typing "long, thoughtful responses," hitting submit, and getting
"session expired"; embedded forms where "the only option to reload clears out all entered data";
enterprise stacks that cap buffered re-POST data at ~64kB so large submissions fail even when the
re-auth works.

### The correct architecture
1. **Refresh silently, in the background.** A short-lived access token with a rotating refresh
   token, refreshed on a timer at ~75% of lifetime and on tab focus. The overwhelming majority of
   expiries should never be visible.
2. **When silent refresh fails, do not navigate.** Hold the failed request in memory. Render an
   **overlay** on top of the current page — the page stays mounted, the form stays filled.
3. **Re-authenticate inside the overlay** (password, passkey, or an SSO popup). Keep the DOM.
4. **Replay the buffered request** on success and dismiss the overlay. The user's next perception
   is that Save worked, three seconds later than expected.
5. **Only if re-auth is refused or impossible**, then navigate to `/login?returnTo=<url>` — and
   first persist the draft to `localStorage` keyed to the resource, so the post-login page can
   restore it.

**Warn before, not after.** Give a warning dialog at T-2 minutes with a live countdown and two
buttons: "Stay signed in" (primary) and "Sign out". A user who can extend never reaches the expiry
screen, so the warning is where the engineering budget goes.

**Where the overlay is the wrong answer.** The architecture above keeps the page mounted and
visible behind a re-auth surface. That is correct when the threat is *losing the user's work* and
wrong when the threat is *someone else standing at the machine* — a nurse's station, a shared
warehouse terminal, a bank branch desk, any PCI-scoped POS. In those settings the whole point of
the idle timeout is to blank the screen, and an overlay that leaves a patient record legible behind
it defeats it. The reconciliation: **obscure the content, keep the DOM**. Render the re-auth
surface opaque, or apply a heavy blur plus a `filter` to the app root, so the buffered request and
the filled form survive in memory while nothing is readable. Do not solve it by going back to
`window.location = '/login'` — that loses the work *and* leaves the previous page in the back-button
cache on many browsers, which is the worst of both.

### Accessibility — this one is legally load-bearing
- **WCAG 2.2 SC 2.2.1 Timing Adjustable** (Level A): if there is a time limit, the user must be
  able to turn it off, adjust it to 10× the default, or extend it — warned at least 20 seconds
  before expiry, with at least 20 seconds to respond via a simple action. A silent logout is a
  Level A failure.
- **WCAG 2.2 SC 2.2.6 Re-authenticating** (Level AAA): users must be warned that data will be lost
  if the session expires, *and* data must be preserved after re-authentication. The architecture
  above is what compliance with 2.2.6 looks like in practice.
- The countdown must be in an `aria-live="polite"` region that updates at most once every 30
  seconds, not every second — a per-second live region is unusable with a screen reader.
- Focus must move into the warning dialog and be trapped there; on dismiss it returns to the
  element that had focus.

### The numbers to pick
Clerk's shipped defaults are a reasonable reference point: **maximum session lifetime 7 days**,
enabled by default; **inactivity timeout disabled by default**; at least one of the two must always
be on. Chrome's 400-day cookie cap means a "remember me forever" session is not actually forever
regardless of what you configure.

Sensible defaults by product class:

| Product class | Idle timeout | Absolute max | Step-up |
|---|---|---|---|
| Consumer SaaS / content | none | 30–90 days | On payment, email change |
| B2B SaaS with sensitive data | 8–24h idle | 7–30 days | On billing, member removal, API keys, export |
| Financial / health | 10–15 min idle | 12–24h | On every money movement |
| Admin console / support tooling | 30–60 min idle | 8–12h | On every impersonation start |

### The states
- **Expired while a modal was open:** re-auth overlay must stack *above* the modal and return to it.
- **Expired in a background tab:** do not steal focus with a countdown in a tab the user is not
  looking at. Check `document.visibilityState`; start the warning timer when the tab becomes
  visible again, or refresh silently on focus.
- **Multiple tabs:** re-auth in one tab must unblock the others. Use a `BroadcastChannel` or a
  `storage` event so the other tabs retry their buffered requests instead of each showing an
  overlay.
- **Signed out elsewhere / password changed:** the 401 is now permanent and re-auth in place will
  fail. Distinguish "expired" (re-auth in place) from "revoked" (full sign-out with an explanation:
  "You were signed out because your password was changed.").
- **Offline:** a failed request due to no network must not be treated as a 401. Test with the
  network throttled to offline; a distressing number of apps log the user out when the wifi drops.
- **Rate-limited, not expired.** A 429 from your own API during a burst — an autosaving editor, a
  chat stream, a dashboard polling six widgets — must not fall through the same handler as a 401.
  The tell that you got this wrong is users reporting random logouts that correlate with heavy use.
  Back off with jitter, keep the buffered request, and if you must tell the user, tell them the
  truth: "You're going faster than we can keep up. Retrying in 5s." For a streamed response cut off
  mid-token by a limit, keep the partial text on screen and append a retry affordance under it —
  never replace rendered output with an error, and never let the stream's failure invalidate the
  session that produced it.
- **Payment failed, session fine.** A past-due or dunning-failed account is an authorization state,
  not an authentication one, and the standard botch is to intercept it at login with a full-page
  paywall — which locks the admin out of the billing page where the card is updated, and locks every
  non-billing teammate out of work they are still entitled to do. Correct shape: sign them in, keep
  the app readable, gate the write path, and put one persistent banner naming the amount, the date
  service ends, and a direct link — "Your payment failed on 3 Sep. Update your card by 17 Sep to
  keep Acme running. [Update card]". Anyone without the billing role sees "Ask dana@acme.com to
  update the team's card", with the name resolved. Never make a failed charge look like a failed
  login; users will reset a password that was never wrong.

### Mobile
Backgrounding an app for 20 minutes and returning is the normal case, not the edge case. Refresh on
foreground before rendering, show a skeleton for the 300ms it takes, and never show a login screen
as the first thing after a foreground unless the session is genuinely revoked. In a mobile web view,
`localStorage` draft persistence matters more, not less — iOS Safari discards background tabs
aggressively.

### Copy
| Use | Not |
|---|---|
| "You'll be signed out in 2:00 for security. [Stay signed in] [Sign out]" | "Session timeout warning" |
| "Signing you back in… your work is saved." | "Your session has expired. Please log in again." |
| "You were signed out because your password was changed on another device." | "401 Unauthorized" |
| "We saved your draft. Sign in to keep editing." | "Session expired — data lost" |

### How it goes wrong
A global axios interceptor with `if (err.response.status === 401) window.location.href = '/login'`.
No warning. No `returnTo`, so post-login lands on the dashboard and the user has to find their way
back to a page whose content is gone. No draft persistence. A network blip logs the user out. And
in the multi-tab case, six tabs all redirect to `/login` simultaneously.

---

## 11. Sessions, devices, and "log out everywhere"

### The job
The user thinks "did someone get into my account?" and wants to end it. The business wants to
reduce takeover dwell time.

### What the list must contain
Each row: device and browser ("Chrome on macOS"), approximate location from IP ("San Francisco, US"),
last active time ("2 minutes ago"), and a **"This device"** marker on the current one. Then a
per-row revoke and one prominent **"Sign out of all other sessions"**.

### The decisions
- **Never let the primary destructive button sign the user out of the session they are using.** It
  is "all *other* sessions". If you do sign them out everywhere including here, say so in the
  confirm: "You'll need to sign in again on this device too."
- **Require re-auth for "sign out everywhere"**, because an attacker with a live session using it
  locks out the real owner.
- **Revoking a session must actually kill the access token, not just the refresh token.** If your
  access tokens are 15-minute JWTs with no revocation list, "signed out" means "signed out in up to
  15 minutes" — either shorten them or maintain a revocation check. Do not claim in the UI what the
  backend does not do.
- **Pair the list with email notification** on new-device sign-in. The list is only found by users
  who already suspect something; the email is what makes them suspect.
- **Sign-out from a password change should be the default, with an opt-out**, and the copy should
  say which: "Sign out of all other devices (recommended)".

### The states
This list is read by exactly one kind of user — a frightened one — so every ambiguous row costs a
support ticket and every wrong reassurance costs trust.

- **The location is wrong, and it usually is.** IP geolocation puts VPN users, corporate egress and
  mobile CGNAT hundreds of miles away; "Ashburn, US" for an AWS-routed VPN and "Lagos" for a roaming
  SIM are the two that generate the most panicked tickets. Never present it as fact. "Near San
  Francisco, US (estimated from IP 203.0.x.x)" and a one-line "Locations are approximate and can be
  wrong on VPNs" under the list. Showing a map pin is the single worst choice available here.
- **The user's own current session appears twice.** Rotating refresh tokens, a second tab, or an app
  and a browser on the same laptop routinely produce duplicate-looking rows. Group by device
  fingerprint, and mark every row that shares the current device — not just the exact session — as
  "This device", or the user will revoke themselves and conclude they were hacked.
- **Revoke succeeds in the UI and fails in the backend.** The row disappears optimistically, the
  token lives another 15 minutes, and the user watches the session reappear on refresh. Confirm from
  the server before removing the row, and if propagation is not instant, say so: "Signing out — this
  can take up to a minute." Do not animate a row away on a request you have not awaited.
- **"Sign out everywhere" that misses the tokens that matter.** OAuth grants to third-party apps,
  personal access tokens, CLI sessions, app-specific passwords and long-lived mobile refresh tokens
  usually survive a session purge, which means the attacker with an issued API token is still
  inside. Either revoke them too, or enumerate what you did not touch, in the confirm dialog:
  "This signs out 4 browser sessions. It does not revoke your 2 personal access tokens or 1
  connected app. [Review those]".
- **Revoking a session that is mid-write.** An upload or a long autosave in the revoked tab should
  fail closed with the draft preserved locally, not half-commit. Test it by revoking during an
  upload; a surprising number of products write a truncated file.
- **The user revokes the wrong row and locks themselves out of the only device they have.** Make
  revoke undoable for the length of the toast, or at minimum confirm with the device name typed
  into the dialog for the current device only.

### Copy
| Use | Not |
|---|---|
| "Chrome on macOS · San Francisco, US · Active now · This device" | "Session #48ab21c" |
| "Sign out of all other sessions" | "Terminate sessions" |
| "New sign-in to your account from Chrome on Windows, Austin TX. If this wasn't you, secure your account →" | "Security alert" |

---

## 12. Account deletion and data export

### The job
The user wants out. The business wants retention, and is legally required to comply anyway. GDPR
Art. 17 (erasure) and Art. 20 (portability, in a "structured, commonly used and machine-readable
format") make export and delete non-optional in the EU/UK; CCPA/CPRA and several US state laws
impose parallel duties.

### Reference implementation
**GitHub's account deletion** requires two typed confirmations in one dialog: your username or
email, *and* a phrase from the prompt. The warning states plainly: *"Once your personal account has
been deleted, GitHub cannot restore your content."* It names what is lost — repositories, private
forks, wikis, issues, pull requests — and tells you to back up first. There is no grace period; the
friction is the two typed fields.

### The decisions
- **Two-step confirmation with a typed string** is right for anything irreversible. Typing the
  workspace name is meaningfully better than a checkbox, because it forces the user to identify
  *which* thing they are deleting. This is the same mechanic that prevents deleting the wrong repo.
  **Scope it by what is destroyed, not by the word "delete".** GitHub's two typed fields are
  proportionate to losing every repository you own. The same dialog on a free consumer account with
  nine saved recipes is retention friction dressed as safety, and in the EU it runs at the rule that
  withdrawing consent must be as easy as giving it — a signup that took one tap should not need a
  typed phrase to undo. Rule: typed confirmation when deletion destroys something the user cannot
  reconstruct or that other people depend on; a single confirm plus an undo window when it does not.
- **Offer the export before the delete, in the same flow.** A "Download your data" button in the
  deletion dialog is both a legal nicety and a genuine save-the-account moment.
- **Soft-delete with a stated grace period (14–30 days) or hard-delete with no grace — pick one and
  say which.** The failure is implying reversibility you do not have, or implying finality while
  keeping the data.
- **Say what survives and why.** Content contributed to shared spaces (a comment on someone's
  issue, a message in a shared channel, an invoice) usually cannot be removed. State it in the
  dialog: "Your comments on other people's issues will remain, attributed to a deleted user."
  Anything else is a complaint waiting to happen.
- **Block deletion of the last org owner** with a real fix, not an error: "Transfer ownership of
  Acme to another admin, or delete the organisation first."
- **Export must be async and honest.** Generate, email a signed time-limited link, tell them how
  long it takes ("This usually takes under an hour. We'll email you when it's ready."). A synchronous
  "Download" button that spins for four minutes and times out is the standard failure.

### The states
- **Active subscription:** do not silently cancel or silently continue billing. "You have an active
  Pro subscription. Deleting your account cancels it immediately; you won't be refunded for the
  remaining 18 days."
- **Export while data is still generating:** show a job status, not a dead button.
- **Re-signup with the same email after deletion:** decide and document whether the address is
  reusable. If it is, the new account must share nothing with the old one.
- **Delete requested while an export job is running.** Do not race them. Hold the deletion until the
  export link has been delivered and either downloaded or expired, and say so: "We'll delete your
  account once your export is ready — about 40 minutes." Deleting the source mid-job produces a
  half-written archive and a support ticket you cannot answer, because the evidence is gone.
- **Outstanding balance or an unpaid invoice.** State the position before the typed confirmation,
  not after: what is owed, whether deletion cancels or crystallises it, and whether a refund is
  coming. "You have an unpaid invoice of $240. Deleting your account does not cancel it." Users who
  discover this from a collections email a month later escalate.
- **The deletion itself needs re-authentication.** A live session found on an unlocked laptop should
  not be able to erase an account. Challenge the strongest factor the account has — passkey or TOTP,
  not a password the browser will autofill — immediately before the destructive step.

### Copy
| Use | Not |
|---|---|
| "Type acme-corp to confirm" | "Are you sure?" |
| "This deletes 214 documents, 3 databases and 12 integrations. This cannot be undone." | "This action is permanent." |
| "Download your data first" | (no export offered) |
| "Your comments on shared pages will remain, attributed to a deleted account." | (silence, then a support ticket) |

### How it goes wrong
Deletion is not in the UI at all — it is a support email address in the ToS. Or it is a single red
button with a `window.confirm()`. Or it "deactivates" the account with no statement of what that
means, no data removal, and no way to complete a real erasure request.

---

## 13. Impersonation and support access

### The job
Support needs to see what the user sees. The user needs to know it happened and to have consented
where the data is sensitive. The business needs an audit trail that survives a compliance review.

### The pattern
- **A persistent, unmissable banner across the full width of the viewport for the entire session**,
  stating who is impersonating whom and offering one action: *"You are viewing as ayush@acme.com as
  support agent dana@vendor.com. [Exit]"*. Not a toast. Not a corner badge. A bar that shifts the
  page down, in a colour used nowhere else in the product — so the agent cannot forget, and so any
  screenshot the agent takes carries the evidence.
- **Read-only by default.** Escalating to write requires a separate, logged action with a reason.
  **Scope it:** this is right for a self-serve product where support diagnoses and the customer
  acts. It is wrong for a done-for-you product — a bookkeeping service, a managed migration, an
  agency dashboard — where doing the work *in* the customer's account is the product. There, invert
  it: write is the default, and the control moves to the customer's consent grant and to a
  per-action audit feed the customer can read, not to a permission the agent toggles.
- **User-granted, time-boxed access for sensitive products.** The user clicks "Grant support access
  for 24 hours" in Settings; it auto-expires; both parties get an email. This converts impersonation
  from a trust problem into a consent flow.
- **Audit every action with the actor identity preserved.** The token should carry both subject and
  actor (Clerk's actor tokens use `sub` for the impersonated user and `act` for the agent) so logs
  read "dana@vendor changed billing email, acting as ayush@acme" rather than attributing the change
  to the customer.
- **Suppress outbound side effects.** Practitioners specifically flag the messaging trap: with a
  support widget live during impersonation, the agent sends a message, receives it themselves in
  the impersonated session, and the customer is never notified. Analytics, emails, webhooks and
  in-app messaging must be disabled or tagged during impersonation.
- **Block the irreversible.** No account deletion, no password/email change, no data export, no
  payout-account edits while impersonating — regardless of the agent's role.

### The states
Two identities are live at once, and every failure state is a question about which one the system
thinks it is talking to. Get that wrong and the audit log lies, which is worse than no log.

- **The agent's own session expires mid-impersonation.** Re-auth must challenge the *agent*, never
  the customer, and the buffered request must not be replayed until it does. The classic bug: the
  401 handler re-authenticates against the impersonated subject and the agent ends up holding a
  session they authenticated into with the customer's own credentials.
- **The customer changes their password, enables 2FA, or signs out everywhere while being viewed.**
  The impersonation session must die at that instant — it is derived from a credential the customer
  just invalidated — and the agent should see why: "This session ended because the customer changed
  their password." Sessions that survive a customer's own security action are how impersonation
  becomes the takeover primitive it always threatened to be.
- **The consent grant expires mid-action.** Time-boxed access hitting 24h while the agent has a form
  half-filled: warn the agent at T-5 minutes with a "Request an extension" that emails the customer,
  and hard-stop at zero. Do not silently extend because work is in progress.
- **The customer is deleted, suspended or offboarded during the session.** Terminate, do not 500,
  and say which: "This account was deleted 40 seconds ago."
- **The agent hits a feature the customer's plan does not include.** Render exactly what the
  customer would see — the upgrade prompt — not the internal admin view. An agent debugging a
  "missing" feature needs to reproduce the customer's reality, and a support tool that quietly
  grants entitlements produces confident, wrong answers.
- **Two agents impersonate the same customer at once.** Allow it, but show both in the banner and in
  the customer-facing log. Two agents making conflicting writes with a shared banner that names one
  of them is an audit trail that will not survive review.
- **Exit fails.** The Exit button must be a server-side session swap that works even if the app JS
  has crashed. A stuck impersonation session with a working banner and a dead Exit is the state that
  ends with an agent closing the tab and leaving it live.

### Copy
| Use | Not |
|---|---|
| "Viewing as ayush@acme.com (read-only) · Started 4 min ago · [Exit support session]" | "Impersonation mode" |
| "Grant support access for 24 hours" | "Allow admin login" |
| "A support agent viewed your account on 9 Sep at 14:02. [See what they did]" | (no notification) |

### How it goes wrong
A small badge in the header that scrolls away. Full write access. No expiry, so a session opened on
Tuesday is still live on Friday. Actions logged as the customer, which means the audit trail is
actively misleading. And the customer never learns it happened.

---

## The honest tradeoff table

| Method | UX cost to user | Security property | Support cost | Use it when |
|---|---|---|---|---|
| **Password** | High: must create, store, recall; typos; resets | Phishable, replayable, stuffable. Only as good as the blocklist | Highest — reset queue dominates auth support | You need offline-capable, universally understood auth, or your users demand a password-manager-fillable field |
| **Magic link** | Medium: leaves the app, may land on the wrong device, invisible to password managers | Bearer token in email; email account becomes the security boundary; link prefetch consumes it | Medium — "didn't arrive" and spam-folder tickets | The second device is intentional (Monzo), or the audience is non-technical and email-native |
| **6-digit email code** | Low-medium: one context switch, but stays on the same device | Same boundary as magic link, but no prefetch problem and rate-limitable | Low-medium | Default passwordless choice. Vercel's pick |
| **OAuth / social** | Lowest: one tap, no new credential | Inherits the IdP's security (usually strong); creates IdP dependency and duplicate-account risk | Low, except account-linking confusion | You have 2–4 providers your users demonstrably already use |
| **Passkey** | Lowest after enrollment; enrollment itself needs explaining; device-bound mental model is weak | Phishing-resistant, non-replayable. ~93% sign-in success vs ~63% for passwords | Low in steady state; **recovery is the whole cost** | Always offer. Never as the sole method |
| **TOTP (2nd factor)** | Medium: app install, 30s window, clock skew | Strong second factor; phishable in real time via relay | Medium — lockouts when the phone is lost | Any account worth stealing |
| **SMS (2nd factor)** | Low: nothing to install | Weakest 2FA — SIM swap, SS7. Still far better than nothing | Medium — delivery failures abroad | Mainstream consumer products where TOTP enrollment would be near zero |
| **SAML/OIDC SSO** | Low for the employee *if* you do domain detection; high if you ask for a slug | Centralised policy and deprovisioning; you inherit the IdP's posture | Low per-user, high per-integration | Any org above ~50 seats, and every enterprise deal |

---

## Decision procedures

**Which primary method should a new product ship?**
Ask three questions in order.
1. *Will users be on shared or managed machines where a platform authenticator is unavailable?*
   Yes → you need an email code path regardless of what else you ship.
2. *Do your users live in one identity ecosystem already?* (dev tools → GitHub; enterprise →
   Microsoft; consumer → Google/Apple) Yes → lead with that one provider, plus email code.
3. *Will you sell to companies over ~50 seats within 18 months?* Yes → put SAML in from the start,
   as identifier-first domain detection, not a bolt-on slug field.
Default answer for a 2026 B2B product: **email 6-digit code + one or two OAuth providers +
passkey offered after first sign-in + SSO on the enterprise plan.** No password at all is a
defensible choice; if you do ship passwords, ship them to NIST rev-4 rules.

**Where does the password field go?**
If you have SSO customers → identifier-first, never show password on screen one.
If you have no SSO and one identifier type → password on screen one is fine and saves a round trip
(GitHub does this).
Never two tabs.

**Verify email before or after entry?**
Money, health, or org-joining involved → before. Anything an unverified account can emit to a third
party, or any per-request cost you bear → gate the first emission. Otherwise → after, gated at the
first action with an external effect, with a persistent dismissible banner naming the address.

**Session length?**
Start from the table in §10 by product class. Then, independently of the number: silent refresh,
warn at T-2min, re-auth without unmounting the page, replay the request. Duration is the
configurable part; the architecture is the part you cannot retrofit cheaply.
Shared-terminal or regulated products: same architecture, but the re-auth surface must be opaque.

**Recovery for a passwordless account?**
Technical or B2B audience: recovery codes at enrollment (8–16, download/print/copy, acknowledgement
required) → plus a second enrolled factor on a different device → plus an out-of-band
identity-verified support path with a stated wait time. All three.
Mass consumer: a second passkey on a second platform is the primary route, codes are the advanced
option, and the support path carries the load — plan its staffing, because it is the real cost.
Either way, passwordless with only one of these is an account-loss machine.

---

## The generic version — self-diagnose against this

You have built the thoughtless version if:

- The first screen has "Sign In" and "Sign Up" tabs.
- Signup has six fields including "Confirm password", and validates on every keystroke.
- The password rules are `min 8, 1 uppercase, 1 number, 1 symbol`, with `maxlength="20"` and paste
  disabled — a set of rules NIST rev 4 forbids in three separate clauses.
- Submitting an existing email returns "An account with this email already exists."
- Failed login says "No account found with that email" — a working enumeration oracle.
- The social buttons are the same on login and signup, all brand-coloured, all competing, and
  nothing remembers which one this human used last time.
- Email verification is a hard wall right after signup, with no resend and no way to change the
  address.
- Passkey exists as a "Sign in with Passkey" button with no conditional mediation, and
  `NotAllowedError` renders as "Authentication failed".
- 2FA setup shows a QR with no copyable secret, and recovery codes appear in a modal with only a
  Close button.
- SSO asks for a "workspace URL" the employee has never seen.
- A 401 anywhere calls `window.location = '/login'`, discarding unsaved work, with no warning
  beforehand and no `returnTo` afterwards. Losing wifi logs you out.
- The security page lists "Sessions" as opaque IDs with no device, location, or "this device"
  marker.
- Account deletion is a support email address.
- Support impersonation is a small header badge with full write access and no audit trail.

The tell that ties these together: **each screen was designed in isolation and no failure state was
walked.** Every item above is fine on the happy path.

---

## Self-check

Runnable against your own implementation.

**Signup / login**
1. Load `/login`, tab from the top: does focus reach the identifier, the primary button, then the
   providers, in that visual order? No focus traps, no invisible skipped controls?
2. Submit an email that exists and one that does not. Diff the HTTP status, the body, and the
   **response time**. Any of the three differing is an enumeration leak.
3. Turn off JavaScript. Does the login form still submit, or at least fail with a message rather
   than a blank page?
4. On a 390×844 viewport with the keyboard open, is the primary button visible without scrolling?
5. Paste a 64-character password into the signup field. Is it accepted whole, or silently truncated?
6. Paste a 6-digit code into box 1 of your OTP input. Do all six fill?

**Passkeys**
7. Is `mediation: 'conditional'` called on page load, and does the identifier field carry
   `autocomplete="username webauthn"`?
8. Press Escape at the platform prompt. Does the UI say "cancelled", or does it say "failed"?
9. In Settings, try to delete the only passkey on an account with no password. Are you blocked?

**Sessions — the important ones**
10. Type 500 words into your longest form. Invalidate the session server-side. Hit Save. **Is the
    text still on screen 10 seconds later?** If not, this is your highest-priority bug.
11. Set the session to expire in 3 minutes. Do you get a warning with a countdown and a "Stay
    signed in" button at least 20 seconds before? (WCAG 2.2.1)
12. Go offline mid-session and trigger a request. Are you logged out? You should not be.
13. Open four tabs, let the session expire, re-authenticate in one. Do the other three recover
    without their own login prompts?
14. After sign-out-everywhere, is a previously-issued access token rejected immediately, or does it
    work for another 15 minutes?

**SSO**
15. Enter an email whose domain has an SSO connection. Does the password field disappear on submit
    (or on keypress), or does the user have to know a slug?
16. Post an unsolicited SAML response to your ACS endpoint. Is it rejected?
17. Enable SSO enforcement on a test org. Does an existing password still work? It should not.

**Recovery and lifecycle**
18. Enroll in 2FA and close the recovery-codes screen without acknowledging. Are you 2FA-enabled
    with zero saved codes? (You should not be.)
19. On the 2FA challenge screen, count the clicks to "use a recovery code". More than one is too
    many.
20. Request a data export. Does it complete async with an email, and does the UI say how long?
21. Delete a test account that is the sole owner of an org. Is the error actionable?

**Impersonation**
22. Start an impersonation session and scroll. Is the banner still visible?
23. Check the audit log entry for an action taken during impersonation. Does it name the agent, or
    does it name the customer?

---

## Sources

Walked in a browser, September 2026 (screenshots in `.cache/shots/`):

- `https://linear.app/signup` — zero fields; three pills, Google filled/primary, email and SAML SSO
  outlined. `/signup` → "Continue with email" → a second screen with one field: "What's your email
  address?" + "Back to signup".
- `https://vercel.com/signup` — four equal-weight social buttons (Google, GitHub, **ChatGPT**,
  Apple), "Show other options", email as a blue text link. No filled primary.
- `https://vercel.com/login` — inverted stack: email field + black `Continue with Email` primary,
  then Google/GitHub/ChatGPT/SAML SSO/**Passkey**. Submitting an email produced the enumeration-safe
  screen: "Check your email — If you have a Vercel account, we sent a code to
  ayushg.2024@gmail.com", 6 boxes, "Use a Different Email". Clicking `Continue with SAML SSO`
  expanded an inline **"Team Slug"** field (placeholder `my-team`) — the weakest of the four SSO
  patterns.
- `https://www.notion.com/signup` and `https://www.notion.so/login` — signup: "Work email" label,
  `name@company.com` placeholder, persistent work-email tip callout, three social tiles. Login after
  entering an email: 3×2 tile grid (Google, ChatGPT, Apple / Microsoft, Passkey, SSO); Continue
  button dims and shows an inline spinner while keeping its label and width.
- `https://dashboard.stripe.com/register` — Email, Full name, Password, Country (US default, ⓘ
  tooltip), `Create account`, then a single Google button below "Or sign up with".
- `https://github.com/login` (390px) — both fields on one screen, green Sign in, "Forgot password?"
  inline beside the Password label, Google + Apple below, `Sign in with a passkey` as the last link
  on the page.
- `https://auth0.com/signup` — an auth vendor choosing email-first: one field, Continue, then three
  icon-only tiles (GitHub, Google, Microsoft).
- Clerk's default `<SignIn/>` (`clerk-nextjs-app-router.vercel.app/sign-in`) — two social buttons in
  a row, "or", "Email address" with an inline "Use phone" toggle, `Continue ▸`, "Don't have an
  account? Sign up", "Secured by Clerk".
- `https://web.monzo.com` — a bank, magic-link-only on web: "Enter your email to get access" /
  "We'll send you a secure magic link to get access." / `Get magic link`.
- `https://app.revolut.com/start` — phone-number-first with a country selector, "Lost access to my
  phone number" placed directly under the field *above* Continue, then Email/Google/Apple icon
  circles, then `Create account` as a full-size secondary button.
- `https://webauthn.io` — the Duo spec demo, showing the anti-pattern: one username field with
  separate `Register` and `Authenticate` buttons.
- `https://github.com/signup`, `https://mercury.com/signup`, `https://accounts.clerk.com/sign-up`,
  `https://support.mercury.com/...` — all blocked by bot walls (GitHub's "Access is temporarily
  restricted" with a request ID; Cloudflare Turnstile on Clerk and Mercury). Worth noting as a real
  state: an anti-bot interstitial *is* part of your signup funnel, and GitHub's version at least
  gives a copyable incident ID and a feedback link.

Documentation and research:

- NIST SP 800-63B Rev. 4 — `https://pages.nist.gov/800-63-4/sp800-63b.html`. 15-char minimum for
  single-factor, ≥64 max, SHALL NOT impose composition rules, SHALL NOT require rotation, SHALL NOT
  use KBA, SHALL allow password managers, SHOULD permit paste, blocklist required.
- GOV.UK Design System — `/patterns/passwords/` (min 8, no max, 5–10 attempts before lockout, don't
  reveal which field was wrong, no password reminders or reset questions),
  `/patterns/create-accounts/` ("Do not create user accounts if you can provide a usable service
  without them"), `/components/password-input/` (Show/Hide labels, "Your password is visible" live
  region, `autocomplete` values, `spellcheck=false`, `autocapitalize=none`).
- NN/g, "Password Creation" — `https://www.nngroup.com/articles/password-creation/`. Cites
  Von Zezschwitz 2014 (higher error rates on small devices), Egelman 2013 (strength meters do
  motivate stronger passwords), Shay/CMU 2014 (longer-but-simpler policies beat classic complex
  ones on both strength and usability).
- FIDO Alliance, World Passkey Day 2026 —
  `https://fidoalliance.org/fido-alliance-reports-accelerating-global-passkey-adoption-on-world-passkey-day-2026/`
  and Descope's 2026 FIDO report summary. 5B passkeys, 90% awareness, 75% enabled, 49% regular use,
  68% of orgs deploying, ~93% vs ~63% sign-in success, 57% still phishable as primary.
- WorkOS, "UI/UX best practices for IdP & SP-initiated SSO" —
  `https://workos.com/guide/ui-ux-best-practices-for-idp-and-sp-initiated-sso`. Four login-box
  patterns; per-keystroke domain lookup replacing the password field; the "NASCAR problem"; the
  recommendation to convert IdP-initiated logins into SP-initiated requests rather than accepting
  unsolicited SAML responses.
- OWASP Authentication Cheat Sheet + WSTG "Testing for Account Enumeration" — identical generic
  responses across login, registration and reset; the "send a message informing them an account
  already exists, with reset instructions" resolution.
- Google Identity Platform — email enumeration protection on by default for projects created after
  15 Sep 2023.
- GitHub Docs — 2FA recovery methods (16 codes; Download / Print / Copy; codes unchanged when
  reconfiguring 2FA without disabling it; recommends two or more methods) and personal account
  deletion (username/email plus a typed phrase; "GitHub cannot restore your content").
- Clerk Docs — session options (max lifetime 7 days by default, inactivity timeout off by default,
  at least one must be enabled, Chrome's 400-day cookie cap); actor tokens for impersonation
  (`sub` = impersonated user, `act` = agent).
- Mercury Help Center — passkey setup prompted immediately after application submission; guidance to
  add a passkey to a second device; backup codes then an identity-verified reset request.
- Practitioner reports, Hacker News (2025–2026): magic-link-only services being invisible to
  password managers and producing "9-10 accounts" for one user; passkey recovery — *"the recovery
  options aren't exactly great"* and *"It pushes phishing back to the passkey recovery/reset
  interface"*; session expiry destroying long-form input; enterprise re-POST buffers capping around
  64kB.
- WCAG 2.2 — SC 2.2.1 Timing Adjustable (Level A: adjust/extend, 20-second warning) and SC 2.2.6
  Re-authenticating (Level AAA: warn about data loss and preserve data across re-authentication).
- GDPR Art. 17 (erasure) and Art. 20 (portability, "structured, commonly used and machine-readable
  format").
