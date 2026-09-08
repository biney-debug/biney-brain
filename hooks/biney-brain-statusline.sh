#!/bin/bash
# biney-brain — statusline badge, mirrors agent-skills-statusline.sh hardening.
FLAG="${CLAUDE_CONFIG_DIR:-$HOME/.claude}/.biney-brain-active"

[ -L "$FLAG" ] && exit 0
[ ! -f "$FLAG" ] && exit 0

printf '\033[38;5;141m[BINEY-BRAIN]\033[0m'
