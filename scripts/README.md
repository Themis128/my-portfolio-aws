# Scripts

## amplify-deploy-ssm.sh

This script helps automate the last steps needed for Amplify Gen 2 deployments:
- Add required SSM parameters under the path `/amplify/<APP_ID>/<BRANCH>/...`
- Pull/push backend with Amplify CLI (if needed)
- Trigger an Amplify redeploy for the specified branch

Usage example:

```bash
APP_ID=d3gpsu0f51cpej \
BRANCH=master \
ENV_NAME=master \
REGION=eu-central-1 \
SLACK_WEBHOOK_URL="https://hooks.slack.com/..." \
SEND_EMAIL_FROM="noreply@cloudless.gr" \
./scripts/amplify-deploy-ssm.sh
```

Requirements:
- AWS CLI configured with credentials that have SSM & Amplify permissions
- Amplify CLI installed (`npm i -g @aws-amplify/cli`)

Permissions needed (minimum):
- ssm:PutParameter, ssm:GetParameter
- amplify:StartDeployment, amplify:GetApp
- (If running `amplify pull`/`amplify push`) Amplify related permissions for the environment

If you'd like, I can commit these files to the repo (or open a PR). I can also run the script here if you provide temporary AWS credentials (access key + secret + session token).