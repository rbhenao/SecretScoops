# Use Node.js Alpine for a lightweight container
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the worker code
COPY . .

# Ensure nodemon is installed globally (for hot reloading)
RUN npm install -g nodemon

# Expose the port (if needed)
EXPOSE 4001

# Default command: Start workers with hot reloading
CMD ["npx", "nodemon", "--legacy-watch", "src/index.ts"]