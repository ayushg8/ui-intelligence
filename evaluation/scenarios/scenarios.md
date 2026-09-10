# Test scenarios

Ten briefs, chosen to span the archetype space and to include the cases where generated UI most
reliably fails. Each is written the way a real request arrives: short, underspecified, and
containing more design information than it appears to.

The point of the underspecification is that inference is part of what's being tested. An agent that
asks twelve clarifying questions has already failed the first step.

---

### S1 — B2B analytics dashboard
> "Build a dashboard for our customer success team to see which accounts are at risk of churning.
> They have about 400 accounts."

Expected archetype: `analytics-bi` / `enterprise-dense`.
**Tests:** density calibration; resisting the metric-tile-grid reflex; whether the agent realizes
400 accounts means a *ranked list with the right columns*, not four donut charts; real chart design;
empty and loading states for async data.
**Failure to watch for:** four KPI cards across the top, a line chart with invented data, a pie
chart, and no way to actually act on a at-risk account.

### S2 — Premium fintech application
> "A treasury dashboard for a company's finance team — see balances across accounts, move money
> between them, approve outgoing payments."

Expected archetype: `fintech-institutional`.
**Tests:** numeral treatment (tabular figures, decimal alignment, negative convention); trust
register; approval flow with appropriate friction; audit trail; restraint in color.
**Failure to watch for:** gradient on the balance, animated counters on real money, playful copy,
an unconfirmed irreversible transfer.

### S3 — Consumer mobile application
> "A mobile app for tracking what you read — books, articles, papers. Log them, rate them, see
> what you've read this year."

Expected archetype: `expressive-consumer` or `premium-minimal`, mobile-primary.
**Tests:** mobile-first composition; thumb zones; whether the agent designs mobile first or shrinks
a desktop layout; personality without childishness; the year-in-review surface as a place for a
signature decision.
**Failure to watch for:** a desktop layout at 390px; a bottom nav with five identical icons; hover
affordances on touch.

### S4 — AI research tool
> "A tool where researchers can ask questions against a corpus of internal documents and get
> answers with citations."

Expected archetype: `ai-product`.
**Tests:** streaming text rendering; citation and source UI; tool-call/reasoning disclosure;
trust signals; the composer; what the empty state of a chat looks like; conversation history IA.
**Failure to watch for:** a bare chat box with a sparkle icon; citations as raw superscript numbers
with no hover; no handling of a long-running or failed query.

### S5 — Developer platform
> "A dashboard for a webhook delivery service. Developers configure endpoints, see delivery
> attempts, and debug failures."

Expected archetype: `developer-platform`.
**Tests:** log/event UI (dense, monospace where it earns it); status and retry semantics; payload
inspection; API-key handling; docs as a surface; whether dark mode is chosen for a reason.
**Failure to watch for:** a pretty marketing aesthetic applied to infrastructure; timestamps
without timezone; failures shown as a red badge with no diagnostic path.

### S6 — Ecommerce product page
> "A product page for a small brand selling one type of thing — good coffee beans."

Expected archetype: `ecommerce` / `luxury`.
**Tests:** image treatment; price and variant typography; the add-to-cart hierarchy; trust
elements; restraint; whether copy says anything about the actual coffee.
**Failure to watch for:** a three-column feature-card row below the fold; a testimonial trio;
"Elevate your morning ritual"; a gradient CTA.

### S7 — Productivity application
> "A task manager for a small team. Assign work, see what's in progress, and not much else."

Expected archetype: `technical-productivity`.
**Tests:** the archetype most imitated and most botched. Density; keyboard access; list design;
quick-add; whether it becomes a Linear skin or an actual product; the signature decision.
**Failure to watch for:** dark mode + purple accent + rounded cards and nothing underneath;
kanban by default with no reason; 44px rows for a tool used all day.

### S8 — Premium marketing website
> "A landing page for a B2B API company. They do document parsing."

Expected archetype: `premium-marketing`.
**Tests:** the highest-risk surface. Type-scale contrast; section rhythm; whether the page says
anything specific; whether it avoids the standard eight-block skeleton.
**Failure to watch for:** the full checklist — badge pill, centered gradient headline, two CTAs,
logo cloud, three feature cards, bento grid, testimonial trio, FAQ accordion, gradient CTA band.
This scenario exists mostly to test whether the system can break that template.

### S9 — Dense enterprise system
> "An internal console for a logistics company. Dispatchers manage live shipments — reassign
> carriers, handle exceptions, update ETAs. Eight people use it all day."

Expected archetype: `enterprise-dense` / `internal-utility`.
**Tests:** maximum-density calibration; table craft; bulk actions; saved views; keyboard workflow;
whether the agent takes an internal tool seriously as a design problem.
**Failure to watch for:** consumer-grade spacing on an all-day tool; a card per shipment; no
keyboard path; exceptions buried.

### S10 — Playful youth-facing product
> "An app that helps high schoolers keep track of college application deadlines."

Expected archetype: `expressive-consumer` with real stakes underneath.
**Tests:** the hardest balance — personality that doesn't undercut a deadline-driven, anxiety-laden
domain. Whether the agent recognizes that "for teenagers" does not mean "use bright gradients and
emoji". Progress and urgency representation.
**Failure to watch for:** emoji as iconography; a gradient background; "Let's crush those apps! 🚀";
deadlines shown without urgency encoding.

---

## Scoring each build

Both arms, blind:

1. **Vibecode risk** (`anti-patterns/vibecode-rubric.md`) — 0–10, with cited observables.
2. **Visual quality** (`anti-patterns/visual-critique-method.md`) — per dimension.
3. **Archetype fit** — does this look like a product for *these* users, or a generic app?
4. **States shipped** — count of empty/loading/error/edge states actually implemented.
5. **Copy specificity** — how many strings could appear unchanged in a different product?
6. **Mobile** — is 390px a design or a squeeze?
7. **Automated** — `node tools/audit.mjs` hard failures.

And the cross-scenario check: **put S7, S9 and S10's treatment builds side by side. Do they look
like three different products?** If not, the archetype system isn't earning its place.
