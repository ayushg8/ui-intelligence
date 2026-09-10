# Mobile: React Native, native-feel web, and mobile UX

**Evaluated:** 2026-09 · **Researcher note:** Two things reshaped this category in 2026. React Native 0.85 (April) deleted the legacy bridge entirely — there is no interop shim, so "does it support the New Architecture" is no longer a question, it's a precondition — and Expo SDK 56 (May) shipped `@expo/ui` as stable, forked Expo Router off React Navigation, and put real SwiftUI/Jetpack Compose primitives in the default template. The styling lane got noisier, not clearer: Nativewind's v5 has sat in preview since May while Uniwind, from the Unistyles team, took 525k weekly downloads in fourteen months. On the mobile-web side the important fact is that Vaul — 24M weekly downloads, in half the shadcn apps on earth — has been declared unmaintained by its own author, and shadcn replaced it with Base UI in July.

## Verdict at a glance
| Library | Tier | One-line verdict | Vibecode risk |
|---|---|---|---|
| Expo + Expo Router | `essential` | Not a framework choice any more; it's the platform. SDK 56 forked off React Navigation and got materially faster. | low |
| Reanimated 4 + Gesture Handler | `essential` | The reason RN apps can feel native at all. 7.3M/wk each, shipped this week, no alternative exists. | low |
| react-native-keyboard-controller | `essential` | The quiet one. Keyboard handling is the single biggest native-feel gap and this closes it on both platforms. | low |
| React Native Skia | `essential` | The only real answer for custom 2D, shaders and drawn UI in RN. Nothing else is close. | low |
| Expo UI (`@expo/ui`) | `strong` | Real SwiftUI and Compose from JSX, stable since SDK 56. Hands your visual identity to Apple and Google — sometimes that's the point. | low |
| Nativewind | `strong` | Still the default, still the biggest ecosystem, but v5 has been in preview for four months and the challenger is faster. | medium |
| Uniwind | `strong` | Drop-in Nativewind replacement from the Unistyles team, Tailwind v4, 2–3x faster. Fourteen months old; migration is cheap both ways. | medium |
| Unistyles v3 | `strong` | The best pure styling engine for teams who don't want Tailwind semantics in native code. C++/Nitro core, no re-renders. | low |
| Legend List v3 | `strong` | Now a virtualized list for RN *and* React DOM, explicitly built for chat/AI feeds. Best-in-class for the hard cases. | low |
| FlashList v2 | `strong` | Shopify's, battle-tested at scale, no manual size estimates in v2. The conservative pick. | low |
| React Native Reusables | `strong` | shadcn/ui for React Native, and it works. Also means your app looks like every other shadcn app. | high |
| `@gorhom/bottom-sheet` | `strong` | 2.7M/wk, still the RN sheet everyone uses — but Expo UI now ships a native drop-in that is more correct on iOS. | low |
| Silk (`@silk-hq/components`) | `strong` | Paid. The only web sheet library whose authors clearly fought the keyboard, the URL bar and scroll chaining and won. | low |
| Tamagui | `situational` | Genuinely the most ambitious compiler in the category and the hardest to live in. Right for universal design systems, wrong for an app. | medium |
| Gluestack UI v5 | `situational` | Rebuilt as copy-paste-on-Nativewind. Fine, but it is now competing with RNR on RNR's terms. | high |
| Lynx | `experimental` | Technically excellent, production-proven inside ByteDance, 1,238 open issues and no ecosystem. Embedded surfaces only. | low |
| Apple HIG | `reference-only` | The best-written design document in the industry. Following it literally produces apps indistinguishable from stock. | — |
| Material 3 Expressive | `reference-only` | A brand system for Google's apps wearing a general-purpose design system's clothes. Steal the motion, refuse the shapes. | high |
| Vaul | `reference-only` | Declared unmaintained by its author. 24M weekly downloads is inertia. Read the source, don't install it. | medium |
| React Native Paper | `avoid` | Material Design on iOS is the single loudest "this is a cross-platform app" tell. | — |
| Ionic / Framework7 / Konsta UI | `avoid` | Web imitating native UI chrome. In 2026 this reads as cheap, not as native. | — |

## Recommendations by need
- **Default choice:** Expo (SDK 56+) with Expo Router, Nativewind, Reanimated 4, keyboard-controller, and FlashList v2. This is the boring stack and it is correct for ~80% of apps.
- **Best engineering:** Reanimated 4 / Gesture Handler (Software Mansion). 424 and 275 contributors, releases days old, and the worklets runtime split out into its own package for modularity. Skia is the runner-up.
- **Best visual quality out of the box:** Expo UI — because "out of the box" on mobile means *the OS's own controls*, and this is real SwiftUI and real Compose, not a reproduction. If you want your own look, none of these give it to you and you shouldn't want them to.
- **Best accessibility:** Expo UI, for the same reason — native SwiftUI/Compose components inherit Dynamic Type, VoiceOver/TalkBack, Reduce Motion and Increase Contrast for free. Every JS-drawn UI library in this list has to reimplement that, and mostly doesn't.
- **Most customizable / least house-style:** Unistyles v3. It is a styling engine with no components and therefore no look. Tamagui is more powerful and much more opinionated.
- **Lightest:** Uniwind's free tier processes styles without a Babel preset; Unistyles keeps style updates off the JS thread entirely via its C++ core. Both are lighter than Nativewind's current runtime.
- **Promising newcomer:** Uniwind. 525k weekly downloads in fourteen months, MIT, from the people who wrote Unistyles.
- **Premium/paid worth it:** Silk, for mobile web. It is the only thing in this file that solves web sheets properly, and the free alternatives are either unmaintained (Vaul) or don't attempt the hard parts.

## Mobile web: the rules that actually matter

Agents get these wrong constantly, so they are worth stating flatly.

