FROM node:22.18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


FROM node:22.18-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]

FROM node:22.18-alpine AS dev

WORKDIR /app

COPY package*.json ./
RUN npm ci
RUN npm install -g nodemon

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
