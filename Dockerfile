# specify the node base image with your desired version node:<version>
FROM node:latest
# replace this with your application's default port
EXPOSE 3000
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD node app.js