- **Never `100vh`.** Use `100dvh` with a `100vh` fallback line above it. `svh`/`lvh` exist for when you specifically want the collapsed or expanded state and are usually not what you want.
- **`env(safe-area-inset-*)` is not optional**, and it is not only about the notch. The bottom inset is the home indicator; a bottom bar without `padding-bottom: env(safe-area-inset-bottom)` will have its tap targets sitting under the gesture bar. Requires `viewport-fit=cover` in the viewport meta or the insets all read `0px`.
- **Inputs must be ≥16px on iOS** or Safari zooms the page on focus and never fully zooms back. Scope the override to coarse pointers rather than shrinking your whole type scale.
- **`touch-action: manipulation`** on interactive elements kills the legacy 300ms tap delay without disabling pinch-zoom. Do not reach for `user-scalable=no` — it is an accessibility failure and iOS ignores it anyway.
- **Tap targets: 44×44pt (Apple) / 48×48dp (Android) minimum.** The visual element can be smaller; the hit area cannot. This is the most commonly violated rule in agent-generated mobile UI.
- **There is no hover.** Any affordance that only appears on hover does not exist on a phone. `:hover` styles fire on tap on iOS and stick until you tap elsewhere — guard them in `@media (hover: hover)`.
- **`overscroll-behavior: contain`** on scrollable overlays, or scrolling the sheet scrolls the page behind it. `-webkit-overflow-scrolling: touch` is no longer needed; momentum is default.
- **Haptics on web are effectively iOS-blocked.** `navigator.vibrate()` has never shipped in Safari. Do not build feedback that depends on it; use motion and sound instead.
- **Pull-to-refresh:** the browser already has one in standalone PWAs on Android. Building your own on top usually produces two competing gestures. `overscroll-behavior-y: contain` disables the native one if you must.
- **When to stop pretending:** if your web app needs a persistent tab bar, gesture-driven back navigation, native share sheets, and offline writes, you have described an app, and the web version will lose the comparison on transitions alone. The honest mobile web app looks like an excellent *website* — fast, scrollable, thumb-reachable, no fake chrome — not like a worse iOS app.

## Scorecards

### Expo + Expo Router — `essential`
- **What:** The React Native platform: build tooling, native modules, OTA updates, EAS build/submit, and a file-based router.
- **Verdict:** In 2026 "should I use Expo" is not a real question; the alternative is maintaining Xcode and Gradle configuration by hand for no benefit. SDK 56 is the most consequential release in years — Expo Router forked the parts of React Navigation it depends on, which broke every `@react-navigation/*` import in application code (there's a codemod and a compat layer), and in exchange Expo reports 50%+ faster iOS builds and ~33% faster first render. The company has also repositioned itself as "mobile AI infrastructure", which is worth watching: it means roadmap attention is going to agent tooling and CI, not to the UI layer.
- **Use when:** Any React Native app. · **Don't use when:** You need a deeply custom native shell that Expo's config plugins can't express — increasingly rare, and prebuild makes it recoverable.
- **Scores /5:** visual 3 · interaction 4 · a11y 4 · engineering 5 · maintenance 5 · docs 5 · customization 4 · perf 4 · stability 4 · originality 4
- **Evidence:** ★52,125 · last push 2026-09-10 · 6,572,738 wk npm (`expo`), 5,530,722 (`expo-router`) · MIT · 811 open issues · the standalone `expo/router` repo is archived (last push 2024-06-27); router now lives in the monorepo
- **Looked at:** https://expo.dev — near-black page, white grotesk headline "Mobile AI infrastructure" set left at ~72px, and a genuinely custom hero: a white squircle app icon with several hundred hairline rays and dots radiating out of it, which reads as reach/distribution without a single gradient. CTAs are a white pill and a dark-grey pill, no glow, no border shimmer. Below, a monospace all-caps line "3M+ DEVELOPERS. 50K+ GITHUB STARS. TRUSTED IN PRODUCTION BY:" over a strip of real app icons (Bluesky, Coinbase, Digg, MTA). Restrained and confident; the only tell is that the page never shows a line of code.
- **Vibecode risk:** low — Expo ships no visual opinions.
- **Link:** https://expo.dev

### Reanimated 4 + Gesture Handler — `essential`
- **What:** UI-thread animation (`react-native-reanimated`, now paired with a separate `react-native-worklets` runtime) and native-thread gesture recognition (`react-native-gesture-handler`).
- **Verdict:** These two are the difference between an app that feels native and one that doesn't, and there is no second option. Reanimated 4 works *only* on the New Architecture, which as of RN 0.85 is the only architecture, so the migration question is closed. The worklets split into its own package is the right call — it was always a separate runtime pretending to be part of an animation library. Gesture Handler v3 is the piece agents skip and shouldn't: `Pressable` from core RN does not give you the simultaneous/exclusive gesture composition that any swipe-to-dismiss, sheet, or card stack needs.
- **Use when:** Always, in any RN app with a single interaction worth polishing. · **Don't use when:** Never, realistically. Layout Animations and the `Animated` API from core cover only the trivial cases.
- **Scores /5:** visual 3 · interaction 5 · a11y 3 · engineering 5 · maintenance 5 · docs 4 · customization 5 · perf 5 · stability 4 · originality 5
- **Evidence:** Reanimated ★10,985 · 4.5.5 released 2026-08-27, `worklets-0.12.2` 2026-09-08 · last push 2026-09-09 · 7,326,954 wk npm · 424 contributors · MIT · 342 open issues. Gesture Handler ★6,781 · v3.2.1 2026-08-14 · push 2026-09-09 · 7,134,669 wk npm · 275 contributors · MIT · 23 open issues
- **Looked at:** https://docs.swmansion.com/react-native-reanimated/ — verified the New Architecture-only requirement and the worklets package split directly in the getting-started docs rather than from summaries.
- **Vibecode risk:** low — it's a primitive. The risk is the opposite: apps that animate everything because animation became cheap.
- **Link:** https://docs.swmansion.com/react-native-reanimated/

### react-native-keyboard-controller — `essential`
- **What:** Cross-platform keyboard state, animated keyboard-follow views, and an interactive dismiss gesture, driven from the UI thread.
- **Verdict:** This is the highest-leverage library in the file relative to how little it is discussed. The keyboard is where RN apps break character: content jumps, the input lands under the keyboard, and Android and iOS behave differently enough that most teams ship two bugs instead of one. `KeyboardAvoidingView` from core RN has never worked properly on Android. This library gives you the keyboard height as a Reanimated shared value, so your composer tracks the keyboard frame-for-frame the way iMessage does, and `KeyboardAwareScrollView` handles the boring 90%. 2M weekly downloads with almost no marketing is the tell that people find it the hard way.
- **Use when:** Any RN screen with a text input — chat composers, forms, search. · **Don't use when:** Your app genuinely has no text entry.
- **Scores /5:** visual 3 · interaction 5 · a11y 4 · engineering 5 · maintenance 5 · docs 5 · customization 4 · perf 5 · stability 4 · originality 5
- **Evidence:** ★3,718 · 1.22.4 released 2026-08-17 · last push 2026-09-09 · 2,000,273 wk npm · 57 contributors · MIT · 123 open issues
- **Looked at:** did not screenshot — it renders no UI of its own. Judged on API surface and release cadence, and flagged as such.
- **Vibecode risk:** low.
- **Link:** https://kirillzyusko.github.io/react-native-keyboard-controller/

### React Native Skia — `essential`
- **What:** Google's Skia 2D graphics engine exposed as declarative React components: paths, shaders, blurs, image filters, text layout, all animatable from Reanimated worklets.
- **Verdict:** If a UI cannot be expressed as boxes and text, Skia is the answer, and there is no runner-up. Charts that morph, blurred glass panels that actually sample what's behind them, mesh gradients, physics-y drawn transitions, generative backgrounds. The cost is real and agents underestimate it: Skia UI is not accessible by default (it's a canvas — you have to author the accessibility tree yourself), it does not inherit the platform's type or contrast settings, and it is the easiest way in RN to build something beautiful that a screen-reader user cannot operate. Use it for surfaces, not for controls.
- **Use when:** Custom charts, drawn transitions, shader effects, anything canvas-shaped. · **Don't use when:** You're tempted to draw buttons and lists with it.
- **Scores /5:** visual 5 · interaction 4 · a11y 2 · engineering 5 · maintenance 5 · docs 4 · customization 5 · perf 4 · stability 4 · originality 5
- **Evidence:** ★8,552 · v2.11.2 released 2026-09-01 · last push 2026-09-08 · 1,282,722 wk npm · 145 contributors · MIT · 87 open issues · maintained by Shopify
- **Looked at:** https://shopify.github.io/react-native-skia/ — the landing page is stock Docusaurus: a flat #3578E5 band, "React Native Skia / High Performance 2D Graphics", one grey Documentation button, and an embedded YouTube thumbnail. Zero design investment, which is genuinely misleading about what the library does — the demo gallery inside the docs is where the evidence is. Judge Skia on the Candillon demo reels, not this page.
- **Vibecode risk:** low — it has no default look. But it is the fastest route to *flashy* rather than *good*, so the taste burden sits entirely on the author.
- **Link:** https://shopify.github.io/react-native-skia/

