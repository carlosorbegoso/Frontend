# FROM node:16-alpine3.14 AS build-env

# COPY ./app
# WORKDIR /app
# RUN npm install && npm run build:prod && rm -rf node_modules/FROM nginx:1.17.9-alpine as runtime
# COPY --from=build /app/default.conf/etc/nginx/conf.d/COPY--from=build /app/dist//var/www

# Angular App ========================================
FROM node:16-alpine3.14 AS build-env
LABEL authors="Carlos Orbegoso"
# Copy and install the Angular app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN ng build --prod
# Generate the PWA's Service Worker
RUN npm run generate-sw

#Express server =======================================
FROM node:16-alpine3.14 as express-server
WORKDIR /app
COPY /src/server /app
RUN npm install --production --silent

#Final image ========================================
FROM node:16-alpine3.14
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY --from=express-server /app /usr/src/app
COPY --from=angular-app /app/dist /usr/src/app
ENV PORT 80
CMD [ "node", "index.js" ]