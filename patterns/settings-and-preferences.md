# Settings, preferences and configuration

**Evaluated:** 2026-09

Settings is where product teams stop designing. It is also the first place a power user goes, the
place every support ticket ends, and the surface where a single wrong default costs more than a
month of feature work. This file is what I found by walking the real thing in Linear, Stripe,
Vercel, GitHub, Google Workspace Admin, VS Code and Slack, and by reading the specs that govern
the controls (Apple HIG, Material 3, GOV.UK, W3C ARIA APG).

---

## If you only get five things right

**1. Split by *whose* setting it is, before you split by topic.**
Linear's settings sidebar is one scroll containing two labelled groups: `Workspace` (Overview,
General, Security, Members, Labels, Projects, Templates, Initiatives, SLAs, Asks, Applications,
Emojis, Plans, Billing, Audit log, Import/Export, Integrations) and `My Account` (Profile,
Preferences, Notifications, Security & Access). One nav, two scopes, scope stated as a group
heading. Users do not have to guess which "Notifications" they are about to change, because there
is only one and it sits under `My Account`. Topic-first IA ("Notifications", "Security",
"General") without a scope split is the single most common way settings become unfindable — it
produces two pages called *Security* and no way to know which one you want.

**2. A toggle that needs a Save button is not a toggle.**
NN/g: "Toggle switches should take immediate effect and should not require the user to click Save
or Submit to apply the new state… If immediate results are not achievable or seem ill-suited, an
alternative…should be used instead." That is a hard fork, not a style preference. Immediate-apply
→ switch. Needs validation, costs money, or is one field of a multi-field form → checkbox or
radios inside a form with an explicit Save.

**3. Collapse the notification matrix into per-channel rows whose subtitle is the live state.**
Linear's Notifications page is four rows — Desktop, Mobile, Email, Slack — and each row's second
line is the current configuration rendered as a sentence: "Enabled for assignments, status changes,
9 others", "Enabled for all notifications", "Disabled". A dot (green/grey) carries the on/off. A
chevron drills into that channel's toggles. Four rows replace a 4×12 checkbox grid, and the user
can audit their whole setup without opening anything.

**4. A good default deletes a setting.**
Linear ships roughly twelve user preferences in total, across four sections. Notification *types*
are deliberately grouped and not individually selectable — the docs say so outright: "the
status-changes category includes issue completions and cancelations, urgent-priority changes, and
changes to blocking relationships. You cannot select *only* status changes." Refusing to expose an
axis is a design act. Every toggle you ship is a permanent support surface, a permanent migration
liability and a permanent line in your state model.

**5. Match the confirmation to the reversibility, not to the scariness.**
GitHub repo deletion (irreversible-ish) costs five deliberate acts. Stripe's billing portal
cancel — fully reversible — costs one button, but shows the exact consequence and the exact undo
before you press it: "Your plan will be canceled, but is still available until the end of your
billing period on June 16, 2023. If you change your mind, you can renew your subscription." Red
boxes and type-to-confirm on a reversible action are theatre; they teach users to type names
reflexively, which is exactly how the irreversible one gets through.

---

## 1. Settings information architecture

### The job
The user arrived with one specific intention ("stop emailing me", "add a teammate", "change the
billing card") and no model of your object graph. The business needs settings organised by the
objects it actually stores, because that is what permissions, audit logs and APIs are shaped
around. These conflict: users think in tasks, the system thinks in scopes.

The resolution the best products use: **scope is the top-level split (because permissions and
blast radius follow scope), topic is the second-level split (because that is how users search),
and a command palette / search bypasses both.**

### The reference implementation
**Linear.** Observed in the in-product screenshot on
`linear.app/docs/notifications`: a single settings sidebar, ~150px wide, with two group headings —
`Workspace` (with a building icon) and `My Account` (with a person icon) — and flat lists of ~17
and ~4 items under them. No accordion. No nesting past one level. The whole settings surface is
visible in one screen at desktop height.

Measured from Linear's own 2× screenshot assets (`webassets.linear.app/.../…-2084x1633.png`):

| Property | Observed |
|---|---|
| Settings content column | ≈640 CSS px, left-aligned, not centred in the viewport |
| Row pitch (two-line row) | ≈60 px, constant — a one-line row occupies the same 60 px |
| Row structure | title + description stacked left, control right-aligned; **no fixed label column** |
| Divider | 1px, inset to the text's left edge (≈16px from card edge), not full-bleed |
| Group container | rounded card, ~8px radius, 1px border, rows separated by dividers |
| Gap between group cards | ≈34–40 px, with the section label (`General`, `Interface and theme`) sitting in that gap |
| Description : title size ratio | ≈0.9, description muted (~55% opacity) |

The "no fixed label column" detail matters. GitHub, Stripe's dashboard and most Bootstrap-era
admin UIs use a two-column form grid: labels in a 200px left column, controls in the right. Linear
uses a full-width row with the control right-aligned against the card edge. The consequence is
that a long description does not squeeze the control, and the eye scans a single left edge for
titles and a single right edge for values. On a 640px column with 60px rows, ten settings fit in
600px — one screen.

### The decisions

**How many scopes?** Count the objects that can independently own configuration. Typical SaaS:
`personal` (theme, my notifications), `workspace/org` (members, billing, SSO, retention),
`project/repo` (env vars, integrations, per-project overrides). Vercel runs exactly this three-tier
model: team-level Settings → Environment Variables, and project-level Settings → Environment
Variables, with team values inherited by all projects. VS Code runs a four-tier one: Default →
User → Remote → Workspace → Workspace Folder, plus a Policy layer that overrides everything.

**How deep to nest?** One level of grouping in the nav, then a flat page. If a settings page needs
its own sub-navigation you have two pages. The exception is a *drill-down whose parent row shows
the child's state* (Linear's notification channels), which is not nesting — it is progressive
disclosure with the summary preserved.

