#!/bin/bash
# Lambda Frontend Deployment Script
# This script builds and deploys your React frontend to AWS Lambda

set -e

echo "🚀 AWS Lambda Frontend Deployment Script"
echo "========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
AWS_REGION=${AWS_REGION:-us-east-1}
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
ECR_REPO_NAME="huma-frontend"
LAMBDA_FUNCTION_NAME="huma-frontend-app"
IMAGE_TAG="latest"

echo -e "${YELLOW}Configuration:${NC}"
echo "AWS Region: $AWS_REGION"
echo "AWS Account ID: $AWS_ACCOUNT_ID"
echo "ECR Repository: $ECR_REPO_NAME"
echo "Lambda Function: $LAMBDA_FUNCTION_NAME"
echo ""

# Step 1: Build React Frontend
echo -e "${YELLOW}Step 1: Building React Frontend...${NC}"
cd frontend
if [ ! -d "build" ]; then
    echo "Installing dependencies..."
    npm ci --legacy-peer-deps
    echo "Building React app..."
    npm run build
else
    echo "✓ Build directory already exists"
fi
cd ..

# Step 2: Build Docker Image
echo -e "${YELLOW}Step 2: Building Docker Image...${NC}"
docker build -t $ECR_REPO_NAME:$IMAGE_TAG -f frontend/Dockerfile .
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Docker image built successfully${NC}"
else
    echo -e "${RED}✗ Docker build failed${NC}"
    exit 1
fi

# Step 3: Check Docker image size
IMAGE_SIZE=$(docker images --format "table {{.Repository}}:{{.Tag}}\t{{.Size}}" | grep "$ECR_REPO_NAME:$IMAGE_TAG" | awk '{print $2}')
echo "Docker Image Size: $IMAGE_SIZE"

# Step 4: Create/Get ECR Repository
echo -e "${YELLOW}Step 3: Setting up AWS ECR Repository...${NC}"
ECR_URI="$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO_NAME"

if aws ecr describe-repositories --repository-names $ECR_REPO_NAME --region $AWS_REGION 2>/dev/null; then
    echo "✓ ECR repository already exists"
else
    echo "Creating ECR repository..."
    aws ecr create-repository \
        --repository-name $ECR_REPO_NAME \
        --region $AWS_REGION \
        --image-scanning-configuration scanOnPush=true
    echo -e "${GREEN}✓ ECR repository created${NC}"
fi

# Step 5: Login to ECR
echo -e "${YELLOW}Step 4: Logging in to AWS ECR...${NC}"
aws ecr get-login-password --region $AWS_REGION | \
    docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Step 6: Tag and Push Image
echo -e "${YELLOW}Step 5: Tagging and Pushing Image to ECR...${NC}"
docker tag $ECR_REPO_NAME:$IMAGE_TAG $ECR_URI:$IMAGE_TAG
docker tag $ECR_REPO_NAME:$IMAGE_TAG $ECR_URI:latest

echo "Pushing image to ECR..."
docker push $ECR_URI:$IMAGE_TAG
docker push $ECR_URI:latest
echo -e "${GREEN}✓ Image pushed to ECR${NC}"

# Step 7: Check if Lambda function exists
echo -e "${YELLOW}Step 6: Checking Lambda Function...${NC}"
LAMBDA_EXISTS=$(aws lambda get-function --function-name $LAMBDA_FUNCTION_NAME --region $AWS_REGION 2>/dev/null || echo "NOT_FOUND")

if [ "$LAMBDA_EXISTS" = "NOT_FOUND" ]; then
    echo "Lambda function does not exist. Creating..."
    
    # Create IAM role for Lambda
    ROLE_NAME="lambda-frontend-execution-role"
    if ! aws iam get-role --role-name $ROLE_NAME 2>/dev/null; then
        echo "Creating IAM role: $ROLE_NAME"
        aws iam create-role \
            --role-name $ROLE_NAME \
            --assume-role-policy-document '{
                "Version": "2012-10-17",
                "Statement": [
                    {
                        "Effect": "Allow",
                        "Principal": {
                            "Service": "lambda.amazonaws.com"
                        },
                        "Action": "sts:AssumeRole"
                    }
                ]
            }'
        
        # Attach basic execution policy
        aws iam attach-role-policy \
            --role-name $ROLE_NAME \
            --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
        
        sleep 5  # Wait for role to be available
    fi
    
    ROLE_ARN=$(aws iam get-role --role-name $ROLE_NAME --query 'Role.Arn' --output text)
    
    # Create Lambda function
    aws lambda create-function \
        --function-name $LAMBDA_FUNCTION_NAME \
        --role $ROLE_ARN \
        --code ImageUri=$ECR_URI:latest \
        --package-type Image \
        --timeout 60 \
        --memory-size 512 \
        --environment Variables="{STAGE=production}" \
        --region $AWS_REGION
    
    echo -e "${GREEN}✓ Lambda function created${NC}"
else
    echo "✓ Lambda function exists, updating..."
    aws lambda update-function-code \
        --function-name $LAMBDA_FUNCTION_NAME \
        --image-uri $ECR_URI:latest \
        --region $AWS_REGION
    
    echo -e "${GREEN}✓ Lambda function updated${NC}"
fi

# Step 8: Create Function URL
echo -e "${YELLOW}Step 7: Setting up Lambda Function URL...${NC}"
FUNCTION_URL=$(aws lambda get-function-url-config \
    --function-name $LAMBDA_FUNCTION_NAME \
    --region $AWS_REGION 2>/dev/null | jq -r '.FunctionUrl' || echo "NOT_FOUND")

if [ "$FUNCTION_URL" = "NOT_FOUND" ] || [ -z "$FUNCTION_URL" ]; then
    echo "Creating Function URL..."
    aws lambda create-function-url-config \
        --function-name $LAMBDA_FUNCTION_NAME \
        --auth-type NONE \
        --cors "{AllowOrigins=[\"*\"],AllowMethods=[\"GET\",\"POST\",\"PUT\",\"DELETE\",\"OPTIONS\"],AllowHeaders=[\"Content-Type\",\"Authorization\"],MaxAge=300}" \
        --region $AWS_REGION
    
    FUNCTION_URL=$(aws lambda get-function-url-config \
        --function-name $LAMBDA_FUNCTION_NAME \
        --region $AWS_REGION | jq -r '.FunctionUrl')
    
    echo -e "${GREEN}✓ Function URL created${NC}"
else
    echo "✓ Function URL already exists"
fi

# Step 9: Display Results
echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo "📊 Image Details:"
echo "  Repository: $ECR_URI"
echo "  Image Size: $IMAGE_SIZE"
echo ""
echo "⚡ Lambda Details:"
echo "  Function Name: $LAMBDA_FUNCTION_NAME"
echo "  Function URL: $FUNCTION_URL"
echo ""
echo "🌐 Access your frontend at:"
echo -e "  ${GREEN}${FUNCTION_URL}${NC}"
echo ""
echo "📝 Next Steps:"
echo "  1. Open the URL in your browser to test the frontend"
echo "  2. Check Lambda logs: aws logs tail /aws/lambda/$LAMBDA_FUNCTION_NAME --follow"
echo "  3. Monitor invocations: aws lambda get-function-concurrency --function-name $LAMBDA_FUNCTION_NAME"
echo ""
