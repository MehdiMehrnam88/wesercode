#!/usr/bin/env bash
set -euo pipefail

# Low-disk STRATO release flow.
# This script is included in the source ZIP. Run it from the extracted project
# on the STRATO server. It NEVER deletes the production env file.

APP_ROOT="/var/www/wesercode"
ENV_FILE="$APP_ROOT/.env.production"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ZIP_FILE="${1:-}"
STAGE_ROOT="$(mktemp -d /tmp/wesercode-build-XXXXXX)"

cleanup() {
  rm -rf "$STAGE_ROOT"
}
trap cleanup EXIT

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Production environment file not found: $ENV_FILE" >&2
  echo "Deployment stopped so the STRATO env file cannot be lost." >&2
  exit 1
fi

# Copy the source package into a temporary build area.
# Exclude old generated/runtime data if this script is ever run from the live app root.
mkdir -p "$STAGE_ROOT"
cp -a "$SOURCE_ROOT"/. "$STAGE_ROOT"/
rm -rf "$STAGE_ROOT/node_modules" "$STAGE_ROOT/.next"

# Use the existing server env only during the Linux build.
install -m 600 "$ENV_FILE" "$STAGE_ROOT/.env.production"
chown -R wesercode:wesercode "$STAGE_ROOT"
cd "$STAGE_ROOT"

npm ci
npm run build

# Next.js standalone needs the public and static assets copied into the runtime.
rm -rf .next/standalone/public .next/standalone/.next/static
cp -a public .next/standalone/public
cp -a .next/static .next/standalone/.next/static

# Replace only the running runtime. The existing env file stays where it is.
systemctl stop wesercode
rm -rf "$APP_ROOT/.next/standalone.new"
mkdir -p "$APP_ROOT/.next"
cp -a .next/standalone "$APP_ROOT/.next/standalone.new"
chown -R wesercode:wesercode "$APP_ROOT/.next/standalone.new"
rm -rf "$APP_ROOT/.next/standalone"
mv "$APP_ROOT/.next/standalone.new" "$APP_ROOT/.next/standalone"
systemctl start wesercode

# Small-server cleanup: keep only the environment file and running runtime.
# Do not delete .env.production under any circumstances.
find "$APP_ROOT" -mindepth 1 -maxdepth 1 \
  ! -name '.env.production' \
  ! -name '.next' \
  -exec rm -rf {} +
find "$APP_ROOT/.next" -mindepth 1 -maxdepth 1 \
  ! -name 'standalone' \
  -exec rm -rf {} +

# Remove the extracted source package when it lives outside the live root.
if [[ "$SOURCE_ROOT" != "$APP_ROOT" && "$SOURCE_ROOT" == /tmp/* ]]; then
  rm -rf "$SOURCE_ROOT"
fi

# The uploaded ZIP is optional as the first argument; remove it after success.
if [[ -n "$ZIP_FILE" && "$ZIP_FILE" == /tmp/* ]]; then
  rm -f "$ZIP_FILE"
fi

systemctl --no-pager --full status wesercode
printf '\nDeployment complete. Preserved: %s\n' "$ENV_FILE"
printf 'Runtime directory: %s/.next/standalone\n' "$APP_ROOT"
