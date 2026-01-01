# Amplify App Management Commands

# Check app status
aws amplify get-app --app-id d3gpsu0f51cpej

# List branches
aws amplify list-branches --app-id d3gpsu0f51cpej

# Check build jobs
aws amplify list-jobs --app-id d3gpsu0f51cpej --branch-name master

# Trigger manual build
aws amplify start-job --app-id d3gpsu0f51cpej --branch-name master --job-type RELEASE

# Set environment variables via CLI
aws amplify update-app --app-id d3gpsu0f51cpej --environment-variables 'NODE_VERSION=20,PNPM_VERSION=9.14.4,NEXT_TELEMETRY_DISABLED=1'
