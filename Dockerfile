FROM node:alpine
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . /app
CMD ["node", "api/index.js"]
EXPOSE 4000