# Search, filtering and command interfaces

**Evaluated:** 2026-09

Walked live: Airbnb search + filter modal (desktop 1440, mobile 390), Linear filters/search docs and
in-product captures, GitHub search results + zero-results + advanced search, react.dev (Algolia
DocSearch) desktop and mobile, Vercel docs ⌘K, Stripe docs search (two queries), Raycast root search
+ manual, VS Code palette on vscode.dev, Newegg faceted results, plus Slack and Notion help
documentation. Measurements below are from those sessions, not from memory.

---

## If you only get five things right

1. **Bind two different keys to two different jobs.** "Find a thing and go to it" and "filter the list
   I'm looking at" are not the same feature. Linear ships `/` for search-everything and `⌘F` for
   search-in-this-view, and its own docs say `⌘F` "acts more like a temporary filter." Products that
   merge them force everyone through the wrong one. VS Code does the same split with `⌘P` (go to
   file) and `⇧⌘P` (run command) — which is literally `⌘P` pre-seeded with `>`.

2. **Never fuzzy-match without a relevance floor.** Stripe's docs search for `refund` returns, in
   order: "Receive Stripe events in your webhook endpoint", "Strong Customer Authentication
   readiness", "Stripe reporting", "Revenue Recognition", "Product release phases". Not one is the
   refunds doc. Type `refunds` and the top hit is "Refund and cancel payments". One character.
   Character-subsequence scoring with no floor and no stemming turns a working index into noise.
   Stem first; if the best score is below threshold, show zero-results-with-recovery, not garbage.

3. **The applied scope must be a removable chip, not prose.** GitHub gets its zero-result page half
   right: `0 results (21 ms) in [facebook/react ×]`. The thing that was too narrow is the one thing
   on screen you can click off. Everything else on that page is generic advice, and Baymard's
   no-results research is explicit that users "rarely read" search tips.

4. **Filter state lives in the URL.** Linear's docs: "The applied filters are also reflected in the
   browser URL. You can copy the browser address to share the filtered view." If your filters live
   only in React state, back-button, refresh, share, and open-in-new-tab all silently discard the
   user's work.

5. **Show why each result matched.** Baymard: 96% of e-commerce sites ship no contextual snippet, and
   57% of test participants became confused about relevance and pogo-sticked between results and
   product pages to work out why an item was there. A result row without a match rationale is a
   guess the user has to verify by clicking.

---

## 1. Search as navigation vs search as query

### The job
Two populations use the same box. The **navigator** knows exactly what they want (`useEffect`,
`ENG-116`, "Billing settings") and is using search as a faster URL bar; their success metric is
time-to-first-result and they will hit Enter on row 1 without reading rows 2–10. The **querier** does
not know what exists and is using search to survey a space; they need counts, facets, sorting and a
results *page* they can refine. The business wants the navigator to never leave (retention) and the
querier to convert (search-exit rate).

These conflict on one decision: **does Enter navigate or does Enter run a query?** The best products
refuse to choose and give the navigator a top-ranked exact hit that Enter takes, while the querier
gets a "View more results" / "See all results for X" escape into the full page.

### The reference implementation
**Stripe docs search** does the two-population split cleanly in one dropdown. For `refunds` it shows
five navigational rows, then a blue `View more results` link, then a group headed `Ask AI Assistant`
with five generated questions, then a group headed `Code example`. Three answer *types* in one
surface, each labelled, each with its own row shape. Navigator takes row 1; querier drops into the
results page or into the AI.

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
  gives you `Sign in to search code on GitHub` — which is honest — but simultaneously renders `0`
  against Issues, Pull requests, Discussions, Commits, Packages and Wikis in the left rail. Those are
  not zeros, they're unknowns, and rendering them as `0` tells a truthful-looking lie.

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
The user wants the list to reflect their intent with the least work. The business wants to not run a
full-corpus query on every keystroke.

### The decisions — pick by measured p95, not by taste

