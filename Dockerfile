# # Dockerfile for React client

## Stage 1: Build app
# Using node 17 as base image
FROM node:17 as node

# Setting the remote DIR to /app
WORKDIR /app

# COPY the current folder
COPY . .

# run npm i (install all the dependencies)
RUN npm install

# this will generate dist
RUN npm run build --prod


## Stage 2: Running the app (i.e for production)
FROM nginx:alpine
COPY --from=node /app/build /usr/share/nginx/html