#!/bin/bash

# Quick Status Dashboard
# Shows deployment status at a glance

clear

echo "╔════════════════════════════════════════════════════════╗"
echo "║     Portfolio Deployment - Quick Status Check         ║"
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

# Check Git Status
echo -e "${BLUE}📦 Git Repository${NC}"
echo "   Branch: $(git branch --show-current)"
echo "   Last Commit: $(git log -1 --pretty=format:'%h - %s')"
echo "   Status: $(git status -s | wc -l) files modified"
echo ""

# Check if build output exists
echo -e "${BLUE}🏗️  Build Status${NC}"
if [ -d "out" ]; then
    OUT_SIZE=$(du -sh out 2>/dev/null | cut -f1)
    echo -e "   ${GREEN}✓${NC} Build output exists ($OUT_SIZE)"
else
    echo -e "   ${YELLOW}⚠${NC}  No build output (run: npm run build)"
fi

if [ -d ".next" ]; then
    echo -e "   ${GREEN}✓${NC} Next.js cache exists"
else
    echo -e "   ${YELLOW}⚠${NC}  No .next directory"
fi
echo ""

# Check Amplify configuration
echo -e "${BLUE}⚡ Amplify Configuration${NC}"
if [ -f "amplify_outputs.json" ]; then
    echo -e "   ${GREEN}✓${NC} amplify_outputs.json present"
    
    # Extract API URL
    API_URL=$(grep -o '"url":"[^"]*"' amplify_outputs.json | head -1 | cut -d'"' -f4)
    if [ ! -z "$API_URL" ]; then
        echo "   API: $API_URL"
    fi
else
    echo -e "   ${RED}✗${NC} amplify_outputs.json missing"
fi

if [ -f "lib/amplify-client-config.ts" ]; then
    echo -e "   ${GREEN}✓${NC} Client config exists"
else
    echo -e "   ${RED}✗${NC} Client config missing"
fi
echo ""

# Check documentation
echo -e "${BLUE}📚 Documentation${NC}"
DOCS=("DEPLOYMENT-FIXES.md" "FIXES-SUMMARY.md" "MONITORING-GUIDE.md")
for doc in "${DOCS[@]}"; do
    if [ -f "$doc" ]; then
        echo -e "   ${GREEN}✓${NC} $doc"
    else
        echo -e "   ${YELLOW}⚠${NC}  $doc missing"
    fi
done
echo ""

# Quick actions
echo "╔════════════════════════════════════════════════════════╗"
echo "║                    Quick Actions                       ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""
echo "1. View Amplify Console:"
echo "   https://eu-central-1.console.aws.amazon.com/amplify"
echo ""
echo "2. View CloudWatch Logs:"
echo "   https://eu-central-1.console.aws.amazon.com/cloudwatch"
echo ""
echo "3. Check deployment status:"
echo "   ./monitor-deployment.sh"
echo ""
echo "4. Read monitoring guide:"
echo "   cat MONITORING-GUIDE.md"
echo ""
echo "5. Build locally:"
echo "   npm run build"
echo ""

# Check if deployment is needed
UNPUSHED=$(git log origin/master..HEAD 2>/dev/null | wc -l)
if [ $UNPUSHED -gt 0 ]; then
    echo -e "${YELLOW}⚠  Warning: $UNPUSHED commit(s) not pushed to remote${NC}"
    echo "   Run: git push"
    echo ""
fi

echo "Last updated: $(date)"
