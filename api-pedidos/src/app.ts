import 'reflect-metadata';
import { join } from 'node:path';
import AutoLoad from '@fastify/autoload';
import { FastifyPluginAsync } from 'fastify';
import dotenv from 'dotenv';
import { AppDataSource } from './config/ormconfig';
import cors from '@fastify/cors';


dotenv.config();

const app: FastifyPluginAsync = async (fastify, opts) => {

  await fastify.register(cors, { origin: '*' });

  try {
    await AppDataSource.initialize();
    fastify.log.info('DataSource inicializado.');
  } catch (error: any) {
    fastify.log.error('Erro ao inicializar DataSource: ' + error.stack);
    process.exit(1);
  }

  await fastify.register(import('./plugins/swagger'));

  await fastify.register(AutoLoad, {
    dir: join(__dirname, 'modules'),
    options: { prefix: '/api/v1/' }
  });

};

export default app;