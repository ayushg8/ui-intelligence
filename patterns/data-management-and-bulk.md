# Data management, bulk operations, and the file lifecycle

**Evaluated:** 2026-09

Covers: creating records, editing them in place, selecting many of them, acting on many of them,
duplicating, archiving, deleting, restoring, importing, exporting, uploading files, browsing files,
versioning, and audit logs. These are the screens where a product either feels like a tool or feels
like a form someone wired to a database. Everything below was walked in a live product, driven with
Playwright, or read off real in-product screenshots published in a vendor's own help center or
changelog. Sources with what I saw are at the bottom.

---

## If you only get five things right

1. **Undo beats confirm, trash beats undo, and a preview beats all three.** NN/g's guidance on
   confirmation dialogs is that they are only justified for consequences that are serious and
   irreversible, and that overuse trains people to click through them without reading. So the order
   of preference is: make the action reversible (trash), then make it undoable in place (toast with
   Undo), and only then confirm. If you must confirm, the button says the verb — `Delete 12 issues`,
   not `OK`.
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
5. **Creation frequency picks the surface.** Once a month → full page. A few times a session →
   modal. Dozens of times a session → quick-add row that stays focused and keeps accepting input.
   The tell that you got this wrong: a modal that the user opens, fills, submits, and immediately
   reopens.

---

## The reference set

| Product | What it's the reference for | The single thing to steal |
|---|---|---|
| **Attio** (importer) | CSV import, end to end | The **Review values** step: group by distinct value with a row count, render the *mapped* result as real chips, one skip control per value |
| **Carbon / IBM** (DataTable) | Bulk action bar mechanics | The bar **replaces the toolbar row in place** — same height, same y-position — so selecting causes zero layout shift |
| **Uppy** (Dashboard) | File upload states | Status line is three facts joined by `·`: files done, bytes done, ETA. Pause and cancel are separate circular controls |
| **GOV.UK Design System** | Upload errors and a11y | A complete, licensed error-string library, plus the observation that voice-control users can't reach native file inputs |
| **Grist** | Row-level CRUD affordances | Every row context-menu item carries its accelerator; `Duplicate row ⌘⇧D` and `Copy anchor link ⌘⇧A` are first-class |
| **Linear** | Creation and activity hygiene | Property edits in the **first 3 minutes** after creation are folded into "created" and never appear in the activity log |
| **Notion** | Three-state lifecycle | Archive is a real third state distinct from trash; archived items leave views and search but keep their URL |
| **Google Drive** | Delete under shared ownership | Two verbs by permission: `Move to Trash` (owner) vs `Remove` (non-owner, removes from your Drive only) |
| **Figma** | Version history | Restore is non-destructive: it writes **two** checkpoints, one for the pre-restore state and one for the restored state |
| **Airtable** (CSV import extension) | Merge-on-import | Preview counts split three ways: will update / **won't change** / will be created |
| **Dropbox** | Bulk restore | A `Restorations` tab with percentage complete, because restoring 40,000 files is a job, not a click |

---

# 1. Creation: full page vs modal vs inline vs quick-add

### The job
The user wants a new record to exist with the least ceremony that still produces a valid record. The
business wants the record to arrive with enough fields populated to be useful downstream (an issue
with no team, a contact with no email, a deal with no amount are all worse than nothing because they
pollute every view). These conflict directly: every required field you add reduces creation rate,
and every field you drop reduces record quality.

**How the best products resolve it:** they require exactly one field — the title — and make every
other field *editable inline in the create surface* with a sensible inherited default. Linear's
create modal requires only a title; team, status, assignee and project are prefilled from the view
you were looking at when you pressed `C`. The record is valid on arrival because context supplied
the rest, not because the user was interrogated.

### The reference implementation
**Linear.** Four creation entry points with different costs:

- `C` — modal over the current view. Context is inherited from the view.
- `V` — full-screen composer for a long issue with a real description.
- `Option/Alt + C` — create from a template.
- `linear.new` — a URL you can type into any address bar or put in a bookmarklet.

Text selected in the page prefills the new issue's title. Navigating away auto-saves a local
draft that reopens on your next `C`. Pressing `Esc` offers to save a persistent, cross-device draft;
those drafts are kept **6 months** before automatic deletion.

**Grist** is the reference for the other end — the high-frequency end. There is no create modal at
all. The grid's last row is always an empty row; typing in it creates a record. The row context menu
offers `Insert row ⌘Enter` and `Duplicate row ⌘⇧D`, so the two most common creation acts are one
chord each.

### The decisions

| Fork | Pick | Why |
|---|---|---|
| Surface | Frequency decides. <1/session → full page. 1–5/session → modal. >5/session → inline/quick-add | The cost you're optimizing is *re-entry*, not first entry |
| Required fields | Exactly one, and make it the one that names the thing | Every additional required field is a place to abandon |
| Defaults | Inherit from the current view's filters | A user creating from "Team: Platform, Status: Todo" means those values |
| After submit | Quick-add: stay focused, clear the field, keep the row. Modal: close, and toast with a link to the new record | "Create another" as a checkbox is the weak version of a quick-add |
| Draft | Auto-save locally on navigate-away; offer an explicit durable draft on `Esc` | The user who hits Esc by reflex loses nothing |
| Undo | The toast that says "Issue created" should carry the link, not an Undo | Creation is cheaply reversible by deleting; the useful affordance is *going there* |

**Why quick-add beats a modal for high-frequency creation.** A modal costs, per record: one open
animation, one focus transfer, one submit, one close animation, one focus restore, and — critically
— one loss of list context, because the modal covers the list you are adding to. A quick-add row
costs one Enter. At 20 records the modal has burned 20 open/close cycles and hidden the growing list
20 times. The functional test: if a user's natural rhythm is *type, Enter, type, Enter*, a modal
breaks it and a row does not.

### The states
- **Slow save.** Optimistically insert the row with the typed title and a subdued style; do not
  block the input. If the save fails, keep the row, mark it, and put `Retry` on the row itself.
- **Partially complete.** A record created with only a title should be visibly incomplete —
  Attio and Linear render unfilled attributes as light placeholder chips, not as blanks, so an
  incomplete record reads as "unfinished" rather than "broken".
- **Resumed later.** Named drafts with a retention window stated in the UI (Linear: 6 months).
- **Permission wall.** If the user can read the list but not create in it, hide the quick-add row
  and keep the empty state's explanatory copy; do not render a disabled input, which reads as a bug.
- **Duplicate detected.** Attio's importer surfaces this at scale; for single creation, show it as a
  non-blocking inline note under the title field with a link to the existing record.

### The mobile version
Quick-add is the *most* valuable on mobile and the most often dropped. The failure is that the
software keyboard covers the bottom half of the screen, so a bottom-anchored quick-add row must ride
above the keyboard inset (`env(safe-area-inset-bottom)` plus the visual-viewport delta), and the
list must scroll under it. If you cannot do that, use a full-screen composer — never a small modal,
which on a 390pt viewport is a full-screen composer with wasted margins and a broken back gesture.

### Accessibility
- The quick-add input needs a real `<label>`, not just a placeholder; placeholders vanish on input
  and are not reliably announced.
- After a successful inline create, move focus back to the (now empty) input and announce the
  creation in a `aria-live="polite"` region: "Added Acme Corp. 41 records."
- The modal must trap focus, restore focus to the trigger on close, and be labelled by its heading.
- `Esc` must close the create surface. If closing would lose typed content, `Esc` opens the
  save-draft prompt instead of discarding silently.

### Copy
| Situation | Use | Not |
|---|---|---|
| Quick-add placeholder | `Add a company…` | `Enter value` |
| Submit in a modal | `Create issue` | `Submit` / `Save` |
| Success toast | `Created ENG-418 · View` | `Successfully created!` |
| Draft prompt on Esc | `Save this as a draft?` with `Save draft` / `Discard` | `Are you sure you want to leave?` |
| Empty state with create | `No companies yet. Add one, or import a CSV.` | `No data available` |

### How it goes wrong
The generated version puts every field in a modal, marks six of them required with red asterisks,
validates only on submit, shows a single red banner at the top of the modal listing all errors,
closes the modal on success without telling you where the record went, and offers no way to create a
second one except reopening the modal. It has no draft, no keyboard trigger, and the primary button
says `Submit`.

---

# 2. Inline editing

### The job
Change one value without leaving the list you are scanning. The business needs the change to be
attributable, validated, and not accidentally triggered. The conflict: making cells obviously
editable adds visual noise to a table whose whole job is scannability; making them invisible until
hover means keyboard and touch users never discover them.

**How the best products resolve it:** editability is signalled by *hover affordance plus a
persistent structural cue*. Grist and Attio give every cell a hairline grid so cells read as cells
(structural cue), then reveal a chevron or a focus ring on the active cell (hover/focus affordance).
Neither draws a border on every cell all the time, and neither leaves cells looking like static text.

### The reference implementation
**Grist.** Observed live in a public template:

