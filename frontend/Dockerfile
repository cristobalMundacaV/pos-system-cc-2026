FROM node:20-alpine

WORKDIR /app/frontend

COPY frontend/package*.json ./

RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY frontend ./

ARG NEXT_PUBLIC_API_URL=http://localhost:3001
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]