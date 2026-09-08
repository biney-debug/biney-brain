#!/bin/bash
# biney-brain, one-command installer for Codex CLI.
# Copies the skills into ~/.codex/skills/ (Codex's native skill discovery
# path) and registers a SessionStart hook so the router loads before the
# first message, mirroring what the Claude Code plugin does automatically
# on install. Safe to re-run: skills get overwritten, the hook entry is
# only added once.
set -e

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
CODEX_HOME="${CODEX_HOME:-$HOME/.codex}"

mkdir -p "$CODEX_HOME/skills" "$CODEX_HOME/hooks"

for skill in "$REPO_DIR"/skills/biney-brain*; do
  name="$(basename "$skill")"
  rm -rf "$CODEX_HOME/skills/$name"
  cp -r "$skill" "$CODEX_HOME/skills/$name"
done

cp "$REPO_DIR/hooks/codex-session-start.sh" "$CODEX_HOME/hooks/biney-brain-session-start.sh"

HOOK_COMMAND="bash \"$CODEX_HOME/hooks/biney-brain-session-start.sh\""

python3 - "$CODEX_HOME/hooks.json" "$HOOK_COMMAND" <<'PY'
import json
import sys

path, hook_command = sys.argv[1], sys.argv[2]

data = {}
try:
    with open(path) as f:
        content = f.read().strip()
    if content:
        data = json.loads(content)
except FileNotFoundError:
    pass

session_start = data.setdefault("hooks", {}).setdefault("SessionStart", [])

already = any(
    h.get("command") == hook_command
    for group in session_start
    for h in group.get("hooks", [])
)

if not already:
    session_start.append({
        "matcher": "startup|resume",
        "hooks": [
            {
                "type": "command",
                "command": hook_command,
                "timeout": 5,
                "statusMessage": "Loading biney-brain criteria...",
            }
        ],
    })
    with open(path, "w") as f:
        json.dump(data, f, indent=2)
        f.write("\n")
    print(f"Added biney-brain SessionStart hook to {path}")
else:
    print(f"biney-brain hook already present in {path}")
PY

echo "Skills installed in $CODEX_HOME/skills/biney-brain*"
echo "Restart Codex CLI (or start a new session) to load the router."
