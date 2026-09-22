#!/usr/bin/env node
// Runs router-cases.json through a real, isolated `claude -p` call per case and
// checks whether the expected biney-brain-* domain tagged itself (see the
// router's "Firing on its own, mid-task" self-tagging rule). No deps: shells
// out to the already-installed `claude` CLI.
//
// Usage: node run-router-bench.js [--model haiku|sonnet|...] [--case <id>]
//
// Cost note: each case is a real API call, billed like any other Claude usage.
// --plugin-dir + --setting-sources "" isolate the context to just this plugin
// (skips caveman/ponytail/etc.), cutting cache size and cost significantly.

const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const PLUGIN_DIR = path.resolve(__dirname, '..');
const CASES_FILE = path.join(__dirname, 'router-cases.json');

function parseArgs(argv) {
  const args = { model: 'haiku', caseId: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--model') args.model = argv[++i];
    if (argv[i] === '--case') args.caseId = argv[++i];
  }
  return args;
}

function runCase(testCase, model) {
  const args = [
    '-p', testCase.prompt,
    '--model', model,
    '--output-format', 'json',
    '--setting-sources', '',
    '--plugin-dir', PLUGIN_DIR,
    '--disallowedTools', 'Edit,Write,MultiEdit,NotebookEdit,Bash,Read,Grep,Glob,WebFetch,WebSearch',
  ];
  const raw = execFileSync('claude', args, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
  return JSON.parse(raw);
}

function evaluate(testCase, response) {
  const text = response.result || '';
  const failures = [];

  if (testCase.expectTag) {
    const tagRe = new RegExp('`' + testCase.expectTag + '`', 'i');
    if (!tagRe.test(text)) failures.push(`missing expected tag \`${testCase.expectTag}\``);
  }
  for (const p of testCase.expectPatterns || []) {
    if (!new RegExp(p, 'i').test(text)) failures.push(`missing expected pattern /${p}/i`);
  }
  for (const p of testCase.rejectPatterns || []) {
    if (new RegExp(p, 'i').test(text)) failures.push(`matched rejected pattern /${p}/i`);
  }
  return failures;
}

function main() {
  const { model, caseId } = parseArgs(process.argv.slice(2));
  const cases = JSON.parse(fs.readFileSync(CASES_FILE, 'utf8')).filter(
    (c) => !caseId || c.id === caseId
  );

  let totalCost = 0;
  let failed = 0;

  for (const testCase of cases) {
    process.stdout.write(`\n[${testCase.id}] `);
    let response;
    try {
      response = runCase(testCase, model);
    } catch (err) {
      console.log('ERROR running case:', err.message);
      failed++;
      continue;
    }
    totalCost += response.total_cost_usd || 0;
    const failures = evaluate(testCase, response);
    if (failures.length === 0) {
      console.log(`PASS ($${(response.total_cost_usd || 0).toFixed(4)})`);
    } else {
      failed++;
      console.log(`FAIL ($${(response.total_cost_usd || 0).toFixed(4)})`);
      for (const f of failures) console.log(`  - ${f}`);
    }
    console.log(`  result: ${(response.result || '').slice(0, 200).replace(/\n/g, ' ')}...`);
  }

  console.log(`\n${cases.length - failed}/${cases.length} passed. Total cost: $${totalCost.toFixed(4)}`);
  process.exit(failed > 0 ? 1 : 0);
}

main();
