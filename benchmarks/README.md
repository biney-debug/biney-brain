# Router self-tagging benchmark

Automates what was previously a manual "paste this prompt into a fresh chat"
check: does the right `biney-brain-*` domain fire and tag itself (per the
router's "Firing on its own, mid-task" rule)?

## Run

```
node benchmarks/run-router-bench.js
```

Options:
- `--model <name>` (default `haiku`, cheapest that still exercises Skill invocation)
- `--case <id>` to run a single case from `router-cases.json`

## Cost

Each case is a real `claude -p` call, billed like normal usage. The script
isolates context to just this plugin (`--plugin-dir` + `--setting-sources ""`,
skipping caveman/ponytail/etc.) to keep the cache small, and defaults to Haiku.
14 cases as of 2026-09-22. Expect roughly $0.02-0.05 per case on Haiku
(~$0.3 for a full run) and $0.02-0.17 per case on Sonnet (~$1.0 for a full
run) - not free.

## Adding a case

Edit `router-cases.json`: `prompt`, optional `expectTag` (domain that should
tag itself, or `null` to skip that check), `expectPatterns`/`rejectPatterns`
(regexes checked against the response text). Keep prompts self-contained
(no dependency on real repo/file state) so runs are repeatable without side
effects - that's also why file/bash tools are disabled for these runs.

Caveat: disabling tools blocks the model from reading real repo state, but
Claude Code still auto-injects environment context (cwd, `git status`) at
session start regardless of tool permissions. A prompt that references
hypothetical uncommitted changes can get contaminated by whatever is
*actually* uncommitted in this repo when the suite runs (seen in practice
with `git-commit-push`) - keep the working tree clean before a run if a
case depends on a specific hypothetical git state.

`rejectPatterns` are naive substring/regex checks with no negation
awareness: a correct answer that explicitly rejects an action (e.g. "no
revises línea por línea") can still match a reject pattern built around
that same phrase. Prefer relying on `expectTag`/`expectPatterns` for
correctness and only add `rejectPatterns` for phrasing that has no
legitimate negated use.
