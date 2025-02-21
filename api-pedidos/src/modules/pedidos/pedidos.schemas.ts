import { FastifySchema } from 'fastify';

export const getAllPedidosSchema: FastifySchema = {
  description: 'Retorna todos os pedidos cadastrados com todas as informações',
  tags: ['Pedidos'],
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id_pedido: { type: 'number' },
          data: { type: 'string', format: 'date-time' },
          cliente: {
            type: 'object',
            properties: {
              id_cliente: { type: 'number' },
              nome: { type: 'string' },
              email: { type: 'string' },
              telefone: { type: 'string' },
              endereco: { type: 'string' },
              cpf: { type: 'string' },
              data_nascimento: { type: 'string', format: 'date' }
            }
          },
          itens: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id_pedido_item: { type: 'number' },
                qtde: { type: 'number' },
                preco: { type: 'number' },
                produto: {
                  type: 'object',
                  properties: {
                    id_produto: { type: 'number' },
                    nome: { type: 'string' },
                    preco: { type: 'number' },
                    sku: { type: 'string' }
                  }
                },
                data_criacao: { type: 'string', format: 'date-time' },
                data_atualizacao: { type: 'string', format: 'date-time' },
                data_desativacao: { type: ['string', 'null'], format: 'date' }
              }
            }
          },
          data_criacao: { type: 'string', format: 'date-time' },
          data_atualizacao: { type: 'string', format: 'date-time' },
          data_desativacao: { type: ['string', 'null'], format: 'date' }
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
    required: ['data', 'cliente'],
    properties: {
      data: { type: 'string', format: 'date-time' },
      cliente: {
        type: 'object',
        required: ['id_cliente'],
        properties: {
          id_cliente: { type: 'number' },
          nome: { type: 'string' },
          email: { type: 'string' },
          telefone: { type: 'string' }
        }
      },
      itens: {
        type: 'array',
        items: {
          type: 'object',
          required: ['produto', 'qtde', 'preco'],
          properties: {
            produto: {
              type: 'object',
              required: ['id_produto'],
              properties: {
                id_produto: { type: 'number' },
                nome: { type: 'string' },
                preco: { type: 'number' },
                sku: { type: 'string' }
              }
            },
            qtde: { type: 'number' },
            preco: { type: 'number' }
          }
        }
      }
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
      cliente: {
        type: 'object',
        properties: {
          id_cliente: { type: 'number' },
          nome: { type: 'string' },
          email: { type: 'string' },
          telefone: { type: 'string' }
        }
      },
      itens: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            produto: {
              type: 'object',
              properties: {
                id_produto: { type: 'number' },
                nome: { type: 'string' },
                preco: { type: 'number' },
                sku: { type: 'string' }
              }
            },
            qtde: { type: 'number' },
            preco: { type: 'number' }
          }
        }
      }
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
