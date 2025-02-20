import { FastifyInstance } from 'fastify';
import { PedidoItensController } from './pedidoItens.controller';
import {
  getAllPedidoItensSchema,
  getPedidoItemByIdSchema,
  createPedidoItemSchema,
  updatePedidoItemSchema,
  deletePedidoItemSchema,
} from './pedidoItens.schemas';

export default async function (fastify: FastifyInstance, options: any) {
  fastify.get('/', { schema: getAllPedidoItensSchema }, PedidoItensController.getAll);
  fastify.get('/:id', { schema: getPedidoItemByIdSchema }, PedidoItensController.getById);
  fastify.post('/', { schema: createPedidoItemSchema }, PedidoItensController.create);
  fastify.patch('/:id', { schema: updatePedidoItemSchema }, PedidoItensController.update);
  fastify.delete('/:id', { schema: deletePedidoItemSchema }, PedidoItensController.delete);
}
