# UX patterns — fast path

**Generated** by `tools/digest.mjs` from the files in `patterns/` — do not edit; edit the source.

The five things that matter most per flow family. The full files carry the reference implementations, the failure states and the decision forks.

## AI interaction flows: chat, generation, agents, trust

`patterns/ai-flows.md` · 2026-09 · full file ~27,863 tok · self-check: `node tools/digest.mjs --check-list patterns/ai-flows.md`

1. **The confirmation before a side effect is the whole product.** Show the *literal artifact*
   the action will produce — the actual recipient
   and subject line, the actual SQL, the actual file path, the actual dollar amount — not a
   sentence describing it. Claude Code's rule is the one to steal: it offers "don't ask again"
   **only when the prompt can render everything that option would allow**. A command too long to
   display gets a one-time approval and no persistent grant. If you cannot show the scope, you
   cannot sell the blanket permission.

2. **Collapse reasoning and tool calls by default, but make the summary line load-bearing.**
   `Thought for 8 seconds` is a shrug. `Searched 3 sources · found pricing on stripe.com` is a
   result. AI Elements' Tool component ships **seven** distinct states (Pending, Awaiting
   Approval, Running, Responded, Completed, Error, Denied) precisely because "spinner / no
   spinner" loses the two states that matter: *waiting on you* and *refused*.

3. **Stream at the word, not the token, with a 150ms per-word fade.** Streamdown's default is a
   per-word `fadeIn` with a 150ms default duration; the AI SDK's `smoothStream` buffers to word
   chunks with a 10ms release delay. Both exist because raw SSE arrives in ragged batches and looks broken.
   Vercel ships a `blurIn` variant specifically for fast models, because "the blur masks the batch
   appearance better than pure opacity." Then remove the animation wrappers entirely when the
   stream ends — a finished message should have zero animation DOM.

4. **Do not autoscroll the reader to the bottom of a streaming response.** NN/g's 2025 chatbot
   study caught Mississippi's MISSI doing exactly this and watched users "scroll back up to begin
   reading." Pin the scroll to the *top of the new message* and let the text grow downward past
   the fold. Only follow the stream if the user was already within ~40px of the bottom.

5. **Inside an existing product, the AI does not get its own drawer.** Linear puts agents in the
   same `@`-mention list as humans (tagged with a small `Agent` badge), the same activity feed
   with the same grammar ("Cursor moved from Triage to In Progress · 4min ago"), and the same
   assignee field — with the human staying primary assignee and the agent added as a contributor.
   A bolted-on assistant panel fails because it has no access to the object the user is looking at
   and no way to write back into it.

---

---

## Auth and Accounts

`patterns/auth-and-accounts.md` · 2026-09 · full file ~22,845 tok · self-check: `node tools/digest.mjs --check-list patterns/auth-and-accounts.md`

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

---

## Billing, plans and checkout

`patterns/billing-plans-and-checkout.md` · 2026-09 · full file ~29,844 tok · self-check: `node tools/digest.mjs --check-list patterns/billing-plans-and-checkout.md`

1. **Show the total before you ask for the address, and show the tax row even when you can't fill
   it yet.** Stripe Checkout renders a `Tax` row whose value reads *"Enter address to calculate"* —
   the row exists before the data does. Baymard's aggregate of 50 studies puts "extra costs too
   high (shipping, tax, fees)" at **40%** of non-browsing abandonment and "couldn't calculate total
   cost upfront" at **12%**; between them that is more than half the recoverable loss, and both are
   the same design failure: a number that appears late.
2. **The limit-reached state is the upgrade page.** A user who hits a cap has already told you the
   plan is too small, and told you which limit priced it wrong. The default build treats the cap as
   a wall and the upgrade as a separate errand in Settings. The correct move is: name the limit,
   name the number used and the number allowed, offer the single next plan with its price, and
   preserve the work in progress so the user lands back on the exact object they were editing —
   with the blocked action retried for them.