**When does a section become a page?** When it has a distinct permission. Vercel's `Security &
Privacy` is a separate team settings page because the Security role can reach it without reaching
billing. Permission boundary → page boundary is a better rule than count-of-settings.

**Where does the settings entry point live?** Avatar menu for personal, org switcher / sidebar for
workspace, and — critically — an in-context entry point from the object being configured. GitHub
puts repo settings on the repo's own tab bar (`Code · Issues · Pull requests · … · Settings`), not
in a global settings tree. A setting reached from the object it configures never has an ambiguous
scope.

### The states
- **Empty**: a settings section with nothing in it yet (no integrations, no API keys, no members).
  Never render an empty table with headers. Render the primary create action plus one sentence of
  what the thing does.
- **Slow**: settings pages fetch several independent resources (plan, members, usage). Load the nav
  instantly from a static manifest; skeleton only the row values, never the row labels. A settings
  page whose nav shimmers is worse than one whose values shimmer, because the nav is what the user
  is aiming at.
- **Partially complete**: a workspace mid-SSO-setup, a project with env vars in Preview but not
  Production. Show the incomplete scope explicitly in the row's subtitle rather than as a separate
  banner.
- **Resumed later**: deep links must survive. Every settings page needs a stable URL
  (`/settings/account/notifications`), and Linear's docs link straight to
  `linear.app/settings/account/notifications`. If your settings live in a modal with no URL,
  support cannot link a user to a fix.
- **Permission wall**: see §14.

### The mobile version
Settings is the one surface where the iOS Settings-app pattern genuinely wins: a full-screen list
of destination rows, each with a chevron and a right-aligned current-value string, pushing to a
full-screen detail. Do not port the desktop two-pane sidebar to a 390px viewport — the sidebar
becomes a drawer nobody opens. Push navigation gives you a free back button, a free title, and the
value-preview in the parent row.

### Accessibility
- The settings nav is `<nav>` with a label (`aria-label="Settings"`), containing `<ul>`; group
  headings are real headings referenced by `aria-labelledby` on the sub-list, not styled `<div>`s.
- The current page gets `aria-current="page"`, not just a background colour.
- Each settings group card is a `<section>` with its visible section label as the accessible name,
  so a screen-reader user can jump between `General` and `Interface and theme` with the rotor.
- Skip link from the nav to the settings content region.

### Copy
Group headings name the scope in the user's words, not the schema's:
- ✅ `My Account` / `Workspace` (Linear)
- ✅ `User` / `Workspace` (VS Code settings editor tabs)
- ❌ `Tenant Settings` / `Principal Settings`
- ❌ `Advanced` — a bin, not a category. If you have an `Advanced` section you have not decided
  what those settings are for.

### How it goes wrong
The generated version produces one page called **Settings** with tabs `General | Profile |
Notifications | Security | Billing | Advanced`, every tab a `<Card>` with a `<CardHeader>` and a
vertical stack of label-over-input fields, one `Save Changes` button bottom-right of each card, and
no indication anywhere of whether a given setting affects you or everyone. It has `Advanced`. It
has a `Danger Zone` card with a red border at the bottom of `General`. It has no search. It has no
URL per tab. It is 60% whitespace and every row is 84px tall.

---

## 2. Autosave vs explicit save

### The job
The user wants the change to have happened. The business needs to not corrupt state on a
half-typed value, and needs an audit trail of who changed what.

### The reference implementations
**Linear: autosave, no save button anywhere on Preferences.** Twelve settings, four sections, zero
Save buttons in the screenshot. Every control is a switch or a select — both of which have discrete
committed values, so there is no "half-typed" state to guard against.

**Google Workspace Admin: explicit Save, with a scope-aware button label.** The S/MIME flow ends
"7. Click **Save**." And when the setting is on a child organizational unit, the button is not
labelled Save at all — it is labelled **Override**, and reverting is a separate **Inherit** button.
The save affordance encodes what the save *means*.

**Vercel: explicit Save per card, autosave nowhere.** Editing a sensitive environment variable is
"Provide a new value… Select the environment(s)… click the **Save** button" — a multi-field form
where a partial commit would be wrong.

### The decision rule

| Signal | Save model |
|---|---|
| Single control, discrete value (switch, radio, select) | **Autosave on change.** No button. |
| Free text that must be valid (domain, webhook URL, regex) | **Explicit Save**, validate on blur + on submit |
| Two or more fields that are only meaningful together (key + value + environment) | **Explicit Save** on the group |
| The change costs money, revokes access, or is broadcast to others | **Explicit Save + confirm** |
| The change is inherited by children (org → project) | **Explicit Save, labelled with the effect** ("Override", "Apply to 14 projects") |
| Text field whose value is a preference with no invalid state (display name) | Autosave on blur + debounce, with visible state |

### Showing state, for each model

**Autosave.** The failure mode is silence: the user flips a switch, nothing visible happens, and
they flip it back to check. Three things fix it, in order of value:
1. The control's own animation *is* the confirmation for an instant, local, obviously-effective
   setting (theme, font size — the app changes under you).
2. For a setting whose effect is invisible (`Auto-assign to self`), a transient inline state on the
   row itself: `Saving…` → `Saved` in the row's right gutter, ~1.2s, then fade. Not a corner toast —
   a toast makes the user look away from the thing they just touched.
3. On failure, revert the control's visual state *and* show the error on the row. A switch that
   stays on while the server rejected it is a lie the user will discover a week later.

**Explicit save.** The failure mode is the invisible dirty state. Two patterns work:
- **Per-card save button, disabled until dirty** (Vercel, GitHub). Cheap, scoped, and the disabled
  state tells you nothing has changed.
- **Sticky action bar that appears only when dirty**, showing `3 unsaved changes` + `Discard` +
  `Save`. Better for long pages, because it follows the user. Pair it with `beforeunload` and with
  a router guard — the most common real bug in settings is losing changes to a nav click, not to a
  tab close.

**Never mix models on one page.** A page with three autosaving switches and one Save button trains
the user that nothing saves until they press Save, and they will lose the switches' meaning.

### States
- **Slow save**: keep the control interactive and optimistic; queue. Do not disable a switch for
  400ms — it reads as broken.
- **Conflict**: someone else changed the org setting while your form was open. Explicit-save pages
  must handle 409: show what changed and let the user re-apply, don't silently clobber.
- **Offline**: autosave must retry, and must not show `Saved`. Show `Not saved — reconnecting`.

### Mobile
Sticky save bars fight the keyboard and the home indicator. On mobile, prefer autosave for
preferences and full-screen forms with a nav-bar `Save` for anything else — the nav bar is above
the keyboard and always reachable.

### Accessibility
- Autosave confirmations go in an `aria-live="polite"` region; the region must exist in the DOM
  before the message so it is announced.
- A save error is `role="alert"` and moves focus to the offending field.
- `aria-busy="true"` on the row while in flight.
- Disabled save buttons are invisible to some screen-reader users scanning for the button; prefer
  an enabled button that reports "No changes to save" over a permanently disabled one.

### Copy
- ✅ `Saved` (past tense, on the row) — beats `Your changes have been saved successfully!`
- ✅ `Couldn't save — check your connection and try again`
- ✅ `You have unsaved changes` on the sticky bar; the button says `Save changes` not `Submit`
- ❌ `Update Profile` on a page that also holds notification settings — the button label must cover
  everything in its scope, which is a signal your scope is wrong.

### How it goes wrong
Every settings card gets a `Save Changes` button, always enabled, that fires a toast reading
"Settings updated successfully" whether or not anything changed and whether or not the request
succeeded. The toggles autosave too, so there are two save models on one page. Navigating away
loses everything with no warning.

---

## 3. Search within settings

### The job
Above roughly 30 settings, IA stops being retrieval and becomes a memory game. The user knows the
words for what they want ("dark", "2FA", "webhook") and does not know your section names.

### The reference implementation
**VS Code's Settings editor.** A single search field at the top of the settings pane, plus a
typed filter grammar that turns search into a query language:

| Filter | Effect (quoted from the docs) |
|---|---|
| `@modified` | "A setting shows up under this filter if its value differs from the default value, or if its value is explicitly set in the respective settings JSON file." |
| `@ext:ms-python.python` | "settings specific to an extension" |
| `@feature:explorer` | "settings specific to a Features subgroup" |
| `@lang:typescript` | language-scoped settings |
| `@tag:accessibility` | "settings related to accessibility" |
| `@id:workbench.activityBar.visible` | exact setting by ID |
| `@haspolicy` | "settings that are controlled by your organization" |

`@modified` is the highest-leverage of these and almost nobody ships it. It answers the single most
common settings question — *what did I change?* — which is also the question behind "why is this
app behaving oddly on my machine and not my colleague's". `@haspolicy` answers the second — *what
can't I change, and who decided?*

**Linear's answer is different and also valid**: no search box in settings, because the global
command menu (⌘K) already reaches settings destinations from anywhere in the app. If you have a
command palette, settings search is a namespace inside it, not a second search box.

### The decisions
- **Threshold**: ship search at ~30 settings. Below that it is furniture.
- **What to index**: the setting title, the description, the current value, synonyms, and the
  section path. Indexing only titles makes search useless — "dark" must find `Interface theme`.
- **Result format**: render the *actual control*, inline, operable from the results list. A search
  result that is a link to a page where you then hunt for the row has moved the problem, not solved
  it. VS Code renders the real editable setting row in the filtered list.
- **Deep-link + highlight**: if a result does navigate, scroll the row into view and flash it. Chrome
  and macOS System Settings both do this; the flash is what makes a 40-row page usable from a link.
- **Zero results**: offer the nearest matches and a link to docs/support. `No settings found` alone
  is a dead end on the exact surface where a dead end generates a ticket.

### Accessibility
`role="searchbox"` (or a plain `<input type="search">` with a label), results count announced
politely (`14 settings match "notification"`), and the result list must be reachable with arrow
keys from the field without losing the ability to keep typing.

### Copy
- ✅ `Search settings` (placeholder), `Showing 6 of 84 settings`
- ✅ `Changed from default` as a filter chip (the plain-English `@modified`)
- ❌ `Search…`

### How it goes wrong
A search box that filters only on visible section titles, so typing `dark` returns nothing because
the setting is called `Interface theme`. Or a search box that exists but resets your scroll position
and section expansion state when you clear it.

---

## 4. Defaults as a design decision

### The job
Most users will never open settings. The default *is* the product for them. The business wants the
default that maximises activation, which is often not the one that respects the user.

### What the evidence says
GOV.UK's radios guidance, which governs forms used by tens of millions of people:

> "Do not pre-select radio options as this makes it more likely that users will: not realise they've
> missed a question; submit the wrong answer."

and

> "Users cannot go back to having no option selected once they have selected one." — hence "You
> should include 'None of the above' or 'I do not know' if they are valid options."

Both are settings rules, not just form rules. The first says: a pre-selected default in a
*question* is a lie about the user's intent. The second says: any radio group you ship must contain
an option representing "off", or the user is trapped.

### The decisions
- **Every setting you add is a default you chose.** Write the default and its justification next to
  the setting in your own spec. If you cannot justify it, you have not designed the feature yet.
- **Prefer the default that removes the setting.** Linear does not let you subscribe to *only*
  status changes; it groups notification types so the whole axis disappears. The setting you did not
  ship has no migration, no docs page, no support tickets, no a11y bugs, no state in the DB.
- **Two defaults, not one, when the population is bimodal.** Personal vs org defaults: the org sets
  the default, the user overrides. Never a single global default that is wrong for half the users.
- **Distinguish "default" from "unset".** A setting whose stored value is `null` and falls through
  to a parent behaves differently from one explicitly set to the same value as the parent — because
  changing the parent moves the first and not the second. This must be visible in the UI (see §7).
