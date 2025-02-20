import { FastifyRequest, FastifyReply } from 'fastify';

export class HealthController {
  static async check(req: FastifyRequest, reply: FastifyReply) {
    return reply.send({
      status: 'ok',
      timestamp: new Date().toISOString()
    });
  }
}
