#!/usr/bin/env bash
# Generate a changelog from git history. Plain shell and awk, 0 EUR.
# Usage:
#   bash scripts/changelog.sh            whole history, newest first, grouped by date
#   bash scripts/changelog.sh <ref>      only commits after <ref>
set -euo pipefail

args=(--no-merges --date=short --pretty=format:'%ad%x09%h%x09%s')
if [ "${1:-}" != "" ]; then
  args=("${1}..HEAD" "${args[@]}")
fi

git log "${args[@]}" | awk -F'\t' '
  $1 != day {
    if (NR > 1) print ""
    day = $1
    print "## " day
    print ""
  }
  { print "- `" $2 "` " $3 }
'
echo