- The active cell gets a **2px green ring**; the active row's number in the gutter inverts to a dark
  chip. Range selection tints all cells in the range a pale green. Three distinct visual states —
  cursor, active row, selection — and they compose.
- The row gutter's active row grows a small chevron (⌄) that opens the row menu. Only the active row
  shows it, so 200 rows do not show 200 chevrons.
- Bottom-right status bar shows `COUNT 12` and `6×3` — the number of non-empty values and the
  selection's dimensions. A spreadsheet convention that costs nothing and answers "what did I just
  select" without a banner.
- Undo/redo arrows live permanently in the app header next to search. Inline edits are undoable by
  `⌘Z` for the whole session, not by a five-second toast.

**NN/g's rule for tables** is the one to hold onto: the row must *look different in edit mode* so
the user can see what is editable and avoid accidental edits.

### The decisions

| Fork | Pick |
|---|---|
| Trigger | Single click focuses the cell (selection); a second click, `Enter`, or typing enters edit. Double-click also enters edit. Never edit on first click — it makes selection impossible |
| Save semantics | **Commit on blur and on `Enter`.** `Tab` commits and advances. Do not require an explicit save button per cell |
| Escape | `Esc` reverts the cell to its pre-edit value and keeps focus on the cell. `Esc` twice clears selection. This must be true even after the field has been edited |
| Validation | Validate on commit, not on keystroke, except for hard input constraints (numeric field refusing letters). Keystroke validation on an email field means the user sees "invalid" for the entire time they type |
| Failure | Keep the typed value in the cell, mark the cell, and put the reason in a popover anchored to the cell. Never silently revert — the user's work disappears and they blame themselves |
| Optimism | Optimistic for scalar values with a rollback on failure. Not optimistic for anything that reorders or refilters the list, because the row jumping under the cursor is worse than a 300ms wait |
| Multi-cell | If the table supports range selection, paste must fill the range and a single edit applied to a multi-row selection must apply to all selected rows — and say so before it commits |

**When inline editing is the wrong answer:** when the field needs more than one control (an address,
a rich description, anything with a dependent field), when editing one field legally requires
re-consenting to something, or when the table is wide enough that the cell you are editing is
horizontally scrolled away from the row's identity column. NN/g's caveat is that inline row editing
works when the table is narrow. Past roughly 8 columns, use a side panel — Attio and Notion both
open a record peek to the right while keeping the row highlighted in the list.

### The states
- **Saving.** A 1px progress hairline under the cell, or nothing at all if the round trip is under
  ~200ms. A spinner inside a table cell at 28px row height is unreadable and shifts layout.
- **Conflict.** Someone else changed the cell while you were editing: keep your text, show both
  values in the popover with `Keep mine` / `Take theirs`. Do not blind-overwrite and do not discard
  the user's typing.
- **Permission wall.** A read-only cell should not accept focus into edit and should show a lock or
  a muted style on hover, with the reason on hover: `Read-only — you have Viewer access`.
- **Formula/derived cell.** Visually distinct (Grist tints these) and not focusable for edit.

### The mobile version
Inline editing in a grid does not survive contact with a 390pt viewport. The pattern that does: tap
a row → full-screen or sheet record view → tap a field → focused editor for that field → back. Two
specific rules: (1) the field editor must open with the keyboard already up and the value selected,
so a re-entry is one gesture; (2) never put a horizontally-scrolling grid with tap-to-edit cells on
a phone — the tap target overlaps the scroll gesture and every edit becomes accidental.

### Accessibility
- The cell is a `gridcell`; entering edit swaps in a real `<input>` and moves focus to it. Announce
  the transition with the field name: "Domain, editing, loom.com".
- Arrow-key navigation between cells is expected in a grid role; when a cell is in edit mode, arrows
  must move the caret, not the cursor. This is the single most-broken part of custom grids.
- The revert-on-`Esc` behavior must be announced ("Reverted to loom.com").
- Never rely on hover alone to indicate editability — keyboard focus must produce the same cue.

### Copy
| Situation | Use | Not |
|---|---|---|
| Commit failure | `Couldn't save — Domain must be a valid hostname.` with `Retry` | `Error updating record` |
| Read-only cell | `Read-only. Ask an admin for Editor access.` | `You do not have permission` |
| Multi-row apply | `Set Status to Done for 12 issues?` `Apply` / `Cancel` | `Apply changes?` |
| Conflict | `Priya changed this to loom.io 4s ago.` `Keep mine` / `Take theirs` | `Conflict detected` |

### How it goes wrong
Every cell is a bordered input, so the table looks like a form. Click-to-edit fires on the first
click so you can never select a row. There is no `Esc`; the only exit is clicking away, which
commits. Validation fires per keystroke and shows a red ring on an empty field. A failed save
silently reverts. Focus is lost to `document.body` after each commit, so keyboard users have to
re-tab from the top of the page.

---

# 3. Selection models

### The job
Express "these ones" precisely and quickly, over a set that may be larger than the screen and larger
than the page. The business needs the resulting action to have an unambiguous scope, because the
difference between "delete the 50 on this page" and "delete all 12,480 matching this filter" is the
difference between a mistake and an incident.

### The reference implementation
**Linear** for the keyboard model, **Gmail** for the scope model, **Carbon** for the visual model.

Linear's selection grammar, from its own docs:

| Key | Effect |
|---|---|
| `↑` `↓` / `J` `K` | Move the cursor (highlight), no selection change |
| `X` | Toggle selection of the highlighted row |
| `Shift` `↑` / `↓` | Extend the selection range |
| `Shift` + click | Range-select from the anchor to the clicked row |
| `⌘/Ctrl` `A` | Select all |
| `Esc` | Clear selection |
| `⌘/Ctrl` `K` | Command bar, now scoped to the selection |

The checkbox is **revealed on hover near the row's left edge**, not rendered permanently. That is
the density decision: a 28px row in a list of 300 does not carry 300 permanent checkboxes.

Carbon's visual model, observed live: the header checkbox goes to an **indeterminate (dash)** state
when a subset is selected — not checked, not empty. Selected rows get a background tint *and* a
checked box with a blue focus ring. Accessible names flip: the header checkbox is `Select all rows`
or `Unselect all rows`; each row checkbox is `Select row` or `Unselect row`.

### The "select all 12,480" problem

There are two different sets and users conflate them constantly:

- **S1** — the rows materialized on this page (typically 25–100).
- **S2** — every row matching the current query/filter/label (can be six figures).

`⌘A` and the header checkbox almost always mean S1, because that is all the client has. The failure
mode is a product that lets `⌘A` silently mean S2, so a user who wanted to delete a screenful
deletes a quarter-million rows.

**Gmail's resolution, and why it's right:** the header checkbox selects S1 and *then* a one-line
band appears above the list offering the widening: a sentence stating that all N conversations on
this page are selected, followed by a link to select all conversations that match this search.
Widening is a second, deliberate, differently-shaped act (a text link, not a checkbox), and the band
also carries `Clear selection` so the widening is reversible in one click. Crucially, the widened
state changes the sentence — you can always read your current scope in plain language.

**The implementation rules:**

1. Never let a single gesture jump from 0 to S2. The widening is always a second act.
2. The widened selection is a **query, not a list of IDs.** Send the filter to the server, not
   12,480 identifiers. This also means the server must resolve the count at execution time — say so:
   `Delete all conversations matching this search (about 12,480)`.
3. Show the resolved number in the destructive verb, not just in the status band.
4. When the selection is a query, **individual deselection must either be supported as an exclusion
   list or explicitly disallowed.** The half-built version — a query-scoped selection where
   unchecking one row silently does nothing — is the worst outcome. Gmail disallows it: unchecking
   any row collapses the selection back to S1.
5. If the widened action will take longer than a few seconds, it is a **job**, not a request. Show it
   as one (see §11 and §13).

### Selection gesture matrix

| Gesture | Meaning | Notes |
|---|---|---|
| Click row body | Open the row (navigate/peek) | Do **not** make body-click toggle selection; it kills the primary action |
| Click checkbox / `X` | Toggle one | Checkbox may be hover-revealed on dense lists |
| Shift + click | Range from anchor to target, replacing the range | Anchor is the last *plainly* clicked row |
| ⌘/Ctrl + click | Toggle one without disturbing the rest | On a table with hover-revealed checkboxes, this must still work |
| Shift + ⌘ + click | Add a range to the existing selection | Rare; ship it only if your users are power users |
| Drag over gutter | Range-select | Linear supports drag; useful with a mouse, hazardous on a trackpad |
| `⌘A` | Select S1 | Never S2 |
| `Esc` | Clear | Must also close any open bulk bar |

### The states
- **Selection survives sort/scroll, dies on filter change.** If the user re-filters, selected rows
  that are no longer visible are an ambush. Either drop the selection and say so
  (`Selection cleared — filters changed`), or keep it and show `3 selected (2 hidden by filters)`.
  Silently keeping hidden selections is how people delete things they cannot see.
- **Selection across pagination.** If you paginate and keep selections across pages, the bar must
  disclose it: `12 selected across 3 pages`.
