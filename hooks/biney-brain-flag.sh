#!/bin/bash
# biney-brain — writes a flag file the statusline reads, mirroring the agent-skills pattern.
CONF="${CLAUDE_CONFIG_DIR:-$HOME/.claude}"
FLAG="$CONF/.biney-brain-active"
SETTINGS="$CONF/settings.json"

if grep -q '"biney-brain@biney-brain"[[:space:]]*:[[:space:]]*true' "$SETTINGS" 2>/dev/null; then
  printf 'on' > "$FLAG"
else
  rm -f "$FLAG"
fi
