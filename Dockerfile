# # Dockerfile for React client

# # Build react client
# FROM node:17-alpine

# # Working directory be app
# WORKDIR /usr/src/app

# COPY package*.json ./

# ###  Installing dependencies

# RUN npm install

# # copy local files to app folder
# COPY . .

# EXPOSE 3000

# CMD ["npm","start"]



FROM node:17 as node
# # Setting the remote DIR to /app
WORKDIR /app
# # COPY the current folder
COPY . .
# RUN rm -r build
# RUN rm -r node_modules
# # run npm i (install all the dependencies)
RUN npm install
# # this will generate dist
RUN npm run build --prod

# stage 2 (Running the app (i.e for production))
FROM nginx:alpine
COPY --from=node /app/build /usr/share/nginx/html