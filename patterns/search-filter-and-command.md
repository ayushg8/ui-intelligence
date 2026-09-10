# Search, filtering and command interfaces

**Evaluated:** 2026-09

Walked live: Airbnb search + filter modal (desktop 1440, mobile 390), Linear filters/search docs and
in-product captures, GitHub search results + zero-results + advanced search, react.dev (Algolia
DocSearch) desktop and mobile, Vercel docs ⌘K, Stripe docs search (two queries), Raycast root search
+ manual, VS Code palette on vscode.dev, Newegg faceted results, plus Slack and Notion help
documentation. Measurements below are from those sessions, not from memory. Re-walked 2026-09-09
(review pass at the foot of this file): Airbnb, GitHub, Stripe, Vercel, react.dev and VS Code were
re-measured live; one claim was falsified and rewritten.

---

## If you only get five things right

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

## 1. Search as navigation vs search as query

### The job
Two populations use the same box. The **navigator** knows exactly what they want (`useEffect`,
`ENG-116`, "Billing settings") and is using search as a faster URL bar; their success metric is
time-to-first-result and they will hit Enter on row 1 without reading rows 2–10. The **querier** does
not know what exists and is using search to survey a space; they need counts, facets, sorting and a
results *page* they can refine.

These conflict on one decision: **does Enter navigate or does Enter run a query?** The best products
refuse to choose and give the navigator a top-ranked exact hit that Enter takes, while the querier
gets a "View more results" / "See all results for X" escape into the full page.

### The reference implementation
**Stripe docs search** does the two-population split cleanly in one dropdown (re-verified
2026-09-09). For `refunds` it shows five navigational rows, then a blue `View more results` link,
then a group headed `Ask AI Assistant` with five generated questions, then a group headed
`Code example`. Three answer *types* in one surface, each labelled, each with its own row shape.
Navigator takes row 1; querier drops into the results page or into the AI. `refund` and `refunds`
now return the same five rows in the same order — the index stems, and the highlighter stems with
it, colouring both `refund` and `refunds` in title, snippet and breadcrumb.

The one defect on that surface is in the AI group: the generated questions interpolate the raw
query, so `refund` produces `Can you tell me about refund?` — ungrammatical, and the first row of
the group. If you template a question from user input, either template from the stemmed/expanded
form or write questions that survive any noun (`What can I do with "refund"?`).

**Raycast** is the purest navigator tool: the root list is ranked, the footer names the primary
action for the selected row ("Open Command ↵"), and `⇥` at the right of the input hands the raw query
to Quick AI when nothing in the index matches. The escape hatch is visible before you need it.

### The decisions
- **One box or two?** One box plus scope tokens beats two boxes. Newegg ships both a global search
  field and a second "Search Within:" box above the results; nothing on screen says which one you're
  in after you've typed in one.
- **Does the top hit get a distinct treatment?** react.dev's DocSearch renders the parent page as a
  first-class row and its matching anchors as indented children with a tree connector, so `use state`
  yields `useState` and then `Reference / Usage / Troubleshooting` beneath it. One result, four entry
  depths.
- **Enter on an empty query.** In a docs/app search this should do nothing or open the full results
  page. Never submit an empty query to a results page that then says "0 results for ''".
- **Autodirect to a scope.** Baymard: 46% of sites get "autodirect or guide users to matching
  category scopes" wrong. If the query exactly names a category, offer the category as a row
  (`Category: Gaming Laptops`), don't silently redirect — a silent redirect steals the free-text query
  the user planned to refine.

### The states
- **Slow (>1s):** keep the previous result set on screen, dim it to ~60% opacity, and show a
  determinate-looking progress bar in the input's bottom edge. Never blank the list.
- **Partial:** when one source in a federated search is slow, render the groups that returned and
  show a skeleton *inside* the missing group with its header already present, so the layout does not
  jump when it arrives.
- **Failed:** "Search is temporarily unavailable. Your query is saved — try again." with a retry
  button, and the query still in the field. Baymard: 37% of sites don't persist the query at all.
- **Resumed later:** the query survives back-navigation from a result. This is the single most common
  break — user clicks result 3, hits back, and the box is empty and the scroll position is at the top.
- **Permission wall:** show the result with a lock and the reason, not silence. GitHub logged-out
  renders `0` against Issues, Pull requests, Discussions, Commits, Packages and Wikis in the left
  rail for a query it never ran. Those are unknowns rendered as zeros — a truthful-looking lie. The
  tell that this is a bug and not a policy: on the same rail, `Code` renders `…` instead of a
  number, because that one facet's unknown-ness was modelled. One rail, two conventions for the
  same state (measured 2026-09-09).

### The mobile version
The input is the whole screen. DocSearch on 390×844 opens full-bleed (measured: modal 390×844 at
top 0), replaces the desktop keyboard-legend footer with nothing, and puts a text `Cancel` to the
right of the field — iOS convention, not an `×` inside the field. Row height drops from two lines to
52px single-line. Baymard: 21% of sites still don't put a submit button next to the mobile search
field, which strands anyone whose keyboard doesn't show a Go key.

### The accessibility requirements
The input is `role="combobox"` with `aria-expanded`, `aria-controls` pointing at the popup, and
`aria-activedescendant` naming the highlighted option. Per the W3C APG: "DOM Focus is maintained on
the combobox and the assistive technology focus is moved within the listbox using
aria-activedescendant." Do not move real focus into the list — arrow keys must keep typing possible.
Result count goes in an `aria-live="polite"` region: VS Code renders "2 Results" only to assistive
tech, never visually.

### Copy
- Placeholder that states scope: `Search issues, projects and docs` beats `Search`.
- Vercel's empty-state placeholder is `What are you searching for?` — friendly, but it wastes the one
  line where you could have said what's searchable.
- Result-count line: `1,284 results for "refund policy" in Help Center` beats `Results`.
- Never `Searching…` as the only feedback for over a second with no prior results shown.

### How it goes wrong
The AI-generated version is a single `<input>` with placeholder `Search...`, an `onChange` that fires
a request per keystroke with no debounce and no request-cancellation, results rendered as a plain
`<ul>` of titles with no snippet, no group headers, no keyboard handling, and a hard `No results
found` when the array is empty. It looks finished in a screenshot and fails on the second query.

---

## 2. Instant vs submit: the latency decision

### The job
Every keystroke is a decision about whether to spend a round-trip. Type-ahead trades server cost and
result churn for the feeling that the list is reading your mind.

### The decisions — pick by measured p95, not by taste

| p95 round-trip | Pattern | Feedback required |
|---|---|---|
| < 100 ms | Filter as you type, no spinner, no debounce beyond 1 frame | None. Nielsen: 0.1s is "the limit for having the user feel that the system is reacting instantaneously" |
| 100–400 ms | Type-ahead with 120–200 ms debounce, keep old results visible | Subtle: input-edge progress line only |
| 400 ms–1 s | Type-ahead, 250–300 ms debounce, stale results dimmed | Explicit inline spinner in the field; Nielsen's 1.0s is "the limit for the user's flow of thought to stay uninterrupted" |
| > 1 s | **Submit on Enter.** Stop searching per keystroke | Skeleton rows matching final row height; count appears first |
| > 10 s | Submit + job status | Percent-done and a cancel; past 10s "users will shift attention elsewhere" |

Concrete anchor: GitHub prints its own search time in the results header — `0 results (6 ms) in
facebook/react` on 2026-09-09, `21 ms` on an earlier walk. Publishing the number makes the engine's
speed part of the product's felt quality, and it gives you a reason not to hide a slow query behind
a spinner. It also commits you: a header that has printed `6 ms` for a year cannot quietly start
printing `900 ms`.

**Latency is only the first axis. The second is what a query costs.** The table above assumes a
query is free and side-effect-free. Read the second axis before you apply it:
- **Metered or model-backed** (an LLM re-ranker, a paid API, a per-query-billed warehouse): eight
  queries per intent is eight times the bill. Submit-on-Enter at any latency, or type-ahead against
  a cheap local index with the expensive path behind Enter — this is why Stripe's `Ask AI Assistant`
  rows are rows you click, not results that stream as you type.
- **Audited**: in a tool where every query against customer or patient records is logged for
  compliance, per-keystroke search writes eight audit rows for one human intent and makes the log
  useless as evidence. Submit-on-Enter is a compliance requirement, not a performance choice.
- **Mutating**: if the search path warms a cache, claims a lock, or increments a "viewed" counter,
  it is not a read. Do not fire it on keystrokes.

### More decisions
- **Debounce on the trailing edge only, and cancel in-flight requests.** The classic bug is result
  flicker: request for `re` resolves after request for `refund` and overwrites it. Tag every request
  with the query string and drop responses whose tag ≠ current input.
- **Minimum query length.** 2 characters for prefix/ID lookup (`ENG-`), 3 for full-text. Below that
  show recents, not results.
