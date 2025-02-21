# Web Pedidos

Aplicação web desenvolvida com Vue 3, Vuetify 3 e TypeScript, gerenciada com Yarn. Este projeto tem como objetivo facilitar o gerenciamento de pedidos, clientes e produtos, oferecendo uma interface responsiva e intuitiva.

## Sumário

- [Visão Geral](#visão-geral)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Executando o Projeto](#executando-o-projeto)
- [Build para Produção](#build-para-produção)
- [Docker](#docker)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Exemplos de Uso](#exemplos-de-uso)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Visão Geral

O **Web Pedidos** é um sistema de gerenciamento que permite realizar operações de CRUD para clientes, produtos e pedidos. A aplicação é construída com tecnologias modernas:
- **Vue 3** para a construção de interfaces;
- **Vuetify 3** para componentes visuais e responsividade;
- **TypeScript** para tipagem e robustez no desenvolvimento;
- **Yarn** como gerenciador de pacotes.

## Pré-requisitos

- **Node.js** (versão LTS recomendada)
- **Yarn** (para instalação e gerenciamento de pacotes)
- **Docker** (caso deseje utilizar containerização para o deploy)

## Instalação

1. **Clone o repositório:**

   ```bash
   git clone <URL-do-repositório>
   ```

2. **Entre no diretório do projeto:**

   ```bash
   cd web-pedidos
   ```

3. **Instale as dependências com Yarn:**

   ```bash
   yarn install
   ```

## Executando o Projeto

Para iniciar o servidor de desenvolvimento, execute:

```bash
yarn serve
```

Após a inicialização, a aplicação estará disponível geralmente em [http://localhost:8081](http://localhost:8081).

## Build para Produção

Para gerar o build otimizado para produção, execute:

```bash
yarn build
```

Os arquivos de build serão gerados na pasta `dist`.

## Docker

O projeto inclui um **Dockerfile** que realiza o build da aplicação e a serve via Nginx.

### Conteúdo do Dockerfile

```dockerfile
FROM node:lts-alpine AS build-stage
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM nginx:stable-alpine AS production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Instruções para utilização com Docker

1. **Construir a imagem Docker:**

   ```bash
   docker-compose up --build
   ```
   na raiz do projot para subir o projto completo

> **Observação:** A porta **80** do container é mapeada para a porta **8081** da sua máquina. Assim, para acessar a aplicação (por exemplo, a página de clientes), utilize [http://localhost:8081/clientes](http://localhost:8081/clientes).

## Estrutura do Projeto

A estrutura do projeto está organizada da seguinte forma:

```
web-pedidos/
├── nginx
│   └── default.conf         # Configuração do Nginx
├── public                   # Arquivos públicos (assets, imagens, etc.)
├── src
│   ├── assets               # Recursos estáticos
│   ├── components           # Componentes Vue reutilizáveis
│   │   ├── AppHeader.vue
│   │   ├── BaseDataTable.vue
│   │   ├── ClientModal.vue
│   │   ├── ConfirmationModal.vue
│   │   ├── CustomButton.vue
│   │   ├── PedidoModal.vue
│   │   └── ProductModal.vue
│   ├── composables          # Composables (ex.: useCliente, usePedido, etc.)
│   │   ├── useCliente.ts
│   │   ├── usePedido.ts
│   │   ├── usePedidoItem.ts
│   │   ├── useProduto.ts
│   │   └── useToast.ts
│   ├── layouts              # Layouts da aplicação
│   │   └── MainLayout.vue
│   ├── plugins              # Plugins (ex.: configuração do Vuetify, WebFontLoader)
│   │   ├── vuetify.ts
│   │   └── webfontloader.ts
│   ├── router               # Configuração das rotas
│   │   └── index.ts
│   ├── services             # Serviços para comunicação com a API
│   │   ├── ApiService.ts
│   │   ├── clienteService.ts
│   │   ├── pedidoItemService.ts
│   │   ├── pedidoService.ts
│   │   └── produtoService.ts
│   ├── store                # Vuex Store
│   │   └── index.ts
│   ├── types                # Declaração de tipos e interfaces
│   │   ├── cliente.d.ts
│   │   ├── pedido.d.ts
│   │   ├── pedidoItem.d.ts
│   │   └── produto.d.ts
│   ├── utils                # Funções utilitárias (ex.: formatação, máscaras)
│   │   ├── formatters.ts
│   │   └── phoneMask.ts
│   ├── views                # Páginas da aplicação
│   │   ├── ClientesPage.vue
│   │   ├── PedidosPage.vue
│   │   └── ProdutosPage.vue
│   └── App.vue              # Componente raiz da aplicação
├── package.json             # Gerenciamento de dependências e scripts
├── tsconfig.json            # Configurações do TypeScript
└── Dockerfile               # Arquivo para containerização com Docker
```

## Exemplos de Uso

### Acessando a Página de Clientes

Após executar o container Docker (conforme instruções acima), acesse a página de clientes através do endereço:

[http://localhost:8081/clientes](http://localhost:8081/clientes)

### Utilizando os Composables

- **useCliente.ts:** Gerencia operações como busca, criação, atualização e exclusão de clientes utilizando os serviços definidos em `src/services/clienteService.ts`.

Exemplo de uso:

```typescript
import { useCliente } from '@/composables/useCliente';

export default {
  setup() {
    const { clientes, fetchClientes, saveCliente, deleteClienteHandler } = useCliente();

    // Carrega os clientes ao iniciar o componente
    fetchClientes();

    return { clientes, saveCliente, deleteClienteHandler };
  },
};
```

o mesmo padrão para os demais

## Licença

Este projeto está licenciado sob a licença [MIT](LICENSE).

---

**By Pedro Megliato**