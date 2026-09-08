<p align="center">
  <img src="assets/logo.png?v=2" width="220" alt="biney-brain, the guy with more scars than you">
</p>

<h1 align="center">biney-brain</h1>

<p align="center">
  <em>It's not that I know more. I've just already screwed this up before.</em>
</p>

---

Tired of being the guy who can't get real value out of Claude Code? Installed four skills, still don't know which one to use, when, or why, and end up asking the AI everything with last-minute-exam judgment?

Relax. Here's another screwup, but with more mileage: exams solved by repeating the pattern that already worked, hackathons done in a rush, one real client who almost made me throw the whole thing out the window, and a thesis that taught me not to confuse "well made" with "what you actually need to show." That's where this judgment came from, the kind I don't have to rebuild from scratch every time.

biney-brain packages that judgment as a router: you describe the situation, and it tells you whether an installed skill already solves it (`ponytail` so you don't write more code than needed, `caveman` so you don't say more than needed, `security-and-hardening` so you don't leak data, `ui-ux-pro-max` so it doesn't look like a school project) or whether it's a context call that no code skill covers, in which case it applies judgment that's already been chewed on.

It doesn't solve everything. It doesn't make you smarter. It just keeps you from reinventing the wheel on every decision someone (me, in this case) already screwed up before you did.

If `ponytail` is the senior who doesn't write more code than needed, biney-brain is the guy who doesn't overthink how he uses the AI: if the output comes out generic (a design that screams "made by AI," code with no security thought behind it), you don't keep fighting the prompt, you check `find-skills` (or TikTok/YouTube if that turns up nothing) for a skill someone already built for exactly that; if the task is big, you cut it into small pieces with a context `.md` before the session falls apart on its own.

## Before / after

You ask "what stack should I use for this 30-hour hackathon" and your AI hands you a microservices map with Kafka because "it scales better."

With biney-brain:

```
/biney-brain what stack should I use for a 30-hour hackathon
```

> This is a case for `biney-brain-stack`. Use what you already know, not what
> sounds better in the pitch. If you need something outside your skillset,
> don't improvise it: ask another AI for a detailed prompt for that specific
> piece and run it separately from the core.

No 3am argument about hexagonal architecture. No Kafka in a 30-hour MVP.

## How it works

A router (`biney-brain`) plus one domain per type of decision:

- `biney-brain-stack`: what technology to use depending on context (exam, hackathon, real client, personal research project)
- `biney-brain-scope`: what to cut, postpone, or negotiate when time runs short
- `biney-brain-security`: how much security effort to put in and when it's not negotiable
- `biney-brain-tests`: when to write tests, when to test by hand, when to trust an AI audit
- `biney-brain-git`: how to commit and branch, even solo
- `biney-brain-delegate`: how much you hand off to the AI and when you step in
- `biney-brain-ai-usage`: what to do when the output comes out generic (find the skill that already solves it), and how to keep the session from auto-compressing on you

Each one is a `SKILL.md`, concrete judgment, not pure theory. Don't need a domain, delete it. Missing one, add it the same way as the rest.

### You don't need to type `/biney-brain` for the judgment to kick in

The router loads on its own when you open a new session: a `SessionStart` hook (`hooks/session-start.sh`) injects the full content of `biney-brain/SKILL.md` into context before you type anything. That means **Claude already has the judgment loaded from the first message**, without depending on you or it catching it mid-conversation.

In practice: you paste a master prompt `.md` straight in, no `/biney-brain` in front, and Claude still checks whether the case qualifies (steps 1 and 2 of the router) and decides on its own whether to invoke `biney-brain-stack`, `biney-brain-scope`, etc. It's the same mechanism any skill uses to auto-invoke when its description matches the case, nothing exclusive to biney-brain.

`/biney-brain <situation>` still works, but it's there to force the question explicitly ("tell me which domain this falls under") when you want the router's answer directly, not a requirement for the judgment to apply.

## Install

### Claude Code

```
/plugin marketplace add C:\Users\ASUS\proyectos\biney-brain
/plugin install biney-brain
```

If it's already on GitHub:

```
/plugin marketplace add biney-debug/biney-brain
/plugin install biney-brain
```

### Codex CLI

Codex CLI reads the same `SKILL.md` format from `~/.codex/skills/` and, since v0.117, supports a `SessionStart` hook the same way Claude Code does. From a local clone of this repo, one command:

```
bash scripts/install-codex.sh
```

That copies the seven skills into `~/.codex/skills/`, copies the Codex-flavored session hook into `~/.codex/hooks/`, and merges a `SessionStart` entry into `~/.codex/hooks.json` without touching whatever else is already in there (needs `python3` on your PATH). Safe to re-run after a `git pull`, it just skips the merge if the hook is already registered. Restart Codex CLI afterward so it picks up the new skills.

## Statusline badge (optional, for whoever installs it)

When you install the plugin, a `SessionStart` hook turns on the flag that marks biney-brain as active on its own, nothing to touch there. To also get `[BINEY-BRAIN]` showing in your status bar, don't edit anything by hand: copy this prompt and paste it into Claude Code, it'll handle it:

```
I have the biney-brain plugin installed. Set up its statusline badge:
copy the file hooks/biney-brain-statusline.sh from the installed plugin to
~/.claude/hooks/, and add that script to my statusLine.command in
~/.claude/settings.json (chained with ; to whatever is already configured,
without deleting anything existing). Let me know when it's done.
```

Once that's done, `[BINEY-BRAIN]` shows up in your status bar the moment you open a new session. It's purely cosmetic: it means the plugin is available, it doesn't change how any response behaves.

## Use

```
/biney-brain <describe your situation>
```

Tells you which skill to delegate to, or the concrete judgment to apply if it's a call no code skill can make for you.

---

<p align="center"><sub>Inspired by how <a href="https://github.com/DietrichGebert/ponytail">ponytail</a> is built. Same principle: the short answer someone with more scars than you already knows.</sub></p>
