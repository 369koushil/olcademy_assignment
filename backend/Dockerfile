FROM node:18-alpine AS build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV PORT=5000
ENV MONGOURI=mongodb://mongo:27017/perfumeDB

EXPOSE 5000

CMD ["npm","run","dev"]

