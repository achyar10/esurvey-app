# Stage 1: Build an Angular Docker Image
FROM node:14-alpine as build

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . ./

RUN npm run build

# Stage 2, use the compiled app, ready for production with Nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY /nginx-custom.conf /etc/nginx/conf.d/default.conf
