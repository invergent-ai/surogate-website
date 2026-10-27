#!/usr/bin/env bash
# Cuts the site's films, silent loops and posters from the rendered use-case shorts
# (../videos/renders/shorts, made with the product-videos playbook on the local stack).
#   bash scripts/cut-media.sh
set -euo pipefail
SRC=${SRC:-../videos/renders/shorts}
OUT=public/media/films
mkdir -p "$OUT"

# Where each loop starts, in seconds: past the title card, on the moment the film is about.
declare -A AT=( [ursu-whiteboard]=8 [clarke-knee-photo]=6 [vandijk-approval]=13 [pop-glossary-conflict]=6
                [mette-first-buyer]=9 [ortega-monday-leads]=6 [vandijk-ml-scoreboard]=6 )

for f in "$SRC"/*-1x1.mp4; do
  slug=$(basename "$f" -1x1.mp4); slug=${slug#??-}
  at=${AT[$slug]:-6}
  ffmpeg -y -v error -i "$f" -vf scale=720:720 -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p \
    -movflags +faststart -c:a aac -b:a 96k "$OUT/$slug.mp4"
  ffmpeg -y -v error -ss "$at" -t 6 -i "$f" -an -vf scale=480:480,fps=24 -c:v libx264 -crf 30 -preset slow \
    -pix_fmt yuv420p -movflags +faststart "$OUT/$slug-loop.mp4"
  ffmpeg -y -v error -ss "$at" -i "$f" -frames:v 1 -vf scale=720:720 -q:v 4 "$OUT/$slug.jpg"
  echo "$slug $(du -h "$OUT/$slug.mp4" | cut -f1) loop $(du -h "$OUT/$slug-loop.mp4" | cut -f1)"
done
