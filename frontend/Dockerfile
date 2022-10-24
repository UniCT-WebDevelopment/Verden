# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./

# environment variables
# used by Vue.js app as `process.env.<name>` into the views/components
ARG BACKEND_URL

RUN npm install
RUN npx browserslist@latest --update-db
COPY . .
RUN npm run build && npm run generate

# production stage
FROM nginx:stable-alpine as production-stage
COPY ./nginx.conf /temp/prod.conf
RUN envsubst /app < /temp/prod.conf > /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
