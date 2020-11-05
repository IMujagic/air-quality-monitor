
FROM node:12.9.0
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

CMD ["node", "dist/main"]