3. **Do not build a comparison grid out of `<div>`s.** Measured on the live pricing pages of Vercel,
   Figma, Notion and Linear on 2026-09-09: **zero `<table>` elements, zero `<th>`, zero
   `th[scope]`** across all four. Figma and Linear each declare one `role="table"` container with no
   column headers inside it. Between 56 and 294 `<svg>` elements per page sit alone in a parent with
   no text and no `aria-label` — those are the tick and cross cells, and to a screen reader they are
   silence. A plan grid is tabular data. Use a table.
4. **Failed payment is a two-week UI state, not an error page.** Stripe's recommended Smart Retries
   default is **8 attempts within 2 weeks**. For those 14 days the account is alive, the customer is
   often unaware, and your app has to show a persistent, dismissible-per-session, everywhere-visible
   band with a single action (`Update payment method`) — not a modal, not a logout, not a silent
   downgrade on day 15.
5. **Cancellation must be reachable in the same medium and in about as many clicks as signup.** The
   US federal click-to-cancel rule was vacated in July 2025 and the FTC's replacement was still an
   ANPRM as of May 2026 — but California's amended Automatic Renewal Law has been in force since
   **1 July 2025**, Germany has required a cancellation button under **§312k BGB since July 2022**,
   and the EU withdrawal button under Directive 2023/2673 lands **19 June 2026** with penalties up to
   **€2 million or 4% of EU turnover**. Build the compliant flow; it is also the better flow.

---

---

## Data management, bulk operations, and the file lifecycle

`patterns/data-management-and-bulk.md` · 2026-09 · full file ~28,280 tok · self-check: `node tools/digest.mjs --check-list patterns/data-management-and-bulk.md`

1. **Undo beats confirm, trash beats undo, and a preview beats all three.** NN/g's guidance on
   confirmation dialogs is that they are only justified for consequences that are serious and
   irreversible, and that overuse trains people to click through them without reading. So the order
   of preference is: make the action reversible (trash), then make it undoable in place (toast with
   Undo), and only then confirm. If you must confirm, the button says the verb — `Delete 12 issues`,
   not `OK`. **Scope:** this holds only while the effect stays inside your system. Once it escapes —
   an email sent, a webhook delivered, a payment captured — undo becomes a *delay window*, not a
   reversal, and rarely-taken irreversible actions get a confirm with the count in the button.
2. **The selection count and the action scope must be the same number, stated in the button.** The
   "select all 12,480" problem is not solved by a checkbox; it is solved by making the two scopes
   visibly distinct (this page vs. the whole query) and by putting the resolved number into the
   destructive verb. Gmail's two-step — page checkbox first, then a link that widens to the whole
   query — is the pattern because it makes widening a deliberate second act.
3. **An importer's value is in the two screens nobody builds: a parse receipt and a value review.**
   Attio shows `Columns found 13 / Rows found 498` *before* mapping (catches a wrong delimiter in
   one glance), and then reviews values **grouped by distinct value, not by row** — 34,582 rows
   collapse to 80 unique industry strings you can fix once each. Column mapping alone is table
   stakes and is where most importers stop.
4. **Validate file uploads client-side before a byte moves, and fail per file, not per batch.** Size
   and MIME type are knowable from the `File` object. Rejecting a 40 MB video after a 90-second
   upload is a design failure, not a backend one. When four of five files upload, the UI must show
   four green and one red with a retry on that one row.
5. **Creation frequency picks the surface** — but only when one field makes a valid record. Once a
   month → full page. A few times a session → modal. Dozens of times a session → quick-add row that
   stays focused and keeps accepting input. The tell that you got this wrong: a modal that the user
   opens, fills, submits, and immediately reopens. The tell that you applied it out of scope: a
   quick-add that immediately opens a "complete this record" modal.
6. **A bulk action longer than a couple of seconds is a job, not a request** — with an id, a URL, an
   owner, and per-record status. Every interesting failure (session expiry, a 429, a revoked
   permission, a quota, a closed tab) is then a *status the job reports* rather than a red toast.
   Products that skip this cannot implement §13 at all, and §13 is where users decide whether they
   trust you with their data.

