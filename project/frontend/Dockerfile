# Use the official Node.js image as a parent image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY ../.. .

# Change the ownership of the application directory to the 'node' user
RUN chown -R node:node /usr/src/app

# Switch to the 'node' user
USER node

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "dev"]
