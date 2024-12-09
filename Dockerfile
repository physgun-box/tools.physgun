# Use the official lightweight Node.js 14 image.
# https://hub.docker.com/_/node
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of your app's source code
COPY . .

# Build your Next.js app
RUN npm run build

# Expose port 3000 to the Docker daemon so it can communicate
EXPOSE 80

# Run the Next.js start script
CMD ["npm", "start"]