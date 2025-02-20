import { FastifyRequest, FastifyReply } from 'fastify';
import { PedidoItensService } from './pedidoItens.service';
import { CreatePedidoItemDTO, UpdatePedidoItemDTO } from './pedidoItens.dto';

const service = new PedidoItensService();

export class PedidoItensController {
  static async getAll(req: FastifyRequest, reply: FastifyReply) {
    const itens = await service.findAll();
    return reply.send(itens);
  }

  static async getById(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const item = await service.findById(Number(req.params.id));
    if (!item) {
      return reply.status(404).send({ message: 'Item de pedido não encontrado ou desativado' });
    }
    return reply.send(item);
  }

  static async create(req: FastifyRequest<{ Body: CreatePedidoItemDTO }>, reply: FastifyReply) {
    const created = await service.create(req.body);
    return reply.status(201).send(created);
  }

  static async update(req: FastifyRequest<{ Params: { id: string }; Body: UpdatePedidoItemDTO }>, reply: FastifyReply) {
    const updated = await service.update(Number(req.params.id), req.body);
    if (!updated) {
      return reply.status(404).send({ message: 'Item de pedido não encontrado ou desativado' });
    }
    return reply.send(updated);
  }

  static async delete(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const success = await service.delete(Number(req.params.id));
    if (!success) {
      return reply.status(404).send({ message: 'Item de pedido não encontrado ou já desativado' });
    }
    return reply.status(204).send();
  }
}
