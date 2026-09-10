# 1 — Understand the product

**Time budget: 2 minutes. Output: a six-line brief you write down and then design against.**

You will usually be given one sentence: *"build a dashboard for tracking freight shipments"*. That
sentence contains far more design information than it appears to, and almost every bad interface
starts with an agent that read it as a request for components rather than as a description of a
situation.

## Infer, declare, and move — do not interrogate

The instinct to ask the user twelve discovery questions is wrong. It is slow, it is annoying, and
you can answer most of them yourself with better accuracy than the user can. The correct move:

> **Infer everything you can. State your assumptions in two lines. Ask only what would change the
> work if you got it wrong.**

Ask a real question when — and only when — two readings of the brief lead to materially different
interfaces. "Is this used by your ops team all day, or by customers a few times a month?" is worth
asking, because the answer moves density, navigation and tone in opposite directions. "What's your
brand color?" is not worth asking; pick a defensible one and say you picked it.

## The brief

Answer these. Write the answers down — in a comment, in a scratch file, in your response. An
unwritten answer does not constrain your next decision.

**1. What is the primary object?**
Every product has one noun at its center: the issue, the transaction, the shipment, the patient,
the song, the document, the customer. Name it. Then check your layout later: **the primary object
should have visual priority over the chrome around it.** Generated interfaces routinely give equal
weight to the sidebar, the header, the filter bar and the thing the user actually came for.

**2. What is the primary verb?**
What does the user *do* to that object — scan a list of them, compare two, work inside one, create
one quickly, approve or reject a queue of them? The verb determines the shell:

| Primary verb | Shell |
|---|---|
| Scan and triage many | Dense list or table, keyboard navigation, no per-row cards |
| Work deeply inside one | Master/detail, or full-page focus with minimal chrome |
| Compare a few | Side-by-side, or a table with the comparison columns adjacent |
| Create quickly and repeatedly | Command/quick-add first, form second |
| Monitor state | Dashboard, but see `craft/tables-dashboards-data.md` before you build one |
| Browse and discover | Grid, image-forward, filter-heavy |
| Complete one linear task | Single-column flow, one thing per page, no navigation |

**3. Who uses it, and how often?**
Frequency is the strongest density input there is. Daily-for-hours users want more on screen,
smaller type, keyboard access, and no hand-holding — they will learn the interface once and then
resent every pixel of wasted space. Monthly users want obvious labels, generous targets, and
explanatory copy. Occasional-and-anxious users (healthcare, tax, money movement) want one thing per
page and confirmation before anything irreversible.

Also ask: are they technical? A developer tool can show a raw ID, a JSON payload, a status code.
A consumer product showing `ERR_CONN_REFUSED` has failed.

**4. What is the stakes level?**
What happens if the user makes a mistake here? Nothing (a filter) → optimize for speed. Annoying
(deleted draft) → undo. Expensive or irreversible (wire transfer, production deploy, medical order)
→ friction is a feature: confirmation, review step, type-to-confirm, audit trail. Match the friction
to the consequence and no more. Confirm dialogs on harmless actions train users to click through
the dangerous ones.

**5. What is the information density?**
How much does the user need to see at once? Ten items or ten thousand? Three fields per item or
forty? This determines type scale and row height before any aesthetic consideration does.
→ [`craft/density-and-hierarchy.md`](../craft/density-and-hierarchy.md)

**6. Desktop, mobile, or genuinely both?**
"Responsive" is not an answer. A dense data tool is a desktop product that must not break on
mobile; a consumer app is a mobile product that must not look empty on desktop. One of them is
primary. Decide which, design that one first, and adapt — do not average them into something
mediocre at both. → [`craft/responsive-and-mobile-web.md`](../craft/responsive-and-mobile-web.md)

## Then check the constraints you did not choose

- **Existing codebase?** Read it before you write. Find the existing tokens, the component
  conventions, the styling approach, the spacing values actually in use. Introducing a second
  design language into a codebase is worse than a mediocre but consistent one. If tokens exist,
  they win over your preferences.
- **Existing brand?** Find the real values — the marketing site's CSS, a logo file, a brand doc.
  Do not invent a palette next to an existing one.
- **Framework and constraints?** React/Vue/Svelte/plain, SSR or SPA, RSC, bundle limits, browser
  support, offline requirements, i18n and RTL, existing component library.
- **Who reviews this?** A design-literate founder, a compliance team, and nobody are three
  different bars.

## Write the brief

Six lines. This is what you design against and what you critique against later.

```
Product:   Freight ops console for internal dispatchers
Object:    Shipment (secondary: carrier, lane)
Verb:      Scan a live queue, drill into exceptions, reassign
User:      8 dispatchers, all day, high domain expertise, non-technical
Stakes:    Reassignment is reversible; cancelling a load is not
Shape:     Desktop-primary, dense, keyboard-friendly; mobile = read-only status check
Direction: technical-productivity  (see archetypes/)
```

If you cannot fill a line, say so explicitly and make a defensible assumption — an assumption you
have named is a decision, an assumption you have not named is a bug.

## Common misreads

- **"Dashboard" usually does not mean dashboard.** Most requests for a dashboard are requests for a
  good list of the primary object with the right columns. A grid of metric tiles answers no
  question anyone actually has. → [`craft/tables-dashboards-data.md`](../craft/tables-dashboards-data.md)
- **"Modern" and "clean" mean "not embarrassing".** They are not a direction. Treat them as
  permission to choose one, not as a description of one.
- **"Like Linear" usually means "fast and uncluttered"**, not "dark with a purple accent". Ask what
  they like about it, or infer from the product's actual needs.
- **"Simple" from a user with a complex domain is a trap.** They mean "not confusing." Hiding real
  complexity behind progressive disclosure that they then have to fight is worse than showing it
  well.
- **An admin/internal tool is not a lower bar.** It is a different bar: density, speed and keyboard
  access matter more; polish and personality matter less. It is not an excuse for an ugly product.

---

**Next:** [`2-direction.md`](2-direction.md) — turn the brief into a design direction.
