# ----- BUILD STAGE -----
FROM node AS build

# Temporarily necessary, see https://github.com/webpack/webpack/issues/14532
ARG NODE_OPTIONS=--openssl-legacy-provider

WORKDIR /app

# Rebuild everything if those files change
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install -g @angular/cli

COPY ./angular.json angular.json
COPY ./browserslist browserslist
COPY ./*.json ./
COPY ./src src
RUN ng build --configuration production

# ----- REGISTRY IMAGE -----
FROM nginx

WORKDIR /opt
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./docker-entrypoint.sh .
COPY --from=build /app/dist/ui/* ./
COPY ./src/assets ./assets

ENV CLIENT_ID=adminUI

EXPOSE 80
ENTRYPOINT ["/bin/bash", "./docker-entrypoint.sh"]
CMD ["/docker-entrypoint.sh","nginx","-g","daemon off;"]
