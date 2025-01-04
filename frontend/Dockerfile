# Stage 1: Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --production --no-cache
COPY . .

# Stage 2: Production stage (small runtime image)
FROM node:18-alpine
WORKDIR /app
RUN apk add --no-cache curl
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app .
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000 || exit 1
CMD ["npm", "run", "start"]
