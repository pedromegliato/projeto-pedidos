import { FastifyInstance } from 'fastify';
import { ClientesController } from '../modules/clientes/clientes.controller';
import { getAllClientesSchema, getClienteByIdSchema, createClienteSchema, updateClienteSchema, deleteClienteSchema } from '../modules/clientes/clientes.schemas';


export async function clientesRoutes(app: FastifyInstance) {
  app.get('/clientes', {
    schema: getAllClientesSchema
  }, ClientesController.getAll);

  app.get('/clientes/:id', {
    schema: getClienteByIdSchema
  }, ClientesController.getById);

  app.post('/clientes', {
    schema: createClienteSchema
  }, ClientesController.create);

  app.put('/clientes/:id', {
    schema: updateClienteSchema
  }, ClientesController.update);

  app.delete('/clientes/:id', {
    schema: deleteClienteSchema
  }, ClientesController.delete);
}