- **Never make a default a dark pattern.** Pre-checked marketing consent is illegal in the EU and
  destroys trust everywhere else. The correct default for anything that sends the user email they
  did not ask for is off.

### Copy
Say the default in the description so the user can decide whether to care:
- ✅ `First day of the week — Used for date pickers` (Linear; the *why*, not the what)
- ✅ `Default: Off. Turning this on shares your view history with your workspace.`
- ❌ `Enable feature (recommended)` — "recommended" by whom, for what?

### How it goes wrong
Fifteen toggles, all defaulted on because that made the demo look full, no `Reset to defaults`
anywhere, and no record of which values the user actually chose versus which ones are just sitting
at the factory setting.

---

## 5. Toggle vs radio vs select vs checkbox

### The rule set, sourced

**NN/g** (Toggle-Switch Guidelines): toggles are for two mutually exclusive states, and "Toggle
switches should take immediate effect and should not require the user to click Save or Submit to
apply the new state." Their comparison table puts radio buttons, checkboxes and single checkboxes
all at "effect after Submit", and toggles alone at "Immediately."

**Apple HIG** (Toggles): "Use a toggle to help people choose between two opposing values that
affect the state of content or a view. A toggle always lets people manage the state of something,
so if you need to support other types of actions — such as choosing from a list of items — use a
different component, like a pop-up button." On iOS: "Use the switch toggle style only in a list
row. You don't need to supply a label in this situation because the content in the row provides the
context for the state the switch controls." And: "Avoid relying solely on different colors to
communicate state, because not everyone can perceive the differences."

**Material 3** carries that last point into the component itself: the M3 switch renders a
checkmark glyph inside the handle when selected, so on/off is legible without colour. That is the
cheapest fix available for the most common settings-a11y failure.

**GOV.UK** ships **no toggle switch component at all**. Its answer to a binary setting is a radio
pair with real labels, inside a `<fieldset>` with a `<legend>`, on a page with an explicit submit.
That is the right choice when the setting is a *question about the user's intent* being recorded,
rather than a *state of the interface* being manipulated.

### The decision procedure

Ask, in order:

1. **Does it apply the instant it changes, with no validation and no cost?**
   No → not a toggle. Go to 3.
2. **Is it exactly two states, and is "on" a state of the interface rather than an answer to a
   question?** Yes → **switch**, immediate-apply, autosaved, no Save button.
3. **Is it one choice from 2–5 named options where the user should see all of them?** →
   **radio group** in a fieldset. Do not pre-select. Include a "none" option if none is valid.
4. **Is it one choice from 6+ options, or a well-known ordered set (timezone, language, country)?** →
   **select**. A select hides the options, which is fine when the user already knows the value they
   want and bad when they are deciding.
5. **Is it many independent binary choices in one form, committed together?** → **checkboxes** +
   Save.
6. **Is it a segmented set of 2–4 mutually exclusive display modes the user will flip between
   often?** → **segmented control**, immediate-apply. (Linear uses a select for `Interface theme`,
   which is right at four+ options including custom themes.)

### Accessibility, specifically
From the W3C ARIA Authoring Practices switch pattern:
- `role="switch"` with `aria-checked="true" | "false"`. **`aria-checked="mixed"` is not permitted on
  a switch** — that is what distinguishes it from a checkbox, which may support a third state.
- Space toggles; Enter optionally toggles.
- The accessible name comes from content, `aria-labelledby`, or `aria-label`, and — the rule people
  break constantly — **"it is critical the label on a switch does not change when its state
  changes."** Label the *thing*, not the action: `Two-factor authentication`, never a label that
  flips between `Enable` and `Disable`.
- Prefer a native `<input type="checkbox" role="switch">` so you inherit focus, form and keyboard
  behaviour for free.
- Minimum 44×44 px touch target for the switch's hit area even when the visual track is 28×16.
  Make the whole row the target on mobile.
- State must not be colour-only: use the M3 handle-glyph approach, a position change large enough
  to read at a glance, or a text value.

### Copy
- ✅ `Display full names — Show full names of users instead of shorter usernames` (Linear: title
  names the setting, description says what "on" does)
- ✅ `Convert text emoticons into emojis — Strings like :) will be converted to 🙂` (the description
  is a worked example, which is worth three sentences of explanation)
- ❌ `Enable/Disable full names`
- ❌ `Full names?` with a Yes/No switch

### How it goes wrong
Switches used for everything, including a three-value setting rendered as two switches that can
both be off. Labels that read `Enable dark mode` next to a switch, so the accessible name becomes
"Enable dark mode, on" — is dark mode enabled, or is *enabling* enabled? Switches inside a form with
a Save button, so the visual state and the persisted state disagree for as long as the user leaves
the page open.

---

## 6. Notification preference matrices

This is the hardest settings UI there is, and the one where the difference between a designed
product and a generated one is most obvious.

### The job
The user wants less noise from one specific source, right now. They do not want to configure a
policy. The business wants to keep engagement channels open and needs a legally clean unsubscribe
path. The naive intersection — every event type × every channel — is `N × M` checkboxes, and at
N=12, M=4 that is a 48-cell grid that nobody, including the person who built it, can audit.

### The reference implementation
**Linear.** Two levels, and the top level does all the work.

**Level 1 — `Notification methods`.** Four rows in one card. Each row: a 31×31px rounded icon tile,
a title (`Desktop`, `Mobile`, `Email`, `Slack`), a second line that is a **state sentence** preceded
by a status dot, and a chevron. The state sentences observed:
- `● Enabled for assignments, status changes, 9 others` (green dot)
- `● Enabled for all notifications` (green dot)
- `● Disabled` (grey dot)

Above the card, a section header and one line of scope-setting copy: "Choose how to be notified for
workspace activity. **Notifications will always go to your Linear inbox.**" That second sentence is
doing enormous work: it tells the user that nothing they do here can lose them a notification, which
is the fear that makes people leave everything on.

**Level 2 — the channel detail.** Drilling into Desktop gives:
- A card with the master switch — `Enable desktop notifications` / `Linear Desktop push
  notifications` — and, in the same card, a second row `Test notifications` with a
  `Send test notification` action.
- Then a section `Notifications` with the sub-header **"Applies across all your desktop devices with
  notifications enabled."**
- Then the per-type switches: `Assignments` / *Assignments, unassignments, and membership changes*;
  `Status changes` / *Changes to the status, priority, and blocking relationships of issues*;
  `Comments and replies` / *Comments, replies, and thread resolutions*; `Mentions` / *Mentions in
  comments or content*.

Four things here are worth stealing wholesale:

1. **The parent row is the summary.** You audit four rows instead of opening four pages.
2. **Types are grouped, and the grouping is disclosed.** "the status-changes category includes issue
   completions and cancelations, urgent-priority changes, and changes to blocking relationships. You
   cannot select *only* status changes." Fewer, coarser, honestly-labelled buckets beat fine-grained
   controls whose boundaries nobody understands.
3. **`Send test notification` sits inside the settings page.** The number one notification support
   ticket is "I turned it on and nothing happened" — which is nearly always an OS-level permission,
   not your setting. A test button converts that ticket into a self-diagnosis. Linear's FAQ even
   handles the follow-on: "Please check that you've enabled notifications for Linear in the macOS
   settings as well as marked to show the red badge icon."
4. **The scope of each group is stated where it applies.** "Applies across all your desktop devices"
   pre-empts "does this only affect this laptop?"

### The other shape: default + exceptions
**Slack** solves the same problem with a global default plus an explicit exception list rather than
a matrix. `Notify me about:` → **Everything** / **Mentions and direct messages**, then the ability
to "set exceptions to be notified about everything in certain channels or DMs". Per-channel
overrides are stored as a visible list of exceptions, not as a per-channel column.

Slack also separates *what* from *when*: a `Notification schedule`, and mobile timing options
phrased as behaviour rather than as numbers — **"Immediately, even if I'm active"** vs **"As soon as
I'm inactive"**, where the default is documented as "one minute after locking your desktop screen or
10 minutes after Slack stops detecting cursor activity". Naming the *situation* instead of exposing
a delay slider removes a setting.

**GitHub** keeps a genuine small matrix, but reduces N by subscribing at the object level instead of
the event level: you choose a delivery target (Email, On GitHub / mobile) crossed with a small set
of subscription reasons (Participating and @mentions, Watching, plus security alerts), and the
fine-grained control moves to the repo itself — a per-repository Custom watch that lets you pick
Issues / Pull requests / Releases / Discussions / Security alerts. `N × M` becomes `small × small`
plus per-object opt-in. Note the deliberate constraint in GitHub's docs: to use the notifications
inbox at all "you must enable notifications for both **Email** and **On GitHub**" — a dependency
between two settings, stated in the UI rather than silently enforced.

### The decisions

