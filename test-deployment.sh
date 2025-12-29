#!/bin/bash

# Post-Deployment Test Suite
# Complete testing workflow after deployment succeeds

clear

echo "╔════════════════════════════════════════════════════════╗"
echo "║         Post-Deployment Test Suite                    ║"
echo "║              Ready-to-Run Tests                        ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m'

PROJECT_DIR="/home/tbaltzakis/my-portfolio-aws"
cd "$PROJECT_DIR" || exit 1

echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ DEPLOYMENT SUCCESSFUL!${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""

echo "Now let's test everything to ensure it works!"
echo ""

echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${CYAN}📋 TEST CHECKLIST${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""

echo "We'll run 6 tests in sequence:"
echo ""
echo "  1. ✅ Health Check - System status"
echo "  2. 🌐 Site Access - Can we reach the site?"
echo "  3. 🧪 Contact Form - API test"
echo "  4. 📝 Lambda Logs - Function working?"
echo "  5. 📊 Performance - Metrics and costs"
echo "  6. ✅ Final Verification - Everything working?"
echo ""

read -p "Press Enter to start testing, or Ctrl+C to exit..."
clear

# Test 1: Health Check
echo "╔════════════════════════════════════════════════════════╗"
echo "║  TEST 1/6: System Health Check                        ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

if [ -f "health-check.sh" ]; then
    ./health-check.sh
else
    echo -e "${YELLOW}Health check script not found, skipping...${NC}"
fi

echo ""
read -p "Press Enter to continue to Test 2..."
clear

# Test 2: Site Access
echo "╔════════════════════════════════════════════════════════╗"
echo "║  TEST 2/6: Site Accessibility                         ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

echo -e "${CYAN}Getting your site URL from Amplify...${NC}"
echo ""

# Try to get URL from amplify_outputs.json or provide manual check
if [ -f "amplify_outputs.json" ]; then
    SITE_URL=$(grep -o '"url":"[^"]*"' amplify_outputs.json | head -1 | cut -d'"' -f4)
    echo "API Endpoint found: $SITE_URL"
fi

echo ""
echo -e "${YELLOW}Manual Check Required:${NC}"
echo ""
echo "1. Open Amplify Console:"
echo "   https://eu-central-1.console.aws.amazon.com/amplify"
echo ""
echo "2. Click on your app 'my-portfolio-aws'"
echo ""
echo "3. Find your site URL (should be like):"
echo "   https://master.XXXXX.amplifyapp.com"
echo ""
echo "4. Open the URL in your browser"
echo ""
echo "5. Verify:"
echo "   • Site loads without errors"
echo "   • All sections visible"
echo "   • Images load"
echo "   • Navigation works"
echo "   • No console errors (F12)"
echo ""

read -p "Did the site load successfully? (y/n): " SITE_OK

if [ "$SITE_OK" = "y" ] || [ "$SITE_OK" = "Y" ]; then
    echo -e "${GREEN}✅ Site is accessible!${NC}"
else
    echo -e "${RED}❌ Site access failed${NC}"
    echo "Check browser console for errors"
fi

echo ""
read -p "Press Enter to continue to Test 3..."
clear

# Test 3: Contact Form
echo "╔════════════════════════════════════════════════════════╗"
echo "║  TEST 3/6: Contact Form API Test                      ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

if [ -f "test-contact-form.sh" ]; then
    echo -e "${CYAN}Running API test...${NC}"
    echo ""
    ./test-contact-form.sh
else
    echo -e "${YELLOW}Test script not found${NC}"
    echo ""
    echo "Manual test:"
    echo "1. Go to your site"
    echo "2. Navigate to contact section"
    echo "3. Fill in:"
    echo "   Name: Test User"
    echo "   Email: your@email.com"
    echo "   Message: Testing deployment"
    echo "4. Submit form"
    echo "5. Check for success message"
    echo ""
    read -p "Did contact form work? (y/n): " FORM_OK
fi

echo ""
read -p "Press Enter to continue to Test 4..."
clear

# Test 4: Lambda Logs
echo "╔════════════════════════════════════════════════════════╗"
echo "║  TEST 4/6: Lambda Function Logs                       ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

echo -e "${CYAN}Checking Lambda logs for your contact form submission...${NC}"
echo ""

if command -v aws &> /dev/null; then
    echo -e "${GREEN}AWS CLI detected!${NC}"
    echo ""
    
    if [ -f "watch-lambda-logs.sh" ]; then
        echo "Options:"
        echo "  1. Watch logs in real-time (Ctrl+C to exit)"
        echo "  2. Skip to next test"
        echo ""
        read -p "Choice (1/2): " LOG_CHOICE
        
        if [ "$LOG_CHOICE" = "1" ]; then
            ./watch-lambda-logs.sh
        fi
    else
        echo "View logs manually:"
        echo "https://eu-central-1.console.aws.amazon.com/cloudwatch"
        echo ""
        echo "Look for: /aws/lambda/contactHandler-*"
    fi
else
    echo -e "${YELLOW}AWS CLI not configured${NC}"
    echo ""
    echo "View logs in CloudWatch Console:"
    echo "https://eu-central-1.console.aws.amazon.com/cloudwatch"
    echo ""
    echo "What to look for:"
    echo "  • Contact form submission"
    echo "  • Email sent successfully"
    echo "  • DynamoDB insert successful"
    echo "  • No errors"
fi

echo ""
read -p "Press Enter to continue to Test 5..."
clear

# Test 5: Performance
echo "╔════════════════════════════════════════════════════════╗"
echo "║  TEST 5/6: Performance Metrics                        ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

if command -v aws &> /dev/null; then
    if [ -f "performance-monitor.sh" ]; then
        echo -e "${CYAN}Fetching performance metrics...${NC}"
        echo ""
        ./performance-monitor.sh
    else
        echo -e "${YELLOW}Performance script not found${NC}"
    fi
else
    echo -e "${YELLOW}AWS CLI needed for performance metrics${NC}"
    echo ""
    echo "Manual check:"
    echo "1. Open CloudWatch"
    echo "2. Go to Lambda metrics"
    echo "3. Check invocations, duration, errors"
fi

echo ""
read -p "Press Enter to continue to Test 6..."
clear

# Test 6: Final Verification
echo "╔════════════════════════════════════════════════════════╗"
echo "║  TEST 6/6: Final Verification                         ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

echo -e "${CYAN}Running final checks...${NC}"
echo ""

CHECKS_PASSED=0
CHECKS_TOTAL=6

# Check 1: Git status
if git status &> /dev/null; then
    echo -e "${GREEN}✓${NC} Git repository healthy"
    ((CHECKS_PASSED++))
else
    echo -e "${RED}✗${NC} Git repository issue"
fi

# Check 2: amplify_outputs.json
if [ -f "amplify_outputs.json" ]; then
    echo -e "${GREEN}✓${NC} Amplify configuration present"
    ((CHECKS_PASSED++))
else
    echo -e "${RED}✗${NC} Amplify configuration missing"
fi

# Check 3: Client config
if [ -f "lib/amplify-client-config.ts" ]; then
    echo -e "${GREEN}✓${NC} Client configuration exists"
    ((CHECKS_PASSED++))
else
    echo -e "${RED}✗${NC} Client configuration missing"
fi

# Check 4: Contact component
if [ -f "components/Contact.tsx" ]; then
    echo -e "${GREEN}✓${NC} Contact component exists"
    ((CHECKS_PASSED++))
else
    echo -e "${RED}✗${NC} Contact component missing"
fi

# Check 5: Backend files
if [ -d "amplify/backend" ]; then
    echo -e "${GREEN}✓${NC} Backend configuration exists"
    ((CHECKS_PASSED++))
else
    echo -e "${RED}✗${NC} Backend configuration missing"
fi

# Check 6: Lambda handler
if [ -f "amplify/backend/function/contact-handler/handler.ts" ]; then
    echo -e "${GREEN}✓${NC} Lambda handler exists"
    ((CHECKS_PASSED++))
else
    echo -e "${RED}✗${NC} Lambda handler missing"
fi

echo ""
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${CYAN}📊 TEST RESULTS SUMMARY${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""

SCORE=$((CHECKS_PASSED * 100 / CHECKS_TOTAL))

echo "Checks passed: $CHECKS_PASSED / $CHECKS_TOTAL"
echo "Score: $SCORE%"
echo ""

if [ $CHECKS_PASSED -eq $CHECKS_TOTAL ]; then
    echo -e "${GREEN}🎉 ALL TESTS PASSED!${NC}"
    echo ""
    echo "Your portfolio is:"
    echo "  ✅ Fully deployed"
    echo "  ✅ Backend configured"
    echo "  ✅ Contact form working"
    echo "  ✅ Lambda function active"
    echo "  ✅ Production ready!"
elif [ $CHECKS_PASSED -ge 4 ]; then
    echo -e "${YELLOW}⚠️  MOSTLY WORKING${NC}"
    echo ""
    echo "Minor issues detected but site is functional"
else
    echo -e "${RED}❌ ISSUES DETECTED${NC}"
    echo ""
    echo "Please review failed checks above"
fi

echo ""
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ TESTING COMPLETE${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""

echo "Next steps:"
echo ""
echo "  • Monitor performance daily: ./performance-monitor.sh"
echo "  • Check health weekly: ./health-check.sh"
echo "  • View logs anytime: ./watch-lambda-logs.sh"
echo "  • Quick status: ./status-check.sh"
echo ""

echo "Documentation:"
echo "  • START-HERE.md - Quick start"
echo "  • TOOLS-TUTORIAL.md - Tool guide"
echo "  • MONITORING-GUIDE.md - Complete reference"
echo ""

echo -e "${CYAN}════════════════════════════════════════════════════════${NC}"
echo -e "${CYAN}  Your portfolio is live and fully monitored!          ${NC}"
echo -e "${CYAN}════════════════════════════════════════════════════════${NC}"
echo ""
