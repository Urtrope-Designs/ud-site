---
title: AAC Phrase Suggestion
description: An open-source AAC board that uses Claude to suggest the next words, so people who can't speak aloud can say more with fewer taps.
tags:
  - react
  - ai
  - accessibility
summary: An AAC communication board that uses Claude to suggest the next words in context, so a message takes fewer taps.
role: Design, product decisions and testing – built with Claude Code
tools: [Next.js, Claude API, TypeScript, Open Board Format]
order: 2
hero: /media/aac-phrase-suggestion/hero.webp
heroStill: /media/aac-phrase-suggestion/hero-still.webp
ogImage: /media/aac-phrase-suggestion/hero.png
heroAlt: "Screen recording of the AAC board in dark mode, in a restaurant scenario. The server asks what they can get you to drink. After tapping \"I\" on the board, suggestion chips offer \"want water\", \"need\", \"like\" and \"would like water please\"; tapping \"want water\" and then \"please\" builds \"I want water please\", which is sent. The server asks if you're ready to order food; tapping the suggestions \"yes\" and \"I want food\" builds the reply \"yes I want food\"."
---
[Try the live demo](https://aac.urtropedesigns.com) · [Source on GitHub](https://github.com/scunningham777/aac-phrase-suggestion)

## The problem
AAC (augmentative and alternative communication) boards let people who can't speak aloud build messages by tapping words or symbols, one at a time. That is slow, and in conversation the other person is usually left waiting. Most boards are static grids: they don't know what was just said to you or what you're probably trying to say next.

Research on language-model prediction for AAC exists, but I couldn't find an open implementation that took it from paper to something you can actually use. So I designed a prototype on the open [Open Board Format](https://www.openboardformat.org/) standard and built it with Claude Code, to find out whether contextual suggestions really help.

## What it does
You build a message on a standard word board. After every tap, the app sends three things to Claude Haiku: the message so far, the last few turns of the conversation, and the words on the current board. A row of 3–5 suggestions comes back – a likely next word, and a few short phrases that would finish the thought. Tapping one adds it to the message, and the finished message is spoken aloud with the browser's built-in speech.

A few choices shaped how it feels to use:
- **Suggestions continue the message; they never rewrite it.** The message stays in the user's own words, and the model is asked to prefer words that are on the board, so suggestions read like the board itself.
- **No surprise layout shifts.** Requests are debounced and cancelled when you tap again. While new suggestions load, the old ones stay where they are but can't be used, rather than vanishing and moving the board under your finger.
- **Demo scenarios.** Without real users to test with, scripted partners (a restaurant server, a friend, a doctor) supply the other side of the conversation. Each line is written so it can be answered from the sample board, so it's easy to see how suggestions change with context.
- **Any board.** It loads any `.obf` file, not just the sample board.

## Accessibility
An AAC tool has to work for the people who rely on assistive tech, so I tested it with axe and the NVDA screen reader rather than stopping at automated checks:
- The board is an ARIA grid: one Tab stop, with arrow keys, Home and End to move between words.
- In my testing, NVDA kept intercepting the arrow keys. Claude traced the cause in NVDA's source: it only switches to focus mode for a focused grid *cell*, not a button inside one. Making the cells themselves the controls fixed it.
- The partner's lines and the number of new suggestions are announced, and controls that are temporarily unavailable keep keyboard focus instead of dropping it.

## Keeping it affordable
The API key only lives on the server. Because the suggestion endpoint is public, it only answers requests from the app's own pages, is rate-limited per visitor with Upstash Redis, and sits behind a monthly spend cap.

## What's next
The next step is an evaluation set for suggestion quality, so changes to the prompt can be measured instead of judged by feel.