### Expo UI (`@expo/ui`) — `strong`
- **What:** JSX that renders real SwiftUI on iOS and real Jetpack Compose on Android, plus a universal component layer. Stable as of SDK 56.
- **Verdict:** This is the most interesting shift in RN UI in years, and it inverts the usual tradeoff. Everything else in this file draws an approximation of a native control in JavaScript; this renders the actual control, which means you inherit Dynamic Type, VoiceOver, Reduce Motion, contextual menus and the current OS's visual language for free — including whatever Apple does next, without you shipping an update. The catch is the whole point: you cannot make it look like your brand, and you shouldn't try. Web is explicitly experimental and not at parity, and the universal layer is a first iteration — for anything advanced you drop into `@expo/ui/swift-ui` or `@expo/ui/jetpack-compose` and write two implementations. It ships drop-in replacements for eight community packages (datetime picker, slider, pager view, picker, segmented control, masked view, menu, bottom sheet), which is where most teams should start.
- **Use when:** Settings screens, forms, pickers, sheets, menus — anywhere "looks like the OS" is the correct answer. · **Don't use when:** You have a strong visual identity to express, or you need one codepath for web.
- **Scores /5:** visual 4 · interaction 5 · a11y 5 · engineering 4 · maintenance 5 · docs 4 · customization 2 · perf 5 · stability 3 · originality 5
- **Evidence:** 2,419,828 wk npm (`@expo/ui`) · stable in SDK 56 (May 2026) · in the default `create-expo-app` template and in Expo Go · MIT (ships from `expo/expo`) · limitations verified from Expo's own stability post: web experimental, some APIs missing on tvOS/Android TV
- **Looked at:** https://expo.dev/blog/expo-ui-stable-sdk-56 — read for the component list and the stated caveats rather than for visuals; the components render as system controls, so there is nothing library-specific to screenshot.
- **Vibecode risk:** low — the opposite failure mode. Your app will look like every other iOS app, which on a settings screen is correct and on a home screen is a missed opportunity.
- **Link:** https://docs.expo.dev/guides/expo-ui-swift-ui/

### Nativewind — `strong`
- **What:** Tailwind class names for React Native, compiled to native styles.
- **Verdict:** Still the default and still the right first answer, mostly on ecosystem gravity: React Native Reusables, Gluestack v5, and most 2026 templates assume it. The uncomfortable evidence is that v4.2.6 is the current stable release from June, v5 has been in preview since 15 May 2026 with no stable ship, and the repo's last push is 2026-07-17 — nearly two months, against a challenger that shipped v1.12.0 five days ago. 72 contributors on 1.3M weekly downloads is a thin bus factor for infrastructure this widely depended on. None of that makes it a bad choice today; it makes it a choice you should re-examine in six months.
- **Use when:** You want Tailwind semantics, a shared mental model with your web codebase, and the largest ecosystem. · **Don't use when:** Style-update performance is your bottleneck, or you're on Tailwind v4 and want first-class support now.
- **Scores /5:** visual 3 · interaction 3 · a11y 3 · engineering 4 · maintenance 3 · docs 4 · customization 5 · perf 3 · stability 4 · originality 4
- **Evidence:** ★8,085 · latest stable 4.2.6 released 2026-06-22 · `5.0.0-preview.4` 2026-05-15, still preview · last push 2026-07-17 · 1,317,678 wk npm · 72 contributors · MIT · 67 open issues
- **Looked at:** https://www.nativewind.dev — the best-designed docs site of the styling three. Off-white ground with a faint dashed Tailwind-style grid overlaying the whole page, and the utility classes that produce the headline (`text-5xl text-balance tracking-tight leading-tight`) printed in grey monospace directly above it — a small, genuinely good explanatory device. Below the fold, a live code pane sits beside a rendered iPhone frame with an iOS-native Dynamic Island cutout. At 390px it holds; the phone mock stacks under the code. The one visible tell is a stacked hard-shadow "Get Started" button (offset black rectangle behind a black rectangle) that clashes with the otherwise flat system.
- **Vibecode risk:** medium — no components, but it makes it trivially easy to paste web Tailwind values (`rounded-xl shadow-lg bg-violet-600`) into a native app, which is exactly how RN apps end up looking like web pages in a phone frame.
- **Link:** https://www.nativewind.dev