| Fork | Choose | Because |
|---|---|---|
| Grid vs per-channel drill-down | Drill-down, **if** the parent row shows the state | 4 rows audit faster than 48 cells; the grid only wins when the user genuinely compares across channels, which is rare |
| Fine-grained vs grouped event types | Grouped, and say what's in the group | Users cannot predict which of your 12 event types fires for the thing that annoyed them |
| Global setting vs per-object override | Both, with overrides shown as an explicit list | The user's real request is "mute *this*", not "reconfigure my policy" |
| Frequency: slider vs named situations | Named situations ("As soon as I'm inactive") | The user does not know what 30 seconds feels like |
| Digest vs immediate | Offer both, default to digest for email, immediate for push | Linear: "Email digests… are only sent if you haven't already read the Linear inbox notification" — the delay is what makes the digest useful |

### States
- **Failure**: the toggle is on but the OS denied permission. Detect it and say so on the row:
  `Blocked by your browser — allow notifications for this site`, with a link. Never leave a green
  switch on a channel that cannot deliver.
- **Partially complete**: Slack connected but the workspace-level app not installed. The row's state
  sentence should read `Not connected` and offer the connect action inline.
- **Resumed later**: someone changes an org-level notification policy that overrides a personal
  choice. The personal row must show the override, not silently ignore the user's setting.
- **Unsubscribe-from-email arrival**: a user who clicked "unsubscribe" in an email must land on a
  page that (a) has already unsubscribed them from that specific thing, (b) says which thing, (c)
  offers "unsubscribe from all" as a second click. Do not land them on a login wall or on the full
  matrix.

### Mobile
Per-channel drill-down is *already* the mobile pattern, which is why it survives the port. The
mobile-specific addition is a link out to the OS notification settings, because half of all
"notifications don't work" causes live there and you cannot fix them from inside your app.

### Accessibility
- Each channel's per-type switch list is a `<fieldset>` whose `<legend>` is the group name, so the
  screen reader announces "Notifications, Assignments switch, on" rather than 12 orphaned switches.
- The parent row's state sentence must be part of the row's accessible name (or in the same link),
  so drilling in is an informed choice.
- The status dot needs a text equivalent — which the state sentence already provides, as long as
  the dot is `aria-hidden`.

### Copy
- ✅ `Enabled for assignments, status changes, 9 others` — the state as a sentence, with a count for
  the tail
- ✅ `Notifications will always go to your Linear inbox.` — removes the fear of missing something
- ✅ `Applies across all your desktop devices with notifications enabled.`
- ✅ `Send test notification`
- ❌ `Email notifications` with a bare checkbox and no indication of what would be emailed
- ❌ `Manage your notification preferences` as a page title (it is the only thing this page could be)

### How it goes wrong
A `<table>` with channel columns (`In-app | Email | SMS | Push`) and one row per event type, all
checkboxes, all defaulting to checked, no summary, no test, no per-object mute, no digest, and a
`Save Preferences` button at the bottom that fires a success toast regardless. The user's actual
problem — "this one project is spamming me" — is unsolvable from this screen.

---

## 7. Per-user vs per-org settings, inheritance and override display

### The job
An admin needs a policy to hold across an org. A user needs their own preference. The system needs
to represent three distinct states — *inherited*, *explicitly set to the same value as the parent*,
and *explicitly overridden* — and the UI usually collapses them to two, which is where the bugs
come from.

### The reference implementations

**Google Workspace Admin.** For a setting on a child organizational unit, the console renders a
label *underneath the setting's own label* reading either `Inherited from <organization or domain
name>` or `Overridden`. The save button on a child OU is labelled **Override**, not Save. Reverting
is a distinct **Inherit** button, which restores the parent value and re-establishes the link — not
the same as manually typing the parent's value back in. Ad Manager, using the same house
conventions, marks an overridden value with an orange icon "that the value has been overridden and
is no longer aligned with the parent or the network default."

That is the complete vocabulary an inheritance UI needs, in three UI elements: a **provenance
label**, an **override action**, and a **revert-to-inherited action**.

**VS Code.** Precedence is Default → User → Remote → Workspace → Workspace Folder, with
language-specific variants at each level, and **Policy settings override everything**. The UI
exposes this three ways: `User` and `Workspace` tabs in the settings editor; a coloured bar on the
left of any row whose value differs from the default ("similar to modified lines in the editor");
and the `@haspolicy` filter to list "settings that are controlled by your organization." A
policy-locked setting is shown, not hidden — the user learns that it exists and that they cannot
change it, which is the correct outcome.

**Vercel.** Team-level environment variables are inherited by all projects; project-level ones are
scoped to that project. Above that, an owner can set a team-wide *policy* — Settings → Security &
Privacy → **Environment Variable Policies** → toggle **Enforce Sensitive Environment Variables** to
Enabled — which constrains what every future project-level setting is allowed to be. The org does
not set the value; it sets the *allowed shape* of the value. That is a distinct and underused
inheritance mode.

### The decisions
- **Show provenance on every inheritable row.** A muted line under the control: `Inherited from
  Acme Corp` or `Overridden for this project`. Not a tooltip. Not a legend at the top of the page.
- **Give override and revert separate affordances.** `Override` creates a local value; `Reset to
  inherited` (or Google's `Inherit`) deletes the local value and re-links. VS Code's per-setting
  gear menu offers "reset a setting to its default value" for the same reason.
- **Distinguish locked from merely inherited.** If org policy forbids a change, render the control
  disabled, with the value, and a line saying who locked it: `Locked by your organization`. Hiding
  it produces a support ticket; disabling it without explanation produces a worse one.
- **Show the blast radius before an org-level save.** `This will change the default for 14 projects.
  3 projects have overrides and will not change.` The count of exceptions is the number people
  actually want.
- **Decide what a parent change does to explicit children.** Nothing, if they are truly overridden.
  Say so.

### States
- **Partially propagated**: some children updated, some pending. Show per-child status rather than
  a single spinner.
- **Permission wall**: a member viewing an org-locked setting sees the value and the lock, not a
  404 (see §14).

### Accessibility
The provenance line must be associated with the control via `aria-describedby`, so it is announced
with the control rather than being a floating string. A locked control uses `aria-disabled="true"`
plus the describedby explanation — prefer `aria-disabled` over the `disabled` attribute so the
control remains focusable and the explanation is reachable.

### Copy
- ✅ `Inherited from Acme Corp` / `Overridden` / `Reset to inherited`
- ✅ `Locked by your organization's policy. Contact an admin to change this.`
- ✅ `Applies to all projects unless a project overrides it.`
- ❌ `Default` used to mean both "factory default" and "inherited from parent" — two different things
  that behave differently when the parent changes.

### How it goes wrong
Child settings render identically to parent settings with no provenance at all. Changing the parent
appears to do nothing, because the child was written with the same value at creation time and is
therefore "overridden" without the user ever choosing to override. There is no way to un-override.

---

## 8. Dangerous settings — and why "Danger Zone" as a red box is often lazy

### The job
The user genuinely does need to delete the thing. The business needs to not lose a customer's data
to a misclick, and — more importantly — needs to not have *deleted the wrong thing* be
unrecoverable.

### The reference implementation, and its limits
**GitHub's repository deletion** is the most-copied destructive pattern in software. The real
sequence, from the docs:

1. Repo → **Settings** (its own tab, not a global settings tree)
2. Scroll to the **"Danger Zone"** section, click **Delete this repository**
3. Click **I want to delete this repository**
4. "Read the warnings and click **I have read and understand these effects**"
5. "To verify that you're deleting the correct repository, in the text box, type the name of the
   repository you want to delete."
6. Click **Delete this repository**

Five deliberate acts, with the warnings gated behind step 3 so they are read at the moment of
maximum attention rather than skimmed on arrival.

**And it still is not enough.** A widely-discussed HN thread ("We lost 54k GitHub stars") is
literally a post-mortem of someone completing all five steps and deleting the wrong repo; the top
comment reads: "the guy with 10+ years experience of using github went to the 'danger zone', pressed
the red button, saw the very, very, very explicit warning about the consequences of pressing it and
confirmed the action by explicitly typing the exact name of the repository." GitHub's own response
to this class of incident was not a sixth confirmation step — it was **Restore deleted repository**,
a separate documented recovery path. That is the lesson: *ceremony is a tax on the 99% of correct
deletions and does not stop the 1% of wrong ones. Recoverability does.*

### Why the red box is lazy
Three specific failures:
1. **It is a location, not a warning.** A permanent red-bordered card at the bottom of every
   settings page is chrome. Users stop seeing it by the third visit, which is exactly the
   habituation the S3-outage HN thread describes: "If you have the same kind of confirmation
   whenever you delete a thing, whether it's an important thing or not, you're designing a system
   which encourages bad auto-pilot habits."