| p95 round-trip | Pattern | Feedback required |
|---|---|---|
| < 100 ms | Filter as you type, no spinner, no debounce beyond 1 frame | None. Nielsen: 0.1s is "the limit for having the user feel that the system is reacting instantaneously" |
| 100–400 ms | Type-ahead with 120–200 ms debounce, keep old results visible | Subtle: input-edge progress line only |
| 400 ms–1 s | Type-ahead, 250–300 ms debounce, stale results dimmed | Explicit inline spinner in the field; Nielsen's 1.0s is "the limit for the user's flow of thought to stay uninterrupted" |
| > 1 s | **Submit on Enter.** Stop searching per keystroke | Skeleton rows matching final row height; count appears first |
| > 10 s | Submit + job status | Percent-done and a cancel; past 10s "users will shift attention elsewhere" |

Concrete anchors from the walk: GitHub prints its own search time in the results header —
`0 results (21 ms) in facebook/react`. Publishing the number is itself a design decision: it makes
the engine's speed part of the product's felt quality, and it gives you a reason not to hide a slow
query behind a spinner.

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
Slow-first-paint: render the *count* and the group headers before the rows if your API can return
them cheaply — the count is the thing the querier reads first. Empty-while-loading is worse than
stale-while-loading in every case except when the query changed types (e.g. user switched scope).

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
**Algolia DocSearch on react.dev.** Desktop modal measured 768 px wide. Anatomy per row: a 16px type
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
  fails this: the row "Domain Management" shows
  `title: domain-management product: vercel url: /docs/rest-api/sdk/examples/domain-…` — raw
  frontmatter, indexed as body text. If your indexer eats YAML, your snippets will print YAML.
- **Deduplicate before rendering.** Vercel's `domain` query returns "Get availability for a domain"
  and "Get availability for a domain (Vercel SDK)" with byte-identical snippets, two rows apart.
- **Truncate to preserve the match.** react.dev on mobile renders `… Might Not Need an Effect` —
  leading ellipsis, because the match is at the end. Trailing-only truncation hides the very word the
  user searched for.
- **Metadata slots: three, maximum.** Raycast's rows carry exactly icon / command name / owning
  extension / right-aligned type label. VS Code carries category-prefixed name + right-aligned
  keybinding chips. Adding a fourth turns the row into a table with no header.

### The states
- **Result exists but is inaccessible:** show it with a lock icon and `You don't have access — request
  from #team-eng`. Silently filtering it produces the worst bug class in enterprise search: the user
  knows the document exists and concludes search is broken.
- **Result is deleted/archived:** Linear's search Display panel has an explicit `Include archived`
  toggle rather than silently including or excluding. Make the choice visible.
- **Too many results:** cap the dropdown at 8–10 rows and make the last row `View all 1,284 results`.
  react.dev renders 10 on mobile; Stripe shows 5 plus `View more results`.

### The mobile version
Drop to one line plus (optionally) one metadata line. 52px row height, which is above the 44pt touch
target minimum with room for the divider. Drop the keyboard-hint footer entirely — there is no
keyboard. Keep the type icon: it's the cheapest per-row disambiguator when the title is truncated.

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
The user wants to narrow without leaving the keyboard. The business wants a query language for power
users without stranding the other 95%.

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
  (visible selected state), second deletes it. Deleting a whole `assignee:matthijs` on one keypress
  with no visual selection step is the most-reported paper cut in chip inputs.
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
only in a help article, so 95% of users never filter at all.

---

## 5. Empty state, recents and suggestions

### The job
Before the user types, the box is the highest-traffic real estate in the product and it is doing
nothing. The user's real job at this moment is usually "get back to the thing I had open yesterday."

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

### The states
- **Zero history (new user):** curated suggestions, labelled `Popular` or `Suggested`, never
  `Recent`.
- **History from another device:** if recents are server-side, they'll appear on a fresh device and
  look like someone else's activity. Label the group `Recently viewed` and it reads as correct.
- **Private mode / cleared storage:** fall back silently to curated, no error.

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
else: the header reads `0 results (21 ms) in [facebook/react ×]`, so the scope that was too narrow is
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
Everything above the fold, no accordions, and the primary recovery action (`Clear filters` or
`Search all of GitHub`) as a full-width button — not a text link inside a paragraph.

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

Airbnb and Linear are the two ends of the design space and both are right for their product. Dissect
both before choosing.

### 7a. Airbnb: the filter sheet (browsing an unknown inventory)

**The job.** The user does not know what's available and does not know what they want; every filter
they set is a hypothesis about inventory that may or may not have supply behind it. The business
needs them to keep going rather than filter themselves into zero results and leave.

