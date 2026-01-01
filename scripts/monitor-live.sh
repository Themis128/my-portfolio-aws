#!/bin/bash

# Live Deployment Dashboard
# Real-time monitoring of deployment #45

clear

echo "╔════════════════════════════════════════════════════════╗"
echo "║              Live Deployment Monitor                  ║"
echo "║                  Deployment #45                        ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ FIX DEPLOYED${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""

echo "Commit: 60a0229"
echo "Message: Fix: Change amplify.yml from pnpm to npm ci"
echo "Pushed: $(date '+%H:%M:%S')"
echo ""

echo -e "${CYAN}What was fixed:${NC}"
echo "  • Changed from pnpm to npm ci"
echo "  • Removed pnpm global install"
echo "  • Using standard npm build"
echo ""

echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}⏰ DEPLOYMENT TIMELINE${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""

CURRENT_TIME=$(date '+%H:%M')
echo "Current Time: $CURRENT_TIME"
echo ""

echo "Expected Progress:"
echo ""
echo -e "${GREEN}✓${NC} 10:24 - Git push successful"
echo -e "${YELLOW}⏳${NC} 10:24 - Amplify detecting changes..."
echo -e "${CYAN}→${NC} 10:25 - Provision phase starts"
echo -e "${CYAN}→${NC} 10:27 - Build phase starts"
echo -e "${CYAN}→${NC} 10:32 - Deploy phase starts"
echo -e "${CYAN}→${NC} 10:35 - Verify phase starts"
echo -e "${GREEN}✓${NC} 10:36 - Expected completion!"
echo ""

echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${CYAN}📊 WHAT TO WATCH FOR${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""

echo "Success Indicators:"
echo ""
echo -e "${GREEN}✓${NC} PROVISION Phase:"
echo "   • 'Build environment configured'"
echo "   • 'Repository cloned successfully'"
echo "   • 'Cache retrieved'"
echo ""

echo -e "${GREEN}✓${NC} BUILD Phase:"
echo "   • 'npm ci' completes successfully"
echo "   • 'npm run build' runs"
echo "   • 'Creating an optimized production build...'"
echo "   • 'Compiled successfully'"
echo "   • 'Exporting (X/X)'"
echo "   • 'Export successful'"
echo ""

echo -e "${GREEN}✓${NC} DEPLOY Phase:"
echo "   • 'Uploading artifacts'"
echo "   • 'Backend deployment'"
echo "   • 'Distribution updated'"
echo ""

echo -e "${GREEN}✓${NC} VERIFY Phase:"
echo "   • 'Health checks passed'"
echo "   • 'Deployment successful'"
echo ""

echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${RED}🚨 ERROR PATTERNS TO AVOID${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""

echo "If you see these, there's still an issue:"
echo ""
echo -e "${RED}✗${NC} 'npm ERR!'"
echo -e "${RED}✗${NC} 'Error: Command failed'"
echo -e "${RED}✗${NC} 'Failed to compile'"
echo -e "${RED}✗${NC} 'Module not found'"
echo -e "${RED}✗${NC} 'Type error'"
echo ""

echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${CYAN}🔗 MONITORING LINKS${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""

echo "1. Amplify Console (LIVE BUILD LOGS):"
echo "   https://eu-central-1.console.aws.amazon.com/amplify"
echo ""
echo "   Steps:"
echo "   • Open link"
echo "   • Click 'my-portfolio-aws'"
echo "   • Look for deployment #45 (newest)"
echo "   • Click to see live logs"
echo ""

echo "2. GitHub Commit:"
echo "   https://github.com/Themis128/my-portfolio-aws/commit/60a0229"
echo ""

echo "3. CloudWatch (for Lambda logs after deployment):"
echo "   https://eu-central-1.console.aws.amazon.com/cloudwatch"
echo ""

echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}📝 MONITORING CHECKLIST${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""

echo "Check these in order:"
echo ""
echo "  [ ] 1. New deployment #45 appears in Amplify Console"
echo "  [ ] 2. PROVISION phase completes (green checkmark)"
echo "  [ ] 3. BUILD phase starts and shows 'npm ci'"
echo "  [ ] 4. BUILD phase shows 'npm run build'"
echo "  [ ] 5. BUILD phase shows 'Compiled successfully'"
echo "  [ ] 6. BUILD phase shows 'Export successful'"
echo "  [ ] 7. DEPLOY phase completes"
echo "  [ ] 8. VERIFY phase completes"
echo "  [ ] 9. All phases show green checkmarks"
echo "  [ ] 10. Site URL is accessible"
echo ""

echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}🧪 AFTER DEPLOYMENT COMPLETES${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""

echo "Once all phases are green, test with:"
echo ""
echo "1. Test Contact Form:"
echo "   ./test-contact-form.sh"
echo ""
echo "2. Watch Lambda Logs:"
echo "   ./watch-lambda-logs.sh"
echo ""
echo "3. Check Performance:"
echo "   ./performance-monitor.sh"
echo ""
echo "4. Full Health Check:"
echo "   ./health-check.sh"
echo ""

echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${CYAN}💡 REAL-TIME MONITORING${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""

echo "For live updates, you can:"
echo ""
echo "Option 1: Keep Amplify Console open"
echo "   • Auto-refreshes every few seconds"
echo "   • Shows live log output"
echo "   • Most reliable method"
echo ""

echo "Option 2: Use AWS CLI (if configured):"
echo "   ./monitor-deployment.sh"
echo ""

echo "Option 3: Check status periodically:"
echo "   ./status-check.sh"
echo ""

echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}🎉 EXPECTED RESULT${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""

echo "If successful, you'll see:"
echo ""
echo "  ✅ Deployment #45: SUCCEEDED"
echo "  ✅ All 4 phases green"
echo "  ✅ Site accessible at your Amplify URL"
echo "  ✅ Contact form working"
echo "  ✅ Lambda function deployed"
echo "  ✅ DynamoDB + SES configured"
echo ""

echo -e "${GREEN}Your deployment should succeed this time!${NC}"
echo ""

echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}⏱️  TIME ESTIMATE${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""

echo "Total deployment time: ~12-15 minutes"
echo ""
echo "Breakdown:"
echo "  • Provision: 2-3 min"
echo "  • Build: 5-8 min"
echo "  • Deploy: 2-3 min"
echo "  • Verify: 1 min"
echo ""

echo "Started: ~10:24 EET"
echo "Expected completion: ~10:36-10:39 EET"
echo ""

echo -e "${CYAN}════════════════════════════════════════════════════════${NC}"
echo -e "${CYAN}        Monitoring deployment #45...                    ${NC}"
echo -e "${CYAN}   Check Amplify Console for live progress!            ${NC}"
echo -e "${CYAN}════════════════════════════════════════════════════════${NC}"
echo ""

# Try to open Amplify Console automatically
if command -v wslview &> /dev/null; then
    echo -e "${BLUE}Opening Amplify Console in browser...${NC}"
    wslview "https://eu-central-1.console.aws.amazon.com/amplify" &
    echo ""
fi

echo "Press Ctrl+C to exit this monitor"
echo ""
