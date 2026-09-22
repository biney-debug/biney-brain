---
name: biney-brain-continuity
description: How MRS keeps project continuity across long Claude Code sessions, without depending on conversation memory. Use when closing a task before /clear, or when opening a new session on a project that already has work in progress.
---

# Project continuity

Long sessions end with `/clear`. The point isn't keeping a giant conversation alive to preserve context, it's leaving a small, versioned trail so the next session picks up cold without re-explaining the project. Git and the real state of the repo are still the source of truth, this only complements it, it never replaces it.

## What persists and what doesn't

Anchor rule: only what can't be derived by reading code, git, or `CLAUDE.md`.

Persist:
- Current status/objective, in plain terms.
- What got finished in the last session.
- What's pending next.
- Known issues or blockers.
- Deliberate decisions, including "decided not to build X yet, because Y."

Don't persist: conversation logs, internal reasoning, the list of files touched, anything `git log`/`git diff` already shows, anything that already lives in `CLAUDE.md`. If it's derivable, it doesn't belong here, it just goes stale twice.

## Fixed template

One file, `.biney-brain/STATE.md`, at the project root. Keep it small, ~20-30 lines. This isn't a log, it's a snapshot: overwrite sections that changed, delete sections that no longer apply. Never append.

```markdown
# Project state

_Last updated: <date> — <branch/short commit>_

## Status
<one or two lines: where the project stands right now>

## Recently completed
- <bullet>

## Pending
- <bullet>

## Known issues
- <bullet>

## Decisions
- <decision> — **why:** <reason>

## Next objective
<one line>
```

## Checkpoint, before `/clear`

Trigger: a task just closed (tests pass, audit done). Offer to consolidate in one line, don't write the file without an ok. When writing: overwrite what changed, don't accumulate. Never put secrets or credentials in it, same rule as any other tracked file. It rides in the same commit as the task's own changes, not a separate one, but committing anything still only happens on explicit request, per `biney-brain-git`.

## Recovering state, at session start

The `SessionStart` hook already injected `.biney-brain/STATE.md`'s content if it exists, with a "verify before trusting it" banner. Hard rule: cross-check every claim against `git log`, `git status`, `git diff`, direct file reads, or tests before treating it as true. If something's stale (say, "refresh tokens pending" but the code already has them), fix `STATE.md` in the same session instead of carrying the stale claim forward. On a project with no git, the check degrades to reading the current files directly.

## Summary for the router

- Closing a task before `/clear` → offer to consolidate `.biney-brain/STATE.md` in one line, write it only on confirmation, overwrite don't append.
- New session on a project with a `.biney-brain/STATE.md` → treat its content as a claim to verify against git/tests, not as fact, and correct it in place if stale.
