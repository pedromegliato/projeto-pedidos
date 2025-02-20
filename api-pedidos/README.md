# API de Pedidos

Esta é a API de Pedidos desenvolvida com **Fastify** utilizando **TypeScript**, **TypeORM** e **MySQL**. O projeto foi estruturado para facilitar a manutenção e escalabilidade, e faz parte de uma arquitetura maior gerenciada por Docker.

---

## Sumário

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Configuração e Execução](#configuração-e-execução)
- [Docker e Ambiente de Produção](#docker-e-ambiente-de-produção)
- [Configuração do TypeScript](#configuração-do-typescript)
- [Documentação das Rotas](#documentação-das-rotas)
- [Licença](#licença)

---

## Tecnologias Utilizadas

- **Fastify** com TypeScript: Framework de alta performance para construção da API.
- **TypeORM**: ORM utilizado para comunicação com o banco de dados MySQL.
- **Yarn**: Gerenciador de pacotes utilizado para instalação e gerenciamento das dependências.
- **Swagger**: Integração com Fastify para gerar a documentação das rotas (acessível via `/api-docs-pedidos`).
- **Docker**: Containerização do ambiente de execução (conforme Dockerfile e docker-compose).

---

## Estrutura do Projeto

O projeto possui a seguinte estrutura de diretórios:

```
projeto-pedidos
├── api-pedidos
│   └── src
│       ├── app.ts
│       ├── config
│       │   └── ormconfig.ts            # Configuração do TypeORM
│       ├── entities                    # Entidades do banco de dados
│       │   ├── clientes.ts
│       │   ├── pedido.ts
│       │   ├── pedidoitem.ts
│       │   └── produto.ts
│       ├── modules                   # Módulos da API
│       │   ├── cliente
│       │   │   ├── controller         # Lógica de controle
│       │   │   ├── dto                # Data Transfer Objects
│       │   │   ├── schemas            # Schemas para validação (Fastify Schema)
│       │   │   └── service            # Regras de negócio
│       │   │   └── index.ts           # Rotas do módulo
│       │   ├── pedido
│       │   │   └── (estrutura semelhante ao módulo cliente)
│       │   ├── healt-check
│       │   │   └── (estrutura semelhante)
│       │   ├── peedidoItem
│       │   │   └── (estrutura semelhante)
│       │   └── produto
│       │       └── (estrutura semelhante)
│       └── plugins
│           └── swaggur.ts            # Plugin para integração do Swagger
├── daatabse                         # Scripts ou arquivos relacionados ao banco de dados
├── web-pedidos                      # Interface ou front-end do sistema de pedidos
└── docker-compose.yml               # Arquivo para orquestração dos containers Docker
```

### Destaques:

- **api-pedidos/src/config/ormconfig.ts**: Configura a conexão com o banco MySQL e define as entidades que serão mapeadas pelo TypeORM.
- **api-pedidos/src/entities/**: Contém as definições das entidades (ex.: *Cliente*, *Pedido*, *PedidoItem*, *Produto*) com suas respectivas colunas e relacionamentos.
- **api-pedidos/src/modules/**: Cada módulo (como *cliente*, *pedido*, etc.) possui sua própria lógica separada em controller, DTO, schemas (para validação) e serviço, além de um arquivo `index.ts` que define as rotas.
- **api-pedidos/src/plugins/swaggur.ts**: Plugin que integra o Swagger à API, permitindo acesso à documentação interativa das rotas.

---

## Relacionamentos Entre Entidades

No projeto, os relacionamentos entre as entidades foram definidos da seguinte forma:

- **Produtos e Pedido Itens (um para muitos):**  
  Cada produto pode estar associado a vários itens de pedidos, permitindo que um mesmo produto apareça em diferentes pedidos.

- **Clientes e Pedidos (um para muitos):**  
  Cada cliente pode realizar diversos pedidos, representando a relação onde um cliente pode ter múltiplas transações.

- **Pedidos e Pedido Itens (um para muitos):**  
  Cada pedido pode conter múltiplos itens, configurando a estrutura onde um único pedido pode agrupar vários produtos.

Esses relacionamentos foram implementados utilizando as funcionalidades do TypeORM para facilitar a manutenção e integridade dos dados.

---

## Configuração e Execução

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 20 ou superior)
- [Yarn](https://yarnpkg.com/)
- Banco de dados MySQL
- (Opcional) Docker e Docker Compose para execução em containers

### Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/pedromegliato/projeto-pedidos.git
   cd projeto-pedidos/api-pedidos
   ```

2. **Instale as dependências:**

   ```bash
   yarn install
   ```

3. **Configure as variáveis de ambiente:**

   Crie um arquivo `.env` na raiz do diretório `api-pedidos` (ou utilize o arquivo `.env.examplee` como referência):

   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=pedro
   DB_PASS=pedro123
   DB_NAME=db_pedidos

   API_PORT=3000
   ```

4. **Compile o projeto (se necessário):**

   ```bash
   yarn build:ts
   ```

5. **Inicie a aplicação:**

   ```bash
   yarn start
   ```

A API estará disponível na porta definida (por padrão, `3000`). Você pode acessar a documentação interativa das rotas via Swagger em `http://localhost:3000/api-docs-pedidos`.

---

## Docker e Ambiente de Produção

O projeto foi preparado para ser executado em um ambiente Docker, utilizando uma imagem multi-stage. A estrutura do Dockerfile é a seguinte:

### Dockerfile

```dockerfile
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
```

### docker-compose

O arquivo `docker-compose.yml` orquestra os containers que compõem o sistema (incluindo a API, banco de dados e front-end). Ao subir o ambiente com Docker Compose, todos os serviços serão iniciados de forma integrada.

---

## Configuração do TypeScript

O arquivo `tsconfig.json` possui as seguintes configurações:

```json
{
  "compilerOptions": {
    "target": "ES2022",                   // Versão do ECMAScript para o output
    "module": "commonjs",                 // Sistema de módulos utilizado
    "moduleResolution": "node",           // Resolução dos módulos conforme Node.js
    "esModuleInterop": true,              // Coompatibilidade com módulos ES
    "strict": true,                       // Habilita verificações estritas de tipo
    "strictPropertyInitialization": false,// Desabilita inicialização estrita de propriedades
    "skipLibCheck": true,                 // Pula verificação de tipos em arquivos de declaração
    "outDir": "dist",                     // Diretório de saída dos arquivos compilados
    "rootDir": "src",                     // Diretório raiz dos arquivos fonte
    "types": ["node"],                    // Inclui definições de tipos para Node.js
    "sourceMap": true,                    // Gera source maps para depuração
    "experimentalDecorators": true,       // Habilita o uso de decoradores experimentais
    "emitDecoratorMetadata": true         // Emite metadados para decoradores
  },
  "include": ["src/**/*.ts", "src/modules/clientes/index.ts"],
  "exclude": ["node_modules"]
}
```

Essas configurações garantem uma compilação robusta e permitem o uso de recursos modernos do JavaScript e TypeScript, como decoradores e geração de source maps.

---

## Documentação das Rotas

A documentação das rotas é gerada automaticamente pelo **Swagger**, integrado através do plugin localizado em `src/plugins/swagger.ts`. As rotas da API estão organizadas por módulos (por exemplo, *Clientes*, *Pedidos*, *Produtos*, etc.), cada uma com seus reespectivos scheemas de validação e definição de parâmetros.

Você pode acessar a documentação interativa em:

```
http://localhost:3000/api-docs-pedidos
```

Nela, estão descritas as rotas, os métodos HTTP, parâmetros esperados e respostas possíveis, facilitando a integração com a API.

---

## Licença

Este projeto é licenciado sob a licença **MIT**.

---

**By Pedro Megliato**