2. **It groups unlike actions.** `Transfer ownership`, `Archive`, `Change visibility` and `Delete`
   have wildly different reversibility and end up in the same red box with the same visual weight.
3. **It substitutes colour for information.** Red says "be careful". It does not say *what will
   break*, *who else is affected*, or *whether you can undo it* — which are the three things the
   user needs.

### The better construction

**Grade by reversibility, not by scariness:**

| Reversibility | Pattern | Example |
|---|---|---|
| Fully reversible, no data loss | Plain confirm dialog stating the consequence and the undo path, one button, no red | Stripe portal cancel: "Your plan will be canceled, but is still available until the end of your billing period on June 16, 2023. If you change your mind, you can renew your subscription." + a single **Cancel plan** button |
| Reversible within a window | Do it immediately + a persistent undo affordance and a stated window | `Deleted. Restorable for 30 days.` |
| Irreversible, low blast radius | Confirm dialog naming the object, destructive button, no typing | Revoking one API key |
| Irreversible, high blast radius | Staged gauntlet: reveal → warnings → type-to-confirm → act, **plus** a recovery path where possible | GitHub repo deletion + Restore deleted repository |
| Irreversible and affects other people | All of the above + re-authentication + an emailed notice to other admins | Deleting an org, rotating org-wide credentials |

**Make the consequence specific and countable.** Not "This action cannot be undone" — say
`This will permanently delete 1,284 issues, 96 pull requests and 3 deploy keys. 14 collaborators
will lose access.` The count is what makes people stop.

**Make the confirmation text the object's name, not the word DELETE.** Typing `DELETE` is
muscle memory; typing `acme/payments-api` requires reading which repo you are on. That is the entire
point of the mechanism and half of implementations get it backwards.

**Put a cooling-off period where the action is destructive and non-urgent.** Account deletion
scheduled for 14 days out, cancellable by logging in, is strictly better than instant deletion plus
five confirmations — and it also removes the retention dark-pattern accusation, because the user's
intent is honoured either way.

### States
- **Failure mid-delete**: partial deletion is the worst state in the product. Show what was and was
  not deleted and offer a retry that is idempotent.
- **Permission wall**: a member who cannot delete should see the section, disabled, with `Only
  owners can delete this project` — hiding it makes them ask an admin to look for a button that
  isn't there either.
- **Blocked by a dependency**: `This project can't be deleted while it has an active domain.` with a
  link to the domain. Naming the blocker is the whole job.

### Mobile
Type-to-confirm on a 390px viewport is hostile: the keyboard covers the confirm button, and the name
being typed is often off-screen. Fix by pinning the object name above the field and the button
above the keyboard, or by not offering irreversible destructive actions on mobile at all and saying
so: `Deleting a workspace is only available on the web.` That is an acceptable answer.

### Accessibility
- Destructive confirm dialogs: `role="alertdialog"`, `aria-labelledby` on the title, `aria-describedby`
  on the consequence text, focus moved to the dialog (to the *cancel* button, not the destructive
  one), focus trapped, Esc cancels, focus restored on close.
- The destructive button's accessible name must contain the object: `Delete acme/payments-api`, not
  `Delete`.
- Never rely on red alone; the button text carries the meaning.

### Copy
- ✅ `Delete this repository` (says the object class)
- ✅ `To confirm, type acme/payments-api below`
- ✅ `This will permanently delete 1,284 issues and remove access for 14 collaborators.`
- ✅ `Deleted. You can restore this project for the next 30 days.`
- ❌ `Danger Zone` as the only warning
- ❌ `Are you sure?` — the user was sure, that was never the question
- ❌ `This action cannot be undone.` on an action that can, in fact, be undone

### How it goes wrong
A red-bordered card headed **Danger Zone** containing three buttons of equal weight, each opening a
generic `Are you sure? This action cannot be undone.` dialog with `Cancel` and a red `Confirm`. No
counts. No named object. No undo. Focus stays on the page behind the dialog. Enter activates
`Confirm`.

---

## 9. Settings that require a restart, re-auth, or propagation delay

### The job
The user changed a setting and expects the world to change. It hasn't yet, and they will conclude
your product is broken unless you tell them why.

### The reference implementations

**Google Workspace Admin** states the delay in the flow, at the step where it applies: after the
S/MIME save, "Changes can take up to 24 hours but typically happen more quickly." — and, crucially,
what happens *during* the window: "Messages sent during this time aren't encrypted." Then the next
documented step is literally titled **"Step 2: Have your users reload Gmail"**. The restart
requirement is a step in the procedure, not a footnote.

**Vercel** ties propagation to an existing user action instead of asking for a restart: "Any change
you make to environment variables are not applied to previous deployments, they only apply to new
deployments." The setting takes effect on the next deploy, which the user was going to do anyway.
Where possible, bind propagation to a workflow the user already performs.

**Stripe** requires re-authentication *before* the sensitive change rather than after: creating a
secret API key is "In the dialog, enter the verification code that we send you by email or text
message" — step 2, before you even name the key. Re-auth at the start means the user does not lose
their input to an auth challenge.

### The decisions

| Situation | Pattern |
|---|---|
| Takes effect immediately | Nothing to say. Say nothing. |
| Takes effect on next natural action (deploy, reconnect, next login) | State it in the row description permanently, not as a transient banner: `Applies to new deployments.` |
| Requires a client reload | Inline action on the row: `Reload to apply` as a button, not a "please refresh" toast |
| Requires a server-side propagation window | State the window **and** the behaviour during it: `Can take up to 24 hours. Until then, messages are sent unencrypted.` |
| Requires re-auth | Challenge **before** collecting input, and say why: `Confirm it's you to create a new secret key` |
| Requires other users to act | Say so, and give the admin a way to notify them |

Never ship a bare `Changes may take a few minutes to apply` — "may" and "a few" are both hedges that
communicate nothing. Give a bound and a during-state.

### States
- **In-progress**: the row shows `Applying…` with the old value still visible, not the new one.
- **Failed after appearing to succeed**: this is the state that destroys trust. If a setting can
  fail asynchronously, the row must be able to render `Failed to apply — Retry` on return, and the
  user should get a notification.
- **Partially propagated**: name the scope that has and hasn't updated.

### Accessibility
The delayed-effect message belongs in `aria-describedby` on the control, so it is heard *before*
the change is made, not in a live region afterwards.

### Copy
- ✅ `Applies to new deployments. Existing deployments keep their current values.`
- ✅ `Can take up to 24 hours but usually happens sooner. Messages sent during this time aren't encrypted.`
- ✅ `Reload to apply` (button)
- ❌ `Changes may take some time to take effect.`
- ❌ `Please refresh your browser.`

### How it goes wrong
The toggle flips, a green toast says "Settings saved", and nothing changes for six hours. There is
no indication a delay exists. The user toggles it off and on four times, files a bug, and the bug
is closed as working-as-intended.

---

## 10. API keys and secrets

### The job
The developer needs the secret in their hand exactly once, at the moment they can paste it
somewhere safe, and needs to rotate it later without downtime. The business needs the secret to
never be readable again, and needs an audit trail.

### The reference implementation
**Stripe's API keys page** is the most thought-through version of this I found, and nearly every
detail is a deliberate answer to a real failure.

**Two lists, not one.** `Standard keys` and `Restricted keys` are separate sections, because they
have different risk profiles and different creation flows.

**Show-once, but only where it must be.** "When you create a secret key in live mode, Stripe
displays it one time before you save it. Copy the key before you save it because you can't reveal it
later." But: "In sandbox mode, you can always see all of your API keys, including restricted and
secret keys." Show-once ceremony in a test environment is pure friction with no security benefit —
Stripe correctly scopes the ceremony to live mode. And keys *Stripe generated for you* remain
revealable with `Reveal live key` / `Hide live key`; only keys the user created are burned.

**Re-auth before creation, not after.** Step 2 of creating a secret key is entering an emailed or
texted verification code — before naming the key.

**The note field.** After the key is shown: "In the **Add a note** field, enter the location where
you saved the key, then click **Done**." This is the single best idea on the page. The most common
real-world secrets problem is not theft, it is *nobody knows which of these seven keys is used by
what*. A prompted note, captured at the exact moment the user knows the answer, is worth more than
any amount of warning copy.

**Rotation with an explicit grace window.** `Rotate key` → an **Expiration** dropdown. "If you choose
**Now**, the old key is deleted. If you specify a time, the remaining time until the key expires
displays below the key name." Both keys work for up to 7 days. The docs' own rollout guidance is
worth encoding in the UI: use the grace period, roll out gradually, "check its request logs, and
expire it only after its request volume has been at zero for a few hours or days."

**Per-key observability.** Every key's overflow menu has `View request logs`. A key you cannot
observe is a key you cannot safely retire — this is what makes the "monitor before revoking" advice
actionable rather than aspirational.

