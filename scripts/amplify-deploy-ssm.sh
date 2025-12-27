#!/usr/bin/env bash
set -euo pipefail

# amplify-deploy-ssm.sh
# Adds required SSM parameters for Amplify backend + triggers an Amplify redeploy
# Usage:
#   APP_ID=d3gpsu0f51cpej BRANCH=master ENV_NAME=master REGION=eu-central-1 \
#     SLACK_WEBHOOK_URL="https://hooks.slack.com/..." SEND_EMAIL_FROM="noreply@cloudless.gr" \
#     ./scripts/amplify-deploy-ssm.sh

: "${APP_ID:?set APP_ID (Amplify App Id)}"
: "${BRANCH:?set BRANCH (Git branch name)}"
: "${ENV_NAME:?set ENV_NAME (Amplify env name)}"
: "${REGION:=eu-central-1}"
: "${SLACK_WEBHOOK_URL:?set SLACK_WEBHOOK_URL}"
: "${SEND_EMAIL_FROM:?set SEND_EMAIL_FROM}"

echo "Starting Amplify SSM + deploy helper"

echo "Checking AWS CLI..."
if ! command -v aws >/dev/null 2>&1; then
  echo "Install AWS CLI and configure credentials (aws configure)" >&2
  exit 1
fi

echo "Checking Amplify CLI..."
if ! command -v amplify >/dev/null 2>&1; then
  echo "Install Amplify CLI: npm install -g @aws-amplify/cli" >&2
  exit 1
fi

SSM_BASE="/amplify/${APP_ID}/${BRANCH}"

echo "Putting SSM params to ${SSM_BASE} ..."
aws ssm put-parameter --name "${SSM_BASE}/SLACK_WEBHOOK_URL" --value "${SLACK_WEBHOOK_URL}" --type SecureString --overwrite --region "${REGION}"
aws ssm put-parameter --name "${SSM_BASE}/SEND_EMAIL_FROM" --value "${SEND_EMAIL_FROM}" --type String --overwrite --region "${REGION}"

# Add any additional SSM params you need here, for example SES config or other API keys
# aws ssm put-parameter --name "${SSM_BASE}/OTHER_VAR" --value "value" --type SecureString --overwrite --region "${REGION}"

# Attempt to pull the backend environment so Amplify Console associates branch with backend
echo "Attempting to pull Amplify backend (this will only succeed if the backend app exists and is accessible)..."
if ! amplify pull --appId "${APP_ID}" --envName "${ENV_NAME}" --yes; then
  echo "amplify pull failed or not necessary; ensure the backend environment exists and try connecting it in the Amplify Console if needed." >&2
else
  echo "Amplify pull succeeded (local files updated).";
fi

# Push any local changes (if any) - harmless if nothing to push
echo "Running amplify push to sync local backend (if any changes were made)..."
if ! amplify push --yes; then
  echo "amplify push failed or no changes to push.";
else
  echo "amplify push finished.";
fi

# Start a redeploy in Amplify Console
echo "Starting Amplify redeploy for branch ${BRANCH}..."
aws amplify start-deployment --app-id "${APP_ID}" --branch-name "${BRANCH}" --region "${REGION}"

echo "Done. Check the Amplify Console for build logs and status: https://console.aws.amazon.com/amplify/home?region=${REGION}#/d${APP_ID}"
