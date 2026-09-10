# AI Product Interfaces: Chat, Streaming, Agents, Generation

**Evaluated:** 2026-09 · **Researcher note:** The library layer has stratified into three jobs that people keep conflating — a *transport* (AI SDK, AG-UI), a *runtime* that owns thread/branch/tool state (assistant-ui), and *components* (AI Elements, prompt-kit). Pick one from each layer, not three from one. The category's real news is that the interesting work moved out of chat: Cursor, Devin and Linear all render agent work as a **review queue with diff receipts**, not a transcript, and that pattern has no library. Meanwhile a third of the "top 10 chat UI kit" listicle names — prompt-kit, shadcn-chatbot-kit, LlamaIndex chat-ui, nlux, Chatbot UI — have not shipped code in 6–25 months.

## Verdict at a glance
| Library | Tier | One-line verdict | Vibecode risk |
|---|---|---|---|
| Vercel AI SDK (`ai`, `@ai-sdk/react`) | `essential` | Not UI, but the message-parts model every good AI interface is built on. 21.6M wk downloads. | n/a |
| assistant-ui | `essential` | The only real *runtime*: branching, threads, tool approval, 8 backend adapters. LangChain and Mastra ship it. | low |
| Streamdown | `essential` | Solves the unglamorous problem — markdown that doesn't flicker or break on a half-token. 4.4M wk. | low |
| AI Elements | `strong` | Vercel's shadcn registry; its component list is the best published taxonomy of AI UI. But two commits since 2026-05-27 and no release since March: you are copying in a frozen reference. | medium |
| AG-UI Protocol | `strong` | The event wire format for agent→frontend. Daily releases, adopted by assistant-ui and CopilotKit both. | n/a |
| Markstream | `strong` | Streamdown for Vue/Svelte/Angular/Vue2, with a `SMOOTH STREAM` toggle and an HTML trust policy. Barely known. | low |
| OpenAI ChatKit | `situational` | One `<ChatKit />` and you're done — and you're done, in both senses. Zero layout control. | high |
| CopilotKit | `situational` | Genuinely the only in-app copilot framework with frontend actions. Sales-led, and its own site is a gradient-slop specimen. | medium |
| Chainlit | `situational` | Python teams with no frontend — but check Gradio first, it is 3.5× the size. Ships an app, not components. | high |
| deep-chat | `situational` | Web components, framework-agnostic, one maintainer. The answer for Rails/Django/Astro. | medium |
| LobeHub UI | `situational` | Real components under Lobe Chat, but you inherit LobeHub's gradient house style. | high |
| LangChain agent-chat-ui | `situational` | A LangGraph reference app. Read it, fork it, don't depend on it. | medium |
| OpenUI (ex-Crayon / Thesys) | `situational` | The generative-UI entry the listicles miss: 2.3× Tambo's installs, daily commits, an actual spec and benchmark suite. | high |
| MCP-UI | `situational` | UI resources delivered over MCP. 246k wk downloads — the biggest number here after AI SDK and Streamdown. Repo quiet since July. | high |
| Gradio | `situational` | The real Python answer, and 3.5× Chainlit's stars. Ships an app, not components. | high |
| prompt-kit | `reference-only` | Best-named primitives in the category. Restrained rather than designed (visual 4, not 5, on a re-shoot) and last real commit 2026-03-12. | low |
| shadcn-chatbot-kit | `reference-only` | Stalled 2026-02-26. Copy the code, expect no updates. | medium |
| Tambo | `experimental` | 11.2k stars against 4.5k weekly downloads — attention without adoption. Generative UI means the model picks the look. | high |
| LlamaIndex chat-ui | `avoid` | 3.1k wk downloads, no push since 2025-12-16. | — |
| nlux | `avoid` | 4.7k wk downloads, dead since 2025-11-25. | — |
| Chatbot UI (mckaywrigley) | `avoid` | 33k stars, last commit 2024-08-03. Two years dead. | — |
| Loquix | `avoid` | 40 stars, 22 weekly downloads. Show HN and nothing after. | — |
| LibreChat / Open WebUI / Lobe Chat / HF chat-ui | `reference-only` | Study them for feature completeness. They are apps; you cannot decompose them. | — |
| llm-ui, CedarOS, Kibo UI | `avoid` / stale | Checked because they get cited; two are dead and one has not shipped since May. | — |

## Recommendations by need
- **Default choice:** AI SDK for transport + **AI Elements** for components — with eyes open. It's the shadcn model applied to AI: `npx ai-elements@latest add tool` copies source into your repo, so upstream cadence matters less than it would for a dependency. But upstream has landed exactly two commits since 2026-05-27 and no tagged release since 2026-03-12, so budget for owning the code from day one. This is a starting point you inherit, not a library you track.
- **Best engineering:** **assistant-ui**. 331 issues closed in the last 30 days (CopilotKit: 103 — both re-measured 2026-09-09), eight first-party backend adapters, and it's what LangChain and Mastra shipped instead of building their own.
- **Best visual quality out of the box:** **AI Elements**, narrowly — it inherits your existing shadcn theme instead of imposing one, which is the correct definition of "good defaults" for this category.
- **Most customizable / least house-style:** **assistant-ui** primitives (`Thread`, `Message`, `Composer`, `ThreadList`, `ActionBar`) with no theme installed. Its CLI now defaults to Base UI rather than Radix, matching where shadcn went.
- **Lightest:** **Streamdown** alone, if all you need is "render the model's markdown without it looking broken." Most teams building a chat need only this plus a textarea.
- **Python, no frontend engineer:** **Gradio** first, Chainlit second. Gradio is 3.5× Chainlit's stars, ships `gr.ChatInterface` with streaming and tool/thinking display, and is the default surface for model demos everywhere. Chainlit is the better fit only if you want a chat-shaped app with auth and step traces rather than a component grid. Streamlit's `st.chat_message` / `st.write_stream` is the third option and the weakest for agent UI — it has no tool-call or reasoning primitive.
- **Generative UI:** **OpenUI** (formerly Crayon) over Tambo. More installs, daily commits, a published spec and a benchmark suite. Both carry the highest vibecode risk in this document — see the note in §10.
- **Promising newcomer:** **Markstream** — a streaming markdown renderer family for Vue/React/Svelte/Angular from a solo Chinese maintainer, 312 issues closed and 0 open, and essentially zero English-language coverage.
- **Premium/paid worth it:** none proven. assistant-cloud (thread history/telemetry/file storage) is the most defensible paid tier here because thread persistence is genuinely tedious; CopilotKit Cloud and OpenAI's managed ChatKit are both easy to outgrow.

---

# Part 1 — The patterns

This is the part that matters. Libraries change; these don't. Everything below was read off an actual interface I screenshotted, not off a blog post.

## 1. Streaming text
**Token jitter is the tell.** Naive streaming appends raw tokens as they arrive, so text advances in lurching 3–40 character bursts that track network chunking rather than reading speed. Every good implementation decouples arrival from display: buffer incoming tokens and drain them to the DOM at a smoothed rate (~20–60 chars/sec, roughly ahead of reading speed). Markstream exposes this as a first-class `SMOOTH STREAM` switch in its playground; the AI SDK ships `smoothStream()` as a transform. If you build streaming yourself and skip this, your UI will feel worse than ChatGPT's for reasons your users can't articulate.

