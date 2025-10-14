# Multi-stage Dockerfile for Blackout Industries Website
# Stage 1: Base - Install dependencies
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# Stage 2: Development - Hot reload
FROM base AS development
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# Stage 3: Build - Generate static site
FROM base AS build
COPY . .
RUN npm run generate

# Stage 4: Production - Serve with Nginx
FROM nginx:alpine AS production
COPY --from=build /app/.output/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
