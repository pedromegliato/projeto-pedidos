import { FastifyRequest, FastifyReply } from 'fastify';
import { ClientesService } from './clientes.service';
import { CreateClienteDTO, UpdateClienteDTO } from './clientes.dto';

const service = new ClientesService();

export class ClientesController {
  static async getAll(req: FastifyRequest, reply: FastifyReply) {
    const clientes = await service.findAll();
    return reply.send(clientes);
  }

  static async getById(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const cliente = await service.findById(Number(req.params.id));
    if (!cliente) {
      return reply.status(404).send({ message: 'Cliente não encontrado' });
    }
    return reply.send(cliente);
  }

  static async create(req: FastifyRequest<{ Body: CreateClienteDTO }>, reply: FastifyReply) {
    const created = await service.create(req.body);
    return reply.status(201).send(created);
  }

  static async update(req: FastifyRequest<{ Params: { id: string }; Body: UpdateClienteDTO }>, reply: FastifyReply) {
    const updated = await service.update(Number(req.params.id), req.body);
    if (!updated) {
      return reply.status(404).send({ message: 'Cliente não encontrado' });
    }
    return reply.send(updated);
  }

  static async delete(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const success = await service.delete(Number(req.params.id));
    if (!success) {
      return reply.status(404).send({ message: 'Cliente não encontrado' });
    }
    return reply.status(204).send();
  }
}
