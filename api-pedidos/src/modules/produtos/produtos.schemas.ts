import { FastifySchema } from 'fastify';

export const getAllProdutosSchema: FastifySchema = {
  description: 'Retorna todos os produtos cadastrados (exceto os desativados)',
  tags: ['Produtos'],
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id_produto: { type: 'number' },
          nome: { type: 'string' },
          preco: { type: 'number' },
          sku: { type: 'string' }
        }
      }
    }
  }
};

export const getProdutoByIdSchema: FastifySchema = {
  description: 'Retorna um produto por ID',
  tags: ['Produtos'],
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
        id_produto: { type: 'number' },
        nome: { type: 'string' },
        preco: { type: 'number' },
        sku: { type: 'string' }
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

export const createProdutoSchema: FastifySchema = {
  description: 'Cria um novo produto',
  tags: ['Produtos'],
  body: {
    type: 'object',
    required: ['nome', 'preco'],
    properties: {
      nome: { type: 'string' },
      preco: { type: 'number' }
    }
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id_produto: { type: 'number' },
        nome: { type: 'string' },
        preco: { type: 'number' },
        sku: { type: 'string' }
      }
    }
  }
};

export const updateProdutoSchema: FastifySchema = {
  description: 'Atualiza um produto existente',
  tags: ['Produtos'],
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
      nome: { type: 'string' },
      preco: { type: 'number' }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id_produto: { type: 'number' },
        nome: { type: 'string' },
        preco: { type: 'number' },
        sku: { type: 'string' }
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

export const deleteProdutoSchema: FastifySchema = {
  description: 'Desativa (soft delete) um produto por ID',
  tags: ['Produtos'],
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
      properties: {
        message: { type: 'string' }
      }
    }
  }
};
