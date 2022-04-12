FROM node:16-alpine3.14 AS build-env

WORKDIR /app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm install

COPY . ./
RUN npm run build
FROM nginx:1.13.9-alpine
COPY --from=build-env /app/dist/frontend/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]