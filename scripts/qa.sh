#!/usr/bin/env bash
# Run the project's deterministic checks locally and print only failures.
# Usage: bash scripts/qa.sh [fast]
#   fast  skips the production build (format, lint and astro check only)
# Exit code is non-zero if any check fails. No paid services, no network
# beyond what npm already needs.
set -uo pipefail

cd "$(dirname "$0")/.."

if [ ! -d node_modules ]; then
  echo "node_modules missing. Run: npm ci"
  exit 2
fi

fail=0
tmp="$(mktemp)"
trap 'rm -f "$tmp"' EXIT

run() {
  local name="$1"
  shift
  if "$@" >"$tmp" 2>&1; then
    echo "PASS  $name"
  else
    echo "FAIL  $name"
    tail -n 40 "$tmp"
    fail=1
  fi
}

run "git diff --check" git diff --check
run "prettier format:check" npm run --silent format:check
run "eslint" npm run --silent lint
run "astro check" npm run --silent check

if [ "${1:-}" != "fast" ]; then
  run "production build" npm run --silent build
fi

if [ "$fail" -eq 0 ]; then
  echo "ALL CHECKS PASSED"
else
  echo "CHECKS FAILED (see above)"
fi
exit "$fail"
