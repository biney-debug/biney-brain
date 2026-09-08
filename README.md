<p align="center">
  <img src="assets/logo.png?v=2" width="220" alt="biney-brain, the guy with more scars than you">
</p>

<h1 align="center">biney-brain</h1>

<p align="center">
  <em>It's not that I know more. I've just already screwed this up before.</em>
</p>

---

Tired of being the guy who can't get real value out of Claude Code? Installed four skills, still don't know which one to use, when, or why, and end up asking the AI everything with last-minute-exam judgment?

Relax. Here's another screwup, but with more mileage: exams solved by repeating the pattern that already worked, hackathons done in a rush, and a thesis I'm working through right now, already forcing me to figure out what actually needs to be shown instead of what just feels like good work. That's where this judgment came from, the kind I don't have to rebuild from scratch every time.

biney-brain packages that judgment as a router: you describe the situation, and it tells you whether an installed skill already solves it (`ponytail` so you don't write more code than needed, `caveman` so you don't say more than needed, `security-and-hardening` so you don't leak data, `ui-ux-pro-max` so it doesn't look like a school project, `humanizer` so a document doesn't read like it came out of a chatbot) or whether it's a context call that no code skill covers, in which case it applies judgment that's already been chewed on.

It doesn't solve everything. It doesn't make you smarter. It just keeps you from reinventing the wheel on every decision someone (me, in this case) already screwed up before you did.

Most people install biney-brain first and nothing else. It knows that: if it tries to hand a case off to a skill you don't have, it says so instead of faking the criteria, and offers the full starter pack (see Skill roster below) instead of making you find each gap task by task.

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
- `biney-brain-personal`: stack, security tier, and how much polish matters for a project with no exam/hackathon/client/thesis behind it, a portfolio piece or a tool for friends
- `biney-brain-scope`: what to cut, postpone, or negotiate when time runs short
- `biney-brain-security`: how much security effort to put in and when it's not negotiable
- `biney-brain-tests`: when to write tests, when to test by hand, when to trust an AI audit
- `biney-brain-git`: how to commit and branch, even solo
- `biney-brain-delegate`: how much you hand off to the AI, including running full auto mode without babysitting every step, and the two things that mean stop and look
- `biney-brain-model`: which Claude model to run a task on, Sonnet 5 by default, Opus 5 for design work, Fable 5 not needed so far
- `biney-brain-ai-usage`: what to do when the output comes out generic (find the skill that already solves it), and how to keep the session from auto-compressing on you

Each one is a `SKILL.md`, concrete judgment, not pure theory. Don't need a domain, delete it. Missing one, add it the same way as the rest.

### You don't need to type `/biney-brain` for the judgment to kick in

The router loads on its own when you open a new session: a `SessionStart` hook (`hooks/session-start.sh`) injects the full content of `biney-brain/SKILL.md` into context before you type anything. That means **Claude already has the judgment loaded from the first message**, without depending on you or it catching it mid-conversation.

In practice: you paste a master prompt `.md` straight in, no `/biney-brain` in front, and Claude still checks whether the case qualifies (steps 1 and 2 of the router) and decides on its own whether to invoke `biney-brain-stack`, `biney-brain-scope`, etc. It's the same mechanism any skill uses to auto-invoke when its description matches the case, nothing exclusive to biney-brain.

`/biney-brain <situation>` still works, but it's there to force the question explicitly ("tell me which domain this falls under") when you want the router's answer directly, not a requirement for the judgment to apply.

## Skill roster

biney-brain doesn't do any of this by itself, it routes to skills that do. Most people install it first and nothing else, so here's everything it leans on:

- `ponytail`: keeps generated code minimal, YAGNI, stdlib first.
- `caveman`: keeps responses short, no wasted tokens.
- `security-and-hardening` (or the `/security-review` command): audits code for vulnerabilities.
- `ui-ux-pro-max` (or `frontend-ui-engineering` / `design`): data-backed UI/UX instead of default-generic design.
- `humanizer`: strips AI writing patterns out of generated documents, mandatory whenever biney-brain hands you a document.
- `find-skills`: discovers and installs any of the above by name, the fallback for all of them.
- `agent-skills` (github: [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)): one plugin, not five separate installs, bundles `spec-driven-development`, `planning-and-task-breakdown`, `code-review-and-quality`, `frontend-ui-engineering`, and `security-and-hardening` among others.

If biney-brain tries to hand a case to one of these and you don't have it, it says so instead of faking the criteria. Once more than one comes up missing in the same session, it stops surfacing gaps one at a time and offers this whole list.

## Install

### Claude Code

```
/plugin marketplace add biney-debug/biney-brain
/plugin install biney-brain
```

### Codex CLI

Codex CLI reads the same `SKILL.md` format, and this repo ships a `.codex-plugin/plugin.json` (same shape as `.claude-plugin/plugin.json`) so it can register as a plugin marketplace:

```
codex plugin marketplace add biney-debug/biney-brain
```

As of Codex CLI 0.128, that registers the marketplace but doesn't install the skills yet, full plugin activation (`plugin_hooks`) is still an experimental feature there. Until it lands, install the skills for real with Codex's own built-in `skill-installer`: paste this into Codex CLI and it handles it.

```
Install these skills from github.com/biney-debug/biney-brain (branch master,
pass --ref master) into $CODEX_HOME/skills using skill-installer:
skills/biney-brain, skills/biney-brain-ai-usage, skills/biney-brain-delegate,
skills/biney-brain-git, skills/biney-brain-model, skills/biney-brain-personal,
skills/biney-brain-scope, skills/biney-brain-security, skills/biney-brain-stack,
skills/biney-brain-tests
Then tell me when it's done and that I should restart Codex.
```

Once installed, the skills auto-invoke the same way they do on Claude Code, matched by description, no need to name them explicitly.

## Statusline badge (optional, for whoever installs it)

To get `[BINEY-BRAIN]` showing in your status bar, don't edit anything by hand: copy this prompt and paste it into Claude Code, it'll handle it:

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

## Uninstall

Claude Code:

```
/plugin uninstall biney-brain
/plugin marketplace remove biney-brain
```

If you set up the statusline badge, also remove the `hooks/biney-brain-statusline.sh` line you added to `statusLine.command` in `~/.claude/settings.json`.

Codex CLI: delete each installed skill folder from `$CODEX_HOME/skills/` (`biney-brain`, `biney-brain-ai-usage`, and so on). If you ran `codex plugin marketplace add`, also run:

```
codex plugin marketplace remove biney-brain
```

## FAQ

**I only installed biney-brain, none of the skills it mentions. Is it useless without them?**
No. `biney-brain-stack`, `biney-brain-scope`, `biney-brain-security`, `biney-brain-tests`, `biney-brain-git`, `biney-brain-delegate`, `biney-brain-model`, `biney-brain-personal`, and `biney-brain-ai-usage` are all self-contained judgment, no dependencies. Only the Step 1 delegations (`ponytail`, `security-and-hardening`, etc.) need the actual skill installed, and biney-brain tells you exactly which one when it hits that case.

**Does this replace ponytail, caveman, security-and-hardening, or the rest?**
No, it routes to them. biney-brain doesn't write code, review security, or design UI, those skills already do that well. It decides which one applies, or hands you MRS's judgment when none of them cover the actual question (what stack, how much to cut, how much security effort, that kind of call).

**Why is it named after MRS specifically, can I use it if I'm not them?**
Yes. The domains are one specific person's real judgment, exams and hackathons already lived through, a thesis in progress right now, and criteria for freelance work worked out ahead of actually having a client. Documented as-is instead of watered down into generic advice, and marked as untested where it is. Use it as-is if it matches how you work, or fork the domains and put in your own answers, that's the whole point of it being plain `SKILL.md` files instead of something harder to edit.

**Can I add my own domain?**
Yes, that's how `biney-brain-personal` got added. Copy an existing `skills/biney-brain-*/SKILL.md` as a template, write the real judgment (not theory), then add a branch for it in `skills/biney-brain/SKILL.md`'s Step 2 flowchart.

**Does it work the same on Claude Code and Codex CLI?**
The judgment is identical, same `SKILL.md` files either way. The difference is how the router gets force-loaded at session start: Claude Code does it through a `SessionStart` hook out of the box, Codex CLI's equivalent (`plugin_hooks`) is still experimental, so on Codex the domains rely on being auto-invoked by description match instead, same as any other skill there.

---

MIT licensed, see [LICENSE](LICENSE).

<p align="center"><sub>Inspired by how <a href="https://github.com/DietrichGebert/ponytail">ponytail</a> is built. Same principle: the short answer someone with more scars than you already knows.</sub></p>
