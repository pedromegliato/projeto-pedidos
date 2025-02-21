# Projeto Pedidos

Este repositório reúne um sistema completo para gerenciamento de pedidos, composto por três serviços principais:  
- **Banco de Dados (MySQL)**
- **Front-end Web Pedidos** (desenvolvido com Vue 3, Vuetify e TypeScript)
- **Serviços de Backend** (Nodejs Fastify, TypeScript, orquestrados via Docker Compose)

O ambiente completo é containerizado com Docker Compose, facilitando a instalação e execução tanto em ambientes de desenvolvimento quanto de produção.

---

## Sumário

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação e Execução](#instalação-e-execução)
- [Docker Compose](#docker-compose)
- [Acessando a Aplicação](#acessando-a-aplicação)
- [Licença](#licença)
- [By Pedro Megliato](#by-pedro-megliato)

---

## Visão Geral

O **Projeto Pedidos** é um sistema para gerenciamento de pedidos, clientes e produtos. O sistema permite a visualização e interação com as informações através de uma interface web moderna e responsiva. O ambiente completo é composto por:

- **Banco de Dados:** Armazena os dados dos pedidos, clientes e produtos.
- **Front-end Web Pedidos:** Interface desenvolvida com Vue 3 e Vuetify, oferecendo uma experiência amigável e responsiva.
- **Serviços de Backend:** Orquestrados para oferecer a lógica de negócio e comunicação com o banco de dados (integrados via Docker Compose).

---

## Tecnologias Utilizadas

- **Docker & Docker Compose:** Para orquestração e containerização dos serviços.
- **MySQL 8.0:** Banco de dados relacional.
- **Vue 3 & Vuetify 3:** Framework e biblioteca de componentes para construção da interface web.
- **TypeScript:** Linguagem utilizada no desenvolvimento do front-end para garantir tipagem e robustez.
- **Yarn:** Gerenciador de pacotes para instalação e atualização das dependências.

---

## Estrutura do Projeto

```
projeto-pedidos/
├── database                     # Scripts e configurações do banco de dados
│   ├── init.sql                 # Script de inicialização do MySQL
│   └── mysql.cnf                # Configuração customizada do MySQL
├── web-pedidos                  # Front-end do sistema
├── api-pedidos                  # Back-end do sistema
├── docker-compose.yml           # Orquestração dos containers (DB, Backend e Web)
└── README.md                    # Documentação do projeto
```

---

## Instalação e Execução

### Pré-requisitos

- [Git](https://git-scm.com/)
- [Docker e Docker Compose](https://docs.docker.com/compose/install/)
- (Opcional) [Yarn](https://yarnpkg.com/) para desenvolvimento local sem Docker

### Passos para Execução com Docker Compose

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/pedromegliato/projeto-pedidos.git
   cd projeto-pedidos
   ```

2. **Suba os containers com Docker Compose:**

   ```bash
   docker-compose up -d
   ```

   Esse comando fará o build e iniciará os containers:
   - **Banco de Dados:** MySQL rodando na porta **3306**.
   - **Serviço de Backend:** Conectado ao banco de dados, rodando na porta **3000**.
   - **Web Pedidos:** Front-end servido via Nginx, disponível na porta **8081** do host.

3. **Verifique os containers em execução:**

   ```bash
   docker-compose ps
   ```

---

## Docker Compose

O arquivo `docker-compose.yml` organiza e integra os serviços do sistema:

```yaml
version: '3.8'
services:
  db:
    image: mysql:8.0
    container_name: mysql_pedidos
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: db_pedidos
      MYSQL_USER: pedro
      MYSQL_PASSWORD: pedro123
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql
      - ./database/init.sql:/docker-entrypoint-initdb.d/00-init.sql
      - ./database/mysql.cnf:/etc/mysql/conf.d/mysql.cnf

  api:
    build: ./api-pedidos
    container_name: api_pedidos
    restart: always
    environment:
      DB_HOST: db
      DB_PORT: 3306
      DB_USER: pedro
      DB_PASS: pedro123
      DB_NAME: db_pedidos
      API_PORT: 3000
    ports:
      - "3000:3000"
    depends_on:
      - db

  web-pedidos:
    build: ./web-pedidos
    container_name: web_pedidos
    restart: always
    environment:
      VUE_APP_BASE_URL: http://api:3000/api/v1
    ports:
      - "8081:80"
    depends_on:
      - api

volumes:
  db_data:
```

### Destaques:

- **db:**  
  Utiliza a imagem oficial do MySQL 8.0, com volumes para persistência de dados e inicialização customizada.

- **api:**  
  É o serviço de backend (não abordado detalhadamente aqui) que se conecta ao banco de dados e roda na porta **3000**.

- **web-pedidos:**  
  Container do front-end, configurado para servir a aplicação via Nginx na porta **8081** do host. A variável `VUE_APP_BASE_URL` aponta para o serviço de backend.

---

## Acessando a Aplicação

Após subir os containers, você pode acessar a interface web do **Web Pedidos** através do endereço:

[http://localhost:8081/clientes](http://localhost:8081/clientes)

A URL exemplifica o acesso à página de clientes, mas a aplicação permite navegação para outras áreas, como pedidos e produtos, conforme as rotas definidas.

---

## Licença

Este projeto é licenciado sob a licença **MIT**.

---

## By Pedro Megliato

Projeto desenvolvido por **Pedro Megliato**.  
