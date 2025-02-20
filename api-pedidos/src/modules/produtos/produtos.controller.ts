import { FastifyRequest, FastifyReply } from 'fastify';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDTO, UpdateProdutoDTO } from './produtos.dto';

const service = new ProdutosService();

export class ProdutosController {
  static async getAll(req: FastifyRequest, reply: FastifyReply) {
    const produtos = await service.findAll();
    return reply.send(produtos);
  }

  static async getById(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const produto = await service.findById(Number(req.params.id));
    if (!produto) {
      return reply.status(404).send({ message: 'Produto não encontrado ou desativado' });
    }
    return reply.send(produto);
  }

  static async create(req: FastifyRequest<{ Body: CreateProdutoDTO }>, reply: FastifyReply) {
    const created = await service.create(req.body);
    return reply.status(201).send(created);
  }

  static async update(req: FastifyRequest<{ Params: { id: string }; Body: UpdateProdutoDTO }>, reply: FastifyReply) {
    const updated = await service.update(Number(req.params.id), req.body);
    if (!updated) {
      return reply.status(404).send({ message: 'Produto não encontrado ou desativado' });
    }
    return reply.send(updated);
  }

  static async delete(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const success = await service.delete(Number(req.params.id));
    if (!success) {
      return reply.status(404).send({ message: 'Produto não encontrado ou já desativado' });
    }
    return reply.status(204).send();
  }
}
