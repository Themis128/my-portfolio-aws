#!/usr/bin/env bash
set -euo pipefail
APP_ID="${APP_ID:-d3gpsu0f51cpej}"
BRANCH="${BRANCH:-master}"
DOMAIN="baltzakisthemis.com"
OLD_CNAME="dyny3hb2l9m7u.cloudfront.net"
LOG="./amplify-domain-monitor.log"
MAX_ATTEMPTS="${MAX_ATTEMPTS:-12}"
SLEEP_SEC="${SLEEP_SEC:-300}"

printf "[INFO] Monitor started for %s (app=%s branch=%s)\n" "$DOMAIN" "$APP_ID" "$BRANCH" | tee -a "$LOG"

for i in $(seq 1 "$MAX_ATTEMPTS"); do
  ts=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
  echo "[$ts] Attempt $i" | tee -a "$LOG"
  c1=$(dig +short www.$DOMAIN @8.8.8.8 || true)
  a1=$(dig +short $DOMAIN A @8.8.8.8 || true)
  echo "DNS www: ${c1:-<none>}" | tee -a "$LOG"
  echo "DNS apex A: ${a1:-<none>}" | tee -a "$LOG"

  try=false
  if [[ -z "$c1" ]]; then
    echo "No CNAME found for www; will attempt domain association" | tee -a "$LOG"
    try=true
  elif [[ "$c1" != *"$OLD_CNAME"* ]]; then
    echo "www CNAME no longer points to $OLD_CNAME; attempting domain association" | tee -a "$LOG"
    try=true
  else
    echo "www still points to $OLD_CNAME; sleeping $SLEEP_SEC seconds" | tee -a "$LOG"
  fi

  if $try; then
    echo "Running: aws amplify create-domain-association --app-id $APP_ID --domain-name $DOMAIN --sub-domain-settings '[{\"prefix\":\"\",\"branchName\":\"$BRANCH\"},{\"prefix\":\"www\",\"branchName\":\"$BRANCH\"}]'" | tee -a "$LOG"
    if aws amplify create-domain-association --app-id "$APP_ID" --domain-name "$DOMAIN" --sub-domain-settings "[{\"prefix\":\"\",\"branchName\":\"$BRANCH\"},{\"prefix\":\"www\",\"branchName\":\"$BRANCH\"}]" >>"$LOG" 2>&1; then
      echo "[$(date -u +"%Y-%m-%dT%H:%M:%SZ")] Create succeeded" | tee -a "$LOG"
      exit 0
    else
      echo "[$(date -u +"%Y-%m-%dT%H:%M:%SZ")] Create failed; will retry later" | tee -a "$LOG"
    fi
  fi

  sleep "$SLEEP_SEC"
done

echo "Timed out after $MAX_ATTEMPTS attempts" | tee -a "$LOG"
exit 2
