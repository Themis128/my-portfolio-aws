#!/bin/bash

# AWS Amplify Gen 2 Secrets Setup Script
# This script helps set up all required secrets for your portfolio

echo "🔐 AWS Amplify Gen 2 Secrets Setup"
echo "=================================="
echo ""

# Function to set a secret interactively
set_secret() {
    local secret_name=$1
    local description=$2

    echo "Setting up: $secret_name"
    echo "Description: $description"
    echo ""

    # Check if secret already exists
    if npx ampx sandbox secret list | grep -q "$secret_name"; then
        echo "⚠️  Secret '$secret_name' already exists."
        read -p "Do you want to update it? (y/N): " -n 1 -r
        echo ""
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo "Skipping $secret_name..."
            echo ""
            return
        fi
    fi

    # Set the secret
    echo "Enter the value for $secret_name (input will be hidden):"
    npx ampx sandbox secret set "$secret_name"
    echo ""
}

# Main secrets setup
echo "📋 Required Secrets for Portfolio:"
echo "----------------------------------"
echo "1. SLACK_WEBHOOK_URL     - Webhook URL for contact form notifications"
echo "2. SLACK_BOT_TOKEN       - Bot token for Slack API access"
echo "3. SLACK_CLIENT_SECRET   - Client secret for Slack OAuth"
echo "4. SLACK_SIGNING_SECRET  - Signing secret for Slack request verification"
echo ""

read -p "Do you want to set up these secrets now? (y/N): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Setting up secrets..."
    echo ""

    set_secret "SLACK_WEBHOOK_URL" "Slack webhook URL for contact form notifications"
    set_secret "SLACK_BOT_TOKEN" "Slack bot token for API access"
    set_secret "SLACK_CLIENT_SECRET" "Slack OAuth client secret"
    set_secret "SLACK_SIGNING_SECRET" "Slack signing secret for request verification"

    echo "✅ Secrets setup complete!"
    echo ""

    # List all secrets
    echo "📋 Current secrets:"
    npx ampx sandbox secret list
    echo ""

else
    echo "Secrets setup cancelled. You can run this script later."
    echo ""
    echo "To set secrets manually:"
    echo "npx ampx sandbox secret set SECRET_NAME"
    echo ""
fi

echo "🔧 Next Steps:"
echo "-------------"
echo "1. Test sandbox with secrets: npx ampx sandbox"
echo "2. Deploy to Amplify: git push origin master"
echo "3. Set production secrets in AWS Amplify Console"
echo ""
echo "📖 Documentation: https://docs.amplify.aws/react/build-a-backend/security/"
