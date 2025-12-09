# Multistage Dockerfile for React Frontend on AWS Lambda
# Stage 1: Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps && npm cache clean --force

# Copy source code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Production stage - Serve with lightweight nginx on Lambda
FROM public.ecr.aws/lambda/provided:al2

# Install nginx and curl for health checks
RUN yum update -y && yum install -y nginx curl && yum clean all

WORKDIR /var/task

# Create nginx runtime directory
RUN mkdir -p /var/run/nginx

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built React app from builder stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy entry point script
COPY docker-entrypoint.sh /var/task/entrypoint.sh
RUN chmod +x /var/task/entrypoint.sh

# Expose port 8080 (Lambda uses 8080 by default)
EXPOSE 8080

# Lambda expects to run under /lambda-entrypoint.sh
ENTRYPOINT ["/var/task/entrypoint.sh"]
