FROM node:18-alpine AS build

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

RUN cp -r /app/dist/* /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]