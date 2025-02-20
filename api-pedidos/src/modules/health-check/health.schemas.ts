import { FastifySchema } from 'fastify';

export const healthCheckSchema: FastifySchema = {
  description: 'Verifica a saúde da aplicação',
  tags: ['Health Check'],
  response: {
    200: {
      type: 'object',
      properties: {
        status: { type: 'string' },
        timestamp: { type: 'string' }
      }
    }
  }
};
