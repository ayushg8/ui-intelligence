# Onboarding and activation

**Evaluated:** 2026-09

Scope: everything between "I clicked the button on the marketing page" and "this product is now part of
how I work." Signup screens, first-run, empty states, sample data, setup checklists, invitations,
personalization questionnaires, complex technical setup, and the return visit after six weeks away.

Everything below was walked at 1440px and 390px, or read from the vendor's own docs where the flow
sits behind a paywall. Screenshots are in `.cache/shots/onb-*`; the September 2026 re-verification
pass is in `.cache/shots/onboarding-and-activation-v-*` and its findings are at the end of this file.
Where a claim rests on something that rotates per page load — a testimonial, a logo strip, a
merchandised card — it is marked as such, because those are the claims that go stale first.

---

## If you only get five things right

1. **Ship the user into the working product, not into an explanation of it.** Linear's answer to "what
   is Linear" is `linear.app/demo` — the real app, a workspace of realistic issues, no tooltips, no modal, no
   tour. Vercel's `/new` is reachable logged-out: you can type a prompt or paste a Git URL, and the
   account gets created as a side effect of the deploy you already wanted. The signup is a step inside
   the task, not a gate in front of it.

2. **Never gate the first value behind account creation if you can avoid it.** Duolingo runs ten
   onboarding screens *and the entire first lesson* before it ever mentions an account. By the time
   the wall appears, the user has a streak of 1 and a placement result they'd lose by walking away.
   Order the flow so the account is the thing that *saves* progress, not the thing that *unlocks* it.

3. **Empty states are the onboarding, and they are the part nobody builds.** Every zero-data container
   in your product is a first-run screen that persists forever, works on every device, is not
   dismissible-and-forgotten, and shows up exactly when the user is looking at the thing it explains.
   A tour is one shot; an empty state fires every time until it's resolved.

