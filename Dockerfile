FROM node:12.13.1-alpine
WORKDIR /usr/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./