// src/modules/pedidos/pedidos.schemas.ts
import { FastifySchema } from 'fastify';

export const getAllPedidosSchema: FastifySchema = {
  description: 'Retorna todos os pedidos cadastrados',
  tags: ['Pedidos'],
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id_pedido: { type: 'number' },
          data: { type: 'string', format: 'date' },
          id_cliente: { type: 'number' }
        }
      }
    }
  }
};

export const getPedidoByIdSchema: FastifySchema = {
  description: 'Retorna um pedido por ID',
  tags: ['Pedidos'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' }
    },
    required: ['id']
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id_pedido: { type: 'number' },
        data: { type: 'string', format: 'date' },
        id_cliente: { type: 'number' }
      }
    },
    404: {
      type: 'object',
      properties: { message: { type: 'string' } }
    }
  }
};

export const createPedidoSchema: FastifySchema = {
  description: 'Cria um novo pedido',
  tags: ['Pedidos'],
  body: {
    type: 'object',
    required: ['data', 'id_cliente'],
    properties: {
      data: { type: 'string', format: 'date' },
      id_cliente: { type: 'number' }
    }
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id_pedido: { type: 'number' },
        data: { type: 'string', format: 'date' },
        id_cliente: { type: 'number' }
      }
    }
  }
};

export const updatePedidoSchema: FastifySchema = {
  description: 'Atualiza um pedido existente',
  tags: ['Pedidos'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' }
    },
    required: ['id']
  },
  body: {
    type: 'object',
    properties: {
      data: { type: 'string', format: 'date' },
      id_cliente: { type: 'number' }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id_pedido: { type: 'number' },
        data: { type: 'string', format: 'date' },
        id_cliente: { type: 'number' }
      }
    },
    404: {
      type: 'object',
      properties: { message: { type: 'string' } }
    }
  }
};

export const deletePedidoSchema: FastifySchema = {
  description: 'Desativa (soft delete) um pedido por ID',
  tags: ['Pedidos'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' }
    },
    required: ['id']
  },
  response: {
    204: { type: 'null' },
    404: {
      type: 'object',
      properties: { message: { type: 'string' } }
    }
  }
};
