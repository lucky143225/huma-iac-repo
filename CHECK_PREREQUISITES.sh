#!/bin/bash
# Lambda Frontend Deployment - Pre-Deployment Checklist

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  AWS Lambda Frontend Deployment - Pre-Deployment Checklist     ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Check 1: Docker
echo -n "✓ Checking Docker... "
if command -v docker &> /dev/null && docker ps &> /dev/null; then
    echo "✅ READY"
else
    echo "❌ FAILED"
    echo "  → Install Docker Desktop or Docker Engine"
    echo "  → Ensure Docker daemon is running"
    exit 1
fi

# Check 2: AWS CLI
echo -n "✓ Checking AWS CLI... "
if command -v aws &> /dev/null; then
    echo "✅ READY"
else
    echo "❌ FAILED"
    echo "  → Install AWS CLI v2: https://aws.amazon.com/cli/"
    exit 1
fi

# Check 3: AWS Credentials
echo -n "✓ Checking AWS Credentials... "
if aws sts get-caller-identity &> /dev/null; then
    ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
    echo "✅ READY (Account: $ACCOUNT_ID)"
else
    echo "❌ FAILED"
    echo "  → Configure AWS credentials: aws configure"
    echo "  → Or set env vars: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY"
    exit 1
fi

# Check 4: Node.js
echo -n "✓ Checking Node.js... "
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✅ READY ($NODE_VERSION)"
else
    echo "⚠️  NOT FOUND (Optional - only needed for local builds)"
fi

# Check 5: Project structure
echo -n "✓ Checking project structure... "
if [ -d "frontend" ] && [ -f "frontend/package.json" ] && [ -f "frontend/Dockerfile" ]; then
    echo "✅ READY"
else
    echo "❌ FAILED"
    echo "  → Run from repo root directory"
    echo "  → Ensure frontend/ directory exists with package.json and Dockerfile"
    exit 1
fi

# Check 6: Scripts
echo -n "✓ Checking deployment scripts... "
if [ -f "scripts/deploy-lambda.sh" ]; then
    echo "✅ READY"
else
    echo "❌ FAILED"
    echo "  → Script scripts/deploy-lambda.sh not found"
    exit 1
fi

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  ✅ ALL CHECKS PASSED - READY TO DEPLOY!                      ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "Next step: Run deployment script"
echo ""
echo "  $ bash scripts/deploy-lambda.sh"
echo ""
echo "This will:"
echo "  1. Build your React frontend"
echo "  2. Create Docker image"
echo "  3. Push to AWS ECR"
echo "  4. Create Lambda function"
echo "  5. Provide public URL"
echo ""
echo "Estimated time: ~10 minutes"
echo ""