**Scoping as a first-class type.** Restricted keys with per-resource permissions are the
*recommended* default: "Create an unrestricted secret API key only when your integration requires
access to all Stripe APIs and resources without restriction… We recommend using RAKs instead."

**Access policies as a separate, reusable object.** Policies (IP ranges, or ASN/country/threat-source
rules) are created once on their own page and attached to keys, with the change applying "immediately
to all API keys it's assigned to." Also: deleting a policy silently *widens* access — "Those keys
allow requests from any source until you apply another policy to them" — which is exactly the kind of
consequence that must be in the delete confirmation.

**Vercel's variant, for values rather than keys.** Environment variables carry a type chosen at
creation: "Config values stay readable to authorized members while Secret values are write-only
after saving." Sensitive vars get a **Sensitive** tag in the table; editing one shows "The current
value is hidden" and lets you replace but not read it; and "To mark an existing environment variable
as sensitive, remove and re-add it" — the transition is one-way by design. Build logs redact any
sensitive value 32 characters or longer as `[REDACTED]`, and each redaction writes an Activity Log
event naming the key, project and deployment but not the value.

### The decisions
- **Show-once or reveal?** Show-once for anything the user generated in a production context. Always
  reveal in test/sandbox. If you show once, you owe the user: a copy button, a note field, and a
  clear rotation path.
- **Where does the copy button go?** On the value, and the value should be selectable. Stripe's flow
  is "Click the key value to copy it" — the value itself is the button.
- **Masked display format.** Show a stable prefix and last four (`sk_live_51Hx…9fQa`), never a fixed
  number of bullets — the prefix is how developers identify which key they are looking at, and
  Stripe's prefixes (`pk_`, `rk_`, `sk_`, and `_test_` / `_live_`) encode type and mode in the value.
- **Never render a secret into a URL, an analytics event, or a server-rendered HTML page you cache.**
- **Rotation UI**: two keys valid simultaneously, an expiry selector including "Now", the remaining
  time shown on the key row, and usage visible per key so the user can prove the old one is idle.
- **Deletion of a key is not the same as expiry.** Expire keeps the record and the logs; delete
  loses the audit trail. Prefer expire.

### States
- **The moment of creation** is the highest-stakes state in this flow. Full-width, unmissable, copy
  button focused, note field present, and the dismiss button labelled with the consequence: `I've
  saved my key` rather than `Done`/`Close`.
- **Lost key**: the page must answer "I lost it" without support. Stripe: "If you lose a key, rotate
  or delete it and create another." Put that sentence on the page, next to the rotate action.
- **Compromised key**: an explicit, one-click `Rotate now` path that does not require reading docs.
- **Limited/degraded key**: Stripe restricts keys unused for 180 days for payouts and offers
  `Restore access` — a state most implementations don't have, and a good reminder that keys have
  lifecycles beyond active/revoked.
- **Permission wall**: a member who cannot see live keys sees the list of key *names*, creation
  dates and last-used, with the values hidden. Names and usage are not secrets, and hiding them
  makes rotation coordination impossible.

### Mobile
Do not offer secret creation on mobile. There is nowhere safe to paste it. Show the list, the last-used
timestamps and the rotate/expire actions; gate creation to desktop and say why.

### Accessibility
- The revealed secret is inside a live region announced once on reveal, and the copy button's success
  state is announced (`Copied to clipboard`).
- A masked value must have an accessible label that does not read out the bullets: label it
  `Secret key, hidden. Ends in 9fQa.`
- Do not put the secret in a `title` attribute or a tooltip — those are unreachable by touch and
  read at unpredictable times.

