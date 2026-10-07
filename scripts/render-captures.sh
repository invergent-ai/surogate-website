#!/usr/bin/env bash
# Render the Rune Labs films from their raw captures (labs/spaces/film -> public/labs/films/raw/<slug>.{mp4,json}).
#   bash scripts/render-captures.sh inbox three-way-match ...
# For each slug: public/labs/films/<slug>.mp4 (the film), <slug>-loop.mp4 (5 s, silent, for the card), <slug>.jpg.
set -euo pipefail
cd "$(dirname "$0")/.."
OUT=public/labs/films
for slug in "$@"; do
  track=$OUT/raw/$slug.json
  # several render lanes may share a list: a film is rendered once, by whichever lane takes it first
  src=$track; [ -f "$OUT/raw/$slug.reads.json" ] && src=$OUT/raw/$slug.reads.json
  [ "$OUT/$slug.mp4" -nt "$src" ] && { echo "skip $slug (rendered)"; continue; }
  mkdir "$OUT/raw/$slug.lock" 2>/dev/null || { echo "skip $slug (taken)"; continue; }
  trap 'rmdir "$OUT/raw/$slug.lock" 2>/dev/null || true' EXIT
  url=huggingface.co/spaces/surogate/$slug
  master=$(mktemp -t "$slug").mp4
  # a run that cannot be replayed through its page is filmed read by read (labs spaces/film/reads.py)
  comp=capture; [ -f "$OUT/raw/$slug.reads.json" ] && comp=reads
  nice -n 10 npx remotion render remotion/index.ts $comp "$master" --props="{\"slug\":\"$slug\",\"url\":\"$url\"}" \
    --color-space=bt709 --log=error --concurrency=1
  # the film: 1080p, small enough for the web, starts playing before it has all arrived
  nice -n 10 ffmpeg -threads 2 -loglevel error -y -i "$master" -c:v libx264 -preset slow -crf 22 -pix_fmt yuv420p -movflags +faststart -an "$OUT/$slug.mp4"
  at=$(node -e "const fs=require('fs');if(!fs.existsSync('$track')){console.log('6.00');process.exit()}
const t=require('./$track');const m=t.events.find(e=>e.type==='loop');console.log(Math.max(0,(m?m.t:t.duration/3)-1).toFixed(2))")
  nice -n 10 ffmpeg -threads 2 -loglevel error -y -ss "$at" -t 5 -i "$master" -vf scale=960:-2 -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart -an "$OUT/$slug-loop.mp4"
  nice -n 10 ffmpeg -threads 2 -loglevel error -y -ss "$(node -e "console.log(($at+3).toFixed(2))")" -i "$master" -frames:v 1 -vf scale=1200:-2 -q:v 3 "$OUT/$slug.jpg"
  rm -f "$master"
  ls -lh "$OUT/$slug.mp4" "$OUT/$slug-loop.mp4" "$OUT/$slug.jpg" | awk '{print $5, $9}'
done
