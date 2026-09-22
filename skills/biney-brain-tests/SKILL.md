---
name: biney-brain-tests
description: When MRS writes automated tests, when to test manually, and when to delegate verification to an AI audit. Use when deciding testing effort by context (exam, hackathon, personal project, freelance).
---

# Tests: when to write them, when to test by hand, when to delegate to AI

The underlying priority is never "test coverage," it's that the work meets its actual success criteria (rubric, demo, client). Tests are a means, not a goal in themselves.

## Exam

Absolute priority: meeting the rubric 100%. If the prompt requires tests as part of the deliverable, don't design the suite from scratch: ask the AI what cases to cover, and verify for real by taking manual screenshots of them running (`playwright-cli` scripts this instead of clicking by hand). The automated test is a rubric deliverable there, not a tool you personally trust.

If the prompt doesn't ask for tests, don't write them. All the time goes to getting the functionality complete.

## Hackathon (MVP, hard deadline)

Zero automated tests. All verification is manual, and it's opportunistic too: check by hand what you can given the time left, there's no systematic QA pass. The main backstop is the AI's audit report (see `biney-brain-security`), not your own suite.

## Personal project with no external deadline

The judgment shifts in two ways compared to a hackathon:
1. **Tests get delegated, not hand-written.** The pattern is asking `ponytail` or `agent-skills` directly to test, audit, and fix what it finds, then demand a real, honest, percentage-based status report back, e.g.: "usa ponytail o agent-skills para auditar, testear y solucionar posibles errores, al final dame un reporte verdadero porcentual y honesto del estado actual del proyecto después de los tests." You're not writing the suite by hand, the deliverable you actually want is a report you can trust.
2. **Manual testing happens for real**, not just when time allows like in a hackathon. In a longer-running personal project, manual testing is a regular part of the flow, not an opportunistic exception.

The underlying pattern in both cases (hackathon and personal project) is the same flow: ask the AI to run the tests/audit and hand back an honest, percentage-based report, and add your own manual review on top when context allows. The difference is how much time goes into that manual review: almost none in a hackathon, real time in a personal project.

## Freelance (external client who might request support later)

Tests get added **by default**, even if the client doesn't explicitly ask for them in scope. Same reason as textbook architecture in `biney-brain-stack`: someone technical and external is going to maintain this, and a minimal test reduces the risk of regressions you'll later get asked to fix without it being quoted.

## Which browser tool backs "verify for real"

Every context above ends in some form of "verify for real" (exam screenshots, hackathon manual check, the delegated audit's report). `playwright-cli` is the default tool behind that, scripted, no site permissions, and it can generate an actual Playwright test file instead of a one-off check, so the exam's proof-of-run or the freelance test suite survives past this one conversation. `claude-in-chrome` only comes in when the check needs the user's real logged-in session, not a scripted one. Full rule and the `agent-skills` DevTools footnote live in the router's Step 1.

## Summary for the router

- Exam → tests only if the rubric asks for them, real verification = manual screenshots, total priority is meeting the rubric.
- Hackathon → zero automated tests, opportunistic manual verification + AI audit report.
- Personal project → tests delegated to `ponytail`/`agent-skills` with an explicit ask for an honest, percentage-based report, plus real (not opportunistic) manual verification.
- Freelance → tests by default, not dependent on the client asking.
