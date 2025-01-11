# Stage 1: Build the backend
FROM node:18-alpine AS build-backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install --production --no-cache
COPY backend/ .

# Stage 2: Build the frontend
FROM node:18-alpine AS build-frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install --production --no-cache
COPY frontend/ .
RUN npm run build

# Stage 3: Setup the final container
FROM node:18-alpine
WORKDIR /app

# Copy backend files
COPY --from=build-backend /app/backend ./
# Copy frontend build files
COPY --from=build-frontend /app/frontend/build ./public

# Install process manager
RUN npm install -g pm2

# Expose ports
EXPOSE 3000 80

# Start both backend and frontend
CMD ["pm2-runtime", "start", "--no-daemon", "npm --prefix /app start", "npx serve -s /app/public -l 80"]
