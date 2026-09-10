# Teams, Permissions and Notifications

**Evaluated:** 2026-09 · re-verified 2026-09-09 (see *Review pass (2026-09)* at the end for what changed under us)

Walked: Linear (Inbox, Notifications, Members & roles, Invite members, Private teams, Team owners, Pulse, Audit log, SCIM), GitHub (notification inbox, inbox filters, configuring notifications, repository transfer, org roles), Figma (share modal + share settings sub-sheet, seat types), Google Drive (share dialog, general access, request-access flow), Notion (sharing & permissions, members/admins/guests, teamspaces), Slack (notification preferences, per-channel notifications, ownership transfer, the engineering post on the notifications rebuild), Discord (permission model). Screenshots in `.cache/shots/tpn-*`.

---

## If you only get five things right

1. **Split "who can reach this" from "what they can do."** Figma's share settings has two separate controls stacked — a `Who has access` dropdown (Anyone / Anyone at [Organization] / Anyone in [Workspace] / Only invited people) and a `What they can do` radio pair (View / Edit), each with a plain-language sentence under it. Google splits it the same way: a `General access` dropdown for audience, a second dropdown beside it for role. The single fused dropdown ("Anyone with the link can edit") is where every clone goes wrong: it multiplies audience × role into 8–12 menu items, and the destructive option sits one row away from the safe one.

2. **Ship three roles, and put the fourth axis somewhere else.** Admin / Member / Guest covers most collaboration tools. It does not cover products where the permission model *is* the surface people came for — see *Where each default breaks* under Decision procedures before you take this one. GitHub, by contrast, ships 6 organization roles (owner, member, moderator, billing manager, security manager, App manager) plus 5 repository roles (Read, Triage, Write, Maintain, Admin) plus team maintainer plus outside collaborator plus custom org roles — roughly 13 concepts a new admin must hold. Linear resolves the same needs with 3 workspace roles plus a *scoped* role (Team owner) and four per-team toggles. Scope beats role count.

3. **Never let a user find a wall by walking into it.** The permission-denied state is a design failure that already happened upstream. Prevent it: disable-with-reason instead of erroring, show the escalation path (Linear ships `View workspace admins` in ⌘K and at `/settings/view-admins` precisely so a blocked user knows *whom* to ask), and where you can't prevent it, make the request first-class — Notion routes page access requests into the owner's Inbox with approve/reject inline; a member without invite rights sees "request to add a member" instead of a dead Invite button.

4. **The inbox is not the feed.** Linear runs both and keeps them apart: **Inbox** = things addressed to you, with read/unread/snooze/delete semantics and a hard 2,000-item cap; **Pulse** = a feed of project and initiative updates with For me / Popular / Recent tabs, no per-item read state, which *digests into* the Inbox once a day at ~6:00 AM local. Conflating them produces an inbox nobody can clear, and a badge that means nothing.

5. **Dedupe across channels, and say so.** Linear's rule, verbatim: “Email digests send with time delays based on urgency, and are only sent if you haven’t already read the Linear inbox notification.” GitHub syncs email→inbox read state via a tracking image from `notifications@github.com`. Without this rule, a mention hits desktop, push, email and the badge, and the user turns everything off. Slack's rebuild — which decoupled *what* you receive from *how* you receive it — raised settings engagement 5× and made "Mentions and DMs" the predominant default rather than a thing people fled to.

---

# 1. Invitations

## The job

**User:** get a specific person working inside a specific piece of work, now, with the least amount of ceremony. They usually already know the person's email and usually know what the person will do.

**Business:** invited seats are the growth loop and, on per-seat pricing, the revenue. The business wants low friction to invite and a wide net (invite links, domain auto-join); security wants a narrow, auditable one.

**How the good ones resolve it:** they make the *invite* cheap and the *scope* explicit at the moment of invite. Linear's invite modal takes comma-separated emails, an `Invite as…` role, and a team multi-select in one dialog — you never send an invitation whose landing place is ambiguous. Notion goes further and discloses the consequence pre-flight: hover an email in the share field *before* pressing Invite and it tells you whether that person will land as a guest or as a billed member.

## Reference implementation

**Linear, Settings → Administration → Members.** Three separate mechanisms, deliberately not merged:

- **Email invite.** Comma-separated emails → `Invite as…` role → optional team(s) to auto-join → Send invites.
- **Invite link.** Generated in Settings → Administration → Security. Persistent and reusable, with an explicit **Reset invite link** button (rotation, not deletion, because a dead link is worse than a rotated one). Disabled entirely in SAML/SCIM workspaces.
- **Approved email domains.** Anyone signing up with `@company.com` sees the workspace as joinable during onboarding — no invite, no approval. The doc carries the warning that matters: *if you cancel or transfer the domain, remove it here*, because domain-based join outlives the domain.

The detail worth stealing: **Invite & Assign.** A person who has not yet accepted can be assigned issues or set as project lead. Open the assignee menu, pick "Invite and assign…". The pending user is a real, addressable entity in every picker before the account exists. Most implementations model an invite as a row in an `invitations` table and a user as a row in `users`, and then cannot represent this at all.

**Notion** adds a time axis: a **Temporary member** with an expiration date up to one year out, who does not consume a paid seat, appears in the member list *with the expiration date shown*, and loses access automatically. Contractor access is the single most common cause of a stale member list; Notion made expiry a first-class field rather than a calendar reminder.

## The decisions

| Fork | Pick | Why |
|---|---|---|
| One invite dialog or a wizard? | One dialog. Emails + role + destination(s) + Send. | Every product that ships well does this. A wizard implies the decision is hard; it isn't. |
| Validate emails when? | On blur / on comma, as chips. Disable the Invite button until ≥1 valid chip. | Figma's field literally reads `Emails, comma separated` and its Invite button is greyed until the field parses. Never validate on submit — you lose the paste of 12 addresses. |
| Default role for a new invite? | Member (the least-privileged role that can actually do the job). Never Admin. | Linear's exception proves it: on the Free plan *every* member is an Admin, which is fine when there's nothing to protect and wrong the moment there is. |
| Invite links: single-use or reusable? | Reusable + rotatable, unless you're in SSO. | Single-use links generate a support ticket per person. Rotation ("Reset invite link") is the revocation story. |
| Domain auto-join: join or request? | Join for the workspace's own verified domain; *request* for anything else. | Notion's owner-approval queue for guest invites shows the shape: request carries requester, requested role, target page, guest email — enough to decide without leaving the notification. |
| Show seat/billing impact at invite time? | Yes, in the dialog, before Send. | This is where surprise invoices are born. Notion says it in the docs ("On paid plans, you'll be charged per member"); say it in the UI: "Adds 2 seats · $16/mo, prorated". |
| Can a non-admin invite? | Yes, as a *request*, not a blocked button. | Notion: "If you don't have invite access, you will instead have the option to request to add a member." |

## The states

- **Pending.** A real filter in the member list, not a footnote. Linear's Members page filters by role *or* status — `Pending invites`, `Suspended`, `Left workspace`. The pending row needs: email, invited-as role, who invited, when, and two actions — **Resend** and **Revoke**. Both are needed weekly; neither should be behind an overflow menu on desktop.
- **Email never arrived.** The most common failure and almost never designed for. Linear's docs name the sending domains to allowlist (`notifications@linear.app`, `pm_bounces@pm-bounces.linear.app`). Figma's answer: "copy the file or prototype link and share it directly with them. They will still be able to open the file if they have permission." **Design rule: every pending invite row must expose a copyable invite URL**, so the inviter can route around your email deliverability via Slack.
- **Invite accepted with a different email.** They were invited at `work@co.com` and sign in with `personal@gmail.com`. Either match on the invite token (correct) or state the mismatch explicitly ("This invitation was sent to work@co.com. Sign in with that address, or ask an admin to reinvite you.").
- **Invite to a workspace they're already in.** Silent no-op is wrong. "Priya is already a member of this workspace." with a link to her row.
- **Expired.** Give the recipient a self-service path: "This invitation expired on 12 Aug. Request a new one" → notifies the original inviter, not a generic admin queue.
- **Seat limit hit.** Block at Send with the cost of the fix, not after: "Your plan includes 10 seats and all 10 are in use. Inviting 2 more adds $16/mo." Never accept the invite and fail on acceptance — that punishes the wrong person.
- **Seat added, card declined.** The invite succeeded and the proration failed hours later. Do not silently revoke access: the invitee is already working. Suspend *billing*, not the seat — admin-only banner naming the amount and the retry date, invitee unaffected, and a hard cutoff date stated up front ("Access for 2 members ends 14 Sep unless payment succeeds"). Products that revoke on the failed charge generate a support ticket from the person who did nothing wrong.
- **Invite revoked between send and click.** The recipient clicks a link the inviter killed an hour ago. Say which of the two happened — "Dan revoked this invitation" vs "This invitation expired on 12 Aug" — because the recovery differs: one is ask-Dan, the other is request-a-new-one.
- **SSO/SCIM on.** Manual invite must disappear or degrade honestly. Linear: with SCIM enabled, admins can no longer manage members in-app at all; guests remain manually invitable; there's a documented temporary manual override for suspension. An invite button that silently does nothing under SCIM is the classic bug.

## Mobile

Invitation is a desktop-weighted task, but *acceptance* is overwhelmingly mobile — the invite email is read on a phone. Consequences:

