# Stage 1: Build
FROM node:16 as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