---

---

## Onboarding and activation

`patterns/onboarding-and-activation.md` · 2026-09 · full file ~22,719 tok · self-check: `node tools/digest.mjs --check-list patterns/onboarding-and-activation.md`

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

---

## Search, filtering and command interfaces

`patterns/search-filter-and-command.md` · 2026-09 · full file ~18,116 tok · self-check: `node tools/digest.mjs --check-list patterns/search-filter-and-command.md`

1. **Bind two different keys to two different jobs.** "Find a thing and go to it" and "filter the list
   I'm looking at" are not the same feature. Linear ships `/` for search-everything and `⌘F` for
   search-in-this-view, and its own docs say `⌘F` "acts more like a temporary filter." Products that
   merge them force everyone through the wrong one. VS Code does the same split with `⌘P` (go to
   file) and `⇧⌘P` (run command) — which is literally `⌘P` pre-seeded with `>`.

2. **Never match without a relevance floor.** VS Code's palette scores on raw substring: with no
   folder open, `>format` returns exactly two commands (measured 2026-09-09) and one of them is
   `Remote Repositories: Export Debug In**format**ion`. Fifty percent noise, on the surface where
   the user is least willing to read. Stem, score, then cut: if the best score is below threshold, show
   zero-results-with-recovery rather than the tail of the ranking. **Scope:** a floor is for corpora
   the user has not memorised. A palette over a closed set of verbs the user already knows the names
   of wants loose subsequence matching and no floor at all — `ghp` → `Git: Push` is the feature.

3. **The applied scope must be a removable chip, not prose.** GitHub gets its zero-result page half
   right: `0 results (6 ms) in [facebook/react ×]` — the elapsed number is per-query, the pattern is
   not. The thing that was too narrow is the one thing on screen you can click off. Everything else
   on that page is generic advice, and Baymard's no-results research is explicit that users "rarely
   read" search tips. **Scope:** chips are for scopes the user chose. A hard tenant boundary
   (org-scoped enterprise search) must not render as removable — offering to remove it promises
   results that will never come.

4. **Filter state lives in the URL.** Linear's docs: "The applied filters are also reflected in the
   browser URL. You can copy the browser address to share the filtered view." If your filters live
   only in React state, back-button, refresh, share, and open-in-new-tab all silently discard the
   user's work. Linear's own carve-out is the thing to copy carefully: "Only the main filters are
   included in the URL. View options, quick filters, and Insights filters aren't included" — so a
   shared link does *not* reproduce what the sender saw, and nothing on screen says so. Either
   serialise everything or label the link `Copy link to filters` rather than `Share view`.
   **Scope:** stop at the URL when filter values are identifiers you don't want in a support
   ticket, a Slack channel or a server access log — a healthcare or HR tool wants a server-side
   saved view with an opaque id, not `?patient=...` in every pasted link.

5. **Show why each result matched.** Baymard: 96% of e-commerce sites ship no contextual snippet, and
   57% of test participants became confused about relevance and pogo-sticked between results and
   product pages to work out why an item was there. A result row without a match rationale is a
   guess the user has to verify by clicking. **Scope:** when the title *is* the answer — a command
   palette, a file switcher, a person picker — a snippet is noise per row and costs a line of
   scanning. And a snippet over a corpus where the body is more sensitive than the title (HR files,
   legal holds) leaks by design; show the breadcrumb instead.

---

---

## Settings, preferences and configuration

`patterns/settings-and-preferences.md` · 2026-09 · full file ~24,297 tok · self-check: `node tools/digest.mjs --check-list patterns/settings-and-preferences.md`

**1. Split by *whose* setting it is, before you split by topic.**
Linear's settings sidebar is one scroll containing two labelled groups: `Workspace` (Overview,
General, Security, Members, Labels, Projects, Templates, Initiatives, SLAs, Asks, Applications,
Emojis, Plans, Billing, Audit log, Import/Export, Integrations) and `Account` (Preferences, Profile,
Notifications, Code & reviews, Security & Access). One nav, two scopes, scope stated as a group
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
changes to blocking relationships. You cannot select *only* status changes." Every toggle you ship
is a row in your state model that must be migrated, documented and supported for as long as the
product exists.

