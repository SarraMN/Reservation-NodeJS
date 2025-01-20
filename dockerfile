# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if you have one) to install dependencies
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the application files
COPY . .
ENV PORT=9090
# Expose the port your application will run on
EXPOSE $PORT

# Run the application when the container starts
CMD ["npm", "start"]
