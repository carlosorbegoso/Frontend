FROM node:16-alpine3.14 AS build-env

WORKDIR /app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm install

COPY . ./
RUN npm run build