### Uniwind — `strong`
- **What:** Tailwind CSS bindings for React Native from the Unistyles team, built on Unistyles' Fabric/C++ architecture. Free core, paid Pro tier with a native C++ style engine.
- **Verdict:** The most interesting thing to happen to RN styling this year, and the reason to hesitate on Nativewind. It is positioned as a drop-in replacement — same `className` strings, remove the Babel preset, change `metro.config.js`, upgrade to Tailwind v4 — with claimed 2–5x style-processing speedups. The credibility comes from who built it: `uni-stack/uniwind` is the Unistyles org, and Unistyles already proved that team can ship a C++/Nitro styling core. 525k weekly downloads fourteen months in is real production adoption, not hype. Two honest caveats: the best performance is behind Uniwind Pro, which means the free tier is a funnel; and 20 contributors is a small crew for core infrastructure. What makes it `strong` rather than `experimental` is that the bet is cheap to reverse — your class strings are portable in both directions.
- **Use when:** Greenfield Expo app, you want Tailwind v4, and style throughput matters. · **Don't use when:** You depend on a Nativewind-specific plugin or a library that hard-couples to `react-native-css-interop`.
- **Scores /5:** visual 3 · interaction 3 · a11y 3 · engineering 5 · maintenance 5 · docs 4 · customization 5 · perf 5 · stability 3 · originality 4
- **Evidence:** ★1,703 · v1.12.0 released 2026-09-04 · last push 2026-09-04 · 525,241 wk npm · 20 contributors · MIT · 10 open issues · repo created 2025-07-29 (14 months old) · org description reads "From the creators of Unistyles"
- **Looked at:** did not screenshot the marketing site; verified authorship, license, cadence and download curve from the npm registry and GitHub API instead, because the claim under test here is provenance and momentum, not visual design. Flagged as such.
- **Vibecode risk:** medium — same as Nativewind. Tailwind class names carry web defaults into native.
- **Link:** https://uniwind.dev

### Unistyles v3 — `strong`
- **What:** A styling engine for React Native with a C++ core (via Nitro Modules) that updates styles without re-rendering React components. Themes, breakpoints, variants, no components.
- **Verdict:** The best choice for a team that wants a real design-token system in native code and specifically does not want Tailwind's vocabulary leaking in. v3's architecture is the selling point — style recalculation happens in C++ and mutates the shadow tree directly, so theme switches and breakpoint changes don't cause React re-renders. It has no house style at all, which makes it the least vibecode-prone styling option here. Smaller than its rivals (2,944 stars, 55 contributors, 237k/wk) and the same small team now also ships Uniwind, which is worth watching: attention is finite.
- **Use when:** You're building a design system in RN and want tokens, variants and themes without a utility-class DSL. · **Don't use when:** Your team's shared language is Tailwind, or you need the surrounding component ecosystem.
- **Scores /5:** visual 3 · interaction 3 · a11y 3 · engineering 5 · maintenance 4 · docs 4 · customization 5 · perf 5 · stability 4 · originality 5
- **Evidence:** ★2,944 · v3.3.0 released 2026-07-10 · last push 2026-08-13 · 236,900 wk npm · 55 contributors · MIT (per npm registry; the GitHub API returns no detected license field) · 47 open issues
- **Looked at:** https://www.unistyl.es — the weakest landing page of the three. A large airbrushed pegasus illustration on a navy-to-purple space gradient with starfield dots occupies the right 55% of the viewport, and the actual headline ("Welcome to Unistyles 3.0", ~48px) is small enough that the mascot wins the hierarchy fight. CTAs are a magenta gradient pill and a grey pill. It reads like a 2019 crypto launch page. That says nothing about the library's engineering, which is excellent — but it's a fair signal about how much design attention the project has to spare, and worth knowing before you adopt it as your design-system foundation.
- **Vibecode risk:** low — ships zero components and zero visual defaults.
- **Link:** https://www.unistyl.es

### Legend List v3 — `strong`
- **What:** A high-performance virtualized list for React Native *and* React DOM. Drop-in for FlatList/FlashList.
- **Verdict:** The specialist that beat the generalist on the hard cases. v3's feature list is unusually specific about the problems that actually ruin list UX — dynamic item sizes with no manual measuring, accurate `initialScrollIndex`, bidirectional infinite scroll with anchoring, and chat/AI-chat feeds without the inverted-list hack that every messaging app has had to live with. That last one is the reason to reach for it: if you are building an AI chat surface with streaming messages that grow in height, this is designed for exactly that and FlashList is not. Community benchmarks report lower CPU and memory than FlashList while scrolling, though those come from the maintainers' own measurement posts and I could not independently reproduce them. Younger and less battle-tested than Shopify's.
- **Use when:** Chat, streaming AI feeds, bidirectional infinite lists, or anywhere item heights are genuinely unknown. · **Don't use when:** You want the maximally conservative choice for a simple product feed.
- **Scores /5:** visual 3 · interaction 5 · a11y 3 · engineering 5 · maintenance 5 · docs 4 · customization 4 · perf 5 · stability 3 · originality 5
- **Evidence:** ★3,354 · v3.3.10 released 2026-09-01 · last push 2026-09-01 · 463,148 wk npm (`@legendapp/list`) · 35 contributors · MIT · 86 open issues · repo created 2024-11-20
- **Looked at:** https://www.legendapp.com/open-source/list/ — dark docs, ~15px body at a comfortable measure, a sane left rail with an explicit "Version 3" selector, and a callout row of `llms.txt` / `llms-full.txt` / `llms-full.md` links at the very top of the overview, which is the most agent-considerate thing I've seen in this category. The feature list is bulleted with seven consecutive ✨ emoji, which is a small taste tell against an otherwise disciplined page.
- **Vibecode risk:** low.
- **Link:** https://www.legendapp.com/open-source/list/

