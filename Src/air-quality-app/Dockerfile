FROM node:12.9.0 AS base-image

RUN npm install -g @angular/cli
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

ENV PATH="./node_modules/.bin:$PATH" 

COPY . ./

RUN ng build --prod

FROM nginx

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=base-image /app/www /usr/share/nginx/html

CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
