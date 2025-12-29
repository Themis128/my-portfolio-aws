#!/bin/bash

echo "🚀 Portfolio Frontend Deployment Script"
echo "======================================"

# Check if out directory exists
if [ ! -d "out" ]; then
    echo "❌ Error: 'out' directory not found. Run 'npm run build' first."
    exit 1
fi

echo "✅ Frontend build found in 'out/' directory"

# Try Vercel deployment
echo ""
echo "🌐 Attempting Vercel deployment..."
if command -v vercel &> /dev/null; then
    echo "📦 Deploying to Vercel..."
    vercel --prod --yes
    if [ $? -eq 0 ]; then
        echo "✅ Successfully deployed to Vercel!"
        exit 0
    fi
else
    echo "⚠️  Vercel CLI not found, trying alternative..."
fi

# Try Netlify deployment
echo ""
echo "🌐 Attempting Netlify deployment..."
if command -v netlify &> /dev/null; then
    echo "📦 Deploying to Netlify..."
    netlify deploy --dir=out --prod --yes
    if [ $? -eq 0 ]; then
        echo "✅ Successfully deployed to Netlify!"
        exit 0
    fi
else
    echo "⚠️  Netlify CLI not found, trying alternative..."
fi

# Try Surge deployment
echo ""
echo "🌐 Attempting Surge deployment..."
if command -v surge &> /dev/null; then
    echo "📦 Deploying to Surge..."
    surge out --domain themis-portfolio.surge.sh
    if [ $? -eq 0 ]; then
        echo "✅ Successfully deployed to Surge!"
        echo "🌐 Your portfolio is live at: https://themis-portfolio.surge.sh"
        exit 0
    fi
else
    echo "⚠️  Surge not found, providing manual instructions..."
fi

# Manual deployment instructions
echo ""
echo "📋 MANUAL DEPLOYMENT INSTRUCTIONS:"
echo "=================================="
echo ""
echo "1️⃣ Vercel (Recommended):"
echo "   cd /path/to/your/portfolio"
echo "   npm i -g vercel"
echo "   vercel --prod"
echo ""
echo "2️⃣ Netlify:"
echo "   cd /path/to/your/portfolio"
echo "   npm i -g netlify-cli"
echo "   netlify deploy --dir=out --prod"
echo ""
echo "3️⃣ Surge.sh (Fastest):"
echo "   cd /path/to/your/portfolio"
echo "   npm i -g surge"
echo "   surge out"
echo ""
echo "4️⃣ GitHub Pages:"
echo "   - Upload the 'out/' folder contents to GitHub Pages"
echo "   - Or use GitHub Actions for automatic deployment"
echo ""
echo "5️⃣ Any Static Host:"
echo "   - Upload all files from 'out/' directory"
echo "   - Ensure proper MIME types for .js and .css files"
echo ""
echo "✅ Backend API is already live and connected!"
echo "🔗 GraphQL Endpoint: https://74de5bh225e2xjbmaux7e6fcsq.appsync-api.eu-central-1.amazonaws.com/graphql"
echo ""
echo "🎉 Your portfolio will be live once deployed!"
