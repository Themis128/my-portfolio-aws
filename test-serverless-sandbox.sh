#!/bin/bash

# Serverless Offline Sandbox Test Script
# Tests the backend implementations in local sandbox environment

echo "🧪 Testing Backend in Serverless Offline Sandbox"
echo "=============================================="

# Test data
TEST_NAME="Sandbox User $(date +%s)"
TEST_EMAIL="sandbox-$(date +%s)@cloudless.gr"
TEST_MESSAGE="This is a test message from the serverless offline sandbox at $(date). Testing all backend implementations including DynamoDB simulation, SES email simulation, and Slack notification simulation."

echo ""
echo "📝 Test Data:"
echo "   Name: $TEST_NAME"
echo "   Email: $TEST_EMAIL"
echo "   Message: $TEST_MESSAGE"
echo ""

# Send request to local serverless offline
echo "📡 Sending request to http://localhost:3001/dev/contact..."
RESPONSE=$(curl -s -X POST http://localhost:3001/dev/contact \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"$TEST_NAME\",\"email\":\"$TEST_EMAIL\",\"message\":\"$TEST_MESSAGE\"}")

echo ""
echo "📥 Response:"
echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"

echo ""
echo "🔍 Analysis:"
if echo "$RESPONSE" | grep -q '"success":true'; then
    echo "✅ SUCCESS: Backend processed the request successfully"
    echo "✅ LOCAL MODE: All AWS services simulated (no costs)"
    echo "✅ DynamoDB: Contact data would be stored"
    echo "✅ SES: Email would be sent to $TEST_EMAIL"
    echo "✅ Slack: Notification would be posted"
    echo ""
    echo "🎉 Serverless Offline Sandbox is working perfectly!"
else
    echo "❌ FAILED: Backend did not process the request"
    echo "Check if serverless offline is running: npx serverless offline"
fi

echo ""
echo "=============================================="