- The accept page must work logged-out, on a phone, in an in-app browser (Gmail's webview), and must not require an app install. Deep-link with a web fallback.
- Do not put the workspace name only in the email subject. The accept page should show workspace name, avatar, inviter name, and the role being granted, above the fold at 390px.
- The invite *composer* on mobile: use a native chip field with `inputmode="email"` `autocapitalize="none"` `autocorrect="off"`. iOS will capitalise and autocorrect email addresses in a plain text input and users will not notice.
- The accept link that bounces through an SSO provider breaks in an in-app webview more often than anywhere else: the IdP sets a cookie the webview drops, and the user lands back on the invite page with no error. Test the accept flow specifically in the Gmail and Slack webviews, not just mobile Safari, and fall back to "Open in browser" with the token preserved in the URL.

## Accessibility

- The email chip field is a combobox with a live region: each added chip announces "priya@co.com added, 3 recipients". Each chip's remove button needs its own label — "Remove priya@co.com", not "Remove".
- Parse errors must be tied to the field with `aria-describedby` *and* identify the offending chip, not just "Invalid email".
- The role select is a real `<select>` or an ARIA listbox with the current value in its accessible name: "Invite as: Member".
- Send result goes into an `aria-live="polite"` region: "Invitations sent to 3 people." Toasts alone are missed by screen reader users who have moved focus.

## Copy

| Generic | Better | Why |
|---|---|---|
| "Invite team members" | "Invite people to Acme" | Names the thing they're joining. |
| "Enter email addresses" | "Emails, comma separated" (Figma) | Tells you the input format, which is the actual question. |
| "Invitation sent" | "Invitation sent to priya@co.com. She'll appear as Pending until she accepts." | Sets expectation for the member list they're about to look at. |
| "You have been invited to join a workspace" (subject) | "Dan invited you to Acme on Linear" | Person + org + product. Survives a lock-screen preview. |
| "Something went wrong" | "We couldn't send to priya@co.com — the address bounced. Copy the invite link instead." | Names the address, names the cause, offers the workaround. |
| "Are you sure?" (on revoke) | "Revoke Priya's invitation? Her link stops working immediately." | States the effect, not the gravity. |

## How it goes wrong

The AI-generated version: a modal titled "Invite Team Member" with one email input, one role `<select>` containing every role in the system including Owner, and a blue "Send Invitation" button. No chips, so you can invite exactly one person. No teams/projects, so the invitee lands in an empty workspace. No pending state anywhere — the member list shows only accepted users, so the inviter re-invites the same person three times. No resend, no revoke, no copyable link. Success is a green toast that says "Invitation sent successfully!" and the modal stays open. Seat cost appears on the next invoice.

---

# 2. Role design

## The job

**User (admin):** express "this person should be able to do their job and not delete the company" in under thirty seconds, without reading a permissions matrix.

**Business:** enterprise buyers ask for granularity in procurement; support cost rises with every role; misconfigured roles are the source of most self-inflicted data exposure.

**Resolution:** ship a small role set, and satisfy granularity demands with *scope* (which team/project the role applies to) and a handful of *named workspace toggles* — not with more roles.

## Reference implementation

**Linear.** Three workspace-level roles + one scoped role + one external role:

- **Workspace owner** (Enterprise only) — billing, security, audit log, workspace export, OAuth app approval.
- **Admin** — routine operations. On Free plans every member is an Admin; on Business the upgrader gets it; on Enterprise it's deliberately narrower than owner.
- **Member** — the default.
- **Team owner** (Business/Enterprise) — *scoped*, not global. Unlimited per team; teams aren't required to have one. Workspace admins/owners are automatically team owners of every team they can access. The team creator becomes one by default. Team owners of a parent team are team owners of its sub-teams. **Guests cannot be team owners.**
- **Guest** — external, page/team-scoped.

The reason this stays small: the granularity lives in four *named toggles* per team, not in roles. Team settings → Access and permissions lets a team owner set "all members" vs "team owners only" for: Issue label management, Template management, Team settings management, Member management. Three operations are hard-locked to team owners regardless: **deleting a team, making a team private, changing a team's parent** — the three actions that can't be undone by the person they surprise. And critically: **permission settings are not inherited from parent team to sub-team**, so a sub-team can't silently loosen its parent's rules.

**The counter-example, with numbers.** GitHub: 6 org roles + 5 repository roles + team maintainer + outside collaborator + custom org roles (Enterprise Cloud). Discord: **53 distinct permission flags** with an 8-step channel-overwrite resolution order (@everyone base → role permissions OR'd → @everyone channel deny → @everyone channel allow → role denies OR'd → role allows OR'd → member deny → member allow), and `ADMINISTRATOR` bypassing all of it. Both models are load-bearing for their scale. Neither is a starting point, and Discord's own docs need an algorithm to explain what a user can do — which is the tell that no UI can show it.

## The decisions

**The 3-role default and when to break it.**

| Signal | Add | Don't add |
|---|---|---|
| Someone needs to pay but not read the data | **Billing contact** as an *attribute* on a member ("Receives invoices"), not a role | A "Billing manager" role |
| Contractors need one project | **Guest** — scoped by object, not by verb | A "Limited member" role |
| Team leads keep asking admins for small changes | **Scoped owner** (Linear's Team owner) | A global "Manager" role |
| Security/compliance wants read-only audit access | **Auditor** as a workspace toggle on an existing admin | A parallel role tree |
| Sales says "enterprise needs custom roles" | Ship it at Enterprise tier only, gated, with a role *builder* | Custom roles in the base product |

**Ordering.** Least-privileged first, default pre-selected. The pattern to avoid is alphabetical, which puts "Admin" at the top of every dropdown and makes it the accidental first click.

**Role change is an event, not an edit.** Downgrade must state what breaks: "Priya will lose access to 3 private teams and be unassigned from 7 issues." Linear does the inverse for escalation — an admin joining a private team gets a confirmation pop-up before it happens, because self-granting access is exactly the thing an audit log gets read for.

## The states

- **Last admin.** Block the demotion, don't error afterwards: disable the option in the dropdown with a tooltip "Acme needs at least one workspace owner. Promote someone else first."
- **You are editing yourself.** Show "(you)" in the row (Figma's dialog reads `Bobby Bucatini (you)`) and require an extra confirm for self-demotion.
- **Role is managed externally.** Under SCIM, roles come from IdP groups. Linear provisions Owner/Admin/Guest via magic push groups (`linear-owners`, `linear-admins`, `linear-guests`); everyone else lands as Member. The in-app role dropdown must be disabled with the reason and the source: "Managed by Okta — change this in your identity provider."
- **Plan-gated role.** Show the role greyed with the tier, not hidden. Hidden features generate "does it do X?" sales questions; greyed features generate upgrades.

## Mobile

Role management is legitimately desktop-first, and the honest mobile version is a read-only member list with a role badge per row plus a single "Manage members on desktop" affordance — *provided* the two time-critical actions still work on a phone: **revoke access** and **resend invite**. Those get performed from a taxi. Everything else can wait.

## Accessibility

- A role is not a colour. A red "Admin" pill is a colour-only distinction; put the word in the pill.
- Permission matrices, if you ship one, are `<table>` with `<th scope="col">` per role and `<th scope="row">` per capability, and each cell's content must be a labelled ✓/✕ (`<span class="sr-only">Allowed</span>`), never a bare icon font.
- Changing a role updates a live region: "Priya's role changed to Admin."

## Copy

Name roles by what they do, not by rank. "Can edit" beats "Level 2". Write one sentence per role in the dropdown itself, the way Figma writes `Can view and comment on this file.` under the View radio — the sentence is the documentation, and it's the only documentation anyone reads.

Real examples that work:
- "**Member** — Can create and edit anything in teams they join."
- "**Admin** — Everything a member can do, plus manage people, teams and billing."
- "**Guest** — Only sees the specific projects you share with them. Doesn't use a paid seat."

## How it goes wrong

Seven roles named Owner, Admin, Manager, Editor, Contributor, Viewer, Guest, with no description text, in one alphabetised `<select>`. Nobody can tell Manager from Admin, so everyone gets Admin. There is no scoped role, so a team lead who needs to rename a label is made a workspace Admin and can now export the company. The permission matrix lives in a help doc, not the UI. Demoting the last admin succeeds and locks everyone out.

---

# 3. Showing permissions before the user hits the wall

## The job

**User:** know what they can do here, and if they can't, know who to ask and how long it'll take.

**Business:** every permission error is a support ticket and an interruption to an admin.

**Resolution:** spend the budget upstream. Four states — disabled-with-reason, request-instead-of-block, pre-flight disclosure, and a published escalation path — remove most of the traffic that would otherwise reach a 403 page.

## Reference implementation

Four moves, from four products:

1. **Linear — publish the escalation path.** `View workspace admins` is in the ⌘K command menu and at `linear.app/settings/view-admins`, available to any member. The blocked user does not have to guess who to DM. This costs one page and removes an entire class of ticket.
2. **Notion — swap the blocked action for a request.** A member without invite rights doesn't see a dead Invite button; they see "request to add a member", and a guest-invite request reaches a workspace owner carrying requester, requested role, target page and guest email — enough to decide without leaving the notification. Two *different* request affordances ship on the page itself, and the split is deliberate: open a page you can't see and you get a **No access** control that sends a request to that page's creators or editors; open a page you can only view and the **Share** tab shows your current level with a dropdown containing **Request edit access**, which goes to the page creator. Asking for the door and asking for a better key are different asks with different approvers.
   Notion is also honest about the state that follows, which is the part worth stealing: "You'll be notified once your request has been accepted — try refreshing the page if you're not able to edit it." A granted permission does not invalidate the client the requester is sitting in. Either push the grant down the socket, or ship that sentence.
3. **Notion — disclose the consequence pre-flight.** Hover an invitee's email in the share field *before* pressing Invite to see how they'll be added. The decision is reversible only in theory; the disclosure is free.
4. **Figma — annotate every scope with a sentence.** Under the `Who has access` dropdown: "Org members can access this file via link or through the file browser." Under `Advanced`: "This setting applies to anyone in the file with **can view** access." The sentence changes when the dropdown changes. This is the single highest-value 40 characters in the whole dialog.

## The decisions

| Situation | Do this | Not this |
|---|---|---|
| Action exists but user lacks the right | Render the control **disabled with a reason on hover/focus**, and a request action beside it | Hide it (they'll think it's broken) or let them click into an error |
| Whole page is off-limits | Show what the object *is* (title, owner, workspace) plus Request access with an optional message | A bare 403 |
| User has partial access | Show the full structure with locked nodes marked, e.g. "3 private teams — you're not a member" | Silently filter — users can't tell "empty" from "hidden" |
| The object doesn't exist vs you can't see it | For public-ish resources, distinguish. For sensitive ones, deliberately don't — and be consistent, since inconsistency is itself the leak | Leaking existence via differing error text |
| Read-only mode | Persistent banner + disabled editors, not a toast on first keystroke | Letting them type for 4 minutes then rejecting the save |

**Google's request-access flow, dissected.** "You need access" → optional message → owner gets an email carrying the requester's name and email, the file link and name, the message, and a control to notify the requester of the decision. Documented outcomes: approved-with-notify, denied-with-notify, or **silence** — "your request may have been approved without notification". That last branch is the failure: the requester is left polling. If you build this, always notify the requester on decision, and always show them a pending state in-product with a timestamp ("Requested 2 days ago · Ask Priya directly").

## The states

- **Request pending** — visible to the requester, with the approver named.
- **Request denied** — say so. Silence trains people to re-request.
- **Access granted while the tab was open** — offer "Access granted. Reload" rather than making them discover it.
- **Access revoked mid-session** — the hard one. Editors must fail closed on the next save with the content preserved locally and a copy-out path: "You no longer have edit access to this doc. Copy your unsaved changes."
- **Permission wall inside a deep link** — the notification you sent them still points at a thing they can't open. Linear's private-team rule is the preventive version: you **cannot @mention someone into a private team's issue** if they're not already a member. Block the mention at composition, not the click at delivery.

## Mobile

Disabled-with-tooltip does not exist on touch. Replace hover reasons with either (a) an inline caption under the disabled control, or (b) a tap that opens a sheet explaining the restriction and offering the request. A disabled button that does nothing when tapped is indistinguishable from a broken app.

## Accessibility

- Disabled buttons are not focusable and therefore unreadable to a screen reader. Use `aria-disabled="true"` and keep them in the tab order, with the reason in `aria-describedby`. Reserve real `disabled` for controls with a visible adjacent explanation.
- The permission wall is a page-level state: move focus to its heading, and give it an `<h1>` that names the object ("You need access to Q4 Roadmap"), not "Access denied".
- Locked rows in a tree need an accessible name that includes the state: "Security — private team, you are not a member".

## Copy

| Generic | Better |
|---|---|
| "Access denied" | "You need access to Q4 Roadmap" |
| "You do not have permission to perform this action." | "Only team owners can delete a team. Ask Dan or Priya." |
| "Contact your administrator." | "Request access" (button) + "Dan Harris owns this file." |
| "Insufficient permissions" | "Your role (Member) can't change billing. Workspace owners can." |
| "This action is not allowed." | "This team is private. Ask a team owner to add you." |

## How it goes wrong

Every gated action is a live, fully-styled primary button. Clicking it fires the request, the API returns 403, and a red toast says "Forbidden". There is no indication of who could help, no request path, and the button looks identical on the next visit, so the user clicks it again. The permission-denied page is a centred lock icon with "Access Denied" and a "Go Home" button — no object name, no owner, no request.

---

# 4. The share dialog

## The job

**User:** get this specific artifact in front of specific people (or a specific crowd) at the right level of access, in one interaction, usually mid-flow and under time pressure.

**Business:** sharing is the viral loop *and* the largest accidental-exposure surface. The dialog has to make the loose option easy to choose deliberately and hard to choose accidentally.

**Resolution:** two sections — **people** (explicit, additive) and **general access** (the ambient scope) — visually separated, with the ambient scope's current state always legible without opening anything.

## Reference implementation A: Figma

Two surfaces. The main modal `Share this file`:

- **Copy link** lives in the *header*, top-right, styled as a link, next to the close X. It's the most-used action in the dialog and it's not the primary button — because the primary button belongs to the invite field.
- **Invite field**: `Emails, comma separated`, with an **Invite** button that's greyed until the field parses. On Org/Enterprise the field also accepts *user group* names.
- **"Who has access"** — one list that mixes three different kinds of grant, each with its own icon:
  - org scope — "Anyone in Noodle Co · **can view ›**"
  - folder scope — "Anyone in Notification Redesign · **4 people ›**"
  - explicit people — "Bobby Bucatini (you) · owner", "Fran Fusilli · **can edit ⌄**"
  - The typography carries the semantics: **`›` means drill into a sub-sheet; `⌄` means open a dropdown right here.** Inherited scopes drill; individual grants edit inline. Most clones use the same chevron for both and users learn nothing.
  - Figma states the boundary explicitly in the docs: the people list "will not include everyone who has access to the file via the organization, team, or folder." The inherited scopes are the two rows above it, and they are not expanded into names. That is the honest design — but it means the dialog can never answer "how many humans can open this?", and if your product needs that number, you have to compute it yourself and show it.
- A second, visually separate card holds the *other* link types: Copy Dev Mode link, Copy prototype link (with its own gear), Publish to Community, Get embed code. These are share-adjacent but not access control, and they are physically in a different container.

The sub-sheet `Share settings` (reached via `‹` back arrow, so it's a drill-in, not a new modal):

- **Who has access** — dropdown with a globe icon. Four options, two of them plan-gated: **Anyone** (including outside the org) / **[Organization name]** (Org and Enterprise only) / **[Workspace name]** (Enterprise only) / **Only invited people**. Helper: "Org members can access this file via link or through the file browser."
- **What they can do** — radio pair, View / Edit. Helper under the selection: "Can view and comment on this file."
- **Additional security** — Password required, Link expiration (Enterprise), and a search-visibility control: on, org members find the file in the browser; off, only people invited to it or its parent folder can. **The interlock is the part worth stealing** — you cannot turn search-visibility off while the file is shared with Anyone in [Workspace], and Figma writes out why rather than greying a box with no explanation. A dependent setting that another setting dominates is the single most common place products ship a mute toggle.
- **Advanced** — "Viewers can copy, share, and export from this file" with the sub-caption "This setting applies to anyone in the file with **can view** access."
- Footer: **Cancel / Save**, greyed until dirty. **This is the one place in a modern app where explicit save beats autosave** — because a mis-tap on the audience dropdown with autosave publishes a file, and there's no undo for "someone read it."

## Reference implementation B: Google Drive

Same two-section anatomy, different vocabulary and different failure mode:

- **People with access** — rows with an "Email people on this file" action (send a message to Editors / Commenters / Viewers as groups, without adding anyone).
- **General access** — a dropdown (`Restricted` ↔ `Anyone with the link`) with a *second* dropdown beside it for role (`Viewer` / `Commenter` / `Editor`). Two controls, not one fused menu.
- Three roles, and the three-way split is real: **Commenter** is the level most products omit and most reviews need.
- Advanced: owners can prevent Editors from changing permissions and sharing, and prevent Viewers/Commenters from downloading, printing or copying.
- Two hard caps stated in the help doc, both worth copying as *disclosed* limits rather than silent ones: **600 individual email addresses per file**, and **100 open tabs or devices editing at once** — past 100, "only the owner and some users with edit permissions can edit the file." Every collaborative product has the second limit; almost none names it, so the user experiences it as the app being broken.
- Honest disclosure Figma doesn't make: "When you share a link to a file, your name and email will be visible as the owner." And unauthenticated viewers show as **anonymous animals** — a named, memorable representation of "someone is here and I don't know who," which is far better than an empty presence bar.

## Reference implementation C: Notion

Tabs at the top — **Share** | **Publish** — separating "let people in" from "put this on the internet," which are different decisions with different blast radii.

- Field: "Email or group, separated by commas".
- Rows carry a *secondary* line that identifies the grantee type: a person shows their email; a teamspace shows "Teamspace · 37 people". **Showing the member count of a group grant is the cheapest way to stop accidental over-sharing.**
- **General access**: Only people invited / Everyone at {workspace} (with a **Hide in search** toggle) / Anyone on the web with link (with **Link expires**).
- Six access levels, each earning its place: Full access (edit **+ share**), Can edit, Can edit content (database rows but not schema), Can create (submit entries without seeing others' — the ticket-queue case, Business/Enterprise only), Can comment, Can view. Two of the six exist only on database pages, which is the right instinct: the extra levels attach to the object type that needs them rather than to every object in the product.

**The resolution rule, which the file used to omit and most clones get backwards:** Notion "respects the broadest level of access given to a user." Grant Member A `Can view` on a page, then grant the whole workspace `Full access`, and Member A gets full access. Union, not intersection. Most people building this assume most-restrictive-wins because that feels safer, then ship a UI that shows the narrow grant and an engine that applies the broad one. **Pick one, say which in the dialog, and make the effective level the thing the row displays** — not the grant that happens to be attached to that row.

**Notion also enumerates how "Anyone with link" leaks without the link**, which is the disclosure nobody else makes: the page is mentioned or linked from a more broadly shared page; the page uses a two-way relation to one; the page is nested inside one. If your product has backlinks or relations, that third-party reachability is real and belongs in the confirm, not in a help article.

**Presence as the access display.** Notion's answer to "who else is in here" is the avatar bar at the top of the page: faded if they have access but aren't looking, unfaded if they are, hover for name, email and when they were last on the page. Google's is anonymous animals for unauthenticated viewers. Both beat an empty presence strip, and both are cheaper than a live access count.

**The axis everyone forgets:** *can this person re-share?* Notion encodes it as the difference between Full access and Can edit. Figma encodes it as the Advanced "Viewers can copy, share, and export" toggle. Google encodes it as "prevent Editors from changing permissions and sharing." If your dialog has no answer, your Editors are Owners.

## The link-permission dropdown, specifically

This is the control that gets built wrong most often. Rules:

1. **Two controls, never one** — *when the two axes are actually independent.* Audience × capability usually is, and fusing them makes an N×M menu. If your public audience can only ever be read-only, one control is the honest design; splitting it invents a combination the user will hunt for and never find.
2. **The current state is always visible without opening the menu.** "Anyone with the link · Editor" as the closed label — not "Change".
3. **Escalating the audience is visually distinct.** Google and Figma both change the *icon* (person → globe) when you go public. Change icon and helper text; don't rely on the text alone.
4. **Never make "Anyone with the link" the default,** and never place it adjacent to the safe option in a way that a fat-thumbed tap lands on it. Put a divider between internal scopes and public.
5. **Copy Link must never silently change permissions.** Some products "helpfully" set the link to org-wide when you click Copy. If you must offer it, ask: "Anyone at Acme can now open this. Copy link" as an explicit two-step.
6. **Show the effect of the current scope as a sentence,** recomputed live. In Figma's `Share settings` sub-sheet every one of the four controls carries a sentence under it — "Org members can access this file via link or through the file browser", "Can view and comment on this file", "This setting applies to anyone in the file with **can view** access". Four controls, three sentences, no help link.

## The states

- **Loading the access list** — skeleton rows, not an empty list. An empty "Who has access" that later fills with 12 people has already been misread.
- **Link copied** — inline confirmation on the button ("Copied"), 2s, no toast. This action happens 10× a day.
- **Scope change in flight** — optimistic UI is wrong here. Show the pending state and confirm from the server; a failed permission write that appeared to succeed is a security bug.
- **Sharing outside the org** — Figma names the guard ("The 'Anyone' option doesn't appear in my share settings… your organization admin has disabled public links"). If a scope is admin-disabled, show it disabled with the reason, not absent.
- **Very long access list** — Figma's dialog scrolls the list inside a fixed-height card. Add search once the list exceeds ~10 rows. Group by grant type (inherited scopes first, then people).
- **Access inherited from a parent** — say where from and make it clickable: "Anyone in Notification Redesign · 4 people ›" drills into the folder's members. Never render inherited grants as if they were direct — you'll get "I removed her and she still has access."
- **Expiring link already expired** — the recipient's error must say so ("This link expired on 3 Sep") rather than "You need access," which sends them into a pointless request.

## Mobile

The share dialog is used on mobile constantly and is almost always a shrunk desktop modal. What actually works at 390px:

- Full-screen sheet, not a centred modal. Sticky header with title + Done; sticky footer with the primary **Copy link**.
- **Copy link is the primary action on mobile** and should be a full-width button, because the dominant mobile share task is "paste it into Slack," not "type six email addresses."
- The role control must be a native picker or an action sheet — a custom dropdown with 6 options in a 390px-wide modal produces 20px targets. Minimum 44×44pt.
- The email field opens the keyboard and eats ~45% of the viewport. Put the invite field *below* the fold-critical "who has access to this right now" summary, or collapse the access list while the field is focused — otherwise the state the user needs to check is hidden behind their own keyboard.
- Hook the OS share sheet for the link, so AirDrop/Messages work.

## Accessibility

- The dialog is `role="dialog" aria-modal="true"`, labelled by its title, focus trapped, Escape closes, focus returns to the Share button.
- Focus on open goes to the invite field only if inviting is the primary job; for a dialog whose main job is checking who has access, focus the dialog container so the whole list is announced.
- Each access row's per-row dropdown needs a name that includes the person: `aria-label="Permission for Fran Fusilli: can edit"` — not "can edit" alone, which is meaningless out of row context.
- Changing a scope updates a live region with the resulting sentence: "Anyone in Noodle Co can now view this file."
- The Copy link button must announce the result (`aria-live` "Link copied"); a visual-only "Copied" state is silent.

## Copy

| Generic | Better | Source/why |
|---|---|---|
| "Share" (dialog title) | "Share this file" (Figma) / "Share 'Q4 Roadmap'" | Names the object; disambiguates when two dialogs stack. |
| "Public" | "Anyone with the link" | "Public" understates; people think it means listed. |
| "Private" | "Only people invited" (Notion) / "Only invited people" (Figma) | States the mechanism. |
| "Can edit" as the only description | "Can view and comment on this file." | The sentence Figma puts under the radio; answers "does view include comment?" |
| "Team access" | "Anyone in Noodle Co · can view" | Names the actual org. |
| "Advanced settings" | "Viewers can copy, share, and export from this file" | Says what the toggle does, not that it's advanced. |
| "Link copied to clipboard!" | "Copied" | Inline, 2s, no punctuation, no toast. |

## How it goes wrong

One modal. A single dropdown reading "Anyone with the link can edit ▾" with eight fused options. A list of avatars with no roles. No indication that the parent folder already grants access to 40 people. No helper text anywhere. "Copy link" as a big blue primary button that also silently sets the link to public. On mobile it's the same 480px modal, horizontally scrolling, with a 24px-tall role dropdown. Removing a person from the list appears to work and doesn't, because their access came from a group.

---

# 5. Hierarchy, guests and external access

## The job

Users think in "the thing I'm working on." Products need a container hierarchy for billing, permissions and defaults. The mismatch is where "why can't she see this?" comes from.

## Reference implementation

**Linear's shape** — `Workspace → Team (→ Sub-team) → Project → Issue`, with permissions attaching at **team**, and projects able to span teams. The rules that make it survive:

- Any workspace member can create a private team; only owners/admins/team owners can change an existing team's visibility.
- Converting a team to private has explicit, stated side effects: **non-members are removed from active issue assignments and unsubscribed from that team's issues.** Naming the collateral damage is the whole design.
- Sub-teams of a private parent choose **Restricted** (parent members can see it and self-join — the default) or **Private** (only explicitly added people see it). A private parent can only have private sub-teams.
- Cross-boundary escape hatch instead of blanket access: Enterprise team owners can enable per-issue sharing out of a private team, and a **banner at the top of the shared issue names who it's shared with**. The example in the docs is the right one — a Security team sharing one vulnerability with two developers.

**Notion's shape** — `Workspace → Teamspace → Page → Sub-page`, with page-level inheritance ("when you add someone to a page, they can automatically access all of its sub-pages by default", and you can restrict or expand per sub-page). A **default teamspace** is one everybody must belong to; the UI tells you which is which under Teamspace settings → Members → Permissions → "Default".

## Guests / external access

Three properties separate a good guest model from a bad one:

1. **Scoped by object, not by verb.** A guest has access to *pages/teams*, not to a reduced set of actions workspace-wide.
2. **Not billed as a member** (or billed differently), with a plan-level **guest limit** that the UI enforces at share time with a real reason. Notion: if you're over the guest limit, new people can only be added as members, and only if they're on an allowed domain.
3. **A promotion path.** Notion: Settings → Members → Guests → checkbox rows → "**Upgrade {#} guest(s) to member**", plus a **Suggestions** tab surfacing guests who look like members. That tab is a revenue feature wearing a tidiness costume, and it works because the tidiness is real.

**Guest limits are a permission wall.** Notion enumerates exactly why a guest share can fail — guest limit reached, workspace/teamspace forbids guests on that page, guest's domain isn't allowed. Your share dialog needs those three sentences.

## States, mobile, a11y, copy — condensed

- **Orphaned object** (last member of a private team leaves): admins must be able to see and recover it. Linear lets admins/owners find private teams in Settings → Administration → Teams and join with a confirmation warning.
- **Moving an object between containers** changes who can see it. Confirm with the delta: "Moving this project to Security will remove access for 12 people."
- **Mobile:** hierarchy navigation is a sidebar problem, and the sidebar is the first thing that dies at 390px. Two things must survive: the *badge on the object* ("Private" · "Shared with 3 guests") so the user can see scope without opening anything, and the breadcrumb of containers above the title, so "why can't she see this?" is answerable on a phone. Everything else — moving objects between containers, changing visibility — belongs on desktop and should say so rather than shipping a 24px dropdown.
- **A11y:** private/guest state must be text in the accessible name of the tree item, not a lock glyph alone.
- **Copy:** "Private to 6 members" beats "Private". "Shared with 2 people outside Acme" beats "External".

---

# 6. Ownership transfer, deactivation, member lists and audit

## Ownership transfer

**Two references, two different confirmation strategies:**

- **GitHub repository transfer** — Settings → **Danger Zone** → Transfer → pick new owner (org dropdown *or* free-text username) → optional rename → warnings about subscription-linked features → **type the repository name to confirm** → button labelled "**I understand, transfer this repository**". Old owner becomes a collaborator; issues, PRs, wiki, stars, watchers, webhooks, secrets, deploy keys and LFS objects come along; old URLs redirect. Assignments partially survive (personal→org keeps only org-member assignments).
- **Slack primary ownership** — `my.slack.com/admin/transfer` → search and select member → **enter your password** → "Transfer Workspace Ownership". Immediate. Your role becomes Owner (not nothing). And the sequencing constraint that matters: you must transfer primary ownership *before* you can deactivate your own account.

**Pick the confirmation to match the reversibility.** Type-the-name (GitHub) for irreversible-but-recoverable-by-support. Re-auth (Slack) for actions that change who controls the account — password/2FA re-entry, because the threat model includes a hijacked session, and a typed name doesn't defend against that.

**Design rules:** name the new owner in the confirm text; enumerate what transfers and what doesn't; state what the old owner becomes; require the recipient to accept where possible (GitHub's org transfers do); and write it to the audit log.

## Deactivation and the member list

**Linear's suspend, not delete**, is the model:

- Suspended users **lose access immediately** and are **removed from the next billing cycle** — the two facts an admin needs.
- They **stay in the member list** for historical integrity: their issues, assignments and comments still resolve to a real person, and their profile lives at `/profiles/<username>`.
- **API tokens are revoked and invalidated** on suspension *and* on conversion to guest. Say this in the confirm; it's the thing that silently breaks a CI pipeline.
- The Members page filters by role or status: `Pending invites`, `Suspended`, `Left workspace`.

The member list itself needs, per row: avatar + name + email, role (editable inline), status, teams/groups, last active, and an overflow with Change role / Suspend / Remove. Sort by last-active descending by default — that's how you find the seats to reclaim. Bulk selection with a sticky action bar (GitHub's inbox bar is the right pattern: "**2 selected** | Done | Unsubscribe | ⋯").

## Audit surfaces

**Linear's audit log**, as a spec:

- **90-day retention**, **workspace-owner-only** access, "given the sensitive nature of the information."
- Records **IP and country of the actor**.
- UI does the 80% case: browse recent events, filter by event type, and a specific toggle to **filter out session-creation events** — because login noise drowns everything else and this is the one filter every audit UI needs on day one.
- The other 20% is explicitly punted to the **GraphQL API** (filter by actor, email, IP, date range) and to **webhook/SIEM streaming**. This is the correct division of labour: don't build a query builder, build a stream.
- Entries carry `actor` (id, name, email, avatar), `type` (e.g. `userJoinedTeam`, `webhookCreated`), `metadata`, and `requestInformation` (user agent, auth method, auth service).

**The events that must be logged, whatever else you skip:** invite sent/accepted/revoked, role changed, member suspended/removed, team visibility changed, sharing scope changed to public, ownership transferred, SSO/SCIM config changed, API token created, admin joined a private space.

## SCIM / directory sync UI

Linear's SCIM page is the honest version:

- Once enabled, **admins can no longer manage users in the product** — the in-app controls must reflect this, not fail silently. There's a documented **temporary manual override** for suspension (for users who predate SCIM).
- **Group push maps 1:1 to teams.** Two linking strategies, both shipped: import Linear teams into the IdP, *or* set a **SCIM group mapping** field on the team matching the IdP's group display name (for IdPs that can't import).
- Roles come from magic groups: `linear-owners`, `linear-admins`, `linear-guests`; everyone else provisions as Member. These groups don't create teams.
- **The disconnect semantics are stated and asymmetric:** deleting the group on Linear's side removes all members and **converts the team to private** (issues unchanged); disconnecting without delete leaves the team alone and stops syncing. There's a manual **unlink SCIM** in the team's Danger Zone.
- Downgrade path: if the plan loses SAML/SCIM, new provisioning stops but existing provisioned users can still sign in.

**UI requirements:** show sync status and last sync time; show per-user provenance ("Managed by Okta") on every externally-managed row; disable with reason rather than hide; and surface sync *failures* as a banner on the Members page, not only in a log.

## Mobile for this whole section

Ownership transfer, audit and SCIM are desktop work and should say so. What must not be desktop-only is the small set of actions performed under time pressure from a phone: **suspend a member** (the laptop is gone), **revoke a session or token**, **resend an invite**, and **read the audit log filtered to one actor** (the "what did they touch?" question, asked in a group chat, at 11pm). Those four get real mobile screens with 44pt targets. The member table, the role matrix and the SCIM mapping form get a read-only view and an honest "Manage on desktop" link.

Two mobile-specific rules:
- **Re-auth on a phone is a different flow.** Slack's ownership transfer asks for a password; on mobile that means a password manager round-trip out of the app and back, which drops the transfer if you unmount the page. Use a biometric/passkey prompt where you can, and preserve the form state where you can't.
- **A confirm that requires typing the object name is hostile on a touch keyboard** and gets defeated by autocorrect capitalising the first letter. Keep type-the-name for desktop; on mobile use hold-to-confirm or a second explicit screen, and set `autocapitalize="none"` `autocorrect="off"` if you keep the field.

---

# 7. The notification inbox

## The job

**User:** find out what needs them, act on it, and get the list to zero — repeatedly, several times a day, in under a minute.

**Business:** Slack's own number — notifications are one of the **top three drivers of customer-experience tickets**. The inbox is simultaneously the re-engagement surface and the support-cost surface.

**Resolution:** treat it as an inbox with real triage verbs and a defensible definition of "done," not as a list of everything that happened.

## Reference implementation A: Linear Inbox

Anatomy, from the product screenshot:

- Two tabs with counts: **Priority 4** | **Other 12**. Linear picks the Priority set by default and lets you tune it (right-click Priority → display options → Priority filter). Two buckets, not twelve.
- Row: avatar · unread dot · issue ID + title · **reason line in secondary text** ("Didier assigned the issue to you", "Lena mentioned you in a comment", "Project update is overdue") · state icon · relative timestamp (1h, 4h, 13h, 22h).
- **The reason line is the load-bearing element.** It's what makes a notification triageable without opening it.
- Read items are rendered at reduced contrast in the same list — read/unread is a visual weight, not a separate view.

Verbs and keys: `g i` to inbox from anywhere; `j/k` or arrows through the list; `u` toggle read/unread; `⌥U` mark all read; `h` snooze; `Backspace` delete; `⇧Backspace` delete all read; `⌘F` quick search over title, ID, notification type, assignee, team, project, priority, `Esc` to clear it. Subscription is a verb on the *object*, not on the row: `⇧S` subscribes, `⌘⇧S` unsubscribes, and from the Inbox you must open the item first — which is the correct friction, because unsubscribing is not a triage action, it is a standing decision.

Two decisions worth copying:
- **Snooze is a first-class verb**, and it reappears in the inbox at the chosen time. The menu is four presets with their resolved dates spelled out beside them — *An hour from now · Tue, 11 Feb, 21:47*, Tomorrow, Next week, A month from now — then **Custom…**, whose field is a parser with the grammar in the placeholder ("Try: 4 pm, 2 days, Feb 9") and the accepted forms documented: Month Date Time, next quarter, til/until a date, for X weeks. **Showing the resolved date next to each preset is the whole trick** — "Next week" alone is a guess about Monday. The documented sharp edge: you must type the option in full (`next quarter`, not `next quar`) or it won't appear, which is the cost of a parser with no visible grammar.
- **Reminders are separate from snooze** and attach to the *object*, not the notification: set a reminder on an issue/document/project/initiative, and it shows **at the top of the issue** where it can be rescheduled or cancelled.

Limits, stated: **2,000 open notifications max**. You cannot choose what enters the Inbox — verbatim, "You cannot choose which notifications go to your Inbox. All notifications will arrive there, and any additional notification subscriptions you enable under Account > Notifications will link back to the Inbox notification." That's a deliberate simplification: one canonical list, many delivery mirrors, and the settings page says so at the top of the card ("Notifications will always go to your Linear inbox").

**What happens past 2,000 is now documented two different ways, and it is instructive that even Linear can't keep this straight.** The Inbox page says older notifications "will not be retained" and the FAQ still reads "We don't support archiving notifications at this time"; the Notifications page says "When this limit is exceeded, notifications are automatically archived." Both were live on 2026-09-09. Whatever your cap does — drop, archive, or archive-and-hide — it is a *data-loss rule*, it will be described in at least two places, and those two places will drift. Write it once, render it from one string, and show it in the UI at the boundary ("Showing your 2,000 most recent notifications") rather than only in a help centre.

## Reference implementation B: GitHub Notifications

Five triage verbs with distinct, documented semantics — this is the clearest verb set in the category:

| Verb | Semantics | Retention |
|---|---|---|
| **Done** | Completed; leaves the inbox | kept 5 months, `is:done` |
| **Save** | Keep for later; flagged in the inbox | **indefinitely**, `is:saved` |
| **Unsubscribe** | Removes it *and* stops future ones until you're @mentioned, your team is @mentioned, or review is requested | — |
| **Read / Unread** | Visual state only; `is:read` excludes Done | inbox retention 5 months |

Note the sharp edge GitHub documents: a saved notification older than 5 months that becomes *unsaved* disappears from the inbox **within a day**. Retention is honest and stated rather than infinite-and-vague.

- **Query language as the filter model.** `is:unread`, `reason:mention`, `repo:octo-corp/octo-project reason:participating`. Default saved filters ship with emoji names: 🎯 Assigned (`reason:assign`), 💬 Participating, ✋ Mentioned, 🙌 Team mentioned, 👀 Review requested. Up to **15 custom filters**. You build one by typing a query in the inbox and clicking **Save**, which opens the filter dialog pre-filled — filter creation is a *promotion of an existing view*, never a blank form.
- **Grouping** by repository or by date, chosen by the user, "to get a quick overview with less context switching."
- **Bulk triage bar**: "2 selected | ✓ Done | 🔕 Unsubscribe | ⋯".
- **Reason labels on each row** ("See one of the latest reasons you're receiving a notification… with a `reasons` label") — same insight as Linear's reason line.
- **The prerequisite GitHub states and nobody copies:** "To use the notifications inbox on GitHub and GitHub Mobile, you must enable notifications for both **Email** and **On GitHub**." The in-product inbox is coupled to the email channel, which is a strange dependency — but it is *disclosed*, so a user who turned email off knows why their inbox emptied. Any coupling like this in your own system needs the same sentence, or the empty inbox reads as data loss.

## The decisions

| Fork | Answer | Reasoning |
|---|---|---|
| Read/unread, or done/not-done? | **Both, and they're different.** Read = "my eyes passed over it". Done = "I've dealt with it, remove it." | GitHub ships both and they don't collapse. Products with only read/unread produce inboxes that never empty. |
| Archive or delete? | Either is defensible; **silently truncating is not**, and **describing it twice is how you end up truncating silently** — Linear's two docs currently disagree about whether past-2,000 notifications are dropped or auto-archived. | Render the limit from one string, in the UI, at the boundary. |
| Auto-mark-read on open? | Mark read on *opening the item*, never on scroll-past. Provide `u` to undo. | Scroll-based read-marking is the single most hated notification behaviour. |
| Group by thread or list flat? | **Thread by object** (issue, PR, page). 6 comments on one issue = 1 row with "6 new comments", not 6 rows. | Both references thread by object. Flat lists make counts meaningless. |
| Tabs or filters? | 2 tabs max (Linear: Priority/Other), plus a query/filter layer for power users. | 5 tabs = 5 inboxes to clear. |
| Snooze? | Yes if your objects have time semantics. It converts "leave it unread as a reminder" into a real action. | Linear's `h` + typed custom dates. |
| Where does "everything that happened" live? | A separate feed. Not here. | See §10. |

## The states

- **Empty (zero unread)** — the reward state. Give it a real illustration and the count of what was cleared, not "No notifications."
- **Empty (never had any)** — different copy: explain what will arrive here and what subscribes you ("You'll get a notification here when someone assigns you an issue or @mentions you").
- **Loading** — skeleton rows at the real row height. The inbox is the first thing people hit; layout shift here is felt daily.
- **Stale / offline** — the inbox is a real-time surface and will be wrong. Show "Updated 4 minutes ago" and a refresh, and reconcile on reconnect rather than blindly appending.
- **The notification points at a deleted or now-inaccessible object** — "This issue was deleted" in place, with the notification still dismissible. Never a 404 page.
- **Partially triaged / bulk action failed** — "18 of 20 marked done. 2 failed — retry."
- **Overflowing** — at the cap, say it: "Showing your 2,000 most recent notifications."
- **Undo** — mark-all-read must be undoable for ~10 seconds. It's the highest-regret button in the product.

## Mobile

- **State sync is the requirement; everything else is polish.** GitHub documents its mobile inbox as syncing with the web inbox, and its email channel as syncing read state into both. If yours doesn't, users triage twice, notice, and stop triaging on the phone — which turns the phone into a pure interruption device with no way to clear anything.
- **Swipe verbs map to the two most common triage actions** — swipe-right = Done/Archive, swipe-left = Snooze (or Unsubscribe). Full-swipe commits; partial reveals. Both must be undoable via a snackbar.
- Row height ≥ 64pt with a two-line title clamp and the reason line always visible — the reason line is what makes swiping safe.
- Keyboard shortcuts don't exist; a persistent "Mark all read" in the header replaces `⌥U`.
- Pull-to-refresh, and reconcile — don't prepend duplicates.
- Snooze on mobile cannot be a parser. Linear's typed "next quarter" grammar is a desktop affordance; the phone gets the four presets with their resolved dates and a date picker behind Custom. A free-text field that silently rejects `next quar` is worse on a touch keyboard than on a physical one.
- The mobile inbox is where a notification most often points at something the user can't open — they were @mentioned from a laptop into a space they aren't in. Render the reason line and the object title from the notification payload, so the row is still readable and still dismissible when the fetch 403s.

## Accessibility

- The list is a `<ul>` of rows; each row's accessible name must lead with the state: "Unread. Lena mentioned you in a comment. DRV-1154 Add dark mode accessibility. 13 hours ago."
- The unread dot needs a text equivalent (`<span class="sr-only">Unread</span>`), never colour alone.
- Relative timestamps: `<time datetime="2026-09-09T13:00:00Z">13h</time>`, with the absolute time in `title`.
- Arriving notifications must **not** steal focus. Announce via `aria-live="polite"` at most once per burst, or don't announce at all and update the count.
- Row actions need per-row labels: "Mark DRV-1154 as done".
- Bulk selection: announce the count on change ("2 of 12 selected"), and keep the action bar reachable in DOM order right after the list header.

## Copy

| Generic | Better |
|---|---|
| "New activity on Issue #1154" | "Lena mentioned you in a comment" |
| "Notification" (row) | The reason, always: "Didier assigned the issue to you" / "Project update is overdue" |
| "Mark as read" | "Done" (if it removes it) — don't call removal "read" |
| "No notifications" | "You're all caught up" + "12 cleared today" |
| "Clear all" | "Mark all as read" — and if it deletes, say "Delete 12 read notifications" |
| "Muted" | "Unsubscribed — you'll still be notified if someone @mentions you" (GitHub's actual semantics) |

## How it goes wrong

A bell icon with a dropdown panel. Inside: a reverse-chronological list of every event, one row per comment, with no reason line — just "New comment on Task 42". Opening the panel marks everything read, so the badge is permanently 0 and worthless. No done, no snooze, no unsubscribe, no filters, no threading. "Mark all as read" with no undo. The panel is 320px wide, and on mobile it's the same 320px panel pinned to the right edge. There's no full-page inbox at all, so there's no keyboard navigation and no bulk triage. Below it, a "View all activity" link goes to a feed that shows the same rows again with different formatting.

---

# 8. Notification preferences without the 40-checkbox matrix

## The job

**User:** stop the noise without losing the thing that matters, and be able to predict what a change will do before making it.

**Business:** every preference toggled off is deliverability lost; every over-notification is a churn signal. Slack's own measurement: notification issues are a **top-three driver of support tickets**.

## Reference implementation: Slack's rebuild

The old system had four conflicting mental models: desktop and mobile carried separate preference trees with different options, and "nothing" on mobile meant something different from "Off" on desktop. Users could not predict what a change would do — which is the actual failure, not the option count.

The fix, and the transferable idea: **decouple *what* you receive from *how* you receive it.**

```
Before:  desktop: everything | mentions | nothing (with push)
         mobile:  everything | mentions | nothing (with push)

After:   desktop activity:     everything | mentions
         desktop push enabled: true | false
         mobile:               everything | mentions | nothing
```

This makes "see all activity in the sidebar, but only push me for mentions" expressible — which is what most people actually want and could not previously say.

The shipped hierarchy, in order down the page:
1. **How to notify you** — Desktop / Mobile checkboxes (the channel).
2. **What to notify you about** — `Everything` | `Mentions and direct messages` (the volume).
3. **Also notify you about** — a short list of *named exceptions*: replies to a thread you're following; a message from a **VIP** while notifications are paused or you're in focus mode; a huddle starting in your channels or DMs.
4. **Mobile overrides** — one dropdown that says how mobile differs from the above.

Two more named blocks ship alongside those four, and both are doing work the file previously credited to nothing:

- **What to show in Activity** — the badge/feed contents, separated from delivery. "You'll always see DMs, mentions, reactions, and thread replies, but you can choose whether to see other types": channels set to All new posts, and Later item due dates. This is the badge-scope control, given a name a user can reason about.
- **Channel keywords** — a subscription primitive rather than a preference. Type a word, get notified when it appears in a channel you've joined, and see it highlighted in yellow. The documented edges are the interesting part: not case-sensitive, **exact matches only**, and **keywords in threaded messages don't trigger**. That last one is a real gap disclosed rather than hidden.

Per-conversation, three options only: **All new posts** | **Mentions** | **Mute**.

Migration was done at read time — old "Off" became "Mentions" + push disabled — so nobody's settings silently changed meaning.

**Measured outcome:** settings engagement up **5×** and sustained for weeks; immediate adoption of the push toggle; **fewer** people needing per-channel overrides afterwards; "Mentions and DMs" became the predominant choice.

## Reference implementation: Linear's deliberate coarseness

Linear's Settings → Account → Notifications is organised **by channel** — Desktop, Mobile, Email, Slack, four rows in one card — and each row carries a green/grey dot *plus a summary sentence of its own state*: "Enabled for assignments, status changes, 9 others" / "Enabled for all notifications" / "Disabled". **That sentence is the design.** A dot tells you a channel is on; the sentence tells you what it will do to you tonight, and it collapses an entire expanded sub-tree into one line you can scan in half a second. Four rows, four sentences, whole system legible without opening anything.

And then the decision most products cave on: **notification types are grouped, and the group is the smallest unit you can turn off.** Select "Status changes" and you get issue completions and cancellations. Want notifications when issues enter one *specific* status? The docs send you somewhere else entirely — "consider setting up a view subscription", i.e. subscribe to a saved filter. Granularity is pushed into a different, more expressive primitive rather than into 40 checkboxes, and the settings page never grows a row for it.

## The decisions

**Structure, in priority order:**

1. **Channel × Volume, not Channel × Event-type.** 4 channels × 3 volumes = 12 states you can see. 4 channels × 15 event types = 60 checkboxes nobody reads.
2. **Group event types into 4–8 named categories** and let people opt out of *categories*. Name them by what they mean to the user ("Assignments", "Mentions & replies", "Status changes", "Project updates"), not by your event enum.
3. **Object-level overrides beat global granularity.** The bell on a Linear project, Slack's per-channel three-way, GitHub's per-repo custom watch (issues / PRs / releases / security alerts / discussions). Fine control belongs where the object is, in context — not in a settings page.
4. **Auto-save.** Slack explicitly replaced a click-to-save modal because people forgot to save. There is no confirmation step for a preference.
5. **A mute/pause with a duration,** plus a recurring version. Slack ships both: pause-now, and a **notification schedule** where "outside of the schedule you set, your notifications will be paused." Much of the demand that arrives as "I want per-event checkboxes" is actually temporal, and a schedule answers it with two controls instead of forty. Pair it with a named exception class (Slack's VIP, paid plans only) so the schedule doesn't have to be conservative.
6. **Show the escape hatch inside the notification itself.** Every email and every in-app item carries "Unsubscribe from this issue" / "Turn off these notifications" — the point of intent is where the annoyance is felt.

**A workable default matrix to ship:**

| | In-app inbox | Push | Email |
|---|---|---|---|
| @mention / DM | ✓ | ✓ | digest if unread |
| Assigned to you | ✓ | ✓ | digest if unread |
| Reply on something you're in | ✓ | — | digest if unread |
| Status change on something you follow | ✓ | — | — |
| Team/project activity | feed only | — | weekly digest |
| Product announcements | — | — | ✓ separate opt-out |

## The states

- **Preference saved** — inline, per-row, immediate ("Saved" microcopy or a settling toggle). No global Save button.
- **Blocked at the OS layer** — the highest-value state and almost universally missed. If browser/OS permission is denied, the in-app toggle is a lie. Detect it and show: "Your browser is blocking notifications from Acme. Enable them in Chrome settings." Linear's FAQ carries exactly this, plus a separate macOS entry for the dock badge, which is a *different* OS permission that fails independently of banners.
- **Enabled, permitted, and still not arriving.** Ship the diagnostic, not just the toggle: Linear's desktop settings card has a **Send test notification** action, and its FAQ names the real cause — "Notification delivery may be routed to an active desktop app or browser session", i.e. you are getting them, on a machine you are not looking at. Presence-based routing is invisible and generates the bug report "notifications are broken". One test button and one sentence about routing removes most of that traffic.
- **Overridden elsewhere** — "Muted for #general" must be visible from the global page, or people will toggle globals forever trying to fix one channel.
- **Quiet hours active** — a persistent indicator, plus the VIP-style exception so urgent things still land (Slack's "a message from a VIP when your notifications are paused").
- **Admin-enforced** — greyed with the reason and the enforcer named.

## Mobile

- Preferences are a *list* on mobile, not a grid. A 4-channel × 6-category matrix is unusable at 390px; collapse to one screen per channel.
- The **most important mobile preference control is not in your app** — it's the OS permission prompt. Ask for push permission at a moment of demonstrated value (right after they get their first @mention), never on first launch. Once denied, iOS won't ask again, and your only remaining move is a deep link to Settings.
- **The mobile settings tree should be shorter than desktop, not the same tree in a narrower column.** Slack's is, and the omission is the lesson: the phone screen has *Mobile notifications* (toggle), *What to notify you about*, and *Also notify you about* — but no "How to notify you" checkbox pair, because on the device you are holding, the channel is not a question. Every preference whose answer is implied by the device should be absent from that device's screen.
- Slack's per-device split runs all the way down: notification sound is set under `Sound` on iOS but under `System settings → Sound` on Android, because Android routes it through OS channels. If your preference is really an OS preference, deep-link to the OS rather than mirroring a control you don't own.

## Accessibility

- Toggles are `role="switch"` with `aria-checked`, labelled with the full sentence, not "On".
- Group each channel in a `<fieldset>` with a `<legend>` naming the channel; the green/grey status dot needs a text equivalent in the legend ("Email — on").
- State changes announce: "Email notifications for mentions: on."
- Never rely on a colour dot to convey enabled/disabled — Linear's green/grey dot pattern needs the word beside it.

## Copy

| Generic | Better |
|---|---|
| "Enable email notifications" | "Email me when I'm mentioned, if I haven't already read it in the app" |
| "Notification frequency" | "Send a digest — Instantly / Hourly / Daily at 9am" |
| "Other" (category) | "Status changes — completions, cancellations, urgent priority, blocking relationships" (say what's in the bundle) |
| "Manage preferences" | "You're getting this because Lena mentioned you. Unsubscribe from this issue" |
| "Notifications are off" | "Your browser is blocking notifications from Acme. Enable them in Chrome settings →" |

## How it goes wrong

A settings page titled "Notifications" containing a table: rows are 22 event types straight out of the backend enum (`issue.status_changed`, `comment.created`), columns are Email / Push / In-app, cells are 66 unlabelled checkboxes. Everything is on by default. There's a Save button at the bottom that the user doesn't scroll to. Nothing indicates that the OS has denied push, so the Push column does nothing. There are no per-object controls, so the only way to stop one noisy project is to turn off a whole event type globally. The unsubscribe link in the email goes to this same page.

---

# 9. Routing, digests, badges, real-time and @-mentions

## Routing: the dedup rule

**The rule to copy, from Linear:** desktop, mobile and Slack fire in real time; **email digests are delayed by urgency and are only sent if you haven't already read the corresponding in-app notification.** One event, one human interruption.

Implementation shape:
1. Write the notification to the canonical inbox immediately (always).
2. Fan out to real-time channels based on preference + presence.
3. Enqueue the email with a delay window sized by urgency.
4. At send time, re-check read state. If read, drop it.
5. Batch what's left into one digest per window.

**GitHub's variant:** email↔inbox read-state sync via a tracking image from `notifications@github.com` — reading the email marks the inbox item read. It requires image loading, which the docs state as a condition rather than assume.

**Digest timing:** Linear's Pulse summaries land around **6:00 AM local time**. Local, not UTC, and not "every 24h from signup". Admins set the workspace default cadence (weekly Mondays / every weekday / never); an individual's own choice overrides it. That's the right precedence — org sets the default, person sets the truth.

## Badge counts

**The evidence:** in a 1,009-participant study (Bosco et al., *PLOS ONE*, 2022 — 1,095 recruited, 86 excluded, 15 groups of ~73), a single red badge on one of fifteen app icons increased clicks on that app in **all 15 comparisons, p < .001**. The authors attribute it to salience bias and urgency bias, and are explicit that the study **did not establish whether the extra engagement benefits the user** — only that badges reliably capture attention.

So: a badge is a reliable attention weapon with unproven user benefit. Rules that follow:

| Badge | When it's right | When it's harmful |
|---|---|---|
| **Count** ("12") | Items are individually actionable and the number is clearable | Anything ambient — a count that never reaches zero teaches people to ignore the badge, which costs you the urgent one |
| **Dot** (no number) | "Something new here", low stakes — feeds, activity, changelogs | When the user needs to triage volume |
| **Nothing** | Read-only surfaces, feeds, anything the user didn't subscribe to | — |

Give users the control, and make the control name the *scope* rather than on/off. Linear's Inbox → Display options is a five-row panel: Enable priority inbox, **Include in priority inbox** (All / …), **Badge count** (Priority & Other / …), **Group unreads by**, Ordering — so the badge's meaning is a setting, not a constant, and the Pulse sidebar item is separately set to *always show / only show when badged / never show*. Slack ships the same idea as a named block called **What to show in Activity**: "You'll always see DMs, mentions, reactions, and thread replies, but you can choose whether to see other types" — channels set to All new posts, and Later item due dates. Both products let the user answer "what is this number counting?" instead of only "do I want a number?". Slack ships "Show a badge on Slack's icon to indicate new activity" as a plain checkbox. If your badge counts unread *feed* items, you have built an anxiety generator; count only inbox items with an action attached.

## Real-time arrival without disrupting the user

- **Never reorder or reflow the list under the cursor.** Insert a sticky pill at the top: "3 new notifications — click to show". Apply on click, or on scroll-to-top.
- **Never steal focus.** No auto-focus, no modal, no toast that intercepts a click.
- **Rate-limit the interruption, not the data.** Write everything to the inbox; coalesce the *alert* — one desktop notification per burst per thread.
- **Presence-aware suppression** removes more noise than any preference setting: if the user is looking at the object right now, don't notify them about it. Slack's mobile timing settings are the user-facing expression of this.
- **Reconnect reconciliation:** on websocket resume, fetch a delta and merge by ID; a naive replay double-posts.

## @-mentions

The subscription semantics matter more than the autocomplete:

- **Linear:** @mention in an issue description or comment auto-subscribes you to the issue. But an @mention *inside a comment thread* subscribes you **to the thread, not to the whole issue**. This distinction is what stops a mention from turning into a firehose.
- **GitHub:** `reason:mention` and `reason:team-mention` are separate filters, because "someone typed my name" and "someone typed @frontend-team" carry different urgency. Unsubscribing from a thread still lets it back in when you're @mentioned, your team is @mentioned, or review is requested — the mute has a deliberate override.
- **Prevent the impossible mention.** Linear: you cannot @mention someone into an issue in a private team if they're not a member. Handle it at composition — grey the name in the autocomplete with "Not a member of Security" and offer "Invite to team" — rather than sending a notification to a page they'll get a 403 on.
- **@-everyone needs friction.** Confirm with the count: "This will notify 240 people. Send?"
- Mentions of a *group* should show the resolved member count in the autocomplete row, the same way Notion shows "Teamspace · 37 people" in the share dialog.

---

# 10. The activity feed is not the notification inbox

These get conflated constantly, and the conflation is why so many inboxes can't be cleared.

|  | **Notification inbox** | **Activity feed** |
|---|---|---|
| Content | Things addressed to *you* | Everything that happened in a scope |
| Selection | Subscription + reason | Recency + relevance ranking |
| Per-item state | Read / unread / done / snoozed | None |
| Goal | Reach zero | Skim and leave |
| Badge | Count, clearable | Dot at most, usually nothing |
| Retention | Bounded (GitHub: 5 months; Linear: 2,000 items) | Long, paginated |
| Failure mode | Missing something important | Being boring |

## Reference implementation: Linear's Inbox + Pulse

Linear runs both, as separate sidebar items, with a defined bridge between them.

**Pulse** is the feed: project and initiative updates across the workspace.
- Three tabs — **For me** (projects you're in or might care about), **Popular** ("gives priority to recent updates with emoji or comment engagement" — social signal, not recency), **Recent** (everything by time).
- **Custom feeds**: personal saved filters. Explicitly *not shareable and not subscribable by others* — which keeps the feed a personal reading surface rather than another notification channel someone can point at you.
- Sidebar presence is user-configurable: always / only when badged / never.
- Not available to Guests, because it's a workspace-scope concept.

**The bridge:** Pulse doesn't notify per item. It **digests into the Inbox** daily or weekly, arriving ~6:00 AM local, and only for projects you're a member of, that roll up to an initiative you own, that you explicitly subscribed to, or that fall under a team/initiative subscription. One item in the inbox, many updates inside it. (There's even an audio playback of the summary from the Inbox — the feed is being treated as *reading*, the inbox as *work*.)

**The routing distinction, one more time, via Linear's project notifications:** the bell on a project page has two independent destinations. *Personal notifications* go to your Inbox (new issue created, description changed, issue completed/cancelled, project update posted). *Slack channel notifications* post to a channel where anyone can see them — including people who aren't in the Linear workspace at all. Same source events, two different audiences, two separate toggles. Never route a broadcast through a personal inbox.

**Design rules:**
- If an item has no action and no addressee, it belongs in the feed.
- The feed does not get a count badge. A dot, or nothing.
- Give the feed a "notify me about this" affordance per object (the bell) so people can promote a feed subject into their inbox — one-directional promotion, never automatic.
- If you only have budget for one surface, **build the inbox.** A feed without an inbox means people miss their assignments. An inbox without a feed just means people ask in Slack.

---

# 11. The failure states that cut across all of these

Every section above has its own states list. These five don't belong to a section — they hit permissions, sharing and notifications at once, they are the states these flows are actually judged by, and they are the ones almost nobody builds.

## Session expiry mid-action

The user has the share dialog open, sets the audience to `Anyone at Acme`, clicks Save, and their session died four minutes ago.

- **The write must fail closed and say so.** A permission write that appears to succeed and didn't is a security bug, not a UX bug — the user walks away believing the file is shared. This is the one place in the whole family where optimistic UI is wrong.
- **Re-auth without unmounting.** Authenticate in an overlay or a popup that leaves the dialog mounted, then replay the buffered request and show the result. Bouncing to `/login` and returning to a fresh dialog loses the change *and* leaves the user unsure which state won.
- **The permission you re-authenticate into may differ from the one you left.** Someone demoted you while the tab sat open. On replay, re-read the effective permission before applying, and if it changed, say which: "Your role changed to Member while you were away. Members can't change link scope."
- Long-lived tabs are the norm for this family — a share dialog and an inbox both sit open for days. Assume every action is fired from a tab whose session, permissions and data are all stale.

## Access revoked while the user is holding unsaved work

Covered in §3 as a state; here is the whole shape, because it is where products lose data.

1. **Fail the save, keep the bytes.** Preserve the unsaved delta client-side before showing anything.
2. **Name the change and the actor if you can** — "Priya removed your edit access 2 minutes ago" beats "You no longer have access."
3. **Offer the copy-out**: download, copy-to-clipboard, or fork-into-my-space. One button.
4. **Do not close the editor.** Read-only it in place with the banner. Closing it looks identical to a crash.
5. **Request access from inside the wall**, pre-filled with what they were doing: "Ask Priya for edit access" → the request carries the object and, optionally, the message.

The revocation case where products fail hardest is a *group* revocation — someone was removed from a teamspace, not from the doc, so no per-object event fires. If your permission model is inherited, your revocation events have to be computed on the inherited edge too, or the user keeps a live session against a doc they lost an hour ago.

## Failed payment, expired trial, downgraded plan

Billing is a permission system with worse error messages.

- **Never revoke access to the *data* on a payment failure.** Degrade to read-only with the amount, the reason and the deadline stated: "Payment failed 3 Sep. Editing is paused for 14 members. Retry payment · $128 due." Deleting or hiding content on a declined card is how you turn a churn risk into a public incident.
- **The person who sees the error must be able to act on it or hand it off.** A Member hitting a billing wall needs the billing contact's name, not "contact your administrator" — the same escalation-path move as §3, applied to money.
- **Downgrading a plan silently deletes capabilities.** Enumerate before, not after: "Downgrading to Pro removes SAML, the audit log, and 4 private teams (which become visible to all 38 members)." Linear's SAML/SCIM downgrade rule is the honest version — new provisioning stops, existing provisioned users can still sign in — because it separates "the feature stops" from "people get locked out."
- **Seats reclaimed on downgrade need a chooser, not an algorithm.** If the plan drops from 25 seats to 10, do not pick the 15 to suspend by last-active. Show the list, sort it by last-active, and make the admin click.

## Rate limits, streams and reconnection

The inbox is a real-time surface, so it inherits every real-time failure.

- **Rate-limited by the server:** the fix is to coalesce the *alert*, never the record. Everything is written to the canonical inbox; the desktop banner and the push are what get one-per-burst-per-thread. A user who was rate-limited must not discover it as missing history.
- **Websocket drops:** show it. "Updated 4 minutes ago · Reconnecting" is a two-word status line and it is the difference between a stale inbox and an inbox the user believes.
- **On resume, fetch a delta and merge by ID.** A naive replay double-posts; a naive refetch discards local read state set while offline. Reconcile both directions: local triage actions taken offline must be queued and replayed too, or the user marks 12 things done on a plane and finds them all back.
- **The badge must not lie during a disconnect.** Freeze it at the last known value rather than zeroing it; a badge that drops to 0 because the socket died trains people to ignore the badge permanently.
- **Push delivery is not your channel.** APNs/FCM drop, delay and coalesce silently. Anything that must be seen has to also exist in the inbox and, past a delay, in email. Push is a hint, never a delivery guarantee — design the flow so a dropped push costs nothing.

## Partial success

Every bulk action in this family can half-work, and almost every product renders it as either a green toast or a red one.

- Invite 12 people, 2 bounce: "10 invitations sent. 2 addresses bounced — copy their invite links" with the two rows still present and actionable.
- Mark 20 done, 2 fail: "18 of 20 marked done. 2 failed — retry."
- Change 30 roles via bulk edit, 1 is the last owner: the whole batch should not fail; the 29 apply, the 1 is returned with its reason.
- SCIM sync half-fails: a banner on the Members page, not a line in a log nobody opens, naming the count and the IdP — "Okta sync failed for 3 users at 14:20."

The rule: **a bulk action reports a count, a failure list, and a retry that applies only to the failures.**

---

# Decision procedures

## Which invite mechanism?

```
Do you know the person's email?
├─ Yes → Email invite with role + destination in the same dialog.
└─ No  → Is the audience "anyone at our company"?
         ├─ Yes, verified domain → Domain auto-join (Notion/Linear "Approved email domains").
         │                         Under SSO/SCIM, this is provisioning, not invitation — hide invite UI.
         └─ No / mixed → Reusable invite link with a Reset button, defaulting to the
                         least-privileged role, plus an admin toggle to disable it entirely.
```

## Which confirmation for a destructive team action?

| Action | Confirmation | Precedent |
|---|---|---|
| Remove a member | Plain confirm naming the person + what they lose | — |
| Suspend a member | Confirm + state: immediate access loss, next billing cycle, **API tokens revoked** | Linear |
| Change team → private | Confirm + enumerate collateral: assignments removed, subscribers dropped | Linear |
| Set link scope to public | Two-step, with an icon change and a live sentence | Figma / Google |
| Delete a team/workspace | **Type the name** | GitHub Danger Zone |
| Transfer ownership | **Re-authenticate** (password/2FA), + name the recipient, + say what you become | Slack |

## Where should this preference live?

```
Is it about one object (a channel, project, repo, page)?
└─ Yes → On the object. A bell / three-way control in context. Do not add a settings row.
└─ No  → Is it about a channel (email/push/in-app)?
         └─ Yes → Global settings, grouped by channel, auto-saved.
         └─ No  → Is it about an event type?
                  └─ Group it into a named category of 3–6 events. If a user needs
                     finer control than the category, the answer is a saved-view
                     subscription (Linear), not a new checkbox.
```

## In-app, push, or email?

| Property | In-app inbox | Push | Email |
|---|---|---|---|
| Addressed to this person specifically | ✓ always | ✓ | ✓ if unread after delay |
| Time-critical (blocks someone) | ✓ | ✓ | ✓ short delay |
| Informational, they subscribed | ✓ | ✗ | digest |
| Informational, they didn't subscribe | feed only | ✗ | ✗ |
| User is actively viewing the object | ✓ (silent) | ✗ suppress | ✗ suppress |
| Already read in-app | — | — | **✗ drop the email** |

## Where each default breaks

Every fork above is a default, and a default with no stated scope is advice you can't argue with — which makes it useless. Each row names a real product where the recommended branch is the wrong one.

| Default | Wrong when | What to ship instead |
|---|---|---|
| **Three roles (Admin / Member / Guest)** | The permission model *is* the product surface. A community platform where the whole point is that moderators, VIPs and boosters have visibly different powers per room; a clinical system where prescriber / nurse / front-desk are legally distinct and an audit says so; a payments back-office with maker-checker separation, where "can initiate" and "can approve" must never be the same role. | Discord's 53-flag model exists for the first case and Discord is right. When roles are the product, ship a role *builder* with a live "what can this role do here" preview, and accept the support cost. |
| **One invite dialog, not a wizard** | The invite triggers an irreversible legal or compliance step: an external auditor entering a workspace under a BAA, a contractor whose access requires a signed NDA, an EU-resident guest in a data-residency-scoped tenant. | Keep the one dialog for internal invites; branch to a second step *only* on the external/regulated path, and say why: "priya@vendor.com is outside Acme. External guests need an NDA on file." |
| **Reusable, rotatable invite links** | The invitee list is the security boundary: a private beta with a hard cap, a financial product where an invite is worth money, anything where a forwarded link is the attack. | Single-use tokens bound to the invited address, plus a resend. The support ticket per person is cheaper than one leaked link. |
| **Two controls: audience × capability** | Audience and capability are genuinely coupled and always will be — a publishing product where "on the web" can only ever mean read-only, or a form product where the public audience gets submit-only. | One control, because the second one has one legal value. Fusing what is actually independent is the sin; splitting what is actually fused invents an unreachable combination the user will hunt for. |
| **Never default to "Anyone with the link"** | Public sharing *is* the job — a screenshot/recording tool, a paste tool, a status page. Defaulting to private there means every user's first action is to fix your default, and the second is to look for a competitor. | Default public, but make the scope legible on the object itself (a persistent "Public" badge on the item, not only in a dialog) and offer a workspace-level admin default that flips it for orgs that need it. |
| **Thread by object (6 comments = 1 row)** | Each event is independently actionable. An approval queue where six line items on one purchase order are six decisions; an on-call system where three alerts on one service are three acknowledgements. | One row per *decision*, not per object. The test: if two events on the same object can be resolved by different people, they are different rows. |
| **Mark read on opening the item** | The "item" is the reading surface. A full-page inbox with a persistent preview pane marks things read by cursoring past them, which is the scroll-marking failure wearing a different hat. | Mark read on dwell (a real threshold, ~2s) or on an explicit action, and keep `u` as the undo. If your layout has a preview pane, opening is not evidence of reading. |
| **Two tabs max** | The inbox is shared. A support or sales team inbox needs Unassigned / Mine / Everyone as tabs, because they are assignment queues with different owners, not filters over one person's attention. | Tabs = queues when the inbox is shared; tabs = 2 when the inbox is personal. Never mix the two models in one list. |
| **Drop the email if it was read in-app** | Email is the system of record. Security alerts, legal notices, billing failures, anything a compliance team will later ask you to produce. | Send regardless, and mark it: "Sent because this is a security notification. These can't be turned off." The dedup rule protects attention; it must not protect you from a subpoena. |
| **Auto-save preferences, no confirm** | The preference has a cost the user can't see. Turning off security-alert email, or muting an on-call channel, or disabling the only channel that reaches you. | Auto-save the ordinary ones. For the load-bearing ones, auto-save *and* state the consequence inline — "You will no longer be paged for production incidents" — with an undo that lives longer than a toast. |
| **Domain auto-join on a verified domain** | The domain is shared with people who aren't staff: an agency where contractors get `@agency.com` addresses, a university, a company that acquired another and inherited its mail domain. | Domain-*request*, with an approval queue, until an admin explicitly promotes the domain to auto-join. Notion's guest-limit behaviour is the cautionary version — over the limit, same-domain guests get silently upgraded to billed members. |
| **Suspend, never delete a member** | A legal deletion request (GDPR erasure) or a jurisdiction that requires it. | Separate the two operations in the UI and name them differently: **Suspend** (reversible, keeps attribution) and **Erase** (irreversible, replaces attribution with a tombstone, type-the-name to confirm, logged). Never let one button mean both. |

---

# The generic version

You can self-diagnose against this. If three or more are true, nobody thought about this flow:

1. **One share dropdown** with fused audience × capability ("Anyone with the link can edit"), and no helper sentence under it.
2. **No pending-invite state.** The member list shows only accepted users; there's no resend, no revoke, and no copyable invite link, so the inviter invites the same person three times.
3. **Roles are a flat alphabetised `<select>`** with no descriptions, so "Admin" is first and everyone becomes one. No scoped role exists, so team leads get workspace admin.
4. **Inherited access is invisible.** The dialog lists three people; forty more have access via the parent folder or the org. Removing someone appears to work and doesn't.
5. **The notification list has no reason line.** Every row says "New activity on Task 42". You must open each one to know if it's yours.
6. **Opening the notification panel marks everything read**, so the badge is permanently zero and carries no information.
7. **Read/unread is the only state.** No Done, no snooze, no unsubscribe, no bulk actions, no undo on mark-all-read.
8. **Preferences are an N×M checkbox grid** of raw backend event names, all on by default, with a Save button below the fold.
9. **The same event arrives four times** — desktop, push, email, badge — with no dedup on read state.
10. **The badge counts feed items,** so it never reaches zero.
11. **Notifications and the activity feed are the same list,** rendered twice with different CSS.
12. **The permission-denied page is a centred lock icon** saying "Access Denied", with no object name, no owner, and no request path.
13. **Gated buttons are fully styled and live**; clicking returns a red "Forbidden" toast.
14. **On mobile, every one of these is the desktop layout at 60% scale.** The share modal scrolls horizontally; the notification panel is a 320px column pinned right; there are no swipe verbs.
15. **No audit log**, or one with no filter for login events, so it's unreadable.
16. **Deleting a member deletes their history**, so old issues show "Unknown user".

---

# Self-check

Run these against your own build.

**Invitations**
- [ ] Paste 12 comma-separated emails into the invite field. Do they become 12 chips? Does one malformed address identify *itself*?
- [ ] Send an invite. Does a Pending row appear immediately, with Resend, Revoke, and a **copyable invite URL**?
- [ ] Assign work to a pending (not-yet-accepted) user. Does the picker offer them?
- [ ] Invite someone already in the workspace. Is the message specific?
- [ ] Invite past your seat limit. Is the cost stated *before* Send?
- [ ] Open the accept link on a phone, logged out, in the Gmail in-app browser.
- [ ] Turn on SCIM in a test workspace. Does the Invite button disappear or explain itself?

**Roles & permissions**
- [ ] Try to demote the last owner. Is the option disabled with a reason, or does it 500?
- [ ] Does every role in the dropdown have a one-sentence description *in the dropdown*?
- [ ] Is there a scoped role, or does "can rename a label" require workspace admin?
- [ ] Downgrade someone. Does the confirm enumerate what they lose?
- [ ] Find a gated button. Is it `aria-disabled` with a reason and a request path — not live-and-403?
- [ ] Can a non-admin member *request* an invite rather than hitting a dead button?
- [ ] Is there a discoverable "who are the admins" surface?

**Share dialog**
- [ ] Are audience and capability two separate controls?
- [ ] Is the current link scope legible without opening any menu?
- [ ] Does a live helper sentence describe the current scope, and change with it?
- [ ] Are inherited grants shown, labelled with their source, and drillable?
- [ ] Do group grants show member counts?
- [ ] Is "can re-share" expressible at all?
- [ ] Does going public require a distinct step (not an adjacent menu item)?
- [ ] At 390px: is it a full-screen sheet with Copy link as a full-width primary and a native role picker?

**Notification inbox**
- [ ] Does every row carry a reason line?
- [ ] Are Done and Read distinct states?
- [ ] Six comments on one issue: one row or six?
- [ ] Does opening the panel mark everything read? (It shouldn't.)
- [ ] Is mark-all-read undoable for 10 seconds?
- [ ] Does a notification pointing at a deleted object render in place, or 404?
- [ ] Do arriving notifications reflow the list under the cursor? (They shouldn't — sticky pill.)
- [ ] Mobile: swipe verbs on the two most common actions, undoable, read state synced with web?
- [ ] Screen reader: does a row announce "Unread" before the content?
- [ ] Is the retention/cap stated somewhere the user can find it — and rendered from *one* string, so the FAQ and the UI can't drift apart?
- [ ] Does each channel row show a sentence describing its current behaviour, not just an on/off dot?
- [ ] Is there a "send test notification" and a sentence about presence-based routing, for the user whose notifications are on and not arriving?

**Preferences & routing**
- [ ] Is the settings page organised channel × volume, not channel × raw event type?
- [ ] Does it auto-save?
- [ ] Deny browser notification permission. Does the in-app toggle admit it's inert?
- [ ] Read an item in-app, then wait for the digest window. Does the email still arrive? (It shouldn't.)
- [ ] Is there a per-object bell so one noisy project can be silenced without a global change?
- [ ] Does every notification email carry an unsubscribe scoped to *that thread*?
- [ ] Does the badge count only actionable inbox items?
- [ ] Is there a pause-with-duration, with a VIP-style exception?

**Failure states (§11)**
- [ ] Let a session expire with the share dialog open, then save. Does the write fail closed, and does the dialog survive re-auth with the change intact?
- [ ] Revoke someone's edit access while they have unsaved text. Do they keep the bytes and get a copy-out?
- [ ] Fail a payment on a paid workspace. Does it degrade to read-only with the amount and deadline named, or does content disappear?
- [ ] Kill the websocket for 60 seconds. Does the inbox say it's stale, does the badge freeze rather than zero, and does triage done offline replay on reconnect?
- [ ] Bulk-invite 12 addresses with 2 bad ones. Do you get a count, a failure list, and a retry scoped to the failures?

**Ownership, deactivation, audit**
- [ ] Does ownership transfer require re-auth and name what the outgoing owner becomes?
- [ ] Does deactivation preserve historical attribution?
- [ ] Does the suspend confirm mention API token revocation and the billing effect?
- [ ] Does the member list filter by Pending / Suspended / Left?
- [ ] Does the audit log let you filter out login/session events?
- [ ] Are these logged: invite, role change, suspension, visibility change, scope→public, ownership transfer, SSO config change, token creation, admin self-join to a private space?

---

# Sources

Walked and screenshotted 2026-09-09. Screenshots in `/Users/ayushgarg/Ayush/UI_Library/.cache/shots/tpn-*` and `<scratchpad>/figma-share-*.png`, `<scratchpad>/gh-*.png`.

**Linear**
- https://linear.app/docs/inbox — Priority/Other tabs with counts, reason lines, the full keyboard verb set (`g i`, `j/k`, `u`, `⌥U`, `h`, `Backspace`, `⇧Backspace`, `⇧S`, `⌘F`), snooze vs reminders, display options, the 2,000-notification cap, "we don't support archiving".
- https://linear.app/docs/notifications — channels as Desktop/Mobile/Email/Slack with green/grey dots; grouped categories you cannot decompose ("You cannot select only status changes"); **email digests only sent if the in-app notification is unread**; thread-mention vs issue-mention subscription split; browser/macOS badge FAQ.
- https://linear.app/docs/invite-members — invite modal anatomy, `Invite as…` + team multi-select, deliverability allowlist, approved email domains + the domain-transfer warning, persistent/reusable invite links with Reset, **Invite & Assign**.
- https://linear.app/docs/members-roles — Workspace owner / Admin / Team owner / Member / Guest; suspend semantics (immediate, next billing cycle, stays in list, tokens revoked); Members page filters; `View workspace admins` in ⌘K and at `/settings/view-admins`.
- https://linear.app/docs/team-owner — scoped ownership; the four configurable per-team toggles; the three team-owner-only operations; non-inheritance to sub-teams.
- https://linear.app/docs/private-teams — visibility change side effects; the admin self-join warning pop-up; Restricted vs Private sub-teams; per-issue sharing out of a private team with a banner naming recipients.
- https://linear.app/docs/pulse — the feed: For me / Popular / Recent, "Popular gives priority to recent updates with emoji or comment engagement"; digest into Inbox ~6:00 AM local; admin default cadence overridden by user; custom feeds unshareable; not available to Guests.
- https://linear.app/docs/project-notifications — personal (Inbox) vs Slack-channel (broadcast) as two separate toggles on one bell.
- https://linear.app/docs/audit-log — 90-day retention, owner-only, IP + country, the filter-out-session-events control, GraphQL for advanced queries, SIEM streaming, entry schema.
- https://linear.app/docs/scim — admins locked out of user management once enabled; temporary manual override; group push 1:1 to teams; name-matching fallback; `linear-owners`/`linear-admins`/`linear-guests`; asymmetric disconnect semantics.

**GitHub**
- https://docs.github.com/.../managing-notifications-from-your-inbox — the five triage verbs with exact retention (Done 5 months, Saved indefinite, the unsave-after-5-months-disappears-within-a-day edge); `is:` query language; 15 custom filter cap; filter creation as promotion of an existing view; grouping by repo/date.
- https://docs.github.com/.../configuring-notifications — inbox/mobile/email as three synced surfaces; email→inbox read sync via image from `notifications@github.com`; participating vs watching; per-repo custom event types; 10,000-repo watch cap.
- Screenshots: `custom-filter-example.png` (default filters 🎯 Assigned / 💬 Participating / ✋ Mentioned / 🙌 Team mentioned / 👀 Review requested with their queries), `triage-multiple-notifications-together.png` (the "2 selected | Done | Unsubscribe | ⋯" bar).
- https://docs.github.com/.../transferring-a-repository — Danger Zone, type-the-name, "I understand, transfer this repository", what transfers, old owner → collaborator, redirects.
- https://docs.github.com/.../roles-in-an-organization — 6 org roles + repo roles + team maintainer + outside collaborators + custom roles.

**Figma**
- https://help.figma.com/hc/en-us/articles/360040531773-Share-files-and-prototypes — full share-modal spec; the annotated screenshots (`article_attachments/35463302707223`, `.../35463302710551`) showing `Share this file` with Copy link in the header, the mixed "Who has access" list with `›` vs `⌄`, and the `Share settings` sub-sheet with Who has access / What they can do / Additional security / Advanced and a Cancel–Save footer; the disabled-public-links troubleshooting entry.
- Seat model (Full / Dev / Collab / View) as a billing axis crossed with the permission axis.

**Google Drive / Docs**
- https://support.google.com/drive/answer/2494822 — General access (Restricted / Anyone with the link) + separate Viewer/Commenter/Editor; "Email people on this file"; advanced settings preventing editors from re-sharing and viewers from downloading; owner name and email visible on link shares; anonymous animals.
- https://support.google.com/drive/answer/6211862 — the request-access flow: what the owner's email carries, the notify-on-decision control, and the documented silent-outcome branch.

**Notion**
- https://www.notion.com/help/sharing-and-permissions — Share/Publish tabs; person rows with a secondary identity line; General access (Only people invited / Everyone at {workspace} + Hide in search / Anyone on the web + Link expires); six access levels including Can edit content and Can create; permission-change requests approvable from the Inbox.
- https://www.notion.com/help/add-members-admins-guests-and-groups — three workspace roles; secret invite link with a disable toggle; allowed email domains; **Temporary member** with expiry ≤1 year not consuming a seat; the guest-request approval queue (requester, role, page, email); pre-invite hover disclosure of member-vs-guest; bulk "Upgrade {#} guest(s) to member" + Suggestions tab; guest-limit failure reasons; 30-day rejoin restore window.

**Slack**
- https://slack.engineering/how-slack-rebuilt-notifications/ — four conflicting mental models; decoupling what from how; the before/after preference schema; read-time migration of "Off" → "Mentions" + push off; auto-save replacing the save modal; **5× settings engagement**, fewer per-channel overrides, "Mentions and DMs" as the predominant default; notifications as a **top-three CX ticket driver**.
- https://slack.com/help/articles/201355156-Guide-to-desktop-notifications — the four-block hierarchy (How to notify you / What to notify you about / Also notify you about / mobile overrides); badge checkbox; mobile timing options and the concrete default (1 min after screen lock, 10 min after cursor inactivity).
- https://slack.com/help/articles/360056534254 — per-conversation All new posts / Just mentions / Mute.
- https://slack.com/help/articles/204401633-Transfer-workspace-ownership — password re-auth, immediate effect, Primary Owner → Owner, must transfer before self-deactivation.

**Discord**
- https://docs.discord.com/developers/topics/permissions — 53 permission flags; role hierarchy by position; the 8-step channel-overwrite resolution order; ADMINISTRATOR bypass.

**Research**
- Bosco, C. et al., "Driven by notifications — exploring the effects of badge notifications on user experience", *PLOS ONE*, 2022. https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0270888 — n = 1,009 analysed (1,095 recruited, 86 excluded), 15 groups of ~73; badge presence increased clicks in **all 15 comparisons, p < .001**; attributed to salience and urgency bias; explicitly does **not** establish user benefit.

**Not reachable**
- Height (height.app) did not respond to headless navigation during this session; its inbox is not covered here from first-hand observation and is deliberately not cited.
- Discord's Help Center (support.discord.com) is behind Cloudflare bot verification; the Discord material above comes from the developer documentation instead.
