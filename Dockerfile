# --- Build Stage ---
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . .

# Build the Next.js application
RUN npm run build

# --- Production Stage ---
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the production dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy the build files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
