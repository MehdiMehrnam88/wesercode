#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="$ROOT_DIR/public/media"
LIGHT_URL='https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260815_034306_165449ef-7d2e-4e81-850f-1939c5cb442d.mp4'
DARK_HLS_URL='https://stream.mux.com/Jwr2RhmsNrd6GEspBNgm02vJsRZAGlaoQIh4AucGdASw.m3u8'

mkdir -p "$OUT_DIR"

command -v curl >/dev/null 2>&1 || { echo "curl is required." >&2; exit 1; }
command -v ffmpeg >/dev/null 2>&1 || { echo "ffmpeg is required for the dark HLS-to-MP4 conversion." >&2; exit 1; }

echo "Downloading light-theme background..."
curl -fL --retry 3 --retry-delay 2 "$LIGHT_URL" -o "$OUT_DIR/light-background.mp4"

echo "Downloading/converting dark-theme HLS background..."
ffmpeg -y -i "$DARK_HLS_URL" -c:v libx264 -preset medium -crf 24 -an -movflags +faststart "$OUT_DIR/dark-background.mp4"

echo "Done. Local files written to $OUT_DIR"
ls -lh "$OUT_DIR/light-background.mp4" "$OUT_DIR/dark-background.mp4"
