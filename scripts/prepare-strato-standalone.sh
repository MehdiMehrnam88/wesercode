#!/usr/bin/env bash
set -euo pipefail

npm ci
npm run build

rm -rf .next/standalone/public .next/standalone/.next/static
cp -R public .next/standalone/public
cp -R .next/static .next/standalone/.next/static

echo "Standalone build ready in .next/standalone"
echo "Copy that folder and your .env.production to the STRATO server."
