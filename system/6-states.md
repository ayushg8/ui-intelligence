# 6 — The states that make it a product

This is the step that most separates a generated interface from a shipped one, and it is almost
always skipped. A mockup handles the case where there are exactly six items, all the data arrived,
nothing failed, every string is short, and the user has permission. A product handles the other
forty cases.

You can spot a generated interface by asking one question: *what does this look like on a new
user's first day, before there is any data?* If the answer is "an empty grid" or "it would probably
break", the interface isn't finished.

---

## The four states every data surface needs

Any component that displays data the app doesn't already have needs all four. Build them at the
same time as the happy path, not later.

### Empty

There are three different empties and they need different treatment:

| Kind | Meaning | Treatment |
|---|---|---|
| **First run** | Nothing exists yet | Teach. Say what this surface is for, and give the one action that creates the first item. This is the highest-value onboarding surface in the product and generated UI wastes it on "No data". |
| **Filtered to nothing** | Data exists, the filter excluded it | Say *which* filter. Offer to clear it. Never show first-run copy here — it's confusing and implies data loss. |
| **Genuinely done** | Inbox zero, no errors, all caught up | This is good news. Say so briefly and get out of the way. No illustration required. |

Empty-state copy that works: **what this is · why it's empty · the one thing to do next.**

```
No shipments in transit
Shipments appear here once a carrier scans the first pickup.
[Create a shipment]     Learn about tracking →
```

Not: a centered gray inbox icon and the word "Empty". Not an illustration doing the job the copy
should do. Not three equally-weighted buttons.

### Loading

Choose by expected duration, not by habit:

| Duration | Show |
|---|---|
| < 300ms | **Nothing.** A spinner that flashes for 200ms is worse than no spinner — it reads as jank. |
| 300ms – 2s | A skeleton **matched to the real layout** (right row count, right column widths, right heights) so nothing jumps when data lands. |
| > 2s | Skeleton or progress, plus a message. Above ~10s, show what is happening and let the user leave. |
| Unknown/streaming | Progressive rendering — show what has arrived. |

Rules: never replace an already-populated view with a skeleton on refetch (dim it or show a subtle
inline indicator instead — swapping real content for skeletons is a regression the user notices).
Never let a skeleton's shape differ from the content it becomes. Never animate a skeleton faster
than ~1.5s per shimmer cycle; faster reads as urgent.

**Prefer optimistic updates for user-initiated actions.** When a user toggles, renames, reorders or
sends, show the result immediately and reconcile with the server after. If it fails, revert *and
say so* — a silent revert is worse than a slow update because the user believes the change stuck.

### Error

Three questions, always: **what happened · why · what to do.**

```
Couldn't load shipments
The tracking service didn't respond. Your data is safe.
[Try again]     Contact support if this continues
```

- Errors go **where the failure was**, not in a global toast. A field error belongs under the
  field; a section error replaces the section; only a genuinely global failure gets a global
  treatment.
- A failed sub-component must not take down the page. Error boundaries per region.
- Never show a raw stack trace, a status code alone, or "Something went wrong" — the last one is
  the most common string in generated software and it tells the user nothing.
- Offer the retry. If retrying is automatic, say that.
- Distinguish *retryable* (network, timeout, 5xx) from *terminal* (403, 404, validation) — they
  need different copy and different actions.

### Too much

The state nobody builds. What happens with 10,000 rows, a 400-character title, a 9-digit number, 50
tags, a name in a script you didn't anticipate, a 4MB image?

- Long text: `line-clamp` with the full value available on hover/focus, or wrap and let the row
  grow — but decide, don't let it overflow.
- Big lists: virtualize, paginate, or cap with a "showing 100 of 12,480" and a way to narrow.
- Large numbers: decide the formatting rule (`12.4k`, `$1.2M`) and where precision matters (money
  usually needs full precision; counts usually don't).
- Wide tables: horizontal scroll with a sticky first column beats squeezing columns to
  illegibility.

---

## The interaction states of every control

Every interactive element needs all of these, and they must be *distinguishable from each other*:

`default` · `hover` · `focus-visible` · `active/pressed` · `selected` · `disabled` · `loading` ·
`error` · `read-only`

Rules:

- **Nothing moves.** Change background, color, opacity, border-color. Never size, position, padding
  or border-width — those shift layout and make a list twitch as the cursor sweeps it.
- **Focus is never removed.** If you set `outline: none`, you replace it with something at least as
  visible. A 2px accent ring with a 2px offset is the safe default. Test it on every background it
  can appear against.
- **Disabled must not be the only signal.** A disabled button with no explanation is a dead end;
  say why it's disabled (or better, leave it enabled and explain on click). Disabled controls are
  also frequently unreadable — check contrast, and never make them the only way the user learns
  about a requirement.
- **Loading is per-control.** A button that submitted should show it *in the button* (spinner
  replacing or preceding the label, width held constant so nothing jumps), and be disabled against
  double-submit.
- **Selected ≠ hover ≠ focus.** All three can be true at once. Make sure the combination is legible.

→ [`../craft/interaction-and-states.md`](../craft/interaction-and-states.md) for measured examples.

---

## Destructive and irreversible actions

Match friction to consequence:

| Consequence | Pattern |
|---|---|
| Reversible, low value | **Just do it.** No confirmation. |
| Reversible, notable | **Do it + undo toast** (8–10s). Undo beats confirm: it's faster for the 99% who meant it and just as safe for the 1% who didn't. |
| Irreversible, recoverable elsewhere | Confirmation dialog. The title is the question; the confirm button names the action ("Delete 3 shipments"), never "OK"/"Yes". |
| Irreversible, high value | Type-to-confirm the object's name. Reserved for genuinely destructive things — used casually it's theater. |
| Irreversible, affects others | Show the blast radius: *what* and *how many* will be affected, before confirming. |

Destructive actions should be findable but never prominent: not the first button, not styled red
until it's the actual destructive control in a confirmation. A red "Delete" sitting in the primary
action position is a design that expects you to make mistakes.

---

## The rest of the checklist

Walk this before you call a screen done:

**Data**
- [ ] Zero items · one item · many items · far too many items
- [ ] Long strings, missing fields, `null`, `0`, negative numbers, very large numbers
- [ ] Missing image / broken avatar / no favicon
- [ ] Stale data — is it obvious when this was last updated?

**Async**
- [ ] Slow network (throttle to Fast 3G and look)
- [ ] Request fails · request times out · partial failure
- [ ] Offline, and coming back online
- [ ] Concurrent edit / conflicting update

**Access**
- [ ] Signed out · session expired mid-action · insufficient permission
- [ ] Read-only role viewing an editable surface
- [ ] Feature not enabled on this plan

**Input**
- [ ] Validation errors, multiple at once, and where focus goes
- [ ] Unsaved changes on navigate away
- [ ] Double-submit prevention
- [ ] Paste of unexpected content into a rich field

**Presentation**
- [ ] 390px and 320px width
- [ ] 200% browser zoom
- [ ] Dark mode, if shipping one
- [ ] Keyboard-only: can you complete the primary task?
- [ ] Reduced motion
- [ ] Long content in a fixed-height container

You will not build all of these for a prototype. **Decide explicitly which ones you're skipping**
rather than discovering later that you skipped all of them.

---

## Why this section is the anti-vibecode payload

Generated interfaces look plausible in a screenshot and hollow in use, and this is why: they have
one state. Adding empty, loading, error and edge states does more for perceived quality than any
amount of visual polish, because it is the difference between something that was *designed* and
something that was *rendered*.

---

**Next:** [`7-critique.md`](7-critique.md) — render it and look at it.
