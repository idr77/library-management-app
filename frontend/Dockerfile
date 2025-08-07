# =============================================================================
# DOCKERFILE FOR REACT FRONTEND APPLICATION
# =============================================================================
# 
# This Dockerfile builds a Docker image for the frontend library
# management application based on React.
# 
# Steps:
# 1. Uses Node.js 18 Alpine as base image
# 2. Sets up working directory
# 3. Copies npm dependency files
# 4. Installs dependencies
# 5. Copies source code
# 6. Compiles React application
# 7. Installs serve to serve the application
# 8. Exposes port 3000
# 9. Starts the server
#
# =============================================================================

# Base image : Node.js 18 with Alpine distribution (lighter)
FROM node:18-alpine

# Sets the working directory in the container
WORKDIR /app

# Copies npm dependency files
# package.json and package-lock.json to install dependencies
# This step allows leveraging Docker cache for dependencies
COPY package*.json ./

# Installs npm dependencies
# Installs all dependencies listed in package.json
RUN npm install

# Copies React application source code
# Includes all JavaScript, CSS and other resource files
COPY . .

# Compiles React application for production
# Creates optimized build in build/ folder
RUN npm run build

# Installs serve to serve React application
# serve is a lightweight web server for serving static applications
RUN npm install -g serve

# Exposes port 3000 for HTTP connections
# This port corresponds to the one used by React application in development
EXPOSE 3000

# Command to start the server and serve React application
# -s build : Serves files from build folder
# -l 3000 : Listens on port 3000
CMD ["serve", "-s", "build", "-l", "3000"]