### FlashList v2 — `strong`
- **What:** Shopify's recycling list view for React Native, rewritten for the New Architecture.
- **Verdict:** The conservative correct answer. v2 removed the `estimatedItemSize` requirement that made v1 annoying, and Shopify reports up to 50% less blank area during fast scrolling than v1 — note that's a v1-to-v2 comparison, not a claim against FlatList or Legend List, and it gets misquoted constantly. The reason to pick it over Legend List is not benchmarks; it's that it has been running inside the Shopify app for years, has 67 contributors and 1.4M weekly downloads, and nobody gets fired for it. The reason to pick Legend List over it is chat.
- **Use when:** Product feeds, standard scrolling lists, anywhere you want the safest option. · **Don't use when:** Inverted/bidirectional chat lists, or streaming content whose height changes after render.
- **Scores /5:** visual 3 · interaction 4 · a11y 3 · engineering 5 · maintenance 4 · docs 4 · customization 4 · perf 5 · stability 5 · originality 3
- **Evidence:** ★7,201 · v2.3.2 released 2026-06-10 · last push 2026-09-07 · 1,415,297 wk npm · 67 contributors · MIT · 199 open issues · used by Shopify (first-party)
- **Looked at:** did not screenshot — it renders your cells, not its own UI. Judged on release history, issue volume and the v2 architecture change; flagged as such.
- **Vibecode risk:** low.
- **Link:** https://shopify.github.io/flash-list/

### React Native Reusables — `strong`
- **What:** shadcn/ui, ported to React Native. Copy-paste components built on Nativewind or Uniwind over a set of `rn-primitives` accessibility primitives.
- **Verdict:** It does what it says, the CLI works, and the copy-paste model is the right one for mobile because you will need to modify every component anyway. It is also the single highest vibecode risk in this file: it reproduces shadcn's exact visual defaults — same radii, same neutral palette, same red `destructive` and blue `verified` badges — which means an RNR app is instantly recognizable to anyone who has used the web version, and there are a lot of those. Use it as a starting geometry you then overwrite, not as a look. The maintenance signal is mixed: the repo is healthy (8,651 stars, 16 open issues) but the last tagged release of `rn-primitives` was 2026-03-28 and the last push 2026-07-02, so it is moving slower than the styling layer beneath it.
- **Use when:** You want a fast, sane component floor and you intend to restyle it. · **Don't use when:** You want the app to have a visual identity and won't do the restyling work.
- **Scores /5:** visual 3 · interaction 4 · a11y 4 · engineering 4 · maintenance 3 · docs 4 · customization 5 · perf 4 · stability 4 · originality 2
- **Evidence:** ★8,651 · `rn-primitives@1.4.0` released 2026-03-28 · last push 2026-07-02 · 45 contributors · MIT · 16 open issues
- **Looked at:** https://reactnativereusables.com — near-black with a faint dot grid, a centered ~64px "Build your Universal Component Library", and a Platform: Web | Native segmented toggle sitting above a live grid of real components. That toggle is the best thing on the page: you can see the same component render both ways. But the components themselves are shadcn's defaults verbatim — the checkbox, the pill badges in shadcn's exact red/blue, the same ~8px radii, the same avatar stack. Nothing here is wrong; it is just entirely borrowed, and the subhead admits it ("Bringing shadcn/ui to React Native... and *almost* as easy to use").
- **Vibecode risk:** high — the whole value proposition is a look you didn't design, and it is a look millions of people have already seen.
- **Link:** https://reactnativereusables.com

### `@gorhom/bottom-sheet` — `strong`
- **What:** The de facto RN bottom sheet: snap points, gesture-driven, backdrop, keyboard handling, built on Reanimated + Gesture Handler.
- **Verdict:** Still the answer for a custom-styled sheet in RN, and 2.7M weekly downloads says the ecosystem agrees. But the ground moved in May: Expo UI now ships a `BottomSheet` that renders the real SwiftUI `presentationDetents` sheet on iOS, which gets the rubber-banding, the corner-radius interpolation on the presenting view, and the scroll-to-dismiss handoff exactly right because it *is* the system sheet. Gorhom's reproduces all of that in JS, very well, and lets you style it however you like. Choose on that axis. Maintenance is adequate but not brisk — v5.2.14 in May and no push since, against 83 open issues.
- **Use when:** The sheet needs your own visual language, or you need behaviour the system sheet doesn't offer. · **Don't use when:** A stock iOS/Android sheet is what you actually want — then use Expo UI and get it free.
- **Scores /5:** visual 4 · interaction 5 · a11y 3 · engineering 4 · maintenance 3 · docs 4 · customization 5 · perf 4 · stability 4 · originality 4
- **Evidence:** ★9,087 · v5.2.14 released 2026-05-09 · last push 2026-05-09 (4 months) · 2,740,428 wk npm · 74 contributors · MIT · 83 open issues
- **Looked at:** did not screenshot — the docs site is a component playground and the behaviour is what matters. Flagged as such.
- **Vibecode risk:** low — unstyled by default.
- **Link:** https://gorhom.dev/react-native-bottom-sheet/

