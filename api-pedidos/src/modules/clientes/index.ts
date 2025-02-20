import { FastifyInstance } from 'fastify';
import { ClientesController } from './clientes.controller';
import {
  getAllClientesSchema,
  getClienteByIdSchema,
  createClienteSchema,
  updateClienteSchema,
  deleteClienteSchema,
} from './clientes.schemas';

export default async function (fastify: FastifyInstance, options: any) {
  fastify.get('/', { schema: getAllClientesSchema }, ClientesController.getAll);
  fastify.get('/:id', { schema: getClienteByIdSchema }, ClientesController.getById);
  fastify.post('/', { schema: createClienteSchema }, ClientesController.create);
  fastify.patch('/:id', { schema: updateClienteSchema }, ClientesController.update);
  fastify.delete('/:id', { schema: deleteClienteSchema }, ClientesController.delete);
}
