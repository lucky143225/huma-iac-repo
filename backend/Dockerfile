# Stage 1: Build stage
FROM node:18-alpine AS build

# # Declare build time environment variables
# ARG BACKEND_PORT
# ARG SECRETKEY
# ARG TWILIO_ACCOUNT_SID
# ARG TWILIO_AUTH_TOKEN
# ARG TWILIO_PHONE_NUMBER
# ARG EMAIL_USER
# ARG EMAIL_PASS

# # Set default values for environment variables
# ENV BACKEND_PORT=$BACKEND_PORT
# ENV SECRETKEYL=$SECRETKEY
# ENV TWILIO_ACCOUNT_SID=$TWILIO_ACCOUNT_SID
# ENV TWILIO_AUTH_TOKEN=$TWILIO_AUTH_TOKEN
# ENV TWILIO_PHONE_NUMBER=$TWILIO_PHONE_NUMBER
# ENV EMAIL_USER=$EMAIL_USER
# ENV EMAIL_PASS=EMAIL_PASS

WORKDIR /app
COPY package*.json ./
RUN npm install --production --no-cache
COPY . .

# Stage 2: Production stage (small runtime image)
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app .
EXPOSE 3000
CMD ["npm", "start"]
