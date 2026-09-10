# UX patterns

How real flows work in products that got them right — and what they look like when nobody thought
about them. Load the file for the flow you are building.

| Building | File |
|---|---|
| Signup, login, SSO, passkeys, 2FA, sessions, account deletion | [`auth-and-accounts.md`](auth-and-accounts.md) |
| First run, activation, setup checklists, sample data | [`onboarding-and-activation.md`](onboarding-and-activation.md) |
| Settings IA, autosave vs save, preferences, API keys, danger zones | [`settings-and-preferences.md`](settings-and-preferences.md) |
| Pricing, plans, usage-based billing, upgrades, checkout, dunning, cancellation | [`billing-plans-and-checkout.md`](billing-plans-and-checkout.md) |
| Search, filtering, sorting, saved views, command palettes | [`search-filter-and-command.md`](search-filter-and-command.md) |
| Create/edit/delete, bulk actions, selection, import/export, file upload | [`data-management-and-bulk.md`](data-management-and-bulk.md) |
| Invitations, roles, permissions, sharing dialogs, notification inboxes | [`teams-permissions-and-notifications.md`](teams-permissions-and-notifications.md) |
| Chat, streaming, tool calls, citations, agent confirmation, artifacts | [`ai-flows.md`](ai-flows.md) |

**Why these files exist.** These flows are where products are actually judged, and they are the
part an agent is most likely to stub out. A signup form is easy to render and hard to get right —
the difficulty is entirely in the states nobody screenshots: the expired session mid-action, the
revoked invite, the failed payment that hasn't killed the account yet, the stream that hit a rate
limit halfway through a sentence.

Each file covers, per pattern: the job, a named reference implementation, the real decisions and
their forks, the failure states, mobile, accessibility, example copy, and how the flow looks when
it was never thought about.
