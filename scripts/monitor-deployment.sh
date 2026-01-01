#!/bin/bash

# Monitor Amplify Deployment Status
# This script checks the status of your Amplify deployment

echo "=========================================="
echo " Amplify Deployment Monitor"
echo "=========================================="
echo ""

# Check if AWS CLI is configured
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI not found. Please install AWS CLI to use this script."
    echo ""
    echo "To install AWS CLI:"
    echo "  https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
    echo ""
    echo "Alternative: Monitor manually in AWS Console"
    echo "  https://console.aws.amazon.com/amplify"
    exit 1
fi

# Get Amplify App ID from team-provider-info.json or amplify_outputs.json
APP_ID=""
if [ -f "amplify/team-provider-info.json" ]; then
    APP_ID=$(grep -o '"AmplifyAppId":[[:space:]]*"[^"]*"' amplify/team-provider-info.json | cut -d'"' -f4)
fi

if [ -z "$APP_ID" ] && [ -f "amplify_outputs.json" ]; then
    APP_ID=$(grep -o '"app_id":"[^"]*"' amplify_outputs.json | cut -d'"' -f4)
fi

if [ -z "$APP_ID" ]; then
    echo "⚠️  Could not find app_id in amplify_outputs.json or team-provider-info.json"
    echo "Please check AWS Console manually"
    exit 1
fi

REGION="eu-central-1"  # Your region

echo "📍 Checking deployment for App ID: $APP_ID"
echo "📍 Region: $REGION"
echo ""

# Get latest job
echo "🔍 Fetching latest deployment..."
LATEST_JOB=$(aws amplify list-jobs \
    --app-id "$APP_ID" \
    --branch-name master \
    --region "$REGION" \
    --max-items 1 \
    --query 'jobSummaries[0]' \
    --output json 2>&1)

if [ $? -ne 0 ]; then
    echo "❌ Failed to fetch deployment status"
    echo "$LATEST_JOB"
    echo ""
    echo "Please check manually at:"
    echo "https://console.aws.amazon.com/amplify"
    exit 1
fi

# Parse job details
JOB_ID=$(echo "$LATEST_JOB" | grep -o '"jobId":"[^"]*"' | cut -d'"' -f4)
STATUS=$(echo "$LATEST_JOB" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)
START_TIME=$(echo "$LATEST_JOB" | grep -o '"startTime":"[^"]*"' | cut -d'"' -f4)

echo "📦 Latest Deployment:"
echo "   Job ID: $JOB_ID"
echo "   Status: $STATUS"
echo "   Started: $START_TIME"
echo ""

# Show status with emoji
case $STATUS in
    "SUCCEED")
        echo "✅ Deployment SUCCESSFUL!"
        ;;
    "PENDING"|"RUNNING")
        echo "⏳ Deployment in progress..."
        echo ""
        echo "Monitoring... (Press Ctrl+C to stop)"
        
        # Monitor until complete
        while true; do
            sleep 10
            
            CURRENT_STATUS=$(aws amplify get-job \
                --app-id "$APP_ID" \
                --branch-name master \
                --job-id "$JOB_ID" \
                --region "$REGION" \
                --query 'job.summary.status' \
                --output text 2>&1)
            
            echo "Status: $CURRENT_STATUS"
            
            if [ "$CURRENT_STATUS" = "SUCCEED" ]; then
                echo ""
                echo "✅ Deployment completed successfully!"
                break
            elif [ "$CURRENT_STATUS" = "FAILED" ]; then
                echo ""
                echo "❌ Deployment failed!"
                break
            fi
        done
        ;;
    "FAILED")
        echo "❌ Deployment FAILED!"
        echo ""
        echo "Check logs at:"
        echo "https://$REGION.console.aws.amazon.com/amplify/home?region=$REGION#/$APP_ID"
        ;;
    *)
        echo "ℹ️  Status: $STATUS"
        ;;
esac

echo ""
echo "=========================================="
echo " Links"
echo "=========================================="
echo ""
echo "📊 Amplify Console:"
echo "   https://$REGION.console.aws.amazon.com/amplify/home?region=$REGION#/$APP_ID"
echo ""
echo "📝 CloudWatch Logs:"
echo "   https://$REGION.console.aws.amazon.com/cloudwatch/home?region=$REGION#logsV2:log-groups"
echo ""
echo "🔗 Your Live Site:"
echo "   Check Amplify Console for domain URL"
echo ""
