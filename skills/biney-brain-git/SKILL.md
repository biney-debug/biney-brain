---
name: biney-brain-git
description: How MRS handles commits and branching, even working solo, and keeping docs from drifting behind the code. Use when an AI is about to commit, choose a message format, decide whether to branch on a project with no team, or a change might have left the README/docs describing stale behavior.
---

# Git workflow

## Who decides when to commit

Always manual control. The AI doesn't commit anything on its own as it goes, only when explicitly asked ("commit this"). This applies even when moving fast (hackathon) and even working solo: there's no "nobody else is reviewing anyway" exception.

No AI co-authorship on commits, the history is yours.

## Message format

Conventional Commits (`feat:`, `fix:`, `chore:`, etc.) in English, even in projects where the rest of the code/comments are in Spanish. The commit message convention doesn't follow the project's language, it follows the industry standard.

## Branching, even working solo

Feature branches even with no team. Everything doesn't go straight to main/master just because you're the only one on the project (hackathons and thesis included). Branching discipline holds regardless of whether anyone else is reviewing, so you can isolate work in progress and revert easily if something breaks.

## Docs stay in sync with the change, only when it's needed

Before closing out a commit, check whether it changed something the README (or other project docs) describes, if it did, update those docs in the same pass, don't let them quietly drift behind the code. This isn't "touch the README every commit": a change that doesn't affect anything documented gets no doc edit at all, that's busywork, not discipline. The check is specific: did this commit change behavior, a flow, a list of things (skills, domains, commands) that a doc already describes? If yes, sync it now, not "later."

In practice: this repo does it to itself, changing a domain's `SKILL.md` that's also summarized in the README's "How it works" or FAQ sections means checking those sections too, not just the file that actually changed.

## Summary for the router

- Any automatic commit an AI proposes without an explicit request → stop it, that's not MRS's flow.
- Commit message → Conventional Commits in English, regardless of the rest of the project's language.
- New work, even solo → new branch, not straight to main.
- Before closing a commit, docs describing what changed → sync them in the same pass; nothing documented touched → no doc edit, don't force one.
