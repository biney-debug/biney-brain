#!/bin/bash
# biney-brain — SessionStart hook: loads the router into every new session,
# so the criteria is present from the start instead of depending on Claude
# noticing the skill matches and invoking it on its own.
DIR="$(cd "$(dirname "$0")" && pwd)"
SKILL="$DIR/../skills/biney-brain/SKILL.md"

[ -f "$SKILL" ] || exit 0

printf 'biney-brain loaded. Before deciding stack, scope, security, tests, git, or how much to delegate to the AI, check whether a biney-brain-* domain applies.\n\n'
awk 'BEGIN{fm=0} /^---$/{fm++; next} fm>=2{print}' "$SKILL"
