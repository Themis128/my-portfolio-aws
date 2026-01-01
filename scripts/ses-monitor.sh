#!/bin/bash
# SES Monitoring Script
# Run this monthly to check SES usage and costs

echo "=== SES Usage Report ==="
echo "Date: $(date)"
echo ""

echo "📧 SES Send Quota:"
aws ses get-send-quota --output table
echo ""

echo "📈 Recent SES Activity (last 5 data points):"
aws ses get-send-statistics | jq '.SendDataPoints | sort_by(.Timestamp) | reverse | .[0:5]' 2>/dev/null || echo "Unable to fetch send statistics"
echo ""

echo "💰 Monthly SES Cost:"
# Get first day of current month
START_DATE=$(date +%Y-%m-01)
END_DATE=$(date +%Y-%m-%d)

aws ce get-cost-and-usage \
  --time-period Start=${START_DATE},End=${END_DATE} \
  --metrics BlendedCost \
  --granularity MONTHLY \
  --group-by Type=DIMENSION,Key=SERVICE \
  --query 'ResultsByTime[0].Groups[?Keys[0]==`Amazon Simple Email Service`]' \
  --output table 2>/dev/null || echo "Unable to fetch cost data - check AWS credentials"

echo ""
echo "⚠️  Alerts:"
QUOTA=$(aws ses get-send-quota --query 'SentLast24Hours' --output text 2>/dev/null)
if [ ! -z "$QUOTA" ] && [ "$QUOTA" != "None" ]; then
    # Convert to integer for comparison
    QUOTA_INT=$(printf "%.0f" "$QUOTA" 2>/dev/null || echo "0")
    if [ "$QUOTA_INT" -gt 40000 ]; then
        echo "🚨 WARNING: SES usage is over 80% of daily limit!"
    elif [ "$QUOTA_INT" -gt 45000 ]; then
        echo "🚨 CRITICAL: SES usage is over 90% of daily limit!"
    else
        echo "✅ SES usage is within normal limits"
    fi
else
    echo "ℹ️  Unable to check SES quota"
fi

echo ""
echo "📋 Recommendations:"
echo "- Monitor daily usage if expecting high traffic"
echo "- Consider SES dedicated IP if sending >50k emails/month"
echo "- Review bounce/complaint rates in SES console if issues arise"