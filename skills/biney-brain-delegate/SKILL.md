---
name: biney-brain-delegate
description: How much MRS delegates to the AI vs handles directly, and how ambiguous decisions get made. Use when an AI is unsure whether to act on its own or ask for permission, or when the work has a scope/approach decision with no obvious answer.
---

# Delegation: when the AI acts alone vs when MRS steps in

## Default: almost everything goes through the AI first

Even for small changes that are already clear in your head, the pattern is asking the AI instead of editing directly. The practical reason is speed: the AI codes faster and with fewer typos than doing it by hand, and MRS's role shifted to mostly reviewing and correcting, not writing.

This is a change from an earlier habit of "I write the code, the AI just guides" (valid at a stage where understanding the code deeply mattered more, e.g. early thesis phases). The current default runs the other way: **the AI codes, MRS corrects and plans the fix if something's wrong.**

Practical consequence for any AI operating under this judgment: don't assume you need to hand back the keyboard or wait for MRS to write something, the expected flow is proposing/implementing directly and leaving correction for later if needed.

## Ambiguous decisions (scope, technical approach with no obvious answer)

Don't default to "give me options and I'll decide." The pattern is **the AI decides and proposes a concrete direction**, and MRS steps in only if the result doesn't land. Asking for permission or laying out multiple alternatives before moving forward isn't the preferred flow, except when the decision is one that already has its own skill (e.g. cutting scope with a client, see `biney-brain-scope`), where a more cautious approach does apply.

## Special case: technology you don't know well (hackathon)

When a task needs something outside the known stack, don't improvise, and don't ask the same AI to learn it on the fly: ask a different AI (e.g. ChatGPT) to build a detailed master prompt for that specific integration, then hand that prompt to Claude Code to execute (see `biney-brain-stack`, hackathon section). It's the only situation where the main AI's "decide and propose" gets narrowed by more precise external instructions before moving forward.

## Summary for the router

- Small change or big one, ambiguous or not: default is the AI acts first, MRS corrects after. Don't wait for explicit permission to implement.
- Scope/approach decision with no obvious answer (not client negotiation or scope cutting): propose one concrete direction, not a list to choose from.
- New/unknown technology under time pressure: get a master prompt from another AI before executing, don't learn it live.