### Copy
- ✅ `Save this key now. You won't be able to see it again.`
- ✅ `Where did you save this key?` (the note field's label — a question, so people answer it)
- ✅ `Both keys will work for the next 7 days. Expire the old key once its request volume is zero.`
- ✅ `Deleting this policy allows requests from any source for 3 keys until you apply another policy.`
- ❌ `Your API key has been generated successfully.`
- ❌ `Keep this secret safe!`

### How it goes wrong
A modal that displays the key in a `<code>` block with a copy icon and a `Close` button, with
"Make sure to copy your key now. You won't be able to see it again!" in yellow. No name field, no
note field, no scoping, no rotation — just `Revoke`, which is a cliff. Test and live keys are both
show-once, so developers paste live keys into Slack to share them.

---

## 11. Connected accounts and integrations

*(Tighter treatment — this is a variant of the list-of-objects settings page.)*

**The job**: the user wants to know what has access to their data and to cut something off. The
business wants integrations installed and rarely instruments the disconnect path.

**The shape that works**: a list where each row is one connected thing showing **who/what**, **what
it can do** (the granted scopes, in plain language, not OAuth scope strings), **when it was
connected**, **when it was last used**, and a **Disconnect** action. Last-used is the field that
makes the page actionable — it is how a user decides which of eleven forgotten integrations to
revoke.

**Decisions**:
- Scopes must be rendered as capabilities (`Read your repositories`, `Create issues on your behalf`)
  not as identifiers (`repo:read`, `issues:write`).
- Distinguish *your* connection from an *org-wide* one. Revoking an org-installed app from a personal
  settings page must either be blocked with an explanation or clearly labelled as affecting everyone.
- Disconnect is reversible-ish (reconnect is a re-auth away) so it gets a plain confirm naming the
  consequence: `Disconnect Slack? Linear will stop sending notifications to #eng-updates.` — name the
  *effect on the user's workflow*, not the technical action.
- Show broken connections. A token that expired must render `Reconnect required` on the row with the
  date it broke, not silently stop working. Linear's notification-methods pattern applies directly:
  the row's subtitle is the connection's state.

**States**: never-connected (empty state with the value proposition and one connect button),
connected-and-healthy, connected-but-degraded (`Reconnect`), revoked-elsewhere (the user revoked
from the provider's side — detect and show it), pending-admin-approval (`Waiting for an admin to
approve this app`).

**Accessibility**: each row is an article/listitem with a heading; the disconnect button's accessible
name includes the integration name.

**How it goes wrong**: a grid of logo cards with `Connect` buttons, no state, no scopes, no
last-used, and disconnect buried in a `⋯` menu that opens a generic confirm.

---

## 12. Feature flags and beta opt-in

*(Tighter treatment.)*

**The job**: the user wants to try the new thing and, more importantly, to *get out* when it breaks.
The business wants opt-in volume and qualitative feedback.

**The shape that works**: a distinct settings page (not mixed into General) listing each preview
feature with a title, a one-paragraph description of what changes, a switch, a link to give feedback
on that specific feature, and — the part that gets skipped — a statement of what happens to data
created while the feature was on if you turn it off.

**Decisions**:
- Beta opt-in is per-user by default; add a per-org "allow members to enable previews" gate for
  enterprise, because that gate is the thing enterprises ask for.
- A beta feature that changed the user's data needs an off-ramp description: `Turning this off keeps
  the documents you created, but they'll open in the classic editor.`
- Version the flag. A user who enabled a preview six months ago and never returned should be told
  when it graduates or is withdrawn — silent removal of a feature someone opted into is worse than
  never shipping it.
- Do not use a beta page as a dumping ground for features you couldn't finish. Two well-described
  previews beat nine.
- Enterprise-relevant: VS Code's `@haspolicy` filter is the right model for the inverse case — showing
  the user which previews their organization has *disabled* for them, rather than hiding them.

**How it goes wrong**: a "Labs" page with eight switches, each with a four-word description, no
feedback link, no indication which are safe, and no record of which ones a user has on when they
file a bug.

---

## 13. Billing settings

*(Tighter treatment — most of the depth here belongs in a billing/checkout pattern file.)*

**The job**: the user is here to do one of five things — see what they're paying, change the card,
get an invoice, upgrade, or cancel. The business wants the fifth to be hard, which is the tension
that produces most billing dark patterns.

**The reference implementation**: **Stripe's Customer Portal**, and specifically its *flows* — a
flow is "a customizable deep link into the customer portal", and the key design decision is stated
outright: "Navigational components to access the rest of the customer portal are hidden so the
customer can focus on the single action." Flow types are exactly the five jobs:
`payment_method_update`, `subscription_cancel`, `subscription_update`, `subscription_update_confirm`,
`customer_update`.

That is a transferable rule well beyond billing: **when you link a user into settings to perform one
specific task, strip the settings navigation.** The nav is only useful to someone browsing; to
someone dispatched, it is a distraction and an escape hatch from the thing they came to do.

The cancel flow (screenshot: `stripe-portal-cancel.png`) shows the complete anatomy of an honest
cancel: the current plan and price, the exact consequence with a date ("still available until the
end of your billing period on June 16, 2023"), the reversal path named in advance ("If you change
your mind, you can renew your subscription"), a single unmodified primary button, and a persistent
`← Return to Typographic` escape. No retention interstitial, no red, no "are you sure", no discount
offer between the user and the button.

**Decisions**:
- Show the *next* charge — amount and date — above everything else. It is the question.
- Invoices are a table with downloadable PDFs and a status column; make it filterable by year at 12+
  rows.
- Cancel must be reachable in ≤2 clicks from the billing page and must not require contacting support
  (in California and increasingly elsewhere this is also a legal requirement).
- Separate the *billing* permission from the *admin* permission. Vercel ships a dedicated **Billing**
  role with read-only project access precisely so finance can pay without touching production.
- Seat changes need a preview of the proration before the confirm, not after.

**States**: past-due (blocking banner with the exact action, everywhere in the app, not just in
settings), trialing (days remaining and what happens at the end), cancelled-but-active (the plan is
still working until date X — say so on every billing surface), payment-method-expiring (warn 30 days
out).

**How it goes wrong**: an "Upgrade" page with three pricing cards, a "Manage subscription" link that
opens a support email, and no invoice history.

---

## 14. The settings page's own empty and permission-denied states

### Empty
A settings section with no rows is the most-skipped state in the entire family. The rules:
- Never render an empty table with column headers. Headers describing nothing are worse than nothing.
- Give one sentence saying what this thing does *for this user*, one primary action, and one link to
  docs. `No API keys yet. Create a key to authenticate requests from your server.` + `Create key`.
- If the section is empty because of a plan limit rather than because nothing exists, say that
  instead: `Your plan doesn't include SAML SSO.` + `Compare plans`. Those are different empty states
  and conflating them is a conversion bug as well as a UX one.

### Permission-denied
This is a real design fork, and Vercel makes both choices deliberately in different places:
- **Hide it** when the section's existence is itself sensitive or irrelevant. Vercel's Pro Viewer
  role is "restricted from… accessing team settings and configurations" — the nav item is not there.
- **Show it read-only** when the user needs to know the value but not change it. Vercel's Project
  Viewer can "Examine environment variables across all environments" and "Review project settings"
  but "can't actively make changes."

The rule: **hide when knowing the setting exists is itself a leak or pure noise; show read-only when
the user needs the value to do their job; never show it enabled and fail on save.**

When you show it disabled, always include *who can change it* — that turns a dead end into a next
step:
- ✅ `Only team owners can change billing settings. Ask Priya or Marcus to update this.`
- ✅ `Locked by your organization's policy.`
- ❌ a greyed-out control with no explanation
- ❌ a 403 page for a settings URL a teammate just pasted into Slack

If a user lands on a settings URL they cannot access, the page should say what it is, that they
cannot access it, and offer a request-access action — not redirect them to the dashboard, which loses
the context of what they were sent to do.

---

## 15. The mobile version, in general

Almost every settings decision above changes on a 390px viewport, and this is the part that is
routinely skipped:

- **Two-pane → push navigation.** A list of destinations, each row showing its current value on the
  right, pushing to a full screen. The value-in-the-row is what makes the list scannable without
  drilling; this is the same mechanism as Linear's notification state sentences, applied to the whole
  nav.
- **Row height goes up, density goes down.** 44–56px minimum row height with the whole row as the
  touch target — including for switches, whose visual track is far below 44px.
- **Switch on the right, label on the left, description wrapping under the label** — never a
  centre-aligned layout, and never a switch above its label.
- **Selects become full-screen or sheet pickers**, not native dropdowns with 40 options.
- **Type-to-confirm is hostile.** See §8.
- **Secrets should not be creatable on mobile.** See §10.
- **Link out to OS settings** for notifications, camera, location, contacts — you cannot fix those
  from inside the app and pretending otherwise generates the most common support ticket in mobile.
- **Search moves up in importance,** because there is no persistent nav to scan. Above ~20 settings on
  mobile, search is not optional.

---

## Decision procedures

### Which save model?
> Is the control a single discrete value that applies instantly and can't be invalid?
> **Yes** → switch/select, autosave on change, inline `Saved` on the row, revert visual state on error.
> **No** → is it a group of fields that are only meaningful together, or does the change cost money /
> revoke access / propagate to others?
> **Yes** → explicit Save on the group, disabled-until-dirty or a sticky dirty bar, confirm if
> destructive, label the button with the effect if it's an inheritance override.
> **Neither** (free text preference with no invalid state) → autosave on blur with debounce, plus
> visible saving/saved state.

### Which control?
> Two states, immediate, a state of the UI → **switch**.
> One of 2–5 named options, user should see all → **radios in a fieldset**, nothing pre-selected,
> include a "none" option if valid.
> One of 6+ or a known ordered set → **select**.
> Many independent binaries committed together → **checkboxes + Save**.
> 2–4 display modes flipped often → **segmented control**.

### How much confirmation?
> Fully reversible → plain dialog stating the consequence and the undo path. No red, no typing.
> Reversible in a window → do it, then show a persistent undo with the window stated.
> Irreversible, affects only this object → dialog naming the object, destructive button.
> Irreversible, high blast radius → staged gauntlet with type-the-object-name + a recovery path.
> Irreversible and affects other people → all of the above + re-auth + notify other admins.
> **And in every case**: prefer building the recovery path over adding a confirmation step.

### Where does this setting live?
> Does it change what *I* see/receive, and nobody else? → personal scope.
> Does it change what *everyone in the org* sees, or cost money? → org scope.
> Does it configure one object (repo, project, channel)? → that object's own settings, reached from
> the object.
> Can more than one scope set it? → then you owe provenance display, an override action, and a
> reset-to-inherited action (§7).

### Do I need settings search?
> Count the settings across all scopes. ≥30 → yes, and index descriptions and current values, and
> ship a "changed from default" filter. Have a command palette already? → make settings a namespace
> in it rather than adding a second search box.

---

## The generic version

You will recognise the un-designed settings page by these, in roughly this order of frequency:

1. **One page, tabs across the top**: `General | Profile | Notifications | Security | Billing |
   Advanced`. No URL per tab, so nothing can be linked. `Advanced` contains the settings nobody could
   categorise.
2. **No scope anywhere.** Nothing tells you whether a setting affects you or the whole team. There
   are two pages that could plausibly be called "Notifications" and neither says which is which.
3. **Everything is a `<Card>`** with a `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`
   and `CardFooter`, and each footer has a `Save Changes` button. Rows are 84px tall. Ten settings
   need three scrolls.
4. **Mixed save models**: switches autosave, the text field next to them needs Save, and nothing
   indicates which is which.
5. **`Settings updated successfully` toast**, fired optimistically, bottom-right, regardless of
   outcome.
6. **A notification matrix**: `<table>` with `In-app | Email | SMS | Push` columns and 12 event-type
   rows, every box checked by default, no summary, no test button, no per-object mute.
7. **A `Danger Zone`**: red-bordered card, three equal-weight buttons, generic `Are you sure? This
   action cannot be undone.` dialog with `Cancel` and red `Confirm`. No counts, no object name in the
   button, no undo, focus not managed.
8. **No search**, at 60+ settings.
9. **No empty states** — settings sections render empty tables with headers.
10. **No permission states** — controls render enabled for everyone and fail on save with a raw 403.
11. **Secrets shown once in a modal** with a yellow warning and a `Close` button. No name, no note,
    no scope, no rotation — only `Revoke`.
12. **Toggle labels that flip**: `Enable dark mode` / `Disable dark mode`, breaking the ARIA rule
    that a switch's label must not change with its state.
13. **Mobile**: the desktop two-pane layout with the sidebar collapsed into a hamburger, 32px rows,
    and a type-to-confirm dialog whose button is under the keyboard.

---

## Self-check

Run these against your own implementation. Each is verifiable, not aspirational.

**IA**
1. Open your settings. Can you tell, without clicking, which items affect only you and which affect
   everyone? If not, add scope group headings.
2. Does every settings page have its own URL? Paste one into a chat and open it in a private window
   — does it land on that page after login, or on the dashboard?
3. Is there a section called `Advanced` or `Other`? Delete it and recategorise its contents.
4. Count settings. ≥30 without search? Add search that indexes descriptions and values.
5. Can you reach every setting from the object it configures, as well as from the settings tree?

**Save model**
6. Does any single page mix autosaved switches with a Save button? Split it or unify it.
7. Flip a switch with the network throttled to Slow 3G. Does the control stay interactive? Is there a
   visible in-flight state? Does it revert on failure?
8. Make an edit, then click a nav link without saving. Are you warned? (Test the router guard, not
   just `beforeunload`.)
9. Does your success confirmation appear on the row that changed, or in a corner toast that pulls
   the eye away?

**Controls**
10. Every switch: does it apply immediately with no Save? If not, it should be a checkbox.
11. Every switch label: does it stay identical when the state changes? (ARIA APG hard requirement.)
12. Screenshot your switches in greyscale. Can you still tell on from off? If not, add a glyph or a
    text value.
13. Tab through a settings page. Is the focus ring visible on every control including switches,
    selects and the destructive button?
14. Every radio group: is anything pre-selected? Is there an option meaning "none"?

**Notifications**
15. Can a user see their entire notification configuration without opening anything? If not, add
    state sentences to the channel rows.
16. Is there a `Send test notification` per channel?
17. If the OS/browser denied permission, does the row say so, or does it show a green switch that
    does nothing?
18. Click an unsubscribe link in one of your own emails. Are you unsubscribed from that specific
    thing before the page loads, and told which thing?

**Inheritance**
19. On a child scope, does each inheritable row say `Inherited from X` or `Overridden`?
20. Is there a `Reset to inherited` that deletes the local value (not one that types the parent's
    value back in)?
21. Before an org-level save, do you show how many children will change and how many have overrides?
22. Are org-locked settings shown-and-disabled with an explanation, or hidden?

**Destructive**
23. Does your delete confirmation contain a count of what will be destroyed and who loses access?
24. Does type-to-confirm require the object's name, or the word DELETE?
25. Is there a recovery window? If not, can you add one instead of adding another confirm step?
26. Open the confirm dialog and press Enter immediately. Does it delete? (Focus should be on Cancel.)
27. On a 390px viewport, is the confirm button reachable with the keyboard open?

**Delays and secrets**
28. Any setting with a propagation delay — is the bound and the during-state stated on the row?
29. At the moment a secret is revealed: is there a copy button, a name field, and a prompt to record
    where it was stored?
30. Is there a rotation path with a grace window and per-key usage visible, or only `Revoke`?
31. Is show-once ceremony applied in test/sandbox environments where it has no security value?

**States**
32. Does every settings list have a designed empty state with a primary action?
33. Log in as your lowest-privilege role. Does every settings surface render hidden, or read-only
    with an explanation of who can change it — and never enabled-then-403?
34. Does a 403 on a settings URL explain what the page is and offer request-access?

---

## Sources

Walked and screenshotted (screenshots in `.cache/shots/` and the session scratchpad):

- **Linear — Preferences** · `https://linear.app/docs/account-preferences` — in-product 2× screenshot
  of the Preferences page; measured the 640px content column, 60px row pitch, card grouping, and the
  full inventory of ~12 preferences across `General`, `Interface and theme`, `Desktop application`,
  `Automations and workflows`. No Save buttons anywhere.
- **Linear — Notifications** · `https://linear.app/docs/notifications` — in-product screenshots of the
  settings sidebar (`Workspace` / `My Account` groups, 21 items), the four-row `Notification methods`
  card with state sentences and status dots, and the expanded Desktop channel with `Send test
  notification` and grouped per-type switches. Also the explicit statement that notification types are
  grouped and cannot be selected individually.
- **Stripe — API keys** · `https://docs.stripe.com/keys` — show-once semantics scoped to live mode,
  `Reveal live key` / `Hide live key`, re-auth before key creation, the `Add a note` prompt, the
  `Rotate key` **Expiration** dropdown and 7-day dual-validity window, `Expire key` vs delete,
  `View request logs` per key, restricted keys as the recommended default, and access policies as
  reusable attachable objects.
- **Stripe — Customer portal flows** · `https://docs.stripe.com/customer-management/portal-deep-links`
  plus the rendered `subscription_cancel` screenshot — the five flow types, and the design decision
  that "Navigational components to access the rest of the customer portal are hidden so the customer
  can focus on the single action." The cancel screen's exact copy is quoted in §13.
- **Vercel — Environment variables** · `https://vercel.com/docs/environment-variables` and
  `.../sensitive-environment-variables` — Config vs Secret types, "Secret values are write-only after
  saving", the **Sensitive** tag, "The current value is hidden" on edit, the one-way transition,
  `[REDACTED]` build-log redaction with an Activity Log event per masked key, team-level
  **Enforce Sensitive Environment Variables** policy, and "changes… only apply to new deployments".
- **Vercel — Access roles** · `https://vercel.com/docs/rbac/access-roles` — the two permission-wall
  choices: Pro Viewer "restricted from… accessing team settings and configurations" (hidden) vs
  Project Viewer who can "Examine environment variables across all environments" read-only (shown).
- **GitHub — Deleting a repository** ·
  `https://docs.github.com/en/repositories/creating-and-managing-repositories/deleting-a-repository` —
  the five-step gauntlet quoted verbatim in §8, and the existence of a separate `Restore deleted
  repository` doc.
- **GitHub — Configuring notifications** ·
  `https://docs.github.com/en/account-and-profile/managing-subscriptions-and-notifications-on-github/setting-up-notifications/configuring-notifications`
  — delivery targets (inbox, mobile, verified email), the dependency "you must enable notifications
  for both **Email** and **On GitHub**", and the participating/watching subscription model. (I could
  not verify the exact checkbox strings on the settings page itself; §6 only asserts what this page
  states.)
- **Slack — Configure your Slack notifications** ·
  `https://slack.com/help/articles/201355156-Configure-your-Slack-notifications` — `Everything` vs
  `Mentions and direct messages`, per-channel exceptions rather than a matrix, the mobile timing
  options "Immediately, even if I'm active" / "As soon as I'm inactive" and the documented default,
  separate mobile preference, keywords, sound settings.
- **Google Workspace Admin — Turn on hosted S/MIME** ·
  `https://knowledge.workspace.google.com/admin/gmail/advanced/turn-on-hosted-s-mime-for-message-encryption`
  — "Changes can take up to 24 hours but typically happen more quickly… Messages sent during this
  time aren't encrypted", and "Step 2: Have your users reload Gmail" as a numbered step. Inheritance
  vocabulary (`Inherited from <org>` / `Overridden`, **Override** and **Inherit** buttons) confirmed
  across this page and `support.google.com/a/answer/2655363`.
- **VS Code — Settings** · `https://code.visualstudio.com/docs/configure/settings` — the settings
  editor with search, the `@modified` / `@ext:` / `@feature:` / `@lang:` / `@tag:` / `@id:` /
  `@haspolicy` filter grammar (definitions quoted in §3), the coloured left bar on modified settings,
  the per-setting gear menu with reset/copy-ID/copy-URL, User/Workspace tabs, and the precedence order
  Default → User → Remote → Workspace → Workspace Folder with Policy overriding all.
- **Apple HIG — Toggles** · `https://developer.apple.com/design/human-interface-guidelines/toggles` —
  quoted in §5, including "Use the switch toggle style only in a list row" and "Avoid relying solely
  on different colors to communicate state."
- **Material Design 3 — Switch** · `https://m3.material.io/components/switch/guidelines` — observed the
  selected-state handle carrying a checkmark glyph, the non-colour state cue referenced in §5.
- **GOV.UK Design System — Radios** · `https://design-system.service.gov.uk/components/radios/` —
  "Do not pre-select radio options as this makes it more likely that users will: not realise they've
  missed a question; submit the wrong answer", "Users cannot go back to having no option selected once
  they have selected one", conditional-reveal constraints, fieldset/legend requirements. Note that
  GOV.UK ships no toggle-switch component at all.
- **NN/g — Toggle-Switch Guidelines** · `https://www.nngroup.com/articles/toggle-switch-guidelines/` —
  "Toggle switches should take immediate effect and should not require the user to click Save or
  Submit to apply the new state", and the control-comparison table placing radios/checkboxes at
  "after Submit" and toggles alone at "Immediately".
- **W3C ARIA Authoring Practices — Switch pattern** ·
  `https://www.w3.org/WAI/ARIA/apg/patterns/switch/` — `role="switch"`, `aria-checked` true/false with
  `mixed` disallowed, Space (and optionally Enter) to toggle, and "it is critical the label on a
  switch does not change when its state changes."

Practitioner evidence (Hacker News comment search via the Algolia API):

- **"We lost 54k GitHub stars"** (HN item 31036785) — a post-mortem of a repository deleted despite
  GitHub's five-step confirmation; the top comment enumerates every step the user completed before
  deleting the wrong repo. Cited in §8 as the argument that recoverability beats ceremony.
- **S3 outage thread** (HN item 13780999) — "If you have the same kind of confirmation whenever you
  delete a thing, whether it's an important thing or not, you're designing a system which encourages
  bad auto-pilot habits." Cited in §8 on habituation.
- **Delete-friendly extension thread** (HN item 34556118) — "We search for delete account, deactivate
  account, danger area, etc, but nothing are there!" Cited implicitly in §13/§14 on discoverability of
  cancel and delete paths.

**Not verified this session**: Discord's notification hierarchy (support.discord.com returned a
Cloudflare challenge to both the fetcher and the headless browser) and Figma's account settings; both
are omitted rather than asserted from memory. Notion's Preferences inventory was read from
`notion.com/help/account-settings` but I could not confirm its save model or settings search, so
neither is claimed above.
