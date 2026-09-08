---
name: biney-brain-git
description: How MRS handles commits and branching, even working solo. Use when an AI is about to commit, choose a message format, or decide whether to branch on a project with no team.
---

# Git workflow

## Who decides when to commit

Always manual control. The AI doesn't commit anything on its own as it goes, only when explicitly asked ("commit this"). This applies even when moving fast (hackathon) and even working solo: there's no "nobody else is reviewing anyway" exception.

No AI co-authorship on commits, the history is yours.

## Message format

Conventional Commits (`feat:`, `fix:`, `chore:`, etc.) in English, even in projects where the rest of the code/comments are in Spanish. The commit message convention doesn't follow the project's language, it follows the industry standard.

## Branching, even working solo

Feature branches even with no team. Everything doesn't go straight to main/master just because you're the only one on the project (hackathons and thesis included). Branching discipline holds regardless of whether anyone else is reviewing, so you can isolate work in progress and revert easily if something breaks.

## Summary for the router

- Any automatic commit an AI proposes without an explicit request → stop it, that's not MRS's flow.
- Commit message → Conventional Commits in English, regardless of the rest of the project's language.
- New work, even solo → new branch, not straight to main.
