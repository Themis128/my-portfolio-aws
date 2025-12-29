#!/bin/bash

# Contact Form Test Script
# Tests the contact form API directly

echo "╔════════════════════════════════════════════════════════╗"
echo "║           Contact Form API Test Tool                  ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

PROJECT_DIR="/home/tbaltzakis/my-portfolio-aws"
cd "$PROJECT_DIR" || exit 1

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check if amplify_outputs.json exists
if [ ! -f "amplify_outputs.json" ]; then
    echo -e "${RED}❌ amplify_outputs.json not found${NC}"
    echo "Run this from your project directory"
    exit 1
fi

# Extract API endpoint and key
API_URL=$(grep -o '"url":"[^"]*"' amplify_outputs.json | head -1 | cut -d'"' -f4)
API_KEY=$(grep -o '"api_key":"[^"]*"' amplify_outputs.json | head -1 | cut -d'"' -f4)

if [ -z "$API_URL" ] || [ -z "$API_KEY" ]; then
    echo -e "${RED}❌ Could not extract API details${NC}"
    exit 1
fi

echo -e "${BLUE}📡 API Endpoint:${NC} $API_URL"
echo -e "${BLUE}🔑 API Key:${NC} ${API_KEY:0:20}..."
echo ""

# Get test data
echo -e "${YELLOW}Enter test contact form data:${NC}"
echo ""
read -p "Name [Test User]: " TEST_NAME
TEST_NAME=${TEST_NAME:-"Test User"}

read -p "Email [test@example.com]: " TEST_EMAIL
TEST_EMAIL=${TEST_EMAIL:-"test@example.com"}

read -p "Message [Testing contact form]: " TEST_MESSAGE
TEST_MESSAGE=${TEST_MESSAGE:-"Testing contact form from CLI"}

echo ""
echo -e "${BLUE}📝 Test Data:${NC}"
echo "   Name: $TEST_NAME"
echo "   Email: $TEST_EMAIL"
echo "   Message: $TEST_MESSAGE"
echo ""
echo -e "${YELLOW}Sending request...${NC}"
echo ""

# Create GraphQL mutation
MUTATION=$(cat <<EOF
{
  "query": "mutation SendContact(\$name: String!, \$email: String!, \$message: String!) { sendContact(name: \$name, email: \$email, message: \$message) }",
  "variables": {
    "name": "$TEST_NAME",
    "email": "$TEST_EMAIL",
    "message": "$TEST_MESSAGE"
  }
}
EOF
)

# Send request
RESPONSE=$(curl -s -X POST "$API_URL" \
    -H "Content-Type: application/json" \
    -H "x-api-key: $API_KEY" \
    -d "$MUTATION")

echo -e "${BLUE}📥 Response:${NC}"
echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"
echo ""

# Check response
if echo "$RESPONSE" | grep -q '"sendContact"'; then
    echo -e "${GREEN}✅ SUCCESS! Contact form submitted${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Check Lambda logs: ./watch-lambda-logs.sh"
    echo "  2. Check email inbox for confirmation"
    echo "  3. Verify DynamoDB entry in AWS Console"
elif echo "$RESPONSE" | grep -q 'error'; then
    echo -e "${RED}❌ ERROR occurred${NC}"
    echo ""
    echo "Troubleshooting:"
    echo "  1. Check if API key is valid (expires in 30 days)"
    echo "  2. Verify Lambda function exists"
    echo "  3. Check CloudWatch logs for errors"
else
    echo -e "${YELLOW}⚠️  Unexpected response${NC}"
    echo ""
    echo "Manual verification needed in AWS Console"
fi

echo ""
echo "═════════════════════════════════════════════════════════"
echo ""
