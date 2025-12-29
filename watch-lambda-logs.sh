#!/bin/bash

# Real-time Lambda Log Viewer
# Watches Lambda function logs in real-time

echo "╔════════════════════════════════════════════════════════╗"
echo "║        Lambda Function Real-Time Log Viewer           ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Check AWS CLI
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI not installed"
    echo ""
    echo "Install with:"
    echo "  curl 'https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip' -o 'awscliv2.zip'"
    echo "  unzip awscliv2.zip"
    echo "  sudo ./aws/install"
    exit 1
fi

REGION="eu-central-1"

# Find Lambda function name
echo "🔍 Searching for contactHandler Lambda function..."
FUNCTION_NAME=$(aws lambda list-functions \
    --region $REGION \
    --query 'Functions[?contains(FunctionName, `contactHandler`)].FunctionName' \
    --output text 2>/dev/null | head -1)

if [ -z "$FUNCTION_NAME" ]; then
    echo "❌ Could not find contactHandler Lambda function"
    echo ""
    echo "Manual check:"
    echo "  aws lambda list-functions --region $REGION"
    exit 1
fi

echo "✅ Found: $FUNCTION_NAME"
echo ""

# Get log group name
LOG_GROUP="/aws/lambda/$FUNCTION_NAME"

echo "📊 Log Group: $LOG_GROUP"
echo "📍 Region: $REGION"
echo ""
echo "Watching logs... (Press Ctrl+C to stop)"
echo "══════════════════════════════════════════════════════════"
echo ""

# Start tailing logs
aws logs tail "$LOG_GROUP" \
    --region $REGION \
    --follow \
    --format short \
    --filter-pattern "" \
    2>/dev/null || {
    echo "❌ Failed to tail logs"
    echo ""
    echo "Possible issues:"
    echo "  - AWS credentials not configured"
    echo "  - No recent log entries"
    echo "  - Permission denied"
    echo ""
    echo "Try manual check:"
    echo "  aws logs describe-log-streams \\"
    echo "    --log-group-name $LOG_GROUP \\"
    echo "    --region $REGION"
}
