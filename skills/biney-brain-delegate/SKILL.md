---
name: biney-brain-delegate
description: How much MRS delegates to the AI vs handles directly, and how ambiguous decisions get made. Use when an AI is unsure whether to act on its own or ask for permission, or when the work has a scope/approach decision with no obvious answer.
---

# Delegation: when the AI acts alone vs when MRS steps in

## Default: almost everything goes through the AI first

Even for small changes that are already clear in your head, the pattern is asking the AI instead of editing directly. The practical reason is speed: the AI codes faster and with fewer typos than doing it by hand, and MRS's role shifted to mostly reviewing and correcting, not writing.

This is a change from an earlier habit of "I write the code, the AI just guides" (valid at a stage where understanding the code deeply mattered more, e.g. early thesis phases). The current default runs the other way: **the AI codes, MRS corrects and plans the fix if something's wrong.**

Practical consequence for any AI operating under this judgment: don't assume you need to hand back the keyboard or wait for MRS to write something, the expected flow is proposing/implementing directly and leaving correction for later if needed.

## Auto mode: don't babysit every step

Once the AI is coding first by default (see above), don't sit there watching every tool call and pressing enter on each one. Let it run in auto mode through a full small task, then review at that checkpoint, not mid-task. Reviewing line by line while it works doesn't catch more, it just burns the time this whole workflow was supposed to save.

Two things override auto mode and mean stop, look closely, before it happens:
1. **Irreversible actions**: a push, a deploy, deleting something, anything that isn't a `git revert` away from undone.
2. **Visible failures**: a broken build, a red test, anything that already surfaced as wrong.

Outside those two triggers, keep going. This is the actual point of biney-brain existing: it's not there to make you review more, it's there so you know which moments are worth stopping for and which ones aren't, so auto mode is something you can trust instead of something that makes you anxious.

## Acceptance criteria: "don't stop until every check passes"

Another way to hand a task off without babysitting it: give the AI the criteria and let it loop. The AI turns them into checks it can run, runs them, fixes what fails, and runs them again until all pass, then reports what it verified and what it couldn't. That's a full task with its own checkpoint at the end, so it doesn't need a review on every step, and the same two stops apply (irreversible action, failure already visible). If one check turns out to be wrong, the AI fixes the check and says so, it doesn't count it as passed. Worked example with a live Google Doc in `biney-brain-docs`.

## Ambiguous decisions (scope, technical approach with no obvious answer)

The pattern is **the AI lays out 2-3 concrete options and MRS picks**, not deciding alone and shipping one direction unasked. Once picked, MRS corrects it after if the result doesn't land, same correction loop as the rest of this workflow. This is the one place where the "AI acts first" default above narrows: real ambiguity with no obviously-right answer gets a short menu, not a unilateral call. It's separate from decisions that already have their own skill (e.g. cutting scope with a client, see `biney-brain-scope`), which follow that skill's own flow instead.

The test that matters: would two competent people reasonably pick different answers here? If yes, that's real ambiguity, menu it. If the answer is obvious even though nobody said it out loud (test junk in a diff, an unused import, a typo fix), that's not ambiguity, that's the act-first default below, just act. Don't call something "ambiguous" only because the user phrased it as a question ("no se si...", "que hago") — the phrasing doesn't decide which path applies, the actual uncertainty does.

## Special case: technology you don't know well (hackathon)

When a task needs something outside the known stack, don't improvise, and don't ask the same AI to learn it on the fly: ask a different AI (e.g. ChatGPT) to build a detailed master prompt for that specific integration, then hand that prompt to Claude Code to execute (see `biney-brain-stack`, hackathon section). It's the one case where the usual flow (options → pick, or act-first for small stuff) gets replaced entirely by precise external instructions before anything moves.

## Summary for the router

- Small change, or big one with an obvious right answer: default is the AI acts first, MRS corrects after. Don't wait for explicit permission to implement.
- Real ambiguity, no obviously-right answer (scope/approach decision, not client negotiation or scope cutting): lay out 2-3 concrete options, MRS picks, correct after if it lands wrong. Don't default to act-first here just because the change itself is small, small-but-genuinely-undecided still gets the menu.
- Auto mode is the default execution style: don't stop for review on every step, run a full small task, then check at that checkpoint. Only interrupt auto mode for an irreversible action about to happen or a failure that already surfaced.
- Clear acceptance criteria given: the AI turns them into runnable checks and loops until they all pass, then reports honestly, no review mid-loop.
- New/unknown technology under time pressure: get a master prompt from another AI before executing, don't learn it live.
- Whichever of the above ends up deciding the response, that's still `biney-brain-delegate` firing: tag it per the router's self-tagging rule, even on the plain act-first path.
