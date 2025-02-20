import { FastifyInstance } from 'fastify';
import { HealthController } from './health.controller';
import { healthCheckSchema } from './health.schemas';

export default async function (fastify: FastifyInstance, options: any) {
  fastify.get('/', { schema: healthCheckSchema }, HealthController.check);
}