- **Partial permission.** When the user selects 20 rows but may only act on 14, do not disable the
  whole bar. Enable it and disclose at execution: `Archive 14 of 20 — 6 are locked by another team.`
- **Empty result.** `Select all` on an empty list must be inert, not a bar showing `0 selected`.

### The mobile version
Long-press to enter selection mode, then tap-to-toggle, is the platform convention on both iOS and
Android and users know it. Two rules people break: (1) once in selection mode, tapping a row must
toggle it, not open it — the mode has to actually change the tap meaning; (2) provide an obvious
exit (`Done`/`Cancel` in the top bar), because otherwise users tap Back and lose their place in the
list. Shift-range has no touch equivalent; give a `Select all` in the top bar instead and accept
that fine-grained range selection is a desktop feature.

### Accessibility
- The container is `role="grid"` (or a real `<table>`); rows carry `aria-selected`.
- Announce the count on every change through a polite live region: "3 of 240 selected". Announcing
  every individual row selection is noise; announcing the running count is the useful signal.
- The header checkbox must expose `aria-checked="mixed"` in the indeterminate state, and its
  accessible name must change with its function (Carbon flips between `Select all rows` and
  `Unselect all rows`).
- Hover-revealed checkboxes must be reachable and visible on keyboard focus. This is the most common
  a11y failure of the dense-list pattern.
- Shift-click range selection needs a keyboard equivalent (`Shift`+arrows). Do not ship one without
  the other.

### Copy
| Situation | Use | Not |
|---|---|---|
| Page selection | `All 50 on this page are selected.` + link `Select all 12,480 matching this search` | `Select all` |
| Widened | `All 12,480 conversations matching this search are selected.` + `Clear selection` | `12480 selected` |
| Hidden by filter | `3 selected (2 hidden by current filters)` | *(silence)* |
| Partial permission | `Archive 14 of 20 — 6 are locked by another team.` | `Some items could not be archived` |

---

# 4. Bulk action bars

### The job
Turn a selection into an action with the fewest gestures, while making the scope and the
consequences unmissable. The business needs the destructive members of that set to be recoverable.

### The reference implementation
**Carbon's DataTable batch action bar** — walked live in its Storybook. What it does that most
floating bars don't:

- The bar **occupies the toolbar row**, exactly replacing the row that held search / settings /
  `Add new`. Same height, same position, so selecting a row causes **zero layout shift** and the
  table body never moves under the cursor.
- Left slot: the count only — `1 item selected`, `3 items selected`, correctly singular.
- Right slot: actions as icon+label pairs (`Delete 🗑  Save 💾  Download ⬇`), then a **1px vertical
  divider**, then `Cancel`. The divider is the whole a11y-of-layout argument: `Cancel` is not one of
  the actions, it exits the mode, so it is separated rather than just placed last.
- Deselecting the last row renders `0 items selected` for one frame before the bar animates out —
  the bar transitions rather than unmounting, which prevents a flash of moving table.

**Linear** takes the other approach: bulk actions appear as a floating cluster at the **bottom** of
the viewport, and the real bulk interface is `⌘K`, which opens the command bar already scoped to the
selection. That is correct for a keyboard-first product: the visible bar is a discoverability
affordance for the mouse user, and the command bar is the actual tool.

### The decisions

| Fork | Pick | Reasoning |
|---|---|---|
| Placement | **Replace the toolbar** for tables with a fixed toolbar (Carbon). **Float bottom-center** for full-bleed lists with no toolbar (Linear, Gmail on mobile). Never float top-center over the header — it hides the column labels you are acting on | Zero layout shift is worth more than novelty |
| Contents | Count on the left, 3–5 promoted actions, an overflow `⋯`, then a divider, then Cancel/`Esc` hint | More than five actions and nobody scans them |
| Which actions get promoted | The ones that are *safe and frequent*. Destructive actions go in the overflow, or last with a distinct treatment | A `Delete` button adjacent to `Assign` at the same weight is a trap |
| Count format | `12 selected` while it is S1; `All 12,480 matching this search` when widened | The words carry the scope, the number alone does not |
| Confirmation | None for reversible actions. Toast + `Undo` for soft-destructive. Typed confirmation only for irreversible + irreplaceable | See §7 |
| Progress | If >2s, convert into a determinate progress state in the bar itself (`Archiving… 340 / 1,200`) with `Cancel` | A spinner for a 90-second job is a hang |
| After completion | Clear the selection, keep the list scrolled where it was, and show the result with an undo | Re-sorting the list under the user after a bulk edit is disorienting |

### Bulk edit of heterogeneous items
This is the case that breaks naive implementations: the user selects 12 things that do not share the
same fields (issues from three teams with different workflow states; contacts and companies
together; files and folders).

Rules that work:

1. **Show the intersection, disclose the difference.** Offer only the fields all selected items have.
   For fields whose values differ, render the control with a `Mixed` placeholder rather than the
   first item's value — Figma's inspector convention. Do not show a blank, which reads as "empty".
2. **Setting a Mixed field sets all of them.** Say the count in the control's helper text:
   `Priority — Mixed (12 issues)`. After the user picks a value, the helper becomes
   `Will set for all 12`.
3. **Name what will be skipped, before commit.** `Set Status to Done — 9 of 12. 3 issues are in a
   team without a Done state.` A bulk operation that silently no-ops on a subset destroys trust more
   than one that refuses.
4. **Never invent a field on the target.** If the selection spans two object types, the bulk edit is
   limited to shared attributes; offer a "switch to just Companies" affordance instead of quietly
   applying to a subset.

### The states
- **Partial failure.** The honest presentation is a result summary, not a toast:
  `Archived 1,182. 18 failed.` with `View failures` opening a filtered list. Attio's importer does
  exactly this with a `Filter` control over `Failed` / `Planned` / `Completed` statuses.
- **Slow.** Determinate counter in the bar. If it exceeds ~20s, detach it into a background job with
  a persistent, dismissible progress entity, and let the user navigate away.
- **Resumed later.** A bulk job that outlives the tab must be findable. Attio makes the import a
  first-class addressable object (`Companies / Import / companies-import.csv`) with its own URL,
  progress bar, and attribution line (`Cassandra Beck confirmed less than a minute ago`). Copy that.
- **Permission wall.** See §3 — enable the bar, disclose at execution.

### The mobile version
Bottom bar, above the home indicator, with at most three icon+label actions and an overflow. iOS
convention puts the count in the navigation title (`3 Selected`) and actions in a bottom toolbar;
that split works well because the top bar also holds `Cancel` and `Select All`. Do not attempt a
horizontally scrolling bulk bar — actions off-screen are actions that don't exist.

### Accessibility
- The bar's appearance must be announced: put it in an `aria-live="polite"` region, or make it a
  labelled `role="region"` with `aria-label="Bulk actions"` and move focus to it on first selection
  (only on the *first* selection — moving focus on every toggle is unusable).
- Keep a keyboard path back to the list. `Esc` from the bar clears selection and returns focus to
  the last-selected row.
- Destructive actions in the bar need an accessible name carrying the count:
  `Delete 12 selected issues`, not `Delete`.

### Copy
| Situation | Use | Not |
|---|---|---|
| Count | `12 selected` | `12 item(s) selected` |
| Destructive verb | `Delete 12 issues` | `Delete` |
| After soft delete | `12 issues moved to Trash` · `Undo` | `Deleted successfully` |
| Partial failure | `Archived 1,182. 18 failed.` · `View failures` | `Some items could not be archived` |
| Progress | `Archiving 340 of 1,200…` · `Cancel` | `Processing…` |

### How it goes wrong
A floating pill appears at the top-center covering the column headers. It says `2 items selected`
with a parenthetical `(s)` on every count. It has seven equally-weighted buttons including `Delete`
next to `Export`. The bar is `position: fixed` and pushes the table down 56px on appearance, so the
row under the cursor moves and the user's next click lands on a different row. Deleting shows a
`window.confirm()`. There is no undo, no progress, no partial-failure reporting — 400 rows are
requested, 380 succeed, and the toast says `Success`.

---

# 5. Duplication

### The job
Get a new record that is 90% the same as an existing one, without retyping. The business wants the
copy to be unambiguously distinguishable from the original in every list, forever.

### The reference implementation
**Grist** gives it a keyboard chord (`⌘⇧D`) in the row context menu, next to `Insert row ⌘Enter`.
**Figma** duplicates a *version* into a separate file and is explicit that the duplicate does not
carry comments or version history from the original — the disclosure is the design.

### The decisions
- **Name the copy deterministically and visibly**: `Acme Corp (copy)`, then `Acme Corp (copy 2)`.
  Suffix, not prefix, so alphabetical sort keeps it adjacent to the original. Never duplicate with
  an identical name.
- **Put the new record into edit/rename state immediately** with the suffix selected, so the first
  keystroke replaces it. This is the single highest-value detail and almost nobody does it.
- **Say what did not come along.** Comments, history, permissions, and any external integration IDs
  usually do not copy. A one-line note under the confirmation, or in the new record's empty activity
  feed: `Duplicated from Acme Corp. Comments and history were not copied.`
