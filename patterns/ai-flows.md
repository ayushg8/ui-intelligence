# AI interaction flows: chat, generation, agents, trust

**Evaluated:** 2026-09 · **Adversarially reviewed and re-verified:** 2026-09 (see
[Review pass](#review-pass-2026-09) at the end for what was corrected, cut and added)

Walked: v0.app (desktop + mobile), t3.chat (desktop + mobile), Linear for Agents, Notion AI,
Granola, Raycast AI, Vercel AI Elements (19 component pages with live previews), Streamdown,
Cursor Agent docs, Claude Code permission docs, OpenAI Apps SDK design guidelines. ChatGPT,
Perplexity, Lovable and Gamma all served a Cloudflare "Verify you are human" interstitial to a
headless browser — those are described from their own documentation and from the component
libraries that clone them, and are marked as such.

---

## If you only get five things right

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

## 1. The composer

### The job

The user wants to say a sentence and get an answer. The business wants them to attach the right
context, pick the right (cheaper, or more expensive) model, and turn on the tool that makes the
answer good. Every control you add to serve the second goal makes the first goal slower.

The resolution every good composer converges on: **one text field that owns the full width, and a
single toolbar row underneath it inside the same bordered container.** Controls live *below* the
text, never beside it, because the text field must be free to grow vertically. v0, t3.chat, Linear's
agent panel and AI Elements' `PromptInput` all land on this identical layout independently.

### Reference implementation

**t3.chat** (walked, 1440 and 390). The composer is a rounded container with a heavy outer glow
that doubles as the focus ring. Inside: `Type your message here…` on top, then a row of
`Kimi K2 (0905) $$· ⌄` | `⚡ Instant` | `🔍 Search` | `📎 Attach` on the left and a circular
send arrow on the right.

The detail nobody else does: **`$$` next to the model name.** A three-tier cost glyph rendered in
green, inline in the model chip. Not a token count, not a dollar figure — a coarse affordance the
user can read without arithmetic. It survives the mobile collapse (the model chip on 390px drops
the `(0905)` version string and keeps `Kimi K2 $$`), which tells you the team ranked cost
legibility above version precision.

**v0.app** (re-walked 2026-09, 1440 and 390). Placeholder `Ask v0 to build…`, model selector
bottom-left as `⊙ v0 Max ⌄`, mic bottom-right. The detail worth stealing: **there is no send button
at rest.** The mic occupies that slot until you type, so an empty composer offers dictation instead
of a dead disabled arrow. t3 takes the opposite bet — a permanently visible, permanently disabled
send arrow. v0's is the better one: the disabled control teaches nothing, the mic is a second way in.

On 390px the model selector loses its **label entirely** — just the provider glyph and a chevron.
That is the right call: on mobile the model is a setting, not a decision.

**AI Elements `PromptInput`** (walked) formalizes the anatomy: `PromptInputHeader` (attachment
chips), `PromptInputBody` (textarea), `PromptInputFooter` → `PromptInputTools` (action menu with
`AddAttachments` / `AddScreenshot`, plus a model `Select`) and `PromptInputSubmit`. Attachments
render as an `inline` variant — compact badges with hover previews — when they sit in the input,
and switch to a `grid` variant with visual thumbnails once they're in a sent message. Same data,
two variants, chosen by location.

### The decisions

| Fork | Answer | Why |
|---|---|---|
| Enter vs Shift+Enter | **Enter sends, Shift+Enter newlines** on desktop chat. Invert only if your primary artifact is long-form. | Universal now. Breaking it costs more than any newline convenience buys. |
| Enter while the agent is working | **Cursor inverts it: Enter queues, Cmd+Enter sends immediately.** | Once responses take minutes, the common intent is "add this to the list", not "interrupt". Cursor's immediate message is *appended to the most recent user message* rather than starting a new turn. |
| Textarea min-height | Reserve 2–3 lines even when empty (v0 does; t3 does) | Prevents the toolbar row from jumping down on the first wrapped line. |
| Textarea max-height | Cap at ~40% of viewport, then scroll internally | A pasted stack trace must not push the send button off screen. |
| Model selector | Command palette with fuzzy search once you exceed ~6 models (AI Elements' `ModelSelector` is `cmdk`-based, grouped by provider); a plain chip below that | A `<select>` of 30 model IDs is unusable and untypeable. |
| Where model/mode live | **Inside the composer border, bottom-left.** | It's a property of the message you're about to send, not of the app. Putting it in a top nav makes people forget which model answered. |
| Slash commands | Trigger on `/` **only at position 0** of an empty composer | `src/app`, `1/2` and `24/7` all carry a `/` the user did not mean as a command. |
| `@` mentions | Trigger on `@` at any word boundary; search across *all* attachable context in one list, not a submenu per type | Linear's picker returns humans and agents in one "Users" list. Cursor's returns files, folders, docs, `@Branch`, and web in one list. A user who has to first pick a category has to know your taxonomy. |
| Token/cost display | A ring, not a number, and only past ~50% | See §Context below. |

**Context and cost display.** AI Elements' `Context` component is the most fully-worked public
answer: a **circular SVG progress ring** showing percent of context window used (the preview
renders `31.3%`), which opens a **hover card** breaking down input / output / reasoning / cached
tokens plus an estimated cost computed via `tokenlens`. The design decision worth copying is the
two-level disclosure: a glanceable ring at rest, exact numbers only on intent. Nobody reads
"14,203 / 200,000 tokens" at rest; everybody wants it the moment a response gets truncated.

Do not render the ring at all below ~50% — a permanently-visible usage meter teaches users to
ration their questions, which is the opposite of what you want in month one.

### States

- **Empty, focused, never used** → see §2.
- **Model is loading / unavailable** → keep the chip, disable it, and put the reason in the chip
  (`Opus 5 · at capacity`), not in a toast that disappears.
- **Attachment uploading** → the chip appears immediately with a determinate bar; the send button
  stays enabled and the message queues behind the upload. Blocking send on upload is the wrong
  trade: the user has already decided.
- **Attachment rejected** (too large, wrong type) → replace the chip in place with the reason and
  a retry, do not remove it. Removing it silently is indistinguishable from a bug.
- **Over context limit before sending** → warn in the composer *before* the send, naming what will
  be dropped: `This thread is near its limit. Older messages will be summarized.` Discovering it
  after the send is the failure users describe as "it forgot everything."
- **Offline / send failed** → keep the text in the field. Never clear the composer optimistically
  before the request is accepted; the text exists nowhere else and the user cannot get it back.

### Mobile

The composer is pinned above the keyboard with `env(safe-area-inset-bottom)` and
`interactive-widget=resizes-content` in the viewport meta; without the latter, iOS Safari scrolls
the whole page and the composer floats over the last message.

t3.chat collapses four toolbar controls (`Instant`, `Search`, `Attach`, plus model) into
**one `+` button and the model chip**. v0 drops the model label. Both keep exactly one visible
control plus send. That is the budget: on 390px you have room for the model, one `+`, and send.

Never open a `<select>`-style model menu that covers the composer while the keyboard is up.
Present it as a sheet from the bottom that pushes the keyboard down.

### Accessibility

- The textarea is a real `<textarea>` with an accessible name, not a `contenteditable` div. If you
  need rich mentions, use `contenteditable` with `role="textbox" aria-multiline="true"` and accept
  that you now owe an IME test on Japanese and Korean input — Enter-to-send fires on the *commit*
  keypress of an IME composition unless you check `event.isComposing`. Without the check, every
  Japanese and Korean user sends a half-converted message on their first candidate selection.
- Slash/`@` popovers are `role="listbox"` with `aria-activedescendant` on the textarea. The
  textarea keeps focus throughout; focus must never move into the popover.
- Send button has a text label available to screen readers even when it renders as an arrow glyph,
  and its label must change with state: `Send message` → `Stop generating`.
- Attachment chips need a per-chip remove button reachable by Tab, not only by hover.

### Copy

| Instead of | Write |
|---|---|
| `Ask me anything` | `Ask v0 to build…` / `Message Claude` / `Search or ask a follow-up` |
| `Type a message` | The verb your product does. NN/g found Turo's generic greeting "overpromised" while Williams Sonoma's AI Sous Chef, which named three specific things it could do, set correct expectations. |
| `Model` (label) | Just the model name. The word "model" is never needed. |
| `Attach file` | `Attach` — the icon carries "file" |

### How it goes wrong

The generated composer is a bare `<input>` (not a textarea, so Shift+Enter is impossible), a
detached `Send` button to its right, and a `<select>` labelled "Model:" floating above the whole
thing in a form row. Enter submits a `<form>` and reloads the page. The input clears the instant
you click send, before the request resolves. There is no stop button — the send button stays
enabled during streaming, so double-sending is one click away. Attachments are a separate
"Upload" button that opens a modal.

---

## 2. The empty state of a new conversation

### The job

The user does not know what to type. This is not a decoration problem — it is the most consequential
screen in the product, because a bad first prompt produces a bad first answer and the user
concludes the model is bad.

The business wants the first prompt to land in a capability the product is actually good at.

### Reference implementations

**t3.chat** (walked): `How can I help you?` centered, then **two tiers**: four category pills
(`Create` / `Explore` / `Code` / `Learn`) and beneath them four literal example prompts as a
divided list — `How does AI work?`, `Are black holes real?`, `How many Rs are in the word
"strawberry"?`, `What is the meaning of life?`. The list rows are plain text with hairline
dividers, not cards. Picking a category swaps the four examples.

**v0.app** (re-walked 2026-09): `What do you want to create?` plus four *artifact-shaped*
suggestions — `Contact Form`, `Image Editor`, `Mini Game`, `Finance Calculator` — each with an icon,
followed by a **circular refresh button** that reshuffles the four. Then `Start with a template`:
a filterable gallery (`Apps and Games` / `Landing Pages` / `Components` / `Dashboards`) of community
work with author avatars and real counts (`6.6K` uses, `729` likes on the top card).

The counts are the load-bearing part. A suggestion chip asserts the product can do a thing; a
template with 14.4K uses and a screenshot proves it, and shows what the output looks like before
the user spends a prompt finding out.

Two different products, two correct and opposite answers. v0's suggestions are *nouns* because v0
builds things. t3's are *questions* because t3 answers things. Copy the structure, not the strings.

### The decisions

- **Two tiers beat one.** Four categories × four examples covers sixteen intents in the vertical
  space of eight rows. A flat list of eight prompts covers eight.
- **Suggestions must be clickable buttons, not text the user retypes.** NN/g flags this
  explicitly, and observed Scouting America's Scoutly *stopping* mid-conversation: "It doesn't have
  the option for secondary questions."
- **A reshuffle control is worth its pixel cost** (v0 ships one). Users who reject all four
  suggestions currently have to invent something from scratch; reshuffle converts a dead end into
  a second draw.
- **State the capability boundary in the empty state, not in a tooltip.** NN/g's transparency
  finding: users build correct mental models when limitations are explained *with a rationale*.
  `I can search your workspace and draft docs. I can't see files in Drive yet.` beats any amount
  of "Ask me anything."
- **Recent conversations belong here on desktop, not on mobile.** Desktop has a sidebar; the empty
  state should not duplicate it. On mobile there is no sidebar, so 3 recent threads above the
  suggestions earns its space.
- **Do not put a product tour, a changelog, or a model comparison here.** Every element that isn't
  a prompt the user can send is a tax on the first message.

### States

- **First-ever session:** suggestions + capability statement. No history.
- **Returning user, has history:** replace generic suggestions with *continuations* — Linear's
  agent panel shows the object already in context (`Mobile Triage added to context`) rather than
  asking what you want to talk about.
- **Feature gated / out of quota:** the empty state is where a quota wall belongs, because the
  user hasn't invested any typing yet. Show the reset time as an absolute local time
  (`Resets at 3:00 PM`), not a duration.
- **Connectors not yet authorized:** show the connect affordance *as a suggestion chip*
  (`Connect Gmail to draft replies`), not as a banner. It converts, and it teaches.

### Mobile

t3.chat's mobile empty state (walked, 390): **the heading and composer are vertically centered in
the viewport, not bottom-pinned**, and *both suggestion tiers are dropped entirely.* Once the
keyboard opens the composer will rise to meet it; centering it first means the transition is short
and the heading stays visible. If you keep suggestions on mobile, cap at three and make them one
line each — a wrapped suggestion chip on 390px looks like a paragraph.

### Accessibility

Suggestion chips are `<button>`s in a list, labelled with their full prompt text (not truncated),
and the heading is the page `<h1>`. Reduce-motion must kill any staggered fade-in of the
suggestions — a 400ms stagger on four chips is 1.6s before a screen-reader user can act.

### Copy

- `How can I help you?` (t3) and `What do you want to create?` (v0) both work because they name the
  *shape of the interaction*. `Welcome to [Product] AI ✨` names nothing.
- Capability line that works: `I can read this repo, run tests, and open a PR. I can't deploy.`
- Capability line that fails: `Powered by advanced AI to help you work smarter.`

### How it goes wrong

A centered gradient logo, the word `✨ AI Assistant`, a subtitle reading "Your intelligent
companion", and either zero suggestions or six identical-looking cards with three-word titles that
give no hint what the resulting answer looks like ("Summarize", "Analyze", "Create"). Suggestions
that insert text into the composer but don't send it, so the user has to click twice and doesn't
know the second click is required.

---

## 3. Streaming

### The job

The user wants to start reading before the answer is done. The business wants to hide 40 seconds
of latency. These agree — the risk is that a badly rendered stream is *worse* than a spinner,
because reflowing text is unreadable and users stop trying.

### Reference implementation

**Streamdown** (Vercel, walked docs), the renderer under AI Elements. Its decisions, in order of
how much they matter:

1. **Per-word `<span>` mount animation.** A rehype transformer splits each text node into
   per-word spans carrying `data-sd-animate`. React's reconciliation means only newly-mounted
   spans animate. Default: `fadeIn`, **150ms**. Alternatives: `blurIn` (opacity + blur;
   documented as the choice for fast models because "the blur masks the batch appearance better
   than pure opacity") and `slideUp` (fade + 4px rise).
2. **The animation is removed entirely when streaming stops.** `isAnimating={false}` excludes the
   plugin from the rehype pipeline, so a finished message is plain text with "zero DOM overhead."
   A 4,000-word answer that keeps 4,000 animation spans alive is a scroll-jank generator.
3. **Animation skips `pre`, `svg`, `math`, and `annotation`.** Never word-animate inside a code
   block — the monospace grid makes each mount visible as a jitter. Inline `code` *is* animated,
   because it's inside prose flow.
4. **Block-level memoization.** Markdown is parsed into blocks, each memoized separately; only
   changed blocks re-render, completed blocks stay stable. This is what stops mid-stream reflow
   from repainting the entire message.
5. **Unterminated-block parsing.** A stream that has emitted ` ```py\ndef f(): ` has an *open*
   code fence. Naive markdown renderers show the raw backticks, then snap into a code block when
   the closing fence arrives. Streamdown closes the block speculatively so it renders as code the
   whole time. The same applies to a half-typed `**bold`, an unclosed link `[text](htt`, and an
   unclosed table row.
6. **Caret, and the caret gotcha.** Two built-in styles — block `▋` and circle `●` —
   auto-positioned at the end of the last rendered element, shown only while `isAnimating`. The
   circle is the better default for prose; the block reads as a terminal. But the renderer, in its
   own words, "doesn't know about roles or message ordering," so you scope the caret per message
   yourself — `caret={isAssistant && isLast ? 'circle' : undefined}`. Skip that and every assistant
   message in the transcript grows a cursor at once.
7. **Link safety.** External links open a confirmation modal showing the full URL with `Copy link`
   / `Open link`, enabled *by default*, with an `onLinkCheck` safelist hook. This is a
   prompt-injection control, not a nicety: a model that was fed a poisoned page can emit a link,
   and the modal is where the user sees the real destination.

### The decisions

| Fork | Answer |
|---|---|
| Character-by-character or word-by-word? | **Word.** `smoothStream`'s default chunking is `'word'` with `delayInMs: 10`. Character-level looks like a typewriter gimmick and triples the DOM churn. |
| CJK? | **Two independent bugs; fixing one does not fix the other.** (a) *Chunking:* `smoothStream`'s `'word'` mode is documented as not working for languages that don't delimit words with spaces — Chinese, Japanese, Korean, Vietnamese, Thai — so the paragraph lands in one block. Pass a locale `Intl.Segmenter` instead. (b) *Parsing:* CommonMark fails to close emphasis adjacent to ideographic punctuation, so `**太字**。` renders as literal asterisks mid-answer. Streamdown ships `@streamdown/cjk` (remark-cjk-friendly) for exactly this. |
| Should markdown reflow mid-stream? | **Yes, but only forward.** Speculatively close open blocks so a paragraph never *becomes* a code block retroactively. The unacceptable case is text that has already been read moving. |
| Cursor treatment | A caret at the tail while streaming, removed on completion. Do not blink it faster than 1Hz and honor `prefers-reduced-motion` by rendering it static. |
| Autoscroll | Follow the stream **only if the user is already at the bottom** (within ~40px). The instant they scroll up, stop following and show a `Scroll to bottom` pill — AI Elements' `Conversation` ships exactly this: auto-scroll plus a button "that appears when not at the bottom". |
| Where does the scroll land on a new response? | **Top of the new message.** Not the bottom of the stream. NN/g, guideline 7. |
| Stop button | Replaces send, same position, same size, no layout shift. Linear's agent composer swaps the circular send arrow for a **filled square** in place. |
| After stop | Keep the partial text, mark it (`Stopped`), and offer `Continue`. Deleting a partial response on stop destroys work the user may have wanted. |

### "Thinking" before the first token

Time-to-first-token is where products lose people, and Nielsen's thresholds still govern: under
**1.0s** no feedback is needed; past **10s** users switch tasks and need "feedback indicating when
the computer expects to be done" plus "a clear way to cancel."

Between 1s and first token, the correct artifact is **a shimmer on a real sentence**, not a
spinner. AI Elements ships `Shimmer` as a first-class component: a CSS-gradient sweep across text,
default 2s duration, `text-transparent` + `background-clip` so the glyphs stay crisp. Granola uses
exactly this shape — a pill reading `⟳ Enhancing notes`, positioned *inside the document where the
output will appear*.

The sentence must name the work. Ranked worst to best:

- `Loading…` — says nothing
- `Thinking…` — says nothing, but anthropomorphized
- `Thinking…` with an elapsed counter — at least falsifiable
- `Searching your workspace…` — names the tool
- `Searching 3 sources for Q3 pricing…` — names the tool and the object

Past ~10s with no token, add the elapsed time and the stop control. Past ~30s, you are in agent
territory: switch to a step list (§9).

### States

- **Stalled mid-stream** (no chunk for >5s): keep the caret, add `Still working…` after 5s and the
  elapsed counter after 10s. Do not blank the partial text.
- **Connection dropped mid-stream**: the failure mode HN practitioners call out about SSE-based
  chat SDKs is the absence of **resumable streaming after a dropped connection** and multi-device
  handoff. If you can, persist the stream server-side keyed by message id and resume on reconnect;
  if you can't, at minimum show `Connection lost — [Retry]` beneath the partial text and keep the
  partial.
- **Tab backgrounded**: `requestAnimationFrame`-driven smoothing halts in background tabs. On
  return, flush the buffer instantly rather than replaying 4,000 words of animation.
- **Refusal arrives as a stream**: it should look identical to any other answer, not switch to a
  red alert box. See §10.

### Mobile

Reflow is worse on 390px because a single word wrapping changes the line count of the entire
paragraph. Two mitigations: block memoization (above), and `overflow-wrap: anywhere` on code and
URLs so a long token doesn't force a horizontal scroll into existence and then out of it.

Battery: per-word span animation at 150ms across a long response is measurably expensive on
mid-range Android. Gate to `(prefers-reduced-motion: no-preference)` and consider disabling on
`navigator.connection.saveData`.

### Accessibility

- **Do not put `aria-live="polite"` on the streaming region.** A live region on a token stream
  makes screen readers announce fragments continuously and is unusable. Instead: mark the message
  container `aria-busy="true"` while streaming, and announce **once** on completion via a visually
  hidden live region — `Response complete, 340 words`.
- The stop button must be reachable by keyboard *without* traversing the streaming text. Give it a
  shortcut (Escape is the convention) and document it.
- The caret is decorative: `aria-hidden`.
- `prefers-reduced-motion` disables word animation and the shimmer sweep. The shimmer becomes a
  static dimmed label; the caret becomes solid.

### Copy

- `Stop` (button, while streaming) — not `Cancel`, which implies undoing.
- `Stopped` (marker on a partial response) with `Continue` beside it.
- `Still working… 24s` after a stall.
- `Connection lost. [Retry]` — and never `Something went wrong`.

### How it goes wrong

`setInterval` appending one character every 20ms to `innerHTML`, re-parsing the entire markdown
string on every tick. Markdown that renders as literal `**asterisks**` until the closing pair
arrives, then snaps. A three-bouncing-dots animation that stays on screen for the entire response
*next to* the streaming text. Autoscroll pinned to the bottom, so the user chases the text
downward and never reads the first paragraph. No stop button. A finished message that still holds
6,000 animation spans, making the scroll container stutter.

---

## 4. Reasoning and tool calls

### The job

The user wants to know whether to trust the answer, and — when it's wrong — where it went wrong.
The business wants to demonstrate work without exposing a wall of JSON that makes the product look
like a debugger.

Disclosure builds trust when it is **checkable**. `Read pricing.md, lines 40–80` is checkable.
`Analyzing your request…` is theater. The test: could a user act on this line — open the file,
dispute the source, notice the wrong table was queried? If not, it is noise, and it should be
collapsed or removed.

### Reference implementation

**AI Elements `Tool`** (walked; screenshot shows all seven states stacked). Anatomy per row:
a wrench glyph, the tool name in monospace (`database_query`), a status pill with its own icon,
and a disclosure chevron at the far right. Expanded, it shows a `PARAMETERS` label and the input
JSON in a bordered box, then output below.

The seven states and their colors as rendered:

| State | Pill | Meaning |
|---|---|---|
| `Pending` | grey hollow circle | Input still streaming — the model hasn't finished writing the arguments |
| `Awaiting Approval` | **amber clock** | Blocked on the user. The only state that needs attention. |
| `Running` | grey clock | Executing |
| `Responded` | blue check-circle | The user answered the approval |
| `Completed` | **green check** | Output available |
| `Error` | **red ⊗** | Threw |
| `Denied` | grey | The user rejected it |

Two of these are the ones bolted-on implementations lose. `Pending` vs `Running` is the difference
between "the model is still deciding what to search for" and "the search is in flight" — and when
a tool hangs, the user needs to know which. `Denied` must remain visible in the transcript
forever: a conversation where a rejected action silently vanishes is one where the user can't
verify their own refusal held.

**Correction from this pass: AI Elements does not ship the collapse rule the previous pass
attributed to it.** In the live preview (re-walked 2026-09, 1440 and 390) the only expanded row is
`Pending` — input still streaming — while `Awaiting Approval`, `Responded`, `Running`, `Completed`
and `Error` are all collapsed, including the one blocked on the user. Build the rule yourself:
**collapse the past, expand the present, and never collapse anything waiting on the user or
anything that failed.** Copying the demo's default buries the approval that is holding up the run
behind a chevron.

**AI Elements `Reasoning`** (walked): "automatically opening during streaming and closing when
finished." Trigger line reads `Thought for a few seconds`. One important note buried in its docs:
models with high reasoning effort return *multiple* reasoning parts, and the recommended handling
is to **consolidate them into a single component** — otherwise the transcript shows a stack of
four separate "Thinking…" blocks for one turn, which reads as a stutter.

**AI Elements `ChainOfThought`** goes further for search-shaped work: named steps with
`complete` / `active` / `pending` statuses, each carrying its own evidence — the preview shows
`Searching for profiles for Hayden Bleasel` with three domain badges (`www.x.com`,
`www.instagram.com`, `www.github.com`) beneath it, then `Found the profile photo` with the image
inline. That is what a checkable reasoning display looks like: every step carries the artifact it
produced.

**Cursor's `Task`** equivalent (via AI Elements' `Task`): a progress counter showing
completed vs total, with rows like `Read React page.tsx`, `Scanning 52 files`, `Scanning 2 files`.
Note the second and third rows — it shows the count *shrinking* as the search narrows, which is
information; a generic `Searching…` is not.

### The decisions

- **Collapsed by default, with a summary line that survives the collapse.** The summary must
  contain the noun. `Read 4 files` is weak; `Read pricing.md, plans.ts, +2` is strong.
- **How much to show when expanded:** the *input* always (that's what makes it checkable) and the
  *output* only if it's small or structured. A 40KB tool result gets a scrollable box capped at
  ~200px with a `Show all` — never dumped inline.
- **Auto-expand exactly two things:** reasoning while it streams (then auto-collapse), and
  anything in `Awaiting Approval` or `Error`.
- **Never auto-collapse an error.** The user needs to read it, and an auto-collapse on completion
  will fire on the error too if you don't special-case it.
- **Group repeated calls.** Eight `read_file` calls in a row become one row: `Read 8 files ⌄`.
  Un-grouped, they push the answer three screens down.
- **Timing on tools, not on thinking.** `Ran tests · 1m 12s` is useful (it tells you the test suite
  is slow). `Thought for 8 seconds` is not — it's a number the user can do nothing with. If you
  show thinking duration, show it only past ~5s, where it's an explanation for the wait.
- **When disclosure is noise:** consumer chat, single-tool products, and anything where the tool
  is invisible infrastructure (embedding lookup, safety classifier). Showing `Called
  embed_query()` builds zero trust and costs a row.
- **When disclosure is the product:** coding agents, research products, anything acting on the
  user's data. Here the tool log *is* the audit trail and should be exportable.

### States

- **Tool running >10s** → the row grows an elapsed timer and a per-tool cancel. A tool that can't
  be cancelled individually forces the user to kill the whole turn.
- **Tool failed, model retried** → show both attempts, nested, with the retry indented. Hiding the
  failed attempt makes the model look luckier than it is.
- **Tool output too large for context** → say so in the row: `Read 1.2MB · truncated to first
  200 lines`. Silent truncation is the root cause of a huge class of "the AI ignored my file"
  reports.
- **Permission wall** → §6.

### Mobile

Tool rows are the first thing to over-narrow, and AI Elements shows the limit rather than
avoiding it: at 390px the `database_query` + `Awaiting Approval` row has *zero* gap left between
name and pill — on a 14-character tool name and a two-word status. `search_customer_records` does
not fit. Budget accordingly: on 390px keep the status pill, keep the tool name, drop the parameters
preview from the collapsed row entirely, and shorten the *status label* before the tool name
(`Awaiting` beside an amber clock still reads; `datab…query` does not). Never truncate a file path from the
right — `src/components/settings/Billin…` is useless; truncate from the *left*
(`…/settings/BillingForm.tsx`) so the filename survives.

### Accessibility

- Each tool row is a `<button>` with `aria-expanded`, controlling a region by `aria-controls`.
- Status must not be color-only. Every pill in AI Elements carries an icon *and* a word — that
  combination is the requirement, and it is why `Completed` says "Completed" instead of just
  turning green.
- The expanded JSON is in a `<pre>` inside a labelled region, keyboard-scrollable
  (`tabindex="0"` on the scroll container, or it's unreachable by keyboard).
- Announce state transitions on a *per-tool* live region only for the transition into
  `Awaiting Approval` and `Error` — not for every `Running → Completed`.

### Copy

| Generic | Better |
|---|---|
| `Using tool: web_search` | `Searched the web · 5 results` |
| `Executing…` | `Running npm test` |
| `Tool call failed` | `npm test exited with code 1 · 3 failing` |
| `Thought for 12 seconds` | `Thought for 12s · considered 3 approaches` (if you can summarize) or nothing |
| `Analyzing your request` | delete it |

### How it goes wrong

A grey box labelled `🔧 Tool Call` containing raw JSON, always expanded, one per call, so a
ten-tool turn produces ten screens of `{"query": "..."}` before a single sentence of answer.
Or the opposite: a single generic `Working…` spinner that hides everything, so when the agent
queries the wrong table there is no evidence anywhere in the transcript. Status conveyed only by
a coloured dot. Errors that auto-collapse with the completed calls. Reasoning rendered as a
stack of four separate "Thinking…" blocks for one turn.

---

## 5. Citations and sources

### The job

The user wants to check one specific claim. The business wants to look sourced. These conflict
constantly: a list of 12 sources at the bottom makes the product *look* rigorous and makes any
individual claim *harder* to verify, because the mapping from sentence to source is gone.

### The four public approaches

**Perplexity** — numbered inline pills `[1]` immediately after the clause they support, rendering
as small rounded chips with the source favicon; plus a Sources strip above the answer showing
domain + title cards with a `+N` overflow. Hovering a pill previews the source. The strong choice
here is **density of inline markers**: nearly every sentence carries one, which makes the
answer feel like a research digest and makes any single claim traceable. The cost is visual noise
and a reading rhythm broken every clause. (Described from documentation and from the
component-library clones below; perplexity.ai served a Cloudflare human-verification interstitial
to a headless browser during this evaluation.)

**ChatGPT** — sparse inline markers rendered as the site's favicon rather than a number, plus a
collapsible source list. Fewer markers per paragraph than Perplexity. Also ships a **link
confirmation modal** before navigating out, which Streamdown reproduces as its default
`linkSafety` behavior: full URL, `Copy link`, `Open link`, dismiss on backdrop or Escape.

**Claude** — citations attached at the *block* level for document-grounded answers, with the
quoted span highlighted in the source when you open it. The differentiator is that the citation
points to a **span inside the document**, not to the document, which is the only version that
actually answers "where did you get that."

**Notion AI** — sources render as page mentions in Notion's own link style, indistinguishable from
a human-written page reference. That is the right integration call: inside a workspace, a citation
*is* a page link, and inventing a second citation visual would create two ways to reference the
same object.

**AI Elements** gives you both primitives, and they are meant to be used together:
- `InlineCitation` — a **hover card on a pill** reading `example.com +5`, i.e. the primary domain
  plus an overflow count, appearing at the end of the supported sentence.
- `Sources` — a collapsed trigger reading `Used 3 sources` that expands to the list.

### The decisions

| Fork | Answer |
|---|---|
| Inline markers or a source list? | **Both, and the inline marker is the primary.** A source list alone cannot answer "which sentence came from where." |
| Number or favicon? | Favicon + domain beats a bare number. `[3]` requires a lookup; `stripe.com` is the answer. Use a number *as well* only if the source list is long enough to need an index. |
| Where does the marker go? | End of the clause it supports, before the period. Not end of paragraph — that's what makes citations unfalsifiable. |
| Hover card contents | Domain, title, and the **quoted span** if you have it. A hover card showing only the URL adds nothing over the pill. |
| Click behavior | Open the source. If you interpose a link-safety modal (recommended for anything with web-search output — a poisoned page can emit a link), the modal must show the **full URL**, not the display text. |
| Multiple sources for one claim | Collapse to `domain.com +N` rather than `[1][2][3][4]`. |
| Sources with no inline anchor | These are "consulted but not cited." Put them in the list, dimmed, under a separate label — merging them with real citations inflates apparent rigor. |
| Retrieval found nothing | Say it in the answer, not by omitting the source strip. `I couldn't find anything in your workspace about Q3 pricing; this is from general knowledge.` |

### States

- **Sources still loading while the answer streams** — render skeleton pills in place so the text
  doesn't reflow when they arrive. A citation appearing mid-sentence after the sentence is written
  shifts every subsequent line.
- **Source is behind a paywall / 404 now** — mark it in the hover card. A citation to a dead link
  is worse than no citation because it can't be checked and the user can't tell why.
- **Source is the user's own document** — use the product's native reference style (Notion's
  approach), and respect permissions: never cite a document the *current viewer* can't open. In a
  shared thread this is a real leak vector.

### Mobile

Hover cards do not exist. On touch, an inline pill must open a **bottom sheet** with title,
domain, snippet, and `Open`. Do not make the pill a direct navigation: a mis-tap on a 20px pill leaves the product, and coming
back restores the thread at the top, not at the sentence being read. Make the pill's tap target
≥44px even though its visual is smaller.

### Accessibility

- The pill is a `<button>` (opens a card) or an `<a>` (navigates) — not a `<span>` with an
  onClick, which no keyboard and no screen reader can reach.
- Accessible name must be the source, not the marker: `aria-label="Source: stripe.com, Pricing
  and fees"`. A screen reader announcing "link, 3" fourteen times in a paragraph is why users turn
  citations off.
- The source list needs a heading and a count so it can be skipped by landmark navigation.
- Inline pills must not break text selection — a user copying a paragraph should get the prose,
  with citation text either included as `[stripe.com]` or excluded, consistently.

### Copy

- `Used 3 sources` (AI Elements' trigger) beats `Sources (3)` — it's a sentence about what
  happened.
- `Consulted, not cited` for the dimmed tier.
- `I couldn't find this in your workspace — this is from general knowledge.` for the ungrounded case.

### How it goes wrong

A `Sources:` heading at the bottom followed by twelve bare URLs, none of which map to any sentence.
Or superscript numbers that link nowhere. Or citations the model generated as *text*, never
validated against a real retrieval result, so `[2]` points at a URL that
does not exist. If your citations are not derived from actual retrieval metadata, do not render
them at all; a fabricated citation is a lie with a UI affordance attached.

---

## 6. Confirmation before side effects

**The single most important pattern in this document.** Every other failure here is recoverable
inside your product. This one lands outside it — a sent email, a charged card, a dropped table —
where your undo does not reach.

### The job

The user wants to not be asked. The business needs them to be asked, exactly when it matters. The
resolution is not "ask less" — it's **make the ask carry enough information to be answered in
under two seconds**, and make the permission you grant *bounded and legible*.

### Reference implementation: Claude Code's permission system

Walked via its own documentation. It is the most fully-specified public design, and the parts to
steal are:

**1. The permission is tiered by tool class, and the persistence differs per class:**

| Tool type | Approval required | "Yes, and don't ask again" persistence |
|---|---|---|
| Read-only (reads, grep) | No, within the working directory | n/a |
| Bash | Yes, except a built-in read-only allowlist | **Permanently, per repository and per command** |
| File modification | Yes | **Until session end only** |
| Web fetch | Yes, except preapproved doc domains | Permanently, per repository and per domain |
| Web search | Yes | Permanently, per repository |

The asymmetry is the design. A `npm test` grant is safe forever because the command string is the
scope. A file-edit grant is *not* saved to disk, because "edit files" is an unbounded scope that
would silently widen as the session continues.

**2. "Don't ask again" is offered only when the prompt can display everything it would allow.**
Verbatim: "Claude Code offers those options only when the prompt can show you everything they
would allow, so a rule you save from a prompt covers only what its option named." The option
disappears in three cases: the command or edit is too large to show in full; the label can't fit
all the commands or paths the rule would cover; the starting directory can't be displayed safely.

This is the rule most products get backwards. They offer "always allow" on the *scariest* prompts,
because those are the ones that recur. Invert it: **the less you can show, the less you may grant.**

**3. Compound actions decompose.** Approving `git status && npm test` saves a *separate* rule per
subcommand (up to 5), so the future grant is recognized regardless of what precedes it — and,
critically, deny/ask rules "apply when any subcommand matches them, including a command nested
inside a subshell, a command substitution, or a control-flow body." An approval cannot be smuggled
through `$(...)`.

**4. Rejection carries a reason, and the reason is what keeps the agent alive.** On Yes or No,
`Tab` opens a comment field submitted with the answer. `Yes` delivers the note after the result;
`No` delivers it as the reason for the denial and **the agent keeps working** — while a bare `No`
with no comment, from the main conversation, **stops the turn**. That asymmetry is the whole
mechanism: the cheapest path back into flow is to say why you refused, so the interface stops
being a gate and starts being a steering wheel. Note also where the field is deliberately absent —
WebFetch and browser prompts, and any option that saves a rule or grants for the session. You may
annotate one decision; you may not annotate a standing grant.

**5. Modes are a first-class concept, not a settings toggle:** Manual (ask), `acceptEdits`
(auto-accept file edits and `mkdir`/`touch`/`mv`/`cp` within the working directory),
`plan` (read and explore, never write), `auto` (a classifier reviews actions instead of the human),
and `bypassPermissions`. Even in `bypassPermissions`, protected paths like `.git` and `.claude`
still prompt. **There is always a floor.**

### Reference implementation: the visual

**AI Elements `Confirmation`** (walked) is the minimal shape: an alert-styled box containing the
request sentence with the *literal target inlined as code* — `This tool wants to delete the file
/tmp/example.txt. Do you approve this action?` — and two buttons right-aligned: `Reject` (outline)
and `Approve` (solid). Post-decision it collapses to `You approved this tool execution` /
`You rejected this tool execution`. The page documents three example states — Approval Request,
Approved, Rejected — rendered by `ConfirmationRequest` / `ConfirmationAccepted` /
`ConfirmationRejected`, driven by the AI SDK `ToolUIPart` states (`approval-requested`,
`approval-responded`, `output-denied`, `output-available`).

**And here is what's wrong with it, precisely** — use it as the diagnostic for your own:

- `Approve` is the solid blue primary on a **file deletion**. Destructive confirmations should give
  the safe option the visual weight, or give both buttons equal weight. A blue primary on
  "delete" trains the reflex you least want.
- It shows no consequence and no reversal. `/tmp/example.txt` — 4KB, modified 2 hours ago,
  not in git — is a different decision than the same path holding a week of work.
- There is no scope option at all: no "allow for this session", no "allow for this directory."
  So every subsequent delete re-prompts identically and the user learns to click through.
- No `Esc`-to-reject, no visible keyboard hint.

### What the confirmation must show

Five things, in this order:

1. **The verb and the object, literally.** `Send email to alex@acme.com` — not `Perform action`.
2. **The full payload, rendered as itself.** An email shows From / To / Subject / body in a mail
   shape. A DB write shows the SQL. A deploy shows the target environment, the commit SHA and the
   diff summary. A purchase shows the line item, the amount, and the last four of the card. If the
   payload is too long to render, that is a signal to split the action, not to summarize it.
3. **The blast radius.** `3 recipients`, `will overwrite 12 rows`, `production`, `$1,240.00`,
   `irreversible`. Numbers, not adjectives.
4. **Reversibility.** `You can undo this for 30 seconds` / `This cannot be undone`. If it *is*
   reversible, say so — it converts a hard decision into an easy one.
5. **The scope of the grant, if you're offering one.** `Allow sending to @acme.com for this
   session` is a grantable scope. `Always allow email` is not.

### Making approve/reject fast

- **Keyboard first.** Enter approves, Escape rejects, and both are labeled in the UI. If the
  confirmation is destructive, do *not* bind Enter to approve — require an explicit key or click.
- **Inline in the transcript, not a modal**, for anything the agent does mid-run. A modal blocks
  the user from scrolling up to check the context that would let them decide. Claude Code, Cursor
  and AI Elements all render approval *in the stream*.
- **A modal is correct in exactly one case:** the action is irreversible *and* high-value *and* the
  user initiated something else. Then interrupt.
- **Diff, don't describe.** For any edit, show the actual diff with syntax highlighting. Cursor's
  agent review shows the diff "as they happen" with `Stop` on `Cmd+Shift+Backspace`.
- **The reject path must accept a reason** (see above) and must be one action, not "reject → type
  a new prompt → resend."

### Batches of pending actions

This is where products fail hardest, because the naive design is a queue of identical modals.

- **Group by kind and show a table.** `4 emails to send` with rows of recipient + subject, each
  row independently checkable, plus `Approve selected` / `Reject all`. Not four sequential dialogs.
- **Per-row expand** for the full payload; the collapsed row shows only the fields that
  differentiate the rows.
- **Never auto-approve the remainder** after the user approves the first. The most dangerous
  pattern in agent UX is "Approve all" positioned as the primary on a batch the user hasn't read.
  If you offer `Approve all`, it must be secondary and it must require the user to have expanded
  at least one row.
- **A pending-actions inbox** for anything asynchronous. Linear's agent inbox (re-walked 2026-09)
  groups work under `Assigned` / `Created` tabs with a collapsible `In progress` group of issue
  rows. *The `Needs information · 2` count cited in the previous pass was not visible on
  `linear.app/agents` this time — treat the count as the recommendation, not as observed Linear
  behavior.* The shape is what matters: the agent's blocked work is a **list with a count**,
  surfaced outside the conversation, so it doesn't depend on the user having the thread open.
- **Expire pending approvals.** An approval request that has sat for 3 days should expire with a
  visible `Expired — the agent stopped waiting`, not execute when someone finally clicks it.

### States

- **Approved, then the action fails** → this is a distinct state from "rejected." The row must read
  `Approved · failed: SMTP 550` and offer retry. Collapsing it into a generic error loses the fact
  that the user consented.
- **User walks away** → the agent must halt and persist, not time out into either default. On
  return, the pending action is still there with its original payload and a note of how long it
  waited.
- **Permission genuinely unavailable** (no OAuth scope, admin-disabled) → this is not a
  confirmation, it is a wall. Show what's missing, who can grant it, and offer to draft the request.
  `Sending email needs the Gmail connector. [Connect] · Your admin disabled this — [Request access]`
- **The action was already performed** (double-submit, resumed session) → detect and say so:
  `Already sent at 2:14 PM`. Idempotency keys on side-effecting tools are a UI requirement, not
  just a backend one.

### Mobile

Approve/reject on a phone is where accidental approvals happen. Requirements:

- Buttons ≥48px tall, full-width, stacked, **with the destructive option on top and a gap of at
  least 16px between them** — thumb-reach on a 390px screen puts the bottom button under the
  resting thumb.
- Never place `Approve` where the send button was one frame earlier.
- The payload must be scrollable *inside* the confirmation without the confirmation scrolling out
  of view.
- Push notification for an approval that arrives while the app is closed must contain the payload
  summary, and the action buttons in the notification should be **reject and open**, never
  "approve" — approving from a notification is approving something you didn't read.

### Accessibility

- The confirmation is `role="group"` with an accessible name naming the action, announced once via
  a polite live region when it appears mid-stream. Not `role="alertdialog"` unless it truly is a
  focus-stealing modal.
- Focus does **not** jump to the confirmation automatically during streaming — that yanks a
  keyboard user out of the text they're reading. Instead announce it and provide a shortcut to
  jump to the pending approval.
- Approve and Reject must be distinguishable without color: different labels (they already are),
  and the destructive one carries an icon.
- The payload region is keyboard-scrollable and labeled.

### Copy

| Generic | Specific |
|---|---|
| `Are you sure?` | `Send this email to alex@acme.com and 2 others?` |
| `This action cannot be undone.` | `This deletes 1,204 rows from `orders`. There is no undo.` |
| `Confirm` / `Cancel` | `Send email` / `Don't send` — label the button with the verb it performs |
| `Allow` | `Allow `npm test` in this repo` — name the scope in the button |
| `Approve all` | `Approve all 4 emails` — the count belongs in the label |
| `Error` | `Approved, but sending failed: SMTP 550 mailbox full. [Retry]` |

The button-label rule is worth stating alone: **a confirmation button must be labeled with the
action it takes, never with `Confirm`/`Yes`/`OK`.** A user who reads only the buttons must still
make the right choice.

### How it goes wrong

A browser `confirm()` reading "Are you sure you want to proceed?" A modal that says `The AI wants
to perform an action` with no payload. `Approve` as a blue primary next to a grey `Reject`, on a
delete. An `Always allow` checkbox that grants an unbounded scope the dialog never displayed. Four
stacked modals for four emails. `Approve all` as the primary button. An approval that silently
disappears from the transcript once answered, so there's no record of what was consented to. A
pending approval that executes when clicked three days later. And the worst: an agent that
performs the action and shows a confirmation *afterward*, framed as a notification.

---

## 7. Editing, regenerating and branching

### The job

The user's prompt was slightly wrong and they want to fix it without retyping or losing the thread.
The business wants the retry to be cheap and the good version to be findable later.

### Reference implementations

**AI Elements `MessageActions`** (walked): a row of icon buttons under the last assistant message
only — `Retry` (refresh icon, calls `regenerate()`) and `Copy`. Two actions, on the last message,
hidden elsewhere. Restraint is the design: an actions row on *every* message doubles the visual
weight of the transcript.

**Branching:** AI Elements is explicit that "the AI SDK does not provide built-in branching
support" — you build it. So the public reference is ChatGPT's: editing a user message forks the
conversation, and a `‹ 2/3 ›` pager appears on that message letting you walk siblings. The pager
lives on the *edited message*, and switching it swaps everything downstream.

**Cursor's `Checkpoint`** (walked docs) is the more interesting mechanism because it separates two
things products usually conflate: "Agent automatically creates them before making significant
changes, capturing the state of all modified files" and — critically — **"Restoring a checkpoint
reverts files only; it does not remove messages from the conversation."**

That split is the correct model. **The conversation is an append-only log; the workspace is
mutable state.** Restoring rewinds the world without rewriting history, so the user can still read
what went wrong. AI Elements' `Checkpoint` component reproduces it as a horizontal rule across the
transcript with a `Restore checkpoint` control, visually separating conversation segments.

### The decisions

| Fork | Answer |
|---|---|
| Edit-and-resend: replace or branch? | **Branch.** Replacing destroys the original prompt, which is often the thing the user wanted to compare against. |
| Where does the branch pager live? | On the message that forked, as `‹ 2/3 ›`. Not in a sidebar — the fork is a property of that turn. |
| Regenerate: same params or offer choices? | Offer a small menu on long-press/right-click: `Try again`, `Try again with [other model]`, `Make it shorter`. A bare regenerate that produces a near-identical answer is the most-complained-about button in AI chat. |
| Compare two outputs | Side-by-side, only when the user asks. Auto-generating two variants doubles cost and forces a decision the user didn't want. |
| Actions on every message or the last one? | Last assistant message by default; reveal on hover for older ones. |
| Does restoring a checkpoint delete messages? | **No.** Revert the workspace, keep the log. |

### States

- **Editing a message mid-stream** → block it, and say why: `Wait for the response to finish, or
  Stop first.` Silently discarding the edit is worse.
- **Branch created but never returned to** → the pager persists. Do not garbage-collect abandoned
  branches; users come back to them.
- **Regenerating the last message when it was already stopped** → this should continue, not
  restart. Two different intents, two different buttons.
- **Editing a message that had attachments** → the attachments stay attached and re-editable. A
  huge share of edit-resend flows lose the attachment.

### Mobile

Hover-revealed action rows do not exist. Either show them persistently on the last message (costs
a row) or put them behind long-press → context sheet. Long-press is the better call: it matches the
platform convention for messages, and it gives you room for `Copy`, `Retry`, `Select text`,
`Report` without a cramped icon strip.

The branch pager must be a real tappable control (≥44px), not a 12px `‹ ›`.

### Accessibility

- Branch pager is a labeled group: `aria-label="Response 2 of 3"` with prev/next buttons that
  announce the new position on activation.
- Edit puts focus into the editable field and announces `Editing your message`. Escape cancels and
  returns focus to the message.
- The actions row must be reachable in DOM order right after the message it belongs to, not
  appended at the end of the transcript.

### Copy

`Try again` beats `Regenerate` (which is jargon). `Edit` beats `Modify`. `Restore checkpoint`
beats `Undo` — it names the mechanism, and it doesn't promise a full undo it can't deliver.

### How it goes wrong

An edit that silently rewrites history with no fork and no indication anything changed, so the
user's earlier reasoning is gone. A `Regenerate` button that returns nearly identical text with no
option to steer. Copy buttons that copy the rendered HTML instead of the markdown. An icon-only
action row with no labels and no tooltips. Checkpoints that revert the conversation as well as the
files, so the user loses the record of the mistake they were trying to learn from.

---

## 8. Artifacts, canvas and diff panes

### The job

The user wants to *use* the output — edit it, run it, share it — not scroll past it. The business
wants the chat to remain the primary surface because that's where the next prompt comes from.

### When output should leave the stream

Score it — the criteria are not equal weight, and an unweighted count gets this wrong:

- **Iterated** rather than read once — code, a doc, a design. **+2**
- **Referenced while typing the next message.** If the user must see it *and* the composer at the
  same time, it cannot live in the scroll. **+2**
- Exceeds roughly **one viewport** of the chat column. **+1**
- Has its own **actions** — run, download, deploy, copy-as-file. **+1**
- Has **versions** the user will compare. **+1**

**Three or more → panel. Under three → inline.** Note what that excludes: a long output with a
download button scores 2 and stays inline, correctly — length alone has never justified a pane.

Keep it inline when it's a snippet, a table, a single image, or anything the user will read once
and move past. Promoting a 6-line function to a panel is worse than leaving it — it costs a
context switch to read six lines.

### Reference implementation

**AI Elements `Artifact`** (walked): a bordered container with a header carrying title
(`Dijkstra's Algorithm Implementation`), a subtitle with **relative freshness** (`Updated 1 minute
ago`), and a right-aligned action group — `Run`, `Copy`, `Regenerate`, `Download`, `Share` — each
with a tooltip, plus an optional close. Content below.

Two decisions inside that header are worth naming. The **timestamp** exists because in a
multi-turn session the artifact and the conversation drift; a user scrolled up in chat needs to
know whether the panel is showing the thing being discussed. And `Regenerate` living on the
*artifact*, not in the chat, means iteration doesn't require composing a sentence.

**Cursor** (docs walked) shows the other half: the diff pane. Changes render "as they happen" in a
diff view while the agent works, with `Stop` on `Cmd+Shift+Backspace` to "cancel and redirect."
Review escalates in three tiers: `@Branch` in a prompt to hand the agent the full branch diff;
`Review → Find Issues` after a task, which "analyzes proposed edits line by line"; and Agent Review
in the Source Control tab comparing against main.

### How the two panes relate

- **The chat is the controller; the panel is the object.** Every mutation originates in chat or in
  the panel's own action row — never in a third place.
- **Selection in the panel becomes context in the composer.** Selecting lines 40–60 and typing
  should implicitly scope the next message to that selection, with a visible chip in the composer
  saying so. Without this the panel is a read-only viewer and the user resorts to pasting.
- **The chat message that produced the artifact becomes a card**, not the full content. Clicking
  the card opens the panel at that version. This is what makes the transcript scannable at
  10 turns.
- **Versions live on the artifact, not the chat.** A `v3 ⌄` control in the artifact header, with
  the ability to diff v2→v3, beats scrolling the transcript for the older copy.
- **Split ratio:** roughly 40/60 chat/panel on desktop, and the chat column must not go below
  ~360px or the composer controls collapse. Make it draggable and remember it per user.

### States

- **Streaming into the panel** — the panel opens on first token, showing the partial with the same
  smoothing rules as chat. It must not open *after* generation completes, which produces a jarring
  layout shift at the worst moment.
- **Panel open, user asks an unrelated question** — keep the panel, don't clobber it. Opening a
  second artifact should produce a tab or a stack, not a silent replace.
- **Artifact fails to render** (broken code, invalid JSON) — show the error *in* the panel with the
  raw source still visible and copyable. Never blank the panel.
- **Long-running preview build** — the panel shows the previous working version with a build
  indicator, not a spinner over an empty pane.
- **Read-only artifact** (shared link, no permission) — say so in the header, and disable the
  action buttons rather than removing them, so the shape stays comparable.

### Mobile

There is no split pane. The artifact becomes a **full-screen sheet over the chat** with a drag
handle, `Done` at the top-left, and the action row pinned at the bottom above the safe area.

Critically: the composer must be reachable *from* the sheet. Either the sheet is a partial-height
detent with the composer visible beneath, or the sheet gets its own inline composer scoped to the
artifact. The failure mode is a full-screen artifact the user must dismiss to type, and dismissing
loses their scroll position in the artifact.

Never render a horizontally-scrolling diff on 390px. Use a unified (single-column, +/- prefixed)
diff on narrow screens and split diff only past ~900px.

### Accessibility

- Opening the panel moves focus to the panel heading and announces it. Closing returns focus to
  the message card that opened it — this round-trip is the thing that is always missed.
- The panel is a labeled `<aside>`/`region`, not a `dialog`, on desktop — it isn't modal and must
  not trap focus. On mobile as a sheet, it *is* modal and does trap.
- Diff colors must not be the only signal: `+`/`-` prefixes and per-line `aria-label`
  (`Added line 42`). Red/green diffs are unusable for ~8% of men.
- The resize handle needs keyboard support (arrow keys adjust the split) and an accessible name.

### Copy

`Updated 1 minute ago` (relative, in the header) beats a timestamp. `Run` beats `Execute`.
`Open in editor` beats `Expand`. For the read-only case: `View only — you don't have edit access`
beats a disabled button with no explanation.

### How it goes wrong

The artifact renders as a code block in the chat *and* in a panel simultaneously, so the same 200
lines appear twice. The panel opens after generation with a hard layout shift. There's no version
history, so "go back to the previous one" means re-prompting. Selection in the panel doesn't reach
the composer, so users paste code into chat to talk about code that's already on screen. On mobile
the panel is a full-screen route with no way back to the composer. Focus is never moved into the
panel, so keyboard users can reach it only by tabbing through the entire transcript.

---

## 9. Agent progress: what to show at 4 minutes

### The job

The user needs to know it's alive, whether it's on track, and how to stop it. The business wants
them to not cancel a task that's 80% done.

The single most important thing: **at four minutes the user is not watching.** Everything here is
designed for someone returning to a tab, not staring at one.

### Reference implementations

**Cursor's queue and steering** (docs walked) is the best-specified public model:

- **Enter queues, Cmd+Enter sends immediately.** Queued messages "appear in order below the active
  task," can be **dragged to reorder**, and "Agent processes them sequentially after finishing."
- An immediate message "is appended to the most recent user message in the chat and processed right
  away."
- **Steering:** a follow-up "is delivered at the agent's next tool call instead of cutting off work
  mid-action, which preserves in-flight work and keeps the agent on task." Press Enter twice or
  `Send now`.
- **Stop:** `Cmd+Shift+Backspace` to "cancel and redirect."

That three-way split — queue / steer / stop — is the design. Most implementations ship only stop,
which forces the user to destroy in-flight work to say one sentence.

**AI Elements `Task`** (walked): a collapsible list with pending / in-progress / completed / error
icons, a **progress counter showing completed vs total**, and expandable per-task detail. Rows read
like `Found project files`, `Read React page.tsx`, `Scanning 52 files`.

**AI Elements `Plan`** (walked): a card with a title (`Rewrite AI Elements to SolidJS`), a
paragraph of scope, a collapse toggle, and a `Build ⌘↩` primary. The plan is a **reviewable
artifact with its own commit action** — the user reads and approves the plan before any work
starts. Cursor does the same: plans are saved as markdown files the user can edit, with the
guidance to revert and refine the plan rather than fix mid-implementation.

**Linear's agent sessions** (walked): a floating panel with minimize / expand / close, agent name +
model badge (`Opus 5`), and — the detail worth copying — a line under the user's message reading
`⚓ API launch  added to context` — a dimmed line of its own, under the prompt and above any
output. **Show what was auto-attached, as its own line, before the work starts.** It's the cheapest correction opportunity in the whole flow.

### What to show, by elapsed time

| Elapsed | Show |
|---|---|
| 0–1s | Nothing |
| 1–10s | Shimmering label naming the work + stop |
| 10–60s | Step list, current step highlighted, elapsed counter, stop |
| 1–5 min | + counter (`Step 4 of 9`), + per-step durations, + the artifact so far (files touched, diff growing), + queue affordance |
| 5 min+ | + the ability to leave: a notification when done, a persistent entry in a sessions list, and a resumable URL |

**Never show a percentage you can't compute.** A fake progress bar that sits at 90% for two minutes
destroys more trust than no bar. A step counter (`4 of 9`) is honest when the plan is known; when
it isn't, show only elapsed and the current step.

### Interruption and resumption

- **Stop must be instant and idempotent.** Clicking stop twice must not error.
- **Stopping preserves work.** Show what completed: `Stopped after 6 of 9 steps. 4 files changed.`
  with `Continue` and `Revert`.
- **Resuming a session from another device** should restore the step list and the partial artifact,
  not just the transcript. The HN complaint about the whole SSE-chat category is precisely the
  missing piece here — no resumable streaming after a dropped connection, no multi-device support —
  and it becomes acute at agent timescales.
- **The tab closes.** Long-running work must not be tied to a socket. If it is, say so up front:
  `Keep this tab open` is honest; silently dying is not.

### States

- **Agent blocked on approval at minute 3** — this is the state that needs to escape the tab. Push
  it to the sessions list with a count (Linear: `Needs information · 2`) and notify.
- **Agent is looping** (same tool, same args, 3+ times) — detect it and surface it:
  `Retried the same search 3 times.` with a stop suggestion. Users watching an agent loop for ten
  minutes arrives as a support ticket, not a bug report.
- **Agent finished but the result is empty** — say so explicitly rather than showing a completed
  checklist with no output.
- **Rate-limited mid-run** — pause, don't fail. Show `Paused — rate limited. Resuming at 3:14 PM.`
  and auto-resume.

### Mobile

An agent session on mobile is a **task, not a conversation**. Model it as one: a row in a list with
a status, a progress fraction, and a timestamp; tapping opens the detail. The chat transcript is
the detail view, not the entry point.

Push notification on completion is required, and its body must contain the outcome
(`Opened PR #482 · 12 files changed`), not `Your task is complete`. Notifications for *approval
requests* need reject + open actions only (§6).

### Accessibility

- The step list is an ordered list with `aria-current="step"` on the active row.
- Announce step transitions on a polite live region, **throttled to at most one announcement every
  ~5s** — a step list that changes every 400ms is a screen-reader denial of service.
- The elapsed counter must not be in a live region at all.
- Stop is the first focusable element in the progress region, and bound to Escape.

### Copy

- `Step 4 of 9 · Running tests` beats `Working…`
- `Stopped after 6 of 9 steps. 4 files changed. [Continue] [Revert]` beats `Cancelled`
- `Paused — rate limited. Resuming at 3:14 PM.` beats `Error: 429`
- `Retried the same search 3 times — it may be stuck. [Stop]` beats silence
- `Mobile Triage added to context` (Linear) beats no attribution at all

### How it goes wrong

A spinner and the word "Thinking" for four minutes. A progress bar that animates to 90% on start
and stops. No stop button, or a stop button that leaves the backend running. Steps that appear only
after they complete, so the current step is always invisible. Every message the user types while
the agent works being either dropped or treated as an interrupt. A session that dies when the tab
closes with no warning and no resumption. Completion signalled only by the text appearing, so a
user in another tab never learns it finished.

---

## 10. Failure states

### The job

The user needs to know whether to retry, rephrase, wait, upgrade, or give up. Those are five
different actions and a generic error supports none of them.

The business wants failures to not read as brokenness. The resolution is **specificity**: a precise
limit stated plainly reads as a working system with a boundary; a vague error reads as a bug.

### Taxonomy A: failures before anything happened

| Failure | What the user must learn | Required affordance |
|---|---|---|
| **Refusal** | That the model declined, and why in one clause | Nothing special — render as normal prose |
| **Rate limit** | When it resets, in absolute local time | Countdown + upgrade path if one exists |
| **Context length** | What will be lost and what to do | `Start a new chat with a summary` as one click |
| **Tool/permission wall** | What's missing and who can grant it | Connect button or request-access |
| **Model overloaded** | It's transient | Auto-retry with visible backoff, then a model switch |
| **Network/stream drop** | The partial is preserved | Retry that resumes, not restarts |
| **Content filter on output** | Which part was blocked | The un-blocked portion, still visible |

Nothing in that table costs the user anything but time. The next one does.

### Taxonomy B: failures *after* the user said yes

This is the half most products have no design for, and it is the half where the money is. Every row
below is a state in which **consent exists and execution did not follow**. Collapsing any of them
into a generic error destroys the most important fact in the transcript — that the user agreed to
this — and every one of them destroyed makes the next approval harder to get.

| Failure | Why it is its own state | Render |
|---|---|---|
| **Auth expired between approval and execution** | The user's session, not the agent, is the problem | Re-auth in place, then resume *that* pending action |
| **Payment declined** | The decline code names a different user action each time | The code, the amount that did *not* move, no auto-retry |
| **Grant revoked mid-run** | Retry can never succeed | Who revoked what and when; halt; request-access, no retry |
| **429 arriving mid-stream** | There is already text on screen | Paused, not failed; partial kept; absolute resume time |
| **Partial batch success** | "Error" and "Done" are both lies | Per-row terminal status; retry scoped to the failures |
| **Payload went stale while pending** | Consent was to a payload, not to an instruction | Re-validate at execution; if changed, stop and re-ask |
| **Upstream provider incident** | It is not their quota and not their fault | Name the layer; offer the other provider |

**Auth expiry mid-action.** The user approved `Send invoice to acme.com` at 2:11. The OAuth token
expired at 2:12. The send failed at 2:13. Three rules. (a) The payload survives: re-auth returns to
*this* pending action, not to a fresh thread. (b) The re-auth prompt names the work it unblocks —
`Reconnect Gmail to send the invoice you approved at 2:11 PM`, not `Session expired`. (c) The run
must survive the redirect. An agent tied to the page's socket dies when OAuth navigates away, and
the user returns to an empty thread having approved something that never happened. Expire a token
mid-run and watch what your product does; almost nothing survives it the first time.

**Payment declined after approval.** The confirmation showed `$1,240.00`; the charge returned
`card_declined`. The decline code is the whole message, because each one implies a different user
action: `insufficient_funds` → another card, `expired_card` → update the card, `do_not_honor` → the
issuer, which the product cannot fix and should not pretend to. State the amount that was **not**
charged, or the user will see the pending authorization hold on their statement and open a dispute.
And never auto-retry a card: a retried soft decline is how one purchase becomes two.

**Grant revoked mid-run.** The connector was disconnected, the admin removed the app, the invite
the agent was acting under was rescinded, the agent was removed from the workspace. What makes this
its own state is that **retry will never work**, so a retry button is a lie that costs the user
three clicks to discover. Name what was revoked and, if you know, by whom and when
(`Your admin disconnected Gmail at 9:42 AM`). Halt and keep the completed work — do not roll back
six successful steps because the seventh lost its grant. The only honest action is request-access.

**Rate-limited mid-stream.** A 429 on token 400 is a different problem from a 429 before send,
because there is already an answer on screen and it is probably good. Pause, do not fail: keep the
partial, switch the caret to a static paused variant, and show
`Paused — rate limited. Resuming at 3:14 PM.` with auto-resume. If you genuinely cannot resume
mid-completion, say so *before* discarding anything: `Can't resume from here — [Retry from the start]`,
so the user knows the second answer will not be the first one continued. Replacing 400 good words
with a red box is the version everyone ships and the version everyone complains about.

**Partial batch success.** Four emails approved: two sent, one bounced, one still queued. Lead with
the number — `2 of 4 sent` — give every row a terminal status, and scope retry to the failures
only. This is where idempotency stops being a backend concern: a single `Retry` on a partial batch
re-sends the two that already landed, and a user who double-sends to a customer once stops
approving batches forever.

**The payload went stale while the approval was pending.** The request sat 40 minutes; the issue
was closed, the row was deleted, the price changed, the recipient left the company. Re-validate at
execution time, not at approval time, and when it no longer matches, refuse to execute:
`The total changed from $1,240.00 to $1,395.00 since you approved this. [Review again]`. An
approval is consent to a specific payload, not a standing instruction. (§6 covers the related case:
an approval that has sat long enough should expire rather than fire.)

**Upstream vs. you.** `The model provider is having an incident`, `You've hit your limit`, and
`Our API is down` are three different sentences, with three different user actions, that a shared
`Something went wrong` collapses into "this product is broken." Name the layer. When it is the
provider, the answer is the other provider, offered inline.

### Refusals

A refusal is an answer, not an error. Render it in the same bubble, same typography, no red, no
icon, no alert box. Wrapping a refusal in error chrome tells the user the product broke, and they
retry — which wastes their quota and reproduces the refusal.

The refusal itself should name the boundary and offer the adjacent thing it *can* do. NN/g's
transparency finding again: users build correct mental models when limitations come with a
rationale. `I can't give medical dosing advice. I can explain what the study you linked found.`

Do not add a "Was this helpful? 👍👎" row under a refusal.

### Rate limits

The number that matters is the **reset time as an absolute local time** (`Resets at 3:00 PM`), not
a duration (`Try again in 47 minutes`) and never `Please try again later`. Durations require the
user to do arithmetic and re-read the message every time they check.

Place the limit notice **in the composer**, disabling send, not as a toast. A toast disappears and
the user retries into the same wall. And preserve their typed text.

If a cheaper model is available, offer it inline: `You've hit your Opus limit until 3:00 PM.
[Continue with Sonnet]`. This converts a dead end into a continued session and is the highest-value
copy in the whole failure taxonomy.

### Context-length errors

The worst-handled failure in the category, because it surfaces as either a hard error or — far
worse — **silent truncation**, which the user experiences as "it forgot what I told it" and
attributes to the model being bad.

- Warn *before* the send, in the composer, when the next message will trigger trimming.
- Name the mechanism: `This thread is long. Older messages will be summarized to fit.`
- Offer the one-click escape: `Start a new chat with a summary of this one`, which carries a
  generated summary into the new thread's first message.
- If you truncate a *tool result*, say so in the tool row (§4), not silently.

### Hedging and honest uncertainty

The failure here is bidirectional. Hedging everything ("I'm not certain, but...") makes the product
useless. Hedging nothing produces confident fabrication.

What works, in order of preference:

1. **Ground it and cite it** (§5). A citation is a better uncertainty signal than any hedge,
   because it's checkable.
2. **Say what wasn't found**, explicitly: `I couldn't find anything in your workspace about Q3
   pricing — this is from general knowledge.` Most RAG products never emit it.
3. **Scope the claim in the prose**: `As of my training data` / `The 2024 filing says X; I don't
   have 2025.`
4. **Do not render a confidence percentage.** A model's self-reported "87% confident" is not
   calibrated, and putting a number on it launders a guess into a measurement. If you have a real
   retrieval score, show the *evidence* (the retrieved passage), not the score.
5. **Do not put a blanket "AI can make mistakes" disclaimer under every message.** It's banner
   blindness by the third message and it substitutes for per-claim honesty.

### States

- **Partial answer then failure** → keep the partial, mark it, offer retry. Never replace shown
  text with an error.
- **Retry succeeded after a visible failure** → replace the error row with the answer, but leave a
  quiet marker (`Retried`) so the user's mental model of reliability stays accurate.
- **Repeated failure (3+)** → stop auto-retrying and escalate: `This keeps failing. [Try another
  model] [Report]`. Infinite silent retry burns quota and looks like a hang.
- **Degraded mode** (search down, one connector failing) → answer with what works and name the gap:
  `Web search is unavailable right now — answering from what I know.`
- **The failure lands after the user left the page** → the outcome has to exist somewhere they will
  find it: the sessions list, a notification, an email. A failure that only ever rendered into a
  tab nobody has open did not get reported.
- **Retry that would re-run a side effect** → the retry button must carry the idempotency key of
  the original attempt, and must say what it will not repeat: `Retry the 1 that failed` beats
  `Retry`.

### Mobile

Errors must not be toasts on mobile — they're missed, and the retry affordance goes with them.
Render inline in the transcript with a full-width retry button. A rate-limit reset time must be
readable without expanding anything.

The post-approval failures are worse on mobile for one structural reason: **the recovery usually
requires leaving the app.** Re-auth opens a browser, a declined card opens the wallet, a revoked
grant needs an admin in Slack. Each of those is an app switch, and iOS may evict your tab. So:
persist the pending action server-side before you send anyone to a redirect, resume by URL rather
than by in-memory state, and make the return landing show the pending action first, not the top of
the thread. A confirmation the user has to scroll back up to find, after an OAuth round trip, is
one they abandon.

### Accessibility

- Error rows are `role="status"` (polite), not `role="alert"`, unless the user is blocked from
  proceeding. An assertive announcement on every transient failure is hostile.
- Retry is a real button with a label naming what retries (`Retry sending message`).
- Never convey failure by color alone; every error row carries the word and an icon.
- The countdown to a rate-limit reset must not be a live region that announces every second.

### Copy

| Never | Instead |
|---|---|
| `Something went wrong` | `The model timed out after 60s. [Retry]` |
| `Error 429` | `You've hit your limit. Resets at 3:00 PM. [Continue with Sonnet]` |
| `Please try again later` | the actual time |
| `An error occurred` | the actual error |
| `Context length exceeded` | `This thread is too long to continue. [Start a new chat with a summary]` |
| `I'm sorry, I cannot help with that.` | `I can't give medical dosing advice. I can explain what the study you linked found.` |
| `AI can make mistakes.` (under every message) | per-claim citations |
| `Payment failed` | `Card declined — insufficient funds. $1,240.00 was not charged. [Try another card]` |
| `Session expired` | `Reconnect Gmail to send the invoice you approved at 2:11 PM. [Reconnect]` |
| `Error` (on a batch) | `2 of 4 sent. 1 bounced (mailbox full), 1 queued. [Retry the 1 that failed]` |
| `Access denied` | `Your admin disconnected Gmail at 9:42 AM. [Request access]` — and no retry button |
| `Rate limited` (mid-stream) | `Paused — rate limited. Resuming at 3:14 PM.` with the partial still on screen |

### How it goes wrong

A red toast reading `Error` that vanishes in 4 seconds. A refusal rendered inside an alert box with
a warning triangle. A rate limit expressed as a duration, or not at all. Silent context truncation.
Infinite auto-retry with no visible attempt count. A confidence percentage. The composer clearing
on failure so the user's message is gone. And the compound failure: a generic error that also
deletes the partial response, so the user loses both the answer and the prompt.

After the yes, it gets worse. `Session expired — please log in again`, which drops the approved
action on the floor. A `Retry` button on a revoked grant that can only ever fail. A batch that
reports `Error` when three of four succeeded, then re-sends all four when the user clicks retry. A
declined card reported as `Payment failed` with no code, so the user cannot tell whether to try
another card or call their bank, and no statement that nothing was charged. A 429 mid-stream that
discards 400 words of a finished-looking answer. And the one that ends the account: an approval
that executes against a payload that changed while it was pending.

---

## 11. AI inside an existing product vs. a chat-first product

### The job

The user is in the middle of doing something. The AI's value is that it can act on **the thing they
are looking at**. The business wants an "AI feature" that demos well.

That conflict produces the bolted-on drawer, and the drawer fails for three structural reasons:

1. **It has no context.** A panel that opens with `How can I help?` doesn't know the user is
   looking at issue ENG-2557. Everything must be re-typed.
2. **It can't write back.** Output arrives as text the user copies out. The moment there's a copy
   step, the feature is a worse ChatGPT with fewer models.
3. **It's a separate mental mode.** Users must decide "should I do this myself or ask the AI",
   which is a decision they were never going to make in favor of a panel they have to open.

### Reference implementation: Linear

Walked. Four decisions, each of which is the integration answer:

1. **Agents are members, not a feature.** They appear in the `@`-mention picker under the same
   `Users` heading as humans, with a small `Agent` badge. `Can you spec out this issue @cha…`
   returns `ChatPRD [Agent]`, `Charlie`, `Charlotte` in one list.
2. **Delegation, not assignment.** From the site: "When an issue gets delegated to an agent, the
   human user remains the primary assignee, while the agent is added as a contributor." The
   properties panel renders the agent as an **indented child of the human** with a tree line.
   Accountability doesn't move.
3. **Agent actions land in the same activity feed with the same grammar.**
   `Adrien delegated to Cursor · 5min ago` / `Cursor moved from Triage to In Progress · 4min ago` /
   `Cursor linked Restore User Presence · 3min ago`. No separate "AI activity" tab. This is what
   makes an agent auditable by a teammate who wasn't watching.
4. **Context attribution is explicit and pre-emptive.** The session panel shows
   `⚓ API launch  added to context` as a dimmed line under the user's message, before any output.
   Re-walked 2026-09: the same pattern runs across every session in the strip — `Mobile Triage
   added to context`, `Notification Grouping added to context`, `ENG-2844 added to context`. One
   grammar, one slot, every time.

The session panel itself is a floating window with minimize / expand / close — not a docked drawer
— and its composer has a `Skills ⌄` selector where a chat product would put a model selector.
Different product, different noun in the same slot.

### Reference implementation: Granola

Walked. AI output lands **in the document, where the output belongs**, with a pill reading
`⟳ Enhancing notes` sitting inline in the note body. There is no chat. The user's raw typed notes
are the input; the enhanced notes are the output; the transformation is a labeled state on the
document itself. Positioning: "Notes, actions and memory. Without a meeting bot."

The transferable rule: **when the AI's job is to transform an object the user already has, put the
progress and the result inside that object, not in a conversation about it.**

### Reference implementation: OpenAI Apps SDK (the inverse case)

For apps embedded *inside* a chat product, OpenAI's design guidelines specify four display modes
and constrain each:

- **Inline card** — "a single action or decision" or small structured data. "Limit to two actions,
  placed at bottom of card." "No deep navigation or multiple views within a card." "No nested
  scrolling. Cards should auto fit their content."
- **Inline carousel** — "3–8 items per carousel for readability", "Three lines max" of metadata,
  "each card may have a single, optional CTA."
- **Fullscreen** — "rich tasks that cannot be reduced to a single card." The key constraint:
  **"Design your UX to work with the system composer"** and "use fullscreen to deepen engagement,
  not to replicate your native app wholesale."
- **Picture-in-picture** — "activities that run in parallel with conversation, such as a game";
  "close PiP automatically when the session ends."

Plus: inherit the system font stack, use system colors, WCAG AA contrast. The through-line is that
the embedded app **never brings its own input affordance or its own chrome** — the host's composer
is the input, always.

### The decisions

| Question | If yes → | If no → |
|---|---|---|
| Does the AI act on the object currently on screen? | Inline, in the object (Granola, Notion's `/ai`) | A panel is defensible |
| Will the output be edited by the user? | Write it into the document as editable content with accept/reject | Chat output is fine |
| Is the work long-running? | Model it as a delegable task with an assignee and a status (Linear) | Inline is fine |
| Is there an existing collaboration primitive (comments, assignees, activity)? | **Use it.** Agents become participants in it. | Build the smallest new one |
| Does the user need to compare AI output to what was there before? | Diff/accept-reject inline, not a chat bubble | Replace in place |

**The `/`-command is usually the right entry point in a document product**, because it's where the
user's hands already are and it inherits the block context for free. Notion's `/ai`, Linear's
`@agent`, Raycast's global hotkey are all the same move: **enter through the affordance the user
already uses to do the analogous human thing.**

### States

- **AI edits a document another user is editing** → show it as a distinct presence (named cursor,
  attributed change), not as an anonymous mutation.
- **AI output pending acceptance** → a diff with `Accept` / `Discard` / `Try again`, scoped to the
  block. Never auto-commit into a document.
- **The user lacks permission for what the AI would touch** → check *the user's* permissions, not
  the agent's. An agent with broader access than the person driving it is a data-leak vector; every
  read the agent surfaces must be one the current user could have made themselves.
- **AI disabled by admin** → hide the entry points, don't disable them with an upsell. A greyed
  `✨ AI` in the toolbar of every doc is a permanent ad.

### Mobile

Inside a mobile product, an AI drawer is worse still — it covers the object it's supposed to act
on. Prefer: a contextual action in the existing action sheet, output written into the object, and a
compact accept/discard bar pinned at the bottom.

### Accessibility

- AI-generated content inserted into a document must be announced and must be reachable by the same
  navigation as human content — not in an `aria-hidden` overlay.
- The accept/reject controls belong in the tab order immediately after the inserted block.
- If AI content is visually distinguished (highlight, left border), that distinction needs a text
  equivalent — a screen reader user must be able to tell which paragraph was generated.

### Copy

- Linear's `Mobile Triage added to context` — context attribution as a plain, quiet sentence.
- Granola's `Enhancing notes` — a specific verb on a specific noun.
- Not: `✨ Ask AI`, `AI Assistant`, `Powered by AI`.

### How it goes wrong

A right-hand drawer with a sparkle icon, opening to `Hi! I'm your AI assistant. How can I help
you today?`, with no knowledge of the current page. Output that arrives as chat text with a `Copy`
button, which the user pastes into the document by hand. An "AI" tab in the activity feed separate
from the human activity, so nobody sees agent actions in context. An agent assignee that replaces
the human assignee, so accountability disappears. A permanent `✨` in the toolbar for a feature the
org disabled.

---

## 12. Mobile chat

Most of this is distributed through the sections above; here is what's specific to the form factor.

### The job

One-handed, in a hurry, on an unreliable connection, with 40% of the screen taken by a keyboard.

### The decisions

- **Viewport:** `<meta name="viewport" content="width=device-width, initial-scale=1,
  viewport-fit=cover, interactive-widget=resizes-content">`. Without `interactive-widget`, the
  keyboard overlays the composer on Android Chrome. Combine with `100dvh`, not `100vh`.
- **Enter inserts a newline; a send button sends.** On a touch keyboard the return key is a
  newline. Enter-to-send on mobile causes constant accidental sends.
- **Composer position in the empty state:** t3.chat centers it vertically rather than pinning it to
  the bottom (re-walked 2026-09 at 390), so the pre-keyboard and post-keyboard layouts are a short
  transition apart. Neither t3 nor v0 bottom-pins an *empty* composer; both leave the bottom third
  free for the keyboard that is about to arrive.
- **Control budget:** model chip + one `+` + send. Two placement details from the re-walk, both
  worth copying. t3 puts the `+` **leading** — left of the model chip, at the thumb's inner reach —
  rather than trailing next to send, where a mis-tap costs an accidental send. And t3 does not
  collapse its mode switcher into the `+` sheet: it promotes `Chat ⌄` out of the composer entirely,
  into the center of the top bar. When one control cannot survive the collapse, move it up, don't
  bury it.
- **Model chip:** t3 drops the version string and keeps the cost glyph — `Kimi K2 (0905) $$·`
  becomes `Kimi K2 $$·`. v0 drops the label and keeps the glyph. Both teams chose *what the control
  is for* over *what the control is named*.

Everything else that is mobile-specific is stated where it belongs and indexed here rather than
repeated: suggestions §2, streaming and scroll §3, tool rows §4, citation sheets §5, approvals §6,
message actions §7, artifact sheets §8, agent sessions §9, post-approval recovery §10.

### States specific to mobile

- **Keyboard open, response streaming** — the transcript must scroll under the keyboard, and the
  "scroll to bottom" pill must sit above the composer, not behind it.
- **App backgrounded mid-stream** — persist and resume; do not lose the partial.
- **Rotation** — preserve scroll anchor on the message the user was reading, not the pixel offset.
- **Poor connection** — the composer keeps the text on failure, always.
- **Voice input** — NN/g recorded a participant on Redfin: "please, please have a voice-to-text
  option. It's going to help me a lot, and it's going to help me stay in this page." Mic in the
  composer, and transcription visible/editable before send.

### Accessibility

- Every touch target ≥44×44 (iOS) / 48×48 (Android), including citation pills and the branch pager.
- Dynamic Type / font scaling must not break the composer — test at 200%. The most common break is
  a fixed-height composer clipping its own toolbar.
- VoiceOver rotor should be able to move by message: each message a `<article>` with a heading or
  label naming the speaker.

### Copy

Shorter everywhere. `Attach` not `Attach a file`. `Resets at 3:00 PM` not `You have reached your
usage limit and will be able to send messages again at 3:00 PM`. The model chip shows the name and
nothing else. Any string that wraps to three lines on 390px is too long for a control.

### How it goes wrong

`100vh` so the composer sits under the keyboard. Enter bound to send, so every attempt at a second
paragraph fires a message. A 28px send button. Hover-only message actions, which means no message
actions. Citation pills that navigate away on a mis-tap. A full-screen artifact route with no path
back to the composer. Errors as toasts that vanish before a thumb reaches them. And a desktop
composer scaled down: four toolbar chips, a model dropdown with the full version string, and a
suggestion grid, all squeezed into 390px.

---

## Decision procedures

Each fork below carries the product where its recommended branch is wrong. A procedure without a
scope is a superstition, and every one of these has an edge where following it produces a worse
interface than ignoring it.

**Should this be a chat interface at all?**
If the user's input is a *choice among known options*, it's a form or a menu, not a prompt. If it's
an open-ended intent in their own words, chat earns its place. If it's a transformation of an
object they already have (summarize this, rewrite this, tag these), it's an inline action on that
object — Granola, not ChatGPT. If they'll do it once a quarter, it's a command palette entry.
→ **Wrong when the option space is known to you and unknown to the user.** A homeowners-insurance
claim has perhaps thirty valid claim types; the claimant does not know that "water coming up
through the slab" is one of them, and a thirty-item menu is a wall. Chat is right here even though
the input is a choice among known options, because *the mapping* is the hard part — but the output
of that mapping must be shown as the chosen option for confirmation, not answered in prose. The
rule is not "open-ended input → chat." It is **chat when translating the user's words into your
taxonomy is the work.** Second scope: when a wrong answer is asymmetrically expensive (dosing, a
filing deadline, a wire), chat collects the intent and a form commits it.

**Should this action require confirmation?**
Ask in order: (1) Does it affect anything outside this session? No → don't ask. (2) Is it
reversible within the same UI, in one click, for at least 30 seconds? Yes → do it and offer undo.
(3) Does it cost money, message another human, or destroy data? Yes → confirm every time, and never
offer a persistent grant broader than the exact payload shown. (4) Otherwise → confirm once, and
offer a grant scoped to something the dialog can fully display.
→ **Step 2 is wrong whenever anything outside your database observed the action.** A Slack message
is trivially reversible in your store and has already lit up a lock screen; a "sent" email you can
unsend from your own UI still fired an SMTP transaction. Gmail's undo works only because it
*delays* the send. Amend step 2 to: reversible **and** nothing outside the system has observed it —
if you cannot delay it, you do not have an undo, you have a delete.
→ **Step 1 is wrong in a shared session.** In a Linear agent thread or a shared workspace, "inside
this session" is not "inside one person's awareness." An action scoped to the session is still a
surprise to the second human reading it.

**Should the tool call be visible?**
Visible and expanded if it's waiting on the user or it failed. Visible and collapsed if a user
could act on knowing it happened — check the source, notice the wrong file, spot the wrong table.
Invisible if the answer is no. Do not show infrastructure.
→ **"Invisible" is a statement about the transcript, never about the record.** In a lending
decision, a clinical decision aid, or anything that must be explained to a regulator months later,
every retrieval has to be reconstructable whether or not a user would ever have acted on it. Scope:
**invisible in the UI, never absent from an exportable log.**
→ Second scope: a call is only "infrastructure" if it cannot be wrong in a way the user could
catch. An embedding lookup that silently returns another tenant's documents is not infrastructure,
and the reason nobody noticed is that it was classified as such.

**Inline or side panel?**
Score: iterated (+2), referenced while typing the next message (+2), exceeds one viewport (+1), has
its own actions (+1), has versions (+1). Three or more → panel. Under three → inline.
→ **The score assumes a two-pane desktop product and an artifact with a second turn.** On mobile
there is no panel at all (§8). And a read-once artifact can clear 3 points on width, actions and
versions alone — a 40-page compliance report with export, signature and revision history — while a
60% column is the worst possible place to read it. If "referenced while typing" is a hard no, cap
the total at 2 and give the artifact a full-width route or a download instead. The score is asking
whether the output needs **co-visibility with the composer**, not whether it is big.

**Enter or Cmd+Enter to send?**
Responses under ~10s and one turn at a time → Enter sends, Shift+Enter newlines. Responses over
~30s, or an agent that keeps working → Cursor's inversion: Enter queues, Cmd+Enter sends now, and
show the queue.
→ **Scope by P90, not by median.** An assistant that usually answers from context in 4s and
occasionally goes searching for three minutes will punish Enter-sends exactly on the turns that
matter. Either pick the binding from the slow tail, or make it adaptive: Enter sends until a run
passes ~30s, at which point the composer switches to queue mode **and says so in the placeholder** —
a binding that changes silently is worse than either binding.
→ Also wrong for any product whose users write multi-paragraph prompts by default (legal drafting,
incident write-ups), and on every touch keyboard (§12).

**What "thinking" indicator?**
<1s nothing. 1–10s a shimmer on a sentence naming the work. 10–30s add elapsed + stop. >30s a step
list with a counter. Never a fake percentage.
→ **The shimmer requires a noun, and a bare LLM call does not have one.** With no tools, no
retrieval and no plan, there is nothing honest to put between 1s and first token; a shimmering
`Thinking…` is precisely the theater §4 says to delete, only animated. There, show nothing under
~3s, then a caret, then elapsed past ~5s. **No noun, no shimmer.**

**How many models in the picker?**
1 → no picker; name it in the footer. 2–4 → a chip with a popover. 5+ → a `cmdk` command palette
grouped by provider with fuzzy search. Always show the current model in the composer, never only in
settings.
→ **Count the models this user can select after policy filtering, not the catalogue.** An
enterprise tenant with thirty models and an admin allowlist of two needs a chip; a fuzzy search
across twenty-eight models the user cannot pick is worse than no search, because every miss reads
as a bug.
→ Second scope: when models differ in **capability** rather than quality — one takes images, one
has the long context, one is the only one cleared for customer data — a flat picker is wrong at any
count. Group by what they can do and label it, because the user is choosing a capability and your
picker is offering brands.

**Should the agent be allowed to run unattended?**
Yes if every side effect it can reach sits behind a confirmation that will *wait* (§6) and the
outcome lands somewhere durable (§9). No if any tool can fire without a human and the only record
is an open tab.
→ **Wrong for a read-only agent, where unattended is the entire product.** Scope by the reachable
tool set, not by the run length: a four-hour research run that can only read is safer unattended
than a nine-second run that can send.

---

## The generic version

You can diagnose an unconsidered AI feature in about fifteen seconds. It has:

A right-hand drawer with a `✨` icon that opens to a centered gradient orb and the text
"Hi! I'm your AI assistant. How can I help you today?" — with no idea what page the user is on. An
`<input>` (not a textarea) with placeholder "Ask me anything" and a `Send` button beside it. A
`<select>` labelled "Model:" in a form row above. Enter reloads the page.

Then: three bouncing dots for 40 seconds. Then text appearing character-by-character via
`setInterval`, with `**asterisks**` visible until each closing pair arrives, the whole message
re-parsed on every tick, and the view auto-scrolled to the bottom so the user never reads the
opening line. No stop button. Tool calls as always-expanded grey boxes of raw JSON, one per call,
above the answer. A `Sources:` heading at the bottom with twelve bare URLs that map to no sentence,
some of which 404 because the model wrote them. `AI can make mistakes.` in 11px grey under every
message.

For side effects: `confirm("Are you sure you want to proceed?")` — or a modal reading "The AI wants
to perform an action" with `Approve` as the blue primary and an `Always allow` checkbox granting a
scope the dialog never displays. Four of them stacked for four emails.

On failure: a red toast reading `Error` that disappears in four seconds, taking the retry with it,
after the composer already cleared the user's text.

On mobile: the keyboard covers the composer, the send button is 28px, the citation pills navigate
away on mis-tap, and the artifact is a full-screen route you must dismiss — losing your place — in
order to type.

---

## Self-check

Run these against your own implementation.

**Composer**
- [ ] Shift+Enter inserts a newline; Enter sends; `event.isComposing` is checked so Japanese/Korean
      IME commits don't send.
- [ ] The textarea reserves 2–3 lines when empty, so the toolbar doesn't jump on first wrap.
- [ ] Send fails with the network off → the typed text is still in the field.
- [ ] The current model is visible without opening a menu.
- [ ] `/` mid-sentence (`src/app`, `1/2`) does not open the command menu.
- [ ] At 390px there are at most three controls plus send.

**Streaming**
- [ ] Text arrives word-by-word, not character-by-character, and not in visible batches.
- [ ] Scroll up mid-stream → the view stops following and a "scroll to bottom" pill appears.
- [ ] A new response scrolls to the *top* of the message, not the bottom of the stream.
- [ ] An unclosed ` ``` ` renders as a code block during streaming, not as literal backticks.
- [ ] Stop replaces send in the same position, and after stopping the partial text remains with a
      `Continue`.
- [ ] `prefers-reduced-motion: reduce` → no word animation, no shimmer sweep, static caret.
- [ ] A completed 3,000-word message holds zero animation wrappers (inspect the DOM).
- [ ] The streaming region is not `aria-live`; completion is announced once.

**Tools and reasoning**
- [ ] There are distinct visuals for: input-streaming, running, awaiting-approval, completed,
      errored, denied.
- [ ] Status is never color-only — every state has a word.
- [ ] Errors do not auto-collapse.
- [ ] Eight consecutive file reads render as one grouped row.
- [ ] A denied tool call is still in the transcript after the turn ends.
- [ ] Multiple reasoning parts in one turn render as **one** block, not four "Thinking…" stacks.

**Citations**
- [ ] Every inline marker maps to a specific clause, and every one resolves to a URL that came from
      real retrieval metadata (not model-generated text).
- [ ] Markers are `<button>`/`<a>` and announce the source, not the number.
- [ ] On touch, a marker opens a sheet rather than navigating.
- [ ] When retrieval returns nothing, the answer says so.

**Confirmation**
- [ ] The dialog shows the literal payload — recipients, SQL, path, amount — not a description.
- [ ] The affirmative button is labeled with the verb, never `Confirm`/`Yes`/`OK`.
- [ ] For destructive actions, the affirmative button is not the visually dominant one.
- [ ] "Don't ask again" appears **only** when the prompt fully displays what it would allow.
- [ ] Rejecting lets the user say why, in the same interaction.
- [ ] Four pending emails render as one reviewable table, not four dialogs.
- [ ] An approved-then-failed action reads differently from a rejected one.
- [ ] A pending approval that sat for three days expires instead of executing.
- [ ] The action is idempotent — approving twice sends one email.

**Agent progress**
- [ ] At four minutes there is a step counter, elapsed time, the artifact so far, and a stop.
- [ ] Typing while the agent works queues rather than interrupts (and the queue is visible and
      reorderable).
- [ ] Stopping shows what completed and offers continue/revert.
- [ ] Closing the tab and returning restores the step list and partial output.
- [ ] No progress percentage is displayed that isn't computed from a known plan.

**Failure**
- [ ] Rate limits show an absolute local reset time, in the composer, with the text preserved.
- [ ] Refusals render as normal prose with no error chrome.
- [ ] Context truncation is announced before it happens, with a one-click "new chat with summary".
- [ ] No error message contains the string "Something went wrong".
- [ ] No confidence percentage is rendered anywhere.

**Failure after the yes** (run these against a real expired token and a real declined card)
- [ ] Expire the auth token between approval and execution → the payload survives, the re-auth
      prompt names the action it unblocks, and the return lands on the pending action.
- [ ] The agent survives an OAuth redirect; the run is not tied to the page's socket.
- [ ] A declined card shows the decline code, states the amount that was **not** charged, and does
      not auto-retry.
- [ ] A revoked grant shows who revoked what and when, and offers request-access — **not** retry.
- [ ] A 429 mid-stream pauses with the partial intact and an absolute resume time.
- [ ] A batch where 2 of 4 succeed reports `2 of 4`, per-row, and retry re-sends only the 2 that
      failed.
- [ ] An approval that has gone stale is re-validated at execution and refuses rather than firing.
- [ ] A failure that happens after the user closed the tab is findable afterwards.

**Integration**
- [ ] The AI entry point inherits the context of what's on screen without the user restating it.
- [ ] Output lands in the object being worked on, with accept/reject — not as text to copy.
- [ ] Agent actions appear in the same activity feed as human actions, with the same grammar.
- [ ] The agent cannot surface data the current user couldn't read themselves.

---

## Sources

Walked and screenshotted (`.cache/shots/aif-*.png`):

- **https://v0.app/** — 1440 and 390. Empty state `What do you want to create?`; composer with
  model selector bottom-left (`⊙ v0 Max ⌄`), mic bottom-right; four suggestion chips plus a
  reshuffle button; template gallery with usage counts below. On 390 the model selector loses its
  text label entirely and the chips wrap to two rows.
- **https://t3.chat/** — 1440 and 390. `How can I help you?`; four category pills over four literal
  example prompts as a divided list; composer showing `Kimi K2 (0905) $$·` — a three-tier cost
  glyph in the model chip — plus `Instant` / `Search` / `Attach`. On 390 the composer is vertically
  centered, both suggestion tiers are dropped, and the three tool chips collapse to one `+`.
- **https://linear.app/agents** — four scroll positions. Agent session panel with minimize/expand/
  close and an `Opus 5` model badge; `⚓ API launch added to context` line above `Thinking...`;
  `@cha…` mention picker returning `ChatPRD [Agent]` alongside humans under one `Users` heading;
  properties panel showing the agent indented under the human assignee; activity feed reading
  `Adrien delegated to Cursor · 5min ago` / `Cursor moved from Triage to In Progress · 4min ago`;
  session composer with a `Skills ⌄` selector and a filled-square stop button; agent inbox grouped
  as `In progress` / `Needs information · 2`.
- **https://ai-sdk.dev/elements/components/** — 19 component pages walked with their live previews;
  `tool` and `confirmation` re-walked 2026-09 at 1440 and 390 (see Review pass). Each page's
  finding is stated in the body rather than repeated here: `tool` §4 (seven states; and the
  collapse-default correction), `confirmation` §6 (anatomy, plus its four design faults),
  `context` §1 (`31.3%` SVG ring, hover card with input/output/reasoning/cached + `tokenlens`
  cost), `prompt-input` §1 (Header/Body/Footer anatomy), `reasoning` §4 (auto-open on stream;
  consolidate multiple reasoning parts), `chain-of-thought` §4 (steps carrying their own evidence),
  `task` §4/§9 (completed-vs-total counter; `Scanning 52 files` → `Scanning 2 files`), `plan` §9
  (reviewable card with `Build ⌘↩`), `checkpoint` §7 (`Restore checkpoint` as a transcript rule,
  modeled on VS Code Copilot), `queue` §9 (`7 Queued` / `5 Todo`), `inline-citation` §5
  (`example.com +5` hover pill), `sources` §5 (`Used 3 sources`), `artifact` §8 (`Updated 1 minute
  ago` + Run/Copy/Regenerate/Download/Share), `attachments` §1 (three variants for one payload,
  chosen by location), `conversation` §3 (auto-scroll + scroll-to-bottom pill), `message` §7
  (MessageActions = Retry + Copy on the last assistant message; branching explicitly not provided —
  "you have full flexibility to design and manage multiple response paths"), `shimmer` §3 (2s
  gradient sweep, `text-transparent` + `background-clip`), `model-selector` §1 (`cmdk`, fuzzy,
  grouped by provider).
- **https://ai-sdk.dev/docs/reference/ai-sdk-core/smooth-stream** — `delayInMs: 10`,
  `chunking: 'word'`, `Intl.Segmenter` required for CJK.
- **https://streamdown.ai/docs/animation, /carets, /memoization, /link-safety, /security** —
  per-word `fadeIn` at 150ms `ease`; `blurIn` for fast models because "the blur masks the batch
  appearance better than pure opacity"; animation excluded entirely when `isAnimating={false}`;
  skips `pre`/`svg`/`math`; block-level memoization; block `▋` and circle `●` carets; link-safety
  confirmation modal enabled by default with full URL + Copy/Open, framed as a prompt-injection
  control.
- **https://cursor.com/docs/agent/overview** — Enter queues / Cmd+Enter sends immediately;
  immediate messages appended to the most recent user message; queued messages reorderable by drag;
  steering delivered "at the agent's next tool call instead of cutting off work mid-action";
  checkpoints revert files only and "do not remove messages from the conversation".
- **https://cursor.com/docs/agent/review** — live diff view; `Stop` on `Cmd+Shift+Backspace`;
  `@Branch`; `Review → Find Issues` analyzing "proposed edits line by line".
- **https://cursor.com/docs/agent/planning** — plans as editable markdown files, "click to build the
  plan when ready", guidance to revert and refine rather than fix mid-implementation.
- **https://code.claude.com/docs/en/permissions** — the per-tool-class permission table and its
  asymmetric persistence (Bash: permanent per repo+command; file edits: session only); "Claude Code
  offers those options only when the prompt can show you everything they would allow"; the three
  cases where "don't ask again" is withheld; compound commands decomposing into up to five separate
  rules; deny/ask rules matching inside subshells and command substitution; Tab-to-comment on
  approve/reject; modes Manual / acceptEdits / plan / auto / bypassPermissions with protected paths
  (`.git`, `.claude`) still prompting under bypass.
- **https://www.granola.ai/** — `⟳ Enhancing notes` as a pill inline in the note body; "Notes,
  actions and memory. Without a meeting bot."
- **https://www.notion.com/product/ai** — agents / enterprise search / meeting notes / admin
  controls as four peer surfaces, with an admin analytics view; no chat drawer in the hero.
- **https://www.raycast.com/core-features/ai** — "AI that works with your OS"; model-agnostic
  provider grid; the AI is a command in an existing launcher, not a separate app.
- **https://developers.openai.com/apps-sdk/concepts/design-guidelines** — inline card ("limit to two
  actions", "no nested scrolling"), carousel ("3–8 items", "three lines max"), fullscreen ("design
  your UX to work with the system composer"; "not to replicate your native app wholesale"), PiP
  ("close PiP automatically when the session ends"); inherit system font stack and colors; WCAG AA.

Research cited:

- **NN/g, "10 Guidelines for Designing Your Site's AI Chatbots"**
  (https://www.nngroup.com/articles/ai-chatbots-design-guidelines/) — guideline 7, "Don't Autoscroll
  Users to the End of a Response," observed on Mississippi's MISSI chatbot: users had to "scroll
  back up to begin reading." Also: suggested questions must be buttons not text (Scouting America's
  Scoutly stopping mid-conversation — "It doesn't have the option for secondary questions");
  opening messages must state specific capabilities (Turo's "Ask me anything" overpromised vs.
  Williams Sonoma's AI Sous Chef naming three); progressive disclosure to keep the chat short
  (Amazon's Rufus generating new messages instead of expanding inline, pushing results out of
  view); voice input (Redfin participant: "please, please have a voice-to-text option").
- **NN/g, "The 5 Qualities of Site-Specific AI Chatbots"**
  (https://www.nngroup.com/articles/dimensions-of-ai-chatbots/) — transparency: disclose limitations
  *with a rationale*; emotional responsiveness: describe the situation without asserting feelings
  the user never expressed (Lacoste claiming to "understand your disappointment"); handoff:
  participants describing deflecting bots as "a hamster wheel kind of spinning around and around."
- **Jakob Nielsen, "Response Times: The 3 Important Limits"**
  (https://www.nngroup.com/articles/response-times-3-important-limits/) — 0.1s instantaneous,
  1.0s uninterrupted flow of thought, 10s attention limit past which users "want to perform other
  tasks while waiting" and need "feedback indicating when the computer expects to be done" plus "a
  clear way to cancel."
- **HN practitioner threads** — the recurring complaint about the AI-chat SDK category is the
  missing resumable stream: "they really missed the opportunity to add in resumable streaming after
  a dropped SSE connection, or multi-device support"
  (https://news.ycombinator.com/item?id=49110712). Also a cluster of tools built specifically to
  insert human approval before irreversible agent actions —
  https://news.ycombinator.com/item?id=47226294 (`ask_human` / `request_approval` blocking tools),
  https://news.ycombinator.com/item?id=47308850 (intercepting an agent's plan for review before
  execution) — evidence that plan-and-approve is a gap users are patching themselves.

Blocked during evaluation (Cloudflare human-verification interstitial to a headless browser):
chatgpt.com, www.perplexity.ai, lovable.dev, gamma.app. Claims about ChatGPT, Perplexity and Claude
in §5 and §3 are attributed to their own documentation and to the component libraries that
reproduce their behavior (Streamdown's link-safety modal is documented as "similar to ChatGPT's
implementation"), and are marked as such in the text.

---

## Review pass (2026-09)

An adversarial pass over the whole file: re-screenshot the named products, break the decision
procedures, fill the failure-state gap. Everything below is either something this file got wrong,
something it was vague about, or something it was missing.

### What was re-verified, by looking

Screenshots at 1440 and 390 in `.cache/shots/ai-flows-v-*.png`; documentation pages fetched and
read as text.

| Claim | Source | Result |
|---|---|---|
| t3.chat composer: `Kimi K2 (0905) $$·` with the cost glyph in green, then `Instant` / `Search` / `Attach`, circular send right | t3.chat @1440 | **Holds, verbatim** |
| t3.chat @390 drops both suggestion tiers, drops `(0905)`, keeps `Kimi K2 $$`, collapses three chips to one `+` | t3.chat @390 | **Holds** — and the `+` is *leading*, not trailing, and a `Chat ⌄` mode pill moves to the top bar. Both added to §12 |
| v0: `Ask v0 to build…`, `⊙ v0 Max ⌄` bottom-left, four artifact-shaped chips, circular reshuffle | v0.app @1440 | **Holds** — plus there is no send button at rest; the mic holds the slot. Added to §1 |
| v0 @390 drops the model label to glyph + chevron | v0.app @390 | **Holds, exactly** |
| AI Elements `Tool`: seven states with icon + word, wrench glyph, monospace name, chevron | ai-sdk.dev @1440 | **Holds** |
| AI Elements `Tool` default collapse: "Awaiting Approval and Running stay open" | ai-sdk.dev @1440/@390 | **WRONG — corrected in §4.** Only `Pending` is expanded; the approval row is collapsed |
| AI Elements `Confirmation`: literal path inlined, `Reject` outline / `Approve` solid blue | ai-sdk.dev @1440 | **Holds** — the critique of it stands. State names re-attributed in §6 |
| Streamdown: 150ms default, `fadeIn`/`blurIn`/`slideUp`, skips `pre`/`svg`/`math`/`annotation`, inline code animated, zero DOM when done, `▋`/`●` carets, link modal on by default with full URL + Copy/Open + Esc | streamdown.ai docs | **Holds, including the `blurIn` quote** |
| `smoothStream`: `delayInMs` 10, `chunking: 'word'`, CJK caveat | ai-sdk.dev reference | **Holds** — the caveat names exactly Chinese, Japanese, Korean, Vietnamese, Thai |
| Claude Code permission table and its asymmetric persistence | code.claude.com/docs | **Holds, row for row** |
| "offers those options only when the prompt can show you everything they would allow" + the three withholding cases | code.claude.com/docs | **Holds, verbatim** |
| Linear: `Opus 5` badge, minimize/expand/close, `⚓ API launch added to context`, `@cha` → `ChatPRD [Agent]` / `Charlie` / `Charlotte` under one `Users` heading, agent indented under the human assignee, `Adrien delegated to Cursor · 5min ago`, `Skills ⌄` in the composer, filled-square stop | linear.app/agents @1440 ×4 | **Holds, every one** |
| Linear agent inbox `Needs information · 2` | linear.app/agents | **Not visible this pass.** Marked in §6 as the recommendation, not observed behavior |

### Corrections made

1. **§4, the tool-collapse rule.** The previous pass credited AI Elements with "collapse the past,
   expand the present." It does not ship that. The rule is right; the attribution was wrong, and
   anyone copying the demo's default ships an approval buried behind a chevron.
2. **§6, `Confirmation` state names.** `approval-requested` / `output-denied` etc. are AI SDK
   `ToolUIPart` states, not the component's; the page documents Approval Request / Approved /
   Rejected via `ConfirmationRequest` / `ConfirmationAccepted` / `ConfirmationRejected`.
3. **§6, the Claude Code comment field.** The old text made it a politeness feature. It is a control
   flow mechanism: `No` **with** a reason keeps the agent working, `No` **without** one stops the
   turn — and the field is deliberately unavailable on any option that saves a rule.
4. **§6, Linear's `Needs information · 2`.** Downgraded to unverified.
5. **§3, `ease` easing on Streamdown's fade.** The docs state the 150ms duration; they do not state
   the easing. Dropped.
6. **§8 contradicted itself.** "Promote when two or more hold" and the weighted score in Decision
   procedures disagreed — viewport + versions is two criteria (panel) but two points (inline). §8
   now carries the weighted score, and the score gained the scope it was missing.

### What was cut

Nine unsupported superlatives — "the single most common composer jank," "the most common
false-positive in AI composers," "the single most-hated bug in this category," "the single most
common accessibility bug," "the most common citation complaint on mobile," "the most common
implementation," "the worst and most common," "a support ticket every time," "the single most
valuable sentence in a RAG product" — each replaced with the mechanism that made the claim
interesting in the first place. Also cut: "Everything else in this document is polish" (false —
a stream that reflows is not polish), and the §12 bullet list that restated eight other sections
verbatim, now an index. The AI Elements source roll-up was compressed from twenty entries
duplicating the body into one cross-referenced entry.

### What was added

- **§10, Taxonomy B: failures after the user said yes.** The file had a good taxonomy of failures
  that happen while the model is talking and nothing on the ones that happen after consent, which
  are the expensive half. Seven new states with their required rendering: auth expiring between
  approval and execution, a declined card, a grant revoked mid-run, a 429 arriving mid-stream, a
  partially successful batch, a payload that went stale while pending, and provider-vs-you. Plus
  the mobile corollary — every one of those recoveries requires leaving the app, so the pending
  action must be server-side and resumable by URL before you send anyone to a redirect.
- **Scopes on every decision procedure.** Each fork now names a real product where its branch is
  wrong: insurance claim intake (chat is right even though the options are known — the *mapping* is
  the work); Slack (reversible in your database, already on someone's lock screen, so no undo
  exists); regulated lending (invisible in the UI never means absent from the log); a 40-page
  compliance report (scores 3 but wants full width, because "referenced while typing" is the
  question the score is actually asking); an assistant with a 4s median and a 3-minute P90 (bind by
  the tail, not the median); a bare LLM call (no noun, no shimmer); an enterprise allowlist of two
  models out of thirty (count what the user can pick, not the catalogue). One new fork: should the
  agent run unattended, scoped by the reachable tool set rather than the run length.
- **Mobile findings from the 390px pass:** the `+` in t3's composer is leading, not trailing;
  t3 promotes its mode switcher out of the composer into the top bar rather than burying it;
  neither t3 nor v0 bottom-pins an empty composer; AI Elements' tool row at 390 has *zero* gap left
  between a 14-character tool name and `Awaiting Approval`, which is the measured version of "tool
  rows over-narrow first" and gives a real budget to design against.
- **Two Streamdown gotchas** the previous pass missed: carets are not scoped for you (the renderer
  knows nothing about roles or message order, so every message grows a cursor unless you gate it),
  and CJK is two independent bugs — chunking in `smoothStream` and emphasis parsing next to
  ideographic punctuation, which needs `@streamdown/cjk`.
- **A self-check block for post-approval failures**, written to be run against a genuinely expired
  token and a genuinely declined card rather than read.

### Still unverified

ChatGPT, Perplexity, Lovable and Gamma remain behind Cloudflare human-verification for a headless
browser, so §5's Perplexity and ChatGPT citation claims are still documentation-and-clone
attributions, marked as such in the text. Claude's block-level, span-anchored citations in §5 are
also documentation-attributed. Linear's `Needs information · 2` is noted above. Cursor's queue,
steering and checkpoint behaviors are from its docs, not from a driven session — the queue's
drag-to-reorder in particular is a claim about an interaction nobody in this pass performed.
