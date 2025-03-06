# Use an official Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all frontend files
COPY . .

# Expose the port
EXPOSE 3000

# Start the frontend
CMD ["npm", "start"]
