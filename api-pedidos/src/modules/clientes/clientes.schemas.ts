import { FastifySchema } from 'fastify';

export const getAllClientesSchema: FastifySchema = {
  description: 'Retorna todos os clientes cadastrados',
  tags: ['Clientes'],
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id_cliente: { type: 'number' },
          nome: { type: 'string' },
          email: { type: 'string' },
          telefone: { type: 'string' }
        }
      }
    }
  }
};

export const getClienteByIdSchema: FastifySchema = {
  description: 'Retorna um cliente por ID',
  tags: ['Clientes'],
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
        id_cliente: { type: 'number' },
        nome: { type: 'string' },
        email: { type: 'string' }
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

export const createClienteSchema: FastifySchema = {
  description: 'Cria um novo cliente',
  tags: ['Clientes'],
  body: {
    type: 'object',
    required: ['nome', 'email'],
    properties: {
      nome: { type: 'string' },
      email: { type: 'string' },
      telefone: { type: 'string' },
      endereco: { type: 'string' },
      cpf: { type: 'string' },
      data_nascimento: { type: 'string', format: 'date' }
    }
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id_cliente: { type: 'number' },
        nome: { type: 'string' },
        email: { type: 'string' }
      }
    }
  }
};

export const updateClienteSchema: FastifySchema = {
  description: 'Atualiza um cliente existente',
  tags: ['Clientes'],
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
      email: { type: 'string' },
      telefone: { type: 'string' },
      endereco: { type: 'string' },
      cpf: { type: 'string' },
      data_nascimento: { type: 'string', format: 'date' }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id_cliente: { type: 'number' },
        nome: { type: 'string' },
        email: { type: 'string' }
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

export const deleteClienteSchema: FastifySchema = {
  description: 'Desativa (soft delete) um cliente por ID',
  tags: ['Clientes'],
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
