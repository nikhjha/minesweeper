FROM node:18.11-slim

WORKDIR /frontend
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install

COPY . .

CMD [ "npm", "run", "host" ]