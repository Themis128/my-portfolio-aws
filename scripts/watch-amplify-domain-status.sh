#!/usr/bin/env bash
set -euo pipefail
APP_ID="${APP_ID:-d3gpsu0f51cpej}"
DOMAIN="baltzakisthemis.com"
LOG="./amplify-domain-status.log"
SLEEP_SEC="${SLEEP_SEC:-60}"
MAX_ATTEMPTS="${MAX_ATTEMPTS:-1440}"

printf "[INFO] Starting Amplify domain-status watcher for %s (app=%s)\n" "$DOMAIN" "$APP_ID" | tee -a "$LOG"

for i in $(seq 1 "$MAX_ATTEMPTS"); do
  ts=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
  status=$(aws amplify get-domain-association --app-id "$APP_ID" --domain-name "$DOMAIN" --query 'domainAssociation.domainStatus' --output text 2>/dev/null || echo "<missing>")
  echo "[$ts] Attempt $i - domainStatus=$status" | tee -a "$LOG"

  if [[ "$status" == "ACTIVE" ]]; then
    echo "[$ts] Domain association is ACTIVE" | tee -a "$LOG"
    touch ./amplify-domain-active
    # Optionally send a desktop notification if available (ignored if not)
    if command -v notify-send >/dev/null 2>&1; then
      notify-send "Amplify domain ACTIVE" "$DOMAIN is ACTIVE for app $APP_ID"
    fi
    exit 0
  fi

  if [[ "$status" == "FAILED" ]]; then
    # record reason
    reason=$(aws amplify get-domain-association --app-id "$APP_ID" --domain-name "$DOMAIN" --query 'domainAssociation.statusReason' --output text 2>/dev/null || echo "<no-reason>")
    echo "[$ts] DomainStatus FAILED - reason: $reason" | tee -a "$LOG"
  fi

  sleep "$SLEEP_SEC"
done

echo "Timed out waiting for ACTIVE after $MAX_ATTEMPTS attempts" | tee -a "$LOG"
exit 2
