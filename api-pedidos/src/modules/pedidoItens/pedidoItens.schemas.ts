import { FastifySchema } from 'fastify';

export const getAllPedidoItensSchema: FastifySchema = {
  description: 'Retorna todos os itens de pedido cadastrados (exceto os desativados)',
  tags: ['Pedido Itens'],
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id_pedido_item: { type: 'number' },
          id_pedido: { type: 'number' },
          id_produto: { type: 'number' },
          qtde: { type: 'number' },
          preco: { type: 'number' }
        }
      }
    }
  }
};

export const getPedidoItemByIdSchema: FastifySchema = {
  description: 'Retorna um item de pedido por ID',
  tags: ['Pedido Itens'],
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
        id_pedido_item: { type: 'number' },
        id_pedido: { type: 'number' },
        id_produto: { type: 'number' },
        qtde: { type: 'number' },
        preco: { type: 'number' }
      }
    },
    404: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    }
  }
};

export const createPedidoItemSchema: FastifySchema = {
  description: 'Cria um novo item de pedido',
  tags: ['Pedido Itens'],
  body: {
    type: 'object',
    required: ['id_pedido', 'id_produto', 'qtde', 'preco'],
    properties: {
      id_pedido: { type: 'number' },
      id_produto: { type: 'number' },
      qtde: { type: 'number' },
      preco: { type: 'number' }
    }
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id_pedido_item: { type: 'number' },
        id_pedido: { type: 'number' },
        id_produto: { type: 'number' },
        qtde: { type: 'number' },
        preco: { type: 'number' }
      }
    }
  }
};

export const updatePedidoItemSchema: FastifySchema = {
  description: 'Atualiza um item de pedido existente',
  tags: ['Pedido Itens'],
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
      id_pedido: { type: 'number' },
      id_produto: { type: 'number' },
      qtde: { type: 'number' },
      preco: { type: 'number' }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id_pedido_item: { type: 'number' },
        id_pedido: { type: 'number' },
        id_produto: { type: 'number' },
        qtde: { type: 'number' },
        preco: { type: 'number' }
      }
    },
    404: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    }
  }
};

export const deletePedidoItemSchema: FastifySchema = {
  description: 'Desativa (soft delete) um item de pedido por ID',
  tags: ['Pedido Itens'],
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