- **Duplicating a container duplicates its contents** — and if that is >20 items or slow, it is a
  job with progress, not a click.
- **Scroll the new copy into view and select it.** A duplicate that lands somewhere off-screen is
  indistinguishable from a failure.

### How it goes wrong
`Duplicate` creates `Acme Corp` a second time with no suffix, appends it to the end of an unsorted
list, does not scroll to it, and does not tell you that the 14 attached files were not copied.

---

# 6. Archive vs delete vs trash, soft delete, and restore

### The job
The user wants a thing out of their way. Sometimes that means "not current" (archive), sometimes
"gone but recoverable" (trash), and very rarely "actually destroyed" (permanent delete). The
business needs referential integrity, an audit trail, a storage story, and compliance-grade
permanent deletion when asked. Conflating the three is the most common data-lifecycle bug in
software.

### Why trash beats confirm
A confirmation dialog is a question asked at the worst moment (the user has already decided) with
the least information (they cannot see what they are about to lose). NN/g's finding is that
overused dialogs get clicked through without reading — "cry wolf" — which makes them useless
precisely for the case they were built for. Trash inverts this: the action succeeds instantly, the
user gets on with their work, and the recovery path exists for 30 days. The confirmation budget is
then spent only where it counts: `Empty trash`.

### The three states, precisely

| State | Visible where | Editable? | URL alive? | Counts toward quota? | Reversible |
|---|---|---|---|---|---|
| **Active** | Everywhere | Yes | Yes | Yes | n/a |
| **Archived** | Hidden from default views and search; reachable via an explicit filter | Yes (usually) | Yes | Yes | One click, no time limit |
| **Trashed** | A dedicated Trash view only | **No** | Usually no | **Yes** (this surprises people) | Until the retention window expires |
| **Permanently deleted** | Nowhere | No | No | No | Never |

**Notion** is the reference for archive being a genuine third state: archiving marks a page as no
longer current without deleting it; archived pages drop out of database views and out of search
unless you filter content status to include archived; archiving a parent archives its children.
Trash is separate, holds pages **30 days** by default (customizable on Enterprise), and — the
important rule — **a page in the trash cannot be edited until it is restored**. That read-only
constraint is what makes trash safe: it is a freezer, not a drawer.

**Google Drive** is the reference for delete under shared ownership, and it is the case most
products get wrong. Drive uses two different verbs depending on your permission:

- You own it → `Move to Trash`.
- You don't own it → `Remove` (it leaves *your* Drive; everyone else keeps it).

And it discloses the two things users always get wrong: people you shared with keep access until the
file is **permanently** deleted, and **trashed files still count against your storage quota**.
Permanent deletion is behind a two-level path — `Empty trash ›  Delete forever` — so the
irreversible verb requires traversing into a submenu rather than sitting one click from the list.

**Dropbox** holds deleted files **30 days** on standard plans (longer on Professional and team
plans), surfaces them under a `Deleted files` sidebar entry, and — the detail worth stealing —
exposes a **`Restorations` tab showing percentage complete**, because restoring tens of thousands of
files is a long-running job that needs its own object.

### The decision procedure

> **Is the object referenced by other objects, or does it appear in reports/history?**
> → Yes: it must support archive. Deleting it would orphan references.
> → No: skip archive.
>
> **Can a reasonable user regret this within a week?**
> → Yes: soft delete into a trash with a stated retention window, and an undo toast for the first
>   ~10 seconds.
> → No (e.g. dismissing a notification): hard delete with an undo toast, no trash.
>
> **Is permanent deletion legally required (GDPR erasure, PII, secrets)?**
> → Yes: build an explicit `Delete permanently` path, gate it behind typed confirmation, log it in
>   the audit log, and state the propagation delay honestly. Dropbox's help text notes deletion may
>   be temporarily delayed for security; being honest beats claiming instant erasure.
>
> **Is the action irreversible AND irreplaceable (delete workspace, delete production key)?**
> → Typed confirmation: the user types the object's name. Everything less is a reflex click.
> → Otherwise: never a modal. Toast plus Undo.

### The states
- **Undo window.** 5–10 seconds is the norm; make it visible (a shrinking progress rule on the toast
  edge) rather than implied. If the action is bulk, extend to ~15s — reading `12 issues moved to
  Trash` takes longer than reading `Deleted`.