### Silk (`@silk-hq/components`) — `strong`
- **What:** Paid React library for native-feeling swipeable sheets, drawers, dialogs and toasts on the web. Dependency-free apart from React.
- **Verdict:** With Vaul dead, this is the serious option, and the evidence that they took the problem seriously is in what they chose to demo. Anyone can ship a bottom sheet that drags. The hard parts are the keyboard (the sheet must resize against the visual viewport, not the layout viewport), scroll chaining (the inner scroller must hand the drag back to the sheet at scroll-top and only then), the iOS URL bar collapsing mid-gesture, and detents that settle with real velocity rather than a fixed transition. Silk's own gallery leads with "Sheet with Keyboard" as a named variant, which is a tell that they fought that specific fight. The caveats are structural: it's paid and gated ("Get Access"), there is no public repository to audit, 57k weekly downloads is a modest install base, and you are taking a dependency you cannot fork.
- **Use when:** Mobile web or PWA where sheet quality is a differentiator and you can expense a license. · **Don't use when:** You need to audit or fork the source, or a plain modal would do — most of the time, a plain modal would do.
- **Scores /5:** visual 4 · interaction 5 · a11y 4 · engineering 5 · maintenance 4 · docs 4 · customization 4 · perf 4 · stability 4 · originality 5
- **Evidence:** 57,334 wk npm (`@silk-hq/components`) · proprietary/paid, no public repo · stars, contributors, release history and license all unverifiable by design
- **Looked at:** https://silkhq.com — white ground with a barely-there diagonal crosshatch, and a headline that mixes a heavy grotesk with a true italic serif ("Native-like *swipeable* sheets on the web") where the serif carries the emphasis instead of a gradient. Below: a horizontal gallery of pastel cards — mint, salmon, cyan, green — each holding a real iPhone/iPad mock of one variant: Sidebar, Bottom Sheet, Sheet with Keyboard, Toast. At 390px the headline reflows to four lines and holds its rhythm, the CTAs stack as two pills, and the gallery becomes a snap carousel with peek on both edges. Correct mobile behaviour on a site about correct mobile behaviour, which is the cheapest credibility test there is and most libraries fail it.
- **Vibecode risk:** low — you style the sheet.
- **Link:** https://silkhq.com

### Tamagui — `situational`
- **What:** A universal (RN + web) style system, optimizing compiler, and component kit.
- **Verdict:** The most technically ambitious thing in this category and the one most likely to make you unhappy. The compiler genuinely does flatten your tree and extract CSS on web, which is a real result nobody else fully achieves; the cost is a large, idiosyncratic API surface, a heavier setup, and a build step you now have to debug. Its 205k weekly downloads against 14,184 stars is the classic admired-but-not-adopted spread. It is the right answer when you are building one design system that must ship to iOS, Android and web with genuinely shared components — that is a rarer requirement than people think, and if your web and mobile products differ in structure (they usually do), you're paying for universality you never spend.
- **Use when:** One design system across RN and web is a hard requirement, and you have someone who will own the compiler config. · **Don't use when:** You're building an app. Reach for Nativewind or Unistyles.
- **Scores /5:** visual 4 · interaction 4 · a11y 3 · engineering 5 · maintenance 4 · docs 3 · customization 5 · perf 5 · stability 3 · originality 5
- **Evidence:** ★14,184 · v2.7.7 released 2026-08-15 · last push 2026-09-10 · 205,137 wk npm · 238 contributors · MIT · 94 open issues · repo created 2020
- **Looked at:** https://tamagui.dev — the most distinctive identity of any library here. Near-black ground, a pixel/bitmap typeface for the nav, wordmark and eyebrow text, against a huge white geometric-grotesk "Write less" with "runs faster" underneath in a mint-to-cyan gradient. A three-segment pill at the top (STARTER KIT / COPY-PASTE UI / HIRE US) where each segment carries its own tint. Gradient text is normally a tell; here it is doing deliberate work against the pixel type and reads as a considered system rather than a default. The install command sits in a bordered pill with a copy affordance. Confident and specific — I would trust the taste of whoever made this page more than most in this file.
- **Vibecode risk:** medium — the Tamagui UI kit has a recognizable look, and its defaults (rounded, soft, slightly toy-like) show through unless you build your own theme.
- **Link:** https://tamagui.dev

### Gluestack UI v5 — `situational`
- **What:** Copy-paste universal components for React, Next.js and React Native, built on Nativewind. v5 shipped June 2026, replacing v2's packaged-dependency model.
- **Verdict:** Gluestack's own introduction is unusually candid: "By the time we announced v2, shadcn/ui had already taken over the web, and today gluestack-ui and shadcn/ui are very similar." That's an accurate self-assessment and also the problem — v5 is competing with React Native Reusables on RNR's exact terms, from behind. What it has that RNR doesn't is a genuinely universal story (the same component targeting Next.js and RN) plus a Figma kit and a "Prompt to React Native" agent flow. What it doesn't have is momentum: the old `@gluestack-ui/themed` package is down to 25.7k weekly downloads, and because v5 is copy-paste there is no meaningful npm number to replace it with. Pick it for the web+native parity, not for the components.
- **Use when:** One team shipping a Next.js app and an RN app that must look identical, on Nativewind. · **Don't use when:** RN only — RNR is further ahead in that lane.
- **Scores /5:** visual 3 · interaction 3 · a11y 4 · engineering 4 · maintenance 4 · docs 4 · customization 5 · perf 4 · stability 3 · originality 2
- **Evidence:** ★5,292 · v5.0.0 released 2026-06-25 · last push 2026-09-02 · 75 contributors · 17 open issues · 25,719 wk npm on the legacy `@gluestack-ui/themed` · license not reported by the GitHub API — verify before adopting
- **Looked at:** https://gluestack.io/ui/docs/home/overview/introduction — competent pure-black docs with a three-column layout, a version selector reading "v5", and a scroll-progress percentage in the right rail. Type is a geometric sans at a generous size with real paragraph spacing; it reads well. The nav's top-right CTA is "Prompt to React Native", which is a 2026 artifact worth noticing — the docs are being marketed to agents. Nothing about the page is distinctive.
- **Vibecode risk:** high — same shadcn-derived defaults as RNR, with less of a community pushing variations.
- **Link:** https://gluestack.io

