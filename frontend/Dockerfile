# Stage 1: Build the React app
FROM node:16.14.0-alpine as builder
WORKDIR /app

# Copy package.json and yarn.lock files
COPY package*.json .
COPY yarn*.lock .

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN yarn build

# Stage 2: Serve the React app with Nginx
FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html

# Remove the default Nginx static files
RUN rm -rf ./*

# Copy the build output from the builder stage
COPY --from=builder /app/build .

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]