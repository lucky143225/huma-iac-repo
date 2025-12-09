# Deploy React Frontend to AWS Lambda

This guide walks you through building a Docker image of your React frontend and deploying it to AWS Lambda.

## Prerequisites

- **AWS Account** with appropriate permissions (ECR, Lambda, IAM)
- **Docker** installed and running
- **AWS CLI** configured with credentials
- **Git** for version control

## Architecture

```
React App (Build) → Docker Image → ECR Repository → Lambda Function → Lambda Function URL
```

## Step-by-Step Deployment

### Step 1: Build the Frontend

```bash
cd frontend
npm ci --legacy-peer-deps
npm run build
cd ..
```

This creates the `frontend/build/` directory containing your optimized React app.

### Step 2: Build Docker Image

```bash
docker build -t huma-frontend:latest -f frontend/Dockerfile .
```

Check the image size:
```bash
docker images | grep huma-frontend
```

Expected size: **~200-300MB** (much smaller than typical Node images)

### Step 3: Run Locally (Optional)

```bash
docker run -p 8080:8080 huma-frontend:latest
```

Visit `http://localhost:8080` to verify it works.

### Step 4: Automated Deployment to Lambda

We've provided an automated deployment script. Make it executable and run it:

```bash
chmod +x scripts/deploy-lambda.sh
AWS_REGION=us-east-1 bash scripts/deploy-lambda.sh
```

The script will:
1. ✅ Build the React frontend if not already built
2. ✅ Build the Docker image
3. ✅ Create an ECR repository (if it doesn't exist)
4. ✅ Login to AWS ECR
5. ✅ Push the image to ECR
6. ✅ Create a Lambda function (or update existing)
7. ✅ Create a Lambda Function URL
8. ✅ Display the public URL to access your frontend

### Step 5: Access Your Frontend

The deployment script will output a URL like:

```
🌐 Access your frontend at:
   https://xxxxxxxxxxxxx.lambda-url.us-east-1.on.aws/
```

Open this URL in your browser to see your React app running on Lambda!

## Manual Deployment (If Needed)

If you prefer to deploy manually:

### 1. Create ECR Repository

```bash
aws ecr create-repository \
    --repository-name huma-frontend \
    --region us-east-1 \
    --image-scanning-configuration scanOnPush=true
```

### 2. Push Image to ECR

```bash
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
AWS_REGION=us-east-1

# Login to ECR
aws ecr get-login-password --region $AWS_REGION | \
    docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Tag and push
docker tag huma-frontend:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/huma-frontend:latest
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/huma-frontend:latest
```

### 3. Create Lambda Function

```bash
# Create IAM role for Lambda
aws iam create-role \
    --role-name lambda-frontend-execution-role \
    --assume-role-policy-document '{
        "Version": "2012-10-17",
        "Statement": [{
            "Effect": "Allow",
            "Principal": {"Service": "lambda.amazonaws.com"},
            "Action": "sts:AssumeRole"
        }]
    }'

# Attach execution policy
aws iam attach-role-policy \
    --role-name lambda-frontend-execution-role \
    --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

# Create the Lambda function
aws lambda create-function \
    --function-name huma-frontend-app \
    --role arn:aws:iam::$AWS_ACCOUNT_ID:role/lambda-frontend-execution-role \
    --code ImageUri=$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/huma-frontend:latest \
    --package-type Image \
    --timeout 60 \
    --memory-size 512 \
    --region $AWS_REGION
```

### 4. Create Function URL

```bash
aws lambda create-function-url-config \
    --function-name huma-frontend-app \
    --auth-type NONE \
    --cors "AllowOrigins=['*'],AllowMethods=['GET','POST','PUT','DELETE','OPTIONS'],AllowHeaders=['Content-Type','Authorization'],MaxAge=300" \
    --region $AWS_REGION
```

### 5. Get Function URL

```bash
aws lambda get-function-url-config \
    --function-name huma-frontend-app \
    --region $AWS_REGION
```

## Monitoring & Debugging

### View Lambda Logs

```bash
aws logs tail /aws/lambda/huma-frontend-app --follow
```

### Check Function Configuration

```bash
aws lambda get-function --function-name huma-frontend-app
```

### Test the Function

```bash
curl https://xxxxxxxxxxxxx.lambda-url.us-east-1.on.aws/
```

### Health Check Endpoint

```bash
curl https://xxxxxxxxxxxxx.lambda-url.us-east-1.on.aws/health
```

## Update Frontend

To update your frontend after making changes:

```bash
# 1. Rebuild
cd frontend
npm run build
cd ..

# 2. Rebuild Docker image
docker build -t huma-frontend:latest -f frontend/Dockerfile .

# 3. Redeploy (using script or manual commands above)
bash scripts/deploy-lambda.sh
```

## Troubleshooting

### Docker Build Fails

```bash
# Clean up and rebuild
docker system prune -a
docker build --no-cache -t huma-frontend:latest -f frontend/Dockerfile .
```

### ECR Push Fails

```bash
# Re-login to ECR
aws ecr get-login-password --region us-east-1 | \
    docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com
```

### Lambda Shows Errors

1. Check logs: `aws logs tail /aws/lambda/huma-frontend-app --follow`
2. Verify nginx is running in container
3. Check Lambda memory: may need to increase to 512MB or higher
4. Check timeout: default 3s may be too short, increase to 30-60s

### Function URL Not Working

1. Verify auth-type is NONE: `aws lambda get-function-url-config --function-name huma-frontend-app`
2. Wait a few minutes after creation for URL to be fully active
3. Check CORS configuration

## Cost Optimization

Lambda pricing in US East 1:
- **Free Tier**: 1M requests/month + 400K GB-seconds
- **Requests**: $0.20 per 1M requests
- **Duration**: $0.0000166667 for every GB-second

For a small frontend app with 1M monthly visitors:
- ~$0.20/month for requests
- ~$5-10/month for compute (depending on response time)
- **Total: ~$5-10/month** (usually within free tier!)

## Security Considerations

1. ✅ Non-root nginx user
2. ✅ Security headers configured (X-Frame-Options, X-Content-Type-Options, etc.)
3. ✅ Health check endpoint protected
4. ✅ Static assets cached
5. ✅ Gzip compression enabled
6. ✅ Access logs for monitoring

## Next Steps

1. **Add Custom Domain**: Use Route 53 + API Gateway for custom domain
2. **Enable CDN**: Add CloudFront in front of Lambda for global caching
3. **Auto-scaling**: Lambda auto-scales by default; adjust memory for performance
4. **CI/CD**: Use GitHub Actions to automate this deployment

## Questions?

Check the deployment logs:
```bash
docker logs <container-id>
aws logs tail /aws/lambda/huma-frontend-app --follow
```

For AWS Lambda documentation: https://docs.aws.amazon.com/lambda/
