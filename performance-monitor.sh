#!/bin/bash

# Performance Metrics Monitor
# Shows Lambda performance metrics and costs

echo "╔════════════════════════════════════════════════════════╗"
echo "║         Lambda Performance & Cost Monitor             ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Check AWS CLI
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI required"
    exit 1
fi

REGION="eu-central-1"
HOURS_BACK=24

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}📊 Fetching metrics for last $HOURS_BACK hours...${NC}"
echo ""

# Find Lambda function
FUNCTION_NAME=$(aws lambda list-functions \
    --region $REGION \
    --query 'Functions[?contains(FunctionName, `contacthandler`) || contains(FunctionName, `contact-handler`) || contains(FunctionName, `Contact`)].FunctionName' \
    --output text 2>/dev/null | head -1)

if [ -z "$FUNCTION_NAME" ]; then
    echo -e "${RED}❌ Contact handler Lambda not found${NC}"
    echo -e "${YELLOW}Available functions:${NC}"
    aws lambda list-functions \
        --region $REGION \
        --query 'Functions[*].FunctionName' \
        --output text | tr '\t' '\n' | head -10
    exit 1
fi

echo -e "${GREEN}Function:${NC} $FUNCTION_NAME"
echo ""

# Calculate time range
START_TIME=$(date -u -d "$HOURS_BACK hours ago" +%Y-%m-%dT%H:%M:%S)
END_TIME=$(date -u +%Y-%m-%dT%H:%M:%S)

echo "─────────────────────────────────────────────────────────"
echo -e "${BLUE}📈 Invocation Metrics${NC}"
echo "─────────────────────────────────────────────────────────"

# Get invocations
INVOCATIONS=$(aws cloudwatch get-metric-statistics \
    --namespace AWS/Lambda \
    --metric-name Invocations \
    --dimensions Name=FunctionName,Value=$FUNCTION_NAME \
    --start-time $START_TIME \
    --end-time $END_TIME \
    --period 3600 \
    --statistics Sum \
    --region $REGION \
    --query 'Datapoints[*].Sum' \
    --output text 2>/dev/null | awk '{s+=$1} END {print s}')

INVOCATIONS=${INVOCATIONS:-0}
echo -e "${GREEN}Total Invocations:${NC} $INVOCATIONS"

# Get errors
ERRORS=$(aws cloudwatch get-metric-statistics \
    --namespace AWS/Lambda \
    --metric-name Errors \
    --dimensions Name=FunctionName,Value=$FUNCTION_NAME \
    --start-time $START_TIME \
    --end-time $END_TIME \
    --period 3600 \
    --statistics Sum \
    --region $REGION \
    --query 'Datapoints[*].Sum' \
    --output text 2>/dev/null | awk '{s+=$1} END {print s}')

ERRORS=${ERRORS:-0}
echo -e "${RED}Errors:${NC} $ERRORS"

# Calculate success rate
if [ $INVOCATIONS -gt 0 ]; then
    SUCCESS_RATE=$(echo "scale=2; (($INVOCATIONS - $ERRORS) / $INVOCATIONS) * 100" | bc)
    echo -e "${GREEN}Success Rate:${NC} ${SUCCESS_RATE}%"
else
    echo -e "${YELLOW}Success Rate:${NC} N/A (no invocations)"
fi

echo ""
echo "─────────────────────────────────────────────────────────"
echo -e "${BLUE}⏱️  Performance Metrics${NC}"
echo "─────────────────────────────────────────────────────────"

# Get average duration
AVG_DURATION=$(aws cloudwatch get-metric-statistics \
    --namespace AWS/Lambda \
    --metric-name Duration \
    --dimensions Name=FunctionName,Value=$FUNCTION_NAME \
    --start-time $START_TIME \
    --end-time $END_TIME \
    --period 3600 \
    --statistics Average \
    --region $REGION \
    --query 'Datapoints[*].Average' \
    --output text 2>/dev/null | awk '{s+=$1; n++} END {if(n>0) print s/n; else print 0}')

AVG_DURATION=${AVG_DURATION:-0}
AVG_DURATION_MS=$(echo "scale=2; $AVG_DURATION" | bc)
echo -e "${GREEN}Average Duration:${NC} ${AVG_DURATION_MS} ms"

