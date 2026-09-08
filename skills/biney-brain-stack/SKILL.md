---
name: biney-brain-stack
description: How MRS picks stack/architecture depending on context (exam, hackathon, freelance, thesis). Use when deciding technology or technical structure and the task's context (graded, hard deadline, external client, personal research) matters more than the "ideal" technology.
---

# Choosing a stack by context

The question is never "what's the best technology," it's "who's going to grade/maintain this and under what time constraint." Context beats technical preference.

## Exam (fixed naming, tight time, one specific grader)

1. The prompt always wins on whatever it specifies (naming, explicit stack, requested structure). Zero room for your own call there.
2. For everything the prompt does NOT specify (DTO vs. direct entity, Bean Validation, testing library, service/repository layers, `@Transactional`), don't re-decide from scratch: repeat the pattern that already worked on the previous exam. Consistency across exams matters more than "the correct way" in the abstract, because it's already proven to run and not cost points.
3. In practice: before starting a new exam, first check whether there's a reusable pattern from before (check past exams/projects) instead of proposing a new "cleaner" structure.

## Hackathon (24-48h, MVP, demo/pitch at the end)

Hard rule: **the MVP's stack is always what you already know.** No new technology for the core, no matter how good it'd look in the demo.

How to resolve the tension of "I want to add something new/flashy" without risking the MVP:
1. Build the action plan with Claude Chat, being explicit about which technologies you already know, and ask the plan to use those.
2. If something you don't fully know needs to get integrated (e.g. an AI model, a new library, an external integration), **don't improvise it live**: ask another AI (e.g. ChatGPT) to write a detailed master prompt for that specific integration.
3. Hand that master prompt to Claude Code to execute. The unknown piece stays isolated with precise instructions, instead of mixing in with improvisation on the known stack.

In other words: technical novelty gets outsourced to a dedicated prompting process, never learned "on the fly" mid-hackathon while touching the MVP's core.

## Real freelance work (an external developer will review/maintain it)

Follow textbook conventions: clean layers, well-emulated mock services (e.g. local AWS), documented decisions. Not "best practices for the sake of best practices," it's that there's someone technical, external, who has to be able to read and maintain the code without you explaining it in person.

## Thesis / personal research project

Architecture bends to whatever needs to be shown or measured for the research (e.g. a metrics dashboard, a specific component the thesis needs to demonstrate), not to the textbook standard in the abstract. If an architectural decision doesn't feed what the committee will grade or what the thesis needs to prove, getting it "right" isn't the priority, serving the thesis's argument is.

## Summary for the router

- Exam context → prompt's naming + the pattern already used before, don't reinvent it.
- Hackathon/MVP context → known stack always; anything new gets isolated via another AI's master prompt + execution in Claude Code (see also `biney-brain-delegate`).
- Client/freelance context → textbook rigor, document decisions, think about whoever maintains it next.
- Personal thesis context → architecture serves what needs to be demonstrated/measured, not the abstract standard.
