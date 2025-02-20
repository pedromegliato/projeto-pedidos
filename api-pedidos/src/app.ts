import path, { join } from 'node:path';
import AutoLoad from '@fastify/autoload';
import { FastifyPluginAsync } from 'fastify';
import dotenv from 'dotenv';

dotenv.config();

const app: FastifyPluginAsync = async (fastify, opts) => {

  await fastify.register(import('./plugins/swagger'));

  await fastify.register(AutoLoad, {
    dir: join(__dirname, 'modules'),
    options: { prefix: '/api/v1/' }
  });

};

export default app;