**Markdown mid-stream is a real engineering problem, not a rendering detail.** At any instant the buffer may hold `**bold te`, an unterminated ` ``` `, or half a table row. Two failure modes follow: asterisks and backticks flash as literal characters before resolving, and a naive renderer re-parses the whole document on every token (O(n²) over a long response — visible jank by ~2000 tokens). Streamdown's entire reason to exist is this: it completes unterminated markdown for display and parses incrementally by block. Use a purpose-built streaming renderer. `react-markdown` in a `useChat` loop is the single most common cause of a chat UI that feels cheap.

**Cursor treatment.** A block caret that stays pinned to the last glyph reads as "generating." A separate spinner elsewhere on screen reads as "loading," which is a different and worse message. Do not run both. The caret should disappear on the *finish* event, not on a timer.

**Autoscroll must be interruptible.** Pin to bottom while streaming; the instant the user scrolls up, release the pin and show a "jump to latest" affordance. prompt-kit names this as a distinct component (`Scroll Button`), which is the right level of seriousness. Autoscroll that fights the user is the second-most-common chat UI defect.

## 2. Tool calls
AI Elements' `Tool` component encodes the canonical state machine, and it's five states, not three:

| State | Display |
|---|---|
| Input Streaming (Pending) | tool name, arguments still filling in |
| Input Available (Running) | tool name + args, spinner or shimmer |
| Output Available (Completed) | collapsed to one line, chevron to expand |
| Output Error | error pill, expanded by default |
| Denied | muted red `⊗ Denied` pill, collapsed |

**Collapse completed tool calls to one line; keep errors open.** Success is uninteresting once it succeeded. In the AI Elements demo a finished call renders as a wrench glyph, `database_query` in mono, a status pill, and a chevron — about 40px of vertical space for what might be 4KB of JSON.

**Show the verb, not the payload.** Cursor's transcript reads `Thought 4s` / `Read AppManager.tsx` / `Searched expose patterns` — verb in normal weight, object in muted grey, one line each. No JSON, no argument dump, no "Calling function `search_codebase` with parameters {...}". Users need to know *what the agent touched*, and can ask for the rest.

**Long work folds into a duration receipt.** Devin collapses multi-minute stretches into a single disclosure row: `▸ Worked for 4m 13s  +25 −131`. Duration plus a diff stat is enough for a human to decide whether to expand. This is the correct answer to "how do I display 200 tool calls" and nearly nobody does it.

**Render results as domain objects, not text.** Devin renders a finished PR as a card with a green `Open` pill, `cognition/cognition-website #167`, branch chips with copy buttons and an arrow to `main`, and `6 files +21 −123`. Cursor renders a written file as a chip: doc icon, `feature-prd.md`, green `+68`. A tool that returned structured data should produce a structured component. Falling back to a markdown code fence is a design failure. The clearest public demonstration of this is OpenUI's landing hero, which runs the same prompt ("I need a hotel with a modern design in Paris") side by side: `Without`, a wall of prose describing hotels; `With OpenUI`, `Showing 5 results` over a photographic card grid. Same data, same model. Show that to anyone who argues a markdown blob is good enough.

## 3. Reasoning / thinking disclosure
AI Elements states the rule in one sentence: *"automatically opening during streaming and closing when finished."* Open while thinking so the wait is legible; collapse to `Thought for 4 seconds` when done so the answer isn't buried under process. Linear goes further and renders in-progress thinking as a plain low-contrast text line — `Thinking…` — with no spinner at all.

