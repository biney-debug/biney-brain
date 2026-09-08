---
name: biney-brain-personal
description: How MRS decides stack, security level, and polish priority for a personal project with no exam, hackathon jury, client, or thesis committee behind it, like a portfolio landing page or a tool built for friends. Use when the project isn't graded and has no deadline someone else set, but "just cut by effort vs. benefit" (biney-brain-scope) or "how much testing" (biney-brain-tests) isn't the actual question, stack/security/polish is.
---

# Personal projects: showcase vs. private experiment

One question decides almost everything here: is this meant to be seen (a link you'll actually send people, a portfolio piece) or is it a private tool or experiment just for you? Everything below branches off that, don't apply hackathon or freelance defaults here without checking which one this is first.

## Showcase / portfolio (friends, LinkedIn, a link you'll send people)

- Stack: known stack, same reasoning as freelance and hackathon. People are going to judge this by how it looks and behaves, not by how experimental you got under the hood, this isn't the place to learn a new framework.
- Polish: a priority, not an afterthought, the opposite default from a hackathon MVP. A generic-looking landing page fails the actual goal even if the code underneath works fine. Route it through `ui-ux-pro-max` before shipping the default AI look (Step 1 of the router already does this, this section is why it matters here specifically).
- Security: starts at the relaxed exam/hackathon tier (no real third-party data, no payments) unless you already know you're sharing this more broadly later (portfolio, LinkedIn, a public link that outlives "just my friends"), in that case apply the higher bar from day one instead of relaxing now and redoing it later.

## Private tool / experiment (just for you, nobody else sees it)

- Stack: this is exactly where trying something new is the point. No known-stack constraint like a hackathon, there's no judge and no pitch deadline forcing the safe choice.
- Polish: doesn't matter. Function only, same bar as a hackathon MVP, if anything lower since there's no demo at the end either.
- Security: relaxed tier, same reasoning as above, no real stakes.

## Hard trigger: this stops being "personal" the moment it touches someone else's real data

The instant the project starts collecting real data from another person, even a friend, even informally, the security tier jumps to `biney-brain-security`'s thesis/production tier: rate limiting matters, no data leaks, no dummy secrets. The audience size doesn't change this, whether someone else's data is involved does. "Just my friends see it" stops being a reason to relax once it's also "and it stores something about them."

## Summary for the router

- Showcase/portfolio → known stack, polish is priority, security starts relaxed but jumps early if wider sharing is already the plan.
- Private experiment → new stack is fair game, polish doesn't matter, security stays relaxed.
- Either kind, the moment it starts collecting real data from someone else → treat it like `biney-brain-security`'s production tier immediately, regardless of audience size.
- Scope/backlog decisions for a personal project (what to cut, what's worth building) stay with `biney-brain-scope`. Testing effort stays with `biney-brain-tests`. This domain only covers stack, security tier, and polish priority.
