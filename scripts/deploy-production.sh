#!/bin/bash

# 🚀 Portfolio Production Deployment Script
# This script helps deploy your portfolio to production

echo "🚀 Portfolio Production Deployment Script"
echo "=========================================="
echo ""

# Check if build exists
if [ ! -d "out" ]; then
    echo "❌ Build directory not found. Running build first..."
    npm run build
    if [ $? -ne 0 ]; then
        echo "❌ Build failed. Please fix errors and try again."
        exit 1
    fi
fi

echo "✅ Build ready for deployment"
echo ""

# Deployment options
echo "Choose your deployment platform:"
echo "1) Vercel (Recommended)"
echo "2) Netlify"
echo "3) Surge.sh"
echo "4) Manual (I'll show you the files)"
echo ""

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo "📦 Deploying to Vercel..."
        if ! command -v vercel &> /dev/null; then
            echo "Installing Vercel CLI..."
            npm install -g vercel
        fi
        vercel --prod
        ;;
    2)
        echo "📦 Deploying to Netlify..."
        if ! command -v netlify &> /dev/null; then
            echo "Installing Netlify CLI..."
            npm install -g netlify-cli
        fi
        netlify deploy --dir=out --prod
        ;;
    3)
        echo "📦 Deploying to Surge..."
        if ! command -v surge &> /dev/null; then
            echo "Installing Surge..."
            npm install -g surge
        fi
        read -p "Enter your desired subdomain (e.g., themis-portfolio): " subdomain
        surge out --domain ${subdomain}.surge.sh
        ;;
    4)
        echo "📁 Manual deployment files are ready in the 'out' directory"
        echo "Upload the contents of the 'out' folder to your hosting provider"
        echo ""
        echo "Environment variables to set:"
        echo "NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://ggbslhgtjbgkzcnbm7kfq3z6ku.appsync-api.eu-central-1.amazonaws.com/graphql"
        echo "NEXT_PUBLIC_API_KEY=da2-nz4qfcj7lne3dbeknww64vwala"
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment completed!"
echo ""
echo "📋 Next steps:"
echo "1. Set environment variables in your hosting platform:"
echo "   - NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://ggbslhgtjbgkzcnbm7kfq3z6ku.appsync-api.eu-central-1.amazonaws.com/graphql"
echo "   - NEXT_PUBLIC_API_KEY=da2-nz4qfcj7lne3dbeknww64vwala"
echo ""
echo "2. Test your live site:"
echo "   - Visit the deployed URL"
echo "   - Test the contact form"
echo "   - Check your email for notifications"
echo ""
echo "3. Optional: Connect a custom domain in your hosting platform"
echo ""
echo "💰 Your portfolio costs $0/month to run! 🎉"</content>
<parameter name="filePath">/home/tbaltzakis/my-portfolio-aws/deploy-production.sh