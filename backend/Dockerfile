# Stage 1: Build
FROM node:16 as build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# Stage 2: Final Image
FROM node:16
WORKDIR /app
COPY --from=build /app .
EXPOSE 5000
CMD ["node", "src/index.js"]
