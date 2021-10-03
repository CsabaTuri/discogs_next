# Dockerfile

# base image
FROM node:alpine

# create & set working directory
RUN mkdir -p /app
WORKDIR /app

# copy source files
COPY . /app

# install dependencies
RUN npm install

# start app
EXPOSE 3000
EXPOSE 8000
EXPOSE 49153
CMD npm run dev