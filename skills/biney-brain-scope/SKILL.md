---
name: biney-brain-scope
description: How MRS decides what to cut, postpone, or negotiate when scope doesn't fit the available time/effort. Use when there's deadline pressure (hackathon), a client request outside what was agreed, or a personal backlog bigger than what's feasible.
---

# Cutting scope, negotiating, or postponing

There's no single rule: the judgment changes depending on who sets the deadline (judges, a client, or nobody).

## Hackathon with a deadline and a demo/pitch at the end

When the planned scope won't fit, cut **polish/UI before functionality**. The priority is that everything promised works, even if it looks rough, over having fewer features presented well.

In practice: if halfway through a hackathon you have to choose between "finishing the polish on this screen" or "starting the next planned feature," start the feature. Visual polish is the last thing touched, and only if time's left over at the end.

This lines up with `biney-brain-stack`: the MVP prioritizes having the full functional scope there, not looking perfect.

## Freelance client asks for something outside what was agreed

Don't say no upfront. The pattern is **propose a simpler alternative that meets the client's goal with less risk or time**, before rejecting the request or implementing it as-is if it complicates the system.

Steps in practice:
1. Understand the underlying problem the client wants solved with that request (not the literal request).
2. Offer a reduced/alternative version that solves that underlying problem without the original request's technical risk.
3. Only if the client insists on the full version after seeing the alternative, evaluate case by case (this still has no fixed pattern, don't invent a rigid rule here).

## Personal project with no external deadline (features you propose yourself)

The criterion for dropping something permanently **isn't whether it supports the project's central goal**, it's the **implementation effort relative to the benefit**. An idea can fit the product's goal perfectly and still get dropped if the cost of building it is disproportionate.

In practice: when evaluating a backlog item, the question isn't "does this help the product?" (the answer is almost always yes, or it wouldn't have made the list), it's "does the effort it takes justify what it adds?" If not, drop it or postpone it indefinitely, don't prioritize it just because it's thematically relevant.

## Summary for the router

- Judge/hackathon deadline → cut UI/polish, protect full functionality.
- Client request outside scope → propose a simple alternative first, only evaluate saying no after that.
- Personal backlog with no external pressure → filter by effort/benefit, not by whether it "fits the vision."
