---
name: biney-brain-security
description: What security level MRS applies depending on context (exam, hackathon, thesis, production/freelance) and how the review gets delegated. Use when deciding how much security effort to put in, or when code is about to ship.
---

# Security level by context

The security bar isn't fixed, it scales with the context and with whether real data or money is involved.

## Secrets and credentials

- **Freelance / production**: strict, always. Credentials are required env vars, no defaults, no fallback baked into the code. This isn't negotiable for a deadline.
- **Exam / hackathon**: relaxed. A committed `.env` with dummy values or a temporary default is fine because the only people who see it are you and the grader, there's no real attack surface.

## Validation, hardening, code audits

Security doesn't get skipped "because there's no time": the pattern is delegating it, not skipping it. That means letting Claude (with `ponytail` + `agent-skills` active) do a full audit pass looking for code and visual bugs, instead of validating line by line by hand while coding.

This scales up in intensity depending on context:
- **Thesis or anything going to real production**: high priority. Points that can't get skipped:
  - Rate limiting (prevents abuse and prevents overpaying for the deployed backend if someone hammers it).
  - Preventing data leaks, this is priority number one at deployment time, more than "following the full OWASP checklist."
- **Exam / hackathon with no real data**: the AI audit still happens (it's not skipped), just without the rate-limiting/data-leak rigor that applies to thesis/production.

## How AI-generated code gets reviewed

No line-by-line eyeball review. The pattern is asking the AI for a separate, explicit security pass (e.g. `/security-review` or the `security-and-hardening` skill) before calling the work done, instead of trusting it by default or auditing it by hand.

## Summary for the router

- If the case is "this is actually shipping" (thesis or production) → max level: rate limiting + preventing data leaks are non-negotiable, run `/security-review` before closing it out.
- If the case is exam/hackathon with no real data → basic security (validation, exception handling) via AI audit, but secrets can be dummy and rate limiting isn't required.
- Any security review gets delegated to a dedicated AI pass (`security-and-hardening` / `/security-review`), never manual line-by-line reading.
- Personal project with no exam/hackathon/client/thesis behind it? `biney-brain-personal` sets the tier (relaxed by default, jumps to this domain's production tier the moment it touches someone else's real data).
