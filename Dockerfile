FROM node:22.11.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 5174

CMD ["npm", "run", "preview"]
