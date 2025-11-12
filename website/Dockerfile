# Build stage
FROM node:22.20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the React app with Vite
RUN npm run build

# Production stage
FROM node:22.20-alpine

WORKDIR /app

# Install a simple HTTP server to serve static files
RUN npm install -g serve

# Copy built app from builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Serve the app
CMD ["serve", "-s", "dist", "-l", "3000"]
