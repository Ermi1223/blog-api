# Use official Node.js LTS image
FROM node:18


# Set working directory
WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install --production

# Copy the rest of the source code
COPY . .

# Build TypeScript code
RUN npm run build

# Expose app port
EXPOSE 3000

# Start the app
CMD ["node", "dist/main.js"]