# Get max duration
MAX_DURATION=$(aws cloudwatch get-metric-statistics \
    --namespace AWS/Lambda \
    --metric-name Duration \
    --dimensions Name=FunctionName,Value=$FUNCTION_NAME \
    --start-time $START_TIME \
    --end-time $END_TIME \
    --period 3600 \
    --statistics Maximum \
    --region $REGION \
    --query 'max(Datapoints[*].Maximum)' \
    --output text 2>/dev/null)

MAX_DURATION=${MAX_DURATION:-0}
echo -e "${YELLOW}Max Duration:${NC} ${MAX_DURATION} ms"

echo ""
echo "─────────────────────────────────────────────────────────"
echo -e "${BLUE}💰 Cost Estimation${NC}"
echo "─────────────────────────────────────────────────────────"

# Lambda pricing (eu-central-1)
PRICE_PER_REQUEST=0.0000002  # $0.20 per 1M requests
PRICE_PER_GB_SECOND=0.0000166667  # $0.0000166667 per GB-second

# Get function memory
MEMORY_MB=$(aws lambda get-function-configuration \
    --function-name $FUNCTION_NAME \
    --region $REGION \
    --query 'MemorySize' \
    --output text 2>/dev/null)

MEMORY_GB=$(echo "scale=4; $MEMORY_MB / 1024" | bc)

# Calculate compute cost
if [ $INVOCATIONS -gt 0 ] && [ $(echo "$AVG_DURATION > 0" | bc) -eq 1 ]; then
    GB_SECONDS=$(echo "scale=6; ($INVOCATIONS * $AVG_DURATION / 1000) * $MEMORY_GB" | bc)
    COMPUTE_COST=$(echo "scale=6; $GB_SECONDS * $PRICE_PER_GB_SECOND" | bc)
    REQUEST_COST=$(echo "scale=6; $INVOCATIONS * $PRICE_PER_REQUEST" | bc)
    TOTAL_COST=$(echo "scale=6; $COMPUTE_COST + $REQUEST_COST" | bc)
    
    echo -e "${GREEN}Memory Allocated:${NC} ${MEMORY_MB} MB (${MEMORY_GB} GB)"
    echo -e "${GREEN}GB-Seconds Used:${NC} ${GB_SECONDS}"
    echo -e "${GREEN}Compute Cost:${NC} \$${COMPUTE_COST}"
    echo -e "${GREEN}Request Cost:${NC} \$${REQUEST_COST}"
    echo -e "${GREEN}Total Cost (${HOURS_BACK}h):${NC} \$${TOTAL_COST}"
    
    # Monthly projection
    MONTHLY_COST=$(echo "scale=2; $TOTAL_COST * 720 / $HOURS_BACK" | bc)
    echo -e "${BLUE}Projected Monthly:${NC} \$${MONTHLY_COST}"
else
    echo -e "${YELLOW}No data available for cost calculation${NC}"
fi

echo ""
echo "─────────────────────────────────────────────────────────"
echo -e "${BLUE}🎯 Optimization Recommendations${NC}"
echo "─────────────────────────────────────────────────────────"

# Provide recommendations
if [ $(echo "$AVG_DURATION > 5000" | bc) -eq 1 ]; then
    echo -e "${YELLOW}⚠${NC}  Function is slow (>5s average)"
    echo "   Consider optimizing code or increasing memory"
fi

if [ $(echo "$ERRORS > 0" | bc) -eq 1 ]; then
    echo -e "${RED}⚠${NC}  Errors detected"
    echo "   Check CloudWatch logs: ./watch-lambda-logs.sh"
fi

if [ $(echo "$INVOCATIONS < 10" | bc) -eq 1 ]; then
    echo -e "${BLUE}ℹ${NC}  Low usage detected"
    echo "   Current configuration is cost-effective"
else
    echo -e "${GREEN}✓${NC}  Function performing well"
fi

echo ""
echo "═════════════════════════════════════════════════════════"
echo ""
echo "View detailed logs:"
echo "  ./watch-lambda-logs.sh"
echo ""
echo "Check CloudWatch dashboard:"
echo "  https://$REGION.console.aws.amazon.com/cloudwatch"
echo ""
