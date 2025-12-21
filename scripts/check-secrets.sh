#!/usr/bin/env bash
set -euo pipefail

# Exit 0 quickly if no staged files
staged_files=$(git diff --cached --name-only --diff-filter=ACM | tr '\n' ' ')
if [ -z "$staged_files" ]; then
  exit 0
fi

echo "Running secrets scan on staged files..."
fail=0
report_file=secrets-report.txt
: > "$report_file"

# Patterns to detect
patterns=(
  "ctx7sk-"
  "CONTEXT7_API_KEY"
  "KAGGLE_KEY"
  "KAGGLE_USERNAME"
  "kaggle.json"
  "AWS_SECRET_ACCESS_KEY"
  "AWS_ACCESS_KEY_ID"
  "SECRET_KEY"
  "SECRET="
  "PASSWORD="
  "-----BEGIN PRIVATE KEY-----"
)

 echo "Secrets scan report" >> "$report_file"
 echo "Repository: $(git rev-parse --show-toplevel)" >> "$report_file"
 echo "Branch: ${GITHUB_REF:-$(git rev-parse --abbrev-ref HEAD)}" >> "$report_file"
 echo "Commit: $(git rev-parse --short HEAD)" >> "$report_file"
 echo "---" >> "$report_file"

for f in $staged_files; do
  # skip .env.example and allowed files
  if [[ "$f" == ".env.example" ]]; then
    continue
  fi
  if [[ ! -f "$f" ]]; then
    continue
  fi
  for p in "${patterns[@]}"; do
    if grep -nH -I --line-number -E "$p" "$f" >/dev/null 2>&1; then
      echo "Potential secret detected in staged file: $f (pattern: $p)" | tee -a "$report_file"
      grep -nH -I --line-number -E "$p" "$f" | tee -a "$report_file" || true
      echo "" >> "$report_file"
      fail=1
    fi
  done
done

if [ "$fail" -eq 1 ]; then
  echo "\nCommit aborted: secrets detected. Please remove secrets from staged files and use environment variables or add them to .env (ignored by git)."
  echo "Secrets found. Report written to $report_file"
  exit 1
fi

echo "Secrets scan passed."
exit 0
