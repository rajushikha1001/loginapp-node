# Step 1: Use the official Node.js image as the base image
FROM node:16

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json (if available) to the container
COPY package*.json ./

# Step 4: Install the app dependencies inside the container
RUN npm install

# Step 5: Copy the rest of the application files to the container
COPY . .

# Step 6: Expose the port your app is listening on
EXPOSE 3000

# Step 7: Define the command to run your app when the container starts
CMD ["node", "app.js"]
