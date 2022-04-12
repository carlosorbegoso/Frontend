
# Angular App ========================================
# FROM frontend/angular-cli as angular-app
# LABEL authors="Carlos Orbegoso"
# # Copy and install the Angular app
# WORKDIR /app
# COPY package.json /app
# RUN npm install
# COPY . /app
# RUN ng build --prod
# # Generate the PWA's Service Worker
# RUN npm run generate-sw

#Express server =======================================
FROM node:16-alpine3.14 as express-server
WORKDIR /app
COPY /src /app
RUN npm install --production --silent

#Final image ========================================
FROM node:16-alpine3.14
RUN mkdir -p /frontend/src/app
WORKDIR /frontend/src/app
COPY --from=express-server /app /frontend/src/app
COPY --from=angular-app /app/dist /frontend/src/app
ENV PORT 80
CMD [ "node", "index.js" ]