**5. Match the confirmation to the reversibility, not to the scariness.**
GitHub repo deletion costs five deliberate acts and is recoverable for 90 days. Stripe's billing
portal cancel costs one button, and shows the exact consequence and the exact undo before you press
it: "Your plan will be canceled, but is still available until the end of your billing period on
June 16, 2023. If you change your mind, you can renew your subscription." Red boxes and
type-to-confirm on a reversible action are theatre; they teach users to type names reflexively,
which is exactly how the irreversible one gets through.

The scope, which the pattern is usually copied without: that Stripe screen is only reversible
because the merchant configured `subscription_cancel` to cancel at period end. The same flow set to
cancel immediately renders the same single-button screen for an action that ends service now. If
you copy this, copy the coupling — the ceremony must be a function of the configured mode, not of
the screen.

---

---

## Teams, Permissions and Notifications

`patterns/teams-permissions-and-notifications.md` · 2026-09 · full file ~27,241 tok · self-check: `node tools/digest.mjs --check-list patterns/teams-permissions-and-notifications.md`

1. **Split "who can reach this" from "what they can do."** Figma's share settings has two separate controls stacked — a `Who has access` dropdown (Anyone / Anyone at [Organization] / Anyone in [Workspace] / Only invited people) and a `What they can do` radio pair (View / Edit), each with a plain-language sentence under it. Google splits it the same way: a `General access` dropdown for audience, a second dropdown beside it for role. The single fused dropdown ("Anyone with the link can edit") is where every clone goes wrong: it multiplies audience × role into 8–12 menu items, and the destructive option sits one row away from the safe one.

2. **Ship three roles, and put the fourth axis somewhere else.** Admin / Member / Guest covers most collaboration tools. It does not cover products where the permission model *is* the surface people came for — see *Where each default breaks* under Decision procedures before you take this one. GitHub, by contrast, ships 6 organization roles (owner, member, moderator, billing manager, security manager, App manager) plus 5 repository roles (Read, Triage, Write, Maintain, Admin) plus team maintainer plus outside collaborator plus custom org roles — roughly 13 concepts a new admin must hold. Linear resolves the same needs with 3 workspace roles plus a *scoped* role (Team owner) and four per-team toggles. Scope beats role count.

3. **Never let a user find a wall by walking into it.** The permission-denied state is a design failure that already happened upstream. Prevent it: disable-with-reason instead of erroring, show the escalation path (Linear ships `View workspace admins` in ⌘K and at `/settings/view-admins` precisely so a blocked user knows *whom* to ask), and where you can't prevent it, make the request first-class — Notion gives a locked page a **No access** control that requests access from that page's creators or editors, and a view-only page a **Request edit access** item in the Share dropdown, routed to the page creator. A member without invite rights sees "request to add a member" instead of a dead Invite button.

4. **The inbox is not the feed.** Linear runs both and keeps them apart: **Inbox** = things addressed to you, with read/unread/snooze/delete semantics and a hard 2,000-item cap; **Pulse** = a feed of project and initiative updates with For me / Popular / Recent tabs, no per-item read state, which *digests into* the Inbox once a day at ~6:00 AM local. Conflating them produces an inbox nobody can clear, and a badge that means nothing.

5. **Dedupe across channels, and say so.** Linear's rule, verbatim: “Email digests send with time delays based on urgency, and are only sent if you haven’t already read the Linear inbox notification.” GitHub syncs email→inbox read state via a tracking image from `notifications@github.com`. Without this rule, a mention hits desktop, push, email and the badge, and the user turns everything off. Slack's rebuild — which decoupled *what* you receive from *how* you receive it — raised settings engagement 5× and made "Mentions and DMs" the predominant default rather than a thing people fled to.

---

---
