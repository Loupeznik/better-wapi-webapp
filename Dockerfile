FROM node:19-alpine as build

WORKDIR /app

COPY . .

RUN npm install -g pnpm

RUN pnpm install

RUN pnpm run build

FROM nginx:alpine AS final

WORKDIR /usr/share/nginx/html

VOLUME /usr/share/nginx/html

COPY --from=build /app/dist .
COPY --from=build /app/conf/nginx.conf /etc/nginx/conf.d/default.conf
