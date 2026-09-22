#!/usr/bin/env node
// Arms comparison: the same router-cases.json prompts run twice, once with
// no plugin loaded (baseline) and once with biney-brain loaded, n reps each,
// scored on rule-adherence (does the answer contain the specific MRS-criteria
// content, not just the domain self-tag) and safety (does it avoid the
// flagged risky/wrong phrasing). Mirrors ponytail's "vs no-skill baseline"
// table: baseline vs skill across a few concrete metrics, not just pass/fail.
//
// Usage: node run-arms-bench.js [--model haiku|sonnet|...] [--reps 3] [--case <id>]
//
// Cost note: 14 cases x 2 arms x reps, each a real billed `claude -p` call.
// Both arms use --setting-sources "" for isolation; only the plugin arm adds
// --plugin-dir. See run-router-bench.js for the single-arm self-tagging check.

const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const PLUGIN_DIR = path.resolve(__dirname, '..');
const CASES_FILE = path.join(__dirname, 'router-cases.json');
const DISALLOWED = 'Edit,Write,MultiEdit,NotebookEdit,Bash,Read,Grep,Glob,WebFetch,WebSearch';
const TAG_PATTERN_RE = /biney-brain-/;

function parseArgs(argv) {
  const args = { model: 'haiku', reps: 3, caseId: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--model') args.model = argv[++i];
    if (argv[i] === '--reps') args.reps = parseInt(argv[++i], 10);
    if (argv[i] === '--case') args.caseId = argv[++i];
  }
  return args;
}

// Content patterns are expectPatterns minus any that only check for the
// domain self-tag (e.g. `biney-brain-stack`) - the baseline arm has no
// plugin loaded so it can never produce that literal tag, which would make
// the metric measure plugin-presence instead of rule-adherence.
function contentPatterns(testCase) {
  return (testCase.expectPatterns || []).filter((p) => !TAG_PATTERN_RE.test(p));
}

function runOne(prompt, model, arm) {
  const args = [
    '-p', prompt,
    '--model', model,
    '--output-format', 'json',
    '--setting-sources', '',
    '--disallowedTools', DISALLOWED,
  ];
  if (arm === 'plugin') args.push('--plugin-dir', PLUGIN_DIR);
  const start = Date.now();
  const raw = execFileSync('claude', args, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
  const elapsedMs = Date.now() - start;
  return { response: JSON.parse(raw), elapsedMs };
}

function evaluate(testCase, text) {
  const patterns = contentPatterns(testCase);
  const applicable = patterns.length > 0;
  const contentPass = applicable ? patterns.every((p) => new RegExp(p, 'i').test(text)) : null;
  const rejects = testCase.rejectPatterns || [];
  const safetyPass = rejects.every((p) => !new RegExp(p, 'i').test(text));
  return { applicable, contentPass, safetyPass };
}

function pct(n, d) {
  return d === 0 ? 'n/a' : `${Math.round((100 * n) / d)}%`;
}

function main() {
  const { model, reps, caseId } = parseArgs(process.argv.slice(2));
  const cases = JSON.parse(fs.readFileSync(CASES_FILE, 'utf8')).filter(
    (c) => !caseId || c.id === caseId
  );

  const arms = ['baseline', 'plugin'];
  const stats = {
    baseline: { contentHits: 0, contentTotal: 0, safetyHits: 0, safetyTotal: 0, cost: 0, timeMs: 0, errors: 0 },
    plugin: { contentHits: 0, contentTotal: 0, safetyHits: 0, safetyTotal: 0, cost: 0, timeMs: 0, errors: 0 },
  };

  for (const testCase of cases) {
    console.log(`\n=== ${testCase.id} ===`);
    for (const arm of arms) {
      for (let rep = 1; rep <= reps; rep++) {
        const s = stats[arm];
        let result;
        try {
          result = runOne(testCase.prompt, model, arm);
        } catch (err) {
          console.log(`  [${arm} rep${rep}] ERROR: ${err.message.slice(0, 120)}`);
          s.errors++;
          continue;
        }
        const text = result.response.result || '';
        const cost = result.response.total_cost_usd || 0;
        s.cost += cost;
        s.timeMs += result.elapsedMs;

        const { applicable, contentPass, safetyPass } = evaluate(testCase, text);
        if (applicable) {
          s.contentTotal++;
          if (contentPass) s.contentHits++;
        }
        s.safetyTotal++;
        if (safetyPass) s.safetyHits++;

        console.log(
          `  [${arm} rep${rep}] content=${applicable ? (contentPass ? 'PASS' : 'FAIL') : 'n/a'} safety=${safetyPass ? 'PASS' : 'FAIL'} ($${cost.toFixed(4)}, ${result.elapsedMs}ms)`
        );
      }
    }
  }

  console.log(`\n${cases.length} case(s), n=${reps}, model=${model}\n`);
  console.log('| arm | rule-adherence | safety | cost | avg time |');
  console.log('|---|--:|--:|--:|--:|');
  for (const arm of arms) {
    const s = stats[arm];
    const avgTime = s.contentTotal + s.safetyTotal > 0 ? Math.round(s.timeMs / (reps * cases.length)) : 0;
    console.log(
      `| ${arm} | ${pct(s.contentHits, s.contentTotal)} (${s.contentHits}/${s.contentTotal}) | ${pct(s.safetyHits, s.safetyTotal)} (${s.safetyHits}/${s.safetyTotal}) | $${s.cost.toFixed(4)} | ${avgTime}ms |`
    );
    if (s.errors) console.log(`  (${s.errors} error(s) excluded from the table)`);
  }
}

main();
