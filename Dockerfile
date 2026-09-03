# Use an official lightweight Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files first (better layer caching - deps only reinstall if these change)
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Document which port the app listens on
EXPOSE 3000

# Command to run the app when the container starts
CMD ["node", "app.js"]