- **Do not re-run on blur.** A query already run must not fire again when focus leaves.
- **Never move the list under the cursor.** If results reorder while the pointer is over row 2, a
  click lands on whatever slid into place. Freeze reordering while the pointer is inside the list.

### The states
Slow first paint: render the *count* and the group headers before the rows if your API can return
them cheaply — the count is what the querier reads first. Empty-while-loading is worse than
stale-while-loading in every case except when the query changed types (the user switched scope), at
which point stale results are answers to a question no longer being asked.

### The mobile version
Every keystroke costs battery and often runs on a worse network. Raise the debounce to 300–350 ms and
raise the minimum query length by one character. Show the submit button (Baymard: 21% don't) so the
user can force the query rather than waiting for a debounce they can't see.

### Copy
- While loading with stale results on screen: nothing. The dim is the message.
- Cold load: `Searching 12,400 documents…` beats `Loading…` — it says why it's slow.

### How it goes wrong
`useEffect(() => { fetch(...) }, [query])` with no debounce, no abort, no ordering guard. Under a
250 ms network it produces visible result flicker and, on a big corpus, a self-inflicted DDoS.

---

## 3. The result row: what it contains and how it shows the match

### The job
The user is deciding *which one* and *whether any*. Every row must answer: what is it, where does it
live, why did it match, and is it the one I mean.

### The reference implementation
**Algolia DocSearch on react.dev.** Desktop modal measured 768 × 868 px at top 16, rows 52 px
(2026-09-09). Anatomy per row: a 16px type
icon (page vs anchor), the title with matched substrings rendered in link-blue *inline* (not a yellow
background), and a second line giving the parent page as breadcrumb. Related anchors nest under their
parent page with an ASCII-style tree connector, so the result is a small hierarchy rather than five
sibling rows that look like duplicates. The selected row is a full-bleed solid teal band with a `↵`
glyph at its right edge — the row tells you what Enter will do, on the row.

**Stripe docs** adds the third line most products skip: a full breadcrumb path with matched terms
highlighted inside it — `Add payment methods › Wallets › Apple Pay › Apple Pay liability shift,
disputes, and refunds ›…`. That is the "why did this match" answer for a result whose title doesn't
contain the query.

### The decisions
- **Highlight style:** inline colour (react.dev) reads as continuous prose and stays legible in dark
  mode; background highlight (Vercel's amber) is louder and survives low-contrast themes but turns a
  title into a barcode when the query has 3+ tokens. Pick one and use it in titles, snippets *and*
  breadcrumbs — Stripe highlights all three, which is why its breadcrumb is useful.
- **Snippet source:** the snippet must be a window around the match in the *body prose*. Vercel's
  fails this, still, on 2026-09-09: `domain` returns "Domain Management" with the snippet
  `title: domain-management product: vercel url: /docs/rest-api/sdk/examples/domain-…` and "Get
  Information for a Single Domain" with the same shape. Raw frontmatter, indexed as body text —
  two of seven rows. If your indexer eats YAML, your snippets will print YAML.
- **Deduplicate before rendering.** The same query returns "Get availability for a domain" (row 5)
  and "Get availability for a domain (Vercel SDK)" (row 7) with byte-identical snippets — the same
  endpoint documented twice, presented as two answers.
- **Truncate to preserve the match.** react.dev on mobile picks the ellipsis end per row: `use
  state` yields `Comparing useState and use …` (match early, trailing cut) and `… in memory with
  useState` (match late, leading cut) in the same list. Trailing-only truncation hides the very word
  the user searched for.
- **Metadata slots: three, maximum.** Raycast's rows carry exactly icon / command name / owning
  extension / right-aligned type label. VS Code carries category-prefixed name + right-aligned
  keybinding chips. Adding a fourth turns the row into a table with no header.

### The states
- **Result exists but is inaccessible:** show it with a lock icon and `You don't have access — request
  from #team-eng`. Silently filtering it means a user who knows the document exists concludes search
  is broken, and files that as a bug you cannot reproduce.
- **Result is deleted/archived:** Linear's search Display panel has an explicit `Include archived`
  toggle rather than silently including or excluding. Make the choice visible.
- **Too many results:** cap the dropdown at 8–10 rows and make the last row `View all 1,284 results`.
  Stripe shows 5 plus `View more results`. react.dev instead renders an uncapped scrolling list with
  no "see all" row and no results page behind it — defensible for a docs site whose whole corpus is
  the nav, and wrong for anything with a results page worth landing on. Vercel's ⌘K makes the same
  choice with less justification: 7 rows, no escape to a full-results view at all.

### The mobile version
Measured on react.dev at 390×844 (2026-09-09): modal 390×844 at 0,0 — full-bleed, not a sheet; rows
52 px; `Cancel` is a 69×40 text button at x=301, y=12, outside the field, iOS convention rather than
an `×` inside it; the desktop footer legend (`↵ to select / ↓↑ to navigate / esc to close`) is gone,
leaving only the Algolia attribution. Drop to one line plus at most one metadata line. Keep the type
icon: it's the cheapest per-row disambiguator when the title is truncated.

The bug to not copy: the selected row still renders the `↵` glyph at its right edge on a phone,
where nothing can press Enter. Keyboard affordances have to be conditioned on there being a
keyboard, not on the row being selected.

### The accessibility requirements
Rows are `role="option"` inside `role="listbox"`, each with a stable `id` referenced by
`aria-activedescendant`. Highlighted match text must not be conveyed by colour alone — wrap it in
`<mark>` so it carries semantics, and give `mark` a background in high-contrast mode. The breadcrumb
should be inside the option's accessible name (or an `aria-describedby`) so a screen-reader user hears
"useState, Reference, in useState" rather than "Reference" eleven times.

### Copy
- Group headers name the *type*, not the source system: `Issues`, `Documents`, `People`, `Commands`.
- Right-aligned type label on the row (Raycast's `Command`) is worth more than a description when the
  index is heterogeneous.
- `View all 1,284 results` beats `See more`.

### How it goes wrong
Rows are the title only, all identical weight, no icon, no breadcrumb, no snippet; the highlight is a
`<b>` on a naive `String.replace` of the raw query (which breaks on regex characters and highlights
inside HTML attributes); and eight of the ten rows are the same document's eight headings, rendered
flat so the list looks like a stutter.

---

## 4. Scoping: chips, sigils and query language

### The job
The user wants to narrow without leaving the keyboard, and someone else in the same product wants to
narrow without ever learning a syntax. One field has to serve both.

### The reference implementation
**Linear** runs all three at once and they compose. In the search field you type free text and then a
sigil: `android bug @ma` turns `@ma` into a token with its own inset background *inside the input*,
and opens a typeahead grouped under the heading `Assignee` listing `matthijs`, `marcos`, `maya` with
avatars and presence dots. Select one and the token becomes a resolved chip; the free text stays. The
command menu uses single-letter prefixes for type scoping — `i` issues, `p` projects, `u` users,
`t` team, `l` labels, `f` favorites, `d` documents.

**Slack** is the same idea in flat text: `in:` channel/person/section, `from:` display name, `has:`
emoji code, `is:saved`, `is:thread`, `before:` / `after:` / `on:` date, `during:` month or year,
`with:`, `creator:`. Slack's insight is that every modifier is also reachable from a `Filters` control
at the top of the search view, so the syntax is optional, never required.

**GitHub's advanced search** is the third rung: a form where every field's *placeholder is an example
of the syntax it emits* — `github, atom, electron, octokit`; `>YYYY-MM-DD, YYYY-MM-DD`;
`0..100, 200, >1000`; `50..100, 200, <5` — and one field is a sentence with an inline select:
`Return repositories [not ▾] including forks.` Fill the form, and the query string it produced is
what lands in the search box. The form is a syntax tutorial that happens to also run the search.

### The decisions
- **Sigil choice is a keyboard decision.** `@` for people, `#` for tags/channels, `/` for commands,
  `>` for commands in a shared box (VS Code). Don't use `:` as the opening sigil — it collides with
  `key:value` and with emoji pickers.
- **Tokenize in place or lift to a chip?** Lift. A token that stays as raw text (`in:project`) is
  invisible to the eye scanning the field and impossible to remove with one click. Linear's inset
  background inside the input is the minimum; a full chip with an `×` is better.
- **Backspace on a chip deletes the chip, not the character.** First backspace selects the chip
  (visible selected state), second deletes it. One keypress that silently removes a whole
  `assignee:matthijs` gives the user no way to tell an intended edit from a slip, and the undo path
  is retyping.
- **The typeahead for a token value must be scoped and grouped.** Linear heads the dropdown
  `Assignee` — you're not picking a person in general, you're filling a slot.
- **Never require the language.** Every operator needs a pointing device path. Slack's `Filters`
  control and Linear's `F` menu exist so the sigils are an accelerant, not a gate.

### The states
- **Unresolvable token:** `@ma` matching nothing should stay as literal text and search for the string
  `@ma`, with an inline hint `No people match "ma" — searching as text`. Do not blank the results.
- **Ambiguous token:** two people named `maya` → show both with a disambiguator (team, handle,
  avatar), never auto-pick the first.
- **Token whose target was deleted:** render the chip in a muted/struck state with
  `Assignee: (deleted user)` and keep it removable, because the saved view someone shared with you
  still contains it.
- **Pasted query:** if a user pastes `assignee:matthijs label:bug`, parse and lift both into chips on
  paste. This is how people share filters in Slack.

### The mobile version
Sigils are close to useless on a soft keyboard where `@` is a keyboard-switch away and there is no
arrow-key navigation of the typeahead. On mobile, promote the same scopes to a horizontally
scrollable chip rail above the results and let the chips open a sheet. Airbnb's mobile header
collapses the entire `Filters` button into an icon-only control (`aria-label="Show filters"`) and
keeps the scoping chips as a scrollable rail — measured 34px chip height on both breakpoints.

### The accessibility requirements
The token typeahead is a second combobox nested in the first: keep `aria-activedescendant` on the
input, announce the group name in the option's accessible name (`matthijs, Assignee`), and give each
chip a real `<button>` with an accessible name of the form `Remove filter: Assignee is matthijs`.
Announce token creation and removal in a live region — silently mutating the query is invisible to a
screen reader user.

### Copy
- `Filter by assignee` on the group header, not `Assignee` alone, when it's the first time a user sees
  the dropdown.
- Slack-style hint under an empty search: `Try from:@maya in:#eng before:2026-01-01` — a real example,
  not `Use search operators to refine results`.

### How it goes wrong
A single text input where typing `in:project` searches for the literal string "in:project" and returns
nothing, with no hint that the syntax exists; or a query language with no GUI equivalent, documented
only in a help article, so the only people who filter are the ones who read the help article.

---

## 5. Empty state, recents and suggestions

### The job
Between focus and the first keystroke there is a populated dropdown or an empty one, and the choice
costs nothing to make. In a workspace tool the intent at that moment is usually re-access — "the
thing I had open yesterday" — which the product can serve without a query at all.

### The reference implementation
**Notion**: `⌘P` (or `⌘K` when the cursor isn't in a block) opens onto *recently viewed pages*, and
tags rows with `Most viewed` / `Popular this week`. **Raycast**: the pre-typing list is a `Suggestions`
group of five frecency-ranked commands, then `Commands`. **Vercel docs** has no user history when
logged out, so it substitutes eight curated destinations under a `Suggestions` header —
`Vercel.json configuration`, `Database integrations`, `Domains`, `Vercel MCP`, `Vercel cache`,
`Functions and serverless`, `Fluid Compute`, `Vercel CLI`. **Slack** hides recents behind a clock icon
in the search bar rather than showing them by default.

### The decisions
- **Recents beat suggestions when you have them, and 5–8 is the count.** More than eight and the list
  stops being scannable, which is exactly when it should have been a page.
- **Recent *queries* or recent *items*?** Recent items (documents, issues, pages) are more useful in a
  workspace tool because the user's goal is re-access. Recent queries are more useful in commerce and
  research because the user's goal is re-refinement. Linear ships both: the search menu shows "recent
  searches as well as a list of recent issues".
- **Recents must be removable.** One `×` per row, or the list becomes an embarrassment surface (an
  HR document, a private search) the user can't clean.
- **Curated fallback for the cold start.** Never render an empty dropdown. Vercel's logged-out
  suggestions are the right instinct.
- **Never show recents *after* the user starts typing.** They compete with results for the same rows.
  **Scope:** this inverts in commerce and search-first products, where recent and popular *queries*
  are the completion mechanism — the row is a reformulation, not a destination, and it belongs above
  the product results with its own header. The rule holds wherever the rows are objects.

### The states
- **Zero history (new user):** curated suggestions, labelled `Popular` or `Suggested`, never
  `Recent`.
- **History from another device:** if recents are server-side, they'll appear on a fresh device and
  look like someone else's activity. Label the group `Recently viewed` and it reads as correct.
- **Private mode / cleared storage:** fall back silently to curated, no error.
- **Shared or supervised device:** a shared iPad on a shop floor, a clinical workstation, a
  screen-shared demo. Server-side recents become someone else's history on a stranger's screen. Gate
  recents on a per-session identity, and give products with a shared-device deployment a way to turn
  the whole group off — this is the one case where an empty dropdown beats a populated one.

### The mobile version
Recents matter more, not less: typing costs more, so re-access is a larger share of intent. Show them
immediately on focus, above the keyboard, at full row height. Do not require a second tap to reveal
them (Slack's clock icon is the wrong trade on mobile).

### The accessibility requirements
When the popup opens with recents and no query, `aria-expanded="true"` must already be set and the
group must have an accessible label (`Recent searches`). Announce the count on open: `8 recent
searches`.

### Copy
- `Recent` / `Recently viewed` / `Suggested` / `Popular this week` — say which one it is. A single
  unlabelled list of eight rows above an empty query is unreadable.
- Clear-history affordance: `Clear recent searches` at the foot of the group, not buried in settings.

### How it goes wrong
The dropdown does not render at all until the first keystroke, so the highest-value interaction in
the whole feature — "take me back to the thing" — costs a full query.

---

## 6. Zero results as a design surface

### The job
The user has an intent that your index couldn't serve. They will either reformulate or leave. Every
element on this screen exists to make reformulation cost one click.

### The reference implementation
Nobody walked here does it fully. **GitHub** gets the single most important piece right and nothing
else: the header reads `0 results (6 ms) in [facebook/react ×]`, so the scope that was too narrow is
a chip you can dismiss in one click. Then it fails: the body is three *collapsed* accordions —
`Search across repositories`, `Search across an organization`, `Saved searches` — plus `You could try
an advanced search.` Generic advice, collapsed, requiring a click to even read. Baymard's no-results
research is blunt about this: generic search advice alone is insufficient because users "rarely read"
it, and roughly 50% of sites fail to implement any of the five recovery strategies.

### The decisions — build the zero-results page from these five, in this order
1. **Name the constraint that killed it, as a removable control.** `0 results for "useEffect" in
   facebook/react · Issues` where the repo and the type are both chips with `×`. This is the
   highest-yield element and almost nobody ships it.
2. **Did-you-mean, executed not offered.** If the corrected query has results, run it and say so:
   `Showing results for refunds. Search instead for refund.` Baymard: 69% of sites don't offer
   suggestions for closely misspelled queries.
3. **Broaden by one dimension and show the count.** `1,240 results across all repositories →` beats
   "try searching everything". The number is what makes it clickable.
4. **Related categories / adjacent queries.** Newegg does this at the top of *every* results page:
   `Related Searches: budget gaming laptops, gaming pcs, gaming pc`.
5. **A human exit.** Contact/chat/help link, last.

### The states
- **Zero because of filters, not the query:** say so explicitly — `No results with these 3 filters.
  0 of 1,284 issues match.` plus a `Clear all filters` button. Users misdiagnose this as "search is
  broken" constantly.
- **Zero because of permissions:** `No results you can access. 4 results exist in private
  repositories.` Only show the count if leaking it is acceptable in your threat model — state that
  decision explicitly in code, don't let it be accidental.
- **Zero because the index is still building:** `Search is still indexing this workspace (about 4
  minutes left).` A brand-new workspace hitting a cold index and being told "no results" is a
  first-run experience killer.
- **Zero at a specific facet:** never present a facet that yields zero (see §8).

### The mobile version
GitHub at 390 (measured 2026-09-09) does the structural half right and the content half wrong: the
left rail collapses into a single line above the fold — `Filter: [Issues 0 ▾] in [facebook/react ×]`
— so the type facet becomes a dropdown and the scope stays a removable chip, both reachable with one
thumb. Then it spends the entire viewport on the illustration and ships the same three collapsed
accordions, so the recovery actions are below the fold *and* behind a tap. Keep GitHub's rail-to-
dropdown move; put the recovery action (`Clear filters`, `Search all of GitHub`) above the
illustration as a full-width button, not a text link inside a paragraph.

### The accessibility requirements
Announce via `aria-live="polite"`: `No results for refund. 3 suggestions available.` A silent
transition from 10 rows to an empty region is invisible. Move focus nowhere — leave it in the input so
the user can keep editing.

### Copy
- Good: `No issues match "useEffect" in facebook/react. 1,240 issues match across all repositories.`
- Good: `Nothing here with all 3 filters. Removing "Label: Feature" would show 42.`
- Bad, and the default everywhere: `No results found. Try a different search term.` It restates the
  situation and prescribes work.
- Bad: `Your search did not match any issues. You could try one of the tips below.` (GitHub's actual
  string.) "Tips" is the tell.

### How it goes wrong
A centred illustration, the string `No results found`, and nothing else. Or worse, the illustration
plus a bulleted list of search-hygiene advice ("Check your spelling", "Try more general keywords")
that costs a paragraph and yields nothing, while the one filter that caused the zero sits silently in
a sidebar the user has already scrolled past.

---

## 7. Filters: two excellent, opposite solutions

Airbnb and Linear sit at opposite ends of the design space and both are right for their product.

### 7a. Airbnb: the filter sheet (browsing an unknown inventory)

**The job.** The user does not know what's available and does not know what they want; every filter
they set is a hypothesis about inventory that may or may not have supply behind it. The business
needs them to keep going rather than filter themselves into zero results and leave.

**What it actually does** (measured, 1440×900 and 390×844, Sept 2026):
- Results page carries a chip rail under the search bar: `Filters` button (measured 83.6×34px,
  sliders icon) then quick chips at 34px height — desktop order `1+ bathrooms, Free parking, Washer,
  Allows pets, Wifi, Air conditioning, Instant Book, Self check-in, Dryer, Heating`. At 1440 only
  eight fit; the rest are cut off at the right edge with no overflow control and no scroll
  affordance, so `Dryer` and `Heating` exist only at wider viewports. A rail that silently drops
  options by viewport width is a facet set that changes with the window.
- Clicking `Filters` opens a centred modal measured **568 × 820 px, top offset 40px** in a 900px
  viewport — 91% of viewport height, deliberately not full-screen. The results behind are dimmed
  under a scrim rather than hidden: readable as context, not as a live count you can watch update.
  The live count lives on the CTA instead.
- **First control inside the modal is a search field: `Search all filters`.** When the facet set is
  large enough to scroll, search the facets.
- Then `Recommended for you` — the same quick chips as large icon tiles (4 on desktop, 3 on mobile
  where width forces the drop).
- `Type of place` is a 4-way segmented control with `Any` selected by default. The default is a real
  option, not an absence.
- **`Price range` renders a histogram of the actual price distribution behind the dual slider.** This
  is the single best idea on the screen: the control shows where supply is, so you cannot drag into a
  dead zone without seeing it coming. It answers "will this filter kill my results" *before* you apply
  it — which is what facet counts do for enumerable facets and what almost nobody does for ranges.
- Sticky footer: `Clear all` as a plain text link on the left, `Show 1,000+ places` as the filled
  primary on the right. **The result count lives on the CTA and updates live.**
- Sections continue below the fold: `Rooms and beds` (steppers), `Amenities` (with `Show more`),
  `Booking options`, `Standout stays` (Guest favorite / Luxe, each with a one-line explainer),
  `Property type`, `Accessibility features`, `Host language`.

**Why a sheet and not a sidebar:** the filters are numerous (9 sections), mostly *not* in play at once,
and setting them is a deliberate episode, not a continuous adjustment. A modal makes it one task with
one commit point, which is why `Clear all` and `Show N` can be a footer.

**Mobile (measured 390×844, 2026-09-09):** the same sheet at top 12, 390×832 — a near-full-screen
sheet with a 12px inset that keeps the "this is a layer" affordance. Identical footer, `Show 1,000+
places` still the filled primary. `Recommended for you` drops from four tiles to three; `Type of
place` keeps all four segments; the price histogram survives at full width and gains explicit
`Minimum $50` / `Maximum $4000+` numeric fields under the handles, which is the right call — a
20px-wide drag target on glass needs a typed fallback. `Clear all` renders greyed until something is
applied, so the footer never offers a no-op. The `Filters` button in the header becomes icon-only
(`aria-label="Show filters"`) and carries no applied-count badge — the one number the collapsed
control should carry. The results page itself inverts: map on top, listings in a draggable sheet
beneath, chip rail above the map with the last chip clipped mid-word as its scroll affordance.

**States:** `Show 0 places` must never be reachable silently — if a combination yields zero the count
on the CTA says so before you dismiss, which is the whole point of committing the count to the
button. The corollary nobody ships: the CTA count is a query per toggle. Decide what it says while
that query is in flight (keep the last number, dim it — never flash `Show 0`) and what it says when
that query fails (keep the last number and let the user commit anyway; a failed count must not block
applying filters).

**Copy that works:** `Show 1,000+ places` (count + noun on the CTA). `Clear all` (two words, no
confirm). `Trip price, includes all fees` under `Price range` — pre-empts the objection the control
would otherwise cause.

### 7b. Linear: the filter bar (operating a known dataset)

**The job.** The user knows the schema — statuses, assignees, labels, cycles — and is composing a query
they will run many times and probably save. Speed of composition and precision of semantics beat
discoverability.

**What it actually does:**
- Filters render as a horizontal bar of chips above the list, each chip a readable clause:
  `[◎ Assignee] [is any of] [👤👤👤 3 assignees] [×]` and `[Labels] [include] [● Feature] [×]`. The
  chip is subject / operator / value / remove — the operator is a *control*, not a fixed word, so you
  change "is any of" to "is not" without deleting the filter.
- At the right of the bar: `Match all filters` (the AND/OR toggle) and a filter icon for the menu.
  Boolean semantics are on screen, not implied.
- `F` opens the filter menu. Operators per type: `is / is not` for single-select, `is either of / is
  not` for multi, `includes any, all, neither, either, or none` for labels and links, `before / after`
  for dates. Advanced filters compose with AND/OR including nested groups.
- **State is in the URL** — "You can copy the browser address to share the filtered view."
- Ordering is separated from filtering into a `Display` panel: `Ordering: Most relevant / Last updated
  / Last created`, plus `Include archived` and `Display properties`. Filtering changes *which*, display
  changes *how* — different menus.
- `⌘F` is a different feature from `/`: a temporary in-view title filter that doesn't touch the saved
  view. Its exit is worth copying — Linear's docs: "Press Esc to clear the search and show all of
  your issues." `Esc` on a temporary filter restores the full list; `Esc` on a persistent filter bar
  must not, or one keypress discards composed state.

**Why a bar and not a sheet:** filters here are persistent working state, adjusted continuously, and
their exact semantics matter. A modal would hide the current state behind a click; the bar makes the
query legible at rest, which is a precondition for saving it as a view.

**Mobile:** this pattern degrades worst of any in this document. A four-clause filter bar does not fit
390px. The correct mobile translation is a single summary chip — `Filters · 3` — that opens a sheet
listing the clauses vertically, with the AND/OR toggle at the top of the sheet, and the applied
clauses still visible as a scrollable rail when the sheet is closed.

**Copy that works:** the chip reads as English left-to-right. `Assignee is any of 3 assignees` is a
sentence. `assignee: [3]` is a data structure.

### Choosing between them

| Signal | Filter bar (Linear) | Filter sheet (Airbnb) | Sidebar rail (Newegg/GitHub) |
|---|---|---|---|
| User knows the schema | yes | no | partly |
| Filters adjusted continuously | yes | no | yes |
| Operator semantics matter (is-not, includes-none) | yes | no | no |
| >6 facet groups | no | yes | yes |
| Result is a saved/shared view | yes | rarely | rarely |
| Primary device is mobile | no | yes | no |
| Facet counts available cheaply | either | either | yes — the rail's whole advantage |

Read the table as a veto list, not a score: `Primary device is mobile` and `>6 facet groups` each
kill the filter bar outright regardless of how the other rows land, because a four-clause bar does
not fit 390px and a bar with nine groups behind it is a menu with extra steps. Everything else is
weighting. The realistic hard case is a product that scores Linear on every row *and* ships
mobile-first — a field-service or clinical tool where technicians know the schema exactly and work
on a phone. Neither column wins: the answer is Linear's semantics with Airbnb's container — a sheet
whose contents are subject/operator/value clauses, entered from a single `Filters · 3` chip.

Two structural rules that apply to all three: **applied filters are always visible outside the
control that set them**, and **there is always a single `Clear all`**. Newegg violates the first in a
way worth studying — it renders `Department` both as a left-rail list *and* as a chip row labelled
`Filter: [Gaming Laptops] [All Laptop] [Business Laptops]` above the results, two controls for one
filter with no shared selected state visible.

---

## 8. Facet counts, and the zero-count trap

### The job
The count answers "if I click this, will I have anything left?" before the click. That is the entire
value of faceted navigation over a set of dropdowns.

### The decisions
- **Show counts or don't ship facets.** Newegg's rail ships `In Stock`, `Sold by Newegg`, `AI Ready`,
  `Make an Offer`, `New`, `Combo Deals Only` as ON/OFF toggle pills and `Department` / `Brands` as
  lists — with no count anywhere. Every click is a coin flip. (The toggles are separately ambiguous:
  the pill reads `OFF`, which could be state or action.)
- **Counts must be conjunctive with the *other* filters and disjunctive within the same facet.** If
  `Brand: MSI` is selected, the count next to `Brand: ASUS` should be the count *if you also check
  ASUS* (because same-facet selections OR together), while the count next to `Memory: 32GB` should be
  the count *with MSI still applied*. Getting this backwards is the most common facet bug and it
  manifests as counts that don't match the result total after a click.
- **Never render a zero-count facet as clickable.** Options: hide it, or show it disabled with the
  `0`. Hide when the facet list is long and the option is obscure; show-disabled when the option is
  well known and its absence is information ("no 4K models in this price band" is worth saying).
  **Two scopes.** (1) Inside a multi-select facet whose values OR together, a `0` next to an
  unselected value is arithmetically impossible unless that value has no items in the base set at
  all — if you are rendering zeros there, your counts are computed with the wrong conjunction, not
  your inventory. Fix the query before you disable the row. (2) On live inventory — seats, flights,
  on-call slots, ad impressions — a zero is a timestamp, not a fact. Disable it with the count and a
  freshness line (`0 as of 14:32`), and re-enable on refresh rather than hiding the option, or
  users learn the facet list itself is unstable.
- **Never render an *unknown* count as `0`.** GitHub's live bug, re-checked 2026-09-09: logged out,
  the left rail reads `Issues 0 · Pull requests 0 · Discussions 0 · Commits 0 · Packages 0 · Wikis 0`
  for a query it never ran against facebook/react. One row on the same rail — `Code` — renders `…`
  instead, which is the correct treatment sitting three pixels from six wrong ones. Render `—` or
  `…`, or omit the badge; never a number you did not compute.
- **Cap and expand.** Show the top 6–10 values by count, then `Show more` (Newegg's `SHOW MORE`), and
  put a filter-the-facet input above the list once it exceeds ~15 values. Airbnb's `Search all
  filters` is this idea applied to the whole modal.
- **Range facets get a distribution, not a count.** Airbnb's price histogram. A min/max pair of empty
  number inputs is the version with no information in it.

### The states
- **Counts stale while a query is in flight:** dim the counts, keep the numbers. Replacing them with
  spinners makes the rail flash on every click.
- **Count is expensive:** it's legitimate to show counts only for the top facet group and omit
  elsewhere — but be consistent per group, never per row.

### Mobile
Counts move inside the chip: `Brand (3)` on the collapsed chip, full counts inside the sheet. The
applied count on the entry control is the single most important number on the screen — Airbnb's
`Show 1,000+ places` is that number, promoted to the CTA.

### Accessibility
The count belongs in the option's accessible name — `Brand MSI, 412 results` — not as a visually
adjacent `<span>` a screen reader reads as a bare number. Disabled zero-count options need
`aria-disabled="true"` and must stay in the tab order so they can be discovered and understood.

### Copy
`412` alone is fine next to a facet label. `412 results` inside the accessible name. `No results with
this filter` on a disabled zero option, on hover/focus.

---

## 9. Command palettes

### The job
The user wants to do a thing whose name they know without learning where it lives. The failure mode
to resist: the palette becomes the place features go when nobody wants to argue about the
navigation, and the IA never gets fixed because nothing forces it to.

### The reference implementation
**Raycast**, whose ranking is documented precisely. Root search orders by, in strict priority:

1. exact alias match
2. alias prefix match
3. title fuzzy-match score
4. subtitle and keyword matches
5. **frecency** — "The more often, and the more recently, you pick a result *for a given query*, the
   higher it ranks the next time you type the same thing."

That per-query binding in step 5 is the detail almost every clone misses: frecency is keyed to
(query, chosen item), not to the item alone. Typing `s` should converge on *your* `s` command, while
typing `sl` still converges on Slack. Fuzzy matching is subsequence-based (`msg` → Messages, `slk` →
Slack) with a user-tunable sensitivity (High/Medium/Low in Settings → Launcher → Root Search
Sensitivity) — an admission that fuzzy tolerance is a taste, not a constant.

Row anatomy: app icon, command name, owning extension in muted text, right-aligned type label
(`Command`). Groups: `Suggestions` (frecency) then `Commands`. Footer: `Open Command ↵` on the left —
**the primary action, named, for the currently selected row** — and `Actions ⌘K` on the right.

**Nested commands** are the Action Panel: `⌘K` opens a second palette scoped to the selected item,
with its own `Search for actions…` field and fuzzy matching, actions grouped into sections
(Favorites, Configure, Deeplink, Manage), and "The first action in the Action Panel is the primary
action… the action that runs when you press ↵ without opening the panel." Two-level palette, one
mental model, and the top-level footer always tells you what `↵` will do.

**VS Code** is the other canonical implementation and differs in instructive ways. Measured on
vscode.dev: the widget is **602px wide, anchored 6px from the top of the window** — not centred
vertically, because it must not cover the editor. `⇧⌘P` is `⌘P` pre-filled with `>`; `?` in the empty
field lists every prefix mode; `@` jumps to symbols, `:` to a line number. One widget, many modes,
selected by first character. Rows are `Category: Command Name` with keybinding chips right-aligned as
individual key caps (`⇧ ⌥ ⌘ G`), and a gear icon appears on the selected row only, for rebinding.

Two VS Code behaviours worth copying and one worth avoiding:
- **Copy:** commands are filtered by context. With no folder open, `format` returns exactly two rows
  — `File: Save without Formatting` and `Remote Repositories: Export Debug Information` — because
  every actual formatting command's precondition was unmet and it was hidden, not disabled. In a
  palette that's right: the palette is a search over verbs, and a disabled verb is a wrong answer.
- **Copy:** the list shrinks to the height of its content — measured 2026-09-09, the widget goes
  from 602×407 on the empty palette to 602×93 on a two-result query, so "almost nothing matched" is
  legible from the shape before you read a word.
- **Avoid:** matching is naive substring, so `format` also returns `Remote Repositories: Export Debug
  In**format**ion`. On a two-result list that's 50% noise.

### What belongs in a palette
- Every verb the app can perform, including ones with no UI entry point.
- Navigation targets (files, issues, pages, settings screens) — but *labelled by type*, and ranked
  below exact command matches, or the palette becomes a search box that occasionally runs commands.
- Recently used items, pre-typing.
- Not: destructive actions without a confirm step; not settings toggles whose current state you can't
  see (a palette row that says `Toggle sidebar` without saying which way it will go is a coin flip);
  not anything requiring more than one argument, unless you support inline arguments (Raycast focuses
  the first argument field when you type an alias followed by a space).

### Showing shortcuts
Right-align the keybinding on the row, as separate key caps, always — this is the palette's second
job. Every time a user runs a command from the palette and sees `⇧⌥⌘G` next to it, that's a free
lesson. A palette that doesn't display shortcuts trains people to keep using the palette.

### When a palette is a crutch
Diagnostic questions, answered honestly:
- Can a new user complete the top three jobs without the palette? If no, the palette is load-bearing
  navigation and the IA is broken.
- Is any command in the palette *only* in the palette, and used weekly by most users? That's a
  missing button.
- Does the palette contain more than ~15 items whose names begin with the same generic verb
  (`Toggle…`, `Show…`)? That's an unmodelled settings surface.
- Is the palette the only place a feature is announced? Then that feature has no discovery path at
  all.

Vercel's docs `⌘K` shows the discipline from the other side: it wears a palette's clothes
(placeholder `What are you searching for?`, an `Esc` pill inside the input) and contains no commands
at all — one `Results` group of documents. It is a search box on a palette shortcut, and it doesn't
claim otherwise. Borrowing `⌘K` does not oblige you to invent verbs to put behind it.

### The states
- **Slow index:** render the palette instantly with recents, and stream results in. The palette must
  never wait on the network to appear — its whole value is that it opens in one frame.
- **Command unavailable in context:** hide it (VS Code) or show it with the reason
  (`Merge — requires write access`). Never a silently inert row.
- **Command needs an argument:** transition the palette into an argument step with the command name
  pinned as a breadcrumb chip in the input, and `Esc` or backspace-at-position-0 returning to the
  command list — not closing the palette. `Esc` that discards the whole palette from a sub-step
  throws away the command the user already found.
- **Action failed:** see §10 — the palette has closed by then, so the error has to find the user
  somewhere else.

### The mobile version
Command palettes are a keyboard-first pattern and mostly should not exist on mobile. The honest
translation is a full-screen search sheet with the *navigation* half of the palette and the top 5–8
*actions* as a horizontally scrollable row of chips at the top, sized for touch. Don't ship a 602px
centred box with a keyboard-hint footer to a phone — and if you ship the sheet, strip the `↵` glyphs
and shortcut chips with it, which is exactly the step react.dev's mobile DocSearch skips.

**Scope:** two mobile contexts do want the real thing. A tablet with a hardware keyboard attached
(detectable — a physical keyboard changes the visual viewport behaviour on focus) should get the
desktop palette, shortcut chips and all. And a conversational or agent surface, where the input is
already a text field the user types intent into, is a palette by another name; there the right move
is inline command suggestions in the composer, not a second modal on top of it.

### The accessibility requirements
- `role="combobox"` on the input; `role="listbox"` on the list; `aria-activedescendant` for the
  highlighted row; DOM focus stays in the input throughout.
- `Esc` closes and returns focus to the element that opened the palette — this is a hard requirement,
  not a nicety, and it is the most frequently skipped one.
- Focus trap while open; the rest of the page gets `aria-hidden` or `inert`.
- The keyboard shortcut that opens it must not be the only way in: ship a visible affordance
  (Vercel's `Search Docs ⌘K` in the sidebar; Raycast's menu bar icon).
- Announce result counts through a live region on each query change, throttled to ~500ms so a fast
  typist isn't machine-gunned.
- Grouped lists need `role="group"` with `aria-labelledby` pointing at the visible group header, or
  screen reader users hear 30 undifferentiated options.

### Copy
- Placeholder: `Search for apps and commands…` (Raycast) — names both halves of the index.
- Footer: `Open Command ↵` / `Actions ⌘K` — verb, not `Enter to select`.
- Row: `Created Issues · Linear` — item plus source. Never a truncated sentence.
- Group headers: `Suggestions`, `Commands`, `Results`, `Ask AI Assistant`, `Code example` — a noun for
  the *kind of answer*.

### How it goes wrong
A `⌘K` modal containing eleven hardcoded navigation links, no recents, no frecency, no shortcuts
displayed, `filter(item => item.title.toLowerCase().includes(q))` as the entire ranking algorithm, no
`Esc` handling, focus never trapped, and — the tell — the same eleven links that are already in the
sidebar three pixels away.

---

## 10. Failure states: everything after the first successful query

The per-section state notes above cover the happy-ish path. These are the ones that decide whether
people trust the feature, and they are all downstream of one line of code: `if (results.length === 0)`.

### Empty, forbidden, and broken are three different screens
An empty array, a 403, and a 500 collapse into `No results found` whenever the client branches on
array length instead of on the response. They need different words, different recovery, and
different instrumentation:
- `200 []` → zero-results surface (§6), with the constraint chips.
- `401` → keep query and chips on screen, re-auth in place, re-run.
- `403` → `No results you can access` plus, if your threat model allows the number, how many exist.
- `429` → see below; not an error screen, a mode change.
- `5xx` → `Search is unavailable. Your filters are saved.` with a retry button and an error ref.
Log them as separate events too, or your "zero-result rate" dashboard is silently measuring outages.

### Read-after-write: the index doesn't have it yet
A user creates an issue, searches for it four seconds later, gets nothing, and concludes search is
broken. Any index that isn't synchronous with the write path owns this. Two cheap fixes: merge
recently created objects from the local store into the result set client-side before render, and
when a zero-result query is younger than your known index lag, say `Indexed up to ~15 seconds ago —
items created just now may be missing` instead of `No results`. Never tell a user "no results" about
an object the same session just created.

### Session expiry mid-composition
Four chips set, forty seconds of work, token expires. Ranked by how often it actually ships: bounce
to login and lose the filters; render zero results because the 401 body parsed as an empty list;
render the previous results forever because the error was swallowed. Correct behaviour is a
re-auth-in-place that keeps the query and chips visible behind it and re-runs the same query on
success. Rule 4 is what makes this survivable — if the filters are in the URL, the login round-trip
returns to them for free, and the recovery is one redirect rather than a state-restoration feature.

### Rate limiting is a mode change, not an error
Type-ahead is a rate-limiter magnet: one fast typist on a slow debounce can trip a per-user quota in
seconds. On 429, stop retrying per keystroke, switch the field to submit-on-Enter for the rest of
the session, and say so — `Searching as you type is paused. Press Enter to search.` Silently
dropping requests produces a field that looks like it works and shows the wrong results, which
costs more trust than a visible degradation. The same applies to a streaming/AI answer row: a
rate-limited stream that stops mid-sentence must say it stopped, not sit there looking thoughtful.

### A filter value that stopped existing
Saved views and shared URLs outlive their referents: the label is deleted, the assignee is
deactivated, the project is archived, the custom field is removed. Three failures to avoid — 404 the
whole view; silently drop the clause, so the view now returns a different set than its author saw
with nothing on screen saying why; or throw on the null lookup. Correct: keep the clause, render it
struck-through as `Assignee: (deleted user)`, put one line above the results — `1 filter no longer
exists` — and keep it removable.

### A shared filter URL the recipient can't fully run
`assignee:matthijs team:security`, pasted into a channel, opened by someone with no access to
`security`. Do not silently narrow to what they can see: their count then disagrees with the
sender's and neither party can work out why. Say `Showing 12 of 47 — 35 are in teams you don't have
access to.` Whether that 35 is safe to disclose is a threat-model decision; make it deliberately and
per facet, because "how many results exist that I can't see" is itself an information leak in some
products and table stakes in others.

### Partial failure in a federated search
One of five sources times out. Rendering the four that returned and dropping the fifth silently is a
correctness bug dressed as a layout: absence reads as "there are none." Keep the group header,
render `Couldn't reach Documents — Retry` inside it, and exclude that source from every total you
print. A count that silently excludes a failed shard is worse than no count.

### The palette action that fails after the palette closed
A palette is optimistic by construction — it closes on Enter, so every error lands somewhere the
user is no longer looking. Errors from palette actions need a toast naming the command and the
object count (`Couldn't archive 3 issues — no permission in ENG`), undo where the action is
reversible, and — for anything destructive or multi-object — a confirm step *inside* the palette
before it closes, never a toast afterwards. If the action is long-running, the palette is the wrong
place to report it: give it a real progress surface.

### Offline and flaky
Offline: keep the last result set, badge it `Offline — showing results from 2 minutes ago`, queue
nothing. Flaky: one failed request inside a type-ahead stream must never clear the list — only a
failure of the *current* query is allowed to change what's on screen, which is the same
request-tagging discipline that prevents stale-result flicker (§2).

### Failure copy rules
- Name what failed and what survived: `Search is down. Your filters are saved.`
- Never blank the field. Baymard: 37% of sites drop the query on error.
- Retry is a button. "Please try again later" without one is a shrug.
- Give the error an identity when someone will report it — `Search failed (ref 8f2a)`. A ticket that
  says "search didn't work" costs an hour that a ref number costs a minute.

---

## Decision procedures

**Which search surface?**
- Result set is one type and under ~50 items → inline filter-as-you-type over the rendered list, no
  modal.
- Result set is one type, large, and users refine → results *page* with facets and URL state.
- Multiple types, and the job is "go to a thing" → dropdown/palette with type groups, capped at 8–10
  rows plus `View all N results`.
- Multiple types, and the job is "survey what exists" → results page with a type facet carrying
  counts.

**Instant or submit?** Measure p95 of the query path, then read the table in §2. If you can't measure
it, you're not ready to choose; ship submit-on-Enter, which fails gracefully at any latency.

**Chips, sidebar, sheet or language?**
- ≤4 facets, ≤6 values each, adjusted often → chips inline above the results.
- 5–12 facets with counts, desktop-primary → sidebar rail.
- >6 facet groups, or mobile-primary, or filtering is an episode not a habit → sheet/modal with a
  live count on the CTA.
- Users know the schema and save/share queries → filter bar with explicit operators + URL state +
  saved views.
- Add a query language only *on top of* one of the above, never instead of it.

**Does this command belong in the palette?** Is it a verb? Does it work from anywhere, or can its
context be checked? Would a user plausibly know its name before knowing its location? Three yeses →
palette. Otherwise it's a button somewhere.

### Where each of these forks is wrong

Every branch above has a product it gives bad advice to. Check yours against these before following
one.

- **"Under ~50 items → inline filter-as-you-type."** Wrong when the 50 rows are wide and expensive
  to render (a table with sparklines, a board with covers) or when the list is virtualised over a
  server-paged source that only *looks* short. It is also wrong when the 50 items are not all
  loaded — filtering the page you have while telling the user you filtered the set is the worst
  version of this control. Scope: fewer than ~50 items **that are all in memory**.
- **"Multiple types + go-to-a-thing → dropdown/palette."** Wrong when the types have wildly
  different result densities. A workspace with 40,000 messages and 40 projects will show ten
  messages and no projects on every query unless you reserve slots per group. Cap per group before
  you cap the list.
- **"Measure p95, then read the table."** Wrong whenever a query is not free — metered, audited, or
  side-effecting (see §2). Latency chooses the interaction only when cost per query is ~0.
- **"≤4 facets adjusted often → chips inline."** Wrong when the four facets are dependent — pick a
  country and the state list changes. Dependent facets need an ordered form or a sheet, because
  inline chips imply the options are stable and independent.
- **"Users know the schema and save queries → filter bar."** Wrong on a phone, and wrong when the
  saved query is the deliverable rather than the workspace (a report builder, a segment definition):
  those want a named, versioned, validated object with a preview count, not a bar you can nudge by
  accident.
- **"Add a query language only on top of a GUI."** The exception is a product whose users arrive
  already fluent in a syntax you'd be foolish to replace — log search, SQL-adjacent tools, anything
  where the query is pasted from a runbook. There the text field is primary and the GUI is the
  scaffold for newcomers, which inverts the build order but not the rule that both must exist.
- **"Recents beat suggestions."** Wrong on shared and supervised devices (§5), and wrong at cold
  start, which is most of your evaluation traffic.
- **"Hide inapplicable commands (VS Code)."** Wrong when the command's precondition is *the thing
  the user is trying to fix*. Hiding `Connect to database` because there's no connection teaches
  nothing; showing it with `— no database configured` is the discoverable version. Hide when the
  precondition is ambient and obvious, name the reason when the precondition is the user's problem.

---

## The generic version

You can diagnose thoughtless work from these traits alone:

- One `<input placeholder="Search...">`, no scope named, no shortcut hint, no `/` or `⌘K` binding.
- A request per keystroke, no debounce, no cancellation, results that flicker between two queries.
- Results are titles in a `<ul>`: no icons, no type labels, no breadcrumbs, no snippets, and
  highlighting that is a naive `replace()` on the raw query, or absent.
- Filters are `<select>` dropdowns in a row. Nothing shows what's currently applied except the
  dropdowns themselves, which are off-screen once you scroll. No `Clear all`.
- Facets have no counts, so users click into zero results repeatedly and conclude the catalogue is
  empty.
- Filter state is component state. Refresh, back and share all lose it. The URL is `/search`.
- Zero results is a centred illustration and `No results found. Try a different search term.` The
  filter that caused the zero is not mentioned or removable.
- `if (!results.length) return <NoResults/>` — so an outage, a permission wall and an honestly empty
  result set all render the same screen, and the zero-result metric doubles as an uptime blind spot.
- Arrow keys do nothing; `Enter` submits a form and reloads the page; `Esc` does nothing; focus is
  never returned after the modal closes.
- The mobile version is the desktop version at 390px: filter chips overflow and clip, the modal
  overlays 60% of the screen with a scroll inside a scroll, and the CTA is below the keyboard.
- There's a `⌘K` palette because palettes are the aesthetic now, and it contains the sidebar.

---

## Self-check

Run these against your own build.

**Search**
1. Type a query, press Back from a result: is your query still in the field and your scroll position
   restored?
2. Type fast enough to fire three requests; do the results ever show a stale query's data? (Log the
   response's query tag and compare to input value on every render.)
3. Search a term you know is misspelled by one character. Do you get a did-you-mean or garbage?
4. Search a single common word. Are the top three results actually the right ones, or did fuzzy
   matching promote a long title that happens to contain the letters? (The Stripe `refund` test.)
5. Does any result row explain why it matched — snippet, breadcrumb, or highlighted field?
6. Turn off the network mid-query. Is there an error state with the query preserved and a retry?
6a. Force a 403 and a 500 on the search endpoint. Do you get three distinguishable screens for
    empty / forbidden / broken, or one `No results found`?
6b. Create an object, then search for it immediately. How many seconds until it's findable, and
    what does the UI say during that window?
6c. Expire the session with filters applied. Are the filters still there after re-auth?
6d. Trip the rate limiter with fast typing. Does the field tell you it switched modes, or just go
    quiet?

**Filters**
7. Apply three filters, copy the URL, open it in a private window. Same result set?
8. With filters applied, is every one of them visible without opening the filter control?
9. Is there exactly one `Clear all`, and does it clear the query too, or only the filters? (Say which
   in the label if it's ambiguous.)
10. Click a facet with a count of N. Does the result total equal N?
11. Is any facet with zero results clickable?
12. Is any count rendered as `0` that is actually unknown (unauthenticated, uncomputed, errored)?
13. Set filters that yield zero. Does the empty state name the filters and offer to remove them?
13a. Delete a label used by a saved/shared view, then open that view. Does it 404, silently drop the
     clause, or keep it visible and removable with a notice?
13b. Open a shared filter URL as a user who lacks access to one filter value. Is the shortfall
     stated, or does the count just disagree with the sender's?
13c. Kill one source in a federated search. Does its group render an error, or vanish?

**Command palette**
14. `Esc` from a nested/argument step: does it go back one level, or close the whole thing?
15. Does the footer name the primary action for the *selected* row, and change as you arrow down?
16. Are keyboard shortcuts displayed on the rows that have them?
17. Open, arrow down 5, close with `Esc`: is focus back on the trigger?
18. Is there a visible, clickable way to open it for someone who doesn't know the shortcut?
19. Pick any palette command used weekly by most users. Is there a non-palette path to it?

**Mobile (390px, real device or DPR-2 emulation)**
20. Does the results list have anything visible below the keyboard when the field is focused?
21. Is the filter CTA (`Show N results`) pinned above the keyboard, not below it?
22. Do filter chips scroll horizontally without clipping the last one?
23. Are all row targets ≥44pt?
23a. Are keyboard-only affordances (`↵` glyphs, shortcut chips, `esc to close` legends) actually
     removed at 390, or just inherited? (react.dev drops the footer legend and keeps the `↵`.)
23b. Does the collapsed filter entry point carry the applied count (`Filters · 3`)? Airbnb's
     icon-only mobile control does not.
23c. Does your chip rail drop options at narrow widths, or scroll them? Airbnb's desktop rail cuts
     `Dryer` and `Heating` off the end at 1440 with no overflow control.

**Accessibility**
24. With VoiceOver/NVDA: on typing, is the result count announced? On arrowing, is the row announced
    with its group?
25. Is `aria-activedescendant` used, with DOM focus never leaving the input?
26. Does each removable filter chip have an accessible name of the form `Remove filter: X is Y`?
27. Are highlighted matches wrapped in `<mark>` (semantic), not a styled `<span>` (colour only)?

---

## Sources

Walked with a headless browser, Sept 2026; re-walked 2026-09-09 with screenshots in
`~/Ayush/UI_Library/.cache/shots/search-filter-and-command-v-*.png`. Every measurement below marked
"re-verified" or "re-measured" was taken from those PNGs, at 1440×900 and 390×844, DPR 2, logged
out.

- **Airbnb** `airbnb.com/s/San-Francisco--CA/homes` (1440×900 and 390×844) — re-measured
  2026-09-09. Chip rail at 34px showing 8 of 10 chips at 1440 with the rest clipped, `Filters`
  button 83.6×34, filter modal 568×820 at top 40 over a scrim; `Search all filters` field;
  price-distribution histogram behind the dual slider; footer `Clear all` / `Show 1,000+ places`;
  mobile sheet 832px tall at top 12, `Filters` collapses to an icon-only control
  (`aria-label="Show filters"`), map-over-sheet results layout.
- **Linear** `linear.app/docs/filters`, `/docs/search` + in-product captures from those pages — chips
  reading `Assignee is any of 3 assignees ×`; `Match all filters` toggle; `@ma` inline token with an
  `Assignee`-headed typeahead; Display panel `Most relevant / Last updated / Last created` +
  `Include archived`; "The applied filters are also reflected in the browser URL… Only the main
  filters are included in the URL. View options, quick filters, and Insights filters aren't
  included" (quotes re-fetched 2026-09-09); `⌘F` "acts more like a temporary filter… Press Esc to
  clear the search and show all of your issues"; search menu shows "recent searches as well as a
  list of recent issues"; command-menu prefixes `i p u t l f d`.
- **GitHub** `github.com/search?q=repo:facebook/react+useEffect&type=issues`,
  `github.com/search/advanced` — re-verified 2026-09-09 at 1440 and 390. `0 results (6 ms) in
  [facebook/react ×]` (elapsed time varies per query); three collapsed zero-result accordions plus
  `Your search did not match any issues. You could try one of the tips below.`; left rail logged-out
  shows `Issues/Pull requests/Discussions/Commits/Packages/Wikis` all `0` while `Code` shows `…`; at
  390 the rail collapses to `Filter: [Issues 0 ▾] in [facebook/react ×]`. Advanced search:
  placeholders as syntax examples (`github, atom, electron, octokit`; `>YYYY-MM-DD, YYYY-MM-DD`;
  `0..100, 200, >1000`; `50..100, 200, <5`) and `Return repositories [not ▾] including forks.`
- **react.dev / Algolia DocSearch** `react.dev/reference/react/useEffect` — re-measured 2026-09-09.
  Desktop modal 768×868 at top 16, rows 52px; groups by docs section (`REACT APIS`, `LEARN`,
  `REACT DOM APIS`, `REACT SERVER COMPONENTS`); parent+anchor tree rows; inline blue match
  highlighting; selected row a solid teal band with `↵` at its right edge; footer legend `↵ to
  select / ↓↑ to navigate / esc to close` plus Algolia attribution. Mobile: modal 390×844 at 0,0,
  rows 52px, `Cancel` 69×40 at x=301 y=12, legend removed (attribution kept), `↵` glyph retained on
  the selected row, per-row ellipsis placement (`Comparing useState and use …` / `… in memory with
  useState`).
- **Vercel docs** `vercel.com/docs` ⌘K — re-verified 2026-09-09. Placeholder `What are you searching
  for?`; `Esc` pill inside the input; logged-out empty state = the same 8 curated `Suggestions`;
  amber match highlighting; `domain` returns 7 rows with two leaking frontmatter (`title:
  domain-management product: vercel url: …`) and a byte-identical near-duplicate pair at rows 5 and
  7; no results-page escape row; sidebar affordance `Search Docs ⌘K`.
- **Stripe docs** `docs.stripe.com/payments` `/` — re-verified 2026-09-09. `refund` and `refunds`
  now return the identical five rows led by `Refund and cancel payments`; stemmed highlighting
  across title, snippet and breadcrumb; per-result breadcrumb path with `›` and tail elision; groups
  `Results` / `Ask AI Assistant` (5 generated questions) / `Code example`; `View more results`. The
  earlier singular/plural relevance failure recorded in this file did not reproduce — see the review
  pass.
- **Raycast** `manual.raycast.com` (+ `/search-bar`, `/action-panel`) — documented ranking order
  (exact alias → alias prefix → title fuzzy → subtitle/keyword → frecency, "for a given query");
  fuzzy sensitivity setting; Action Panel `⌘K` with its own search field and section grouping;
  "The first action in the Action Panel is the primary action"; root-search screenshot showing
  `Suggestions`/`Commands` groups and the `Open Command ↵` / `Actions ⌘K` footer.
- **VS Code** `vscode.dev` live (F1) — re-measured 2026-09-09: widget 602×407 empty, 602×93 on a
  two-result query, both at top 6; `>` prefill; commands gated by context (`format` with no folder
  open returns exactly `File: Save without Formatting` ⌘K S and `Remote Repositories: Export Debug
  Information` — one true hit, one substring false positive); per-row keybinding caps; `N Results`
  announced but not rendered;
  `code.visualstudio.com/docs/getstarted/userinterface` for `⇧⌘P` / `⌘P` / `?` / `⇧⌘O` / `⌃G`.
- **Newegg** `newegg.com/p/pl?d=gaming+laptop` — ON/OFF toggle pills with no counts anywhere;
  `Department` duplicated as rail *and* chip row; `Search Within:` second input; `SAVE THIS SEARCH`;
  `Related Searches:` reformulations; `Page 1/20`.
- **Slack help** `slack.com/help/articles/202528808` — modifiers `in: from: has: is:saved is:thread
  before: after: on: during: with: creator:`; `Filters` control at the top of the search view; recents
  behind a clock icon; `⌘G`.
- **Notion help** `notion.com/help/search` — `⌘P` (or `⌘K` off-block); recently-viewed before typing;
  `Most viewed` / `Popular this week` row labels; filters `Title only / Created by / Teamspace / In /
  Date`; default sort `Best Matches`.

Research cited:
- **NN/g**, *Response Times: The 3 Important Limits* — 0.1s "the limit for having the user feel that
  the system is reacting instantaneously"; 1.0s "the limit for the user's flow of thought to stay
  uninterrupted"; 10s "the limit for keeping the user's attention focused on the dialogue".
  `nngroup.com/articles/response-times-3-important-limits/`
- **NN/g**, *Filters vs. Facets* — filters "exclude items that don't meet certain criteria"; faceted
  navigation "provides multiple filters, one for each different aspect of the content", at materially
  higher metadata cost. `nngroup.com/articles/filters-vs-facets/`
- **Baymard Institute**, on-site search collection (27 articles) — 96% of sites ship no contextual
  search snippet and 57% of test participants became confused about relevance and pogo-sticked
  (`/blog/search-snippets`); 69% don't offer suggestions for closely misspelled queries
  (`/blog/offer-autocomplete-suggestions-for-misspellings`); only 19% get autocomplete fully right
  (`/blog/autocomplete-design`); 58% don't copy the active suggestion into the field
  (`/blog/copy-search-suggestion-to-search-field`); 37% don't persist the query
  (`/blog/persist-search-queries`); 21% don't provide a mobile submit button
  (`/blog/mobile-search-submit-button`); 46% get scope autodirect wrong
  (`/blog/autodirect-searches-matching-category-scopes`); ~50% fail the five no-results recovery
  strategies and users "rarely read" generic search tips (`/blog/no-results-page`).
- **W3C ARIA APG**, *Combobox with listbox popup* — required roles/states, and "DOM Focus is
  maintained on the combobox and the assistive technology focus is moved within the listbox using
  aria-activedescendant." `w3.org/WAI/ARIA/apg/patterns/combobox/`

---

## Review pass (2026-09)

Adversarial re-read on 2026-09-09. Seven products re-walked live at 1440×900 and 390×844 (DPR 2,
logged out); screenshots at `.cache/shots/search-filter-and-command-v-*.png`.

**One claim was false and is now removed.** The original rule 2 hung on Stripe docs search returning
five unrelated documents for `refund` and the correct one for `refunds`. It does not reproduce.
`refund` and `refunds` now return the identical five rows, `Refund and cancel payments` first, with
stemmed highlighting across title, snippet and breadcrumb (v-3). Rule 2 now rests on VS Code's
substring matching, which is live and measurable: `format` with no folder open returns two commands
and one is `Export Debug In**format**ion` (v-11). Lesson for this corpus: a relevance failure is the
most perishable kind of claim, because it is the kind a docs team fixes. Prefer defects that are
structural (Vercel indexing frontmatter, GitHub rendering unknowns as `0`) over defects that are one
index rebuild away from being wrong.

**Verified and unchanged.** Airbnb `Filters` 83.6×34 and modal 568×820 at top 40, `Search all
filters`, the price histogram behind the dual slider, `Clear all` / `Show 1,000+ places` (v-9);
mobile sheet 390×832 at top 12 (v-10). react.dev DocSearch 768×868 at top 16, 52px rows, footer
legend, and at 390 a full-bleed 390×844 modal with a 69×40 `Cancel` and no legend (v-6, v-7). GitHub
`0 results (N ms) in [facebook/react ×]`, the three collapsed accordions, the logged-out rail of
zeros, and the advanced-search placeholders-as-syntax (v-1, v-2). Vercel's frontmatter-leaking
snippets and duplicate rows (v-4). VS Code 602px at top 6 (v-11). Linear's doc quotes re-fetched.

**Numbers that were too precise.** `0 results (21 ms)` is a per-query value — measured 6 ms today.
Now stated as a pattern with the number as an example. "react.dev renders 10 rows on mobile" was
wrong: it renders an uncapped scrolling list. `84×34` is 83.6×34.

**What was added.** A new §10 on failure states — the gap. The file's per-section state notes
covered slow, partial and empty, but nothing covered the states that actually decide trust: 401/403/
429/5xx collapsing into `No results found` because the client branches on array length; read-after-
write against a lagging index; session expiry mid-composition; rate limiting as a mode change;
filter clauses whose referent was deleted; shared filter URLs the recipient can only partly run;
silent shard failure in federated search; palette actions that fail after the palette closed.

**Mobile, re-shot.** Real findings rather than "the desktop version is smaller": react.dev keeps the
`↵` glyph on the selected row on a device with no Enter key; Airbnb's icon-only mobile `Filters`
control carries no applied count; Airbnb's desktop chip rail silently clips `Dryer` and `Heating`
at 1440; GitHub's mobile zero-results collapses the facet rail into an `Issues 0 ▾` dropdown while
keeping the scope chip — the good half — then spends the viewport on the illustration.

**Decision procedures, scoped.** Every fork in the file now names a product it is wrong for. The
sharpest: the "under ~50 items → inline filter" branch is wrong unless all 50 are in memory; the
p95 latency table is wrong whenever a query is metered, audited or side-effecting; "filters live in
the URL" is wrong when filter values are identifiers you don't want in a support ticket — and Linear
itself only serialises the main filters, so its own shared links don't reproduce the sender's view;
"hide inapplicable commands" is wrong when the missing precondition is the thing the user is trying
to fix.

**Still unverified, flagged rather than fixed.** Linear and Slack are documented from their help
pages plus earlier in-product captures, not from a logged-in session this pass — the operator lists,
sigil behaviour and `Match all filters` toggle are quoted from docs. Raycast likewise, from the
manual. Newegg was not re-walked; its facet-count and duplicate-control claims are from the earlier
pass. Baymard percentages are cited, not re-checked.
