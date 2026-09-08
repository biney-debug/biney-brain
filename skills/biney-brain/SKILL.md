---
name: biney-brain
description: What MRS (biney-debug) would do here. Router for hands-on judgment, call it with /biney-brain when you need to decide stack, cut scope, security level, tests, git workflow, or how much to delegate to the AI, and it's not obvious which skill applies.
---

# biney-brain: judgment router

This skill doesn't solve anything by itself. Its job is to decide, given a concrete case, whether:

1. An installed skill already solves it better (delegate there), or
2. It's a judgment call specific to MRS that no general-purpose skill covers (apply one of the domains below).

Don't mix the two: if the case is "write this endpoint simply," that's plain code, it goes to `ponytail`, not a biney-brain domain.

## Step 1: identify the type of case

```
Case comes in
    │
    ├── Writing/refactoring/choosing a code library?
    │     └──→ delegate to `ponytail`
    │
    ├── Saving tokens/text in the response?
    │     └──→ delegate to `caveman`
    │
    ├── Reviewing security of code already written?
    │     └──→ delegate to `security-and-hardening` / `/security-review`
    │           (but the expected bar comes from `biney-brain-security`)
    │
    ├── UI/UX design?
    │     └──→ delegate to `ui-ux-pro-max` (data-backed palettes/typography/styles)
    │           or `frontend-ui-engineering` / the `design` skill if that's not installed
    │
    ├── Generating a document, report, README, or any other written
    │   deliverable (not code)?
    │     └──→ mandatory: run it through `humanizer` before handing it over,
    │           even if nothing about it seemed off. If `humanizer` isn't
    │           installed, say so and recommend installing it (`find-skills`)
    │           instead of delivering the draft as-is.
    │
    ├── Spec/plan/review of a code process (not a business decision)?
    │     └──→ delegate to `spec-driven-development`, `planning-and-task-breakdown`,
    │           `code-review-and-quality` as appropriate
    │
    └── Context/business/priority judgment with no code skill covering it?
          └──→ see Step 2
```

## Skill roster

Everything Step 1 can delegate to. Most people who install biney-brain install nothing else first, so treat this list as the starter pack, not a one-off lookup:

- `ponytail`: keeps generated code minimal, YAGNI, stdlib first.
- `caveman`: keeps responses short, no wasted tokens.
- `security-and-hardening` (or the `/security-review` command): audits code for vulnerabilities.
- `ui-ux-pro-max` (or `frontend-ui-engineering` / `design`): data-backed UI/UX instead of default-generic design.
- `humanizer`: strips AI writing patterns out of generated documents, mandatory per Step 1.
- `find-skills`: discovers and installs any of the above (or anything else) by name, the fallback for everything on this list.
- `agent-skills` (github: addyosmani/agent-skills): one plugin, not five separate installs, bundles `spec-driven-development`, `planning-and-task-breakdown`, `code-review-and-quality`, `frontend-ui-engineering`, and `security-and-hardening` among others. If any of those come up missing, recommend this one plugin, not each skill individually.

## Step 2: which domain applies

```
Context judgment
    │
    ├── Which technology/architecture to use depending on context (exam,
    │   hackathon, freelance, thesis)? ────────────────→ `biney-brain-stack`
    │
    ├── Personal project, no exam/hackathon/client/thesis behind it
    │   (a portfolio piece, a tool for friends, a private experiment)?
    │   Stack, security tier, or how much polish it needs? ─→ `biney-brain-personal`
    │
    ├── What to cut, postpone, or negotiate when
    │   scope doesn't fit the time available? ─────────→ `biney-brain-scope`
    │
    ├── How much security effort to put in
    │   depending on context (beyond the technical review)? → `biney-brain-security`
    │
    ├── Write tests, test by hand, or trust
    │   an AI audit? ───────────────────────────────────→ `biney-brain-tests`
    │
    ├── How to commit/branch? ──────────────────────────→ `biney-brain-git`
    │
    ├── Should the AI act on its own or ask for
    │   permission/options before moving forward? ─────→ `biney-brain-delegate`
    │
    └── Output coming out generic (design, security,
        code), or the session getting long/messy? ─────→ `biney-brain-ai-usage`
```

## How to respond

When invoked with `/biney-brain <situation>`:

1. Classify the case per Step 1.
2. If it delegates to an external skill, say so explicitly: "this is a case for `<skill>`, invoke it."
3. If a domain applies, summarize that SKILL.md's concrete judgment in 2-4 lines (don't repeat the whole file), and say which domain it came from.
4. If the case mixes two things (e.g. "what stack should I use and how do I secure it"), cite both domains, don't force a single answer.
5. If the case doesn't fit any existing domain, say so: it's a sign a new domain needs documenting, not a reason to invent judgment MRS never actually validated.
6. The document/`humanizer` branch is the one exception to "just point at the skill": run it yourself before delivering the document, don't stop at recommending it.
7. Before delegating to any skill in Step 1, check whether you actually have it loaded. If you don't, say so instead of quietly improvising without it, then name it and point at `find-skills` (or the exact skill name) to get it. Don't fake the specialized criteria you don't have.
8. If more than one Step 1 skill turns out missing in the same session, that's a sign this is a fresh biney-brain install with nothing else set up yet. Stop surfacing gaps one at a time: list the full Skill roster in one shot and offer to help install what's missing, so the user doesn't rediscover each hole task by task.
