# Use a lightweight Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching dependencies)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the API port
EXPOSE 4000

# Run the API using nodemon in development mode
CMD ["npx", "nodemon", "src/index.ts"]