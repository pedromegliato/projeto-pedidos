import { FastifyInstance } from 'fastify';
import { ProdutosController } from './produtos.controller';
import {
  getAllProdutosSchema,
  getProdutoByIdSchema,
  createProdutoSchema,
  updateProdutoSchema,
  deleteProdutoSchema,
} from './produtos.schemas';

export default async function (fastify: FastifyInstance, options: any) {
  fastify.get('/', { schema: getAllProdutosSchema }, ProdutosController.getAll);
  fastify.get('/:id', { schema: getProdutoByIdSchema }, ProdutosController.getById);
  fastify.post('/', { schema: createProdutoSchema }, ProdutosController.create);
  fastify.patch('/:id', { schema: updateProdutoSchema }, ProdutosController.update);
  fastify.delete('/:id', { schema: deleteProdutoSchema }, ProdutosController.delete);
}
