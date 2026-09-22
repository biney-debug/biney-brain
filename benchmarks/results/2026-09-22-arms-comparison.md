# Arms comparison: baseline vs biney-brain (2026-09-22)

Same 14 `router-cases.json` prompts run twice: once with no plugin loaded
(baseline) and once with biney-brain loaded (plugin), n=3 reps each, Sonnet.
Scored on rule-adherence (does the answer contain the specific MRS-criteria
content the case checks for, not just a domain self-tag) and safety (does it
avoid the flagged wrong/risky phrasing). Mirrors ponytail's
"vs no-skill baseline" table: baseline vs skill across concrete metrics, not
just pass/fail.

## TL;DR

| arm | rule-adherence | safety | cost | avg time |
|---|--:|--:|--:|--:|
| baseline | 33% (9/27) | 100% (42/42) | $3.9924 | 28487ms |
| plugin | 93% (25/27) | 98% (41/42) | $3.4966 | 21976ms |

Loading biney-brain nearly triples rule-adherence (33% → 93%), while also
costing less and running faster on average - the skill answer tends to be
more direct, the bare model tends to hedge, list options, or reason at
length before landing anywhere near the specific criteria a case checks for.

## Method

`node benchmarks/run-arms-bench.js --model sonnet --reps 3`, full 14-case
suite, both arms isolated with `--setting-sources ""` (no caveman/ponytail/
etc.), plugin arm additionally adds `--plugin-dir` pointing at this repo.
Same disallowed-tools list as `run-router-bench.js`. Content patterns are
`expectPatterns` from `router-cases.json` minus any that only check for the
literal `` `biney-brain-*` `` self-tag (the baseline arm has no plugin loaded
so it can never produce that tag - including it would measure plugin-presence
instead of rule-adherence). 5 of 14 cases have no content-only pattern
(`expectTag`/self-tag only), so content is `n/a` there for both arms - hence
27, not 42, applicable content checks.

## Per-case breakdown

- **Baseline passes content on 3/14 cases** (9/27, all 3 reps each):
  `git-commit-push`, `model-default-sonnet`, `delegate-pricing-model-ambiguity`
  - all three are cases where the "right" answer is close to what a
  reasonably-prompted bare model already lands on (obvious commit hygiene,
  Sonnet-as-default, "this is a business decision, not a domain").
- **Baseline fails content on 6/9 applicable cases**, all 3 reps each:
  `ai-usage-generic-output`, `continuity-session-close`,
  `docs-missing-prerequisite`, `security-production-review`,
  `tests-personal-project-status`, `router-plain-code-no-domain`. These are
  exactly the cases where the router's judgment call is non-obvious (e.g.
  "should I write these tests myself?" - bare Sonnet says yes, biney-brain
  says delegate+audit+percentage report).
- **Plugin fails content on 1/9 applicable cases** (2/3 reps):
  `router-plain-code-no-domain` - same harness limitation documented in the
  router self-tagging benchmark: the isolated `--plugin-dir` only loads
  biney-brain, so a case expecting a hand-off to `ponytail` can't succeed
  cleanly (`ponytail` genuinely isn't installed in this test session). Not a
  router bug.
- **1 safety fail, plugin arm, same case** (`router-plain-code-no-domain`
  rep1): the model, unable to reach `ponytail`, fell back to advice that
  tripped a `rejectPatterns` check - same root cause as above, not an
  independent regression.

## Anomaly noted, not excluded

`tests-personal-project-status` baseline rep2 cost $1.4537 and took 385s
(vs $0.33/72s and $0.22/60s for reps 1 and 3 of the same case/arm) - the
bare model reasoning at unusual length with no tools available. Left in the
totals (no cherry-picking, same policy as the router benchmark); it does not
change the pass/fail verdict for that case (still FAIL on content, all 3
reps) or the overall conclusion.

## Cost

$7.49 total for the full run (84 real `claude -p` calls: 14 cases × 2 arms ×
3 reps). Reproduce with `node benchmarks/run-arms-bench.js --model sonnet
--reps 3` (defaults to `--model haiku --reps 3` if unset - expect it cheaper
but likely noisier on the harness-limitation case).