- **Restore into a deleted parent.** The hardest case. Two acceptable answers: recreate the parent
  path (Drive's behavior) or restore to root and say so (`Restored to My Drive — the original folder
  no longer exists`). The unacceptable answer is a silent failure.
- **Restore conflict.** A record with the same unique key now exists. Offer `Restore as a copy`.
- **Bulk restore.** A job with progress and a count, per Dropbox's `Restorations` tab.
- **Retention expiry.** Show it in the Trash list per row: `Deletes in 12 days`. A trash that does
  not tell you the deadline is a trash people never clean.
- **Permission wall.** Dropbox's constraint is the right default: a user with view-only access to a
  shared item cannot restore it. Say which permission is missing.

### The Trash view itself
It is a list, so it needs everything a list needs — and one extra column. From Notion's trash: search
within trash, and filters by `Last edited by`, location, and teamspace. Plus:

- A **`Deletes in N days`** column, sorted ascending by default.
- **`Original location`** as a column, because "where was this" is the primary retrieval question.
- Row actions: `Restore` and `Delete permanently`. `Empty trash` at the top, and *that* is the one
  action in the whole flow that earns a typed confirmation.
- Preview without restoring (Notion lets you open a trashed page read-only).

### The mobile version
Trash is almost always dropped from mobile clients, and it is the platform where accidental deletes
are most likely (fat fingers, swipe gestures). Minimum viable mobile: swipe-to-delete must produce a
toast with `Undo` anchored above the tab bar, and the Trash view must exist in the overflow menu
with `Restore` as a row swipe action.

### Accessibility
- Undo toasts are the classic a11y failure: they appear, are never announced, and disappear before a
  screen-reader user can reach them. Fix: `role="status"` for the announcement, keep the toast
  focusable and reachable via a documented shortcut, and — for destructive bulk actions — *do not*
  auto-dismiss. Leave a persistent `Undo` in the bulk bar until the next action.
- Typed-confirmation inputs need a label that includes what to type and an `aria-describedby`
  pointing at the consequence text, not just a placeholder.

### Copy
| Situation | Use | Not |
|---|---|---|
| Soft delete toast | `Moved 12 issues to Trash` · `Undo` | `Deleted successfully` |
| Trash row | `Deletes in 12 days · Originally in Marketing / Q3` | `Deleted 2026-08-28` |
| Restore | `Restore` | `Undelete` |
| Empty trash | `Empty trash — 1,204 items will be deleted forever. This can't be undone.` Button: `Delete 1,204 items forever` | `Are you sure?` / `OK` |
| Typed confirm | `Type acme-production to confirm` | `Type DELETE to confirm` (a name is specific; a keyword is muscle memory) |
| Non-owner remove | `Remove from your Drive. Others keep access.` | `Delete` |
| Archive | `Archive — hidden from views and search. You can restore it any time.` | `Archive?` |

### How it goes wrong
`Delete` triggers a `window.confirm` reading "Are you sure?". There is no trash, no undo, and no
archive, so users invent one: a `zzz_archive` folder or a `status = "old"` field. Archived items
still show in search. Trashed items are still editable, so someone edits one and it is silently
resurrected — or silently lost. The trash has no expiry column, so it grows to 40,000 items and
nobody dares empty it.

---

# 7. Import — the CSV mapping problem

### The job
The user has a file that came out of another system and wants it to become records here. The
business needs the resulting records to be clean enough not to poison every downstream view, and
needs the user to succeed on the first attempt because a failed import is a churn event during
onboarding.

The conflict is sharp: the user wants "upload and go"; the business needs decisions about
delimiters, headers, types, duplicates, enum values, and dates. **The resolution is not to ask fewer
questions — it is to ask them in an order where each question is cheap and each answer is
verifiable.**

### The reference implementation
**Attio's importer.** Four steps, shown as a numbered breadcrumb across the top with the current
step as a filled blue numeral:

`1 Upload file  ›  2 Map columns  ›  3 Review values  ›  4 Preview import`

**Step 1 — Upload file. The parse receipt.** After the file is chosen, the drop area shows a
resolved file card (`companies-import.csv · CSV Document · 131.1 kB`) and two stat cards:

```
┌──────────────────┐  ┌──────────────────┐
│ ▦ Columns found  │  │ ▦ Rows found     │
│  13              │  │  498             │
└──────────────────┘  └──────────────────┘
```

This is the highest-value-per-pixel screen in the entire flow. If your CSV was semicolon-delimited
or had a preamble row, `Columns found` reads `1` and you know instantly, before you have invested
any effort in mapping. Every importer should have this and almost none do.

**Step 2 — Map columns.** File columns on the left, destination attributes on the right, auto-mapped
where confident, with `+ Create new attribute` for unmapped columns and a data preview of up to 100
sample rows. Attio's own account of it: they analyze the headers *and the entries* in every column
to pick the best-matching attribute — inferring from values, not just header names. Mapping starts
while the file is still uploading in the background, so the user is never watching a bar.

**Step 3 — Review values.** This is the step that separates good importers from the rest, and it is
worth describing precisely because it is unusual.

The pane is **grouped by distinct value, not by row.** Left rail: one card per column showing the
CSV column name over the mapped attribute (`Industries` over `Categories`), selected card ringed in
blue. Right pane: a two-column table headed `Raw data` | `Mapped value`, with a collapsible group
header `Automatically mapped  80`. Each row is:

```
B2B,E-commerce,Enterprise   60 rows   →   ⬡ [B2B] [E-commerce] [Enterprise]      ⊘
Empty                       67 rows   →   ⊘ Skipped                              +
```

- The left side is the literal string from the file plus **how many rows contain it**.
- The right side is the value **as this product will render it** — real category chips in their real
  colors, with a `+1` overflow chip when there are too many. You are previewing the destination, not
  the source.
- A `⊘` per row skips that value without dropping the whole record.
- `Empty` is a first-class value with its own row and a `+` to assign a default.
- A sort control (`⇅ Sorted by Raw value`) toggles to sort by row count, so you can fix the
  highest-impact values first.

**The number that makes this work:** a 34,582-row file had **80 distinct** values in that column.
Reviewing 80 things is possible. Reviewing 34,582 is not. Deduplicating the review by value is the
whole trick, and it is why "just show a preview of the first 10 rows" is not a substitute.

**Step 4 — Preview import.** Object tabs (`Companies` | `People`) because one file can create
records in more than one object. A headline count with a create/update split:

```
34,582 Companies ready for import        + 33,097 created    ↻ 1,485 updated
```

and every row in the preview table carries its own fate glyph in a narrow left gutter (`+` green for
create, `↻` amber for update). Footer: `Back` (ghost) / `Start import` (blue primary).

**Running.** The import becomes an addressable object — breadcrumb `Companies / Import /
companies-import.csv` — with a progress card (`Importing records…  85 / 990 records`), a thin blue
bar, and an attribution line (`Cassandra Beck confirmed less than a minute ago`). Live counters
update during the run (`+ 0 created  ↻ 40 updated  ⚠ 0 failed`) with a `Filter` control to view only
`Failed` / `Planned` / `Completed` rows. Failed rows carry a red icon with the reason on hover. You
can navigate away; it keeps running.

### The complementary reference: Airtable's merge semantics
Airtable's CSV import extension caps at **25,000 rows / 5 MB** and its distinguishing feature is
merge configuration:

- A **merge field** — pick a column with unique values (ID, email). Matching is **case-sensitive**
  but ignores leading and trailing whitespace. (State this rule in the UI; it is exactly the kind of
  thing that silently doubles a customer's contact list.)
- Preview counts split **three** ways: records that will be updated, records that **won't change**,
  and new records that will be created. The "won't change" bucket is the one Attio omits and it is
  genuinely useful — it tells you whether your file is actually new data.
- `Skip blank or invalid CSV values` — a toggle preventing empty CSV cells from blanking existing
  data. Without this, a partial export re-imported wipes fields. Default it **on**.
- `Create missing select options` — gated on Owner/Creator permission, because it mutates schema.
- `First row of CSV file is headers` — auto-detected, user-overridable.

### The decisions

| Fork | Pick | Why |
|---|---|---|
| One page or many? | **Many, as a stepped wizard with a visible breadcrumb.** Four steps is right; five is too many | Each step has a different mental mode; a single page mixes schema decisions with value decisions |
| When to validate | Parse and report *before* mapping (columns/rows found); type-validate *during* value review; dedupe-check *at preview* | Each check happens at the moment the user can act on it |
| Auto-map by header or by value? | **Both.** Header string similarity, then sample-value type inference to break ties | "Signed Up" → Date is knowable from `2025-03-14`, not from the header |
| Review by row or by value? | **By distinct value with row counts.** Always | It is the only thing that makes a 100k-row file reviewable |
| Show raw or mapped? | **Both, side by side**, mapped rendered in destination formatting | The bug is always in the transformation, not the source |
| Where does the file upload happen? | In the background while the user maps | The user should never watch a bar during an import |
| Update vs create | Require a unique attribute; warn loudly when there isn't one (Attio: an avoid-duplicates warning; `Continue without mapping` as the escape) | Duplicates are the #1 import regret |
| Blank handling | Explicit: skip blanks, or write blanks. Default to skip | Silent overwrite-with-empty is data loss |
| Enum values | Offer `Create missing options`, gated on schema permission | Otherwise every unmapped enum becomes a skipped field |
| Cancel/resume | The import is an addressable object with a URL, an owner, and a status. It survives navigation | Large imports outlive attention spans |
| Rollback | At minimum: tag every record with the import id so `filter by import → delete` is one step | A true transactional undo is rarely worth building; a filterable tag always is |

### The states
- **Bad file.** Not a CSV, or zero columns detected. Fail at step 1 with the parse receipt showing
  the problem, and offer a delimiter override rather than just refusing.
- **Slow.** Parsing 200k rows client-side blocks the main thread. Parse in a worker, stream, and show
  the row count ticking up.
- **Partially complete.** Attio's model: statuses per record (`Completed` / `Planned` / `Failed`),
  filterable, with the reason on the failed row.
- **Resumed later.** The import object persists; the object's settings page lists currently-running
  and previous imports.
- **Permission wall.** Creating attributes or enum options usually needs a higher role than creating
  records. Disable those specific controls with the reason inline
  (`Only workspace admins can create new attributes`), not the whole step.

### The mobile version
Do not build a mobile CSV importer. Detect the viewport and say so plainly:
`Importing works best on a larger screen. We'll email you a link.` The one mobile-worthy piece is
*monitoring* a running import — the progress object with counts and a failures list is perfectly
readable on a phone.

### Accessibility
- The step breadcrumb is a `<nav>` with `aria-current="step"` on the active item; each step name is
  a real word, not just a number.
- The mapping UI is two related lists; if you build it as drag-and-drop, a `<select>` per column is
  mandatory as the equivalent — drag-and-drop column mapping with no select fallback is unusable by
  keyboard and by voice control.
- Value-review rows are a table; the `⊘` skip control needs an accessible name including the value:
  `Skip "B2B,Design" (2 rows)`.
- Progress uses `role="progressbar"` with `aria-valuenow`/`aria-valuetext`
  (`"85 of 990 records"`), and completion is announced once, not on every tick.

### Copy
| Situation | Use | Not |
|---|---|---|
| Parse receipt | `Columns found 13` / `Rows found 498` | `File uploaded successfully` |
| Suspicious parse | `We found 1 column. Your file may use semicolons — choose a delimiter.` | `Invalid file` |
| No unique field | `Without a unique column we may create duplicates. Map one, or continue anyway.` | `Warning: duplicates possible` |
| Skip blanks | `Skip blank values — don't overwrite existing data with empty cells` | `Skip blanks` |
| Preview | `34,582 ready to import — 33,097 created, 1,485 updated` | `Ready to import` |
| Running | `Importing 85 of 990 records` | `Please wait…` |
| Result | `Imported 972. 18 failed.` · `View failures` | `Import complete` |

### How it goes wrong
One screen. A file input, an auto-generated set of `<select>` dropdowns labelled with raw CSV
headers, and an `Import` button. No row count, no sample data, no type inference, no duplicate
handling, no enum handling. Dates arrive as strings. Every semicolon-delimited file becomes 498
records with one field. On submit, a spinner for four minutes, then either `Import complete` or a
red banner reading `Error on row 3149: invalid value`, with no way to see which rows imported, no
way to fix row 3149 without editing the file and starting over, and no way to undo the 3,148 records
that did land.

---

# 8. Export

### The job
Get the data out, in a shape another tool can read, without the user having to think about
pagination or their current filters. The business would rather you not export at all, which is
exactly why the exports that exist are usually bad.

### The decisions
- **Export what is on screen, by default, and say so.** The heading of the export dialog should
  restate the scope: `Export 1,204 companies — Q3 pipeline view, 8 columns`. The most common export
  bug is exporting the unfiltered table.
- **Offer a scope toggle**: `Current view (1,204)` vs `All companies (34,582)`. Same S1/S2 problem as
  selection; same resolution.
- **Column selection defaults to the visible columns**, with `Select all` available. Do not export
  47 internal columns because that is what the API returns.
- **Under ~5,000 rows: download immediately.** Over that: generate asynchronously, tell the user
  where it will appear, and email a link. Say which one is happening *before* they click, not after.
- **Format**: CSV as the default, with a note on encoding and separator. If your users are in Europe,
  offer semicolon separation — Excel's locale behavior is the single largest source of "your export
  is broken" tickets.
- **Name the file deterministically**: `companies_q3-pipeline_2026-09-09.csv`. Include the view name
  and the date; never `export.csv` or `download (3).csv`.
- **Log the export.** Exports are the most sensitive read operation in most products; they belong in
  the audit log with row count and requester (see §11).

### The states
- **Async ready.** A persistent entry in a `Exports` or `Reports` area with `Ready · 1,204 rows ·
  expires in 7 days`, not just an email.
- **Expired.** `This export expired. Regenerate` — with the original parameters preserved.
- **Too large.** Refuse with a number and a path: `Exports are limited to 100,000 rows. Narrow the
  filters, or use the API.`

### Copy
| Use | Not |
|---|---|
| `Export 1,204 companies — Q3 pipeline view` | `Export data` |
| `We'll email you when it's ready (about 3 minutes).` | `Your export is being processed` |
| `companies_q3-pipeline_2026-09-09.csv` | `export.csv` |

---

# 9. File upload

### The job
Get bytes from the user's machine into yours, with the user retaining a clear model of which files
made it. The business needs type and size constraints enforced and needs to not pay for 400MB of
someone's raw video.

### The reference implementation
**Uppy's Dashboard**, driven live. Three states, three different headers — this is the pattern:

| Phase | Left slot | Center | Right slot |
|---|---|---|---|
| Files chosen | `Cancel` | `2 files selected` | `+ Add more` |
| Uploading | `Cancel` | `Uploading 2 files` | `+ Add more` |
| Complete | *(empty)* | `Upload complete` | `+ Add more` |

`Cancel` **disappears** on completion — you cannot cancel what is finished, so the control is
removed rather than disabled. Per-file, the circular `✕` remove button in the thumbnail's top-right
corner is replaced **in place, same position, same size** by a green filled check. The eye tracks one
location per file for its status.

The status bar at the bottom during upload is the detail to copy verbatim:

```
◌  Uploading
   0 of 2 files uploaded · 0 B of 3.0 MB · 0s left        (⏸) (✕)
```

Three facts joined by middle dots — **file count, byte count, ETA** — because different users care
about different ones, and because a percentage alone tells you nothing about whether it is stuck.
Pause and cancel are separate circular controls, so pausing a large upload does not require
abandoning it. On completion: a 2px green rule across the top of the bar, a green check, `Complete`,
and a single `Done` button.

(One inconsistency worth not copying: the file card reads `3 MB` while the status bar reads `3.0 MB`.
Pick one precision rule and apply it everywhere.)

**GOV.UK's file upload component** is the reference for errors and for the drop target. Its March
2025 rebuild (GOV.UK Frontend 5.9.0) made the drop zone **bigger, visible at all times, and visually
responsive to interaction** — because the earlier version, which relied on the browser's native file
input, showed **no visual target when you dragged a file over it.** If your drop zone only appears
on `dragenter`, you have shipped that bug: the user must guess where to aim before the target exists.

### The decisions

| Fork | Pick |
|---|---|
| Validate before or after upload? | **Before.** Size and MIME are on the `File` object client-side. Never upload then reject |
| Drop target visibility | Always visible, with a distinct hover/dragover state. Also accept a click, and also accept paste |
| Multiple files | Independent per-file state machines. One failure must not fail the batch |
| Retry | **Per file, on the file's row.** A batch-level `Retry all` is a convenience, never the only option |
| Progress | Determinate per file, plus an aggregate line with count, bytes, and ETA |
| Cancel/pause | Both, as separate controls, for anything over ~10 MB |
| Where the file goes | Show the resolved destination (folder, record) before the upload starts |
| Reuse | Per GOV.UK: within a multi-step journey, don't make people re-upload a file they already gave you unless there's a security reason. Show the previously-uploaded file with `Change` and `Remove` links |
| Chunking/resume | Anything over ~50MB or any mobile upload: resumable (tus/multipart). Mobile connections drop |

### The states
- **Rejected before upload.** The file appears in the list immediately with a red state and the
  reason; it does not vanish. A file that silently never appears reads as a broken drop zone.
- **Failed mid-upload.** Keep the row, keep the progress reached, offer `Retry` on that row.
- **Partially complete batch.** Four green, one red. The summary line must say `4 of 5 uploaded` and
  must not show a green check overall.
- **Slow / stalled.** If bytes stop moving for >15s, change the label from `Uploading` to
  `Connection stalled — retrying…`, and expose `Cancel`.
- **Navigating away mid-upload.** `beforeunload` warning, and if you support resumable uploads, say
  so: `Uploads will resume when you come back.`
- **Duplicate filename.** Offer `Replace` / `Keep both` — never silently version or silently
  overwrite.
- **Virus/scan pending.** A real state on a real timeline; GOV.UK has a dedicated error for an
  infected file.

### The GOV.UK error string library
These are published under the Open Government Licence v3.0 and are the best-tested file-upload error
strings in existence. Use the pattern, substitute your nouns:

| Condition | String |
|---|---|
| Nothing selected | `Select a [thing]` — e.g. `Select a report` |
| Wrong type | `The selected file must be a [types]` — e.g. `The selected file must be a CSV or ODS` |
| Too big | `The selected file must be smaller than [size]` — e.g. `The selected file must be smaller than 2MB` |
| Empty | `The selected file is empty` |
| Infected | `The selected file contains a virus` |
| Password protected | `The selected file is password protected` |
| Upload failed | `The selected file could not be uploaded – try again` |
| Too many at once | `You can only select up to [n] files at the same time` |
| Wrong template | `The selected file must use the template` |

Note what they all share: they name **the selected file** (not "your file", not "the upload"), they
state the constraint as a fact rather than as a prohibition, and they include the actual limit. The
inline error example on the component page is `The CSV must be smaller than 2MB` — the limit is in
the message, not in help text above it.

### The mobile version
On iOS/Android the "file picker" is a system sheet offering Camera / Photo Library / Files, so your
drop zone is decoration and your click target is everything. Rules:
- Make the whole card tappable, minimum 44×44pt, with a label that names the sources
  (`Take a photo or choose a file`).
- Show a thumbnail immediately from the local file, before the upload finishes — this is the single
  strongest reassurance signal on mobile and it costs one `URL.createObjectURL`.
- Assume the upload will be interrupted. Resumable uploads are close to mandatory.
- Never put the progress bar in a toast that auto-dismisses; put it in the list.

### Accessibility
- The visible drop zone must contain a real `<input type="file">`; do not rebuild the button with a
  `<div>` and a click handler.
- GOV.UK's research finding, specific and easily missed: users of **Dragon (voice control)** cannot
  activate a browser's native file input with normal web-page voice commands. Their improved
  component makes voice activation possible, but browser security means it may not work on the first
  or on subsequent interactions in the same page without another input event first. The practical
  consequence: **never make file upload the only path** to a task — offer paste, offer a URL, or
  offer an alternative submission route.
- Per-file progress must be announced sparingly: announce start, announce completion, announce
  failure. Do not announce percentage ticks.
- Errors go in an error summary at the top of the page **and** inline on the file row, with the
  summary item linking to the row (GOV.UK's error-summary pattern).
- The remove control needs the filename in its accessible name: `Remove customers.csv`.

### How it goes wrong
A dashed rectangle that says `Drag and drop files here` and produces no visual response when you
drag over it. Files are uploaded first, then rejected server-side with a toast that says
`Upload failed`. Progress is a single indeterminate bar for all files. One failure in a batch of six
shows one red toast and no indication of which file. There is no cancel. There is no retry except
re-adding the file. The size limit is documented nowhere until it is exceeded, and the error message
is `413`.

---

# 10. File browsers and folder trees

### The job
Find a file among thousands using spatial memory, and move files without losing them.

### The decisions
- **Search is the primary navigation and the tree is the secondary one.** Ship both, and make search
  scope-aware: `Search in Marketing / Q3` vs `Search everywhere`, with the scope visible in the input.
- **Breadcrumbs over a permanently expanded tree** for the main pane; the tree lives in the sidebar
  and is for drag targets and for orientation, not for primary navigation.
- **Drag-and-drop needs a drop-target ring on the folder row and a live count on the drag ghost**
  (`3 items`). A drag with no visible target is how files get lost.
- **Moves must be undoable** — `Moved 3 items to Q3 · Undo` — because "where did it go" is
  unanswerable otherwise. Google Drive's `Move to` dialog with a `Recent` list beats an infinite tree.
- **Sort and view mode are per-folder and remembered.** A user who sets a folder to grid-by-date
  expects to find it that way tomorrow.
- **Lazy-load children, but keep the expanded state in the URL** so a deep link reopens the same
  tree.
- **Show counts and sizes on folders** only if you can compute them cheaply; a folder row that shows
  a spinner for its size is worse than one that shows nothing.

### The states
- **Empty folder** needs a create/upload affordance in it, not a generic illustration.
- **Deep nesting on mobile**: replace the tree with a drill-in navigation stack and a back title that
  names the parent.
- **Permission wall**: a folder you can see but not open should still appear (so the path makes
  sense) with a lock and `Request access`.

---

# 11. Versioning and history

### The job
Answer "what did it look like before, and can I get that back?" without the user having to have
planned ahead.

### The reference implementations
**Figma.** Autosave checkpoints roughly every 30 minutes, **grouped** in the panel with an expand
control so the list is scannable rather than 400 rows long. Named versions are created with
`⌘⌥S`; titles are capped at ~25 characters and descriptions at ~140 so entries stay one line. Each
entry shows name, description, timestamp, and the main contributor's name and avatar.

The decision worth stealing: **restore is non-destructive and it writes two checkpoints** — one
capturing the state immediately before the restore, and one at the restored point. You never lose
the newer work by restoring the older. That is the difference between a version history people trust
and one they are afraid to use.

**Notion.** Retention is the product boundary: **7 days** on Free, **30** on Plus, **90** on
Business, unlimited on Enterprise. A snapshot is written roughly every 10 minutes during active
editing, plus one about 2 minutes after editing stops — so the last thing you did always has its own
version. The panel shows text edits (added / removed / changed) and block-level additions and
deletions side by side. Their honest caveat, which belongs in your UI too: restoring a database can
affect existing views and what other people see.

**Grist's Document History** panel, observed live: a right-side drawer with two segmented tabs,
`Activity` and `Snapshots`. Snapshot rows are grouped under **relative-age headers** (`5 months
ago`, `a year ago`, `2 years ago`) with **absolute timestamps as the row labels**
(`Fri Apr 24, 2026 10:54 AM`) and a `⋯` overflow per row. Relative for scanning, absolute for
deciding — both, in the right places. (It also shows two rows with identical timestamps, which is
the flaw: dedupe or merge identical snapshots.)

### The decisions
- **Two tiers: automatic checkpoints and named versions.** Automatic ones get grouped and expire;
  named ones never expire and sort above or interleave with a distinct marker.
- **Group aggressively.** 200 autosaves is not a history, it's a log. Group by day, then by session.
- **Restore writes forward, never backward.** Two checkpoints, as Figma does.
- **Show a diff, not just a timestamp.** Even a crude one ("12 blocks changed, 3 added") makes the
  list navigable. Notion shows added/removed/changed text inline.
- **State the retention window in the panel**, next to the oldest visible entry:
  `Older versions aren't kept on the Free plan.` Do not make the user find it in pricing.
- **Every version needs an author.** History without attribution answers half the question.
- **Preview before restore**, in a read-only mode, with the current version reachable in one click.

### The mobile version
Notion's own documentation admits version history works differently on mobile and that detailed
version comparison isn't available there. That is the honest trade: on a phone, offer the **list**
and **restore**, drop the **diff**. What you must not do is offer a diff rendered in a 390pt column
as two side-by-side panes — it is unreadable and it makes restore feel unsafe.

### Accessibility
- The version list is a list of buttons, not clickable rows; each accessible name should be
  `Sep 9, 2026 at 10:54 AM by Priya Raman — 12 blocks changed`.
- Diff highlighting must not be color-only: use strikethrough for removals and an underline or a
  marker glyph for additions.
- Restoring is a significant state change — announce it and move focus to the restored document's
  heading.

### Copy
| Use | Not |
|---|---|
| `Restore this version` (button), with subtext `Your current version will be saved first.` | `Restore` |
| `Sep 9, 10:54 AM · Priya Raman · 12 blocks changed` | `Version 47` |
| `Versions older than 30 days aren't kept on your plan. Upgrade to keep all history.` | `Limited history` |

---

# 12. Audit logs

### The job
An admin needs to answer "who did that, when, and to what" after the fact — often under time
pressure, often for a compliance review or a security incident.

### The decisions
- **Every row is `actor · verb · object · timestamp · source`.** The source column (web / API / an
  integration name / an automation) is the one most often omitted and most often needed.
- **Filters must include actor, object type, action type, and a date range**, and they belong in the
  URL so the filtered view can be pasted into an incident channel.
- **Absolute timestamps with an explicit timezone**, plus relative on hover. Audit logs are the one
  surface where "3 days ago" is not good enough.
- **Export is a first-class action**, not an afterthought — and the export itself must be logged.
- **Bulk operations get one entry with a count, plus a drill-in** — 12,000 rows for one bulk archive
  makes the log useless. `Cassandra Beck archived 1,182 companies · via bulk action · view items`.
- **Never log secret values.** Log the fact of a change to a secret, not the before/after.

### The Linear detail worth copying
From Linear's own documentation: property changes made in the **first 3 minutes** after an issue is
created are treated as part of creation and are **not** written to the activity log. Without that
grace window, every issue's history opens with fifteen entries recording the author setting the
fields they were always going to set. A short suppression window is the difference between an
activity feed people read and one they scroll past.

Apply the same idea generally: **collapse or suppress changes that are part of a single user
intention.** Ten property edits in one save is one entry, not ten.

### The states
- **Empty**: `No activity in the last 30 days. Change the date range to see more.` — with the range
  control right there.
- **Retention boundary**: show it explicitly at the bottom of the list, not as a silent truncation.
- **Deleted objects**: the log must still name them (`Deleted company "Acme Corp" (id 8f21…)`), with
  the name captured at delete time, because the object is gone and cannot be dereferenced.
- **Permission wall**: non-admins should see their *own* activity, not a 403. Scoping down beats
  locking out.

---

# Decision procedures

### Which creation surface?

| Creations per session | Surface | Notes |
|---|---|---|
| < 1 | Full page with its own URL | Long forms, drafts, shareable |
| 1–5 | Modal over the list, context inherited from view filters | One required field |
| 5–20 | Quick-add row, focus retained, list visible | `Enter` submits and stays |
| > 20 | Quick-add + paste-multiline + import | Multi-line paste creating N records is the power-user path |

### Delete, archive, or trash?

| The object… | Ship |
|---|---|
| is referenced elsewhere or appears in reports | Archive (+ trash for real deletion) |
| is user content they might regret losing | Trash with a stated window + undo toast |
| is ephemeral (a notification, a filter chip) | Hard delete + undo toast |
| contains PII subject to erasure requests | Trash + explicit `Delete permanently` + audit entry |
| is a container (workspace, project, account) | Typed confirmation naming the object + a grace period before actual destruction |

### Confirm, undo, or nothing?

| Reversible? | Blast radius | Ship |
|---|---|---|
| Yes, in place | 1 item | Nothing |
| Yes, in place | many items | Toast + Undo (15s, do not auto-dismiss for screen readers) |
| Yes, via trash | any | Toast + Undo, and trash as the backstop |
| No | 1 item | Confirmation with the verb and the object in the button |
| No | many items | Confirmation with the resolved count in the button + typed confirmation if irreplaceable |

### Bar placement

| Layout | Bar |
|---|---|
| Table with a persistent toolbar row | Replace the toolbar in place (Carbon) |
| Full-bleed list, no toolbar | Float bottom-center (Linear, Gmail mobile) |
| Board / canvas | Float bottom-center, above any FAB |
| Mobile | Bottom toolbar + count in the nav title + `Cancel` top-left |

---

# The generic version

You can diagnose your own implementation by how many of these are true:

- Creation is a modal with six required fields and a `Submit` button. There is no keyboard trigger,
  no draft, and no way to create a second record without reopening it.
- Every table cell is a bordered input; the table looks like a form. `Esc` does nothing.
- Checkboxes are permanently visible on every row. Clicking the row body toggles selection, so there
  is no way to open a record from the list.
- `Select all` selects the page, but the delete button says `Delete` and deletes the whole query —
  or the reverse, and nobody knows which.
- The bulk bar is a fixed pill at the top that covers the column headers and shifts the table down
  56px when it appears. It reads `2 item(s) selected` and has seven equal-weight buttons.
- Delete opens `window.confirm("Are you sure?")`. There is no trash, no archive, no undo. Users
  have created a `_ARCHIVE` folder to compensate.
- Import is one screen: a file input, auto-generated dropdowns labelled with raw CSV headers, and an
  `Import` button. No row count, no sample rows, no type inference, no duplicate handling. Failure
  is a red banner naming one row.
- Export produces `export.csv` containing the unfiltered table and all 47 internal columns.
- Upload validates server-side. A 40MB file uploads for 90 seconds and then fails with `413`. The
  drop zone gives no dragover feedback. One failure in six shows one toast and no per-file state.
- "History" is a `updated_at` column. There is no audit log, or there is one and it has 12,000 rows
  from a single bulk archive.

---

# Self-check

Run these against your implementation. Each is verifiable in under a minute.

**Creation**
1. Press the create shortcut, type a title, press `Enter`. Did a record appear and is focus back in
   the input, empty?
2. Open the create surface, type, press `Esc`. Was your text preserved or explicitly offered as a
   draft?
3. Create from a filtered view. Did the new record inherit the filter's values?

**Inline edit**
4. Click a cell once. Did it select rather than enter edit?
5. Enter edit, change the value, press `Esc`. Did it revert *and* keep focus on the cell?
6. Force a save failure (offline). Is your typed value still on screen with a reason and a retry?
7. Tab out of a cell. Did it commit and move to the next cell?

**Selection**
8. Shift-click a range. Does the count update in a live region?
9. Select 3 rows, then change a filter so 2 fall out of view. Does the UI disclose it?
10. Press `Esc` with a selection active. Is the selection cleared and the bulk bar gone?
11. Tab through a dense list. Are the hover-revealed checkboxes visible and reachable on focus?
12. Select all on a paginated list. Does the widening to "all matching" require a *second*,
    differently-shaped action, and does the destructive button carry the resolved count?

**Bulk**
13. Select one row. Did anything in the layout move?
14. Trigger a bulk action on 500 items. Is there a determinate count and a cancel?
15. Make 20 of 500 fail. Does the summary say `480 succeeded, 20 failed` with a way to see the 20?
16. Bulk-edit items of two different types. Does the UI show only shared fields, with `Mixed`
    placeholders and a skipped-count disclosure?

**Delete / restore**
17. Delete something. Is there an undo, and does it survive long enough to be read?
18. Open the trash. Does each row show its expiry and its original location?
19. Restore an item whose parent folder was deleted. Does it land somewhere and say where?
20. Try to edit an item in the trash. Is it read-only?

**Import**
21. Upload a semicolon-delimited CSV. Does the first screen tell you it found one column?
22. Import a file with 50k rows and 30 distinct values in an enum column. Are you asked to review 30
    things or 50,000?
23. Import the same file twice. Does the preview say how many will be *updated* rather than created?
24. Kill the tab mid-import. Can you find the import again and see its status?

**Upload**
25. Drag a file over the drop zone. Does the zone visibly respond *before* you release?
26. Choose a file over the size limit. Was it rejected before any bytes moved, with the limit in the
    message?
27. Upload five files with one failing. Is there a retry on that one file's row?
28. Upload on a phone. Does a local thumbnail appear before the upload completes?

**History / audit**
29. Restore an old version. Is the pre-restore state still reachable?
30. Do a bulk archive of 1,000 items. Does the audit log have one entry with a count, or 1,000?
31. Open the version panel on a free plan. Does it state the retention limit in place?

---

# Sources

Walked, driven, or read as real in-product screenshots on 2026-09-09.

**Driven live with Playwright**
- **Uppy Dashboard** — https://uppy.io/ — added three files, uploaded, screenshotted the chosen /
  uploading / complete states. Saw: three-slot header (`Cancel` | `N files selected` | `+ Add more`),
  `Cancel` removed on completion, `✕` → green check swapped in place on each card, status line
  `0 of 2 files uploaded · 0 B of 3.0 MB · 0s left` with separate pause and cancel circles, green 2px
  rule + `Done` on completion.
- **IBM Carbon DataTable — Batch Actions** —
  https://react.carbondesignsystem.com/iframe.html?id=components-datatable-batch-actions--default —
  clicked row checkboxes and the header checkbox. Saw: blue bar replacing the toolbar row exactly,
  `1 item selected` / `0 items selected`, `Delete / Save / Download | Cancel` with a 1px divider,
  indeterminate header checkbox, accessible names flipping between `Select all rows` /
  `Unselect all rows` and `Select row` / `Unselect row`.
- **Grist (public template, anonymous "fiddle" mode)** —
  https://templates.getgrist.com/doc/lightweight-crm — opened the row context menu, shift-range
  selected rows 3–8, opened Document History. Saw: `View as card Space`, `Insert row ⌘Enter`,
  `Duplicate row ⌘⇧D`, `Use as table headers`, `Delete ⌘Backspace`, `Copy anchor link ⌘⇧A`; green
  range tint with an inverted anchor row number; status bar `COUNT 12` and `6×3`; Document History
  drawer with `Activity` / `Snapshots` tabs, relative-age group headers over absolute timestamps,
  and two rows sharing an identical timestamp.

**Real in-product screenshots from vendor help centers / changelogs**
- **Attio importer** — https://attio.com/help/reference/imports-exports/csv-imports/import-data-into-attio-via-csv
  and https://attio.com/blog/the-new-attio-importer-is-here — pulled the source PNGs and read them.
  Saw: the 4-step breadcrumb; `Columns found 13` / `Rows found 498` parse receipt; Review-values pane
  grouped by distinct value with row counts, `Automatically mapped 80`, per-value skip control,
  `Empty 67 rows → Skipped`, `Sorted by Raw value` toggle; Preview with `34,582 ready for import`,
  `+ 33,097 created` / `↻ 1,485 updated` and per-row fate glyphs across `Companies` / `People` tabs;
  running import at `Companies / Import / companies import.csv.csv` with `85 / 990 records`,
  `0 created / 40 updated / 0 failed`, a `Filter` control, and
  `Cassandra Beck confirmed less than a minute ago`.
- **GOV.UK Design System — File upload** —
  https://design-system.service.gov.uk/components/file-upload/ — full-page capture. Saw: the improved
  component (GOV.UK Frontend 5.9.0, March 2025) with an always-visible, interaction-responsive drop
  zone; the note that the earlier version showed no visual target on dragover; the complete error
  string library; the Dragon voice-control limitation; the "let users reuse uploaded files" guidance.
  Content available under the Open Government Licence v3.0.
- **Notion — Delete & restore content** —
  https://www.notion.com/help/duplicate-delete-and-restore-content — full-page capture. Saw: 30-day
  trash default (Enterprise-customizable), trash search with `Last edited by` / location / teamspace
  filters, the rule that trashed pages can't be edited until restored, archive as a distinct state
  hidden from views and search behind a content-status filter, version-history retention of
  7 / 30 / 90 / unlimited days, ~10-minute snapshot cadence plus one ~2 minutes after editing stops,
  and the caveat about restoring databases affecting existing views.
- **Figma — View a file's version history** —
  https://help.figma.com/hc/en-us/articles/360038006754 — full-page capture plus text. Saw: ~30-minute
  grouped autosave checkpoints, `⌘⌥S` named versions with ~25-char titles and ~140-char descriptions,
  non-destructive restore writing two checkpoints, duplicate-a-version producing a new file without
  comments or history, 30-day history on Starter.
- **Google Drive — Delete files** — https://support.google.com/drive/answer/2375102 — full-page
  capture. Saw: `Move to Trash` (owner) vs `Remove` (non-owner), 30-day auto-purge, trashed files
  still counting toward storage, shared collaborators keeping access until permanent deletion, and
  the `Empty trash ›  Delete forever` two-level path.
- **Retool — Table component** — https://docs.retool.com/apps/web/guides/components/table — full-page
  capture. Confirms hover-revealed per-row action buttons and editable columns as the internal-tools
  default.
- **Gmail select-all** — https://mailmeteor.com/blog/how-to-select-all-in-gmail — captured and
  cropped. Confirms the two-step widening: header checkbox first, then a link above the list to
  select all conversations matching the search or label, applied server-side across pages.

**Text / documentation read**
- **Linear — Select issues** — https://linear.app/docs/select-issues — the full selection grammar
  (`X`, `Shift`+arrows, `⌘A`, `Esc`, `⌘K` scoped to selection), hover-revealed checkbox at the row's
  left edge, bulk actions at the bottom.
- **Linear — Creating issues** — https://linear.app/docs/creating-issues — `C` / `V` / `Option+C`,
  `linear.new`, highlighted-text title prefill, local auto-draft on navigate-away, persistent
  cross-device drafts kept **6 months**, and the **3-minute** post-creation grace window excluded
  from the activity log.
- **Airtable — CSV import extension** — https://support.airtable.com/docs/csv-import-extension —
  25,000-row / 5 MB caps; merge field with case-sensitive matching that ignores leading/trailing
  whitespace; three-way preview counts (updated / unchanged / created); `Skip blank or invalid CSV
  values`; `Create missing select options` gated on Owner/Creator; `Create records`.
- **Dropbox — Recover deleted files** —
  https://help.dropbox.com/delete-restore/recover-deleted-files-folders — 30-day standard retention
  (longer on Professional/team), the `Deleted files` sidebar view, the `Restorations` tab with
  percentage complete, `Delete forever`, restore blocked for view-only collaborators, and the
  disclosure that permanent deletion may be delayed.
- **NN/g — Confirmation dialogs** — https://www.nngroup.com/articles/confirmation-dialog/ —
  confirmation reserved for serious irreversible consequences; overuse causes reflex clicking; undo
  preferred; specific verbs on buttons instead of Yes/No.
- **NN/g — Data tables: four major user tasks** — https://www.nngroup.com/articles/data-tables/ —
  checkboxes plus an action group above or below the table; a select-all shortcut when acting on the
  full set is common; **the row must look visibly different in edit mode**; inline row editing works
  only while the table is narrow.

**Dead ends worth recording**
- `support.airtable.com/docs/importing-a-csv-into-airtable` 404s; the live article is
  `csv-import-extension`.
- `linear.app/docs/bulk-actions` 404s; the content lives at `linear.app/docs/select-issues`.
- `react-csv-importer.vercel.app` no longer serves the demo (it resolves to a Vercel marketing page).
- Google help-center screenshots are lazy-loaded placeholders and cannot be pulled by URL.
