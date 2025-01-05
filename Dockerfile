# FROM node:18-alpine
# ENV DOMAIN="http://localhost:3000" \
#     PORT=3000 
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 3000
# CMD ["node", "server.js"]


# Stage 1: Build Backend
FROM node:18-alpine as backend-build
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install --production --no-cache
COPY backend ./
RUN npm run build


# Stage 2: Build Frontend
FROM node:18-alpine as frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install --production --no-cache
COPY frontend ./
RUN npm run build

# Stage 3: Final Image with Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=frontend-build /app/frontend ./frontend
COPY --from=backend-build /app/backend ./backend
COPY nginx/nginx.conf /etc/nginx/nginx.conf


# Expose ports
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]