import { FastifyInstance } from 'fastify';
import { PedidosController } from './pedidos.controller';
import { 
  getAllPedidosSchema,
  getPedidoByIdSchema, 
  createPedidoSchema, 
  updatePedidoSchema, 
  deletePedidoSchema 
} from './pedidos.schemas';

export default async function (fastify: FastifyInstance, options: any) {
  fastify.get('/', { schema: getAllPedidosSchema }, PedidosController.getAll);
  fastify.get('/:id', { schema: getPedidoByIdSchema }, PedidosController.getById);
  fastify.post('/', { schema: createPedidoSchema }, PedidosController.create);
  fastify.patch('/:id', { schema: updatePedidoSchema }, PedidosController.update);
  fastify.delete('/:id', { schema: deletePedidoSchema }, PedidosController.delete);
}
