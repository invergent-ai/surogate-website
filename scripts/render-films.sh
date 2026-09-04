#!/usr/bin/env bash
# Render every tutorial to films/ as a YouTube-ready MP4.
#
# Encode settings live in remotion.config.ts so a one-off `remotion render`
# produces the same file as this script does.
#
# Usage:
#   bash scripts/render-films.sh              # every composition
#   bash scripts/render-films.sh t24-sft t29-hub   # just these
set -euo pipefail

cd "$(dirname "$0")/.."
mkdir -p films

if [ "$#" -gt 0 ]; then
  ids=("$@")
else
  # Ask Remotion what exists rather than keeping a second list in sync.
  mapfile -t ids < <(npx remotion compositions remotion/index.ts 2>/dev/null \
    | awk '/^t[0-9]+-/ {print $1}')
fi

total=${#ids[@]}
i=0
for id in "${ids[@]}"; do
  i=$((i + 1))
  printf '\n[%d/%d] %s\n' "$i" "$total" "$id"
  # --color-space is a flag, not a config setting: Config.setColorSpace is
  # ignored in Remotion 4.0.516 and the file comes out full-range yuvj420p.
  npx remotion render remotion/index.ts "$id" "films/${id}.mp4" \
    --color-space=bt709 --log=error
done

printf '\nDone — %d file(s) in films/\n' "$total"
ls -la films/*.mp4 2>/dev/null | awk '{printf "  %-34s %s\n", $9, $5}'
