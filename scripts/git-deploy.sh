#!/bin/bash

# Quick Git commit and deploy script
cd /home/tbaltzakis/my-portfolio-aws || exit 1

echo "=========================================="
echo " Git Commit & Push"
echo "=========================================="
echo ""

# Check git status
echo "Current changes:"
git status --short
echo ""

# Add all changes
echo "Adding files to git..."
git add .

# Create commit
echo ""
read -p "Enter commit message (or press Enter for default): " COMMIT_MSG

if [ -z "$COMMIT_MSG" ]; then
    COMMIT_MSG="Fix: Frontend/backend sync, add client Amplify config"
fi

git commit -m "$COMMIT_MSG"

# Push to remote
echo ""
echo "Pushing to remote repository..."
git push

if [ $? -eq 0 ]; then
    echo ""
    echo "=========================================="
    echo " ✅ Successfully pushed to Git!"
    echo "=========================================="
    echo ""
    echo "Amplify will automatically deploy your changes."
    echo "Monitor deployment at:"
    echo "https://console.aws.amazon.com/amplify"
    echo ""
else
    echo ""
    echo "=========================================="
    echo " ❌ Git push failed!"
    echo "=========================================="
    exit 1
fi
