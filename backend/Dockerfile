FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .

# Build TypeScript
RUN npx tsc

EXPOSE 3001

CMD ["node", "dist/index.js"]
