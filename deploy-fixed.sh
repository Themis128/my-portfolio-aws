#!/bin/bash

set -e  # Exit on error

echo "=========================================="
echo " Portfolio Deployment to AWS Amplify"
echo "=========================================="
echo ""

PROJECT_DIR="/home/tbaltzakis/my-portfolio-aws"
cd "$PROJECT_DIR" || exit 1

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Clean previous builds
echo -e "${BLUE}Step 1: Cleaning previous builds...${NC}"
rm -rf .next out .amplify/artifacts
echo -e "${GREEN}✓ Clean completed${NC}"
echo ""

# Step 2: Install/update dependencies (using npm, not pnpm due to PATH issues)
echo -e "${BLUE}Step 2: Installing dependencies with npm...${NC}"
npm install
echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

# Step 3: Build Next.js application
echo -e "${BLUE}Step 3: Building Next.js application...${NC}"
npm run build

if [ ! -d "out" ]; then
    echo -e "${RED}✗ Build failed - no output directory created${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Build completed successfully${NC}"
echo ""

# Step 4: Deploy backend to Amplify
echo -e "${BLUE}Step 4: Deploying backend to Amplify...${NC}"
cd amplify

if [ ! -f "package.json" ]; then
    echo -e "${RED}✗ amplify/package.json not found${NC}"
    exit 1
fi

# Install Amplify backend dependencies
npm install

# Deploy backend
echo "Pushing backend changes..."
npx amplify push --yes || {
    echo -e "${RED}Note: Backend push may have issues - continuing...${NC}"
}

cd "$PROJECT_DIR"
echo -e "${GREEN}✓ Backend deployment attempted${NC}"
echo ""

# Step 5: Verification
echo -e "${BLUE}Step 5: Verifying deployment...${NC}"

if [ -f "amplify_outputs.json" ]; then
    echo -e "${GREEN}✓ amplify_outputs.json present${NC}"
else
    echo -e "${RED}✗ amplify_outputs.json missing${NC}"
fi

if [ -d "out" ]; then
    OUT_SIZE=$(du -sh out | cut -f1)
    echo -e "${GREEN}✓ Static output directory present (Size: $OUT_SIZE)${NC}"
else
    echo -e "${RED}✗ Output directory missing${NC}"
    exit 1
fi

echo ""
echo "=========================================="
echo -e "${GREEN} Build Complete!${NC}"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Run git-deploy.sh to commit and push"
echo "2. Or manually commit:"
echo "   git add ."
echo "   git commit -m 'Fix: Frontend/backend sync and deployment'"
echo "   git push"
echo ""
