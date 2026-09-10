---
name: ui-copy
description: Use when writing or reviewing any user-facing strings in a product — button labels, headings, empty states, error messages, confirmation dialogs, form labels, help text, onboarding, notifications, tooltips, or marketing page copy. Also use when copy sounds generic, AI-written, or like it could belong to any product, or when asked to "fix the copy", "make this sound less like AI", or "write the microcopy".
---

# UI Copy

Copy is the fastest tell that an AI wrote an interface, and the cheapest thing to fix. A layout can
be competent and still read as generated because every string could belong to any product.

Full guidance: `craft/copy-and-voice.md` in the library root (`$UI_LIBRARY`, else
`~/Ayush/UI_Library`).

## The test

**Could this string appear, unchanged, in a different product?** If yes, it is doing no work.

"Get started" · "Something went wrong" · "No data" · "Manage your workflow" · "Everything you need
to succeed" — all true of thousands of products, useful in none.

## The rewrite moves

| Instead of | Do this |
|---|---|
| A generic verb | Name the actual action: "Save changes" → "Publish to production" |
| A benefit claim | State the mechanism: "Faster deploys" → "Deploys in 40s, not 4 minutes" |
| An abstraction | Use the user's domain word: "items" → "shipments", "content" → "episodes" |
| A vague error | What happened · why · what to do |
| A hedge | Delete it. "may", "helps you", "designed to" |
| An adjective stack | One concrete noun |

## Banned register

These read as machine-written regardless of context: *revolutionize · seamless · supercharge ·
unlock · effortless · powerful yet simple · everything you need to · built for modern teams ·
take your X to the next level · it's not just X, it's Y · elevate · streamline · game-changing ·
harness the power of*. Also: tricolon headlines, benefit stacking with no specifics, and sparkle
emoji as a signifier of AI.

## Per surface

**Buttons** — verb + object, sentence case, specific. "Delete 3 shipments", not "Confirm". Never
"Click here", never "Submit" when you can name what happens.

**Headings** — say something. "Shipments" is a label; "12 shipments need a carrier" is a heading
that earns its position.

**Empty states** — what this is · why it's empty · the one action. And distinguish first-run from
filtered-to-nothing from all-done; they are different messages and generated UI ships one "No
data" for all three.

**Errors** — what happened, why, what to do, and where the failure was. Never "Something went
wrong". Never a raw status code to a non-technical user. Distinguish retryable from terminal.

```
Couldn't load shipments
The tracking service didn't respond. Your data is safe.
[Try again]
```

**Confirmations** — the title is the question, the button names the action.
"Delete this project?" / "Delete project" — not "Are you sure?" / "OK".

**Labels and help text** — labels are nouns, not sentences. Help text goes under the field, before
the error can appear there, and explains the *requirement*, not the *widget*.

**Success** — usually unnecessary. If the thing visibly happened, saying "Success!" is noise.

## Tone by archetype

The same message, four ways:

| Archetype | "Your payment failed" |
|---|---|
| `fintech-institutional` | "Payment declined — insufficient funds in account ••4021. Retry after funding." |
| `fintech-consumer` | "That didn't go through. Your bank says there wasn't enough in the account." |
| `developer-platform` | "Charge failed: `insufficient_funds` (card ••4021). Retry with a different source." |
| `institutional-civic` | "We could not take this payment. Your bank did not have enough money in the account. You can try a different card." |

Match the archetype's register. A playful voice on an irreversible-money action is a trust failure
no matter how well written.

## Conventions

- **Sentence case** for buttons, headings, labels, menu items. Title Case reads as a marketing site
  inside a product.
- **Second person** ("your projects"), not first ("my projects").
- **Present tense**, active voice.
- **Numbers**: the actual number, not "several". Format consistently. Money keeps full precision;
  counts usually don't.
- **Dates**: relative for recent ("2 min ago"), absolute for anything you might need to cite, and
  the full timestamp on hover.
- Write strings that survive translation — no concatenation, no assumed word order, allow ~30%
  expansion.

## Review pass

Read every string on the screen aloud as a stranger. Then:

- [ ] No string could belong to a different product
- [ ] Every button names its action
- [ ] Every error says what to do
- [ ] The three empty states are distinguished
- [ ] No banned-register words
- [ ] Sentence case throughout
- [ ] Domain vocabulary, not generic abstractions
- [ ] Numbers and dates formatted consistently
