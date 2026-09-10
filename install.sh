#!/usr/bin/env bash
# Install the UI Intelligence skills and verify tooling.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEST="${1:-$HOME/.claude/skills}"

printf '\n\033[1mUI Intelligence\033[0m  %s\n\n' "$ROOT"

mkdir -p "$DEST"
for skill in "$ROOT"/skills/*/; do
  name="$(basename "$skill")"
  target="$DEST/$name"
  if [ -e "$target" ] && [ ! -L "$target" ]; then
    printf '  \033[33mskip\033[0m  %s — a real directory already exists at %s\n' "$name" "$target"
    continue
  fi
  ln -sfn "$skill" "$target"
  printf '  \033[32mok\033[0m    %s → %s\n' "$name" "$target"
done

printf '\n\033[1mTooling\033[0m\n'
if ! command -v node >/dev/null 2>&1; then
  printf '  \033[31mmissing\033[0m  node — required (v20+)\n'
else
  printf '  \033[32mok\033[0m       node %s\n' "$(node -v)"
fi

if node -e "
  const {execSync}=require('node:child_process'), {createRequire}=require('node:module');
  try { require('playwright') } catch { createRequire(execSync('npm root -g').toString().trim()+'/')('playwright') }
" >/dev/null 2>&1; then
  printf '  \033[32mok\033[0m       playwright\n'
else
  printf '  \033[33mmissing\033[0m  playwright — screenshot and audit tools need it:\n'
  printf '                 npm i -g playwright && npx playwright install chromium\n'
fi

if node "$ROOT/tools/contrast.mjs" "#767676" white >/dev/null 2>&1; then
  printf '  \033[32mok\033[0m       contrast.mjs\n'
else
  printf '  \033[31mfail\033[0m     contrast.mjs\n'
fi

cat <<EOF

$(printf '\033[1mAdd to ~/.claude/CLAUDE.md\033[0m')

## UI work
Any UI task — app, dashboard, internal tool, landing page, component — read
\`$ROOT/START-HERE.md\` first and follow its procedure. Invoke the \`ui-intelligence\` skill.
Render the result (\`node $ROOT/tools/shot.mjs <url> --widths 1440,390\`), open the
screenshots and look at them, then score against \`anti-patterns/vibecode-rubric.md\` before
calling it done. Target ≤2.

$(printf '\033[2mFull block, and the Codex variant: AGENTS.md\033[0m')
$(printf '\033[2mIf you cloned elsewhere: export UI_LIBRARY="%s"\033[0m' "$ROOT")

EOF