The label should carry duration. "Thought for 4 seconds" is honest and calibrating; a generic "Reasoning" header is decoration. AI Elements maintains a documented distinction between `Reasoning` (the model's raw thinking stream) and `Chain of Thought` (a structured, authored step list) — worth preserving, because conflating them lets a product dress up post-hoc narration as real introspection.

Never auto-expand reasoning on a completed message. The user asked a question; the answer goes first.

## 4. Citations and sources
Attach citations to **claims, not paragraphs**. A superscript chip inline in the sentence it supports, expanding to a hover card with title/domain/favicon and the specific quoted passage. AI Elements splits this into two components — `Inline Citation` and `Sources` — which is the right decomposition: the inline marker and the bibliography have different jobs.

**Degrade visibly.** If the model answered without retrieving, the answer must not look identical to one with five sources. The absence of citation UI is itself information, and products that hide the difference are the ones that erode trust fastest.

**Deep-link into the passage, not the homepage.** A citation that lands on `docs.example.com` rather than `docs.example.com/guide#section-4` is a citation the user cannot check, which means it functions as decoration.

## 5. Confirmation before side effects
AI Elements ships a `Confirmation` component and assistant-ui does "inline human approvals" as a first-class runtime concept. The pattern: when the model proposes an action with consequences, render an inline card stating the *specific* action in domain terms ("Send this email to 4 recipients", not "Execute tool `send_email`") with Approve / Deny / Edit. Denial must produce a persistent `Denied` state in the transcript — the user needs to see what they refused, later.

The threshold: confirm anything that spends money, sends a message, mutates external state, or is not trivially reversible. Reads never confirm. Getting this boundary wrong in either direction is fatal — confirm too much and users click through blindly, confirm too little and one bad tool call ends the product's credibility.

## 6. Diff and preview
Devin's artifact pane is the high-water mark I saw: a generated `test_gradient_migration.md` report containing two labeled screenshots — `Before on Production` / `After on Localhost` — with captions `Gradient on text` / `Uniform solid blue`. The agent produced *visual evidence for its own claim*. Compare against the common pattern of an agent asserting "I tested it and it works."

For code: side-by-side or unified diff with the standard green/red, and a per-hunk accept/reject. For content: the changed span highlighted in place with the original available on hover. Never make the user diff two blobs of prose by eye.

**Color as data encoding only.** In both the Devin and Cursor shots, green and red appear *exclusively* on diff stats; purple appears exclusively on "merged". No decorative accent color anywhere. This is the single clearest visual difference between an agent UI that reads as an instrument and one that reads as a toy.

## 7. Agent progress — the pattern with no library
Three of the best agent products have independently converged on the same structure, and no component library implements it:

- **Cursor:** a left rail headed `READY FOR REVIEW 5`, each row a task with title, relative time (`now`, `10m`, `45m`), and a diff badge (`+20 −3`, `+135 −21`).
- **Devin:** `Recent` sessions, each row carrying title, relative time, and PR state (`2 open`, `1 merged`).
- **Linear:** concurrent agent panels, each with the agent's identity and model badge in the window chrome (`Linear · Opus 5`, `Cursor`).

The shared insight: **once agents run longer than your attention span, the primary surface is a queue of finished work summarized by its side effects, and the chat log becomes a detail view.** Building a chat-first UI for a long-running agent is the most common architectural mistake in this category right now.

Linear adds the best single detail I found anywhere: under each user message, a receipt line — `⚓ API launch  added to context`, `◷ Notification Grouping  added to context` — with the entity's own icon. The UI tells you what it pulled in *before* it answers. That one line does more for trust than any amount of reasoning disclosure.

## 8. Composer, model selectors, and empty states
The canonical empty state is one large question and one composer: v0's `What do you want to create?` over `Ask v0 to build…`; Bolt's `What will you build today?`. Below, 3–5 suggestion chips with icons. v0 puts a **reroll button** next to its chips — a small admission that the suggestions are generated and can be resampled. Steal that.

**The model selector belongs in the composer, at low prominence.** v0: `⬡ v0 Max ⌄` bottom-left inside the input, small, muted. Cursor puts `Grok 4.6 ⌄` inline in the artifact pane header next to the Build button — adjacent to the action it affects. Never a full-width top-of-screen dropdown; model choice is a setting, not a step.

**Mode toggles beat mode prose.** Bolt's `Plan` toggle sits beside `Build now`; Cursor's clarifying `Questions` card offers numbered choices (`1 Gesture`, `2 Keyboard shortcut`, `3 Both`) with prev/next chevrons instead of asking in prose. AI Elements shipped exactly this in August 2026 as a `question` component "for choices and freeform responses." Structured clarification is strictly better than a paragraph of questions the user has to answer in one blob.

**Cost/token display:** I found no good public example. Every consumer product hides it; every developer product buries it. If you're building for developers, a per-message token/cost figure in the message footer at 11px muted is more honest than a monthly bill nobody can attribute.

## 9. Mobile
The composer must be bottom-anchored and grow upward to a max height, with `env(safe-area-inset-bottom)` respected and the send affordance never displaced by the virtual keyboard. Message max-width should be ~100% at 390px — desktop's centered 720px column becomes a 90% column, not a 320px one. assistant-ui's own site holds up here: at 390px the headline reflows to three lines, the stats row stacks, and the embedded chat becomes a full-width card with an intact header. Long code blocks and tables need their own `overflow-x` container; the page body must never scroll sideways.

## 10. Trustworthy vs. slop
What made the trustworthy interfaces (Linear, Devin, Cursor, Granola) trustworthy, specifically:

1. **They show their inputs.** Linear's `added to context` receipts. Devin's `Used playbook: Test`.
2. **They produce checkable artifacts.** Devin's before/after screenshots; Cursor's `feature-prd.md +68` chip.
3. **They quantify.** `Worked for 4m 13s`, `+25 −131`, `Thought for 4 seconds`. Specific numbers, even unflattering ones.
4. **They collapse aggressively.** Every one of them folds finished work to a single line. Slop expands everything to look busy.
5. **They spend color only on meaning.** Green/red for diffs, purple for merged, nothing else.
6. **They make AI a verb, not an ambience.** Granola's entire AI surface is one dark pill — `✦ Generate notes` — at the bottom of a document of your own handwritten notes. No chat, no assistant persona, no sidebar.

And the slop tells, all of which I saw on real 2026 sites in this category: a saturated mesh-gradient hero with bloom (Bolt); gradient-filled headline text (CopilotKit, LobeHub); floating white cards with soft drop shadows arranged around a centered logo (CopilotKit); a violet-to-pink primary button; an unverifiable enterprise logo wall — CopilotKit's reads "Trusted by the majority of the Fortune 500s and Global 50" above Cisco/Apple/Walmart/Disney/BofA/Tesla/Ford, a claim with no stated basis; a sparkle icon on anything that isn't literally generation; a typing indicator that keeps animating after the stream is done; and an assistant that opens by describing its own capabilities.

The deepest one: **slop UIs narrate, trustworthy UIs receipt.** "I'll go ahead and analyze that for you!" versus `Read AppManager.tsx`.

**Which libraries here actually make a product look AI-generated, ranked bluntly.** The vibecode column above is per-entry; this is the ranking, because the answer is not evenly spread and the first draft of this file was too polite about it.

1. **Generative-UI frameworks — Tambo, OpenUI — are the highest risk in this document, and it is structural, not stylistic.** When the model selects a component from a registry and fills it, every response regresses to the registry's mean. You cannot design your way out of it by styling the registry, because the sameness is in the *selection*, not the pixels. This is the mechanism behind "why does every AI feature look the same" and it is about to get much more common.
2. **MCP-UI is next, for the opposite reason:** the markup is authored by a server you don't own and mounted in your transcript. You have no design control at all.
3. **Whole-app frameworks — ChatKit, Chainlit, Gradio, LobeHub UI** — every deployment is recognisable at a glance. That is the stated trade and it is fine for internal tools; it is not fine for the surface a customer forms an impression from.
4. **AI Elements is the sleeper.** It rates medium because it inherits your shadcn theme, which is genuinely the right architecture. But "shadcn defaults plus AI Elements defaults" has become its own recognisable 2026 look — rounded-2xl bordered message cards, a bordered composer with a paperclip and a globe toggle, a muted collapsible tool row. Installing all of it untouched produces a product that is visibly the same product as everyone else's, and inheriting your theme does not save you when your theme is also shadcn defaults. Change the message geometry, the composer, and the tool row, or accept that you shipped the reference app.
5. **Lowest risk, genuinely: the renderers and the runtime** — Streamdown, Markstream, assistant-ui unstyled, prompt-kit. A markdown renderer and a headless thread engine have no face. Note the shape of that list: **the safest things in this category are the ones that render your content rather than decide what your content looks like.** That is the whole rule.

---

# Part 2 — Scorecards

### Vercel AI SDK — `essential`
- **What:** `ai` + `@ai-sdk/react`. Provider abstraction, streaming transport, tool calling, and the typed **message-parts** model (text / reasoning / tool / source / file parts) that `useChat` exposes.
- **Verdict:** It ships no UI at all and belongs here anyway, because the parts model is what makes the components above possible — every AI Elements component is a renderer for one part type. 21.6M weekly downloads on `ai` is the largest number in this *category* by a wide margin, and it is not inflation; this is the default transport. (An earlier draft called it the largest in the whole corpus — that is wrong. Zod does 246.7M/wk, Tailwind 110.9M, `@floating-ui/dom` 66.8M in sibling files. AI UI is still a small neighbourhood of the ecosystem, and it is worth keeping that scale in mind before treating any number on this page as huge.) The honest caveat is churn: v4→v5 was a breaking rewrite of the message shape, and half the tutorials online are still v4. Read the migration guide before trusting any blog post.
- **Use when:** Any TypeScript AI product. · **Don't use when:** Python-only backend, or you're on a provider SDK you're happy with and only need rendering — take Streamdown alone.
- **Scores /5:** visual — · interaction 4 · a11y — · engineering 5 · maintenance 5 · docs 5 · customization 5 · perf 4 · stability 3 · originality 5
- **Evidence:** ★26,659 · last push 2026-09-09 · 21,639,648 wk npm (`ai`), 5,909,960 (`@ai-sdk/react`) · 1,503 open issues · Apache-2.0 (repo reports NOASSERTION)
- **Looked at:** https://ai-sdk.dev/elements/overview — off-white #f7f7f7 ground, Geist, a single Vercel-blue CTA against an otherwise entirely monochrome page, hairline-bordered feature grid with zero radius and zero shadow. Vercel house style at its most restrained; nothing here reads as "AI."
- **Vibecode risk:** n/a — no UI surface.
- **Link:** https://ai-sdk.dev

### assistant-ui — `essential`
- **What:** A React *runtime* plus unstyled primitives (`Thread`, `Message`, `Composer`, `ThreadList`, `ActionBar`) for production chat. The runtime owns thread list, message branching/editing, retries, attachments, tool state and human approval.
- **Verdict:** The strongest engineering in the category, and the evidence isn't the star count — it's that LangChain and Mastra, both of whom could trivially have built their own chat UI, ship assistant-ui instead. 331 issues closed in 30 days is roughly 3.2× CopilotKit's 103 (both counted 2026-09-09 via GitHub search). Eight first-party backend adapters (AI SDK, LangGraph, LangChain, AG-UI, A2A, Google ADK, OpenCode, custom data-stream) means it is the one library that doesn't lock your backend. The real cost is conceptual weight: you are adopting a runtime with its own state model, and if all you need is a message list over `useChat`, this is far too much machinery.
- **Use when:** Multi-turn chat is core product surface — branching, editing past messages, thread history, tool approval. · **Don't use when:** A single-turn generation box or a support widget. You'd be importing a thread engine to render two bubbles.
- **Scores /5:** visual 4 · interaction 5 · a11y 4 · engineering 5 · maintenance 5 · docs 4 · customization 5 · perf 4 · stability 4 · originality 5
- **Evidence:** ★12,082 · last push 2026-09-10 · 1,484,707 wk npm (`@assistant-ui/react`) · 100+ contributors · MIT · 126 open issues, 331 closed in last 30 days · YC-backed · used in production by Mastra, LangChain, Athena Intelligence, Browser Use, Stack AI, Iterable, Helicone (self-reported with links in README; not independently confirmed)
- **Looked at:** https://www.assistant-ui.com — warm off-white, heavy grotesque headline, a dotted-grid logo watermark, black pill CTA, and — the good part — a **live embedded chat** below the fold rather than a screenshot: sidebar with `+ New thread`, header `New chat` with overflow and expand controls, centered `How can I help you today?`. It shows the product working instead of describing it. The stats line reads "12.1k GitHub stars · 1.5M weekly downloads," which matches what I measured independently (12,082 / 1,484,707) — honest self-reporting, rarer than it should be. At 390px it reflows cleanly with no horizontal scroll.
- **Vibecode risk:** low — the primitives are unstyled and the optional shadcn theme is your theme, not theirs. The risk is behavioral sameness (everything gets ChatGPT's exact interaction model), not visual sameness.
- **Link:** https://www.assistant-ui.com

### Streamdown — `essential`
- **What:** A React markdown renderer built for token-by-token streams. Completes unterminated markdown for display, parses incrementally by block, ships streaming carets, Shiki code blocks, Mermaid, KaTeX and a hardened link/image policy.
- **Verdict:** The most underrated dependency in AI UI, and 4.4M weekly downloads at thirteen months old says the market agrees even if the listicles don't mention it. Its own docs state the thesis plainly — *"Most Markdown renderers re-parse the entire document on every update"* — and that single sentence explains more jank in more AI products than any other. This is a narrow, boring, correct library. Two caveats. It's React-only and Vercel-adjacent, so it tracks AI SDK conventions. And the maintenance is bursty rather than steady: 46 commits in 2026-03, then one commit each in April, May and July, then 50 in August, then one in September, with a five-month gap between `2.5.0` (2026-03-17) and `2.6.0` (2026-08-24). That is fine for a library this narrow — a markdown renderer that is correct stays correct — but a maintenance 5 here would be the Vercel name doing the scoring rather than the commit log, so it scores 4.
- **Use when:** Anything renders streamed model output. Which is everything. · **Don't use when:** Non-React, or your output is strictly plain text.
- **Scores /5:** visual 4 · interaction 5 · a11y 4 · engineering 5 · maintenance 4 · docs 5 · customization 4 · perf 5 · stability 4 · originality 5
- **Evidence:** ★5,604 · last release streamdown@2.6.0 2026-08-24 (previous release 2.5.0 on 2026-03-17 — a five-month gap) · last push 2026-09-07 · 4,384,049 wk npm · 84 contributors · 34 open issues · Apache-2.0 (repo reports NOASSERTION)
- **Looked at:** https://streamdown.ai — same Vercel OSS shell as AI Elements, but with one detail worth stealing: a **`For humans | For agents`** toggle sitting directly above the install command. Docs that declare an agent-readable mode as a peer of the human mode, at the top of the page, is a 2026 convention I have not seen elsewhere and expect to see everywhere by 2027.
- **Vibecode risk:** low — typography defaults are opinionated but overridable per element, and a markdown renderer doesn't give a product a face.
- **Link:** https://streamdown.ai

### AI Elements — `strong`
- **What:** A shadcn-style registry of ~35 AI components installed by CLI into your repo (`npx ai-elements@latest add tool`). Chatbot set: Attachments, Chain of Thought, Checkpoint, Confirmation, Context, Conversation, Inline Citation, Message, Model Selector, Plan, Prompt Input, Queue, Reasoning, Shimmer, Sources, Suggestion, Task, Tool. Code set: Agent, Artifact, Code Block, Commit, and more.
- **Verdict:** The component list *is* the contribution. Nobody else has shipped named, documented implementations of `Confirmation`, `Checkpoint`, `Context`, `Queue` and `Plan` — those are the hard parts of agent UI and everyone else stops at "message bubble." Because it copies source into your repo, the ordinary maintenance risk mostly doesn't apply. But be clear-eyed, and more clear-eyed than the first draft of this file was: since 2026-05-27 the repo has landed **two** commits (a placeholder-token fix on 2026-07-09 and the `question` component on 2026-08-21), and the last tagged release was `ai-elements@1.9.0` on 2026-03-12 — six months ago. That is not ~1 commit/month; it is a repo that gets touched twice a quarter. Demoted from `essential` to `strong` on this pass: the taxonomy and the copy-in model still make it the right default for components, but `essential` should mean the thing is both indispensable and alive, and 96 open issues against two commits in three and a half months fails the second half. Take the source, expect to own it, and do not file issues hoping.
- **Use when:** You're on AI SDK + shadcn and want a correct starting point per pattern. Also: read its docs even if you use nothing else. · **Don't use when:** You're not on Tailwind/shadcn — you'd be porting, not installing.
- **Scores /5:** visual 4 · interaction 4 · a11y 3 · engineering 4 · maintenance 2 · docs 5 · customization 5 · perf 4 · stability 4 · originality 5
- **Evidence:** ★2,423 · last release ai-elements@1.9.0 2026-03-12 (6 months) · commits since 2026-05-27: two (2026-07-09, 2026-08-21) · last commit 2026-08-21 ("Add question component for choices and freeform responses") · last push 2026-09-01 · 60 contributors · 96 open issues · Apache-2.0 (repo reports NOASSERTION)
- **Looked at:** https://ai-sdk.dev/elements/components/tool and `/reasoning` — the Tool demo renders a completed call as a wrench glyph, `database_query` in mono, a muted-red `⊗ Denied` pill and a chevron, roughly 40px tall. The right-hand ToC enumerates the four streaming states by name (Input Streaming / Input Available / Output Available / Output Error). The Reasoning page states its behavior as a rule in the first sentence: "automatically opening during streaming and closing when finished." Docs footer offers `Copy page`, `Ask AI about this page`, `Open in chat`. Restrained, monochrome, hierarchy instant.
- **Vibecode risk:** medium — it inherits your shadcn theme, which is good, but a team that installs all 35 components untouched gets an interface that is recognizably "the Vercel AI Elements app." The components are a starting point; the defaults are not a design.
- **Link:** https://ai-sdk.dev/elements

### AG-UI Protocol — `strong`
- **What:** An open event-based wire protocol standardizing agent→frontend communication (text deltas, tool lifecycle, state patches, human-in-the-loop). Not a UI library.
- **Verdict:** The most consequential non-visual thing in this category. It went from a CopilotKit side project in May 2025 to something assistant-ui ships a first-party adapter for (`@assistant-ui/react-ag-ui`) — a competitor adopting your protocol is the strongest possible signal it's real. Release cadence is date-tagged and daily. The caveat is governance optics: it originated at CopilotKit, whose commercial product benefits from it, and HN commenters have said so directly. Adopt the event shapes; do not assume neutrality.
- **Use when:** You control an agent backend and want a frontend that isn't married to your framework. · **Don't use when:** Single-vendor stack where the AI SDK data stream already does the job.
- **Scores /5:** visual — · interaction — · a11y — · engineering 4 · maintenance 5 · docs 4 · customization 5 · perf — · stability 3 · originality 5
- **Evidence:** ★15,816 · last release release/2026-09-09 (daily cadence) · last push 2026-09-09 · 100+ contributors · MIT · 369 open issues
- **Vibecode risk:** n/a
- **Link:** https://github.com/ag-ui-protocol/ag-ui

### Markstream — `strong`
- **What:** A family of streaming-markdown renderers — `markstream-vue`, `-react`, `-svelte`, `-angular`, `-vue2` — from a solo maintainer. Handles incomplete markdown, Mermaid, KaTeX, stream-diff code blocks, safe HTML and "low-jitter updates." API is a `MarkdownRender` with `content` and `isDone`.
- **Verdict:** Streamdown for the rest of the web, and essentially unknown in English. 31.7k weekly downloads on the Vue package and 312 issues closed against 0 open is a real maintenance record, not a vanity project. One caveat, and one retraction. The retraction: an earlier draft called 3,002 stars against **7 watchers** a 429:1 ratio "that no organically-grown repo produces." That is wrong, and I checked it rather than repeating it. Measured on 2026-09-09: `vercel/ai-elements` is 605:1, `vercel/streamdown` 509:1, `shadcn-ui/ui` 290:1, `tambo-ai/tambo` 360:1, `CopilotKit/CopilotKit` 198:1. GitHub de-emphasised watching years ago; three-figure ratios are the norm for anything that trends, and two of this file's own `essential` picks score worse than Markstream does. The star count is fine. The real caveat is the surviving one: 2.0 shipped recently with a documented code-block runtime migration, so the API is not yet settled. For a React project Streamdown is the safer pick. For Vue, Svelte or Angular there is no comparable alternative.
- **Use when:** Vue/Nuxt/Svelte/Angular AI chat, or you need one renderer across several frameworks. · **Don't use when:** React-only — Streamdown has 130× the downloads and Vercel behind it.
- **Scores /5:** visual 3 · interaction 5 · a11y 3 · engineering 4 · maintenance 5 · docs 4 · customization 4 · perf 5 · stability 3 · originality 4
- **Evidence:** ★3,002 · last release markstream-vue@2.0.11 2026-09-09 · last push 2026-09-10 · 31,688 wk npm (vue) / 3,352 (react) / 295 (angular) / 263 (svelte) · 47 contributors · MIT · 0 open / 312 closed issues · 7 watchers
- **Looked at:** https://markstream-vue.simonhe.me/ — the right-hand control panel is the substance: `BRAND THEME`, `CODE THEME` (Vitesse Dark), **`HTML POLICY` (Trusted)**, `DARK MODE`, and a `SMOOTH STREAM` toggle. Exposing an HTML trust policy and a stream-smoothing switch as user-facing controls is a maintainer who has actually shipped this in anger. Rendering quality is good — inline KaTeX sits correctly on a CJK baseline, inline code gets a pink-tinted chip, blockquotes get a left rule with a working nested variant. The demo page itself is the weak part: a pastel mint→peach→sky aurora wash behind the content leaves everything below the fold (`Heading Levels`, `Heading 3`–`6`) fading to near-illegible ghosts against it. That's a taste failure on the playground, not in the library, but it is why nobody in the West has taken this seriously.
- **Vibecode risk:** low — it renders markdown; it has no product face.
- **Link:** https://github.com/Simon-He95/markstream-vue

### OpenAI ChatKit — `situational`
- **What:** OpenAI's drop-in chat UI. A web component (`OpenAIChatKit`) with a React wrapper: `<ChatKit control={control} className="h-[600px] w-[320px]" />`. Backend either OpenAI-hosted or self-hosted via a Python SDK.
- **Verdict:** The fastest path from zero to a competent chat surface, and the most expensive to escape. That `className="h-[600px] w-[320px]"` in the quickstart tells you the model: you get one component and you size it. The docs list "Deep UI customization" as feature #1, which in my experience is what a project writes when it is the leading objection. It genuinely ships the full feature set — streaming, tool/workflow visualization, in-chat interactive widgets, attachments, threads, source annotations and entity tagging — and if your product's chat is a support corner rather than the product, that trade is fine. If chat *is* the product, you will rebuild this in a year.
- **Use when:** Chat is a bolt-on, you're already on OpenAI, and speed beats identity. · **Don't use when:** Chat is your core surface, or you need a look that isn't OpenAI's.
- **Scores /5:** visual 4 · interaction 4 · a11y 4 · engineering 4 · maintenance 4 · docs 4 · customization 2 · perf 4 · stability 3 · originality 2
- **Evidence:** 71,772 wk npm (`@openai/chatkit-react`) · advanced-samples repo ★652, last push 2026-08-01 · vendor-maintained, closed-source core
- **Looked at:** https://openai.github.io/chatkit-js/ — plain white docs, black `Let's build ›` pill, a React/Vanilla JS tabbed quickstart in a grey card. Sidebar exposes both `Self-hosted backend`/`ChatKit Python SDK` and `OpenAI-hosted backend`/`Managed ChatKit Docs`, so the self-host path is real rather than a footnote. Clear, unremarkable, honest.
- **Vibecode risk:** high — every ChatKit deployment looks like ChatKit. That's the deal you're making.
- **Link:** https://openai.github.io/chatkit-js/

### CopilotKit — `situational`
- **What:** An in-app copilot framework: a sidebar/popup assistant that can read app state and call typed frontend actions, plus AG-UI-based adapters to CrewAI, Agno, AG2, LlamaIndex, Mastra and LangGraph.
- **Verdict:** Separate the software from the sales motion. The software solves a problem nobody else does — an assistant that can *act on your app*, not just discuss it — and 37.3k stars with 101 issues closed in 30 days is a real project. The sales motion is the problem: the primary CTA is `Book a Demo`, the nav carries `Pricing`, `Talk to an Engineer` and a live-event banner, and HN comments going back to 2025 flag that AG-UI's openness sits next to a paid CopilotKit service. Then there's the logo wall: "Trusted by the majority of the Fortune 500s and Global 50" over Cisco/Apple/Walmart/Disney/Bank of America/Deutsche Telekom/Tesla/Ford, with no stated basis. That claim is unverifiable as written and an agent should treat it as marketing, not evidence.
- **Use when:** You need an assistant with real read/write access to app state and typed frontend actions. · **Don't use when:** You want a chat surface. It's far too much framework, and assistant-ui does chat better.
- **Scores /5:** visual 3 · interaction 4 · a11y 3 · engineering 4 · maintenance 4 · docs 4 · customization 3 · perf 3 · stability 3 · originality 5
- **Evidence:** ★37,280 · last release v1.71.0 2026-09-09 · last push 2026-09-09 · 406,042 wk npm (`@copilotkit/react-core`) · 100+ contributors · MIT · 298 open issues, 101 closed in last 30 days
- **Looked at:** https://www.copilotkit.ai — pale lilac-to-white wash, headline with `any agent` / `any user` in a teal→violet gradient fill, integration logos on floating white cards with soft drop shadows arranged around a centered CopilotKit tile. Three vibecode tells in one viewport: gradient text, pastel wash, floating soft-shadow cards. A library whose own marketing site looks like this is not a library to take visual cues from — which is fine, because its value is behavioral.
- **Vibecode risk:** medium — the default `CopilotSidebar` is instantly recognizable, but it's a corner of your app rather than the whole thing.
- **Link:** https://www.copilotkit.ai

### deep-chat — `situational`
- **What:** A framework-agnostic chat web component (`<deep-chat>`) with wrappers for React, Vue, Svelte, Angular, Solid. Ships file upload, camera, speech-to-text, text-to-speech and direct connections to major providers.
- **Verdict:** The correct answer for a stack with no React — Rails, Django, Astro, Laravel, plain HTML — where every other option here is a non-starter. Actively maintained (2.5.1 in August 2026) after three and a half years, which is unusual persistence. But 21k weekly downloads and 17 contributors is a small, single-maintainer project carrying a large feature surface, and the direct-to-provider connection mode encourages putting API keys where they don't belong. Use it as a component, not as an architecture.
- **Use when:** Non-React or multi-framework, and you need chat without a build system argument. · **Don't use when:** React — you have three better options.
- **Scores /5:** visual 3 · interaction 4 · a11y 3 · engineering 3 · maintenance 4 · docs 4 · customization 3 · perf 3 · stability 4 · originality 4
- **Evidence:** ★3,712 · last release 2.5.1 2026-08-27 · last push 2026-09-06 · 21,031 wk npm · 17 contributors · MIT · 39 open issues
- **Vibecode risk:** medium — its defaults (rounded bubbles, avatar column) are a recognizable stock-chat look; restyling web-component internals is more friction than restyling React.
- **Link:** https://deepchat.dev

### Chainlit — `situational`
- **What:** Python-first conversational app framework. Decorate Python functions, get a full chat app with streaming, steps, elements and auth.
- **Verdict:** Real, maintained (2.12.0, August 2026), Apache-2.0, and the right call for an ML team that needs a usable internal surface tomorrow with no frontend engineer. It is not a component library — you get Chainlit's app, and the customization ceiling is CSS overrides. Excellent for internal tools and demos; a trap if it quietly becomes the customer-facing product.
- **Use when:** Python backend, internal tool or demo, no frontend capacity. · **Don't use when:** It's customer-facing and needs your brand.
- **Scores /5:** visual 3 · interaction 4 · a11y 3 · engineering 4 · maintenance 4 · docs 4 · customization 2 · perf 3 · stability 4 · originality 4
- **Evidence:** ★12,440 · last release 2.12.0 2026-08-25 · last push 2026-09-09 · Apache-2.0 · 146 open issues
- **Vibecode risk:** high — every Chainlit app looks like a Chainlit app.
- **Link:** https://chainlit.io

### LobeHub UI — `situational`
- **What:** `@lobehub/ui` — the component layer extracted from Lobe Chat (82k stars): ChatList, ChatItem, ChatInputArea, markdown renderer, model icon set.
- **Verdict:** Genuinely maintained (v5.42.0 shipped the day I checked, 304k weekly downloads) and battle-tested inside one of the largest open-source chat apps. But it comes with LobeHub's visual identity attached rather than inheriting yours, and the docs site is unreliable — two component URLs I tried both 404'd, with the 404 page itself rendering a violet-to-orange gradient `404` and a violet primary button, which is exactly the house style you'd be adopting. Its genuinely useful export is `@lobehub/icons`: maintained brand marks for every model provider, which you will otherwise draw by hand.
- **Use when:** You want Lobe Chat's look, or you need the provider icon set. · **Don't use when:** You have a design system of your own.
- **Scores /5:** visual 3 · interaction 4 · a11y 3 · engineering 4 · maintenance 5 · docs 2 · customization 3 · perf 3 · stability 4 · originality 3
- **Evidence:** ★2,192 · last release v5.42.0 2026-09-09 · last push 2026-09-09 · 304,876 wk npm (`@lobehub/ui`) · 48 contributors · MIT · 58 open issues
- **Looked at:** https://ui.lobehub.com/components/chat-list and `/components/ChatItem` — both 404. The 404 page itself: gradient-filled numerals violet→pink→orange, a violet `Search documentation` button, and a helpful "You may be looking for → ChatItem" suggestion. Good error-state design; bad sign about docs URL stability.
- **Vibecode risk:** high — the gradient-and-violet identity is baked in.
- **Link:** https://ui.lobehub.com

### LangChain agent-chat-ui — `situational`
- **What:** A Next.js reference app for chatting with any LangGraph server. Renders messages, tool calls, interrupts and generative UI.
- **Verdict:** Best read as executable documentation for LangGraph's `interrupt` and human-in-the-loop patterns, which are hard to get right and well demonstrated here. It's a template, not a package — no npm artifact, no release tags, 19 contributors. Fork it, learn the interrupt handling, then build your real UI on assistant-ui (whose LangGraph adapter LangChain itself ships in its own products).
- **Use when:** Prototyping on LangGraph, or studying human-in-the-loop interrupt UX. · **Don't use when:** Production.
- **Scores /5:** visual 3 · interaction 4 · a11y 3 · engineering 3 · maintenance 4 · docs 3 · customization 4 · perf 3 · stability 3 · originality 3
- **Evidence:** ★3,137 · last push 2026-09-09 · no releases · 19 contributors · MIT · 89 open issues · no npm package
- **Vibecode risk:** medium — a stock shadcn chat that many LangGraph demos share verbatim.
- **Link:** https://github.com/langchain-ai/agent-chat-ui

### prompt-kit — `reference-only`
- **What:** Minimal shadcn/Tailwind AI primitives: Chain of Thought, Chat Container, Code Block, Feedback Bar, File Upload, Loader, Markdown, Message, Prompt Input, Prompt Suggestion, Reasoning, Scroll Button, Source, Steps.
- **Verdict:** This hurts, because the taste here is the best in the category. The component names alone are a better decomposition of AI chat than most libraries' entire APIs — `Scroll Button` and `Prompt Suggestion` as first-class named things is someone who has built this more than once. But the last commit was 2026-03-12, and the final three commits were a sitemap, SEO improvements and a landing-page layout fix. The author stopped shipping components and did marketing, six months ago. A `Feedback Bar new` badge still sits in the sidebar. Copy the source, study the naming, don't wait for updates.
- **Use when:** You want a small set of well-named primitives you'll own outright. · **Don't use when:** You need it maintained. It isn't.
- **Scores /5:** visual 4 · interaction 4 · a11y 3 · engineering 4 · maintenance 1 · docs 4 · customization 5 · perf 4 · stability 3 · originality 4
- **Evidence:** ★3,054 · last push 2026-03-12 (~6 months) · no releases · 13 contributors · MIT · 11 open issues
- **Looked at:** https://www.prompt-kit.com/chat-ui, re-shot independently on 2026-09-09 at 1440 and 390. The description in the first draft is accurate — pure white, a single dashed 1px left rail, black `Get Started` pill, no shadow, no accent, no gradient — but the score attached to it was not. This is stock shadcn documentation chrome: centred hero, a lowercase `chat ui` eyebrow, a two-line headline, a subhead, a pill, then a very large empty bordered card. There is no compositional idea, no typographic hierarchy beyond size, and a lot of dead vertical space above the fold. That is the *absence of bad taste*, which is worth a great deal in this category and worth a 4 — not the presence of design, which is what a 5 should mean. The genuine contribution is the sidebar taxonomy (`Scroll Button`, `Prompt Suggestion`, `Chain of Thought`, and an undocumented-elsewhere `Model Context Protocol` page), and that is a naming achievement, not a visual one. Corrected 5 → 4.
- **Vibecode risk:** low — near-zero house style.
- **Link:** https://www.prompt-kit.com

### shadcn-chatbot-kit — `reference-only`
- **What:** Blazity's shadcn-registry chat components: message list, prompt suggestions, file upload, audio.
- **Verdict:** Fine work that stopped. Last push 2026-02-26, no releases, no npm package. Because it's a copy-in registry the code still runs, but treat it as a snapshot from six months ago and expect to maintain what you take. AI Elements covers the same ground with a wider component surface and a live upstream.
- **Use when:** You want a specific component from it and will own it forever. · **Don't use when:** Anything else — take AI Elements.
- **Scores /5:** visual 3 · interaction 3 · a11y 3 · engineering 3 · maintenance 1 · docs 3 · customization 4 · perf 3 · stability 3 · originality 2
- **Evidence:** ★802 · last push 2026-02-26 · no releases · MIT · 10 open issues
- **Vibecode risk:** medium — stock shadcn chat with rounded bubbles.
- **Link:** https://shadcn-chatbot-kit.vercel.app

### Tambo — `experimental`
- **What:** A React generative-UI framework: register components, let the model choose and populate them mid-conversation.
- **Verdict:** The idea is the right one — generative UI is where this category is going, and Tambo is one of a handful of libraries treating component selection as a first-class primitive rather than a demo (OpenUI, below, is the other one worth knowing and the first draft missed it). But the adoption doesn't match the attention: 11,180 stars against **4,522 weekly npm downloads**. Compare peers — OpenUI converts 8,709 stars into 10,497 weekly installs, Markstream 3,002 stars into 31,688. Tambo is the outlier on the one ratio that matters, which is stars-to-installs. (An earlier draft also cited its 31 watchers as evidence; I've dropped that. Watcher counts are junk in 2026 — `vercel/ai-elements` has four. See the Markstream entry.) Last release was 2026-06-16, ~3 months ago, though pushes continue. I would not build core infrastructure on this without a much closer look than a listicle can give you, and neither should an agent.
- **Use when:** Prototyping model-driven component selection, side surfaces only. · **Don't use when:** Core product infrastructure.
- **Scores /5:** visual 3 · interaction 4 · a11y 2 · engineering 3 · maintenance 3 · docs 3 · customization 4 · perf 3 · stability 2 · originality 5
- **Evidence:** ★11,180 · 561 forks · last release tambo-v0.56.2 2026-06-16 · last push 2026-09-10 · 4,522 wk npm (`@tambo-ai/react`) · 61 contributors · MIT · 40 open issues
- **Vibecode risk:** **high**, and the bare "medium" in the first draft was the softest call in this file. Generative UI means the model picks a component out of a registry and fills it. Whatever restraint you exercise designing that registry, every response is assembled from the same small kit by a model optimising for plausibility, so the output converges on the registry's average — which is the mechanical definition of looking AI-generated. Ship it on a side surface where sameness is acceptable, not on the surface that carries your product's identity.
- **Link:** https://github.com/tambo-ai/tambo

### OpenUI (formerly Crayon / Thesys) — `situational`
- **What:** `@crayonai/react-ui` + `@crayonai/react-core`, CLI `pnpx @openuidev/cli@latest create`. A generative-UI framework and a published spec: the model returns a structured UI description, the client renders it from your registered component set. Repo renamed `thesysdev/crayon` → `thesysdev/openui` and rebranded to openui.com; both npm names still ship.
- **Verdict:** The generative-UI entry this file missed on the first pass, and on every measurable axis it beats the one it did include. 10,497 weekly downloads on `@crayonai/react-ui` against Tambo's 4,522, daily commits through 2026-09-10 against Tambo's last release in June, plus a benchmark suite and an open-weight model (OUI-1, announced 2026-09-08) — a project doing evaluation work, not just demos. The rebrand is the risk: a repo that renamed itself and its product inside the last year, with a commercial host (Thesys) behind the spec, is a project still deciding what it is. Same governance caveat as AG-UI, less maturity.
- **Use when:** You want model-selected components and you'd otherwise reach for Tambo. · **Don't use when:** The surface carries your brand — see the vibecode note.
- **Scores /5:** visual 3 · interaction 4 · a11y 2 · engineering 4 · maintenance 5 · docs 3 · customization 4 · perf 3 · stability 2 · originality 5
- **Evidence:** ★8,709 · 624 forks · last push 2026-09-10 (commits daily) · 10,497 wk npm (`@crayonai/react-ui`), 9,560 (`@crayonai/react-core`), 8,229 (`@openuidev/cli`) · MIT · 152 open issues · repo created 2024-12-02
- **Looked at:** https://crayonai.org (redirects to the OpenUI shell), shot at 1440 and 390. Restrained for this category: black-and-grey headline stack, a `pnpx` install pill, one small orange asterisk mark, no gradient and no violet anywhere. The substance is the hero demo — a side-by-side `Without` / `With OpenUI` pair on the same prompt ("I need a hotel with a modern design in Paris"), left showing a wall of prose, right showing `Showing 5 results` over a card grid with photographs. That is the cleanest public demonstration of §2's "render results as domain objects, not text" I found anywhere, from a library rather than a product, and it is worth showing to anyone who argues that a markdown blob is good enough.
- **Vibecode risk:** **high** — identical argument to Tambo. The model choosing from a fixed registry *is* a house style, and it is one you did not draw.
- **Link:** https://www.openui.com

### MCP-UI — `situational`
- **What:** `@mcp-ui/client` + `@mcp-ui/server`. An extension of the Model Context Protocol in which a tool returns a renderable **UI resource** (HTML, an external URL, or a remote-DOM description) instead of text, which the host chat client mounts inline in the transcript.
- **Verdict:** The largest thing in this category the first draft did not mention: 245,618 weekly downloads on `@mcp-ui/client` alone, more than deep-chat, ChatKit, Tambo, OpenUI and Markstream combined, driven by host clients adopting it rather than by app developers installing it. It matters because it is the only serious answer to "the tool returned structured data, who renders it" that doesn't require the client to know about the tool in advance — the inverse of AI Elements, where you write a renderer per tool. Two honest caveats: the repo has been quiet since 2026-07-08 with the last client release in May, which for something moving this fast is a real question mark; and the whole premise hands rendering authority to whoever wrote the MCP server.
- **Use when:** You are building an MCP *host* (a chat client that connects to arbitrary servers) and need third-party tools to render something better than JSON. · **Don't use when:** You control both ends — then just write the component.
- **Scores /5:** visual — · interaction 4 · a11y 2 · engineering 4 · maintenance 3 · docs 3 · customization 3 · perf 3 · stability 2 · originality 5
- **Evidence:** ★5,139 (repo now `MCP-UI-Org/mcp-ui`) · last push 2026-07-08 · last release `client/v7.1.1` 2026-05-09 · 245,618 wk npm (`@mcp-ui/client`) · Apache-2.0 · 62 open issues
- **Vibecode risk:** **high**, and structurally the worst in this document — you are rendering HTML authored by a third-party server inside your product's transcript. Whatever it looks like is what your product looks like at that moment, and you have no design control and limited security control. Sandbox it, frame it visibly as foreign content, and never let it inherit your chrome.
- **Link:** https://mcpui.dev

### Gradio — `situational`
- **What:** Python UI framework for ML apps. `gr.ChatInterface` gives a full streaming chat from a Python function; `gr.Chatbot` supports tool-call and thinking display via message metadata. Gradio 6 shipped 2026-08-24.
- **Verdict:** The first draft named Chainlit as *the* Python answer and never mentioned Gradio, which is the larger project by every measure — ★43,505 to Chainlit's 12,440, Apache-2.0, pushed daily, and the default surface for essentially every model demo on Hugging Face. That omission is the clearest popularity-bias failure in the file's direction: Gradio reads as "ML demo tool" rather than "AI interface library" in Western frontend discourse, so the listicles skip it and this file inherited the skip. For an ML team that needs a chat surface tomorrow, Gradio is a better first stop than Chainlit — more components, more deployment paths, a real theming system. Chainlit stays the better fit when you want chat-app furniture specifically: threads, auth, step traces. Streamlit's `st.chat_message` / `st.write_stream` is the third option and the weakest here, because it has no tool-call or reasoning primitive at all.
- **Use when:** Python, ML team, internal tool or public demo. · **Don't use when:** It's the customer-facing product with your brand on it.
- **Scores /5:** visual 3 · interaction 4 · a11y 3 · engineering 4 · maintenance 5 · docs 4 · customization 3 · perf 3 · stability 4 · originality 4
- **Evidence:** ★43,505 · last release `gradio@6.26.0` 2026-08-24 · last push 2026-09-09 · Apache-2.0 · 150 open issues · PyPI download comparison against Chainlit **unverified** this pass (pypistats returned 429; Chainlit measured at 112,165/wk before the limit, Gradio not obtained — do not quote a Gradio PyPI figure from this file)
- **Looked at:** https://www.gradio.app at 1440 and 390. Cleaner than its reputation: white ground, near-black Inter-ish headline, one orange primary button, two small `NEW` pills, then an honest scrolling gallery of real component renders (Dataframe, ImageSlider, Slider, Gallery, Checkbox, Code) rather than illustrations of components. No gradient, no glow, no floating cards. The orange is the whole brand and it is used as an accent, not a wash. Sober work.
- **Vibecode risk:** **high** — every Gradio app looks like a Gradio app, exactly as with Chainlit. The theming system is real but shallow; you are changing colours on a recognisable chassis.
- **Link:** https://www.gradio.app

## Rejected / avoid
- **LlamaIndex chat-ui (`@llamaindex/chat-ui`)** — 3,106 weekly downloads and no push since 2025-12-16 (~9 months). Named in most "best AI chat UI" listicles; effectively unmaintained. If you're on LlamaIndex, wire its server to assistant-ui or AI Elements instead.
- **nlux** — 1,381 stars, 4,700 weekly downloads, last push 2025-11-25. Was a reasonable option in 2024. It is not one now.
- **Chatbot UI (mckaywrigley)** — 33,345 stars, **last commit 2024-08-03**. Two years dead and still the top result for "chatbot ui github." The clearest star-count-versus-reality gap in this corpus. If you want a deployable ChatGPT clone, take LibreChat or Open WebUI.
- **Loquix** — Show HN'd March 2026 as framework-agnostic web components for AI chat. 40 stars, 22 weekly downloads on `@loquix/core`, last push 2026-08-10. The premise (AI chat components that aren't React-only) is right and unserved; this implementation has no adoption. deep-chat is the working answer to the same question.
- **llm-ui (`@llm-ui/react`)** — 1,743 stars, **last push 2025-07-02**, fourteen months dead. Still cited in 2026 roundups as "the React library for LLMs." Streamdown and Markstream both do its job and are alive.
- **CedarOS (`CedarCopilot/cedar`)** — "the open-source framework for building AI-native frontends," surfaced on X in late 2025. 172 stars, last push 2025-10-06. Checked because the premise is right and the file should not dismiss obscure things by reflex; it is simply abandoned.
- **Kibo UI (`haydenbleasel/kibo`)** — ★3,930, a shadcn registry that includes AI chat components. Not dead but not moving: last push 2026-05-04. Its AI set overlaps AI Elements, whose taxonomy is better. Worth a look only if you already use Kibo for its other registries.
- **Rolling your own markdown renderer with `react-markdown` + `useChat`** — not a library, but the most common mistake in the category. It re-parses on every token and breaks on partial syntax. This is why your chat feels worse than ChatGPT's.
- **Reference-only, deliberately:** **LibreChat** (★42,978, active), **Open WebUI** (★151,494, active), **Lobe Chat** (★82,365, active) and **Hugging Face chat-ui** (★10,939, active, Apache-2.0 — the Svelte one, and the only non-React reference app in this row, which makes it the most useful of the four if your stack isn't React) are excellent products and the best available reference for *feature completeness* — model switching, presets, RAG, plugins, multi-user. All three are monolithic applications you cannot decompose into a component layer. Study them; don't try to extract them.

## What surprised me
- **The best agent UI pattern in the world has no library.** Cursor, Devin and Linear independently converged on "queue of finished work summarized by side effects (`+20 −3`, `2 open`, `Worked for 4m 13s`), chat as a detail view" — and not one component library ships it. AI Elements' `Task` and `Queue` are the closest, and they're not it.
- **Streamdown is the quiet giant.** 4.38M weekly downloads at thirteen months old, more than assistant-ui, CopilotKit, prompt-kit, deep-chat, ChatKit and Tambo *combined* — (and `@mcp-ui/client`, at 245,618/wk, is now the third-largest number here and appears in none of them either) — and it appears in almost none of the "best AI chat UI library" roundups, because it isn't a chat library. The most-installed thing in this category is a markdown renderer.
- **The watcher-count red flag is fake.** I inherited from the first draft the idea that a high star-to-watcher ratio means bought stars, and it does not. `vercel/ai-elements` has 2,423 stars and **four** watchers. Any metric that flags Vercel's own repo as fraudulent is a metric to throw away, and it was being pointed disproportionately at a Chinese solo maintainer and a small startup. Worth naming as a bias, not just an error.
- **Gradio was missing from a file about AI interfaces.** ★43,505, Apache-2.0, pushed daily, `gr.ChatInterface` with streaming and tool display, and the default surface for model demos worldwide — absent, while Chainlit at a third the size was named as the Python answer. It reads as an "ML demo tool" in frontend discourse, so the listicles skip it and this file inherited the skip. That is what popularity bias looks like from the inside.
- **Markstream exists and nobody in the West knows.** A five-framework streaming markdown renderer family, 31.7k weekly downloads on the Vue package, 312 issues closed and 0 open, releases the day I checked — and no English coverage I could find. Its playground exposes an `HTML POLICY` control and a `SMOOTH STREAM` toggle, both of which are more sophisticated than anything Streamdown surfaces to users.
- **prompt-kit is dead and everyone still recommends it.** It's in every 2026 listicle as the lightweight alternative. Last commit 2026-03-12, and the final three were a sitemap, SEO tweaks and a landing-layout fix. Best taste in the category, stopped shipping six months ago.
- **LangChain and Mastra both ship assistant-ui.** Two agent frameworks that could obviously have built their own chat UI chose someone else's. That's a stronger endorsement than any star count and it's buried in a README logo row.
- **Cursor's landing page is warm bone-white, not dark.** The dominant AI-developer-tool aesthetic (near-black + electric accent) is now common enough that the leading product in the category defected from it. Bolt, by contrast, is still running a full-bleed electric-blue mesh gradient with bloom behind a glassy composer — the 2024 look, in late 2026.
- **Nobody shows cost.** Across every product I looked at, not one surfaced per-message token or dollar cost in the transcript. For a category obsessed with transparency about *reasoning*, the silence about *price* is conspicuous.

## Open questions
- **~~Is Markstream's star count organic?~~ Settled, and the question itself was bad.** The 429:1 star-to-watcher ratio is not anomalous — it is normal. Measured 2026-09-09: `vercel/ai-elements` 605:1, `vercel/streamdown` 509:1, `tambo-ai/tambo` 360:1, `thesysdev/openui` 290:1, `shadcn-ui/ui` 290:1, `CopilotKit/CopilotKit` 198:1, `vercel/ai` 183:1, `assistant-ui` 145:1, `facebook/react` 37:1. GitHub de-emphasised watching years ago, so anything that trends on X or HN accumulates stars without watchers. Two of this file's own top picks score worse than Markstream. The metric is retired; do not use it in this corpus again.
- **Tambo's real number problem** is stars-to-installs, not watchers: 11,180 stars against 4,522 weekly downloads, where OpenUI converts 8,709 stars into 10,497 installs and Markstream converts 3,002 into 31,688. Still open, and settled by whether installs move after a 1.0.
- **Is AI Elements slowing down or just finished?** Sharper than the first draft had it: **two** commits since 2026-05-27 and no tagged release in six months. Acted on this pass by demoting it to `strong`. Still genuinely open as to *why* — a finished reference implementation and a quietly deprioritised one look identical from outside. Settled by: whether a component lands for a pattern that emerged after 2026-08.
- **CopilotKit's "majority of the Fortune 500s and Global 50."** No basis stated anywhere I could find. Settled by a named customer list or a public case study; treat as marketing until then.
- **assistant-ui's production users** (Mastra, LangChain, Iterable, Helicone, Browser Use, Stack AI) are self-reported in their README with outbound links. Plausible and consistent with the adapter packages that exist, but I did not confirm any by inspecting a shipped app.
- **ChatGPT, Claude, Perplexity, Lovable, Notion AI, Raycast AI** could not be screenshotted — Perplexity and Lovable return Cloudflare interstitials to headless browsers, the rest are behind auth. My pattern notes for those products are from prior familiarity, not from evidence captured in this session, and are marked as such by omission: every specific claim above is sourced to Cursor, Devin, Linear, Granola, v0, Bolt, or a library's own docs.

---

## Challenge pass (2026-09)

An adversarial re-check on 2026-09-09. Default posture: distrust. Every `essential` and `strong` claim re-verified against `gh api`, `api.npmjs.org` and fresh screenshots taken in this pass, not inherited from the original draft.

**What held up.** Almost every number, exactly. `ai` 21,639,648/wk, `@ai-sdk/react` 5,909,960, `@assistant-ui/react` 1,484,707, `streamdown` 4,384,049, `markstream-vue` 31,688, `@copilotkit/react-core` 406,042, `@lobehub/ui` 304,876, `@openai/chatkit-react` 71,772, `deep-chat` 21,031, `@tambo-ai/react` 4,522, `@nlux/react` 4,700, `@llamaindex/chat-ui` 3,106, `@loquix/core` 22 — all correct to the digit. Star counts, push dates, licences, open-issue counts and the dead-repo dates (Chatbot UI 2024-08-03, nlux 2025-11-25, LlamaIndex chat-ui 2025-12-16, shadcn-chatbot-kit 2026-02-26, prompt-kit 2026-03-12) all confirmed. prompt-kit's "final three commits were a sitemap, SEO and a landing fix" is exact. Streamdown-beats-the-rest-combined arithmetic checks out (4.38M vs 1.99M). Part 1's pattern work — the five-state tool machine, collapse-on-success, duration receipts, citation decomposition, the confirmation threshold, the agent-queue-not-transcript thesis — survived scrutiny intact and is the most valuable part of the file.

**Corrected.**
- **The AI SDK's "highest number in this entire corpus" was false.** Zod does 246,731,317/wk, Tailwind 110,850,620, `@floating-ui/dom` 66,768,652 in sibling research files. Rescoped to "largest in this category," with the scale caveat kept in.
- **The star-to-watcher ratio argument was junk and is retracted.** The first draft used it to cast doubt on Markstream (429:1) and Tambo (360:1). Measured baseline: `vercel/ai-elements` 605:1, `vercel/streamdown` 509:1, `shadcn-ui/ui` 290:1. Two of the file's own `essential` picks score worse than the projects it was suspicious of. Retracted in both scorecards and in Open questions, and flagged as a bias rather than a slip — the metric was pointed at a Chinese solo maintainer and a small startup, not at Vercel.
- **assistant-ui / CopilotKit 30-day issue closes** re-measured: 331 and 103, not 324 and 101.
- **AI Elements' cadence was understated.** "~1 commit/month since May 2026" is wrong; the log shows two commits since 2026-05-27 (2026-07-09, 2026-08-21) and no tagged release since 2026-03-12.
- **Streamdown's maintenance is bursty**, not steady: 46 commits in March, one each in April/May/July, 50 in August, one in September; a five-month gap between 2.5.0 and 2.6.0.
- LibreChat ★42,975 → 42,978, Open WebUI ★151,491 → 151,494 (drift). Header "6–24 months" → "6–25 months" (Chatbot UI is 25 months dead).
- **Gradio's PyPI figure is marked unverified** — pypistats returned 429 repeatedly. Chainlit's 112,165/wk was captured before the limit. No Gradio download number is quoted anywhere in this file; do not invent one.

**Demoted.**
- **AI Elements: `essential` → `strong`**, maintenance 3 → 2. The original scorecard already said "a reference implementation Vercel maintains at reference-implementation pace, not a library under active development" and then ranked it essential. That is an internal contradiction, and the real cadence is worse than stated. It remains the recommended default for components — the taxonomy is still the best published and copy-in blunts the risk — but `essential` should require being alive.
- **Streamdown: maintenance 5 → 4.** Tier unchanged; a 5 there was the Vercel name scoring rather than the commit log.
- **prompt-kit: visual 5 → 4.** Re-shot independently at 1440/390. The page is genuinely free of gradient, shadow and accent — and it is also stock shadcn docs chrome with a centred hero, no compositional idea and a lot of dead space above the fold. That is the absence of bad taste, not the presence of design. The naming taxonomy remains the real contribution and the `reference-only` tier is right.
- **Tambo: vibecode medium → high** (see below).

**Added.** Five candidates the first pass missed, all verified live:
- **OpenUI (formerly Crayon / Thesys)** — `situational`. The worst miss. The file named Tambo as the generative-UI entry while OpenUI ships 2.3× the installs (10,497 vs 4,522), commits daily, and publishes a spec, a benchmark suite and an open-weight model. Found by checking the category rather than the listicles.
- **MCP-UI** — `situational`. 245,618 wk downloads on `@mcp-ui/client`, the third-largest number in the category, and entirely absent from the first draft. Repo quiet since 2026-07-08, which is noted rather than hidden.
- **Gradio** — `situational`. ★43,505 against Chainlit's 12,440, and Chainlit was presented as *the* Python answer. Straightforward popularity bias: Gradio reads as an ML tool rather than a UI library in frontend discourse.
- **Hugging Face chat-ui** — added to the reference-only row as the only non-React reference app there.
- **llm-ui, CedarOS, Kibo UI** — checked precisely because they are obscure, and recorded in Rejected so the next reader does not re-check them. llm-ui dead since 2025-07-02, CedarOS since 2025-10-06, Kibo stale since 2026-05-04. Dismissing obscure things is only lazy if you didn't look; this records the looking.

**Vibecode column: hardened.** It was soft. Tambo carried a bare "medium" with no justification for a library whose entire mechanism is a model picking components out of a registry — that is the structural cause of AI-generated sameness, not a stylistic risk, and it is now `high` with the argument written out. OpenUI gets the same call. MCP-UI is `high` for the inverse reason: the markup comes from a server you don't own. A ranked block was added to §10 naming AI Elements as the sleeper risk — "shadcn defaults + AI Elements defaults" is now itself the recognisable 2026 AI-app look, and inheriting your theme is no defence when your theme is also shadcn defaults. The closing rule of that block is the takeaway: the safest libraries here are the ones that render your content rather than decide what it looks like.

**Screenshots taken this pass:** `ai-interfaces-check-1` (prompt-kit, 1440/390), `-2` (Gradio, 1440/390), `-3` (OpenUI/Crayon, 1440/390), in `.cache/shots/`. Two of the three changed the file: prompt-kit's visual score dropped, and OpenUI's `Without / With` hero is now cited in §2 as the clearest public demonstration of "render results as domain objects, not text." bolt.new and demo.copilotkit.ai were attempted and timed out; the first draft's descriptions of those two are therefore **unverified this pass** and left as written.

**Still standing after challenge.** assistant-ui as `essential` and best-engineered — the LangChain/Mastra adoption argument is real and the issue-close rate is 3.2×. AG-UI as `strong` including the governance caveat. Markstream as `strong`, now without the star-count insinuation. The whole of Part 1. The CopilotKit "Fortune 500" call-out. The judgement that the best agent-UI pattern in this category still has no library implementation.
