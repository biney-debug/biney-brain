---
name: biney-brain-ai-usage
description: How MRS uses AI as a tool, without settling for generic output and without letting long sessions degrade. Use when what the AI returns comes out generic/mediocre (design, security, optimized code), or when a session is getting long and complex.
---

# Using AI without overcomplicating it

This isn't product judgment, it's judgment about how to work with the tool itself. It's the domain closest to `ponytail` out of all of them: the point is not wasting time in the step before you act.

## When the output comes out generic

The problem isn't not knowing what to ask for, it's that what the AI returns by default is generic: a landing page design that looks "made by AI," code that works but wasn't built with security or optimization in mind, whatever the case. The mistake there is sitting there fighting the prompt trying to fix it by hand, prompt after prompt, until it comes out right.

First check whether the Step 1 roster already names the fix: a generic-looking UI is `ui-ux-pro-max` (or `frontend-ui-engineering`/`design`), code with no security thought is `security-and-hardening`. That's the answer, don't reach past it for `find-skills` when the roster already covers the category.

Only when the roster doesn't cover that specific kind of generic output, or you already applied the roster's skill and it's still coming out generic: try `find-skills` (if it's installed) to search for and install, right from Claude Code, a skill built for exactly that problem, and only search TikTok/YouTube by hand if nothing useful turns up. Neither of those is "keep fighting the prompt": it's checking whether someone already packaged the specialized judgment you're missing, instead of reinventing it by hand every time. Same logic as this repo: biney-brain exists because searching "a skill for X" beats trying to explain everything to the AI from zero.

What this actually prevents is the perfectionism of fighting the prompt: if the output still comes out generic after a couple of tries, stop there and go find the skill that already solves it, don't keep insisting by hand.

## Keeping the session from auto-compressing

A long, messy session ends up auto-compressing itself and losing detail. Avoiding that comes down to two things:

1. **Split the work into small tasks.** Don't throw the AI one giant request expecting it to solve the whole project in one shot. Cut it into verifiable steps, each one small, so the session doesn't have to carry a huge history for one monster task.
2. **Persist project state between sessions properly**, not with an ad-hoc `NOTES.md`. See `biney-brain-continuity` for the fixed template, what belongs in it, and how it gets loaded and verified automatically.

In practice: if a task looks big, don't start it all at once, cut it into small steps, and let `biney-brain-continuity` carry what needs to survive past `/clear`.

## Summary for the router

- Output comes out generic (design, security, code) → check the Step 1 roster first (`ui-ux-pro-max` for design, `security-and-hardening` for security), only fall to `find-skills` when the roster doesn't cover it or already-applied still isn't enough, and only then TikTok/YouTube, before continuing to fight the prompt.
- Long session or big task → split it into small tasks; for carrying state across `/clear`, that's `biney-brain-continuity`, not a hand-rolled context file.
