#!/bin/bash
# biney-brain — statusline badge: on if the plugin is enabled in settings.json.
SETTINGS="${CLAUDE_CONFIG_DIR:-$HOME/.claude}/settings.json"

grep -q '"biney-brain@biney-brain"[[:space:]]*:[[:space:]]*true' "$SETTINGS" 2>/dev/null || exit 0

printf '\033[38;5;141m[BINEY-BRAIN]\033[0m'
