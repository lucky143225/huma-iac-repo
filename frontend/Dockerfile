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

# Stage 2: Production stage - Serve with nginx (alpine)
FROM nginx:stable-alpine AS runtime

# Install curl for health checks
RUN apk add --no-cache curl

WORKDIR /usr/share/nginx/html

# Copy built React app from builder stage
COPY --from=build /app/build .

# Copy custom nginx config (if it exists)
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 8080
EXPOSE 8080

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]