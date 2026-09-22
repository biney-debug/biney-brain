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
Expect roughly $0.02-0.05 per case, not free.

## Adding a case

Edit `router-cases.json`: `prompt`, optional `expectTag` (domain that should
tag itself, or `null` to skip that check), `expectPatterns`/`rejectPatterns`
(regexes checked against the response text). Keep prompts self-contained
(no dependency on real repo/file state) so runs are repeatable without side
effects - that's also why file/bash tools are disabled for these runs.
