FROM node:20-alpine

WORKDIR /app/backend

COPY backend/package*.json ./

RUN if [ -f package-lock.json ]; then npm ci --omit=dev; else npm install --omit=dev; fi

COPY backend ./

WORKDIR /app
COPY database ./database

WORKDIR /app/backend

EXPOSE 3001

CMD ["npm", "start"]