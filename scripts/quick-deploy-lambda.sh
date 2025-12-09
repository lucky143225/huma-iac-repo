#!/bin/bash
# Quick Start: Deploy to Lambda in 5 minutes

set -e

echo "🚀 Lambda Frontend Deployment - Quick Start"
echo "==========================================="
echo ""
echo "This script will deploy your React frontend to AWS Lambda in ~5 minutes"
echo ""

# Step 1: Verify prerequisites
echo "✓ Checking prerequisites..."

if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first."
    exit 1
fi

echo "✓ Prerequisites verified"
echo ""

# Step 2: Run the main deployment script
echo "Starting deployment..."
echo ""

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
if [ -f "$SCRIPT_DIR/deploy-lambda.sh" ]; then
    bash "$SCRIPT_DIR/deploy-lambda.sh"
else
    echo "❌ deploy-lambda.sh not found"
    exit 1
fi

echo ""
echo "✅ Done! Your frontend is now running on AWS Lambda"
