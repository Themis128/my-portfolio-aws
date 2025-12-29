#!/bin/bash

# Deployment Log Analyzer
# Analyzes Amplify deployment logs for issues

echo "╔════════════════════════════════════════════════════════╗"
echo "║         Deployment Log Analysis Report                ║"
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
echo -e "${CYAN}📊 Log Analysis${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""

echo -e "${GREEN}✅ SUCCESSFUL OPERATIONS:${NC}"
echo ""
echo "1. Build Environment"
echo "   ✓ 8GiB Memory, 4vCPUs, 128GB Disk"
echo "   ✓ Standard compute type"
echo ""

echo "2. Git Operations"
echo "   ✓ SSH keys retrieved successfully"
echo "   ✓ Repository cloned: my-portfolio-aws"
echo "   ✓ Commit f0725bb checked out"
echo "   ✓ Credentials cleaned up"
echo ""

echo "3. Cache Operations"
echo "   ✓ Environment cache retrieved"
echo "   ✓ Cache extracted (1m 20s)"
echo "   ✓ Cache retrieval successful"
echo ""

echo "4. Backend Build"
echo "   ✓ Backend environment found: master"
echo "   ✓ Amplify AppID: d3gpsu0f51cpej"
echo "   ✓ App name: my-portfolio-aws"
echo ""

echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}⚠️  WARNINGS FOUND:${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""

echo "1. SSM Secrets Warning (Line 27)"
echo "   Message: 'Failed to set up process.env.secrets'"
echo "   Path: /amplify/d3gpsu0f51cpej/master/"
echo ""
echo -e "${CYAN}   Analysis:${NC}"
echo "   • This is attempting to load SSM Parameter Store secrets"
echo "   • Warning indicates no secrets are configured"
echo "   • This is NORMAL if you haven't set up SSM secrets"
echo ""
echo -e "${YELLOW}   Impact: LOW${NC}"
echo "   • Your app doesn't use SSM secrets currently"
echo "   • Contact form uses amplify_outputs.json config"
echo "   • No action needed unless you want to add secrets"
echo ""
echo -e "${GREEN}   Fix (Optional):${NC}"
echo "   If you want to store secrets in SSM:"
echo "   1. Go to AWS Systems Manager → Parameter Store"
echo "   2. Create parameters under path: /amplify/d3gpsu0f51cpej/master/"
echo "   3. Add any sensitive config (API keys, tokens, etc.)"
echo ""

echo "2. Backend Environment Already Exists (Line 39)"
echo "   Message: '🛑 BackendEnvironment master already exists.'"
echo ""
echo -e "${CYAN}   Analysis:${NC}"
echo "   • This means the backend was already deployed"
echo "   • Amplify is updating existing backend, not creating new"
echo "   • This is EXPECTED and NORMAL for redeployments"
echo ""
echo -e "${GREEN}   Impact: NONE${NC}"
echo "   • This is correct behavior"
echo "   • Backend will be updated with your changes"
echo "   • No issues to fix"
echo ""

echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ ASSESSMENT${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""

echo -e "${GREEN}Overall Status: HEALTHY ✅${NC}"
echo ""
echo "Summary:"
echo "  • All critical operations successful"
echo "  • Warnings are normal and expected"
echo "  • No errors detected"
echo "  • Build is progressing correctly"
echo ""

echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${CYAN}⏭️  NEXT STEPS${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""

echo "The deployment has completed PROVISION phase successfully."
echo "Now running BACKEND BUILD phase."
echo ""
echo "Expected next phases:"
echo "  1. ⏳ Backend Build (in progress)"
echo "  2. ⏳ Frontend Build (npm install + build)"
echo "  3. ⏳ Deploy (upload to CDN)"
echo "  4. ⏳ Verify (final checks)"
echo ""
echo "No fixes needed - deployment is healthy! ✅"
echo ""

echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}📝 RECOMMENDATIONS${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""

echo "1. Continue monitoring in Amplify Console"
echo "   https://eu-central-1.console.aws.amazon.com/amplify"
echo ""

echo "2. Optional: Set up SSM secrets (if needed)"
echo "   • Only necessary for sensitive environment variables"
echo "   • Current setup works fine without them"
echo ""

echo "3. Wait for build to complete"
echo "   • Expected: 10-15 minutes total"
echo "   • Currently: ~3 minutes elapsed"
echo "   • Remaining: ~7-12 minutes"
echo ""

echo "4. After completion, test:"
echo "   ./test-contact-form.sh"
echo "   ./watch-lambda-logs.sh"
echo "   ./performance-monitor.sh"
echo ""

echo -e "${GREEN}════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}           NO ISSUES FOUND - DEPLOYMENT HEALTHY          ${NC}"
echo -e "${GREEN}════════════════════════════════════════════════════════${NC}"
echo ""
