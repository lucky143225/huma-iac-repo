FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --production --no-cache
COPY . .
RUN npm run build

# Stage 2: Serve Frontend with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:80 || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
