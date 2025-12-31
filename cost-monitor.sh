#!/bin/bash
# AWS Cost Monitoring Script
# Run this monthly to review AWS costs and usage

echo "=== AWS Cost Report ==="
# Get first day of current month
START_DATE=$(date +%Y-%m-01)
END_DATE=$(date +%Y-%m-%d)

echo "Period: ${START_DATE} to ${END_DATE}"
echo "Generated: $(date)"
echo ""

echo "💰 Total Monthly Cost:"
aws ce get-cost-and-usage \
  --time-period Start=${START_DATE},End=${END_DATE} \
  --metrics "BlendedCost" \
  --granularity "MONTHLY" \
  --query 'ResultsByTime[0].Total.BlendedCost.Amount' \
  --output text 2>/dev/null || echo "Unable to fetch total cost"

echo ""
echo "📊 Cost Breakdown by Service:"
aws ce get-cost-and-usage \
  --time-period Start=${START_DATE},End=${END_DATE} \
  --metrics "BlendedCost" \
  --granularity "MONTHLY" \
  --group-by Type=DIMENSION,Key=SERVICE \
  --query 'ResultsByTime[0].Groups[].[Keys[0],Metrics.BlendedCost.Amount]' \
  --output table 2>/dev/null || echo "Unable to fetch service breakdown"

echo ""
echo "🎯 Portfolio-Related Services:"
SERVICES=("AWS Amplify" "Amazon Simple Email Service" "AWS AppSync" "Amazon DynamoDB" "AWS Lambda" "Amazon CloudFront")

for service in "${SERVICES[@]}"; do
    COST=$(aws ce get-cost-and-usage \
      --time-period Start=${START_DATE},End=${END_DATE} \
      --metrics "BlendedCost" \
      --granularity "MONTHLY" \
      --group-by Type=DIMENSION,Key=SERVICE \
      --query "ResultsByTime[0].Groups[?Keys[0]=='${service}'].Metrics.BlendedCost.Amount" \
      --output text 2>/dev/null)
    if [ ! -z "$COST" ] && [ "$COST" != "None" ]; then
        printf "%-30s \$%s\n" "$service:" "$COST"
    fi
done

echo ""
echo "⚠️  Cost Alerts:"
TOTAL_COST=$(aws ce get-cost-and-usage \
  --time-period Start=${START_DATE},End=${END_DATE} \
  --metrics "BlendedCost" \
  --granularity "MONTHLY" \
  --query 'ResultsByTime[0].Total.BlendedCost.Amount' \
  --output text 2>/dev/null)

if [ ! -z "$TOTAL_COST" ]; then
    if (( $(echo "$TOTAL_COST > 50" | bc -l 2>/dev/null || echo "0") )); then
        echo "🚨 WARNING: Monthly cost exceeded \$50!"
    elif (( $(echo "$TOTAL_COST > 100" | bc -l 2>/dev/null || echo "0") )); then
        echo "🚨 CRITICAL: Monthly cost exceeded \$100!"
    else
        echo "✅ Costs are within normal range (<\$50/month)"
    fi
fi

echo ""
echo "💡 Cost Optimization Tips:"
echo "- Amplify: ~\$3-5/month for hosting (expected)"
echo "- SES: Free for first 62,000 emails/month"
echo "- CloudWatch: ~\$7/month for logs (can be optimized)"
echo "- Review unused resources monthly"
echo "- Set up billing alerts in AWS Console"

echo ""
echo "🔗 Useful Links:"
echo "- AWS Cost Explorer: https://console.aws.amazon.com/cost-management/home"
echo "- AWS Budgets: https://console.aws.amazon.com/billing/home#/budgets"
echo "- Cost Optimization Hub: https://console.aws.amazon.com/cost-management/home#/cost-optimization"