**What it actually does** (measured, 1440×900 and 390×844, Sept 2026):
- Results page carries a chip rail under the search bar: `Filters` button (84×34px, sliders icon) then
  ten quick chips at 34px height — desktop order `1+ bathrooms, Free parking, Washer, Allows pets,
  Wifi, Air conditioning, Instant Book, Self check-in, Dryer, Heating`.
- Clicking `Filters` opens a centred modal measured **568 × 820 px, top offset 40px** in a 900px
  viewport — 91% of viewport height, deliberately not full-screen, so the results stay visible behind
  as context.
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

**Mobile:** the same sheet, measured at top 12, height 832 of an 844 viewport — a near-full-screen
sheet with a 12px inset that keeps the "this is a layer" affordance. Identical footer. The `Filters`
button in the header becomes icon-only. The results page itself inverts: map on top, listings in a
draggable sheet beneath.

**States:** `Show 0 places` must never be reachable silently — if a combination yields zero the count
on the CTA says so before you dismiss, which is the whole point of committing the count to the button.

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
  view.

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
- **Never render an *unknown* count as `0`.** This is GitHub's live bug: logged out, the left rail
  reads `Issues 0 · Pull requests 0 · Discussions 0 · Commits 0 · Packages 0 · Wikis 0` for a query
  against facebook/react. Those counts were never computed. Render `—` or omit the badge.
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
The user wants to do a thing whose name they know without learning where it lives. The business wants
to ship features that don't fit the navigation, and to make power users fast enough to stay. The
failure mode the business must resist: using the palette as a dumping ground so that bad IA never gets
fixed.

### The reference implementation
**Raycast**, whose ranking is documented precisely and is the best default any product could copy.
Root search orders by, in strict priority:

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
- **Copy:** commands are filtered by context. With no folder open, `>format` returned exactly two
  results — every formatting command was hidden because its precondition was unmet. Hiding an
  inapplicable command beats showing it disabled, in a palette, because the palette is a search over
  verbs and a disabled verb is a wrong answer.
- **Copy:** the list shrinks to the height of its content — two results render as a two-row box, so
  "almost nothing matched" is legible without reading.
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

Vercel's docs `⌘K` is the honest counter-example of scope discipline: it's a search box in a
palette's clothing (placeholder `What are you searching for?`, an `Esc` pill inside the input, one
`Results` group, no commands). Calling it a command palette would be the lie; it doesn't.

### The states
- **Slow index:** render the palette instantly with recents, and stream results in. The palette must
  never wait on the network to appear — its whole value is that it opens in one frame.
- **Command unavailable in context:** hide it (VS Code) or show it with the reason
  (`Merge — requires write access`). Never a silently inert row.
- **Command needs an argument:** transition the palette into an argument step with the command name
  pinned as a breadcrumb chip in the input, and `Esc` or backspace-at-position-0 returning to the
  command list — not closing the palette. Losing the whole palette on `Esc` from a sub-step is the
  most-hated palette bug.
- **Action failed:** the palette has closed by then, so the error belongs in a toast that names the
  command: `Couldn't archive 3 issues — you don't have permission in ENG.`

### The mobile version
Command palettes are a keyboard-first pattern and mostly should not exist on mobile. If the product
is mobile-first, the honest translation is a full-screen search sheet with the *navigation* half of
the palette and the top 5–8 *actions* as a horizontally scrollable row of chips at the top, sized for
touch. Don't ship a 602px centred box with a keyboard-hint footer to a phone.

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

---

## The generic version

You can diagnose thoughtless work from these traits alone:

- One `<input placeholder="Search...">`, no scope named, no shortcut hint, no `/` or `⌘K` binding.
- A request per keystroke, no debounce, no cancellation, results that flicker between two queries.
- Results are titles in a `<ul>`. No icons, no type labels, no breadcrumbs, no snippets, so a
  20-result list has no way to tell rows apart except by reading.
- Highlighting is a naive `replace()` on the raw query, or absent.
- Filters are `<select>` dropdowns in a row. Nothing shows what's currently applied except the
  dropdowns themselves, which are off-screen once you scroll. No `Clear all`.
- Facets have no counts, so users click into zero results repeatedly and conclude the catalogue is
  empty.
- Filter state is component state. Refresh, back and share all lose it. The URL is `/search`.
- Zero results is a centred illustration and `No results found. Try a different search term.` The
  filter that caused the zero is not mentioned or removable.
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