### Lynx — `experimental`
- **What:** ByteDance's cross-platform rendering engine, open-sourced March 2025. Dual-threaded architecture, CSS-first styling, framework-agnostic with ReactLynx as the reference frontend.
- **Verdict:** The engineering is real and it is not a research project — ByteDance ships it in TikTok's search panel and TikTok Studio to a user base larger than most countries. The dual-thread model (a main thread for immediate UI work, a background thread for app logic) genuinely fixes the first-frame problem RN spent years on. But the numbers say what they say: 1,238 open issues, 95 contributors, 18 months old, and essentially no third-party library ecosystem — you will be writing your own everything. The realistic 2026 use is what ByteDance uses it for: a high-performance embedded surface inside an app that is otherwise native. Adopting it for a standalone product with a deadline is a bet against your own timeline.
- **Use when:** A performance-critical embedded surface inside an existing native app, where you control the whole dependency graph. · **Don't use when:** Greenfield standalone product. Expo is strictly lower risk.
- **Scores /5:** visual 3 · interaction 4 · a11y 2 · engineering 5 · maintenance 4 · docs 3 · customization 4 · perf 5 · stability 2 · originality 5
- **Evidence:** ★15,127 · 4.1.0 released 2026-09-07 · last push 2026-09-10 · 95 contributors · Apache-2.0 · 1,238 open issues · repo created 2025-03-04 · used by TikTok search panel and TikTok Studio (ByteDance's own, per their announcement)
- **Looked at:** did not screenshot — Lynx renders whatever you write and has no reference UI to judge. Flagged as such.
- **Vibecode risk:** low.
- **Link:** https://lynxjs.org

### Apple Human Interface Guidelines — `reference-only`
- **What:** Apple's design documentation for iOS, iPadOS, macOS, watchOS, tvOS, visionOS and — new this year — iPhone Duo.
- **Verdict:** The best-written design document in the industry, and the parts to internalize are the *invariants*, not the aesthetics: 44pt minimum hit targets, thumb-reachable primary actions, the back gesture always working from the left edge, respecting Dynamic Type and Reduce Motion, and never inventing a gesture the user can't discover. Where it is right is behaviour. Where following it blindly hurts you is identity: an app that adopts every HIG default is an app with no visual point of view, and the products people love on iOS — Family, Things, Cash App — all deviate loudly on surface while obeying every behavioural rule underneath. The other trap is cross-platform literalism: HIG navigation patterns transplanted to Android read as wrong, and Apple's guidance is silent on that because it isn't Apple's problem.
- **Use when:** Deciding *how something should behave* on iOS. Always. · **Don't use when:** Deciding what your product should look like.
- **Scores /5:** visual 4 · interaction 5 · a11y 5 · engineering — · maintenance 5 · docs 5 · customization — · perf — · stability 5 · originality 4
- **Evidence:** first-party, continuously updated · the sidebar now lists "Designing for iPhone Duo" alongside the existing platforms, which is the clearest signal in the doc that a foldable iPhone is a design target
- **Looked at:** https://developer.apple.com/design/human-interface-guidelines/designing-for-ios — the page argues its own thesis. SF Pro throughout, a left filter rail, one hero: a green gradient panel with a dark outlined phone silhouette laid over a construction grid of circles and thirds-lines showing how the device's corner radius is derived. No stock photography, no marketing voice, prose that opens with what people *do* with an iPhone rather than what Apple sells. Deference demonstrated rather than described.
- **Vibecode risk:** — (guidance, not a library). The failure mode is homogeneity, not a signature look.
- **Link:** https://developer.apple.com/design/human-interface-guidelines/

### Material 3 Expressive — `reference-only`
- **What:** Google's 2025–26 evolution of Material Design 3, adding a shape/motion/color system built around large radii, springy motion and high-saturation palettes.
- **Verdict:** The research behind it is real — Google's own testing found expressive layouts get found and acted on faster, and the spring-based motion spec is the most useful thing in it. But as a general-purpose design system it does not hold, and the criticism from designers this year is fair: Google violates its own guidelines across its own first-party apps, header bars alone vary wildly between them, and several implementations traded function for shape. Applied outside Google's brand, M3 Expressive doesn't read as "expressive" — it reads as "Android app" at best and "toy" at worst, because the shapes and colors *are* the identity and they aren't yours. Steal the motion curves and the emphasis hierarchy. Refuse the 28px-radius squircle containers, the pill-shaped everything, and the purple.
- **Use when:** Building an Android-first product that should feel like it belongs to the platform, or mining the motion spec. · **Don't use when:** Cross-platform, or anywhere your brand is supposed to be visible.
- **Scores /5:** visual 3 · interaction 4 · a11y 4 · engineering — · maintenance 4 · docs 4 · customization 3 · perf — · stability 3 · originality 4
- **Evidence:** first-party · "Material at Google I/O 2026" dated 2026-05-19 on the homepage · widely criticized in 2026 for inconsistent first-party adoption (Android Authority, Lobsters threads) — I read the criticism, not a survey, so treat the strength of the backlash as unverified
- **Looked at:** https://m3.material.io — the showcase mosaic is the argument against using this outside Google. Full-saturation purple and acid-lime everywhere; a music player whose PLAY control is a lime pill with a chunky black label; a clock widget splitting 07:30 into differently-weighted number blocks; images masked into flower-blob shapes; containers at 28px+ radii; a chat screen with three different bubble colors. It is loud and shape-driven. The giveaway is that the docs site's own chrome — left rail, plain Google Sans headline, a single flat purple pill CTA — is not expressive at all. Google's own design site does not follow Google's own design system.
- **Vibecode risk:** high — an app built on M3 defaults is identifiable at a glance from across a room, and that identification is "Android app", not "your product".
- **Link:** https://m3.material.io

### Vaul — `reference-only`
- **What:** The drawer/bottom-sheet component for React web that defined the pattern.
- **Verdict:** The clearest evidence-versus-judgment case in this file. 24.4M weekly downloads — one of the most-installed UI components on npm — and its README opens: "This repo is unmaintained. I might come back to it at some point, but not in the near future." Last release v1.1.2, 14 December 2024; last push October 2025. shadcn/ui rebuilt Drawer on Base UI in July 2026 and new projects no longer get Vaul. The download number is pure transitive inertia from every shadcn app installed before then. It remains excellent, well-designed code and a good thing to read — Emil Kowalski's drag/velocity/detent handling is the reference implementation — but installing it in 2026 means adopting an abandoned dependency with 164 open issues for a component that now has a maintained replacement.
- **Use when:** Studying how a web drawer should be built. · **Don't use when:** Shipping. Use Base UI's Drawer, or Silk if sheet quality is a differentiator.
- **Scores /5:** visual 4 · interaction 5 · a11y 3 · engineering 4 · maintenance 1 · docs 3 · customization 4 · perf 4 · stability 3 · originality 5
- **Evidence:** ★8,599 · last release v1.1.2 2024-12-14 (21 months) · last push 2025-10-03 · 24,366,525 wk npm · 42 contributors · MIT · 164 open issues · unmaintained per the author's own README, verified directly from `main`
- **Looked at:** https://vaul.emilkowal.ski — one screen: an oversized black "Vaul" in a tight grotesk, "Drawer component for React." beneath it, one outlined pill labelled "Open Drawer", a text "GitHub →", and an underlined "Documentation" link, on white with a barely-visible grid. Nothing else. That restraint is correct — the demo is the product and the page gets out of its way — and it is a small lesson worth stealing for any library site.
- **Vibecode risk:** medium — Vaul's default drawer (scaled-back body, rounded top corners, grey grabber pill) is so widely copied that it now reads as a shadcn-app signature rather than as a native sheet.
- **Link:** https://vaul.emilkowal.ski

## Rejected / avoid
- **React Native Paper** — ★14,456 and healthy maintenance, so this is a taste rejection, not an engineering one. It renders Material Design on iOS, which is the loudest possible "this is a cheap cross-platform app" signal: Material's ripple, its FAB, its text fields with floating labels, all of it is wrong on an iPhone and users read it instantly. If you want Material on Android, use Expo UI and get real Jetpack Compose; if you want it on both, you have decided iOS users don't matter.
- **Ionic React / Framework7 / Konsta UI** — the whole "web that imitates native chrome" genre. Ionic is at 94.6k weekly downloads, Framework7 React at 3.8k, Konsta at 18k, and all three have the same problem: an imitation iOS tab bar in a browser lands squarely in the uncanny valley, and it degrades the moment the platform updates its own look. Build an excellent mobile *website* instead, or build the app.
- **NativeBase** — superseded by Gluestack (same team). Do not start anything on it.
- **`react-modal-sheet`** — 1,181 stars, 133k weekly downloads, last push 2026-03-27. Not dead, but a thinner Framer-Motion-dependent take on the problem Vaul and Silk solve better. No reason to choose it in 2026.
- **`@react-navigation/*` imports in Expo Router apps** — not a library rejection, a migration warning: SDK 56 stopped accepting application-code imports from `@react-navigation/*`. They come from `expo-router/*` entry points now. An agent generating Expo code from pre-2026 patterns will produce broken imports.
- **`KeyboardAvoidingView`** (core RN) — has never worked correctly on Android and still doesn't. Use `react-native-keyboard-controller`.
- **`100vh`, `user-scalable=no`, and hover-only affordances** — see the mobile web rules above. These are the three most common defects in agent-authored mobile UI.

## What surprised me
- **Vaul is dead and almost nobody has noticed.** 24.4M weekly downloads, no release since December 2024, and an unmaintained notice the author wrote himself. shadcn quietly moved Drawer to Base UI in July 2026. Any agent recommending Vaul today is reading a 2024 snapshot of the world.
- **Uniwind came out of nowhere and is eating Nativewind's lunch.** Same team as Unistyles, fourteen months old, 525k weekly downloads against Nativewind's 1.32M — while Nativewind's v5 has been stuck in preview since May and the repo hasn't been pushed since 17 July. The default answer in this lane may not survive 2027.
- **Expo UI going stable changes what "native feel" costs.** You can now render actual SwiftUI and actual Jetpack Compose from JSX, it's in the default template and in Expo Go, and it ships drop-in replacements for eight community packages people currently install separately — including a bottom sheet that is the real `presentationDetents` sheet. A large slice of the RN component ecosystem just became optional.
- **Legend List left React Native.** v3 is a virtualized list for React DOM too, and it is explicitly designed around AI chat — bidirectional infinite scroll with anchoring, floating composer insets, no inverted-list hack. That is a list library repositioning around a use case that barely existed when it was written.
- **Apple is designing for a foldable.** "Designing for iPhone Duo" now sits in the HIG sidebar next to iPadOS and visionOS. Nobody's responsive strategy accounts for it yet.
- **Expo rebranded itself as "mobile AI infrastructure."** The homepage headline is no longer about React Native at all. Read that as a signal about where the roadmap attention is going.

## Open questions
- **Uniwind's performance claims** (2–5x faster than Nativewind, 3.2x in some framings) all trace back to the vendor's own comparison page and reposts of it. I found no independent benchmark. Settling it needs a third-party run of `efstathiosntonas/react-native-style-libraries-benchmark` on current versions of both.
- **Legend List vs FlashList v2 CPU/memory** — the "LegendList uses less CPU and memory" claim comes from Legend App's own FlashLight measurements. An independent FlashLight profile on the same device, same dataset, same item complexity would settle it.
- **Nativewind v5's ship date.** `5.0.0-preview.4` landed 2026-05-15 and nothing since. Whether this is a deliberate long bake or a stall changes the Nativewind-vs-Uniwind call materially; the maintainer's own roadmap statement would settle it.
- **Gluestack v5's license** is not reported by the GitHub API for the repo. The docs imply MIT. Verify from `LICENSE` on `main` before adopting.
- **Silk's engineering** is unauditable — no public repo, no contributor count, no issue tracker. The judgment above is from its demos and its marketing's technical specificity. A trial license and a real keyboard/scroll-chaining test on iOS Safari would confirm or destroy it.
- **Unistyles' license** shows as MIT on the npm registry but the GitHub API returns no detected license for the repo. Probably a `LICENSE` file formatting issue; worth confirming for anything commercial.
