# Stage 1: Build the React app
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (use npm install to avoid npm ci lockfile issues)
RUN npm install --legacy-peer-deps && npm cache clean --force

# Copy the rest of the source
COPY . .

# Build the React app (Vite/React – output is usually dist/)
RUN npm run build

# Stage 2: Lambda Runtime with nginx + JS
FROM public.ecr.aws/lambda/nodejs:20

# Install nginx on Amazon Linux 2023 (uses dnf, not yum/amazon-linux-extras)
RUN dnf -y install nginx && \
    dnf clean all && \
    rm -rf /var/cache/dnf

# Create nginx runtime dirs
RUN mkdir -p /var/run/nginx /var/log/nginx

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Change to /app/build if you're using CRA instead of Vite.
COPY --from=build /app/build /usr/share/nginx/html

# Lambda will call index.handler on each invocation
COPY lambda-handler.js ${LAMBDA_TASK_ROOT}/index.js
EXPOSE 8080

# Set the Lambda handler
CMD [ "index.handler" ]