4. **A tour is what you build when you don't know what your first value is.** NN/g's finding is blunt:
   tutorials "don't result in better task performance" and are routinely skipped
   ([nngroup.com/articles/onboarding-tutorials](https://www.nngroup.com/articles/onboarding-tutorials/)).
   The practitioner version, from HN: *"My first goal is using the software. Learn by using."* If you
   need to explain five things before the user can act, the problem is upstream of the tour.

5. **Instrument one activation event and design backwards from it.** Slack's is ~2,000 messages sent by
   a team ([amplitude.com/blog/aha-moment](https://amplitude.com/blog/aha-moment)). Not "completed
   onboarding," not "viewed 5 screens." Once you name the event, every onboarding decision becomes
   arithmetic: does this screen move people toward the event or away from it? Most tours and most
   questionnaires lose that argument.

---

## 1. The first-value contract

### The job

**User:** find out, cheaply and quickly, whether this thing does what the marketing page implied. They
are not trying to learn your product. They are trying to decide whether learning your product is worth
it. The HN framing is exact: *"Gamers game because they want to; most people use apps because they
have to, to get shit done and pay the rent."*

**Business:** capture an identity (email, ideally a work domain), enough context to route them, and get
them to the behavior that predicts retention before their attention runs out.

**How the conflict resolves:** the good products make the business's asks *fall out of* the user's task
rather than precede it. Vercel doesn't ask "what's your role" — it asks you to connect GitHub, because
it can't deploy without that, and connecting GitHub gives Vercel your identity, your company, and your
tech stack in one action that the user wanted to take anyway. Ask for things the work requires; infer
the rest.

### Reference implementation — Vercel `/new`

`vercel.com/new` loads without a session. Headline: **"Let's build something new"**. Directly under it,
a single input: *"Ask v0 to build or enter a Git repository URL…"*, with four one-tap seeds (Contact
Form, Image Editor, Mini Game, Finance Calculator) and a refresh icon to reroll them. Below, a two-pane
split: **Import Git Repository** (GitHub / GitLab / Bitbucket buttons) on the left, **Build your
solution** template cards on the right (Slack Agent, Express.js on Vercel, Next.js Boilerplate, Flask
Python Boilerplate). Between the seeds and the split sits a grey line offering a third path that needs
no account and no provider at all: "You can also drag and drop your project, or choose a **file** or a
**folder**." Three entry paths — prompt, provider, local folder — one screen, no ordering ceremony.

The load-bearing string is in fine print under the Git buttons:

> "If you don't have a Vercel account, by proceeding, you agree to creating a Vercel account subject to
> our Terms of Service and Privacy Policy."

Signup is described as a *consequence* of the deploy. Compare the dedicated `/signup` page, which is
the same product with the order reversed: "Your first deploy is just a sign-up away." That page is
honest about being a toll booth. `/new` doesn't need to be.

### The decisions

| Fork | Vercel's call | Why |
|---|---|---|
| Gate before or after the task? | After — `/new` is public | The Git connection *is* the signup; one action, two outcomes |
| Which OAuth first? | Google, then **GitHub**, then ChatGPT, then Apple | Google converts broadest; GitHub is the one that actually completes the job |
| Email? | Demoted below "Show other options", rendered as a blue text link, not a button | Email signups can't import a repo, so they can't reach first value in the same session |
| Empty-input state | Four concrete seed prompts, rerollable | An empty prompt box is a blank-page problem; naming four buildable things converts it into a menu |

### States

- **No repos found after OAuth:** Vercel falls through to the template grid rather than showing an
  empty list. The escape hatch is on the same screen as the failure.
- **Provider OAuth denied:** the other two provider buttons remain; the page does not become a dead end.
- **Deploy in flight:** log stream, not a spinner. NN/g's threshold: past 10 seconds you owe a
  percent-done or a running description, not a looped animation
  ([nngroup.com/articles/progress-indicators](https://www.nngroup.com/articles/progress-indicators/)).
  A build log satisfies this by being a description that happens to also be the truth.

### Mobile

At 390px `/signup` keeps the card's 1px border and radius — a bordered card inside a page already only
as wide as the card. Harmless, but the tell of a desktop layout ported rather than redrawn. The four
OAuth buttons stack full-width, which is right. Below the card sits one rotating social-proof line —
on the September 2026 capture, "**stripe** had 100% uptime at peak Black Friday volume"; the logo and
the claim change per load, so do not build copy that depends on either.

`/new` at 390px makes a worse trade and it is the one to learn from. The provider buttons lose their
verb: at 1440px they read "Continue with GitHub", at 390px just "**GitHub**". The label was truncated
to fit a narrower button, which drops the action from the accessible name — the exact failure the
Accessibility list below warns about, shipped by the reference implementation, on the width where it
matters most. If a label must shrink, shrink the icon and keep the verb. The template grid ("Build your
solution") is also pushed below the Git panel rather than dropped, so the mobile page is roughly three
screens tall before a user sees a template.

### Accessibility

- The provider buttons must be `<button>` with the provider name in the accessible name, not an icon
  with `aria-label="Google"`. Screen reader users need "Continue with Google", not "Google".
- The seed chips ("Contact Form", "Mini Game") are a radio group in effect. Make them one, with
  `role="radiogroup"` and arrow-key traversal, or make them plain buttons that fill the input. Do not
  make them toggle-styled divs.
- Focus must land on the primary input on load. If the first tab stop is a cookie banner, the whole
  page is unusable by keyboard for the first three seconds.

### Copy

| Works | Beats |
|---|---|
| "Your first deploy is just a sign-up away." | "Create your account" |
| "Let's build something new" | "Welcome to Vercel" |
| "Ask v0 to build or enter a Git repository URL…" | "Enter a URL" |
| Linear: "Create your workspace" | "Sign up" |
| Retool: "Welcome to Retool. Sign up to continue building." | "Sign up to continue" |

Retool's is the sharpest of these because "continue building" presupposes the user was already
building — which they were, in Retool's logged-out editor. The copy encodes the flow's shape.

### How it goes wrong

The generated version puts a `/signup` route in front of everything, calls the h1 "Get Started", stacks
Google/GitHub/Apple/Microsoft/Twitter as five identical outline buttons with no order rationale, then
lands the new account on a dashboard with four zeroed stat cards and a "Welcome! 🎉" modal.

---

## 2. The signup screen is the first onboarding screen

Six signup screens, walked the same week. They disagree about which credential goes first, and each
disagreement is downstream of what the product does on the next screen.

**Linear** (`linear.app/signup`) — h1 is **"Create your workspace"**, not "Sign up". Three buttons:
Continue with Google (filled, indigo), Continue with email, Continue with SAML SSO (both white,
outlined). **There is no password field anywhere in Linear's signup.** Email means a magic link. The
consequence is that Linear has no password reset flow, no strength meter, no confirm field, no "your
password must contain" error state, and no credential-stuffing surface. That is a large amount of
product that does not need to be designed, tested, or supported, bought with one decision.

**Notion** (`notion.so/signup`) — the modal renders over a *blurred skeleton of the real product*:
sidebar, page title, body blocks, all visible behind the scrim. You can see what you're signing into.
Two-line h1: **"Notion: your AI workspace."** in black over **"Sign up with your work email"** in grey
— the positioning claim and the instruction in one block, weighted so the instruction reads second.
Field label is **"Work email"**, placeholder `name@company.com`. Below the field, a grey callout:

> "**Tip: Use your work email** (if you have one) so it's easier for your team to join you on Notion"

This is Notion's viral-loop requirement stated as a user benefit, and it is placed *below* the input —
after you've seen the field, before you commit — rather than as a label constraint that reads as a
rejection. OAuth (Google / Microsoft / **ChatGPT**) is demoted below an "or continue with" rule.

**Slack** (`slack.com/get-started`) — h1 **"First, enter your email"**. The word "First" does the work
of a progress bar without occupying pixels or making a promise about step count. Subhead: "We suggest
using the **email address you use at work**." Email is primary and above OAuth here, inverted from
Vercel, because Slack's next screen keys off the email domain to find an existing workspace. The field
order encodes the routing logic. OAuth sits below an "OR" rule in the order Google, **Microsoft**,
Apple — Microsoft second, ahead of Apple, is the enterprise-chat tell; a consumer product with that
order has copied the wrong reference.

**Supabase** (`supabase.com/dashboard/sign-up`) — GitHub first, then ChatGPT, then SSO, then inline
email+password below an "or" rule. The right half of the 1440 viewport is a single verbatim tweet with
an avatar and handle, not a curated pull-quote — it rotates per load (September 2026: a developer
crediting the Assistant with fixing a CORS misconfiguration), so the value is the format, not the
quote. The Sign up button renders in pale disabled-green until both fields validate. Consent copy
discloses the marketing-email side effect in the same sentence as the terms — "and to receive periodic
emails with updates" — rather than as a pre-ticked checkbox.

Supabase's h1, though, is **"Get started"**, with "Create a new account" demoted to a grey subhead —
the generic headline this document flags as a symptom two sections down. A strong signup can carry a
weak h1; it is still the weakest thing on the page.

**Figma** (`figma.com/signup`) — h1 "Welcome to Figma", one Google button, an "or" rule, one email
field, one black "Continue with email" button. No password. Roughly 60% of the viewport is empty.
Defensible for a brand this established; fatal for one that isn't, because empty space where evidence
should be reads as "we have nothing to show you."

Two details are not defensible at any brand size. The email field's only label is the word `EMAIL`
rendered *inside* the input as a placeholder, so the field loses its label the moment the user types —
and a returning user who tabs back cannot tell an email field from a workspace field. And a
five-line cookie/CCPA bar occupies the entire bottom of the viewport, ahead of the form in the DOM on
some loads: on a page with three interactive elements, the consent bar is a third of the interaction
surface and probably the first tab stop.

**Retool** (`login.retool.com/auth/signup`) — split layout: form left on a warm grey ground, art +
"Trusted by teams at / ramp, DOORDASH, stripe, amazon, Adobe, OpenAI" right. Email+password inline,
Google above. Note `retool.com/signup` is a 404 (with a playable Tetris board) — the marketing domain
and the auth domain disagree about the canonical signup URL, which will silently eat any inbound link
that guesses.

### The decision table

| If your product… | Put this first | Because |
|---|---|---|
| routes on email domain (workspace discovery, SSO detection) | email field | you can't branch without it |
| completes its first task through a provider (Git, Drive, calendar) | that provider's OAuth | the OAuth grant *is* the setup step |
| is consumer / single-player | Google + Apple, side by side | App Store guideline 4.8 requires an equivalent private login option where third-party or social login is the *only* option — check the current carve-outs (own-account-system apps, enterprise/education, government ID) before assuming it binds you. Not re-verified this pass. |
| is enterprise-sold | a visible "Continue with SAML SSO" | its absence is read as "not enterprise-ready" by the buyer |
| has no password today | keep it that way | every password field you don't ship is a reset flow, a strength meter and a breach surface you don't ship |

### Copy that carries weight

- Notion's tip is the model for any business-motivated field constraint: **state the user's benefit,
  place it under the field, keep it under 15 words, and make the constraint soft** ("if you have one").
- Slack's "First," is the cheapest progress affordance in this document.
- Avoid "Sign up" or "Get started" as an h1 when the thing being created has a name in your product.
  "Create your workspace" (Linear) names the object; "Get started" (Supabase's actual h1) names
  nothing and would fit any product on the internet.

### How it goes wrong

Five identical outline OAuth buttons in alphabetical order. An h1 that says "Sign Up". A password field
with a strength meter that rejects a passphrase for lacking a symbol. A pre-ticked marketing checkbox.
And the `/signup` route 404ing from the marketing domain because two teams own two hostnames.

---

## 3. The case against tours, and the three cases where they work

### The evidence

NN/g: onboarding tutorials "don't result in better task performance"; users skip them; information
presented out of context is not retrievable at the moment of need; and dismissing them costs effort
that reads as friction. Their alternative is **pull revelations** — help that appears because the user
touched the thing, not because a timer fired.

Two practitioner comments from Hacker News, which are more diagnostic than any study:

> "The reason that I hate the guided tour is that it's restrictive. It's not at my pace and it gives me
> the feeling of being obstructed in my goal of learning the software; which is actually my secondary
> goal. My first goal is using the software. Learn by using."

> "Any kind of tour/nag tooltip on any app/site I use stays up forever, until they hopefully finally
> realize I am never going to interact with their cognitive-energy-wasting noise that should never have
> been shown to begin with. I've had the 'try out dark mode' tooltip showing on JIRA for months."

The second one names the failure mode precisely: **a coach-mark with no dismissal-decay becomes
permanent furniture.** If your tooltip has no "shown 3 times, now stop" rule, you have shipped a
permanent 40px obstruction to a subset of users forever.

And a maintenance argument, also from HN, from someone who built one:

> "When we hand rolled our own product tour code for a previous project, what we quickly learned was
> that maintenance was a nightmare. As soon as layouts updated or changed, editing the tooltips we had
> created already was tedious."

A tour couples your onboarding to your DOM. Every layout change silently breaks an anchor, and nothing
in CI catches a tooltip pointing at the wrong element.

### The three narrow cases where a tour earns its place

1. **A genuinely novel interaction paradigm.** NN/g's own exception is AR. The generalization: if the
   user cannot discover the gesture by inspection — pinch-to-zoom on a canvas in 2010, a spatial UI, a
   multi-touch chord, a modal editor's normal/insert distinction — a one-time demonstration is cheaper
   than letting them fail. Test: can a competent user find this by clicking around for 60 seconds? If
   yes, no tour.

2. **Re-orientation after you moved something they use daily.** One coach-mark, anchored to the moved
   thing, shown to users who used the old location in the last 30 days, dismissed permanently on first
   interaction. Scope it to the change; do not bundle a five-step tour onto a one-step move.

3. **A destructive or irreversible affordance in an unusual place.** "This deletes the branch, not just
   the deployment." Not really a tour — a first-use confirmation with an explanation.

Everything else is a pull revelation. Linear's implementation is worth copying exactly: click "My
issues" in the sidebar and a small tooltip appears reading **"Go to my issues — `G` then `M`"**. It
teaches the keyboard shortcut for the action you just performed the slow way, at the moment you
performed it, and it never appears if you never hover. Zero cost to users who don't want it.

### If you must ship a tour, the non-negotiables

- Maximum 3 steps. Anything longer is documentation wearing a costume.
- The dismiss control is a real button with a visible label, not a 12px `×` in a corner. Keyboard `Esc`
  closes it. Focus returns to where it was.
- Never trap focus inside a tour step. Never disable the underlying UI ("spotlight" overlays that block
  clicks are the worst version of this — they enforce your pace over theirs).
- Show-count decay: 3 impressions, or one dismissal, whichever comes first. Persist that server-side,
  per-user, not in `localStorage`, or it resurrects on every new device.
- Anchor to a stable `data-tour-target` attribute, and add a CI check that every target still exists.
- A "Replay tour" entry in the help menu, so dismissing is not a one-way door.
- `role="dialog"`, `aria-modal="false"`, `aria-labelledby` on the step title, and an
  `aria-live="polite"` announcement on step change.
- Respect `prefers-reduced-motion` for the spotlight/pulse.

### How it goes wrong

Seven steps. A pulsing purple dot. "Next →" and a 10px grey "skip". Step 4 anchors to an element that
only renders when you have data, so it floats in the top-left corner pointing at nothing. State kept in
`localStorage` so it replays on every device. No `Esc` handler.

---

## 4. Empty states are the real onboarding surface

### The job

**User:** "There's nothing here. Is it broken, am I not allowed to see it, or have I just not done the
thing yet?" Those three are indistinguishable from a blank box, and the recovery for each is different.

**Business:** every empty container is free onboarding real estate that appears at exactly the right
moment, costs nothing to maintain relative to a tour, and doesn't need to be dismissed.

NN/g's three jobs for an empty state
([nngroup.com/articles/empty-state-interface-design](https://www.nngroup.com/articles/empty-state-interface-design/)):
communicate system status, provide learning cues, and give a **direct pathway** to the task. They flag
inaccurate status as the most harmful failure: an empty state that says "no results" when the request
actually failed teaches the user to distrust the whole surface.

### The five distinct empty states, which are not one component

Most codebases have one `<EmptyState>` and use it for all of these. They need different copy, different
actions, and in two cases a different visual weight.

| Kind | User's real question | What it must contain | Example |
|---|---|---|---|
| **First-run empty** — never had data | "How do I get data in here?" | One primary action that creates the first object; optionally a "see an example" secondary | Loggly: "add log sources" *or* "explore with demo data" (NN/g) |
| **Filtered empty** — data exists, filter excludes it | "Did I break my filter?" | Echo the active filter, offer "Clear filters" | Linear demo: *"3 issues hidden by display options — Show options"*, centered under the list |
| **Resolved empty** — a good outcome | "Am I done?" | Affirm it. No CTA. | Inbox zero, "No failing tests" |
| **Permission empty** — data exists, you can't see it | "Who do I ask?" | Name the permission and the person who can grant it | "You don't have access to this project. Ask *Priya Raman* (workspace admin) for access." |
| **Error masquerading as empty** — the fetch failed | "Is this broken?" | Say it failed, offer Retry, do not say "No results" | — |

The Linear demo's filtered-empty is the one to imitate: it's a single line of secondary text plus a
text-button, positioned where the missing rows would be, no illustration, no card. It does not
interrupt; it accounts for the gap.

### Decisions

- **Illustration or not?** First-run empty: yes, if you have a real illustration system — it signals
  "intentional, not broken." Filtered and resolved empties: no. An illustration in a filtered empty
  state implies something is wrong when nothing is.
- **How many actions?** One primary. Loggly's pattern of primary ("add a source") plus a low-commitment
  secondary ("explore with demo data") is the single best structure for a first-run empty, because it
  serves both the person who is ready to work and the person who is still evaluating.
- **Where does it sit?** In the container, at the container's own scale. A full-page hero empty state
  inside a 240px sidebar panel is the most common visual failure here.
- **Copy person.** Second person, imperative, name the object: "Create your first issue," not "No items
  found."

### Mobile

Empty states are usually the only screen whose desktop layout survives 390px unchanged, and that is
exactly the bug: a 320px-wide illustration plus three lines of body copy plus a button consumes the
entire viewport, so the user cannot see the surrounding context that would tell them where they are.
At 390px, drop the illustration, keep one line and the button.

### Accessibility

- The empty state must be inside an `aria-live="polite"` region if it replaces a list that previously
  had rows — otherwise a screen reader user filters a list to zero results and hears nothing.
- Never convey "empty vs error" with color alone. Text says which.
- The primary action is a real button in the tab order, at its natural position in the container, not
  after the page footer.

### Copy

| Works | Beats |
|---|---|
| "No issues match these filters. **Clear filters**" | "No data" |
| "You don't have access to Billing. Ask Priya Raman (admin) to grant it." | "Access denied" |
| "Couldn't load deployments. **Retry**" | "No deployments found" |
| "Star your favorites to list them here" (DataDog, via NN/g) | "Nothing here yet" |
| "Create your first project — or **start from a template**" | "Get started by creating a project" |

### How it goes wrong

One `<EmptyState icon={Inbox} title="No data" />` used for all five cases, including the failed fetch.
A 300px grey illustration of a person next to a magnifying glass. Body copy reading "It looks like you
don't have any items yet. Get started by creating your first item!" A button labelled "Get Started"
that opens a modal with six required fields.

---

## 5. Sample data, demo workspaces and templates

Three different answers to "the product is empty and empty products are unevaluable." They fail
differently.

### 5a. The separate demo (Linear) — best in class

`linear.app/demo` loads the full Linear app with the workspace named **Linear Demo** and a **Sign up**
button pinned beside the workspace name. It is populated with issues that read like real engineering
work: `ENG-128 Fix CSS in payment history`, `ENG-161 UI glitch on Brave browser`, `ENG-142 Adjust
Threshold for Fraud Classification`, labelled Bug / Feature / Security / Infrastructure / AI, grouped
under projects "Website redesign", "P2P App", "Improve fraud detection models", inside "Cycle 72 · Jul
14 → Jul 27". Sidebar favorites: "2.0 Launch", "Active work", "Open bugs".

Two details do the heavy lifting, and Linear states both in its Start Guide:

> "Changes are local to your browser and reset on refresh. The demo does not include settings, and it
> does not show or support SLAs."

**Local-and-resetting** means there is nothing to clean up — the "how do I delete the sample data"
problem is designed out rather than solved. **Naming the gaps** (no settings, no SLAs) means a user who
goes looking for settings and can't find them blames the demo, not the product.

There is no tour, no tooltip sequence, no modal. The onboarding is: here is the product, with work in
it, go.

**What makes the fake data not feel fake.** The demo data passes because it has: varied ID prefixes
(ENG-, MOB-), non-uniform title lengths, real bug phrasing including a browser name, a mix of assigned
and unassigned rows, dates spanning Oct 2023 → Jan 2024 rather than all-today, and priority icons that
differ per row. Uniformly formatted, same-length, same-date, all-assigned rows are the signature of
generated fixtures and read as fake within two seconds.

**The mobile bug worth naming.** At 390px the demo drops the "Linear Demo / Sign up" header entirely.
The top bar becomes product chrome only — sidebar toggle, "Engineering › Issues", star, bell — so two
things are gone at once: the conversion CTA, and **every trace of the word "demo."** A phone visitor
sees a working issue tracker for a company called Engineering with no way to sign up and no indication
this is a sample. That contradicts the pattern the desktop version is admired for below: the mode is
supposed to be stated permanently, in the place that names the context. If your demo's mode indicator
lives in a header you collapse on mobile, you have a demo only on desktop.

The row density decision is correct and worth copying: labels, project chips and dates drop; priority
bars, status icon, title and assignee avatar survive; the filter row collapses to "Active · 2 more".
Titles truncate mid-word with an ellipsis rather than wrapping to two lines, which keeps the scan
column straight — the right call for a list, the wrong one for a single-column reading surface.

### 5b. Seeded sample data in the user's own workspace

The tempting version: create the account, drop three example projects into it. This is where "the
product feels fake" comes from, and there are three specific reasons:

1. **It is indistinguishable from the user's own objects** in every list, search result, count badge
   and notification. Their "3 projects" is a lie.
2. **Deleting it is the user's first action in your product**, which is a terrible first action, and it
   is usually three clicks per item with no bulk select.
3. **It contaminates shared surfaces.** A teammate joins and sees "Acme Corp Q3 Roadmap" in a workspace
   that has never done a roadmap.

If you seed anyway, the rules are: mark every seeded object with a visible, consistent badge
("Example"); provide **one** control that removes all of them at once, placed where the objects are,
not in Settings; never count them in dashboard totals or usage limits; never include them in exports;
and delete them automatically once the user has created N real objects. Supabase's quickstart takes the
cheap version of this by naming its sample table `instruments` — a domain nobody's real app uses, so it
can never be confused for the user's data.

### 5c. Templates (Notion)

Notion's answer to the empty workspace is a marketplace. `notion.com/templates` is headed **"Discover
— Find all the best templates and set-ups built by Notion's community"**, with the inventory count
demoted into the search placeholder (**"Search 70,000+ templates"**) rather than shouted as a headline,
across Templates / Agents / Consultants / Connections. Notion did not build an
onboarding; it built a supply-side market and let the community build 70,000 onboardings.

This works when your product is a general-purpose construction kit whose value depends on what the user
builds, and where the range of things people build is wider than any team could anticipate. It fails
when the product does one thing — templates for a single-purpose tool are just settings with a
marketing name.

The cost Notion pays: a new user's first decision is a *choice among 70,000 options*, made before they
know what any of them mean. That is why Notion's own default workspace still contains a small set of
seeded pages and why the marketplace leads with editorial cards ("Work smarter with Notion experts",
"Top creator: Teka") rather than a raw grid: the curation is the actual onboarding, the marketplace is
only inventory.

### Decision procedure

| Situation | Use |
|---|---|
| Product is unevaluable when empty, and setup is heavy (imports, integrations, team) | Separate demo workspace, browser-local, reset on refresh, gaps disclosed |
| Product is unevaluable when empty, setup is light | First-run empty state with a "see an example" secondary that opens a **read-only** example |
| Product is a construction kit with a long tail of uses | Templates, heavily curated at the entry point |
| Product does one thing, and one object makes it work | No sample data. Make creating the first object take under 20 seconds. |
| Never | Seeding un-badged, un-bulk-deletable example objects into the user's real workspace |

### Copy

- "**Linear Demo**" as a workspace name, with Sign up adjacent — the mode is stated in the place that
  names the context, permanently, not in a dismissible banner.
- "Changes are local to your browser and reset on refresh." — say the retention rule out loud.
- "Explore with demo data" as a *secondary* on an empty state (Loggly, via NN/g) — an invitation, not
  a default.

### How it goes wrong

Three seeded projects called "Marketing Website Redesign", "Q4 Product Launch", and "Team Onboarding",
each with the same six tasks, all created today, all assigned to the user, all counted in the "You have
3 active projects" stat, none marked as examples, and deletable only one at a time from a kebab menu.

---

## 6. Setup checklists and progress

Three shapes, and which one is right is set entirely by how much of the setup is mandatory.

### Stripe: checklists as reference documents, outside the product

Stripe publishes standalone checklists at `docs.stripe.com/get-started/account/checklist` (account
safety), `/checklist/website` (card-network compliance), and an integration go-live checklist. They are
documentation pages with real checkboxes, and this line at the top of each:

> "Checklist progress: As you complete each item and check it off, the state of each checkbox is stored
> within your browser's cache. You can refer back to this page at any time to see what you've completed
> so far."

Three decisions worth stealing:

1. **The checklist works logged-out.** You can plan the work before you have an account. It also says
   "You can log in to see some of your current settings" — auth upgrades the page, it doesn't gate it.
2. **It discloses where the state lives.** Browser cache, not your account. A user who checks fifteen
   boxes and then switches laptops has been told in advance why they're gone.
3. **The items are things the world requires, not things Stripe's funnel requires.** "Enable two-step
   authentication" (with a preference order: passkeys or security keys over SMS, because "SMS-based 2FA
   is vulnerable to SIM-swapping"). "Confirm your statement descriptor" — with the reason: "Missing or
   incorrect information can result in confused customers creating disputes."

The structural decision underneath all of it: **Stripe defers the expensive checklist entirely.** Per
`docs.stripe.com/get-started/account/set-up` (the old `/activate` URL now 301s here), you get a sandbox
immediately and only complete KYC verification when you want live mode. The dread-inducing part of the setup (business identity, bank
account, verification documents) is moved behind the moment the user has already decided the product
works. That is the single most important structural move available to any product with heavy
compliance setup.

### Notion: no checklist, a marketplace and a template

Notion ships essentially no setup checklist. The workspace arrives with a handful of seeded pages and
the sidebar; the "what do I do now" question is answered by templates and by the fact that a blank page
in Notion is already useful. This is right for a product whose setup is genuinely zero — there is
nothing to configure before a page works. A checklist would be manufacturing tasks.

### Duolingo: a linear wizard with a payoff screen

The full pre-account flow, walked at 390px, in order:

1. `I want to learn…` — 40+ cards, each language carrying a live learner count (Spanish 42.2M, French
   22.8M, English 20.4M…), **the languages sorted descending by that count**. The sort order is the
   recommendation; no "recommended" badge needed. Chess and Math are interleaved into that grid with no
   count at all — Chess sits third, above English — so the sort is a default the merchandiser overrides,
   not a rule. If you copy this, decide in advance which slots you are reserving; an unexplained
   count-less card in a count-sorted grid reads as a bug until the user works out it is a promotion.
2. "Hi there! I'm Duo!" — the mascot introduces itself. Not a feature.
3. "Let's get this party started!"
4. **"How did you hear about Duolingo?"** — Friends/family, TikTok, Brawl Stars, TV, News/article/blog,
   Google Search, Facebook/Instagram, YouTube, Twitch, Other. Pure marketing attribution, zero user
   value, placed at step 4 — early, while compliance is highest — and costing exactly one tap.
5. "Why are you learning Spanish?" — Boost my career / Prepare for travel / Connect with people / Just
   for fun / Spend time productively / Support my education / Other.
6. "How much Spanish do you know?" — five levels, phrased as capabilities ("I can have basic
   conversations"), not as labels ("Intermediate").
7. **"Here's what you can achieve!"** — three outcome rows composed from the answers to 5 and 6:
   *Converse with confidence / Stress-free speaking and listening exercises*; *Build a large vocabulary
   / Common words and practical phrases*; *Develop a learning habit / Smart reminders, fun challenges,
   and more*. Icon + bold title + grey subtitle, separated by hairlines. **Not cards.**
8. "What's your daily learning goal?" — 5/10/15/20 min per day, each with a name: Casual, Regular,
   Serious, Intense.
9. "Now let's find the best place to start!" — two cards: *Start from scratch — Take the easiest lesson
   of the Spanish course* / *Find my level — Let Duo recommend where you should start learning*.
10. "Since you know some common words in Spanish, you should start with Section 2!" — the questionnaire
    paying out a specific, personalized placement.
11. Loading screen carrying the mission statement.
12. **First lesson.** "Tap the matching pairs" — peaches/duraznos, and you/y tú, markets/mercados,
    bag/bolsa, bags/bolsas.

Chrome details that matter more than the copy: a thin progress bar pinned to the top with a back arrow
beside it, advancing per step. A single full-width CONTINUE pinned to the bottom above a hairline,
**disabled and grey until a choice is made** (step 9 renders it grey). And when the lesson starts, the
chrome changes completely — the mascot disappears, the progress bar resets to empty, and the back arrow
becomes an `×`. The change in chrome is how the user knows they've left onboarding and entered the
product. No screen says so.

The first exercise is a tap-to-match with no typing and no way to be embarrassed. Not a translation
prompt. The cheapest possible first interaction that still produces a correct answer.

### Decision procedure: which checklist shape

| Your setup is… | Shape | Progress affordance |
|---|---|---|
| Zero — the product works on an empty account | No checklist. Empty states only. | None |
| A handful of optional improvements | Dismissible card in the primary surface, with per-item skip and a permanent dismiss | "3 of 5" text, no bar |
| Mandatory but deferrable (KYC, billing, compliance) | Sandbox now, checklist gated to the moment live mode is requested | Explicit list of what is blocked until done |
| Mandatory and blocking (you cannot use the product at all) | Linear wizard with a back arrow, a top progress bar, and a payoff screen composed from the answers | Bar + disabled-until-valid primary |
| Ongoing and reference-shaped (compliance, launch readiness) | A documentation page with checkboxes that works logged-out and states where state is stored | Persistent, per-item |

### States for a checklist

- **Partially complete on return:** the checklist must resume, not restart, and must show *which* items
  are done at a glance without expanding anything.
- **An item completed outside the checklist** (user added a domain from Settings, not from the
  checklist): the checklist must notice. A checklist that shows "Add a domain — not started" when the
  domain is live is worse than no checklist, because it proves nothing on the page is real.
- **Permanently dismissed:** offer it back from a help menu. Never resurrect it on its own.
- **100% complete:** it disappears, with one confirmation of completion. It does not become a
  permanently green card.
- **An item the user will never do** (a checklist item for a feature on a plan they don't have): don't
  show it, or show it with the plan named.

### Accessibility

- The checklist is a `<ul>` of items whose state is conveyed textually ("Completed", "Not started"), not
  only by a green tick.
- Progress needs `role="progressbar"` with `aria-valuenow`/`aria-valuemin`/`aria-valuemax` **and** a
  visible text equivalent ("Step 4 of 10"). A bar alone announces as nothing useful.
- The disabled-until-valid primary must not be `disabled` in the DOM if it is the only thing on screen a
  keyboard user could reach — better to keep it enabled and announce the validation error via
  `aria-live` on activation. Duolingo's grey CONTINUE is the acceptable version only because the option
  cards immediately above it are the obvious focus targets.

### Copy

| Works | Beats |
|---|---|
| "Since you know some common words in Spanish, you should start with Section 2!" | "Your personalized plan is ready" |
| "Enable two-step authentication — SMS-based 2FA is vulnerable to SIM-swapping, so use it only as a last resort." | "Secure your account" |
| "Missing or incorrect information can result in confused customers creating disputes." | "Set your statement descriptor" |
| "I can have basic conversations" | "Intermediate" |
| "5 min / day — Casual" | "Low" |

The Stripe pattern generalizes: **every checklist item states the consequence of skipping it.** That
turns a chore list into a risk list, and it is the only thing that makes people do the boring items.

### How it goes wrong

A "Getting started (2/6)" card that is permanently pinned to the top of the dashboard, whose items are
"Complete your profile", "Invite a teammate", "Explore the docs", "Download the mobile app", "Connect an
integration", "Take the tour" — none of which are required to use the product, none of which state a
consequence, one of which ("Explore the docs") completes by clicking a link, and none of which can be
dismissed without completing.

---

## 7. The personalization questionnaire

Usually theater. Here is the test for whether yours isn't.

**The test:** name the specific screen, later in the flow, whose content is different because of this
answer. If you cannot name it, delete the question. If you can name it but the difference is a heading
that includes the user's role ("Great, here's Acme for **Product Managers**"), that is still theater —
the *content* has to change, not the label on it.

Duolingo passes twice. Q5 ("Why are you learning Spanish?") and Q6 ("How much do you know?") produce
screen 7 (three outcome rows chosen from the answers) and screen 10 (a specific section placement:
"you should start with Section 2"). Those screens do not exist without the answers.

Growth.Design's Grammarly teardown adds the reciprocity rule: users who hand over data expect visible
value back, and "personalization that's invisible underperforms"
([growth.design/case-studies/grammarly-onboarding-survey](https://growth.design/case-studies/grammarly-onboarding-survey)).
The corollary they observe as a Grammarly *failure*: different teams re-asking questions the survey
already answered, post-payment. If your questionnaire's answers don't reach the systems that could use
them, you have built a form that costs users time and returns nothing.

### The attribution question

"How did you hear about us?" has zero user value and real business value. Duolingo's handling is the
model: **one tap, no typing, placed early** (step 4 of 10, before investment fatigue), with an "Other"
that does not open a text field. Do not make it required. Do not put it at the end where it reads as a
toll on the way out. Do not make it a dropdown of 30 items.

### Decisions

- **Skip control:** present, always, as a visible text button, not a greyed `×`. Growth.Design notes
  Grammarly frames it as "skipping personalization" rather than a neutral "Skip" — honest framing that
  still preserves the choice.
- **One question per screen or all on one page?** One per screen when each answer branches the next
  screen (Duolingo). One page when the answers are independent and you're just collecting — a
  seven-screen wizard for seven independent selects is padding a form into a ceremony.
- **Answer format:** tappable option cards with a bold label and a grey clarifying line ("Find my level
  — Let Duo recommend where you should start learning"). Never a `<select>` on mobile; never free text
  unless you will read it.
- **Where the answers go:** into the product's actual configuration on the same session. If the answer
  only reaches your analytics warehouse, it is a survey, and you should say so.

### States

- **Back navigation must work and must preserve answers.** Duolingo puts a back arrow at every step.
- **Abandoned mid-questionnaire, returns later:** resume at the abandoned step with prior answers
  intact. If you cannot persist pre-account answers, keep them in `sessionStorage` and attach them at
  account creation — Duolingo's entire ten-step flow runs before any account exists.
- **Answers that produce nothing:** if a combination of answers yields the same default as everyone
  else's, say something true rather than manufacturing specificity.

### Mobile

This is a mobile-first surface for most consumer products, and the desktop version is the neglected one.
Duolingo's layout — mascot + speech bubble top, options in the middle third, pinned full-width CTA at
the bottom above a hairline — is the right shape at 390px and looks lost at 1440px.

It is not flawless, and the flaw is instructive. On screen 1 the h1 "I want to learn…" sits at ~270px
and the first tappable card starts at ~470px of an 844px viewport: a 200px dead band under the heading
that costs the user a scroll before the second row of options. The generous vertical rhythm that reads
as calm on a question with four options reads as emptiness on a question with forty. Scale the gap to
the option count, not to the brand.

If your product is mostly desktop, don't import this shape at all; use a centered column with a
max-width around 480px and keep the CTA in flow, not pinned.

### Accessibility

- Option cards are `role="radio"` inside a `role="radiogroup"` with an `aria-labelledby` pointing at the
  question. Arrow keys move between them; Space selects. Tapping a card must not require hitting a
  hidden 20px circle.
- The question is the screen's `<h1>`, and focus moves to it on step change.
- The progress bar needs the text equivalent (see §6).

### Copy

| Works | Beats |
|---|---|
| "Why are you learning Spanish?" | "What are your goals?" |
| "I can discuss most topics in detail" | "Advanced" |
| "Find my level — Let Duo recommend where you should start learning" | "Take a placement test" |
| "Skip personalization" | "Skip" |
| "How did you hear about Duolingo?" with 10 one-tap options | "How did you hear about us? *(required, select one)*" over a 30-item dropdown |

### How it goes wrong

Four screens — role, company size, use case, how you heard about us — each a set of radio buttons, no
back button, no skip, followed by a dashboard identical to the one everyone else gets. Then, six weeks
later, an in-app survey asking the same four questions.

---

## 8. The invite-your-team step

### The job

**User:** in a genuinely collaborative product, an empty workspace is a broken workspace — they need
someone else there before the product does anything. In a single-player-capable product, being asked to
recruit colleagues before they have an opinion is the moment they close the tab.

**Business:** invitations are the growth loop, and the invite step converts far better inside the first
session than in any email sent later.

**Resolution:** the invite step belongs **immediately after the first artifact exists, and never before
it.** The reason is social, not mechanical: nobody forwards an empty workspace. Once there is one real
issue, one real page, one real deploy, the invitation has a subject line.

Notion resolves the same conflict earlier and more gently — not with an invite screen but with the tip
under the email field ("use your work email … so it's easier for your team to join you"). Nothing is
asked; a future join is made cheaper. That's the lowest-cost version of the loop available, and it
costs the user nothing.

### Decisions

| Fork | Call | Reasoning |
|---|---|---|
| Where in the flow | After first artifact, before the second session | An invite with a link to something real converts; an invite to an empty workspace doesn't get sent |
| Skippable? | Always, with a labelled "I'll do this later" | A blocking invite step in a product a solo user can evaluate is a hard exit |
| Bulk paste or one-at-a-time? | A single textarea accepting comma/newline/space-separated addresses | Three fixed email inputs is the generated version and caps the invite at 3 |
| Domain suggestions | If you have verified colleagues on the same email domain, list them with checkboxes | The highest-converting variant, and it requires the work-email nudge at signup to work |
| Copy-link fallback | Always | Many people invite through Slack, not through your email |
| Role assignment | Not here. Default everyone to the least-privileged useful role and let the admin change it later | The inviter is guessing at invite time, and a wrong guess is silent — a too-low role reads to the joiner as a broken product, a too-high one as a security finding |

### States

- **Invite sent, not yet accepted:** show it in the member list as "Invited — resend / revoke", with the
  date. Do not silently drop pending invites.
- **Invite to an address that already has an account** on another workspace: the flow must join, not
  error.
- **Invite blocked by domain policy / seat limit:** name the limit and who can raise it. "Your plan
  includes 3 editors. *Ask Priya Raman to upgrade*" beats "Unable to invite user."
- **Bounced invite:** surface it. An invite that silently bounced is the most common reason a team
  onboarding stalls with nobody knowing why.
- **The invited person arrives:** they land on the artifact they were invited to, not on your generic
  first-run. A joiner's onboarding is a different flow from a creator's, and reusing the creator's
  checklist for them is the most common failure in team onboarding.

### Mobile

Email entry on mobile is genuinely painful; make the contact-suggestion path and the copy-link path both
prominent. `inputmode="email"` and `autocomplete="email"` on the field. Do not use a chips-input that
requires precise tap targets to remove a mistyped address — offer a plain textarea and parse it.

### Accessibility

- The multi-address field needs an accessible description stating the accepted separators.
- Parsed addresses that turn into chips must be a list with each removal button labelled "Remove
  jordan@acme.com", not "Remove".
- Send confirmation goes through `aria-live`, naming the count: "3 invitations sent."

### Copy

| Works | Beats |
|---|---|
| "Invite the people you'll work on this with" | "Invite your team" |
| "Paste as many emails as you like, separated by commas" | three empty email inputs |
| "4 people from acme.com are already on Linear" | "Invite teammates" |
| "I'll do this later" | a grey `×` |
| "Your plan includes 3 editors. Ask Priya Raman to upgrade." | "Seat limit reached" |

### How it goes wrong

An invite screen as step 2 of 6, before the user has created anything, with three fixed email inputs, a
required role dropdown per row, a "Skip" rendered in 12px #CCC, and a primary button reading "Continue"
that is disabled until at least one address is entered.

---

## 9. Progressive disclosure of advanced features

The constraint: the features that make a user stay in year two are the features that make the year-one
navigation unreadable. Progressive disclosure is a scheduling problem, not a hiding problem — the
question is what *event* reveals each feature, and "the user has been here N days" is never the answer.

**What works, in order of leverage:**

1. **Teach the fast path at the moment of the slow path.** Linear's `G then M` tooltip on the sidebar
   item you just clicked. The shortcut is only relevant to someone who just did the thing; showing it to
   anyone else is noise.
2. **Let the advanced surface be discoverable but not present.** Linear's sidebar has "More" as a
   sibling of Initiatives / Projects / Views / Loops. Everything advanced is one predictable click away
   and zero pixels of first-run cost.
3. **Trigger on the threshold that makes the feature necessary.** Surface saved views when the user's
   list first exceeds a screenful. Surface bulk actions on the first multi-select. Surface a rules
   engine after the third manual repetition of the same action. These are earned reveals; the user has
   just felt the pain the feature solves.
4. **A "What's new" affordance parked at the bottom of the chrome.** Linear's demo carries a small
   `What's new — Priority inbox` card bottom-left of the sidebar. It's ignorable, persistent,
   non-modal, and out of the reading path.

**What doesn't work:** a "Pro tips" carousel; a red dot on a nav item that means "new feature" rather
than "you have something to act on" (this trains people to ignore the only badge you'll ever need); and
disclosure triggered by tenure ("you've been here 7 days, here's Automations") rather than by behavior.

**Accessibility note specific to this pattern:** a hover-only reveal is invisible to touch and to
keyboard. Every pull revelation needs a focus trigger as well as a hover trigger, and any content it
reveals must be reachable without the pointer.

---

## 10. Onboarding for genuinely complex setup — DNS, data connections, API keys

The hardest case, and the one where the standard advice ("reduce steps") is useless because the steps
are imposed by the world.

### The reference: Vercel's custom-domain flow

Read `vercel.com/docs/domains/troubleshooting` as a specification for state design, because it is one.
The real numbers Vercel commits to in writing:

- Nameserver changes "can take up to **24–48 hours** to fully propagate."
- Domain purchases: "Most purchases complete within minutes, but some TLDs may take up to **5 days** to
  finalize. **There is no need to retry the purchase or contact support while the domain is pending.**"
- ICANN forces registrars to wait **60 days** between transfers, and between registration and transfer.

And the states it names, each with a distinct recovery:

| State string | Means | Recovery offered |
|---|---|---|
| **Invalid Configuration** | DNS records don't match what Vercel expects | The exact A/CNAME values for *your* project and plan, on the same page |
| **Pending** (purchase) | Registration in flight | Explicitly: do nothing, you'll get an email |
| **Pending verification** | Registrant contact needs confirming | Resend the email, or edit the registrant address |
| `Another Vercel account is using this domain` | Ownership conflict | Two branches — "if you have access to that account" vs "if you own the domain but not the account" (TXT record) |
| Missing `CAA` record | Let's Encrypt is blocked from issuing | The exact record to add: `0 issue "letsencrypt.org"` |

Four transferable decisions:

1. **Give the exact value, scoped to this user's project, on the screen where the error appears.** Not
   "add a CNAME record" — the CNAME, with a copy button. Vercel goes further and warns that the value
   ends in a period and that the period must be copied.
2. **Tell people what *not* to do while waiting.** "There is no need to retry the purchase or contact
   support while the domain is pending" is worth more than a progress bar, because the failure mode of a
   5-day wait is the user retrying and creating a second problem.
3. **Hand over the verification command.** The docs give `dig example.com` for record checks and
   `dig -t CAA +noall +answer example.com` for the CAA case. The user can prove the state
   themselves rather than trusting your poller. For a data connection, the equivalent is showing the
   exact query you ran and the error the database returned, verbatim.
4. **Teach the reversibility trick before the irreversible step.** Vercel's note: lower your existing
   record's TTL to 60s and wait for the old TTL to expire *before* repointing, so you can roll back
   fast. Nothing in the product forces this; the docs teach it at the moment it's actionable. Any
   setup with a long propagation delay should carry its own version of this.

### Structural decision: sandbox first

Stripe's shape (`docs.stripe.com/get-started/account/set-up`) is the general answer for
compliance-heavy setup: **a fully functional sandbox on signup, with the verification work gated to the
moment the user asks for production.** The developer integrates, tests, and forms an opinion, and only
then does anyone ask for a business address and a bank account. Note the one thing Stripe warns is
irreversible and says so up front: "After activating a Stripe service on a live account, you can't
change the business origin country."

The same shape applies to API-key onboarding: issue a scoped test key instantly and without ceremony,
make the first successful API call the activation event, and defer production keys, IP allowlists, and
rotation policy to the go-live checklist.

### States this flow must have that simpler ones don't

- **Blocked-on-a-third-party:** the wait is not yours. Say whose it is and how long they take.
- **Partially propagated:** "certain regions can access your site as intended, while others wait" — a
  state that is neither success nor failure and needs its own visual treatment (amber, with the regional
  explanation), not a red error.
- **Succeeded but not yet verified by us:** poll, but also give a manual "Check again" so the user isn't
  hostage to your interval.
- **Silently failed six hours ago:** email. An in-app-only failure state for an asynchronous setup step
  is a state nobody will ever see.
- **Permission wall:** the person doing DNS is often not the person who signed up. Give them a
  shareable, auth-free instruction page containing the exact records — "send these to whoever manages
  your DNS."

### Mobile

Nobody edits DNS on a phone, but they do *check* it on one. The status surface must work at 390px:
current state, last checked timestamp, and a "Check again" button. Put the record table in a horizontal
scroll container rather than wrapping monospace values, and give every value a copy button, because
selecting a long TXT record by touch is nearly impossible.

### Accessibility

- Record values in `<code>`, each with an adjacent button labelled "Copy CNAME value for www", not
  "Copy".
- Status changes announced via `aria-live="polite"` — a poller that silently swaps "Pending" for
  "Active" is invisible to a screen reader user watching the page.
- Never encode status in a colored dot alone. "Invalid Configuration" is text.

### Copy

| Works | Beats |
|---|---|
| "Most purchases complete within minutes, but some TLDs may take up to 5 days. There is no need to retry or contact support while the domain is pending." | "Processing…" |
| "Changing nameservers can take up to 24–48 hours to fully propagate." | "This may take a while" |
| "Add a CAA record with the value `0 issue \"letsencrypt.org\"`" | "SSL certificate could not be issued" |
| "Copy the value exactly as it appears, **including** the trailing period." | "Enter the CNAME value" |
| "This domain is already linked to another Vercel account. If you own the domain but not that account, use **Connect External** to verify with a TXT record." | "Domain unavailable" |

### How it goes wrong

A modal that says "Add a CNAME record pointing to our servers" with no value, no copy button, and no
indication of which of your seven servers. A spinner with no timeout. A red "Failed" with no reason. No
email when it eventually succeeds at 3am. And a support article that explains DNS in general terms
rather than giving this user's records.

---

## 11. Aha-moment instrumentation, and how it changes the design

Naming the activation event is a design act, not an analytics act, because it settles arguments that are
otherwise settled by seniority.

The canonical example: Slack's ~2,000 messages sent by a team, at which point a team "has experienced
the full power of Slack's real-time communication, search functionality, and workflow automation"
([amplitude.com/blog/aha-moment](https://amplitude.com/blog/aha-moment)). Note the shape — it is a
**team-level, volume-based, retention-correlated** event, not "completed onboarding."

**What a good activation event looks like:**

- It is a *user behavior*, not a *product state*. "Sent 3 messages" beats "workspace created."
- It correlates with week-4 retention in your own data. Do not borrow someone else's number.
- It is reachable in the first session for at least some users, or you've defined a metric you can't
  optimize.
- It has a natural unit of one — one deploy, one issue closed, one lesson, one payment — that you can
  put in an empty state as a CTA.

**How it changes the design, concretely:**

1. Every onboarding screen gets a budget: does it raise or lower P(activation)? Measure it — a
   one-tap, skippable attribution question and a four-screen role questionnaire are not the same
   wager, and only your funnel can tell you what each costs. Any screen that cannot show it pays for
   itself either produces a different downstream screen or gets cut.
2. The empty state's primary CTA becomes the activation event, verbatim. If the event is "first deploy,"
   the empty state button says "Deploy your first project", not "Get started."
3. The checklist's items get sorted by their correlation with the event, not by implementation order.
4. Time-to-first-value gets a number, and that number is measured from *landing on the marketing page*,
   not from account creation — otherwise you can improve it by moving work behind the signup wall.
5. Re-engagement email content becomes obvious: the missing step between where they stopped and the
   event.

**The trap:** instrumenting "completed onboarding" as the goal. Teams that do this optimize for
completion of their own flow, which is maximized by making the flow shorter and more skippable — and
then discover that the skippers don't retain, because they never reached the value. Measure the
behavior, not the ceremony.

---

## 12. Re-onboarding after an absence

Rarely built, and the failure is specific: a returning user after eight weeks is dropped into a product
that has changed, whose data is stale, whose integration tokens have expired, and they get the same
interface as someone who used it yesterday.

**What a returning user actually needs, in priority order:**

1. **What is broken.** Expired OAuth tokens, disconnected integrations, failed scheduled jobs, a card
   that declined. These are the things they cannot see and cannot recover from without being told.
   Surface them first, as an actionable list, above anything else.
2. **What happened while they were gone,** scoped to them. Not a changelog — a digest of things
   involving their objects. "4 issues assigned to you", "2 comments mention you".
3. **What changed in the product,** only if it moved something they used. This is the legitimate
   coach-mark case from §3: one mark, on the moved thing, for users who used the old location.

**What they do not need:** the first-run tour again, the setup checklist they already completed, a
"Welcome back! 🎉" modal, or a re-run of the personalization questionnaire.

**Decisions:**

| Fork | Call |
|---|---|
| Threshold for "returning" | Based on your usage cadence, not a round number. Daily-use product: 14 days. Weekly: 45. Monthly: 120. |
| Where | In the primary surface, not a modal. A modal on return is the worst possible first impression for someone who came back on purpose. |
| Dismissal | Sticky until the broken things are fixed; the digest dismisses on read. |
| Data staleness | Show the last-synced timestamp on every surface fed by an integration, always — not just for returners. |

**States:** a returner whose integration token expired *and* whose team removed their access *and* whose
plan downgraded needs all three stated separately with three separate recoveries, not one generic
"Something needs your attention."

**Copy:** "Your GitHub connection expired on 12 August. **Reconnect** — until then, deployments won't
trigger on push." Beats "Reconnect your account." Say the date, say the consequence.

---

## 13. Failure states — the part of onboarding that decides whether they come back

Every section above has a **States** list for its own flow. This section is for the failures that cut
across all of them, because they arrive from outside the flow: the session dies, the card declines, the
invite is gone, the stream stops. A first-run flow is judged almost entirely here — a user who hits a
clean success path has no story to tell, and a user who hits a dead end on day one has one story and
tells it once, to the person who recommended you.

The rule for all of them: **name what happened, name whose fault it is, name the one action that
resolves it, and preserve the work.** Generic recovery — "Something went wrong, please try again" — is
the same message as no message, and in an onboarding flow it is worse than no message, because the user
has not yet built any belief that the product usually works.

### 13a. Session and auth expiry mid-action

Passwordless signup — Linear, Figma, Notion, Slack all default to it — moves the whole failure surface
from "wrong password" to "the link." Four failures, four recoveries:

| Failure | What the user sees today | What they need |
|---|---|---|
| **Link opened on a different device from the one that requested it** | The phone logs in; the laptop tab that started it spins forever | The requesting tab polls and completes itself, or the request screen says up front which device to open the link on |
| **Link already consumed by a mail scanner** — Outlook/Gmail link-prefetch follows the URL before the human clicks | "Invalid or expired link", on a link they never clicked | Never let a `GET` consume the token. Land on a confirm page; consume on the `POST` behind a user gesture |
| **Link expired** (TTL is usually 10–60 min) | "Invalid link" | Say *expired*, say when it expired, and put "Send a new one" on the same screen with the address prefilled |
| **Session dies mid-wizard**, holding unsaved answers | Redirect to `/login`; answers gone | Re-auth in a modal over the preserved state. If you must navigate, persist wizard state against a pre-account id and rehydrate on return |

A 401 arriving mid-submit needs to be distinguishable from a 403 and from a 500. "Your session ended —
sign in to finish, your answers are saved" / "You don't have access to this workspace — ask Priya
Raman" / "That didn't save — retry" are three different sentences with three different buttons. Most
products ship one.

### 13b. Failed payment during activation

Applies to any card-up-front trial, and to §6's "mandatory but deferrable" branch the moment it stops
being deferrable.

- **Decline at the end of a wizard.** Never return the user to step 1, and never lose the form. Show
  the issuer's decline *category* (insufficient funds / card blocked / needs verification) rather than a
  raw code, and offer the two branches that actually work: another card, or the free tier if one exists.
- **The 3DS / SCA challenge that never returns.** It opens in an iframe or popup; a blocker, a
  redirect-loop, or an abandoned bank app all present identically as a hang. Give it a timeout and an
  explicit "Finish verification with your bank" retry — a spinner here is indistinguishable from a
  crash.
- **Charged, but provisioning failed.** The worst state in this document: money moved and there is no
  product. It gets its own message, states plainly that the payment succeeded, names the retry that is
  already scheduled, and shows the payment reference the user will need if they contact support. Do not
  render this as a generic error, and do not render it as a success.
- **A declined card on a returning user** (§12's list) is an onboarding failure wearing a billing
  costume. It goes above everything else on return, with the date service stops and the fix inline.

### 13c. Revoked, expired and colliding invites

The invited person is the one user in your product with zero context and zero investment, and the invite
link is their entire first impression. Every failure here is a hard exit.

- **Revoked before acceptance** — do not 404. "This invitation was withdrawn. **Request access from
  Priya Raman**" on the same page.
- **Expired** — put the TTL in the invitation email, and make renewal self-serve: "This invite expired
  on 3 March. **Ask for a new one**" notifies the inviter without a support ticket.
- **Seat limit changed between send and accept** — fail *before* they create an account, never after.
  A joiner who completes signup and is then told there is no seat has given you their details for
  nothing and has to be told by a colleague what happened.
- **Domain-capture collision** — they accept an invite to workspace A while their email domain
  auto-joins workspace B. Ask which; never silently pick.
- **Address already deprovisioned in the IdP** — the invite bounces, the inviter sees nothing, the
  onboarding stalls with nobody knowing why. Surface bounces in the member list, not only in a log.
- **Opened inside an in-app browser.** This is the mobile-specific one and it is common: an invite
  clicked from Gmail, Slack or LinkedIn on a phone opens in that app's embedded webview, which cannot
  see your desktop session and which Google blocks outright for OAuth (`disallowed_useragent`). Detect
  the embedded webview, and either hand off to the system browser or fall back to a code the user can
  type. A user who taps "Continue with Google" and gets a Google error page blames you.

### 13d. Rate limits, streams and long first runs

For any product whose first value is generated rather than retrieved — which is most AI products, and
also builds, imports, scans and syncs.

- **Rate-limited before the first token.** A 429 on the first action is the user's entire experience of
  the product. Say when capacity returns, and offer a queue or a smaller model rather than a wall.
- **Cut off mid-stream.** Keep the partial output on screen — never blank the pane — and offer Resume
  and Regenerate as separate actions. Blanking a half-written answer destroys work the user was already
  reading.
- **Completed but truncated.** Say it was truncated. A response that stops at a token limit and a
  response that finished are visually identical and semantically opposite.
- **Free-tier quota exhausted on the first action.** This is an onboarding failure, not a billing
  event. The limit belongs on the screen *before* the action, in the units the user is about to spend.
- **A first run that outlives the tab.** Email or push, and make the result reachable from a URL. An
  in-app-only completion state for a ten-minute job is a state a large share of users never see (§10
  makes the same point about asynchronous setup; it applies to generation too).

### 13e. Interrupted, duplicated and abandoned setup

- **Browser back and refresh.** Every wizard step needs its own URL. Duolingo's in-flow back arrow is
  not a substitute for the browser control — a user who hits the system back button and loses ten
  screens of answers does not distinguish the two.
- **Double-submit on create.** Two workspaces, two projects, two subscriptions. Every create call in the
  onboarding path takes an idempotency key. This is the single most common duplicate-object bug in
  first-run flows, because the create call is the slowest one in the product and the button is the one
  users double-tap.
- **The half-created account** — email captured, no workspace, user gone. This is a state with a
  recovery, not a gap in your funnel: a resume link that lands them where they stopped. It must never
  present as "email already in use" on a fresh signup attempt, which is both a dead end and an account
  enumeration oracle.
- **Third-party outage during a connect step.** When GitHub, Google or the IdP is down, the return leg
  fails with an error string you did not write. Catch it, name the provider, link the provider's status
  page, and keep the other providers live — §1's "the other two provider buttons remain" generalizes to
  every connect step in the product.

### Copy

| Works | Beats |
|---|---|
| "This link expired on 3 March at 14:20. **Send a new one to jordan@acme.com**" | "Invalid or expired link" |
| "Your payment went through, but we couldn't finish setting up your workspace. We're retrying — reference `pi_3Qa…`. Nothing further is needed from you." | "Something went wrong" |
| "This invitation was withdrawn. **Request access from Priya Raman**" | a 404 |
| "You're over the free limit for today. It resets at 00:00 UTC, or **upgrade** to keep going." | "Rate limit exceeded" |
| "The response was cut off at the length limit. **Continue**" | a response that just stops |
| "Your session ended. **Sign in to finish** — your answers are saved." | a redirect to `/login` |
| "GitHub is having an outage ([status](https://www.githubstatus.com)). **Continue with GitLab** instead, or try again later." | "Authentication failed" |

### How it goes wrong

A magic link that a corporate mail scanner burns before the user clicks, presenting as "invalid link"
with no resend. A card decline on step 6 of 6 that returns the user to step 1 with the form cleared. An
invite that 404s because an admin removed the inviter last week. A stream that blanks the pane on a
dropped connection and offers a "Retry" that starts from scratch. A "Something went wrong" toast that
auto-dismisses after four seconds and appears for session expiry, permission denial, quota exhaustion
and a 500 alike.

---

## Decision procedures

### Which onboarding shape

Answer in order; take the first match.

1. **Can the product produce value on an empty account in under 30 seconds?**
   → No onboarding flow. Ship excellent empty states and one pull-revelation per surface. (Figma, Notion)

2. **Is the product unevaluable without data, but does data arrive from a provider the user already has?**
   → Make the connection the signup. The OAuth grant is step one and step two simultaneously. (Vercel)

3. **Is the product unevaluable without data, and the data is expensive to produce?**
   → A separate, browser-local demo workspace, populated with realistic work, reset on refresh, with the
   gaps disclosed. Never seed the user's real workspace. (Linear)

4. **Does the product require a compliance/verification step before it does anything useful?**
   → Sandbox immediately, verification gated to the request for production, and a reference checklist
   that works logged-out and states the consequence of each item. (Stripe)

5. **Does the product need to know something about the user to be usable at all** (skill level, language,
   goal), where the answer changes what they see next?
   → A linear wizard, one question per screen, back arrow, top progress bar, disabled-until-valid
   primary, and a payoff screen composed from the answers. Run it before account creation. (Duolingo)

6. **Does the product require other humans to be valuable?**
   → Everything above, plus an invite step placed after the first artifact exists, never before.

7. **None of the above and you still want a tour?**
   → You have not identified your first value. Go find it. The tour will not substitute.

### Where each business ask goes

| Ask | Place it |
|---|---|
| Email / identity | At the moment it's required to save work, not before |
| Work-email preference | As a tip under the field, framed as the user's benefit (Notion) |
| Attribution ("how did you hear") | One tap, early, never required, no free text (Duolingo step 4) |
| Role / company size | Only if a later screen differs. Otherwise delete. |
| Team invitations | After the first artifact exists |
| Notification permission | After the first aha moment, never on launch (Growth.Design: "never ask for reciprocity if you haven't given anything") |
| Payment details | After the value, unless card-up-front is the deliberate qualification strategy |
| KYC / verification | At the request for production, not at signup |

### Tour vs pull revelation vs empty state

| The thing you want to teach | Use |
|---|---|
| Where a feature lives | Nothing. Fix the navigation. |
| A faster way to do what they just did | Pull revelation on the element they used (Linear's `G then M`) |
| What goes in this container | Empty state with a direct pathway |
| A novel interaction with no discoverable affordance | One-time demonstration, ≤3 steps, escapable |
| That you moved something | One coach-mark, on the moved thing, only for users of the old location |
| A whole feature area | Nothing at first run. Trigger on the threshold that makes it necessary. |

### Where these procedures break

Every fork above was tested against a product where the recommended branch is wrong. Each one has a
scope; these are the scopes.

**"Never gate the first value behind account creation."**
Breaks when the first action costs you money or touches the real world. An inference product where an
anonymous first run is a GPU bill and an abuse vector; a payroll product whose first action files a
document with a tax authority; anything that sends email on the user's behalf. Anonymous-first there is
a spam subsidy with a signup form attached.
*Scope:* ungate when the first action is cheap, reversible and confined to the user's own browser.
Gate when it spends money, sends something, or creates an obligation — and when you gate, gate at that
specific action with the reason named, not at the front door.

**"Make the OAuth grant the signup" (§1, Vercel).**
Breaks when the scope you need is the scariest thing you will ever ask for. Vercel gets away with it
because reading a repo to deploy it is self-evidently the job. A product that opens with `repo:write`,
full Gmail read, or admin consent on a Microsoft tenant is asking for maximum trust at the moment of
minimum trust — and in the tenant case, asking for something the user is not allowed to grant.
*Scope:* this branch holds only when the grant is narrow, obviously entailed by the task the user just
chose, and grantable by the person in front of you. Otherwise authenticate cheaply, show value, and
request the scope at the feature that needs it.

**"No password today? Keep it that way" (§2, Linear).**
Breaks on shared and locked-down devices: a hospital workstation, a warehouse floor, a school lab, a
field engineer with no signal. It also breaks for the user whose account *is* the lost mailbox — a
password gives them a second factor of recovery; a magic link gives them none.
*Scope:* passwordless is right for knowledge work on a personal device with reliable mail. Everywhere
else, offer at least one credential that does not depend on receiving an email right now.

**"A separate, browser-local demo workspace" (§5a, Linear).**
Breaks when the product's value is in the user's data rather than the product's mechanics. A demo
workspace of invented issues proves Linear's mechanics because the mechanics *are* the product. The
same demo for an analytics tool, a BI product, a security scanner or an observability platform proves
nothing — the user's question is "what would this find in *my* estate", and fake findings answer it
backwards.
*Scope:* demo-with-fake-data for products whose value is the mechanic. For products whose value is the
finding, the equivalent move is a read-only connect that takes under a minute and shows real results
before asking for anything else.

**"Never seed example objects into the user's real workspace" (§5b).**
Breaks in a single-player consumer product with no team, no counts that matter, no exports and no
billing by object — a habit tracker, a notes app, a recipe box. One seeded "Welcome" note that is
removed by the same swipe that removes any other note costs less than a first-run empty state and
teaches the gesture.
*Scope:* the prohibition holds wherever seeded objects can be shared, counted, exported, billed, or
seen by a second person. That is most B2B products and almost no consumer ones.

**"Sandbox now, verification at the request for production" (§6, Stripe).**
Breaks when verification lead time is longer than the evaluation window. A lender, an insurer or a
regulated healthcare product with a five-day underwriting or credentialing review defers the wall to
exactly the moment the user has decided to commit — and then makes them wait a week with the product
switched off.
*Scope:* defer verification when it completes in minutes or hours. When it takes days, start it in
parallel on day one, say how long it takes up front (the GOV.UK "check a service is suitable" move),
and keep the sandbox running throughout so the wait is not dead time.

**"The invite step belongs after the first artifact exists, and never before" (§8).**
Breaks where an artifact cannot exist without the second person. A scheduling tool whose first object
is a shared availability, a two-sided marketplace, a shared inbox, a 1:1 feedback product, a
signature-collection flow — in all of them the invitation *is* the first artifact, and "create
something first" is an instruction the product cannot satisfy.
*Scope:* "after the artifact" holds only where a solo user can produce something worth looking at. If
they cannot, the invite is step one — and then it needs the strongest possible reason-to-send in the
message, because the sender has nothing to show yet either.

**"Run the wizard before account creation" (§7, Duolingo).**
Breaks when the answers must survive a device change or attach to a verified identity. Duolingo's ten
screens work because the whole flow fits one session in one tab; a B2B flow where the evaluator starts
on a phone and finishes on a laptop loses everything held in `sessionStorage`, and a regulated flow
cannot bind pre-account answers to an unverified person at all.
*Scope:* pre-account wizards for single-session, single-device, low-stakes flows. Otherwise capture
identity early enough to persist, and pay the conversion cost knowingly.

**"Maximum 3 tour steps" (§3).**
Breaks for migration onboarding and for mandatory disclosure. A user moving off ten years of muscle
memory in a competing tool is not learning a product, they are unlearning one, and a three-step cap on
"here is where the five things you use hourly now live" is a cap on the wrong axis. A clinical, trading
or safety-critical product may be required to present acknowledgements in sequence.
*Scope:* three steps is a cap on *discovery* tours for new users. Migration guidance and required
disclosures are different genres — but they are still not tours: the first is a mapping table the user
can return to, the second is a consent flow.

**"An illustration in a first-run empty state" (§4).**
Breaks in dense professional surfaces. A trading terminal, an IDE panel, an observability console at
information density where every other pixel is data — an illustration there reads as a different
product leaking in.
*Scope:* illustrate first-run empties in spacious consumer-facing archetypes. In dense tools, one line
of text and a button is the whole component, at every empty-state kind.

**"Attribution early, one tap" (§7).**
The placement advice holds; what breaks is what you do with the answer. Asking at the highest-compliance
moment maximizes response rate and minimizes accuracy — the user answers before they have thought about
it, and "Google" absorbs everything they cannot recall.
*Scope:* self-reported attribution is a directional supplement to click attribution and a way to find
channels your pixels cannot see. It is never a channel split you report as a number.

---

## The generic version

You can diagnose your own build against this. If four or more apply, the flow was not designed.

- The route is `/signup` and the `<h1>` is "Get Started" or "Sign Up".
- Five OAuth providers as five identical outline buttons, no order rationale, email below a rule.
- A password field with a strength meter, a confirm field, and a rule that rejects a passphrase.
- Account created → land on `/dashboard` → four stat cards reading 0, 0, 0, 0 → a "Welcome! 🎉" modal.
- The modal is step 1 of 6. Steps 2–6 are tooltips anchored to nav items. Step 4 points at empty space
  because its target only renders when you have data.
- The skip control is a 12px `#CCCCCC` "skip" under a full-width purple "Next →".
- A questionnaire — role, company size, use case — whose answers change nothing anyone will ever see.
- Three seeded example projects, all created today, all assigned to the user, all counted in the stats,
  none badged, deletable only one at a time.
- A "Getting started 2/6" card pinned permanently to the dashboard whose items include "Explore the docs"
  and "Take the tour", none of which state a consequence for skipping.
- One `<EmptyState title="No data" />` component used for first-run, filtered, permission-denied and
  failed-fetch alike.
- An invite step at position 2 of 6, before anything exists, with three fixed email inputs and a required
  role dropdown per row.
- A "Connect your database" modal with a spinner, no timeout, and a red "Failed" with no reason string.
- Tour state in `localStorage`, so it replays on every device the user owns.
- The whole thing at 390px is the 1440px layout with `flex-direction: column`.
- One "Something went wrong" toast, auto-dismissing after four seconds, serving session expiry,
  permission denial, quota exhaustion and a 500 alike.
- A magic link that a mail scanner can burn, with no "send a new one" on the failure screen.
- A card decline on the final step that clears the form and returns the user to step 1.
- A revoked invite that 404s.

---

## Self-check

Run these against your implementation.

**Structure**
1. Name your activation event in one sentence, as a user behavior with a count. If you can't, stop here.
2. Time yourself from the marketing page to that event, on a cold browser, on a phone. Write the number
   down. Then do it again with a screen reader.
3. List every question you ask before the user reaches that event. For each, name the later screen whose
   content differs. Delete the ones with no answer.
4. Count the actions between account creation and the first artifact. Anything over 3 needs a defence.

**Empty states**
5. Set your dev data to zero and screenshot every list, table, panel and chart. Every one of them.
6. For each: does it distinguish never-had-data from filtered-to-zero from permission-denied from
   fetch-failed? Does each carry a direct pathway, not just a description?
7. Break the network and reload. Does anything say "No results" when it means "request failed"?
8. Screenshot the empty states at 390px. Does an illustration eat the viewport?

**Tours and coach-marks**
9. Count your tour steps. Over 3 → cut it or justify each in writing.
10. Does `Esc` close it? Does focus return? Is the underlying UI still clickable?
11. Dismiss it, then log in from a different browser. Did it come back? (If yes, your state is in
    `localStorage` and should be on the server.)
12. Change a layout in a way that removes a tour anchor. Does anything fail loudly, or does the tooltip
    silently point at the wrong element?

**Sample data**
13. If you seed objects into the real workspace: is each badged, are they excluded from counts and
    exports, and is there one control that removes all of them?
14. Look at your fixture data for two seconds. Same length titles? All created today? All assigned to the
    same person? Then it reads as fake.
15. If you ship a demo: does it state what it doesn't include, and where its changes go?

**Checklists**
16. Complete one item from somewhere else in the product. Does the checklist notice?
17. Does each item state the consequence of skipping it?
18. Complete all of them. Does the checklist leave, or become a permanent green card?
19. Return after 30 days mid-checklist. Does it resume with the right items ticked?

**Complex setup**
20. Trigger every failure: bad credentials, expired token, wrong DNS record, third-party outage,
    insufficient permission. Does each produce a distinct message with a distinct recovery?
21. Is there a state that is neither success nor failure (propagating, pending review, partially synced)?
    Is it visually distinct from the error state?
22. Does an asynchronous failure that happens six hours later reach the user by email?
23. Can the user copy every value you ask them to paste elsewhere, with one tap, at 390px?
24. Can a non-account-holder (the person who runs your DNS) get the instructions without logging in?

**Invitations**
25. Is the invite step after the first artifact exists?
26. Does the invited person land on the artifact, or on the creator's first-run flow?
27. Do pending, bounced, and seat-limited invites each have a visible state?

**Failure states (§13)**
28. Request a magic link, then open it in a different browser from the one that requested it. Does the
    original tab ever finish, or does it spin forever?
29. Fetch your own magic link with `curl` before clicking it, then click it. Does it still work? (If
    not, a corporate mail scanner will burn every link you send into that tenant.)
30. Decline a card at the last step of your paid signup with a test card. Are the form's answers still
    there? Is the decline category named? Is there a second path that is not "try again"?
31. Force a success on the charge and a failure on provisioning. Does the resulting screen say that
    money moved?
32. Revoke an invite, then open its link. 404, or a request-access path?
33. Open an invite link inside the Gmail or Slack mobile app. Does OAuth complete, or does Google
    return `disallowed_useragent`?
34. Kill the connection halfway through your first streamed or long-running result. Does the partial
    output survive on screen? Is Resume distinct from Regenerate?
35. Double-tap the create-workspace button on a slow connection. How many workspaces exist?
36. Trigger session expiry, permission denial, quota exhaustion and a 500 in turn. Count how many
    distinct messages your product produced. It should be four.

**Return**
37. Expire an integration token and come back. Are you told, before anything else, with the consequence
    named and a fix on the same screen?
38. Do you get the first-run tour again? (You should not.)

---

## Sources

Walked in September 2026 — screenshots in `.cache/shots/`:

- [linear.app/signup](https://linear.app/signup) — "Create your workspace"; Google / email / SAML SSO;
  **no password field anywhere**.
- [linear.app/demo](https://linear.app/demo) — full product, browser-local, a workspace of realistic issues (IDs observed up to ENG-179)
  (ENG-128 "Fix CSS in payment history", cycles, projects, mixed labels). No tour, no tooltips. "Linear
  Demo / Sign up" in the sidebar header — which disappears at 390px. Pull-revelation tooltip "Go to my
  issues — G then M". Filtered-empty line: "3 issues hidden by display options — Show options".
- [linear.app/docs/start-guide](https://linear.app/docs/start-guide) — "Changes are local to your browser
  and reset on refresh. The demo does not include settings, and it does not show or support SLAs."
  Also links a live group onboarding session (luma.com/welcome-to-linear).
- [vercel.com/new](https://vercel.com/new) — reachable logged-out. "Let's build something new", v0 prompt
  + 4 rerollable seeds, Git provider buttons, template grid. "By proceeding, you agree to creating a
  Vercel account…"
- [vercel.com/signup](https://vercel.com/signup) — "Your first deploy is just a sign-up away."
  Google / GitHub / ChatGPT / Apple; email demoted under "Show other options".
- [vercel.com/docs/domains/troubleshooting](https://vercel.com/docs/domains/troubleshooting) — the state
  machine for a hard setup flow: **Invalid Configuration**, **Pending**, **Pending verification**;
  24–48h nameserver propagation; "up to 5 days" for some TLDs with "no need to retry"; ICANN's 60-day
  transfer lock; the lower-your-TTL-first rollback tip; exact CAA value.
- [docs.stripe.com/get-started/account/set-up](https://docs.stripe.com/get-started/account/set-up) —
  re-verified Sept 2026; `/get-started/account/activate` now 301s here. Sandbox on signup, KYC deferred
  to live mode; verbatim: "After activating a Stripe service on a live account, you can't change the
  business origin country."
- [docs.stripe.com/get-started/account/checklist](https://docs.stripe.com/get-started/account/checklist)
  and [/checklist/website](https://docs.stripe.com/get-started/checklist/website) — logged-out
  checklists; "the state of each checkbox is stored within your browser's cache"; every item states the
  consequence of skipping ("SIM-swapping", "confused customers creating disputes").
- [notion.so/signup](https://www.notion.so/signup) — modal over a blurred render of the real product;
  "Work email" primary; the tip "Use your work email (if you have one) so it's easier for your team to
  join you on Notion"; Google / Microsoft / ChatGPT below.
- [notion.com/templates](https://www.notion.com/templates) — "Search 70,000+ templates"; onboarding
  outsourced to a marketplace, curated with editorial cards at the entry point.
- [slack.com/get-started](https://slack.com/get-started) — "First, enter your email"; "We suggest using
  the email address you use at work."
- [slack.com/help/articles/218080037](https://slack.com/help/articles/218080037-Getting-started-for-new-members)
  — the four first-run tasks Slack actually names.
- [supabase.com/dashboard/sign-up](https://supabase.com/dashboard/sign-up) — GitHub / ChatGPT / SSO
  above inline email+password; a verbatim tweet as the right-hand panel; marketing-email consent stated
  in the terms sentence.
- [supabase.com/docs/guides/getting-started/quickstarts/nextjs](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
  — sample data in a deliberately neutral `instruments` table; two env vars as the whole credential set.
- [figma.com/signup](https://www.figma.com/signup) — "Welcome to Figma"; Google + email only, no
  password; ~60% empty viewport.
- [login.retool.com/auth/signup](https://login.retool.com/auth/signup) — "Welcome to Retool. Sign up to
  continue building."; logo wall. Note `retool.com/signup` is a 404.
- [duolingo.com/register](https://www.duolingo.com/register) — full ten-screen pre-account flow walked at
  390px: language grid sorted by live learner counts (Spanish 42.2M … High Valyrian 1.02M), mascot
  intro, attribution survey at step 4, motivation, self-assessed level, composed payoff screen, daily
  goal with named tiers, placement fork, personalized section placement, then the first lesson ("Tap the
  matching pairs") before any account exists. The cookie-consent sheet that covers ~40% of the mobile
  viewport and blocks the first choice appears on EU/UK requests; a US-IP capture in September 2026
  showed none, so treat it as a jurisdiction-dependent obstruction, not a property of the flow.
- [cash.app](https://cash.app) — mobile-first marketing; single "Download Cash App" CTA pinned to the
  bottom; onboarding itself is app-only.
- [superhuman.com](https://superhuman.com) — now Superhuman Go; the original 1:1 concierge onboarding is
  no longer offered publicly. The scaled successor of that idea is visible in Linear's group "live
  onboarding session" and Notion's "Consultants" marketplace tab.

Research and teardowns cited:

- NN/g, [Onboarding Tutorials](https://www.nngroup.com/articles/onboarding-tutorials/) — tutorials "don't
  result in better task performance"; the paradox of the active user; pull revelations; the AR exception.
- NN/g, [Empty-State Interface Design](https://www.nngroup.com/articles/empty-state-interface-design/) —
  three jobs of an empty state; "inaccurate system-status messages for empty states are particularly
  harmful"; DataDog and Loggly examples, including "explore with demo data" as a secondary.
- NN/g, [Progress Indicators](https://www.nngroup.com/articles/progress-indicators/) — <1s none, 1–2s
  immediate feedback, 2–10s looped, 10s+ percent-done with a text label and a cancel.
- Growth.Design, [Grammarly onboarding survey](https://growth.design/case-studies/grammarly-onboarding-survey)
  — framing the skip as "skipping personalization"; reciprocity; invisible personalization
  underperforms; Conway's-law duplication of questions across teams.
- Growth.Design, [5 onboarding mistakes](https://growth.design/case-studies/5-product-onboarding-mistakes-to-avoid)
  — "never ask for reciprocity if you haven't given anything. Ask for notifications after users have
  their first Aha-moment"; reactance from repeated upsells; 21% first-use churn in the case examined.
- Amplitude, [Aha moment](https://amplitude.com/blog/aha-moment) — Slack's ~2,000 team messages.
- First Round Review, [How Superhuman Built an Engine to Find Product/Market Fit](https://review.firstround.com/how-superhuman-built-an-engine-to-find-product-market-fit/)
  — PMF score 22% → 58% over three quarters; the "very disappointed" instrument.
- GOV.UK Design System, [Check a service is suitable](https://design-system.service.gov.uk/patterns/check-a-service-is-suitable/)
  — tell users up front whether they're eligible, what it costs and how long it takes, before they
  invest time.
- Hacker News practitioner comments (via hn.algolia.com), quoted in §3 and §1: the guided-tour pacing
  complaint, the permanent-JIRA-tooltip complaint, the tour-maintenance complaint, and "most people use
  apps because they have to, to get shit done and pay the rent."

---

## Review pass (2026-09)

Adversarial re-read plus a live walk of nine flows at 1440px and 390px on 9 September 2026.
Screenshots: `.cache/shots/onboarding-and-activation-v-1…v-11-{1440,390}.png`.

### Claims re-verified against the live product

| # | Claim | Result |
|---|---|---|
| 1 | `vercel.com/new` loads logged-out; "Let's build something new"; four rerollable seeds (Contact Form, Image Editor, Mini Game, Finance Calculator); GitHub/GitLab/Bitbucket; the "by proceeding, you agree to creating a Vercel account" fine print | **Confirmed verbatim.** Added: a third entry path the file had missed — "drag and drop your project, or choose a file or a folder" |
| 2 | `linear.app/signup` — "Create your workspace"; Google (filled indigo) / email / SAML SSO; no password field | **Confirmed exactly** |
| 3 | `notion.so/signup` — modal over a blurred render of the real product; "Work email" label; the work-email tip verbatim, below the field; Google/Microsoft/ChatGPT demoted | **Confirmed.** Added the two-line h1 the file omitted |
| 4 | `slack.com/get-started` — "First, enter your email" / "We suggest using the email address you use at work" | **Confirmed.** Added the OAuth order (Google, Microsoft, Apple) |
| 5 | `supabase.com/dashboard/sign-up` — GitHub → ChatGPT → SSO → email+password; disabled-green Sign up; marketing consent inside the terms sentence | Structure confirmed. **Two errors fixed** — see below |
| 6 | `vercel.com/signup` at 390px — OAuth order, email demoted under "Show other options" as a blue link, bordered card | Confirmed. **Social-proof claim was wrong** — see below |
| 7 | `linear.app/demo` at 390px — header CTA disappears; row density | Confirmed, and worse than stated — see below |
| 8 | `figma.com/signup` — "Welcome to Figma", Google + email, no password, mostly empty viewport | Confirmed. Added two defects the file had missed |
| 9 | `notion.com/templates` — "Search 70,000+ templates"; Marketplace / Templates / Agents / Consultants / Connections; editorial cards including "Top creator: Teka" | **Confirmed.** Added the "Discover" h1 and the fact that the count lives in the search placeholder, not a headline |
| 10 | `vercel.com/docs/domains/troubleshooting` — 24–48h nameserver propagation, "up to 5 days"/"no need to retry", ICANN 60-day lock, `0 issue "letsencrypt.org"`, the partial-propagation language | **All confirmed verbatim in the live docs.** The `dig` command shape was wrong — fixed |
| 11 | Stripe checklist — "stored within your browser's cache", "You can log in to see some of your current settings", SIM-swapping, "confused customers creating disputes" | **All confirmed verbatim** |
| 12 | Stripe activate — sandbox on signup, KYC at live mode, "you can't change the business origin country" | Content confirmed verbatim. **URL had moved** — fixed |
| 13 | `retool.com/signup` returns 404 while `login.retool.com/auth/signup` is canonical | **Confirmed** (HTTP 404, no redirect) |
| 14 | Duolingo screen 1 — language cards with live learner counts, Spanish 42.2M / French 22.8M / English 20.4M, sorted by count | Confirmed. **Sort claim was too strong** — fixed |

### Errors corrected

1. **Supabase's h1 is "Get started"**, not "Create a new account" — that string is a grey subhead. The
   copy table had been holding Supabase up as an example of naming the object; it is an example of the
   opposite, and the file now says so.
2. **The Supabase testimonial handle was wrong** (`@yatsiv_yuriy`). The panel rotates per load; the
   September 2026 capture was a different developer on a different subject. Handle removed — a
   rotating asset should never be cited as a fixed fact.
3. **Vercel's social-proof strip is not "Adobe has 6× faster preview builds."** On this capture it read
   "stripe had 100% uptime at peak Black Friday volume." Also rotating; also now marked as such.
4. **`docs.stripe.com/get-started/account/activate` 301-redirects to `/get-started/account/set-up`.**
   Three references updated. The quoted content survived the move intact.
5. **`dig cname www.example.com` is not what Vercel's docs give.** They give `dig example.com` and
   `dig -t CAA +noall +answer example.com`. Corrected.
6. **Duolingo's language grid is not purely count-sorted** — Chess is interleaved third, above English,
   with no count. Rewritten as "a default the merchandiser overrides," with the design consequence.
7. **The Duolingo cookie-consent claim is jurisdiction-dependent.** A US-IP capture showed no consent
   sheet at all. Scoped to EU/UK rather than presented as a property of the flow.
8. **The App Store "Apple is mandatory" line was stated too flatly.** Guideline 4.8 has carve-outs.
   Rewritten as a pointer to the current guideline and explicitly marked not re-verified this pass.

### Mobile findings added

- **Vercel `/new` at 390px drops the verb from its provider buttons** — "Continue with GitHub" becomes
  "GitHub". The reference implementation ships, at mobile width, the exact accessible-name failure the
  file's own Accessibility list warns against.
- **Linear's demo at 390px loses more than the CTA.** The top bar collapses to "Engineering › Issues";
  the word *demo* appears nowhere on screen. A phone visitor sees an unlabelled issue tracker with no
  signup path — which contradicts the pattern the desktop version is praised for.
- **Figma's signup uses `EMAIL` as an in-field placeholder** (the label vanishes on typing), and a
  five-line consent bar occupies the bottom of a viewport that holds three interactive elements.
- **Duolingo's first screen has a ~200px dead band** between the h1 and the first tappable card, on a
  question with forty options. The "unimprovable at 390px" claim was replaced with the measurement and
  the rule it implies: scale vertical rhythm to option count.

### Sections added

- **§13 Failure states** — the identified gap. The file had per-flow `States` lists but nothing
  cross-cutting. Now covers session and magic-link expiry (including mail-scanner link burn and the
  wrong-device link), failed payment during activation (decline-at-step-6, the 3DS hang, and the
  charged-but-not-provisioned state), revoked/expired/colliding invites (including the in-app-webview
  `disallowed_useragent` failure), rate limits and interrupted streams, and duplicated or abandoned
  setup. With a copy table and a `How it goes wrong`.
- **Where these procedures break** — every fork in the file tested against a product where its
  recommended branch is wrong, with the scope written in. Eleven forks; the sharpest counterexamples
  are the OAuth-as-signup branch against a `repo:write` or tenant-admin scope, the browser-local demo
  against an analytics or security product whose value is the finding rather than the mechanic, the
  invite-after-artifact rule against products where the invite *is* the first artifact, and
  sandbox-first against a five-day underwriting review.
- Nine new self-check items covering the §13 failures, and six new lines in the generic-version
  diagnostic.

### Cut

Filler openers on §2 and §6; the §9 aphorism ("power features are why people stay…") replaced with the
actual constraint; two unsourced quantifications ("role pickers triple the decision cost", "attribution
costs no drop-off") replaced with the reasoning that survives without a fabricated number.

### Still unverified

The Duolingo screens 2–12 (mascot intro, attribution question, motivation, self-assessment, payoff
screen, daily goal, placement fork, first lesson) were not re-walked this pass — screen 1 was confirmed
live and the rest are carried from the original walk. The Slack ~2,000-message activation figure is
Amplitude's published number, not something observable from outside. Linear's Start Guide quote and the
HN practitioner comments were not re-fetched.
