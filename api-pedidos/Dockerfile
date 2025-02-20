# Etapa 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY tsconfig.json ./
COPY src ./src
RUN yarn build:ts

# Etapa 2: Runtime
FROM node:20-alpine
WORKDIR /app

# Copia APENAS as dependências de produção (incluindo fastify-cli)
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/node_modules ./node_modules 
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node_modules/.bin/fastify", "start", "-l", "info", "dist/app.js"]