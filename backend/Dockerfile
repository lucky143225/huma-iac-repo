# Stage 1: Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .

# Stage 2: Production stage (small runtime image)
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app .
EXPOSE 3000
CMD ["node", "server.js"]
