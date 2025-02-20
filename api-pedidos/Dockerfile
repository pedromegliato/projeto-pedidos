# Etapa 1: Build (compatível com ARM)
FROM node:20-alpine AS builder
WORKDIR /app

# Copia os arquivos de dependências e instala (com cacheee para acelerar builds)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copia a configuração do TypeScript e o código fonte
COPY tsconfig.json ./
COPY src ./src

# Compila o projeto (gera o diretório "dist")
RUN yarn build

# Etapa 2: Imagem de Runtime
FROM node:20-alpine
WORKDIR /app

# Copia os arquivos de produção
COPY --from=builder /app/package.json /app/yarn.lock ./
RUN yarn install --production --frozen-lockfile

COPY --from=builder /app/dist ./dist

# Expor a porta configurada (API_PORT = 3000)
EXPOSE 3000

# Inicia a aplicação
CMD ["node", "dist/index.js"]
