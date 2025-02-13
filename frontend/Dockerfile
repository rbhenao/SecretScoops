# Use Node.js Alpine for a lightweight container
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose the frontend development port
EXPOSE ${FRONTEND_PORT}

# Run the frontend in development mode
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]