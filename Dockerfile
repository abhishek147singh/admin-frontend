# Use Node.js base image for building Angular app
FROM node:18.18.1-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy Angular app files
COPY . .

# Build Angular app
RUN npm run build

# Use Nginx base image for serving Angular app
FROM nginx:alpine

#copy custom nginx conf file
COPY /nginx-custom.conf /etc/nginx/conf.d/default.conf

#remove default static content of nginx
RUN rm -rf /usr/share/nginx/html/*

# Copy built Angular app from previous stage
COPY --from=builder /app/dist/admin-frontend/browser /usr/share/nginx/html/

# Expose port
EXPOSE 80

# Command to run Nginx
RUN chown -R nginx:nginx /usr/share/nginx/html