**Filters**
7. Apply three filters, copy the URL, open it in a private window. Same result set?
8. With filters applied, is every one of them visible without opening the filter control?
9. Is there exactly one `Clear all`, and does it clear the query too, or only the filters? (Say which
   in the label if it's ambiguous.)
10. Click a facet with a count of N. Does the result total equal N?
11. Is any facet with zero results clickable?
12. Is any count rendered as `0` that is actually unknown (unauthenticated, uncomputed, errored)?
13. Set filters that yield zero. Does the empty state name the filters and offer to remove them?

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

**Accessibility**
24. With VoiceOver/NVDA: on typing, is the result count announced? On arrowing, is the row announced
    with its group?
25. Is `aria-activedescendant` used, with DOM focus never leaving the input?
26. Does each removable filter chip have an accessible name of the form `Remove filter: X is Y`?
27. Are highlighted matches wrapped in `<mark>` (semantic), not a styled `<span>` (colour only)?

---

## Sources

Walked with a headless browser, Sept 2026; screenshots in
`~/Ayush/UI_Library/.cache/shots/sfc-*.png`.

- **Airbnb** `airbnb.com/s/San-Francisco--CA/homes` (1440×900 and 390×844) — chip rail at 34px,
  `Filters` button 84×34, filter modal measured 568×820 at top 40; `Search all filters` field;
  price-distribution histogram behind the dual slider; footer `Clear all` / `Show 1,000+ places`;
  mobile sheet 832px tall at top 12, `Filters` collapses to an icon-only control
  (`aria-label="Show filters"`), map-over-sheet results layout.
- **Linear** `linear.app/docs/filters`, `/docs/search` + in-product captures from those pages — chips
  reading `Assignee is any of 3 assignees ×`; `Match all filters` toggle; `@ma` inline token with an
  `Assignee`-headed typeahead; Display panel `Most relevant / Last updated / Last created` +
  `Include archived`; "applied filters are also reflected in the browser URL"; `⌘F` "acts more like a
  temporary filter"; command-menu prefixes `i p u t l f d`.
- **GitHub** `github.com/search?q=repo:facebook/react+useEffect&type=issues|code`,
  `github.com/search/advanced` — `0 results (21 ms) in [facebook/react ×]`; three collapsed
  zero-result accordions; every left-rail facet rendered as `0` while logged out; advanced-search
  placeholders as syntax examples (`0..100, 200, >1000`) and `Return repositories [not ▾] including
  forks.`
- **react.dev / Algolia DocSearch** `react.dev/reference/react/useEffect` — 768px desktop modal;
  section groups; parent+anchor tree rows; inline blue match highlighting; selected row as a solid
  band with `↵` on it; footer legend `↵ to select / ↓↑ to navigate / esc to close`; mobile 390×844
  full-bleed, 52px rows, `Cancel` button, legend removed, leading-ellipsis truncation
  (`… Might Not Need an Effect`).
- **Vercel docs** `vercel.com/docs` ⌘K — placeholder `What are you searching for?`; `Esc` pill inside
  the input; logged-out empty state = 8 curated `Suggestions`; amber match highlighting; snippet
  leaking frontmatter (`title: domain-management product: vercel url: …`); near-duplicate rows.
- **Stripe docs** `docs.stripe.com/payments` `/` — `refund` returns five irrelevant fuzzy hits;
  `refunds` returns `Refund and cancel payments` first; per-result breadcrumb with highlighting;
  groups `Results` / `Ask AI Assistant` / `Code example`; `View more results`.
- **Raycast** `manual.raycast.com` (+ `/search-bar`, `/action-panel`) — documented ranking order
  (exact alias → alias prefix → title fuzzy → subtitle/keyword → frecency, "for a given query");
  fuzzy sensitivity setting; Action Panel `⌘K` with its own search field and section grouping;
  "The first action in the Action Panel is the primary action"; root-search screenshot showing
  `Suggestions`/`Commands` groups and the `Open Command ↵` / `Actions ⌘K` footer.
- **VS Code** `vscode.dev` live (F1) — widget measured 602px wide at top 6; `>` prefill; commands
  gated by context (`>format` = 2 results with no folder open); substring highlight false positive
  `Export Debug In**format**ion`; per-row keybinding caps; `N Results` announced but not rendered;
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
