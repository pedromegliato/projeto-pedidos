import { FastifyRequest, FastifyReply } from 'fastify';
import { PedidosService } from './pedidos.service';
import { CreatePedidoPayloadDTO, UpdatePedidoPayloadDTO } from './pedidos.dto';

const service = new PedidosService();

export class PedidosController {
  static async getAll(req: FastifyRequest, reply: FastifyReply) {
    const pedidos = await service.findAll();
    return reply.send(pedidos);
  }

  static async getById(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const pedido = await service.findById(Number(req.params.id));
    if (!pedido) {
      return reply.status(404).send({ message: 'Pedido não encontrado' });
    }
    return reply.send(pedido);
  }

  static async create(req: FastifyRequest<{ Body: CreatePedidoPayloadDTO }>, reply: FastifyReply) {
    const created = await service.create(req.body);
    return reply.status(201).send(created);
  }

  static async update(
    req: FastifyRequest<{ Params: { id: string }; Body: UpdatePedidoPayloadDTO }>,
    reply: FastifyReply
  ) {
    const updated = await service.update(Number(req.params.id), req.body);
    if (!updated) {
      return reply.status(404).send({ message: 'Pedido não encontrado' });
    }
    return reply.send(updated);
  }

  static async delete(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const success = await service.delete(Number(req.params.id));
    if (!success) {
      return reply.status(404).send({ message: 'Pedido não encontrado' });
    }
    return reply.status(204).send();
  }
}
