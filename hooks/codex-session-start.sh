#!/bin/bash
# biney-brain, Codex CLI SessionStart hook: loads the router into every new
# session, mirroring session-start.sh for Claude Code. Codex has no
# plugin-root variable, so this reads the skill from its fixed install path
# (~/.codex/skills/) instead of a path relative to this script.
CODEX_HOME="${CODEX_HOME:-$HOME/.codex}"
SKILL="$CODEX_HOME/skills/biney-brain/SKILL.md"

[ -f "$SKILL" ] || exit 0

printf 'biney-brain loaded. Before deciding stack, scope, security, tests, git, or how much to delegate to the AI, check whether a biney-brain-* domain applies.\n\n'
awk 'BEGIN{fm=0} /^---$/{fm++; next} fm>=2{print}' "$SKILL"
