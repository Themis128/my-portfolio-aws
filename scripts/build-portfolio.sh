#!/bin/bash

# Navigate to project directory
cd /home/tbaltzakis/my-portfolio-aws || exit 1

echo "======================================"
echo " Building Next.js Portfolio"
echo "======================================"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Clean previous build
echo "Cleaning previous build..."
rm -rf .next out

# Build the project
echo "Building project..."
npm run build

# Check build status
if [ $? -eq 0 ]; then
    echo ""
    echo "======================================"
    echo " Build completed successfully!"
    echo "======================================"
    echo ""
    echo "Output directory: ./out"
    echo "Ready for deployment to Amplify"
else
    echo ""
    echo "======================================"
    echo " Build failed!"
    echo "======================================"
    exit 1
fi
