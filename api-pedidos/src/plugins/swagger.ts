import { FastifyInstance } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fp from 'fastify-plugin';

async function swaggerPlugin(fastify: FastifyInstance) {
  await fastify.register(fastifySwagger, {
    openapi: {
      openapi: '3.0.3',
      info: {
        title: 'API Pedidos',
        version: '1.0.0',
        description: 'Documentação de uso da api de pedidos'
      },
      tags: [
        { name: 'Clientes', description: 'Gestão de clientes' },
        { name: 'Produtos', description: 'Gestão de produtos' },
        { name: 'Pedidos', description: 'Gestão de pedidos' },
        { name: 'Pedido Itens', description: 'Gestão de (Pedido Itens)' },
        { name: 'Health Check', description: 'Status de saúde da API' }
      ]
    }
  });

  await fastify.register(fastifySwaggerUi, {
    routePrefix: '/api-docs-pedidos',
    uiConfig: {
      docExpansion: 'none'
    }
  });
}

export default fp(swaggerPlugin);